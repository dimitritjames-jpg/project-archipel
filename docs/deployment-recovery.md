# VibeVI deployment recovery notes

## Incident

An earlier Vercel preview URL served an older pre-VibeVI build instead of the current VibeVI build. This is historical recovery guidance only; the official production domain is `https://www.myvibevi.com`.

Observed symptoms:

- homepage and metadata still said Project Archipel;
- `/get-listed` returned 404;
- `/experiences/*` routes returned 404;
- promoted public-info routes returned 404;
- demo listing route returned 404;
- sitemap/robots referenced an older deployment hostname.

## Root cause found locally

Local `main` was clean but ahead of `origin/main` by 12 commits. The current VibeVI commit had not been pushed to GitHub, so Vercel was deploying an older repository state.

Recovery action completed:

```bash
git push origin main
```

Push result:

```text
7a78a55..643d9ca  main -> main
```

Current expected deploy commit: `643d9ca` or newer.

## Required Vercel settings

- Framework Preset: Next.js
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave blank / default for Next.js
- Production Branch: `main`

For the first corrected preview, the app can render with static/fallback data. At minimum set:

- `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL`

After the correct preview URL exists, set Preview to the preview URL. For Production, set:

- `NEXT_PUBLIC_SITE_URL=https://www.myvibevi.com`

Do not require Supabase, Mapbox, or Algolia to validate the first corrected preview. They may be added for production readiness later.

## Manual Vercel redeploy steps

Use these because the local workstation does not currently have the Vercel CLI installed or a `.vercel/project.json` link.

1. Open the Vercel Dashboard.
2. Select the VibeVI / `project-archipel-zwhn` Vercel project.
3. Go to **Settings → Git**.
4. Confirm the connected GitHub repo is `dimitritjames-jpg/project-archipel`.
5. Confirm the production branch is `main`.
6. Go to **Settings → General**.
7. Confirm root directory is `./`.
8. Confirm framework preset is **Next.js**.
9. Confirm build command is `npm run build`.
10. Confirm output directory is blank/default.
11. Go to **Deployments**.
12. Trigger a redeploy from commit `643d9ca` or newer.
13. Choose **Redeploy without build cache** if available.
14. Copy the new deployment URL.
15. Run `docs/live-deployment-qa.md` against the new URL.

## Corrected deployment acceptance check

The corrected deployment must show:

- homepage says VibeVI, not Project Archipel;
- metadata says VibeVI;
- manifest says VibeVI;
- `/get-listed` returns 200;
- `/experiences/adventure`, `/experiences/culture`, `/experiences/culinary`, and `/experiences/cruise-day` return 200;
- promoted public-info listing routes return 200;
- demo listing route returns 200 and remains noindex;
- public-info listings emit no LocalBusiness schema;
- demo listings emit no LocalBusiness schema.

If the deployment still serves Project Archipel after redeploying from `main`, check Vercel project Git connection, root directory, selected branch, and deployment commit SHA.
