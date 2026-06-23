# VibeVI media drop-in map

This map keeps production media activation safe. Do not set any `src` in `src/lib/media.ts` until the file exists under `public/media/` and the rights evidence is recorded.

## Homepage

| Surface | Target file | Fallback if missing |
| --- | --- | --- |
| Destination hero water/boat scene | `public/media/hero/vibevi-hero-water-boat.jpg` | CSS/SVG water, hills, sail, sun, and stamp art |
| Optional ambient hero video | `public/media/hero/vibevi-hero-sunset-water.mp4` | Static CSS/SVG hero art |
| Beach poster card | `public/media/categories/beach-day.jpg` | Turquoise/sand poster fallback |
| Boat poster card | `public/media/categories/boat-day.jpg` | Deep blue/sail/wave poster fallback |
| Bite poster card | `public/media/categories/bite-local-plate.jpg` | Mango/coral/table poster fallback |
| Night poster card | `public/media/categories/night-boardwalk.jpg` | Violet/rum amber/music fallback |

## Island portals

| Island | Target file | Shot direction |
| --- | --- | --- |
| St. Thomas | `public/media/islands/st-thomas-harbor-magens.jpg` | Harbor, Magens curve, Red Hook/cruise-day, nightlife energy |
| St. Croix | `public/media/islands/st-croix-boardwalk-buck-island.jpg` | Christiansted boardwalk, Buck Island reef, rum/history, food |
| St. John | `public/media/islands/st-john-cove-national-park.jpg` | National park green, cove turquoise, trails, Cruz Bay |
| Water Island | `public/media/islands/water-island-honeymoon-ferry.jpg` | Honeymoon Beach, ferry hop, golf cart, slow-day feel |

## Experience pillars

| Pillar | Target file | Shot direction |
| --- | --- | --- |
| Culinary | `public/media/experiences/culinary-waterfront-table.jpg` | Local plates, seafood, beach bar, waterfront table |
| Culture | `public/media/experiences/culture-carnival-music.jpg` | Carnival, local music, historic streets, makers, markets |
| Adventure | `public/media/experiences/adventure-charter-snorkel.jpg` | Charter, snorkel, sail, dive, reef, active water |
| Cruise Day | `public/media/experiences/cruise-day-harbor.jpg` | Harbor/port context, one-day movement, shopping/food/tour energy |

## Business profiles

Use `public/media/businesses/{business-slug}/cover.webp` only for verified or approved business-provided media. Keep demo listings contact-free, noindex, and without LocalBusiness schema.

## Activation checklist

- [ ] File exists in the target path.
- [ ] Rights evidence is recorded outside `public/`.
- [ ] Credit/attribution requirements are documented.
- [ ] Alt text is written in code/content data.
- [ ] Mobile crop has been checked.
- [ ] No remote hotlink is used.
- [ ] No demo or public-info trust gate is changed by adding media.
