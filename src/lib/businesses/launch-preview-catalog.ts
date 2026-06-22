import type { PublishedBusinessRow } from "@/lib/businesses/queries";

type PreviewInput = {
  island: PublishedBusinessRow["island"];
  category: "excursions-charters" | "indulgent-dining" | "boutique-stays" | "nightlife-rhythm" | "wellness-spas" | "local-provisions";
  name: string;
  slug: string;
  locality: string;
  purpose: string;
};

const CATEGORY_NAMES: Record<PreviewInput["category"], { name: string; schema_type: string }> = {
  "excursions-charters": { name: "Excursions & Charters", schema_type: "TouristInformationCenter" },
  "indulgent-dining": { name: "Indulgent Dining", schema_type: "Restaurant" },
  "boutique-stays": { name: "Boutique Stays", schema_type: "LodgingBusiness" },
  "nightlife-rhythm": { name: "Nightlife & Rhythm", schema_type: "BarOrPub" },
  "wellness-spas": { name: "Wellness & Spas", schema_type: "HealthAndBeautyBusiness" },
  "local-provisions": { name: "Local Provisions", schema_type: "Store" },
};

function preview(input: PreviewInput): PublishedBusinessRow {
  const category = CATEGORY_NAMES[input.category];
  const description = `Fictional demonstration profile showing how a ${input.purpose} listing in ${input.locality} could appear on VibeVI. No real business, availability, contact details, pricing, hours, or service claims are represented.`;
  return {
    id: `demo-${input.island.toLowerCase()}-${input.slug}`,
    island: input.island,
    name: `Demo — ${input.name}`,
    slug: input.slug,
    description_plain: description,
    description_json: { type: "doc", content: [] },
    street_address: null,
    address_locality: input.locality,
    phone: null,
    email: null,
    website_url: null,
    same_as: [],
    price_range: null,
    is_verified: false,
    is_demo: true,
    verification_status: "demo",
    verification_source: null,
    last_verified_at: null,
    contact_permission_status: "not_requested",
    robots_noindex: true,
    is_claimed: false,
    claimed_at: null,
    premium_tier: "none",
    published_at: null,
    category: { slug: input.category, ...category },
  };
}

/**
 * Build-safe inventory used only when a category has no reachable published
 * Supabase records. Every row is fictional, visibly labeled, and noindex.
 * Replace entries with verified source-backed records before public launch.
 */
