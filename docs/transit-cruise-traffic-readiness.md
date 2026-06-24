# VibeVI ferry, cruise, and traffic readiness

This document tracks the practical utility layer: ferry countdowns, ferry route pages, cruise scheduled-capacity context, and island traffic planning cues.

## Current build status

Implemented:

- Island ferry schedule pages:
  - `/st-thomas/ferry-schedule`
  - `/st-john/ferry-schedule`
  - `/water-island/ferry-schedule`
- Directional ferry route pages:
  - `/ferry/red-hook-to-cruz-bay`
  - `/ferry/cruz-bay-to-red-hook`
  - `/ferry/crown-bay-to-water-island`
  - `/ferry/water-island-to-crown-bay`
- Cruise schedule / port-load pages:
  - `/st-thomas/cruise-schedule`
  - `/st-croix/cruise-schedule`
- Homepage utility cards:
  - Red Hook next-boat card
  - St. Thomas scheduled cruise port-load card

The ferry widget is route-scoped. The St. John page no longer defaults to the St. Thomas-to-St. John crossing, and the Water Island page no longer shows the Red Hook route.

The cruise predictor is island-scoped. St. Thomas and St. Croix read their own scheduled-capacity summaries instead of a combined all-island total.

## Trust rules

- Ferry output is schedule-based only.
- Ferry output is not live vessel tracking, a service alert system, or a boarding guarantee.
- Cruise output uses scheduled ship capacity only.
- Cruise output is not observed passenger count, street traffic, business demand, or live crowd measurement.
- Public pages must not publish countdowns from sample, placeholder, or `example.com` source rows.
- Public-info listing schema/indexing trust gates are unchanged.

## Data readiness gates

Before positioning this as a true daily traffic engine, collect and load source-backed rows for:

- Red Hook ↔ Cruz Bay ferry departures
- Crown Bay ↔ Water Island ferry departures
- Adult/child/bag/vehicle fare records where applicable
- Ferry source URLs and `last_verified_at` timestamps
- Havensight scheduled cruise calls
- Crown Bay scheduled cruise calls
- Frederiksted scheduled cruise calls
- Ship name, scheduled arrival/departure, passenger capacity, source URL, source name, and `last_verified_at`

Do not import rows with guessed times, guessed capacities, or unsourced social-media snippets.

## Cruise traffic bands

Scheduled capacity is classified as:

- Quiet: under 5,000
- Elevated: 5,000-9,999
- Busy: 10,000-14,999
- High-impact: 15,000+

These bands are planning cues only. They should not be described as actual traffic, actual disembarkation, or measured footfall.

## Next tightening work

1. Add a source-backed ferry/cruise import workflow for remote Supabase.
2. Add an admin-only freshness report for stale ferry/cruise rows.
3. Add a “last checked” visible detail on full route pages once real rows exist.
4. Add day-picker support for cruise pages only after real scheduled future rows are loaded.
5. Add Search Console monitoring for ferry/cruise URLs after the sitemap refreshes.
