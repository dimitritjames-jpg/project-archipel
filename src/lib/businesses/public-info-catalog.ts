import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { ISLAND_CODES } from "@/lib/islands";

type ApprovedPublicInfoBatch = {
  promoted_at: string;
  promoted_listings: Array<{
    name: string;
    island: string;
    slug: string;
    category: string;
    description: string;
    address_or_area?: string | null;
    phone?: string | null;
    email?: string | null;
    website_url?: string | null;
    social_url?: string | null;
    verification_source_url?: string | null;
    source_urls?: string[] | null;
  }>;
  shared_public_info_fields: {
    last_verified_date: string;
    public_info_disclosure: string;
  };
  review_summary: {
    candidates_reviewed: number;
    ready_to_promote: string[];
    needs_human_review: string[];
    do_not_publish: string[];
    missing_required_fields: string[];
  };
};
type ApprovedPublicInfoListing = ApprovedPublicInfoBatch["promoted_listings"][number];

function loadApprovedBatches(): ApprovedPublicInfoBatch[] {
  const dataDir = join(process.cwd(), "data");
  const filenames = readdirSync(dataDir)
    .filter((filename) => /^public-info-businesses-batch-\d+-approved\.json$/i.test(filename))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

  if (filenames.length === 0) {
    throw new Error("[public-info-catalog] No approved public-info batch JSON files were found.");
  }

  return filenames.map((filename) =>
    JSON.parse(readFileSync(join(dataDir, filename), "utf8")) as ApprovedPublicInfoBatch,
  );
}

const APPROVED_BATCHES = loadApprovedBatches();

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
  "culture-history": { name: "Culture & History", schema_type: "TouristAttraction" },
  "local-provisions": { name: "Local Provisions", schema_type: "Store" },
};

const VALID_ISLAND_CODES = new Set<string>(ISLAND_CODES);

function validateApprovedPublicInfoListing(input: ApprovedPublicInfoListing) {
  if (!input.island || !VALID_ISLAND_CODES.has(input.island)) {
    throw new Error(
      `[public-info-catalog] Listing "${input.name}" is missing a valid island code.`,
    );
  }

  if (!input.slug?.trim()) {
    throw new Error(
      `[public-info-catalog] Listing "${input.name}" is missing a slug.`,
    );
  }

  if (!input.category?.trim()) {
    throw new Error(
      `[public-info-catalog] Listing "${input.name}" is missing a category slug.`,
    );
  }
}

function publicInfoListing(
  input: ApprovedPublicInfoListing,
  batch: ApprovedPublicInfoBatch,
): PublishedBusinessRow {
  validateApprovedPublicInfoListing(input);

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
    street_address: input.address_or_area ?? null,
    address_locality: null,
    phone: input.phone ?? null,
    email: input.email ?? null,
    website_url: input.website_url ?? null,
    same_as: input.social_url ? [input.social_url] : [],
    price_range: null,
    is_verified: false,
    is_demo: false,
    verification_status: "submitted",
    verification_source: input.verification_source_url ?? null,
    last_verified_at: batch.shared_public_info_fields.last_verified_date,
    contact_permission_status: "public_source_only",
    robots_noindex: false,
    is_claimed: false,
    claimed_at: null,
    premium_tier: "none",
    published_at: batch.promoted_at,
    public_info_listing: true,
    public_info_disclosure: batch.shared_public_info_fields.public_info_disclosure,
    booking_enabled: false,
    partner_status: "none",
    media_rights_status: "not_granted",
    source_urls: input.source_urls ?? undefined,
    category: { slug: input.category, ...category },
  };
}

export const PUBLIC_INFO_BUSINESSES: PublishedBusinessRow[] =
  APPROVED_BATCHES.flatMap((batch) =>
    batch.promoted_listings.map((listing) => publicInfoListing(listing, batch)),
  );

export const PUBLIC_INFO_REVIEW_SUMMARY = {
  candidates_reviewed: APPROVED_BATCHES.reduce(
    (total, batch) => total + batch.review_summary.candidates_reviewed,
    0,
  ),
  ready_to_promote: APPROVED_BATCHES.flatMap(
    (batch) => batch.review_summary.ready_to_promote,
  ),
  needs_human_review: APPROVED_BATCHES.flatMap(
    (batch) => batch.review_summary.needs_human_review,
  ),
  do_not_publish: APPROVED_BATCHES.flatMap(
    (batch) => batch.review_summary.do_not_publish,
  ),
  missing_required_fields: APPROVED_BATCHES.flatMap(
    (batch) => batch.review_summary.missing_required_fields,
  ),
};

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
