import type { IslandSlug } from "@/lib/islands";
import {
  VIBEVI_EXPERIENCES,
  VIBEVI_GET_LISTED,
  VIBEVI_HOME,
  VIBEVI_ISLANDS,
  getListingPlaceholder,
} from "@/lib/vibevi-media";

/**
 * Legal-first media registry. Production-owned/licensed media should replace
 * generated atmospheric assets over time. Until then, the generated files in
 * `/public/media/generated` are the safe public visual system for VibeVI.
 */
export type MediaAsset = {
  id: string;
  label: string;
  /** Tailwind gradient classes for the legal fallback artwork */
  gradient: string;
  /** Optional path under /public — null = gradient only */
  src: string | null;
  alt: string;
};

/** Recommended production drop paths; see `/public/media/README.md`. */
export const PRODUCTION_MEDIA_PATHS = {
  hero: {
    waterBoat: "/media/hero/vibevi-hero-water-boat.jpg",
    sunsetVideo: "/media/hero/vibevi-hero-sunset-water.mp4",
  },
  islands: {
    "st-thomas": "/media/islands/st-thomas-harbor-magens.jpg",
    "st-croix": "/media/islands/st-croix-boardwalk-buck-island.jpg",
    "st-john": "/media/islands/st-john-cove-national-park.jpg",
    "water-island": "/media/islands/water-island-honeymoon-ferry.jpg",
  },
  categories: {
    beach: "/media/categories/beach-day.jpg",
    boat: "/media/categories/boat-day.jpg",
    bite: "/media/categories/bite-local-plate.jpg",
    night: "/media/categories/night-boardwalk.jpg",
  },
  experiences: {
    culinary: "/media/experiences/culinary-waterfront-table.jpg",
    culture: "/media/experiences/culture-carnival-music.jpg",
    adventure: "/media/experiences/adventure-charter-snorkel.jpg",
    cruiseDay: "/media/experiences/cruise-day-harbor.jpg",
  },
  guides: "/media/guides/{guide-slug}.webp",
  businesses: "/media/businesses/{business-slug}/cover.webp",
  openGraph: "/opengraph-image",
  generated: "/media/generated/{asset-id}.jpg",
  sponsors: "/media/sponsors/{placement-id}.webp",
} as const;

export const GENERATED_MEDIA_PATHS = {
  heroIslandSunrise: "/media/generated/vibevi-ai-hero-island-sunrise.jpg",
  beachDay: "/media/generated/vibevi-ai-beach-day.jpg",
  boatDay: "/media/generated/vibevi-ai-boat-day.jpg",
  biteWaterfront: "/media/generated/vibevi-ai-bite-waterfront.jpg",
  nightBoardwalk: "/media/generated/vibevi-ai-night-boardwalk.jpg",
  cultureStreet: "/media/generated/vibevi-ai-culture-street.jpg",
} as const;

export const ISLAND_PORTALS: Record<
  IslandSlug,
  {
    tagline: string;
    vibe: string;
    highlights: string[];
    media: MediaAsset;
  }
> = {
  "st-thomas": {
    tagline: "Harbor buzz, beach resets, and late nights",
    vibe: "Ferries · Magens Bay · Charlotte Amalie · Red Hook nights",
    highlights: ["Red Hook ferries", "Havensight cruise port", "Magens Bay", "Charlotte Amalie"],
    media: {
      id: "island-stt",
      label: "St. Thomas",
      gradient: "from-cyan-200/65 via-sky-950/95 to-orange-400/45",
      src: VIBEVI_ISLANDS["st-thomas"].desktop,
      alt: VIBEVI_ISLANDS["st-thomas"].alt,
    },
  },
  "st-john": {
    tagline: "Park trails, turquoise coves, and Cruz Bay ease",
    vibe: "Trails · snorkeling · quiet escape · reef days",
    highlights: ["Virgin Islands National Park", "Cruz Bay", "Trunk Bay", "Reef charters"],
    media: {
      id: "island-stj",
      label: "St. John",
      gradient: "from-emerald-300/50 via-teal-950/95 to-cyan-500/35",
      src: VIBEVI_ISLANDS["st-john"].desktop,
      alt: VIBEVI_ISLANDS["st-john"].alt,
    },
  },
  "st-croix": {
    tagline: "Big-island soul, food culture, and reef depth",
    vibe: "Food · history · diving · boardwalk rhythm",
    highlights: ["Christiansted", "Buck Island", "Cane Bay", "Frederiksted pier"],
    media: {
      id: "island-stx",
      label: "St. Croix",
      gradient: "from-amber-300/45 via-indigo-950/95 to-rose-500/35",
      src: VIBEVI_ISLANDS["st-croix"].desktop,
      alt: VIBEVI_ISLANDS["st-croix"].alt,
    },
  },
  "water-island": {
    tagline: "Small-island slow lane",
    vibe: "Hidden beach · ferry hop · unwind",
    highlights: ["Honeymoon Beach", "Crown Bay ferry", "Kayak coves", "Sunset picnics"],
    media: {
      id: "island-wi",
      label: "Water Island",
      gradient: "from-sky-200/55 via-blue-950/95 to-lime-400/30",
      src: VIBEVI_ISLANDS["water-island"].desktop,
      alt: VIBEVI_ISLANDS["water-island"].alt,
    },
  },
};

