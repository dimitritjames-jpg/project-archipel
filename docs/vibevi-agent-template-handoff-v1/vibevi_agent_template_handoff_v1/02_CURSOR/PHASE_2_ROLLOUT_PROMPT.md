# Phase 2 Rollout Prompt — Use Only After Phase 1 Approval

Do not use this prompt until the homepage and `/search` implementation visually match the approved render and the user explicitly approves the preview.

## Goal

Roll the approved shared agent shell across the site without rewriting page-specific functionality.

## Shared pattern

Every page gets:

1. the same `AgentSiteHeader`
2. the same design tokens
3. either a `compact` or `search` variant of `VibeAgentComposer`
4. page-specific content underneath
5. consistent section/container/card primitives

## Route template map

- Island portals: compact composer under island identity/hero
- Experience pages: compact composer above experience cards
- Category directories: compact composer above filters/results
- Business profiles: small compact composer in page chrome; do not distract from business actions
- Map: composer/filter input in list panel
- Get Listed: no discovery composer in hero; use agent/search proof as supporting content
- Ferry/cruise utilities: compact composer plus direct utility controls
- Guides: compact composer below guide title
- Dashboard/sign-in: out of scope unless separately approved

## Rules

- Use one component, not route-specific copies.
- Preserve existing logic, metadata, and trust states.
- Keep the current page content and routes.
- Do not make every page look like the homepage.
- Do not add fake chat transcripts.
- Do not replace purpose-built filters with the agent bar.
- Do not merge until representative page screenshots are approved.

## Representative visual QA

Before broad merge, capture:

- one island portal
- one experience page
- one directory
- one business profile
- map
- ferry utility
- Get Listed
- mobile versions of at least four page types

Document all differences.
