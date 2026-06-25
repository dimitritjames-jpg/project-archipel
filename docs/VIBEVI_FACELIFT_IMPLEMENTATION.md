# VibeVI Warm Caribbean Facelift — Implementation

**Branch:** `codex/vibevi-warm-caribbean-facelift`  
**Rollback:** `checkpoint/pre-facelift-2026-06-25` (do not modify)  
**Status:** Phase 2 complete — island portals, experiences, directories, profiles, map, get-listed

## Audit summary

- **Stack:** Next.js 15 App Router, Tailwind v4, Supabase, Mapbox, provider-neutral analytics
- **Facelift direction:** Bright cream/sand surfaces, editorial serif headlines, photo-led heroes, white cards, warm Caribbean tone
- **Design reference:** `docs/facelift-renders/` (structural/layout reference; live site uses approved **bright** warm palette per design brief, not the dark mock backgrounds in early renders)

## Media package status

**Official `vibevi_media_package_v1.zip`:** Installed at `public/media/vibevi/` (69 WebP assets + manifest).

**Reference renders:** `docs/facelift-renders/` — visual QA contact sheet + page mocks.

**Registry:** `src/lib/vibevi-media.ts` — islands, experiences, search, get-listed, listing placeholders.

## Design system (Phase 2 additions)

| Component | Path |
|-----------|------|
| `VvPage`, `VvCard`, `VvEyebrow`, `VvHeading`, buttons | `src/components/facelift/vv-ui.tsx` |
| `FilterChipRail` | `src/components/facelift/filter-chip-rail.tsx` |
| `EditorialBand` | `src/components/facelift/editorial-band.tsx` |
| `ListingCard` | `src/components/facelift/listing-card.tsx` |
| `DirectoryHero` | `src/components/facelift/directory-hero.tsx` |
| `IslandPortalLayout` | `src/components/facelift/island-portal-layout.tsx` |
| `BusinessProfileTabs` | `src/components/facelift/business-profile-tabs.tsx` |
| `BusinessProfileMapPreview` | `src/components/facelift/business-profile-map-preview.tsx` |
| `MapRouteBoard` | `src/components/facelift/map-route-board.tsx` |
| Phase 1 components | `responsive-hero`, `category-icon-rail`, `vibe-mood-grid`, `editorial-media-card`, `trust-badge` |

## Route completion checklist

| Route | Status | Render reference |
|-------|--------|------------------|
| Homepage `/` | Done (Phase 1) | `01_homepage_redesign.png` |
| Search `/search` | Done (Phase 1) | `02_find_move_search_redesign.png` |
| St. Thomas `/st-thomas` | Done | `03_island_portal_redesign.png` |
| St. John `/st-john` | Done | `03_island_portal_redesign.png` |
| St. Croix `/st-croix` | Done | `03_island_portal_redesign.png` |
| Water Island `/water-island` | Done | `03_island_portal_redesign.png` |
| Experience pillars `/experiences/*` (8) | Done | `04_experience_guide_redesign.png` |
| Category directories `/{island}/{category}` | Done | `05_category_directory_redesign.png` |
| Business profiles | Done | `06_business_profile_redesign.png` |
| Map `/map` | Done | `07_map_route_board_redesign.png` |
| Get Listed `/get-listed` | Done | `08_get_listed_redesign.png` |
| Ferry / cruise utility pages | Unchanged | Functional; visual pass deferred |

## Media registry usage

- **Island heroes:** `VIBEVI_ISLANDS` per slug (desktop/mobile WebP)
- **Experience heroes:** `VIBEVI_EXPERIENCES` per pillar slug
- **Search / map CTA band:** `VIBEVI_SEARCH.hero`
- **Get Listed hero:** `VIBEVI_GET_LISTED.hero`
- **Listing cards / missing listing media:** `getListingPlaceholder(categorySlug)` — never shown as real business photography
- **Category rail / directory art:** `getCategoryMediaAsset()` bridged through `src/lib/media.ts`

## Trust rules preserved

- No invented businesses, reviews, ratings, hours, or booking claims
- Category placeholder art labeled in alt text; not used as named business storefront/team/dish photos
- Demo / public-info / verified gating unchanged (`listing-trust.ts`)
- Profile tabs: honest empty states for photos and reviews
- Analytics remain provider-neutral

## Validation

