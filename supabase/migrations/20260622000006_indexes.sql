-- Required indexes

create index businesses_public_island_category
  on public.businesses (island, primary_category_id, premium_tier, updated_at desc)
  where status = 'published';
create index businesses_location_gist on public.businesses using gist (location);
create index businesses_owner_idx on public.businesses (owner_id);
create index business_members_user_idx on public.business_members (user_id, business_id);
create index business_categories_category_idx on public.business_categories (category_id, business_id);
create index media_business_ready_idx on public.media (business_id, sort_order) where status = 'ready';
create index reviews_business_approved_idx on public.reviews (business_id, created_at desc) where status = 'approved';
create index reviews_user_idx on public.reviews (user_id);
create index ferry_services_route_dates_idx on public.ferry_services (route_id, valid_from, valid_to, departure_time);
create index ferry_exceptions_date_idx on public.ferry_service_exceptions (service_date, service_id);
create index cruise_calls_port_date_idx on public.cruise_calls (port_id, service_date) where status <> 'cancelled';
create index search_outbox_pending_idx on public.search_outbox (available_at, id) where processed_at is null;
