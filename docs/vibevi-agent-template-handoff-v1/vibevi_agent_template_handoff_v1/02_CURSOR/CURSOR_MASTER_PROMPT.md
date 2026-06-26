# Cursor Master Prompt — VibeVI Agent Template v1

You are implementing the approved VibeVI Agent Template.

## Repository safety

Repository: `project-archipel`

Start from the current clean `main`. Do not assume a commit hash; verify it.

Rejected visual experiments must not be revived or merged:

- `codex/vibevi-warm-caribbean-facelift`
- `codex/vibevi-homepage-render-v2`

Before editing:

```bash
git checkout main
git pull origin main
git status
git branch checkpoint/pre-agent-template-v1-2026-06-25 main
git push origin checkpoint/pre-agent-template-v1-2026-06-25
git checkout -b feat/vibevi-agent-template-v1
```

Do not merge this branch until the user approves the Vercel preview.

## Approved visual source of truth

Read and visually inspect:

- `01_APPROVED_RENDER/approved-full.png`
- `01_APPROVED_RENDER/approved-desktop.png`
- `01_APPROVED_RENDER/approved-mobile.png`
- `01_APPROVED_RENDER/approved-annotated.png`

The goal is not a loose interpretation. The homepage and search entry experience should closely match the render's:

- structure
- hierarchy
- spacing
- header proportions
- hero height
- agent composer size
- chip treatment
- section order
- card radii
- shadow softness
- white-space
- desktop/mobile behavior

The right side of the full render is a mobile breakpoint reference. Do not render a fake phone frame on desktop.

## Design intent

This is the new reusable VibeVI template:

- clean ChatGPT-style agent entry point
- current VibeVI island imagery and content
- minimal visual clutter
- one central discovery component
- a few direct options below it
- easy maintenance through shared components
- warm, coastal, local, modern
- bright and refined, not sterile
- current site routes/data preserved

Do not create:

- a dark SaaS dashboard
- a tourist-brochure homepage
- a giant card wall
- a fake AI chat experience
- dead controls
- fake personalization
- a full-site rewrite in Phase 1

## Phase 1 scope — strict

Implement only:

1. shared header shell needed by the new template
2. reusable VibeVI agent composer
3. homepage integration
4. `/search` integration
5. responsive desktop/mobile behavior
6. screenshot and visual-comparison tooling/docs

Do not restyle other routes in Phase 1.

## Existing functionality to preserve

Preserve the current production implementation of:

- P0/P1/P2 search behavior
- `/search?q=...`
- catalog fallback
- guide/utility shortcuts
- island aliases
- Supabase behavior
- public-info trust states
- Mapbox
- business profiles
- claim/Get Listed routes
- metadata and structured data
- current site routes
- current media registry

Do not rewrite search scoring or query expansion.

## Required shared components

Create or adapt reusable components with clear props:

### `AgentSiteHeader`

Desktop:
- VibeVI logo left
- Explore
- Islands
- Experiences
- Plan
- Ferry & Cruise
- Get Listed
- Favorites only if a working route/state exists
- menu button only if it opens a real menu

Mobile:
- menu left
- centered logo
- favorites right only if functional

Do not ship dead links or decorative buttons that appear interactive.

### `VibeAgentComposer`

Variants:

```ts
type VibeAgentVariant = "hero" | "search" | "compact";
```

Required behavior:
- standard accessible GET form to `/search`
- input name `q`
- submit with Enter
- send button submits
- trims empty input
- supports default query from URL
- accepts custom chips and popular searches
- keyboard/focus accessible
- no dependency on JavaScript for basic submit if practical

Suggested props are in `05_STARTER/component-contracts.ts`.

Visual behavior:
- large white rounded composer
- subtle gray border
- soft shadow
- teal circular send control
- relaxed spacing
- multi-line visual treatment on hero/search
- compact single-line version for later templates

Optional controls:
- Plus button must open a real filter/tool popover or be omitted.
- Microphone must use supported browser speech input or be omitted.
- Never ship dead buttons to match the mockup.

### `IntentChipRow`

