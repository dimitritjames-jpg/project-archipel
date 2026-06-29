import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IslandHubPage, getIslandHubMetadata } from "@/components/islands/island-hub-page";
import { getIslandBySlug, type IslandSlug } from "@/lib/islands";

type Props = {
  params: Promise<{ island: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { island } = await params;
  const resolvedSearchParams = await searchParams;
  const islandData = getIslandBySlug(island);
  if (!islandData) {
    return { robots: { index: false, follow: false } };
  }

  return getIslandHubMetadata(island as IslandSlug, {
    isFiltered: typeof resolvedSearchParams.category === "string",
  });
}

export default async function IslandHubRoute({ params, searchParams }: Props) {
  const { island } = await params;
  const resolvedSearchParams = await searchParams;

  if (!getIslandBySlug(island)) {
    notFound();
  }

  return (
    <IslandHubPage
      islandSlug={island as IslandSlug}
      searchParams={resolvedSearchParams}
    />
  );
}
