-- Identity, taxonomy, and business tables

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null check (char_length(name) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  schema_type text not null default 'LocalBusiness',
  description text,
  icon_key text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete restrict,
  primary_category_id uuid not null references public.categories(id) on delete restrict,
  island public.island_code not null,
  name text not null check (char_length(name) between 2 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  description_plain text not null default '',
  status public.business_status not null default 'draft',
  premium_tier public.premium_tier not null default 'none',
  premium_starts_at timestamptz,
  premium_ends_at timestamptz,
  is_verified boolean not null default false,
  street_address text,
  address_locality text,
  postal_code text,
  country_code char(2) not null default 'VI',
  location geography(Point, 4326),
  phone text,
  email citext,
  website_url text,
  price_range text,
  same_as text[] not null default '{}',
  booking_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint premium_window_valid check (
    (premium_tier = 'none' and premium_starts_at is null and premium_ends_at is null)
    or
    (premium_tier <> 'none' and premium_starts_at is not null and premium_ends_at > premium_starts_at)
  ),
  constraint published_has_timestamp check (status <> 'published' or published_at is not null)
);

create table public.business_members (
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null,
  created_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create table public.business_categories (
  business_id uuid not null references public.businesses(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (business_id, category_id)
);

create table public.business_hours (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 1 and 7),
  opens_at time,
  closes_at time,
  is_closed boolean not null default false,
  sort_order smallint not null default 0,
  constraint valid_hours check (
    (is_closed and opens_at is null and closes_at is null)
    or (not is_closed and opens_at is not null and closes_at is not null)
  )
);

create table public.business_special_hours (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  service_date date not null,
  opens_at time,
  closes_at time,
  is_closed boolean not null default false,
  note text,
  unique (business_id, service_date)
);

create table public.business_redirects (
  old_path text primary key check (old_path like '/%'),
  business_id uuid not null references public.businesses(id) on delete cascade,
  created_at timestamptz not null default now()
);
