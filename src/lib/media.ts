import type { IslandSlug } from "@/lib/islands";

/** Gradient-only placeholders until licensed VI photography is added to /public/media. */
export type MediaAsset = {
  id: string;
  label: string;
  /** Tailwind gradient classes for placeholder backdrop */
  gradient: string;
  /** Optional path under /public — null = gradient only */
  src: string | null;
  alt: string;
};

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
    tagline: "Harbor energy & cruise-day pulse",
    vibe: "Nightlife · ferries · beaches · shopping",
    highlights: ["Red Hook ferries", "Havensight cruise port", "Magens Bay", "Charlotte Amalie"],
    media: {
      id: "island-stt",
      label: "St. Thomas",
      gradient: "from-cyan-300/55 via-sky-950/95 to-orange-500/35",
      src: null,
      alt: "Abstract coastal composition representing St. Thomas harbor and hills",
    },
  },
  "st-john": {
    tagline: "National park & turquoise coves",
    vibe: "Trails · snorkeling · quiet escape",
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
    tagline: "Culture, cuisine & reef depth",
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
  gradient: "from-cyan-400/30 via-midnight-950 to-coral-500/25",
  src: null,
  alt: "Abstract navigation field representing the U.S. Virgin Islands",
};

export const VIBE_FILTERS = [
  { id: "adventure", label: "Adventure", href: "/search?vibe=adventure" },
  { id: "beach", label: "Beach", href: "/search?vibe=beach" },
  { id: "boat", label: "Boat", href: "/st-john/excursions-charters" },
  { id: "food", label: "Food", href: "/search?vibe=food" },
  { id: "nightlife", label: "Nightlife", href: "/st-thomas/nightlife-rhythm" },
  { id: "family", label: "Family", href: "/search?vibe=family" },
  { id: "luxury", label: "Luxury", href: "/search?vibe=luxury" },
  { id: "local", label: "Local", href: "/search?vibe=local" },
  { id: "rainy", label: "Rainy day", href: "/search?vibe=rainy" },
  { id: "cruise", label: "Cruise stop", href: "/st-thomas/cruise-schedule" },
  { id: "date", label: "Date night", href: "/search?vibe=date" },
] as const;

export const CATEGORY_MEDIA: Record<string, string> = {
  "excursions-charters": "from-teal-400/50 via-navy-900 to-cyan-500/40",
  "indulgent-dining": "from-orange-400/45 via-purple-950 to-rose-400/35",
  "boutique-stays": "from-amber-300/40 via-indigo-950 to-sky-400/30",
  "nightlife-rhythm": "from-fuchsia-500/40 via-indigo-950 to-violet-600/45",
  "wellness-spas": "from-emerald-300/45 via-teal-950 to-cyan-300/35",
  "local-provisions": "from-lime-300/40 via-emerald-950 to-yellow-300/30",
};
