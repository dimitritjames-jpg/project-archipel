"use server";

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

function normalizeCategory(
  category: BusinessSearchRow["category"],
): { slug: string; name: string } | null {
  if (!category) {
    return null;
  }

  return Array.isArray(category) ? (category[0] ?? null) : category;
}

const BUSINESS_SEARCH_SELECT = `
  id,
  name,
  slug,
  island,
  description_plain,
  category:categories!primary_category_id ( slug, name )
`;

export async function searchLocalBusinesses(
  query: string,
): Promise<LocalSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const supabase = await createClient();
  const pattern = `%${escapeIlikePattern(trimmed)}%`;

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
    throw new Error(`Local search failed: ${error.message}`);
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
  });
}
