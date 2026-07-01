# VibeVI SCS + Concierge Flow Audit

Date: 2026-07-01
Branch: `qa/category-location-scs-flow-audit`

## Goal

Audit whether VibeVI currently behaves like a concierge path rather than a loose directory.

## Flow Review

### 1. Homepage -> island selector / search / tiles

Current read:

- Strong.
- The homepage gives three clear starts:
  - island-first browse
  - search-first browse
  - curated tile browse
- The island selector is now visually intentional and works as a true browse fork.

Concierge assessment:

- Users can understand what to do first.
- Island-first behavior is encouraged without blocking global search.

### 2. Island hub -> category -> profile

Current read:

- Stronger than global search for clarity.
- Island hubs make the site feel less overwhelming.
- Category grouping works, but some sections are only as good as the underlying taxonomy.

Concierge assessment:

- The path is usable and scannable.
- The biggest weakness is not UI. It is that some category sections inherit awkward taxonomy from the data model.

### 3. Search results -> profile / get-listed

Current read:

- Improved after Sprint 5.
- Owner-intent search now correctly surfaces `/get-listed`.
- Visitor-intent search still has some noisy results on broad terms.

Concierge assessment:

- Good for direct needs like `spa`, `beach st croix`, and `water island`.
- Less reliable for broad emotional/visitor intent like `sunset`, `nightlife`, or island-wide `things to do`.

### 4. Profile -> related path / claim path

Current read:

- Trust posture is clear.
- Public-info disclosure is visible.
- Claim/update CTA path exists and is honest.

Concierge assessment:

- Good trust posture.
- Profiles explain what the listing is.
- The next-step path is present, but taxonomy strain can make “why this belongs here” feel less clean on certain museum/fort/park entries.

### 5. Get Listed -> owner action

Current read:

- Stronger after Sprint 5.
- The path is clear without pretending a dashboard exists.

Concierge assessment:

- Owner flow now feels legitimate.
- No fake automation claims are implied.

## Friction Points

### Island-intent search does not act island-first enough

Examples:

- `st thomas`
- `st croix`

Observed pattern:

- Search tends to surface matching listing names before it surfaces a clear island browse route.

Impact:

- Search can feel like a directory lookup instead of a concierge handoff into the island.

### Broad visitor-intent search still drifts

Examples:

- `nightlife`
- `sunset`
- `market`

Observed pattern:

- Some queries are led by lexical matches rather than the best experiential answer.

Impact:

- Users can still get a technically matched result that feels emotionally off.

### Taxonomy leaks into flow

Observed pattern:

- Museums, forts, ferry services, and historic sites living under `local-provisions` make some browse paths feel less trustworthy than the UI itself deserves.

Impact:

- The user can follow the right route but still feel the content model bending underneath it.

## Overall Concierge Verdict

### What works now

- Homepage start-state
- Island-first browse
- Owner-intent conversion path
- Honest public-info trust posture
- Clearer category/profile pathing than earlier sprints

### What still breaks the concierge illusion

- Broad island-intent search
- Broad “things to do” follow-through after the first result
- Taxonomy forcing museums/history/ferry into shop-like buckets

## Recommendation

- Do not redesign this layer yet.
- Keep improving the content model and search mapping beneath it.
- The UI is now ahead of the taxonomy; the next gains come from better classification and intent handling.

