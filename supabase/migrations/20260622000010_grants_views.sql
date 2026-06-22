-- Column-level privileges: deny privileged field updates from authenticated role

revoke all on table public.businesses from authenticated;
grant select, insert, update on table public.businesses to authenticated;

revoke update (owner_id, status, premium_tier, premium_starts_at, premium_ends_at, is_verified, published_at)
  on public.businesses from authenticated;

revoke all on table public.reviews from authenticated;
grant select, insert, update on table public.reviews to authenticated;

revoke update (status, moderated_at, is_verified_visit)
  on public.reviews from authenticated;

revoke all on table public.ferry_routes from authenticated;
grant select on table public.ferry_routes to authenticated;

revoke all on table public.ferry_fares from authenticated;
grant select on table public.ferry_fares to authenticated;

revoke all on table public.ferry_services from authenticated;
grant select on table public.ferry_services to authenticated;

revoke all on table public.ferry_service_exceptions from authenticated;
grant select on table public.ferry_service_exceptions to authenticated;

revoke all on table public.cruise_ports from authenticated;
grant select on table public.cruise_ports to authenticated;

revoke all on table public.cruise_calls from authenticated;
grant select on table public.cruise_calls to authenticated;

-- Anon read grants for public tables
grant usage on schema public to anon, authenticated;

grant select on table public.categories to anon, authenticated;
grant select on table public.businesses to anon, authenticated;
grant select on table public.business_categories to anon, authenticated;
grant select on table public.business_hours to anon, authenticated;
grant select on table public.business_special_hours to anon, authenticated;
grant select on table public.business_redirects to anon, authenticated;
grant select on table public.media to anon, authenticated;
grant select on table public.reviews to anon, authenticated;
grant select on table public.review_summaries to anon, authenticated;
grant select on table public.ferry_operators to anon, authenticated;
grant select on table public.ferry_terminals to anon, authenticated;
grant select on table public.ferry_routes to anon, authenticated;
grant select on table public.ferry_fares to anon, authenticated;
grant select on table public.ferry_services to anon, authenticated;
grant select on table public.ferry_service_exceptions to anon, authenticated;
grant select on table public.cruise_ports to anon, authenticated;
grant select on table public.cruise_calls to anon, authenticated;

-- Port load daily view (Crowd Predictor data source)
create or replace view public.port_load_daily
with (security_invoker = true)
as
select
  cp.island,
  cc.service_date,
  sum(cc.passenger_capacity) filter (where cc.passenger_capacity is not null) as scheduled_capacity,
  count(*) as ship_count,
  count(*) filter (where cc.passenger_capacity is not null)::numeric
    / nullif(count(*), 0) as coverage_ratio,
  case
    when coalesce(sum(cc.passenger_capacity) filter (where cc.passenger_capacity is not null), 0) < 5000 then 'quiet'
    when coalesce(sum(cc.passenger_capacity) filter (where cc.passenger_capacity is not null), 0) < 10000 then 'elevated'
    when coalesce(sum(cc.passenger_capacity) filter (where cc.passenger_capacity is not null), 0) < 15000 then 'busy'
    else 'high-impact'
  end as band,
  max(cc.last_verified_at) as last_verified_at,
  max(cc.source_name) as source_name
from public.cruise_calls cc
join public.cruise_ports cp on cp.id = cc.port_id
where cc.status <> 'cancelled'
group by cp.island, cc.service_date;

grant select on public.port_load_daily to anon, authenticated, service_role;
