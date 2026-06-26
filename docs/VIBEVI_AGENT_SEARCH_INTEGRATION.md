# VibeVI Agent Search Integration

Branch: `design/live-vibevi-agent-search-integration`  
Baseline: `main` @ `9015e58` (current production search + live homepage)  
Status: Integration complete — **not merged**, **not deployed to production**

## Why the full agent template was pulled back

The `feat/vibevi-agent-template-v1` branch (`bb225ba`) replaced the homepage with a ChatGPT-style blank agent canvas, swapped the global header on `/` and `/search`, and removed the live editorial sections. That direction conflicted with the preferred MyVibeVI field-guide identity at [myvibevi.com](https://www.myvibevi.com/).

This branch keeps the live design and adds discovery search inside it.

## What was preserved from the live design

- Hero cover imagery and destination layout (`HeroMediaSection`)
- Headline: **Find Your Island Vibe.**
- Subline about beach, boat, plates, culture, nightlife, ferry hops
- Beach / Boat / Bite / Night hero board and day-move posters
- Things to do, island finder, moodboard, tonight's move, island stories
- Four islands, planning guides, map, Get Listed CTA
- Existing header, footer, typography, warm sand/water palette
- Existing search intelligence (P0/P1/P2 catalog fallback, query expansion)
- Trust/schema/noindex and public-info listing rules

## What the ask/search window adds

### `IslandAskBar` (`src/components/search/island-ask-bar.tsx`)

Reusable discovery bar with:

- GET submit to `/search?q=...`
- Accessible label + honest hint (discovery search, not live AI chat)
- Variants: `hero` | `compact`
- Keyboard submit via Enter
- Optional quick prompt chips

### Prompt data (`src/lib/island-ask/prompts.ts`)

| Prompt | Routes to |
|--------|-----------|
| Beach day | `/search?q=beach%20day` |
| Boat charter | `/search?q=boat%20charter` |
| Local plate | `/search?q=local%20plate` |
| Sunset dinner | `/search?q=sunset%20dinner` |
| Boardwalk night | `/st-thomas/nightlife-rhythm` |
| Culture walk | `/experiences/culture` |
| Cruise day | `/cruise-day` |
| Family day | `/search?q=family%20day` |
| Rainy day | `/search?q=rainy%20day` |

### Placement

1. **Homepage hero** — ask bar + prompts below the live subline, above existing CTAs
2. **`/search`** — compact ask bar prefilled from `?q`, plus existing live `HomeSearchBar` results
3. **Island finder section** — unchanged live autocomplete block further down the homepage

## Real search vs future AI

- **Today:** “Ask VibeVI” is a branded discovery entry point into existing published-listing search and real guide/category routes.
- **Not claimed:** live AI concierge, personalized recommendations, booking, availability, or conversational answers.
- **Results:** `HomeSearchBar` continues to call `searchLocalBusinesses` (Supabase + catalog fallback).

## Build fix included

Removed `export type` from `src/lib/search/local-search.ts` (`"use server"` file).  
`HomeSearchBar` now imports `LocalSearchResult` from `catalog-search.ts` directly.  
This resolves the preview/dev error: *Only async functions are allowed to be exported in a "use server" file.*

## Validation

```bash
npm run typecheck   # pass
npm run lint        # pass
npm run build       # pass
```

Production server QA (`next start -p 3010`):

| Route | Result |
|-------|--------|
| `/` | 200 |
| `/search` | 200 |
| `/search?q=beach day` | 200 |
| `/search?q=boat charter` | 200 |
| `/search?q=local plate` | 200 |
| `/search?q=cruise day` | 200 |
| `/culture` | 308 → `/experiences/culture` |
| `/map` | 200 |
| `/get-listed` | 200 |
| `/beach`, `/boat`, `/bite`, `/night` | 404 (no top-level routes; expected) |

## Screenshots

Captured from production build at `http://localhost:3010`:

- `docs/agent-search-screenshots/home-desktop.png`
- `docs/agent-search-screenshots/home-mobile.png`
- `docs/agent-search-screenshots/search-desktop.png`
- `docs/agent-search-screenshots/search-mobile.png`

Capture script: `scripts/capture-agent-search-screenshots.mjs`

## Trust / safety

- No invented businesses, reviews, booking, or availability claims
- Prompt chips link only to existing guides, categories, cruise/ferry pages, or search queries
- Published-listing disclaimer unchanged on `/search`
- No schema/noindex changes

## Recommended next phase

1. Optional: unify island finder section to reuse `IslandAskBar` compact + live results in one module
2. Optional: surface top 3 search hits inline under hero ask bar after submit (still using real search, not fake AI text)
3. Human review on Vercel preview before any merge

## Safe for PR?

Yes — focused diff on `main`, live homepage preserved, build fixed, validation passing. Do not merge until visual review on preview.
