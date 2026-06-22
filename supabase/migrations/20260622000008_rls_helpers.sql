-- RLS authorization helpers (private schema, security definer)

create or replace function private.can_edit_business(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.business_members bm
    where bm.business_id = target_business_id
      and bm.user_id = (select auth.uid())
      and bm.role in ('owner', 'editor')
  );
$$;

create or replace function private.owns_business(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.business_members bm
    where bm.business_id = target_business_id
      and bm.user_id = (select auth.uid())
      and bm.role = 'owner'
  );
$$;

create or replace function private.can_view_business_metrics(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.business_members bm
    where bm.business_id = target_business_id
      and bm.user_id = (select auth.uid())
      and bm.role in ('owner', 'editor', 'analyst')
  );
$$;

create or replace function private.is_service_role()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() ->> 'role') = 'service_role',
    false
  );
$$;

revoke all on function private.can_edit_business(uuid) from public;
revoke all on function private.owns_business(uuid) from public;
revoke all on function private.can_view_business_metrics(uuid) from public;
revoke all on function private.is_service_role() from public;

grant execute on function private.can_edit_business(uuid) to authenticated, service_role;
grant execute on function private.owns_business(uuid) to authenticated, service_role;
grant execute on function private.can_view_business_metrics(uuid) to authenticated, service_role;
grant execute on function private.is_service_role() to service_role;

-- Narrow engagement ingest function (service role / route handler only)
create or replace function public.ingest_engagement_event(
  p_business_id uuid,
  p_kind public.engagement_kind,
  p_anonymous_session_hash text default null,
  p_referrer_host text default null,
  p_island_context public.island_code default null
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id bigint;
begin
  if not exists (
    select 1 from public.businesses b where b.id = p_business_id and b.status = 'published'
  ) then
    raise exception 'business not published';
  end if;

  insert into public.engagement_events (
    business_id, kind, anonymous_session_hash, user_id, referrer_host, island_context
  )
  values (
    p_business_id,
    p_kind,
    p_anonymous_session_hash,
    auth.uid(),
    p_referrer_host,
    p_island_context
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.ingest_engagement_event(uuid, public.engagement_kind, text, text, public.island_code) from public;
grant execute on function public.ingest_engagement_event(uuid, public.engagement_kind, text, text, public.island_code) to service_role;
