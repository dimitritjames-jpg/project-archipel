-- Search outbox and audit log

create table public.search_outbox (
  id bigint generated always as identity primary key,
  aggregate_type text not null check (aggregate_type = 'business'),
  aggregate_id uuid not null,
  operation public.outbox_operation not null,
  payload_version integer not null default 1,
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  processed_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);

create table public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_state jsonb,
  after_state jsonb,
  request_id text,
  created_at timestamptz not null default now()
);
