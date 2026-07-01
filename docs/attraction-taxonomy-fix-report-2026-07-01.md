# Attraction Taxonomy Fix Report - 2026-07-01

## Categories Added

- `attractions` - attraction anchors such as marine parks, botanical gardens, skyride-style stops, distilleries, and large public visitor anchors
- `tours-activities` - guided activity inventory such as food tours, eco tours, night kayak, zipline, and other non-boat guided operators

## Listings Reclassified

| Listing | Old canonical path | New canonical path |
| --- | --- | --- |
| Buck Island Reef National Monument | `/st-croix/excursions-charters/buck-island-reef-national-monument` | `/st-croix/attractions/buck-island-reef-national-monument` |
| BushTribe Eco Adventures | `/st-croix/excursions-charters/bushtribe-eco-adventures` | `/st-croix/tours-activities/bushtribe-eco-adventures` |
| Coral World Ocean Park | `/st-thomas/excursions-charters/coral-world-ocean-park` | `/st-thomas/attractions/coral-world-ocean-park` |
| Cruzan Rum Distillery | `/st-croix/excursions-charters/cruzan-rum-distillery` | `/st-croix/attractions/cruzan-rum-distillery` |
| Flavors of St. Thomas Food Tours | `/st-thomas/excursions-charters/flavors-of-st-thomas-food-tours` | `/st-thomas/tours-activities/flavors-of-st-thomas-food-tours` |
| Magens Bay Authority | `/st-thomas/wellness-spas/magens-bay-authority` | `/st-thomas/beaches/magens-bay-authority` |
| Night Kayak St. John | `/st-john/excursions-charters/night-kayak-st-john` | `/st-john/tours-activities/night-kayak-st-john` |
| Prosperity Farm Distillery | `/st-croix/excursions-charters/prosperity-farm-distillery` | `/st-croix/attractions/prosperity-farm-distillery` |
| Skyride to Paradise Point | `/st-thomas/excursions-charters/skyride-to-paradise-point` | `/st-thomas/attractions/skyride-to-paradise-point` |
| St. George Village Botanical Garden | `/st-croix/wellness-spas/st-george-village-botanical-garden` | `/st-croix/attractions/st-george-village-botanical-garden` |
| Tree Limin' Extreme Zipline | `/st-thomas/excursions-charters/tree-limin-extreme-zipline` | `/st-thomas/tours-activities/tree-limin-extreme-zipline` |
| Virgin Islands Ecotours - St. John | `/st-john/excursions-charters/virgin-islands-ecotours-st-john` | `/st-john/tours-activities/virgin-islands-ecotours-st-john` |
| Virgin Islands Ecotours - St. Thomas | `/st-thomas/excursions-charters/virgin-islands-ecotours-st-thomas` | `/st-thomas/tours-activities/virgin-islands-ecotours-st-thomas` |
| Virgin Islands Food Tours | `/st-croix/excursions-charters/virgin-islands-food-tours` | `/st-croix/tours-activities/virgin-islands-food-tours` |
| Virgin Islands National Park | `/st-john/excursions-charters/virgin-islands-national-park` | `/st-john/attractions/virgin-islands-national-park` |

## Coral World Final State

- Category: `attractions`
- Canonical route: `/st-thomas/attractions/coral-world-ocean-park`
- Old charter path: 308 to canonical
- `/biz` alias: 308 to canonical

## Redirect QA

- All 15 moved listings returned `200` on the new canonical path.
- All legacy category paths returned `308`.
- All `/biz` aliases returned `308`.
- All sampled wrong-category paths returned `308`.

## Sitemap Impact

- Before: **249**
- After: **253**
- New indexable category routes added to sitemap:
  - `/st-thomas/attractions`
  - `/st-croix/attractions`
  - `/st-thomas/tours-activities`
  - `/st-john/tours-activities`
  - `/st-croix/tours-activities`
- Excluded from sitemap:
  - `/st-john/attractions`
  - `/water-island/attractions`
  - `/water-island/tours-activities`
  - legacy category paths
  - `/biz` aliases
  - filtered island query URLs

## Trust Gates

- No listing count inflation
- No fake hours, fake prices, fake booking claims, fake reviews, fake ratings, or fake verification introduced in this pass
- Sampled moved profile pages preserved public-info language and did not emit `ratingValue` or `reviewCount` in sampled HTML
- Water Island Ferry was intentionally not moved into a new category
