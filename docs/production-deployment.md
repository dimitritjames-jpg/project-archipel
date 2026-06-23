# VibeVI production deployment dry run

This document prepares VibeVI for a public preview deployment on Vercel. It is a deployment/readiness checklist only; it does not enable AI concierge, booking, payments, owner dashboard, or paid sponsor checkout.

## Repository audit summary

- Framework: Next.js App Router under `src/app`.
- Build script: `npm run build` -> `next build`.
- Start script: `npm run start` -> `next start`.
- Validation scripts: `npm run typecheck`, `npm run lint`.
- Vercel config: `vercel.json` exists and sets security headers/CSP.
- Next config: `next.config.ts` exists with Supabase image patterns and `react-map-gl` transpilation.
- Metadata source: `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`.
- Environment schema: `src/lib/env.ts`.
- Map fallback: `/map` remains usable without a Mapbox token.
- Algolia sync: disabled by route response until Algolia is provisioned.

## Production environment variables

Set these in Vercel Production before public preview:

| Variable | Required? | Scope | Notes |
|---|---:|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Public | Canonical production origin, e.g. `https://vibevi.com`. Drives metadata, sitemap, robots, redirects, canonicals. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for real inventory | Public | Supabase Cloud project URL. Use production project, not local Docker. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes for real inventory | Public | Supabase anon key with RLS-safe public read behavior. |
| `SUPABASE_SERVICE_ROLE_KEY` | Required for build-time/admin server reads and protected server operations | Secret | Server-only. Never expose as `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Recommended | Public | Enables interactive map. If missing/invalid, app shows premium map fallback. |
| `NEXT_PUBLIC_MAPBOX_STYLE_URL` | Optional | Public | Custom Mapbox style URL. Defaults to `mapbox://styles/mapbox/dark-v11`. |
| `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` | Recommended for launch | Public | Enables mailto CTAs on `/get-listed` and request-availability surfaces. Must be a monitored inbox. |
| `SEARCH_SYNC_WEBHOOK_SECRET` | Optional until search sync enabled | Secret | Keep configured if search webhook route is later activated. |
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | Deferred | Public | Do not enable until Algolia production search is intentionally launched. |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | Deferred | Public | Search-only key, not admin. |
| `ALGOLIA_APP_ID` | Deferred | Secret/server | Needed only when production indexing is enabled. |
| `ALGOLIA_ADMIN_KEY` | Deferred | Secret/server | Never public. |

Preview environments should use preview/staging Supabase and domain values. Production must not point to localhost, local Supabase, or placeholder keys.

## Connect repo to Vercel

1. Create or select the Vercel project.
2. Import the Git repository.
3. Confirm framework preset: Next.js.
4. Root directory: repository root.
5. Install command: Vercel default `npm install`.
6. Build command: `npm run build`.
7. Output directory: leave default for Next.js. Do not set a static export directory.
8. Output behavior: Vercel should detect Next.js and deploy the `.next` server output, App Router routes, metadata routes, and route handlers.
9. Node version: use the project/Vercel default compatible with Next 15 and React 19.
10. Confirm `vercel.json` headers are applied in preview.

## Exact Vercel settings for launch

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | Repository root |
| Install command | Default / `npm install` |
| Build command | `npm run build` |
| Output directory | Default for Next.js |
| Development command | `npm run dev` if needed |
| Production branch | `main` unless the repo owner chooses another branch |
| Node.js version | Vercel default compatible with Next.js 15 |

Preview deployments should be validated first. Promote the validated preview to production when possible instead of rebuilding a separate artifact.

## Vercel Dashboard deployment path

Use this path when the Vercel CLI is not installed, not linked, or not authenticated on the local workstation.

1. Open the Vercel Dashboard.
2. Choose **Add New Project** or open the existing VibeVI project.
3. Import/connect the Git repository for `project-archipel`.
4. Confirm the project root is the repository root.
5. Confirm framework preset is **Next.js**.
6. Confirm install command is default / `npm install`.
7. Confirm build command is `npm run build`.
8. Leave output directory blank/default for Next.js.
9. Add Preview environment variables first.
10. Trigger a Preview deployment.
11. Copy the Preview URL into `docs/live-deployment-qa.md`.
12. Run the full live QA checklist.
13. If preview QA passes, add Production environment variables.
14. Add the final production domain.
15. Set `NEXT_PUBLIC_SITE_URL` to the final production origin.
16. Redeploy or promote the validated preview.
17. Rerun live QA on the final production URL before any public announcement.

