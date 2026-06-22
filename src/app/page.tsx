import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { ISLAND_SLUGS, ISLAND_MAP } from "@/lib/islands";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-botanical">
          Energetic Refinement
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-archipel-white sm:text-5xl">
          The US Virgin Islands, curated and current.
        </h1>
        <p className="mt-6 text-lg text-archipel-white/75">
          A refined business directory and daily utility for St. Thomas, St. Croix,
          St. John, and Water Island — with live ferry countdowns and cruise-day
          planning.
        </p>
        <div className="mt-8">
          <HomeSearchBar />
        </div>
      </section>

      <DirectoryMapSection
        topOverlay={
          <NextBoatWidget className="pointer-events-auto w-[min(100%,20rem)] sm:w-80" />
        }
        bottomOverlay={
          <CrowdPredictor className="pointer-events-auto w-[min(100%,20rem)] sm:w-80" />
        }
      />

      <section className="mt-16" aria-labelledby="islands-heading">
        <h2 id="islands-heading" className="text-xl font-semibold text-archipel-white">
          Choose your island
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ISLAND_SLUGS.map((slug) => {
            const island = ISLAND_MAP[slug];
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="glass-panel group rounded-2xl p-6 transition hover:border-white/20"
              >
                <h3 className="text-lg font-medium text-archipel-white group-hover:text-white">
                  {island.name}
                </h3>
                <p className="mt-2 text-sm text-archipel-white/60">
                  Directory, utilities, and planning
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2" aria-labelledby="utilities-heading">
        <h2 id="utilities-heading" className="sr-only">
          Daily utilities
        </h2>
        <Link
          href="/st-john/ferry-schedule"
          className="glass-panel rounded-2xl p-6 transition hover:border-white/20"
        >
          <h3 className="font-medium text-archipel-white">Ferry schedules</h3>
          <p className="mt-2 text-sm text-archipel-white/60">
            Next Boat countdowns with verified source timestamps
          </p>
        </Link>
        <Link
          href="/st-thomas/cruise-schedule"
          className="glass-panel rounded-2xl p-6 transition hover:border-white/20"
        >
          <h3 className="font-medium text-archipel-white">Cruise schedules</h3>
          <p className="mt-2 text-sm text-archipel-white/60">
            Crowd Predictor with scheduled ship capacity bands
          </p>
        </Link>
      </section>
    </div>
  );
}
