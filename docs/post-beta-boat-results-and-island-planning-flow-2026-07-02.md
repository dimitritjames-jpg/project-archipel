# Post-Beta Boat Results And Island Planning Flow

## Root Cause

Two separate issues were still making the public-beta flow feel too broad:

1. Boat-intent search only had strict scoring for a few exact queries such as `boat` and `charter`.
   Variants like `boat st thomas`, `private charter`, `boat day`, and `catamaran` fell back into looser lexical matching.
2. Broad intent paths were still letting users jump from a mood choice straight into mixed-island results instead of choosing the island first.

## What Changed

### Boat-result filtering and scoring

- Added shared search-intent detection for broad planning intents and explicit boat-intent recognition.
- Tightened boat-intent ranking for:
  - `boat`
  - `boating`
  - `charter`
  - `boat charter`
  - `private charter`
  - `snorkel charter`
  - `sunset sail`
  - `boat day`
  - `yacht`
  - `catamaran`
- For boat intent:
  - real charter and sailing operators now lead
  - `excursions-charters` is strongly preferred when the listing actually reads like a boat operator
  - harbor/marina utility listings are heavily demoted
  - `tours-activities` only stays in play when the listing has explicit water/boat signals
  - attractions, food tours, zipline, Skyride, Coral World, culture/history, retail, dining, nightlife, wellness, and stays are blocked from leading boat-intent results unless the listing genuinely reads like a boat operator
- Island-specific boat queries now hard-scope to the requested island instead of leaking mixed-island operators into the result set.
- Water Island remains honest:
  - if the user asks for `boat water island`, the top route falls back to Water Island day-trip guidance instead of pretending off-island charters are local Water Island operators

### Island-first planning chooser

- Added a reusable search-page island chooser for strong planning intents.
- The chooser now appears on broad and island-specific intent searches where it helps users narrow the plan:
  - boat
  - beach
  - food
  - nightlife
  - attractions
  - culture/history
  - wellness
  - stays
  - local shops / market / gifts
  - family
  - rainy day
- The chooser routes to the most useful island-first destination for that intent:
  - clean category routes where they are strong
  - island-specific search queries for boat intent
  - honest guide/day-trip fallbacks for thin Water Island or St. John cases

### Homepage planning flow

- Updated homepage `Beach`, `Boat`, `Bite`, and `Night` cards to enter the planning flow through:
  - `/search?q=beach`
  - `/search?q=boat`
  - `/search?q=food`
  - `/search?q=nightlife`
- This keeps the existing homepage structure but makes the next step island-first instead of dropping users straight into a mixed-island destination.

## Local Routes Checked

### Intent routes

- `/search?q=boat`
- `/search?q=boat%20st%20thomas`
- `/search?q=boat%20st%20john`
- `/search?q=boat%20st%20croix`
- `/search?q=boat%20water%20island`
- `/search?q=charter`
- `/search?q=yacht`
- `/search?q=catamaran`
- `/search?q=snorkel%20charter`
- `/search?q=sunset%20sail`
- `/search?q=beach`
- `/search?q=food`
- `/search?q=nightlife`
- `/search?q=attractions`
- `/search?q=coral%20world`

### Regression checks

- `/search?q=spa`
- `/search?q=market`
- `/search?q=claim%20listing`
- `/search?q=cruise%20day`
- `/search?q=family`
- `/search?q=rainy%20day`

### Core / SEO checks

- `/`
- `/search`
- `/islands/st-thomas`
- `/st-thomas/attractions`
- `/st-thomas/attractions/coral-world-ocean-park`
- `/sitemap.xml`
- `/robots.txt`

## Local QA Summary

### Boat intent

- `boat` top result: `Big Beard's Adventure Tours`
- `boat st thomas` top result: `Caribbean Blue Boat Charters`
- `boat st john` top result: `Kekoa Sailing Charters`
- `boat st croix` top result: `Big Beard's Adventure Tours`
- `boat water island` top result: `Water Island day-trip planning`
- Island chooser rendered on all checked broad boat and island-specific boat routes.
- Checked non-boat contaminants were not present in rendered boat-result pages:
  - Coral World Ocean Park
  - Skyride to Paradise Point
  - Tree Limin' Extreme Zipline
  - Flavors of St. Thomas Food Tours
  - Virgin Islands Food Tours

### Other intent checks

- `food` rendered the island chooser and kept food-led results.
- `nightlife` rendered the island chooser and kept nightlife guidance/results.
- `attractions` rendered the island chooser and kept attraction-led results.
- `coral world` still resolved to `Coral World Ocean Park` and did not render the boat chooser.
- `claim listing` remained owner-intent and did not render the island chooser.
- `cruise day` remained cruise-guide-led and did not render the island chooser.

## Sitemap / Indexing / Trust

- `/search` remains `noindex, follow`
- sitemap count remains `253`
- no filtered query URLs were added to the sitemap
- canonical host remains `https://www.myvibevi.com`
- no `localhost` or `127.0.0.1` leakage found in checked local rendered output
- base island hubs remain unchanged
- filtered island-hub indexing policy remains unchanged
- `/biz` aliases remain excluded from the sitemap
- no public-info trust policy changed
- no fake hours, prices, booking, ratings, reviews, availability, verification, or sponsor claims were added

## Remaining Weak Spots

- Broad beach search still mixes some beach-adjacent dining because exact-name lexical matching is still strong there.
- Broad nightlife is improved by chooser/context, but nightlife ranking can still benefit from a later dedicated tuning pass.
- Water Island boat inventory remains genuinely thin, so the flow depends on honest guidance rather than a deep local operator set.

## Validation

- `npm run typecheck` ✅
- `npm run lint` ✅
- `NODE_OPTIONS=--use-system-ca npm run build` ✅
