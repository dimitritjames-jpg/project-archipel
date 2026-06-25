import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

const QUERY_EXPANSION_TERMS: Record<string, string[]> = {
  bite: ["culinary", "food", "restaurant", "dining", "beach bar"],
  beaches: ["beach", "bay", "cove", "shore", "sand"],
  shops: [
    "local-provisions",
    "provisions",
    "shopping",
    "market",
    "boutique",
    "maker",
    "gallery",
    "gifts",
  ],
  "local shops": [
    "local-provisions",
    "provisions",
    "shopping",
    "market",
    "boutique",
    "maker",
    "gallery",
    "gifts",
  ],
  family: ["family", "beach", "calm", "ferry", "day trip", "things to do"],
  romantic: ["sunset", "dinner", "dining", "beach", "stays", "date", "waterfront"],
  "rainy day": [
    "shopping",
    "local-provisions",
    "culture",
    "food",
    "wellness",
    "indoor",
    "gallery",
  ],
  "things to do": [
    "experiences",
    "adventure",
    "culture",
    "culinary",
    "cruise day",
    "beach",
    "boat",
    "ferry",
    "guide",
  ],
  night: ["nightlife", "bar", "music", "dinner", "late", "rhythm"],
  wellness: ["spa", "wellness", "calm", "reset"],
  ferry: ["ferry", "water island ferry"],
};

const ISLAND_ALIAS_TERMS: Record<string, string[]> = {
  "st thomas": ["st-thomas", "stt", "saint thomas"],
  "st john": ["st-john", "stj", "saint john"],
  "st croix": ["st-croix", "stx", "saint croix"],
  "water island": ["water-island", "wi"],
};

const GUIDE_STYLE_QUERIES = new Set([
  "family",
  "romantic",
  "rainy day",
  "things to do",
  "shops",
  "local shops",
]);

export type GuideShortcut = {
  id: string;
  name: string;
  slug: string;
  island: IslandCode;
  descriptionPlain: string;
  href: string;
  categoryName: string;
};

