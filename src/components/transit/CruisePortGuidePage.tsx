import Link from "next/link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { CRUISE_DAY_MEDIA } from "@/lib/media";
import type { CruisePortGuide } from "@/lib/transit/cruise-port-guides";
import { serializeJsonLd } from "@/lib/utils";

export function CruisePortGuidePage({ guide }: { guide: CruisePortGuide }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <MediaBackdrop
        media={{
          ...CRUISE_DAY_MEDIA,
          id: guide.path,
          label: guide.portName,
          alt: `${CRUISE_DAY_MEDIA.alt} for ${guide.portName} cruise-day planning`,
        }}
        overlay="hero"
        priority
        className="min-h-[60svh]"
      >
        <div className="section-shell flex min-h-[60svh] flex-col justify-end pb-12 pt-32">
          <p className="eyebrow-label text-coral">{guide.eyebrow}</p>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">
            {guide.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70">
            {guide.introduction}
          </p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <section className="grid gap-4 lg:grid-cols-3" aria-label={`${guide.portName} cruise-day essentials`}>
          {guide.essentials.map((item) => (
            <article key={item.title} className="command-surface rounded-[1.35rem] p-6">
              <h2 className="text-xl font-semibold tracking-[-0.035em] text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="port-moves">
          <p className="eyebrow-label">Port-day moves</p>
          <h2 id="port-moves" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Choose one strong move, then protect the return.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guide.moves.map((move) => (
              <Link
                key={move.href}
                href={move.href}
                className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-coral/30"
              >
                <h3 className="font-semibold text-white group-hover:text-coral">
                  {move.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/52">
                  {move.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-coral/90">
                  Open <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="port-trust">
          <p className="eyebrow-label">Trust note</p>
          <h2 id="port-trust" className="display-type mt-4 text-3xl font-semibold text-white">
            VibeVI helps plan the day. It does not control the clock.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/56">
            Confirm ship timing, pickup point, route, prices, hours, safety
            details, booking, and return transport directly with the cruise line,
            provider, or business. Scheduled capacity is a planning estimate,
            not observed passenger count or live crowd data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cruise-day" className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-midnight-950">
              Open cruise-day hub
            </Link>
            <Link href="/st-thomas/cruise-schedule" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
              St. Thomas cruise schedule
            </Link>
            <Link href="/map" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
              View island map
            </Link>
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="port-faq">
          <p className="eyebrow-label">FAQ</p>
          <h2 id="port-faq" className="display-type mt-4 text-3xl font-semibold text-white">
            Plan with the right expectations.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {guide.faq.map((item) => (
              <article key={item.question} className="glass-luminous rounded-[1.3rem] p-6">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/56">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
