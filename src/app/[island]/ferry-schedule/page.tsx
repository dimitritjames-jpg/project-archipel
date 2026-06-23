import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug)) return { robots: { index: false, follow: false } };
  const name = getIslandName(slug as IslandSlug);
  return { title: `${name} Ferry Schedule`, description: `Check schedule-based ferry planning for ${name}, including directional route context, source information, and verification status.`, alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${slug}/ferry-schedule` }, openGraph: { title: `${name} Ferry Schedule | VibeVI`, description: `Schedule-based ferry planning for ${name}. Confirm current operation directly with the ferry provider.` }, robots: { index: true, follow: true } };
}

export default async function IslandFerrySchedulePage({ params }: Props) {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug) || !["st-thomas", "st-john", "water-island"].includes(slug)) notFound();
  const name = getIslandName(slug as IslandSlug);
  return (
    <>
      <AnalyticsEvent name="ferry_page_viewed" properties={{ island: slug }} />
      <MediaBackdrop media={{ id: "ferry-board", label: "Ferry routes", gradient: "from-cyan-300/45 via-midnight-950 to-teal-600/35", src: null, alt: "Abstract ferry route composition" }} overlay="hero" priority className="min-h-[54svh]">
        <div className="section-shell flex min-h-[54svh] flex-col justify-end pb-12 pt-32"><p className="eyebrow-label">Transit utility · Atlantic Standard Time</p><h1 className="display-type mt-5 text-5xl font-semibold text-white sm:text-7xl">Ferry board — {name}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/68">A directional schedule utility built around verified sources. It is not live vessel tracking, a service alert system, or a boarding guarantee.</p></div>
      </MediaBackdrop>
      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4"><NextBoatWidget className="border-0 bg-transparent shadow-none" /></div>
          <section className="command-surface rounded-[2rem] p-7 sm:p-9"><p className="eyebrow-label">Directional routes</p><h2 className="display-type mt-4 text-3xl font-semibold text-white">Every crossing keeps its own truth.</h2><p className="mt-4 text-sm leading-7 text-white/60">Reverse trips are never assumed identical. Open a route for its source state and day-planning notes.</p><div className="mt-8 space-y-3">{[{ href: "/ferry/red-hook-to-cruz-bay", label: "Red Hook → Cruz Bay", note: "St. Thomas to St. John" }, { href: "/ferry/crown-bay-to-water-island", label: "Crown Bay → Water Island", note: "St. Thomas to Water Island" }].map((route) => <Link key={route.href} href={route.href} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 p-4 transition hover:border-aqua/35 hover:bg-aqua/5"><span><strong className="block text-sm text-white">{route.label}</strong><span className="mt-1 block text-xs text-white/45">{route.note}</span></span><span className="text-aqua transition-transform group-hover:translate-x-1" aria-hidden>→</span></Link>)}</div></section>
        </div>
        <section className="mt-14 border-t border-white/8 pt-12" aria-labelledby="ferry-planning">
          <p className="eyebrow-label">Before the crossing</p>
          <h2 id="ferry-planning" className="display-type mt-4 text-3xl font-semibold text-white">Use the schedule as a plan, not a promise.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[{ title: "Confirm with the operator", body: "Schedules, fares, baggage rules, service status, and boarding requirements can change. The ferry provider is the final source." }, { title: "Check the direction", body: "Outbound and return trips are separate schedule records. Never assume the reverse crossing has the same times." }, { title: "Protect the connection", body: "Build margin for ground transport, check-in, queues, weather, and the next commitment after you arrive." }].map((item) => <article key={item.title} className="command-surface rounded-[1.3rem] p-5"><h3 className="font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/52">{item.body}</p></article>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-2"><Link href={`/${slug}`} className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua">Open {name}</Link>{slug === "st-john" ? <Link href="/st-john/things-to-do" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Plan a St. John day</Link> : null}<Link href="/search" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Search island businesses</Link><Link href="/map" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Open the map</Link></div>
        </section>
      </main>
    </>
  );
}
