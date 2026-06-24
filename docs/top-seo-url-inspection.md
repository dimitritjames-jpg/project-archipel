# Top SEO URLs to inspect after sitemap submission

Use this after the final domain is live, `NEXT_PUBLIC_SITE_URL` is updated, and the production sitemap has been submitted to Google Search Console.

Replace `https://vibevi.com` with the final canonical origin if different.

## Top 20 URL inspection queue

| Priority | URL | Search intent | What to verify |
|---:|---|---|---|
| 1 | `https://vibevi.com/` | USVI discovery guide / VibeVI brand | Indexable, canonical final domain, WebSite JSON-LD present |
| 2 | `https://vibevi.com/search` | USVI business search / island directory | Indexable, no unsupported live/search-provider claims |
| 3 | `https://vibevi.com/map` | USVI map / things nearby | Indexable, Mapbox fallback copy safe |
| 4 | `https://vibevi.com/st-thomas` | St. Thomas things to do | Island hub canonical, internal links visible |
| 5 | `https://vibevi.com/st-croix` | St. Croix things to do | Island hub canonical, internal links visible |
| 6 | `https://vibevi.com/st-john` | St. John things to do | Island hub canonical, internal links visible |
| 7 | `https://vibevi.com/water-island` | Water Island day planning | Island hub canonical, ferry/day-trip links visible |
| 8 | `https://vibevi.com/experiences/adventure` | USVI charters, snorkeling, adventure | Indexable, public-info cards show disclosures where applicable |
| 9 | `https://vibevi.com/experiences/culinary` | USVI restaurants / food guide | Indexable, no fake reservations or booking claims |
| 10 | `https://vibevi.com/experiences/culture` | USVI culture, history, music | Indexable, guide links visible |
| 11 | `https://vibevi.com/experiences/cruise-day` | Cruise day in St. Thomas / USVI port day | Scheduled/planning language only; no live crowd claims |
| 12 | `https://vibevi.com/guides/best-beaches-usvi` | Best beaches in the USVI | Indexable, no business photo rights issues |
| 13 | `https://vibevi.com/guides/usvi-charters` | USVI charters | Indexable, public-info disclosure preserved on linked listings |
| 14 | `https://vibevi.com/st-thomas/ferry-schedule` | St. Thomas ferry schedule | Schedule-based language only |
| 15 | `https://vibevi.com/st-john/ferry-schedule` | St. John ferry schedule | Schedule-based language only |
| 16 | `https://vibevi.com/st-thomas/cruise-schedule` | St. Thomas cruise schedule | Scheduled capacity, not actual passenger count |
| 17 | `https://vibevi.com/st-thomas/magens-bay` | Magens Bay guide | Indexable, source-safe guide copy |
| 18 | `https://vibevi.com/st-croix/buck-island` | Buck Island guide | Indexable, NPS/source-safe language |
| 19 | `https://vibevi.com/st-john/virgin-islands-national-park` | Virgin Islands National Park guide | Indexable, NPS/source-safe language |
| 20 | `https://vibevi.com/water-island/day-trip` | Water Island day trip | Indexable, ferry/day-trip expectations safe |

## First public-info listing spot checks

After the top 20 are inspected, spot-check these promoted public-info listings because they represent high-intent attraction, boat, food, and Water Island discovery paths.

| Island | URL | Why inspect |
|---|---|---|
| St. Thomas | `https://vibevi.com/st-thomas/excursions-charters/coral-world-ocean-park` | Family/cruise-day attraction intent |
| St. Thomas | `https://vibevi.com/st-thomas/excursions-charters/tree-limin-extreme-zipline` | Land adventure intent |
| St. Thomas | `https://vibevi.com/st-thomas/indulgent-dining/the-easterly` | Restaurant intent |
| St. Croix | `https://vibevi.com/st-croix/excursions-charters/buck-island-reef-national-monument` | Marquee nature attraction intent |
| St. Croix | `https://vibevi.com/st-croix/excursions-charters/big-beards-adventure-tours` | Charter/Buck Island intent |
| St. John | `https://vibevi.com/st-john/excursions-charters/virgin-islands-national-park` | National park intent |
| St. John | `https://vibevi.com/st-john/indulgent-dining/lime-out-vi` | High-awareness food/boat-day intent |
| Water Island | `https://vibevi.com/water-island/nightlife-rhythm/dinghys-beach-bar-and-grill` | Water Island beach bar/day-trip intent |

For every public-info listing inspection:

- Public-info badge/disclosure must be visible.
- No LocalBusiness schema should be emitted under the current trust gate.
- No booking, partner, premium, live-availability, or real-time claims.
- Any public contact details must be treated as public-source-only until permission is granted.

