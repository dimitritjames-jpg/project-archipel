# VibeVI current state and next steps

**Source of truth:** `main`  
**Safe commit:** `695c1ec` — *Build VibeVI experience engine foundation*  
**Date:** 2026-06-25  
**Design direction:** Keep current site design. No visual redesign in flight.

---

## 1. Current branch and commit

| Item | Value |
|------|-------|
| Branch | `main` |
| Commit | `695c1ec` |
| Production URL | `https://www.myvibevi.com` |
| Rollback checkpoint | `checkpoint/pre-facelift-2026-06-25` (reference only) |

---

## 2. Rejected design branches — not merged

| Branch | PR | Status | Merged |
|--------|-----|--------|--------|
| `codex/vibevi-warm-caribbean-facelift` | #1 (closed) | Rejected / abandoned | **No** |
| `codex/vibevi-homepage-render-v2` | #2 (open) | Rejected for production | **No** |

**Action:** Do not merge, cherry-pick, or deploy either branch. Keep `main` as the visual and architectural baseline.

---

## 3. Current site architecture

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router, React 19 |
| Styling | Tailwind CSS v4, `globals.css` design tokens |
| Data | Supabase (Postgres + RLS), server components + server actions |
| Maps | Mapbox GL (`react-map-gl`), `DirectoryMap` |
| Search (live) | Supabase ILIKE via `searchLocalBusinesses` — Algolia stubbed |
| Analytics | Provider-neutral `trackEvent` |
| Auth | Supabase auth — sign-in + dashboard (minimal) |
| Media | Generated WebP in `public/media/generated/`, registry in `src/lib/media.ts` |
| Listings fallback | `public-info-catalog.ts` (52 approved) + `launch-preview-catalog.ts` (demo/noindex) |

---

## 4. Routes and page types

**~189 static/dynamic pages** at build time.

| Type | Examples |
|------|----------|
| Homepage | `/` |
| Search | `/search` (noindex) |
| Island portals | `/st-thomas`, `/st-john`, `/st-croix`, `/water-island` |
| Category directories | `/{island}/{categorySlug}` (6 core categories) |
| Business profiles | `/{island}/{categorySlug}/{businessSlug}`, `/{island}/biz/{slug}` |
| Experience pillars | `/experiences/{pillarSlug}` (8 pillars) |
| Guides | `/guides/{guideSlug}` |
| Island utility SEO | `/{island}/beaches`, `things-to-do`, `day-trip`, `best-snorkeling`, `cruise-day`, pillar pages (Magens Bay, Buck Island, etc.) |
| Ferry | `/ferry`, `/ferry/{routeSlug}`, `/{island}/ferry-schedule` |
| Cruise | `/cruise-day`, `/{island}/cruise-schedule`, Havensight/Crown Bay port guides |
| Map | `/map` (noindex) |
| Get Listed | `/get-listed` |
| Owner | `/dashboard`, `/dashboard/businesses/{id}`, `/sign-in` |
| API | `/api/health`, `/api/engagement`, `/api/revalidate`, `/api/search/sync` (stub) |

---

## 5. Experience pages status

**8 pillars** in `src/lib/experience-pillars.ts`: adventure, culture, culinary, cruise-day, nightlife, wellness, stays, local-shops.

| Aspect | Status |
|--------|--------|
| Route template | `ExperiencePillarPage` — hero, island relevance, related categories/guides, booking-intent panel |
| Booking claims | Honest — discovery/inquiry only; no fake checkout |
| Trust badges | `launch-preview`, `guide-first`, `verified-listings-when-available` per pillar |
| SEO | Per-pillar metadata via `experiencePillarMetadata()` |

**Ready:** Content structure and trust copy.  
**Incomplete:** Live verified booking paths; partner lead routing.

---

## 6. Listing / catalog status

