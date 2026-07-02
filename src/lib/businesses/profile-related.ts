import { CODE_TO_SLUG, getIslandName } from "@/lib/islands";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { getListingPlanningTags } from "@/lib/businesses/planning-tags";

export type RelatedProfileLink = {
  href: string;
  name: string;
  islandName: string;
  categoryName: string;
  summary: string;
};

export type ProfileRelatedLinks = {
  sameCategory: RelatedProfileLink[];
  similarIntent: RelatedProfileLink[];
};

const CATEGORY_INTENT_CLUSTERS: Record<string, string[]> = {
  beaches: ["attractions", "excursions-charters", "tours-activities", "indulgent-dining"],
  "excursions-charters": ["tours-activities", "attractions", "beaches"],
  "tours-activities": ["excursions-charters", "attractions", "culture-history"],
  attractions: ["tours-activities", "culture-history", "beaches"],
  "culture-history": ["attractions", "tours-activities", "local-provisions"],
  "indulgent-dining": ["nightlife-rhythm", "local-provisions", "beaches"],
  "nightlife-rhythm": ["indulgent-dining", "local-provisions", "attractions"],
  "local-provisions": ["indulgent-dining", "culture-history", "attractions"],
  "wellness-spas": ["boutique-stays", "beaches", "attractions"],
  "boutique-stays": ["wellness-spas", "indulgent-dining", "beaches"],
};

function truncateSummary(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= 120) return normalized;
  return `${normalized.slice(0, 117).trimEnd()}...`;
}

function toRelatedLink(business: PublishedBusinessRow): RelatedProfileLink {
  const islandSlug = CODE_TO_SLUG[business.island];

  return {
    href: `/${islandSlug}/${business.category?.slug ?? "directory"}/${business.slug}`,
    name: business.name,
    islandName: getIslandName(islandSlug),
    categoryName: business.category?.name ?? "Directory",
    summary: truncateSummary(business.description_plain),
  };
}

export function buildProfileRelatedLinks({
  business,
  categoryBusinesses,
  islandBusinesses,
}: {
  business: PublishedBusinessRow;
  categoryBusinesses: PublishedBusinessRow[];
  islandBusinesses: PublishedBusinessRow[];
}): ProfileRelatedLinks {
  const sameCategory = categoryBusinesses
    .filter((candidate) => candidate.slug !== business.slug && !candidate.is_demo)
    .slice(0, 3)
    .map(toRelatedLink);

  const currentCategorySlug = business.category?.slug ?? "";
  const relatedCategories = CATEGORY_INTENT_CLUSTERS[currentCategorySlug] ?? [];
  const currentPlanningTags = new Set(
    getListingPlanningTags(business).map((tag) => tag.label),
  );

  const similarIntent = islandBusinesses
    .filter((candidate) => candidate.slug !== business.slug && !candidate.is_demo)
    .map((candidate) => {
      const candidateCategorySlug = candidate.category?.slug ?? "";
      const candidateTags = getListingPlanningTags(candidate).map((tag) => tag.label);
      const sharedTagCount = candidateTags.filter((tag) =>
        currentPlanningTags.has(tag),
      ).length;
      const categoryMatch = relatedCategories.includes(candidateCategorySlug) ? 2 : 0;
      const sameIslandBoost = candidate.island === business.island ? 1 : 0;

      return {
        candidate,
        score: sharedTagCount * 3 + categoryMatch + sameIslandBoost,
      };
    })
    .filter(({ candidate, score }) => {
      if (sameCategory.some((link) => link.href.endsWith(`/${candidate.slug}`))) {
        return false;
      }

      if (candidate.island !== business.island) {
        return false;
      }

      return score > 0;
    })
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.candidate.name.localeCompare(right.candidate.name);
    })
    .slice(0, 3)
    .map(({ candidate }) => toRelatedLink(candidate));

  return {
    sameCategory,
    similarIntent,
  };
}
