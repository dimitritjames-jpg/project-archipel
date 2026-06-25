# VibeVI short-query search QA — production baseline

**Date:** 2026-06-25  
**Branch / commit:** `main` @ `695c1ec`  
**Endpoint:** `https://www.myvibevi.com/search` → `HomeSearchBar` → `searchLocalBusinesses` server action  
**Search logic:** Supabase `businesses` where `status = 'published'`; ILIKE on `name` and `description_plain`; limit 12

---

## Executive summary

| Layer | Result |
|-------|--------|
| **Production (pre-fix)** | **0 / 24 pass** — server action POST returns **HTTP 500** (digest `945124031`) |
| **Root cause** | PostgREST `.or()` filter with unquoted `%pattern%` values fails parsing (including single-word queries) |
| **Catalog simulation** (52 public-info listings, same ILIKE logic) | **14 / 24** return hits; **10 / 24** empty without synonyms/category/island expansion |
| **Fix applied (search-only)** | Replaced `.or()` string with parallel `.ilike()` queries merged by `id` in `local-search.ts` |

---

## Production test (live, pre-fix)

Playwright on `https://www.myvibevi.com/search` — all 24 queries returned **count 0** with empty-state copy. Network capture: server-action POST → **500** for `charter` and all other queries.

**Business profiles still load** (e.g. `/st-john/biz/lime-out-vi`) — issue is isolated to directory search action, not listing data.

---

## Per-query results

**Prod** = live myvibevi.com (pre-fix) | **Sim** = ILIKE on 52 approved public-info listings | **Sense** = useful if search worked?

| Query | Prod | Sim | Top 5 (simulated) | Makes sense? | Weak / empty | Suggested fix |
|-------|------|-----|-------------------|--------------|--------------|---------------|
| beach | 0 | 12 | 1864 The Restaurant; Dinghy's Beach Bar & Grill; Estate Whim Museum; Leatherback Brewing; Lovango Resort & Beach Club | Partial | Estate Whim, brewery tangential | Fix search; optional beach ranking |
| beaches | 0 | 1 | Virgin Islands National Park | Weak | Only 1 hit | Synonym `beaches` → `beach` |
| boat | 0 | 8 | Buck Island Reef NM; Caribbean Blue Boat Charters; Lime Out VI; Lovango Resort; Ocean Runner Powerboat Rentals | Mostly | Some non-charter noise | Category boost `excursions-charters` |
| charter | 0 | 8 | Big Beard's Adventure Tours; Caribbean Blue Boat Charters; Caribbean Sea Adventures; Kekoa Sailing Charters; Ocean Runner Powerboat Rentals | Yes | — | **Fix search 500** |
| snorkel | 0 | 5 | BushTribe Eco Adventures; Ocean Runner; On The Sea Charters; The VI Cat; Virgin Islands Ecotours — St. Thomas | Yes | — | Fix search |
| food | 0 | 7 | 1864 The Restaurant; Flavors of St. Thomas Food Tours; Gladys' Cafe; Leatherback Brewing; Morgan's Mango | Mostly | Brewery debatable | Synonym `bite`/`eat` → dining |
| restaurant | 0 | 4 | 1864 The Restaurant; AMA at Cane Bay; Brew STX; Too.Chez Restaurant and Bar | Yes | — | Fix search |
| bite | 0 | 1 | Duffy's Love Shack | Weak | Misses most dining | **`bite` → food/restaurant/dining** |
| bar | 0 | 10 | Brew STX; Dinghy's Beach Bar & Grill; Lime Out VI; Maho Crossroads; On The Sea Charters | Mostly | Charter description noise | Boost `nightlife-rhythm` |
| night | 0 | 7 | 1864 The Restaurant; Island Time Pub; Morgan's Mango; The Beach Bar; The Easterly | Broad | Mixed dining/nightlife | **`night` → nightlife** |
| nightlife | 0 | 0 | — | — | Category exists, word not in copy | **Category slug match `nightlife-rhythm`** |
| family | 0 | 0 | — | — | No family keyword in listings | Vibe shortcut `/search?vibe=family` |
| cruise | 0 | 3 | Big Beard's Adventure Tours; Coral World Ocean Park; Pirates Treasure Museum | Partial | Not cruise schedules | Utility link `/cruise-day` in no-results |
| ferry | 0 | 8 | 1864 The Restaurant; Dinghy's Beach Bar; Island Time Pub; Lovango Resort; Rachael's Rentals | Mixed | Restaurants mentioning ferry | Match `Water Island Ferry`; utility `/ferry` |
| st thomas | 0 | 0 | — | — | Island not in name/description | **Island field match `STT`** |
| st john | 0 | 0 | — | — | Same | Island match `STJ` |
| st croix | 0 | 0 | — | — | Same | Island match `STX` |
| water island | 0 | 4 | Dinghy's Beach Bar; Rachael's Rentals; Virgin Islands Campground; Water Island Ferry | Yes | — | Fix search + island match |
| romantic | 0 | 0 | — | — | Mood not in copy | Vibe shortcut (luxury/date) |
| rainy day | 0 | 0 | — | — | — | No-results → `/search?vibe=rainy` |
| wellness | 0 | 0 | — | — | Listings in `wellness-spas` lack word | **Category match `wellness-spas`** |
| shops | 0 | 0 | — | — | — | Category `local-provisions` |
| local shops | 0 | 0 | — | — | — | Synonym → `local-provisions` |
| things to do | 0 | 0 | — | — | — | Guide shortcuts, not ILIKE |

