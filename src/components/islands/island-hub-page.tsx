import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { fetchPublishedBusinessesByCategory, type PublishedBusinessRow } from "@/lib/businesses/queries";
import { getIslandName, ISLAND_MAP, type IslandSlug } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";
import { absoluteUrl } from "@/lib/site-url";

type IslandHubSearchParams = {
  category?: string;
};

type IslandHubMetadataOptions = {
  isFiltered?: boolean;
};

type IslandHubPageProps = {
  islandSlug: IslandSlug;
  searchParams?: IslandHubSearchParams;
};

type IslandHubSection = {
  id:
    | "beaches"
    | "excursions"
    | "food"
    | "nightlife"
    | "shops"
    | "wellness"
    | "stays"
    | "family"
    | "history"
    | "things-to-do";
  title: string;
  description: string;
  categorySlug?: string;
  href: string;
  items: PublishedBusinessRow[];
};

const ISLAND_MICROCOPY: Record<
  IslandSlug,
  { short: string; long: string; searchHint: string }
> = {
  "st-thomas": {
    short: "beaches, nightlife, shopping, cruise-day energy",
    long: "Harbor energy, cruise-day timing, shopping in town, East End nights, and beach resets that still fit the clock.",
    searchHint: "Search St. Thomas only: Magens, Red Hook dinner, cruise-day beach, wellness reset...",
  },
  "st-john": {
    short: "national park, beaches, trails, quiet escapes",
    long: "National park beaches, Cruz Bay landings, trail-and-swim days, and quieter escape routes shaped around the ferry.",
    searchHint: "Search St. John only: Annaberg, beaches, trails, Cruz Bay dinner, ferry-day plans...",
  },
  "st-croix": {
    short: "food, culture, diving, local rhythm",
    long: "Boardwalk evenings, reef days, local food, fort walls, and a bigger-island route that rewards staying out longer.",
    searchHint: "Search St. Croix only: food, culture, diving, historic stops, west-end beach...",
  },
  "water-island": {
    short: "ferry-hop, Honeymoon Beach, Fort Segarra, slow-day escape",
    long: "A ferry-first, slow-day island with Honeymoon Beach, Fort Segarra, a golf-cart rhythm, and just enough to keep the day easy.",
    searchHint: "Search Water Island only: Honeymoon Beach, ferry, Fort Segarra, rentals, day trip...",
  },
};

const FILTER_LABELS = [
  ["all", "All live listings"],
  ["beaches", "Beaches"],
  ["excursions-charters", "Excursions & Charters"],
  ["food", "Food / Dining"],
  ["nightlife", "Nightlife"],
  ["local-shops", "Local Shops / Provisions"],
  ["things-to-do", "Things to do"],
  ["family", "Family / Rainy-Day"],
  ["history", "Historic / Cultural"],
  ["wellness", "Wellness / Spas"],
  ["stays", "Stays"],
] as const;

const ISLAND_METADATA_COPY: Record<
  IslandSlug,
  { description: string; intentTitle: string }
> = {
  "st-thomas": {
    description:
      "St. Thomas things to do, beaches, nightlife, shopping, charters, and cruise-day planning in one island-first guide.",
    intentTitle: "things to do, beaches, nightlife, and shopping",
  },
  "st-john": {
    description:
      "St. John beaches, nature, trails, ferry-day planning, and quieter island routes across Cruz Bay and the national park.",
    intentTitle: "beaches, nature, and slower island days",
  },
  "st-croix": {
    description:
      "St. Croix food, culture, beaches, nightlife, diving, and historic stops with island-first planning for Christiansted and Frederiksted.",
    intentTitle: "food, culture, beaches, and nightlife",
  },
  "water-island": {
    description:
      "Water Island day-trip planning with Honeymoon Beach, Fort Segarra context, ferry logistics, and a slow beach-day escape.",
    intentTitle: "day-trip planning and Honeymoon Beach time",
  },
};

