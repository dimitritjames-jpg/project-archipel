# Search + SCS Final QA - 2026-07-01

## Scope

This pass is Phase 1 of public-beta readiness:

- no catalog moves
- no new categories
- no sitemap policy change
- no indexing policy change
- no `/search` indexability change
- no owner-intent takeover on visitor queries

Baseline comparison is against GitHub `main` at PR #20 merge baseline `74ce26eaa3331d4cb724947fd0d45bc6e6ff7574`.

## Weak-intent before / after

| Query | Before top result | After top result | Outcome |
| --- | --- | --- | --- |
| `nightlife` | `Nightlife experiences` | `Nightlife experiences` | Kept guide-first, but cleaned top set to nightlife routes plus nightlife listings instead of provision noise. |
| `live music` | `Brew STX` | `Nightlife experiences` | Now route-first above the fold, then island nightlife hubs and nightlife listings. |
| `bar` | `Brew STX` | `Nightlife experiences` | Now route-first above the fold, then nightlife categories and listings. |
| `rum bar` | `Common Cents Pub` | `St. John nightlife` | Now steers to the strongest rum-bar island context first, with `Lovango Rum Bar` in the visible result set. |
| `dancing` | no results | `Nightlife experiences` | No longer dead-ends; now maps into nightlife discovery safely. |
| `sunset` | `Best beaches in the USVI` | `Best beaches in the USVI` | Stayed guide-led, but now surfaces culinary and nightlife support instead of odd provision-heavy noise. |
| `sunset drinks` | `Bajo el Sol Gallery Art Bar Cafe Rum Shop` | `Culinary experiences` | Now clearly route-led toward waterfront dining and nightlife instead of accidental lexical matches. |
| `sunset sail` | `Big Beard's Adventure Tours` | `Big Beard's Adventure Tours` | Preserved operator-first charter behavior. |
| `market` | `Moe's Fresh Market` | `Moe's Fresh Market` | Kept strong market lead while reducing generic arts/mall noise. |
| `local market` | `Caribbean Fish Market` | `Moe's Fresh Market` | Now favors actual market/provisions inventory over dining with “market” in the name. |
| `gifts` | `Bajo el Sol Gallery Art Bar Cafe Rum Shop` | `81C Arts` | Still retail-broad, but now stays inside provision/shop inventory without boutique-stay leakage. |
| `local shops` | `Local provisions on St. John` | `Local provisions on St. John` | Preserved useful route-first behavior with local shops experience support. |
| `st thomas` | `St. Thomas Guide` | `St. Thomas Guide` | Preserved island-hub-first behavior. |
| `st john` | `St. John Guide` | `St. John Guide` | Preserved island-hub-first behavior. |
| `st croix` | `St. Croix Guide` | `St. Croix Guide` | Preserved island-hub-first behavior. |
| `water island` | `Water Island Guide` | `Water Island Guide` | Preserved island-hub-first behavior. |
| `family` | `Best beaches in the USVI` | `Best beaches in the USVI` | Still guide-led by design, with attractions and cruise-day support kept in the visible result set. |
| `kids` | `St. Thomas attractions` | `St. Thomas attractions` | Preserved strong family-safe attraction lead. |
| `rainy day` | `Culture experiences` | `Culture experiences` | Preserved culture-first guide behavior with attractions/culture support. |
| `near cruise port` | no results | `USVI cruise-day guide` | No longer dead-ends; now maps to port-aware cruise-day planning. |
| `cruise day` | `USVI cruise-day guide` | `USVI cruise-day guide` | Preserved correct guide lead. |

## After-state quality notes

### Improved

- `nightlife`, `live music`, `bar`, `rum bar`, and `dancing` now stay inside nightlife route/listing logic instead of drifting into random provisions or empty results.
- `sunset drinks` now opens with route-safe dining and nightlife guidance rather than accidental lexical matches.
- `local market` now favors true provision/market inventory instead of restaurant names with “market”.
- exact island-name queries remain island-hub-first.
- `near cruise port` now resolves to cruise-day and port-aware planning pages.

### Preserved

- `boat`, `yacht`, `charter`
- `coral world`
- `spa`
- `beach st thomas`
- `beach st croix`
- `claim listing`

### Still intentionally broad

- `family` remains guide-led rather than business-first.
- `sunset` remains guide-led rather than pretending to know a live best bar or beach.
- `gifts` is improved but still broad retail intent, not a precise souvenir-only layer.

## Regression matrix

| Query | After top result | Status |
| --- | --- | --- |
| `boat` | `Big Beard's Adventure Tours` | Preserved |
| `yacht` | `Big Beard's Adventure Tours` | Preserved |
| `charter` | `Big Beard's Adventure Tours` | Preserved |
| `coral world` | `Coral World Ocean Park` | Preserved |
| `spa` | `Heavenly Spa by Westin` | Preserved |
| `beach st thomas` | `Bolongo Bay` | Preserved |
| `beach st croix` | `Cane Bay` | Preserved |
| `claim listing` | `Get listed on VibeVI` | Preserved |

## Local production-build validation

- `npm run typecheck` -> pass
- `npm run lint` -> pass
- `NODE_OPTIONS=--use-system-ca npm run build` -> pass
- local production server check confirmed `/search` metadata stayed `noindex, follow`
- canonical host stayed `https://www.myvibevi.com`
- no `localhost` or `127.0.0.1` leakage found in checked rendered search HTML
- `/sitemap.xml` remained `253`
- checked `/robots.txt` still points to `https://www.myvibevi.com/sitemap.xml`

## Preview QA gate

Preview still must confirm rendered behavior for:

- `/search?q=nightlife`
- `/search?q=live%20music`
- `/search?q=bar`
- `/search?q=rum%20bar`
- `/search?q=dancing`
- `/search?q=sunset`
- `/search?q=sunset%20drinks`
- `/search?q=sunset%20sail`
- `/search?q=market`
- `/search?q=local%20market`
- `/search?q=gifts`
- `/search?q=local%20shops`
- `/search?q=st%20thomas`
- `/search?q=st%20john`
- `/search?q=st%20croix`
- `/search?q=water%20island`
- `/search?q=family`
- `/search?q=kids`
- `/search?q=rainy%20day`
- `/search?q=near%20cruise%20port`
- `/search?q=cruise%20day`

Preview acceptance:

- top result direction matches the table above
- `/search` remains `noindex, follow`
- sitemap remains `253`
- no localhost leakage
- no source/code artifacts
- no owner-intent `/get-listed` takeover on visitor queries