Default intents:
- Beach
- Boat
- Bite
- Night
- Family
- Romantic
- Rainy Day
- Cruise Day
- Ferry
- Local Shops

Each chip must route to a working query or direct route.

### `PopularSearchLinks`

Desktop:
- inline under chips

Mobile:
- stacked text links

Initial examples:
- beach near ferry
- romantic dinner st thomas
- things to do with kids
- cruise day food

### `IslandDiscoveryRail`

Use actual existing island routes and media:
- St. Thomas
- St. John
- St. Croix
- Water Island through View all islands or horizontal continuation

Desktop:
- three large cards visible
- View all islands action

Mobile:
- horizontal snap-scrolling cards or compact vertical cards

### `RecommendationRail`

Use actual existing catalog/guide data.

Do not invent:
- businesses
- ratings
- labels
- locations
- availability

If no personalization exists, title the default section:
- `Popular across the USVI`
or
- `Recommended places`

Only use `Recommended for You` when there is a real query/session basis.

## Homepage layout

Match the desktop reference:

1. white shared header
2. beach/coastal hero background
3. centered small `VIBEVI AGENT` label
4. large headline: `What’s your island move?`
5. short explanatory text
6. large central composer
7. quick intent chips
8. popular search links
9. Explore the USVI section
10. recommendation rail

Keep section spacing and overall page density close to the render.

## Search page layout

Reuse the exact same composer component in `search` variant.

Do not change search logic.

Recommended structure:
1. standard shared header
2. compact/medium agent intro
3. composer prefilled from `q`
4. intent chips
5. existing search results
6. filters integrated cleanly below composer
7. existing empty/loading/error states preserved

Do not turn search results into a fake conversational transcript in v1.

## Mobile behavior

Match `approved-mobile.png`:

- simple top bar
- centered logo
- large but compact headline
- composer fills available width
- chips wrap cleanly
- popular searches stack
- utility shortcut card can surface ferry schedules
- recommendation card remains image-forward
- no horizontal page overflow
- no fake phone frame
- no desktop dropdown navigation squeezed into mobile

## Visual tokens

Use the files in `04_TOKENS/` as the starting point.

Key direction:
- warm off-white canvas
- white surfaces
- near-navy text
- VibeVI teal accent
- pale aqua agent label/chips
- thin warm-gray borders
- soft low-opacity shadows
- 18–28px card/composer radii
- clean Geist/current sans typography
- no serif headline system for this template
- generous whitespace

## Media

Use the current approved site media registry and real catalog media.

Do not extract low-resolution production images from the render.

The render is a layout/design reference only.

Do not present generated imagery as a named business, exact property, exact employee, or verified location.

## Content and honesty

The UI may use the label `VibeVI Agent`, but v1 uses existing search intelligence.

Allowed:
- `Tell VibeVI what you’re looking for.`
- `Get real recommendations from the USVI.`
- `What’s your island move?`

Not allowed until implemented:
- `AI concierge`
- `personalized by AI`
- `live availability`
- `instant booking`
- `real-time ferry status`
- `I planned this for you`

## Visual acceptance — mandatory

Do not complete Phase 1 until all of the following exist:

- desktop screenshot at 1440px
- mobile screenshot at 390px or 375px
- screenshot paths documented
- comparison against approved desktop/mobile renders
- list of visual differences and reasons
- no broken controls
- no dead buttons
- no horizontal overflow
- no console errors
- no search regression
- typecheck passes
- lint passes
- build passes

Store screenshots under:

`docs/agent-template-v1-screenshots/`

Store implementation notes under:

`docs/VIBEVI_AGENT_TEMPLATE_V1_IMPLEMENTATION.md`

## Testing

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Verify:
- homepage
- `/search`
- query submission
- all default chips
- popular query links
- mobile navigation
- actual search results
- public-info labels
- no changes to unrelated pages

## Commit sequence

Use logical commits:

1. `feat: add shared VibeVI agent composer`
2. `feat: apply agent template to homepage and search`
3. `docs: add agent template visual QA`

Do not merge.

## Stop condition

After Phase 1 screenshots and QA are complete, stop and ask for human approval.

Do not roll the template across the rest of the site until the approved homepage/search preview is accepted.
