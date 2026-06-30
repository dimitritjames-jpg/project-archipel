# Mobile Catalog Feed

## Endpoint

- Local:
  - `/api/mobile/catalog`
- Expected production URL:
  - `https://www.myvibevi.com/api/mobile/catalog`

## Purpose

- Provide one public, cache-friendly JSON payload for the VibeVI mobile shell.
- Keep the main VibeVI website as the source of truth for mobile-safe catalog content.
- Support bundled starter data in the app plus live refresh and local cache on-device.

## Schema Summary

- Top-level fields:
  - `version`
  - `generatedAt`
  - `source`
  - `islands`
  - `categories`
  - `listings`
  - `guides`
  - `utility`

- `islands`
  - Four canonical island records:
    - `st-thomas`
    - `st-john`
    - `st-croix`
    - `water-island`

- `categories`
  - Mobile-safe category metadata for the source-backed public-info catalog.

- `listings`
  - Public mobile-safe listing records derived from the current source-backed public-info inventory.

- `guides`
  - Structured guide links from the main site for island planning and utility discovery.

- `utility`
  - Structured text blocks for cruise-day and transportation/ferry planning.
  - `airportArrival` and `emergency` are currently present as empty arrays because the main site does not yet expose those sections as dedicated structured mobile content.

## Included Fields

- Island slug and name
- Category slug and name
- Listing:
  - id
  - name
  - slug
  - island / islandSlug
  - category / categorySlug
  - short and full description
  - area / address when available
  - phone when mobile-safe to show
  - website when available
  - instagram when derivable from public social URLs
  - source URL
  - verification status
  - sponsor/partner state
  - last updated timestamp when available
- Guide:
  - title
  - href
  - summary
- Utility:
  - title
  - body
  - related links
  - source label / source URL

## Excluded Fields

- Service-role or internal-only data
- Email addresses
- Claim status workflow details
- Robots/indexing control fields
- Internal media-rights workflow flags
- Raw rich-text JSON
- Booking, pricing, hours, or availability claims not explicitly modeled for safe mobile use
- Demo launch-preview listings

## Cache Behavior

- API response header:
  - `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- Feed is deterministic and suitable for device-side caching.
- Mobile app is expected to:
  - render bundled starter data first
  - prefer cached feed when available
  - refresh quietly in the background when online

## Current Source Inputs

- `data/public-info-businesses-batch-1-approved.json`
- `src/lib/islands.ts`
- `src/lib/categories.ts`
- `src/lib/guides.ts`
- `src/lib/transit/ferry-routes.ts`
- `src/lib/transit/cruise-port-guides.ts`

## Mobile Consumption Strategy

- Main site remains the source of truth.
- Mobile app keeps bundled local starter data for instant render and offline safety.
- Live feed augments and updates mobile content without blocking launch.
- App-local state remains local:
  - selected island
  - saved places
  - route history
  - Android back-stack behavior
