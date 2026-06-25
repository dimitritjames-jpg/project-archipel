import {
  UtilityHero,
  UtilityInfoCard,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySecondaryButton,
  UtilitySection,
  UtilityTrustNote,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
import { CRUISE_DAY_MEDIA } from "@/lib/media";
import type { CruisePortGuide } from "@/lib/transit/cruise-port-guides";
import { serializeJsonLd } from "@/lib/utils";

export function CruisePortGuidePage({ guide }: { guide: CruisePortGuide }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <UtilityPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <UtilityHero
        media={toResponsiveMedia({
          src: CRUISE_DAY_MEDIA.src,
          alt: `${CRUISE_DAY_MEDIA.alt} for ${guide.portName} cruise-day planning`,
        })}
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.introduction}
        minHeight="min-h-[min(58vh,520px)]"
      />

      <UtilityMain>
        <section className="grid gap-4 lg:grid-cols-3" aria-label={`${guide.portName} cruise-day essentials`}>
          {guide.essentials.map((item) => (
            <UtilityInfoCard key={item.title} title={item.title} body={item.body} />
          ))}
        </section>

        <UtilitySection
          eyebrow="Port-day moves"
          title="Choose one strong move, then protect the return."
          id="port-moves"
          className="mt-14"
        >
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guide.moves.map((move) => (
              <UtilityLinkCard
                key={move.href}
                href={move.href}
                title={move.label}
                body={move.description}
                accent="coral"
              />
            ))}
          </div>
        </UtilitySection>

        <div className="mt-14">
          <UtilityTrustNote
            title="VibeVI helps plan the day. It does not control the clock."
            body="Confirm ship timing, pickup point, route, prices, hours, safety details, booking, and return transport directly with the cruise line, provider, or business. Scheduled capacity is a planning estimate, not observed passenger count or live crowd data."
          >
            <UtilityPrimaryButton href="/cruise-day" tone="coral">
              Open cruise-day hub
            </UtilityPrimaryButton>
            <UtilitySecondaryButton href="/st-thomas/cruise-schedule">
              St. Thomas cruise schedule
            </UtilitySecondaryButton>
            <UtilitySecondaryButton href="/map">View island map</UtilitySecondaryButton>
          </UtilityTrustNote>
        </div>

        <UtilitySection eyebrow="FAQ" title="Plan with the right expectations." id="port-faq" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {guide.faq.map((item) => (
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
