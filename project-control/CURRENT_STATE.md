# VibeVI — Current State

**Recorded:** 2026-06-25

## Repository
| Field | Value |
|-------|--------|
| Local path | `C:\Users\dimit\.cursor\projects\project-archipel` |
| Remote | `https://github.com/dimitritjames-jpg/project-archipel.git` |
| Branch | `main` |
| Latest commit | `0efabc2` — Strengthen VibeVI ferry and cruise-day SEO utility |

## Working tree
- Untracked: `docs/outreach-email-prospect-list-2026-06-24.md` (sensitive outreach — do not commit without review)

## Live / preview URLs
| Surface | URL |
|---------|-----|
| Production | https://www.myvibevi.com |
| Vercel project | `project-archipel-zwhn` |

## Main routes
`/`, `/search`, `/map`, `/get-listed`, `/ferry`, `/cruise-day`, `/experiences/[pillar]`, `/[island]/*`, `/guides/*`, business profiles, dashboard (owner)

## Validation (2026-06-25)
| Check | Result |
|-------|--------|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass |

## Known unfinished areas
- Approved visual reference implementation (island-first, not dark glass/radar)
- Domain/DNS checklist items in launch docs
- Owner dashboard scope (do not expand without approval)
- Media manifest / rights for real business photos

## Known risks
- Residual **Project Archipel** tokens/classes in CSS (`archipel-*`, `glass-luminous`, radar animations)
- Outreach prospect list untracked locally — PII/marketing sensitivity
