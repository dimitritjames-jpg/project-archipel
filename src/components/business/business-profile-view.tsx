import Link from "next/link";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BusinessProfileMapPreview } from "@/components/facelift/business-profile-map-preview";
import { BusinessProfileTabs } from "@/components/facelift/business-profile-tabs";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { TrustBadge } from "@/components/facelift/trust-badge";
import { VvCard, VvEyebrow, VvHeading, VvPage } from "@/components/facelift/vv-ui";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import {
  canShowDirectContact,
  getListingTrustState,
  isLocalBusinessSchemaEligible,
  LISTING_STATE_LABELS,
} from "@/lib/businesses/listing-trust";
import { getListingPlanningTags } from "@/lib/businesses/planning-tags";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset } from "@/lib/media";
import { getListingPlaceholder } from "@/lib/vibevi-media";
import { serializeJsonLd } from "@/lib/utils";

type BusinessProfileViewProps = {
  business: PublishedBusinessRow;
  islandSlug: IslandSlug;
  canonicalUrl: string;
};

function trustTone(state: ReturnType<typeof getListingTrustState>) {
  if (state === "verified" || state === "verified_claimed") return "verified" as const;
  if (state === "public_info") return "public-info" as const;
  if (state === "demo") return "preview" as const;
  return "neutral" as const;
}

