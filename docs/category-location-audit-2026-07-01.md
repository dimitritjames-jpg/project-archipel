# VibeVI Category + Location Audit

Date: 2026-07-01
Branch: `qa/category-location-scs-flow-audit`

## Scope

- Audited the current approved public-info catalog after Sprint 5.
- Catalog source of truth: `data/public-info-businesses-batch-1-approved.json` through `batch-3-approved.json`.
- Current live-count target in code: `179` public-info listings.
- Audit focus:
  - island assignment
  - category assignment
  - slug/path integrity
  - obvious duplicate risk
  - obvious taxonomy strain
  - description/trust fit

## Current Catalog Counts

- Total listings: `179`
- Duplicate slugs found: `0`

### By island

- `STX`: `61`
- `STT`: `59`
- `STJ`: `49`
- `WI`: `10`

### By category

- `beaches`: `34`
- `local-provisions`: `33`
- `excursions-charters`: `32`
- `nightlife-rhythm`: `29`
- `indulgent-dining`: `22`
- `boutique-stays`: `18`
- `wellness-spas`: `11`

## Integrity Findings

### Strong

- No duplicate slug collisions were found in the approved catalog batches.
- No obvious island-code failures were found in the current loader path.
- Beach depth outside St. John is materially better than earlier baselines.
- Water Island now has a usable base set instead of a token presence.

### Pressure Points

- `local-provisions` is carrying too many non-shop, non-market, non-maker listings.
- `wellness-spas` contains at least two listings that read more like attraction/guide inventory than wellness businesses.
- Island-intent searches still do not consistently lead with island hubs or island summary pages.

## Listings That Look Taxonomically Forced

These are not necessarily wrong enough to move in this audit branch, but they are strong evidence that the taxonomy is under strain.

### `local-provisions` carrying culture/history/transport

- `Fort Christian Museum`
- `Pirates Treasure Museum`
- `Virgin Islands Children's Museum`
- `Christiansted National Historic Site`
- `Estate Whim Museum`
- `Fort Frederik`
- `Salt River Bay National Historical Park and Ecological Preserve`
- `Fort Segarra`
- `Carolina Point Plantation Ruins`
- `Water Island Ferry`
- `Caribbean Museum Center for the Arts`

### `wellness-spas` carrying non-wellness attractions

- `Magens Bay Authority`
- `St. George Village Botanical Garden`

## Island Notes

### St. Thomas

- Core beach coverage is now credible.
- Search/search-intent still tends to elevate named businesses over the broader island guide.
- Culture/family inventory exists, but much of it currently lives under `local-provisions`.

### St. John

- Beach and charter inventory is the strongest island/category match in the catalog.
- St. John reads cleanly in user intent because the island already has a strong beach + park identity.
- `local-provisions` still mixes true shops with shopping villages and gallery hybrids, but the fit is less strained than on St. Croix.

### St. Croix

- Biggest inventory total.
- Strong beach improvement.
- Stronger dining/nightlife depth than before.
- Highest taxonomy strain in `local-provisions` because historic, cultural, and museum inventory has nowhere better to live yet.

### Water Island

- Inventory has meaningful day-trip coverage now.
- The island is still structurally thin.
- `local-provisions` is doing too much work by holding ferry, ruins, fort context, and rentals together.

## Route + Slug Integrity

- No duplicate slugs found in approved data.
- No obvious category/path mismatch was found from the catalog-side audit.
- No evidence from this pass that current profile slugs themselves need immediate correction.

## Low-Risk Changes Made In This Branch

- None to listing data or category assignments yet.
- Reason: the biggest issues are taxonomy-model issues, not obvious one-line data-entry mistakes.

## Recommended Next Moves

### Now

- Keep current category model stable for this branch.
- Document strained placements rather than forcing risky canonical-path changes.
- Improve search intent handling where low-risk query mapping can help without changing taxonomy.

### Later

- Revisit `local-provisions` after a taxonomy decision on `culture-history` and `shopping-local`.
- Revisit `wellness-spas` after deciding whether gardens/beach authorities belong in a guide layer or a new attraction layer.

