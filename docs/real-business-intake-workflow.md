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

## What not to collect in source-controlled files

- private owner names unless approved as public;
- private email threads;
- passwords or dashboard access;
- payment data;
- precise private notes about disputes;
- unlicensed media files;
- analytics identifiers.
