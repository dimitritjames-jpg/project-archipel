# VibeVI soft-launch readiness

Do not treat the demo catalog as launch inventory. A public launch requires verified, source-backed business records and production configuration.

## Required before indexing push

- [ ] Set the production `NEXT_PUBLIC_SITE_URL` and verify canonical URLs
- [ ] Configure a valid Mapbox token and confirm the legal map attribution
- [ ] Configure `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL`
- [ ] Replace default Open Graph fallbacks with licensed `1200 × 630` media
- [ ] Add licensed hero, island, category, guide, and business media
- [ ] Publish 30–75 verified USVI business listings across islands and categories
- [ ] Confirm each listing’s name, island, category, official contact, ownership/source, and permission to publish
- [ ] Remove or retain `noindex` on every remaining demo profile
- [ ] Verify ferry sources and timestamps; keep operator-confirmation language
- [ ] Verify cruise import sources and scheduled-capacity coverage

## Search and measurement

- [ ] Verify the production domain in Google Search Console
- [ ] Submit `/sitemap.xml` and monitor excluded/error pages
- [ ] Configure privacy-aware analytics and document the data collected
- [ ] Add consent handling if the selected analytics stack requires it
- [ ] Confirm robots rules for search, map, dashboard, APIs, and preview routes
- [ ] Test canonical business routes and redirects

## Quality gate

- [ ] Run `npm run typecheck`, `npm run lint`, and `npm run build`
- [ ] Run Lighthouse on homepage, an island hub, a guide, a category, and a business profile
- [ ] Check mobile navigation, keyboard focus, reduced motion, contrast, and empty states
- [ ] Confirm no unlicensed or hotlinked media is present
- [ ] Confirm no live, real-time, booking, verified, or sponsor claim appears without supporting implementation/data
- [ ] Test contact links, external links, 404s, sitemap URLs, and structured data

## Deliberately deferred

- AI concierge
- Booking and checkout
- Self-serve owner authentication and claiming
- Paid sponsor checkout
- Algolia production search until indexing and sync are enabled
