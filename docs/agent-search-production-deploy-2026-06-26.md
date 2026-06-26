# Ask VibeVI Search — Production Deployment

Date: 2026-06-26  
PR: https://github.com/dimitritjames-jpg/project-archipel/pull/6  
Merge commit: `7a7db6093fd7e1cddf7808a3f73be6a626917ec8`  
Feature commit: `fe72451bcd277f1fec207b29a67cf0c6bd9c2651`  
Branch merged: `design/live-vibevi-agent-search-integration`

## What shipped

- `IslandAskBar` in live hero (`HeroMediaSection`)
- Compact ask bar + `?q` prefills on `/search`
- `HomeSearchBar` `initialQuery` sync from URL
- Build fix: removed type re-export from `"use server"` `local-search.ts`

Live MyVibeVI field-guide homepage and sections preserved. Full agent-template replacement **not** merged.

## Vercel

| Project | Status | Dashboard |
|---------|--------|-----------|
| `project-archipel-zwhn` | success | https://vercel.com/dimitritjames-3053s-projects/project-archipel-zwhn/pQY41VgiGJxgAW7KaH9FwGi5vMX2 |
| `project-archipel` | success (production domain) | https://vercel.com/dimitritjames-3053s-projects/project-archipel/Bf3L3d7QjGj9FDmRwYKPDWx6GPDm |

## Production HTTP verification

Verified 2026-06-26 against `https://www.myvibevi.com`:

| Route | Status | Title |
|-------|--------|-------|
| `/` | 200 | VibeVI - Find Your Island Vibe |
| `/search` | 200 | Find the Move \| VibeVI |
| `/search?q=beach` | 200 | Find the Move \| VibeVI |
| `/search?q=romantic%20dinner%20st%20thomas` | 200 | Find the Move \| VibeVI |
| `/search?q=rainy%20day` | 200 | Find the Move \| VibeVI |
| `/map` | 200 | Island Map \| VibeVI |
| `/get-listed` | 200 | Get Listed on VibeVI \| VibeVI |

- No application error markers (`Application error`, `Internal Server Error`, `statusCode:500`) on homepage HTML.
- Homepage HTML contains Ask VibeVI / Find the move content.

## 404 CTA check

No visible homepage/search chip links to `/beach`, `/boat`, `/bite`, or `/night` in production HTML (verified by source scan).

## Pre-merge validation (record)

- Branch clean on `fe72451`
- `npm run typecheck`, `lint`, `build` — pass
- Local production server: `/`, `/search`, `/search?q=beach`, `/map`, `/get-listed` — 200

## Screenshots (pre-merge local)

- `docs/agent-search-screenshots/home-desktop.png`
- `docs/agent-search-screenshots/home-mobile.png`
- `docs/agent-search-screenshots/search-desktop.png`
- `docs/agent-search-screenshots/search-mobile.png`

## Out of scope (not deployed)

- `feat/vibevi-agent-template-v1` full template replacement
- Agent template rollout to routes beyond `/` hero and `/search`
- Rejected design branches unchanged

## Related docs

- `docs/VIBEVI_AGENT_SEARCH_INTEGRATION.md` — integration design and trust rules
