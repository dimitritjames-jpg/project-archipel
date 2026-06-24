# VibeVI Ferry + Cruise SEO Utility Plan

VibeVI uses ferry and cruise-day planning as high-intent utility anchors: the schedule or port context gets the visitor in, then VibeVI routes them toward beaches, charters, dining, culture, shopping, island hubs, maps, and published listings.

## Live utility routes

### Ferry

- `/ferry` — USVI ferry hub and island-hop guide.
- `/ferry/red-hook-to-cruz-bay` — source-backed Red Hook to Cruz Bay route page.
- `/ferry/cruz-bay-to-red-hook` — source-backed Cruz Bay to Red Hook return route.
- `/ferry/crown-bay-to-water-island` — source-backed Crown Bay to Water Island route.
- `/ferry/water-island-to-crown-bay` — source-backed Water Island to Crown Bay return route.
- `/ferry/charlotte-amalie-cruz-bay` — guide-only SEO page for downtown St. Thomas to St. John search intent. No timetable claim is made.
- `/st-thomas/ferry-schedule` — St. Thomas ferry board.
- `/st-john/ferry-schedule` — St. John ferry board.
- `/water-island/ferry-schedule` — Water Island ferry board.

Redirect aliases:

- `/ferry/red-hook-cruz-bay` → `/ferry/red-hook-to-cruz-bay`
- `/ferry/red-hook-to-st-john` → `/ferry/red-hook-to-cruz-bay`
- `/ferry/cruz-bay-red-hook` → `/ferry/cruz-bay-to-red-hook`
- `/ferry/crown-bay-water-island` → `/ferry/crown-bay-to-water-island`
- `/ferry/water-island-crown-bay` → `/ferry/water-island-to-crown-bay`

### Cruise

- `/cruise-day` — USVI cruise-day planning hub.
- `/experiences/cruise-day` — cruise-day experience pillar.
- `/st-thomas/cruise-schedule` — scheduled St. Thomas ship/capacity planning page.
- `/st-croix/cruise-schedule` — scheduled St. Croix ship/capacity planning page.
- `/st-thomas/cruise-day` — St. Thomas cruise-day guide.
- `/st-thomas/havensight-cruise-day` — Havensight port-day guide.
- `/st-thomas/crown-bay-cruise-day` — Crown Bay port-day guide.

## Improved route behavior

- Ferry pages now connect routes to beach, boat, bite, night, map, island hubs, and relevant categories.
- Guide-only ferry routes are clearly labeled and do not show timetable widgets.
- Cruise pages now route visitors into port-specific guides, beaches, food, culture, shopping, tours, and map context.
- Search now includes direct utility shortcuts and natural terms such as ferry, cruise, port, Water Island ferry, Red Hook, Cruz Bay, Havensight, Crown Bay, ship schedule, and ferry schedule.
- Homepage utility CTAs now include full ferry board, cruise-day moves, St. Thomas cruise schedule, St. John ferry day, and Water Island ferry hop.
- Listing cards and profiles can show soft planning tags only when geography/content makes it reasonable:
  - Useful for cruise-day planning
  - Good ferry-hop candidate
  - Confirm timing directly

## Deferred routes

These should wait for better source-backed data or a larger route system:

- Dedicated `/st-croix/cruise-day` guide.
- Dedicated Frederiksted cruise-day route page.
- More Charlotte Amalie ferry timetable pages beyond the guide-only intent page.
- Operator-specific ferry fare pages.
- Ship-specific cruise arrival pages.
- Date-filtered cruise schedule pages.

## Data limitations

- Ferry information is schedule-based.
- VibeVI does not provide live vessel tracking.
- Ferry schedules, fares, baggage rules, service status, boarding requirements, and route changes must be confirmed directly with the operator.
- Cruise capacity is scheduled capacity when known, not actual passenger count.
- VibeVI does not measure live port crowds, pedestrian traffic, disembarkation counts, or business demand.
- Unknown cruise ship capacity lowers coverage quality and must remain visible in the UI.
- Guide-only pages are useful for search intent and planning context, but must not imply timetable data exists.

## SEO targets

Primary ferry intent:

- St. Thomas ferry schedule
- St. John ferry schedule
- Red Hook to Cruz Bay ferry
- Cruz Bay to Red Hook ferry
- Water Island ferry
- Crown Bay to Water Island ferry
- Charlotte Amalie to Cruz Bay ferry

Primary cruise intent:

- St. Thomas cruise schedule
- St. Thomas cruise day
- Havensight cruise day
- Crown Bay cruise day
- cruise day in St. Thomas
- Frederiksted cruise schedule
- cruise ship schedule USVI

Discovery conversion intent:

- St. John beaches
- St. Thomas things to do
- St. Croix things to do
- Water Island day trip
- USVI charters
- St. Thomas restaurants
- Cruz Bay dining
- St. Thomas nightlife

## Trust rules

Every ferry/cruise page must preserve these rules:

- Ferry information is schedule-based.
- Confirm with the operator before travel.
- Scheduled ship capacity is a planning estimate, not an actual passenger count.
- VibeVI does not claim live availability, live port crowds, live vessel positions, actual cruise passenger counts, or guaranteed return timing.
- Confirm hours, prices, pickup, return timing, safety details, booking, and business details directly with the source or business.
- Public-info listings remain disclosed and unclaimed.
- Demo listings remain noindex and do not emit LocalBusiness schema.

## Internal linking plan

- Ferry hub links to active route pages, island ferry boards, St. John beaches, St. John dining, Water Island day trip, St. Thomas nightlife, and the map.
- Ferry route pages link to island hubs, ferry boards, beaches, charters, dining, nightlife, and map context.
- Cruise hub links to St. Thomas cruise schedule, St. Thomas cruise-day guide, Havensight guide, Crown Bay guide, beaches, dining, culture, shopping, tours, and map context.
- Experience pages link back into ferry/cruise pages:
  - Adventure → ferry board, St. Thomas cruise schedule, Buck Island, National Park, charters.
  - Culinary → St. Thomas cruise day, Red Hook/Cruz Bay ferry food day, Water Island day trip, St. Croix dining.
  - Culture → Havensight culture route, Frederiksted cruise context, St. Thomas and St. Croix things-to-do guides.
  - Cruise day → cruise hub, St. Thomas schedule, Havensight, Crown Bay, Magens Bay, excursions.

## Future roadmap

1. Phase 1: schedule-based guide pages.
2. Phase 2: source-backed timetable ingestion.
3. Phase 3: port-day itinerary builder.
4. Phase 4: lead routing to operators.
5. Phase 5: AI concierge planning layer.
6. Phase 6: booking only after vendor systems and permissions exist.
