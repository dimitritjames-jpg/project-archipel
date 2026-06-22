import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessProfileView } from "@/components/business/business-profile-view";
import {
  fetchPublishedBusiness,
  fetchPublishedBusinessStaticParams,
  SEEDED_BUSINESS_STATIC_PARAMS,
} from "@/lib/businesses/queries";
import { getCategoryBySlug } from "@/lib/categories";
import { env } from "@/lib/env";
import { CODE_TO_SLUG, getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

export const dynamicParams = true;
export const revalidate = 3600;

type Props = {
  params: Promise<{ island: string; categorySlug: string; businessSlug: string }>;
};

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return SEEDED_BUSINESS_STATIC_PARAMS.map(({ island, slug }) => ({
      island,
      categorySlug: inferCategorySlug(slug),
      businessSlug: slug,
    }));
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { data } = await supabase
    .from("businesses")
    .select("slug, island, category:categories!primary_category_id ( slug )")
    .eq("status", "published");

  if (!data?.length) {
    const fallback = await fetchPublishedBusinessStaticParams();
    return fallback.map(({ island, slug }) => ({
      island,
      categorySlug: inferCategorySlug(slug),
      businessSlug: slug,
    }));
  }

  return data.map((row) => {
    const category = Array.isArray(row.category) ? row.category[0] : row.category;
    const islandSlug = CODE_TO_SLUG[row.island as keyof typeof CODE_TO_SLUG];
    return {
      island: islandSlug,
      categorySlug: (category as { slug: string } | null)?.slug ?? "directory",
      businessSlug: row.slug,
    };
  });
}

function inferCategorySlug(businessSlug: string): string {
  const map: Record<string, string> = {
    "azure-current-charters": "excursions-charters",
    "reef-runner-expeditions": "excursions-charters",
    "harbor-and-hibiscus-supper-club": "indulgent-dining",
    "coral-and-salt-kitchen": "indulgent-dining",
    "cane-bay-cliff-villa": "boutique-stays",
    "honeymoon-cove-hideaway": "boutique-stays",
    "ember-and-tide-rooftop": "nightlife-rhythm",
    "solstice-spa-at-magens": "wellness-spas",
  };
  return map[businessSlug] ?? "directory";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug, businessSlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) return { robots: { index: false, follow: false } };

  const business = await fetchPublishedBusiness(
    islandParam as IslandSlug,
    businessSlug,
  );
  if (!business) return { robots: { index: false, follow: false } };

  const islandName = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}/${businessSlug}`;

  return {
    title: `${business.name} — ${category.name} in ${islandName}`,
    description: business.description_plain.slice(0, 160),
    alternates: { canonical },
    openGraph: { url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function CanonicalBusinessPage({ params }: Props) {
  const { island: islandParam, categorySlug, businessSlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) notFound();

  const business = await fetchPublishedBusiness(
    islandParam as IslandSlug,
    businessSlug,
  );
  if (!business) notFound();

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}/${businessSlug}`;

  return (
    <BusinessProfileView
      business={business}
      islandSlug={islandParam as IslandSlug}
      canonicalUrl={canonical}
    />
  );
}
