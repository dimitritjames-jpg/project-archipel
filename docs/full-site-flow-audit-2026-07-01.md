# Full Site Flow Audit - 2026-07-01

## Scope

- Branch: `fix/full-site-concierge-flow-and-taxonomy`
- Approved new categories in this pass: `attractions`, `tours-activities`
- No new listing count added. Catalog total remains **179**.
- Sitemap count moved from **249** to **253** through new indexable category routes only.

## Concierge Flow Outcomes

- Homepage Boat tile now routes to `/search?q=boat`.
- Boat search now leads with a charter operator instead of a marina utility listing.
- Coral World now resolves under `/st-thomas/attractions/coral-world-ocean-park`.
- Attraction and guided-activity inventory now has dedicated browse channels instead of being buried under charters.
- Wrong-category and legacy-category profile URLs still 308 to the canonical route.

## Category Scaffolding Completed

- `src/lib/categories.ts`
- `src/lib/category-indexing.ts`
- `src/lib/businesses/public-info-catalog.ts`
- `src/lib/media.ts`
- `src/lib/mobile/catalog.ts`
- `src/lib/businesses/planning-tags.ts`
- `src/lib/experience-pillars.ts`
- island hub rendering
- category route rendering
- sitemap inclusion rules
- search/query expansion

## Category Indexing Decisions

- `/st-thomas/attractions` -> index, follow
- `/st-john/attractions` -> noindex, follow
- `/st-croix/attractions` -> index, follow
- `/water-island/attractions` -> noindex, follow
- `/st-thomas/tours-activities` -> index, follow
- `/st-john/tours-activities` -> index, follow
- `/st-croix/tours-activities` -> index, follow
- `/water-island/tours-activities` -> noindex, follow

## Route Integrity

- Buck Island Reef National Monument: canonical `200`, old `308`, biz `308`, wrong-category `308`
- BushTribe Eco Adventures: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Coral World Ocean Park: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Cruzan Rum Distillery: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Flavors of St. Thomas Food Tours: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Magens Bay Authority: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Night Kayak St. John: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Prosperity Farm Distillery: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Skyride to Paradise Point: canonical `200`, old `308`, biz `308`, wrong-category `308`
- St. George Village Botanical Garden: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Tree Limin' Extreme Zipline: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Virgin Islands Ecotours - St. John: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Virgin Islands Ecotours - St. Thomas: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Virgin Islands Food Tours: canonical `200`, old `308`, biz `308`, wrong-category `308`
- Virgin Islands National Park: canonical `200`, old `308`, biz `308`, wrong-category `308`

## Remaining Borderline Inventory Held For Review

- American Yacht Harbor
- Compass Point Marina
- Crown Bay Marina
- Yacht Haven Grande USVI
- Big Beard's Adventure Tours
- Caribbean Sea Adventures
- St. Croix Ultimate Bluewater Adventures
- The VI Cat
- Water Island Ferry