export const EXPERIENCE_MOSAIC: MediaAsset[] = [
  {
    id: "beach-day",
    label: "Beach day",
    gradient: "from-cyan-300/60 via-sky-800 to-amber-200/30",
    src: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Generated atmospheric beach-day scene with cream sand, turquoise water, palm shade, and a quiet island cove",
  },
  {
    id: "boat-charter",
    label: "Boat charter",
    gradient: "from-teal-400/50 via-navy-900 to-indigo-500/40",
    src: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Generated atmospheric boat-day scene with an unbranded sailboat on turquoise water near a green island cove",
  },
  {
    id: "snorkel-dive",
    label: "Snorkel + dive",
    gradient: "from-emerald-400/55 via-cyan-950 to-blue-600/45",
    src: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Generated atmospheric turquoise-water boat scene for snorkeling and reef-day planning",
  },
  {
    id: "sunset-dinner",
    label: "Sunset dinner",
    gradient: "from-orange-400/50 via-purple-950 to-rose-500/45",
    src: GENERATED_MEDIA_PATHS.biteWaterfront,
    alt: "Generated atmospheric waterfront dining scene with island plates, tropical drink, and golden-hour ocean light",
  },
  {
    id: "nightlife",
    label: "Nightlife + rhythm",
    gradient: "from-fuchsia-500/40 via-indigo-950 to-violet-600/50",
    src: GENERATED_MEDIA_PATHS.nightBoardwalk,
    alt: "Generated atmospheric waterfront boardwalk night scene with warm lights, blue-hour water, and music energy",
  },
  {
    id: "local-shops",
    label: "Local shops",
    gradient: "from-lime-300/40 via-emerald-950 to-yellow-400/30",
    src: GENERATED_MEDIA_PATHS.cultureStreet,
    alt: "Generated atmospheric island market street scene for local shops and provisions",
  },
  {
    id: "wellness",
    label: "Wellness + spa",
    gradient: "from-green-300/45 via-teal-950 to-cyan-400/35",
    src: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Generated atmospheric quiet beach scene for wellness discovery",
  },
  {
    id: "family-day",
    label: "Family day",
    gradient: "from-sky-300/55 via-blue-900 to-amber-300/35",
    src: GENERATED_MEDIA_PATHS.heroIslandSunrise,
    alt: "Generated atmospheric island sunrise scene for a family island day",
  },
];

export const HERO_MEDIA: MediaAsset = {
  id: "vibevi-home-hero",
  label: "US Virgin Islands",
  gradient: "from-cyan-200/45 via-midnight-950 to-orange-400/35",
  src: VIBEVI_HOME.hero.desktop,
  alt: VIBEVI_HOME.hero.alt,
};

export const GET_LISTED_MEDIA: MediaAsset = {
  id: "vibevi-get-listed",
  label: "VibeVI for business",
  gradient: "from-coral/35 via-midnight-950 to-aqua/25",
  src: VIBEVI_GET_LISTED.hero.desktop,
  alt: VIBEVI_GET_LISTED.hero.alt,
};

export const FERRY_MEDIA: MediaAsset = {
  id: "generated-ferry-boat-day",
  label: "Ferry routes",
  gradient: "from-cyan-300/45 via-midnight-950 to-teal-600/35",
  src: GENERATED_MEDIA_PATHS.boatDay,
  alt: "Generated atmospheric boat and turquoise channel scene for ferry planning",
};

