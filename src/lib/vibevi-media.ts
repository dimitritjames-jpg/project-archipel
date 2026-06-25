/**
 * Central VibeVI facelift media registry.
 * Paths match vibevi_media_package_v1 layout. Interim bootstrap uses .jpg until WebP package is installed.
 */

const V = "/media/vibevi";

export type ResponsiveMedia = {
  desktop: string;
  mobile: string;
  alt: string;
  objectPosition?: string;
};

export type CardMedia = ResponsiveMedia & {
  label: string;
  href: string;
};

function pair(
  basePath: string,
  alt: string,
  objectPosition = "center",
): ResponsiveMedia {
  const ext = basePath.endsWith(".jpg") ? "" : "";
  const stem = ext ? basePath : basePath;
  return {
    desktop: `${stem}-desktop.jpg`,
    mobile: `${stem}-mobile.jpg`,
    alt,
    objectPosition,
  };
}

export const VIBEVI_HOME = {
  hero: pair(
    `${V}/home/home-hero`,
    "Sunlit U.S. Virgin Islands shoreline with turquoise water, green hills, and warm morning light",
    "center 42%",
  ),
} as const;

export const VIBEVI_HOME_CARDS: CardMedia[] = [
  {
    ...pair(`${V}/home/cards/beach`, "Calm Caribbean beach with cream sand and clear water"),
    label: "Beaches",
    href: "/guides/best-beaches-usvi",
  },
  {
    ...pair(`${V}/home/cards/boat`, "Charter boat on turquoise water with island hills in the distance"),
    label: "Boat Day",
    href: "/experiences/adventure",
  },
  {
    ...pair(`${V}/home/cards/bite`, "Waterfront table with local island plates and golden-hour light"),
    label: "Bites",
    href: "/experiences/culinary",
  },
  {
    ...pair(`${V}/home/cards/night`, "Harbor boardwalk at night with warm lights and island rhythm"),
    label: "Nightlife",
    href: "/experiences/nightlife",
  },
  {
    ...pair(`${V}/home/cards/beach`, "Island trail and cove scene for things to do"),
    label: "Things To Do",
    href: "/st-thomas/things-to-do",
  },
  {
    ...pair(`${V}/home/cards/beach`, "Boutique stay terrace overlooking island water"),
    label: "Stays",
    href: "/experiences/stays",
  },
  {
    ...pair(`${V}/home/cards/beach`, "Quiet wellness morning by the water"),
    label: "Wellness",
    href: "/experiences/wellness",
  },
  {
    ...pair(`${V}/home/cards/culture`, "Local maker market with island color and community energy"),
    label: "Shops",
    href: "/experiences/local-shops",
  },
];

export const VIBEVI_MOODS: (CardMedia & { id: string })[] = [
  {
    id: "adventure",
    ...pair(`${V}/home/moods/adventure`, "Boat captain and deckhands preparing a charter on turquoise water"),
    label: "Adventure",
    href: "/experiences/adventure",
  },
  {
    id: "relax",
    ...pair(`${V}/home/moods/relax`, "Quiet beach cove with shade and calm water"),
    label: "Relax",
    href: "/guides/best-beaches-usvi",
  },
  {
    id: "romance",
    ...pair(`${V}/home/moods/romance`, "Waterfront dinner table at sunset"),
    label: "Romance",
    href: "/experiences/culinary",
  },
  {
    id: "culture",
    ...pair(`${V}/home/moods/culture`, "Local musicians and community rhythm on an island street"),
    label: "Culture",
    href: "/experiences/culture",
  },
  {
    id: "foodie",
    ...pair(`${V}/home/moods/foodie`, "Chef plating fresh island seafood at a waterfront kitchen"),
    label: "Foodie",
    href: "/experiences/culinary",
  },
  {
    id: "party",
    ...pair(`${V}/home/moods/party`, "Live music and harbor nightlife energy"),
    label: "Party",
    href: "/experiences/nightlife",
  },
  {
    id: "family",
    ...pair(`${V}/home/moods/family`, "Family enjoying a calm beach day together"),
    label: "Family",
    href: "/st-thomas/things-to-do",
  },
  {
    id: "wellness",
    ...pair(`${V}/home/moods/wellness`, "Slow morning wellness reset by the shore"),
    label: "Wellness",
    href: "/experiences/wellness",
  },
];

