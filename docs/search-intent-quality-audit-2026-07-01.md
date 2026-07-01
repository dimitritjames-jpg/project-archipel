# VibeVI Search Intent Quality Audit

Date: 2026-07-01
Branch: `qa/category-location-scs-flow-audit`

## Summary

This pass reviewed island, category, and visitor-mode search intent against the local search stack after Sprint 5.

## Low-Risk Fixes Included In This Branch

Files:

- [src/lib/search/query-expansion.ts](C:/Users/dimit/.cursor/projects/project-archipel/src/lib/search/query-expansion.ts)
- [src/lib/search/catalog-search.ts](C:/Users/dimit/.cursor/projects/project-archipel/src/lib/search/catalog-search.ts)

Changes:

- island-specific `things to do ...` queries now prepend the matching island guide/day-trip shortcut
- exact `cruise day` now prepends the main cruise-day guide instead of returning zero results

## Query Quality Snapshot

### Strong

- `beach st thomas`
  - top results are all St. Thomas beaches
- `beach st croix`
  - top results are all St. Croix beaches
- `spa`
  - strong wellness-first results
- `water island`
  - now clearly returns Water Island inventory first
- `charter`
  - strong charter/operator results
- `rainy day`
  - useful guide/category-first mix

### Improved In This Branch

- `things to do st thomas`
  - now leads with `Things to do on St. Thomas`
- `things to do st john`
  - now leads with `Things to do on St. John`
- `things to do st croix`
  - now leads with `Things to do on St. Croix`
- `things to do water island`
  - now leads with `Water Island day trip`
- `cruise day`
  - now leads with `USVI cruise-day guide`

### Useful But Still Noisy

- `family`
  - guide-first result is good, but later results still wander
- `romantic`
  - the guide/experience lead is useful, but downstream ranking is mixed
- `local shops`
  - category-first results are acceptable, but this is also a signal that taxonomy is carrying too much weight

### Weak / Misleading

- `nightlife`
  - current top result: `Bajo el Sol Gallery Art Bar Cafe Rum Shop`
  - issue: lexical match on `bar` beats cleaner nightlife-first inventory
- `sunset`
  - current top result: `Bajo el Sol Gallery Art Bar Cafe Rum Shop`
  - issue: lexical match beats stronger beach/dining/romantic intent
- `market`
  - current top result: `Caribbean Fish Market`
  - issue: restaurant name beats actual provision/market intent
- `st thomas`
  - does not lead with the island hub
- `st croix`
  - does not lead with the island hub

### Zero / Thin

- `near me`
- `authentic`
- `quiet beach`
- `best beach`

These are not necessarily bugs, but they are not yet concierge-quality.

## Selected Query Notes

### Island intent

- `st john`
  - feels more coherent than `st thomas` or `st croix`
  - the island already has a strong identity in the catalog
- `water island`
  - small but coherent

### Category intent

- `beach`, `charter`, `spa`, `massage`
  - generally useful
- `nightlife`, `market`
  - still too lexical

### Visitor-mode intent

- `things to do`
  - useful because guide shortcuts exist
- island-specific `things to do ...`
  - now better, but downstream results after the first guide still spill across islands
- `family`, `romantic`, `rainy day`
  - useful enough to keep, but still better as guide-led behavior than as raw listing relevance

## Recommended Search Priorities

### Next low-risk improvements

- prioritize island hubs more aggressively for direct island-name queries
- improve nightlife weighting so nightlife-category entries beat incidental `bar` text
- improve market weighting so real provision/market inventory beats restaurant names

### Later, after taxonomy work

- better treatment of `culture`, `history`, `museum`, `fort`, `things to do`
- clearer distinction between shops, attractions, and cultural stops

