# VibeVI verified inventory workflow

This is an editorial verification workflow, not self-serve onboarding. A listing is never considered verified because it is premium, claimed, well-known, or visually complete.

For soft-launch business collection, start with `docs/real-business-intake-workflow.md` and the templates in `data/`. This document remains the authority for moving a submitted record into verified, indexable public inventory.

## Listing states

| State | Intended use | Indexing | LocalBusiness schema | Public phone/email |
|---|---|---:|---:|---:|
| `demo` | Fictional layout inventory | No | No | No |
| `public_info` | Real unclaimed listing promoted from strong official public sources | Yes, only after promotion gate | No | Yes, only if sourced from official/public pages and clearly disclosed |
| `submitted` | Business or researcher supplied details awaiting review | No | No | No |
| `unverified` | Incomplete or stale source review | No | No | No |
| `verified` | Human-reviewed, source-backed real listing | Only when `robots_noindex=false` and schema gate passes | Only when schema gate passes | Only with `contact_permission_status=granted` |

`is_claimed` is independent ownership context. `premium_tier` is independent commercial context. Neither changes verification.

## Public-info listing promotion criteria

Public-info listings are not verified listings. They are a controlled launch bridge for real businesses with strong public-source evidence.

Required gate:

- official business website or strong official public source;
- active public operating evidence;
- evidence URL and last checked date;
- original VibeVI description;
- sourced website, contact details if shown, and area/address;
- `public_info_listing=true`;
- `is_demo=false`;
- `is_verified=false`;
- `verification_status=submitted`;
- `is_claimed=false`;
- `premium_tier=none`;
- `booking_enabled=false`;
- `partner_status=none`;
- `media_rights_status=not_granted`;
- visible disclosure copy;
- no LocalBusiness schema.

Public-info pages may index after this gate passes because they are real public-source listings, but schema remains disabled until the verified schema gate passes. Public-info copy must not say partner, verified partner, official listing, book now, reserve instantly, live availability, guaranteed, or any equivalent claim.

## Add a real business

1. Copy the blank record in `data/business-import-template.json`.
2. Record the official business name, island, immutable category slug, concise factual description, area/address, and official public links.
3. Set `verification_status` to `submitted`, `robots_noindex` to `true`, and premium to `none`.
4. Record where every fact came from in `verification_source`. Prefer an official website, business-owned social account, direct written response, or an authoritative registry.
5. Confirm whether direct phone/email may be republished. Record `granted`, `declined`, or `pending`; never infer permission.
6. Review spelling, location, coordinates, links, category, media rights, and claims.
7. Set `last_verified_date` to the actual human review date.
8. Only after review, set `verification_status=verified` and `is_verified=true`.
9. Keep `robots_noindex=true` until the production profile passes its metadata/schema check. Then explicitly set it false.

`verification_source` is readable with the public listing row in the current schema. Store only a public canonical URL or a non-sensitive source label there—never private correspondence, contact names, credentials, or internal notes.

## Convert a demo listing

Do not simply remove the word “Demo.” Treat conversion as a new sourced record:

1. Obtain the real business’s details and publication permission.
2. Replace the fictional name, slug, description, area, and all optional fields with sourced values.
3. Set `is_demo=false` and `verification_status=submitted` while review is underway.
4. Remove every fictional claim and demo-only media reference.
5. Complete the verification checklist above.
6. Set `verification_status=verified`, `is_verified=true`, `last_verified_at`, and `verification_source` together.
7. Grant indexing only after `isLocalBusinessSchemaEligible()` returns true in the rendered profile and the contact permission rules pass.
8. Add a redirect if the public slug changed after an indexed URL already existed.

## Update a listing

- Recheck the changed field against an official/direct source.
- Update `verification_source` when the source changes.
- Refresh `last_verified_at` only after a human review—not on automated imports.
- Return the record to `submitted` or `unverified` and `robots_noindex=true` if identity, ownership, address, or contact accuracy becomes uncertain.
- Never copy promotional superlatives into factual copy without attribution and editorial review.

## Demo and noindex controls

- Demo: `is_demo=true`, `verification_status=demo`, `is_verified=false`, `robots_noindex=true`, no contact fields, no premium tier.
- Temporary noindex: set `robots_noindex=true`; this is required for submitted, unverified, disputed, or stale listings.
- Demo rows must retain obvious UI labels and must never emit LocalBusiness schema.

## Contact verification

- Prefer contact details visible on the official website or supplied directly in writing.
- A phone/email being public elsewhere does not automatically grant republication permission.
- Store the permission decision in `contact_permission_status`.
- The UI only displays direct phone/email when the listing is source-verified and permission is `granted`.
- Do not store private contact information in public fields or source-controlled import files.

## Media

1. Confirm ownership, license, approval, credit requirements, and allowed use.
2. Record that evidence outside the public asset folder.
3. Follow `public/media/README.md` for paths, naming, sizes, and crop guidance.
4. Add accurate alt text to `src/lib/media.ts` or the business media record.
5. Keep the premium gradient fallback working when no approved asset exists.

## LocalBusiness schema gate

The application emits LocalBusiness-derived schema only when all are true:

- not demo;
- verification status is `verified` and legacy `is_verified` is true;
- verification source and last-verified timestamp exist;
- name, substantial description, category, and schema type exist;
- at least one sourced public fact exists: official website, street address, or permitted phone;
- `robots_noindex` is false for indexing.

Run a production HTML check after every schema-affecting change. Paid placement and claimed ownership never bypass this gate.

Public-info listings intentionally fail this schema gate because they are not `verified` and `is_verified=true`. This is expected.