export function BusinessProfileView({
  business,
  islandSlug,
  canonicalUrl,
}: BusinessProfileViewProps) {
  const islandName = getIslandName(islandSlug);
  const categorySlug = business.category?.slug ?? "directory";
  const trustState = getListingTrustState(business);
  const isDemo = trustState === "demo";
  const isPublicInfo = trustState === "public_info";
  const schemaEligible = isLocalBusinessSchemaEligible(business);
  const showDirectContact = canShowDirectContact(business);
  const canShowOfficialSite = Boolean(
    business.website_url && (schemaEligible || isPublicInfo),
  );
  const directionsHref = business.street_address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${business.street_address} ${islandName} USVI`,
      )}`
    : null;
  const categoryMedia = getCategoryMediaAsset(
    categorySlug,
    business.category?.name ?? "Island profile",
  );
  const placeholderSrc = getListingPlaceholder(categorySlug);
  const planningTags = getListingPlanningTags(business);

  const heroMedia = {
    desktop: categoryMedia.src ?? placeholderSrc,
    mobile: categoryMedia.src ?? placeholderSrc,
    alt: `Editorial category artwork for ${business.category?.name ?? "directory"}; not a photo of ${business.name}`,
    objectPosition: "center",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": business.category?.schema_type ?? "LocalBusiness",
    "@id": `${canonicalUrl}#business`,
    name: business.name,
    url: canonicalUrl,
    description: business.description_plain,
    telephone: showDirectContact ? (business.phone ?? undefined) : undefined,
    email: showDirectContact ? (business.email ?? undefined) : undefined,
    priceRange: business.price_range ?? undefined,
    sameAs: business.same_as.length > 0 ? business.same_as : undefined,
    address: business.street_address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.street_address,
          addressLocality: business.address_locality ?? islandName,
          addressRegion: "VI",
          addressCountry: "US",
        }
      : undefined,
  };

  const trustNote = isDemo
    ? "Demonstration only. This does not represent a real business or active offer."
    : isPublicInfo
      ? "Details are sourced from public business pages. Confirm directly with the business before making plans."
      : schemaEligible
        ? "Source verified. Confirm hours, availability, and booking details directly with the business."
        : "This listing is still in source review. Direct contact actions remain hidden until verification and permission checks pass.";

  const detailsNote = isDemo
    ? "Fictional demo inventory. No contact, availability, pricing, or service claim is active."
    : isPublicInfo
      ? `Public info — unclaimed listing${business.last_verified_at ? ` — last checked ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "America/St_Thomas" }).format(new Date(business.last_verified_at))}` : ""}. Details are sourced from public business pages. Confirm directly with the business before making plans.`
      : schemaEligible
        ? `Source-verified listing${business.last_verified_at ? ` — last checked ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "America/St_Thomas" }).format(new Date(business.last_verified_at))}` : ""}. Confirm time-sensitive details directly.`
        : "Submitted or unverified listing. Public contact actions and LocalBusiness schema remain disabled pending source review.";

  return (
    <>
      <AnalyticsEvent
        name="business_profile_viewed"
        properties={{
          island: islandSlug,
          category: categorySlug,
          listing_state: trustState,
        }}
      />
      {schemaEligible ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ) : null}

      <VvPage>
        <ResponsiveHero media={heroMedia} overlay="warm" minHeight="min-h-[min(52vh,480px)]">
          <div className="section-shell flex min-h-[inherit] flex-col justify-end pb-8 pt-20 sm:pb-10">
            <nav className="text-xs text-white/65" aria-label="Breadcrumb">
              <Link href={`/${islandSlug}`} className="transition hover:text-white">
                {islandName}
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/${islandSlug}/${categorySlug}`}
                className="transition hover:text-white"
              >
                {business.category?.name ?? "Directory"}
              </Link>
            </nav>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.38fr] lg:items-end">
              <header>
                <div className="flex flex-wrap items-center gap-2">
                  <TrustBadge label={LISTING_STATE_LABELS[trustState]} tone={trustTone(trustState)} />
                  {isPublicInfo ? <TrustBadge label="Unclaimed listing" tone="public-info" /> : null}
                  {trustState === "verified" || trustState === "verified_claimed" ? (
                    <TrustBadge label="Verified local listing" tone="verified" />
                  ) : null}
                  {business.premium_tier !== "none" &&
                  (trustState === "verified" || trustState === "verified_claimed") ? (
                    <TrustBadge label="Featured placement" tone="neutral" />
                  ) : null}
                </div>
                <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  {business.name}
                </h1>
                <p className="mt-3 text-sm font-medium text-[#7ee8df]">
                  {business.category?.name ?? "Business"} · {islandName}
                  {schemaEligible && business.price_range ? ` · ${business.price_range}` : ""}
                </p>
                <p className="mt-2 text-xs text-white/70">{trustNote}</p>
              </header>

              <VvCard className="border-white/15 bg-white/95 p-5 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
                  Direct actions
                </p>
                <div className="mt-3 grid gap-2">
                  {showDirectContact && business.phone ? (
                    <a
                      href={`tel:${business.phone}`}
                      className="rounded-xl bg-[#0b4b55] px-4 py-3 text-center text-sm font-bold text-white"
                    >
                      Contact business
                    </a>
                  ) : null}
                  {showDirectContact && business.email ? (
                    <a
                      href={`mailto:${business.email}`}
                      className="rounded-xl border border-[#0b4b55]/12 bg-[#fffaf3] px-4 py-3 text-center text-sm font-semibold text-[#0b4b55]"
                    >
                      Email business
                    </a>
                  ) : null}
                  {canShowOfficialSite ? (
                    <a
                      href={business.website_url ?? undefined}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="rounded-xl border border-[#0b4b55]/12 bg-[#fffaf3] px-4 py-3 text-center text-sm font-semibold text-[#0b4b55]"
                    >
                      Visit official site
                    </a>
                  ) : null}
                  {isPublicInfo && directionsHref ? (
                    <a
                      href={directionsHref}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="rounded-xl border border-[#0b4b55]/12 bg-[#fffaf3] px-4 py-3 text-center text-sm font-semibold text-[#0b4b55]"
                    >
                      Get directions
                    </a>
                  ) : null}
                </div>
              </VvCard>
            </div>
          </div>
        </ResponsiveHero>

        <article className="section-shell py-12 sm:py-16">
          <BusinessProfileTabs
            overview={
              <div className="space-y-5 text-base leading-relaxed text-[#496871] sm:text-lg">
                {business.description_plain.split(/\n+/).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            }
            services={
              planningTags.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {planningTags.map((tag) => (
                    <VvCard key={tag.label} className="border-[#0797a6]/15 bg-[#e9fbf7] p-4">
                      <p className="text-sm font-semibold text-[#0b4b55]">{tag.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[#496871]">{tag.description}</p>
                    </VvCard>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#496871]">
                  Service and menu details will appear when provided by the business or verified sources.
                </p>
              )
            }
            photos={
              <VvCard className="p-6">
                <VvEyebrow>Category placeholder only</VvEyebrow>
                <p className="mt-3 text-sm leading-7 text-[#496871]">
                  VibeVI does not display generated editorial art as this business&apos;s real storefront, team, dish, interior, or property. Licensed business-owned gallery media will appear here when available.
                </p>
              </VvCard>
            }
            reviews={
              <VvCard className="p-6">
                <p className="text-sm leading-7 text-[#496871]">
                  VibeVI does not publish invented reviews or aggregated ratings. Third-party review sources are not displayed unless explicitly supported with a real data connection.
                </p>
              </VvCard>
            }
            details={
              <dl className="grid gap-4 sm:grid-cols-2">
                {(schemaEligible || isPublicInfo) && business.street_address ? (
                  <VvCard className="p-5">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#496871]">
                      Address / area
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[#173941]">
                      {business.street_address}
                      {business.address_locality ? `, ${business.address_locality}` : ""}
                    </dd>
                  </VvCard>
                ) : null}
                {showDirectContact && business.phone ? (
                  <VvCard className="p-5">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#496871]">Phone</dt>
                    <dd className="mt-2">
                      <a href={`tel:${business.phone}`} className="text-[#0797a6] hover:underline">
                        {business.phone}
                      </a>
                    </dd>
                  </VvCard>
                ) : null}
                {showDirectContact && business.email ? (
                  <VvCard className="p-5">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#496871]">Email</dt>
                    <dd className="mt-2">
                      <a href={`mailto:${business.email}`} className="text-[#0797a6] hover:underline">
                        {business.email}
                      </a>
                    </dd>
                  </VvCard>
                ) : null}
                <VvCard className="p-5 sm:col-span-2">
                  <p className="text-xs leading-relaxed text-[#496871]">{detailsNote}</p>
                  {isPublicInfo && business.source_urls?.length ? (
                    <div className="mt-4 border-t border-[#0b4b55]/8 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#496871]">Sources</p>
                      <div className="mt-2 space-y-2">
                        {business.source_urls.map((sourceUrl) => (
                          <a
                            key={sourceUrl}
                            href={sourceUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="block break-all text-xs text-[#0797a6] hover:underline"
                          >
                            {sourceUrl}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </VvCard>
              </dl>
            }
          />

          <div className="mt-14">
            <VvEyebrow>Map preview</VvEyebrow>
            <VvHeading className="mt-2 text-xl sm:text-2xl">See the island context.</VvHeading>
            <div className="mt-4">
              <BusinessProfileMapPreview directionsHref={directionsHref} />
            </div>
          </div>

          <aside className="mt-14 overflow-hidden rounded-[1.4rem] border border-[#ff7968]/20 bg-gradient-to-br from-[#fff4f0] to-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <VvEyebrow className="!text-[#ff7968]">Is this your business?</VvEyebrow>
                  <ComingSoonBadge label="Owner tools coming soon" />
                </div>
                <VvHeading className="mt-3 text-2xl">Suggest an update or claim your profile.</VvHeading>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#496871]">
                  Owner tools are not active yet. Use the launch workflow to correct public-info details, share licensed media, or register interest in a future claim flow.
                </p>
              </div>
              <TrackedLink
                href="/get-listed"
                eventName="get_listed_cta_clicked"
                eventProperties={{
                  placement: "business_profile",
                  listing_state: trustState,
                }}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#ff7968] px-5 text-sm font-bold text-[#173941]"
              >
                Suggest an update
              </TrackedLink>
            </div>
          </aside>
        </article>
      </VvPage>
    </>
  );
}
