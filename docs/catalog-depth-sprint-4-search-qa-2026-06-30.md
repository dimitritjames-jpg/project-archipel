# VibeVI Catalog Depth Sprint 4 Search QA (2026-06-30)

Local search QA was run against the combined 160-listing public-info catalog after Sprint 4 additions.

## Query QA

| Query | Before Count | After Count | Top 10 After | Notes |
| --- | --- | --- | --- | --- |
| water island | 6 | 9 | Honeymoon Beach - Water Island; Water Island Ferry; Carolina Point Plantation Ruins; Dinghy's Beach Bar & Grill; Fort Segarra; Limestone Beach; Rachael's Rentals; Supermarket Reef; Virgin Islands Campground | useful |
| honeymoon beach | n/a | 5 | Honeymoon Beach - St. John; Honeymoon Beach - Water Island; Dinghy's Beach Bar & Grill; Limestone Beach; Rachael's Rentals | useful |
| spa | n/a | 11 | Heavenly Spa by Westin; Magens Bay Authority; Mango Bliss Spa; Pampered VI Day Spa; Peace of St. Croix Spa; Prana Spa; Spa To Go VI; St. Croix Spa at Tamarind Reef Resort; St. George Village Botanical Garden; The Ritz-Carlton Spa, St. Thomas | useful, slightly broad because legacy wellness anchors still rank |
| massage | n/a | 11 | Heavenly Spa by Westin; Magens Bay Authority; Mango Bliss Spa; Pampered VI Day Spa; Peace of St. Croix Spa; Prana Spa; Spa To Go VI; St. Croix Spa at Tamarind Reef Resort; St. George Village Botanical Garden; The Ritz-Carlton Spa, St. Thomas | useful, slightly broad |
| wellness | 2 | 11 | Heavenly Spa by Westin; Magens Bay Authority; Mango Bliss Spa; Pampered VI Day Spa; Peace of St. Croix Spa; Prana Spa; Spa To Go VI; St. Croix Spa at Tamarind Reef Resort; St. George Village Botanical Garden; The Ritz-Carlton Spa, St. Thomas | strong improvement |
| nightlife | 12 | 12 | Bajo el Sol Gallery Art Bar Cafe Rum Shop; Dinghy's Beach Bar & Grill; Fish Bar; Lovango Rum Bar; Rhythms at Rainbow Beach; Sapphire Beach Bar; The Beach Bar; The Greenhouse Restaurant & Bar; The Mill Boardwalk Bar & Brick Oven Pizza; The Windmill Bar | useful |
| live music | n/a | 12 | Brew STX; Christiansted Boardwalk; Common Cents Pub; Dinghy's Beach Bar & Grill; Duffy's Love Shack; Iggies Oasis; Island Time Pub; Leatherback Brewing Company; Levels; Lovango Rum Bar | useful |
| bar | 12 | 12 | Brew STX; Christiansted Boardwalk; Common Cents Pub; Dinghy's Beach Bar & Grill; Duffy's Love Shack; Iggies Oasis; Island Time Pub; Leatherback Brewing Company; Levels; Lovango Rum Bar | useful |
| local shops | 12 | 12 | Local provisions on St. John; Local provisions on Water Island; Local shops experiences; 81C Arts; A.H. Riise Mall; Bajo el Sol Gallery Art Bar Cafe Rum Shop; Caribbean Museum Center for the Arts; Carolina Point Plantation Ruins; Christa's Art Gallery; Christiansted National Historic Site | useful, still culturally broad |
| gifts | n/a | 12 | Bajo el Sol Gallery Art Bar Cafe Rum Shop; Christa's Art Gallery; Mango Tango Art Gallery; 81C Arts; A.H. Riise Mall; Caribbean Museum Center for the Arts; Carolina Point Plantation Ruins; Christiansted National Historic Site; Crucian Gold; Estate Whim Museum | useful |
| market | n/a | 12 | Caribbean Fish Market; Supermarket Reef; 81C Arts; A.H. Riise Mall; Bajo el Sol Gallery Art Bar Cafe Rum Shop; Caribbean Museum Center for the Arts; Carolina Point Plantation Ruins; Christa's Art Gallery; Christiansted National Historic Site; Crucian Gold | slightly noisy |
| family | 12 | 12 | Best beaches in the USVI; Cruise-day experiences; Water Island day trip; Beach Side Cafe at Sand Castle on the Beach; Cinnamon Bay Beach & Campground; Coki Point Beach; Cramer's Park Beach; Dinghy's Beach Bar & Grill; Dorsch Beach; Grapetree Beach | useful |
| kids | n/a | 12 | Beach Side Cafe at Sand Castle on the Beach; Caribbean Museum Center for the Arts; Cinnamon Bay Beach & Campground; Coki Point Beach; Coral World Ocean Park; Cramer's Park Beach; Dinghy's Beach Bar & Grill; Dorsch Beach; Estate Whim Museum; Fort Christian Museum | useful, still broad |
| rainy day | 12 | 12 | Culinary experiences; Culture experiences; Local provisions on St. Thomas; Wellness experiences; Bajo el Sol Gallery Art Bar Cafe Rum Shop; Christa's Art Gallery; Flavors of St. Thomas Food Tours; Mango Tango Art Gallery; Virgin Islands Food Tours; Woody's Seafood Saloon | useful |
| beach st thomas | n/a | 12 | Bolongo Bay; Brewer's Bay; Coki Point Beach; Hull Bay Beach; Lindbergh Bay Beach; Lindquist Beach; Morningstar Beach; Sapphire Beach; Secret Harbour Beach; Vessup Bay | strong after re-rank |
| beach st croix | n/a | 12 | Cane Bay; Cramer's Park Beach; Dorsch Beach; Grapetree Beach; Ha'Penny Beach; Northstar Bay Beach; Pelican Cove Beach; Protestant Cay Beach; Rainbow Beach; Sandy Point National Wildlife Refuge | strong after re-rank |
| things to do st croix | n/a | 12 | Beach Side Cafe at Sand Castle on the Beach; Big Beard's Adventure Tours; Brew STX; BushTribe Eco Adventures; Caribbean Blue Boat Charters; Caribbean Sea Adventures; Cinnamon Bay Beach & Campground; Coki Point Beach; Cramer's Park Beach; Dinghy's Beach Bar & Grill | broad |
| things to do st thomas | n/a | 12 | Beach Side Cafe at Sand Castle on the Beach; Big Beard's Adventure Tours; BushTribe Eco Adventures; Caribbean Blue Boat Charters; Caribbean Sea Adventures; Cinnamon Bay Beach & Campground; Coki Point Beach; Cramer's Park Beach; Dinghy's Beach Bar & Grill; Dorsch Beach | broad |
| romantic | 12 | 12 | Best beaches in the USVI; Culinary experiences; Stays experiences; Beach Side Cafe at Sand Castle on the Beach; Cinnamon Bay Beach & Campground; Coki Point Beach; Cramer's Park Beach; Dinghy's Beach Bar & Grill; Dorsch Beach; Grapetree Beach | useful |
| sunset | n/a | 12 | Bajo el Sol Gallery Art Bar Cafe Rum Shop; Beach Side Cafe at Sand Castle on the Beach; Cinnamon Bay Beach & Campground; Coki Point Beach; Cramer's Park Beach; Dinghy's Beach Bar & Grill; Dorsch Beach; Fish Bar; Grapetree Beach; Ha'Penny Beach | useful |

