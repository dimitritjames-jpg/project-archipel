# VibeVI production smoke-test checklist

Run this checklist against every Vercel preview and production deployment. Record the deployment URL, commit hash, tester, date/time, browser, and viewport.

Deployment URL: __________  
Commit: __________  
Tester: __________  
Date/time: __________

## Route availability

| Route | HTTP | Heading/primary CTA visible | Notes |
|---|---:|---|---|
| `/` |  |  |  |
| `/search` |  |  |  |
| `/map` |  |  |  |
| `/get-listed` |  |  |  |
| `/experiences/adventure` |  |  |  |
| `/experiences/culture` |  |  |  |
| `/experiences/culinary` |  |  |  |
| `/experiences/cruise-day` |  |  |  |
| `/st-thomas` |  |  |  |
| `/st-croix` |  |  |  |
| `/st-john` |  |  |  |
| `/water-island` |  |  |  |
| `/sitemap.xml` |  | XML renders |  |
| `/manifest.webmanifest` |  | JSON renders |  |
| `/robots.txt` |  | Sitemap reference renders |  |

## Promoted public-info route samples

| Route | HTTP | Badge/disclosure visible | Notes |
|---|---:|---|---|
| `/st-thomas/excursions-charters/the-vi-cat` |  | Public info + unclaimed listing |  |
| `/st-croix/excursions-charters/big-beards-adventure-tours` |  | Public info + unclaimed listing |  |
| `/water-island/boutique-stays/virgin-islands-campground` |  | Public info + unclaimed listing |  |

## Demo route sample

| Route | HTTP | noindex | No LocalBusiness schema | No contact CTA |
|---|---:|---|---|---|
| `/st-thomas/indulgent-dining/demo-stt-waterfront-table` |  |  |  |  |

## Trust and safety checks

- [ ] Demo profile returns 200.
- [ ] Demo profile emits `noindex`.
- [ ] Demo profile does not emit `LocalBusiness` schema.
- [ ] Demo profile does not show fake direct phone/email CTAs.
- [ ] Public-info profile badge says `Public info`.
- [ ] Public-info profile says `Unclaimed listing`.
- [ ] Public-info disclosure says details are sourced from public business pages and should be confirmed directly.
- [ ] Public-info profile does not emit `LocalBusiness` schema.
- [ ] Public-info profile does not say partner, premium, verified partner, official listing, guaranteed, live availability, book now, or reserve instantly.
- [ ] No active CTA says book instantly, reserve now, pay deposit, confirm booking, or guaranteed availability.
- [ ] Ferry pages describe schedule-based planning, not live vessel tracking.
- [ ] Cruise pages describe scheduled capacity, not actual passenger counts.
- [ ] Experience pages keep booking language to inquiry/planning only.
- [ ] Owner dashboard, sponsor packages, and paid placements remain preview/coming-soon where mentioned.

## Mapbox fallback check

Run once with a valid token and once in a preview without a valid token:

- [ ] Valid token: `/map` loads interactive map and attribution.
- [ ] Missing/invalid token: `/map` shows premium fallback and directory/search links.
- [ ] No JavaScript crash blocks the page when token is missing.

## Mobile viewport check

Test at 390 px wide and 430 px wide:

- [ ] Header brand is visible.
- [ ] Primary CTA is visible and tappable.
- [ ] Horizontal nav rails scroll without page overflow.
- [ ] Hero copy and CTAs fit without clipping.
- [ ] Search input and CTA controls are at least 44 px high.
- [ ] Get Listed intake checklist is readable.
- [ ] Footer trust text is readable.

## Metadata and indexing checks

- [ ] `/robots.txt` references the production sitemap.
- [ ] `/sitemap.xml` uses production `NEXT_PUBLIC_SITE_URL`.
- [ ] `/sitemap.xml` includes promoted public-info listing URLs.
- [ ] `/sitemap.xml` does not include demo profile URLs.
- [ ] Homepage canonical uses the production domain.
- [ ] Experience pages are indexable.
- [ ] Demo/noindex pages are not submitted as priority URLs.
- [ ] Public-info listing pages are acceptable for indexing only because they passed the promotion gate.

## Analytics script check

- [ ] No Google Analytics, Google Tag Manager, Plausible, or Vercel Analytics provider scripts are present unless intentionally configured and documented for this deployment.