---

## Pass / fail

| Environment | Pass | Fail |
|-------------|------|------|
| Production (pre-fix) | 0 / 24 | 24 / 24 |
| Simulated catalog | 14 / 24 | 10 / 24 |

---

## Code fix (search-only, committed separately)

**File:** `src/lib/search/local-search.ts`  
**Change:** Replace `.or(\`name.ilike.${pattern},...\`)` with two parallel `.ilike()` queries (name + description), merge unique rows by `id`, sort, limit 12.  
**Why:** Avoids PostgREST `.or()` parsing failures on `%` wildcards and spaced queries like `st thomas`.  
**Visual impact:** None.  
**Deploy note:** Re-test production after deploy; confirm HTTP 200 on search action.

---

## Recommended follow-ups (no UI change)

1. **P1 — Synonym map** (`bite`, `night`, `boat`, `beaches`, `shops`)
2. **P2 — Category + island expansion** when query matches taxonomy/island aliases
3. **P3 — No-results shortcuts** to `/ferry`, `/cruise-day`, vibe chips, island hubs
4. **P4 — Algolia** (optional) when account provisioned; sync route currently stubbed

---

## Trust guardrails

- No invented listings, reviews, hours, or availability
- Search returns **published** businesses only
- Demo/noindex preview rows must stay out of public search

---

## Production Re-Test After 4e37207

**Re-test date:** 2026-06-25  
**Expected deploy:** `main` @ `4e37207` — *Fix directory search PostgREST filter by merging parallel ILIKE queries.*

### 1. Vercel production deploy confirmation

| Check | Result |
|-------|--------|
| GitHub `main` | `4e37207` |
| Vercel – project-archipel | **Success** — deployment completed for `4e37207` |
| Vercel – project-archipel-zwhn | **Success** — deployment completed for `4e37207` |
| Production URL | `https://www.myvibevi.com` |

**Conclusion:** Production is running commit `4e37207`. The PostgREST `.or()` code fix is deployed.

### 2. Re-test method

- Playwright on `https://www.myvibevi.com/search` — 24 visitor queries
- Network capture on `charter`: server-action POST to `/search` → **HTTP 500** (digest `1213001334`, was `945124031` pre-fix)
- Direct Supabase anon API test against production project `qjkhcxrtktmglpkslqyf.supabase.co`

### 3. Root cause (post-deploy) — **not synonym-related**

The ILIKE filter fix is deployed, but search **still fails** because production Supabase returns:

```text
Could not find the table 'public.businesses' in the schema cache
```

| Observation | Detail |
|-------------|--------|
| Business profiles | Load via **public-info catalog fallback** when Supabase row missing |
| Directory search | **Supabase-only** — throws on missing table → HTTP 500 |
| Published row count (prod Supabase) | **0 / table missing** |
| Catalog in repo | 52 approved public-info listings available for fallback |

**Stop condition met:** Production still returns **500**. Do **not** proceed with synonym expansion until search returns valid responses.

### 4. 24-query re-test results (production)

| Metric | Result |
|--------|--------|
| **HTTP 500 on search action** | **24 / 24** (empty-state UI shown; no listings) |
| **Useful results** | **0 / 24** |
| **Pass (success criteria)** | **0 / 24** |

