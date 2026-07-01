/** Core taxonomy seeded in Supabase — slugs are immutable routing keys. */
export const CORE_CATEGORIES = [
  {
    name: "Excursions & Charters",
    slug: "excursions-charters",
    schemaType: "TouristInformationCenter",
    sortOrder: 1,
  },
  {
    name: "Tours & Activities",
    slug: "tours-activities",
    schemaType: "TouristTrip",
    sortOrder: 2,
  },
  {
    name: "Attractions",
    slug: "attractions",
    schemaType: "TouristAttraction",
    sortOrder: 3,
  },
  {
    name: "Indulgent Dining",
    slug: "indulgent-dining",
    schemaType: "Restaurant",
    sortOrder: 4,
  },
  {
    name: "Boutique Stays",
    slug: "boutique-stays",
    schemaType: "LodgingBusiness",
    sortOrder: 5,
  },
  {
    name: "Nightlife & Rhythm",
    slug: "nightlife-rhythm",
    schemaType: "BarOrPub",
    sortOrder: 6,
  },
  {
    name: "Wellness & Spas",
    slug: "wellness-spas",
    schemaType: "HealthAndBeautyBusiness",
    sortOrder: 7,
  },
  {
    name: "Culture & History",
    slug: "culture-history",
    schemaType: "TouristAttraction",
    sortOrder: 8,
  },
  {
    name: "Local Provisions",
    slug: "local-provisions",
    schemaType: "Store",
    sortOrder: 9,
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
