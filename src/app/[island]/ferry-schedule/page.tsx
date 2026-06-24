import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { FERRY_MEDIA } from "@/lib/media";
import {
  FERRY_ROUTES_BY_ISLAND,
  getFerryRouteMeta,
  PRIMARY_FERRY_ROUTE_BY_ISLAND,
} from "@/lib/transit/ferry-routes";

type Props = { params: Promise<{ island: string }> };

const FERRY_ISLANDS = ["st-thomas", "st-john", "water-island"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug)) return { robots: { index: false, follow: false } };

  const name = getIslandName(slug as IslandSlug);

  return {
    title: `${name} Ferry Schedule`,
    description: `Check schedule-based ferry planning for ${name}, including directional route context, source information, and verification status.`,
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/${slug}/ferry-schedule`,
    },
    openGraph: {
      title: `${name} Ferry Schedule | VibeVI`,
      description: `Schedule-based ferry planning for ${name}. Confirm current operation directly with the ferry provider.`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function IslandFerrySchedulePage({ params }: Props) {
  const { island: slug } = await params;

  if (!getIslandBySlug(slug) || !FERRY_ISLANDS.includes(slug as (typeof FERRY_ISLANDS)[number])) {
    notFound();
  }

  const islandSlug = slug as IslandSlug;
  const name = getIslandName(islandSlug);
  const primaryRouteSlug = PRIMARY_FERRY_ROUTE_BY_ISLAND[islandSlug];
  const routeSlugs = FERRY_ROUTES_BY_ISLAND[islandSlug] ?? [];

  return (
    <>
      <AnalyticsEvent name="ferry_page_viewed" properties={{ island: slug }} />
      <MediaBackdrop
        media={{ ...FERRY_MEDIA, id: "ferry-board", label: `${name} ferry routes` }}
        overlay="hero"
        priority
        className="min-h-[54svh]"
      >
        <div className="section-shell flex min-h-[54svh] flex-col justify-end pb-12 pt-32">
          <p className="eyebrow-label">Ferry check · Atlantic Standard Time</p>
          <h1 className="display-type mt-5 text-5xl font-semibold text-white sm:text-7xl">
            Ferry board - {name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
            A directional schedule utility built around verified sources. It is
            not live vessel tracking, a service alert system, or a boarding
            guarantee.
          </p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            {primaryRouteSlug ? (
              <NextBoatWidget
                className="border-0 bg-transparent shadow-none"
                routeSlug={primaryRouteSlug}
                eyebrow={`${name} next boat`}
                emptyLabel="No upcoming departures found for this route."
              />
            ) : null}
          </div>

          <section className="command-surface rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Directional routes</p>
            <h2 className="display-type mt-4 text-3xl font-semibold text-white">
              Every crossing keeps its own truth.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Reverse trips are never assumed identical. Open a route for its
              source state and day-planning notes.
            </p>
            <div className="mt-8 space-y-3">
              {routeSlugs.map((routeSlug) => {
                const route = getFerryRouteMeta(routeSlug);
                if (!route) return null;

                return (
                  <Link
                    key={route.slug}
                    href={`/ferry/${route.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 p-4 transition hover:border-aqua/35 hover:bg-aqua/5"
                  >
                    <span>
                      <strong className="block text-sm text-white">
                        {route.label}
                      </strong>
                      <span className="mt-1 block text-xs text-white/45">
                        {route.note}
                      </span>
                    </span>
                    <span
                      className="text-aqua transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <section
          className="mt-14 border-t border-white/8 pt-12"
          aria-labelledby="ferry-planning"
        >
          <p className="eyebrow-label">Before the crossing</p>
          <h2
            id="ferry-planning"
            className="display-type mt-4 text-3xl font-semibold text-white"
          >
            Use the schedule as a plan, not a promise.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Confirm with the operator",
                body: "Schedules, fares, baggage rules, service status, and boarding requirements can change. The ferry provider is the final source.",
              },
              {
                title: "Check the direction",
                body: "Outbound and return trips are separate schedule records. Never assume the reverse crossing has the same times.",
              },
              {
                title: "Protect the connection",
                body: "Build margin for ground transport, check-in, queues, weather, and the next commitment after you arrive.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="command-surface rounded-[1.3rem] p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/52">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href={`/${slug}`}
              className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua"
            >
              Open {name}
            </Link>
            {slug === "st-john" ? (
              <Link
                href="/st-john/things-to-do"
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62"
              >
                Plan a St. John day
              </Link>
            ) : null}
            <Link
              href="/search"
              className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62"
            >
              Search island businesses
            </Link>
            <Link
              href="/map"
              className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62"
            >
              Open the map
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
