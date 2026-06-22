import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessProfileView } from "@/components/business/business-profile-view";
import {
  fetchPublishedBusiness,
  fetchPublishedBusinessStaticParams,
} from "@/lib/businesses/queries";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

export const dynamicParams = true;
export const revalidate = 3600;

type Props = { params: Promise<{ island: string; slug: string }> };

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
  if (!business) {
    return { robots: { index: false, follow: false } };
  }

  const islandName = getIslandName(islandParam as IslandSlug);
  const categoryName = business.category?.name ?? "Business";
  const categorySlug = business.category?.slug ?? "directory";
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}/${slug}`;

  return {
    title: `${business.name} — ${categoryName} in ${islandName}`,
    description:
      business.description_plain.slice(0, 160) ||
      `${business.name} in ${islandName}.`,
    alternates: { canonical },
    openGraph: {
      title: business.name,
      description: business.description_plain.slice(0, 160),
      url: canonical,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BusinessProfilePage({ params }: Props) {
  const { island: islandParam, slug } = await params;
  const island = getIslandBySlug(islandParam);
  if (!island) notFound();

  const business = await fetchPublishedBusiness(islandParam as IslandSlug, slug);
  if (!business) notFound();

  const categorySlug = business.category?.slug ?? "directory";
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}/${slug}`;

  return (
    <BusinessProfileView
      business={business}
      islandSlug={islandParam as IslandSlug}
      canonicalUrl={canonical}
    />
  );
}
