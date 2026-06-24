import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { FERRY_MEDIA } from "@/lib/media";
import {
  getFerryRouteMeta,
  isPublicFerryRouteSlug,
  PUBLIC_FERRY_ROUTES,
} from "@/lib/transit/ferry-routes";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ routeSlug: string }> };

export function generateStaticParams() {
  return PUBLIC_FERRY_ROUTES.map((route) => ({ routeSlug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { routeSlug } = await params;

  if (!isPublicFerryRouteSlug(routeSlug)) {
    return { robots: { index: false, follow: false } };
  }

  const route = getFerryRouteMeta(routeSlug);
  const title = route?.label ?? "Ferry route";

  return {
    title: `Ferry - ${title}`,
    description:
      "Directional ferry schedule context, source verification, and island connections. Schedule-based planning only, not live vessel tracking.",
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}` },
    openGraph: {
      title: `${title} Ferry Schedule | VibeVI`,
      description:
        "Schedule-based ferry planning with route direction, source context, and connection reminders.",
    },
    robots: { index: true, follow: true },
  };
}

export default async function FerryRoutePage({ params }: Props) {
  const { routeSlug } = await params;

  if (!isPublicFerryRouteSlug(routeSlug)) {
    notFound();
  }

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}`;
  const route = getFerryRouteMeta(routeSlug);
  if (!route) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Ferry route: ${route.label}`,
      url: canonical,
      description:
        "Schedule-based ferry route planning page. Confirm current operations directly with the ferry provider.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Is the ${route.label} ferry time live?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. VibeVI uses schedule records and source timestamps. It is not live vessel tracking, a service alert system, or a boarding guarantee.",
          },
        },
        {
          "@type": "Question",
          name: "Should I confirm with the ferry operator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Confirm current schedules, fares, baggage rules, service status, and boarding requirements directly with the ferry operator before travel.",
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <MediaBackdrop
        media={{
          ...FERRY_MEDIA,
          id: routeSlug,
          label: "Directional ferry route",
          alt: `${FERRY_MEDIA.alt} for ${route.label}`,
        }}
        overlay="hero"
        priority
        className="min-h-[58svh]"
      >
        <div className="section-shell flex min-h-[58svh] flex-col justify-end pb-12 pt-32">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow-label">Ferry check · AST</p>
            <span className="rounded-full border border-aqua/25 bg-aqua/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-aqua">
              Schedule-based
            </span>
          </div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">
            {route.label}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68">
            A directional route check for planning the crossing. Use the next
            departure cue as orientation, then confirm today&apos;s operation,
            fare, baggage rules, and boarding requirements directly with the
            ferry provider.
          </p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            <NextBoatWidget
              className="border-0 bg-transparent shadow-none"
              routeSlug={route.slug}
              eyebrow="Route next boat"
              emptyLabel="No upcoming departures found for this route."
            />
          </div>
          <aside className="glass-luminous rounded-[2rem] p-7">
            <p className="eyebrow-label">Trust contract</p>
            <h2 className="display-type mt-4 text-3xl font-semibold text-white">
              Ferry planning, not ferry control.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-white/62">
              <li>Direction is explicit; reverse service is never assumed identical.</li>
              <li>Times are interpreted in Atlantic Standard Time (UTC-04:00).</li>
              <li>Schedule information is not live vessel tracking or a boarding guarantee.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/st-thomas/ferry-schedule"
                className="rounded-full bg-aqua px-5 py-3 text-sm font-semibold text-midnight-950 transition hover:bg-aqua/90"
              >
                Open ferry board
              </Link>
              <Link
                href="/map"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30"
              >
                View island map
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
