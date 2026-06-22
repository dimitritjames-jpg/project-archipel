import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-croix") return { robots: { index: false, follow: false } };
  return { title: "Buck Island — St. Croix", description: "Plan a Buck Island day from St. Croix with charter, dining, and island discovery connections.", alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-croix/buck-island` }, robots: { index: true, follow: true } };
}

export default async function BuckIslandPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-croix") notFound();
  return <PillarPage eyebrow="Reef expedition" title="Buck Island" island="St. Croix" introduction="A protected marine landscape best approached as a full outing: boat logistics, water time, sun exposure, and the return to Christiansted all matter." planningNote="Access is by authorized boat excursion or private vessel. Conditions, permits, departure points, and availability change—confirm directly with an operator before building the rest of your day." highlights={["Boat access", "Reef trail", "Full-sun exposure", "Confirm conditions"]} links={[{ href: "/st-croix/excursions-charters", label: "Find charter operators", detail: "Compare locally listed boat and water experiences." }, { href: "/st-croix/indulgent-dining", label: "Plan the landing meal", detail: "Explore St. Croix dining for the return to shore.", accent: "coral" }, { href: "/st-croix", label: "Open the St. Croix portal", detail: "See the broader island board and current utilities.", accent: "gold" }, { href: "/map", label: "Orient on the map", detail: "Place the island within the wider archipelago." }]} gradient="from-cyan-300/45 via-midnight-950 to-blue-700/35" />;
}
