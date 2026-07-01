import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { IslandAskBar } from "@/components/search/island-ask-bar";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";
import { HERO_MEDIA, ISLAND_PORTALS } from "@/lib/media";
import { searchPublicInfoCatalog, type LocalSearchResult } from "@/lib/search/catalog-search";
import { isOwnerIntentQuery } from "@/lib/search/query-expansion";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Search the USVI",
  description:
    "Search VibeVI for beaches, charters, dining, nightlife, ferry-aware planning, and published USVI businesses by island and category.",
  alternates: { canonical: absoluteUrl("/search") },
  openGraph: {
    title: "Search the USVI | VibeVI",
    description:
      "Search VibeVI for beaches, charters, dining, nightlife, ferry-aware planning, and published USVI businesses by island and category.",
    url: absoluteUrl("/search"),
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        alt: "Search VibeVI for island moves",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search the USVI | VibeVI",
    description:
      "Search VibeVI for beaches, charters, dining, nightlife, ferry-aware planning, and published USVI businesses by island and category.",
    images: [absoluteUrl("/twitter-image")],
  },
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{
    vibe?: string;
    island?: string;
    category?: string;
    q?: string;
  }>;
};

const utilityShortcuts = [
  {
    href: "/ferry",
    label: "Ferry schedule",
    detail:
      "Red Hook, Cruz Bay, Crown Bay, Water Island, and schedule-based route context.",
  },
  {
    href: "/st-thomas/cruise-schedule",
    label: "St. Thomas cruise schedule",
    detail: "Scheduled ship calls and capacity context for port-day planning.",
  },
  {
    href: "/cruise-day",
    label: "Cruise-day guide",
    detail: "Beach, food, culture, shopping, and return-buffer planning.",
  },
  {
    href: "/water-island/ferry-schedule",
    label: "Water Island ferry",
    detail: "Crown Bay ferry hop, Honeymoon Beach, and slow-day planning.",
  },
] as const;

