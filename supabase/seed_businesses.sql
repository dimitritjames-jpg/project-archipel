-- =============================================================================
-- Project Archipel — Phase 3, Module 1: Curated Business Directory Seed
-- =============================================================================
-- 8 published listings across STT · STJ · STX · WI
-- Categories: Excursions, Dining, Stays, Nightlife, Wellness
--
-- Idempotent: fixed UUIDs; safe to re-run (deletes prior seed block first).
--
-- APPLY TO SUPABASE CLOUD (pick one):
--
--   1. Supabase CLI (recommended)
--      cd c:\Users\dimit\.cursor\projects\project-archipel
--      npx supabase login
--      npx supabase link --project-ref YOUR_PROJECT_REF
--      npx supabase db query --linked --file supabase/seed_businesses.sql
--
--   2. psql with connection string (Dashboard → Settings → Database)
--      psql "postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres" -f supabase/seed_businesses.sql
--
--   3. Supabase Dashboard → SQL Editor → paste entire file → Run
--
-- PREREQUISITE: categories must exist (run migrations or seed.sql first).
-- VERIFY:
--   select island, count(*) from public.businesses where status = 'published' group by island;
-- =============================================================================

begin;

-- ---------------------------------------------------------------------------
-- Seed owner (required FK + deferred business_members constraint)
-- ---------------------------------------------------------------------------
do $$
declare
  seed_owner_id uuid := 'f0000000-0000-4000-8000-000000000001';
  seed_instance_id uuid;
begin
  select coalesce(
    (select instance_id from auth.users limit 1),
    '00000000-0000-0000-0000-000000000000'::uuid
  )
  into seed_instance_id;

  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  values (
    seed_owner_id,
    seed_instance_id,
    'authenticated',
    'authenticated',
    'directory-seed@projectarchipel.local',
    extensions.crypt('archipel-seed-not-for-login', extensions.gen_salt('bf')),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"display_name":"Archipel Directory Seed"}'::jsonb,
    timezone('utc', now()),
    timezone('utc', now())
  )
  on conflict (id) do nothing;

  insert into auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    seed_owner_id,
    seed_owner_id,
    'directory-seed@projectarchipel.local',
    jsonb_build_object(
      'sub', seed_owner_id::text,
      'email', 'directory-seed@projectarchipel.local',
      'email_verified', true
    ),
    'email',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now())
  )
  on conflict (provider_id, provider) do nothing;

  insert into public.profiles (id, display_name)
  values (seed_owner_id, 'Archipel Directory Seed')
  on conflict (id) do update set display_name = excluded.display_name;
end $$;

-- ---------------------------------------------------------------------------
-- Reset prior seed rows (fixed UUID block e1000000-…-001 … 008)
-- ---------------------------------------------------------------------------
delete from public.business_categories
where business_id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
);

delete from public.review_summaries
where business_id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
);

delete from public.business_members
where business_id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
);

delete from public.businesses
where id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
);

