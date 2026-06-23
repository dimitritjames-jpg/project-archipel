# VibeVI production media

Use only media that VibeVI owns, commissioned, licensed, or has explicit permission to publish. Do not hotlink remote images.

## Structure

- `hero/` — homepage and major campaign visuals
- `islands/` — St. Thomas, St. Croix, St. John, and Water Island portal media
- `categories/` — reusable directory category cards and headers
- `experiences/` — beach, charter, snorkeling, dining, nightlife, retail, wellness, and family discovery
- `guides/` — editorial guide hero media
- `businesses/` — business-owned listing media, organized by stable business slug
- `og/` — social sharing images for the root site and major guide families
- `sponsors/` — approved sponsor creative; never use this folder to imply an active placement

## Naming

Use lowercase kebab-case and include the island or subject:

- `hero/vibevi-usvi-hero.webp`
- `islands/st-thomas-harbor.webp`
- `categories/excursions-charters.webp`
- `experiences/st-john-snorkeling.webp`
- `guides/water-island-day-trip.webp`
- `businesses/example-business/cover.webp`
- `og/vibevi-default-1200x630.webp`
- `sponsors/homepage-feature-01.webp`

Prefer optimized AVIF or WebP files. Keep meaningful alt text in `src/lib/media.ts`; filenames are not a substitute for accessibility copy.

## Recommended sizes

- Homepage hero: `2400 × 1600` minimum, landscape, under 600 KB after optimization
- Island and guide hero: `2000 × 1200` minimum, landscape
- Category and experience card: `1200 × 900`, 4:3 crop-safe
- Business cover: `1600 × 1000`, with the focal point inside the center 60%
- Open Graph: exactly `1200 × 630`
- Sponsor creative: `1600 × 900` source plus any placement-specific crop

Keep text, logos, and important faces away from outer crop zones. Record the source, owner, license, approval date, and required credit for every asset before setting a non-null `src` in `src/lib/media.ts`.

See `docs/media-acquisition-checklist.md` for the launch shot list, rights evidence fields, and pre-launch media QA checks.
