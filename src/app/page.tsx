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