-- ---------------------------------------------------------------------------
-- 8 published businesses
-- Island spread: STJ×2 · STT×3 · STX×2 · WI×1
-- ---------------------------------------------------------------------------
insert into public.businesses (
  id,
  owner_id,
  primary_category_id,
  island,
  name,
  slug,
  description_json,
  description_plain,
  status,
  premium_tier,
  premium_starts_at,
  premium_ends_at,
  is_verified,
  street_address,
  address_locality,
  postal_code,
  country_code,
  location,
  phone,
  email,
  website_url,
  price_range,
  booking_url,
  published_at
)
values
  -- 1 · STJ · Excursions & Charters
  (
    'e1000000-0000-4000-8000-000000000001',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'excursions-charters'),
    'STJ',
    'Azure Current Charters',
    'azure-current-charters',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Depart Cruz Bay aboard a 50-foot luxury catamaran built for unhurried elegance. Champagne service, reef-safe snorkel gear, and a captain who knows every sandbar between St. John and the British Virgin Islands."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Sunset sails, private day charters, and bespoke Pillsbury Sound itineraries—refined island time, measured in turquoise horizons."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A sleek 50-foot luxury catamaran from Cruz Bay offering sunset sails through Pillsbury Sound, with champagne service, snorkel stops at pristine cays, and a crew that knows every secret sandbar between St. John and the British Virgin Islands.',
    'published',
    'featured',
    timezone('utc', now()),
    timezone('utc', now()) + interval '1 year',
    true,
    'Cruz Bay Dock, St. John',
    'Cruz Bay',
    '00830',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.7938, 18.3313), 4326)::geography,
    '+1-340-555-0101',
    'sail@azurecurrent.vi',
    'https://azurecurrent.vi',
    '$$$',
    'https://azurecurrent.vi/book',
    timezone('utc', now())
  ),
  -- 2 · STT · Indulgent Dining
  (
    'e1000000-0000-4000-8000-000000000002',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'indulgent-dining'),
    'STT',
    'Harbor & Hibiscus Supper Club',
    'harbor-and-hibiscus-supper-club',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "An intimate Charlotte Amalie supper club where coral-to-table seafood meets rum-pairing flights and chef-led tasting menus on a candlelit harbor terrace."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Watch megayachts slip past the emerald bay while sommeliers guide you through aged agricole rums and Atlantic-caught delicacies—dining as theatre, refined not loud."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'An intimate waterfront supper club in Charlotte Amalie serving coral-to-table seafood, rum-pairing flights, and chef-led tasting menus on a candlelit harbor terrace as megayachts slip past the emerald bay.',
    'published',
    'signature',
    timezone('utc', now()),
    timezone('utc', now()) + interval '1 year',
    true,
    '1 Waterfront Promenade',
    'Charlotte Amalie',
    '00802',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.9307, 18.3419), 4326)::geography,
    '+1-340-555-0102',
    'reservations@harborhibiscus.vi',
    'https://harborhibiscus.vi',
    '$$$$',
    'https://harborhibiscus.vi/reserve',
    timezone('utc', now())
  ),
  -- 3 · STX · Boutique Stays
  (
    'e1000000-0000-4000-8000-000000000003',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'boutique-stays'),
    'STX',
    'Cane Bay Cliff Villa',
    'cane-bay-cliff-villa',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "A private clifftop villa on St. Croix's north shore with infinity plunge pools, travertine terraces, and unobstructed Cane Bay sunsets."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Designed for slow mornings, reef snorkeling afternoons, and chef-prepared villa dinners under a canopy of stars—boutique hospitality without a front desk."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A private clifftop villa on St. Croix''s north shore with infinity plunge pools, travertine terraces, and unobstructed Cane Bay sunsets—designed for slow mornings, reef snorkeling afternoons, and chef-prepared villa dinners under the stars.',
    'published',
    'featured',
    timezone('utc', now()),
    timezone('utc', now()) + interval '1 year',
    true,
    'North Shore Road, Cane Bay',
    'Kingshill',
    '00850',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.8050, 17.7620), 4326)::geography,
    '+1-340-555-0103',
    'stay@canebaycliff.vi',
    'https://canebaycliff.vi',
    '$$$$',
    'https://canebaycliff.vi/availability',
    timezone('utc', now())
  ),
  -- 4 · STT · Nightlife & Rhythm
  (
    'e1000000-0000-4000-8000-000000000004',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'nightlife-rhythm'),
    'STT',
    'Ember & Tide Rooftop',
    'ember-and-tide-rooftop',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Red Hook's rooftop address for live steel-pan sets, mezcal cocktails, and late-night small plates—low amber light, Pillsbury Sound glittering below."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Equal parts yacht-club polish and island rhythm. Dress sharp, stay late, let the tide set the tempo."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A Red Hook rooftop lounge where live steel-pan sets meet mezcal cocktails, low amber lighting, and late-night small plates—equal parts yacht-club polish and island rhythm, with Pillsbury Sound glittering below.',
    'published',
    'none',
    null,
    null,
    true,
    '6700 Red Hook Plaza, Suite 4',
    'Red Hook',
    '00802',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.8502, 18.3250), 4326)::geography,
    '+1-340-555-0104',
    'hello@emberandtide.vi',
    'https://emberandtide.vi',
    '$$$',
    null,
    timezone('utc', now())
  ),
  -- 5 · STT · Wellness & Spas
  (
    'e1000000-0000-4000-8000-000000000005',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'wellness-spas'),
    'STT',
    'Solstice Spa at Magens',
    'solstice-spa-at-magens',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "A botanical spa pavilion above Magens Bay offering ocean-mineral body rituals, warm-stone massages, and open-air relaxation decks scented with lemongrass and sea salt."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Wellness framed by one of the Caribbean's most iconic beaches—restore, breathe, return to the water renewed."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A botanical spa pavilion above Magens Bay offering ocean-mineral body rituals, warm-stone massages, and open-air relaxation decks scented with lemongrass and sea salt—wellness framed by one of the Caribbean''s most iconic beaches.',
    'published',
    'featured',
    timezone('utc', now()),
    timezone('utc', now()) + interval '1 year',
    true,
    'Magens Bay Road',
    'St. Thomas',
    '00802',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.9200, 18.3550), 4326)::geography,
    '+1-340-555-0105',
    'book@solsticespa.vi',
    'https://solsticespa.vi',
    '$$$',
    'https://solsticespa.vi/appointments',
    timezone('utc', now())
  ),
  -- 6 · STJ · Indulgent Dining
  (
    'e1000000-0000-4000-8000-000000000006',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'indulgent-dining'),
    'STJ',
    'Coral & Salt Kitchen',
    'coral-and-salt-kitchen',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Cruz Bay's open-fire coastal dining room—whole roasted snapper, wood-grilled octopus, heritage goat curry—in a breezy courtyard steps from the ferry dock."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "A wine list heavy on crisp Mediterranean whites. Reservations recommended; walk-ins welcomed at the bar with a rum old-fashioned."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A Cruz Bay dining room devoted to open-fire coastal cuisine—whole roasted snapper, wood-grilled octopus, and heritage goat curry—served in a breezy courtyard steps from the ferry dock, with a wine list heavy on crisp Mediterranean whites.',
    'published',
    'none',
    null,
    null,
    true,
    '3 Mongoose Junction, Cruz Bay',
    'Cruz Bay',
    '00830',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.7955, 18.3305), 4326)::geography,
    '+1-340-555-0106',
    'tables@coralandsalt.vi',
    'https://coralandsalt.vi',
    '$$$',
    'https://coralandsalt.vi/reservations',
    timezone('utc', now())
  ),
  -- 7 · STX · Excursions & Charters
  (
    'e1000000-0000-4000-8000-000000000007',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'excursions-charters'),
    'STX',
    'Reef Runner Expeditions',
    'reef-runner-expeditions',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Christiansted-based expedition charters to Buck Island Reef, East End cays, and bioluminescent bays aboard a fast 42-foot twin-hull."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Snorkel guides, reef-safe gear, and cold towels waiting when you climb back aboard—adventure with concierge-level care."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'Christiansted-based expedition charters to Buck Island Reef, East End cays, and bioluminescent bays aboard a fast 42-foot twin-hull—snorkel guides, reef-safe gear, and cold towels waiting when you climb back aboard.',
    'published',
    'none',
    null,
    null,
    true,
    'King Street Wharf, Christiansted',
    'Christiansted',
    '00820',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.7032, 17.7469), 4326)::geography,
    '+1-340-555-0107',
    'expeditions@reefrunner.vi',
    'https://reefrunner.vi',
    '$$',
    'https://reefrunner.vi/charters',
    timezone('utc', now())
  ),
  -- 8 · WI · Boutique Stays
  (
    'e1000000-0000-4000-8000-000000000008',
    'f0000000-0000-4000-8000-000000000001',
    (select id from public.categories where slug = 'boutique-stays'),
    'WI',
    'Honeymoon Cove Hideaway',
    'honeymoon-cove-hideaway',
    $json${
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "A secluded Water Island villa with panoramic views over Honeymoon Beach, private beach access, and a screened infinity veranda made for sunrise coffee."
            }
          ]
        },
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Five minutes from St. Thomas by ferry, worlds away in temperament—an unhurried escape for couples and small gatherings who value discretion."
            }
          ]
        }
      ]
    }$json$::jsonb,
    'A secluded Water Island villa with panoramic views over Honeymoon Beach, private beach access, and a screened infinity veranda made for sunrise coffee—an unhurried escape five minutes from St. Thomas by ferry, worlds away in temperament.',
    'published',
    'signature',
    timezone('utc', now()),
    timezone('utc', now()) + interval '1 year',
    true,
    'Honeymoon Beach Road',
    'Water Island',
    '00802',
    'VI',
    ST_SetSRID(ST_MakePoint(-64.9642, 18.3185), 4326)::geography,
    '+1-340-555-0108',
    'villa@honeymooncove.vi',
    'https://honeymooncove.vi',
    '$$$$',
    'https://honeymooncove.vi/book',
    timezone('utc', now())
  );