export const LAUNCH_PREVIEW_BUSINESSES: PublishedBusinessRow[] = [
  preview({ island: "STT", category: "indulgent-dining", name: "Charlotte Amalie Waterfront Table", slug: "demo-stt-waterfront-table", locality: "Charlotte Amalie", purpose: "restaurant" }),
  preview({ island: "STT", category: "indulgent-dining", name: "Red Hook Dinner Room", slug: "demo-stt-red-hook-dinner", locality: "Red Hook", purpose: "restaurant" }),
  preview({ island: "STT", category: "nightlife-rhythm", name: "Harbor Night Signal", slug: "demo-stt-harbor-nightlife", locality: "Charlotte Amalie", purpose: "nightlife" }),
  preview({ island: "STT", category: "nightlife-rhythm", name: "East End Rhythm Room", slug: "demo-stt-east-end-rhythm", locality: "Red Hook", purpose: "nightlife" }),
  preview({ island: "STT", category: "excursions-charters", name: "East End Day Charter", slug: "demo-stt-east-end-charter", locality: "East End", purpose: "charter" }),
  preview({ island: "STT", category: "excursions-charters", name: "Harbor Island Excursion", slug: "demo-stt-harbor-excursion", locality: "Charlotte Amalie", purpose: "excursion" }),
  preview({ island: "STT", category: "wellness-spas", name: "Northside Wellness Studio", slug: "demo-stt-northside-wellness", locality: "Northside", purpose: "wellness" }),
  preview({ island: "STT", category: "boutique-stays", name: "East End Boutique Stay", slug: "demo-stt-east-end-stay", locality: "East End", purpose: "hotel or villa" }),

  preview({ island: "STX", category: "indulgent-dining", name: "Christiansted Courtyard Table", slug: "demo-stx-christiansted-table", locality: "Christiansted", purpose: "restaurant" }),
  preview({ island: "STX", category: "indulgent-dining", name: "Frederiksted Sunset Kitchen", slug: "demo-stx-frederiksted-kitchen", locality: "Frederiksted", purpose: "restaurant" }),
  preview({ island: "STX", category: "excursions-charters", name: "Christiansted Reef Excursion", slug: "demo-stx-reef-excursion", locality: "Christiansted", purpose: "excursion" }),
  preview({ island: "STX", category: "excursions-charters", name: "West End Water Day", slug: "demo-stx-west-end-water-day", locality: "Frederiksted", purpose: "charter" }),
  preview({ island: "STX", category: "boutique-stays", name: "North Shore Hideaway", slug: "demo-stx-north-shore-stay", locality: "North Shore", purpose: "hotel or villa" }),
  preview({ island: "STX", category: "local-provisions", name: "Christiansted Island Provisions", slug: "demo-stx-island-provisions", locality: "Christiansted", purpose: "local shop" }),

  preview({ island: "STJ", category: "excursions-charters", name: "Cruz Bay Day Charter", slug: "demo-stj-cruz-bay-charter", locality: "Cruz Bay", purpose: "charter" }),
  preview({ island: "STJ", category: "excursions-charters", name: "Coral Bay Water Excursion", slug: "demo-stj-coral-bay-excursion", locality: "Coral Bay", purpose: "excursion" }),
  preview({ island: "STJ", category: "indulgent-dining", name: "Cruz Bay Courtyard Kitchen", slug: "demo-stj-cruz-bay-kitchen", locality: "Cruz Bay", purpose: "restaurant" }),
  preview({ island: "STJ", category: "indulgent-dining", name: "Coral Bay Supper Stop", slug: "demo-stj-coral-bay-supper", locality: "Coral Bay", purpose: "restaurant" }),
  preview({ island: "STJ", category: "boutique-stays", name: "Hillside Island Stay", slug: "demo-stj-hillside-stay", locality: "St. John", purpose: "hotel or villa" }),
  preview({ island: "STJ", category: "local-provisions", name: "Cruz Bay Beach Provisions", slug: "demo-stj-beach-provisions", locality: "Cruz Bay", purpose: "local shop" }),

  preview({ island: "WI", category: "boutique-stays", name: "Water Island Hilltop Stay", slug: "demo-wi-hilltop-stay", locality: "Water Island", purpose: "villa" }),
  preview({ island: "WI", category: "boutique-stays", name: "Honeymoon Beach Retreat", slug: "demo-wi-beach-retreat", locality: "Water Island", purpose: "stay" }),
  preview({ island: "WI", category: "local-provisions", name: "Day-Trip Provisions Stop", slug: "demo-wi-day-trip-provisions", locality: "Water Island", purpose: "local provisions" }),
  preview({ island: "WI", category: "excursions-charters", name: "Water Island Shore Day", slug: "demo-wi-shore-day", locality: "Water Island", purpose: "day-trip experience" }),
];

export function findLaunchPreviewBusiness(island: PublishedBusinessRow["island"], slug: string) {
  return LAUNCH_PREVIEW_BUSINESSES.find((business) => business.island === island && business.slug === slug) ?? null;
}

export function findLaunchPreviewBusinesses(island: PublishedBusinessRow["island"], categorySlug: string) {
  return LAUNCH_PREVIEW_BUSINESSES.filter((business) => business.island === island && business.category?.slug === categorySlug);
}

export function findLaunchPreviewCategorySlug(slug: string) {
  return LAUNCH_PREVIEW_BUSINESSES.find((business) => business.slug === slug)?.category?.slug ?? null;
}
