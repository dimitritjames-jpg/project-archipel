import type { Metadata } from "next";
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
    <UtilityPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <UtilityHero
        media={toResponsiveMedia({ src: CRUISE_DAY_MEDIA.src, alt: CRUISE_DAY_MEDIA.alt })}
        eyebrow="Cruise day · scheduled capacity"
        title="USVI cruise day guide"
        description="Build the shore day backward from all-aboard: port, pickup point, travel time, beach window, food stop, cultural route, shopping loop, and the return buffer. Scheduled capacity is planning context, not a live crowd count."
        actions={
          <>
            <UtilityPrimaryButton href="/st-thomas/cruise-day" tone="coral">
              St. Thomas cruise-day moves
            </UtilityPrimaryButton>
            <UtilityChipLink href="/st-thomas/cruise-schedule">St. Thomas cruise schedule</UtilityChipLink>
          </>
        }
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <UtilityWidgetShell>
            <CrowdPredictor
              className="border-0 bg-transparent p-0 shadow-none"
              islandCode="STT"
              scopeLabel="St. Thomas port load"
            />
          </UtilityWidgetShell>

          <VvCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7968]">
              Port-safe planning
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941] sm:text-3xl">
              One strong move beats six rushed ones.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#496871]">
              Use scheduled port context to choose a realistic route: a beach, a town walk, one tour, a lunch stop, local shopping, or a short culture route. Confirm pickup and return timing directly before committing the day.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#496871]">
              VibeVI does not claim live port crowds, observed passenger totals, booking availability, or control over return timing.
            </p>
          </VvCard>
        </div>

        <UtilitySection eyebrow="St. Thomas port guides" title="Havensight and Crown Bay start different days." id="port-guides" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <UtilityLinkCard href="/st-thomas/havensight-cruise-day" title="Havensight cruise-day guide" body="Plan walkable shopping, nearby culture stops, Charlotte Amalie routes, tours, beach decisions, and a return buffer." accent="coral" />
            <UtilityLinkCard href="/st-thomas/crown-bay-cruise-day" title="Crown Bay cruise-day guide" body="Plan pickup points, Water Island caution, beach routes, town movement, food, and conservative ship-return timing." accent="coral" />
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Choose the one-day move" title="Beach, food, culture, shopping, or water." id="cruise-moves" className="mt-14">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { href: "/st-thomas/magens-bay", label: "Beach", body: "Magens Bay and other beach options need transport and return margin." },
              { href: "/st-thomas/indulgent-dining", label: "Food", body: "Fit lunch or dinner near the port clock, then confirm hours directly." },
              { href: "/experiences/culture", label: "Culture", body: "Forts, history, makers, and town walks can work well on port days." },
              { href: "/st-thomas/local-provisions", label: "Shopping", body: "Use published profiles as starting points, not live inventory." },
              { href: "/st-thomas/excursions-charters", label: "Tours", body: "Confirm pickup point, duration, and return transport directly." },
            ].map((link) => (
              <UtilityLinkCard key={link.href} href={link.href} title={link.label} body={link.body} />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Cruise-day trust rules" title="Useful planning, no fake certainty." id="cruise-trust" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <UtilityInfoCard title="Scheduled capacity only" body="Capacity is a planning estimate from scheduled ship data when known, not actual people ashore." />
            <UtilityInfoCard title="Return buffer first" body="Confirm all-aboard time, pickup point, duration, and return transport directly." />
            <UtilityInfoCard title="Direct source wins" body="Hours, prices, safety details, availability, and booking stay with the cruise line, operator, or business." />
          </div>
        </UtilitySection>
      </UtilityMain>
    </UtilityPage>
  );
}
