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

const dayMoves = [
  {
    label: "Beach",
    href: "/guides/best-beaches-usvi",
    line: "Find the sand, shade, and water that fits the day.",
    motif: "Reef-blue shallows, towel down, easy swim.",
    className: "beach-day-card",
  },
  {
    label: "Boat",
    href: "/guides/usvi-charters",
    line: "Snorkel, beach-hop, or chase the sunset from the water.",
    motif: "Sails, coves, turtles, and one more swim stop.",
    className: "boat-day-card",
  },
  {
    label: "Bite",
    href: "/experiences/culinary",
    line: "Local plates, boardwalk tables, beach bars, and chef-led nights.",
    motif: "Johnny cakes, fresh fish, rum-bar gold.",
    className: "bite-day-card",
  },
  {
    label: "Night",
    href: "/st-thomas/nightlife-rhythm",
    line: "Music, rum, waterfront energy, and late moves.",
    motif: "Sunset dinner into harbor lights.",
    className: "night-day-card",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroMediaSection />

      <section className="section-shell py-16 lg:py-20" aria-labelledby="day-moves-heading">
        <div className="rounded-[2.2rem] border border-sand/18 bg-[#041a24]/72 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[0.65fr_1.35fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-coral/20 bg-gradient-to-br from-sand/18 via-coral/12 to-aqua/12 p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-mango/35 blur-2xl" aria-hidden />
              <p className="eyebrow-label">Here&apos;s the move</p>
              <h2 id="day-moves-heading" className="display-type mt-5 text-4xl text-white sm:text-5xl">
                Beach. Boat. Bite. Night.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Start with the feeling, then pick the island. VibeVI should feel like a friend saying,
                “this is the move today,” with the trust labels still clear.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {dayMoves.map((move) => (
                <Link
                  key={move.label}
                  href={move.href}
                  className={`${move.className} island-postcard-card group relative min-h-[220px] overflow-hidden rounded-[1.45rem] border border-white/10 p-5 transition duration-500 hover:-translate-y-1 hover:border-sand/35`}
                >
                  <span className="relative z-10 inline-flex rounded-full border border-white/12 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/78 backdrop-blur-md">
                    {move.label}
                  </span>
                  <div className="relative z-10 mt-16">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{move.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/74">{move.line}</p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-sand/80">{move.motif}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TodayIslandPulse />

      <VibeFilterRail className="pb-20 lg:pb-28" />

      <section className="px-4 pb-20 sm:px-6 lg:pb-28" aria-labelledby="islands-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeader
              eyebrow="Four islands · four different days"
              title="Choose an island. Feel the rhythm."
              description="Four islands. Four different days. Pick the shore that matches the beach, boat, bite, or night you want."
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
        <SectionHeader eyebrow="Plan the next move" title="The island questions people actually ask." description="Reef morning or rum-history afternoon? Ferry hop or boardwalk night? These guides connect the mood to the island, route, and published local businesses." />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/experiences/adventure", "Adventure in the USVI", "Charters, reefs, trails, ferry-aware routes, and inquiry-ready operators."],
            ["/experiences/culture", "Culture in the USVI", "History, music, markets, foodways, etiquette, and local discovery routes."],
            ["/experiences/culinary", "Culinary discovery", "Restaurants, beach bars, local plates, date nights, and direct contact paths."],
            ["/experiences/cruise-day", "Cruise day planner", "One-day port decisions built around scheduled capacity and return buffers."],
            ["/st-thomas/things-to-do", "Things to do in St. Thomas", "Beach, harbor, ferry, cruise-day, and nightlife moves."],
            ["/st-croix/things-to-do", "Things to do in St. Croix", "Christiansted, Frederiksted, Buck Island, food, and reef routes."],
            ["/st-john/things-to-do", "Things to do in St. John", "Ferry timing, national park, beaches, and Cruz Bay."],
            ["/guides/best-beaches-usvi", "Best beaches in the USVI", "Choose by island, access, pace, and the shape of the day."],
            ["/guides/usvi-charters", "USVI charters", "Find published operators and compare the right booking questions."],
            ["/water-island/day-trip", "Water Island day trip", "Build the ferry hop around Honeymoon Beach and the return."],
          ].map(([href, label, detail], index) => (
            <Link key={href} href={href} className="island-postcard-card group rounded-[1.35rem] border border-sand/12 bg-[#062532] p-5 transition hover:-translate-y-1 hover:border-sand/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-sand/60">ISLAND NOTE {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-lg font-semibold text-white group-hover:text-sand">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-white/48">{detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Map the next move"
            title="Find the beach, boat, bite, or night."
            description="See the islands as one connected day. Find what is nearby, then follow the water, road, or ferry."
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
