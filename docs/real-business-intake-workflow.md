# VibeVI real business intake workflow

This workflow turns a conversation with a USVI business into a safe submitted listing candidate. It is intentionally separate from owner self-service. No business can self-modify verification, indexing, schema, premium, or trust fields during soft launch.

## Intake stages

| Stage | Meaning | Public behavior |
|---|---|---|
| `new_submission` | Business details received but not checked | Do not publish as verified |
| `needs_source_review` | Facts need official/direct-source confirmation | Keep `robots_noindex=true` |
| `needs_permission` | Public contact or media rights need written approval | Hide phone/email/media |
| `ready_for_admin_import` | Required fields and evidence are complete | Admin import only |
| `imported` | Record was imported to the database | Still follows schema/noindex gates |

Use `data/business-intake-template.csv` or `data/business-import-template.json` for collection. Do not place private correspondence, personal names, credentials, or internal notes in public import files.

## Public-information candidate intake

`data/public-info-business-candidates-batch-1.json` is a research queue, not a publishing queue. A candidate may be researched from official/public sources and still remain unpublished.

Rules for public-information candidates:

- keep `publish_ready=false` until a human reviewer approves the row;
- keep `needs_human_review=true` until owner/direct-source confirmation is complete;
- keep `contact_permission_status=public_source_only` until written permission is received;
- keep `media_rights_status=not_granted` until the business provides owned/licensed media or written rights;
- keep `booking_enabled=false`, `claimed=false`, `premium=false`, and `partner_status=none`;
- keep `robots_noindex=true` if imported before final verification;
- do not emit LocalBusiness schema until required facts are verified and sourced.

Allowed operating status values:

- `active_public_evidence`
- `active_owner_confirmed`
- `uncertain_needs_review`
- `possibly_closed`
- `closed_do_not_publish`

Public evidence is useful for outreach and duplicate prevention. It is not permission to publish phone/email, use photos, imply endorsement, or mark a business verified.

## Minimum required fields for a launch candidate

- official business name;
- island code;
- category slug;
- short factual description approved for publication;
- public area or address;
- official website or business-owned social source;
- verification source;
- human review date;
- contact permission status;
- demo status set to `false`;
- `robots_noindex=true` until final QA passes.

## Contact publication permission

Phone and email must not appear on a public profile unless:

1. the business identity is verified;
2. the contact detail is sourced from an official/direct source;
3. the business grants republication permission;
4. `contact_permission_status=granted`;
5. the rendered profile passes the existing trust gate.

Do not infer permission because a phone number is visible somewhere else.

## Intake-to-import handoff

1. Collect details using the outreach message or intake template.
2. Set `intake_stage=new_submission`.
3. Source-check every publishable fact.
4. Set `intake_stage=needs_permission` if contact/media rights are incomplete.
5. Set `verification_status=submitted`, `demo_status=false`, and `robots_noindex=true`.
6. When ready, set `intake_stage=ready_for_admin_import`.
7. Admin imports the row and runs duplicate, category, coordinate, link, noindex, and schema checks.
8. Only after QA should the listing become verified and indexable.

## LocalBusiness schema readiness

Before a listing can emit LocalBusiness schema:

1. identity, island, category, address/area, URL, and public contact fields must be sourced;
2. the business must not be a demo or fictional listing;
3. contact republication permission must be recorded when phone/email appears;
4. descriptions must be original VibeVI copy or owner-approved copy;
5. media must be licensed or omitted;
6. the rendered profile must pass no fake booking, no fake partnership, and no unsupported live/real-time claim checks.

## What not to collect in source-controlled files

- private owner names unless approved as public;
- private email threads;
- passwords or dashboard access;
- payment data;
- precise private notes about disputes;
- unlicensed media files;
- analytics identifiers.
