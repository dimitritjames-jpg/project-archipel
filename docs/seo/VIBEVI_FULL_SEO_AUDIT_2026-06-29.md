# VibeVI Full SEO Audit — 2026-06-29

Project: `project-archipel`  
Scope: Existing public site, current public route architecture, current sitemap, current structured-data patterns, and the standing standard for future public work.  
Audit mode: Code audit + local production build/runtime verification. No content was invented and no SEO fixes were applied in this pass.

## Audit Method

- Reviewed metadata, robots, sitemap, route generation, and structured-data code in the App Router.
- Parsed the generated local sitemap and verified current count: `194`.
- Verified current public-info profile count from sitemap depth pattern: `127`.
- Ran local production checks:
  - `npm run typecheck`
  - `npm run lint`
  - `NODE_OPTIONS=--use-system-ca npm run build`
- Runtime-checked representative public routes including:
  - `/`
  - `/search`
  - `/search?q=beach`
  - `/search?q=things%20to%20do`
  - `/islands/st-thomas`
  - `/islands/st-john`
  - `/islands/st-croix`
  - `/islands/water-island`
  - representative category and profile routes
  - `/sitemap.xml`
  - `/robots.txt`

## Coverage Summary

- Homepage audited: `1`
- Island hubs audited: `4`
- Island/category directories audited:
  - `24` indexable category directories from core categories
  - `1` live island beach guide (`/st-john/beaches`)
  - `3` broken island beach links discovered from island hubs (`/st-thomas/beaches`, `/st-croix/beaches`, `/water-island/beaches`)
- Public-info profile template audited across `127` listings
- Experience pages audited: `8`
- Guides and utility pages audited:
  - Ferry hub: `1`
  - Ferry route pages: `5`
  - Cruise-day hub: `1`
  - Cruise-day utility pages: `4`
  - Island things-to-do / specialty guides: present and code-reviewed
- Sitemap entries audited by generation/output: `194`

## What Is Already Working

- Root `WebSite` and `Organization` JSON-LD exist in [src/app/layout.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/layout.tsx:48).
- Search is intentionally noindex via page metadata and `robots.txt`.
- Map is intentionally noindex.
- Island hub pages have unique titles, descriptions, canonicals, and crawlable listing links.
- Category directories have unique metadata patterns and crawlable profile links.
- Public-info profiles avoid fake `aggregateRating`, fake `openingHours`, fake `Offer`, and fake event schema.
- Public-info profile trust language is explicit and honest.
- Sitemap includes all four island hubs and `127` canonical public-info profile URLs.
- Generated imagery is generally labeled honestly as category or atmospheric artwork instead of being presented as real business photography.

## Findings

### P0

