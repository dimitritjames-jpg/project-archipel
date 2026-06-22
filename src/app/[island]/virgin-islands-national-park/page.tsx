import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-john") return { robots: { index: false, follow: false } };
  return { title: "Virgin Islands National Park — St. John", description: "Plan a St. John park day with ferry, mobility, dining, and charter connections.", alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-john/virgin-islands-national-park` }, robots: { index: true, follow: true } };
}

export default async function VirginIslandsNationalParkPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-john") notFound();
  return <PillarPage eyebrow="Park field guide" title="Virgin Islands National Park" island="St. John" introduction="The park is not one stop—it is a network of beaches, trails, overlooks, and cultural sites threaded through St. John." planningNote="Use official National Park Service guidance as the authority for closures, permits, safety, and conditions. VibeVI helps connect the day around the park: arrival, mobility, meals, and locally listed experiences." highlights={["Trails", "Beaches", "Cultural sites", "Official guidance first"]} links={[{ href: "/search?island=st-john&q=transportation", label: "Solve island mobility", detail: "Browse Jeep rentals, taxis, and transportation listings.", accent: "gold" }, { href: "/st-john/indulgent-dining", label: "Return to Cruz Bay", detail: "Find places to eat after the trail or beach.", accent: "coral" }, { href: "/st-john/ferry-schedule", label: "Check the ferry board", detail: "Review schedule data and its verification status." }, { href: "/st-john/excursions-charters", label: "Explore from the water", detail: "Discover locally listed charter experiences." }]} gradient="from-emerald-400/35 via-midnight-950 to-cyan-600/30" />;
}
