# VibeVI production media

Use only media that VibeVI owns, commissioned, licensed, or has explicit permission to publish. Do not hotlink remote images. Do not use scraped social images.

Before any file is referenced by code, add its rights record to `data/media-manifest.json` and confirm it follows `docs/media-source-policy.md`.

## Structure

- `hero/` — homepage and major campaign visuals
- `islands/` — St. Thomas, St. Croix, St. John, and Water Island portal media
- `categories/` — reusable Beach / Boat / Bite / Night imagery
- `experiences/` — culinary, culture, adventure, cruise-day, nightlife, wellness, stays, and local shops
- `guides/` — editorial guide hero media
- `businesses/` — business-owned listing media, organized by stable business slug
- `og/` — social sharing images for the root site and major guide families
- `video/` — approved short ambient video loops
- `generated/` — approved non-factual atmospheric generated art, textures, and illustrations
- `sponsors/` — approved sponsor creative; never use this folder to imply an active placement

## Expected launch filenames

- `hero/vibevi-hero-water-boat.jpg`
- `hero/vibevi-hero-sunset-water.mp4`
- `islands/st-thomas-harbor-magens.jpg`
- `islands/st-croix-boardwalk-buck-island.jpg`
- `islands/st-john-cove-national-park.jpg`
- `islands/water-island-honeymoon-ferry.jpg`
- `categories/beach-day.jpg`
- `categories/boat-day.jpg`
- `categories/bite-local-plate.jpg`
- `categories/night-boardwalk.jpg`
- `experiences/culinary-waterfront-table.jpg`
- `experiences/culture-carnival-music.jpg`
- `experiences/adventure-charter-snorkel.jpg`
- `experiences/cruise-day-harbor.jpg`
- `guides/water-island-day-trip.webp`
- `businesses/example-business/cover.webp`
- `og/vibevi-default-1200x630.webp`

Use lowercase kebab-case. Prefer optimized WebP/AVIF for still images after the source file is archived, but keep the filename map stable once referenced by code.

## Recommended sizes

- Homepage hero: `2400 x 1600` minimum, landscape, under 600 KB after optimization when possible
- Ambient hero video: 8-15 seconds, muted loop, under 4 MB where possible
- Island and guide hero: `2000 x 1200` minimum, landscape
- Category and experience card: `1200 x 900`, 4:3 crop-safe
- Business cover: `1600 x 1000`, with the focal point inside the center 60%
- Open Graph: exactly `1200 x 630`

Keep text, logos, and important faces away from outer crop zones. Record source, owner, license, approval date, required credit, and restrictions in `data/media-manifest.json` before setting a non-null `src` in `src/lib/media.ts`.

## Activation rule

Do not set a media `src` in `src/lib/media.ts` until the file exists and the manifest rights record is complete. If a listed file is missing, VibeVI should continue showing polished CSS/SVG fallback art rather than a broken image or unfinished public copy.

See `docs/media-acquisition-checklist.md`, `docs/media-drop-in-map.md`, `docs/media-sourcing-targets.md`, and `docs/generated-media-briefs.md` for the launch shot list, rights evidence fields, sourcing strategy, generated-art prompts, and pre-launch media QA checks.
