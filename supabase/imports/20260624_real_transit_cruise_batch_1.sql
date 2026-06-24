-- VibeVI real transit + cruise source-backed batch 1
--
-- Purpose:
-- - Replace placeholder ferry rows with source-backed public ferry schedules.
-- - Add source-backed scheduled cruise calls for the first launch window.
-- - Keep passenger_capacity null unless the source provides passenger-only capacity.
--
-- Run with service_role privileges in Supabase SQL editor or psql.
-- This is intentionally an import file, not a migration: schedules change.

begin;

-- ---------------------------------------------------------------------------
-- Source constants
-- ---------------------------------------------------------------------------

-- Ferry sources verified by VibeVI on 2026-06-24 AST:
-- - Varlack Ventures ferry service:
--   https://www.varlack-ventures.com/ferryservices
-- - Water Island Ferry:
--   https://waterislandferry.com/
--
-- Cruise sources verified by VibeVI on 2026-06-24 AST:
-- - WICO June 2026 schedule:
--   https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf
-- - VIPA Frederiksted FY2026 schedule:
--   https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf
-- - VIPA STT/STJ schedule directory:
--   https://www.viport.com/schedule-cruise-ports

-- ---------------------------------------------------------------------------
-- Ferry operators, terminals, and directional routes
-- ---------------------------------------------------------------------------

insert into public.ferry_operators (id, name, website_url, phone)
values
  (
    'a0000000-0000-4000-8000-000000000001',
    'Varlack Ventures',
    'https://www.varlack-ventures.com/ferryservices',
    '+1-340-776-6412'
  ),
  (
    'a0000000-0000-4000-8000-000000000002',
    'Water Island Ferry',
    'https://waterislandferry.com/',
    '+1-340-690-4159'
  )
on conflict (id) do update set
  name = excluded.name,
  website_url = excluded.website_url,
  phone = excluded.phone,
  updated_at = now();

update public.ferry_routes
set
  operator_id = 'a0000000-0000-4000-8000-000000000001',
  typical_duration_minutes = 15,
  operational_status = 'scheduled',
  status_note = 'Schedule-based public ferry times. Check the operator before travel for weather, holiday, or service changes.',
  source_url = 'https://www.varlack-ventures.com/ferryservices',
  source_name = 'Varlack Ventures',
  last_verified_at = '2026-06-24 00:00:00-04',
  updated_at = now()
where slug in ('red-hook-to-cruz-bay', 'cruz-bay-to-red-hook');

update public.ferry_routes
set
  operator_id = 'a0000000-0000-4000-8000-000000000002',
  typical_duration_minutes = 15,
  operational_status = 'scheduled',
  status_note = 'Schedule-based public ferry times. Sunday schedule also applies to observed public holidays per operator notice.',
  source_url = 'https://waterislandferry.com/',
  source_name = 'Water Island Ferry',
  last_verified_at = '2026-06-24 00:00:00-04',
  updated_at = now()
where slug in ('crown-bay-to-water-island', 'water-island-to-crown-bay');

delete from public.ferry_service_exceptions
where service_id in (
  select id
  from public.ferry_services
  where route_id in (
    'c0000000-0000-4000-8000-000000000001',
    'c0000000-0000-4000-8000-000000000002',
    'c0000000-0000-4000-8000-000000000003',
    'c0000000-0000-4000-8000-000000000004'
  )
);

delete from public.ferry_services
where route_id in (
  'c0000000-0000-4000-8000-000000000001',
  'c0000000-0000-4000-8000-000000000002',
  'c0000000-0000-4000-8000-000000000003',
  'c0000000-0000-4000-8000-000000000004'
);

delete from public.ferry_fares
where route_id in (
  'c0000000-0000-4000-8000-000000000001',
  'c0000000-0000-4000-8000-000000000002',
  'c0000000-0000-4000-8000-000000000003',
  'c0000000-0000-4000-8000-000000000004'
);

-- ---------------------------------------------------------------------------
-- Ferry fares
-- ---------------------------------------------------------------------------

