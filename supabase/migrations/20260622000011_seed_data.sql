-- Seed taxonomy, ferry terminals/routes, cruise ports

insert into public.categories (name, slug, schema_type, sort_order, description) values
  ('Excursions & Charters', 'excursions-charters', 'TouristInformationCenter', 1, 'Boat tours, charters, and island excursions'),
  ('Indulgent Dining', 'indulgent-dining', 'Restaurant', 2, 'Restaurants and culinary experiences'),
  ('Boutique Stays', 'boutique-stays', 'LodgingBusiness', 3, 'Hotels, villas, and boutique accommodations'),
  ('Nightlife & Rhythm', 'nightlife-rhythm', 'BarOrPub', 4, 'Bars, clubs, and live music venues'),
  ('Wellness & Spas', 'wellness-spas', 'HealthAndBeautyBusiness', 5, 'Spas, wellness retreats, and fitness'),
  ('Local Provisions', 'local-provisions', 'Store', 6, 'Markets, shops, and local goods');

-- Ferry operator
insert into public.ferry_operators (id, name, website_url, phone)
values (
  'a0000000-0000-4000-8000-000000000001',
  'VI Ferry Services',
  'https://example.com/ferry',
  '+1-340-000-0000'
);

-- Ferry terminals
insert into public.ferry_terminals (id, island, name, slug, location, street_address) values
  (
    'b0000000-0000-4000-8000-000000000001',
    'STT',
    'Red Hook Ferry Terminal',
    'red-hook',
    ST_SetSRID(ST_MakePoint(-64.8502, 18.3250), 4326)::geography,
    'Red Hook, St. Thomas'
  ),
  (
    'b0000000-0000-4000-8000-000000000002',
    'STJ',
    'Cruz Bay Ferry Dock',
    'cruz-bay',
    ST_SetSRID(ST_MakePoint(-64.7938, 18.3313), 4326)::geography,
    'Cruz Bay, St. John'
  ),
  (
    'b0000000-0000-4000-8000-000000000003',
    'STT',
    'Crown Bay Ferry Terminal',
    'crown-bay',
    ST_SetSRID(ST_MakePoint(-64.9528, 18.3189), 4326)::geography,
    'Crown Bay, St. Thomas'
  ),
  (
    'b0000000-0000-4000-8000-000000000004',
    'WI',
    'Water Island Ferry Landing',
    'water-island-landing',
    ST_SetSRID(ST_MakePoint(-64.9642, 18.3185), 4326)::geography,
    'Water Island'
  );

-- Directional ferry routes (never infer reverse schedules)
insert into public.ferry_routes (
  id, operator_id, origin_terminal_id, destination_terminal_id,
  slug, display_name, typical_duration_minutes, operational_status,
  source_url, source_name, last_verified_at
) values
  (
    'c0000000-0000-4000-8000-000000000001',
    'a0000000-0000-4000-8000-000000000001',
    'b0000000-0000-4000-8000-000000000001',
    'b0000000-0000-4000-8000-000000000002',
    'red-hook-to-cruz-bay',
    'Red Hook → Cruz Bay',
    20,
    'scheduled',
    'https://example.com/ferry/red-hook-cruz-bay',
    'VI Ferry Services',
    now()
  ),
  (
    'c0000000-0000-4000-8000-000000000002',
    'a0000000-0000-4000-8000-000000000001',
    'b0000000-0000-4000-8000-000000000002',
    'b0000000-0000-4000-8000-000000000001',
    'cruz-bay-to-red-hook',
    'Cruz Bay → Red Hook',
    20,
    'scheduled',
    'https://example.com/ferry/cruz-bay-red-hook',
    'VI Ferry Services',
    now()
  ),
  (
    'c0000000-0000-4000-8000-000000000003',
    'a0000000-0000-4000-8000-000000000001',
    'b0000000-0000-4000-8000-000000000003',
    'b0000000-0000-4000-8000-000000000004',
    'crown-bay-to-water-island',
    'Crown Bay → Water Island',
    10,
    'scheduled',
    'https://example.com/ferry/crown-bay-water-island',
    'VI Ferry Services',
    now()
  ),
  (
    'c0000000-0000-4000-8000-000000000004',
    'a0000000-0000-4000-8000-000000000001',
    'b0000000-0000-4000-8000-000000000004',
    'b0000000-0000-4000-8000-000000000003',
    'water-island-to-crown-bay',
    'Water Island → Crown Bay',
    10,
    'scheduled',
    'https://example.com/ferry/water-island-crown-bay',
    'VI Ferry Services',
    now()
  );

-- Sample fares
insert into public.ferry_fares (route_id, rider_type, amount, source_url, last_verified_at) values
  ('c0000000-0000-4000-8000-000000000001', 'Adult', 15.00, 'https://example.com/ferry/fares', now()),
  ('c0000000-0000-4000-8000-000000000002', 'Adult', 15.00, 'https://example.com/ferry/fares', now()),
  ('c0000000-0000-4000-8000-000000000003', 'Adult', 10.00, 'https://example.com/ferry/fares', now()),
  ('c0000000-0000-4000-8000-000000000004', 'Adult', 10.00, 'https://example.com/ferry/fares', now());

-- Sample weekday services
insert into public.ferry_services (
  route_id, valid_from, days_of_week, departure_time, arrival_time,
  operational_status, source_url, last_verified_at
) values
  (
    'c0000000-0000-4000-8000-000000000001',
    current_date,
    array[1,2,3,4,5,6,7]::smallint[],
    '07:00',
    '07:20',
    'scheduled',
    'https://example.com/ferry/schedule',
    now()
  ),
  (
    'c0000000-0000-4000-8000-000000000003',
    current_date,
    array[1,2,3,4,5,6,7]::smallint[],
    '08:00',
    '08:10',
    'scheduled',
    'https://example.com/ferry/schedule',
    now()
  );

-- Cruise ports
insert into public.cruise_ports (id, island, name, slug, location, source_url, source_name) values
  (
    'd0000000-0000-4000-8000-000000000001',
    'STT',
    'Havensight Cruise Port',
    'havensight',
    ST_SetSRID(ST_MakePoint(-64.9308, 18.3350), 4326)::geography,
    'https://example.com/ports/havensight',
    'VIPA Cruise Schedule'
  ),
  (
    'd0000000-0000-4000-8000-000000000002',
    'STT',
    'Crown Bay Cruise Port',
    'crown-bay-cruise',
    ST_SetSRID(ST_MakePoint(-64.9528, 18.3189), 4326)::geography,
    'https://example.com/ports/crown-bay',
    'VIPA Cruise Schedule'
  ),
  (
    'd0000000-0000-4000-8000-000000000003',
    'STX',
    'Frederiksted Cruise Pier',
    'frederiksted',
    ST_SetSRID(ST_MakePoint(-64.8810, 17.7120), 4326)::geography,
    'https://example.com/ports/frederiksted',
    'VIPA Cruise Schedule'
  );
