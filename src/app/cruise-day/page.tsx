import type { Metadata } from "next";
import Link from "next/link";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { CRUISE_DAY_MEDIA } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "USVI Cruise Day Guide | VibeVI",
  description:
    "Plan a USVI cruise day around port location, beach, food, culture, shopping, tours, scheduled capacity context, and a conservative all-aboard buffer.",
  alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/cruise-day` },
  openGraph: {
    title: "USVI Cruise Day Guide | VibeVI",
    description:
      "Port-aware cruise-day planning for St. Thomas and St. Croix with scheduled-capacity trust language and useful island links.",
    url: `${env.NEXT_PUBLIC_SITE_URL}/cruise-day`,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does VibeVI show live cruise crowds?",
      acceptedAnswer: {
        "@type": "Answer",
          text: "No. Cruise information uses scheduled ship calls and scheduled capacity when available. It is not observed passenger totals or a live port feed.",
      },
    },
    {
      "@type": "Question",
      name: "Can VibeVI guarantee return to the ship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Confirm all-aboard time, pickup point, duration, and return transport directly with your cruise line and providers. Keep a conservative return buffer.",
      },
    },
  ],
};

export default function CruiseDayHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <MediaBackdrop
        media={{ ...CRUISE_DAY_MEDIA, id: "cruise-day-hub", label: "USVI cruise-day planning" }}
        overlay="hero"
        priority
        className="min-h-[62svh]"
      >
        <div className="section-shell flex min-h-[62svh] flex-col justify-end pb-12 pt-32">
          <p className="eyebrow-label text-coral">Cruise day · scheduled capacity</p>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">
            USVI cruise day guide
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70">
            Build the shore day backward from all-aboard: port, pickup point,
            travel time, beach window, food stop, cultural route, shopping loop,
            and the return buffer. Scheduled capacity is planning context, not a
            live crowd count.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/st-thomas/cruise-day" className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-midnight-950">
              St. Thomas cruise-day moves
            </Link>
            <Link href="/st-thomas/cruise-schedule" className="rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white">
              St. Thomas cruise schedule
            </Link>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" aria-labelledby="cruise-context">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            <CrowdPredictor
              className="border-0 bg-transparent shadow-none"
              islandCode="STT"
              scopeLabel="St. Thomas port load"
            />
          </div>
          <div className="command-surface rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Port-safe planning</p>
            <h2 id="cruise-context" className="display-type mt-4 text-3xl font-semibold text-white">
              One strong move beats six rushed ones.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Use scheduled port context to choose a realistic route: a beach,
              a town walk, one tour, a lunch stop, local shopping, or a short
              culture route. Confirm pickup and return timing directly before
              committing the day.
            </p>
            <p className="mt-5 text-xs leading-6 text-white/45">
              VibeVI does not claim live port crowds, observed passenger totals,
              booking availability, or control over return timing.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="port-guides">
          <p className="eyebrow-label">St. Thomas port guides</p>
          <h2 id="port-guides" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Havensight and Crown Bay start different days.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              { href: "/st-thomas/havensight-cruise-day", label: "Havensight cruise-day guide", body: "Plan walkable shopping, nearby culture stops, Charlotte Amalie routes, tours, beach decisions, and a return buffer." },
              { href: "/st-thomas/crown-bay-cruise-day", label: "Crown Bay cruise-day guide", body: "Plan pickup points, Water Island caution, beach routes, town movement, food, and conservative ship-return timing." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-coral/30">
                <h3 className="text-xl font-semibold text-white group-hover:text-coral">{link.label}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{link.body}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-coral/90">
                  Open guide <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="cruise-moves">
          <p className="eyebrow-label">Choose the one-day move</p>
          <h2 id="cruise-moves" className="display-type mt-4 text-3xl font-semibold text-white">
            Beach, food, culture, shopping, or water.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { href: "/st-thomas/magens-bay", label: "Beach", body: "Magens Bay and other beach options need transport and return margin." },
              { href: "/st-thomas/indulgent-dining", label: "Food", body: "Fit lunch or dinner near the port clock, then confirm hours directly." },
              { href: "/experiences/culture", label: "Culture", body: "Forts, history, makers, and town walks can work well on port days." },
              { href: "/st-thomas/local-provisions", label: "Shopping", body: "Use published profiles as starting points, not live inventory." },
              { href: "/st-thomas/excursions-charters", label: "Tours", body: "Confirm pickup point, duration, and return transport directly." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="command-surface rounded-[1.25rem] p-5 transition hover:-translate-y-1 hover:border-sand/25">
                <h3 className="font-semibold text-white">{link.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{link.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="cruise-trust">
          <p className="eyebrow-label">Cruise-day trust rules</p>
          <h2 id="cruise-trust" className="display-type mt-4 text-3xl font-semibold text-white">
            Useful planning, no fake certainty.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["Scheduled capacity only", "Capacity is a planning estimate from scheduled ship data when known, not actual people ashore."],
              ["Return buffer first", "Confirm all-aboard time, pickup point, duration, and return transport directly."],
              ["Direct source wins", "Hours, prices, safety details, availability, and booking stay with the cruise line, operator, or business."],
            ].map(([title, body]) => (
              <article key={title} className="glass-luminous rounded-[1.3rem] p-6">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/56">{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
