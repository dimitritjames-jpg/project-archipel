export const ALGOLIA_BUSINESSES_INDEX = "archipel_businesses" as const;

export type SupabaseWebhookType = "INSERT" | "UPDATE" | "DELETE";

export type BusinessRow = {
  id: string;
  owner_id: string;
  primary_category_id: string;
  island: "STT" | "STX" | "STJ" | "WI";
  name: string;
  slug: string;
  description_plain: string;
  status: string;
  premium_tier: string;
  is_verified: boolean;
  location?: unknown;
  phone?: string | null;
  website_url?: string | null;
  price_range?: string | null;
  published_at?: string | null;
  updated_at: string;
};

export type SupabaseBusinessWebhookPayload = {
  type: SupabaseWebhookType;
  table: string;
  schema: string;
  record: BusinessRow | null;
  old_record: BusinessRow | null;
};

export type AlgoliaBusinessObject = {
  objectID: string;
  name: string;
  slug: string;
  description: string;
  island: string;
  islandSlug: string;
  primaryCategoryId: string;
  primaryCategory?: {
    id: string;
    name: string;
    slug: string;
  };
  premiumTier: string;
  isVerified: boolean;
  updatedAtEpoch: number;
  _geoloc?: {
    lat: number;
    lng: number;
  };
};
