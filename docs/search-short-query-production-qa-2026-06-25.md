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
