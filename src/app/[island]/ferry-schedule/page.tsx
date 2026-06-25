import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import {
  UtilityChipLink,
  UtilityHero,
  UtilityInfoCard,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilitySection,
  UtilityWidgetShell,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
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
    title: slug === "st-john" ? "St. John Ferry Day Trip Guide | VibeVI" : slug === "water-island" ? "Water Island Ferry Day Trip Guide | VibeVI" : `${name} Ferry Schedule & Island-Hop Guide | VibeVI`,
    description: `Check schedule-based ferry planning for ${name}, with directional route context, island-day links, source information, and direct-confirmation reminders.`,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${slug}/ferry-schedule` },
    openGraph: { title: `${name} Ferry Schedule | VibeVI`, description: `Schedule-based ferry planning for ${name}. Confirm current operation directly with the ferry provider.` },
    robots: { index: true, follow: true },
  };
}

export default async function IslandFerrySchedulePage({ params }: Props) {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug) || !FERRY_ISLANDS.includes(slug as (typeof FERRY_ISLANDS)[number])) notFound();

  const islandSlug = slug as IslandSlug;
  const name = getIslandName(islandSlug);
  const primaryRouteSlug = PRIMARY_FERRY_ROUTE_BY_ISLAND[islandSlug];
  const routeSlugs = FERRY_ROUTES_BY_ISLAND[islandSlug] ?? [];

  return (
    <UtilityPage>
      <AnalyticsEvent name="ferry_page_viewed" properties={{ island: slug }} />

      <UtilityHero
        media={toResponsiveMedia({ src: FERRY_MEDIA.src, alt: `${name} ferry routes` })}
        eyebrow="Ferry check · Atlantic Standard Time"
        title={`Ferry board — ${name}`}
        description="A directional schedule utility built around verified sources. It is not live vessel tracking, a service alert system, or a boarding guarantee."
        minHeight="min-h-[min(50vh,460px)]"
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <UtilityWidgetShell>
            {primaryRouteSlug ? (
              <NextBoatWidget className="border-0 bg-transparent p-0 shadow-none" routeSlug={primaryRouteSlug} eyebrow={`${name} next boat`} emptyLabel="No upcoming departures found for this route." />
            ) : null}
          </UtilityWidgetShell>

          <VvCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">Directional routes</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941]">Every crossing keeps its own truth.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#496871]">Reverse trips are never assumed identical. Open a route for its source state and day-planning notes.</p>
            <div className="mt-6 space-y-3">
              {routeSlugs.map((routeSlug) => {
                const route = getFerryRouteMeta(routeSlug);
                if (!route) return null;
                return (
                  <Link key={route.slug} href={`/ferry/${route.slug}`} className="group flex items-center justify-between rounded-xl border border-[#0b4b55]/10 bg-[#fffaf3] p-4 transition hover:border-[#0797a6]/30 hover:bg-[#e9fbf7]">
                    <span>
                      <strong className="block text-sm text-[#173941]">{route.label}</strong>
                      <span className="mt-1 block text-xs text-[#496871]">{route.note}</span>
                    </span>
                    <span className="text-[#0797a6] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                );
              })}
            </div>
          </VvCard>
        </div>

        <UtilitySection eyebrow="Before the crossing" title="Use the schedule as a plan, not a promise." id="ferry-planning" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <UtilityInfoCard title="Confirm with the operator" body="Schedules, fares, baggage rules, service status, and boarding requirements can change. The ferry provider is the final source." />
            <UtilityInfoCard title="Check the direction" body="Outbound and return trips are separate schedule records. Never assume the reverse crossing has the same times." />
            <UtilityInfoCard title="Protect the connection" body="Build margin for ground transport, check-in, queues, weather, and the next commitment after you arrive." />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <UtilityChipLink href="/ferry">Full ferry guide</UtilityChipLink>
            <UtilityChipLink href={`/${slug}`}>Open {name}</UtilityChipLink>
            {slug === "st-john" ? <UtilityChipLink href="/st-john/things-to-do">Plan a St. John day</UtilityChipLink> : null}
            <UtilityChipLink href="/search">Search island businesses</UtilityChipLink>
            <UtilityChipLink href="/map">Open the map</UtilityChipLink>
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Make the ferry useful" title="The crossing feeds the beach, boat, bite, and night." id="ferry-feeds-discovery" className="mt-14">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: slug === "water-island" ? "/water-island/day-trip" : "/st-john/beaches", label: "Beach window", body: "Choose the sand with travel time and the return crossing already in mind." },
              { href: slug === "st-thomas" ? "/st-thomas/excursions-charters" : "/st-john/excursions-charters", label: "Boat day", body: "Browse published charter profiles, then confirm pickup and departure details directly." },
              { href: slug === "st-john" ? "/st-john/indulgent-dining" : "/st-thomas/indulgent-dining", label: "Ferry-side food", body: "Make lunch, dinner, or the landing bite fit the ferry clock without rushing." },
              { href: slug === "st-thomas" ? "/st-thomas/nightlife-rhythm" : "/map", label: "Return plan", body: "Keep the ride back, transfer, or late-night route simple and directly confirmed." },
            ].map((item) => (
              <UtilityLinkCard key={item.label} href={item.href} title={item.label} body={item.body} />
            ))}
          </div>
        </UtilitySection>
      </UtilityMain>
    </UtilityPage>
  );
}
