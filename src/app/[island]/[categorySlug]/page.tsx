import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import { shouldIndexCategoryPage } from "@/lib/category-indexing";
import { CORE_CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { buildGetListedHref } from "@/lib/get-listed";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset } from "@/lib/media";
import { absoluteUrl } from "@/lib/site-url";

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
  "st-thomas/culture-history": {
    title: "St. Thomas Culture & History",
    description: "Browse published St. Thomas museums, forts, and cultural-history stops with source-backed profile details.",
  },
  "st-croix/culture-history": {
    title: "St. Croix Culture & History",
    description: "Browse published St. Croix museums, forts, historic sites, and heritage stops across Christiansted and Frederiksted.",
  },
  "water-island/culture-history": {
    title: "Water Island Culture & History",
    description: "Browse published Water Island ruins and historic stops that add depth beyond the ferry-and-beach day loop.",
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
  "st-thomas/culture-history": {
    heading: "Use museums and forts as real day-shaping anchors, not filler stops.",
    points: [
      "Historic stops often work best when paired with port timing, downtown walking, or a rainy-day pivot.",
      "Confirm admission, hours, event programming, and access details directly with the source or organization.",
      "These profiles are planning starters and do not imply live ticketing or current exhibit information.",
    ],
    guideHref: "/st-thomas/things-to-do",
    guideLabel: "Open the St. Thomas field guide",
  },
  "st-croix/culture-history": {
    heading: "Let the island story shape the route, not just the stop list.",
    points: [
      "Christiansted, Frederiksted, Salt River, and west-end history each solve a different St. Croix day.",
      "Confirm hours, ranger programming, exhibits, and local access details directly before you go.",
      "Use these listings as route anchors for culture, family, and rainy-day planning rather than assuming full attraction coverage.",
    ],
    guideHref: "/st-croix/things-to-do",
    guideLabel: "Open the St. Croix field guide",
  },
  "water-island/culture-history": {
    heading: "Historic stops on Water Island only work if the ferry and return still stay protected.",
    points: [
      "Keep the ferry schedule visible before you commit to ruins, tunnels, or longer walks on a smaller island.",
      "Confirm on-island access expectations directly and do not assume staffed attraction services.",
      "Use culture stops to deepen the beach day, not to overbuild a thin island into a crowded itinerary.",
    ],
    guideHref: "/water-island/day-trip",
    guideLabel: "Open the Water Island day-trip guide",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) return { robots: { index: false, follow: false } };

  const islandName = getIslandName(islandParam as IslandSlug);
  const canonical = absoluteUrl(`/${islandParam}/${categorySlug}`);
  const searchCopy = HIGH_INTENT_CATEGORY_COPY[`${islandParam}/${categorySlug}`];
  const businesses = await fetchPublishedBusinessesByCategory(
    islandParam as IslandSlug,
    categorySlug,
  );
  const realListingCount = businesses.filter((business) => !business.is_demo).length;
  const shouldIndexCategory = shouldIndexCategoryPage(category.slug, realListingCount);
  const media = getCategoryMediaAsset(categorySlug, category.name);
  const ogImage = media.src
    ? absoluteUrl(media.src)
    : absoluteUrl("/opengraph-image");
  const title = searchCopy?.title ?? `${category.name} in ${islandName}`;
  const description =
    searchCopy?.description ??
    (businesses.length > 0
      ? `Find published ${category.name.toLowerCase()} listings across ${islandName}.`
      : `Explore ${category.name.toLowerCase()} planning context for ${islandName}. Published listings are still being assembled.`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: `${title} | VibeVI`,
      description,
      images: [
        {
          url: ogImage,
          alt: `${category.name} route artwork for ${islandName} on VibeVI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | VibeVI`,
      description,
      images: [ogImage],
    },
    robots: { index: shouldIndexCategory, follow: true },
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

  return (
    <>
      <MediaBackdrop
        media={{
          ...media,
          id: categorySlug,
          label: category.name,
          alt: `${media.alt} in ${islandName}`,
        }}
        overlay="hero"
        className="min-h-[min(58vh,540px)]"
      >
        <div className="section-shell flex min-h-[min(58vh,540px)] flex-col justify-end pb-12 pt-24 sm:pb-14">
          <Link
            href={`/${islandParam}`}
            className="w-fit text-xs font-semibold text-archipel-white/45 transition hover:text-aqua"
          >
            ← Back to {islandName}
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <p className="eyebrow-label">{islandName} / Island route</p>
              <h1 className="text-balance mt-5 text-4xl font-semibold tracking-[-0.055em] text-archipel-white sm:text-6xl lg:text-7xl">
                {category.name}
              </h1>
              <p className="text-pretty mt-5 max-w-2xl text-base leading-relaxed text-archipel-white/64 sm:text-lg">
                {businesses.length > 0
                  ? demoCount === businesses.length
                    ? `${demoCount} clearly labeled demo profile${demoCount === 1 ? "" : "s"} show how this channel will work while verified inventory is collected.`
                    : `${realCount} published listing${realCount === 1 ? "" : "s"}${demoCount ? ` plus ${demoCount} labeled demo profile${demoCount === 1 ? "" : "s"}` : ""}. Open a profile for source details.`
                  : categorySlug === "culture-history"
                    ? "This island does not have enough published culture-and-history inventory yet. Use search or move laterally into another island category."
                    : "This channel is being assembled. Use search or move laterally into another island category."}
              </p>
            </div>
            <div className="command-surface rounded-[1.3rem] p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/60">Channel status</p>
                <ComingSoonBadge label="Launch preview" />
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-archipel-white">
                {String(businesses.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-archipel-white/42">
                {demoCount === businesses.length && businesses.length > 0
                  ? "sample profiles · no real business claims"
                  : "directory profiles"}
              </p>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        {guidance ? <section className="mb-12 grid gap-6 rounded-[1.5rem] border border-white/9 bg-white/[0.025] p-6 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow-label">Plan before you pick</p><h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{guidance.heading}</h2>{guidance.guideHref ? <Link href={guidance.guideHref} className="mt-6 inline-flex text-sm font-semibold text-aqua">{guidance.guideLabel} <span className="ml-2" aria-hidden>→</span></Link> : null}</div><ul className="space-y-3">{guidance.points.map((point, index) => <li key={point} className="flex gap-3 rounded-xl border border-white/7 bg-midnight-950/30 p-4 text-sm leading-6 text-white/55"><span className="font-mono text-[10px] text-aqua/55">0{index + 1}</span>{point}</li>)}</ul></section> : null}
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-archipel-white/32">
              Directory results
            </p>
            <p className="mt-1 text-sm text-archipel-white/55">
              {demoCount === businesses.length && businesses.length > 0
                ? "Fictional demo inventory · unverified · no paid ranking"
                : "Published directory listings - no paid ranking in this view"}
            </p>
          </div>
          <Link
            href={`/search?island=${islandParam}&category=${categorySlug}`}
            className="w-fit rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-xs font-semibold text-aqua transition hover:bg-aqua/12"
          >
            Search this channel ↗
          </Link>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-coral/15 bg-coral/7 p-5 text-sm leading-7 text-white/58">
          Own or manage a business in {category.name} on {islandName}?{" "}
          <Link
            href={buildGetListedHref({
              intent: "add-my-business",
              islandSlug: islandParam,
              categorySlug,
            })}
            className="font-semibold text-coral-sunset transition hover:text-aqua"
          >
            Add it, correct the listing, or send approved photos.
          </Link>
        </div>

        {businesses.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <BusinessPreviewCard
                key={business.id}
                business={business}
                islandSlug={islandParam}
                launchPreview
              />
            ))}
          </div>
        ) : (
          <div className="command-surface topographic-field mt-8 rounded-[1.5rem] px-6 py-16 text-center">
            <SectionHeader
              align="center"
              eyebrow="Channel assembling"
              title="No published listings here—yet."
              description="Try the archipelago search, choose a neighboring category, or return as the launch set grows."
            />
            <Link
              href="/search"
              className="mt-7 inline-flex min-h-11 items-center rounded-full bg-aqua px-5 text-sm font-bold text-midnight-950"
            >
              Find the move
            </Link>
          </div>
        )}

        <section className="mt-16 border-t border-white/8 pt-10" aria-labelledby="neighboring-categories">
          <p id="neighboring-categories" className="eyebrow-label">Move sideways</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {CORE_CATEGORIES.filter((item) => item.slug !== categorySlug).map((item) => (
              <Link
                key={item.slug}
                href={`/${islandParam}/${item.slug}`}
                className="rounded-full border border-white/9 bg-white/[0.03] px-4 py-2 text-sm text-archipel-white/58 transition hover:border-aqua/25 hover:text-aqua"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
