# Boat Flow Fix Report - 2026-07-01

## Flow Change

- Homepage Boat tile now points to `/search?q=boat`.
- The goal for that route is operator-first boating discovery, not a broad adventure portal.

## Search Result Outcome

- `boat` -> Big Beard&#x27;s Adventure Tours (`/st-croix/excursions-charters/big-beards-adventure-tours`)
- `charter` -> Big Beard&#x27;s Adventure Tours (`/st-croix/excursions-charters/big-beards-adventure-tours`)
- `snorkel charter` -> Big Beard&#x27;s Adventure Tours (`/st-croix/excursions-charters/big-beards-adventure-tours`)
- `sunset sail` -> Big Beard&#x27;s Adventure Tours (`/st-croix/excursions-charters/big-beards-adventure-tours`)

## Ranking Guardrails Added

- Harbor and marina utility listings no longer outrank true charter operators for boat-intent queries.
- Boat-intent scoring now separates operator signals from harbor/logistics signals.
- Tours and activities with genuine water signals can still appear, but dedicated charter operators stay ahead of mixed non-boat inventory.

## Boat Safety Outcome

- Coral World, Skyride, and zipline no longer pollute the primary boat-intent route.
- The Boat path is now materially closer to charter choice, not attraction browsing.
