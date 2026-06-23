import type { Metadata } from "next";
import Link from "next/link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { FERRY_MEDIA } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ routeSlug: string }> };

function routeName(slug: string) {
  return slug.split("-to-").map((place) => place.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ")).join(" → ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { routeSlug } = await params;
  return { title: `Ferry — ${routeName(routeSlug)}`, description: "Directional ferry schedule context, source verification, and island connections.", alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}` }, robots: { index: true, follow: true } };
}

export default async function FerryRoutePage({ params }: Props) {
  const { routeSlug } = await params;
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}`;
  const title = routeName(routeSlug);
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", name: `Ferry route: ${title}`, url: canonical };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MediaBackdrop media={{ ...FERRY_MEDIA, id: routeSlug, label: "Directional ferry route", alt: `${FERRY_MEDIA.alt} for ${title}` }} overlay="hero" priority className="min-h-[58svh]">
        <div className="section-shell flex min-h-[58svh] flex-col justify-end pb-12 pt-32">
          <div className="flex flex-wrap items-center gap-3"><p className="eyebrow-label">Ferry check · AST</p><span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Schedule preview</span></div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68">A directional route page for planning the crossing. Published times, fares, and service alerts will appear only when their source data is connected and verified.</p>
        </div>
      </MediaBackdrop>
      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="command-surface rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Timetable state</p><h2 className="display-type mt-4 text-3xl font-semibold text-white">Source-backed departures are not published here yet.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">No invented schedule is shown. Confirm today’s crossing, fare, baggage rules, and operational status directly with the ferry operator before travel.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/st-thomas/ferry-schedule" className="rounded-full bg-aqua px-5 py-3 text-sm font-semibold text-midnight-950 transition hover:bg-aqua/90">Open ferry board</Link><Link href="/map" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30">View island map</Link></div>
          </section>
          <aside className="glass-luminous rounded-[2rem] p-7"><p className="eyebrow-label">Trust contract</p><ul className="mt-6 space-y-4 text-sm leading-6 text-white/62"><li>Direction is explicit; reverse service is never assumed identical.</li><li>Times are interpreted in Atlantic Standard Time (UTC−04:00).</li><li>Schedule information is not live vessel tracking or a boarding guarantee.</li></ul></aside>
        </div>
      </main>
    </>
  );
}