| Severity | Route / File | Issue Type | Finding | Recommended Fix | Code Change | Research Needed |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | [src/app/[island]/[categorySlug]/[businessSlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/[businessSlug]/page.tsx:92) | Duplicate indexable URLs | Profile fetch is island+slug based, not island+category+slug based. A listing like `81c-arts` resolves successfully under incorrect category paths such as `/st-thomas/indulgent-dining/81c-arts` and `/st-thomas/nightlife-rhythm/81c-arts`, each with indexable metadata and a self-referencing canonical on the wrong URL. This creates large-scale duplicate content and incorrect category association for crawlers. | Validate the requested `categorySlug` against `business.category.slug`. If it does not match, redirect to the canonical category path or `notFound()`. | Yes | No |
| P0 | [src/components/islands/island-hub-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/islands/island-hub-page.tsx:245) and [src/app/[island]/beaches/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/beaches/page.tsx:1) | Broken crawl path from indexable hubs | Island hub “Beaches” sections point every island to `/{island}/beaches`, but only `st-john/beaches` exists as a live guide. `st-thomas/beaches`, `st-croix/beaches`, and `water-island/beaches` return 404 from crawlable hub pages. | Either build real beach guide pages for those islands or route beach sections to the correct live category/directory equivalent. Until then, do not emit crawlable links to those 404s. | Yes | Possibly |

### P1

| Severity | Route / File | Issue Type | Finding | Recommended Fix | Code Change | Research Needed |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | [src/components/experience/experience-pillar-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/experience/experience-pillar-page.tsx:225) | Internal linking bias | Experience “related categories” chips always link to `st-thomas` category routes regardless of the experience or island context. This overweights St. Thomas in crawl flow and underlinks St. John, St. Croix, and Water Island category inventory. | Replace the hard-coded St. Thomas links with island-aware links or multi-island related links based on `pillar.islandRelevance`. | Yes | No |
| P1 | [src/app/[island]/biz/[slug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/biz/[slug]/page.tsx:1) | Duplicate crawl path | `/[island]/biz/[slug]` is a second indexable path to the same profile content. It sets a canonical to the category route, but it still returns 200 and remains crawlable. | 301 redirect this route to the canonical category URL, or set `noindex` and remove it from any crawlable navigation. | Yes | No |
| P1 | [src/app/[island]/[categorySlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/page.tsx:52) | Thin indexable directories | Empty or near-empty category directories are indexable by default, including weak channels on smaller islands. The empty-state UX is decent, but the SEO posture is still thin-content-prone. | Add a noindex threshold for truly empty/thin directories or add more island-specific editorial copy before indexing them. | Yes | Possibly |
| P1 | [src/app/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/page.tsx:1) | Homepage canonical gap | The homepage inherits global metadata but does not emit an explicit canonical. This is not catastrophic, but the homepage should be explicit because it is the highest-authority URL. | Add page-level homepage metadata with canonical and homepage-specific OG intent. | Yes | No |
| P1 | [src/components/business/business-profile-view.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/business/business-profile-view.tsx:88) | Weak internal return loop | Profile pages link back to island and category, but they do not give crawlers or users a clear route back into global search or related discovery. | Add crawlable “Search VibeVI” and “Related island routes” links on profiles. | Yes | No |

### P2

| Severity | Route / File | Issue Type | Finding | Recommended Fix | Code Change | Research Needed |
| --- | --- | --- | --- | --- | --- | --- |
| P2 | [src/app/search/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/search/page.tsx:13) | Search canonical / metadata | `/search` correctly uses `noindex`, but it does not emit an explicit canonical and inherits generic root OG values instead of search-page OG values. | Add an explicit canonical to `/search` and a search-specific OG payload, while keeping `noindex,follow`. | Yes | No |
| P2 | [src/app/[island]/[categorySlug]/[businessSlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/[businessSlug]/page.tsx:114) | Incomplete social metadata | Profile pages set title/description/canonical, but OG metadata is only `url`. This makes social previews and some metadata consumers fall back to global sitewide values. | Emit per-profile OG title, description, and honest image fallback data. | Yes | No |
| P2 | [src/app/[island]/[categorySlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/page.tsx:58) | Incomplete social metadata | Category pages have title/description/canonical, but no category-specific OG image or richer OG context. | Add category-aware OG image fallbacks and island/category-specific OG metadata. | Yes | No |
| P2 | [src/components/search/home-search-bar.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/search/home-search-bar.tsx:106) | Search UX truth / crawl hygiene | Search dropdown behavior is client-side and noindex-safe, but some search CTA links include `island` and `category` params that the search page does not currently use. | Either implement those filters or stop emitting unused search params in crawlable links. | Yes | No |
| P2 | [src/components/discovery/seo-guide-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/discovery/seo-guide-page.tsx:14) | Guide schema completeness | Guide pages emit `Article` and `FAQPage`, which is honest, but article schema lacks stronger publication metadata such as `url`, `dateModified`, and a publisher logo. | Expand honest article schema fields where source truth is available. | Yes | No |
| P2 | [src/app/layout.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/layout.tsx:48) | Root metadata concentration | The root layout carries most OG/Twitter defaults, which is fine, but several route types rely too heavily on inheritance instead of page-specific SEO intent. | Add a rule that every indexable public template must own its title, description, canonical, robots, and OG intent explicitly. | Yes | No |

## Route-Type Notes

### 1. Homepage `/`

- Title and description exist.
- OG image exists through root metadata.
- Internal links are strong.
- No explicit canonical was found in runtime output.
- No visible code artifacts were found in the current built homepage render.

### 2. Island Hubs `/islands/...`

- Unique titles and descriptions exist for all four islands.
- Canonicals exist.
- Sitemap inclusion is confirmed.
- Strong H1 and island-specific copy are present.
- Crawlable links to listings are present.
- The main issue is the broken beach link pattern for islands other than St. John.

### 3. Category Directories

- Core category routes are indexable and metadata-bearing.
- Thin-category handling is visually graceful but still indexable even when weak.
- `beaches` is not implemented consistently across islands, which creates broken hub links and incomplete category coverage.

### 4. Business / Place Profiles

- Current profile count in sitemap: `127`.
- Metadata pattern is present and generally useful.
- Public-info trust language is strong.
- Honest schema restraint is good.
- The major blocker is duplicate indexable category-path rendering for the same listing.

### 5. Experience Pages

- Unique titles/descriptions exist through `experiencePillarMetadata`.
- FAQ schema is honest.
- No booking/availability promises are made.
- Internal linking needs to stop defaulting related category chips to St. Thomas.

### 6. Guides and Utility Pages

- Ferry and cruise-day pages generally have strong metadata and honest schedule language.
- Guide/article pages are crawlable and useful enough to index.
- Guide schema is acceptable but can be richer.

### 7. Search Pages

- `/search` and query pages are `noindex,follow`.
- `robots.txt` also disallows `/search`, which is directionally correct.
- Search results pages do not currently create indexable query sprawl.
- Search page should still emit an explicit canonical and page-specific OG metadata.

### 8. Structured Data

- Honest `WebSite` and `Organization` schema are present.
- Honest `FAQPage` usage is present on guides/experiences.
- Business schema is appropriately withheld from public-info listings unless a stronger verification threshold is met.
- No fake review/rating/hours/offer/event schema patterns were found in the audited templates.

### 9. Sitemap

- Returns `200`.
- Current count: `194`.
- Includes all four island hubs.
- Includes `127` canonical public-info profile URLs.
- Did not show the broken non-St. John beach routes in sitemap output, but those routes are still linked from island hubs.

### 10. Internal Linking

- Homepage to islands: good.
- Islands to categories: good overall, except broken beach links on three islands.
- Categories to profiles: good.
- Experiences to categories: biased to St. Thomas and should be fixed.
- Profiles back to island/category: good.
- Profiles back to search: missing.

### 11. Image SEO / Performance / Truth

- Generated media is generally labeled as generated atmospheric/category artwork.
- No evidence was found of generated media being represented as real business photography in the audited templates.
- Further LCP/performance auditing should be done separately with Lighthouse/Web Vitals once route correctness issues are fixed.

### 12. Duplicate / Thin Content

- Major duplicate issue exists on miscategorized profile URLs.
- Secondary duplicate issue exists on `/biz/[slug]` alias routes.
- Thin content risk exists on empty category pages that remain indexable.

## Priority Fix Plan

1. Lock profile routes to the canonical category path only.
2. Fix island hub beach links for St. Thomas, St. Croix, and Water Island.
3. Decide how empty/thin category directories should index.
4. Remove St. Thomas-only bias from experience related-category links.
5. Redirect or noindex `/[island]/biz/[slug]` alias pages.
6. Add homepage canonical and page-owned metadata.
7. Add `/search` canonical and search-page OG metadata.
8. Add stronger internal discovery links from profile pages.
9. Add richer OG metadata for category and profile templates.
10. Expand honest article schema on guide pages where appropriate.

## Recommended First SEO Fix Branch

`fix/seo-canonical-route-integrity`

Reason:

- It addresses the two highest-risk SEO issues first:
  - duplicate indexable profile URLs
  - broken crawlable beach links from island hubs
- It improves canonical integrity before any broader metadata polish.

## P0 / P1 / P2 Totals

- `P0`: 2
- `P1`: 5
- `P2`: 6

## P0 Blocker Status

Yes. There are current P0 blockers:

- wrong-category profile URLs are indexable duplicates
- three island hub beach links lead to 404

## P0 Route-Integrity Fix Status

Status: completed on `fix/seo-canonical-route-integrity`

Files changed:

- [src/app/[island]/[categorySlug]/[businessSlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/[businessSlug]/page.tsx)
- [src/components/islands/island-hub-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/islands/island-hub-page.tsx)
- [docs/seo/VIBEVI_FULL_SEO_AUDIT_2026-06-29.md](/C:/Users/dimit/.cursor/projects/project-archipel/docs/seo/VIBEVI_FULL_SEO_AUDIT_2026-06-29.md)

What changed:

- wrong-category profile URLs now `308` redirect to the canonical category path
- profile metadata canonicals now always point at the canonical category path
- island-hub beach section links now use `/islands/{island}?category=beaches`
- island hubs no longer emit the broken `/{island}/beaches` directory link

Routes verified:

- `/islands/st-thomas`
- `/islands/st-john`
- `/islands/st-croix`
- `/islands/water-island`
- `/islands/st-thomas?category=beaches`
- `/st-thomas/local-provisions/81c-arts`
- `/st-croix/indulgent-dining/1756-grotto`
- `/st-john/indulgent-dining/1864-the-restaurant`
- `/st-thomas/beaches/brewers-bay`
- `/st-thomas/beaches/coki-point-beach`
- wrong-path checks:
  - `/st-thomas/indulgent-dining/81c-arts`
  - `/st-thomas/nightlife-rhythm/81c-arts`
  - `/st-thomas/local-provisions/brewers-bay`
- `/sitemap.xml`

Verification result:

- sampled canonical profile URLs return `200`
- sampled wrong-category profile URLs return `308` redirects to the canonical path
- sitemap count remains `194`
- sampled wrong-category URLs are not present in sitemap output
- no sampled `500` responses were found
- no visible source/code artifacts were found on sampled hub/profile routes

Remaining SEO items:

- P1 items remain open, especially `/[island]/biz/[slug]` alias handling, thin-directory indexing policy, and St. Thomas-biased experience linking
- P2 metadata/schema polish remains open

## P1/P2 SEO Cleanup Status

Status: completed on `fix/seo-p1-p2-cleanup`

Files changed:

- [src/app/[island]/biz/[slug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/biz/[slug]/page.tsx)
- [src/app/[island]/[categorySlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/page.tsx)
- [src/app/[island]/[categorySlug]/[businessSlug]/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/[island]/[categorySlug]/[businessSlug]/page.tsx)
- [src/app/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/page.tsx)
- [src/app/search/page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/app/search/page.tsx)
- [src/components/experience/experience-pillar-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/experience/experience-pillar-page.tsx)
- [src/components/business/business-profile-view.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/business/business-profile-view.tsx)
- [src/components/discovery/seo-guide-page.tsx](/C:/Users/dimit/.cursor/projects/project-archipel/src/components/discovery/seo-guide-page.tsx)
- [docs/seo/VIBEVI_SEO_P1_P2_EXECUTION_REPORT_2026-06-29.md](/C:/Users/dimit/.cursor/projects/project-archipel/docs/seo/VIBEVI_SEO_P1_P2_EXECUTION_REPORT_2026-06-29.md)

What changed:

- `/[island]/biz/[slug]` now returns a `308` redirect to the canonical category profile route instead of rendering duplicate profile HTML
- empty category directories now stay user-accessible but emit `noindex,follow`
- category and profile templates now emit stronger page-owned Open Graph and Twitter metadata using honest category artwork fallbacks
- homepage and `/search` now emit explicit page-owned canonicals; `/search` remains `noindex,follow`
- business profiles now include crawlable discovery links into search, island hubs, category routes, and island guide routes
- experience pages no longer use St. Thomas-only related-category chips; they now emit island-aware hub filter links across the relevant islands
- guide article schema now includes `url`, `dateModified`, `mainEntityOfPage`, and publisher logo details without inventing offers, ratings, or other unsupported fields

Commands run:

- `npm run typecheck`
- `npm run lint`
- `$env:NODE_OPTIONS='--use-system-ca'; npm run build`
- `npm run start -- --port 3031`

Routes verified locally against the built app:

- `/`
- `/search`
- `/search?q=beach`
- `/islands/st-thomas`
- `/islands/st-john`
- `/islands/st-croix`
- `/islands/water-island`
- `/islands/st-thomas?category=beaches`
- `/st-thomas/local-provisions/81c-arts`
- `/st-thomas/biz/81c-arts`
- `/st-thomas/indulgent-dining/81c-arts`
- `/st-thomas/beaches/brewers-bay`
- `/water-island/wellness-spas`
- `/experiences/adventure`
- `/sitemap.xml`
- `/robots.txt`

Verification result:

- `/st-thomas/biz/81c-arts` returns `308` to `/st-thomas/local-provisions/81c-arts`
- sampled wrong-category route redirects from P0 remain intact
- canonical profile routes return `200`
- `/search` and `/search?q=beach` remain `noindex,follow`
- homepage and `/search` emit explicit canonicals
- sampled empty category route `/water-island/wellness-spas` returns `200` with `noindex,follow`
- experience related-category links now include St. Thomas, St. John, St. Croix, and Water Island hub-filter routes
- no broken crawlable `/st-thomas/beaches` directory link is emitted from the sampled island hub
- sitemap count remains `194`

Remaining backlog:

- decide whether near-empty category directories beyond `0 listings` should also be `noindex`
- review whether any experience page should replace island-specific relevance cards with guide links for even stronger crawl focus
- continue broader metadata/schema polish across remaining utility and guide templates as needed
