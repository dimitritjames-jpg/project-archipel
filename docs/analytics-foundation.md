# VibeVI privacy-conscious analytics foundation

No analytics provider, cookie, tracking pixel, or secret is enabled by this commit.

`src/lib/analytics/events.ts` defines a provider-neutral browser event boundary. It dispatches `vibevi:analytics` in the current page only; it performs no network request and stores nothing. A reviewed adapter can listen for those events later.

## Defined events

- `search_submitted` — query length and UI source only; never the query text
- `category_clicked` — island, category slug, source surface
- `island_selected` — island slug and source surface
- `business_profile_viewed` — island, category, listing state; no personal data
- `get_listed_cta_clicked` — placement and channel
- `sponsor_cta_clicked` — preview placement and preview-only state
- `ferry_page_viewed` — island only
- `cruise_page_viewed` — island only
- `experience_pillar_viewed` — pillar slug only
- `experience_cta_clicked` — pillar, placement, and intent only
- `request_availability_clicked` — pillar, placement, and channel only
- `plan_experience_clicked` — pillar and placement only
- `culinary_page_viewed` — page-level event without personal data
- `adventure_page_viewed` — page-level event without personal data
- `culture_page_viewed` — page-level event without personal data
- `cruise_day_page_viewed` — page-level event without personal data

Do not attach phone numbers, email addresses, free-form search text, precise user location, business inquiry content, user identifiers, visitor names, dates, group sizes, or message contents to events.

Experience and inquiry events are intentionally intent-level until a backend intake flow with consent, rate limiting, retention rules, and privacy review is intentionally implemented.

## Provider path

1. Start with Vercel Web Analytics if its privacy/legal posture is approved. Install through the official integration and keep the event boundary as the product taxonomy.
2. Configure Google Search Console separately; it is search-performance tooling, not product analytics.
3. Consider Plausible or Google Analytics only after a privacy review, retention decision, consent assessment, and documented ownership of the account.
4. Add one adapter in the analytics module rather than provider calls scattered through components.
5. Validate production and preview environments separately; never expose provider secrets in `NEXT_PUBLIC_*` variables.

## Search launch

- Verify the production domain in Google Search Console.
- Submit the canonical `/sitemap.xml`.
- Inspect robots, canonicals, demo noindex pages, and verified schema samples.
- Monitor coverage errors and manual actions before expanding indexable inventory.

## Acceptance checks

- Events dispatch once per intended action/view.
- Demo and verified status values contain no PII.
- No event fires from server rendering.
- The app behaves identically when no provider listens.
- Consent and privacy disclosures are updated before any provider begins network collection.
- Source and production HTML do not include provider network scripts until approval.
- Smoke-test routes can load with analytics disabled.
- Search Console setup is treated as SEO monitoring, not behavioral analytics.

## Soft-launch provider decision log

| Decision | Status | Notes |
|---|---|---|
| Vercel Web Analytics | not enabled | Candidate for post-privacy-review launch. |
| Google Search Console | required | Submit sitemap after production domain is live. |
| Google Analytics / Plausible | deferred | Requires owner, retention, consent, and PII review. |
