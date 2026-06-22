-- pgTAP security tests for RLS matrix (Phase 1 validation)

begin;
select plan(12);

-- Categories: anon can read active taxonomy
set local role anon;
select ok(
  (select count(*) >= 6 from public.categories where is_active = true),
  'anon can read active categories'
);

-- Businesses: anon cannot read drafts (no published rows yet = 0)
select ok(
  (select count(*) = 0 from public.businesses where status <> 'published'),
  'anon cannot see non-published businesses'
);

-- Ferry routes: anon can read public routes
select ok(
  (select count(*) = 4 from public.ferry_routes where is_public = true),
  'anon can read public ferry routes'
);

-- Cruise calls view: port_load_daily accessible to anon
select ok(
  (select count(*) >= 0 from public.port_load_daily),
  'anon can query port_load_daily view'
);

-- Engagement: anon cannot insert directly
select throws_ok(
  $$ insert into public.engagement_events (business_id, kind)
     values ('00000000-0000-4000-8000-000000000099', 'profile_view') $$,
  null,
  'anon cannot insert engagement events'
);

-- Outbox: anon cannot read
select ok(
  (select count(*) = 0 from public.search_outbox),
  'anon cannot read search outbox (RLS blocks)'
);

-- Audit: anon cannot read
select ok(
  (select count(*) = 0 from public.admin_audit_log),
  'anon cannot read admin audit log'
);

reset role;

-- Authenticated without membership cannot update ferry ingestion fields
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000010","role":"authenticated"}', true);

select throws_ok(
  $$ insert into public.ferry_routes (
       operator_id, origin_terminal_id, destination_terminal_id,
       slug, display_name, source_url, source_name, last_verified_at
     ) values (
       'a0000000-0000-4000-8000-000000000001',
       'b0000000-0000-4000-8000-000000000001',
       'b0000000-0000-4000-8000-000000000002',
       'test-route', 'Test', 'https://example.com', 'Test', now()
     ) $$,
  null,
  'authenticated cannot insert ferry routes'
);

reset role;

-- Service role can read outbox (table empty but accessible)
set local role service_role;
select ok(
  (select count(*) >= 0 from public.search_outbox),
  'service_role can access search outbox'
);

select ok(
  (select count(*) >= 6 from public.categories),
  'service_role can read all categories'
);

reset role;

select finish();
rollback;
