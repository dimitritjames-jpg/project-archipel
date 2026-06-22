-- Explicitly distinguish demonstration inventory from verified public listings.
-- Demo rows may populate launch layouts but must never imply a real business,
-- verified ownership, live contact data, or paid placement.

alter table public.businesses
  add column if not exists is_demo boolean not null default false;

comment on column public.businesses.is_demo is
  'True only for fictional launch-preview inventory. Demo profiles must be visibly labeled and noindex.';

create index if not exists businesses_demo_status_idx
  on public.businesses (is_demo, status, island);