insert into public.ferry_fares (
  route_id,
  rider_type,
  amount,
  currency,
  fare_note,
  valid_from,
  source_url,
  last_verified_at
)
values
  -- Red Hook <-> Cruz Bay, Varlack Ventures. Fuel surcharge is a separate row.
  ('c0000000-0000-4000-8000-000000000001', 'Non-resident adult one-way', 8.15, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'VI resident one-way', 6.00, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'VI senior citizen one-way', 1.50, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Child one-way', 1.00, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Bag fee', 4.00, 'USD', 'Per bag fee listed by operator.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Fuel surcharge', 0.66, 'USD', 'Added to all fares effective 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  ('c0000000-0000-4000-8000-000000000002', 'Non-resident adult one-way', 8.15, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'VI resident one-way', 6.00, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'VI senior citizen one-way', 1.50, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Child one-way', 1.00, 'USD', 'Fuel surcharge applies separately from 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Bag fee', 4.00, 'USD', 'Per bag fee listed by operator.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Fuel surcharge', 0.66, 'USD', 'Added to all fares effective 2026-06-12.', '2026-06-12', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  -- Crown Bay <-> Water Island, Water Island Ferry.
  ('c0000000-0000-4000-8000-000000000003', 'Visitor one-way', 10.00, 'USD', 'One-way ticket from St. Thomas or Water Island.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'USVI resident one-way', 6.00, 'USD', 'Current USVI ID required for resident rate.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Visitor kids one-way', 5.00, 'USD', 'Ask crew about age requirement.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Local kids one-way', 3.00, 'USD', 'Ask crew about age requirement.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Small box or suitcase', 2.00, 'USD', 'Cargo charged per item each way; space subject to availability.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Large box or bag', 3.00, 'USD', 'Cargo charged per item each way; space subject to availability.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),

  ('c0000000-0000-4000-8000-000000000004', 'Visitor one-way', 10.00, 'USD', 'One-way ticket from St. Thomas or Water Island.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'USVI resident one-way', 6.00, 'USD', 'Current USVI ID required for resident rate.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Visitor kids one-way', 5.00, 'USD', 'Ask crew about age requirement.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Local kids one-way', 3.00, 'USD', 'Ask crew about age requirement.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Small box or suitcase', 2.00, 'USD', 'Cargo charged per item each way; space subject to availability.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Large box or bag', 3.00, 'USD', 'Cargo charged per item each way; space subject to availability.', '2025-02-01', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04');

-- ---------------------------------------------------------------------------
-- Ferry services
-- days_of_week follows VibeVI convention: 1 Mon, 2 Tue, ..., 7 Sun.
-- ---------------------------------------------------------------------------

insert into public.ferry_services (
  route_id,
  service_label,
  valid_from,
  days_of_week,
  departure_time,
  arrival_time,
  operational_status,
  source_url,
  last_verified_at
)
values
  -- Red Hook -> Cruz Bay: Monday-Friday.
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '05:30', '05:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '06:30', '06:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '07:30', '07:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '08:30', '08:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '09:00', '09:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '10:00', '10:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '11:00', '11:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '12:00', '12:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '13:00', '13:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '14:00', '14:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '15:00', '15:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '16:00', '16:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '17:00', '17:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '18:00', '18:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '19:00', '19:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '21:00', '21:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '22:30', '22:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '23:30', '23:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  -- Red Hook -> Cruz Bay: Saturday-Sunday.
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '06:30', '06:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '07:30', '07:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '08:30', '08:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '09:00', '09:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '10:00', '10:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '11:00', '11:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '12:00', '12:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '13:00', '13:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '14:00', '14:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '15:00', '15:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '16:00', '16:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '17:00', '17:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '18:00', '18:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '19:00', '19:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '21:00', '21:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '22:30', '22:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000001', 'Varlack Red Hook weekend public schedule', '2026-06-24', array[6,7]::smallint[], '23:30', '23:45', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  -- Cruz Bay -> Red Hook: Monday-Friday.
  -- Note: the source page displays "12:00 am" in the noon slot between 11:00 am and 1:00 pm.
  -- VibeVI imports this as 12:00 PM and flags the normalization in docs for operator re-check.
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '06:00', '06:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '07:00', '07:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '08:00', '08:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '09:00', '09:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '10:00', '10:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '11:00', '11:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule; noon source normalization pending operator re-check', '2026-06-24', array[1,2,3,4,5]::smallint[], '12:00', '12:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '13:00', '13:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '14:00', '14:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '15:00', '15:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '16:00', '16:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '17:00', '17:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '18:00', '18:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '19:00', '19:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '20:00', '20:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '22:00', '22:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekday public schedule', '2026-06-24', array[1,2,3,4,5]::smallint[], '23:00', '23:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  -- Cruz Bay -> Red Hook: Saturday-Sunday.
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '06:00', '06:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '07:00', '07:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '08:00', '08:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '09:00', '09:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '10:00', '10:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '11:00', '11:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '12:00', '12:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '13:00', '13:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '14:00', '14:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '15:00', '15:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '16:00', '16:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '17:00', '17:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '18:00', '18:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '19:00', '19:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '20:00', '20:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '22:00', '22:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000002', 'Varlack Cruz Bay weekend public schedule', '2026-06-24', array[6,7]::smallint[], '23:00', '23:15', 'scheduled', 'https://www.varlack-ventures.com/ferryservices', '2026-06-24 00:00:00-04'),

  -- Crown Bay -> Water Island.
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry weekday early departure', '2026-06-24', array[1,2,3,4,5]::smallint[], '07:00', '07:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '08:00', '08:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '09:00', '09:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '10:00', '10:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '11:00', '11:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '12:00', '12:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '13:00', '13:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '14:00', '14:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '15:00', '15:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '16:00', '16:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '17:00', '17:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '18:00', '18:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '09:00', '09:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '10:00', '10:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '11:00', '11:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '12:00', '12:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '13:00', '13:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '14:00', '14:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '15:00', '15:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '16:00', '16:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '17:00', '17:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000003', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '18:00', '18:15', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),

  -- Water Island -> Crown Bay.
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry weekday early departure', '2026-06-24', array[1,2,3,4,5]::smallint[], '07:15', '07:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '08:15', '08:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '09:15', '09:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '10:15', '10:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '11:15', '11:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '12:15', '12:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '13:15', '13:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '14:15', '14:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '15:15', '15:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '16:15', '16:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '17:15', '17:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Monday-Saturday public schedule', '2026-06-24', array[1,2,3,4,5,6]::smallint[], '18:15', '18:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '09:15', '09:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '10:15', '10:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '11:15', '11:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '12:15', '12:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '13:15', '13:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '14:15', '14:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '15:15', '15:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '16:15', '16:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '17:15', '17:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04'),
  ('c0000000-0000-4000-8000-000000000004', 'Water Island Ferry Sunday and public holiday public schedule', '2026-06-24', array[7]::smallint[], '18:15', '18:30', 'scheduled', 'https://waterislandferry.com/', '2026-06-24 00:00:00-04');

