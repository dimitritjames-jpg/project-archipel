import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { absoluteUrl } from "@/lib/site-url";
import { CRUISE_DAY_MEDIA } from "@/lib/media";
import type { PortLoadDailyRow } from "@/lib/transit/supabase-ports";

type Props = { params: Promise<{ island: string }> };

const CRUISE_ISLAND_CODES: Partial<Record<IslandSlug, PortLoadDailyRow["island"]>> = {
  "st-thomas": "STT",
  "st-croix": "STX",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug)) return { robots: { index: false, follow: false } };

  const name = getIslandName(slug as IslandSlug);

  return {
    title:
      slug === "st-thomas"
        ? "St. Thomas Cruise Schedule & Port Planning | VibeVI"
        : "St. Croix Cruise Schedule & Port Planning | VibeVI",
    description: `Review scheduled cruise arrivals and capacity context for ${name} ports — planning estimates, not actual passenger counts or live crowd data.`,
    alternates: {
      canonical: absoluteUrl(`/${slug}/cruise-schedule`),
    },
    openGraph: {
      title: `${name} Cruise Schedule & Port Load | VibeVI`,
      description: `Scheduled ship and capacity context for planning a ${name} port day.`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function IslandCruiseSchedulePage({ params }: Props) {
  const { island: slug } = await params;

  if (!getIslandBySlug(slug) || !["st-thomas", "st-croix"].includes(slug)) {
    notFound();
  }

  const islandSlug = slug as IslandSlug;
  const islandCode = CRUISE_ISLAND_CODES[islandSlug];
  if (!islandCode) notFound();

  const name = getIslandName(islandSlug);

  return (
    <>
      <AnalyticsEvent name="cruise_page_viewed" properties={{ island: slug }} />
      <MediaBackdrop
        media={{
          ...CRUISE_DAY_MEDIA,
          id: "cruise-days",
          label: `${name} cruise days`,
        }}
        overlay="hero"
        priority
        className="min-h-[54svh]"
      >
        <div className="section-shell flex min-h-[54svh] flex-col justify-end pb-12 pt-32">
          <p className="eyebrow-label text-coral">
            Cruise days · Scheduled capacity
          </p>
          <h1 className="display-type mt-5 text-5xl font-semibold text-white sm:text-7xl">
            Cruise day flow — {name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
            Read the shape of a port day using scheduled ship capacity. This is
            a planning estimate - not observed foot traffic or an actual
            passenger count.
          </p>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-luminous rounded-[2rem] p-2 sm:p-4">
            <CrowdPredictor
              className="border-0 bg-transparent shadow-none"
              islandCode={islandCode}
              scopeLabel={`${name} port load`}
            />
          </div>
          <section className="command-surface rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow-label">Read the bands</p>
            <h2 className="display-type mt-4 text-3xl font-semibold text-white">
              A planning cue for pacing the island.
            </h2>
            <div className="mt-7 space-y-3">
              {[
                ["Quiet", "Under 5,000 scheduled capacity"],
                ["Elevated", "5,000-9,999 scheduled capacity"],
                ["Busy", "10,000-14,999 scheduled capacity"],
                ["High-impact", "15,000+ scheduled capacity"],
              ].map(([label, detail], index) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === 0
                        ? "bg-aqua"
                        : index === 1
                          ? "bg-gold"
                          : index === 2
                            ? "bg-orange-400"
                            : "bg-coral"
                    }`}
                  />
                  <span>
                    <strong className="block text-sm text-white">{label}</strong>
                    <span className="text-xs text-white/45">{detail}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-white/46">
              Unknown ship capacity lowers data coverage. Imported schedules
              should always retain their source and verification timestamp.
            </p>
            <Link
              href={`/${slug}`}
              className="mt-7 inline-flex text-sm font-semibold text-aqua hover:text-white"
            >
              Return to {name} <span aria-hidden className="ml-2">→</span>
            </Link>
          </section>
        </div>

        <section className="mt-14 border-t border-white/8 pt-12">
          <p className="eyebrow-label">Use the context well</p>
          <h2 className="display-type mt-4 text-3xl font-semibold text-white">
            Capacity context is not a crowd counter.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Scheduled, not observed",
                body: "The model uses known scheduled ship capacity. It does not measure actual disembarkation, street traffic, or business demand.",
              },
              {
                title: "Coverage can be partial",
                body: "Unknown ship capacities reduce confidence. Source and verification timestamps matter as much as the headline band.",
              },
              {
                title: "Plan backward",
                body: "For a cruise day, use authoritative ship timing and a conservative return margin before choosing transport, a beach, or an excursion.",
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
            {slug === "st-thomas" ? (
              <Link
                href="/st-thomas/cruise-day"
                className="rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua"
              >
                Plan a St. Thomas cruise day
              </Link>
            ) : null}
            <Link
              href="/cruise-day"
              className="rounded-full border border-coral/20 bg-coral/7 px-4 py-2 text-sm font-semibold text-coral"
            >
              Open cruise-day hub
            </Link>
            <Link
              href={`/${slug}/excursions-charters`}
              className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62"
            >
              Browse excursions
            </Link>
            <Link
              href="/map"
              className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/62"
            >
              Open the map
            </Link>
          </div>
        </section>

        <section className="mt-14 border-t border-white/8 pt-12" aria-labelledby="cruise-day-links">
          <p className="eyebrow-label">Make the port day useful</p>
          <h2
            id="cruise-day-links"
            className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white"
          >
            Turn scheduled context into one realistic island move.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: slug === "st-thomas" ? "/st-thomas/magens-bay" : "/st-croix/buck-island",
                label: slug === "st-thomas" ? "Beach option" : "Big water option",
                body: slug === "st-thomas"
                  ? "Check whether Magens Bay fits the port clock, transport, and return margin."
                  : "Buck Island is a bigger commitment; confirm authorization, timing, and return details directly.",
              },
              {
                href: `/${slug}/indulgent-dining`,
                label: "Food route",
                body: "Browse published dining profiles and confirm hours, location, and timing directly.",
              },
              {
                href: "/experiences/culture",
                label: "Culture stop",
                body: "Use history, town walks, makers, and local context as a port-safe alternative to a rushed tour.",
              },
              {
                href: `/${slug}/local-provisions`,
                label: "Shopping and provisions",
                body: "Find useful published stops without assuming live inventory or official cruise partnerships.",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="command-surface rounded-[1.25rem] p-5 transition hover:-translate-y-1 hover:border-coral/25"
              >
                <h3 className="font-semibold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
