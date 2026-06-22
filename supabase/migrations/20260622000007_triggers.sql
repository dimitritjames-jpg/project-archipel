-- Triggers: updated_at, owner membership invariant, review remoderation, search outbox

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

create trigger businesses_set_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

create trigger media_set_updated_at
  before update on public.media
  for each row execute function public.set_updated_at();

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

create trigger ferry_operators_set_updated_at
  before update on public.ferry_operators
  for each row execute function public.set_updated_at();

create trigger ferry_terminals_set_updated_at
  before update on public.ferry_terminals
  for each row execute function public.set_updated_at();

create trigger ferry_routes_set_updated_at
  before update on public.ferry_routes
  for each row execute function public.set_updated_at();

create trigger ferry_services_set_updated_at
  before update on public.ferry_services
  for each row execute function public.set_updated_at();

create trigger ferry_service_exceptions_set_updated_at
  before update on public.ferry_service_exceptions
  for each row execute function public.set_updated_at();

create trigger cruise_ports_set_updated_at
  before update on public.cruise_ports
  for each row execute function public.set_updated_at();

create trigger cruise_calls_set_updated_at
  before update on public.cruise_calls
  for each row execute function public.set_updated_at();

-- Owner must also be a business_member with role owner (deferred)
create or replace function public.enforce_owner_membership()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from public.business_members bm
    where bm.business_id = new.id
      and bm.user_id = new.owner_id
      and bm.role = 'owner'
  ) then
    raise exception 'owner_id must have a matching owner row in business_members';
  end if;
  return new;
end;
$$;

create constraint trigger businesses_owner_membership
  after insert or update on public.businesses
  deferrable initially deferred
  for each row execute function public.enforce_owner_membership();

-- Approved review edits return to pending
create or replace function public.review_edit_remoderation()
returns trigger
language plpgsql
as $$
begin
  if old.status = 'approved'
     and (new.body is distinct from old.body
          or new.rating is distinct from old.rating
          or new.title is distinct from old.title) then
    new.status := 'pending';
    new.moderated_at := null;
  end if;
  return new;
end;
$$;

create trigger reviews_remoderation
  before update on public.reviews
  for each row execute function public.review_edit_remoderation();

-- Recompute review summaries on moderation change
create or replace function public.refresh_review_summary(p_business_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
  v_avg numeric(3,2);
begin
  select count(*), round(avg(rating)::numeric, 2)
  into v_count, v_avg
  from public.reviews
  where business_id = p_business_id and status = 'approved';

  insert into public.review_summaries (
    business_id, approved_count, rating_average,
    rating_1_count, rating_2_count, rating_3_count, rating_4_count, rating_5_count, updated_at
  )
  select
    p_business_id,
    coalesce(v_count, 0),
    v_avg,
    count(*) filter (where rating = 1),
    count(*) filter (where rating = 2),
    count(*) filter (where rating = 3),
    count(*) filter (where rating = 4),
    count(*) filter (where rating = 5),
    now()
  from public.reviews
  where business_id = p_business_id and status = 'approved'
  on conflict (business_id) do update set
    approved_count = excluded.approved_count,
    rating_average = excluded.rating_average,
    rating_1_count = excluded.rating_1_count,
    rating_2_count = excluded.rating_2_count,
    rating_3_count = excluded.rating_3_count,
    rating_4_count = excluded.rating_4_count,
    rating_5_count = excluded.rating_5_count,
    updated_at = now();
end;
$$;

create or replace function public.reviews_summary_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.refresh_review_summary(coalesce(new.business_id, old.business_id));
  return coalesce(new, old);
end;
$$;

create trigger reviews_summary_refresh
  after insert or update or delete on public.reviews
  for each row execute function public.reviews_summary_trigger();

-- Search outbox on published business changes
create or replace function public.enqueue_business_search_outbox()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    insert into public.search_outbox (aggregate_type, aggregate_id, operation)
    values ('business', old.id, 'delete');
    return old;
  end if;

  if new.status = 'published' then
    insert into public.search_outbox (aggregate_type, aggregate_id, operation)
    values ('business', new.id, 'upsert');
  elsif tg_op = 'UPDATE' and old.status = 'published' and new.status <> 'published' then
    insert into public.search_outbox (aggregate_type, aggregate_id, operation)
    values ('business', new.id, 'delete');
  end if;

  return new;
end;
$$;

create trigger businesses_search_outbox
  after insert or update or delete on public.businesses
  for each row execute function public.enqueue_business_search_outbox();

-- Profile bootstrap on auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), 'Member')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
