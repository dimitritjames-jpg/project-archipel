import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-thomas") return { robots: { index: false, follow: false } };
  return { title: "Magens Bay — St. Thomas", description: "Plan your visit to Magens Bay with transportation, dining, and St. Thomas discovery connections.", alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-thomas/magens-bay` }, robots: { index: true, follow: true } };
}

export default async function MagensBayPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-thomas") notFound();
  return <PillarPage eyebrow="Northside classic" title="Magens Bay" island="St. Thomas" introduction="The famous curve is only the opening move. Timing, transport, shade, and the route back across St. Thomas shape the better beach day." planningNote="This guide is for orientation, not live beach operations. Verify current admission, hours, sea conditions, and transport arrangements with official or direct sources before setting out." highlights={["Beach day", "Northside", "Taxi access", "Verify conditions"]} links={[{ href: "/search?island=st-thomas&q=transportation", label: "Arrange the ride", detail: "Find transportation listings for the trip across island.", accent: "gold" }, { href: "/st-thomas/indulgent-dining", label: "Find the after-beach table", detail: "Move from salt water to a nearby meal.", accent: "coral" }, { href: "/st-thomas", label: "Open the St. Thomas portal", detail: "See current island signals and broader discovery." }, { href: "/map", label: "Orient on the map", detail: "Understand the bay in relation to the island." }]} gradient="from-sky-300/40 via-midnight-950 to-emerald-500/30" />;
}
