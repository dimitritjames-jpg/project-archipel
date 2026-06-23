import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
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
    line: "Find the sand, shade, and water that fit the day.",
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
    motif: "Johnny cakes, pate, fresh fish, rum-bar gold.",
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

const editorialSections = [
  {
    eyebrow: "Eat the island",
    title: "Local plates, beach bars, and sunset tables.",
    body: "Start with salt air and hunger: grilled lobster, pate, johnny cakes, fresh fish, bush tea, rum drinks, brunch, and late-night bites after the music starts.",
    href: "/experiences/culinary",
    cta: "Find a bite",
    accent: "from-mango/24 via-coral/16 to-rum-amber/18",
    items: ["Waterfront tables", "Local plates", "Beach bars", "Rum + sunset drinks"],
  },
  {
    eyebrow: "Feel the rhythm",
    title: "Steel pan, soca, reggae, dancehall, DJs, live bands.",
    body: "The Virgin Islands move after dark: harbor nights, Carnival color, boardwalk energy, Red Hook rounds, Christiansted evenings, Cruz Bay ease.",
    href: "/experiences/culture",
    cta: "Follow the rhythm",
    accent: "from-bougainvillea/22 via-violet-500/18 to-mango/16",
    items: ["Carnival color", "Music roots", "Harbor nights", "Local makers"],
  },
  {
    eyebrow: "Pick your water",
    title: "Reef morning, ferry hop, hidden cove, sunset sail.",
    body: "Choose the water before the itinerary gets loud: Magens, Trunk, Honeymoon, Buck Island, Cruz Bay charters, Water Island slow days.",
    href: "/experiences/adventure",
    cta: "Chase the water",
    accent: "from-aqua/24 via-reef-blue/20 to-lime/12",
    items: ["Beach day", "Boat charter", "Snorkel route", "Ferry hop"],
  },
] as const;

const tonightMoves = [
  ["Boardwalk night", "Dinner, rum, waterfront tables, and a slow walk under harbor lights.", "/experiences/culinary"],
  ["Red Hook after dark", "Beach day fades into music, late plates, and East End energy.", "/st-thomas/nightlife-rhythm"],
  ["Christiansted evening", "History, courtyards, food, and boardwalk rhythm in one walkable night.", "/st-croix/things-to-do"],
  ["Cruz Bay landing", "Ferry in, swim hard, eat close, keep the night simple.", "/st-john/things-to-do"],
] as const;

const islandStories = [
  ["Rum-history afternoon", "St. Croix forts, distilleries, foodways, and the feeling of old streets near blue water.", "/experiences/culture"],
  ["Hidden-cove curiosity", "Use VibeVI like a field note: what beach fits the wind, the road, the group, and the hour?", "/guides/best-beaches-usvi"],
  ["Market and maker trail", "Local provisions, craft, art, galleries, and small stops that make the day feel rooted.", "/experiences/culture"],
] as const;

const planningGuides = [
  ["/experiences/adventure", "Adventure in the USVI", "Charters, reefs, trails, ferry-aware routes, and water-first days."],
  ["/experiences/culture", "Culture in the USVI", "Carnival color, music, forts, markets, foodways, makers, and island stories."],
  ["/experiences/culinary", "Bite in the USVI", "Restaurants, beach bars, local plates, date nights, brunch, rum, and late-night rhythm."],
  ["/experiences/cruise-day", "Cruise-day moves", "One-day port choices around beach, food, shopping, tours, and a safe return buffer."],
  ["/st-thomas/things-to-do", "Things to do in St. Thomas", "Magens, Red Hook, Charlotte Amalie, cruise-day flow, and nightlife moves."],
  ["/st-croix/things-to-do", "Things to do in St. Croix", "Christiansted, Frederiksted, Buck Island, rum, food, history, and reef routes."],
  ["/st-john/things-to-do", "Things to do in St. John", "Ferry timing, national park, coves, Cruz Bay, beaches, and snorkeling."],
  ["/water-island/day-trip", "Water Island day trip", "Build the ferry hop around Honeymoon Beach, a golf cart, and the slow return."],
] as const;

