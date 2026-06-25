import {
  UtilityHighlightChips,
  UtilityHero,
  UtilityInfoCard,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySecondaryButton,
  UtilitySection,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
import { getGuideMediaAsset } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

type PillarLink = { href: string; label: string; detail: string; accent?: "aqua" | "coral" | "gold" };

type PillarPageProps = {
  eyebrow: string;
  title: string;
  island: string;
  introduction: string;
  planningNote: string;
  highlights: string[];
  links: PillarLink[];
  gradient: string;
  decisions?: { title: string; body: string }[];
  faq?: { question: string; answer: string }[];
};

export function PillarPage({
  gradient,
  eyebrow,
  title,
  island,
  introduction,
  planningNote,
  highlights,
  links,
  decisions = [],
  faq = [],
}: PillarPageProps) {
  void gradient;
  const heroMedia = getGuideMediaAsset(`${title} ${eyebrow} ${island}`, eyebrow);
  const responsive = toResponsiveMedia({
    src: heroMedia.src,
    alt: heroMedia.alt,
  });

  return (
    <UtilityPage>
      {faq.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      ) : null}

      <UtilityHero
        media={responsive}
        eyebrow={`${eyebrow} · ${island}`}
        title={title}
        description={introduction}
        minHeight="min-h-[min(62vh,560px)]"
      />

      <UtilityMain>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <VvCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
              Field notes
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[#173941] sm:text-3xl">
              Build the day around the place.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#496871]">{planningNote}</p>
            <UtilityHighlightChips items={highlights} />
          </VvCard>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
              Continue exploring
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-[#173941] sm:text-3xl">
              Useful next moves, not a dead end.
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {links.map((link, index) => (
                <UtilityLinkCard
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  body={link.detail}
                  cta={`0${index + 1} · Open`}
                />
              ))}
            </div>
          </div>
        </div>

        {decisions.length > 0 ? (
          <UtilitySection
            eyebrow="Make the call"
            title="What changes the shape of this day."
            id="pillar-decisions"
            className="mt-14"
          >
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {decisions.map((item, index) => (
                <UtilityInfoCard
                  key={item.title}
                  step={`0${index + 1}`}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </UtilitySection>
        ) : null}

        {faq.length > 0 ? (
          <UtilitySection
            eyebrow="Before you go"
            title="Useful answers, honest limits."
            id="pillar-faq"
            className="mt-14"
          >
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {faq.map((item) => (
                <VvCard key={item.question} className="p-6">
                  <h3 className="font-semibold text-[#173941]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#496871]">{item.answer}</p>
                </VvCard>
              ))}
            </div>
          </UtilitySection>
        ) : null}

        <nav className="mt-12 flex flex-wrap gap-2 border-t border-[#0b4b55]/10 pt-8" aria-label="Continue discovery">
          <UtilitySecondaryButton href="/search">Search businesses</UtilitySecondaryButton>
          <UtilitySecondaryButton href="/map">Open the map</UtilitySecondaryButton>
          <UtilityPrimaryButton href="/get-listed" tone="coral">
            Get listed on VibeVI
          </UtilityPrimaryButton>
        </nav>
      </UtilityMain>
    </UtilityPage>
  );
}