| Source | Count | Notes |
|--------|-------|-------|
| Public-info batch (approved) | 52 | `data/public-info-businesses-batch-1-approved.json` — unclaimed, source-backed |
| Launch preview (demo) | 24 | Fictional, `robots_noindex`, fallback when Supabase empty |
| Supabase published | Variable | Primary at runtime when reachable; build uses static params from DB or fallback |

**Categories (6):** excursions-charters, indulgent-dining, boutique-stays, nightlife-rhythm, wellness-spas, local-provisions.

**Profile features:** JSON-LD when eligible, trust state badges, tabs (overview/services/photos/reviews/details), map preview, public-info disclosure.

---

## 7. Search status

| Item | Status |
|------|--------|
| UI | `HomeSearchBar` on homepage + `/search` |
| Backend | `searchLocalBusinesses` — ILIKE on name + description_plain |
| Algolia | Disabled; `/api/search/sync` returns skipped |
| **Production bug (found 2026-06-25)** | Server action HTTP **500** — PostgREST `.or()` filter failure |
| **Fix (search-only, pending deploy)** | Dual `.ilike()` queries merged by id — see `local-search.ts` |
| Synonyms / category / island | **Not implemented** |
| QA doc | `docs/search-short-query-production-qa-2026-06-25.md` |

**Impact:** Directory search is non-functional in production until fix is deployed.

---

## 8. Map status

| Item | Status |
|------|--------|
| Page | `/map` + `DirectoryMapSection` on homepage |
| Provider | Mapbox (`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`) |
| Data | Published businesses with geoloc from Supabase |
| Features | List/map split, category filters, island bounds |
| Custom style | Optional via `NEXT_PUBLIC_MAPBOX_STYLE_URL` |

**Ready:** Functional discovery map for published pins.  
**Incomplete:** Saved routes, warm custom marker sprites, custom Studio style in prod env.

---

## 9. Get Listed status

| Item | Status |
|------|--------|
| Page | `/get-listed` — owner-focused hero, value props, mailto intake |
| Claims | No fake verification; coming-soon badges on premium placements |
| Backend | No self-serve claim workflow yet |
| SEO | Indexed, canonical set |

**Ready:** Marketing/intent capture page.  
**Incomplete:** Owner dashboard claim flow, Stripe/partner tiers.

---

## 10. Ferry / cruise utility status

| Route | Status |
|-------|--------|
| `/ferry` + route slugs | Schedule-based widgets (`NextBoatWidget`, `CrowdPredictor`) |
| `/{island}/ferry-schedule` | Island ferry boards |
| `/cruise-day`, cruise schedules | Scheduled capacity (not live passenger counts) |
| Port guides | Havensight, Crown Bay cruise-day pages |

**Trust:** Explicit copy — not live vessel tracking; cruise capacity is scheduled, not observed.

---

## 11. SEO / content status

| Area | Status |
|------|--------|
| Sitemap | Dynamic `sitemap.ts` |
| Robots | `robots.ts` |
| JSON-LD | WebSite, Organization, LocalBusiness when eligible |
| Island guides | `ISLAND_GUIDES` + `seo-guide-page` template |
| Launch guides | `/guides/usvi-charters`, `/guides/best-beaches-usvi` |
| noindex | Search, map, demo listings, some utility pages |

**Strong:** Guide/pillar content architecture, canonical URLs, trust-aware indexing gates.

---

## 12. Trust / verification rules

Implemented in `src/lib/businesses/listing-trust.ts`:

| State | Behavior |
|-------|----------|
| `demo` | Fictional preview, noindex |
| `public_info` | Source-backed, disclosure required, no booking claims |
| `verified` / `verified_claimed` | Schema/index eligibility when evidence present |
| Contact | Gated by `contact_permission_status` |
| Search | Published rows only; no invented results |

**Never:** Fake reviews, ratings, hours, live availability, or business photography.

---

## 13. Production-ready now

- Island portals, category directories, business profiles (public-info batch)
- Experience pillar pages (8) with honest booking language
- Ferry/cruise schedule utility pages
- Map with published business pins
- Get Listed intent page
- SEO guides and island utility content
- Build pipeline (typecheck, lint, 189-page build)
- Trust/indexing gates

