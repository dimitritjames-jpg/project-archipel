# VibeVI public soft-launch QA runbook

This runbook is for the first public soft launch pass. It does not replace the verified-inventory workflow from commit `765800a`; it checks whether the current public surface is trustworthy enough to show while real inventory is collected.

## Scope

In scope:

- first impression polish;
- mobile navigation and hero readability;
- route availability;
- noindex/schema trust gates;
- Get Listed intake clarity;
- media licensing readiness;
- analytics readiness without provider network collection;
- production deployment checklist readiness.

Out of scope:

- AI concierge;
- booking or payments;
- full owner dashboard;
- paid sponsor checkout;
- invented real business data;
- unlicensed or hotlinked media.

## Required local validation

Run these before every soft-launch candidate commit:

```bash
npm run typecheck
npm run lint
npm run build
```

The production build must reach the final route summary and generate every static page.

## Required smoke routes

Check HTTP 200, visible heading/CTA, and no obvious console failure:

- `/`
- `/search`
- `/map`
- `/get-listed`
- `/experiences/adventure`
- `/experiences/culture`
- `/experiences/culinary`
- `/experiences/cruise-day`
- `/sitemap.xml`
- `/manifest.webmanifest`

Also sample one fictional demo profile and verify:

- `noindex` is present;
- no `LocalBusiness` schema is emitted;
- fake contact information is not shown;
- the visible badge clearly says fictional/demo/preview.

## Mobile first-impression checklist

Test at 390 px and 430 px wide:

- header brand and primary CTA remain visible;
- horizontal nav rails scroll without clipping important text;
- hero CTAs wrap cleanly and remain tappable;
- search input and buttons have at least 44 px tap targets;
- experience cards do not create horizontal page overflow;
- Get Listed CTA is reachable within the first two scrolls;
- footer trust copy remains readable.

## Trust/safety acceptance checks

- Ferry copy is schedule-based, not live tracking.
- Cruise capacity is scheduled capacity, not actual passengers.
- Experience CTAs do not say instant booking, reserve now, pay deposit, confirmed booking, or guaranteed availability.
- Owner tools, sponsor placements, and analytics dashboards are labeled preview/coming soon.
- Analytics remains provider-neutral until privacy and consent review is complete.
- No page uses unlicensed photos or remote hotlinks.
