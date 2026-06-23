# VibeVI media source policy

VibeVI can feel vivid and visual without creating copyright, privacy, or trust problems. This policy defines what media can be used, what evidence must be kept, and what media must never imply.

## Non-negotiable rules

- Do not scrape photos or videos from destination sites, social feeds, business sites, or Google results.
- Do not hotlink remote media.
- Do not use a real business photo unless VibeVI has permission from the rights holder and the image accurately represents that business.
- Do not use generated images as documentary evidence of a real place, business, event, person, menu item, or crowd.
- Do not use media to imply a partnership, sponsor relationship, booking capability, live availability, premium placement, or verification status that is not true.
- Keep demo listings noindex and contact-free. Do not attach realistic business media to demo listings.

## Allowed media classes

### A. Owned or provided media

Use for: hero imagery, guides, island pages, business listings, sponsor placements, social previews.

Allowed sources:

- photos or videos taken by the VibeVI team;
- commissioned photography/video with written license or transfer terms;
- business-submitted photos/videos with written permission.

Required evidence:

- source or owner name;
- written permission/license terms;
- approved uses;
- attribution requirements;
- expiration/restrictions;
- date approved;
- reviewer initials.

Owned/provided media is the best class for verified business listings and any future sponsor placement.

### B. Public-domain or government media

Use for: public guide atmosphere, parks, nature, reef, historic context, editorial pages.

Rules:

- Confirm the specific asset is public domain or otherwise licensed for VibeVI’s use.
- Do not assume every government-hosted asset is public domain.
- Check credit/copyright notes on the asset page.
- Store source URL, creator/credit, license note, date accessed, and any required attribution.

Good candidates may include some NPS/public-domain assets, but each asset still needs review.

### C. Free stock or license-platform media

Use for: atmosphere/category/hero visuals, never to represent a specific business unless accurate and allowed.

Allowed only when current platform license terms permit the intended use. Examples may include Unsplash, Pexels, Pixabay, or similar platforms, but license terms must be checked at the time of download.

Required evidence:

- source URL;
- creator;
- platform/license page;
- date accessed;
- use restrictions;
- whether attribution is required or recommended.

### D. Creative Commons media

Use for: editorial atmosphere and guide context when license terms are compatible.

Rules:

- Allow only licenses that permit commercial use.
- If the image is cropped, color-graded, composited, or otherwise modified, the license must permit modification.
- Avoid NonCommercial licenses.
- Avoid NoDerivatives licenses when editing/cropping/filtering is needed.
- Include attribution where required.

Required evidence:

- license type;
- license URL;
- attribution text;
- source URL;
- creator;
- date accessed;
- modification notes.

### E. AI-generated media

Use for: non-specific atmosphere only.

Allowed examples:

- reef texture;
- sunset gradient;
- island silhouette;
- sail shapes;
- wave line art;
- abstract Carnival rhythm;
- tropical food color pattern;
- watercolor map style;
- rum-bar amber/night glow.

Not allowed:

- fake documentary photos of real businesses;
- fake photos of real people or events;
- fake menu items presented as a real restaurant’s food;
- fake crowds, ships, storefronts, or interiors presented as factual.

Generated assets must be recorded in `data/media-manifest.json` with the prompt, use case, and a clear note that the asset is atmospheric rather than factual.

## Approval before activation

Before a media file is referenced by `src/lib/media.ts` or any page/component:

1. Save the file under the correct `public/media/` folder.
2. Add or update the asset record in `data/media-manifest.json`.
3. Confirm `approved_for_public_use` is `true`.
4. Confirm business-specific use is only `true` when the media accurately represents that business and rights permit that use.
5. Confirm alt text is accurate.
6. Confirm mobile crops.
7. Confirm no trust gate changes are caused by adding the media.

If any item is uncertain, keep the code on VibeVI’s legal fallback artwork.