export const CRUISE_DAY_MEDIA: MediaAsset = {
  id: "generated-cruise-day-harbor",
  label: "Cruise-day planning",
  gradient: "from-rose-400/35 via-midnight-950 to-amber-500/30",
  src: GENERATED_MEDIA_PATHS.heroIslandSunrise,
  alt: "Generated atmospheric island harbor scene for cruise-day planning",
};

export const EXPERIENCE_HERO_MEDIA: Record<string, MediaAsset> = {
  adventure: {
    id: "generated-experience-adventure",
    label: "Adventure",
    gradient: "from-teal-300/55 via-blue-950 to-cyan-500/35",
    src: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Generated atmospheric island boat-day scene for USVI adventure planning",
  },
  culture: {
    id: "generated-experience-culture",
    label: "Culture",
    gradient: "from-amber-300/50 via-purple-950 to-rose-500/35",
    src: GENERATED_MEDIA_PATHS.cultureStreet,
    alt: "Generated atmospheric island culture street scene with market color and waterfront light",
  },
  culinary: {
    id: "generated-experience-culinary",
    label: "Culinary",
    gradient: "from-orange-300/55 via-fuchsia-950 to-coral-500/35",
    src: GENERATED_MEDIA_PATHS.biteWaterfront,
    alt: "Generated atmospheric waterfront dining scene for USVI culinary discovery",
  },
  "cruise-day": CRUISE_DAY_MEDIA,
  nightlife: {
    id: "generated-experience-nightlife",
    label: "Nightlife",
    gradient: "from-fuchsia-500/45 via-indigo-950 to-violet-500/40",
    src: GENERATED_MEDIA_PATHS.nightBoardwalk,
    alt: "Generated atmospheric island boardwalk night scene with music and warm lights",
  },
  wellness: {
    id: "generated-experience-wellness",
    label: "Wellness",
    gradient: "from-emerald-300/45 via-teal-950 to-cyan-300/35",
    src: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Generated atmospheric quiet beach scene for a slow wellness day",
  },
  stays: {
    id: "generated-experience-stays",
    label: "Stays",
    gradient: "from-amber-300/40 via-indigo-950 to-sky-400/30",
    src: GENERATED_MEDIA_PATHS.heroIslandSunrise,
    alt: "Generated atmospheric island sunrise scene for choosing a USVI home base",
  },
  "local-shops": {
    id: "generated-experience-local-shops",
    label: "Local shops",
    gradient: "from-lime-300/40 via-emerald-950 to-yellow-300/30",
    src: GENERATED_MEDIA_PATHS.cultureStreet,
    alt: "Generated atmospheric island maker and market street scene",
  },
};

export const VIBE_FILTERS = [
  { id: "beach", label: "Beach day", href: "/search?vibe=beach" },
  { id: "boat", label: "Boat charter", href: "/st-john/excursions-charters" },
  { id: "food", label: "Local plate", href: "/experiences/culinary" },
  { id: "luxury", label: "Sunset dinner", href: "/search?vibe=luxury" },
  { id: "nightlife", label: "Boardwalk night", href: "/st-thomas/nightlife-rhythm" },
  { id: "culture", label: "Culture walk", href: "/experiences/culture" },
  { id: "cruise", label: "Cruise day", href: "/experiences/cruise-day" },
  { id: "family", label: "Family day", href: "/search?vibe=family" },
  { id: "rainy", label: "Rainy day", href: "/search?vibe=rainy" },
] as const;

export const CATEGORY_MEDIA: Record<string, string> = {
  "excursions-charters": "from-teal-400/50 via-navy-900 to-cyan-500/40",
  "indulgent-dining": "from-orange-400/45 via-purple-950 to-rose-400/35",
  "boutique-stays": "from-amber-300/40 via-indigo-950 to-sky-400/30",
  "nightlife-rhythm": "from-fuchsia-500/40 via-indigo-950 to-violet-600/45",
  "wellness-spas": "from-emerald-300/45 via-teal-950 to-cyan-300/35",
  "local-provisions": "from-lime-300/40 via-emerald-950 to-yellow-300/30",
};

