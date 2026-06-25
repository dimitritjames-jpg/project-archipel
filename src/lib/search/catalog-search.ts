import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";
import {
  getExpandedSearchTerms,
  getGuideShortcuts,
  guideShortcutToSearchFields,
  isGuideStyleQuery,
  normalizeSearchText,
  type GuideShortcut,
} from "@/lib/search/query-expansion";

export type LocalSearchResult = {
  id: string;
  name: string;
  slug: string;
  island: IslandCode;
  islandSlug: string;
  islandName: string;
  descriptionPlain: string;
  categorySlug: string | null;
  categoryName: string | null;
  href: string;
};

const SCORE_NAME_EXACT = 100;
const SCORE_NAME = 80;
const SCORE_CATEGORY = 60;
const SCORE_ISLAND = 40;
const SCORE_DESCRIPTION = 20;
const SCORE_GUIDE = 15;

const CATEGORY_BOOSTS: Record<string, string[]> = {
  night: ["nightlife-rhythm"],
  nightlife: ["nightlife-rhythm"],
  wellness: ["wellness-spas"],
  shops: ["local-provisions"],
  "local shops": ["local-provisions"],
  ferry: ["local-provisions"],
};

function getIslandLabel(code: IslandCode): string {
  return ISLAND_MAP[CODE_TO_SLUG[code]].name;
}

function toSearchResult(
  row: {
    id: string;
    name: string;
    slug: string;
    island: IslandCode;
    description_plain: string;
    category?: PublishedBusinessRow["category"];
    categorySlug?: string | null;
    categoryName?: string | null;
  },
): LocalSearchResult {
  const categorySlug = row.categorySlug ?? row.category?.slug ?? null;
  const categoryName = row.categoryName ?? row.category?.name ?? null;
  const islandSlug = CODE_TO_SLUG[row.island];
  const href = categorySlug
    ? `/${islandSlug}/${categorySlug}/${row.slug}`
    : `/${islandSlug}`;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    island: row.island,
    islandSlug,
    islandName: getIslandLabel(row.island),
    descriptionPlain: row.description_plain,
    categorySlug,
    categoryName,
    href,
  };
}

function guideToSearchResult(shortcut: GuideShortcut): LocalSearchResult {
  const islandSlug = CODE_TO_SLUG[shortcut.island];
  return {
    id: shortcut.id,
    name: shortcut.name,
    slug: shortcut.slug,
    island: shortcut.island,
    islandSlug,
    islandName: getIslandLabel(shortcut.island),
    descriptionPlain: shortcut.descriptionPlain,
    categorySlug: null,
    categoryName: shortcut.categoryName,
    href: shortcut.href,
  };
}

function businessSearchFields(business: PublishedBusinessRow): {
  name: string;
  slug: string;
  islandCode: string;
  islandSlug: string;
  islandName: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  address: string;
  sourceUrls: string;
} {
  const islandSlug = CODE_TO_SLUG[business.island];
  const islandName = getIslandLabel(business.island);

  return {
    name: normalizeSearchText(business.name),
    slug: normalizeSearchText(business.slug),
    islandCode: normalizeSearchText(business.island),
    islandSlug: normalizeSearchText(islandSlug),
    islandName: normalizeSearchText(islandName),
    categorySlug: normalizeSearchText(business.category?.slug ?? ""),
    categoryName: normalizeSearchText(business.category?.name ?? ""),
    description: normalizeSearchText(business.description_plain),
    address: normalizeSearchText(business.street_address ?? ""),
    sourceUrls: normalizeSearchText((business.source_urls ?? []).join(" ")),
  };
}

