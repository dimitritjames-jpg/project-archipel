# VibeVI Catalog Depth Sprint 4 Audit (2026-06-30)

Scope:
- `data/public-info-businesses-batch-1-approved.json`
- `data/public-info-businesses-batch-2-approved.json`
- `src/lib/businesses/public-info-catalog.ts`
- `src/lib/search/query-expansion.ts`
- `src/lib/search/catalog-search.ts`

Date: 2026-06-30
Listings before: 127
Listings after: 160
Net new listings added: 33

## Counts by Island
| Item | Before | After | Delta |
| --- | --- | --- | --- |
| St. Thomas | 46 | 56 | 10 |
| St. John | 37 | 42 | 5 |
| St. Croix | 38 | 53 | 15 |
| Water Island | 6 | 9 | 3 |

## Counts by Category
| Item | Before | After | Delta |
| --- | --- | --- | --- |
| beaches | 26 | 34 | 8 |
| excursions-charters | 32 | 32 | 0 |
| indulgent-dining | 21 | 21 | 0 |
| nightlife-rhythm | 22 | 29 | 7 |
| local-provisions | 19 | 28 | 9 |
| boutique-stays | 5 | 5 | 0 |
| wellness-spas | 2 | 11 | 9 |

## Counts by Listing Type
| Item | Before | After | Delta |
| --- | --- | --- | --- |
| business-listing | 101 | 126 | 25 |
| place-listing | 26 | 34 | 8 |

## Sprint 4 Additions by Island
| Island | Added | Notes |
| --- | --- | --- |
| St. Thomas | 10 | Wellness, nightlife, one beach, and stronger local-shops coverage |
| St. John | 5 | Wellness, nightlife, and one shop listing |
| St. Croix | 15 | Biggest gain: wellness, nightlife, family/rainy-day, and beach depth |
| Water Island | 3 | Honest max strong set this pass without padding weaker sources |

## Sprint 4 Additions by Category
| Category | Added | Notes |
| --- | --- | --- |
| wellness-spas | 9 | Main Sprint 4 trust fix |
| local-provisions | 9 | Shops, galleries, historic/cultural, family/rainy-day support |
| beaches | 8 | Mostly St. Croix plus one Water Island and one St. Thomas addition |
| nightlife-rhythm | 7 | Stronger St. Thomas, St. John, and St. Croix evening coverage |

## Search-Intent Coverage Gains

Improved directly:
- `water island`
- `spa`
- `massage`
- `wellness`
- `nightlife`
- `live music`
- `bar`
- `local shops`
- `gifts`
- `family`
- `kids`
- `rainy day`
- `beach st thomas`
- `beach st croix`
- `sunset`

## Catalog QA

- Duplicate slug check: pass
- Invalid category check: pass
- Missing required field check: pass
- Sample new profile route check: pass
- Search page `noindex,follow`: pass
- Combined sitemap count: `194 -> 227` (`+33`)
- Local production-style canonical check with `NEXT_PUBLIC_SITE_URL=https://www.myvibevi.com`: pass
- Localhost leakage under production-style local start: pass

## Route QA

Verified `200` locally:
- `/`
- `/search`
- `/search?q=water%20island`
- `/search?q=spa`
- `/search?q=nightlife`
- `/search?q=local%20shops`
- `/search?q=family`
- `/search?q=rainy%20day`
- `/islands/st-thomas`
- `/islands/st-john`
- `/islands/st-croix`
- `/islands/water-island`
- `/sitemap.xml`

Verified `200` on sample new profile routes:
- `/st-thomas/wellness-spas/prana-spa`
- `/st-thomas/nightlife-rhythm/the-greenhouse-restaurant-bar`
- `/st-thomas/beaches/bolongo-bay`
- `/st-thomas/local-provisions/shops-at-yacht-haven-grande`
- `/st-john/wellness-spas/mango-bliss-spa`
- `/st-john/local-provisions/pink-papaya`
- `/st-croix/wellness-spas/pampered-vi-day-spa`
- `/st-croix/nightlife-rhythm/st-croix-cellars`
- `/st-croix/beaches/grapetree-beach`
- `/water-island/beaches/limestone-beach`
- `/water-island/local-provisions/carolina-point-plantation-ruins`

## Search QA Summary

- `spa`, `massage`, and `wellness` now return 11 results instead of the prior 2-listing wellness wall
- `water island` now returns 9 results, up from 6, with new profile depth beyond ferry + Honeymoon + fort
- `beach st thomas` and `beach st croix` were re-ranked to correctly surface beach profiles first
- `local shops` improved materially, though the current schema still blends retail, galleries, and cultural stops together
- `things to do st croix` and `things to do st thomas` still read broad because they intentionally mix guides, beaches, and experiences

## Remaining Gaps

- Water Island did not support the desired `+5` strong additions without weakening source quality; this pass stopped at `+3`
- St. John still lags St. Thomas and St. Croix in local-shop and nightlife depth
- `spa` results are much stronger, but legacy wellness listings like Magens Bay Authority and St. George Village Botanical Garden still appear because the wellness category remains broad
- `things to do ...` island-qualified queries remain useful but broad rather than tightly vertical

## Recommendation for Sprint 5

Focus next on:
1. Water Island service depth if stronger public sources emerge
2. St. John nightlife and local shops
3. Dedicated family/rainy-day cultural depth on St. Thomas and St. Croix
4. Search-result quality for broad island-qualified intent, especially `things to do ...`