const GUIDE_SHORTCUTS: Record<string, GuideShortcut[]> = {
  "things to do": [
    guideShortcut(
      "guide-things-st-thomas",
      "Things to do on St. Thomas",
      "things-to-do",
      "STT",
      "Beaches, charters, dining, cruise-day moves, and ferry-linked day plans.",
      "/st-thomas/things-to-do",
    ),
    guideShortcut(
      "guide-things-st-john",
      "Things to do on St. John",
      "things-to-do",
      "STJ",
      "National park beaches, Cruz Bay charters, trails, and ferry-aware outings.",
      "/st-john/things-to-do",
    ),
    guideShortcut(
      "guide-things-st-croix",
      "Things to do on St. Croix",
      "things-to-do",
      "STX",
      "Buck Island, reef days, historic towns, and slower full-day routes.",
      "/st-croix/things-to-do",
    ),
    guideShortcut(
      "guide-things-water-island",
      "Water Island day trip",
      "day-trip",
      "WI",
      "Compact ferry-hop beach day with a protected return plan.",
      "/water-island/day-trip",
    ),
    experienceShortcut(
      "experience-adventure",
      "Adventure experiences",
      "adventure",
      "STT",
      "Charters, snorkeling, trails, and water days across the USVI.",
      "/experiences/adventure",
    ),
  ],
  ferry: [
    utilityShortcut(
      "utility-ferry-board",
      "USVI ferry board",
      "ferry",
      "STT",
      "Official AST-linked ferry routes, schedules context, and island-hop planning.",
      "/ferry",
    ),
    utilityShortcut(
      "utility-ferry-st-thomas",
      "St. Thomas ferry schedule",
      "ferry-schedule",
      "STT",
      "Red Hook, Crown Bay, and Charlotte Amalie ferry departure context.",
      "/st-thomas/ferry-schedule",
    ),
    utilityShortcut(
      "utility-ferry-st-john",
      "St. John ferry schedule",
      "ferry-schedule",
      "STJ",
      "Cruz Bay ferry crossings and return-timing notes for day trips.",
      "/st-john/ferry-schedule",
    ),
    guideShortcut(
      "utility-water-island-day-trip",
      "Water Island day trip",
      "day-trip",
      "WI",
      "Ferry-linked beach day with Dinghy's, rentals, and return buffer.",
      "/water-island/day-trip",
    ),
  ],
  cruise: [
    utilityShortcut(
      "utility-cruise-day-hub",
      "USVI cruise-day guide",
      "cruise-day",
      "STT",
      "Port-aware planning for St. Thomas and St. Croix with honest return buffers.",
      "/cruise-day",
    ),
    experienceShortcut(
      "utility-cruise-day-experience",
      "Cruise-day experiences",
      "cruise-day",
      "STT",
      "Shore-excursion planning paths across beaches, food, tours, and culture.",
      "/experiences/cruise-day",
    ),
    utilityShortcut(
      "utility-cruise-schedule-st-thomas",
      "St. Thomas cruise schedule",
      "cruise-schedule",
      "STT",
      "Scheduled port capacity context before picking a cruise-day move.",
      "/st-thomas/cruise-schedule",
    ),
    guideShortcut(
      "utility-havensight-cruise-day",
      "Havensight cruise-day guide",
      "havensight-cruise-day",
      "STT",
      "Walkable shopping, culture stops, beach routes, and ship-return timing.",
      "/st-thomas/havensight-cruise-day",
    ),
    guideShortcut(
      "utility-crown-bay-cruise-day",
      "Crown Bay cruise-day guide",
      "crown-bay-cruise-day",
      "STT",
      "Pickup points, Water Island caution, beach routes, and conservative returns.",
      "/st-thomas/crown-bay-cruise-day",
    ),
  ],
  "rainy day": [
    experienceShortcut(
      "experience-culture",
      "Culture experiences",
      "culture",
      "STT",
      "Museums, historic sites, and indoor island context for slower weather.",
      "/experiences/culture",
    ),
    experienceShortcut(
      "experience-culinary",
      "Culinary experiences",
      "culinary",
      "STT",
      "Food tours, dining, and tasting moves when the beach can wait.",
      "/experiences/culinary",
    ),
    experienceShortcut(
      "experience-wellness",
      "Wellness experiences",
      "wellness",
      "STX",
      "Calmer garden, spa, and reset-oriented planning paths.",
      "/experiences/wellness",
    ),
    categoryShortcut(
      "category-local-provisions-stt",
      "Local provisions on St. Thomas",
      "local-provisions",
      "STT",
      "Shops, galleries, and maker stops when you want an indoor browse.",
      "/st-thomas/local-provisions",
    ),
  ],
  romantic: [
    experienceShortcut(
      "experience-culinary-romantic",
      "Culinary experiences",
      "culinary",
      "STJ",
      "Sunset dinners, waterfront dining, and date-night restaurant planning.",
      "/experiences/culinary",
    ),
    experienceShortcut(
      "experience-stays",
      "Stays experiences",
      "stays",
      "STJ",
      "Boutique stays and slower island nights for two.",
      "/experiences/stays",
    ),
    guideShortcut(
      "guide-beaches-romantic",
      "Best beaches in the USVI",
      "best-beaches-usvi",
      "STJ",
      "Compare coves, sand, and quieter beach-day styles across the islands.",
      "/guides/best-beaches-usvi",
    ),
  ],
  family: [
    guideShortcut(
      "guide-family-beaches",
      "Best beaches in the USVI",
      "best-beaches-usvi",
      "STT",
      "Family-friendly beach comparisons across all four islands.",
      "/guides/best-beaches-usvi",
    ),
    guideShortcut(
      "guide-water-island-day-trip",
      "Water Island day trip",
      "day-trip",
      "WI",
      "Compact ferry-hop beach day with a protected return plan.",
      "/water-island/day-trip",
    ),
    experienceShortcut(
      "experience-cruise-day",
      "Cruise-day experiences",
      "cruise-day",
      "STT",
      "Shore-excursion planning with conservative ship-return timing.",
      "/experiences/cruise-day",
    ),
  ],
  shops: [
    experienceShortcut(
      "experience-local-shops",
      "Local shops experiences",
      "local-shops",
      "STT",
      "Maker stops, galleries, provisions, and island shopping context.",
      "/experiences/local-shops",
    ),
    categoryShortcut(
      "category-local-provisions-stt-shops",
      "Local provisions on St. Thomas",
      "local-provisions",
      "STT",
      "Published shops, galleries, and provisions on St. Thomas.",
      "/st-thomas/local-provisions",
    ),
    categoryShortcut(
      "category-local-provisions-stx-shops",
      "Local provisions on St. Croix",
      "local-provisions",
      "STX",
      "Published shops, museums, and provisions on St. Croix.",
      "/st-croix/local-provisions",
    ),
  ],
  "local shops": [
    experienceShortcut(
      "experience-local-shops-alias",
      "Local shops experiences",
      "local-shops",
      "STT",
      "Maker stops, galleries, provisions, and island shopping context.",
      "/experiences/local-shops",
    ),
    categoryShortcut(
      "category-local-provisions-stj-shops",
      "Local provisions on St. John",
      "local-provisions",
      "STJ",
      "Published provisions and maker stops on St. John.",
      "/st-john/local-provisions",
    ),
    categoryShortcut(
      "category-local-provisions-wi-shops",
      "Local provisions on Water Island",
      "local-provisions",
      "WI",
      "Ferry-linked rentals and provisions on Water Island.",
      "/water-island/local-provisions",
    ),
  ],
};

