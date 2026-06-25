import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import {
  UtilityChipLink,
  UtilityHero,
  UtilityInfoCard,
  UtilityLinkCard,
  UtilityMain,
  UtilityPage,
  UtilityPrimaryButton,
  UtilitySection,
  toResponsiveMedia,
} from "@/components/facelift/utility-page-shell";
import { VvCard } from "@/components/facelift/vv-ui";
import { env } from "@/lib/env";
import type { LaunchGuide } from "@/lib/guides";
import { getGuideMediaAsset } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

export function SeoGuidePage({ guide }: { guide: LaunchGuide }) {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}${guide.path}`;
  const islandSegment = guide.path.split("/")[1];
  const islandHub = ["st-thomas", "st-croix", "st-john", "water-island"].includes(islandSegment)
    ? `/${islandSegment}`
    : null;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: "VibeVI" },
      publisher: { "@type": "Organization", name: "VibeVI" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
  const guideMedia = getGuideMediaAsset(`${guide.path} ${guide.title}`, guide.eyebrow);

  return (
    <UtilityPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <UtilityHero
        media={toResponsiveMedia({ src: guideMedia.src, alt: guideMedia.alt })}
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.introduction}
        badge={<ComingSoonBadge label="Launch guide" />}
        minHeight="min-h-[min(62vh,560px)]"
      />

      <UtilityMain>
        <UtilitySection eyebrow="Build the move" title="Useful context before you set out." id="guide-essentials">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {guide.essentials.map((item, index) => (
              <UtilityInfoCard
                key={item.title}
                step={`0${index + 1}`}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection
          eyebrow="Keep moving"
          title="Open the next useful layer."
          id="guide-links"
          description="Every guide connects to a directory, island hub, or schedule utility. No dead-end brochure pages."
          className="mt-14"
        >
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {guide.related.map((link) => (
              <UtilityLinkCard
                key={link.href}
                href={link.href}
                title={link.label}
                body={link.description}
              />
            ))}
          </div>
        </UtilitySection>

        <UtilitySection eyebrow="Straight answers" title="Plan with the right expectations." id="guide-faq" className="mt-14">
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {guide.faq.map((item) => (
              <VvCard key={item.question} className="p-6">
                <h3 className="font-semibold text-[#173941]">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#496871]">{item.answer}</p>
              </VvCard>
            ))}
          </div>
        </UtilitySection>

        <nav className="mt-12 flex flex-wrap gap-2 border-t border-[#0b4b55]/10 pt-8" aria-label="Continue VibeVI discovery">
          {islandHub ? <UtilityChipLink href={islandHub}>Open the island hub</UtilityChipLink> : null}
          <UtilityChipLink href="/search">Search businesses</UtilityChipLink>
          <UtilityChipLink href="/map">Open the map</UtilityChipLink>
          <UtilityPrimaryButton href="/get-listed" tone="coral">
            Get listed on VibeVI
          </UtilityPrimaryButton>
        </nav>
      </UtilityMain>
    </UtilityPage>
  );
}