---

## 14. Incomplete

| Priority | Item |
|----------|------|
| **P0** | Search server action 500 in production |
| P1 | Short-query synonyms and category/island matching |
| P2 | Owner claim/dashboard workflow |
| P3 | Algolia provisioning (optional) |
| P4 | Self-serve listing intake (beyond mailto) |
| P5 | Custom Mapbox style + marker art |
| P6 | Saved routes / user accounts for planning |
| P7 | Fraunces/local serif (cosmetic — defer) |

---

## 15. What should not be touched

- **Rejected branches:** `codex/vibevi-warm-caribbean-facelift`, `codex/vibevi-homepage-render-v2`
- **Checkpoint branch:** `checkpoint/pre-facelift-2026-06-25`
- **Current visual system** on `main` — no site-wide redesign without explicit approval
- **Trust rules** — demo/public-info/verified gating
- **Public-info disclosure** copy and batch integrity
- **Dashboard/sign-in** — out of scope unless owner tools are explicitly scoped

---

## 16. Recommended next 10 build tasks (by impact)

| Rank | Task | Impact | Risk |
|------|------|--------|------|
| 1 | **Deploy search `.or()` fix** | Restores core discovery | Low (search-only) |
| 2 | **Synonym + alias map** (bite, night, boat, beaches, shops) | Visitor query success | Low |
| 3 | **Island + category query expansion** | st thomas, wellness, nightlife | Low |
| 4 | **No-results shortcuts** (ferry, cruise, vibes, islands) | UX without fake listings | Low |
| 5 | **Re-run short-query QA on production** after deploy | Validation | None |
| 6 | **Owner claim MVP** (dashboard intake) | Business growth | Medium |
| 7 | **Mapbox warm style URL in prod env** | Polish, no code | Low |
| 8 | **Directory sort/filter backend** | Category pages | Medium |
| 9 | **Algolia provision + sync** (optional) | Scale search | Medium |
| 10 | **Engagement analytics review** | Product insight | Low |

---

## 17. Suggested Cursor task sequence

1. **Task A:** Deploy + verify search fix (`local-search.ts`) — typecheck, lint, build, production QA matrix  
2. **Task B:** Add `src/lib/search/query-expansion.ts` + wire into `searchLocalBusinesses` (no UI)  
3. **Task C:** No-results helper links in `HomeSearchBar` only (copy + existing routes)  
4. **Task D:** Re-capture `docs/search-short-query-production-qa-*.md` after deploy  
5. **Task E:** Owner claim scoping doc (no UI until approved)  
6. **Task F:** Map env + marker documentation pass  
7. **Task G:** Category directory sort when API ready  

**Do not run:** Facelift, homepage render v2, or global CSS/token overhauls.

---

## 18. QA checklist for future work

```
[ ] Branch is main (or explicit feature branch off main)
[ ] Rejected design branches not merged
[ ] npm run typecheck
[ ] npm run lint
[ ] npm run build (189 pages)
[ ] No visual diff unless task is explicitly visual
[ ] Search: 24 short-query matrix on production
[ ] Map: pins load, mobile list/map toggle
[ ] Business profile: public-info disclosure visible
[ ] Get Listed: mailto + copy intact
[ ] Ferry/cruise: trust copy unchanged
[ ] No invented listings, reviews, hours, availability
[ ] Demo listings remain noindex
[ ] Screenshots only when UI task requires them
```

---

## Related docs

| Doc | Purpose |
|-----|---------|
| `docs/search-short-query-production-qa-2026-06-25.md` | Short-query search QA matrix |
| `data/public-info-businesses-batch-1-approved.json` | Approved listing batch |
| `src/lib/businesses/listing-trust.ts` | Trust gate reference |

---

## Changelog

| Date | Update |
|------|--------|
| 2026-06-25 | Initial audit on `main@695c1ec`; search 500 identified; dual-query fix prepared |
