# VibeVI Agent Template v1 — Phase 1 Implementation

Branch: `feat/vibevi-agent-template-v1`  
Checkpoint: `checkpoint/pre-agent-template-v1-2026-06-25`  
Status: Phase 1 complete — **not merged** (awaiting human approval)

## Scope delivered

Phase 1 implements only the approved agent template on:

- `/` (homepage)
- `/search`

Shared components:

- `AgentSiteHeader`
- `VibeAgentComposer` (`hero` | `search` | `compact`)
- `IntentChipRow`
- `PopularSearchLinks`
- `IslandDiscoveryRail`
- `RecommendationRail`
- `AgentPageSection`

Other routes keep the existing `SiteHeader` and styling via `SiteHeaderSwitch`.

## Screenshot paths

| Viewport | Homepage | Search (`?q=beach`) |
|----------|----------|---------------------|
| Desktop 1440px | `docs/agent-template-v1-screenshots/homepage-desktop-1440.png` | `docs/agent-template-v1-screenshots/search-desktop-1440.png` |
| Mobile 390px | `docs/agent-template-v1-screenshots/homepage-mobile-390.png` | `docs/agent-template-v1-screenshots/search-mobile-390.png` |

Approved reference renders (for comparison):

- `docs/agent-template-v1-screenshots/reference/approved-desktop.png`
- `docs/agent-template-v1-screenshots/reference/approved-mobile.png`
- `docs/agent-template-v1-screenshots/reference/approved-full.png`
- `docs/agent-template-v1-screenshots/reference/approved-annotated.png`

Capture script: `scripts/capture-agent-template-screenshots.mjs` (requires local dev server; defaults to `http://localhost:3004`).

## Visual comparison summary

### Matches the approved render

- White sticky header (~74px) with logo, nav groups, and Get Listed
- Warm off-white canvas and beach hero on homepage
- Centered `VIBEVI AGENT` eyebrow, headline, and supporting copy
- Large white composer with teal circular send control
- Intent chip row with all 10 default intents
- Popular search links under chips
- `Explore the USVI` island rail (3 featured islands + view all)
- Recommendation rail titled **Popular across the USVI** with honest catalog data and public-info labels
- Mobile: menu-left / logo-center / search CTA-right header pattern
- No dead plus, mic, or favorites controls

### Documented differences (intentional)

| Area | Approved render | Implementation | Reason |
|------|-----------------|----------------|--------|
| Favorites button | Shown in mock | Omitted | No working favorites route/state in production |
| Plus / mic in composer | Decorative in mock | Omitted | Spec forbids dead controls |
| Recommendation title | “Recommended for You” | “Popular across the USVI” | No personalization/session basis in v1 |
| Recommendation cards | Curated mock titles/badges | Real `PUBLIC_INFO_BUSINESSES` entries | Content trust rules — no invented listings |
| Island card subtitles | Marketing lines in mock | Existing island portal taglines from media registry | Uses real site copy |
| Header logo | Palm-tree mark in mock | Existing `ArchipelMark` | Reuses current brand asset |
| Search page | Compact hero only in mock | Composer + existing live `HomeSearchBar` results block | Preserves P0/P1/P2 search behavior |
| Footer | Not in desktop crop | Existing site footer remains | Phase 1 scope excludes footer redesign |
| Composer placeholder | “Ask anything…” | “Tell VibeVI what you're looking for…” | Aligns with allowed v1 copy in spec |
| Mobile ferry utility card | Single card above recommendations | Ferry shortcuts live on `/search` utility section | Avoid duplicate shortcut; full utility block preserved |

### Minor spacing / typography variance

- Hero height uses `min(72vh, 560px)` rather than fixed 448px — keeps composer readable across real text lengths
- Section gaps follow token `--vv-agent-section-gap` (56px) vs exact pixel positions in annotated render
- Chip icons are simple line SVGs instead of filled mock icons

## Search behavior preserved

- `VibeAgentComposer` submits GET to `/search?q=...`
- `HomeSearchBar` accepts `initialQuery` synced from URL `q`
- Existing query expansion, catalog fallback, filters, island cards, category chips, and utility shortcuts unchanged in logic
- Search page uses light agent shell styling only

## Verification

```bash
npm run typecheck   # pass
npm run lint        # pass
npm run build       # pass
```

Manual checks:

- Homepage loads with agent header and composer
- All default chips link to working queries or routes
- Popular search links navigate with encoded queries
- `/search?q=beach` prefills composer and live search bar
- Unrelated routes still use legacy header

## Preview

Run locally:

```bash
npm run dev
```

Then open `/` and `/search?q=beach`. Push branch to Vercel preview for stakeholder review before merge.

## Not in Phase 1

- Template rollout to other routes
- Footer/header redesign site-wide
- Favorites, voice input, or plus/tool popover
- Search ranking or query-expansion changes
- Merge to `main`
