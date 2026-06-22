import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoGuidePage } from "@/components/discovery/seo-guide-page";
import { guideMetadata, USVI_GUIDES } from "@/lib/guides";

type Props = { params: Promise<{ guideSlug: string }> };
export function generateStaticParams() { return Object.keys(USVI_GUIDES).map((guideSlug) => ({ guideSlug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { guideSlug } = await params; const guide = USVI_GUIDES[guideSlug]; return guide ? guideMetadata(guide) : { robots: { index: false, follow: false } }; }
export default async function GuidePage({ params }: Props) { const { guideSlug } = await params; const guide = USVI_GUIDES[guideSlug]; if (!guide) notFound(); return <SeoGuidePage guide={guide} />; }
