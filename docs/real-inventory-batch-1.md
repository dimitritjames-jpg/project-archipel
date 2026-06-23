# VibeVI real inventory batch 1 plan

Goal: collect the first 30 verified USVI businesses manually without guessing, scraping, inventing data, or publishing unreviewed claims.

The public-information candidate file for this phase lives at `data/public-info-business-candidates-batch-1.json`. It contains 30 research-only candidates sourced from official/public pages:

- St. Thomas: 10
- St. Croix: 8
- St. John: 8
- Water Island: 4

These candidates are not live verified listings. Every candidate remains `publish_ready=false`, `needs_human_review=true`, `booking_enabled=false`, `claimed=false`, `premium=false`, and `partner_status=none` until a human review and permission pass is complete.

Do not copy these candidates into public, indexable listings until the acceptance gate below passes.

## Category priorities

1. Adventure / charters
2. Culinary / restaurants / beach bars
3. Culture / events / nightlife
4. Wellness / spas
5. Stays
6. Local shops / provisions

## Island targets

| Island | Target count | Notes |
|---|---:|---|
| St. Thomas | 10 | Strongest launch density for cruise, dining, nightlife, charters, and get-listed outreach. |
| St. Croix | 8 | Prioritize culinary, Buck Island/adventure, culture, and local shops. |
| St. John | 8 | Prioritize park-adjacent adventure, charters, dining, stays, and local provisions. |
| Water Island | 4 | Prioritize day-trip utilities, beach/provisions, stays, and local services if verified. |

## Batch 1 public-information candidate status

- Candidate file: `data/public-info-business-candidates-batch-1.json`
- Candidate count: 30
- Current replacement-needed count: 0
- Water Island swap: Heidi's Honeymoon Grill was removed and replaced with Virgin Islands Campground because the campground has stronger official website evidence, public contact details, and a Water Island address.
- St. Croix count remains exactly 8.
- Explicit exclusions remain Hamilton's and Louie & Nacho's for this batch.
- No candidate has permission to use media, display owner-submitted contact details, claim partnership, enable booking, or emit LocalBusiness schema yet.

Use the candidate file as the research queue for outreach, not as a production seed file.

## Public-info listing promotion criteria

Approved promotion file: `data/public-info-businesses-batch-1-approved.json`.

Promotion is intentionally selective. Batch 1 reviewed 30 researched candidates and promoted 15 public-info listings. The remaining 15 stay in human review.

A public-info listing is:

- a real business listing created from public official information;
- not owner-verified;
- not claimed;
- not premium;
- not a partner;
- not bookable through VibeVI;
- not allowed to use unlicensed media.

Promotion requires all of the following:

1. official business website or strong official public source;
2. `operating_status=active_public_evidence`;
3. operating-status evidence URL;
4. last checked date;
5. original VibeVI description, not copied source copy;
6. sourced contact info, address/area, and website;
7. no media unless rights are granted;
8. `booking_enabled=false`;
9. `claimed=false`;
10. `premium=false`;
11. `partner_status=none`;
12. visible public-info disclosure;
13. safe indexing recommendation;
14. no LocalBusiness schema unless the verified schema gate passes later.

Public-facing language is limited to labels such as `Public info`, `Unclaimed listing`, `Details are sourced from public business pages. Confirm directly with the business before making plans.`, and `Contact the business directly.`

Do not use partner, verified partner, official listing, guaranteed, live availability, reserve instantly, or book-now language for public-info listings.

## Fields required for each business

- business name;
- island;
- category;
- description;
- area/address;
- website;
- phone if public;
- email if public;
- Instagram/social;
- coordinates if known;
- verification source;
- last verified date;
- contact permission status;
- media rights status;
- notes.

## Batch tracker template

| # | Island | Category priority | Business name | Area/address | Website/social source | Contact permission | Media rights | Verification source | Last verified | Status | Notes |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | St. Thomas | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 2 | St. Thomas | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 3 | St. Thomas | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 4 | St. Thomas | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 5 | St. Thomas | Culture / events / nightlife |  |  |  |  |  |  |  | planned |  |
| 6 | St. Thomas | Culture / events / nightlife |  |  |  |  |  |  |  | planned |  |
| 7 | St. Thomas | Wellness / spas |  |  |  |  |  |  |  | planned |  |
| 8 | St. Thomas | Stays |  |  |  |  |  |  |  | planned |  |
| 9 | St. Thomas | Local shops / provisions |  |  |  |  |  |  |  | planned |  |
| 10 | St. Thomas | Local shops / provisions |  |  |  |  |  |  |  | planned |  |
| 11 | St. Croix | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 12 | St. Croix | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 13 | St. Croix | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 14 | St. Croix | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 15 | St. Croix | Culture / events / nightlife |  |  |  |  |  |  |  | planned |  |
| 16 | St. Croix | Wellness / spas |  |  |  |  |  |  |  | planned |  |
| 17 | St. Croix | Stays |  |  |  |  |  |  |  | planned |  |
| 18 | St. Croix | Local shops / provisions |  |  |  |  |  |  |  | planned |  |
| 19 | St. John | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 20 | St. John | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 21 | St. John | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 22 | St. John | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 23 | St. John | Culture / events / nightlife |  |  |  |  |  |  |  | planned |  |
| 24 | St. John | Wellness / spas |  |  |  |  |  |  |  | planned |  |
| 25 | St. John | Stays |  |  |  |  |  |  |  | planned |  |
| 26 | St. John | Local shops / provisions |  |  |  |  |  |  |  | planned |  |
| 27 | Water Island | Adventure / charters |  |  |  |  |  |  |  | planned |  |
| 28 | Water Island | Culinary / restaurants / beach bars |  |  |  |  |  |  |  | planned |  |
| 29 | Water Island | Stays |  |  |  |  |  |  |  | planned |  |
| 30 | Water Island | Local shops / provisions |  |  |  |  |  |  |  | planned |  |

## Acceptance gate for a batch 1 listing

- [ ] Business identity is source-backed.
- [ ] Category and island are correct.
- [ ] Description is factual and not promotional hype.
- [ ] Public contact permission is recorded.
- [ ] Media rights are approved before any asset is added.
- [ ] Coordinates are source-backed if used.
- [ ] `verification_status=submitted` before review.
- [ ] `robots_noindex=true` until rendered profile QA passes.
- [ ] No paid, premium, or claimed state bypasses verification.
- [ ] `publish_ready=true` is set only after source review, contact permission review, media rights review, and rendered-page QA.
