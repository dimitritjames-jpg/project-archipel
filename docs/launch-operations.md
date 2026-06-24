# VibeVI public launch operations runbook

This is the launch-day operating checklist for VibeVI after the real public-info inventory expansion. It does not authorize redesign work, new features, fake listings, booking, payments, AI concierge, owner dashboard, or trust-gate changes.

Current public baseline:

- Live URL: `https://project-archipel-zwhn.vercel.app/`
- Current baseline commit: `f58e482`
- Public-info inventory: 52 promoted listings
- Demo listings: still noindex and schema-safe

## 1. Final domain setup checklist

Pick one canonical production domain before public promotion. Use either apex or `www`, then redirect the other to the canonical version.

- [ ] Choose canonical origin, for example `https://vibevi.com` or `https://www.vibevi.com`.
- [ ] Buy/confirm the domain in the registrar account.
- [ ] Add the canonical domain to the Vercel project `project-archipel-zwhn`.
- [ ] Add the alternate domain, if used, and configure it to redirect to the canonical origin.
- [ ] Confirm Vercel domain status is valid/ready.
- [ ] Confirm HTTPS certificate is active.
- [ ] Confirm the canonical domain loads `/`.
- [ ] Confirm the alternate domain redirects to the canonical domain.
- [ ] Confirm `/sitemap.xml` returns 200 on the canonical domain.
- [ ] Confirm `/robots.txt` returns 200 and points to the canonical sitemap.
- [ ] Confirm `/manifest.webmanifest` returns 200.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` in Vercel Production exactly matches the canonical origin.
- [ ] Redeploy production after changing `NEXT_PUBLIC_SITE_URL`.
- [ ] Run `docs/production-smoke-test.md` against the canonical domain.
- [ ] Run trust checks on at least 3 public-info listings and 1 demo listing.
- [ ] Do not announce the public domain until canonical URLs, sitemap, and robots match the final domain.

## 2. Exact `NEXT_PUBLIC_SITE_URL` update steps

`NEXT_PUBLIC_SITE_URL` drives canonical metadata, JSON-LD site URLs, sitemap URLs, robots references, Open Graph URLs, and Search Console readiness. Public environment variables are baked into the client/build output, so production must be redeployed after any change.

Recommended value format:

```txt
NEXT_PUBLIC_SITE_URL=https://vibevi.com
```

Rules:

- Use `https://`.
- Do not include a trailing slash.
- Do not use a Vercel preview URL for production.
- Do not use localhost.
- Keep Preview and Production values separate.
- Keep secrets out of `NEXT_PUBLIC_*` variables.

Vercel Dashboard path:

1. Open Vercel Dashboard.
2. Open the VibeVI / `project-archipel-zwhn` project.
3. Go to Settings -> Environment Variables.
4. Find or add `NEXT_PUBLIC_SITE_URL`.
5. Scope the final canonical value to Production.
6. Set Preview to the preview/staging URL only if preview canonicals are acceptable for QA.
7. Save the change.
8. Trigger a new Production deployment from the latest `main` commit.
9. After deploy, open:
   - `https://[final-domain]/`
   - `https://[final-domain]/sitemap.xml`
   - `https://[final-domain]/robots.txt`
10. Confirm the rendered sitemap and robots file use the final canonical domain, not the old Vercel URL.

CLI path, if the Vercel CLI is installed and linked to the correct project:

```powershell
vercel env ls production
echo "https://vibevi.com" | vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod --force
```

If the variable already exists, remove and re-add it or update it in the dashboard. Do not commit the production value into a secret file.

Local QA path:

```powershell
$env:NEXT_PUBLIC_SITE_URL="https://vibevi.com"
npm run build
```

If local Windows builds hit the known `next/font` certificate-chain issue, rerun local validation with:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm run build
```

That is a local CA workaround only. Do not add it as a production requirement unless Vercel build logs show the same failure.

## 3. Search Console setup checklist

Use `docs/search-console-launch.md` plus `docs/top-seo-url-inspection.md`.

- [ ] Final domain is live.
- [ ] `NEXT_PUBLIC_SITE_URL` matches the final canonical domain.
- [ ] `/sitemap.xml` returns 200 and contains the final domain.
- [ ] `/robots.txt` returns 200 and references the final sitemap.
- [ ] Add a Google Search Console Domain property where possible.
- [ ] Verify ownership with DNS TXT.
- [ ] If DNS verification is not available, add a URL-prefix property for the exact canonical origin.
- [ ] Submit `https://[final-domain]/sitemap.xml` in the Sitemaps report.
- [ ] Inspect the top 20 URLs in `docs/top-seo-url-inspection.md`.
- [ ] Request indexing only for production-ready, indexable URLs.
- [ ] Do not prioritize demo/noindex URLs.
- [ ] Monitor indexing exclusions weekly for the first month.

Official Google references:

- Ownership verification: https://support.google.com/webmasters/answer/9008080
- Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Sitemaps report: https://support.google.com/webmasters/answer/7451001

## 4. Post-launch tracking rhythm

Daily for first 7 days:

- [ ] Check Vercel production deployment status.
- [ ] Check `/`, `/search`, `/map`, `/get-listed`, and all island hubs.
- [ ] Check one public-info listing per island.
- [ ] Check one demo listing remains noindex.
- [ ] Review inbound business replies.
- [ ] Record corrections in `docs/outreach-tracking-template.md`.
- [ ] Do not publish owner-provided photos until media rights are explicit.

Weekly for first 4 weeks:

- [ ] Review Search Console sitemap status.
- [ ] Review Search Console indexing exclusions.
- [ ] Inspect 5-10 priority URLs.
- [ ] Update outreach status and next follow-up dates.
- [ ] Promote only listings that pass source, permission, and trust checks.
- [ ] Keep a short issue log in `docs/live-deployment-qa.md` if anything breaks.

## 5. Trust rules that stay locked

- Public-info listings remain unclaimed unless the business confirms ownership/authority.
- Public-info listings must show the public-info disclosure.
- Public-info listings must not emit LocalBusiness schema unless the stricter verified gate is intentionally implemented and passed.
- Demo listings remain noindex.
- Demo listings emit no LocalBusiness schema.
- Demo listings show no restricted contact CTA.
- No booking, partner, premium, sponsor, live-availability, real-time availability, or traffic promises.
- No business photos unless rights are granted.
- Corrections from businesses should be recorded before publishing changes.

