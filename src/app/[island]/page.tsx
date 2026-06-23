import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { notFound } from "next/navigation";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import { CORE_CATEGORIES } from "@/lib/categories";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { CATEGORY_MEDIA, ISLAND_PORTALS } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ island: string }> };

const ISLAND_DETAILS: Record<
  IslandSlug,
  { coordinate: string; rhythm: string; editorial: string }
> = {
  "st-thomas": {
    coordinate: "18.3419° N · 64.9307° W",
    rhythm: "Harbor energy, ferry choices, cruise-day movement, beach resets, and late-night momentum.",
    editorial: "Build a day from Red Hook to Charlotte Amalie, with Magens Bay as the reset button.",
  },
  "st-croix": {
    coordinate: "17.7246° N · 64.7505° W",
    rhythm: "A wider island canvas: reef depth, food culture, history, and long-road wandering.",
    editorial: "Move between Christiansted, Cane Bay, Frederiksted, and Buck Island without rushing the middle.",
  },
  "st-john": {
    coordinate: "18.3358° N · 64.7354° W",
    rhythm: "National park trails, protected coves, Cruz Bay rhythm, and ferry-timed movement.",
    editorial: "Let the ferry set the clock, then let the park decide the rest of the route.",
  },
  "water-island": {
    coordinate: "18.3181° N · 64.9535° W",
    rhythm: "Small scale, calm water, a ferry hop, and room for the day to stay simple.",
    editorial: "Honeymoon Beach, a slow afternoon, and one of the easiest ways to leave the noise behind.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) return { robots: { index: false, follow: false } };

  const name = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}`;

  return {
    title: `${name} Guide — Things to Do, Beaches & Local Businesses`,
    description: `Find things to do, beaches, boats, dining, nightlife, useful planning tools, and local businesses across ${name}.`,
    alternates: { canonical },
    openGraph: { url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function IslandPage({ params }: Props) {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) notFound();

  const islandSlug = islandParam as IslandSlug;
  const name = getIslandName(islandSlug);
  const portal = ISLAND_PORTALS[islandSlug];
  const details = ISLAND_DETAILS[islandSlug];
  const hasFerry = ["st-thomas", "st-john", "water-island"].includes(islandParam);
  const hasCruise = ["st-thomas", "st-croix"].includes(islandParam);

  const featuredCategory = CORE_CATEGORIES[0];
  const featuredListings = featuredCategory
    ? await fetchPublishedBusinessesByCategory(islandSlug, featuredCategory.slug)
    : [];
  const featuredAreDemo =
    featuredListings.length > 0 &&
    featuredListings.every((business) => business.is_demo);

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} Adventure Hub`,
    url: canonical,
  };

  const utilityLinks = [
    hasFerry ? { label: "Ferry board", href: `/${islandParam}/ferry-schedule`, tone: "aqua" } : null,
    hasCruise ? { label: "Cruise days", href: `/${islandParam}/cruise-schedule`, tone: "coral" } : null,
    { label: "Find the move", href: `/search?island=${islandParam}`, tone: "white" },
    { label: "Map view", href: "/map", tone: "white" },
  ].filter(Boolean) as { label: string; href: string; tone: string }[];

  const guideLinks: Record<IslandSlug, { label: string; href: string; detail: string }[]> = {
    "st-thomas": [
      { label: "Things to do in St. Thomas", href: "/st-thomas/things-to-do", detail: "Build a day from beach, harbor, ferry, and nightlife context." },
      { label: "Cruise day in St. Thomas", href: "/st-thomas/cruise-day", detail: "Plan backward from the ship with honest port-load context." },
      { label: "Magens Bay guide", href: "/st-thomas/magens-bay", detail: "Connect the famous beach to transport and the rest of the day." },
    ],
    "st-croix": [
      { label: "Things to do in St. Croix", href: "/st-croix/things-to-do", detail: "Choose between Christiansted, Frederiksted, reef, and food routes." },
      { label: "Buck Island guide", href: "/st-croix/buck-island", detail: "Plan the boat day and the return to shore." },
      { label: "St. Croix restaurants", href: "/st-croix/indulgent-dining", detail: "Browse published dining profiles across the island." },
    ],
    "st-john": [
      { label: "Things to do in St. John", href: "/st-john/things-to-do", detail: "Route the ferry, park, beaches, and Cruz Bay into one day." },
      { label: "St. John beaches", href: "/st-john/beaches", detail: "Choose by access, pace, snorkeling interest, and return plan." },
      { label: "Best snorkeling in St. John", href: "/st-john/best-snorkeling", detail: "Plan around ability, access, conditions, and local operators." },
    ],
    "water-island": [
      { label: "Water Island day trip", href: "/water-island/day-trip", detail: "Keep the ferry, beach, supplies, and return crossing aligned." },
      { label: "Best beaches in the USVI", href: "/guides/best-beaches-usvi", detail: "Compare beach-day styles across all four islands." },
      { label: "Water Island ferry schedule", href: "/water-island/ferry-schedule", detail: "Review schedule-based directional crossing context." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <MediaBackdrop media={portal.media} overlay="hero" priority className="min-h-[min(78vh,720px)]">
        <div className="section-shell flex min-h-[min(78vh,720px)] flex-col justify-end pb-12 pt-24 sm:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.55fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow-label">Island portal / {details.coordinate}</p>
                <ComingSoonBadge label="Editorial preview" />
              </div>
              <h1 className="display-type mt-6 text-archipel-white">{name}</h1>
              <p className="mt-5 max-w-xl text-lg font-medium text-coral-sunset sm:text-xl">
                {portal.tagline}
              </p>
              <p className="text-pretty mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/65 sm:text-lg">
                {details.rhythm}
              </p>
            </div>

            <div className="command-surface rounded-[1.4rem] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/65">
                Island shortcuts
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-3 text-xs font-semibold text-archipel-white/66 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    {link.label} ↗
                  </Link>
                ))}
              </div>
              <p className="mt-4 border-t border-white/8 pt-4 text-xs leading-relaxed text-archipel-white/40">
                {details.editorial}
              </p>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <div className="section-shell py-14 sm:py-18 lg:py-22">
        <VibeFilterRail className="!px-0" title={`Route ${name} by mood`} />

        <section className="mt-18" aria-labelledby="island-guides-heading">
          <SectionHeader eyebrow="Plan with context" title={`Useful guides for ${name}.`} description="Start with a high-intent guide, then move directly into schedules, directory categories, and published business profiles." />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {guideLinks[islandSlug].map((guide, index) => (
              <Link key={guide.href} href={guide.href} className="command-surface group rounded-[1.35rem] p-5 transition hover:-translate-y-1 hover:border-aqua/25">
                <span className="font-mono text-[9px] text-aqua/55">GUIDE 0{index + 1}</span>
                <h3 className="mt-8 text-lg font-semibold text-white group-hover:text-aqua">{guide.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/48">{guide.detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-18" aria-labelledby="categories-heading">
          <SectionHeader
            eyebrow={`${name} directory`}
            title="Choose the reason you are heading out."
            description="Premium island-day categories shaped around how a beach, boat, bite, or night actually comes together."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_CATEGORIES.map((category, index) => (
              <TrackedLink
                key={category.slug}
                href={`/${islandParam}/${category.slug}`}
                eventName="category_clicked"
                eventProperties={{ island: islandParam, category: category.slug, source: "island_hub" }}
                className="island-card-glow group command-surface relative min-h-[190px] overflow-hidden rounded-[1.4rem] transition duration-500 hover:-translate-y-1 hover:border-aqua/25"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-75 ${CATEGORY_MEDIA[category.slug] ?? "from-cyan-500/30 to-indigo-950"}`}
                  aria-hidden
                />
                <div className="topographic-field absolute inset-0 opacity-45" aria-hidden />
                <div className="relative z-10 flex h-full min-h-[190px] flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-archipel-white/42">
                      {String(index + 1).padStart(2, "0")} / CATEGORY
                    </span>
                    <span className="text-aqua transition group-hover:rotate-45">↗</span>
                  </div>
                  <h3 className="max-w-[12rem] text-xl font-semibold tracking-[-0.04em] text-archipel-white group-hover:text-aqua">
                    {category.name}
                  </h3>
                </div>
              </TrackedLink>
            ))}
          </div>
        </section>

        {featuredListings.length > 0 ? (
          <section className="mt-22" aria-labelledby="featured-heading">
            <SectionHeader
              eyebrow={featuredAreDemo ? "Inventory preview" : "Published launch set"}
              title={featuredAreDemo ? `See how ${name} listings will work.` : `Operators already on the ${name} board.`}
              description={featuredAreDemo ? "Fictional demonstration profiles populate the layout while verified local inventory is collected. They contain no real contact, price, availability, or service claims." : "Preview presentation around published listings. Business-provided details remain the source of truth."}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.slice(0, 3).map((business) => (
                <BusinessPreviewCard key={business.id} business={business} islandSlug={islandParam} launchPreview />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
