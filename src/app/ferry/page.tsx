import type { Metadata } from "next";
import Link from "next/link";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { FERRY_MEDIA } from "@/lib/media";
import { absoluteUrl } from "@/lib/site-url";
import { FERRY_ROUTE_GUIDES } from "@/lib/transit/ferry-routes";
import { RED_HOOK_CRUZ_BAY_ROUTE_SLUG } from "@/lib/transit/countdown-math";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "USVI Ferry Schedule & Island-Hop Guide | VibeVI",
  description:
    "Plan USVI ferry hops around St. Thomas, St. John, and Water Island with schedule-based context, route links, beach-day ideas, and direct-confirmation reminders.",
  alternates: { canonical: absoluteUrl("/ferry") },
  openGraph: {
    title: "USVI Ferry Schedule & Island-Hop Guide | VibeVI",
    description:
      "Schedule-based ferry planning for Red Hook, Cruz Bay, Crown Bay, Water Island, beach days, boat days, and island dining.",
    url: absoluteUrl("/ferry"),
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "USVI Ferry Schedule & Island-Hop Guide",
    url: absoluteUrl("/ferry"),
    description:
      "Schedule-based ferry planning hub for St. Thomas, St. John, and Water Island. Confirm current operations directly with ferry providers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are VibeVI ferry times live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Ferry information is schedule-based and is not live vessel tracking, a service alert system, or a boarding guarantee.",
        },
      },
      {
        "@type": "Question",
        name: "What should I confirm before a ferry trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Confirm current schedules, fares, baggage rules, service status, and boarding requirements directly with the operator before travel.",
        },
      },
    ],
  },
];

export default function FerryHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <MediaBackdrop
        media={{ ...FERRY_MEDIA, id: "ferry-hub", label: "USVI ferry planning" }}
        overlay="hero"
        priority
        className="min-h-[62svh]"
      >
        <div className="section-shell flex min-h-[62svh] flex-col justify-end pb-12 pt-32">
          <p className="eyebrow-label">Ferry hop · schedule-based</p>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">
            USVI ferry schedule and island-hop guide
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70">
            Plan the crossing, then make the day: St. John beaches, Cruz Bay
            food, Water Island slow days, Red Hook nights, charters, and return
            margins. VibeVI uses schedule-based context, not live vessel tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/st-thomas/ferry-schedule" className="rounded-full bg-aqua px-5 py-3 text-sm font-semibold text-midnight-950">
              Full ferry board
            </Link>
            <Link href="/water-island/ferry-schedule" className="rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white">
              Water Island ferry hop
            </Link>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" aria-labelledby="next-crossing">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            <NextBoatWidget
              className="border-0 bg-transparent shadow-none"
              routeSlug={RED_HOOK_CRUZ_BAY_ROUTE_SLUG}
              eyebrow="Red Hook next boat"
              emptyLabel="No upcoming departures found for this route."
            />
          </div>
          <div className="command-surface rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Use it like a local utility</p>
            <h2 id="next-crossing" className="display-type mt-4 text-3xl font-semibold text-white">
              The ferry is the first domino.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Ferry timing shapes the beach window, charter departure, lunch
              spot, dinner reservation, and the ride back. Build the day around
              a confirmed crossing and keep margin for queues, taxis, weather,
              baggage, and the last thing you cannot miss.
            </p>
            <p className="mt-5 text-xs leading-6 text-white/45">
              Confirm directly with the operator before travel. VibeVI does not
              guarantee boarding, service status, or return timing.
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="ferry-route-list">
          <p className="eyebrow-label">Active ferry routes</p>
          <h2 id="ferry-route-list" className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Choose the crossing, then choose the move.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FERRY_ROUTE_GUIDES.map((route) => (
              <Link
                key={route.slug}
                href={`/ferry/${route.slug}`}
                className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-aqua/30"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-aqua/65">
                  {route.sourceStatus === "source-backed" ? "Schedule-backed" : "Guide-only"}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-white group-hover:text-aqua">
                  {route.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{route.note}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-aqua/85">
                  Open route <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="ferry-day-links">
          <p className="eyebrow-label">Ferry feeds discovery</p>
          <h2 id="ferry-day-links" className="display-type mt-4 text-3xl font-semibold text-white">
            Beach, boat, bite, night — with the crossing in view.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              { href: "/st-john/beaches", label: "St. John beach day", body: "Choose the sand by ferry timing, transport, facilities, and return margin." },
              { href: "/st-john/excursions-charters", label: "Cruz Bay charters", body: "Compare published operator profiles and confirm departure details directly." },
              { href: "/st-john/indulgent-dining", label: "Cruz Bay food", body: "Make the table fit the crossing instead of rushing the return." },
              { href: "/water-island/day-trip", label: "Water Island day trip", body: "Plan Crown Bay, Honeymoon Beach, golf-cart movement, and the return." },
              { href: "/st-thomas/nightlife-rhythm", label: "Red Hook after dark", body: "Keep dinner and late-night moves close to the St. Thomas landing." },
              { href: "/map", label: "Map the ferry day", body: "Place ferry, beach, food, culture, and published listings on one island map." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="command-surface rounded-[1.35rem] p-5 transition hover:-translate-y-1 hover:border-sand/25">
                <h3 className="font-semibold text-white">{link.label}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{link.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="ferry-boards">
          <p className="eyebrow-label">Island ferry boards</p>
          <h2 id="ferry-boards" className="display-type mt-4 text-3xl font-semibold text-white">
            Open the board for your starting island.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ["/st-thomas/ferry-schedule", "St. Thomas ferry schedule"],
              ["/st-john/ferry-schedule", "St. John ferry schedule"],
              ["/water-island/ferry-schedule", "Water Island ferry schedule"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua">
                {label}
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/52">
            Source-backed route pages use imported timetable records where available.
            Guide-only pages are clearly labeled and should not be treated as timetable data.
          </p>
        </section>
      </main>
    </>
  );
}
