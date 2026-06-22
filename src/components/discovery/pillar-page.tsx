import Link from "next/link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { serializeJsonLd } from "@/lib/utils";

type PillarLink = { href: string; label: string; detail: string; accent?: "aqua" | "coral" | "gold" };

type PillarPageProps = {
  eyebrow: string;
  title: string;
  island: string;
  introduction: string;
  planningNote: string;
  highlights: string[];
  links: PillarLink[];
  gradient: string;
  decisions?: { title: string; body: string }[];
  faq?: { question: string; answer: string }[];
};

const accentStyles = {
  aqua: "text-aqua border-aqua/25 bg-aqua/5",
  coral: "text-coral border-coral/25 bg-coral/5",
  gold: "text-gold border-gold/25 bg-gold/5",
};

export function PillarPage({ eyebrow, title, island, introduction, planningNote, highlights, links, gradient, decisions = [], faq = [] }: PillarPageProps) {
  return (
    <>
      {faq.length > 0 ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} /> : null}
      <MediaBackdrop
        media={{ id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: eyebrow, gradient, src: null, alt: `Abstract island composition for ${title}` }}
        overlay="hero"
        priority
        className="min-h-[68svh]"
      >
        <div className="section-shell flex min-h-[68svh] flex-col justify-end pb-12 pt-32 sm:pb-16">
          <p className="eyebrow-label">{eyebrow} · {island}</p>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">{introduction}</p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="glass-luminous rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Field notes</p>
            <h2 className="display-type mt-4 text-3xl font-semibold text-white">Build the day around the place.</h2>
            <p className="mt-5 text-sm leading-7 text-white/64">{planningNote}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((highlight) => <span key={highlight} className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs text-white/72">{highlight}</span>)}
            </div>
          </section>

          <section>
            <p className="eyebrow-label">Continue exploring</p>
            <h2 className="display-type mt-4 text-3xl font-semibold text-white sm:text-4xl">Useful next moves, not a dead end.</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {links.map((link, index) => (
                <Link key={link.href} href={link.href} className={`group rounded-[1.5rem] border p-5 transition duration-300 hover:-translate-y-1 hover:border-white/28 ${accentStyles[link.accent ?? "aqua"]}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-65">0{index + 1}</span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-white">{link.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/56">{link.detail}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
        {decisions.length > 0 ? <section className="mt-20 border-t border-white/8 pt-14"><p className="eyebrow-label">Make the call</p><h2 className="display-type mt-4 text-3xl font-semibold text-white sm:text-4xl">What changes the shape of this day.</h2><div className="mt-8 grid gap-4 lg:grid-cols-3">{decisions.map((item, index) => <article key={item.title} className="command-surface rounded-[1.35rem] p-5"><span className="font-mono text-[10px] text-aqua/55">0{index + 1}</span><h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/52">{item.body}</p></article>)}</div></section> : null}
        {faq.length > 0 ? <section className="mt-20 border-t border-white/8 pt-14"><p className="eyebrow-label">Before you go</p><h2 className="display-type mt-4 text-3xl font-semibold text-white sm:text-4xl">Useful answers, honest limits.</h2><div className="mt-8 grid gap-4 lg:grid-cols-2">{faq.map((item) => <article key={item.question} className="glass-luminous rounded-[1.35rem] p-6"><h3 className="font-semibold text-white">{item.question}</h3><p className="mt-3 text-sm leading-7 text-white/54">{item.answer}</p></article>)}</div></section> : null}
      </main>
    </>
  );
}
