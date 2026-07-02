import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CategoryDirectoryPage,
  generateDirectoryMetadata,
} from "@/components/discovery/category-directory-page";
import { SeoGuidePage } from "@/components/discovery/seo-guide-page";
import { guideMetadata, ISLAND_GUIDES } from "@/lib/guides";
import { getIslandBySlug, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  const guide = ISLAND_GUIDES[`${island}/beaches`];

  if (guide) {
    return guideMetadata(guide);
  }

  if (!getIslandBySlug(island)) {
    return { robots: { index: false, follow: false } };
  }

  return generateDirectoryMetadata({
    islandSlug: island as IslandSlug,
    categorySlug: "beaches",
  });
}

export default async function BeachesPage({ params }: Props) {
  const { island } = await params;
  const guide = ISLAND_GUIDES[`${island}/beaches`];

  if (guide) {
    return <SeoGuidePage guide={guide} />;
  }

  if (!getIslandBySlug(island)) {
    notFound();
  }

  return (
    <CategoryDirectoryPage
      islandSlug={island as IslandSlug}
      categorySlug="beaches"
    />
  );
}
