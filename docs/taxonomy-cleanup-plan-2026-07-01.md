# VibeVI Taxonomy Cleanup Plan

Date: 2026-07-01
Branch: `plan/taxonomy-cleanup-from-audit`
Source inputs:
- `docs/category-location-audit-2026-07-01.md`
- `docs/scs-concierge-flow-audit-2026-07-01.md`
- `docs/search-intent-quality-audit-2026-07-01.md`
- `docs/taxonomy-gap-report-2026-07-01.md`

## Goal

Turn the Phase 2 audit into a decision plan without migrating listings yet.

## Executive Decision

- Do not migrate canonical listing categories in this branch.
- Keep `things-to-do` as a guide layer, not a listing category.
- Keep `family` and `rainy-day` as guide layers, not listing categories.
- Plan for a future `culture-history` category.
- Delay a `shopping-local` split until after `culture-history` exists and the remaining true-shop inventory can be evaluated cleanly.

## 1. Listings That Currently Feel Misfit Under `local-provisions`

These listings are source-valid, but their current category fit is strained:

### Strong `culture-history` candidates

- `Fort Christian Museum`
- `Pirates Treasure Museum`
- `Virgin Islands Children's Museum`
- `Christiansted National Historic Site`
- `Estate Whim Museum`
- `Fort Frederik`
- `Salt River Bay National Historical Park and Ecological Preserve`
- `Fort Segarra`
- `Caribbean Museum Center for the Arts`

### Historic/ruins candidates

- `Carolina Point Plantation Ruins`

### Utility / transport outlier

- `Water Island Ferry`

## 2. Should VibeVI Create `culture-history`?

Recommendation:
- Yes, but in a separate implementation branch.

Reason:
- This is the clearest taxonomy gap in the live catalog.
- Museums, forts, ruins, historic sites, and art/cultural institutions are currently making `local-provisions` feel less trustworthy than the UI and search layer deserve.
- The same problem also explains why some island hub sections feel less intentional even when the page layout is correct.

Recommended scope for a future `culture-history` category:
- museums
- forts
- historic sites
- plantation/ruin sites
- cultural institutions
- national historic park inventory where the user intent is educational, scenic, or heritage-led

Not recommended:
- Do not fold ferry/transport into `culture-history`.
- Do not move broad garden/outdoor attraction inventory here automatically without reviewing intent and route fit.

## 3. Should VibeVI Create `shopping-local`?

Recommendation:
- Probably yes later, but not before `culture-history`.

Reason:
- Right now `local-provisions` is overloaded for two different reasons:
  - true local shopping/provisions/galleries/markets
  - non-shopping cultural and transport inventory
- The first cleanup move should remove the obvious non-shop inventory into `culture-history`.
- Only after that should we decide whether the remaining shop-like inventory is still too broad and should split into `shopping-local`.

What would likely stay in `local-provisions` even after a future cleanup:
- markets
- provision stops
- practical island shopping
- gift/local goods if useful on-trip

What might move into `shopping-local` later if needed:
- galleries with strong retail intent
- boutiques
- shopping centers/villages
- jewelry/maker inventory

## 4. Should `things-to-do` Remain a Guide Layer or Become a Category?

Recommendation:
- Keep `things-to-do` as a guide layer.

Reason:
- It is an intent umbrella, not a stable listing type.
- Making it a category now would create a duplicate-canonical problem quickly because beaches, charters, museums, shops, nightlife, and family activities would all qualify.
- It works better as:
  - island guides
  - day-trip guides
  - search/SCS shortcuts
  - curated landing pages later

When to revisit:
- Only if VibeVI creates clean static landing pages like `/islands/st-thomas/things-to-do` with original copy, strong internal structure, and no duplicate conflict with listing categories.

## 5. Should `family` / `rainy-day` Remain a Guide Layer?

Recommendation:
- Yes.

Reason:
- These are planning modes, not listing types.
- Turning them into canonical listing categories would produce thin, awkward pages and force many listings into overlapping buckets.
- They already work better as:
  - search intents
  - guide topics
  - recommendation overlays across multiple categories

## 6. Sitemap Impact If Categories Change Later

If listings are re-categorized into new canonical categories:

- The total number of profile URLs should stay roughly flat if each listing still has exactly one canonical profile URL.
- The sitemap count would not increase from profile pages alone if this is a one-for-one canonical path migration.
- The sitemap count would increase if VibeVI also adds new static hub/category landing pages, for example:
  - `/st-thomas/culture-history`
  - `/st-john/culture-history`
  - `/st-croix/culture-history`
  - `/water-island/culture-history`

Expected sitemap effects by migration type:

### Category migration only

- Profile count: unchanged
- Sitemap count: likely unchanged
- Changed URLs: yes

### Category migration plus new island/category pages

- Profile count: unchanged
- Sitemap count: increases by the number of new static category pages that are intentionally indexed

### Query-only filter approach

- No sitemap gain should occur because filtered query URLs should stay out of the sitemap

## 7. Redirects Needed If Canonical Profile Paths Change

If a listing moves from one canonical category to another, VibeVI will need a deterministic redirect map:

- old canonical:
  - `/{island}/{oldCategorySlug}/{businessSlug}`
- new canonical:
  - `/{island}/{newCategorySlug}/{businessSlug}`

Required redirect behavior:

- old canonical path should `308` redirect to the new canonical path
- existing `/[island]/biz/[slug]` alias should still resolve to the new canonical path
- wrong-category routes should continue to `308` to the canonical path or `404` if no safe target exists

QA required when this happens:

- sitemap contains only new canonical profile URLs
- no old canonical paths remain in sitemap
- metadata canonical points to the new path
- island hubs link to the new category path consistently
- search results link to the new canonical path

## 8. What Should Be Done Now vs Later

### Do now

- Keep the live category model stable.
- Document the strained placements explicitly.
- Improve search/SCS behavior beneath the taxonomy rather than forcing premature canonical moves.
- Treat `culture-history` as the leading candidate for the first real taxonomy migration branch.

### Do next

- Create a dedicated implementation branch for taxonomy migration planning with:
  - exact listings to move
  - target category definitions
  - redirect map
  - sitemap delta estimate
  - island hub section changes
  - search ranking checks

### Do later

- Reassess whether `shopping-local` is still needed after `culture-history` is carved out.
- Decide whether ferry/transport needs:
  - a utility handling pattern
  - guide treatment
  - or continued exception placement

## Recommended Migration Sequence

1. Add search/SCS improvements first.
2. Introduce `culture-history` as the first taxonomy change.
3. Migrate only the clearest cultural/historic misfits.
4. Re-check `local-provisions` after that smaller move.
5. Decide whether a `shopping-local` split is still worth the complexity.

## Final Recommendation

The audit does not justify a broad taxonomy rewrite yet. It does justify one focused future migration:

- first future taxonomy candidate: `culture-history`
- keep `things-to-do`, `family`, and `rainy-day` as guide/search layers
- delay `shopping-local` until after the cultural/historic cleanup clarifies what remains
