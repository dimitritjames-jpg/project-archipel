# VibeVI Agent Template Handoff v1

This package turns the approved ChatGPT-style VibeVI render into an implementation-grade handoff for Cursor.

## Source of truth

The visual source of truth is:

- `01_APPROVED_RENDER/approved-full.png`
- `01_APPROVED_RENDER/approved-desktop.png`
- `01_APPROVED_RENDER/approved-mobile.png`
- `01_APPROVED_RENDER/approved-annotated.png`

The desktop reference is the left side of the full render. The right side is a **mobile breakpoint reference**, not a phone frame that should be rendered on desktop.

## Read in this order

1. `02_CURSOR/CURSOR_MASTER_PROMPT.md`
2. `03_SPEC/DESIGN_SYSTEM.md`
3. `03_SPEC/COMPONENT_BLUEPRINT.md`
4. `03_SPEC/PAGE_TEMPLATE_MAP.md`
5. `03_SPEC/CONTENT_TRUST_RULES.md`
6. `03_SPEC/VISUAL_ACCEPTANCE_CHECKLIST.md`
7. `04_TOKENS/vibevi-agent-tokens.css`
8. `04_TOKENS/vibevi-agent-tokens.json`

## Implementation strategy

Do **not** redesign all 189 pages at once.

Phase 1:
- Create the shared shell and reusable agent composer.
- Apply it to the homepage and `/search` only.
- Capture desktop/mobile screenshots.
- Compare against the approved render.
- Stop for human approval.

Phase 2:
- After approval, roll the same shared shell across island portals, experience pages, directories, profiles, map, Get Listed, and utility pages.

## Product principle

One reusable discovery component should centralize navigation and search:

> Tell VibeVI what kind of island move you want.

This reduces clutter and lets future fixes happen in one component rather than across dozens of scattered buttons.

## Important truth rule

The first implementation uses the existing production search engine. It may look conversational, but it must not claim generative AI, live booking, live schedules, or personalized recommendations unless those systems actually exist.
