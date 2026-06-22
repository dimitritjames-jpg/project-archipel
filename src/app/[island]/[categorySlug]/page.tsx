import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/categories";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string; categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) return { robots: { index: false, follow: false } };

  const islandName = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}`;

  return {
    title: `${category.name} in ${islandName}`,
    description: `${category.name} businesses and experiences in ${islandName}.`,
    alternates: { canonical },
    openGraph: { url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) notFound();

  const islandName = getIslandName(islandParam as IslandSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">
        {category.name} in {islandName}
      </h1>
      <p className="mt-4 text-archipel-white/70">
        Directory listings will load from Supabase and Algolia in Phase 2.
      </p>
    </div>
  );
}
