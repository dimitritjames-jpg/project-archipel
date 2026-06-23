import type { IslandSlug } from "@/lib/islands";

/**
 * Legal-first media registry. Keep `src: null` until an owned or licensed asset is
 * dropped into the matching `/public/media` location. Gradient fallbacks are the
 * production-safe default and must remain usable without photography.
 */
export type MediaAsset = {
  id: string;
  label: string;
  /** Tailwind gradient classes for placeholder backdrop */
  gradient: string;
  /** Optional path under /public — null = gradient only */
  src: string | null;
  alt: string;
};

/** Recommended production drop paths; see `/public/media/README.md`. */
export const PRODUCTION_MEDIA_PATHS = {
  hero: "/media/hero/vibevi-usvi-hero.webp",
  islands: {
    "st-thomas": "/media/islands/st-thomas-harbor.webp",
    "st-croix": "/media/islands/st-croix-coast.webp",
    "st-john": "/media/islands/st-john-cove.webp",
    "water-island": "/media/islands/water-island-honeymoon-beach.webp",
  },
  experiences: "/media/experiences/{island-or-usvi}-{experience}.webp",
  categories: "/media/categories/{category-slug}.webp",
  guides: "/media/guides/{guide-slug}.webp",
  businesses: "/media/businesses/{business-slug}/cover.webp",
  openGraph: "/media/og/vibevi-default-1200x630.webp",
  sponsors: "/media/sponsors/{placement-id}.webp",
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
      src: null,
      alt: "Abstract coastal composition representing St. Thomas harbor and hills",
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
      src: null,
      alt: "Abstract coastal composition representing St. John",
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
      src: null,
      alt: "Abstract coastal composition representing St. Croix",
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
      src: null,
      alt: "Abstract coastal composition representing Water Island",
    },
  },
};

export const EXPERIENCE_MOSAIC: MediaAsset[] = [
  {
    id: "beach-day",
    label: "Beach day",
    gradient: "from-cyan-300/60 via-sky-800 to-amber-200/30",
    src: null,
    alt: "Abstract island composition for beach-day discovery",
  },
  {
    id: "boat-charter",
    label: "Boat charter",
    gradient: "from-teal-400/50 via-navy-900 to-indigo-500/40",
    src: null,
    alt: "Abstract ocean composition for boat-charter discovery",
  },
  {
    id: "snorkel-dive",
    label: "Snorkel + dive",
    gradient: "from-emerald-400/55 via-cyan-950 to-blue-600/45",
    src: null,
    alt: "Abstract reef composition for snorkeling and diving",
  },
  {
    id: "sunset-dinner",
    label: "Sunset dinner",
    gradient: "from-orange-400/50 via-purple-950 to-rose-500/45",
    src: null,
    alt: "Abstract sunset composition for waterfront dining",
  },
  {
    id: "nightlife",
    label: "Nightlife + rhythm",
    gradient: "from-fuchsia-500/40 via-indigo-950 to-violet-600/50",
    src: null,
    alt: "Abstract night composition for island nightlife",
  },
  {
    id: "local-shops",
    label: "Local shops",
    gradient: "from-lime-300/40 via-emerald-950 to-yellow-400/30",
    src: null,
    alt: "Abstract botanical composition for local shops and provisions",
  },
  {
    id: "wellness",
    label: "Wellness + spa",
    gradient: "from-green-300/45 via-teal-950 to-cyan-400/35",
    src: null,
    alt: "Abstract botanical composition for wellness discovery",
  },
  {
    id: "family-day",
    label: "Family day",
    gradient: "from-sky-300/55 via-blue-900 to-amber-300/35",
    src: null,
    alt: "Abstract coastal composition for a family island day",
  },
];

export const HERO_MEDIA: MediaAsset = {
  id: "hero-archipelago",
  label: "US Virgin Islands",
  gradient: "from-cyan-200/45 via-midnight-950 to-orange-400/35",
  src: null,
  alt: "Abstract warm ocean composition representing the U.S. Virgin Islands",
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
