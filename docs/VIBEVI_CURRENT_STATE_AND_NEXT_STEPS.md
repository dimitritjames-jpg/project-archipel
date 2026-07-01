# VibeVI current state and next steps

**Source of truth:** GitHub `main` on `dimitritjames-jpg/project-archipel`  
**Production-safe merge baseline:** `74ce26eaa3331d4cb724947fd0d45bc6e6ff7574`  
**Date:** 2026-07-01  
**Design direction:** Keep the current live site structure and trust posture. No broad redesign is in scope.

---

## 1. Baseline integrity

| Item | Value |
|------|-------|
| Production URL | `https://www.myvibevi.com` |
| Source-of-truth branch | GitHub `main` |
| Local mirror warning | This clone's `origin` points to a local mirror and is **not** the source of truth for merge state |
| PR #20 status | Merged and production-safe |
| Preview policy | Protected previews still require authenticated rendered QA before merge on UI or search-facing work |

**Important:** any stale local `origin/main` or mirror branch should be treated as cached context only. Use GitHub `main` plus PR and deployment history for merge truth.

---

## 2. Live production baseline

| Area | Current live state |
|------|--------------------|
| Catalog count | `179` public-info listings |
| Sitemap count | `253` URLs |
| Canonical host | `https://www.myvibevi.com` |
| `/search` | `noindex, follow` |
| Base island hubs | `index, follow` |
| Filtered island hubs | `noindex, follow` with canonical to base hub |
| `/biz` aliases | `308` to canonical profile routes |
| Wrong-category profile URLs | Safe `308` or `404` behavior |
| Localhost leakage | Cleared in current production baseline |

---

## 3. Live catalog model

### Core categories now live

- `beaches`
- `excursions-charters`
- `tours-activities`
- `attractions`
- `indulgent-dining`
- `nightlife-rhythm`
- `local-provisions`
- `wellness-spas`
- `boutique-stays`
- `culture-history`

### Production counts and posture

- Public-info catalog remains the live directory source for this phase.
- No demo listings should be allowed to bleed into production discovery.
- Public-info listings must keep source-backed copy and disclosure.
- No fake reviews, ratings, hours, pricing, booking, availability, partnerships, or verification claims.

---

## 4. Search and discovery baseline

| Area | Current state |
|------|---------------|
| Search engine | Local catalog search with guide shortcuts, query expansion, and category/island intent tuning |
| Strong intents | `boat`, `yacht`, `charter`, `coral world`, `spa`, `beach st thomas`, `beach st croix`, `claim listing` |
| Still broad or weak | `nightlife`, `sunset`, `market`, broad island-name browsing, family/rainy-day refinement |
| Homepage island-first flow | Live and production-safe |
| Boat tile flow | Homepage Boat tile routes to `/search?q=boat` |
| Search indexing | `/search` must stay `noindex, follow` |

This repo no longer uses the older production-bug assumptions from the 2026-06-25 state. Search is live, routed, and protected by current SEO policy.

---

## 5. Island and route policy

| Route family | Live policy |
|-------------|-------------|
| Island hubs | `/islands/{island}` remains the island-first browse entrypoint |
| Canonical profiles | `/{island}/{canonicalCategorySlug}/{businessSlug}` only |
| Old category paths after migration | Redirect to the new canonical profile route |
| Thin category pages | Stay user-accessible but should be `noindex, follow` and excluded from sitemap when too thin |
| Sitemap | Canonical URLs only; no `/biz`, no filtered query URLs, no wrong-category duplicates |

---

## 6. Get Listed and trust posture

| Item | Current state |
|------|---------------|
| `/get-listed` | Indexed business-intent page |
| Intake model | Manual review and mailto-driven |
| Self-serve claim flow | Not live |
| Paid placement | Interest capture only; do not imply active guaranteed placement |
| Dashboard automation | Not live |

For beta, `/get-listed` stays manual-review / inbox-driven. Do not imply instant approval, live claim verification, a real owner dashboard, or automated premium workflow.

---

## 7. Supporting docs to use with this baseline

- [site-completion-report-2026-07-01.md](./site-completion-report-2026-07-01.md)
- [search-scs-final-qa-2026-07-01.md](./search-scs-final-qa-2026-07-01.md)
- [real-business-intake-workflow.md](./real-business-intake-workflow.md)
- [public-soft-launch-qa.md](./public-soft-launch-qa.md)

These docs are supporting evidence. This file is the refreshed baseline summary for current production state.

---

## 8. Safe next work

### In scope next

- Search/SCS intent tuning that does not change listing data or indexing policy
- QA docs refreshes
- Honest business conversion improvements that preserve the manual-review beta posture
- Preview-first verification before merge

### Out of scope unless explicitly approved

- New categories beyond approved taxonomy work
- Listing migrations unrelated to an approved taxonomy pass
- Any change that makes `/search` indexable
- Any change that makes filtered island query URLs indexable
- Any fake real-time, verification, booking, or partner behavior
- Global redesign work

---

## 9. Baseline QA guardrails

```
[ ] Start from GitHub main, not the local mirror
[ ] npm run typecheck
[ ] npm run lint
[ ] NODE_OPTIONS=--use-system-ca npm run build
[ ] Sitemap count remains expected for the branch
[ ] /search remains noindex, follow
[ ] Canonical host remains https://www.myvibevi.com
[ ] No localhost / 127.0.0.1 leakage
[ ] No visible source/code artifacts
[ ] No fake listing or trust-policy regression
```