export const VIBEVI_ISLANDS: Record<
  string,
  ResponsiveMedia & { tagline: string; statement: string }
> = {
  "st-thomas": {
    ...pair(
      `${V}/islands/st-thomas`,
      "St. Thomas harbor, hills, and boat activity around Charlotte Amalie and Red Hook",
    ),
    tagline: "Harbor movement, beaches, dining, and boat days",
    statement:
      "Hills, harbors, Magens mornings, Red Hook ferries, waterfront bites, and late-night rhythm.",
  },
  "st-john": {
    ...pair(
      `${V}/islands/st-john`,
      "St. John cove with national park greens and calm turquoise water",
    ),
    tagline: "Park trails, calm coves, and slower island rhythm",
    statement:
      "Ferry-aware days around Cruz Bay, reef coves, park trails, and eco-forward water routes.",
  },
  "st-croix": {
    ...pair(
      `${V}/islands/st-croix`,
      "St. Croix boardwalk, heritage architecture, and reef-day energy",
    ),
    tagline: "Culture, food, history, and reef depth",
    statement:
      "Christiansted and Frederiksted rhythm, Buck Island routes, rum culture, and local community.",
  },
  "water-island": {
    ...pair(
      `${V}/islands/water-island`,
      "Small-island cove with ferry-day pace and quiet beach escape",
    ),
    tagline: "Small-island pace and simple beach escape",
    statement:
      "A ferry hop, golf-cart scale, Honeymoon Beach calm, and an easy return window.",
  },
};

export const VIBEVI_EXPERIENCES: Record<string, ResponsiveMedia & { title: string }> = {
  adventure: {
    title: "Adventure",
    ...pair(`${V}/experiences/adventure`, "Charter crew and guests heading out on turquoise water"),
  },
  culture: {
    title: "Culture",
    ...pair(`${V}/experiences/culture`, "Island culture, music, and community gathering energy"),
  },
  culinary: {
    title: "Culinary",
    ...pair(`${V}/experiences/culinary`, "Local plates and waterfront dining in the USVI"),
  },
  "cruise-day": {
    title: "Cruise Day",
    ...pair(`${V}/experiences/cruise-day`, "Harbor and port-day planning scene with island backdrop"),
  },
  nightlife: {
    title: "Nightlife",
    ...pair(`${V}/experiences/nightlife`, "Harbor nightlife with live music and boardwalk lights"),
  },
  wellness: {
    title: "Wellness",
    ...pair(`${V}/experiences/wellness`, "Calm beach wellness reset with soft morning light"),
  },
  stays: {
    title: "Stays",
    ...pair(`${V}/experiences/stays`, "Island stay terrace overlooking water and hills"),
  },
  "local-shops": {
    title: "Local Shops",
    ...pair(`${V}/experiences/local-shops`, "Local makers, provisions, and market stops"),
  },
};

export const VIBEVI_SEARCH = {
  hero: pair(
    `${V}/search/search-hero`,
    "Aerial view of turquoise USVI water for planning the day",
    "center 40%",
  ),
} as const;

export const VIBEVI_GET_LISTED = {
  hero: pair(
    `${V}/get-listed/get-listed-hero`,
    "Local business owner on a USVI waterfront ready to welcome visitors",
    "center 35%",
  ),
} as const;

export function getListingPlaceholder(categorySlug: string): string {
  const map: Record<string, string> = {
    "excursions-charters": `${V}/listings/placeholders/boat-charters-card.jpg`,
    "indulgent-dining": `${V}/listings/placeholders/dining-card.jpg`,
    "boutique-stays": `${V}/listings/placeholders/stays-card.jpg`,
    "nightlife-rhythm": `${V}/listings/placeholders/nightlife-card.jpg`,
    "wellness-spas": `${V}/listings/placeholders/wellness-card.jpg`,
    "local-provisions": `${V}/listings/placeholders/local-provisions-card.jpg`,
  };
  return map[categorySlug] ?? `${V}/listings/placeholders/beaches-card.jpg`;
}
