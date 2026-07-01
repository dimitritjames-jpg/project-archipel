import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";
import {
  getExpandedSearchTerms,
  getGuideShortcuts,
  guideShortcutToSearchFields,
  normalizeSearchText,
  shouldPrependGuideShortcuts,
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

export type SearchScopeOptions = {
  islandSlug?: string | null;
  categorySlug?: string | null;
};

const SCORE_NAME_EXACT = 100;
const SCORE_NAME = 80;
const SCORE_CATEGORY = 60;
const SCORE_ISLAND = 40;
const SCORE_DESCRIPTION = 20;
const SCORE_DESCRIPTION_WEAK = 6;
const SCORE_UTILITY = 110;
const SCORE_GUIDE = 95;

const CATEGORY_BOOSTS: Record<string, string[]> = {
  bar: ["nightlife-rhythm"],
  gifts: ["local-provisions"],
  "live music": ["nightlife-rhythm"],
  market: ["local-provisions"],
  massage: ["wellness-spas"],
  night: ["nightlife-rhythm"],
  nightlife: ["nightlife-rhythm"],
  culture: ["culture-history"],
  history: ["culture-history"],
  museum: ["culture-history"],
  fort: ["culture-history"],
  "historic site": ["culture-history"],
  ruins: ["culture-history"],
  spa: ["wellness-spas"],
  wellness: ["wellness-spas"],
  shops: ["local-provisions"],
  "local shops": ["local-provisions"],
};

const BEACH_FRIENDLY_CATEGORIES = new Set([
  "excursions-charters",
  "indulgent-dining",
  "nightlife-rhythm",
  "boutique-stays",
]);

const FOOD_FRIENDLY_CATEGORIES = new Set([
  "indulgent-dining",
  "excursions-charters",
]);

type MatchTiers = {
  name: number;
  slug: number;
  category: number;
  island: number;
  description: number;
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

function termMatchesText(term: string, text: string): boolean {
  if (term.length <= 2) {
    return false;
  }

  return text.includes(term);
}

function termMatchesIsland(
  term: string,
  fields: ReturnType<typeof businessSearchFields>,
): boolean {
  if (term.length <= 2) {
    return fields.islandCode === term;
  }

  return (
    fields.islandCode.includes(term) ||
    fields.islandSlug.includes(term) ||
    fields.islandName.includes(term)
  );
}

function computeMatchTiers(
  business: PublishedBusinessRow,
  normalizedQuery: string,
  terms: string[],
): MatchTiers {
  const fields = businessSearchFields(business);
  const tiers: MatchTiers = {
    name: 0,
    slug: 0,
    category: 0,
    island: 0,
    description: 0,
  };

  if (fields.name === normalizedQuery) {
    tiers.name = SCORE_NAME_EXACT;
  } else if (fields.name.includes(normalizedQuery)) {
    tiers.name = SCORE_NAME;
  }

  for (const term of terms) {
    if (term.length < 2) continue;

    if (
      (term === normalizedQuery || term.length >= 3) &&
      fields.name.includes(term)
    ) {
      tiers.name = Math.max(tiers.name, SCORE_NAME);
    }

    if (term.length >= 3 && fields.slug.includes(term)) {
      tiers.slug = Math.max(tiers.slug, SCORE_NAME - 5);
    }

    if (
      term.length >= 3 &&
      (fields.categorySlug.includes(term) || fields.categoryName.includes(term))
    ) {
      tiers.category = Math.max(tiers.category, SCORE_CATEGORY);
    }

    if (termMatchesIsland(term, fields)) {
      tiers.island = Math.max(tiers.island, SCORE_ISLAND);
    }

    if (
      termMatchesText(term, fields.description) ||
      termMatchesText(term, fields.address) ||
      termMatchesText(term, fields.sourceUrls)
    ) {
      tiers.description = Math.max(tiers.description, SCORE_DESCRIPTION);
    }
  }

  return tiers;
}

function hasStrongMatch(tiers: MatchTiers): boolean {
  return tiers.name > 0 || tiers.slug > 0 || tiers.category > 0 || tiers.island > 0;
}

function applyDescriptionNoisePenalty(
  business: PublishedBusinessRow,
  normalizedQuery: string,
  tiers: MatchTiers,
): number {
  if (hasStrongMatch(tiers) || tiers.description === 0) {
    return Math.max(tiers.name, tiers.slug, tiers.category, tiers.island, tiers.description);
  }

  const fields = businessSearchFields(business);
  const categorySlug = business.category?.slug ?? "";

  if (normalizedQuery === "ferry") {
    if (fields.name.includes("ferry") || fields.slug.includes("ferry")) {
      return Math.max(tiers.description, SCORE_NAME);
    }
    return 0;
  }

  if (normalizedQuery === "water island") {
    if (
      business.island === "WI" ||
      fields.slug.includes("ferry") ||
      fields.slug.includes("day-trip") ||
      fields.name.includes("water island")
    ) {
      return Math.max(tiers.description, SCORE_ISLAND);
    }
    return 0;
  }

  if (normalizedQuery === "beach" || normalizedQuery === "beaches") {
    if (fields.name.includes("beach") || fields.name.includes("bay")) {
      return Math.max(tiers.description, SCORE_NAME);
    }
    if (BEACH_FRIENDLY_CATEGORIES.has(categorySlug)) {
      return Math.max(tiers.description, SCORE_CATEGORY - 10);
    }
    return SCORE_DESCRIPTION_WEAK;
  }

  if (normalizedQuery === "food") {
    if (FOOD_FRIENDLY_CATEGORIES.has(categorySlug)) {
      return Math.max(tiers.description, SCORE_CATEGORY);
    }
    if (categorySlug === "nightlife-rhythm" || categorySlug === "local-provisions") {
      return SCORE_DESCRIPTION_WEAK;
    }
  }

  return tiers.description;
}

function scoreBusinessMatch(
  business: PublishedBusinessRow,
  normalizedQuery: string,
  terms: string[],
): number {
  const tiers = computeMatchTiers(business, normalizedQuery, terms);
  let score = applyDescriptionNoisePenalty(business, normalizedQuery, tiers);

  if (score <= 0) {
    return 0;
  }

  const fields = businessSearchFields(business);
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

  if (normalizedQuery === "wellness") {
    if (business.category?.slug === "wellness-spas") {
      score = Math.max(score, 90);
    } else if (
      !fields.name.includes("wellness") &&
      !fields.name.includes("spa") &&
      !fields.name.includes("garden") &&
      !fields.name.includes("botanical")
    ) {
      return 0;
    }
  }

  if (normalizedQuery === "spa" || normalizedQuery === "massage") {
    if (business.category?.slug === "wellness-spas") {
      score = Math.max(score, 92);
    } else if (
      !fields.name.includes("spa") &&
      !fields.name.includes("massage") &&
      !fields.description.includes("spa") &&
      !fields.description.includes("massage")
    ) {
      return 0;
    }
  }

  if (normalizedQuery === "water island" && business.island === "WI") {
    score += 35;
  }

  if (normalizedQuery === "night" && business.category?.slug === "nightlife-rhythm") {
    score = Math.max(score, 85);
  }

  if (
    (normalizedQuery === "bar" || normalizedQuery === "live music") &&
    business.category?.slug === "nightlife-rhythm"
  ) {
    score = Math.max(score, 82);
  }

  if (
    (normalizedQuery === "gifts" || normalizedQuery === "market") &&
    business.category?.slug === "local-provisions"
  ) {
    if (normalizedQuery === "market") {
      const marketSignals = [
        "market",
        "provision",
        "grocery",
        "fresh",
        "drugstore",
        "shop",
        "shops",
        "store",
        "mall",
        "spice",
      ];
      const hasMarketSignal = marketSignals.some(
        (term) =>
          fields.name.includes(term) ||
          fields.description.includes(term) ||
          fields.slug.includes(term),
      );

      if (!hasMarketSignal) {
        return 0;
      }

      score = Math.max(score, fields.name.includes("market") ? 95 : 84);
    } else {
      score = Math.max(score, 78);
    }
  }

  if (
    normalizedQuery === "market" &&
    business.category?.slug === "indulgent-dining" &&
    fields.name.includes("market")
  ) {
    score = Math.min(score, 68);
  }

  if (
    ["culture", "history", "museum", "fort", "historic site", "ruins"].includes(normalizedQuery) &&
    business.category?.slug === "culture-history"
  ) {
    score = Math.max(score, 90);
  }

  if (normalizedQuery === "shops" || normalizedQuery === "local shops") {
    if (business.category?.slug === "local-provisions") {
      score = Math.max(score, 84);
    } else {
      const retailTerms = ["shop", "shops", "gallery", "boutique", "gift", "store"];
      const hasRetailSignal = retailTerms.some(
        (term) => fields.name.includes(term) || fields.description.includes(term),
      );

      if (!hasRetailSignal) {
        return 0;
      }
    }
  }

  if (normalizedQuery === "food" && business.category?.slug === "indulgent-dining") {
    score = Math.max(score, 75);
  }

  if (
    (normalizedQuery === "beach" || normalizedQuery === "beaches") &&
    (fields.name.includes("beach") || fields.name.includes("bay"))
  ) {
    score = Math.max(score, 88);
  }

  const beachIslandQueries: Record<string, PublishedBusinessRow["island"]> = {
    "beach st thomas": "STT",
    "beaches st thomas": "STT",
    "st thomas beach": "STT",
    "st thomas beaches": "STT",
    "beach st croix": "STX",
    "beaches st croix": "STX",
    "st croix beach": "STX",
    "st croix beaches": "STX",
    "beach st john": "STJ",
    "beaches st john": "STJ",
    "st john beach": "STJ",
    "st john beaches": "STJ",
    "beach water island": "WI",
    "beaches water island": "WI",
    "water island beach": "WI",
    "water island beaches": "WI",
  };

  const beachIslandTarget = beachIslandQueries[normalizedQuery];
  if (beachIslandTarget) {
    if (
      business.island === beachIslandTarget &&
      business.category?.slug === "beaches"
    ) {
      score = Math.max(score, 96);
    } else if (
      business.island === beachIslandTarget &&
      BEACH_FRIENDLY_CATEGORIES.has(business.category?.slug ?? "")
    ) {
      score = Math.max(score, 70);
    }
  }

  if (normalizedQuery === "cruise") {
    if (
      fields.description.includes("cruise") ||
      fields.name.includes("cruise") ||
      business.category?.slug === "excursions-charters"
    ) {
      score = Math.max(score, hasStrongMatch(tiers) ? score : SCORE_CATEGORY);
    } else if (!hasStrongMatch(tiers)) {
      return 0;
    }
  }

  return score;
}

function scoreGuideMatch(
  shortcut: GuideShortcut,
  normalizedQuery: string,
  terms: string[],
): number {
  if (normalizedQuery === "cruise day" && shortcut.href === "/cruise-day") {
    return SCORE_UTILITY + 5;
  }

  if (shortcut.categoryName === "Utility") {
    return SCORE_UTILITY;
  }

  const fields = guideShortcutToSearchFields(shortcut).map(normalizeSearchText);
  let score = 0;

  for (const term of terms) {
    if (fields.some((field) => field.includes(term))) {
      score = Math.max(score, SCORE_GUIDE);
    }
  }

  if (shouldPrependGuideShortcuts(normalizedQuery)) {
    score = Math.max(score, SCORE_GUIDE);
  }

  return score;
}

export function searchPublicInfoCatalog(query: string): LocalSearchResult[] {
  return searchPublicInfoCatalogWithScope(query, {});
}

function shortcutMatchesScope(
  shortcut: GuideShortcut,
  scope: SearchScopeOptions,
): boolean {
  const { islandSlug, categorySlug } = scope;

  if (islandSlug && CODE_TO_SLUG[shortcut.island] !== islandSlug) {
    return false;
  }

  if (!categorySlug) {
    return true;
  }

  return (
    shortcut.slug === categorySlug ||
    shortcut.href.endsWith(`/${categorySlug}`) ||
    shortcut.href.includes(`/${categorySlug}/`)
  );
}

export function searchPublicInfoCatalogWithScope(
  query: string,
  scope: SearchScopeOptions,
): LocalSearchResult[] {
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

  const guideResults = getGuideShortcuts(query)
    .filter((shortcut) => shortcutMatchesScope(shortcut, scope))
    .map((shortcut) => ({
      shortcut,
      score: scoreGuideMatch(shortcut, normalizedQuery, terms),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.shortcut.name.localeCompare(b.shortcut.name))
    .map(({ shortcut }) => guideToSearchResult(shortcut));

  const listingResults = Array.from(listingScores.values())
    .filter(({ business }) => {
      if (scope.islandSlug && CODE_TO_SLUG[business.island] !== scope.islandSlug) {
        return false;
      }

      if (scope.categorySlug && business.category?.slug !== scope.categorySlug) {
        return false;
      }

      return true;
    })
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

  if (shouldPrependGuideShortcuts(normalizedQuery) && guideResults.length > 0) {
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
