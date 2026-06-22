import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoGuidePage } from "@/components/discovery/seo-guide-page";
import { guideMetadata, ISLAND_GUIDES } from "@/lib/guides";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  const guide = ISLAND_GUIDES[`${island}/things-to-do`];
  return guide ? guideMetadata(guide) : { robots: { index: false, follow: false } };
}

export default async function ThingsToDoPage({ params }: Props) {
  const { island } = await params;
  const guide = ISLAND_GUIDES[`${island}/things-to-do`];
  if (!guide) notFound();
  return <SeoGuidePage guide={guide} />;
}