```
npm run typecheck — pass
npm run lint — pass
npm run build — pass (189 pages)
```

**Visual QA:** Screenshots captured from production build (`next start`) at `docs/facelift-screenshots/`.

| Screenshot | Path |
|------------|------|
| Homepage 1440 | `docs/facelift-screenshots/homepage-1440.png` |
| Homepage 375 | `docs/facelift-screenshots/homepage-375.png` |
| Search 1440 / 375 | `docs/facelift-screenshots/search-1440.png`, `search-375.png` |
| Island portal 1440 / 375 | `docs/facelift-screenshots/island-st-thomas-1440.png`, `island-st-thomas-375.png` |
| Experience 1440 / 375 | `docs/facelift-screenshots/experience-adventure-1440.png`, `experience-adventure-375.png` |
| Category directory 1440 | `docs/facelift-screenshots/category-nightlife-1440.png` |
| Business profile 1440 | `docs/facelift-screenshots/business-profile-1440.png` |
| Map 1440 | `docs/facelift-screenshots/map-1440.png` |
| Get Listed 1440 / 375 | `docs/facelift-screenshots/get-listed-1440.png`, `get-listed-375.png` |

Capture script: `node scripts/capture-facelift-screenshots.mjs http://localhost:PORT` (requires Playwright + Edge channel).

## Visual check vs renders

| Area | Match | Notes |
|------|-------|-------|
| Overall brightness / cream surfaces | Yes | Live site uses bright `#fffaf3` system per design brief |
| Serif headlines + sans UI | Yes | `.font-display` stack |
| White cards + soft shadows | Yes | `VvCard`, `ListingCard`, `EditorialMediaCard` |
| Photo-led heroes | Yes | Official WebP via registry |
| Category icon rail position | Yes | Below hero on island + search patterns |
| Map split panel + mobile toggle | Yes | List/map switch at `lg` breakpoint |
| Business profile tabs | Yes | Overview / Services / Photos / Reviews / Details |
| Get Listed local-business focus | Yes | Owner hero + role cards |
| Render mock dark backgrounds | Intentional diff | Approved **implementation** brief specifies bright Caribbean; renders used for layout hierarchy |

## Known limitations

1. Fraunces / licensed serif — local font files still needed (Google Fonts SSL in build env)
2. Mapbox warm custom markers — depends on `NEXT_PUBLIC_MAPBOX_STYLE_URL` / `applyArchipelStyle`
3. Saved routes — not in data model; map shows static route cards only
4. `PlanThisExperienceCard` / `BookingIntentPanel` — still use some legacy dark-surface classes inside experience page sidebar
5. Ferry / cruise / guide interior pages — not yet migrated to bright shell
6. Legacy `globals.css` dark `:root` block remains for unmigrated surfaces

## Changed files (Phase 2)

**New components**
- `src/components/facelift/vv-ui.tsx`
- `src/components/facelift/filter-chip-rail.tsx`
- `src/components/facelift/editorial-band.tsx`
- `src/components/facelift/listing-card.tsx`
- `src/components/facelift/directory-hero.tsx`
- `src/components/facelift/island-portal-layout.tsx`
- `src/components/facelift/business-profile-tabs.tsx`
- `src/components/facelift/business-profile-map-preview.tsx`
- `src/components/facelift/map-route-board.tsx`

**Updated routes / views**
- `src/app/[island]/page.tsx`
- `src/app/[island]/[categorySlug]/page.tsx`
- `src/components/experience/experience-pillar-page.tsx`
- `src/components/business/business-profile-view.tsx`
- `src/components/discovery/business-preview-card.tsx`
- `src/app/map/page.tsx`
- `src/app/get-listed/page.tsx`
- `src/components/map/DirectoryMap.tsx`

**QA / docs**
- `scripts/capture-facelift-screenshots.mjs`
- `docs/facelift-screenshots/*.png`
- `docs/VIBEVI_FACELIFT_IMPLEMENTATION.md`

## Next recommended pass

1. Brighten `booking-intent.tsx` panels to match `VvCard` system
2. Migrate ferry/cruise/guide utility pages off `MediaBackdrop` dark shell
3. Add `DirectoryFilterBar` sort controls when backend sort is available
4. Local Fraunces font files + remove dark CSS override block in `globals.css`
5. Mapbox style pass for warmer water/land tones
6. Owner dashboard / claim flow UI when backend is ready
