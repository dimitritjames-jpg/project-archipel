# Search + SCS Final QA - 2026-07-01

## Core Search Checks

| Query | Top result | Route |
| --- | --- | --- |
| boat | Big Beard&#x27;s Adventure Tours | `/st-croix/excursions-charters/big-beards-adventure-tours` |
| charter | Big Beard&#x27;s Adventure Tours | `/st-croix/excursions-charters/big-beards-adventure-tours` |
| snorkel charter | Big Beard&#x27;s Adventure Tours | `/st-croix/excursions-charters/big-beards-adventure-tours` |
| sunset sail | Big Beard&#x27;s Adventure Tours | `/st-croix/excursions-charters/big-beards-adventure-tours` |
| coral world | Coral World Ocean Park | `/st-thomas/attractions/coral-world-ocean-park` |
| marine park | Coral World Ocean Park | `/st-thomas/attractions/coral-world-ocean-park` |
| kids | St. Thomas attractions | `/st-thomas/attractions` |
| rainy day | Culture experiences | `/experiences/culture` |
| food tour | Flavors of St. Thomas Food Tours | `/st-thomas/tours-activities/flavors-of-st-thomas-food-tours` |
| eco tour | BushTribe Eco Adventures | `/st-croix/tours-activities/bushtribe-eco-adventures` |
| claim listing | Get listed on VibeVI | `/get-listed` |

## Strong / Useful

- `boat`, `charter`, `snorkel charter`, and `sunset sail` now lead with a real charter operator.
- `coral world`, `marine park`, and `coki point` now lead with Coral World.
- `food tour` leads with Flavors of St. Thomas Food Tours.
- `eco tour` leads with BushTribe Eco Adventures.
- `claim listing` leads with `/get-listed`.
- `culture`, `history`, `museum`, `fort`, and `ruins` remain strong from the prior culture-history pass.
- `spa`, `beach st thomas`, `beach st croix`, and `water island` stayed useful.

## Still Guide-Led Or Broad

- `family` stays guide-led, which is acceptable for this pass.
- `rainy day` now surfaces culture before local-provisions noise, but it remains a guide-layer intent rather than a listing category.
- `nightlife` remains experience-led rather than a city-specific business result.
- `sunset` remains guide-led.
- `local shops` and `market` stay useful, but they still resolve at category or broad provision level instead of deep retail intent.

## Indexing Safety

- `/search` remains `noindex, follow`
- Canonical host remains `https://www.myvibevi.com`
- No localhost leakage found in sampled routes
- Owner-intent utility card did not take over visitor searches outside explicit owner-intent queries
