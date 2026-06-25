# VibeVI Warm Caribbean Facelift — Implementation

**Branch:** `codex/vibevi-warm-caribbean-facelift`  
**Rollback:** `checkpoint/pre-facelift-2026-06-25` (do not modify)  
**Status:** Final polish pass complete — ready for preview deployment review (not merged to `main`)

## Audit summary

- **Stack:** Next.js 15 App Router, Tailwind v4, Supabase, Mapbox, provider-neutral analytics
- **Facelift direction:** Bright cream/sand surfaces, editorial serif headlines, photo-led heroes, white cards, warm Caribbean tone
- **Design reference:** `docs/facelift-renders/` (structural/layout reference; live site uses approved **bright** warm palette per design brief)

## Final polish pass summary

Completed a site-wide consistency sweep so public discovery pages share one cohesive VibeVI experience:

1. **Legacy dark components** — `BookingIntentPanel`, `PlanThisExperienceCard`, `ExperienceCTA`, and availability CTAs now use `VvCard`, sea-glass/coral accents, and bright trust language.
2. **Utility page shell** — New `utility-page-shell.tsx` powers ferry, cruise, guide, and island utility pages with `UtilityHero`, white info cards, chip links, and trust notes.
3. **Transit widgets** — `NextBoatWidget` and `CrowdPredictor` use white card surfaces readable on cream backgrounds.
4. **Map warmth** — `ARCHIPEL_MAP_PALETTE` updated to turquoise water / sand land; default Mapbox fallback switched to `light-v11`; markers use sea-glass (`#0797a6`) and coral (`#ff7968`).
5. **Typography** — Documented decision below (no external font download).

## Design system

| Component | Path |
|-----------|------|
| `VvPage`, `VvCard`, `VvEyebrow`, `VvHeading`, buttons | `src/components/facelift/vv-ui.tsx` |
| `UtilityPage`, `UtilityHero`, `UtilityLinkCard`, etc. | `src/components/facelift/utility-page-shell.tsx` |
| `FilterChipRail` | `src/components/facelift/filter-chip-rail.tsx` |
| `EditorialBand` | `src/components/facelift/editorial-band.tsx` |
| `ListingCard` | `src/components/facelift/listing-card.tsx` |
| `DirectoryHero` | `src/components/facelift/directory-hero.tsx` |
| `IslandPortalLayout` | `src/components/facelift/island-portal-layout.tsx` |
| `BusinessProfileTabs` | `src/components/facelift/business-profile-tabs.tsx` |
| `MapRouteBoard` | `src/components/facelift/map-route-board.tsx` |
| Phase 1 components | `responsive-hero`, `category-icon-rail`, `vibe-mood-grid`, `editorial-media-card`, `trust-badge` |

## Route completion checklist

| Route | Status |
|-------|--------|
| Homepage `/` | Done |
| Search `/search` | Done |
| Island portals (4) | Done |
| Experience pillars (8) | Done |
| Category directories | Done |
| Business profiles | Done |
| Map `/map` | Done |
| Get Listed `/get-listed` | Done |
| Ferry hub `/ferry` + route pages | Done (polish pass) |
| Island ferry boards `/{island}/ferry-schedule` | Done (polish pass) |
| Cruise hub `/cruise-day` + `/{island}/cruise-schedule` | Done (polish pass) |
| Cruise port guides (Havensight, Crown Bay) | Done (polish pass) |
| SEO guides `/guides/*` | Done (polish pass) |
| Island utility guides (beaches, things-to-do, day-trip, etc.) | Done (polish pass) |
| Pillar utility pages (Magens Bay, Buck Island, etc.) | Done (polish pass) |
| Dashboard / sign-in | Unchanged (owner tools; out of public facelift scope) |

## Typography decision

**Chosen approach:** System editorial serif stack — no external font loading.

- **Display / headlines:** `Georgia, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, serif` via `.font-display` in `globals.css` and Tailwind `--font-display`
- **UI / body:** Geist Sans (already loaded via `next/font/google` in `layout.tsx`)
- **Fraunces:** Not installed — Google Fonts fetch failed in build environment; no local `.woff2` files exist in repo. Adding remote Fraunces would reintroduce privacy/performance/build-stability risk without bundled files.
- **Rationale:** Palatino/Georgia gives refined editorial headline feel on Windows/macOS without new dependencies.

## Map marker / Mapbox decision

| Layer | Current behavior | Config |
|-------|------------------|--------|
| Base style | `NEXT_PUBLIC_MAPBOX_STYLE_URL` if set; else `mapbox://styles/mapbox/light-v11` | Env |
| Water / land override | `applyArchipelStyle()` paints warm turquoise water (`#9ed4e8`) and sand land (`#e8dcc8`) when studio layers exist; fallback palette scan on standard Mapbox layers | `src/lib/map/apply-archipel-style.ts` |
| Business markers | GeoJSON circles — active `#0797a6`, premium `#ff7968`, inactive `#94a8ad`, selected stroke `#0b4b55` | `ARCHIPEL_MAP_PALETTE` in `usvi-map.ts` |
| Clusters | Sea-glass fill, turquoise stroke | Same palette |
| Custom PNG/SVG markers | Not implemented — would need sprite sheet or symbol layer + design assets |
| Full custom Mapbox Studio style | Possible via `NEXT_PUBLIC_MAPBOX_STYLE_URL` pointing to a VibeVI-branded style | Ops / design follow-up |

