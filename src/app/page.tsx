import Link from "next/link";
import { CategoryIconRail } from "@/components/facelift/category-icon-rail";
import { EditorialMediaCard } from "@/components/facelift/editorial-media-card";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { VibeMoodGrid } from "@/components/facelift/vibe-mood-grid";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { IslandPortalCard } from "@/components/home/island-portal-card";
import { PartnerClaimCTA } from "@/components/home/partner-claim-cta";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";
import {
  VIBEVI_HOME,
  VIBEVI_HOME_CARDS,
  VIBEVI_MOODS,
} from "@/lib/vibevi-media";

const trendingMoves = [
  {
    href: "/guides/best-beaches-usvi",
    title: "Best beaches",
    subtitle: "Choose the shore that fits the wind, road, and group.",
    imageSrc: VIBEVI_HOME_CARDS[0].desktop,
    imageAlt: VIBEVI_HOME_CARDS[0].alt,
    badge: "Beach",
  },
  {
    href: "/experiences/adventure",
    title: "Boat charters",
    subtitle: "Snorkel, sail, and reef days with direct confirmation.",
    imageSrc: VIBEVI_HOME_CARDS[1].desktop,
    imageAlt: VIBEVI_HOME_CARDS[1].alt,
    badge: "Boat",
  },
  {
    href: "/experiences/culinary",
    title: "Waterfront bites",
    subtitle: "Local plates, beach bars, and dinner by the water.",
    imageSrc: VIBEVI_HOME_CARDS[2].desktop,
    imageAlt: VIBEVI_HOME_CARDS[2].alt,
    badge: "Bite",
  },
  {
    href: "/experiences/nightlife",
    title: "Harbor nights",
    subtitle: "Music, rum, and boardwalk rhythm after sunset.",
    imageSrc: VIBEVI_HOME_CARDS[3].desktop,
    imageAlt: VIBEVI_HOME_CARDS[3].alt,
    badge: "Night",
  },
] as const;

const planningLinks = [
  ["/ferry", "Ferry board", "Crossings, terminals, and return-margin planning."],
  ["/cruise-day", "Cruise-day moves", "Port-clock beach, food, and culture routes."],
  ["/experiences/culture", "Culture routes", "Music, forts, markets, and island stories."],
  ["/get-listed", "Get listed", "Suggest updates or register interest in owner tools."],
] as const;

export default function HomePage() {
  return (
    <>
      <ResponsiveHero media={VIBEVI_HOME.hero} priority overlay="editorial">
        <div className="section-shell flex min-h-[min(78vh,720px)] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            U.S. Virgin Islands discovery
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Find Your Island Vibe
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg">
            Discover beaches, boat days, local bites, culture, ferry hops, and
            businesses across St. Thomas, St. Croix, St. John, and Water Island.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <HomeSearchBar variant="hero" />
          </div>
          <Link
            href="/search"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0b4b55] shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition hover:bg-[#fff4d6]"
          >
            Find the move
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </ResponsiveHero>

      <section
        className="relative z-20 -mt-6 px-4 sm:px-6"
        aria-label="Explore by category"
      >
        <div className="section-shell rounded-[1.75rem] border border-[#0b4b55]/10 bg-[#fffaf3]/95 px-4 py-5 shadow-[0_20px_60px_rgba(11,75,85,0.1)] backdrop-blur-md sm:px-6">
          <CategoryIconRail items={VIBEVI_HOME_CARDS} />
        </div>
      </section>

      <section
        className="section-shell px-4 py-16 sm:px-6 lg:py-24"
        aria-labelledby="vibe-heading"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
            What&apos;s Your Vibe?
          </p>
          <h2
            id="vibe-heading"
            className="font-display mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173941] sm:text-5xl"
          >
            Plan the move before you move.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#496871] sm:text-base">
            Local places. Real island energy. Pick a mood, then build the day
            around ferry timing, water, food, and return windows.
          </p>
        </div>
        <VibeMoodGrid items={VIBEVI_MOODS} className="mt-10" />
      </section>

      <section
        className="bg-[#f4e8d4]/45 px-4 py-16 sm:px-6 lg:py-20"
        aria-labelledby="trending-heading"
      >
        <div className="section-shell">
          <h2
            id="trending-heading"
            className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#173941] sm:text-4xl"
          >
            Trending now
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#496871]">
            Strong starting points across the islands. Confirm hours, pickup, and
            availability directly with businesses.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMoves.map((item) => (
              <EditorialMediaCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell px-4 py-16 sm:px-6 lg:py-24"
        aria-labelledby="islands-heading"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
            Four islands
          </p>
          <h2
            id="islands-heading"
            className="font-display mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#173941]"
          >
            Choose your island.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#496871]">
            Harbor buzz, park coves, culture depth, or a small-island ferry day —
            each shore has a different rhythm.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {ISLAND_SLUGS.map((slug) => (
            <IslandPortalCard key={slug} islandSlug={slug as IslandSlug} />
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:py-20" aria-labelledby="plan-heading">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2
              id="plan-heading"
              className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#173941]"
            >
              Build your island day
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#496871]">
              Ferry checks, cruise-day context, culture routes, and owner intake —
              without fake live availability or instant booking claims.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {planningLinks.map(([href, title, detail]) => (
              <Link
                key={href}
                href={href}
                className="rounded-[1.15rem] border border-[#0b4b55]/10 bg-[#fffaf3] p-5 shadow-[0_10px_32px_rgba(11,75,85,0.06)] transition hover:-translate-y-0.5 hover:border-[#0797a6]/25"
              >
                <h3 className="font-semibold text-[#173941]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#496871]">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#173941]">
          Map the next move
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#496871]">
          See published listings across the islands, then follow the water, road,
          or ferry.
        </p>
        <div className="mt-8">
          <DirectoryMapSection />
        </div>
      </section>

      <PartnerClaimCTA />
    </>
  );
}
