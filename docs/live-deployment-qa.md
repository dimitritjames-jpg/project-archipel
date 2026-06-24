# VibeVI live deployment QA

Use this document for the actual production URL after every launch-significant deploy. Do not use Vercel preview URLs for Search Console submission or public launch collateral.

## Deployment under test

| Field | Value |
|---|---|
| Deployed URL | `https://www.myvibevi.com` |
| Deployment target | Production |
| Date tested | `2026-06-24` |
| Tester | Codex |
| Current production commit verified | `c93bd35` |
| Canonical host | `https://www.myvibevi.com` |
| Viewports still requiring formal visual sign-off | Desktop, 430 px mobile, 390 px mobile |

Deployment status: `GO for public soft launch with accepted operational follow-ups`.

Known follow-ups before a wider public announcement:

- Configure and test `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` with a monitored inbox.
- Let Google Search Console reprocess `https://www.myvibevi.com/sitemap.xml`; direct HTTP/XML checks pass even if the report temporarily says `Couldn't fetch`.
- Finish a formal mobile overflow/viewport pass at 390 px and 430 px.
- Confirm Mapbox production token behavior and fallback behavior on the final domain.
- Continue owner/photo outreach before enabling verified LocalBusiness schema.
- Redeploy after the launch-tightening commit that adds generated `/opengraph-image` and `/twitter-image` routes.

## Production facts verified

- `https://myvibevi.com/` redirects to `https://www.myvibevi.com/`.
- Homepage canonical and `og:url` use `https://www.myvibevi.com`.
- `/robots.txt` points to `https://www.myvibevi.com/sitemap.xml`.
- `/sitemap.xml` returns 200, parses as XML, and contains only `https://www.myvibevi.com` URLs.
- Search Console ownership has been verified.
- Homepage live inspection reported: URL is available to Google; indexing was requested.

## Required route smoke test

| Route | Expected | Latest result | Notes |
|---|---|---|---|
| `/` | 200, homepage renders | Passed | Production domain tested. |
| `/search` | 200, search page renders | Passed | Intentionally noindex/disallowed; smoke-test only. |
| `/map` | 200, map or fallback renders | Passed | Intentionally noindex/disallowed; smoke-test only. |
| `/get-listed` | 200, inquiry section renders | Passed with follow-up | Email CTA depends on `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL`. |
| `/experiences/adventure` | 200 | Passed |  |
| `/experiences/culture` | 200 | Passed |  |
| `/experiences/culinary` | 200 | Passed |  |
| `/experiences/cruise-day` | 200 | Passed |  |
| `/st-thomas` | 200, island hub renders | Passed |  |
| `/st-croix` | 200, island hub renders | Passed |  |
| `/st-john` | 200, island hub renders | Passed |  |
| `/water-island` | 200, island hub renders | Passed |  |
| `/sitemap.xml` | 200 XML | Passed | 110 URLs; all production-domain URLs. |
| `/manifest.webmanifest` | 200 JSON | Passed |  |
| `/robots.txt` | 200 text, production sitemap referenced | Passed |  |

## Public-info listing route smoke test

| Route | Expected | Latest result | Notes |
|---|---|---|---|
| `/st-thomas/excursions-charters/coral-world-ocean-park` | 200, Public info disclosure | Passed | No LocalBusiness schema. |
| `/st-thomas/excursions-charters/tree-limin-extreme-zipline` | 200, Public info disclosure | Passed | No LocalBusiness schema. |
| `/st-thomas/indulgent-dining/the-easterly` | 200, Public info disclosure | Passed | No LocalBusiness schema. |

Public-info trust checks:

- [x] Public info disclosure is visible.
- [x] No booking, reserve-on-VibeVI, live-availability, real-time availability, official partner, premium partner, or paid-placement claim appears.
- [x] No LocalBusiness schema is emitted for public-info listings.
- [x] Contact and direction links, where present, are treated as direct public-info links rather than VibeVI booking/partner claims.

## Demo listing trust test

Route: `/st-thomas/indulgent-dining/demo-stt-waterfront-table`

- [x] Demo route responds.
- [x] `noindex` is present.
- [x] No LocalBusiness schema is emitted.
- [x] Restricted contact CTAs are absent.
- [x] Copy clearly labels the profile as fictional/demo.

## Search Console readiness

- [x] `/robots.txt` works and points to the production sitemap.
- [x] `/sitemap.xml` works and uses the production host.
- [x] Canonical URLs use `NEXT_PUBLIC_SITE_URL`.
- [x] Promoted public-info listing URLs appear in the sitemap.
- [x] Demo/noindex pages are not priority URLs.
- [x] Public-info listing pages are acceptable for indexing only after promotion gate review.
- [x] Do not request indexing for `/search` or `/map`; they are intentionally noindex/disallowed utility views.

## Analytics and privacy check

- [x] No analytics provider script is intentionally enabled by default.
- [x] VibeVI currently dispatches provider-neutral browser events only.
- [ ] If analytics is enabled later, document provider, events, retention, consent posture, and account owner before launch.

## Issue log

| Issue | Severity | Fix applied | Status |
|---|---|---|---|
| Production metadata previously risked falling back to `localhost:3000` if `NEXT_PUBLIC_SITE_URL` was missing | High | Added production-safe env fallback and deployed `c93bd35` | Closed |
| Search Console initially reported `Couldn't fetch` for the sitemap even though direct checks returned valid XML | Medium | Re-submit sitemap as `sitemap.xml`; monitor GSC refresh | Open / external processing |
| `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` is not configured on production | Medium | Configure monitored inbox in Vercel env and redeploy | Open |
| Default social preview image was missing before this tightening pass | Low | Added generated `/opengraph-image` and `/twitter-image` routes | Pending redeploy |
| Formal mobile overflow audit is not recorded after the latest visual/media build | Medium | Test 390 px and 430 px viewports and fix only confirmed overflow | Open |

## Go/no-go recommendation

Current recommendation: `GO for controlled public soft launch`.

Do not turn on booking, paid sponsor claims, AI concierge, owner dashboard, or LocalBusiness schema for public-info listings. The next practical launch work is operations: inquiry inbox, Search Console monitoring, mobile overflow QA, verified-owner outreach, and real media acquisition.
