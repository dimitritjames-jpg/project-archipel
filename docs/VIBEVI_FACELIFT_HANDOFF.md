# VibeVI Warm Caribbean Facelift — Codex Handoff

## Safety checkpoint

The current production code is preserved on:

`checkpoint/pre-facelift-2026-06-25`

Do not delete or rewrite this branch. If the facelift is rejected, restore by deploying or resetting to this checkpoint.

## Working branch

Perform all redesign work on:

`codex/vibevi-warm-caribbean-facelift`

Do not push facelift changes directly to `main` until the redesign has been reviewed.

## Approved direction

VibeVI should feel like a bright, refined U.S. Virgin Islands discovery platform:

- Warm Caribbean
- Chill luxury
- Refined outdoor discovery
- Local-first island energy
- Bright cream and white surfaces
- Turquoise water, warm sand, sea-glass green, coral sunset, deep palm green
- Editorial serif headlines paired with clean modern UI text
- Soft shadows, rounded cards, generous breathing room
- Photo-led pages with clear search and planning tools

Do not turn the site into a dark dashboard, generic SaaS UI, fake resort brochure, or cruise-tourist campaign.

Visitors can appear, but locals must not be treated as scenery. Show residents, families, boat captains, deckhands, chefs, bartenders, DJs, guides, makers, shop owners, ferry workers, and hospitality teams as part of normal island life.

## Approved page system

### Homepage

- Large sunlit Caribbean hero with readable white headline and integrated search.
- Primary navigation remains light and minimal over the hero.
- Directly below hero: compact icon rail for Beaches, Boat Day, Bites, Nightlife, Things To Do, Stays, Wellness, and Shops.
- Add a `What's Your Vibe?` area with large photographic tiles for Adventure, Relax, Romance, Culture, Foodie, Party, Family, and Wellness.
- Keep the page bright, photo-led, and easy to scan.

### Find the Move / Search

- Aerial turquoise-water hero.
- Search controls should feel like an island-day builder, not an admin filter panel.
- Popular-search chips, trending cards, and clear island/category/vibe filters.
- Preserve functional search logic and existing URLs.

### Island portals

- Strong island-specific hero.
- Each island must have its own personality rather than reusing the same generic beach treatment.
- Below hero: category icon rail, top picks, and one wide editorial promotional card.

### Experience pages

- Full-width editorial hero with minimal copy.
- Top experiences displayed in bright image cards.
- Include a wide closing editorial band such as sunset, water, culture, or dining.

### Category directories

- Bright category hero.
- Practical filter chips below the hero.
- Image-forward cards in a clean, airy grid.
- Avoid dark panels and oversized decorative gradients.

### Business profiles

- Wide approved-photo hero or honest category placeholder.
- Visible business name, location, rating source, hours status, and direct action buttons.
- Tabs for overview, menu/services, photos, reviews, and details.
- Do not create fake business interiors, dishes, owners, ratings, reviews, hours, or verification.

### Map / route board

- Split planning layout: useful result list plus a bright island map.
- Include route-building actions without imitating a cold Google Maps clone.
- Preserve Mapbox functionality and existing location data.

### Get Listed

- Local business owner is the hero, not a tourist.
- Clear benefits: visibility, targeted traffic, trust, and business growth.
- Use owner, captain, chef, bartender, maker, and wellness-provider imagery.
- Avoid corporate stock photography and handshake imagery.

## Media package

The 69-file VibeVI media package is stored in Google Drive as:

`vibevi_media_package_v1.zip`

Drive file ID:

`1-fb8JpRhLf2LKft7CJlQTLxfaPZutwU4`

Drive URL:

`https://drive.google.com/file/d/1-fb8JpRhLf2LKft7CJlQTLxfaPZutwU4/view?usp=drivesdk`

The same package is also available to the project owner from the originating ChatGPT conversation.

## How to install the media package

1. Download and unzip `vibevi_media_package_v1.zip`.
2. Copy the package's `public/media/vibevi/` directory into the repository at exactly:

   `public/media/vibevi/`

3. Keep the supplied folder names and filenames unchanged.
4. Use the included `manifest.json`, `alt-text-and-placement.csv`, and `cursor-route-media-map.json` as the source of truth.
5. Use desktop and mobile variants through `<picture>`, responsive `<Image>`, or route-aware media selection.
6. Use `object-fit: cover` and begin with the supplied object-position values.
7. Keep hero text and interface copy as HTML. Do not bake text into images.

## Media layout

The package is organized around these paths:

- `public/media/vibevi/home/`
- `public/media/vibevi/home/cards/`
- `public/media/vibevi/home/moods/`
- `public/media/vibevi/islands/`
- `public/media/vibevi/experiences/`
- `public/media/vibevi/search/`
- `public/media/vibevi/get-listed/`
- `public/media/vibevi/listings/placeholders/`
- `public/media/vibevi/social/backgrounds/`

The package includes:

- Homepage desktop and mobile hero
- Beach / Boat / Bite / Night desktop and mobile cards
- Eight vibe mood sets
- Four island portal sets
- Eight experience-page sets
- Search aerial media
- Get Listed owner media
- Twelve listing-placeholder categories in multiple ratios
- Social backgrounds
- Alt text and route-placement metadata

## Trust rules

The package contains AI-generated editorial artwork. It may be used for general heroes, category cards, mood tiles, placeholders, and launch graphics.

Never present an AI-generated image as a documentary photo of a named business, exact employee, exact menu item, exact property, or verified location. Replace placeholders with approved business-owned or properly licensed photography as it becomes available.

## Implementation rules

- Preserve existing content, data fetching, SEO metadata, routing, search behavior, Supabase integration, Mapbox integration, and business-claim flows.
- Redesign presentation and information hierarchy without deleting useful functionality.
- Reuse existing components where sensible; refactor only where it improves consistency.
- Centralize visual tokens for color, radii, spacing, shadows, and typography.
- Keep accessibility contrast, keyboard behavior, focus states, labels, and reduced-motion support.
- Optimize images through Next.js Image where possible.
- Do not use the same image for unrelated islands or categories when the package contains a specific alternative.
- Do not add unsupported claims such as live availability, instant booking, real-time ferry status, or verified reviews.

## QA before review

Run:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Then verify at minimum:

- Homepage desktop and mobile
- Find the Move / search
- St. Thomas, St. John, St. Croix, and Water Island portals
- Adventure, culture, culinary, cruise day, nightlife, wellness, stays, and local shops
- At least one category directory
- At least one business profile
- Map / route board
- Get Listed
- No broken images
- No layout overflow at 375px, 768px, 1024px, and 1440px
- Correct alt text
- Search, links, map, claim flow, and SEO still work

## Rollback

If the new direction is rejected, restore the previous state from:

`checkpoint/pre-facelift-2026-06-25`