Do not enter secrets into source files, screenshots, issues, chat messages, or documentation. Keep secret values only in Vercel environment variables or approved secret stores.

If a Vercel URL serves the old Project Archipel build, first confirm the current VibeVI commit is pushed to GitHub. Then redeploy from the latest `main` commit without build cache. See `docs/deployment-recovery.md`.

## Set environment variables

1. Add Production variables from the table above.
2. Add Preview variables separately; do not reuse production service role keys in previews unless explicitly accepted.
3. Confirm `NEXT_PUBLIC_SITE_URL` differs correctly by environment:
   - Production: canonical domain.
   - Preview: preview deployment origin or accepted staging URL.
4. Redeploy after changing public environment variables.

Required/recommended launch env checklist:

- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- [ ] `NEXT_PUBLIC_MAPBOX_STYLE_URL` if using a custom style
- [ ] `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL`

Optional/deferred:

- [ ] `SEARCH_SYNC_WEBHOOK_SECRET` only if search sync route is activated
- [ ] `NEXT_PUBLIC_ALGOLIA_APP_ID` deferred until Algolia search launches
- [ ] `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` deferred until Algolia search launches
- [ ] `ALGOLIA_APP_ID` deferred until indexing launches
- [ ] `ALGOLIA_ADMIN_KEY` deferred until indexing launches

## Supabase production confirmation

- Confirm production project URL and anon key.
- Confirm RLS policies are active.
- Confirm demo, submitted, unverified, verified, claimed, premium, and noindex trust fields exist.
- Confirm service role key is server-only in Vercel.
- Confirm production imports contain no sample rows or guessed businesses.
- Confirm LocalBusiness schema only appears for eligible verified listings.

## Mapbox confirmation

- Confirm `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is valid for the production domain.
- Confirm `/map` loads the interactive map.
- Temporarily remove/override token in preview to confirm fallback messaging still works.
- Confirm attribution is visible when Mapbox is active.

## Contact / Get Listed confirmation

- Confirm `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL` is a monitored inbox.
- Open `/get-listed` and click each inquiry CTA.
- Confirm the mailto body contains no secrets or user-specific data.
- Send a test inquiry from an external account and verify receipt.

## Production build and logs

1. Trigger a Vercel production deployment.
2. Confirm install completes.
3. Confirm `npm run build` reaches final route summary.
4. Inspect logs for:
   - missing env vars;
   - Supabase auth errors;
   - Mapbox build-time issues;
   - `next/font` fetch problems;
   - TypeScript or ESLint failures.
5. If local build fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` while fetching `next/font`, rerun locally with `NODE_OPTIONS=--use-system-ca`. Treat that as a local machine CA workaround, not a required Vercel production setting unless Vercel logs show the same failure.

## Live smoke test

Use `docs/production-smoke-test.md` after every preview and production deployment.

Minimum live routes:

- `/`
- `/search`
- `/map`
- `/get-listed`
- `/experiences/adventure`
- `/experiences/culture`
- `/experiences/culinary`
- `/experiences/cruise-day`
- `/st-thomas`
- `/st-croix`
- `/st-john`
- `/water-island`
- `/sitemap.xml`
- `/manifest.webmanifest`

Also test promoted public-info routes:

- `/st-thomas/excursions-charters/the-vi-cat`
- `/st-croix/excursions-charters/big-beards-adventure-tours`
- `/water-island/boutique-stays/virgin-islands-campground`

And one demo/noindex route:

- `/st-thomas/indulgent-dining/demo-stt-waterfront-table`

## Rollback procedure

1. Identify last known-good deployment in Vercel.
2. Promote/rollback to that deployment from the Vercel dashboard, or run `vercel rollback` / `vercel rollback <deployment-url-or-id>` if the Vercel CLI is installed and linked.
3. Confirm `NEXT_PUBLIC_SITE_URL` and env vars were not changed incorrectly.
4. Run the smoke test again.
5. Record the rollback reason, deployment URL, commit hash, and owner in `docs/launch-readiness.md`.

If using Vercel CLI in CI, prefer `vercel build` followed by `vercel deploy --prebuilt` so validation can run between build and deploy. Promotion from a validated preview can use `vercel promote <deployment-url>`.
