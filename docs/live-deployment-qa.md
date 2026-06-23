# VibeVI live deployment QA

Use this document for the actual deployed Vercel preview or production URL. Do not mark public launch go until a real deployment URL has been tested.

## Deployment under test

| Field | Value |
|---|---|
| Deployed URL | `TBD` |
| Deployment target | Preview or Production |
| Date tested | `TBD` |
| Tester | `TBD` |
| Commit | `f9f51f7` or newer |
| Browser / device | `TBD` |
| Viewports | Desktop, 430 px mobile, 390 px mobile |

Current local readiness note: this workstation does not have the Vercel CLI installed or a `.vercel/project.json` link, so live deployment creation/inspection must happen through Vercel Git integration, Vercel Dashboard, or a linked CLI session.

## Pre-deploy readiness

- [ ] Git status clean.
- [ ] Commit is `f9f51f7` or newer.
- [ ] Vercel project is connected to the correct repository.
- [ ] Framework preset is Next.js.
- [ ] Build command is `npm run build`.
- [ ] Output directory is default for Next.js.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the deployed canonical origin.
- [ ] Supabase production/preview env vars are set for the intended environment.
- [ ] Mapbox token and optional style URL are scoped to the intended environment.
- [ ] Business inquiry email is a monitored inbox.
- [ ] No secrets are committed to the repo.

## Required route smoke test

| Route | Expected | Result | Notes |
|---|---|---|---|
| `/` | 200, homepage renders |  |  |
| `/search` | 200, search page renders |  |  |
| `/map` | 200, map or fallback renders |  |  |
| `/get-listed` | 200, inquiry CTA renders |  |  |
| `/experiences/adventure` | 200 |  |  |
| `/experiences/culture` | 200 |  |  |
| `/experiences/culinary` | 200 |  |  |
| `/experiences/cruise-day` | 200 |  |  |
| `/sitemap.xml` | 200 XML |  |  |
| `/manifest.webmanifest` | 200 JSON |  |  |

## Public-info listing route smoke test

| Route | Expected | Result | Notes |
|---|---|---|---|
| `/st-thomas/excursions-charters/the-vi-cat` | 200, Public info badge |  |  |
| `/st-croix/excursions-charters/big-beards-adventure-tours` | 200, Public info badge |  |  |
| `/water-island/boutique-stays/virgin-islands-campground` | 200, Public info badge |  |  |

Public-info trust checks:

- [ ] Badge says `Public info`.
- [ ] Page says `Unclaimed listing`.
- [ ] Disclosure says details are sourced from public business pages and should be confirmed directly.
- [ ] No booking, reserve, instant availability, guaranteed, partner, verified partner, premium, or official-listing claim appears.
- [ ] No LocalBusiness schema is emitted.
- [ ] CTAs are limited to official site, contact business, directions, and suggest update/claim interest.

## Demo listing trust test

Route: `/st-thomas/indulgent-dining/demo-stt-waterfront-table`

- [ ] 200 response.
- [ ] `noindex` is present.
- [ ] No LocalBusiness schema is emitted.
- [ ] No phone/email contact CTA appears.
- [ ] Copy clearly labels the profile as fictional/demo.

## Search Console readiness

- [ ] `/robots.txt` works and points to the deployed sitemap.
- [ ] `/sitemap.xml` works.
- [ ] Canonical URLs use `NEXT_PUBLIC_SITE_URL`.
- [ ] Promoted public-info listing URLs appear in the sitemap.
- [ ] Demo/noindex pages are not priority URLs.
- [ ] Public-info listing pages are acceptable for indexing only because they passed the promotion gate.
- [ ] Do not submit Search Console sitemap until the final deployed domain is chosen.

## Analytics and privacy check

- [ ] No analytics provider scripts are present unless intentionally configured.
- [ ] If analytics is enabled later, document provider, events, retention, and consent posture before launch.

## Issue log

| Issue | Severity | Fix applied | Status |
|---|---|---|---|
| Vercel CLI not installed/linked locally | Medium | Use Vercel Dashboard/Git integration or install/link CLI before CLI deploy inspection | Open until live URL exists |

## Go/no-go recommendation

Current recommendation: `NO-GO for live public announcement until a real Vercel URL is deployed and this checklist is completed.`

No code launch blockers are known after local validation. The remaining blocker is live deployment access/URL verification.