Map list/map mobile toggle preserved in `MapRouteBoard`.

## Media registry usage

Unchanged from Phase 2 — all heroes and placeholders route through `src/lib/vibevi-media.ts` and `src/lib/media.ts`. Category placeholders never represent real business photography.

## Trust rules preserved

- No invented businesses, reviews, ratings, hours, live availability, or booking claims
- Ferry/cruise widgets remain schedule-based with explicit trust copy
- Local-first island framing preserved in utility and experience copy
- Demo / public-info / verified gating unchanged

## Validation (final polish)

```
npm run typecheck — pass
npm run lint — pass (clean)
npm run build — pass (189 pages)
```

**Visual QA:** Screenshots at `docs/facelift-screenshots/` (capture against production `next start`).

| Screenshot | Path |
|------------|------|
| Homepage 1440 / 375 | `homepage-1440.png`, `homepage-375.png` |
| Search 1440 / 375 | `search-1440.png`, `search-375.png` |
| Island portal 1440 / 375 | `island-st-thomas-1440.png`, `island-st-thomas-375.png` |
| Experience 1440 / 375 | `experience-adventure-1440.png`, `experience-adventure-375.png` |
| Category directory 1440 | `category-nightlife-1440.png` |
| Business profile 1440 | `business-profile-1440.png` |
| Map 1440 | `map-1440.png` |
| Get Listed 1440 / 375 | `get-listed-1440.png`, `get-listed-375.png` |
| Ferry hub 1440 | `ferry-1440.png` (polish pass) |
| Experience + booking panel 1440 | `experiences-adventure-booking-1440.png` (polish pass) |

Capture: `node scripts/capture-facelift-screenshots.mjs http://localhost:PORT` (Playwright + system Edge).

## Visual check vs renders

| Area | Match | Notes |
|------|-------|-------|
| Bright cream surfaces site-wide | Yes | `UtilityPage`, `VvPage`, globals warm body override |
| White cards + soft shadows | Yes | Utility + discovery components |
| Experience booking panels | Yes | No remaining dark `command-surface` on experience flow |
| Ferry / cruise utilities | Yes | Bright shell; widgets on white cards |
| Map warmth | Improved | Light base + warm palette overrides |
| Render dark mock backgrounds | Intentional diff | Implementation brief specifies bright Caribbean |

## Known limitations

1. **Fraunces** — requires self-hosted font files if brand mandates exact serif; current stack is system serif
2. **Custom map marker icons** — circle markers only until sprite assets + symbol layers are added
3. **Saved routes** — static route cards; no persisted user routes in data model
4. **Dashboard / sign-in** — still dark owner-tool surfaces (out of public facelift scope)
5. **Legacy dark `:root` tokens** — retained for unmigrated internal pages; public routes use bright shells
6. **Mapbox Studio custom style** — optional via env; not bundled in repo

## Changed files (final polish)

- `src/components/facelift/utility-page-shell.tsx` (new)
- `src/components/experience/booking-intent.tsx`
- `src/components/discovery/pillar-page.tsx`
- `src/components/discovery/seo-guide-page.tsx`
- `src/components/transit/CruisePortGuidePage.tsx`
- `src/components/transit/NextBoatWidget.tsx`
- `src/components/transit/CrowdPredictor.tsx`
- `src/app/ferry/page.tsx`
- `src/app/ferry/[routeSlug]/page.tsx`
- `src/app/cruise-day/page.tsx`
- `src/app/[island]/ferry-schedule/page.tsx`
- `src/app/[island]/cruise-schedule/page.tsx`
- `src/lib/map/usvi-map.ts`
- `src/components/map/DirectoryMap.tsx`
- `scripts/capture-facelift-screenshots.mjs`
- `docs/facelift-screenshots/` (updated captures)
- `docs/VIBEVI_FACELIFT_IMPLEMENTATION.md`

## Preview deployment readiness

**Ready for human review and Vercel preview deployment** on `codex/vibevi-warm-caribbean-facelift`.

- All public discovery routes use bright facelift shells
- QA passes (typecheck, lint, build, 189 pages)
- Trust gates and SEO metadata preserved
- **Not merged to `main`**

## Next recommended pass (post-preview)

1. Self-host Fraunces `.woff2` if brand requires exact serif match
2. Mapbox Studio VibeVI style URL in production env
3. Custom marker sprites (category-colored pins)
4. Owner dashboard bright shell when owner tools launch
5. Directory sort controls when backend supports sort
