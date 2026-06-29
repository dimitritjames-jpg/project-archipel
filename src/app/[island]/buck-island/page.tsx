import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PillarPage } from "@/components/discovery/pillar-page";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-croix") return { robots: { index: false, follow: false } };
  const canonical = absoluteUrl("/st-croix/buck-island");
  return { title: "Buck Island Guide — St. Croix", description: "Plan a Buck Island outing from St. Croix with charter questions, condition checks, departure context, and useful links for the return ashore.", alternates: { canonical }, openGraph: { title: "Buck Island Guide | VibeVI", description: "A practical Buck Island and St. Croix boat-day planner.", url: canonical }, robots: { index: true, follow: true } };
}

export default async function BuckIslandPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-croix") notFound();
  return <PillarPage eyebrow="Reef expedition" title="Buck Island" island="St. Croix" introduction="A protected marine landscape best approached as a full outing: authorized access, departure logistics, water time, sun exposure, conditions, and the return to Christiansted all matter." planningNote="Use official guidance for park rules, permits, closures, and safety. Confirm availability, credentials, departure point, inclusions, and weather policy directly with an authorized operator." highlights={["Boat access", "Protected reef", "Full-sun exposure", "Official guidance first"]} links={[{ href: "/st-croix/excursions-charters", label: "Browse charter profiles", detail: "Compare published and clearly labeled demo inventory without a live-availability claim." }, { href: "/guides/usvi-charters", label: "Ask better charter questions", detail: "Review inclusions, weather policy, departure geography, and direct-source booking.", accent: "gold" }, { href: "/st-croix/indulgent-dining", label: "Plan the landing meal", detail: "Explore published St. Croix dining profiles for the return to shore.", accent: "coral" }, { href: "/st-croix", label: "Open the St. Croix hub", detail: "Reconnect the boat day with the wider island route." }]} decisions={[{ title: "Operator and authorization", body: "Confirm that the provider, vessel, itinerary, and access comply with current official requirements. VibeVI does not verify availability or credentials in real time." }, { title: "Departure and return", body: "The marina, check-in point, duration, and return time determine what else fits. Get those details directly before planning transportation or dinner." }, { title: "Conditions and ability", body: "Weather, sea state, visibility, heat, swimming ability, and equipment needs change the day. Follow official and qualified operator guidance." }]} faq={[{ question: "Can I book Buck Island through VibeVI?", answer: "No. VibeVI is a planning guide. Confirm authorization, availability, pricing, and booking directly with the operator." }, { question: "Are Buck Island conditions live on VibeVI?", answer: "No. Check official sources and your qualified operator for current conditions, closures, and safety guidance." }]} gradient="from-cyan-300/45 via-midnight-950 to-blue-700/35" />;
}
