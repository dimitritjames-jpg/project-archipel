# VibeVI Warm Caribbean Facelift — Implementation

**Branch:** `codex/vibevi-warm-caribbean-facelift`  
**Rollback:** `checkpoint/pre-facelift-2026-06-25`  
**Status:** In progress — foundation + homepage/search/header complete

## Audit summary

- **Stack:** Next.js 15 App Router, Tailwind v4, Supabase, Mapbox, provider-neutral analytics
- **Prior theme:** Dark-first tokens with a CSS override pass on `main` for warm surfaces
- **Facelift direction:** Native bright cream/sand surfaces, editorial serif headlines, photo-led heroes, reusable facelift components
- **Reusable components retained:** `BusinessProfileView`, `BusinessPreviewCard`, `booking-intent`, analytics helpers, transit widgets

## Media package status

**Official `vibevi_media_package_v1.zip`:** Not installable in this environment (Google Drive permissions + local SSL).  

**Interim bootstrap:** `scripts/bootstrap-vibevi-media.mjs` copies existing `/public/media/generated/` editorial JPGs into the expected `/public/media/vibevi/` tree (66 files). Replace with the official WebP package when available.

**Registry:** `src/lib/vibevi-media.ts` — typed responsive media for home, moods, islands, experiences, search, get-listed, listing placeholders.

**Bridge:** `src/lib/media.ts` helpers now resolve island, hero, experience, category placeholder, and get-listed paths through the vibevi registry.

## Design system

| Token / utility | Location |
|-----------------|----------|
| Cream/sand/teal palette | `globals.css` + component classes |
| `.font-display` | Editorial serif stack (Georgia / Palatino) |
| `.section-shell` | Max-width container |
| `ResponsiveHero` | `src/components/facelift/responsive-hero.tsx` |
| `CategoryIconRail` | `src/components/facelift/category-icon-rail.tsx` |
| `VibeMoodGrid` | `src/components/facelift/vibe-mood-grid.tsx` |
| `EditorialMediaCard` | `src/components/facelift/editorial-media-card.tsx` |
| `TrustBadge` | `src/components/facelift/trust-badge.tsx` |

## Route completion checklist

| Route | Status | Notes |
|-------|--------|-------|
| Homepage `/` | Done | Photo hero, category rail, vibe grid, trending, islands, map |
| Search `/search` | Done | Aerial hero, light search, popular chips, islands, categories |
| St. Thomas `/st-thomas` | Partial | Uses updated island media via `ISLAND_PORTALS`; template polish pending |
| St. John `/st-john` | Partial | Same |
| St. Croix `/st-croix` | Partial | Same |
| Water Island `/water-island` | Partial | Same |
| Experience pillars `/experiences/*` | Partial | Hero media wired; closing band + card grid polish pending |
| Category directories | Partial | Placeholder art wired; filter bar redesign pending |
| Business profiles | Partial | Trust gates preserved; tabbed bright layout pending |
| Map `/map` | Partial | Dark map shell remains |
| Get Listed `/get-listed` | Partial | Hero media wired; owner-forward layout polish pending |
| Ferry / cruise | Unchanged | Functional; visual pass pending |

## Trust rules preserved

- No invented businesses, reviews, ratings, hours, or booking claims
- AI editorial imagery labeled via alt text; not used as named business photography
- Demo/public-info/verified gating unchanged in `listing-trust.ts` and profile views
- Analytics remain provider-neutral

## Validation (latest)

```
npm run typecheck — pass
npm run lint — pass
npm run build — pass (189 pages)
```

## Remaining limitations

1. Install official WebP media package from Drive when permissions allow
2. Add Fraunces or licensed serif via local font files (Google Fonts blocked in build env)
3. Island portal interior template (category rail, editorial promo band)
4. Experience page closing editorial bands
5. Category `DirectoryFilterBar` + bright listing grid
6. Business profile tabs + bright action bar
7. Map split layout bright pass + mobile list/map toggle
8. Get Listed benefits grid visual refresh
9. Remove legacy dark CSS override block once all routes migrated

## Changed files (this pass)

- `public/media/vibevi/**` (interim bootstrap)
- `scripts/bootstrap-vibevi-media.mjs`
- `src/lib/vibevi-media.ts`
- `src/lib/media.ts`
- `src/components/facelift/*`
- `src/app/page.tsx`
- `src/app/search/page.tsx`
- `src/components/search/home-search-bar.tsx`
- `src/components/layout/site-header.tsx`
- `src/app/globals.css`
- `docs/VIBEVI_FACELIFT_IMPLEMENTATION.md`
