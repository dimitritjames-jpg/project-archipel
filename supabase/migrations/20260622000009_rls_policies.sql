-- Enable RLS on all public tables and force RLS

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.business_categories enable row level security;
alter table public.business_hours enable row level security;
alter table public.business_special_hours enable row level security;
alter table public.business_redirects enable row level security;
alter table public.media enable row level security;
alter table public.reviews enable row level security;
alter table public.review_summaries enable row level security;
alter table public.engagement_events enable row level security;
alter table public.business_daily_metrics enable row level security;
alter table public.ferry_operators enable row level security;
alter table public.ferry_terminals enable row level security;
alter table public.ferry_routes enable row level security;
alter table public.ferry_fares enable row level security;
alter table public.ferry_services enable row level security;
alter table public.ferry_service_exceptions enable row level security;
alter table public.cruise_ports enable row level security;
alter table public.cruise_calls enable row level security;
alter table public.search_outbox enable row level security;
alter table public.admin_audit_log enable row level security;

alter table public.profiles force row level security;
alter table public.categories force row level security;
alter table public.businesses force row level security;
alter table public.business_members force row level security;
alter table public.business_categories force row level security;
alter table public.business_hours force row level security;
alter table public.business_special_hours force row level security;
alter table public.business_redirects force row level security;
alter table public.media force row level security;
alter table public.reviews force row level security;
alter table public.review_summaries force row level security;
alter table public.engagement_events force row level security;
alter table public.business_daily_metrics force row level security;
alter table public.ferry_operators force row level security;
alter table public.ferry_terminals force row level security;
alter table public.ferry_routes force row level security;
alter table public.ferry_fares force row level security;
alter table public.ferry_services force row level security;
alter table public.ferry_service_exceptions force row level security;
alter table public.cruise_ports force row level security;
alter table public.cruise_calls force row level security;
alter table public.search_outbox force row level security;
alter table public.admin_audit_log force row level security;

-- Profiles
create policy profiles_self_read on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_self_update on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Categories: public read active
create policy categories_public_read on public.categories for select to anon, authenticated
  using (is_active = true);

create policy categories_service_manage on public.categories for all to service_role
  using (true) with check (true);

-- Businesses
create policy businesses_public_read on public.businesses for select to anon, authenticated
  using (status = 'published');

create policy businesses_member_read on public.businesses for select to authenticated
  using ((select private.can_edit_business(id)));

create policy businesses_owner_insert_draft on public.businesses for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and status = 'draft'
    and premium_tier = 'none'
    and is_verified = false
  );

create policy businesses_member_update on public.businesses for update to authenticated
  using ((select private.can_edit_business(id)))
  with check ((select private.can_edit_business(id)));

create policy businesses_service_all on public.businesses for all to service_role
  using (true) with check (true);

-- Business members
create policy business_members_self_read on public.business_members for select to authenticated
  using (user_id = (select auth.uid()));

create policy business_members_service_all on public.business_members for all to service_role
  using (true) with check (true);

-- Business categories
create policy business_categories_public_read on public.business_categories for select to anon, authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = business_id and b.status = 'published'
    )
  );

create policy business_categories_member_read on public.business_categories for select to authenticated
  using ((select private.can_edit_business(business_id)));

create policy business_categories_member_write on public.business_categories for all to authenticated
  using ((select private.can_edit_business(business_id)))
  with check ((select private.can_edit_business(business_id)));

create policy business_categories_service_all on public.business_categories for all to service_role
  using (true) with check (true);

-- Business hours
create policy business_hours_public_read on public.business_hours for select to anon, authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = business_id and b.status = 'published'
    )
  );

create policy business_hours_member_all on public.business_hours for all to authenticated
  using ((select private.can_edit_business(business_id)))
  with check ((select private.can_edit_business(business_id)));

create policy business_hours_service_all on public.business_hours for all to service_role
  using (true) with check (true);

-- Business special hours
create policy business_special_hours_public_read on public.business_special_hours for select to anon, authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = business_id and b.status = 'published'
    )
  );

