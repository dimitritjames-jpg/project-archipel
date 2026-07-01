# VibeVI Culture-History Taxonomy Migration

Date: 2026-07-01
Branch: `feat/culture-history-taxonomy-migration`

## Goal

Create a dedicated `culture-history` category and move the clearest culture/history listings out of `local-provisions` without changing the broader taxonomy model.

## Taxonomy Rationale

This migration addresses the most obvious taxonomy strain identified in the Phase 2 audit:

- museums
- forts
- historic sites
- cultural institutions
- plantation ruins

These were valid public-info listings, but `local-provisions` was the wrong canonical home for them. Moving them into `culture-history` makes:

- profile routes cleaner
- island hubs more legible
- local-provisions more retail-focused
- culture/history intent easier for search and SCS to understand

## Category Added

- Slug: `culture-history`
- Label: `Culture & History`
- Visitor framing: museums, forts, historic places, cultural landmarks, ruins, and heritage stops

## Listings Moved

### St. Thomas

- `Fort Christian Museum`
- `Pirates Treasure Museum`
- `Virgin Islands Children's Museum`

### St. Croix

- `Christiansted National Historic Site`
- `Estate Whim Museum`
- `Fort Frederik`
- `Salt River Bay National Historical Park and Ecological Preserve`
- `Caribbean Museum Center for the Arts`

### Water Island

- `Fort Segarra`
- `Carolina Point Plantation Ruins`

## Listings Explicitly Not Moved

- `Water Island Ferry`

Reason:
- This is a transit/logistics utility listing, not a culture-history listing.
- It still needs separate handling later rather than being forced into a heritage bucket.

## Path Migration Table

| Listing | Old canonical path | New canonical path |
| --- | --- | --- |
| Fort Christian Museum | `/st-thomas/local-provisions/fort-christian-museum` | `/st-thomas/culture-history/fort-christian-museum` |
| Pirates Treasure Museum | `/st-thomas/local-provisions/pirates-treasure-museum` | `/st-thomas/culture-history/pirates-treasure-museum` |
| Virgin Islands Children's Museum | `/st-thomas/local-provisions/virgin-islands-childrens-museum` | `/st-thomas/culture-history/virgin-islands-childrens-museum` |
| Christiansted National Historic Site | `/st-croix/local-provisions/christiansted-national-historic-site` | `/st-croix/culture-history/christiansted-national-historic-site` |
| Estate Whim Museum | `/st-croix/local-provisions/estate-whim-museum` | `/st-croix/culture-history/estate-whim-museum` |
| Fort Frederik | `/st-croix/local-provisions/fort-frederik` | `/st-croix/culture-history/fort-frederik` |
| Salt River Bay National Historical Park and Ecological Preserve | `/st-croix/local-provisions/salt-river-bay-national-historical-park-ecological-preserve` | `/st-croix/culture-history/salt-river-bay-national-historical-park-ecological-preserve` |
| Fort Segarra | `/water-island/local-provisions/fort-segarra` | `/water-island/culture-history/fort-segarra` |
| Caribbean Museum Center for the Arts | `/st-croix/local-provisions/caribbean-museum-center-for-the-arts` | `/st-croix/culture-history/caribbean-museum-center-for-the-arts` |
| Carolina Point Plantation Ruins | `/water-island/local-provisions/carolina-point-plantation-ruins` | `/water-island/culture-history/carolina-point-plantation-ruins` |

## Redirect Behavior

Verified locally on the production build:

- each new canonical culture-history profile URL returns `200`
- each old `local-provisions` profile URL returns `308` to the new culture-history canonical
- each `/[island]/biz/[slug]` alias returns `308` to the new culture-history canonical
- sampled wrong-category routes return `308` to the new culture-history canonical

Sample wrong-category redirect checks:

- `/st-thomas/indulgent-dining/fort-christian-museum` -> `308` -> `/st-thomas/culture-history/fort-christian-museum`
- `/st-croix/nightlife-rhythm/estate-whim-museum` -> `308` -> `/st-croix/culture-history/estate-whim-museum`
- `/water-island/wellness-spas/fort-segarra` -> `308` -> `/water-island/culture-history/fort-segarra`

## Catalog Count Impact

- Total catalog listings: `179` -> `179`
- `culture-history`: `0` -> `10`
- `local-provisions`: `33` -> `23`

Other category totals were unchanged.

## Sitemap Impact

- Sitemap count before: `246`
- Sitemap count after migration: `249`

Reason:
- profile URLs stayed one-for-one, with old local-provisions canonicals replaced by new culture-history canonicals
- the count increased by `3` because `culture-history` is now a core category and adds these indexable island category routes:
  - `/st-thomas/culture-history`
  - `/st-croix/culture-history`
  - `/water-island/culture-history`
- `/st-john/culture-history` remains user-accessible but is intentionally excluded from sitemap because it has no migrated culture-history listings today

Sitemap QA:

- no `/biz/` aliases present
- no filtered island query URLs present
- old moved `local-provisions` canonical profile URLs removed
- only index-worthy `culture-history` category routes present
- `/st-john/culture-history` excluded from sitemap

### Branch follow-up after migration

This branch later picked up two additional baseline-completion fixes without changing the catalog totals:

