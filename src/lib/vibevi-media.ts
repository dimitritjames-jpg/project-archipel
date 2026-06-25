/**
 * Official VibeVI media registry (vibevi_media_package_v1).
 * Paths and alt text sourced from manifest.json and cursor-route-media-map.json.
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

function responsive(
  desktop: string,
  mobile: string,
  alt: string,
  objectPosition = "center",
): ResponsiveMedia {
  return { desktop, mobile, alt, objectPosition };
}

export const VIBEVI_HOME = {
  hero: responsive(
    `${V}/home/home-hero-desktop.webp`,
    `${V}/home/home-hero-mobile.webp`,
    "Sunlit U.S. Virgin Islands shoreline with turquoise water and warm island morning light",
    "center 42%",
  ),
} as const;

export const VIBEVI_HOME_CARDS: CardMedia[] = [
  {
    ...responsive(
      `${V}/home/cards/card-beach-local-day-desktop.webp`,
      `${V}/home/cards/card-beach-local-day-mobile.webp`,
      "Local beach day scene with cream sand and clear Caribbean water",
    ),
    label: "Beaches",
    href: "/guides/best-beaches-usvi",
  },
  {
    ...responsive(
      `${V}/home/cards/card-boat-local-captain-desktop.webp`,
      `${V}/home/cards/card-boat-local-captain-mobile.webp`,
      "Local boat captain and crew preparing a charter on turquoise water",
    ),
    label: "Boat Day",
    href: "/experiences/adventure",
  },
  {
    ...responsive(
      `${V}/home/cards/card-bite-sunset-dining-desktop.webp`,
      `${V}/home/cards/card-bite-sunset-dining-mobile.webp`,
      "Waterfront sunset dining with local island plates",
    ),
    label: "Bites",
    href: "/experiences/culinary",
  },
  {
    ...responsive(
      `${V}/home/cards/card-night-local-music-desktop.webp`,
      `${V}/home/cards/card-night-local-music-mobile.webp`,
      "Local musicians and harbor nightlife energy after sunset",
    ),
    label: "Nightlife",
    href: "/experiences/nightlife",
  },
  {
    ...responsive(
      `${V}/home/cards/card-beach-local-day-desktop.webp`,
      `${V}/home/cards/card-beach-local-day-mobile.webp`,
      "Island day planning scene with beach and trail energy",
    ),
    label: "Things To Do",
    href: "/st-thomas/things-to-do",
  },
  {
    ...responsive(
      `${V}/experiences/experience-stays-thumbnail.webp`,
      `${V}/experiences/experience-stays-thumbnail.webp`,
      "Island stay terrace overlooking water and hills",
    ),
    label: "Stays",
    href: "/experiences/stays",
  },
  {
    ...responsive(
      `${V}/experiences/experience-wellness-thumbnail.webp`,
      `${V}/experiences/experience-wellness-thumbnail.webp`,
      "Quiet wellness morning by the shore",
    ),
    label: "Wellness",
    href: "/experiences/wellness",
  },
  {
    ...responsive(
      `${V}/experiences/experience-local-shops-thumbnail.webp`,
      `${V}/experiences/experience-local-shops-thumbnail.webp`,
      "Local makers, provisions, and market stops",
    ),
    label: "Shops",
    href: "/experiences/local-shops",
  },
];

const MOOD_PATHS = {
  adventure: "mood-adventure",
  relax: "mood-relax",
  romance: "mood-romance",
  culture: "mood-culture",
  foodie: "mood-foodie",
  party: "mood-party",
  family: "mood-family",
  wellness: "mood-wellness",
} as const;

export const VIBEVI_MOODS: (CardMedia & { id: string })[] = [
  {
    id: "adventure",
    label: "Adventure",
    href: "/experiences/adventure",
    ...responsive(
      `${V}/home/moods/mood-adventure-horizontal.webp`,
      `${V}/home/moods/mood-adventure-vertical.webp`,
      "Boat captain and deckhands preparing a charter on turquoise water",
    ),
  },
  {
    id: "relax",
    label: "Relax",
    href: "/guides/best-beaches-usvi",
    ...responsive(
      `${V}/home/moods/mood-relax-horizontal.webp`,
      `${V}/home/moods/mood-relax-vertical.webp`,
      "Quiet beach cove with shade and calm water",
    ),
  },
  {
    id: "romance",
    label: "Romance",
    href: "/experiences/culinary",
    ...responsive(
      `${V}/home/moods/mood-romance-horizontal.webp`,
      `${V}/home/moods/mood-romance-vertical.webp`,
      "Waterfront dinner table at sunset",
    ),
  },
  {
    id: "culture",
    label: "Culture",
    href: "/experiences/culture",
    ...responsive(
      `${V}/home/moods/mood-culture-horizontal.webp`,
      `${V}/home/moods/mood-culture-vertical.webp`,
      "Local musicians and community rhythm on an island street",
    ),
  },
  {
    id: "foodie",
    label: "Foodie",
    href: "/experiences/culinary",
    ...responsive(
      `${V}/home/moods/mood-foodie-horizontal.webp`,
      `${V}/home/moods/mood-foodie-vertical.webp`,
      "Chef plating fresh island seafood at a waterfront kitchen",
    ),
  },
  {
    id: "party",
    label: "Party",
    href: "/experiences/nightlife",
    ...responsive(
      `${V}/home/moods/mood-party-horizontal.webp`,
      `${V}/home/moods/mood-party-vertical.webp`,
      "Live music and harbor nightlife energy",
    ),
  },
  {
    id: "family",
    label: "Family",
    href: "/st-thomas/things-to-do",
    ...responsive(
      `${V}/home/moods/mood-family-horizontal.webp`,
      `${V}/home/moods/mood-family-vertical.webp`,
      "Family enjoying a calm beach day together",
    ),
  },
  {
    id: "wellness",
    label: "Wellness",
    href: "/experiences/wellness",
    ...responsive(
      `${V}/home/moods/mood-wellness-horizontal.webp`,
      `${V}/home/moods/mood-wellness-vertical.webp`,
      "Slow morning wellness reset by the shore",
    ),
  },
];

export { MOOD_PATHS };

export const VIBEVI_ISLANDS: Record<
  string,
  ResponsiveMedia & { tagline: string; statement: string; thumbnail: string }
> = {
  "st-thomas": {
    ...responsive(
      `${V}/islands/island-st-thomas-hero-desktop.webp`,
      `${V}/islands/island-st-thomas-hero-mobile.webp`,
      "St. Thomas harbor, hills, and boat activity around Charlotte Amalie and Red Hook",
    ),
    thumbnail: `${V}/islands/island-st-thomas-thumbnail.webp`,
    tagline: "Harbor movement, beaches, dining, and boat days",
    statement:
      "Hills, harbors, Magens mornings, Red Hook ferries, waterfront bites, and late-night rhythm.",
  },
  "st-john": {
    ...responsive(
      `${V}/islands/island-st-john-hero-desktop.webp`,
      `${V}/islands/island-st-john-hero-mobile.webp`,
      "St. John cove with national park greens and calm turquoise water",
    ),
    thumbnail: `${V}/islands/island-st-john-thumbnail.webp`,
    tagline: "Park trails, calm coves, and slower island rhythm",
    statement:
      "Ferry-aware days around Cruz Bay, reef coves, park trails, and eco-forward water routes.",
  },
  "st-croix": {
    ...responsive(
      `${V}/islands/island-st-croix-hero-desktop.webp`,
      `${V}/islands/island-st-croix-hero-mobile.webp`,
      "St. Croix boardwalk, heritage architecture, and reef-day energy",
    ),
    thumbnail: `${V}/islands/island-st-croix-thumbnail.webp`,
    tagline: "Culture, food, history, and reef depth",
    statement:
      "Christiansted and Frederiksted rhythm, Buck Island routes, rum culture, and local community.",
  },
  "water-island": {
    ...responsive(
      `${V}/islands/island-water-island-hero-desktop.webp`,
      `${V}/islands/island-water-island-hero-mobile.webp`,
      "Small-island cove with ferry-day pace and quiet beach escape",
    ),
    thumbnail: `${V}/islands/island-water-island-thumbnail.webp`,
    tagline: "Small-island pace and simple beach escape",
    statement:
      "A ferry hop, golf-cart scale, Honeymoon Beach calm, and an easy return window.",
  },
};

const EXPERIENCE_SLUGS = [
  "adventure",
  "culture",
  "culinary",
  "cruise-day",
  "nightlife",
  "wellness",
  "stays",
  "local-shops",
] as const;

const EXPERIENCE_TITLES: Record<string, string> = {
  adventure: "Adventure",
  culture: "Culture",
  culinary: "Culinary",
  "cruise-day": "Cruise Day",
  nightlife: "Nightlife",
  wellness: "Wellness",
  stays: "Stays",
  "local-shops": "Local Shops",
};

export const VIBEVI_EXPERIENCES: Record<
  string,
  ResponsiveMedia & { title: string; thumbnail: string }
> = Object.fromEntries(
  EXPERIENCE_SLUGS.map((slug) => [
    slug,
    {
      title: EXPERIENCE_TITLES[slug] ?? slug,
      ...responsive(
        `${V}/experiences/experience-${slug}-hero-desktop.webp`,
        `${V}/experiences/experience-${slug}-hero-mobile.webp`,
        `Editorial ${EXPERIENCE_TITLES[slug]?.toLowerCase() ?? slug} discovery scene in the U.S. Virgin Islands`,
      ),
      thumbnail: `${V}/experiences/experience-${slug}-thumbnail.webp`,
    },
  ]),
);

export const VIBEVI_SEARCH = {
  hero: responsive(
    `${V}/search/find-the-move-aerial-hero-desktop.webp`,
    `${V}/search/find-the-move-aerial-hero-mobile.webp`,
    "Aerial view of turquoise USVI water for planning the day",
    "center 40%",
  ),
} as const;

export const VIBEVI_GET_LISTED = {
  hero: responsive(
    `${V}/get-listed/local-business-owner-hero-desktop.webp`,
    `${V}/get-listed/local-business-owner-hero-mobile.webp`,
    "Local business owner on a U.S. Virgin Islands waterfront",
    "center 35%",
  ),
} as const;

const PLACEHOLDER_BY_CATEGORY: Record<string, string> = {
  "excursions-charters": `${V}/experiences/experience-adventure-thumbnail.webp`,
  "indulgent-dining": `${V}/experiences/experience-culinary-thumbnail.webp`,
  "boutique-stays": `${V}/experiences/experience-stays-thumbnail.webp`,
  "nightlife-rhythm": `${V}/experiences/experience-nightlife-thumbnail.webp`,
  "wellness-spas": `${V}/experiences/experience-wellness-thumbnail.webp`,
  "local-provisions": `${V}/experiences/experience-local-shops-thumbnail.webp`,
};

export function getListingPlaceholder(categorySlug: string): string {
  return (
    PLACEHOLDER_BY_CATEGORY[categorySlug] ??
    `${V}/listings/placeholders/placeholder-beach-landscape.webp`
  );
}

export const VIBEVI_LISTING_PLACEHOLDERS = {
  landscape: `${V}/listings/placeholders/placeholder-beach-landscape.webp`,
  square: `${V}/listings/placeholders/placeholder-beach-square.webp`,
  vertical: `${V}/listings/placeholders/placeholder-beach-vertical.webp`,
} as const;
