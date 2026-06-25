import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/facelift/listing-card";
import { DirectoryHero, DirectoryHeroLink } from "@/components/facelift/directory-hero";
import { FilterChipRail } from "@/components/facelift/filter-chip-rail";
import { VvButtonPrimary, VvCard, VvEyebrow, VvHeading, VvPage } from "@/components/facelift/vv-ui";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import { CORE_CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset } from "@/lib/media";
import { getListingPlaceholder } from "@/lib/vibevi-media";

type Props = { params: Promise<{ island: string; categorySlug: string }> };

const HIGH_INTENT_CATEGORY_COPY: Record<string, { title: string; description: string }> = {
  "st-thomas/nightlife-rhythm": {
    title: "St. Thomas Nightlife",
    description: "Find published St. Thomas nightlife, bar, music, and late-night business listings with direct-source profile details.",
  },
  "st-croix/indulgent-dining": {
    title: "St. Croix Restaurants",
    description: "Discover published St. Croix restaurant and dining listings across Christiansted, Frederiksted, and the wider island.",
  },
  "st-thomas/excursions-charters": {
    title: "St. Thomas Charters & Excursions",
    description: "Browse published St. Thomas boat charter, tour, and island excursion profiles and confirm availability directly.",
  },
  "st-john/excursions-charters": {
    title: "St. John Charters & Excursions",
    description: "Browse published St. John charter and excursion profiles around Cruz Bay and the wider island.",
  },
  "st-croix/excursions-charters": {
    title: "St. Croix Charters & Excursions",
    description: "Browse published St. Croix charter, Buck Island, and excursion business profiles.",
  },
};

