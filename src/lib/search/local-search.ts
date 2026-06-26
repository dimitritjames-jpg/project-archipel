"use server";

import { searchPublicInfoCatalog } from "@/lib/search/catalog-search";
import { env } from "@/lib/env";
import { CODE_TO_SLUG, ISLAND_MAP, type IslandCode } from "@/lib/islands";
import { createClient } from "@/lib/supabase/server";

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

function toSupabaseSearchResult(row: BusinessSearchRow) {
  const category = normalizeCategory(row.category);
  const islandSlug = CODE_TO_SLUG[row.island];
  const href = category
    ? `/${islandSlug}/${category.slug}/${row.slug}`
    : `/${islandSlug}`;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    island: row.island,
    islandSlug,
    islandName: getIslandLabel(row.island),
    descriptionPlain: row.description_plain,
    categorySlug: category?.slug ?? null,
    categoryName: category?.name ?? null,
    href,
  };
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
): Promise<ReturnType<typeof toSupabaseSearchResult>[] | null> {
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

  return rows.map(toSupabaseSearchResult);
}

export async function searchLocalBusinesses(query: string) {
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