function scoreBusinessMatch(
  business: PublishedBusinessRow,
  normalizedQuery: string,
  terms: string[],
): number {
  const fields = businessSearchFields(business);
  let score = 0;

  if (fields.name === normalizedQuery) {
    score = Math.max(score, SCORE_NAME_EXACT);
  }

  if (fields.name.includes(normalizedQuery)) {
    score = Math.max(score, SCORE_NAME);
  }

  for (const term of terms) {
    if (term.length < 2) continue;

    if (fields.name.includes(term)) {
      score = Math.max(score, SCORE_NAME);
    }

    if (fields.slug.includes(term)) {
      score = Math.max(score, SCORE_NAME - 5);
    }

    if (fields.categorySlug.includes(term) || fields.categoryName.includes(term)) {
      score = Math.max(score, SCORE_CATEGORY);
    }

    if (
      fields.islandCode.includes(term) ||
      fields.islandSlug.includes(term) ||
      fields.islandName.includes(term)
    ) {
      score = Math.max(score, SCORE_ISLAND);
    }

    if (
      fields.description.includes(term) ||
      fields.address.includes(term) ||
      fields.sourceUrls.includes(term)
    ) {
      score = Math.max(score, SCORE_DESCRIPTION);
    }
  }

  const categoryBoosts = CATEGORY_BOOSTS[normalizedQuery] ?? [];
  if (
    business.category?.slug &&
    categoryBoosts.includes(business.category.slug)
  ) {
    score = Math.max(score, SCORE_CATEGORY + 5);
  }

  if (normalizedQuery === "ferry" && fields.name.includes("ferry")) {
    score += 25;
  }

  if (normalizedQuery === "wellness" && business.category?.slug === "wellness-spas") {
    score = Math.max(score, 90);
  }

  if (normalizedQuery === "water island" && business.island === "WI") {
    score += 35;
  }

  if (normalizedQuery === "night" && business.category?.slug === "nightlife-rhythm") {
    score = Math.max(score, 85);
  }

  return score;
}

function scoreGuideMatch(
  shortcut: GuideShortcut,
  normalizedQuery: string,
  terms: string[],
): number {
  const fields = guideShortcutToSearchFields(shortcut).map(normalizeSearchText);
  let score = 0;

  for (const term of terms) {
    if (fields.some((field) => field.includes(term))) {
      score = Math.max(score, SCORE_GUIDE);
    }
  }

  if (isGuideStyleQuery(normalizedQuery)) {
    score = Math.max(score, SCORE_GUIDE + 10);
  }

  return score;
}

export function searchPublicInfoCatalog(query: string): LocalSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) {
    return [];
  }

  const terms = getExpandedSearchTerms(query);
  const listingScores = new Map<string, { business: PublishedBusinessRow; score: number }>();

  for (const business of PUBLIC_INFO_BUSINESSES) {
    const score = scoreBusinessMatch(business, normalizedQuery, terms);
    if (score > 0) {
      listingScores.set(business.id, { business, score });
    }
  }

  const guideScores = getGuideShortcuts(query)
    .map((shortcut) => ({
      shortcut,
      score: scoreGuideMatch(shortcut, normalizedQuery, terms),
    }))
    .filter((entry) => entry.score > 0);

  const listingResults = Array.from(listingScores.values())
    .sort((a, b) => b.score - a.score || a.business.name.localeCompare(b.business.name))
    .map(({ business }) =>
      toSearchResult({
        id: business.id,
        name: business.name,
        slug: business.slug,
        island: business.island,
        description_plain: business.description_plain,
        category: business.category,
      }),
    );

  const guideResults = guideScores
    .sort((a, b) => b.score - a.score || a.shortcut.name.localeCompare(b.shortcut.name))
    .map(({ shortcut }) => guideToSearchResult(shortcut));

  if (isGuideStyleQuery(normalizedQuery) && guideResults.length > 0) {
    const merged = [...guideResults];
    const seen = new Set(merged.map((result) => result.id));

    for (const listing of listingResults) {
      if (merged.length >= 12) break;
      if (seen.has(listing.id)) continue;
      merged.push(listing);
      seen.add(listing.id);
    }

    return merged.slice(0, 12);
  }

  return listingResults.slice(0, 12);
}