const CHANNEL_GUIDANCE: Record<string, { heading: string; points: string[]; guideHref?: string; guideLabel?: string }> = {
  "st-thomas/nightlife-rhythm": {
    heading: "Choose the night by location, transport, and the trip home.",
    points: ["Charlotte Amalie and the East End create different nights and return routes.", "Confirm current hours, music, cover, dress expectations, and reservations directly.", "Arrange a responsible return before the late part of the night begins."],
    guideHref: "/st-thomas/things-to-do",
    guideLabel: "Open the St. Thomas field guide",
  },
  "st-thomas/excursions-charters": { heading: "Compare the departure point before the boat.", points: ["Confirm marina, pickup, duration, fuel, equipment, weather policy, and cancellation terms.", "VibeVI does not claim live availability or booking inventory.", "Match the return time to ferries, dining, or ship schedules."], guideHref: "/guides/usvi-charters", guideLabel: "Read the USVI charter guide" },
  "st-john/excursions-charters": { heading: "Make the charter fit the ferry and the island.", points: ["Confirm Cruz Bay or Coral Bay departure details directly.", "Treat conditions and operator guidance as authoritative on the day.", "Protect enough time for the return crossing if you are not staying on St. John."], guideHref: "/guides/usvi-charters", guideLabel: "Read the USVI charter guide" },
  "st-croix/excursions-charters": { heading: "Start with the St. Croix departure geography.", points: ["Buck Island, East End, and West End outings solve different days.", "Confirm authorization, inclusions, conditions, and timing directly.", "VibeVI profiles are planning starters, not live booking inventory."], guideHref: "/st-croix/buck-island", guideLabel: "Open the Buck Island guide" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) return { robots: { index: false, follow: false } };

  const islandName = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}`;
  const searchCopy = HIGH_INTENT_CATEGORY_COPY[`${islandParam}/${categorySlug}`];

  return {
    title: searchCopy?.title ?? `${category.name} in ${islandName}`,
    description: searchCopy?.description ?? `Find published ${category.name.toLowerCase()} listings across ${islandName}.`,
    alternates: { canonical },
    openGraph: { url: canonical, title: `${searchCopy?.title ?? `${category.name} in ${islandName}`} | VibeVI`, description: searchCopy?.description ?? `Find published ${category.name.toLowerCase()} listings across ${islandName}.` },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) notFound();

  const islandName = getIslandName(islandParam as IslandSlug);
  const businesses = await fetchPublishedBusinessesByCategory(
    islandParam as IslandSlug,
    categorySlug,
  );
  const demoCount = businesses.filter((business) => business.is_demo).length;
  const realCount = businesses.length - demoCount;
  const media = getCategoryMediaAsset(categorySlug, category.name);
  const guidance = CHANNEL_GUIDANCE[`${islandParam}/${categorySlug}`];

  const filterChips = CORE_CATEGORIES.map((item) => ({
    label: item.name,
    href: `/${islandParam}/${item.slug}`,
    active: item.slug === categorySlug,
  }));

  const heroMedia = {
    desktop: media.src ?? getListingPlaceholder(categorySlug),
    mobile: media.src ?? getListingPlaceholder(categorySlug),
    alt: `${media.alt} in ${islandName}`,
    objectPosition: "center",
  };

  const listingSummary =
    businesses.length > 0
      ? demoCount === businesses.length
        ? `${demoCount} clearly labeled demo profile${demoCount === 1 ? "" : "s"} show how this channel will work while verified inventory is collected.`
        : `${realCount} published listing${realCount === 1 ? "" : "s"}${demoCount ? ` plus ${demoCount} labeled demo profile${demoCount === 1 ? "" : "s"}` : ""}. Open a profile for source details.`
      : "This channel is being assembled. Use search or move laterally into another island category.";

  return (
    <VvPage>
      <DirectoryHero
        media={heroMedia}
        breadcrumb={
          <DirectoryHeroLink href={`/${islandParam}`}>← Back to {islandName}</DirectoryHeroLink>
        }
        eyebrow={`${islandName} / ${category.name}`}
        title={category.name}
        description={listingSummary}
        aside={
          <VvCard className="border-white/15 bg-white/95 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
                Channel status
              </p>
              <ComingSoonBadge label="Launch preview" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-[#173941]">
              {String(businesses.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs text-[#496871]">
              {demoCount === businesses.length && businesses.length > 0
                ? "sample profiles · no real business claims"
                : "directory profiles"}
            </p>
          </VvCard>
        }
      />

      <div className="section-shell py-10 sm:py-14">
        <FilterChipRail chips={filterChips} ariaLabel="Category filters" />

        {guidance ? (
          <section className="mt-8 grid gap-6 rounded-[1.35rem] border border-[#0b4b55]/10 bg-white p-6 shadow-[0_12px_40px_rgba(11,75,85,0.06)] lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <VvEyebrow>Plan before you pick</VvEyebrow>
              <VvHeading className="mt-3 text-2xl">{guidance.heading}</VvHeading>
              {guidance.guideHref ? (
                <Link href={guidance.guideHref} className="mt-4 inline-flex text-sm font-semibold text-[#0797a6]">
                  {guidance.guideLabel} <span className="ml-2" aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
            <ul className="space-y-3">
              {guidance.points.map((point, index) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl border border-[#0b4b55]/8 bg-[#fffaf3] p-4 text-sm leading-6 text-[#496871]"
                >
                  <span className="font-mono text-[10px] text-[#0797a6]">0{index + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 border-b border-[#0b4b55]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#496871]">
              Directory results
            </p>
            <p className="mt-1 text-sm text-[#315057]">
              {demoCount === businesses.length && businesses.length > 0
                ? "Fictional demo inventory · unverified · no paid ranking"
                : "Published directory listings — no paid ranking in this view"}
            </p>
          </div>
          <Link
            href={`/search?island=${islandParam}&category=${categorySlug}`}
            className="w-fit rounded-full border border-[#0797a6]/25 bg-[#e9fbf7] px-4 py-2 text-xs font-semibold text-[#0b4b55] transition hover:bg-[#d4f5ef]"
          >
            Search this channel ↗
          </Link>
        </div>

        {businesses.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <ListingCard key={business.id} business={business} islandSlug={islandParam} />
            ))}
          </div>
        ) : (
          <VvCard className="mt-8 px-6 py-16 text-center">
            <VvEyebrow>Channel assembling</VvEyebrow>
            <VvHeading className="mt-3 text-2xl">No published listings here—yet.</VvHeading>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#496871]">
              Try the archipelago search, choose a neighboring category, or return as the launch set grows.
            </p>
            <VvButtonPrimary href="/search" className="mt-7">
              Find the move
            </VvButtonPrimary>
          </VvCard>
        )}

        <section className="mt-14 border-t border-[#0b4b55]/10 pt-10" aria-labelledby="neighboring-categories">
          <p id="neighboring-categories" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
            Move sideways
          </p>
          <FilterChipRail
            className="mt-4"
            chips={CORE_CATEGORIES.filter((item) => item.slug !== categorySlug).map((item) => ({
              label: item.name,
              href: `/${islandParam}/${item.slug}`,
            }))}
            ariaLabel="Neighboring categories"
          />
        </section>
      </div>
    </VvPage>
  );
}
