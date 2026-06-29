# VibeVI SEO Gate For Future Work

This file is the standing SEO gate for every future public-facing VibeVI PR.

## Core Rule

If a PR changes any public route, public listing, public media, sitemap behavior, or public navigation, the PR must include an SEO section in its report and pass the checks below.

## 1. Public Route Rule

Every new or changed public route must be reviewed for:

- unique title
- useful meta description
- explicit canonical
- correct robots policy
- correct OG title/description/image intent
- sitemap inclusion or intentional exclusion
- crawlable internal links in and out
- no visible code/render artifacts
- no 404 or wrong-route regressions

## 2. Listing Rule

Every new or changed listing must be reviewed for:

- correct island
- correct category
- canonical profile URL
- no alternate wrong-category profile path
- honest public-info trust copy
- no invented reviews, ratings, hours, prices, availability, verification, or partnerships
- no schema fields unless they are real and sourced
- honest image/media treatment
- internal links back to island, category, and broader discovery

## 3. Image / Media Rule

Every public media change must be reviewed for:

- truthful alt text
- no keyword stuffing
- no generated image presented as a real business photo
- reasonable size/performance impact
- poster/fallback if video is used
- no layout clipping over search or primary UI

## 4. Search / Navigation Rule

Every public search or navigation change must be reviewed for:

- no broken crawlable links
- no accidental indexable query sprawl
- search routes keep the intended robots policy
- internal search/filter links either work or are not emitted
- no hidden or clipped search dropdowns
- island/category/profile loops remain crawlable

## 5. Sitemap / Robots Rule

Every public PR must verify:

- `/sitemap.xml` returns `200`
- intended new pages are included
- removed or renamed pages are removed
- no `404` URLs are included
- no private, preview, docs, or dev URLs are included
- `/robots.txt` still matches the intended crawl policy

## 6. Structured Data Rule

Only emit schema that can be defended with source truth.

Allowed when real:

- `Organization`
- `WebSite`
- `BreadcrumbList`
- `Article`
- `FAQPage`
- `LocalBusiness`
- `Place`

Do not emit unless real and sourced:

- `aggregateRating`
- `review`
- `openingHours`
- `Offer`
- `Event`
- booking/inventory claims

## 7. Minimum PR SEO Checklist

Every public PR report must include:

- routes changed
- metadata/canonical summary
- sitemap impact
- internal-link impact
- structured-data impact
- noindex/index changes
- image/media truth notes if applicable
- route QA results

## 8. Required Commands

For every public PR:

```bash
npm run typecheck
npm run lint
NODE_OPTIONS=--use-system-ca npm run build
```

If the PR changes crawlable pages, also verify:

- `/`
- affected route types
- `/sitemap.xml`
- `/robots.txt`
- representative profile routes
- representative category routes
- representative island hubs

## 9. Hard Stops

Do not merge a public PR if any of the following is true:

- a crawlable public route returns `404` or `500`
- a canonical URL is wrong or missing on an indexable route
- the same listing resolves on multiple indexable category paths
- sitemap contains broken or unintended URLs
- structured data contains fake ratings, reviews, hours, offers, events, availability, or booking claims
- media implies a real business photo when it is generated or generic artwork

## 10. Recommended SEO Fix Order

When multiple issues exist, fix in this order:

1. Route correctness and canonical integrity
2. Sitemap / robots correctness
3. Duplicate URL elimination
4. Internal linking
5. Metadata quality
6. Structured data quality
7. Image/performance polish

## 11. Standing Principle

VibeVI should rank because the routes are real, the metadata is intentional, the internal links are useful, and the claims are truthful.

SEO work must never be separated from trust work.
