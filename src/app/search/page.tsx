import type { Metadata } from "next";
import Link from "next/link";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";
import { VIBEVI_ISLANDS, VIBEVI_SEARCH } from "@/lib/vibevi-media";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Find the Move",
  description:
    "Search VibeVI for beaches, boats, bites, nights, and published USVI businesses by island, category, and mood.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ vibe?: string; island?: string; category?: string }>;
};

const popularSearches = [
  { label: "Best beaches", href: "/guides/best-beaches-usvi" },
  { label: "Boat charters", href: "/experiences/adventure" },
  { label: "Waterfront dinner", href: "/experiences/culinary" },
  { label: "Cruise day", href: "/cruise-day" },
  { label: "Ferry schedule", href: "/ferry" },
  { label: "Red Hook", href: "/st-thomas" },
  { label: "Cruz Bay", href: "/st-john" },
  { label: "Christiansted", href: "/st-croix" },
] as const;

export default async function SearchPage({ searchParams }: Props) {
  const { vibe, island, category } = await searchParams;

  return (
    <>
      <ResponsiveHero media={VIBEVI_SEARCH.hero} priority overlay="editorial">
        <div className="section-shell flex min-h-[min(68vh,620px)] flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            Build your island day
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            Find the Move
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88">
            Search by place, business, or category. Plan the ferry, find the
            table, or keep the whole day open.
          </p>
          <div className="mt-8 max-w-2xl">
            <HomeSearchBar variant="hero" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {popularSearches.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
              >
                {chip.label}
              </Link>
            ))}
          </div>
          {(island || category) && (
            <p className="mt-4 text-sm text-white/75">
              {island ? `Island filter: ${island}` : null}
              {island && category ? " · " : null}
              {category ? `Category filter: ${category}` : null}
            </p>
          )}
        </div>
      </ResponsiveHero>

      <div className="section-shell px-4 py-12 sm:px-6 lg:py-16">
        <VibeFilterRail activeId={vibe} className="!px-0" title="Route by mood" />

        <section className="mt-14" aria-labelledby="island-search">
          <h2
            id="island-search"
            className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#173941]"
          >
            Choose a starting island
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ISLAND_SLUGS.map((slug) => {
              const islandMedia = VIBEVI_ISLANDS[slug];
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group relative min-h-[200px] overflow-hidden rounded-[1.25rem] border border-[#0b4b55]/10 shadow-[0_12px_40px_rgba(11,75,85,0.08)]"
                >
                  <Image
                    src={islandMedia.desktop}
                    alt={islandMedia.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041820]/78 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-xl font-semibold text-white">
                      {ISLAND_MAP[slug].name}
                    </h3>
                    <p className="mt-1 text-xs text-white/78">
                      {islandMedia.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-14 border-t border-[#0b4b55]/10 pt-12" aria-labelledby="category-chips">
          <h2
            id="category-chips"
            className="font-display text-2xl font-semibold text-[#173941]"
          >
            Browse by category
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {CORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className="rounded-full border border-[#0b4b55]/12 bg-white px-4 py-2 text-sm font-medium text-[#315057] transition hover:border-[#0797a6]/30 hover:bg-[#e9fbf7]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
