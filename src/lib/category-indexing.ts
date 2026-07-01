import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import { CODE_TO_SLUG, type IslandSlug } from "@/lib/islands";
import type { CategorySlug } from "@/lib/categories";

const INDEXABLE_CATEGORY_MINIMUMS: Partial<Record<CategorySlug, number>> = {
  attractions: 2,
  "culture-history": 2,
  "tours-activities": 2,
};

export function getCategoryIndexThreshold(categorySlug: CategorySlug): number {
  return INDEXABLE_CATEGORY_MINIMUMS[categorySlug] ?? 1;
}

export function shouldIndexCategoryPage(
  categorySlug: CategorySlug,
  listingCount: number,
): boolean {
  return listingCount >= getCategoryIndexThreshold(categorySlug);
}

export function getPublicInfoCategoryCountByIsland(
  islandSlug: IslandSlug,
  categorySlug: CategorySlug,
): number {
  return PUBLIC_INFO_BUSINESSES.filter(
    (business) =>
      !business.robots_noindex &&
      CODE_TO_SLUG[business.island] === islandSlug &&
      business.category?.slug === categorySlug,
  ).length;
}
