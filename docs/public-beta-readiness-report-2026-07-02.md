# VibeVI Public Beta Readiness Report

Date: 2026-07-02
Branch: `qa/public-beta-readiness-audit`
Baseline production before this branch: `47ac0de2e167a3ca90fc3e56d75bf07d3b8b924a`
Catalog count: `179`
Sitemap count: `253`

## Scope

This audit covers:

- homepage
- search
- island hubs
- category pages
- representative profiles
- `/get-listed`
- `/map`
- `/sitemap.xml`
- `/robots.txt`
- mobile at `390px` and `430px`
- console/runtime signal
- trust gates
- search/SCS quality
- owner conversion clarity

## Routes Checked

Production routes checked directly:

- `/`
- `/search`
- `/search?q=nightlife`
- `/search?q=live%20music`
- `/search?q=bar`
- `/search?q=sunset`
- `/search?q=market`
- `/search?q=local%20shops`
- `/search?q=st%20thomas`
- `/search?q=st%20croix`
- `/search?q=water%20island`
- `/search?q=family`
- `/search?q=kids`
- `/search?q=rainy%20day`
- `/search?q=near%20cruise%20port`
- `/search?q=cruise%20day`
- `/search?q=boat`
- `/search?q=coral%20world`
- `/search?q=claim%20listing`
- `/get-listed`
- `/map`
- `/islands/st-thomas`
- `/islands/water-island`
- `/st-thomas/attractions`
- `/st-croix/culture-history`
- `/st-thomas/attractions/coral-world-ocean-park`
- `/st-thomas/beaches/brewers-bay`
- `/st-john/boutique-stays/st-john-inn`
- `/sitemap.xml`
- `/robots.txt`

Local production-build verification after this branch's fix:

- `/`
- `/get-listed`
- `/search?q=claim%20listing`

## What Passed

- Homepage is visually stable on desktop and mobile, with no horizontal overflow on checked `390px` and `430px` views.
- Search remains usable, loads without console/runtime errors on checked routes, and stays `noindex, follow`.
- Island hubs are working and remain island-first.
- Category pages are working, hide empty states gracefully where applicable, and keep editorial trust framing visible.
- Representative profile pages keep public-info disclosure, source attribution, and honest non-booking language.
- `/map` is honest about its current state: planning context only, not live navigation or availability.
- `/sitemap.xml` stays at `253` URLs.
- `/robots.txt` points to `https://www.myvibevi.com/sitemap.xml`.
- Canonical host remains `https://www.myvibevi.com`.
- No `localhost` / `127.0.0.1` leakage was found on checked routes.
- No visible source/code artifacts were found on checked routes.
- No checked route produced HTTP 500 behavior in rendered review.

## P0 Issues

### P0. Owner-intake overclaim when inquiry inbox is unset

Status before this branch: real blocker

Production audit found that `/get-listed` rendered a configuration-pending state with no active `mailto:` path because `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` is unset. At the same time, several surfaces still told owners to "Get listed on VibeVI now" or "Start listing request," which overstated what was actually live.

Why this was P0:

- it created a broken-feeling business-owner path on a public-facing beta surface
- it undermined trust by implying active intake where none was available
- it conflicted with the intended beta standard that `/get-listed` should be manual-review / mailto based when active, or clearly preview-only when not active

Branch fix:

- owner-facing CTA copy now downgrades to preview-state language when the inquiry inbox is unset
- `/get-listed` hero copy is explicit that the page is an owner-tools preview until the launch inbox is active
- owner-intent search result now says `Owner tools preview` and `Review owner preview` instead of implying a live request start
- homepage/footer/guide/home business CTA surfaces no longer promise immediate listing action when the inbox is not configured

Result after fix:

- no remaining P0 was found in the audited web experience

## P1 Issues

### P1. Business inquiry inbox still needs real environment activation

Even after the honesty fix, the live owner path remains preview-only until `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` is configured to a monitored inbox and production is redeployed.

Impact:

- visitor beta is still viable
- owner conversion remains limited until the inbox is activated

Recommended follow-up:

- set `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` in Vercel production
- verify `/get-listed` and owner-intent search on production after redeploy
- confirm request-availability surfaces use the same inbox intentionally

### P1. Request-availability remains preview-only on experience surfaces

This is honest, not broken, but it means the broader inquiry-routing story is still limited. The site should keep calling this preview until the same inbox is active and monitored.

## P2 Issues

### P2. `/map` is usable but still a static planning utility

The page is now honest and not broken-feeling, but it is still a beta planning surface rather than a strong discovery engine. That is acceptable for beta, but it should stay out of any over-promised product messaging.

### P2. Search still has a few broad/noisy intent edges

Usable:

- `boat`
- `coral world`
- `water island`
- `nightlife`
- `live music`
- `bar`
- `market`
- `local shops`
- `family`
- `kids`
- `rainy day`
- `near cruise port`
- `cruise day`
- direct island queries

Still somewhat broad:

- `sunset`
- direct `st thomas` and `st croix` island queries after the top result

These are not beta blockers because the top routing is directionally correct and trust-safe.

### P2. Map page semantics can improve later

The map route passed honesty and layout checks, but it does not yet present a strong page-heading structure. This is a polish issue, not a beta blocker.

## Search / SCS Summary

Strong:

- `boat` leads with operator-style charter results
- `coral world` leads with the attractions profile
- `market` leads with real market/provisions listings
- `local shops` leads with local-provisions/category and local-shops guide context
- `water island` stays island-hub-first
- `family`, `kids`, and `rainy day` stay guide/category-led rather than noisy business clutter
- `near cruise port` and `cruise day` remain port-aware and honest
- owner-intent search now becomes preview-safe when the inbox is unset

Watch list:

- `sunset` still uses broader guide-led blending rather than a tighter sunset-specific route
- direct island queries are good at the top, then quickly widen into mixed listings

## Trust-Gate Summary

Checked routes did not show:

- fake hours
- fake prices
- fake booking
- fake availability
- fake ratings
- fake reviews
- fake verification
- fake partner or sponsor claims
- generated media presented as real listing photography

Public-info disclosure and source-attribution framing remained visible on representative profiles.

## Validation

Branch validation passed:

- `npm run typecheck`
- `npm run lint`
- `NODE_OPTIONS=--use-system-ca npm run build`

Local rendered verification after the owner-preview fix confirmed:

- homepage no longer overclaims immediate owner intake
- `/get-listed` shows preview-state language when inbox is unset
- owner-intent search no longer implies a live request start when inbox is unset

## Final Recommendation

### Ready with caveats

VibeVI web is ready for a public beta after this branch merges because the visitor-facing product is stable, useful, trust-safe, and mobile-clean, and the owner-intake overclaim blocker is resolved in-branch.

The main caveat is operational, not product-structural:

- owner intake remains preview-only until `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` is configured and production is redeployed

## Recommended Next Steps

1. Merge this Phase 5 honesty/audit branch.
2. Production-smoke `/`, `/get-listed`, `/search?q=claim%20listing`, `/map`, `/sitemap.xml`, and `/robots.txt`.
3. Configure `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` when the monitored inbox is ready.
4. Re-run a short owner-intent smoke after the inbox activation redeploy.
