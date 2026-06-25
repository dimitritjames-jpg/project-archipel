import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import {
  UtilityChipLink,
  UtilityHero,
  UtilityInfoCard,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySection,
  UtilityWidgetShell,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { CRUISE_DAY_MEDIA } from "@/lib/media";
import type { PortLoadDailyRow } from "@/lib/transit/supabase-ports";

type Props = { params: Promise<{ island: string }> };

const CRUISE_ISLAND_CODES: Partial<Record<IslandSlug, PortLoadDailyRow["island"]>> = {
  "st-thomas": "STT",
  "st-croix": "STX",
};

const BAND_LEGEND = [
  { label: "Quiet", detail: "Under 5,000 scheduled capacity", color: "bg-[#0797a6]" },
  { label: "Elevated", detail: "5,000–9,999 scheduled capacity", color: "bg-amber-500" },
  { label: "Busy", detail: "10,000–14,999 scheduled capacity", color: "bg-orange-500" },
  { label: "High-impact", detail: "15,000+ scheduled capacity", color: "bg-[#ff7968]" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug)) return { robots: { index: false, follow: false } };
  const name = getIslandName(slug as IslandSlug);
  return {
    title: slug === "st-thomas" ? "St. Thomas Cruise Schedule & Port Planning | VibeVI" : "St. Croix Cruise Schedule & Port Planning | VibeVI",
    description: `Review scheduled cruise arrivals and capacity context for ${name} ports — planning estimates, not actual passenger counts or live crowd data.`,
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${slug}/cruise-schedule` },
    openGraph: { title: `${name} Cruise Schedule & Port Load | VibeVI`, description: `Scheduled ship and capacity context for planning a ${name} port day.` },
    robots: { index: true, follow: true },
  };
}

export default async function IslandCruiseSchedulePage({ params }: Props) {
  const { island: slug } = await params;
  if (!getIslandBySlug(slug) || !["st-thomas", "st-croix"].includes(slug)) notFound();

  const islandSlug = slug as IslandSlug;
  const islandCode = CRUISE_ISLAND_CODES[islandSlug];
  if (!islandCode) notFound();
  const name = getIslandName(islandSlug);

  return (
    <UtilityPage>
      <AnalyticsEvent name="cruise_page_viewed" properties={{ island: slug }} />

      <UtilityHero
        media={toResponsiveMedia({ src: CRUISE_DAY_MEDIA.src, alt: `${name} cruise days` })}
        eyebrow="Cruise days · Scheduled capacity"
        title={`Cruise day flow — ${name}`}
        description="Read the shape of a port day using scheduled ship capacity. This is a planning estimate — not observed foot traffic or an actual passenger count."
        minHeight="min-h-[min(50vh,460px)]"
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <UtilityWidgetShell>
            <CrowdPredictor className="border-0 bg-transparent p-0 shadow-none" islandCode={islandCode} scopeLabel={`${name} port load`} />
          </UtilityWidgetShell>

          <VvCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7968]">Read the bands</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941]">A planning cue for pacing the island.</h2>
            <div className="mt-6 space-y-3">
              {BAND_LEGEND.map((band) => (
                <div key={band.label} className="flex items-center gap-4 rounded-xl border border-[#0b4b55]/10 bg-[#fffaf3] p-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${band.color}`} />
                  <span>
                    <strong className="block text-sm text-[#173941]">{band.label}</strong>
                    <span className="text-xs text-[#496871]">{band.detail}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#496871]">
              Unknown ship capacity lowers data coverage. Imported schedules should always retain their source and verification timestamp.
            </p>
            <div className="mt-7">
              <UtilityChipLink href={`/${slug}`}>Return to {name}</UtilityChipLink>
            </div>
          </VvCard>
        </div>

        <UtilitySection eyebrow="Use the context well" title="Capacity context is not a crowd counter." id="cruise-context" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <UtilityInfoCard title="Scheduled, not observed" body="The model uses known scheduled ship capacity. It does not measure actual disembarkation, street traffic, or business demand." />
            <UtilityInfoCard title="Coverage can be partial" body="Unknown ship capacities reduce confidence. Source and verification timestamps matter as much as the headline band." />
            <UtilityInfoCard title="Plan backward" body="For a cruise day, use authoritative ship timing and a conservative return margin before choosing transport, a beach, or an excursion." />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {slug === "st-thomas" ? <UtilityChipLink href="/st-thomas/cruise-day">Plan a St. Thomas cruise day</UtilityChipLink> : null}
            <UtilityPrimaryButton href="/cruise-day" tone="coral">Open cruise-day hub</UtilityPrimaryButton>
            <UtilityChipLink href={`/${slug}/excursions-charters`}>Browse excursions</UtilityChipLink>
            <UtilityChipLink href="/map">Open the map</UtilityChipLink>
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Make the port day useful" title="Turn scheduled context into one realistic island move." id="cruise-day-links" className="mt-14">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: slug === "st-thomas" ? "/st-thomas/magens-bay" : "/st-croix/buck-island", label: slug === "st-thomas" ? "Beach option" : "Big water option", body: slug === "st-thomas" ? "Check whether Magens Bay fits the port clock, transport, and return margin." : "Buck Island is a bigger commitment; confirm authorization, timing, and return details directly." },
              { href: `/${slug}/indulgent-dining`, label: "Food route", body: "Browse published dining profiles and confirm hours, location, and timing directly." },
              { href: "/experiences/culture", label: "Culture stop", body: "Use history, town walks, makers, and local context as a port-safe alternative to a rushed tour." },
              { href: `/${slug}/local-provisions`, label: "Shopping and provisions", body: "Find useful published stops without assuming live inventory or official cruise partnerships." },
            ].map((item) => (
              <UtilityLinkCard key={item.label} href={item.href} title={item.label} body={item.body} accent="coral" />
            ))}
          </div>
        </UtilitySection>
      </UtilityMain>
    </UtilityPage>
  );
}
