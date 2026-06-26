# Component Blueprint

## 1. `AgentSiteHeader`

Purpose: one shared header for the new template.

Responsibilities:
- brand/logo
- primary route groups
- Get Listed
- functional favorites, if available
- functional menu
- mobile breakpoint behavior

Must not own:
- search state
- page-specific filters
- business claim state

## 2. `VibeAgentComposer`

Purpose: the single reusable discovery entry point.

Variants:
- `hero`: large multi-line visual treatment
- `search`: medium composer with current query
- `compact`: one-line reusable bar for later templates

Responsibilities:
- render accessible GET form
- submit to `/search?q=...`
- render chips/popular links
- handle empty input
- expose props for page context
- optionally expose real tools/voice features

Must not own:
- ranking
- query expansion
- Supabase access
- result rendering
- fake chat history

## 3. `IntentChipRow`

Purpose: direct routes into reliable intent queries.

Data-driven. Never duplicate chip markup across pages.

## 4. `PopularSearchLinks`

Purpose: demonstrate natural-language queries.

Data-driven and easy to change.

## 5. `IslandDiscoveryRail`

Purpose: direct users to island portals with minimal clutter.

Use existing island registry/media.

## 6. `RecommendationRail`

Purpose: show actual catalog or guide content.

Use a shared card type with:
- title
- subtitle/location
- image
- href
- honest badge
- optional source/trust label

## 7. `AgentPageSection`

Optional shared primitive:
- heading
- supporting text
- action
- horizontal rail/content slot

This keeps spacing consistent without forcing every page into a card.

## 8. Component ownership

Search fixes should usually happen in:
- `VibeAgentComposer`
- shared chip/popular-search data
- existing search libraries

Visual fixes should usually happen in:
- agent template tokens
- shared component styles

Avoid page-specific copies of the agent bar.
