import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";

export type SearchPlanningIntent =
  | "boat"
  | "beach"
  | "food"
  | "nightlife"
  | "attractions"
  | "culture"
  | "wellness"
  | "stays"
  | "local-shops"
  | "family"
  | "rainy-day";

const BOAT_INTENT_PHRASES = [
  "private charter",
  "snorkel charter",
  "sunset sail",
  "boat charter",
  "boat day",
  "catamaran",
  "boating",
  "charter",
  "yacht",
  "boat",
] as const;

const PLANNING_INTENT_PATTERNS: Array<{
  intent: SearchPlanningIntent;
  phrases: readonly string[];
}> = [
  { intent: "boat", phrases: BOAT_INTENT_PHRASES },
  { intent: "beach", phrases: ["beach day", "beaches", "beach"] },
  {
    intent: "food",
    phrases: ["sunset dinner", "local plate", "restaurants", "restaurant", "dining", "food", "bite"],
  },
  {
    intent: "nightlife",
    phrases: ["live music", "rum bar", "boardwalk night", "nightlife", "dancing", "night", "bar"],
  },
  { intent: "attractions", phrases: ["attractions", "attraction"] },
  { intent: "culture", phrases: ["culture walk", "culture", "history"] },
  { intent: "wellness", phrases: ["wellness", "spa"] },
  { intent: "stays", phrases: ["stays", "stay", "hotel", "resort"] },
  {
    intent: "local-shops",
    phrases: ["local shops", "local market", "market", "gifts", "shops", "shop"],
  },
  { intent: "family", phrases: ["family day", "family", "kids"] },
  { intent: "rainy-day", phrases: ["rainy day"] },
];

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

const QUERY_EXPANSION_TERMS: Record<string, string[]> = {
  boat: ["boating", "charter", "sail", "snorkel", "sunset sail", "catamaran", "yacht"],
  charter: ["boat", "sail", "catamaran", "snorkel charter", "excursions-charters"],
  "snorkel charter": ["boat", "charter", "snorkel", "sail", "excursions-charters"],
  "sunset sail": ["boat", "charter", "sail", "catamaran", "sunset"],
  bite: ["culinary", "food", "restaurant", "dining", "beach bar"],
  bar: ["nightlife", "music", "pub", "cantina", "beach bar", "cocktails"],
  beaches: ["beach", "bay", "cove", "shore", "sand"],
  boating: ["boat", "charter", "sail", "snorkel", "excursions-charters", "yacht"],
  yacht: ["boat", "charter", "sail", "catamaran", "excursions-charters"],
  attraction: ["attractions", "marine park", "ocean park", "tourist attraction"],
  attractions: ["attraction", "marine park", "ocean park", "tourist attraction"],
  "marine park": ["attractions", "coral world", "ocean park", "coki point"],
  "coki point": ["coral world", "attractions", "beach", "marine park"],
  skyride: ["attractions", "paradise point", "viewpoint"],
  zipline: ["tours-activities", "tree limin", "adventure"],
  "food tour": ["tours-activities", "food tours", "culinary", "walking tour"],
  "eco tour": ["tours-activities", "ecotours", "eco", "kayak", "snorkel"],
  food: ["culinary", "restaurant", "dining", "local plate", "waterfront"],
  gifts: [
    "local-provisions",
    "shopping",
    "gallery",
    "boutique",
    "maker",
    "gift shop",
    "souvenir",
  ],
  kids: ["family", "museum", "beach", "park", "attractions", "things to do"],
  "live music": ["music", "bar", "nightlife", "night", "band", "beach bar"],
  "rum bar": ["bar", "nightlife", "rum", "cocktail", "beach bar"],
  dancing: ["nightlife", "bar", "live music", "dance", "late night"],
  "get listed": ["claim listing", "update listing", "business", "owner", "listing"],
  "claim listing": ["get listed", "claim interest", "owner", "business", "listing"],
  "update listing": ["get listed", "correct my info", "owner", "business", "listing"],
  "send photos": ["send approved photos", "photo rights", "business", "listing"],
  sponsor: ["featured placement", "get listed", "business", "owner"],
  "featured placement": ["sponsor", "get listed", "business", "owner"],
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
  market: [
    "local-provisions",
    "market",
    "grocery",
    "fresh",
    "provisions",
    "local shops",
  ],
  "local market": ["market", "local shops", "grocery", "fresh", "provisions"],
  culture: ["culture-history", "museum", "fort", "history", "heritage"],
  history: ["culture-history", "museum", "historic site", "fort", "ruins", "heritage"],
  museum: ["culture-history", "museum", "history", "rainy day"],
  fort: ["culture-history", "fort", "history", "historic site"],
  "historic site": ["culture-history", "history", "museum", "fort"],
  ruins: ["culture-history", "ruins", "history", "heritage"],
  massage: ["spa", "wellness", "massage", "reset"],
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
    "museum",
    "attractions",
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
    "attractions",
    "tours-activities",
  ],
  night: ["nightlife", "bar", "music", "dinner", "late", "rhythm"],
  spa: ["spa", "wellness", "massage", "reset"],
  sunset: ["romantic", "beach", "bar", "dinner", "waterfront"],
  "sunset drinks": ["sunset", "bar", "beach bar", "cocktail", "waterfront", "culinary"],
  wellness: ["spa", "wellness", "calm", "reset"],
  ferry: ["ferry", "water island ferry"],
  "near cruise port": ["cruise day", "cruise", "port", "havensight", "crown bay"],
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
  "culture",
  "history",
  "museum",
  "fort",
  "historic site",
  "ruins",
  "cruise day",
  "nightlife",
  "live music",
  "bar",
  "rum bar",
  "dancing",
  "sunset",
  "sunset drinks",
  "kids",
  "attraction",
  "attractions",
  "marine park",
  "coki point",
  "skyride",
  "zipline",
  "food tour",
  "eco tour",
  "shops",
  "local shops",
  "near cruise port",
  "get listed",
  "claim listing",
  "update listing",
  "send photos",
  "featured placement",
  "sponsor",
]);

