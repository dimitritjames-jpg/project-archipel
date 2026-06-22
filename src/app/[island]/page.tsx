import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CORE_CATEGORIES } from "@/lib/categories";
import { env } from "@/lib/env";
import {
  getIslandBySlug,
  getIslandName,
  type IslandSlug,
} from "@/lib/islands";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) return { robots: { index: false, follow: false } };

  const name = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}`;

  return {
    title: `${name} — Businesses & Planning`,
    description: `Discover curated businesses, ferry schedules, and cruise planning for ${name}.`,
    alternates: { canonical },
    openGraph: { url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function IslandPage({ params }: Props) {
  const { island: islandParam } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) notFound();

  const name = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} Directory`,
    url: canonical,
    isPartOf: { "@id": `${env.NEXT_PUBLIC_SITE_URL}/#website` },
  };

  const hasFerry =
    islandParam === "st-thomas" ||
    islandParam === "st-john" ||
    islandParam === "water-island";
  const hasCruise = islandParam === "st-thomas" || islandParam === "st-croix";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold text-archipel-white">{name}</h1>
        <p className="mt-4 max-w-2xl text-archipel-white/70">
          Curated directory and daily utilities for {name}.
        </p>

        {(hasFerry || hasCruise) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {hasFerry && (
              <Link
                href={`/${islandParam}/ferry-schedule`}
                className="glass-panel rounded-full px-4 py-2 text-sm text-archipel-white"
              >
                Ferry schedule
              </Link>
            )}
            {hasCruise && (
              <Link
                href={`/${islandParam}/cruise-schedule`}
                className="glass-panel rounded-full px-4 py-2 text-sm text-archipel-white"
              >
                Cruise schedule
              </Link>
            )}
          </div>
        )}

        <h2 className="mt-12 text-xl font-medium text-archipel-white">Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${islandParam}/${category.slug}`}
              className="glass-panel rounded-xl p-5 transition hover:border-white/20"
            >
              <h3 className="font-medium text-archipel-white">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