- added `/water-island/things-to-do` as a real guide route instead of leaving Water Island dependent on `/water-island/day-trip` alone
- added low-risk search-routing improvements so direct island queries and documented July 1 island-qualified intents lead with the correct island or category route above the fold

Current branch sitemap count after those follow-ups: `250`

Reason for the extra `+1` beyond the migration-only count:

- `/water-island/things-to-do` is now a real public guide route and is intentionally included in sitemap generation

## Category Route Indexing Policy

Policy chosen for `culture-history`:

- user-accessible routes still return `200`
- category routes need at least `2` real listings to be indexable
- routes below that threshold stay `noindex, follow`
- only indexable category routes appear in sitemap

Per-island result:

| Route | Listing count | Indexing |
| --- | ---: | --- |
| `/st-thomas/culture-history` | 3 | `index, follow` |
| `/st-john/culture-history` | 0 | `noindex, follow` |
| `/st-croix/culture-history` | 5 | `index, follow` |
| `/water-island/culture-history` | 2 | `index, follow` |

Why this policy:

- St. Thomas, St. Croix, and Water Island now have enough real inventory to justify a crawlable category directory.
- St. John does not. Keeping it live but non-indexable avoids a thin SEO page while preserving UX consistency and future expansion room.

## Search QA

### Improved / useful

- `culture`
  - top result: `/st-croix/culture-history`
- `history`
  - top result: `/st-croix/culture-history`
- `museum`
  - top result: `/st-croix/culture-history`
- `fort`
  - top result: `/st-croix/culture-history`
- `ruins`
  - top result: `/water-island/culture-history`
- `market`
  - top result: `/st-thomas/local-provisions/moes-fresh-market`
- `things to do st thomas`
  - top result: `/st-thomas/things-to-do`
- `things to do st croix`
  - top result: `/st-croix/things-to-do`
- `things to do st john`
  - top result: `/st-john/things-to-do`
- `things to do water island`
  - top result: `/water-island/things-to-do`
- `st thomas`
  - top result: `/islands/st-thomas`
- `st croix`
  - top result: `/islands/st-croix`
- `nightlife`
  - top result: `/experiences/nightlife`
- `sunset`
  - top result: `/guides/best-beaches-usvi`
- `food st croix`
  - top result: `/st-croix/indulgent-dining`
- `boating st thomas`
  - top result: `/st-thomas/excursions-charters`
- `nightlife st thomas`
  - top result: `/st-thomas/nightlife-rhythm`
- `sunset st thomas`
  - top result: `/st-thomas/things-to-do`
- `market st croix`
  - top result: `/st-croix/local-provisions`
- `local shops st croix`
  - top result: `/st-croix/local-provisions`
- `culture history st john`
  - top result: `/st-john/culture-history`

### Still acceptable / guide-led

- `rainy day`
  - top result remains guide-led: `/experiences/culinary`
  - culture-history routes now surface in the visible results set, which is a better fit than the old local-provisions-only structure

### Existing strong searches preserved

- `spa`
  - top result remained a wellness listing
- `beach st thomas`
  - top result remained a St. Thomas beach
- `beach st croix`
  - top result remained a St. Croix beach
- `water island`
  - top result remained Water Island inventory
- `local shops`
  - top result remained a local-provisions route

### Still weak / noisy

- `nightlife`
  - broad nightlife intent still leads with `Bajo el Sol Gallery Art Bar Cafe Rum Shop`
  - this remains a separate search-ranking issue, not a taxonomy-migration defect

## Island / Category Surface Changes

- `Culture & History` is now a first-class category in category lists and search category chips
- island hubs expose `Historic / Cultural Stops` as a direct category-backed section where listings exist
- local shops copy no longer presents museums and forts as if they were normal retail inventory

## SEO / Indexing Safety

Validated locally:

- `/search` remains `noindex, follow`
- base island hubs remain `index, follow`
- `/st-thomas/culture-history`, `/st-croix/culture-history`, and `/water-island/culture-history` are `index, follow`
- `/st-john/culture-history` is `noindex, follow`
- moved profile canonicals point to `/{island}/culture-history/{slug}`
- wrong-category redirects remain intact
- `/biz/` aliases still redirect to canonical profiles

Validated with simulated Vercel build:

- build run with `VERCEL=1`
- build run with deliberately bad `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- rendered canonicals, OG URLs, sitemap URLs, and robots sitemap still used `https://www.myvibevi.com`
- no localhost leakage found in sampled rendered output under that simulated Vercel runtime

## Remaining Items Not Moved

### Leave for later transit/utility handling

- `Water Island Ferry`

### Leave for later wellness cleanup

- `Magens Bay Authority`
- `St. George Village Botanical Garden`

### Leave for later shopping-local decision

- galleries, boutiques, retail villages, and maker-heavy shop inventory that still belong under `local-provisions` for now

## Recommendation

This migration is the right first taxonomy cut:

- it fixes the clearest canonical misfit set
- it preserves route integrity
- it improves culture/history intent handling
- it makes local-provisions more coherent without forcing a premature `shopping-local` split

The next taxonomy decision should not be another broad move. It should be:

1. decide whether thin `culture-history` island directories like `/st-john/culture-history` should remain indexable
2. evaluate remaining `local-provisions` inventory for a later `shopping-local` split
3. decide where transit/utility inventory like `Water Island Ferry` belongs long term
