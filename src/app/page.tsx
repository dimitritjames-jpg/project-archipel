import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { ExperienceMosaic } from "@/components/home/experience-mosaic";
import { HeroMediaSection } from "@/components/home/hero-media-section";
import { IslandPortalCard } from "@/components/home/island-portal-card";
import { PartnerClaimCTA } from "@/components/home/partner-claim-cta";
import { TodayIslandPulse } from "@/components/home/today-island-pulse";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { SectionHeader } from "@/components/ui/section-header";
import { ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";

export default function HomePage() {
  return (
    <>
      <HeroMediaSection />

      <TodayIslandPulse />

      <VibeFilterRail className="pb-20 lg:pb-28" />

      <section className="px-4 pb-20 sm:px-6 lg:pb-28" aria-labelledby="islands-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeader
              eyebrow="Four islands · one archipelago"
              title="Choose an island. Enter its rhythm."
              description="Each portal combines useful planning signals with its own geography, pace, and reasons to cross the water."
            />
            <p className="max-w-md justify-self-end text-sm leading-relaxed text-archipel-white/42 lg:text-right">
              St. Thomas moves fast. St. John opens into the park. St. Croix
              stretches deeper. Water Island keeps the scale intimate.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {ISLAND_SLUGS.map((slug) => (
              <IslandPortalCard key={slug} islandSlug={slug as IslandSlug} />
            ))}
          </div>
        </div>
      </section>

      <ExperienceMosaic />

      <section className="section-shell py-20 lg:py-28" aria-labelledby="planning-guides-heading">
        <SectionHeader eyebrow="Plan the next move" title="The island questions people actually ask." description="Useful launch guides connect search intent to island context, schedule utilities, directory categories, and published local businesses." />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/experiences/adventure", "Adventure in the USVI", "Charters, reefs, trails, ferry-aware routes, and inquiry-ready operators."],
            ["/experiences/culture", "Culture in the USVI", "History, music, markets, foodways, etiquette, and local discovery routes."],
            ["/experiences/culinary", "Culinary discovery", "Restaurants, beach bars, local plates, date nights, and direct contact paths."],
            ["/experiences/cruise-day", "Cruise day planner", "One-day port decisions built around scheduled capacity and return buffers."],
            ["/st-thomas/things-to-do", "Things to do in St. Thomas", "Beach, harbor, ferry, cruise-day, and nightlife context."],
            ["/st-croix/things-to-do", "Things to do in St. Croix", "Christiansted, Frederiksted, Buck Island, food, and reef routes."],
            ["/st-john/things-to-do", "Things to do in St. John", "Ferry timing, national park, beaches, and Cruz Bay."],
            ["/guides/best-beaches-usvi", "Best beaches in the USVI", "Choose by island, access, pace, and the shape of the day."],
            ["/guides/usvi-charters", "USVI charters", "Find published operators and compare the right booking questions."],
            ["/water-island/day-trip", "Water Island day trip", "Build the ferry hop around Honeymoon Beach and the return."],
          ].map(([href, label, detail], index) => (
            <Link key={href} href={href} className="command-surface group rounded-[1.35rem] p-5 transition hover:-translate-y-1 hover:border-aqua/25">
              <span className="font-mono text-[9px] text-aqua/55">FIELD NOTE {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-lg font-semibold text-white group-hover:text-aqua">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-white/48">{detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Mapped discovery"
            title="See the archipelago as one connected day."
            description="Move between island portals and published listings. When Mapbox is configured, the radar view becomes interactive."
          />
          <div className="mt-8">
            <DirectoryMapSection />
          </div>
        </div>
      </section>

      <PartnerClaimCTA />
    </>
  );
}
