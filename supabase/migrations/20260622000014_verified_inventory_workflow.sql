-- Evidence-aware inventory workflow for public launch operations.
-- Premium tier remains an independent commercial field; verification never
-- implies payment, and payment must never imply verification.

alter table public.businesses
  add column if not exists verification_status text not null default 'unverified',
  add column if not exists verification_source text,
  add column if not exists last_verified_at timestamptz,
  add column if not exists contact_permission_status text not null default 'unknown',
  add column if not exists robots_noindex boolean not null default true,
  add column if not exists is_claimed boolean not null default false,
  add column if not exists claimed_at timestamptz;

update public.businesses
set
  verification_status = 'demo',
  contact_permission_status = 'not_requested',
  robots_noindex = true,
  is_verified = false
where is_demo = true;

alter table public.businesses
  drop constraint if exists businesses_verification_status_valid,
  add constraint businesses_verification_status_valid
    check (verification_status in ('demo', 'unverified', 'submitted', 'verified')),
  drop constraint if exists businesses_contact_permission_valid,
  add constraint businesses_contact_permission_valid
    check (contact_permission_status in ('unknown', 'not_requested', 'pending', 'granted', 'declined')),
  drop constraint if exists businesses_claimed_timestamp_valid,
  add constraint businesses_claimed_timestamp_valid
    check ((is_claimed and claimed_at is not null) or (not is_claimed and claimed_at is null));

comment on column public.businesses.verification_status is
  'Editorial verification workflow: demo, unverified, submitted, or verified.';
comment on column public.businesses.verification_source is
  'Internal source note or canonical URL used to verify public listing facts.';
comment on column public.businesses.last_verified_at is
  'When a human last checked the listing against its recorded source.';
comment on column public.businesses.contact_permission_status is
  'Permission state for publishing direct phone/email contact fields.';
comment on column public.businesses.robots_noindex is
  'Explicit editorial override; true prevents search indexing.';
comment on column public.businesses.is_claimed is
  'Future ownership state. Does not imply verification or premium placement.';

create index if not exists businesses_verification_workflow_idx
  on public.businesses (verification_status, robots_noindex, island, updated_at desc);

-- Trust fields are editorial/service-role controls. Authenticated members may
-- edit ordinary profile content through existing policies but cannot self-mark
-- a record demo, verified, indexable, permissioned, or claimed.
revoke update (
  is_demo,
  is_verified,
  verification_status,
  verification_source,
  last_verified_at,
  contact_permission_status,
  robots_noindex,
  is_claimed,
  claimed_at
) on public.businesses from authenticated;

drop policy if exists businesses_owner_insert_draft on public.businesses;
create policy businesses_owner_insert_draft on public.businesses for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and status = 'draft'
    and premium_tier = 'none'
    and is_verified = false
    and is_demo = false
    and verification_status in ('unverified', 'submitted')
    and verification_source is null
    and last_verified_at is null
    and robots_noindex = true
    and is_claimed = false
    and claimed_at is null
  );
