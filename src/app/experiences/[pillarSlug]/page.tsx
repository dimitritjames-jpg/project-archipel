import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperiencePillarPage } from "@/components/experience/experience-pillar-page";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import {
  EXPERIENCE_PILLARS,
  FEATURED_EXPERIENCE_PILLARS,
  experiencePillarMetadata,
  getExperiencePillar,
  type ExperiencePillarSlug,
} from "@/lib/experience-pillars";
import { ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ pillarSlug: string }> };

export function generateStaticParams() {
  return FEATURED_EXPERIENCE_PILLARS.map((pillarSlug) => ({ pillarSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillarSlug } = await params;
  const pillar = getExperiencePillar(pillarSlug);

  return pillar
    ? experiencePillarMetadata(pillar)
    : { robots: { index: false, follow: false } };
}

export default async function ExperienceRoutePage({ params }: Props) {
  const { pillarSlug } = await params;
  const pillar = EXPERIENCE_PILLARS[pillarSlug as ExperiencePillarSlug];
  if (!pillar || !FEATURED_EXPERIENCE_PILLARS.includes(pillar.slug)) notFound();

  const nestedBusinesses = await Promise.all(
    pillar.relatedCategories.flatMap((categorySlug) =>
      ISLAND_SLUGS.map((islandSlug) =>
        fetchPublishedBusinessesByCategory(islandSlug as IslandSlug, categorySlug),
      ),
    ),
  );
  const businesses = nestedBusinesses.flat();
  const dedupedBusinesses = Array.from(
    new Map(businesses.map((business) => [business.id, business])).values(),
  );

  return <ExperiencePillarPage pillar={pillar} businesses={dedupedBusinesses} />;
}