export default function HomePage() {
  return (
    <>
      <HeroMediaSection />

      <VibeFilterRail className="py-10 lg:py-12" title="Choose the feeling" />

      <section className="section-shell py-12 lg:py-16" aria-labelledby="day-moves-heading">
        <div className="rounded-[2.2rem] border border-sand/18 bg-[#041a24]/72 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[0.65fr_1.35fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-coral/20 bg-gradient-to-br from-sand/18 via-coral/12 to-aqua/12 p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-mango/35 blur-2xl" aria-hidden />
              <p className="eyebrow-label">The Virgin Islands, by feeling</p>
              <h2 id="day-moves-heading" className="display-type mt-5 text-4xl text-white sm:text-5xl">
                Beach. Boat. Bite. Night.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/68">
                Swim the morning, boat the afternoon, eat by the water, and follow the music after dark.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {dayMoves.map((move) => (
                <Link
                  key={move.label}
                  href={move.href}
                  className={`${move.className} island-postcard-card group relative min-h-[230px] overflow-hidden rounded-[1.45rem] border border-white/10 p-5 transition duration-500 hover:-translate-y-1 hover:border-sand/35`}
                >
                  <span className="relative z-10 inline-flex rounded-full border border-white/12 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/78 backdrop-blur-md">
                    {move.label}
                  </span>
                  <div className="relative z-10 mt-16">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{move.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/76">{move.line}</p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-sand/84">{move.motif}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 lg:py-24" aria-labelledby="culture-food-water">
        <SectionHeader
          eyebrow="Island moodboard"
          title="Food, rhythm, water, story."
          description="VibeVI starts with what you can feel, taste, hear, and follow across St. Thomas, St. Croix, St. John, and Water Island."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {editorialSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className={`island-postcard-card group relative min-h-[360px] overflow-hidden rounded-[1.8rem] border border-sand/12 bg-gradient-to-br ${section.accent} p-6 transition hover:-translate-y-1 hover:border-sand/35`}
            >
              <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-sand/12 blur-2xl" aria-hidden />
              <p className="eyebrow-label">{section.eyebrow}</p>
              <h3 className="mt-6 max-w-sm text-3xl font-semibold tracking-[-0.055em] text-white">{section.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/66">{section.body}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] text-white/70">
                    {item}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-6 left-6 text-sm font-semibold text-sand transition group-hover:text-aqua">
                {section.cta} ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <TodayIslandPulse />

      <section className="section-shell py-16 lg:py-24" aria-labelledby="tonight-heading">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeader
            eyebrow="Tonight's move"
            title="When the sun drops, the island changes tempo."
            description="Water first, dinner after. Then choose the boardwalk, the harbor, the rum bar, the band, or the slow ride home."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {tonightMoves.map(([title, body, href]) => (
              <Link key={title} href={href} className="island-postcard-card rounded-[1.35rem] border border-sand/12 bg-[#120b1f] p-5 transition hover:-translate-y-1 hover:border-coral/30">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-coral-sunset/70">After dark</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 lg:py-24" aria-labelledby="stories-heading">
        <SectionHeader
          eyebrow="The island stories"
          title="Go beyond the postcard."
          description="The best day has a story in it: a fort wall, a maker, a plate, a drumline, a cove, a ferry conversation, a sunset you did not plan."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {islandStories.map(([title, body, href]) => (
            <Link key={title} href={href} className="island-postcard-card rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-sand/30">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sand/65">Story route</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.05em] text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="islands-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <SectionHeader
              eyebrow="Four islands · four different days"
              title="Choose your island."
              description="St. Thomas moves fast. St. John opens into the park. St. Croix stretches deeper. Water Island keeps the day small in the best way."
            />
            <p className="max-w-md justify-self-end text-sm leading-relaxed text-archipel-white/48 lg:text-right">
              Harbor nights, rum-history afternoons, national park coves, ferry hops, golf carts, boardwalk tables, and hidden water.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {ISLAND_SLUGS.map((slug) => (
              <IslandPortalCard key={slug} islandSlug={slug as IslandSlug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 lg:py-24" aria-labelledby="today-guides-heading">
        <SectionHeader
          eyebrow="What to do today"
          title="Pick the mood, then make the island day."
          description="Reef morning or rum-history afternoon? Ferry hop or boardwalk night? These guides connect the feeling to the island, route, and published local businesses."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planningGuides.map(([href, label, detail], index) => (
            <Link key={href} href={href} className="island-postcard-card group rounded-[1.35rem] border border-sand/12 bg-[#062532] p-5 transition hover:-translate-y-1 hover:border-sand/30">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-sand/60">ISLAND NOTE {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-lg font-semibold text-white group-hover:text-sand">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-white/50">{detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Map the next move"
            title="See the islands as one connected day."
            description="Find what is nearby, then follow the water, road, or ferry."
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