const OWNER_INTENT_PHRASES = [
  "get listed",
  "claim listing",
  "update listing",
  "send photos",
  "add my business",
  "list my business",
  "business listing",
  "sponsor",
  "sponsorship",
  "featured placement",
  "advertise",
  "promote my business",
] as const;

export type GuideShortcut = {
  id: string;
  name: string;
  slug: string;
  island: IslandCode;
  descriptionPlain: string;
  href: string;
  categoryName: string;
};

type IslandIntentKind =
  | "dining"
  | "excursions"
  | "tours-activities"
  | "attractions"
  | "family"
  | "nightlife"
  | "local-provisions"
  | "culture-history"
  | "sunset"
  | "beaches";

export const OWNER_INTENT_UTILITY_SHORTCUT = utilityShortcut(
  "utility-owner-get-listed",
  "Get listed on VibeVI",
  "get-listed",
  "STT",
  "Own or manage a Virgin Islands business? Submit a new listing, claim public-info details, send updates, or ask about growth placement.",
  "/get-listed",
);

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
      "Things to do on Water Island",
      "day-trip",
      "WI",
      "Ferry-first beach time, Fort Segarra context, rentals, and a slow-day escape that still protects the return.",
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
      "category-culture-history-stt",
      "Culture & history on St. Thomas",
      "culture-history",
      "STT",
      "Museums, forts, and indoor cultural stops for a weather-flex day on St. Thomas.",
      "/st-thomas/culture-history",
    ),
    categoryShortcut(
      "category-culture-history-stx",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Forts, museums, and historic sites that work when the beach is not the move.",
      "/st-croix/culture-history",
    ),
  ],
  culture: [
    experienceShortcut(
      "experience-culture-query",
      "Culture experiences",
      "culture",
      "STT",
      "Museums, forts, history, makers, and story-rich island routes across the USVI.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-culture-history-stt-query",
      "Culture & history on St. Thomas",
      "culture-history",
      "STT",
      "Museums, forts, and cultural stops tied to Charlotte Amalie and cruise-day planning.",
      "/st-thomas/culture-history",
    ),
    categoryShortcut(
      "category-culture-history-stx-query",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Historic sites, forts, and museums across Christiansted and Frederiksted.",
      "/st-croix/culture-history",
    ),
  ],
  history: [
    experienceShortcut(
      "experience-history-query",
      "Culture experiences",
      "culture",
      "STX",
      "History-led island routes through museums, forts, and heritage stops.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-history-stt-query",
      "Culture & history on St. Thomas",
      "culture-history",
      "STT",
      "Harbor history, museums, and fort stops for a slower St. Thomas route.",
      "/st-thomas/culture-history",
    ),
    categoryShortcut(
      "category-history-stx-query",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Historic towns, forts, and museums across St. Croix.",
      "/st-croix/culture-history",
    ),
  ],
  museum: [
    experienceShortcut(
      "experience-museum-query",
      "Culture experiences",
      "culture",
      "STT",
      "Museum-friendly culture routes for rainy-day and family planning.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-museum-stt-query",
      "Culture & history on St. Thomas",
      "culture-history",
      "STT",
      "Museum and fort stops near town and cruise-day movement.",
      "/st-thomas/culture-history",
    ),
    categoryShortcut(
      "category-museum-stx-query",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Museum and heritage stops across Christiansted and Frederiksted.",
      "/st-croix/culture-history",
    ),
  ],
  fort: [
    experienceShortcut(
      "experience-fort-query",
      "Culture experiences",
      "culture",
      "STX",
      "Forts, harbor history, and island heritage routes.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-fort-stt-query",
      "Culture & history on St. Thomas",
      "culture-history",
      "STT",
      "Fort and museum context for Charlotte Amalie and port-side planning.",
      "/st-thomas/culture-history",
    ),
    categoryShortcut(
      "category-fort-stx-query",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Fort-led culture stops across St. Croix.",
      "/st-croix/culture-history",
    ),
  ],
  "historic site": [
    experienceShortcut(
      "experience-historic-site-query",
      "Culture experiences",
      "culture",
      "STX",
      "Historic-site planning across forts, museums, and preserved island landmarks.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-historic-site-stx-query",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Historic sites and preserved places across St. Croix.",
      "/st-croix/culture-history",
    ),
  ],
  ruins: [
    experienceShortcut(
      "experience-ruins-query",
      "Culture experiences",
      "culture",
      "WI",
      "Ruins, heritage traces, and quieter historic context across the islands.",
      "/experiences/culture",
    ),
    categoryShortcut(
      "category-ruins-water-island-query",
      "Culture & history on Water Island",
      "culture-history",
      "WI",
      "Historic ruins and heritage stops on Water Island.",
      "/water-island/culture-history",
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
    categoryShortcut(
      "category-family-attractions-stt",
      "St. Thomas attractions",
      "attractions",
      "STT",
      "Coral World, Skyride, and family-friendly anchor stops on St. Thomas.",
      "/st-thomas/attractions",
    ),
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
  kids: [
    categoryShortcut(
      "category-kids-attractions-stt",
      "St. Thomas attractions",
      "attractions",
      "STT",
      "Family-oriented attractions such as Coral World and Skyride on St. Thomas.",
      "/st-thomas/attractions",
    ),
    categoryShortcut(
      "category-kids-culture-history-stx",
      "Culture & history on St. Croix",
      "culture-history",
      "STX",
      "Museum and fort stops that work well for a family-flex or rainy-day route.",
      "/st-croix/culture-history",
    ),
    guideShortcut(
      "guide-kids-water-island-day-trip",
      "Water Island day trip",
      "day-trip",
      "WI",
      "A compact beach-first family day that keeps the ferry return simple.",
      "/water-island/day-trip",
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
  "cruise day": [
    utilityShortcut(
      "utility-cruise-day-hub-direct",
      "USVI cruise-day guide",
      "cruise-day",
      "STT",
      "Port-aware planning for St. Thomas and St. Croix with honest return buffers.",
      "/cruise-day",
    ),
    experienceShortcut(
      "utility-cruise-day-experience-direct",
      "Cruise-day experiences",
      "cruise-day",
      "STT",
      "Shore-excursion planning paths across beaches, food, tours, and culture.",
      "/experiences/cruise-day",
    ),
    utilityShortcut(
      "utility-cruise-schedule-st-thomas-direct",
      "St. Thomas cruise schedule",
      "cruise-schedule",
      "STT",
      "Scheduled port capacity context before picking a cruise-day move.",
      "/st-thomas/cruise-schedule",
    ),
  ],
  nightlife: [
    experienceShortcut(
      "experience-nightlife-query",
      "Nightlife experiences",
      "nightlife",
      "STT",
      "Harbor nights, live music, beach bars, and after-dark route planning across the USVI.",
      "/experiences/nightlife",
    ),
    categoryShortcut(
      "category-nightlife-stt-query",
      "St. Thomas nightlife",
      "nightlife-rhythm",
      "STT",
      "Published nightlife, bar, and late-night listings for St. Thomas.",
      "/st-thomas/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-nightlife-stj-query",
      "St. John nightlife",
      "nightlife-rhythm",
      "STJ",
      "Published nightlife, beach bar, and after-dark listings for St. John.",
      "/st-john/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-nightlife-stx-query",
      "St. Croix nightlife",
      "nightlife-rhythm",
      "STX",
      "Published nightlife, boardwalk, and after-dark listings for St. Croix.",
      "/st-croix/nightlife-rhythm",
    ),
  ],
  bar: [
    experienceShortcut(
      "experience-bar-query",
      "Nightlife experiences",
      "nightlife",
      "STT",
      "Beach bars, late-night stops, and music-forward routes across the USVI.",
      "/experiences/nightlife",
    ),
    categoryShortcut(
      "category-bar-stt-query",
      "St. Thomas nightlife",
      "nightlife-rhythm",
      "STT",
      "Published bars, beach bars, and after-dark listings for St. Thomas.",
      "/st-thomas/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-bar-stj-query",
      "St. John nightlife",
      "nightlife-rhythm",
      "STJ",
      "Published beach bars, rum bars, and late-night listings for St. John.",
      "/st-john/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-bar-stx-query",
      "St. Croix nightlife",
      "nightlife-rhythm",
      "STX",
      "Published bars, boardwalk stops, and late-night listings for St. Croix.",
      "/st-croix/nightlife-rhythm",
    ),
  ],
  "live music": [
    experienceShortcut(
      "experience-live-music-query",
      "Nightlife experiences",
      "nightlife",
      "STX",
      "Live music, boardwalk energy, and late-night island routes across the USVI.",
      "/experiences/nightlife",
    ),
    categoryShortcut(
      "category-live-music-stx-query",
      "St. Croix nightlife",
      "nightlife-rhythm",
      "STX",
      "Published boardwalk, pub, and live-music-friendly listings for St. Croix.",
      "/st-croix/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-live-music-stt-query",
      "St. Thomas nightlife",
      "nightlife-rhythm",
      "STT",
      "Published bar and after-dark listings for St. Thomas.",
      "/st-thomas/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-live-music-stj-query",
      "St. John nightlife",
      "nightlife-rhythm",
      "STJ",
      "Published beach bar and late-night listings for St. John.",
      "/st-john/nightlife-rhythm",
    ),
  ],
  "rum bar": [
    experienceShortcut(
      "experience-rum-bar-query",
      "Nightlife experiences",
      "nightlife",
      "STJ",
      "Rum-forward bars, beach pours, and after-dark island routes across the USVI.",
      "/experiences/nightlife",
    ),
    categoryShortcut(
      "category-rum-bar-stj-query",
      "St. John nightlife",
      "nightlife-rhythm",
      "STJ",
      "Published rum bar, cantina, and beach bar listings for St. John.",
      "/st-john/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-rum-bar-stt-query",
      "St. Thomas nightlife",
      "nightlife-rhythm",
      "STT",
      "Published rum-forward bar and after-dark listings for St. Thomas.",
      "/st-thomas/nightlife-rhythm",
    ),
  ],
  dancing: [
    experienceShortcut(
      "experience-dancing-query",
      "Nightlife experiences",
      "nightlife",
      "STT",
      "After-dark routes with beach bars, pub energy, and late-night island rhythm.",
      "/experiences/nightlife",
    ),
    categoryShortcut(
      "category-dancing-stt-query",
      "St. Thomas nightlife",
      "nightlife-rhythm",
      "STT",
      "Published nightlife listings for a stronger St. Thomas after-dark starting point.",
      "/st-thomas/nightlife-rhythm",
    ),
    categoryShortcut(
      "category-dancing-stx-query",
      "St. Croix nightlife",
      "nightlife-rhythm",
      "STX",
      "Published boardwalk and pub listings for a stronger St. Croix night route.",
      "/st-croix/nightlife-rhythm",
    ),
  ],
  sunset: [
    guideShortcut(
      "guide-sunset-beaches",
      "Best beaches in the USVI",
      "best-beaches-usvi",
      "STJ",
      "Use beach access, pace, and island style to choose a stronger sunset route.",
      "/guides/best-beaches-usvi",
    ),
    experienceShortcut(
      "experience-sunset-culinary",
      "Culinary experiences",
      "culinary",
      "STT",
      "Waterfront tables, beach bars, and date-night routes that work better than a random lexical match.",
      "/experiences/culinary",
    ),
    experienceShortcut(
      "experience-sunset-nightlife",
      "Nightlife experiences",
      "nightlife",
      "STT",
      "Beach bars, boardwalk stops, and after-dark island routes that pair better with sunset drinks intent.",
      "/experiences/nightlife",
    ),
  ],
  "sunset drinks": [
    experienceShortcut(
      "experience-sunset-drinks-culinary",
      "Culinary experiences",
      "culinary",
      "STT",
      "Waterfront tables, beach bars, and cocktail-friendly routes for a sunset-first plan.",
      "/experiences/culinary",
    ),
    experienceShortcut(
      "experience-sunset-drinks-nightlife",
      "Nightlife experiences",
      "nightlife",
      "STT",
      "Beach bars, boardwalk stops, and after-dark routes that work better than a random lexical match.",
      "/experiences/nightlife",
    ),
    guideShortcut(
      "guide-sunset-drinks-beaches",
      "Best beaches in the USVI",
      "best-beaches-usvi",
      "STJ",
      "Use beach access and pace to back into a better sunset-drinks route without implying live availability.",
      "/guides/best-beaches-usvi",
    ),
  ],
  "near cruise port": [
    utilityShortcut(
      "utility-near-cruise-port-hub",
      "USVI cruise-day guide",
      "cruise-day",
      "STT",
      "Start with the cruise-day guide for port-aware routes near Havensight and Crown Bay.",
      "/cruise-day",
    ),
    utilityShortcut(
      "utility-near-cruise-port-schedule",
      "St. Thomas cruise schedule",
      "cruise-schedule",
      "STT",
      "Check scheduled ship load before choosing a near-port route.",
      "/st-thomas/cruise-schedule",
    ),
    guideShortcut(
      "utility-near-cruise-port-havensight",
      "Havensight cruise-day guide",
      "havensight-cruise-day",
      "STT",
      "Walkable shops, culture stops, and port-aware moves from Havensight.",
      "/st-thomas/havensight-cruise-day",
    ),
    guideShortcut(
      "utility-near-cruise-port-crown-bay",
      "Crown Bay cruise-day guide",
      "crown-bay-cruise-day",
      "STT",
      "Crown Bay pickup, Water Island caution, and conservative return planning.",
      "/st-thomas/crown-bay-cruise-day",
    ),
  ],
  "get listed": [
    utilityShortcut(
      "utility-get-listed",
      "Get listed on VibeVI",
      "get-listed",
      "STT",
      "Claim or correct a listing, send approved photos, ask about featured placement, or add a business.",
      "/get-listed",
    ),
  ],
  "claim listing": [
    utilityShortcut(
      "utility-claim-listing",
      "Claim or correct a VibeVI listing",
      "claim-listing",
      "STT",
      "Use the VibeVI launch inbox to confirm details, correct public info, or register claim interest.",
      "/get-listed?intent=claim-interest",
    ),
  ],
  "update listing": [
    utilityShortcut(
      "utility-update-listing",
      "Correct a VibeVI listing",
      "update-listing",
      "STT",
      "Send corrections for public listing details, category fit, contact fields, or source-backed profile notes.",
      "/get-listed?intent=correct-my-info",
    ),
  ],
  "send photos": [
    utilityShortcut(
      "utility-send-photos",
      "Send approved photos to VibeVI",
      "send-photos",
      "STT",
      "Share business-owned or licensed photos for a listing without implying partnership or paid placement.",
      "/get-listed?intent=send-approved-photos",
    ),
  ],
  sponsor: [
    utilityShortcut(
      "utility-sponsor-interest",
      "Sponsor interest on VibeVI",
      "sponsor-interest",
      "STT",
      "Ask about future sponsor opportunities without implying paid placement is active today.",
      "/get-listed?intent=sponsor-interest",
    ),
  ],
  "featured placement": [
    utilityShortcut(
      "utility-featured-placement",
      "Ask about featured placement",
      "featured-placement",
      "STT",
      "Register interest in future featured opportunities while current listings remain non-paid and trust-first.",
      "/get-listed?intent=featured-placement",
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

function islandHubShortcut(island: IslandCode): GuideShortcut {
  const islandSlug = CODE_TO_SLUG[island];
  const islandName = ISLAND_MAP[islandSlug].name;

  return guideShortcut(
    `island-hub-${islandSlug}`,
    `${islandName} Guide`,
    islandSlug,
    island,
    `Start with ${islandName} only: island-first browsing, category sections, and scoped route planning before widening to the rest of the USVI.`,
    `/islands/${islandSlug}`,
  );
}

function buildIslandIntentShortcut(
  island: IslandCode,
  kind: IslandIntentKind,
): GuideShortcut | null {
  const islandSlug = CODE_TO_SLUG[island];
  const islandName = ISLAND_MAP[islandSlug].name;

  switch (kind) {
    case "dining":
      if (island === "WI") {
        return guideShortcut(
          `guide-dining-${islandSlug}`,
          `${islandName} day-trip food planning`,
          "day-trip",
          island,
          `Plan simple food and ferry-aware beach timing on ${islandName} without assuming a deep standalone dining directory.`,
          "/water-island/day-trip",
        );
      }

      return categoryShortcut(
        `category-dining-${islandSlug}`,
        `${islandName} restaurants`,
        "indulgent-dining",
        island,
        `Published food and dining listings for ${islandName}.`,
        `/${islandSlug}/indulgent-dining`,
      );
    case "excursions":
      if (island === "WI") {
        return guideShortcut(
          `guide-excursions-${islandSlug}`,
          `${islandName} day-trip planning`,
          "day-trip",
          island,
          `A smaller-island route where the ferry, beach time, and return matter more than forcing a charter-style directory.`,
          "/water-island/day-trip",
        );
      }

      return categoryShortcut(
        `category-excursions-${islandSlug}`,
        `${islandName} charters & excursions`,
        "excursions-charters",
        island,
        `Published charter, excursion, snorkeling, and boating listings for ${islandName}.`,
        `/${islandSlug}/excursions-charters`,
      );
    case "tours-activities":
      if (island === "WI") {
        return guideShortcut(
          `guide-tours-activities-${islandSlug}`,
          `${islandName} day-trip planning`,
          "day-trip",
          island,
          "A smaller-island route where ferry timing and a protected return matter more than forcing a thin tours category.",
          "/water-island/day-trip",
        );
      }

      return categoryShortcut(
        `category-tours-activities-${islandSlug}`,
        `${islandName} tours & activities`,
        "tours-activities",
        island,
        `Published guided activity, food tour, eco tour, paddle, and zipline listings for ${islandName}.`,
        `/${islandSlug}/tours-activities`,
      );
    case "attractions":
      if (island === "WI") {
        return guideShortcut(
          `guide-attractions-${islandSlug}`,
          `${islandName} day-trip planning`,
          "day-trip",
          island,
          "Use the day-trip guide to layer Fort Segarra and other stops into a smaller-island route without forcing a thin attraction directory.",
          "/water-island/day-trip",
        );
      }

      if (island === "STJ") {
        return guideShortcut(
          `guide-attractions-${islandSlug}`,
          `Things to do on ${islandName}`,
          "things-to-do",
          island,
          `Use the ${islandName} field guide to connect the park, beaches, and attraction-style anchors without forcing a thin browse page.`,
          `/${islandSlug}/things-to-do`,
        );
      }

      return categoryShortcut(
        `category-attractions-${islandSlug}`,
        `${islandName} attractions`,
        "attractions",
        island,
        `Published attraction profiles for ${islandName}, including family, rainy-day, and cruise-day anchors.`,
        `/${islandSlug}/attractions`,
      );
    case "family":
      return island === "WI"
        ? guideShortcut(
            `guide-family-${islandSlug}`,
            "Water Island day trip",
            "day-trip",
            island,
            "A compact, ferry-first family day with beach time and a conservative return.",
            "/water-island/day-trip",
          )
        : guideShortcut(
            `guide-family-${islandSlug}`,
            `Things to do on ${islandName}`,
            "things-to-do",
            island,
            `Use the ${islandName} field guide to shape a family-flex day around beaches, attractions, and easier logistics.`,
            `/${islandSlug}/things-to-do`,
          );
    case "nightlife":
      if (island === "WI") {
        return guideShortcut(
          `guide-nightlife-${islandSlug}`,
          `${islandName} day-trip planning`,
          "day-trip",
          island,
          `Late-night plans from ${islandName} usually depend on the ferry and a return to St. Thomas, so start with the day-trip guide.`,
          "/water-island/day-trip",
        );
      }

      return categoryShortcut(
        `category-nightlife-${islandSlug}`,
        `${islandName} nightlife`,
        "nightlife-rhythm",
        island,
        `Published nightlife, bar, music, and late-night listings for ${islandName}.`,
        `/${islandSlug}/nightlife-rhythm`,
      );
    case "local-provisions":
      return categoryShortcut(
        `category-local-provisions-${islandSlug}`,
        `Local provisions on ${islandName}`,
        "local-provisions",
        island,
        `Published markets, practical provisions, shops, and island browse stops for ${islandName}.`,
        `/${islandSlug}/local-provisions`,
      );
    case "culture-history":
      return categoryShortcut(
        `category-culture-history-${islandSlug}`,
        `Culture & history on ${islandName}`,
        "culture-history",
        island,
        `Museums, forts, historic places, ruins, and cultural landmarks on ${islandName}.`,
        `/${islandSlug}/culture-history`,
      );
    case "sunset":
      return guideShortcut(
        `guide-sunset-${islandSlug}`,
        `Things to do on ${islandName}`,
        "things-to-do",
        island,
        `Use the ${islandName} field guide to shape beaches, waterfront dining, and slower sunset-friendly routes without a fake live recommendation layer.`,
        `/${islandSlug}/things-to-do`,
      );
    case "beaches":
      if (island === "STJ") {
        return guideShortcut(
          "guide-beaches-st-john",
          "St. John beaches",
          "beaches",
          island,
          "Compare St. John beaches by access, pace, snorkeling interest, and the ferry return.",
          "/st-john/beaches",
        );
      }
      return null;
    default:
      return null;
  }
}

function resolveIslandAlias(query: string): IslandCode | null {
  for (const [alias, extras] of Object.entries(ISLAND_ALIAS_TERMS)) {
    const islandCode =
      alias === "st thomas"
        ? "STT"
        : alias === "st john"
          ? "STJ"
          : alias === "st croix"
            ? "STX"
            : "WI";

    if (query === alias || query.endsWith(` ${alias}`)) {
      return islandCode;
    }

    for (const extra of extras) {
      const normalizedExtra = normalizeSearchText(extra);
      if (query === normalizedExtra || query.endsWith(` ${normalizedExtra}`)) {
        return islandCode;
      }
    }
  }

  return null;
}

function matchesPlanningPhrase(
  query: string,
  phrase: string,
): boolean {
  return query === phrase || query.includes(phrase);
}

export function resolveSearchIsland(query: string): IslandCode | null {
  return resolveIslandAlias(normalizeSearchText(query));
}

export function isBoatIntentQuery(query: string): boolean {
  const normalized = normalizeSearchText(query);
  return BOAT_INTENT_PHRASES.some((phrase) =>
    matchesPlanningPhrase(normalized, phrase),
  );
}

export function detectSearchPlanningIntent(
  query: string,
): SearchPlanningIntent | null {
  const normalized = normalizeSearchText(query);

  for (const { intent, phrases } of PLANNING_INTENT_PATTERNS) {
    if (phrases.some((phrase) => matchesPlanningPhrase(normalized, phrase))) {
      return intent;
    }
  }

  return null;
}

function isExactIslandQuery(query: string): boolean {
  return Object.entries(ISLAND_ALIAS_TERMS).some(([alias, extras]) => {
    if (query === alias) return true;
    return extras.some((extra) => normalizeSearchText(extra) === query);
  });
}

function getIslandSpecificThingsToDoShortcuts(
  query: string,
): GuideShortcut[] | null {
  if (!query.startsWith("things to do ")) {
    return null;
  }

  const island = resolveIslandAlias(query);
  if (!island) {
    return null;
  }

  const islandSpecific = GUIDE_SHORTCUTS["things to do"].filter(
    (shortcut) =>
      shortcut.island === island &&
      (shortcut.categoryName === "Guide" || shortcut.categoryName === "Utility"),
  );

  return islandSpecific.length > 0 ? islandSpecific : null;
}

function getExactIslandQueryShortcut(query: string): GuideShortcut[] | null {
  if (!isExactIslandQuery(query)) {
    return null;
  }

  const island = resolveIslandAlias(query);
  return island ? [islandHubShortcut(island)] : null;
}

function getIslandIntentShortcuts(query: string): GuideShortcut[] | null {
  const island = resolveIslandAlias(query);
  if (!island) {
    return null;
  }

  if (query.includes("food") || query.includes("dining") || query.includes("restaurant")) {
    return [buildIslandIntentShortcut(island, "dining")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("boating") || query.includes("boat") || query.includes("charter")) {
    return [buildIslandIntentShortcut(island, "excursions")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("food tour") || query.includes("eco tour") || query.includes("zipline") || query.includes("tour") || query.includes("activities")) {
    return [buildIslandIntentShortcut(island, "tours-activities")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("kids") || query.includes("family")) {
    return [buildIslandIntentShortcut(island, "family")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("attraction") || query.includes("marine park") || query.includes("coki point") || query.includes("skyride")) {
    return [buildIslandIntentShortcut(island, "attractions")].filter(Boolean) as GuideShortcut[];
  }

  if (
    query.includes("nightlife") ||
    query.includes(" night") ||
    query.includes("bar") ||
    query.includes("live music") ||
    query.includes("rum bar") ||
    query.includes("dancing")
  ) {
    return [buildIslandIntentShortcut(island, "nightlife")].filter(Boolean) as GuideShortcut[];
  }

  if (
    query.includes("local shops") ||
    query.includes("shops") ||
    query.includes("market") ||
    query.includes("local market") ||
    query.includes("gifts")
  ) {
    return [buildIslandIntentShortcut(island, "local-provisions")].filter(Boolean) as GuideShortcut[];
  }

  if (
    query.includes("culture") ||
    query.includes("history") ||
    query.includes("museum") ||
    query.includes("fort") ||
    query.includes("historic site") ||
    query.includes("ruins")
  ) {
    return [buildIslandIntentShortcut(island, "culture-history")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("sunset")) {
    return [buildIslandIntentShortcut(island, "sunset")].filter(Boolean) as GuideShortcut[];
  }

  if (query.includes("beach")) {
    return [buildIslandIntentShortcut(island, "beaches")].filter(Boolean) as GuideShortcut[];
  }

  return null;
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
  if (isBoatIntentQuery(normalized)) {
    return resolveSearchIsland(normalized) === "WI";
  }

  return (
    GUIDE_STYLE_QUERIES.has(normalized) ||
    getIslandSpecificThingsToDoShortcuts(normalized) !== null ||
    getExactIslandQueryShortcut(normalized) !== null ||
    getIslandIntentShortcuts(normalized) !== null
  );
}

export function shouldPrependGuideShortcuts(query: string): boolean {
  const normalized = normalizeSearchText(query);
  if (isBoatIntentQuery(normalized)) {
    return resolveSearchIsland(normalized) === "WI";
  }

  return (
    GUIDE_STYLE_QUERIES.has(normalized) ||
    getIslandSpecificThingsToDoShortcuts(normalized) !== null ||
    getExactIslandQueryShortcut(normalized) !== null ||
    getIslandIntentShortcuts(normalized) !== null ||
    normalized === "ferry" ||
    normalized === "cruise" ||
    isOwnerIntentQuery(normalized)
  );
}

export function getGuideShortcuts(query: string): GuideShortcut[] {
  const normalized = normalizeSearchText(query);
  if (isOwnerIntentQuery(normalized)) {
    return [OWNER_INTENT_UTILITY_SHORTCUT];
  }
  const islandSpecificThingsToDo = getIslandSpecificThingsToDoShortcuts(normalized);
  if (islandSpecificThingsToDo) {
    return islandSpecificThingsToDo;
  }
  const exactIslandShortcut = getExactIslandQueryShortcut(normalized);
  if (exactIslandShortcut) {
    return exactIslandShortcut;
  }
  const islandIntentShortcuts = getIslandIntentShortcuts(normalized);
  if (islandIntentShortcuts) {
    return islandIntentShortcuts;
  }
  return GUIDE_SHORTCUTS[normalized] ?? [];
}

export function isOwnerIntentQuery(query: string): boolean {
  const normalized = normalizeSearchText(query);
  return OWNER_INTENT_PHRASES.some(
    (phrase) => normalized === phrase || normalized.includes(phrase),
  );
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
