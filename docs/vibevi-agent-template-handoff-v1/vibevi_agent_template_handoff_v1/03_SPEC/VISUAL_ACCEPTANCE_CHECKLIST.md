# Visual Acceptance Checklist

## Required screenshots

- Homepage desktop: 1440 × 1024
- Homepage mobile: 390 × 844 or 375 × 812
- Search desktop: 1440px wide
- Search mobile: 390px wide

## Compare against

- `01_APPROVED_RENDER/approved-desktop.png`
- `01_APPROVED_RENDER/approved-mobile.png`

## Header

- white clean header
- correct logo scale
- navigation is not crowded
- mobile logo is centered
- no dead favorites/menu controls

## Hero

- coastal image remains soft and readable
- hero is not too tall
- title is centered and prominent
- subtitle is concise
- composer is visually dominant
- no heavy dark overlay
- no tourism-brochure text block

## Composer

- white rounded surface
- correct width and visual height
- teal send control
- input is usable and accessible
- Enter submits
- no dead plus/microphone button
- focus state visible

## Chips and popular links

- chips match render scale
- wrap cleanly on mobile
- every chip works
- popular links route correctly
- no excessive button clutter

## Discovery sections

- island cards are image-forward
- only three need be visible on desktop
- Water Island remains reachable
- recommendation rail uses real data
- no fake personalization/ratings
- sections breathe; no dense grid wall

## Mobile

- no horizontal overflow
- no fake device frame
- no squeezed desktop nav
- composer fills width
- chips remain touch-friendly
- utility shortcut is useful
- recommendation card remains legible

## Regression

- current P0/P1/P2 search results preserved
- `/search?q=` works
- no 500s
- no unrelated pages changed in Phase 1
- typecheck, lint, build pass
- console clean

## Stop rule

Cursor must not declare Phase 1 complete or continue to Phase 2 without screenshots, documented comparison, and user approval.
