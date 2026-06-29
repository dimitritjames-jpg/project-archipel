import approvedBatch from "../../../data/public-info-businesses-batch-1-approved.json";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";

type ApprovedPublicInfoListing = (typeof approvedBatch.promoted_listings)[number];

const CATEGORY_NAMES: Record<string, { name: string; schema_type: string }> = {
  beaches: {
    name: "Beaches",
    schema_type: "Beach",
  },
  "excursions-charters": {
    name: "Excursions & Charters",
    schema_type: "TouristInformationCenter",
  },
  "indulgent-dining": { name: "Indulgent Dining", schema_type: "Restaurant" },
  "boutique-stays": { name: "Boutique Stays", schema_type: "LodgingBusiness" },
  "nightlife-rhythm": { name: "Nightlife & Rhythm", schema_type: "BarOrPub" },
  "wellness-spas": { name: "Wellness & Spas", schema_type: "HealthAndBeautyBusiness" },
  "local-provisions": { name: "Local Provisions", schema_type: "Store" },
};

function publicInfoListing(input: ApprovedPublicInfoListing): PublishedBusinessRow {
  const category = CATEGORY_NAMES[input.category] ?? {
    name: "Directory",
    schema_type: "LocalBusiness",
  };

  return {
    id: `public-info-${input.island.toLowerCase()}-${input.slug}`,
    island: input.island as PublishedBusinessRow["island"],
    name: input.name,
    slug: input.slug,
    description_plain: input.description,
    description_json: { type: "doc", content: [] },
    street_address: input.address_or_area,
    address_locality: null,
    phone: input.phone,
    email: input.email,
    website_url: input.website_url,
    same_as: input.social_url ? [input.social_url] : [],
    price_range: null,
    is_verified: false,
    is_demo: false,
    verification_status: "submitted",
    verification_source: input.verification_source_url,
    last_verified_at: approvedBatch.shared_public_info_fields.last_verified_date,
    contact_permission_status: "public_source_only",
    robots_noindex: false,
    is_claimed: false,
    claimed_at: null,
    premium_tier: "none",
    published_at: approvedBatch.promoted_at,
    public_info_listing: true,
    public_info_disclosure: approvedBatch.shared_public_info_fields.public_info_disclosure,
    booking_enabled: false,
    partner_status: "none",
    media_rights_status: "not_granted",
    source_urls: input.source_urls,
    category: { slug: input.category, ...category },
  };
}

export const PUBLIC_INFO_BUSINESSES: PublishedBusinessRow[] =
  approvedBatch.promoted_listings.map(publicInfoListing);

export const PUBLIC_INFO_REVIEW_SUMMARY = approvedBatch.review_summary;

export function findPublicInfoBusiness(
  island: PublishedBusinessRow["island"],
  slug: string,
) {
  return (
    PUBLIC_INFO_BUSINESSES.find(
      (business) => business.island === island && business.slug === slug,
    ) ?? null
  );
}

export function findPublicInfoBusinesses(
  island: PublishedBusinessRow["island"],
  categorySlug: string,
) {
  return PUBLIC_INFO_BUSINESSES.filter(
    (business) =>
      business.island === island && business.category?.slug === categorySlug,
  );
}

export function findPublicInfoCategorySlug(slug: string) {
  return (
    PUBLIC_INFO_BUSINESSES.find((business) => business.slug === slug)?.category
      ?.slug ?? null
  );
}
