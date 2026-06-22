# VibeVI public soft-launch control document

Launch owner: __________  Target date: __________  Go/no-go reviewer: __________

Status values: `blocked`, `in progress`, `passed`, `accepted risk`.

Do not count the fictional demo catalog as launch inventory. Public launch requires verified, source-backed businesses and production configuration.

## 1. Infrastructure and domain

| Check | Status | Evidence / owner |
|---|---|---|
| Production domain connected to the intended Vercel project |  |  |
| HTTPS, apex/WWW redirect, and canonical host verified |  |  |
| `NEXT_PUBLIC_SITE_URL` equals the canonical production origin |  |  |
| Production Supabase URL and anon key configured |  |  |
| Service-role and webhook secrets limited to server environments |  |  |
| Valid Mapbox token configured; attribution and fallback tested |  |  |
| `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` configured and monitored |  |  |
| Preview and production Vercel env vars reviewed separately |  |  |

Never place Supabase service keys, webhook secrets, or analytics secrets in public variables.

## 2. Search and metadata

| Check | Status | Evidence / owner |
|---|---|---|
| `/robots.txt` returns 200 and protects APIs/dashboard/preview surfaces |  |  |
| `/sitemap.xml` returns 200 and uses the production host |  |  |
| Sitemap submitted in Google Search Console |  |  |
| Production domain ownership verified in Search Console |  |  |
| Root, island, guide, utility, category, and business canonicals checked |  |  |
| Default and key-route Open Graph images are licensed and render at 1200×630 |  |  |
| Twitter/Open Graph titles and descriptions checked |  |  |
| Demo profile emits `noindex` and no LocalBusiness schema |  |  |
| Verified sample emits eligible LocalBusiness schema and may index |  |  |
| Submitted/unverified sample remains noindex with contacts hidden |  |  |

## 3. Verified inventory gate

- [ ] Publish 30–75 verified USVI businesses with useful island/category coverage.
- [ ] Record a verification source and human review date for every verified record.
- [ ] Record contact publication permission before displaying phone/email.
- [ ] Keep disputed, incomplete, stale, submitted, and demo records noindex.
- [ ] Confirm premium and claimed states do not bypass verification.
- [ ] Validate coordinates against an official/direct source before map publication.
- [ ] Remove all sample rows from production imports.
- [ ] Run duplicate name/slug/contact checks.
- [ ] Confirm every external URL uses HTTPS and resolves to the intended business.

## 4. Top 10 route smoke test

Run on production at desktop and mobile widths. Record status, HTTP response, canonical, visible heading, console errors, and primary CTA.

| # | Route | Status | Notes |
|---:|---|---|---|
| 1 | `/` |  |  |
| 2 | `/search` |  |  |
| 3 | `/st-thomas` |  |  |
| 4 | `/st-croix/things-to-do` |  |  |
| 5 | `/st-john/ferry-schedule` |  |  |
| 6 | `/st-thomas/cruise-schedule` |  |  |
| 7 | `/st-thomas/magens-bay` |  |  |
| 8 | `/guides/best-beaches-usvi` |  |  |
| 9 | one verified category and business profile |  |  |
| 10 | `/get-listed` |  |  |

Also test a demo profile, a missing route, `/manifest.webmanifest`, `/robots.txt`, and `/sitemap.xml`.

## 5. Inquiry and business flow

| Check | Status | Evidence / owner |
|---|---|---|
| Get Listed inquiry link opens the intended monitored inbox |  |  |
| Experience routes load: `/experiences/adventure`, `/experiences/culture`, `/experiences/culinary`, `/experiences/cruise-day` |  |  |
| Experience CTAs avoid instant booking, payment, live availability, and guaranteed reservation language |  |  |
| Request-availability CTAs are mailto or preview-only; no personal data is stored locally |  |  |
| Prefilled inquiry contains no secret or user data |  |  |
| Test inquiry received and acknowledged |  |  |
| Owner dashboard and claiming remain labeled unavailable |  |  |
| Premium/sponsor copy states that packages are not launched |  |  |
| Business outreach message and verification workflow approved |  |  |

## 6. Analytics and privacy

| Check | Status | Evidence / owner |
|---|---|---|
| Analytics provider and account owner approved |  |  |
| Privacy/consent requirements reviewed for target audience |  |  |
| Retention and access policy documented |  |  |
| Provider adapter tested without duplicate events |  |  |
| No free-form query, contact details, inquiry body, or precise location collected |  |  |
| Core event names, including experience and request-availability events, verified in preview and production |  |  |
| Analytics disclosures updated before network collection starts |  |  |

VibeVI currently dispatches local provider-neutral browser events only; no provider is enabled by default.

## 7. Media and accessibility

- [ ] Every asset has ownership/license evidence, approval date, credit requirements, and allowed use.
- [ ] No remote hotlinks or unlicensed images.
- [ ] Hero, island, category, guide, business, sponsor, and OG crops checked.
- [ ] Alt text describes the image rather than marketing intent.
- [ ] Mobile navigation, horizontal rails, cards, and forms checked at 390 px width.
- [ ] Keyboard focus, landmarks, heading order, link names, and reduced motion checked.
- [ ] Color contrast checked for text, badges, and focus states.

## 8. Performance and final validation

| Check | Status | Evidence / owner |
|---|---|---|
| `npm run typecheck` |  |  |
| `npm run lint` |  |  |
| `npm run build` reaches final route summary |  |  |
| Lighthouse mobile: homepage |  |  |
| Lighthouse mobile: island hub |  |  |
| Lighthouse mobile: guide |  |  |
| Lighthouse mobile: category |  |  |
| Lighthouse mobile: verified profile |  |  |
| Map no-token fallback and valid-token view tested |  |  |
| Ferry/cruise empty, partial, error, and sourced states tested |  |  |

## 9. Explicitly deferred

- AI concierge
- Booking and checkout
- Full owner authentication/dashboard
- Paid sponsor checkout or performance claims
- Algolia production search until indexing and sync are enabled

## Go / no-go

Decision: __________  Date/time: __________  Reviewer: __________

Accepted risks and rollback owner:

____________________________________________________________________
