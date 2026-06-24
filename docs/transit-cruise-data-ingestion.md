# VibeVI transit and cruise data ingestion

This is the operating note for the ferry schedule and cruise-call utility layer.

## Current source-backed import

Batch 1 lives at:

- `supabase/imports/20260624_real_transit_cruise_batch_1.sql`

It replaces placeholder ferry records and loads first-window cruise schedule rows from direct sources.

## Sources used

Ferry:

- Varlack Ventures ferry service: `https://www.varlack-ventures.com/ferryservices`
- Water Island Ferry: `https://waterislandferry.com/`

Cruise:

- WICO June 2026 scheduled cruise arrivals: `https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf`
- VIPA cruise schedule directory: `https://www.viport.com/schedule-cruise-ports`
- VIPA Frederiksted FY2026 schedule: `https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf`

## What is loaded

Ferry:

- Red Hook to Cruz Bay public ferry departure rows.
- Cruz Bay to Red Hook public ferry departure rows.
- Crown Bay to Water Island public ferry departure rows.
- Water Island to Crown Bay public ferry departure rows.
- Published fare rows for the same routes.
- Operator and route source metadata.

Cruise:

- WICO/Havensight and Crown Bay scheduled June 2026 calls from the WICO monthly PDF.
- Frederiksted scheduled June/July 2026 calls from the VIPA FY2026 PDF.

## What is intentionally not loaded

- No guessed ferry times.
- No social-media-only schedule snippets.
- No actual passenger counts.
- No traffic, crowd, or footfall observations.
- No passenger capacity values unless the source provides passenger-only capacity.

The Frederiksted PDF includes a `PAX/CREW` column. VibeVI does not currently import those values into `cruise_calls.passenger_capacity` because the column is not passenger-only. If we want to support crew-inclusive source values later, add an explicit capacity-kind field before loading those numbers.

## UI behavior

The public cruise component can now distinguish between:

- No schedule data for the selected island/date.
- Scheduled ship calls listed, but capacity pending.
- Scheduled capacity available and classifiable into traffic bands.

If calls exist but capacity coverage is zero, the UI should show “Calls Listed - Capacity Pending,” not “Quiet.”

## Running the import

Preferred path:

1. Confirm production/staging Supabase project.
2. Open the Supabase SQL editor.
3. Paste the SQL from `supabase/imports/20260624_real_transit_cruise_batch_1.sql`.
4. Run it with service-role/admin privileges.
5. Verify route pages:
   - `/ferry/red-hook-to-cruz-bay`
   - `/ferry/cruz-bay-to-red-hook`
   - `/ferry/crown-bay-to-water-island`
   - `/ferry/water-island-to-crown-bay`
6. Verify cruise pages:
   - `/st-thomas/cruise-schedule`
   - `/st-croix/cruise-schedule`

CLI path, if a direct Postgres connection string is available:

```bash
psql "$SUPABASE_DB_URL" -f supabase/imports/20260624_real_transit_cruise_batch_1.sql
```

Do not run this file as a migration. Schedules change and should be refreshed as operational data.

## Refresh cadence

- Ferry routes: review monthly and after holidays/weather-service changes.
- WICO/Havensight/Crown Bay: review whenever WICO publishes a new monthly PDF.
- Frederiksted: review whenever VIPA publishes a revised FY schedule PDF.
- Update `last_verified_at` whenever a row is rechecked.

## Known source caveat

The Varlack Ventures page displays a Cruz Bay weekday `12:00 am` row in the middle of the daytime sequence between `11:00 am` and `1:00 pm`. Batch 1 normalizes that single row to `12:00 PM` and labels the service row for operator re-check. If the operator confirms otherwise, update the row immediately.
