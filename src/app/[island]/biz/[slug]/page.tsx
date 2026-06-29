import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  fetchPublishedBusiness,
  fetchPublishedBusinessStaticParams,
} from "@/lib/businesses/queries";
import { env } from "@/lib/env";
import {
  getIslandBySlug,
  getIslandName,
  type IslandSlug,
} from "@/lib/islands";

export const dynamicParams = true;
export const revalidate = 3600;

type Props = { params: Promise<{ island: string; slug: string }> };

function getCanonicalCategorySlug(
  business: Awaited<ReturnType<typeof fetchPublishedBusiness>>,
) {
  return business?.category?.slug ?? null;
}

export async function generateStaticParams() {
  return fetchPublishedBusinessStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, slug } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) {
    return { robots: { index: false, follow: false } };
  }

  const business = await fetchPublishedBusiness(islandParam as IslandSlug, slug);
  const categorySlug = getCanonicalCategorySlug(business);
  if (!business || !categorySlug) {
    return { robots: { index: false, follow: false } };
  }

  const islandName = getIslandName(islandParam as IslandSlug);
  const categoryName = business.category?.name ?? "Business";
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}/${slug}`;
  const description =
    business.description_plain.slice(0, 160) ||
    `${business.name} in ${islandName}.`;
  const title = business.is_demo
    ? `${business.name} — Demo Profile`
    : `${business.name} — ${categoryName} in ${islandName}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    robots: { index: false, follow: true },
  };
}

export default async function BusinessProfilePage({ params }: Props) {
  const { island: islandParam, slug } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) notFound();

  const business = await fetchPublishedBusiness(islandParam as IslandSlug, slug);
  const categorySlug = getCanonicalCategorySlug(business);
  if (!business || !categorySlug) notFound();

  permanentRedirect(`/${islandParam}/${categorySlug}/${slug}`);
}