function normalizeFilter(value?: string) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return "all";

  switch (normalized) {
    case "beaches":
    case "excursions":
    case "excursions-charters":
    case "food":
    case "dining":
    case "nightlife":
    case "shops":
    case "local-shops":
    case "local-provisions":
    case "wellness":
    case "spa":
    case "wellness-spas":
    case "stays":
    case "family":
    case "rainy-day":
    case "rainy day":
    case "history":
    case "historic":
    case "cultural":
    case "things-to-do":
    case "things to do":
      return normalized.replace(/\s+/g, "-");
    default:
      return "all";
  }
}

function matchesAnyPattern(business: PublishedBusinessRow, patterns: RegExp[]) {
  const haystack = [
    business.name,
    business.description_plain,
    business.street_address,
    business.category?.name,
    business.category?.slug,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return patterns.some((pattern) => pattern.test(haystack));
}

function deriveFamilyListings(businesses: PublishedBusinessRow[]) {
  const patterns = [
    /family/,
    /children/,
    /museum/,
    /beach/,
    /park/,
    /garden/,
    /ferry/,
    /fort/,
    /historic/,
    /trail/,
    /snorkel/,
    /water island/,
  ];

  return businesses.filter((business) => {
    if (business.category?.slug === "wellness-spas") return false;
    return matchesAnyPattern(business, patterns);
  });
}

function deriveHistoricListings(businesses: PublishedBusinessRow[]) {
  const patterns = [
    /historic/,
    /history/,
    /museum/,
    /fort/,
    /synagogue/,
    /gallery/,
    /cultural/,
    /distillery/,
    /plantation/,
    /ruins/,
    /park/,
  ];

  return businesses.filter((business) => matchesAnyPattern(business, patterns));
}

function uniqueBusinesses(businesses: PublishedBusinessRow[]) {
  const seen = new Set<string>();
  return businesses.filter((business) => {
    if (seen.has(business.id)) return false;
    seen.add(business.id);
    return true;
  });
}

function buildIslandHubMetadata(
  islandSlug: IslandSlug,
  options?: IslandHubMetadataOptions,
): Metadata {
  const islandName = getIslandName(islandSlug);
  const canonical = absoluteUrl(`/islands/${islandSlug}`);
  const portal = ISLAND_PORTALS[islandSlug];
  const copy = ISLAND_MICROCOPY[islandSlug];
  const meta = ISLAND_METADATA_COPY[islandSlug];
  const isFiltered = options?.isFiltered ?? false;

  return {
    title: `${islandName} Guide`,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: `${islandName} Guide | VibeVI`,
      description: copy.long,
      url: canonical,
      images: portal.media.src ? [{ url: portal.media.src, alt: portal.media.alt }] : undefined,
    },
    robots: { index: !isFiltered, follow: true },
  };
}

function buildFilterHref(islandSlug: IslandSlug, filter: string) {
  return filter === "all"
    ? `/islands/${islandSlug}`
    : `/islands/${islandSlug}?category=${encodeURIComponent(filter)}`;
}

function liveListingsOnly(listings: PublishedBusinessRow[]) {
  return listings.filter((listing) => !listing.is_demo);
}

export function getIslandHubMetadata(
  islandSlug: IslandSlug,
  options?: IslandHubMetadataOptions,
) {
  return buildIslandHubMetadata(islandSlug, options);
}