-- ---------------------------------------------------------------------------
-- Cruise ports and calls
-- passenger_capacity remains null for this batch.
-- WICO monthly PDFs list calls/times, not passenger-only capacity.
-- VIPA Frederiksted FY2026 includes PAX/CREW, which VibeVI does not treat as
-- passenger-only capacity without an approved capacity_kind schema addition.
-- ---------------------------------------------------------------------------

update public.cruise_ports
set
  source_url = 'https://wico-ltd.com/',
  source_name = 'WICO Scheduled Cruise Ship Arrivals',
  updated_at = now()
where slug = 'havensight';

update public.cruise_ports
set
  source_url = 'https://www.viport.com/schedule-cruise-ports',
  source_name = 'Virgin Islands Port Authority Cruise Ship Schedules',
  updated_at = now()
where slug = 'crown-bay-cruise';

update public.cruise_ports
set
  source_url = 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf',
  source_name = 'VIPA Frederiksted FY2026 Cruise Ship Schedule',
  updated_at = now()
where slug = 'frederiksted';

delete from public.cruise_calls
where source_record_id like 'vibevi-20260624-%';

insert into public.cruise_calls (
  port_id,
  service_date,
  ship_name,
  passenger_capacity,
  arrival_at,
  departure_at,
  status,
  source_url,
  source_name,
  source_record_id,
  last_verified_at
)
values
  -- St. Thomas / St. John WICO June 2026 source.
  ('d0000000-0000-4000-8000-000000000001', '2026-06-24', 'Disney Treasure', null, '2026-06-24 06:30:00-04', '2026-06-24 16:00:00-04', 'scheduled', 'https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf', 'WICO June 2026 Scheduled Cruise Ship Arrivals', 'vibevi-20260624-wico-june-2026-06-24-disney-treasure', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000002', '2026-06-24', 'Star of the Seas', null, '2026-06-24 12:30:00-04', '2026-06-24 20:00:00-04', 'scheduled', 'https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf', 'WICO June 2026 Scheduled Cruise Ship Arrivals', 'vibevi-20260624-wico-june-2026-06-24-star-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000002', '2026-06-28', 'Rhapsody of the Seas', null, '2026-06-28 08:00:00-04', '2026-06-28 18:00:00-04', 'scheduled', 'https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf', 'WICO June 2026 Scheduled Cruise Ship Arrivals', 'vibevi-20260624-wico-june-2026-06-28-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000001', '2026-06-30', 'Norwegian Luna', null, '2026-06-30 11:00:00-04', '2026-06-30 19:00:00-04', 'scheduled', 'https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf', 'WICO June 2026 Scheduled Cruise Ship Arrivals', 'vibevi-20260624-wico-june-2026-06-30-norwegian-luna', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000002', '2026-06-30', 'Adventure of the Seas', null, '2026-06-30 07:00:00-04', '2026-06-30 18:00:00-04', 'scheduled', 'https://wico-ltd.com/wp-content/uploads/2026/05/June-2026-Scheduled-Cruise-Ship-Arrival-v2.pdf', 'WICO June 2026 Scheduled Cruise Ship Arrivals', 'vibevi-20260624-wico-june-2026-06-30-adventure-of-the-seas', '2026-06-24 00:00:00-04'),

  -- Frederiksted, St. Croix. Source PAX/CREW values intentionally not imported
  -- into passenger_capacity in this batch.
  ('d0000000-0000-4000-8000-000000000003', '2026-06-25', 'Rhapsody of the Seas', null, '2026-06-25 08:00:00-04', '2026-06-25 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-06-25-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-06-29', 'Rhapsody of the Seas', null, '2026-06-29 08:00:00-04', '2026-06-29 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-06-29-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-01', 'Adventure of the Seas', null, '2026-07-01 07:00:00-04', '2026-07-01 16:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-01-adventure-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-09', 'Rhapsody of the Seas', null, '2026-07-09 08:00:00-04', '2026-07-09 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-09-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-13', 'Rhapsody of the Seas', null, '2026-07-13 08:00:00-04', '2026-07-13 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-13-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-23', 'Rhapsody of the Seas', null, '2026-07-23 08:00:00-04', '2026-07-23 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-23-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-27', 'Rhapsody of the Seas', null, '2026-07-27 08:00:00-04', '2026-07-27 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-27-rhapsody-of-the-seas', '2026-06-24 00:00:00-04'),
  ('d0000000-0000-4000-8000-000000000003', '2026-07-29', 'Adventure of the Seas', null, '2026-07-29 08:00:00-04', '2026-07-29 18:00:00-04', 'scheduled', 'https://www.viport.com/_files/ugd/e0a2e7_b2c22f56a2144659884b664d54066b92.pdf', 'VIPA Frederiksted FY2026 Cruise Ship Schedule', 'vibevi-20260624-vipa-stx-2026-07-29-adventure-of-the-seas', '2026-06-24 00:00:00-04')
on conflict (port_id, service_date, ship_name, source_record_id) do update set
  passenger_capacity = excluded.passenger_capacity,
  arrival_at = excluded.arrival_at,
  departure_at = excluded.departure_at,
  status = excluded.status,
  source_url = excluded.source_url,
  source_name = excluded.source_name,
  last_verified_at = excluded.last_verified_at,
  updated_at = now();

commit;
