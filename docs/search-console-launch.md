# Google Search Console launch steps

Use this after the production domain is live and `NEXT_PUBLIC_SITE_URL` is set to the canonical production origin.

For the full launch runbook, see `docs/launch-operations.md`. For the first inspection queue, see `docs/top-seo-url-inspection.md`.

## Add domain property

1. Open Google Search Console.
2. Choose **Add property**.
3. Select **Domain** property when possible.
4. Enter the root domain: `myvibevi.com`.
5. Add the DNS TXT verification record with the domain DNS provider.
6. Wait for DNS propagation and click **Verify**.

If DNS verification is not available, use a URL-prefix property for the exact canonical origin: `https://www.myvibevi.com`.

## Submit sitemap

1. Open the verified property.
2. Go to **Sitemaps**.
3. Submit `https://www.myvibevi.com/sitemap.xml`.
4. Confirm the submitted sitemap returns 200 and contains production URLs.
5. Re-submit after major routing or inventory expansions.

Official Google references:

- Ownership verification: https://support.google.com/webmasters/answer/9008080
- Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Sitemaps report: https://support.google.com/webmasters/answer/7451001

## Robots and URL inspection

1. Inspect `/robots.txt`.
2. Confirm the sitemap URL points to the production host.
3. Inspect the homepage URL: `https://www.myvibevi.com/`.
4. Request indexing for the homepage only after the page is production-ready.
5. Inspect priority indexable pages:
   - `/experiences/adventure`
   - `/experiences/culinary`
   - `/st-thomas`
   - `/st-croix`
   - `/st-john`
   - `/water-island`
   - `/guides/best-beaches-usvi`
   - `/guides/usvi-charters`
6. Inspect promoted public-info listing pages only after confirming they passed the promotion gate:
   - `/st-thomas/excursions-charters/the-vi-cat`
   - `/st-croix/excursions-charters/big-beards-adventure-tours`
   - `/water-island/boutique-stays/virgin-islands-campground`

The first 20 production URLs to inspect are tracked in `docs/top-seo-url-inspection.md`. Do not request indexing for demo/noindex profiles.

Do not submit demo/noindex business profiles as priority URLs. Demo profiles should remain excluded by `noindex`.

## Monitor indexing issues

Check weekly during launch:

- indexing exclusions;
- crawl errors;
- duplicate without user-selected canonical;
- submitted URL marked noindex;
- missing/invalid structured data;
- pages blocked by robots;
- unexpected 404s.

## Structured data spot checks

- Homepage should emit WebSite/Organization JSON-LD.
- Verified business profiles may emit LocalBusiness-derived schema only when trust gates pass.
- Public-info, demo, submitted, and unverified profiles must not emit LocalBusiness schema.

## Search performance notes

Search Console is SEO monitoring, not product analytics. Do not use it as a replacement for privacy-reviewed analytics, and do not connect behavioral analytics providers until consent, retention, and ownership are approved.
