import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IslandPortalLayout } from "@/components/facelift/island-portal-layout";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import { CORE_CATEGORIES } from "@/lib/categories";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
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
    hasFerry ? { label: "Ferry board", href: `/${islandParam}/ferry-schedule` } : null,
    hasCruise ? { label: "Cruise days", href: `/${islandParam}/cruise-schedule` } : null,
    { label: "Find the move", href: `/search?island=${islandParam}` },
    { label: "Map view", href: "/map" },
  ].filter(Boolean) as { label: string; href: string }[];

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
      <IslandPortalLayout
        islandSlug={islandSlug}
        islandParam={islandParam}
        details={details}
        utilityLinks={utilityLinks}
        guideLinks={guideLinks[islandSlug]}
        featuredListings={featuredListings}
        featuredAreDemo={featuredAreDemo}
      />
    </>
  );
}
