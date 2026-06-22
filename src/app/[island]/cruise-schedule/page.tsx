import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) return { robots: { index: false, follow: false } };

  const name = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/cruise-schedule`;

  return {
    title: `Cruise Schedule — ${name}`,
    description: `Scheduled ship calls and Crowd Predictor for ${name} ports.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function IslandCruiseSchedulePage({ params }: Props) {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) notFound();

  if (islandParam !== "st-thomas" && islandParam !== "st-croix") {
    notFound();
  }

  const name = getIslandName(islandParam as IslandSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">
        Cruise schedule — {name}
      </h1>
      <p className="mt-4 text-archipel-white/70">
        Crowd Predictor dashboard connects in Phase 2.
      </p>
      <p className="mt-6 text-sm text-archipel-white/50">
        Scheduled ship capacity is a planning estimate, not an actual passenger
        count.
      </p>
    </div>
  );
}
