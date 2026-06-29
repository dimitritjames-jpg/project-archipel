import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-thomas") return { robots: { index: false, follow: false } };
  const canonical = absoluteUrl("/st-thomas/magens-bay");
  return {
    title: "Magens Bay Guide — St. Thomas",
    description: "Plan a Magens Bay day around transportation, current beach operations, cruise-day context, nearby dining, and the return route across St. Thomas.",
    alternates: { canonical },
    openGraph: { title: "Magens Bay Guide | VibeVI", description: "A practical St. Thomas beach-day planner for Magens Bay.", url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function MagensBayPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-thomas") notFound();
  return <PillarPage eyebrow="Northside classic" title="Magens Bay" island="St. Thomas" introduction="The famous curve is only the opening move. Timing, transport, shade, current operations, and the route back across St. Thomas shape the better beach day." planningNote="VibeVI provides planning context, not live beach operations. Verify current admission, hours, sea conditions, facility availability, and transport arrangements with official or direct sources before setting out." highlights={["Beach day", "Northside", "Transport plan", "Verify conditions"]} links={[{ href: "/search?island=st-thomas&q=transportation", label: "Arrange the ride", detail: "Search published transportation-related business profiles.", accent: "gold" }, { href: "/st-thomas/indulgent-dining", label: "Find the after-beach table", detail: "Move from salt water to a published St. Thomas dining profile.", accent: "coral" }, { href: "/st-thomas/cruise-day", label: "Fit a cruise-day clock", detail: "Decide whether the beach works inside a conservative ship-return plan." }, { href: "/st-thomas", label: "Open the St. Thomas hub", detail: "Reconnect the beach with ferries, nightlife, charters, and the map." }]} decisions={[{ title: "Your starting point", body: "Charlotte Amalie, a cruise port, Red Hook, and an island stay create different travel times. Confirm the actual pickup and return plan." }, { title: "The day’s conditions", body: "Weather, water, closures, facilities, and crowd patterns change. Treat a static guide as orientation, never a current conditions report." }, { title: "What comes after", body: "A meal, ferry, ship return, or East End evening changes how long the beach can responsibly remain the anchor." }]} faq={[{ question: "Does VibeVI show live conditions at Magens Bay?", answer: "No. VibeVI provides planning and directory context. Check official or direct sources for current beach, water, facility, and access information." }, { question: "Can Magens Bay fit into a St. Thomas cruise day?", answer: "It may, depending on the port, transport, ship schedule, and conditions. Build backward from the authoritative all-aboard time and keep a conservative return margin." }]} gradient="from-sky-300/40 via-midnight-950 to-emerald-500/30" />;
}