-- Owner membership (satisfies deferred constraint trigger)
insert into public.business_members (business_id, user_id, role)
select id, 'f0000000-0000-4000-8000-000000000001', 'owner'
from public.businesses
where id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
)
on conflict do nothing;

-- Primary category junction rows (search facets)
insert into public.business_categories (business_id, category_id)
select b.id, b.primary_category_id
from public.businesses b
where b.id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
)
on conflict do nothing;

-- Empty review summaries (ready for moderation pipeline)
insert into public.review_summaries (business_id, approved_count)
select id, 0
from public.businesses
where id in (
  'e1000000-0000-4000-8000-000000000001',
  'e1000000-0000-4000-8000-000000000002',
  'e1000000-0000-4000-8000-000000000003',
  'e1000000-0000-4000-8000-000000000004',
  'e1000000-0000-4000-8000-000000000005',
  'e1000000-0000-4000-8000-000000000006',
  'e1000000-0000-4000-8000-000000000007',
  'e1000000-0000-4000-8000-000000000008'
)
on conflict (business_id) do nothing;

commit;

-- Post-run verification (run separately if desired):
-- select b.name, b.island, c.slug as category,
--        ST_Y(b.location::geometry) as lat, ST_X(b.location::geometry) as lng
-- from public.businesses b
-- join public.categories c on c.id = b.primary_category_id
-- where b.status = 'published'
-- order by b.island, b.name;
