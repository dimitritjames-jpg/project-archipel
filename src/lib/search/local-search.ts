"use server";

import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { env } from "@/lib/env";
import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";
import { createClient } from "@/lib/supabase/server";

export type LocalSearchResult = {
  id: string;
  name: string;
  slug: string;
  island: IslandCode;
  islandSlug: string;
  islandName: string;
  descriptionPlain: string;
  categorySlug: string | null;
  categoryName: string | null;
  href: string;
};

type BusinessSearchRow = {
  id: string;
  name: string;
  slug: string;
  island: IslandCode;
  description_plain: string;
  category: { slug: string; name: string } | { slug: string; name: string }[] | null;
};

function getIslandLabel(code: IslandCode): string {
  return ISLAND_MAP[CODE_TO_SLUG[code]].name;
}

function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

function normalizeCategory(
  category: BusinessSearchRow["category"],
): { slug: string; name: string } | null {
  if (!category) {
    return null;
  }

  return Array.isArray(category) ? (category[0] ?? null) : category;
}

function isSupabaseConfigured(): boolean {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  return Boolean(
    url &&
      key &&
      !/^anon-key-placeholder$/i.test(key) &&
      !/^https?:\/\/localhost:54321\/?$/i.test(url),
  );
}

function toSearchResult(
  row: {
    id: string;
    name: string;
    slug: string;
    island: IslandCode;
    description_plain: string;
    category?: PublishedBusinessRow["category"];
    categorySlug?: string | null;
    categoryName?: string | null;
  },
): LocalSearchResult {
  const categorySlug =
    row.categorySlug ?? row.category?.slug ?? null;
  const categoryName =
    row.categoryName ?? row.category?.name ?? null;
  const islandSlug = CODE_TO_SLUG[row.island];
  const href = categorySlug
    ? `/${islandSlug}/${categorySlug}/${row.slug}`
    : `/${islandSlug}`;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    island: row.island,
    islandSlug,
    islandName: getIslandLabel(row.island),
    descriptionPlain: row.description_plain,
    categorySlug,
    categoryName,
    href,
  };
}

function catalogSearchFields(business: PublishedBusinessRow): string[] {
  const islandSlug = CODE_TO_SLUG[business.island];
  const islandName = getIslandLabel(business.island);

  return [
    business.name,
    business.slug,
    business.island,
    islandSlug,
    islandName,
    business.description_plain,
    business.street_address ?? "",
    business.category?.slug ?? "",
    business.category?.name ?? "",
    ...(business.source_urls ?? []),
  ];
}

function searchPublicInfoCatalog(query: string): LocalSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) {
    return [];
  }

  const hits = PUBLIC_INFO_BUSINESSES.filter((business) =>
    catalogSearchFields(business).some((field) =>
      normalizeSearchText(field).includes(normalizedQuery),
    ),
  );

  return hits
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 12)
    .map((business) =>
      toSearchResult({
        id: business.id,
        name: business.name,
        slug: business.slug,
        island: business.island,
        description_plain: business.description_plain,
        category: business.category,
      }),
    );
}

const BUSINESS_SEARCH_SELECT = `
  id,
  name,
  slug,
  island,
  description_plain,
  category:categories!primary_category_id ( slug, name )
`;

async function searchSupabaseBusinesses(
  query: string,
): Promise<LocalSearchResult[] | null> {
  const supabase = await createClient();
  const pattern = `%${escapeIlikePattern(query)}%`;

  const [nameResult, descriptionResult] = await Promise.all([
    supabase
      .from("businesses")
      .select(BUSINESS_SEARCH_SELECT)
      .eq("status", "published")
      .ilike("name", pattern)
      .order("name")
      .limit(12),
    supabase
      .from("businesses")
      .select(BUSINESS_SEARCH_SELECT)
      .eq("status", "published")
      .ilike("description_plain", pattern)
      .order("name")
      .limit(12),
  ]);

  const error = nameResult.error ?? descriptionResult.error;
  if (error) {
    return null;
  }

  const merged = new Map<string, BusinessSearchRow>();
  for (const row of [...(nameResult.data ?? []), ...(descriptionResult.data ?? [])]) {
    merged.set(row.id, row as BusinessSearchRow);
  }

  const rows = Array.from(merged.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 12);

  return rows.map((row) => {
    const category = normalizeCategory(row.category);
    return toSearchResult({
      id: row.id,
      name: row.name,
      slug: row.slug,
      island: row.island,
      description_plain: row.description_plain,
      categorySlug: category?.slug ?? null,
      categoryName: category?.name ?? null,
    });
  });
}

export async function searchLocalBusinesses(
  query: string,
): Promise<LocalSearchResult[]> {
  const trimmed = query.trim().replace(/\s+/g, " ");
  if (trimmed.length < 2) {
    return [];
  }

  if (isSupabaseConfigured()) {
    try {
      const supabaseResults = await searchSupabaseBusinesses(trimmed);
      if (supabaseResults !== null) {
        return supabaseResults;
      }

      console.warn(
        "[searchLocalBusinesses] Supabase search failed; using public-info catalog fallback.",
      );
    } catch (error) {
      console.warn(
        "[searchLocalBusinesses] Supabase search threw; using public-info catalog fallback.",
        error,
      );
    }
  }

  return searchPublicInfoCatalog(trimmed);
}
