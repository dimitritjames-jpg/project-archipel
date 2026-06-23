# VibeVI post-deployment launch checklist

Use this after code validation passes and before announcing VibeVI publicly.

## Deployment steps

1. Set Vercel Production env vars:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
   - `NEXT_PUBLIC_MAPBOX_STYLE_URL` if using a custom Mapbox style
   - `NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL`
2. Keep deferred vars disabled unless the feature is intentionally launched:
   - `NEXT_PUBLIC_ALGOLIA_APP_ID`
   - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY`
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_ADMIN_KEY`
   - `SEARCH_SYNC_WEBHOOK_SECRET`
3. Deploy a Vercel Preview from the current commit.
4. Run `docs/live-deployment-qa.md` against the Preview URL.
5. Fix only launch blockers: broken route, metadata, sitemap, robots, manifest, trust leak, bad docs, or obvious mobile blocker.
6. Add the final production domain in Vercel.
7. Set `NEXT_PUBLIC_SITE_URL` to the final production origin.
8. Redeploy or promote the validated Preview.
9. Rerun live QA on the final production URL.

## Search and metadata

1. Confirm `/sitemap.xml` returns 200.
2. Confirm `/robots.txt` returns 200 and references the sitemap.
3. Confirm `/manifest.webmanifest` returns valid JSON.
4. Confirm canonical URLs use the final domain.
5. Confirm promoted public-info listing URLs are in the sitemap.
6. Confirm demo/noindex URLs are not in the sitemap.

## Google Search Console

1. Create a Domain property when the final domain is ready.
2. Verify ownership with DNS TXT.
3. Submit the sitemap only after final-domain QA passes.
4. Inspect:
   - homepage;
   - key experience pages;
   - island hubs;
   - promoted public-info listing samples.
5. Do not prioritize demo/noindex URLs.
6. Monitor indexing issues weekly during launch.

## Business outreach

1. Start outreach to the 15 promoted public-info businesses.
2. Use `docs/outreach-workflow.md` public-info confirmation copy.
3. Ask for corrections, preferred contact details, hours, category, description, and photo permission.
4. Request approved/licensed photos only.
5. Track corrections and claim interest manually.
6. Keep the remaining 15 candidates in human review.

## Trust gates to preserve

- Public-info listings are not partners.
- Public-info listings are not claimed.
- Public-info listings are not premium.
- Public-info listings are not bookable through VibeVI.
- Public-info listings emit no LocalBusiness schema.
- Demo listings remain noindex.
- Demo listings emit no LocalBusiness schema.
- Demo listings show no contact CTAs.
- No unsupported live, real-time, book-now, reserve-instantly, guaranteed, partner, or premium claims.

## Go/no-go

Code go is allowed only after local validation passes.

Soft-launch go is allowed only after live deployment QA passes on the actual deployed URL.
