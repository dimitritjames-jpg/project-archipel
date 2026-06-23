# VibeVI media acquisition checklist

VibeVI should look beautiful without risking copyright, privacy, or false representation. The gradient fallback system remains production-safe until approved media is available.

## Media sources allowed

- VibeVI-owned photography or video;
- commissioned work with written transfer/license terms;
- business-provided media with written permission;
- properly licensed stock with allowed web/social use;
- public-domain or government media only when the license and attribution terms are confirmed.

Do not hotlink remote images. Do not add scraped photos. Do not use social-media images without written permission.

## Evidence to record before adding a file

For every asset, record outside the public asset folder:

- asset filename;
- owner/source;
- license or permission type;
- approval date;
- approved use cases;
- required credit/attribution;
- expiration or restrictions;
- model/property release status if relevant;
- reviewer initials.

## Launch priority shot list

1. Homepage hero water/boat shot: bright turquoise water with a boat, sail, shoreline, or reef texture; wide crop that works behind the first-fold collage.
2. Homepage island collage tiles: beach detail, boat/snorkel detail, culinary table/plate detail, and nightlife/music/glow detail.
3. St. Thomas: harbor or Charlotte Amalie overlook, Magens Bay curve, Red Hook ferry/boat energy, cruise-day waterfront, and nightlife/harbor glow.
4. St. Croix: Christiansted boardwalk, Buck Island/reef water, food or local plate detail, rum/history texture, and Frederiksted or Christiansted street color.
5. St. John: national park green, beach/cove turquoise, trail detail, Cruz Bay ferry or waterfront, and snorkeling/reef imagery.
6. Water Island: Honeymoon Beach, ferry hop, golf cart/slow-day detail, quiet sand path, and sunset return mood.
7. Culinary plates: johnny cakes, pate, fresh fish, grilled lobster, rum drinks, beach-bar table, and chef-led dinner detail.
8. Nightlife/music: steel pan, live band, DJ booth, waterfront evening, rum bar glow, Carnival or dance energy where rights are clear.
9. Culture/Carnival/history: Carnival color, forts, maker/artisan detail, market/provisions, rum-history texture, and local story moments with permissions.
10. Charter/boat/snorkel: sailboat, catamaran deck, snorkel mask/reef, beach-hop arrival, sunset sail, and safe water-action images.
11. Guides: Magens Bay, Buck Island, Virgin Islands National Park, Water Island day trip, best beaches, charters.
12. Business profiles: verified business cover photo and optional gallery.
13. Open Graph: `1200x630` brand-safe card.

## Homepage placeholder replacement map

- Hero collage main frame: homepage hero water/boat shot.
- Beach poster card: sand, shade, shallow-water, or towel-down beach image.
- Boat poster card: sail, snorkel, cove, or beach-hop image.
- Bite poster card: plate, beach bar, rum drink, or waterfront table image.
- Night poster card: music, amber lights, boardwalk, or waterfront evening image.
- Editorial cards: one culinary, one culture/music, one water/adventure image.
- Island portal cards: island-specific image per shot list above.
- Guide image slots: guide-specific scenic or detail image.

## Exact launch filename targets

- `public/media/hero/vibevi-hero-water-boat.jpg`
- `public/media/hero/vibevi-hero-sunset-water.mp4`
- `public/media/islands/st-thomas-harbor-magens.jpg`
- `public/media/islands/st-croix-boardwalk-buck-island.jpg`
- `public/media/islands/st-john-cove-national-park.jpg`
- `public/media/islands/water-island-honeymoon-ferry.jpg`
- `public/media/categories/beach-day.jpg`
- `public/media/categories/boat-day.jpg`
- `public/media/categories/bite-local-plate.jpg`
- `public/media/categories/night-boardwalk.jpg`
- `public/media/experiences/culinary-waterfront-table.jpg`
- `public/media/experiences/culture-carnival-music.jpg`
- `public/media/experiences/adventure-charter-snorkel.jpg`
- `public/media/experiences/cruise-day-harbor.jpg`

See `docs/media-drop-in-map.md` for where each file appears and the activation checklist.

## File readiness rules

- Use lowercase kebab-case.
- Prefer WebP or AVIF.
- Keep hero files under 600 KB after optimization when possible.
- Add meaningful alt text in code or content data.
- Keep faces, signage, and key objects away from crop edges.
- Never set `src` to a media path until the file exists and rights are approved.

## Pre-launch media QA

- [ ] No remote hotlinks.
- [ ] No unlicensed files.
- [ ] Every non-null media path exists.
- [ ] Every approved asset has rights evidence.
- [ ] Alt text describes visual content.
- [ ] Mobile crops preserve focal points.
- [ ] OG image renders at exactly `1200x630`.