export default async function SearchPage({ searchParams }: Props) {
  const { vibe, q = "" } = await searchParams;
  const query = q.trim();
  const hasQuery = query.length >= 2;
  const isOwnerIntent = hasQuery && isOwnerIntentQuery(query);
  const searchResults = hasQuery ? searchPublicInfoCatalog(query) : [];

  return (
    <>
      <MediaBackdrop
        media={{ ...HERO_MEDIA, id: "search-hero", label: "Island search" }}
        overlay="hero"
        priority
        className="overflow-visible border-b border-sand/12"
      >
        <section className="section-shell grid gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:py-28">
          <div>
            <p className="eyebrow-label">Start with the vibe</p>
            <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-archipel-white sm:text-7xl">
              What fits the day?
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-archipel-white/66 sm:text-lg">
              Search by place, business, or category. Plan the ferry, find the
              table, chase the sunset, or keep the whole island day open.
            </p>
            <div className="mt-8 max-w-2xl">
              <IslandAskBar
                key={query}
                variant="compact"
                defaultQuery={query}
                placeholder="What kind of island day are you looking for?"
                showPrompts={!query}
              />
            </div>
            <div className="mt-5 max-w-2xl rounded-[1.15rem] border border-white/10 bg-[#062532]/58 px-4 py-3 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-botanical/20 bg-botanical/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-botanical">
                  Published listings
                </span>
                {query ? (
                  <p className="text-sm text-archipel-white/62">
                    Live results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <p className="text-sm text-archipel-white/62">
                    Results appear as you type.
                  </p>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-archipel-white/56">
                Results come from published business names and descriptions. No
                AI booking, live availability, or claim is made in this
                release.
              </p>
            </div>
          </div>
        </section>
      </MediaBackdrop>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        {hasQuery ? (
          <section aria-labelledby="search-results" className="mb-16">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
              <div>
                <p className="eyebrow-label">
                  {isOwnerIntent ? "Owner intent" : "Published results"}
                </p>
                <h2
                  id="search-results"
                  className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#173941] sm:text-4xl"
                >
                  {isOwnerIntent
                    ? "Start with the listing request."
                    : `Results for “${query}”`}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#45636a] sm:text-base">
                  {isOwnerIntent
                    ? "Use the launch inbox to submit a new listing, claim public-info details, send source-backed updates, or ask about future growth placement."
                    : "These results come from published business names, descriptions, island hubs, and route-aware utility pages."}
                </p>
              </div>
              <Link
                href="/search"
                className="rounded-full border border-[#0b4b55]/12 bg-white px-4 py-2 text-sm font-semibold text-[#173941] transition hover:-translate-y-0.5 hover:border-aqua/35 hover:text-[#0b4b55]"
              >
                Clear search
              </Link>
            </div>

            {searchResults.length > 0 ? (
              <div className="mt-8 grid gap-4">
                {searchResults.map((result, index) => (
                  <SearchResultCard
                    key={result.id}
                    result={result}
                    rank={index}
                    ownerIntent={isOwnerIntent}
                  />
                ))}
              </div>
            ) : (
              <div className="command-surface mt-8 rounded-[1.5rem] p-6 sm:p-7">
                <p className="eyebrow-label">No exact match yet</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Try an island, category, or practical need.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                  Search works best for island names, beaches, ferry, charters,
                  dining, nightlife, wellness, local shops, and specific
                  businesses that are already published.
                </p>
              </div>
            )}
          </section>
        ) : null}

        <VibeFilterRail activeId={vibe} className="!px-0" title="Route by mood" />

        <section className="mt-16" aria-labelledby="island-search">
          <SectionHeader
            eyebrow="Choose a starting point"
            title="Search one island or keep the whole day open."
            description="Island hubs help when you already know which shore the day belongs to."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ISLAND_SLUGS.map((slug, index) => {
              const islandMedia = ISLAND_PORTALS[slug].media;

              return (
                <Link
                  key={slug}
                  href={`/islands/${slug}`}
                  className="island-search-photo-card group relative min-h-[185px] overflow-hidden rounded-[1.25rem] border border-sand/12 transition hover:-translate-y-1 hover:border-sand/30"
                >
                  {islandMedia.src ? (
                    <Image
                      src={islandMedia.src}
                      alt={islandMedia.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-70 ${islandMedia.gradient}`}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/10"
                    aria-hidden
                  />
                  <div className="relative z-10 flex min-h-[185px] flex-col justify-between p-5">
                    <p className="rounded-full bg-white/12 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/72 backdrop-blur">
                      ISLAND {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h2 className="text-xl font-semibold tracking-[-0.035em] text-white group-hover:text-sand">
                        {ISLAND_MAP[slug].name}
                      </h2>
                      <p className="mt-2 text-xs font-medium text-white/68">
                        Open island guide
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="category-chips">
          <div className="flex flex-wrap items-center gap-3">
            <p id="category-chips" className="eyebrow-label">
              Beach, boat, bite, night
            </p>
            <ComingSoonBadge label="Growing launch set" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CORE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/st-thomas/${category.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-archipel-white/65 transition hover:border-sand/30 hover:bg-sand/7 hover:text-sand"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="utility-search">
          <SectionHeader
            eyebrow="Utility shortcuts"
            title="Searching ferry, cruise, port, or ship schedule?"
            description="Open the schedule-based planning pages directly. Ferry data is not live vessel tracking; cruise capacity is scheduled capacity, not actual passenger count."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {utilityShortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                href={shortcut.href}
                className="command-surface rounded-[1.25rem] p-5 transition hover:-translate-y-1 hover:border-aqua/25"
              >
                <h2 className="font-semibold text-archipel-white">
                  {shortcut.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-archipel-white/55">
                  {shortcut.detail}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function SearchResultCard({
  result,
  rank,
  ownerIntent,
}: {
  result: LocalSearchResult;
  rank: number;
  ownerIntent: boolean;
}) {
  const isUtility = result.href === "/get-listed";
  const detailLabel = result.categoryName ?? "Business";
  const cardTitle =
    isUtility && ownerIntent ? "Get listed on VibeVI" : result.name;
  const cardDescription =
    isUtility && ownerIntent
      ? "Own or manage a Virgin Islands business? Submit a new listing, claim public-info details, send updates, or ask about growth placement."
      : result.descriptionPlain;
  const trustNote =
    isUtility && ownerIntent
      ? "Public-info listings are reviewed before publishing. No instant verification or paid placement is implied."
      : null;

  return (
    <article
      className={`rounded-[1.5rem] border p-5 shadow-[0_20px_70px_rgba(7,151,166,0.12)] transition sm:p-6 ${
        isUtility
          ? "border-coral/20 bg-[linear-gradient(135deg,rgba(255,121,104,0.12),rgba(255,248,232,0.96)_38%,rgba(55,234,217,0.14))]"
          : "bg-white/72 border-white/70"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#0b4b55]/10 bg-white/70 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#47636a]">
              {rank === 0 ? "Top result" : `Result ${rank + 1}`}
            </span>
            <span className="rounded-full border border-[#0b4b55]/10 bg-white/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#47636a]">
              {isUtility ? "Utility" : `${detailLabel} / ${result.islandName}`}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#173941]">
            {cardTitle}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#45636a] sm:text-base">
            {cardDescription}
          </p>
          {trustNote ? (
            <p className="mt-3 text-xs leading-6 text-[#5c6f75]">{trustNote}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
          <Link
            href={result.href}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${
              isUtility
                ? "bg-coral text-midnight-950"
                : "bg-[#0b4b55] text-white hover:bg-[#0f6874]"
            }`}
          >
            {isUtility ? "Start listing request" : "Open result"}
          </Link>
          {isUtility ? (
            <span className="text-right text-[11px] leading-5 text-[#5c6f75]">
              Claim or update your VibeVI listing
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
