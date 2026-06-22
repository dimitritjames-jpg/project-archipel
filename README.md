# Project Archipel

US Virgin Islands commerce directory and daily utility platform.

## Stack

- **Next.js 15** App Router, TypeScript, Tailwind CSS
- **Supabase** PostgreSQL with Row Level Security
- **Mapbox GL JS** (react-map-gl) — Phase 2
- **Algolia** search — Phase 2
- **Framer Motion** — Phase 2

## Phase 1 deliverables

- [x] Next.js App Router scaffold with full routing tree
- [x] Core taxonomy constants (6 categories)
- [x] Island slug validation (`st-thomas`, `st-croix`, `st-john`, `water-island`)
- [x] Supabase migrations: enums, tables, indexes, triggers
- [x] RLS policies (public read / authenticated write / service role ingestion)
- [x] Column-level privilege restrictions on privileged fields
- [x] Seed data: categories, ferry terminals/routes, cruise ports
- [x] `port_load_daily` view for Crowd Predictor bands
- [x] pgTAP security test suite
- [x] SEO foundations: `sitemap.ts`, `robots.ts`, WebSite JSON-LD
- [x] Design tokens (indigo / botanical / coral)

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

### Database (requires Docker + Supabase CLI)

```bash
npx supabase start
npx supabase db reset
npm run db:test
```

## Canonical timezone

All ferry and cruise display logic uses `America/St_Thomas`.
