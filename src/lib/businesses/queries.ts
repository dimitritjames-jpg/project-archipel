import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { CODE_TO_SLUG, type IslandSlug } from "@/lib/islands";
import {
  findLaunchPreviewBusiness,
  findLaunchPreviewBusinesses,
  LAUNCH_PREVIEW_BUSINESSES,
} from "@/lib/businesses/launch-preview-catalog";
import {
  findPublicInfoBusiness,
  findPublicInfoBusinesses,
  PUBLIC_INFO_BUSINESSES,
} from "@/lib/businesses/public-info-catalog";

export type PublishedBusinessRow = {
  id: string;
  name: string;
  slug: string;
  island: keyof typeof CODE_TO_SLUG;
  description_plain: string;
  description_json: Record<string, unknown>;
  street_address: string | null;
  address_locality: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  same_as: string[];
  price_range: string | null;
  is_verified: boolean;
  is_demo: boolean;
  verification_status: "demo" | "unverified" | "submitted" | "verified";
  verification_source: string | null;
  last_verified_at: string | null;
  contact_permission_status: "unknown" | "not_requested" | "pending" | "granted" | "declined" | "public_source_only";
  robots_noindex: boolean;
  is_claimed: boolean;
  claimed_at: string | null;
  premium_tier: string;
  published_at: string | null;
  public_info_listing?: boolean;
  public_info_disclosure?: string | null;
  booking_enabled?: boolean;
  partner_status?: "none" | string;
  media_rights_status?: "not_granted" | string;
  source_urls?: string[];
  category: { slug: string; name: string; schema_type: string } | null;
};

export type BusinessStaticParam = {
  island: IslandSlug;
  slug: string;
};

/** Seeded listings — used when Supabase is unreachable at build time. */
export const SEEDED_BUSINESS_STATIC_PARAMS: BusinessStaticParam[] =
  [...PUBLIC_INFO_BUSINESSES, ...LAUNCH_PREVIEW_BUSINESSES].map((business) => ({
    island: CODE_TO_SLUG[business.island],
    slug: business.slug,
  }));

function createBuildTimeClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function normalizeCategory(
  category:
    | PublishedBusinessRow["category"]
    | NonNullable<PublishedBusinessRow["category"]>[]
    | null
    | undefined,
): PublishedBusinessRow["category"] {
  if (!category) return null;
  return Array.isArray(category) ? (category[0] ?? null) : category;
}

export async function fetchPublishedBusinessStaticParams(): Promise<
  BusinessStaticParam[]
> {
  const supabase = createBuildTimeClient();
  if (!supabase) {
    return SEEDED_BUSINESS_STATIC_PARAMS;
  }

  const { data, error } = await supabase
    .from("businesses")
    .select("slug, island")
    .eq("status", "published")
    .order("name");

  if (error || !data?.length) {
    return SEEDED_BUSINESS_STATIC_PARAMS;
  }

  return data.map((row) => ({
    island: CODE_TO_SLUG[row.island as keyof typeof CODE_TO_SLUG],
    slug: row.slug,
  }));
}

export async function fetchPublishedBusiness(
  islandSlug: IslandSlug,
  businessSlug: string,
): Promise<PublishedBusinessRow | null> {
  const supabase = createBuildTimeClient();
  const islandCode = Object.entries(CODE_TO_SLUG).find(
    ([, slug]) => slug === islandSlug,
  )?.[0];

  if (!islandCode) {
    return null;
  }

  if (!supabase) {
    return (
      findPublicInfoBusiness(
        islandCode as PublishedBusinessRow["island"],
        businessSlug,
      ) ??
      findLaunchPreviewBusiness(
        islandCode as PublishedBusinessRow["island"],
        businessSlug,
      )
    );
  }

  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      id,
      name,
      slug,
      island,
      description_plain,
      description_json,
      street_address,
      address_locality,
      phone,
      email,
      website_url,
      same_as,
      price_range,
      is_verified,
      is_demo,
      verification_status,
      verification_source,
      last_verified_at,
      contact_permission_status,
      robots_noindex,
      is_claimed,
      claimed_at,
      premium_tier,
      published_at,
      category:categories!primary_category_id ( slug, name, schema_type )
    `,
    )
    .eq("status", "published")
    .eq("island", islandCode)
    .eq("slug", businessSlug)
    .maybeSingle();

  if (error || !data) {
    return (
      findPublicInfoBusiness(
        islandCode as PublishedBusinessRow["island"],
        businessSlug,
      ) ??
      findLaunchPreviewBusiness(
        islandCode as PublishedBusinessRow["island"],
        businessSlug,
      )
    );
  }

  return {
    ...(data as Omit<PublishedBusinessRow, "category">),
    category: normalizeCategory(
      data.category as
        | PublishedBusinessRow["category"]
        | NonNullable<PublishedBusinessRow["category"]>[]
        | null,
    ),
  };
}

export async function fetchPublishedBusinessesByCategory(
  islandSlug: IslandSlug,
  categorySlug: string,
): Promise<PublishedBusinessRow[]> {
  const supabase = createBuildTimeClient();
  const islandCode = Object.entries(CODE_TO_SLUG).find(
    ([, slug]) => slug === islandSlug,
  )?.[0];

  if (!islandCode) {
    return [];
  }

  const previewFallback = () =>
    [
      ...findPublicInfoBusinesses(
        islandCode as PublishedBusinessRow["island"],
        categorySlug,
      ),
      ...findLaunchPreviewBusinesses(
        islandCode as PublishedBusinessRow["island"],
        categorySlug,
      ),
    ];

  if (!supabase) {
    return previewFallback();
  }

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .eq("is_active", true)
    .maybeSingle();

  if (categoryError || !category) {
    return previewFallback();
  }

  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      id,
      name,
      slug,
      island,
      description_plain,
      description_json,
      street_address,
      address_locality,
      phone,
      email,
      website_url,
      same_as,
      price_range,
      is_verified,
      is_demo,
      verification_status,
      verification_source,
      last_verified_at,
      contact_permission_status,
      robots_noindex,
      is_claimed,
      claimed_at,
      premium_tier,
      published_at,
      category:categories!primary_category_id ( slug, name, schema_type )
    `,
    )
    .eq("status", "published")
    .eq("island", islandCode)
    .eq("primary_category_id", category.id)
    .order("name");

  if (error || !data?.length) {
    return previewFallback();
  }

  return data.map((row) => ({
    ...(row as Omit<PublishedBusinessRow, "category">),
    category: normalizeCategory(
      row.category as
        | PublishedBusinessRow["category"]
        | NonNullable<PublishedBusinessRow["category"]>[]
        | null,
    ),
  }));
}
