/** Core taxonomy seeded in Supabase — slugs are immutable routing keys. */
export const CORE_CATEGORIES = [
  {
    name: "Excursions & Charters",
    slug: "excursions-charters",
    schemaType: "TouristInformationCenter",
    sortOrder: 1,
  },
  {
    name: "Indulgent Dining",
    slug: "indulgent-dining",
    schemaType: "Restaurant",
    sortOrder: 2,
  },
  {
    name: "Boutique Stays",
    slug: "boutique-stays",
    schemaType: "LodgingBusiness",
    sortOrder: 3,
  },
  {
    name: "Nightlife & Rhythm",
    slug: "nightlife-rhythm",
    schemaType: "BarOrPub",
    sortOrder: 4,
  },
  {
    name: "Wellness & Spas",
    slug: "wellness-spas",
    schemaType: "HealthAndBeautyBusiness",
    sortOrder: 5,
  },
  {
    name: "Culture & History",
    slug: "culture-history",
    schemaType: "TouristAttraction",
    sortOrder: 6,
  },
  {
    name: "Local Provisions",
    slug: "local-provisions",
    schemaType: "Store",
    sortOrder: 7,
  },
] as const;

export type CategorySlug = (typeof CORE_CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS = CORE_CATEGORIES.map((c) => c.slug);

export const RESERVED_CATEGORY_SLUGS = [
  ...CATEGORY_SLUGS,
  "ferry-schedule",
  "cruise-schedule",
  "magens-bay",
  "snorkeling-charters",
  "buck-island",
  "virgin-islands-national-park",
  "things-to-do",
  "beaches",
  "best-snorkeling",
  "cruise-day",
  "day-trip",
] as const;

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}

export function getCategoryBySlug(slug: string) {
  return CORE_CATEGORIES.find((c) => c.slug === slug) ?? null;
}