## Search Quality Notes

Improved clearly:
- `water island`
- `spa`
- `massage`
- `wellness`
- `beach st thomas`
- `beach st croix`

Still broad but honest:
- `things to do st croix`
- `things to do st thomas`
- `kids`
- `romantic`
- `sunset`

Still slightly noisy:
- `market`
- `local shops`

## Why Some Results Remain Broad

- The current schema intentionally maps museums, forts, galleries, ferry utilities, and some cultural stops into `local-provisions`, so shop-intent queries still mix retail with cultural browse stops
- Existing guide and experience shortcuts intentionally keep broad-intent searches useful even when pure listing intent is mixed
- Legacy wellness anchors such as Magens Bay Authority and St. George Village Botanical Garden still rank for `spa`/`massage` because they live in the shared wellness category

## Runtime QA

- `/search` returned `200`
- `/search?q=water%20island` returned `200`
- `/search?q=spa` returned `200`
- `/search?q=nightlife` returned `200`
- `/search?q=local%20shops` returned `200`
- `/search?q=family` returned `200`
- `/search?q=rainy%20day` returned `200`
- Search page remained `noindex,follow`

## Sitemap / SEO Safety

- Sitemap count moved from `194` to `227`
- Search canonical under production-style local start: `https://www.myvibevi.com/search`
- Sample profile canonical under production-style local start: `https://www.myvibevi.com/st-thomas/wellness-spas/prana-spa`
- No `localhost` or `127.0.0.1` leakage under production-style local start
