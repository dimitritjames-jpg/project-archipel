import Image from "next/image";
import Link from "next/link";
import { GENERATED_MEDIA_PATHS } from "@/lib/media";
import styles from "./vibevi-homepage-render-v2.module.css";

const quickLinks = [
  ["Beaches", "/guides/best-beaches-usvi", "🏝"],
  ["Boat Day", "/guides/usvi-charters", "⛵"],
  ["Bites", "/experiences/culinary", "🍴"],
  ["Nightlife", "/experiences/nightlife", "♫"],
  ["Cruise Day", "/experiences/cruise-day", "🛳"],
  ["Ferry", "/ferry", "⛴"],
  ["Map", "/map", "⌖"],
  ["Get Listed", "/get-listed", "▣"],
] as const;

const heroChips = [
  ["Beaches", "/guides/best-beaches-usvi"],
  ["Boat Day", "/guides/usvi-charters"],
  ["Bites", "/experiences/culinary"],
  ["Nightlife", "/experiences/nightlife"],
  ["Cruise Day", "/experiences/cruise-day"],
] as const;

const primaryMoves = [
  {
    label: "Beach",
    href: "/guides/best-beaches-usvi",
    image: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Warm Caribbean beach day with calm turquoise water and natural palm shade",
    eyebrow: "Sand · shade · swim",
    title: "Find the beach that fits today.",
  },
  {
    label: "Boat",
    href: "/guides/usvi-charters",
    image: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Unbranded boat day scene on turquoise Caribbean water",
    eyebrow: "Charters · coves · snorkel",
    title: "Get on the water without guessing.",
  },
  {
    label: "Bite",
    href: "/experiences/culinary",
    image: GENERATED_MEDIA_PATHS.biteWaterfront,
    alt: "Warm waterfront island dining scene at golden hour",
    eyebrow: "Food · rum · sunset",
    title: "Local plates, beach bars, sunset tables.",
  },
  {
    label: "Night",
    href: "/experiences/nightlife",
    image: GENERATED_MEDIA_PATHS.nightBoardwalk,
    alt: "Warm waterfront night scene with island lights and music energy",
    eyebrow: "Music · bars · late plates",
    title: "Follow the rhythm after dark.",
  },
] as const;

const vibeTiles = [
  ["Adventure", "Reefs, trails, kayaks, charters", "/experiences/adventure", GENERATED_MEDIA_PATHS.boatDay],
  ["Relax", "Soft beach mornings and slow resets", "/experiences/wellness", GENERATED_MEDIA_PATHS.beachDay],
  ["Culture", "Music, markets, history, makers", "/experiences/culture", GENERATED_MEDIA_PATHS.cultureStreet],
  ["Foodie", "Chef-led nights and local flavor", "/experiences/culinary", GENERATED_MEDIA_PATHS.biteWaterfront],
  ["Party", "DJs, bars, dance floors, late bites", "/experiences/nightlife", GENERATED_MEDIA_PATHS.nightBoardwalk],
  ["Family", "Easy beaches, ferry hops, simple plans", "/search?vibe=family", GENERATED_MEDIA_PATHS.heroIslandSunrise],
] as const;

const islandCards = [
  {
    name: "St. Thomas",
    href: "/st-thomas",
    body: "Harbor movement, hills, beaches, food, shopping, boats, and night energy.",
    image: GENERATED_MEDIA_PATHS.heroIslandSunrise,
  },
  {
    name: "St. John",
    href: "/st-john",
    body: "National park calm, trails, coves, reef days, and Cruz Bay ease.",
    image: GENERATED_MEDIA_PATHS.beachDay,
  },
  {
    name: "St. Croix",
    href: "/st-croix",
    body: "Food culture, history, boardwalk rhythm, reef depth, and local soul.",
    image: GENERATED_MEDIA_PATHS.cultureStreet,
  },
  {
    name: "Water Island",
    href: "/water-island",
    body: "Small-island pace, ferry day, quiet coves, golf carts, and simple beach escape.",
    image: GENERATED_MEDIA_PATHS.beachDay,
  },
] as const;