export async function IslandHubPage({
  islandSlug,
  searchParams,
}: IslandHubPageProps) {
  const islandName = getIslandName(islandSlug);
  const portal = ISLAND_PORTALS[islandSlug];
  const copy = ISLAND_MICROCOPY[islandSlug];
  const filter = normalizeFilter(searchParams?.category);

  const [
    beachesRaw,
    excursionsRaw,
    foodRaw,
    nightlifeRaw,
    shopsRaw,
    wellnessRaw,
    staysRaw,
  ] = await Promise.all([
    fetchPublishedBusinessesByCategory(islandSlug, "beaches"),
    fetchPublishedBusinessesByCategory(islandSlug, "excursions-charters"),
    fetchPublishedBusinessesByCategory(islandSlug, "indulgent-dining"),
    fetchPublishedBusinessesByCategory(islandSlug, "nightlife-rhythm"),
    fetchPublishedBusinessesByCategory(islandSlug, "local-provisions"),
    fetchPublishedBusinessesByCategory(islandSlug, "wellness-spas"),
    fetchPublishedBusinessesByCategory(islandSlug, "boutique-stays"),
  ]);

  const beaches = liveListingsOnly(beachesRaw);
  const excursions = liveListingsOnly(excursionsRaw);
  const food = liveListingsOnly(foodRaw);
  const nightlife = liveListingsOnly(nightlifeRaw);
  const shops = liveListingsOnly(shopsRaw);
  const wellness = liveListingsOnly(wellnessRaw);
  const stays = liveListingsOnly(staysRaw);

  const allIslandListings = uniqueBusinesses([
    ...beaches,
    ...excursions,
    ...food,
    ...nightlife,
    ...shops,
    ...wellness,
    ...stays,
  ]);

  const family = uniqueBusinesses(deriveFamilyListings(allIslandListings));
  const history = uniqueBusinesses(deriveHistoricListings(allIslandListings));

  const sections: IslandHubSection[] = [
    {
      id: "beaches",
      title: "Beaches",
      description: "Public beach profiles and beach-first island planning for this island only.",
      categorySlug: "beaches",
      href: buildFilterHref(islandSlug, "beaches"),
      items: beaches,
    },
    {
      id: "excursions",
      title: "Excursions & Charters",
      description: "Boat days, snorkeling, tours, marinas, and on-water planning with island-specific departure context.",
      categorySlug: "excursions-charters",
      href: `/${islandSlug}/excursions-charters`,
      items: excursions,
    },
    {
      id: "food",
      title: "Food / Dining",
      description: "Published food, dinner, waterfront, and date-night listings for this island.",
      categorySlug: "indulgent-dining",
      href: `/${islandSlug}/indulgent-dining`,
      items: food,
    },
    {
      id: "nightlife",
      title: "Nightlife",
      description: "Bars, boardwalk energy, live-music adjacency, and late-night planning within this island.",
      categorySlug: "nightlife-rhythm",
      href: `/${islandSlug}/nightlife-rhythm`,
      items: nightlife,
    },
    {
      id: "shops",
      title: "Local Shops / Provisions",
      description: "Makers, provisions, museums, galleries, and useful local stops tied to this island.",
      categorySlug: "local-provisions",
      href: `/${islandSlug}/local-provisions`,
      items: shops,
    },
    {
      id: "wellness",
      title: "Wellness / Spas",
      description: "Source-backed wellness, spa, and reset-oriented listings for this island.",
      categorySlug: "wellness-spas",
      href: `/${islandSlug}/wellness-spas`,
      items: wellness,
    },
    {
      id: "stays",
      title: "Stays",
      description: "Published stay listings that help anchor the overnight version of the island day.",
      categorySlug: "boutique-stays",
      href: `/${islandSlug}/boutique-stays`,
      items: stays,
    },
    {
      id: "family",
      title: "Family / Rainy-Day",
      description: "Cross-category picks that skew easier, more flexible, or less weather-fragile for this island.",
      href: `/search?island=${islandSlug}&q=family`,
      items: family,
    },
    {
      id: "history",
      title: "Historic / Cultural Stops",
      description: "Cross-category history, culture, forts, museums, and story-rich stops for this island.",
      href: `/search?island=${islandSlug}&q=history`,
      items: history,
    },
  ];

  const visibleSections = sections.filter((section) => {
    if (filter === "all") return section.items.length > 0;
    if (filter === "beaches") return section.id === "beaches";
    if (filter === "excursions-charters" || filter === "excursions") return section.id === "excursions";
    if (filter === "food" || filter === "dining") return section.id === "food";
    if (filter === "nightlife") return section.id === "nightlife";
    if (filter === "shops" || filter === "local-provisions" || filter === "local-shops") return section.id === "shops";
    if (filter === "wellness" || filter === "spa" || filter === "wellness-spas") return section.id === "wellness";
    if (filter === "stays") return section.id === "stays";
    if (filter === "family" || filter === "rainy-day") return section.id === "family";
    if (filter === "history" || filter === "historic" || filter === "cultural") return section.id === "history";
    if (filter === "things-to-do") {
      return ["beaches", "excursions", "family", "history", "shops"].includes(section.id);
    }
    return section.items.length > 0;
  });
  const hasVisibleResults = visibleSections.some((section) => section.items.length > 0);

  const utilityLinks = [
    ["Back to homepage", "/"],
    ["Search this island", `/search?island=${islandSlug}`],
    ["Search all islands", "/search"],
    ["Map view", "/map"],
    islandSlug === "st-thomas" || islandSlug === "st-john" || islandSlug === "water-island"
      ? ["Ferry schedule", `/${islandSlug}/ferry-schedule`]
      : null,
    islandSlug === "st-thomas" || islandSlug === "st-croix"
      ? ["Cruise-day tools", `/${islandSlug}/cruise-schedule`]
      : null,
  ].filter(Boolean) as [string, string][];

  const totalCount = allIslandListings.length;
  const center = ISLAND_MAP[islandSlug].center;
  const meta = ISLAND_METADATA_COPY[islandSlug];

  return (
    <>
      <MediaBackdrop
        media={portal.media}
        overlay="hero"
        priority
        className="min-h-[min(76vh,760px)]"
      >
        <div className="section-shell flex min-h-[min(76vh,760px)] flex-col justify-end pb-12 pt-24 sm:pb-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.55fr] lg:items-end">
            <div>
              <p className="eyebrow-label">Choose your island / {center[1].toFixed(2)}° N · {Math.abs(center[0]).toFixed(2)}° W</p>
              <h1 className="display-type mt-6 text-archipel-white">{islandName} Guide</h1>
              <p className="mt-5 max-w-3xl text-lg font-medium text-coral-sunset sm:text-xl">
                {copy.short}
              </p>
              <p className="text-pretty mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/66 sm:text-lg">
                {copy.long}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-archipel-white/52 sm:text-base">
                Built for {meta.intentTitle}, with every section scoped to {islandName} so you can stay island-first before widening the search.
              </p>
            </div>

            <div className="command-surface rounded-[1.45rem] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-aqua/60">
                Live island count
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
                {String(totalCount).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm text-archipel-white/48">
                Source-backed listings currently classified to {islandName}.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {utilityLinks.map(([label, href]) => (
                  <TrackedLink
                    key={href}
                    href={href}
                    eventName="island_selected"
                    eventProperties={{ island: islandSlug, source: "island_hub_utility_link", label }}
                    data-track="island-hub-utility-link"
                    data-island={islandSlug}
                    data-link-label={label}
                    className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-3 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    {label}
                  </TrackedLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <section aria-labelledby="island-search-heading">
          <div className="grid gap-6 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow-label">Island-first search</p>
              <h2 id="island-search-heading" className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
                Search inside {islandName} first.
              </h2>
              <p className="mt-4 text-sm leading-7 text-archipel-white/58">
                Keep the query inside {islandName} by default, then step back out to the full archipelago when you want wider options.
              </p>
            </div>
            <div>
              <form
                action="/search"
                method="get"
                data-track="island-hub-search"
                data-island={islandSlug}
                className="rounded-[1.2rem] border border-white/10 bg-midnight-950/45 p-2 backdrop-blur"
              >
                <input type="hidden" name="island" value={islandSlug} />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="search"
                    name="q"
                    placeholder={copy.searchHint}
                    data-track="island-hub-search-input"
                    data-island={islandSlug}
                    className="min-h-12 flex-1 rounded-[0.95rem] border border-white/8 bg-transparent px-4 text-sm text-white placeholder:text-archipel-white/38 focus:outline-none"
                  />
                  <button
                    type="submit"
                    data-track="island-hub-search-submit"
                    data-island={islandSlug}
                    className="inline-flex min-h-12 items-center justify-center rounded-[0.95rem] bg-aqua px-5 text-sm font-bold text-midnight-950 transition hover:bg-aqua/90"
                  >
                    Search {islandName}
                  </button>
                </div>
              </form>
              <div className="mt-3 flex flex-wrap gap-2">
                <TrackedLink
                  href="/search"
                  eventName="island_selected"
                  eventProperties={{ island: islandSlug, source: "island_hub_search_escape_hatch" }}
                  data-track="search-all-islands"
                  data-island={islandSlug}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Search all islands
                </TrackedLink>
                <TrackedLink
                  href={`/search?island=${islandSlug}&q=things to do`}
                  eventName="island_selected"
                  eventProperties={{ island: islandSlug, source: "island_hub_search_shortcut", query: "things to do" }}
                  data-track="island-hub-search-shortcut"
                  data-island={islandSlug}
                  data-query="things to do"
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Search things to do
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="island-filter-heading">
          <div>
            <p className="eyebrow-label">Filter the hub</p>
            <h2
              id="island-filter-heading"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl"
            >
              {`See only the ${islandName} categories that matter right now.`}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/58 sm:text-lg">
              Empty sections stay out of the way. Use the chips to narrow the hub without breaking global search.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTER_LABELS.map(([value, label]) => {
              const isActive = filter === value;
              return (
                <TrackedLink
                  key={value}
                  href={buildFilterHref(islandSlug, value)}
                  eventName="island_selected"
                  eventProperties={{ island: islandSlug, source: "island_hub_filter", filter: value }}
                  data-track="island-hub-filter"
                  data-island={islandSlug}
                  data-filter={value}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border border-aqua/35 bg-aqua/12 text-aqua"
                      : "border border-white/10 bg-white/[0.03] text-archipel-white/62 hover:border-aqua/25 hover:text-aqua"
                  }`}
                >
                  {label}
                </TrackedLink>
              );
            })}
          </div>
        </section>

        <section className="mt-12 space-y-14" aria-label={`${islandName} listing sections`}>
          {visibleSections.length > 0 && hasVisibleResults ? (
            visibleSections.map((section) => (
              <div key={section.id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow-label">{`${islandName} / ${section.title}`}</p>
                    <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/58 sm:text-lg">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <TrackedLink
                      href={section.href}
                      eventName="island_selected"
                      eventProperties={{ island: islandSlug, source: "island_hub_section_link", section: section.id }}
                      data-track="island-hub-section-link"
                      data-island={islandSlug}
                      data-section={section.id}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                    >
                      {section.categorySlug ? `Open ${section.title}` : `Search ${section.title}`}
                    </TrackedLink>
                    <TrackedLink
                      href={`/search?island=${islandSlug}&q=${encodeURIComponent(section.title.toLowerCase())}`}
                      eventName="island_selected"
                      eventProperties={{ island: islandSlug, source: "island_hub_section_search", section: section.id }}
                      data-track="island-hub-section-search"
                      data-island={islandSlug}
                      data-section={section.id}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                    >
                      Search in {islandName}
                    </TrackedLink>
                  </div>
                </div>

                {section.items.length > 0 ? (
                  <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {section.items.slice(0, 6).map((business) => (
                      <BusinessPreviewCard
                        key={`${section.id}-${business.id}`}
                        business={business}
                        islandSlug={islandSlug}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="command-surface mt-6 rounded-[1.35rem] border border-white/8 p-6 text-sm text-archipel-white/55">
                    More coming soon. This category is scoped correctly to {islandName}, but it needs stronger live coverage before it becomes a useful browse section.
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="command-surface rounded-[1.45rem] border border-white/8 p-7">
              <p className="eyebrow-label">Filter reset</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white">
                No live results yet for this island filter.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/58 sm:text-lg">
                Try all categories for {islandName}, search within the island, or widen back out to the full archipelago while this slice fills in.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <TrackedLink
                  href={`/islands/${islandSlug}`}
                  eventName="island_selected"
                  eventProperties={{ island: islandSlug, source: "island_hub_zero_state_reset" }}
                  data-track="island-hub-zero-state-reset"
                  data-island={islandSlug}
                  className="rounded-full border border-aqua/25 bg-aqua/10 px-4 py-2 text-sm font-semibold text-aqua transition hover:bg-aqua/16"
                >
                  Show all {islandName}
                </TrackedLink>
                <TrackedLink
                  href={`/search?island=${islandSlug}`}
                  eventName="island_selected"
                  eventProperties={{ island: islandSlug, source: "island_hub_zero_state_search" }}
                  data-track="island-hub-zero-state-search"
                  data-island={islandSlug}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                >
                  Search this island
                </TrackedLink>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
