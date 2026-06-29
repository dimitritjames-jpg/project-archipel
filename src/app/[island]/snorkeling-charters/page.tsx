import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (!["st-thomas", "st-croix", "st-john"].includes(island)) {
    return { robots: { index: false, follow: false } };
  }

  return {
    title: `Snorkeling & Charters - ${getIslandName(island as IslandSlug)}`,
    description:
      "Discover locally listed snorkeling and charter operators, then plan the rest of the island day.",
    alternates: { canonical: absoluteUrl(`/${island}/snorkeling-charters`) },
    robots: { index: true, follow: true },
  };
}

export default async function SnorkelingChartersPage({ params }: Props) {
  const { island } = await params;
  if (!["st-thomas", "st-croix", "st-john"].includes(island)) notFound();

  const islandName = getIslandName(island as IslandSlug);

  return (
    <PillarPage
      eyebrow="On-water guide"
      title="Snorkeling & Charter Tours"
      island={islandName}
      introduction="Choose the shape of the day before the boat: reef time, sail time, pace, group size, and departure point all change the experience."
      planningNote="Listings help you compare the water-day options; they are not an availability or safety guarantee. Confirm credentials, inclusions, weather policy, accessibility, pickup point, and current conditions directly with each operator."
      highlights={[
        "Operator-direct booking",
        "Weather dependent",
        "Compare inclusions",
        "Confirm departure point",
      ]}
      links={[
        {
          href: `/${island}/excursions-charters`,
          label: "Browse charter listings",
          detail: "Compare the locally listed operators available now.",
        },
        {
          href: `/search?island=${island}&q=tours`,
          label: "See more island tours",
          detail: "Keep the day open to land and water options.",
          accent: "gold",
        },
        {
          href: `/${island}/indulgent-dining`,
          label: "Plan the return ashore",
          detail: "Find a table for after the boat.",
          accent: "coral",
        },
        {
          href: `/${island}`,
          label: `Open ${islandName}`,
          detail: "Return to the complete island guide.",
        },
      ]}
      gradient="from-cyan-300/40 via-midnight-950 to-indigo-500/35"
    />
  );
}