| Query | HTTP | Count | Top 5 | Sense | Notes |
|-------|------|-------|-------|-------|-------|
| beach | 500 | 0 | — | — | Empty state |
| beaches | 500 | 0 | — | — | Empty state |
| boat | 500 | 0 | — | — | Empty state |
| charter | 500 | 0 | — | — | Empty state |
| snorkel | 500 | 0 | — | — | Empty state |
| food | 500 | 0 | — | — | Empty state |
| restaurant | 500 | 0 | — | — | Empty state |
| bite | 500 | 0 | — | — | Empty state |
| bar | 500 | 0 | — | — | Empty state |
| night | 500 | 0 | — | — | Empty state |
| nightlife | 500 | 0 | — | — | Empty state |
| family | 500 | 0 | — | — | Empty state |
| cruise | 500 | 0 | — | — | Empty state |
| ferry | 500 | 0 | — | — | Empty state |
| st thomas | 500 | 0 | — | — | Empty state |
| st john | 500 | 0 | — | — | Empty state |
| st croix | 500 | 0 | — | — | Empty state |
| water island | 500 | 0 | — | — | Empty state |
| romantic | 500 | 0 | — | — | Empty state |
| rainy day | 500 | 0 | — | — | Empty state |
| wellness | 500 | 0 | — | — | Empty state |
| shops | 500 | 0 | — | — | Empty state |
| local shops | 500 | 0 | — | — | Empty state |
| things to do | 500 | 0 | — | — | Empty state |

### 5. Simulated results (if data were searchable)

Catalog ILIKE simulation (52 public-info listings) unchanged from baseline — **14 / 24** would return hits once search has a data source. See per-query table above.

### 6. Recommended next patch (search-only, **not** synonyms)

**Priority order:**

1. **P0 — Production data path** (choose one):
   - Run Supabase migrations + seed `public.businesses` on `qjkhcxrtktmglpkslqyf`, **or**
   - Add **catalog fallback** in `searchLocalBusinesses` (mirror `fetchPublishedBusiness` pattern) when Supabase errors or returns empty
2. **P0 — Verify** re-run this 24-query matrix; target HTTP 200 and non-zero hits for `charter`, `beach`, `restaurant`
3. **P1 — Synonym/category/island expansion** — only after P0 passes

**Do not:** UI redesign, synonym map, or design-branch work until search action returns 200.

### 7. Artifacts

| File | Purpose |
|------|---------|
| `scripts/_qa-search-retest-4e37207.json` | Raw Playwright re-test output |
| `scripts/_test-prod-supabase-search.mjs` | Direct Supabase API verification |

---

## P0 Catalog Fallback Patch

**Branch:** `fix/vibevi-search-catalog-fallback`  
**File:** `src/lib/search/local-search.ts`

### Why Supabase-only search failed

Production Supabase (`qjkhcxrtktmglpkslqyf`) does not expose `public.businesses` in the PostgREST schema cache. The `4e37207` ILIKE filter fix was correct but insufficient: every query still threw `Local search failed: Could not find the table 'public.businesses' in the schema cache` → HTTP **500** on the search server action.

Business profiles already avoided this via `fetchPublishedBusiness` → `findPublicInfoBusiness` fallback. Directory search had no equivalent path.

### Why catalog fallback is appropriate

- **52 approved public-info listings** are the current launch inventory (`PUBLIC_INFO_BUSINESSES`).
- Same trust rules: public-info only, no invented ratings/verification/availability.
- Profiles, static params, and category pages already rely on this catalog when Supabase is empty or errors.
- Search can return useful discovery results immediately without waiting for Supabase migration/seed.

### Implementation summary

`searchLocalBusinesses` now:

1. Tries Supabase when URL + anon key are configured (non-localhost placeholder).
2. Returns Supabase rows on success.
3. On PostgREST errors (missing table, schema cache, query failure) or thrown exceptions: logs a safe `console.warn` and falls back to `PUBLIC_INFO_BUSINESSES`.
4. Catalog matching (P0, no synonyms): lowercase, trim, collapse spaces; match against name, slug, island code/slug/name, category slug/name, description, address, source URLs.
5. Maps catalog rows into existing `LocalSearchResult` shape (same card href pattern as before).
6. Never throws — always returns `[]` or results → HTTP **200**.

### Post-deploy verification targets

