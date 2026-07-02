import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import { CODE_TO_SLUG, type IslandSlug } from "@/lib/islands";
import type { CategorySlug } from "@/lib/categories";

export type IndexableCategorySlug = CategorySlug | "beaches";

const INDEXABLE_CATEGORY_MINIMUMS: Partial<Record<IndexableCategorySlug, number>> = {
  beaches: 2,
  attractions: 2,
  "culture-history": 2,
  "tours-activities": 2,
};

export function getCategoryIndexThreshold(
  categorySlug: IndexableCategorySlug,
): number {
  return INDEXABLE_CATEGORY_MINIMUMS[categorySlug] ?? 1;
}

export function shouldIndexCategoryPage(
  categorySlug: IndexableCategorySlug,
  listingCount: number,
): boolean {
  return listingCount >= getCategoryIndexThreshold(categorySlug);
}

export function getPublicInfoCategoryCountByIsland(
  islandSlug: IslandSlug,
  categorySlug: IndexableCategorySlug,
): number {
  return PUBLIC_INFO_BUSINESSES.filter(
    (business) =>
      !business.robots_noindex &&
      CODE_TO_SLUG[business.island] === islandSlug &&
      business.category?.slug === categorySlug,
  ).length;
}
