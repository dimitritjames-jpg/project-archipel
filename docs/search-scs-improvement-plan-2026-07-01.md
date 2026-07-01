# VibeVI Search + SCS Improvement Plan

Date: 2026-07-01
Branch: `plan/taxonomy-cleanup-from-audit`
Source inputs:
- `docs/scs-concierge-flow-audit-2026-07-01.md`
- `docs/search-intent-quality-audit-2026-07-01.md`
- `docs/taxonomy-gap-report-2026-07-01.md`

## Goal

Define the next low-risk search and SCS improvements without changing catalog data, canonical categories, or indexing policy yet.

## Current Read

Search is already strong when the intent is concrete:

- `spa`
- `water island`
- `beach st thomas`
- `beach st croix`
- `charter`

Search is weaker when the intent is broad, emotional, or island-summary oriented:

- `nightlife`
- `sunset`
- `market`
- `st thomas`
- `st croix`

SCS and island-first UX are no longer the main problem. The gap is underneath them:

- broad search intents still rank lexical matches too literally
- island-summary intent does not lead with the island hub strongly enough
- taxonomy strain leaks into result quality

## 1. Search / SCS Fixes Needed

### `nightlife`

Problem:
- lexical matches on `bar` can outrank cleaner nightlife inventory

Needed fix:
- add a nightlife-intent boost for:
  - `nightlife-rhythm` category entries
  - nightlife guide routes
  - island hubs when the query is island-qualified

Preferred result behavior:
- nightlife-first venues and nightlife guides should outrank incidental restaurant/gallery/bar-text matches

### `sunset`

Problem:
- lexical matches are beating experiential answers

Needed fix:
- add a sunset-intent shortcut layer that can surface:
  - beach guides
  - romantic dining guides
  - scenic beach/place listings
  - island sunset-friendly guides when they exist

Preferred result behavior:
- experience-led routes or obvious scenic listings should outrank unrelated listings that merely contain overlapping text

### `market`

Problem:
- named restaurants such as `Caribbean Fish Market` can outrank actual shopping/provisions intent

Needed fix:
- add negative/positive weighting so market intent favors:
  - `local-provisions`
  - genuine market/provision listings
  - shopping/provision guides if added later

Preferred result behavior:
- real market/provision listings should beat restaurant-name collisions

### `st thomas`

Problem:
- direct island-name query does not reliably lead with the island hub

Needed fix:
- exact island-name query mapping should prepend the matching island hub
- island-name-plus-browse-mode queries should prepend the relevant hub or island guide

Preferred result behavior:
- `/islands/st-thomas` should be the first visible result for direct `st thomas`

### `st croix`

Problem:
- same as `st thomas`

Needed fix:
- exact island-name query mapping should prepend `/islands/st-croix`

Preferred result behavior:
- `/islands/st-croix` should be the first visible result for direct `st croix`

## 2. Low-Risk Fixes That Can Be Done Soon

These are good candidates for a small follow-up branch:

- prepend island hubs for exact direct island queries:
  - `st thomas`
  - `st john`
  - `st croix`
  - `water island`
- add nightlife query weighting so `nightlife-rhythm` inventory and nightlife guides lead more often
- add market query weighting so true market/provisions inventory outranks restaurant-name collisions
- add a sunset guide/experience shortcut for exact `sunset` and close variants

These are low risk because they:

- do not require listing migration
- do not require route changes
- do not change indexing policy
- can be verified with narrow search QA

## 3. SCS Improvements Needed

The concierge layer should become slightly more explicit for broad intent without redesigning it.

Recommended SCS/search behavior improvements:

- when a user enters a direct island query, bias toward the island hub as the first handoff
- when a user enters a broad experiential query like `sunset` or `nightlife`, bias toward a guide or strong category-first result instead of a raw lexical business match
- when a query is thin or noisy, show a clearer island/category hint rather than pretending the result set is highly precise

Not recommended now:

- do not add a new homepage flow
- do not create fake AI concierge behavior
- do not claim personalized recommendation logic that does not exist

## 4. What Should Stay Guide-Led

These intents should remain guide/SCS-led, not forced into core listing-category logic:

- `things to do`
- `family`
- `rainy day`
- `romantic`
- most `sunset` handling

Reason:
- these are planning overlays across multiple listing types
- they become noisy quickly if treated as simple listing-category matches

## 5. What Search Should Eventually Learn After Taxonomy Cleanup

After a future `culture-history` category exists, search can improve further for:

- `museum`
- `history`
- `fort`
- `ruins`
- `cultural`
- `things to do`

After any future `shopping-local` split, search can improve further for:

- `market`
- `shops`
- `local shops`
- `gifts`
- `gallery`

## 6. What Should Be Done Now vs Later

### Do now

- keep current taxonomy stable
- add small search mapping/weighting improvements only
- keep island-first concierge behavior as the preferred first handoff
- document known weak/noisy intents honestly

### Do next

- exact island-name hub boosting
- nightlife weighting refinement
- market weighting refinement
- sunset guide/experience shortcut

### Do later

- taxonomy-aware search upgrades after `culture-history`
- broader shopping-intent search refinement after deciding `shopping-local`
- better downstream island-specific ranking after the first result for `things to do ...`

## 7. Suggested QA Set For The Next Search Pass

Core checks:

- `/search?q=st%20thomas`
- `/search?q=st%20croix`
- `/search?q=nightlife`
- `/search?q=sunset`
- `/search?q=market`
- `/search?q=spa`
- `/search?q=water%20island`
- `/search?q=beach%20st%20thomas`
- `/search?q=beach%20st%20croix`

Expected:

- island queries lead with island hubs
- nightlife improves without hurting strong bar/nightlife queries
- market improves without restaurant-name collisions taking over
- sunset becomes more experiential and less lexical
- strong existing searches do not regress

## Final Recommendation

The next search/SCS branch should stay low risk and intent-specific:

- improve direct island-name routing into island hubs
- reduce lexical false positives for `nightlife`, `sunset`, and `market`
- keep planning-mode intents guide-led
- wait for taxonomy migration before attempting deeper cultural/shopping search cleanup
