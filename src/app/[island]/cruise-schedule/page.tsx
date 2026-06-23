import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug)) return { robots: { index: false, follow: false } };
  const name = getIslandName(slug as IslandSlug);
  return { title: `${name} Cruise Schedule & Port Load`, description: `Review scheduled cruise arrivals and capacity context for ${name} ports—planning estimates, not actual passenger counts.`, alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${slug}/cruise-schedule` }, openGraph: { title: `${name} Cruise Schedule & Port Load | VibeVI`, description: `Scheduled ship and capacity context for planning a ${name} port day.` }, robots: { index: true, follow: true } };
}

export default async function IslandCruiseSchedulePage({ params }: Props) {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug) || !["st-thomas", "st-croix"].includes(slug)) notFound();
  const name = getIslandName(slug as IslandSlug);
  return (
    <>
      <AnalyticsEvent name="cruise_page_viewed" properties={{ island: slug }} />
      <MediaBackdrop media={{ id: "cruise-days", label: "Cruise ports", gradient: "from-rose-400/35 via-midnight-950 to-amber-500/30", src: null, alt: "Abstract warm port-day composition" }} overlay="hero" priority className="min-h-[54svh]">
        <div className="section-shell flex min-h-[54svh] flex-col justify-end pb-12 pt-32"><p className="eyebrow-label text-coral">Cruise days · Scheduled capacity</p><h1 className="display-type mt-5 text-5xl font-semibold text-white sm:text-7xl">Cruise day flow — {name}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/68">Read the shape of a port day using scheduled ship capacity. This is a planning estimate—not observed foot traffic or a passenger count.</p></div>
      </MediaBackdrop>
      <main className="section-shell py-16 sm:py-20"><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div className="glass-luminous rounded-[2rem] p-2 sm:p-4"><CrowdPredictor className="border-0 bg-transparent shadow-none" /></div><section className="command-surface rounded-[2rem] p-7 sm:p-9"><p className="eyebrow-label">Read the bands</p><h2 className="display-type mt-4 text-3xl font-semibold text-white">A planning cue for pacing the island.</h2><div className="mt-7 space-y-3">{[["Quiet", "Lower scheduled capacity"], ["Elevated", "A more active port day"], ["High-impact", "Plan extra time around port corridors"]].map(([label, detail], index) => <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4"><span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-aqua" : index === 1 ? "bg-gold" : "bg-coral"}`} /><span><strong className="block text-sm text-white">{label}</strong><span className="text-xs text-white/45">{detail}</span></span></div>)}</div><p className="mt-6 text-xs leading-6 text-white/46">Unknown ship capacity lowers data coverage. Imported schedules should always retain their source and verification timestamp.</p><Link href={`/${slug}`} className="mt-7 inline-flex text-sm font-semibold text-aqua hover:text-white">Return to {name} <span aria-hidden className="ml-2">→</span></Link></section></div><section className="mt-14 border-t border-white/8 pt-12"><p className="eyebrow-label">Use the context well</p><h2 className="display-type mt-4 text-3xl font-semibold text-white">Capacity context is not a crowd counter.</h2><div className="mt-8 grid gap-4 lg:grid-cols-3">{[{ title: "Scheduled, not observed", body: "The model uses known scheduled ship capacity. It does not measure actual disembarkation, street traffic, or business demand." }, { title: "Coverage can be partial", body: "Unknown ship capacities reduce confidence. Source and verification timestamps matter as much as the headline band." }, { title: "Plan backward", body: "For a cruise day, use authoritative ship timing and a conservative return margin before choosing transport, a beach, or an excursion." }].map((item) => <article key={item.title} className="command-surface rounded-[1.3rem] p-5"><h3 className="font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/52">{item.body}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-2">{slug === "st-thomas" ? <Link href="/st-thomas/cruise-day" className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua">Plan a St. Thomas cruise day</Link> : null}<Link href={`/${slug}/excursions-charters`} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Browse excursions</Link><Link href="/map" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Open the map</Link></div></section></main>
    </>
  );
}