| Target | Goal |
|--------|------|
| **P0a** | **24 / 24** queries return HTTP **200** (zero results OK) |
| **P0b** | Core queries (`charter`, `beach`, `restaurant`, `snorkel`, `ferry`, `water island`) return catalog hits |
| **P1** | Synonym/category/island expansion (`bite`, `night`, `shops`, `st thomas`, etc.) — **after** P0a passes |

### What still needs P1 synonym/category/island expansion

Catalog ILIKE baseline (~14 / 24 simulated hits) still leaves weak/empty terms:

- **Synonyms:** `bite`, `beaches`, `night`, `shops`, `local shops`
- **Category slug match:** `nightlife`, `wellness`, `family`
- **Island name match:** `st thomas`, `st john`, `st croix`
- **Guide/mood shortcuts:** `things to do`, `romantic`, `rainy day`

Do not implement P1 until production re-test confirms HTTP 200 on all 24 queries.

---

## Production Re-Test After Catalog Fallback

**Re-test date:** 2026-06-25  
**Deployed commit:** `2c8b774` (merge of PR #3; includes `b4ca76d`)  
**Vercel:** Production — **Success** on `project-archipel` and `project-archipel-zwhn`  
**Endpoint:** `https://www.myvibevi.com/search`

### Executive summary

| Metric | Result |
|--------|--------|
| **P0a — HTTP 200** | **24 / 24** pass |
| **P0b — core useful hits** | **6 / 6** pass (`beach`, `charter`, `restaurant`, `snorkel`, `ferry`, `water island`) |
| **Useful results (any hits)** | **18 / 24** |
| **Empty (valid 200)** | **6 / 24** |
| **HTTP 500** | **0** |

Catalog fallback is live. Supabase `public.businesses` remains missing on production; search falls back to the 52 approved public-info listings without throwing.

### Per-query results (production, post-fallback)

| Query | HTTP | Count | Top 5 | Sense | Notes |
|-------|------|-------|-------|-------|-------|
| beach | 200 | 12 | 1864 The Restaurant; Dinghy's Beach Bar & Grill; Estate Whim Museum; Leatherback Brewing; Lovango Resort & Beach Club | Partial | Some tangential (museum, brewery) |
| beaches | 200 | 1 | Virgin Islands National Park | Weak | Only 1 hit — P1 synonym `beaches` → `beach` |
| boat | 200 | 8 | Buck Island Reef NM; Caribbean Blue Boat Charters; Lime Out VI; Lovango Resort; Ocean Runner | Mostly | Good charter/discovery |
| charter | 200 | 12 | Big Beard's; Buck Island Reef NM; BushTribe; Caribbean Blue Boat Charters; Caribbean Sea Adventures | Yes | P0b pass |
| snorkel | 200 | 5 | BushTribe; Ocean Runner; On The Sea Charters; The VI Cat; VI Ecotours | Yes | P0b pass |
| food | 200 | 8 | 1864; Flavors of St. Thomas Food Tours; Gladys' Cafe; Leatherback Brewing; Morgan's Mango | Mostly | Brewery noise |
| restaurant | 200 | 5 | 1864; AMA at Cane Bay; Brew STX; Island Time Pub; Too.Chez | Yes | P0b pass |
| bite | 200 | 1 | Duffy's Love Shack | Weak | P1 synonym `bite` → dining |
| bar | 200 | 10 | Brew STX; Dinghy's Beach Bar; Lime Out VI; Maho Crossroads; On The Sea Charters | Mostly | Some charter noise |
| night | 200 | 12 | 1864; Brew STX; Dinghy's; Duffy's; Island Time Pub | Broad | Mixed dining/nightlife — P1 boost nightlife category |
| nightlife | 200 | 12 | Brew STX; Dinghy's; Duffy's; Island Time Pub; Leatherback Brewing | Mostly | Category slug `nightlife-rhythm` helps; still broad |
| family | 200 | 0 | — | — | Empty — P1 vibe shortcut or category |
| cruise | 200 | 3 | Big Beard's; Coral World; Pirates Treasure Museum | Partial | Not cruise schedules — utility link candidate |
| ferry | 200 | 8 | 1864; Dinghy's; Island Time Pub; Lovango; Rachael's Rentals | Mixed | Restaurants mention ferry; Water Island Ferry in set — P0b pass |
| st thomas | 200 | 12 | 81C Arts; Caribbean Blue Boat Charters; Coral World; Duffy's; Flavors of St. Thomas | Yes | Island field match works |
| st john | 200 | 12 | 1864; Caribbean Blue Boat Charters; Kekoa Sailing; Lime Out VI; Lovango | Yes | Island field match works |
| st croix | 200 | 12 | 1756 Grotto; AMA at Cane Bay; Big Beard's; Brew STX; Buck Island | Yes | Island field match works |
| water island | 200 | 4 | Dinghy's; Rachael's Rentals; VI Campground; Water Island Ferry | Yes | P0b pass |
| romantic | 200 | 0 | — | — | Empty — P1 mood/vibe shortcut |
| rainy day | 200 | 0 | — | — | Empty — P1 guide shortcut |
| wellness | 200 | 2 | Magens Bay Authority; St. George Village Botanical Garden | Weak | Tangential — P1 category `wellness-spas` |
| shops | 200 | 0 | — | — | Empty — P1 category `local-provisions` |
| local shops | 200 | 0 | — | — | Empty — P1 synonym → `local-provisions` |
| things to do | 200 | 0 | — | — | Empty — P1 guide/island hub shortcuts |

### P1 synonym/category/island expansion — now unblocked

P0a and P0b are met. Recommended P1 order (search-only, no UI redesign):

1. **Synonym map:** `bite` → culinary/dining; `beaches` → `beach`; `shops` / `local shops` → `local-provisions`
2. **Category slug match:** `wellness`, `family`, refine `night` → `nightlife-rhythm`
3. **No-results shortcuts:** `things to do`, `romantic`, `rainy day` → existing guides/vibe chips
4. **Ranking cleanup:** reduce brewery/ferry noise on `beach`, `food`, `ferry`

### Artifacts

| File | Purpose |
|------|---------|
| `scripts/_qa-catalog-fallback-retest.json` | Raw Playwright re-test output (`2c8b774`) |
| `scripts/qa-catalog-fallback-retest.mjs` | Reusable 24-query production matrix |

---

## P1 Synonym + Category Expansion Plan / Results

**Branch:** `feat/vibevi-search-synonyms-p1`  
**Files:** `src/lib/search/query-expansion.ts`, `src/lib/search/catalog-search.ts`, `src/lib/search/local-search.ts`

### What changed (search-only)

1. **Query expansion layer** — deterministic synonym/alias maps for weak visitor terms (`bite`, `beaches`, `shops`, `family`, `romantic`, `rainy day`, `things to do`, `night`, `wellness`, island names).
2. **Scored catalog matching** — name exact → name → category → island → description; category boosts for `nightlife-rhythm`, `wellness-spas`, `local-provisions`.
3. **Guide/experience shortcuts** — mapped into existing `LocalSearchResult` shape (no UI change): `categoryName` = Guide / Experience / Category; real VibeVI hrefs only.
4. **Supabase-first preserved** — production still tries Supabase; catalog fallback with P1 intelligence when table missing/errors.

### Guide shortcut support

`LocalSearchResult` already supports guide-style rows via `categoryName` + `href`. No search UI redesign required. Guide shortcuts prepend for guide-style queries (`things to do`, `family`, `romantic`, `rainy day`, `shops`, `local shops`), then listing matches fill remaining slots.

### Local QA results (catalog path, 24 queries)

| Metric | Before P1 (prod `2c8b774`) | After P1 (local) |
|--------|---------------------------|------------------|
| Useful results | 18 / 24 | **24 / 24** |
| Empty results | 6 / 24 | **0 / 24** |
| Previously empty fixed | — | **6 / 6** |

| Query | Count | Top results | Notes |
|-------|-------|-------------|-------|
| family | 12 | Best beaches guide; Cruise-day experience; beach listings | Guide-first |
| romantic | 12 | Best beaches guide; Culinary/Stays experiences; waterfront listings | Guide-first |
| rainy day | 12 | Culture/Culinary/Wellness experiences; local-provisions category | Guide-first |
| shops | 12 | Local shops experience; local-provisions categories; 81C Arts, museums | Fixed |
| local shops | 12 | Local provisions categories; local shops experience; provisions listings | Fixed |
| things to do | 12 | Adventure experience; island things-to-do guides; adventure listings | Fixed |
| beaches | 12 | Beach bars, bays, Magens Bay (was 1) | Improved |
| bite | 12 | Restaurants, beach bars, food tours (was 1) | Improved |
| wellness | 3 | Magens Bay Authority; St. George Botanical Garden | Improved ranking |
| ferry | 12 | **Water Island Ferry** first (was noisy restaurants) | Improved |
| night | 12 | Nightlife & Rhythm bars first | Improved |

### Remaining weak queries (non-blocking)

- `beach` / `food` — some brewery/museum tangential matches remain
- `water island` — Leatherback Brewing still appears (description mention) after Water Island Ferry
- `wellness` — only 2 true wellness-spas listings in catalog; low count is data-limited
- `cruise` — partial utility (not cruise schedules)

### P2 follow-ups (optional, search-only)

- Negative scoring for description-only ferry/beach noise
- Supabase path expansion when `public.businesses` is seeded
- Ferry utility shortcut (`/ferry`) in guide-style empty states

### Artifacts

| File | Purpose |
|------|---------|
| `scripts/qa-search-p1-local.mjs` | Local 24-query matrix against catalog search |
| `scripts/_qa-search-p1-local.json` | Raw local P1 output |

---

## Production Re-Test After P1 Search Intelligence

**Re-test date:** 2026-06-25  
**Deployed commit:** `9f741e4` (merge of PR #4; includes `bac5325`)  
**Vercel:** Production — **Success** on `project-archipel` and `project-archipel-zwhn`  
**Endpoint:** `https://www.myvibevi.com/search`

### Executive summary

| Metric | P0 fallback (`2c8b774`) | P1 (`9f741e4`) |
|--------|--------------------------|----------------|
| **HTTP 200** | 24 / 24 | **24 / 24** |
| **Useful / guide-supported** | 18 / 24 | **24 / 24** |
| **Empty** | 6 / 24 | **0 / 24** |
| **HTTP 500** | 0 | **0** |

All success targets met. No UI/design changes. Guide shortcuts render in existing search card shape (`Guide` / `Experience` / `Category` labels).

### Per-query production results

| Query | HTTP | Count | Top results | Notes |
|-------|------|-------|-------------|-------|
| beach | 200 | 12 | Dinghy's Beach Bar; Lovango Resort; Sapphire Beach Bar; The Beach Bar; 1864 | P0b pass; some dining tangential |
| beaches | 200 | 12 | AMA at Cane Bay; Dinghy's; Lovango; Magens Bay; Sapphire Beach Bar | Was 1 — fixed |
| boat | 200 | 8 | Caribbean Blue Boat Charters; Ocean Runner; Saint John Boat Charters | Good |
| charter | 200 | 12 | Caribbean Blue; Kekoa Sailing; On The Sea; Saint John Boat Charters | P0b pass |
| snorkel | 200 | 5 | BushTribe; Ocean Runner; On The Sea; The VI Cat; VI Ecotours | P0b pass |
| food | 200 | 8 | Flavors of St. Thomas Food Tours; VI Food Tours; 1864; Gladys' Cafe | Some brewery noise |
| restaurant | 200 | 5 | 1864; Too.Chez; AMA at Cane Bay; Brew STX; Island Time Pub | P0b pass |
| bite | 200 | 12 | 1864; Dinghy's; Flavors Food Tours; Sapphire Beach Bar; The Beach Bar | Was 1 — fixed |
| bar | 200 | 10 | Dinghy's; Sapphire Beach Bar; The Beach Bar; The Mill; Too.Chez | Good |
| night | 200 | 12 | Brew STX; Dinghy's; Sapphire Beach Bar; Duffy's; Island Time Pub | Nightlife bars first |
| nightlife | 200 | 12 | Brew STX; Dinghy's; Duffy's; Island Time Pub; Leatherback Brewing | Good |
| family | 200 | 12 | Best beaches guide; Cruise-day experience; Water Island day trip; listings | Was empty — fixed |
| cruise | 200 | 3 | Big Beard's; Coral World; Pirates Treasure Museum | Partial (not schedules) |
| ferry | 200 | 12 | **Water Island Ferry** first; 81C Arts; Christiansted NHS | P0b pass; less restaurant noise |
| st thomas | 200 | 12 | Flavors Food Tours; VI Ecotours; 81C Arts; Caribbean Blue; Coral World | Island match works |
| st john | 200 | 12 | Saint John Boat Charters; Tap Room; 1864; Kekoa; Lime Out VI | Island match works |
| st croix | 200 | 12 | Brew STX; 1756 Grotto; AMA; Big Beard's; Buck Island | Island match works |
| water island | 200 | 12 | Water Island Ferry; Leatherback Brewing; Dinghy's; Rachael's Rentals | P0b pass |
| romantic | 200 | 12 | Best beaches guide; Culinary/Stays experiences; waterfront listings | Was empty — fixed |
| rainy day | 200 | 12 | Culinary/Culture/Wellness experiences; local-provisions category | Was empty — fixed |
| wellness | 200 | 3 | Magens Bay Authority; St. George Botanical Garden; Tap Room | Low count (catalog-limited) |
| shops | 200 | 12 | Local provisions categories; local shops experience; 81C Arts | Was empty — fixed |
| local shops | 200 | 12 | Local provisions categories; local shops experience; listings | Was empty — fixed |
| things to do | 200 | 12 | Adventure experience; island things-to-do guides; adventure listings | Was empty — fixed |

### Noisy / weak queries (non-blocking)

- `beach` / `food` — occasional restaurant/brewery tangential matches
- `ferry` — provisions/museum listings after Water Island Ferry (description mentions)
- `water island` — Leatherback Brewing appears (off-island description mention)
- `wellness` — only 3 results; Tap Room is weak/tangential; catalog has 2 wellness-spas listings
- `cruise` — listings only, not cruise schedule utility

### Recommended P2 refinements (search-only)

1. **Negative scoring** — demote description-only ferry/beach mentions when name doesn't match
2. **Ferry utility shortcut** — `/ferry` when query is `ferry` and top hit is already ferry operator
3. **Supabase seed path** — apply P1 expansion when `public.businesses` is migrated
4. **Catalog growth** — more `wellness-spas` and `local-provisions` listings improve weak-term depth

### Artifacts

| File | Purpose |
|------|---------|
| `scripts/_qa-catalog-fallback-retest.json` | Raw Playwright output (`9f741e4` P1 re-test) |

---

## P2 Search Refinement Plan / Results

**Branch:** `feat/vibevi-search-refinements-p2`  
**Files:** `src/lib/search/catalog-search.ts`, `src/lib/search/query-expansion.ts`

### Scoring changes

| Change | Detail |
|--------|--------|
| **Tiered matching** | Separate name / slug / category / island / description scores before final rank |
| **Description-only penalty** | Weak or zero score when query only hits description/source for ferry, water island, beach, food |
| **Short-term guard** | Terms ≤2 chars (e.g. `wi`) no longer match inside unrelated words like `usvi` or `brewing` |
| **Name match guard** | Name substring matches require term length ≥3 unless term equals full normalized query |
| **Ferry noise cut** | Removed `local-provisions` category boost on `ferry`; description-only ferry mentions excluded |
| **Food noise cut** | Breweries/museums capped when `food` intent only matches description |
| **Wellness honesty** | Non-`wellness-spas` listings excluded unless name contains spa/garden/wellness |
| **Water island focus** | Off-island description-only mentions excluded; WI listings boosted |

### Utility shortcut changes

| Query | New / improved shortcuts (prepended) |
|-------|----------------------------------------|
| `ferry` | `/ferry`, `/st-thomas/ferry-schedule`, `/st-john/ferry-schedule`, `/water-island/day-trip` |
| `cruise` | `/cruise-day`, `/experiences/cruise-day`, `/st-thomas/cruise-schedule`, Havensight + Crown Bay port guides |
| `things to do` | Added `/water-island/day-trip` to existing island guides + adventure experience |

Shortcuts use existing `LocalSearchResult` shape with `categoryName: Utility` — no UI change.

### Local QA before/after (noisy queries)

| Query | P1 top results | P2 top results |
|-------|----------------|----------------|
| `ferry` | Water Island Ferry; 81C Arts; museums | **USVI ferry board**; St. Thomas/St. John schedules; day trip; Water Island Ferry |
| `cruise` | Big Beard's; Coral World; museum | **USVI cruise-day guide**; cruise schedule; port guides; cruise-day experience |
| `water island` | Water Island Ferry; **Leatherback**; Dinghy's | Water Island Ferry; Dinghy's; Rachael's; VI Campground (**no Leatherback**) |
| `food` | …; **Leatherback Brewing**; … | Food tours + indulgent dining only (**no brewery**) |
| `wellness` | Magens Bay; Botanical Garden; **Tap Room** | Magens Bay; Botanical Garden only (**2 honest hits**) |

### Local success targets

| Metric | Result |
|--------|--------|
| HTTP 200 (catalog path) | Maintained — server action unchanged |
| Useful / guide-supported | **24 / 24** |
| Empty | **0 / 24** |

### Remaining known limitations

- `beach` — Magens Bay (wellness category) can appear for beach intent
- `cruise` — utility paths first; live cruise schedules still not in search index
- `wellness` — catalog has only 2 wellness-spas listings
- `ferry` — 5 results after noise cut (utilities + Water Island Ferry); fewer but cleaner

### Recommended next build (post-P2)

**Stop search work.** Shift to **Get Listed / claim flow / business-owner conversion** — the repeatable destination business engine.

---

## Production Re-Test After P2 Search Refinements

**Re-test date:** 2026-06-25  
**Deployed commit:** `25f251c` (merge of PR #5; includes `efceeb0`)  
**Vercel:** Production — **Success** on `project-archipel` @ `25f251c`; `project-archipel-zwhn` may lag one deploy behind  
**Endpoint:** `https://www.myvibevi.com/search`

### Executive summary

| Metric | P1 (`9f741e4`) | P2 (`25f251c`) |
|--------|----------------|----------------|
| **HTTP 200** | 24 / 24 | **24 / 24** |
| **Useful / guide-supported** | 24 / 24 | **24 / 24** |
| **Empty** | 0 / 24 | **0 / 24** |
| **HTTP 500** | 0 | **0** |

All P2 success targets met. No UI/design changes. No fake listings or invented claims.

### Noisy query before/after (production)

| Query | P1 top results | P2 top results |
|-------|----------------|----------------|
| `ferry` | Water Island Ferry; 81C Arts; museums | **St. John ferry schedule**; St. Thomas schedule; **USVI ferry board**; day trip; Water Island Ferry |
| `cruise` | Big Beard's; Coral World; museum | **St. Thomas cruise schedule**; **USVI cruise-day guide**; Crown Bay guide; cruise-day experience |
| `water island` | Water Island Ferry; **Leatherback Brewing**; Dinghy's | Water Island Ferry; Dinghy's; Rachael's; VI Campground (**no Leatherback**) |
| `food` | …; **Leatherback Brewing**; … | Food tours; 1864; Gladys' Cafe; Morgan's Mango (**no brewery**) |
| `wellness` | Magens Bay; Botanical Garden; **Tap Room** | Magens Bay; Botanical Garden only (**2 honest hits**) |
| `beach` | 1864; Estate Whim; brewery noise | Beach bars + Lovango + Magens Bay first (**no museum/brewery in top 5**) |

### Full production matrix

| Query | HTTP | Count | Notes |
|-------|------|-------|-------|
| beach | 200 | 12 | Beach bars + bay names first |
| beaches | 200 | 12 | Expanded from synonym layer |
| boat | 200 | 8 | Charter operators |
| charter | 200 | 12 | Strong |
| snorkel | 200 | 5 | Strong |
| food | 200 | 8 | Dining/food tours; brewery noise removed |
| restaurant | 200 | 5 | Strong |
| bite | 200 | 12 | Synonym expansion |
| bar | 200 | 10 | Nightlife bars |
| night | 200 | 12 | Nightlife-first ranking |
| nightlife | 200 | 12 | Good |
| family | 200 | 12 | Guide-first |
| cruise | 200 | 8 | **Utility paths first** (was 3 listings only) |
| ferry | 200 | 5 | **Utility paths first** (was 12 with museum noise) |
| st thomas | 200 | 12 | Island match |
| st john | 200 | 12 | Island match |
| st croix | 200 | 12 | Island match |
| water island | 200 | 4 | WI-only relevant listings |
| romantic | 200 | 12 | Guide-first |
| rainy day | 200 | 12 | Experience paths |
| wellness | 200 | 2 | Catalog-honest |
| shops | 200 | 12 | Category + experience paths |
| local shops | 200 | 12 | Category + experience paths |
| things to do | 200 | 12 | Guide-first incl. Water Island day trip |

### Remaining known limitations

- `beach` — Magens Bay (wellness category, bay in name) can appear for beach intent
- `wellness` — 2 catalog listings only
- `cruise` / `ferry` — utility pages surfaced; live schedule data not indexed in search
- `ferry` — 5 results (cleaner, fewer than P1's 12)

### Recommended next build task

**Get Listed / claim flow / business-owner conversion** — stop search work; turn VibeVI into a repeatable destination business engine.

### Artifacts

| File | Purpose |
|------|---------|
| `scripts/_qa-catalog-fallback-retest.json` | Raw Playwright output (`25f251c` P2 re-test) |

