-- Transit Engine: ferry schedules and Port Radar: cruise schedules

create table public.ferry_operators (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  website_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ferry_terminals (
  id uuid primary key default gen_random_uuid(),
  island public.island_code not null,
  name text not null,
  slug text not null unique,
  location geography(Point, 4326),
  street_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ferry_routes (
  id uuid primary key default gen_random_uuid(),
  operator_id uuid not null references public.ferry_operators(id) on delete restrict,
  origin_terminal_id uuid not null references public.ferry_terminals(id) on delete restrict,
  destination_terminal_id uuid not null references public.ferry_terminals(id) on delete restrict,
  slug text not null unique,
  display_name text not null,
  typical_duration_minutes integer check (typical_duration_minutes > 0),
  operational_status public.operational_status not null default 'unknown',
  status_note text,
  source_url text not null,
  source_name text not null,
  last_verified_at timestamptz not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (origin_terminal_id <> destination_terminal_id)
);

create table public.ferry_fares (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.ferry_routes(id) on delete cascade,
  rider_type text not null,
  amount numeric(8,2) not null check (amount >= 0),
  currency char(3) not null default 'USD',
  fare_note text,
  valid_from date,
  valid_to date,
  source_url text not null,
  last_verified_at timestamptz not null,
  check (valid_to is null or valid_from is null or valid_to >= valid_from)
);

create table public.ferry_services (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.ferry_routes(id) on delete cascade,
  service_label text,
  valid_from date not null,
  valid_to date,
  days_of_week smallint[] not null,
  departure_time time not null,
  arrival_time time,
  arrival_day_offset smallint not null default 0 check (arrival_day_offset between 0 and 1),
  operational_status public.operational_status not null default 'scheduled',
  source_url text not null,
  last_verified_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (days_of_week <@ array[1,2,3,4,5,6,7]::smallint[]),
  check (cardinality(days_of_week) > 0),
  check (valid_to is null or valid_to >= valid_from)
);

create table public.ferry_service_exceptions (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.ferry_services(id) on delete cascade,
  service_date date not null,
  status public.operational_status not null,
  override_departure_time time,
  override_arrival_time time,
  public_note text,
  source_url text not null,
  last_verified_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, service_date)
);

create table public.cruise_ports (
  id uuid primary key default gen_random_uuid(),
  island public.island_code not null,
  name text not null,
  slug text not null unique,
  location geography(Point, 4326),
  source_url text not null,
  source_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cruise_calls (
  id uuid primary key default gen_random_uuid(),
  port_id uuid not null references public.cruise_ports(id) on delete cascade,
  service_date date not null,
  ship_name text not null,
  passenger_capacity integer check (passenger_capacity >= 0),
  arrival_at timestamptz not null,
  departure_at timestamptz not null,
  status public.cruise_call_status not null default 'scheduled',
  source_url text not null,
  source_name text not null,
  source_record_id text,
  last_verified_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (departure_at > arrival_at),
  unique nulls not distinct (port_id, service_date, ship_name, source_record_id)
);
