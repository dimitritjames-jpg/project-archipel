import Link from "next/link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import type { LaunchGuide } from "@/lib/guides";
import { getGuideMediaAsset } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

export function SeoGuidePage({ guide }: { guide: LaunchGuide }) {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}${guide.path}`;
  const islandSegment = guide.path.split("/")[1];
  const islandHub = ["st-thomas", "st-croix", "st-john", "water-island"].includes(islandSegment)
    ? `/${islandSegment}`
    : null;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: canonical, author: { "@type": "Organization", name: "VibeVI" }, publisher: { "@type": "Organization", name: "VibeVI" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];
  const guideMedia = getGuideMediaAsset(`${guide.path} ${guide.title}`, guide.eyebrow);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MediaBackdrop media={{ ...guideMedia, id: guide.path, label: guide.eyebrow }} overlay="hero" priority className="min-h-[62svh]">
        <div className="section-shell flex min-h-[62svh] flex-col justify-end pb-12 pt-32 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3"><p className="eyebrow-label">{guide.eyebrow}</p><ComingSoonBadge label="Launch guide" /></div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{guide.introduction}</p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <section aria-labelledby="guide-essentials">
          <p className="eyebrow-label">Build the move</p>
          <h2 id="guide-essentials" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">Useful context before you set out.</h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {guide.essentials.map((item, index) => <article key={item.title} className="command-surface rounded-[1.5rem] p-6"><span className="font-mono text-[10px] text-aqua/60">0{index + 1}</span><h3 className="mt-8 text-xl font-semibold text-white">{item.title}</h3><p className="mt-4 text-sm leading-7 text-white/58">{item.body}</p></article>)}
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-white/8 pt-14 lg:grid-cols-[0.7fr_1.3fr]" aria-labelledby="guide-links">
          <div><p className="eyebrow-label">Keep moving</p><h2 id="guide-links" className="display-type mt-4 text-3xl font-semibold text-white">Open the next useful layer.</h2><p className="mt-4 text-sm leading-7 text-white/52">Every guide connects to a directory, island hub, or schedule utility. No dead-end brochure pages.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{guide.related.map((link) => <Link key={link.href} href={link.href} className="group rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-aqua/30"><div className="flex items-start justify-between gap-4"><h3 className="font-semibold text-white group-hover:text-aqua">{link.label}</h3><span className="text-aqua" aria-hidden>→</span></div><p className="mt-3 text-sm leading-6 text-white/48">{link.description}</p></Link>)}</div>
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="guide-faq"><p className="eyebrow-label">Straight answers</p><h2 id="guide-faq" className="display-type mt-4 text-3xl font-semibold text-white">Plan with the right expectations.</h2><div className="mt-8 grid gap-4 lg:grid-cols-2">{guide.faq.map((item) => <article key={item.question} className="glass-luminous rounded-[1.3rem] p-6"><h3 className="font-semibold text-white">{item.question}</h3><p className="mt-3 text-sm leading-7 text-white/56">{item.answer}</p></article>)}</div></section>

        <nav className="mt-16 flex flex-wrap gap-2 border-t border-white/8 pt-8" aria-label="Continue VibeVI discovery">
          {islandHub ? <Link href={islandHub} className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua">Open the island hub</Link> : null}
          <Link href="/search" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Search businesses</Link>
          <Link href="/map" className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62">Open the map</Link>
          <Link href="/get-listed" className="rounded-full border border-coral/20 bg-coral/7 px-4 py-2 text-sm font-semibold text-coral-sunset">Get listed on VibeVI</Link>
        </nav>
      </main>
    </>
  );
}
