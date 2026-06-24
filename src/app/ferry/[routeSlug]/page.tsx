import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
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
    return {
      alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/ferry/${redirectSlug}` },
      robots: { index: false, follow: true },
    };
  }

  const route = getFerryRouteGuide(routeSlug);

  if (!route) {
    return { robots: { index: false, follow: false } };
  }

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${route.slug}`;

  return {
    title: `${route.plainTitle} | VibeVI`,
    description: `${route.note} Schedule-based ferry planning only. Confirm current operation, fares, and boarding requirements directly with the ferry provider.`,
    alternates: { canonical },
    openGraph: {
      title: `${route.plainTitle} | VibeVI`,
      description:
        "Plan the ferry around beaches, charters, dining, island day trips, and a return margin. Schedule-based context only.",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${route.plainTitle} | VibeVI`,
      description:
        "Schedule-based ferry planning with island-day links and direct-confirmation reminders.",
    },
    robots: { index: true, follow: true },
  };
}

export default async function FerryRoutePage({ params }: Props) {
  const { routeSlug } = await params;
  const redirectSlug = getFerryRouteRedirect(routeSlug);

  if (redirectSlug) {
    redirect(`/ferry/${redirectSlug}`);
  }

  const route = getFerryRouteGuide(routeSlug);
  if (!route) notFound();

  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${route.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: route.plainTitle,
      url: canonical,
      description:
        "Schedule-based ferry planning page. Confirm current operations directly with the ferry provider.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: route.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
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
          id: route.slug,
          label: "Directional ferry route",
          alt: `${FERRY_MEDIA.alt} for ${route.label}`,
        }}
        overlay="hero"
        priority
        className="min-h-[60svh]"
      >
        <div className="section-shell flex min-h-[60svh] flex-col justify-end pb-12 pt-32">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow-label">Ferry guide · AST</p>
            <span className="rounded-full border border-aqua/25 bg-aqua/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-aqua">
              {route.sourceStatus === "source-backed" ? "Schedule-backed" : "Guide-only"}
            </span>
          </div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl">
            {route.plainTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/70">
            {route.note} Use this as island-day planning context, then confirm
            today&apos;s operation, fare, baggage rules, and boarding requirements
            directly with the ferry provider.
          </p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            {route.scheduleSlug ? (
              <NextBoatWidget
                className="border-0 bg-transparent shadow-none"
                routeSlug={route.scheduleSlug}
                eyebrow="Route next boat"
                emptyLabel="No upcoming departures found for this route."
              />
            ) : (
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-7">
                <p className="eyebrow-label text-sand">Timetable pending</p>
                <h2 className="display-type mt-4 text-3xl font-semibold text-white">
                  Guide context first. Confirm the route directly.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  VibeVI has not wired source-backed timetable records for this
                  ferry intent yet. Use the related ferry board below for
                  schedule-backed crossings, and confirm downtown St. Thomas to
                  Cruz Bay service directly before planning around it.
                </p>
              </div>
            )}
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
              <li>Confirm current operation, fares, rules, and boarding details directly.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={route.boardHref}
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

        <section className="mt-14 border-t border-white/8 pt-12" aria-labelledby="route-use">
          <p className="eyebrow-label">Turn the crossing into a day</p>
          <h2 id="route-use" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            {route.origin} to {route.destination}, with the rest of the move connected.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">
            {route.islandDayUse}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {route.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-aqua/30"
              >
                <h3 className="font-semibold text-white group-hover:text-aqua">
                  {link.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/52">
                  {link.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-aqua/85">
                  Open <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-white/8 pt-12" aria-labelledby="route-faq">
          <p className="eyebrow-label">Ferry FAQ</p>
          <h2 id="route-faq" className="display-type mt-4 text-3xl font-semibold text-white">
            Plan with clear expectations.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {route.faq.map((item) => (
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