create policy business_special_hours_member_all on public.business_special_hours for all to authenticated
  using ((select private.can_edit_business(business_id)))
  with check ((select private.can_edit_business(business_id)));

create policy business_special_hours_service_all on public.business_special_hours for all to service_role
  using (true) with check (true);

-- Business redirects: public read
create policy business_redirects_public_read on public.business_redirects for select to anon, authenticated
  using (true);

create policy business_redirects_service_all on public.business_redirects for all to service_role
  using (true) with check (true);

-- Media
create policy media_public_read on public.media for select to anon, authenticated
  using (
    status = 'ready'
    and exists (
      select 1 from public.businesses b
      where b.id = business_id and b.status = 'published'
    )
  );

create policy media_member_all on public.media for all to authenticated
  using ((select private.can_edit_business(business_id)))
  with check ((select private.can_edit_business(business_id)));

create policy media_service_all on public.media for all to service_role
  using (true) with check (true);

-- Reviews
create policy reviews_public_read on public.reviews for select to anon, authenticated
  using (status = 'approved');

create policy reviews_author_read on public.reviews for select to authenticated
  using (user_id = (select auth.uid()));

create policy reviews_author_insert on public.reviews for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'pending');

create policy reviews_author_update on public.reviews for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy reviews_service_all on public.reviews for all to service_role
  using (true) with check (true);

-- Review summaries
create policy review_summaries_public_read on public.review_summaries for select to anon, authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = business_id and b.status = 'published'
    )
  );

create policy review_summaries_service_all on public.review_summaries for all to service_role
  using (true) with check (true);

-- Engagement events: no direct client access
create policy engagement_events_service_all on public.engagement_events for all to service_role
  using (true) with check (true);

-- Business daily metrics
create policy business_daily_metrics_member_read on public.business_daily_metrics for select to authenticated
  using ((select private.can_view_business_metrics(business_id)));

create policy business_daily_metrics_service_all on public.business_daily_metrics for all to service_role
  using (true) with check (true);

-- Ferry tables: public read
create policy ferry_operators_public_read on public.ferry_operators for select to anon, authenticated
  using (true);

create policy ferry_terminals_public_read on public.ferry_terminals for select to anon, authenticated
  using (true);

create policy ferry_routes_public_read on public.ferry_routes for select to anon, authenticated
  using (is_public = true);

create policy ferry_fares_public_read on public.ferry_fares for select to anon, authenticated
  using (true);

create policy ferry_services_public_read on public.ferry_services for select to anon, authenticated
  using (true);

create policy ferry_exceptions_public_read on public.ferry_service_exceptions for select to anon, authenticated
  using (true);

create policy ferry_operators_service_all on public.ferry_operators for all to service_role using (true) with check (true);
create policy ferry_terminals_service_all on public.ferry_terminals for all to service_role using (true) with check (true);
create policy ferry_routes_service_all on public.ferry_routes for all to service_role using (true) with check (true);
create policy ferry_fares_service_all on public.ferry_fares for all to service_role using (true) with check (true);
create policy ferry_services_service_all on public.ferry_services for all to service_role using (true) with check (true);
create policy ferry_exceptions_service_all on public.ferry_service_exceptions for all to service_role using (true) with check (true);

-- Cruise tables: public read
create policy cruise_ports_public_read on public.cruise_ports for select to anon, authenticated
  using (true);

create policy cruise_calls_public_read on public.cruise_calls for select to anon, authenticated
  using (status <> 'cancelled');

create policy cruise_ports_service_all on public.cruise_ports for all to service_role using (true) with check (true);
create policy cruise_calls_service_all on public.cruise_calls for all to service_role using (true) with check (true);

-- Outbox and audit: service role only
create policy search_outbox_service_all on public.search_outbox for all to service_role
  using (true) with check (true);

create policy admin_audit_log_service_all on public.admin_audit_log for all to service_role
  using (true) with check (true);
