## VibeVI Post-Beta Route and Homepage Visual Repair

Date: 2026-07-02
Branch: `fix/post-beta-route-and-homepage-visual-repair`

### Scope

This repair pass addressed two production-facing route defects and two homepage presentation defects:

1. ` /st-croix/beaches ` returned `404`
2. ` /water-island/beaches ` returned `404`
3. Homepage island cards still depended on weak outline-first visuals
4. Homepage `Boat` and `Night` tiles could visually collide in the move board

### Root Cause of the Beach 404s

Island beach routes were not behaving like normal category directories. The dedicated beach route only rendered a guide when an island-specific beach guide existed. That worked for St. John, but islands without a dedicated beach guide fell through to `notFound()`, even when public beach listings existed.

### Route Fix

Implemented a shared category-directory renderer that supports both standard category routes and `beaches` as a first-class directory channel.

Behavior after repair:

- ` /st-thomas/beaches `: `200`
- ` /st-john/beaches `: `200` via existing guide path support
- ` /st-croix/beaches `: `200`
- ` /water-island/beaches `: `200`

Notes:

- Islands with a dedicated guide can continue to use it.
- Islands without a dedicated guide now render a real directory page instead of `404`.
- Thin-page handling still follows indexability thresholds rather than forcing every route into the sitemap.

### Sitemap and Indexing Result

Before repair:

- Sitemap count: `253`

After repair:

- Sitemap count: `256`

Net effect:

- Added index-worthy beach category URLs for islands that meet the beach threshold.
- Preserved exclusions for:
  - `/biz` aliases
  - wrong-category duplicate URLs
  - filtered island hub query URLs

SEO safety preserved:

- canonical host remains `https://www.myvibevi.com`
- `/search` remains `noindex, follow`
- base island hubs remain `index, follow`
- filtered island hubs remain `noindex, follow`
- no `localhost` or `127.0.0.1` leakage in checked rendered output

### Island Card Visual Decision

The homepage island selector was moved away from outline-first island art.

Decision:

- stop iterating on large island-outline visuals
- use premium card-first treatment
- make the visual identity rely on:
  - island name
  - concise vibe copy
  - strong spacing
  - a small understated route-signal badge instead of a large outline centerpiece

Result:

- island cards no longer depend on ugly or overworked map shapes
- Water Island remains visually smaller without feeling broken or awkward
- click targets, accessibility labels, and tracking attributes remain intact

### Boat and Night Tile Fix

The homepage move board was adjusted to stop tile collisions and keep the four-feature block aligned.

Fixes applied:

- equalized row behavior in the destination board
- ensured tile links stretch to full height
- removed stagger transforms that were pushing cards into each other
- kept desktop and mobile layouts aligned without adding extra CTA clutter

Result:

- `Beach`, `Boat`, `Bite`, and `Night` align cleanly
- no overlapping content bands
- no clipped CTA text in checked local views

### Files Changed

- `src/app/[island]/[categorySlug]/page.tsx`
- `src/app/[island]/beaches/page.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/components/discovery/category-directory-page.tsx`
- `src/components/home/island-silhouette-card.tsx`
- `src/lib/category-indexing.ts`
- `src/lib/media.ts`

### QA Routes Checked

Local rendered/route QA:

- `/`
- `/search`
- `/search?q=boat`
- `/search?q=nightlife`
- `/search?q=beach%20st%20croix`
- `/st-croix/beaches`
- `/water-island/beaches`
- `/islands/st-thomas`
- `/islands/st-john`
- `/islands/st-croix`
- `/islands/water-island`
- `/sitemap.xml`
- `/robots.txt`

Confirmed locally:

- no `404` on expected beach routes
- ` /st-croix/beaches ` returns `200`
- ` /water-island/beaches ` returns `200`
- `/search` keeps `noindex, follow`
- robots points to `https://www.myvibevi.com/sitemap.xml`
- homepage hero/tile area renders cleanly

### Screenshots

Local screenshot artifacts captured for this repair pass:

- `tmp-post-beta-home-desktop.png`
- `tmp-post-beta-home-mobile.png`
- `tmp-post-beta-home-desktop-tall.png`
- `tmp-post-beta-home-mobile-tall.png`
- `tmp-post-beta-st-croix-beaches.png`
- `tmp-post-beta-water-island-beaches-mobile.png`

### Validation

Passed:

- `npm run typecheck`
- `npm run lint`
- `NODE_OPTIONS=--use-system-ca npm run build`

### Remaining Caveats

- Preview verification is still required before merge because this branch changes visible homepage presentation and live route behavior.
- The local screenshot pass confirms the new card direction and route repair, but final signoff still belongs to authenticated preview QA.