export function VibeVIHomepageRenderV2() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src={GENERATED_MEDIA_PATHS.heroIslandSunrise}
          alt="Warm U.S. Virgin Islands coastline with turquoise water, green hills, and soft sunlight"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroWash} />
        <nav className={styles.nav} aria-label="Homepage navigation">
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>VI</span>
            <span className={styles.brandText}>
              <strong>VibeVI</strong>
              <small>Find Your Island Vibe</small>
            </span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/search">Search</Link>
            <Link href="/map">Map</Link>
            <Link href="/experiences/adventure">Experiences</Link>
            <Link href="/get-listed" className={styles.navCta}>
              Get Listed
            </Link>
          </div>
        </nav>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>The U.S. Virgin Islands, by feeling</p>
            <h1>Find Your Island Vibe.</h1>
            <p className={styles.lede}>
              Beach mornings, boat days, local plates, ferry hops, sunset tables,
              and music after dark — planned with real island rhythm.
            </p>
            <div className={styles.searchCard} role="search" aria-label="Find your island move">
              <div className={styles.searchCell}>
                <span>What are you feeling?</span>
                <strong>Beach, boat, bite, nightlife...</strong>
              </div>
              <div className={styles.searchCell}>
                <span>Where?</span>
                <strong>St. Thomas, St. John, St. Croix...</strong>
              </div>
              <Link href="/search" className={styles.searchButton}>
                Find the Move
              </Link>
            </div>
            <div className={styles.heroChips} aria-label="Popular discovery links">
              {heroChips.map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <aside className={styles.floatPanel} aria-label="Today's island board">
            <p>Today&apos;s island board</p>
            <strong>Beach. Boat. Bite. Night.</strong>
            <span>
              Pick one strong move, choose the right shore, then confirm the details before you go.
            </span>
          </aside>
        </div>
      </section>

      <section className={styles.railWrap} aria-label="Quick categories">
        <div className={styles.quickRail}>
          {quickLinks.map(([label, href, icon]) => (
            <Link href={href} key={label}>
              <span aria-hidden>{icon}</span>
              <strong>{label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.splitHeader}>
          <div>
            <p className={styles.eyebrow}>Start with the move</p>
            <h2>Beach. Boat. Bite. Night.</h2>
          </div>
          <p>
            VibeVI should feel like opening the island day board — not scrolling a generic travel directory.
          </p>
        </div>
        <div className={styles.moveGrid}>
          {primaryMoves.map((move) => (
            <Link href={move.href} className={styles.moveCard} key={move.label}>
              <Image
                src={move.image}
                alt={move.alt}
                fill
                sizes="(max-width: 768px) 92vw, 25vw"
                className={styles.cardImage}
              />
              <div className={styles.cardShade} />
              <div className={styles.moveContent}>
                <span>{move.eyebrow}</span>
                <h3>{move.label}</h3>
                <p>{move.title}</p>
                <b aria-hidden>→</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.vibeSection}>
        <div className={styles.vibeIntro}>
          <p className={styles.eyebrow}>What&apos;s your vibe?</p>
          <h2>Choose the day by mood.</h2>
          <p>
            Adventure, reset, culture, food, family, or late-night energy — start with the feeling and route from there.
          </p>
        </div>
        <div className={styles.vibeGrid}>
          {vibeTiles.map(([title, body, href, image]) => (
            <Link href={href} className={styles.vibeCard} key={title}>
              <Image src={image} alt="" fill sizes="(max-width: 768px) 45vw, 16vw" className={styles.cardImage} />
              <div className={styles.vibeShade} />
              <div className={styles.vibeText}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.islandSection}>
        <div className={styles.islandIntro}>
          <p className={styles.eyebrow}>Four islands, different rhythm</p>
          <h2>Pick the island that matches the day.</h2>
        </div>
        <div className={styles.islandGrid}>
          {islandCards.map((island) => (
            <Link href={island.href} className={styles.islandCard} key={island.name}>
              <Image src={island.image} alt="" width={680} height={430} className={styles.islandImage} />
              <div>
                <h3>{island.name}</h3>
                <p>{island.body}</p>
                <span>Explore {island.name} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.businessBand}>
        <div>
          <p className={styles.eyebrow}>For local businesses</p>
          <h2>Get listed. Get found.</h2>
          <p>
            VibeVI is built for the people who make the island move — owners, captains,
            chefs, bartenders, guides, makers, and local teams.
          </p>
        </div>
        <Link href="/get-listed">Claim or add your listing</Link>
      </section>
    </main>
  );
}
