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

