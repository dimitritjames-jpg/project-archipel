import type { Metadata } from "next";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import {
  UtilityChipLink,
  UtilityHero,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySecondaryButton,
  UtilitySection,
  UtilityWidgetShell,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
import { env } from "@/lib/env";
import { FERRY_MEDIA } from "@/lib/media";
import { FERRY_ROUTE_GUIDES } from "@/lib/transit/ferry-routes";
import { RED_HOOK_CRUZ_BAY_ROUTE_SLUG } from "@/lib/transit/countdown-math";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "USVI Ferry Schedule & Island-Hop Guide | VibeVI",
  description:
    "Plan USVI ferry hops around St. Thomas, St. John, and Water Island with schedule-based context, route links, beach-day ideas, and direct-confirmation reminders.",
  alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/ferry` },
  openGraph: {
    title: "USVI Ferry Schedule & Island-Hop Guide | VibeVI",
    description:
      "Schedule-based ferry planning for Red Hook, Cruz Bay, Crown Bay, Water Island, beach days, boat days, and island dining.",
    url: `${env.NEXT_PUBLIC_SITE_URL}/ferry`,
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "USVI Ferry Schedule & Island-Hop Guide",
    url: `${env.NEXT_PUBLIC_SITE_URL}/ferry`,
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

const dayLinks = [
  { href: "/st-john/beaches", label: "St. John beach day", body: "Choose the sand by ferry timing, transport, facilities, and return margin." },
  { href: "/st-john/excursions-charters", label: "Cruz Bay charters", body: "Compare published operator profiles and confirm departure details directly." },
  { href: "/st-john/indulgent-dining", label: "Cruz Bay food", body: "Make the table fit the crossing instead of rushing the return." },
  { href: "/water-island/day-trip", label: "Water Island day trip", body: "Plan Crown Bay, Honeymoon Beach, golf-cart movement, and the return." },
  { href: "/st-thomas/nightlife-rhythm", label: "Red Hook after dark", body: "Keep dinner and late-night moves close to the St. Thomas landing." },
  { href: "/map", label: "Map the ferry day", body: "Place ferry, beach, food, culture, and published listings on one island map." },
];

export default function FerryHubPage() {
  return (
    <UtilityPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <UtilityHero
        media={toResponsiveMedia({ src: FERRY_MEDIA.src, alt: FERRY_MEDIA.alt })}
        eyebrow="Ferry hop · schedule-based"
        title="USVI ferry schedule and island-hop guide"
        description="Plan the crossing, then make the day: St. John beaches, Cruz Bay food, Water Island slow days, Red Hook nights, charters, and return margins. VibeVI uses schedule-based context, not live vessel tracking."
        actions={
          <>
            <UtilityPrimaryButton href="/st-thomas/ferry-schedule">Full ferry board</UtilityPrimaryButton>
            <UtilitySecondaryButton href="/water-island/ferry-schedule">Water Island ferry hop</UtilitySecondaryButton>
          </>
        }
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <UtilityWidgetShell>
            <NextBoatWidget
              className="border-0 bg-transparent p-0 shadow-none"
              routeSlug={RED_HOOK_CRUZ_BAY_ROUTE_SLUG}
              eyebrow="Red Hook next boat"
              emptyLabel="No upcoming departures found for this route."
            />
          </UtilityWidgetShell>

          <VvCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
              Use it like a local utility
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941] sm:text-3xl">
              The ferry is the first domino.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#496871]">
              Ferry timing shapes the beach window, charter departure, lunch spot, dinner reservation, and the ride back. Build the day around a confirmed crossing and keep margin for queues, taxis, weather, baggage, and the last thing you cannot miss.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#496871]">
              Confirm directly with the operator before travel. VibeVI does not guarantee boarding, service status, or return timing.
            </p>
          </VvCard>
        </div>

        <UtilitySection eyebrow="Active ferry routes" title="Choose the crossing, then choose the move." id="ferry-route-list" className="mt-14">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FERRY_ROUTE_GUIDES.map((route) => (
              <UtilityLinkCard
                key={route.slug}
                href={`/ferry/${route.slug}`}
                title={route.label}
                body={route.note}
                cta={route.sourceStatus === "source-backed" ? "Schedule-backed" : "Guide-only"}
              />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Ferry feeds discovery" title="Beach, boat, bite, night — with the crossing in view." id="ferry-day-links" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {dayLinks.map((link) => (
              <UtilityLinkCard key={link.href} href={link.href} title={link.label} body={link.body} />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Island ferry boards" title="Open the board for your starting island." id="ferry-boards" className="mt-14">
          <div className="mt-5 flex flex-wrap gap-2">
            <UtilityChipLink href="/st-thomas/ferry-schedule">St. Thomas ferry schedule</UtilityChipLink>
            <UtilityChipLink href="/st-john/ferry-schedule">St. John ferry schedule</UtilityChipLink>
            <UtilityChipLink href="/water-island/ferry-schedule">Water Island ferry schedule</UtilityChipLink>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#496871]">
            Source-backed route pages use imported timetable records where available. Guide-only pages are clearly labeled and should not be treated as timetable data.
          </p>
        </UtilitySection>
      </UtilityMain>
    </UtilityPage>
  );
}
