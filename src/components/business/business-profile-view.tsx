import Link from "next/link";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import type { ProfileRelatedLinks } from "@/lib/businesses/profile-related";
import {
  canShowDirectContact,
  getListingTrustState,
  isLocalBusinessSchemaEligible,
  LISTING_STATE_LABELS,
} from "@/lib/businesses/listing-trust";
import { getListingPlanningTags } from "@/lib/businesses/planning-tags";
import { buildGetListedHref } from "@/lib/get-listed";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

type BusinessProfileViewProps = {
  business: PublishedBusinessRow;
  islandSlug: IslandSlug;
  canonicalUrl: string;
  relatedLinks: ProfileRelatedLinks;
};

function formatSourceLabel(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return sourceUrl;
  }
}

export function BusinessProfileView({
  business,
  islandSlug,
  canonicalUrl,
  relatedLinks,
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
  const media = getCategoryMediaAsset(
    categorySlug,
    business.category?.name ?? "Island profile",
  );
  const editorialProfileMedia = {
    ...media,
    src: null,
    alt: `Editorial category backdrop for ${business.category?.name ?? "this category"} on ${islandName}; not a photo of ${business.name}`,
  };
  const planningTags = getListingPlanningTags(business);
  const searchHref = "/search";
  const islandHubHref = `/islands/${islandSlug}`;
  const islandGuideHref = `/${islandSlug}/things-to-do`;
  const ownerActionContext = {
    businessName: business.name,
    islandSlug,
    categorySlug,
  };
  const publicInfoDisclosure =
    business.public_info_disclosure?.trim() ||
    "This profile is based on published public business sources and remains clearly unclaimed until a business representative confirms details with VibeVI.";
  const sourceLabels = Array.from(
    new Set((business.source_urls ?? []).map(formatSourceLabel)),
  );

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

      <MediaBackdrop
        media={{
          ...editorialProfileMedia,
          id: business.slug,
          label: business.name,
          alt: editorialProfileMedia.alt,
        }}
        overlay="hero"
        className="min-h-[min(68vh,620px)]"
      >
        <div className="section-shell flex min-h-[min(68vh,620px)] flex-col justify-end pb-12 pt-24 sm:pb-14">
          <nav className="text-xs text-archipel-white/42" aria-label="Breadcrumb">
            <Link href={`/${islandSlug}`} className="transition hover:text-aqua">
              {islandName}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/${islandSlug}/${categorySlug}`}
              className="transition hover:text-aqua"
            >
              {business.category?.name ?? "Directory"}
            </Link>
          </nav>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <ComingSoonBadge label={LISTING_STATE_LABELS[trustState]} />
                {isPublicInfo ? (
                  <span className="rounded-full border border-aqua/25 bg-aqua/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-aqua">
                    Unclaimed listing
                  </span>
                ) : null}
                <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-archipel-white/66">
                  Editorial backdrop
                </span>
                {trustState === "verified" || trustState === "verified_claimed" ? (
                  <span className="rounded-full border border-botanical/25 bg-botanical/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-botanical">
                    Verified local listing
                  </span>
                ) : null}
                {business.premium_tier !== "none" &&
                (trustState === "verified" || trustState === "verified_claimed") ? (
                  <span className="rounded-full border border-sand/20 bg-sand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sand">
                    Featured placement
                  </span>
                ) : null}
              </div>
              <h1 className="text-balance mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-archipel-white sm:text-6xl lg:text-7xl">
                {business.name}
              </h1>
              <p className="mt-4 text-sm font-medium text-aqua/78">
                {business.category?.name ?? "Business"} - {islandName}
                {schemaEligible && business.price_range
                  ? ` - ${business.price_range}`
                  : ""}
              </p>
            </header>

            <aside className="command-surface rounded-[1.35rem] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/65">
                Profile actions
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <TrackedLink
                  href={islandHubHref}
                  eventName="island_selected"
                  eventProperties={{
                    island: islandSlug,
                    source: "business_profile_top_return",
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Back to {islandName}
                </TrackedLink>
                <TrackedLink
                  href={`/${islandSlug}/${categorySlug}`}
                  eventName="category_clicked"
                  eventProperties={{
                    island: islandSlug,
                    category: categorySlug,
                    source: "business_profile_top_return",
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Open {business.category?.name ?? "category"}
                </TrackedLink>
                <TrackedLink
                  href={`/search?island=${islandSlug}&q=${encodeURIComponent(
                    business.category?.name ?? business.name,
                  )}`}
                  eventName="search_submitted"
                  eventProperties={{
                    placement: "business_profile_top_return",
                    listing_state: trustState,
                    island: islandSlug,
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Search this island
                </TrackedLink>
              </div>
              <div className="mt-4 grid gap-2">
                {showDirectContact && business.phone ? (
                  <a
                    href={`tel:${business.phone}`}
                    className="rounded-xl bg-aqua px-4 py-3 text-center text-sm font-bold text-midnight-950"
                  >
                    Contact business
                  </a>
                ) : null}
                {showDirectContact && business.email ? (
                  <a
                    href={`mailto:${business.email}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    Email business
                  </a>
                ) : null}
                {canShowOfficialSite ? (
                  <a
                    href={business.website_url ?? undefined}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    Visit official site
                  </a>
                ) : null}
                {isPublicInfo && directionsHref ? (
                  <a
                    href={directionsHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    Get directions
                  </a>
                ) : null}
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-archipel-white/35">
                {isDemo
                  ? "Demonstration only. This does not represent a real business or active offer."
                  : isPublicInfo
                    ? publicInfoDisclosure
                    : schemaEligible
                      ? "Source verified. Confirm hours, availability, and booking details directly with the business."
                      : "This listing is still in source review. Direct contact actions remain hidden until verification and permission checks pass."}
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-archipel-white/30">
                Hero artwork is category-led editorial design, not a photo of {business.name}.
              </p>
              {isPublicInfo && sourceLabels.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {sourceLabels.slice(0, 3).map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-aqua/18 bg-aqua/7 px-2.5 py-1 text-[10px] font-semibold text-aqua/82"
                    >
                      Source: {label}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </MediaBackdrop>

      <article className="section-shell py-14 sm:py-18 lg:py-22">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
          <div>
            <div className="command-surface rounded-[1.35rem] p-6">
              <p className="eyebrow-label !text-aqua">Source and trust</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                {isDemo
                  ? "This page is a launch demonstration."
                  : isPublicInfo
                    ? "This is an unclaimed public-info profile."
                    : schemaEligible
                      ? "This profile cleared VibeVI source review."
                      : "This profile is still under source review."}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-archipel-white/58">
                {isDemo
                  ? "Use it to understand page structure only. It does not represent a real business, live offer, or active contact path."
                  : isPublicInfo
                    ? `${publicInfoDisclosure} VibeVI does not claim live hours, prices, availability, or booking support on this page.`
                    : schemaEligible
                      ? "Key identity fields were sourced and reviewed, but time-sensitive details such as hours, pricing, booking, and availability still belong to the business."
                      : "VibeVI keeps contact actions, rich schema, and stronger trust labels restrained until the source and permission review is complete."}
              </p>
              {isPublicInfo && business.source_urls?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {business.source_urls.slice(0, 4).map((sourceUrl) => (
                    <a
                      key={sourceUrl}
                      href={sourceUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-aqua transition hover:border-aqua/25 hover:text-white"
                    >
                      {formatSourceLabel(sourceUrl)}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="eyebrow-label">
              {isDemo ? "What this preview demonstrates" : "Why it is on the board"}
            </p>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-archipel-white/68 sm:text-lg">
              {business.description_plain.split(/\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="command-surface h-fit rounded-[1.4rem] p-6 text-sm">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-archipel-white/35">
              Listing details
            </p>
            {(schemaEligible || isPublicInfo) && business.street_address ? (
              <div className="mt-5 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">
                  Address / area
                </dt>
                <dd className="mt-2 leading-relaxed text-archipel-white/70">
                  {business.street_address}
                  {business.address_locality ? `, ${business.address_locality}` : ""}
                </dd>
              </div>
            ) : null}
            {showDirectContact && business.phone ? (
              <div className="mt-4 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={`tel:${business.phone}`} className="text-aqua hover:underline">
                    {business.phone}
                  </a>
                </dd>
              </div>
            ) : null}
            {showDirectContact && business.email ? (
              <div className="mt-4 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">
                  Email
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${business.email}`} className="text-aqua hover:underline">
                    {business.email}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-archipel-white/38">
              {isDemo
                ? "Fictional demo inventory. No contact, availability, pricing, or service claim is active."
                : isPublicInfo
                  ? `Public info - unclaimed listing${business.last_verified_at ? ` - last checked ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "America/St_Thomas" }).format(new Date(business.last_verified_at))}` : ""}. ${publicInfoDisclosure}`
                  : schemaEligible
                    ? `Source-verified listing${business.last_verified_at ? ` - last checked ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "America/St_Thomas" }).format(new Date(business.last_verified_at))}` : ""}. Confirm time-sensitive details directly.`
                    : "Submitted or unverified listing. Public contact actions and LocalBusiness schema remain disabled pending source review."}
            </div>
            {isPublicInfo && business.source_urls?.length ? (
              <div className="mt-5 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">
                  Sources
                </dt>
                <dd className="mt-2 space-y-2">
                  {business.source_urls.map((sourceUrl) => (
                    <a
                      key={sourceUrl}
                      href={sourceUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="block break-all text-xs text-aqua hover:underline"
                    >
                      {sourceUrl}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
            {planningTags.length > 0 ? (
              <div className="mt-5 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">
                  Planning fit
                </dt>
                <dd className="mt-3 space-y-2">
                  {planningTags.map((tag) => (
                    <div
                      key={tag.label}
                      className="rounded-xl border border-aqua/12 bg-aqua/5 p-3"
                    >
                      <p className="text-xs font-semibold text-aqua/85">
                        {tag.label}
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-archipel-white/42">
                        {tag.description}
                      </p>
                    </div>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <aside className="command-surface topographic-field mt-14 overflow-hidden rounded-[1.6rem] border-coral/15 p-6 sm:p-8">
          <div className="mb-8 border-b border-white/8 pb-8">
            <p className="eyebrow-label !text-aqua">Keep exploring</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
              Keep this stop connected to the rest of the day.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <TrackedLink
                href={searchHref}
                eventName="search_submitted"
                eventProperties={{
                  placement: "business_profile_discovery",
                  listing_state: trustState,
                }}
                className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-aqua/25 hover:text-aqua"
              >
                <p className="text-sm font-semibold text-white">Search VibeVI</p>
                <p className="mt-2 text-xs leading-6 text-white/48">
                  Open the full island search board.
                </p>
              </TrackedLink>
              <TrackedLink
                href={islandHubHref}
                eventName="island_selected"
                eventProperties={{
                  island: islandSlug,
                  source: "business_profile_discovery",
                }}
                className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-aqua/25 hover:text-aqua"
              >
                <p className="text-sm font-semibold text-white">
                  Explore more on {islandName}
                </p>
                <p className="mt-2 text-xs leading-6 text-white/48">
                  Open the island hub and browse live categories.
                </p>
              </TrackedLink>
              <TrackedLink
                href={`/${islandSlug}/${categorySlug}`}
                eventName="category_clicked"
                eventProperties={{
                  island: islandSlug,
                  category: categorySlug,
                  source: "business_profile_discovery",
                }}
                className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-aqua/25 hover:text-aqua"
              >
                <p className="text-sm font-semibold text-white">
                  More in {business.category?.name ?? "this category"}
                </p>
                <p className="mt-2 text-xs leading-6 text-white/48">
                  Follow the canonical category route for related profiles.
                </p>
              </TrackedLink>
              <TrackedLink
                href={islandGuideHref}
                eventName="plan_experience_clicked"
                eventProperties={{
                  island: islandSlug,
                  source: "business_profile_discovery",
                }}
                className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-aqua/25 hover:text-aqua"
              >
                <p className="text-sm font-semibold text-white">
                  Things to do in {islandName}
                </p>
                <p className="mt-2 text-xs leading-6 text-white/48">
                  Move from one listing into the broader island plan.
                </p>
              </TrackedLink>
            </div>
          </div>
          {relatedLinks.sameCategory.length > 0 || relatedLinks.similarIntent.length > 0 ? (
            <div className="mb-8 grid gap-8 border-b border-white/8 pb-8 lg:grid-cols-2">
              {relatedLinks.sameCategory.length > 0 ? (
                <div>
                  <p className="eyebrow-label !text-aqua">Same category</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    More in {business.category?.name ?? "this category"}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {relatedLinks.sameCategory.map((link) => (
                      <TrackedLink
                        key={link.href}
                        href={link.href}
                        eventName="category_clicked"
                        eventProperties={{
                          island: islandSlug,
                          category: categorySlug,
                          source: "business_profile_related_same_category",
                        }}
                        className="block rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-aqua/25 hover:text-aqua"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aqua/72">
                          {link.categoryName} / {link.islandName}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">{link.name}</p>
                        <p className="mt-2 text-xs leading-6 text-white/48">
                          {link.summary}
                        </p>
                      </TrackedLink>
                    ))}
                  </div>
                </div>
              ) : null}
              {relatedLinks.similarIntent.length > 0 ? (
                <div>
                  <p className="eyebrow-label !text-coral-sunset">Same island, similar fit</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    Other {islandName} stops that fit a similar plan
                  </h3>
                  <div className="mt-5 space-y-3">
                    {relatedLinks.similarIntent.map((link) => (
                      <TrackedLink
                        key={link.href}
                        href={link.href}
                        eventName="island_selected"
                        eventProperties={{
                          island: islandSlug,
                          source: "business_profile_related_same_island",
                        }}
                        className="block rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-aqua/25 hover:text-aqua"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral-sunset/80">
                          {link.categoryName}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">{link.name}</p>
                        <p className="mt-2 text-xs leading-6 text-white/48">
                          {link.summary}
                        </p>
                      </TrackedLink>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {!isDemo ? (
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow-label !text-coral-sunset">Is this your business?</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                  Own or manage this business?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
                  Use the beta intake to correct details, send approved photos, or
                  register claim interest. The intake is human-reviewed, and this
                  listing stays clearly public-info until a business contact is
                  reviewed.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <TrackedLink
                  href={buildGetListedHref({
                    intent: "correct-my-info",
                    ...ownerActionContext,
                  })}
                  eventName="get_listed_cta_clicked"
                  eventProperties={{
                    placement: "business_profile",
                    listing_state: trustState,
                    intent: "correct-my-info",
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-coral/20 bg-coral/8 px-5 text-sm font-semibold text-coral-sunset transition hover:bg-coral/14"
                >
                  Correct or update this listing
                </TrackedLink>
                <TrackedLink
                  href={buildGetListedHref({
                    intent: "claim-interest",
                    ...ownerActionContext,
                  })}
                  eventName="get_listed_cta_clicked"
                  eventProperties={{
                    placement: "business_profile",
                    listing_state: trustState,
                    intent: "claim-interest",
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-aqua/25 hover:text-aqua"
                >
                  Claim interest
                </TrackedLink>
              </div>
            </div>
          ) : null}
        </aside>
      </article>
    </>
  );
}