function utilityShortcut(
  id: string,
  name: string,
  slug: string,
  island: IslandCode,
  descriptionPlain: string,
  href: string,
): GuideShortcut {
  return { id, name, slug, island, descriptionPlain, href, categoryName: "Utility" };
}

function guideShortcut(
  id: string,
  name: string,
  slug: string,
  island: IslandCode,
  descriptionPlain: string,
  href: string,
): GuideShortcut {
  return { id, name, slug, island, descriptionPlain, href, categoryName: "Guide" };
}

function experienceShortcut(
  id: string,
  name: string,
  slug: string,
  island: IslandCode,
  descriptionPlain: string,
  href: string,
): GuideShortcut {
  return { id, name, slug, island, descriptionPlain, href, categoryName: "Experience" };
}

function categoryShortcut(
  id: string,
  name: string,
  slug: string,
  island: IslandCode,
  descriptionPlain: string,
  href: string,
): GuideShortcut {
  return { id, name, slug, island, descriptionPlain, href, categoryName: "Category" };
}

export function getExpandedSearchTerms(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (normalized.length < 2) {
    return [];
  }

  const terms = new Set<string>([normalized]);

  for (const [alias, extras] of Object.entries(ISLAND_ALIAS_TERMS)) {
    if (normalized === alias || normalized.includes(alias)) {
      terms.add(alias);
      for (const extra of extras) {
        terms.add(normalizeSearchText(extra));
      }
    }
  }

  for (const [key, expansions] of Object.entries(QUERY_EXPANSION_TERMS)) {
    if (normalized === key || normalized.includes(key)) {
      for (const expansion of expansions) {
        terms.add(normalizeSearchText(expansion));
      }
    }
  }

  return Array.from(terms).filter((term) => term.length >= 2);
}

export function isGuideStyleQuery(query: string): boolean {
  const normalized = normalizeSearchText(query);
  return GUIDE_STYLE_QUERIES.has(normalized);
}

export function shouldPrependGuideShortcuts(query: string): boolean {
  const normalized = normalizeSearchText(query);
  return (
    GUIDE_STYLE_QUERIES.has(normalized) ||
    normalized === "ferry" ||
    normalized === "cruise"
  );
}

export function getGuideShortcuts(query: string): GuideShortcut[] {
  const normalized = normalizeSearchText(query);
  return GUIDE_SHORTCUTS[normalized] ?? [];
}

export function guideShortcutToSearchFields(shortcut: GuideShortcut): string[] {
  const islandSlug = CODE_TO_SLUG[shortcut.island];
  const islandName = ISLAND_MAP[islandSlug].name;
  return [
    shortcut.name,
    shortcut.slug,
    shortcut.descriptionPlain,
    shortcut.href,
    shortcut.categoryName,
    islandSlug,
    islandName,
    shortcut.island,
  ];
}
