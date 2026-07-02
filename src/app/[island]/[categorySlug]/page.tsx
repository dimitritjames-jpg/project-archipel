import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CategoryDirectoryPage,
  generateDirectoryMetadata,
  isDirectoryCategorySlug,
} from "@/components/discovery/category-directory-page";
import { getIslandBySlug, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string; categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug } = await params;

  if (!getIslandBySlug(islandParam) || !isDirectoryCategorySlug(categorySlug)) {
    return { robots: { index: false, follow: false } };
  }

  return generateDirectoryMetadata({
    islandSlug: islandParam as IslandSlug,
    categorySlug,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { island: islandParam, categorySlug } = await params;

  if (!getIslandBySlug(islandParam) || !isDirectoryCategorySlug(categorySlug)) {
    notFound();
  }

  return (
    <CategoryDirectoryPage
      islandSlug={islandParam as IslandSlug}
      categorySlug={categorySlug}
    />
  );
}
