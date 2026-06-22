import { CODE_TO_SLUG, type IslandCode } from "@/lib/islands";
import { parseGeoloc } from "@/lib/search/geoloc";
import type { AlgoliaBusinessObject, BusinessRow } from "@/lib/search/types";

type CategoryProjection = {
  id: string;
  name: string;
  slug: string;
};

export function mapBusinessRecordToAlgolia(
  record: BusinessRow,
  category?: CategoryProjection | null,
): AlgoliaBusinessObject {
  const geoloc = parseGeoloc(record.location);
  const islandCode = record.island as IslandCode;

  const object: AlgoliaBusinessObject = {
    objectID: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description_plain,
    island: record.island,
    islandSlug: CODE_TO_SLUG[islandCode],
    primaryCategoryId: record.primary_category_id,
    premiumTier: record.premium_tier,
    isVerified: record.is_verified,
    updatedAtEpoch: Math.floor(new Date(record.updated_at).getTime() / 1000),
  };

  if (category) {
    object.primaryCategory = {
      id: category.id,
      name: category.name,
      slug: category.slug,
    };
  }

  if (geoloc) {
    object._geoloc = geoloc;
  }

  return object;
}

export function shouldIndexBusiness(record: BusinessRow | null): boolean {
  return record?.status === "published";
}
