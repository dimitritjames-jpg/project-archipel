import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { HeroMediaSection } from "@/components/home/hero-media-section";
import { IslandSilhouetteCard } from "@/components/home/island-silhouette-card";
import { PartnerClaimCTA } from "@/components/home/partner-claim-cta";
import { TodayIslandPulse } from "@/components/home/today-island-pulse";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";
import { GENERATED_MEDIA_PATHS } from "@/lib/media";
import { absoluteUrl } from "@/lib/site-url";

const homepageCanonical = absoluteUrl("/");

export const metadata: Metadata = {
  title: { absolute: "VibeVI - Find Your Island Vibe" },
  description:
    "Choose your island, then find beaches, boats, bites, nightlife, ferry planning, and local businesses across St. Thomas, St. John, St. Croix, and Water Island.",
  alternates: { canonical: homepageCanonical },
  openGraph: {
    title: "VibeVI - Find Your Island Vibe",
    description:
      "Choose your island, then find beaches, boats, bites, nightlife, ferry planning, and local businesses across St. Thomas, St. John, St. Croix, and Water Island.",
    url: homepageCanonical,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        alt: "VibeVI - Find Your Island Vibe",
      },
    ],
  },
};

const dayMoves = [
  {
    label: "Beach",
    href: "/guides/best-beaches-usvi",
    line: "Find the sand, shade, and water that fit the day.",
    motif: "Reef-blue shallows, towel down, easy swim.",
    className: "beach-day-card",
    imageSrc: GENERATED_MEDIA_PATHS.beachDay,
    imageAlt: "Generated atmospheric beach-day scene with cream sand and turquoise water",
  },
  {
    label: "Boat",
    href: "/search?q=boat",
    line: "Snorkel, beach-hop, or chase the sunset from the water.",
    motif: "Sails, coves, turtles, and one more swim stop.",
    className: "boat-day-card",
    imageSrc: GENERATED_MEDIA_PATHS.boatDay,
    imageAlt: "Generated atmospheric boat-day scene with an unbranded sailboat on turquoise water",
  },
  {
    label: "Bite",
    href: "/experiences/culinary",
    line: "Local plates, boardwalk tables, beach bars, and chef-led nights.",
    motif: "Johnny cakes, pate, fresh fish, rum-bar gold.",
    className: "bite-day-card",
    imageSrc: GENERATED_MEDIA_PATHS.biteWaterfront,
    imageAlt: "Generated atmospheric waterfront dining scene with island plates and golden-hour light",
  },
  {
    label: "Night",
    href: "/st-thomas/nightlife-rhythm",
    line: "Music, rum, waterfront energy, and late moves.",
    motif: "Sunset dinner into harbor lights.",
    className: "night-day-card",
    imageSrc: GENERATED_MEDIA_PATHS.nightBoardwalk,
    imageAlt: "Generated atmospheric waterfront boardwalk night scene with warm lights",
  },
] as const;