export const CATEGORY_MEDIA_ASSETS: Record<string, MediaAsset> = {
  "excursions-charters": {
    id: "category-excursions-charters",
    label: "Boat days",
    gradient: CATEGORY_MEDIA["excursions-charters"],
    src: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Generated atmospheric charter boat scene on turquoise USVI-style water",
  },
  "indulgent-dining": {
    id: "category-indulgent-dining",
    label: "Island dining",
    gradient: CATEGORY_MEDIA["indulgent-dining"],
    src: GENERATED_MEDIA_PATHS.biteWaterfront,
    alt: "Generated atmospheric waterfront dining scene with island plates and golden-hour light",
  },
  "boutique-stays": {
    id: "category-boutique-stays",
    label: "Island stays",
    gradient: CATEGORY_MEDIA["boutique-stays"],
    src: GENERATED_MEDIA_PATHS.heroIslandSunrise,
    alt: "Generated atmospheric island sunrise scene for USVI stays and home bases",
  },
  "nightlife-rhythm": {
    id: "category-nightlife-rhythm",
    label: "Island nightlife",
    gradient: CATEGORY_MEDIA["nightlife-rhythm"],
    src: GENERATED_MEDIA_PATHS.nightBoardwalk,
    alt: "Generated atmospheric waterfront boardwalk night scene with warm lights",
  },
  "wellness-spas": {
    id: "category-wellness-spas",
    label: "Island wellness",
    gradient: CATEGORY_MEDIA["wellness-spas"],
    src: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Generated atmospheric quiet beach scene for island wellness and slow-day planning",
  },
  "local-provisions": {
    id: "category-local-provisions",
    label: "Local provisions",
    gradient: CATEGORY_MEDIA["local-provisions"],
    src: GENERATED_MEDIA_PATHS.cultureStreet,
    alt: "Generated atmospheric island market and local provisions scene",
  },
};

export function getCategoryMediaAsset(categorySlug: string, label?: string): MediaAsset {
  const placeholder = getListingPlaceholder(categorySlug);
  const fallback = CATEGORY_MEDIA_ASSETS[categorySlug] ?? CATEGORY_MEDIA_ASSETS["local-provisions"];
  const asset: MediaAsset = {
    ...fallback,
    src: placeholder,
  };

  return label ? { ...asset, label } : asset;
}

export function getExperienceHeroMedia(slug: string, label?: string): MediaAsset {
  const vibevi = VIBEVI_EXPERIENCES[slug];
  const asset: MediaAsset = vibevi
    ? {
        id: `vibevi-experience-${slug}`,
        label: label ?? vibevi.title,
        gradient: EXPERIENCE_HERO_MEDIA[slug]?.gradient ?? HERO_MEDIA.gradient,
        src: vibevi.desktop,
        alt: vibevi.alt,
      }
    : (EXPERIENCE_HERO_MEDIA[slug] ?? HERO_MEDIA);

  return label ? { ...asset, label } : asset;
}

export function getGuideMediaAsset(input: string, label = "Island guide"): MediaAsset {
  const key = input.toLowerCase();
  let asset: MediaAsset = HERO_MEDIA;

  if (key.includes("beach") || key.includes("magens") || key.includes("national-park")) {
    asset = {
      id: "guide-beach",
      label: "Beach guide",
      gradient: "from-cyan-300/45 via-midnight-950 to-emerald-500/30",
      src: GENERATED_MEDIA_PATHS.beachDay,
      alt: "Generated atmospheric beach guide scene with turquoise water and cream sand",
    };
  } else if (key.includes("charter") || key.includes("snorkel") || key.includes("buck") || key.includes("ferry")) {
    asset = FERRY_MEDIA;
  } else if (key.includes("restaurant") || key.includes("culinary") || key.includes("dining") || key.includes("bite")) {
    asset = getCategoryMediaAsset("indulgent-dining", label);
  } else if (key.includes("night")) {
    asset = getCategoryMediaAsset("nightlife-rhythm", label);
  } else if (key.includes("culture") || key.includes("things-to-do") || key.includes("shop") || key.includes("market")) {
    asset = getCategoryMediaAsset("local-provisions", label);
  } else if (key.includes("cruise")) {
    asset = CRUISE_DAY_MEDIA;
  }

  return { ...asset, label };
}
