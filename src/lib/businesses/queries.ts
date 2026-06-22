import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { CODE_TO_SLUG, type IslandSlug } from "@/lib/islands";

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
  price_range: string | null;
  is_verified: boolean;
  premium_tier: string;
  published_at: string | null;
  category: { slug: string; name: string; schema_type: string } | null;
};

export type BusinessStaticParam = {
  island: IslandSlug;
  slug: string;
};

/** Seeded listings — used when Supabase is unreachable at build time. */
export const SEEDED_BUSINESS_STATIC_PARAMS: BusinessStaticParam[] = [
  { island: "st-john", slug: "azure-current-charters" },
  { island: "st-thomas", slug: "harbor-and-hibiscus-supper-club" },
  { island: "st-croix", slug: "cane-bay-cliff-villa" },
  { island: "st-thomas", slug: "ember-and-tide-rooftop" },
  { island: "st-thomas", slug: "solstice-spa-at-magens" },
  { island: "st-john", slug: "coral-and-salt-kitchen" },
  { island: "st-croix", slug: "reef-runner-expeditions" },
  { island: "water-island", slug: "honeymoon-cove-hideaway" },
];

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
  if (!supabase) {
    return null;
  }

  const islandCode = Object.entries(CODE_TO_SLUG).find(
    ([, slug]) => slug === islandSlug,
  )?.[0];

  if (!islandCode) {
    return null;
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
      price_range,
      is_verified,
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
    return null;
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