const editorialSections = [
  {
    eyebrow: "Eat the island",
    title: "Local plates, beach bars, and sunset tables.",
    body: "Start with salt air and hunger: grilled lobster, pate, johnny cakes, fresh fish, bush tea, rum drinks, brunch, and late-night bites after the music starts.",
    href: "/experiences/culinary",
    cta: "Find a bite",
    accent: "from-mango/38 via-coral/24 to-rum-amber/22",
    items: ["Waterfront tables", "Local plates", "Beach bars", "Rum + sunset drinks"],
    imageSrc: GENERATED_MEDIA_PATHS.biteWaterfront,
    imageAlt: "Generated atmospheric waterfront dining scene for VibeVI culinary discovery",
  },
  {
    eyebrow: "Feel the rhythm",
    title: "Steel pan, soca, reggae, dancehall, DJs, live bands.",
    body: "The Virgin Islands move after dark: harbor nights, Carnival color, boardwalk energy, Red Hook rounds, Christiansted evenings, Cruz Bay ease.",
    href: "/experiences/culture",
    cta: "Follow the rhythm",
    accent: "from-bougainvillea/30 via-violet-500/24 to-mango/22",
    items: ["Carnival color", "Music roots", "Harbor nights", "Local makers"],
    imageSrc: GENERATED_MEDIA_PATHS.cultureStreet,
    imageAlt: "Generated atmospheric island culture street scene with color, market textures, and waterfront light",
  },
  {
    eyebrow: "Pick your water",
    title: "Reef morning, ferry hop, hidden cove, sunset sail.",
    body: "Choose the water before the itinerary gets loud: Magens, Trunk, Honeymoon, Buck Island, Cruz Bay charters, Water Island slow days.",
    href: "/experiences/adventure",
    cta: "Chase the water",
    accent: "from-aqua/42 via-reef-blue/24 to-lime/20",
    items: ["Beach day", "Boat charter", "Snorkel route", "Ferry hop"],
    imageSrc: GENERATED_MEDIA_PATHS.boatDay,
    imageAlt: "Generated atmospheric boat-day scene for VibeVI water discovery",
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

const thingsToDo = [
  ["Sea adventures", "Snorkel, sail, dive, kayak, charter, and chase clear water.", "/experiences/adventure", "things-sea"],
  ["Beaches & coves", "Pick the sand, shade, road, and water that match the day.", "/guides/best-beaches-usvi", "things-beach"],
  ["Food & flavor", "Local plates, seafood, beach bars, rum cocktails, brunch, and late bites.", "/experiences/culinary", "things-food"],
  ["Culture & history", "Carnival, forts, music, foodways, galleries, makers, and markets.", "/experiences/culture", "things-culture"],
  ["Island happenings", "Festival energy, street rhythm, seasonal notes, and local story routes.", "/experiences/culture", "things-happenings"],
  ["Nightlife & rhythm", "Waterfront nights, live music, rum glow, DJs, and late moves.", "/st-thomas/nightlife-rhythm", "things-night"],
  ["Cruise-day moves", "A beach, bite, shop, tour, or cultural stop that fits the port clock.", "/experiences/cruise-day", "things-cruise"],
  ["Ferry hops", "Plan the crossing, make the beach window, and return with margin.", "/st-john/ferry-schedule", "things-ferry"],
  ["Wellness & slow days", "Spa time, quiet beaches, soft mornings, and low-effort island resets.", "/experiences/wellness", "things-wellness"],
  ["Local shops", "Provisions, makers, galleries, small stops, and things worth carrying home.", "/experiences/local-shops", "things-shops"],
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

      <section
        className="homepage-island-chooser px-4 py-14 sm:px-6 lg:py-18"
        aria-labelledby="choose-your-island-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionHeader
              eyebrow="Choose your island"
              title="Start with the shore that fits the day."
              description="Pick St. Thomas, St. John, St. Croix, or Water Island first, then move through only that island's beaches, food, charters, nightlife, shops, wellness, and useful planning context."
              id="choose-your-island-heading"
            />
            <p className="max-w-md justify-self-end text-sm leading-7 text-[#45636a] lg:text-right">
              Harbor pulse, park calm, big-island depth, or ferry-hop ease. Choose the island first, then let VibeVI narrow the day.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ISLAND_SLUGS.map((slug) => (
              <IslandSilhouetteCard key={slug} islandSlug={slug as IslandSlug} />
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-sand-section px-4 py-14 sm:px-6 lg:py-20" aria-labelledby="day-moves-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/64 p-6 shadow-[0_24px_90px_rgba(201,118,47,0.13)] backdrop-blur-md sm:p-8">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-mango/42 blur-2xl" aria-hidden />
              <div className="homepage-mini-media mb-8" aria-hidden />
              <p className="eyebrow-label text-reef-blue">The Virgin Islands, by feeling</p>
              <h2 id="day-moves-heading" className="display-type mt-5 text-4xl text-[#153942] sm:text-5xl">
                Beach. Boat. Bite. Night.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#45636a]">
                Swim the morning, boat the afternoon, eat by the water, and follow the music after dark.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dayMoves.map((move) => (
                <Link
                  key={move.label}
                  href={move.href}
                  className={`${move.className} island-vibe-poster group relative flex min-h-[330px] flex-col overflow-hidden rounded-[2rem] border border-white/55 p-5 shadow-[0_26px_80px_rgba(7,151,166,0.16)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_110px_rgba(7,151,166,0.22)]`}
                >
                  <Image
                    src={move.imageSrc}
                    alt={move.imageAlt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1280px) 44vw, 22vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/24 to-white/8" aria-hidden />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <span className="inline-flex self-start rounded-full border border-white/60 bg-white/72 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#143740]/88 backdrop-blur-md">
                      {move.label}
                    </span>
                    <div className="mt-auto flex min-h-[11.5rem] flex-col justify-start">
                      <h3 className="text-4xl font-semibold tracking-[-0.06em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.22)]">{move.label}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/88 drop-shadow">{move.line}</p>
                      <p className="mt-5 text-[11px] font-black uppercase tracking-[0.14em] text-white/86">{move.motif}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-things-section px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="things-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <SectionHeader
              eyebrow="Things to do in the USVI"
              title="Start outside, then follow the island."
              description="Use VibeVI like a local island-day board: pick one strong move, choose the right shore, then confirm the details before you go."
              id="things-heading"
            />
            <p className="max-w-md justify-self-end text-sm leading-7 text-[#45636a] lg:text-right">
              Beaches, boats, bites, Carnival color, history, markets, rum, music, ferry hops, and cruise-day moves across St. Thomas, St. Croix, St. John, and Water Island.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {thingsToDo.map(([title, body, href, className]) => (
              <Link
                key={title}
                href={href}
                className={`${className} things-to-do-card group relative min-h-[250px] overflow-hidden rounded-[1.7rem] border border-white/60 p-5 shadow-[0_24px_80px_rgba(7,151,166,0.14)] transition hover:-translate-y-1.5 hover:border-white/90`}
              >
                <div className="things-card-art" aria-hidden />
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h3 className="text-2xl font-semibold tracking-[-0.055em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.24)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/86 drop-shadow">{body}</p>
                  <span className="mt-5 text-[11px] font-black uppercase tracking-[0.16em] text-white/78">
                    Open guide &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-postcard-finder px-4 py-14 sm:px-6 lg:py-16" aria-labelledby="finder-heading">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] border border-white/70 bg-white/62 p-5 shadow-[0_28px_100px_rgba(7,151,166,0.14)] backdrop-blur-md sm:p-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="eyebrow-label text-reef-blue">Island finder</p>
            <h2 id="finder-heading" className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#173941] sm:text-4xl">
              Already know the mood? Find the move.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#496871]">
              Search by beach, boat, bite, island, town, ferry hop, or night out.
            </p>
          </div>
          <div className="min-w-0">
            <HomeSearchBar />
            <VibeFilterRail className="px-0 pt-5 text-[#18363d]" title="Choose the feeling" />
          </div>
        </div>
      </section>

      <section className="homepage-water-section px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="culture-food-water">
        <div className="mx-auto max-w-7xl">
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
                className={`island-editorial-card group relative min-h-[430px] overflow-hidden rounded-[2rem] border border-white/55 bg-gradient-to-br ${section.accent} p-5 shadow-[0_26px_86px_rgba(7,151,166,0.14)] transition hover:-translate-y-1 hover:border-white/80`}
              >
                <div className="editorial-media-frame">
                  <Image
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/12" aria-hidden />
                </div>
                <div className="relative z-10 mt-6 rounded-[1.5rem] border border-white/45 bg-white/62 p-5 backdrop-blur-md">
                  <p className="eyebrow-label text-reef-blue">{section.eyebrow}</p>
                  <h3 className="mt-5 max-w-sm text-3xl font-semibold tracking-[-0.055em] text-[#173941]">{section.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#425f66]">{section.body}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span key={item} className="rounded-full border border-reef-blue/12 bg-white/58 px-3 py-1.5 text-[11px] text-[#41616a]">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="mt-7 inline-flex text-sm font-bold text-[#0a7582] transition group-hover:text-coral-sunset">
                    {section.cta} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TodayIslandPulse />

      <section className="homepage-night-section px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="tonight-heading">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeader
            eyebrow="Tonight's move"
            title="When the sun drops, the island changes tempo."
            description="Water first, dinner after. Then choose the boardwalk, the harbor, the rum bar, the band, or the slow ride home."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {tonightMoves.map(([title, body, href]) => (
              <Link key={title} href={href} className="island-postcard-card rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#351946] via-[#190f2c] to-[#6f3b1b] p-5 shadow-[0_24px_70px_rgba(39,20,53,0.28)] transition hover:-translate-y-1 hover:border-coral/30">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-coral-sunset/70">After dark</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-sand-section px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="stories-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="The island stories"
            title="Go beyond the postcard."
            description="The best day has a story in it: a fort wall, a maker, a plate, a drumline, a cove, a ferry conversation, a sunset you did not plan."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {islandStories.map(([title, body, href]) => (
              <Link key={title} href={href} className="island-story-card rounded-[1.65rem] border border-white/70 bg-white/62 p-6 shadow-[0_20px_70px_rgba(201,118,47,0.12)] transition hover:-translate-y-1 hover:border-rum-amber/25">
                <div className="story-photo-strip" aria-hidden />
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-rum-amber/80">Story route</p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-[#173941]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#46646c]">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-water-section px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="today-guides-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What to do today"
            title="Pick the mood, then make the island day."
            description="Reef morning or rum-history afternoon? Ferry hop or boardwalk night? These guides connect the feeling to the island, route, and published local businesses."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planningGuides.map(([href, label, detail], index) => (
              <Link key={href} href={href} className="guide-image-card group rounded-[1.45rem] border border-white/70 bg-white/66 p-4 shadow-[0_20px_70px_rgba(7,151,166,0.12)] transition hover:-translate-y-1 hover:border-reef-blue/30">
                <div className="guide-media-frame" aria-hidden />
                <span className="mt-4 block text-[9px] font-black uppercase tracking-[0.18em] text-reef-blue/72">ISLAND NOTE {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-semibold text-[#173941] group-hover:text-reef-blue">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#496871]">{detail}</p>
              </Link>
            ))}
          </div>
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

