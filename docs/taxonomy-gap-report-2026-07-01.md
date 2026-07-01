# VibeVI Taxonomy Gap Report

Date: 2026-07-01
Branch: `qa/category-location-scs-flow-audit`

## Current Core Categories

- `beaches`
- `excursions-charters`
- `indulgent-dining`
- `nightlife-rhythm`
- `local-provisions`
- `boutique-stays`
- `wellness-spas`

## Short Answer

The current category model is still usable, but `local-provisions` and `wellness-spas` are absorbing inventory that really belongs to a broader attraction/culture/garden/transport model.

## Questions Answered

### Do we need a `things to do` category?

Recommendation:

- Not as a core listing category right now.
- Keep `things to do` as a guide layer for now.

Reason:

- It is too broad to be a clean canonical home for listings.
- It works better as a browse/intent layer above listings than as the listing bucket itself.

### Do we need a `culture & history` category?

Recommendation:

- Strong candidate for a future category or route family.
- Do not implement in this branch.

Reason:

- Multiple museums, forts, ruins, and historic sites are being forced into `local-provisions`.
- This is the clearest taxonomy gap in the current model.

### Do we need a `shopping-local` category separate from `local-provisions`?

Recommendation:

- Strong candidate, but not urgent enough to force now.

Reason:

- `local-provisions` currently mixes:
  - galleries
  - markets
  - shopping villages
  - ferry utilities
  - museums
  - forts
  - ruins
- A future split between `shopping-local` and `culture-history` would make the browse model much cleaner.

### Do we need `family/rainy-day` as a category?

Recommendation:

- No.
- Keep this as a guide/intention layer.

Reason:

- It is a planning mode, not a listing type.
- Converting it into a listing category would create thin and awkward canonical pages quickly.

## What Is Being Forced Today

### Forced into `local-provisions`

- museums
- forts
- national historic sites
- botanical/cultural venues
- plantation ruins
- ferry logistics

### Forced into `wellness-spas`

- `Magens Bay Authority`
- `St. George Village Botanical Garden`

## What Should Happen Now vs Later

### Now

- Keep canonical category model stable.
- Do not migrate listings yet.
- Use guide/search improvements to reduce user confusion.
- Document the exact strained inventory.

### Later

- evaluate `culture-history`
- evaluate `shopping-local`
- possibly evaluate a utility/transport handling strategy for ferry-linked services

## Migration Risk If Categories Change Later

If new categories are introduced later, the project will need:

- canonical path migration
- redirect mapping for old profile routes
- sitemap update
- island-hub section update
- search ranking update
- QA for wrong-category and `/biz/` redirect integrity

## Recommendation

- Do not ship taxonomy restructuring in the same pass as this audit.
- Use this report as the gate for a separate taxonomy implementation plan.
