import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import {
  UtilityHero,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySecondaryButton,
  UtilitySection,
  UtilityTrustNote,
  UtilityWidgetShell,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { TrustBadge } from "@/components/facelift/trust-badge";
import { VvCard } from "@/components/facelift/vv-ui";
import { env } from "@/lib/env";
import { FERRY_MEDIA } from "@/lib/media";
import {
  FERRY_ROUTE_GUIDES,
  getFerryRouteGuide,
  getFerryRouteRedirect,
} from "@/lib/transit/ferry-routes";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ routeSlug: string }> };

export function generateStaticParams() {
  return FERRY_ROUTE_GUIDES.map((route) => ({ routeSlug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { routeSlug } = await params;
  const redirectSlug = getFerryRouteRedirect(routeSlug);
  if (redirectSlug) {
    return { alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/ferry/${redirectSlug}` }, robots: { index: false, follow: true } };
  }
  const route = getFerryRouteGuide(routeSlug);
  if (!route) return { robots: { index: false, follow: false } };
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${route.slug}`;
  return {
    title: `${route.plainTitle} | VibeVI`,
    description: `${route.note} Schedule-based ferry planning only. Confirm current operation, fares, and boarding requirements directly with the ferry provider.`,
    alternates: { canonical },
    openGraph: { title: `${route.plainTitle} | VibeVI`, description: "Plan the ferry around beaches, charters, dining, island day trips, and a return margin. Schedule-based context only.", url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function FerryRoutePage({ params }: Props) {
  const { routeSlug } = await params;
  const redirectSlug = getFerryRouteRedirect(routeSlug);
  if (redirectSlug) redirect(`/ferry/${redirectSlug}`);
  const route = getFerryRouteGuide(routeSlug);
  if (!route) notFound();

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${route.slug}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: route.plainTitle, url: canonical, description: "Schedule-based ferry planning page. Confirm current operations directly with the ferry provider." },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: route.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];

  return (
    <UtilityPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <UtilityHero
        media={toResponsiveMedia({ src: FERRY_MEDIA.src, alt: `${FERRY_MEDIA.alt} for ${route.label}` })}
        eyebrow="Ferry guide · AST"
        title={route.plainTitle}
        description={`${route.note} Use this as island-day planning context, then confirm today's operation, fare, baggage rules, and boarding requirements directly with the ferry provider.`}
        badge={<TrustBadge label={route.sourceStatus === "source-backed" ? "Schedule-backed" : "Guide-only"} tone="public-info" />}
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <UtilityWidgetShell>
            {route.scheduleSlug ? (
              <NextBoatWidget className="border-0 bg-transparent p-0 shadow-none" routeSlug={route.scheduleSlug} eyebrow="Route next boat" emptyLabel="No upcoming departures found for this route." />
            ) : (
              <VvCard className="border-0 bg-transparent p-2 shadow-none">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">Timetable pending</p>
                <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941]">Guide context first. Confirm the route directly.</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#496871]">
                  VibeVI has not wired source-backed timetable records for this ferry intent yet. Use the related ferry board below for schedule-backed crossings, and confirm service directly before planning around it.
                </p>
              </VvCard>
            )}
          </UtilityWidgetShell>

          <UtilityTrustNote
            title="Ferry planning, not ferry control."
            body="Direction is explicit; reverse service is never assumed identical. Times are in Atlantic Standard Time. Schedule information is not live vessel tracking or a boarding guarantee."
          >
            <UtilityPrimaryButton href={route.boardHref}>Open ferry board</UtilityPrimaryButton>
            <UtilitySecondaryButton href="/map">View island map</UtilitySecondaryButton>
          </UtilityTrustNote>
        </div>

        <UtilitySection eyebrow="Turn the crossing into a day" title={`${route.origin} to ${route.destination}, with the rest of the move connected.`} id="route-use" description={route.islandDayUse} className="mt-14">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {route.relatedLinks.map((link) => (
              <UtilityLinkCard key={link.href} href={link.href} title={link.label} body={link.description} />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Ferry FAQ" title="Plan with clear expectations." id="route-faq" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {route.faq.map((item) => (
              <VvCard key={item.question} className="p-6">
                <h3 className="font-semibold text-[#173941]">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#496871]">{item.answer}</p>
              </VvCard>
            ))}
          </div>
        </UtilitySection>
      </UtilityMain>
    </UtilityPage>
  );
}
