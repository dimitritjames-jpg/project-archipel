-- Media, reviews, engagement

create table public.media (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  kind public.media_kind not null,
  status public.media_status not null default 'processing',
  storage_bucket text,
  storage_path text,
  external_video_url text,
  poster_media_id uuid references public.media(id) on delete set null,
  alt_text text,
  width integer check (width > 0),
  height integer check (height > 0),
  duration_seconds numeric check (duration_seconds >= 0),
  bytes bigint check (bytes >= 0),
  mime_type text,
  blur_data_url text,
  checksum_sha256 text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_source_present check (
    (kind = 'image' and storage_path is not null and external_video_url is null)
    or (kind = 'video' and (storage_path is not null or external_video_url is not null))
  )
);

create unique index one_primary_media_per_business
  on public.media (business_id) where is_primary and status <> 'archived';

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  title text check (char_length(title) <= 120),
  body text not null check (char_length(body) between 10 and 4000),
  status public.review_status not null default 'pending',
  is_verified_visit boolean not null default false,
  moderated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, user_id)
);

create table public.review_summaries (
  business_id uuid primary key references public.businesses(id) on delete cascade,
  approved_count integer not null default 0 check (approved_count >= 0),
  rating_average numeric(3,2) check (rating_average between 1 and 5),
  rating_1_count integer not null default 0,
  rating_2_count integer not null default 0,
  rating_3_count integer not null default 0,
  rating_4_count integer not null default 0,
  rating_5_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.engagement_events (
  id bigint generated always as identity,
  occurred_at timestamptz not null default now(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  kind public.engagement_kind not null,
  anonymous_session_hash text,
  user_id uuid references auth.users(id) on delete set null,
  referrer_host text,
  island_context public.island_code,
  primary key (id, occurred_at)
) partition by range (occurred_at);

create table public.engagement_events_default
  partition of public.engagement_events default;

create table public.business_daily_metrics (
  business_id uuid not null references public.businesses(id) on delete cascade,
  metric_date date not null,
  profile_views integer not null default 0,
  website_clicks integer not null default 0,
  phone_clicks integer not null default 0,
  directions_clicks integer not null default 0,
  saves integer not null default 0,
  shares integer not null default 0,
  primary key (business_id, metric_date)
);
