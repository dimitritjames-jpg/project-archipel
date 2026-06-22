import Link from "next/link";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import {
  BookingComingSoonBadge,
  BookingIntentPanel,
  ExperienceCTA,
  PlanThisExperienceCard,
} from "@/components/experience/booking-intent";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { CORE_CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import type { ExperiencePillar } from "@/lib/experience-pillars";
import { CODE_TO_SLUG, ISLAND_MAP } from "@/lib/islands";
import { serializeJsonLd } from "@/lib/utils";

const PAGE_VIEW_EVENTS: Partial<Record<ExperiencePillar["slug"], AnalyticsEventName>> = {
  adventure: "adventure_page_viewed",
  culture: "culture_page_viewed",
  culinary: "culinary_page_viewed",
  "cruise-day": "cruise_day_page_viewed",
};

export function ExperiencePillarPage({
  pillar,
  businesses,
}: {
  pillar: ExperiencePillar;
  businesses: PublishedBusinessRow[];
}) {
  const pageEvent = PAGE_VIEW_EVENTS[pillar.slug];
  const demoCount = businesses.filter((business) => business.is_demo).length;
  const verifiedCount = businesses.filter(
    (business) => business.verification_status === "verified" && business.is_verified,
  ).length;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {pageEvent ? <AnalyticsEvent name={pageEvent} properties={{ pillar: pillar.slug }} /> : null}
      <AnalyticsEvent name="experience_pillar_viewed" properties={{ pillar: pillar.slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      <MediaBackdrop
        media={{
          id: `experience-${pillar.slug}`,
          label: pillar.name,
          gradient: pillar.gradient,
          src: null,
          alt: `Abstract VibeVI experience backdrop for ${pillar.name}`,
        }}
        overlay="hero"
        priority
        className="min-h-[min(74vh,760px)]"
      >
        <div className="section-shell flex min-h-[min(74vh,760px)] flex-col justify-end pb-12 pt-28 sm:pb-16">
          <Link href="/" className="w-fit text-xs font-semibold text-white/45 transition hover:text-aqua">
            ← Back to VibeVI
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow-label">{pillar.eyebrow}</p>
                <BookingComingSoonBadge />
              </div>
              <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">
                {pillar.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                {pillar.heroBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ExperienceCTA pillar={pillar} placement="hero" />
                <TrackedLink
                  href="/map"
                  eventName="plan_experience_clicked"
                  eventProperties={{ pillar: pillar.slug, placement: "hero_map" }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/6 px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-aqua/35 hover:bg-white/10"
                >
                  Open the island map
                </TrackedLink>
              </div>
            </div>
            <div className="command-surface rounded-[1.4rem] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-aqua/55">
                Experience status
              </p>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-white/45">Booking readiness</dt>
                  <dd className="text-right text-sm font-semibold text-white">{pillar.bookingReadinessLevel.replaceAll("-", " ")}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-white/45">Verified listings</dt>
                  <dd className="font-mono text-sm text-aqua">{verifiedCount}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-white/45">Demo profiles</dt>
                  <dd className="font-mono text-sm text-coral-sunset">{demoCount}</dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-5 text-white/38">
                Demo content remains labeled and noindex at profile level. Verified contact and schema gates still apply.
              </p>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.45fr]" aria-labelledby="island-aware">
          <div>
            <p className="eyebrow-label">Island-aware discovery</p>
            <h2 id="island-aware" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              Same vibe, different island math.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillar.islandRelevance.map((item) => (
                <Link
                  key={`${pillar.slug}-${item.island}`}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-white/9 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-aqua/25"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-aqua/55">
                    {ISLAND_MAP[item.island].name}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-white/56">{item.angle}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-aqua opacity-80">
                    Open route <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <PlanThisExperienceCard pillar={pillar} />
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="planning-prompts">
          <p className="eyebrow-label">Planning calculus</p>
          <h2 id="planning-prompts" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white">
            Ask better questions before you contact anyone.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pillar.planningPrompts.map((prompt, index) => (
              <article key={prompt} className="command-surface rounded-[1.3rem] p-6">
                <span className="font-mono text-[10px] text-aqua/60">0{index + 1}</span>
                <p className="mt-8 text-sm leading-7 text-white/60">{prompt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="related-guides">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow-label">Guides and categories</p>
              <h2 id="related-guides" className="display-type mt-4 text-3xl font-semibold text-white">
                Jump into useful next layers.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {pillar.relatedCategories.map((categorySlug) => {
                  const category = getCategoryBySlug(categorySlug);
                  if (!category) return null;

                  return (
                    <Link
                      key={categorySlug}
                      href={`/st-thomas/${categorySlug}`}
                      className="rounded-full border border-aqua/18 bg-aqua/7 px-3 py-1.5 text-xs font-semibold text-aqua"
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {pillar.relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-aqua/30"
                >
                  <h3 className="font-semibold text-white group-hover:text-aqua">{guide.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/50">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="experience-listings">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow-label">Directory bridge</p>
              <h2 id="experience-listings" className="display-type mt-4 text-3xl font-semibold text-white">
                Published profiles connected to this experience.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                The launch set may include fictional demo profiles. Real profiles will show verified status only after source checks.
              </p>
            </div>
            <Link
              href={`/search?vibe=${pillar.slug}`}
              className="w-fit rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-sm font-semibold text-aqua"
            >
              Search this vibe ↗
            </Link>
          </div>
          {businesses.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.slice(0, 6).map((business) => (
                <BusinessPreviewCard
                  key={business.id}
                  business={business}
                  islandSlug={CODE_TO_SLUG[business.island]}
                  launchPreview
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.4rem] border border-white/9 bg-white/[0.03] p-8 text-sm text-white/52">
              Verified inventory for this experience is being assembled. No real businesses are invented to fill the gap.
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-white/8 pt-14">
          <BookingIntentPanel pillar={pillar} />
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="experience-faq">
          <p className="eyebrow-label">Straight answers</p>
          <h2 id="experience-faq" className="display-type mt-4 text-3xl font-semibold text-white">
            Plan with clear expectations.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {pillar.faq.map((item) => (
              <article key={item.question} className="glass-luminous rounded-[1.3rem] p-6">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/56">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <nav className="mt-16 flex flex-wrap gap-2 border-t border-white/8 pt-8" aria-label="Continue experience discovery">
          {CORE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/st-thomas/${category.slug}`}
              className="rounded-full border border-white/9 bg-white/[0.03] px-4 py-2 text-sm text-white/58 transition hover:border-aqua/25 hover:text-aqua"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
