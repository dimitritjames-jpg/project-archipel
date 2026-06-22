# VibeVI

**Find Your Island Vibe.**

VibeVI is the modern discovery layer for the U.S. Virgin Islands—helping visitors, locals, crews, and businesses find beaches, boats, bites, nightlife, ferry checks, cruise-day planning, local experiences, and island businesses across St. Thomas, St. Croix, St. John, and Water Island.

## Product focus

The launch foundation prioritizes useful discovery over feature volume:

- Island hubs, category directories, and source-backed business profiles
- High-intent field guides with strong internal links
- Schedule-based ferry planning and scheduled cruise-capacity context
- Search and map discovery backed by published Supabase records
- Clearly labeled previews for owner tools and incomplete datasets

VibeVI does not claim live ferry positions, real-time traffic, actual cruise passenger counts, live booking inventory, or active self-serve business claiming.

## Launch inventory

`src/lib/businesses/launch-preview-catalog.ts` provides 24 fictional, clearly labeled demo profiles when a category has no reachable published Supabase records. Demo profiles:

- contain no phone numbers, hours, prices, booking links, or availability claims
- are unverified and never receive premium placement
- are marked `is_demo` and emitted with `noindex`
- do not emit `LocalBusiness` structured data

The `is_demo` database flag is introduced by migration `20260622000013_business_demo_flag.sql`. Replace demo inventory with verified, source-backed business records before public launch.

## Business inquiries

The `/get-listed` page explains current listing value and future premium/sponsor directions without implying self-serve onboarding. Set `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` to enable its prefilled mail inquiry links. When unset, the UI displays a configuration-pending state.

## Public launch operations

- Real-business import template: `data/business-import-template.json`
- Verified inventory and schema workflow: `docs/verified-inventory-workflow.md`
- Privacy-conscious analytics plan: `docs/analytics-foundation.md`
- Local business outreach copy: `docs/business-outreach.md`
- Go/no-go launch control: `docs/launch-readiness.md`

The browser analytics boundary currently dispatches local `vibevi:analytics` events only. No provider, cookie, tracking pixel, network collection, or analytics secret is enabled by default.

## Stack

- **Next.js 15** App Router, React 19, TypeScript, Tailwind CSS
- **Supabase** PostgreSQL with Row Level Security
- **Mapbox GL JS** with a premium no-token fallback
- **Framer Motion** for restrained interface motion
- **Algolia adapter** planned and disabled until production indexing is configured

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

The database workflow targets a linked Supabase Cloud environment. Local Docker is not required for the frontend build.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Media

Only licensed, commissioned, or owned media belongs in `public/media`. See `public/media/README.md` for the launch naming convention and drop locations. The production UI remains complete with legal gradient fallbacks when no photography is present.

## Canonical timezone

Ferry and cruise display logic uses `America/St_Thomas` (Atlantic Standard Time, UTC−04:00).

## Intentional legacy internals

Some internal identifiers retain the original `archipel` codename to protect migration and integration stability. These include SQL seed identities, Supabase project configuration, CSS token names, Mapbox layer IDs, internal component/function names, and the planned Algolia index name. They are not public brand references.
