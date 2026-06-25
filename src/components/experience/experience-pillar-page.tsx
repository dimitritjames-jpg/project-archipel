import Link from "next/link";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ListingCard } from "@/components/facelift/listing-card";
import { EditorialBand } from "@/components/facelift/editorial-band";
import { FilterChipRail } from "@/components/facelift/filter-chip-rail";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { VvButtonSecondary, VvCard, VvEyebrow, VvHeading, VvPage } from "@/components/facelift/vv-ui";
import {
  BookingIntentPanel,
  ExperienceCTA,
  PlanThisExperienceCard,
} from "@/components/experience/booking-intent";
import { CORE_CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import type { ExperiencePillar } from "@/lib/experience-pillars";
import { CODE_TO_SLUG, ISLAND_MAP } from "@/lib/islands";
import { VIBEVI_EXPERIENCES, VIBEVI_GET_LISTED } from "@/lib/vibevi-media";
import { serializeJsonLd } from "@/lib/utils";

const PAGE_VIEW_EVENTS: Partial<Record<ExperiencePillar["slug"], AnalyticsEventName>> = {
  adventure: "adventure_page_viewed",
  culture: "culture_page_viewed",
  culinary: "culinary_page_viewed",
  "cruise-day": "cruise_day_page_viewed",
};

const BITE_FEATURES = [
  ["Waterfront tables", "Salt air, sunset light, and a plate that makes the ride worth it."],
  ["Local plates", "Johnny cakes, pate, stewed fish, grilled lobster, provisions, bush tea, and comfort with roots."],
  ["Beach bars", "Sand on your feet, rum in the glass, music drifting over the water."],
  ["Date night", "Courtyard dinners, harbor lights, chef-led nights, and one more drink after dessert."],
  ["Brunch", "Late mornings, sea breeze, strong coffee, fruit, fish, eggs, and no rush."],
  ["Late-night bites", "The small plate after the DJ, the slice after the ferry, the thing you remember tomorrow."],
  ["Rum, cocktails & sunset drinks", "Golden-hour pours, waterfront bars, and island spirits without pretending VibeVI books the table."],
  ["Where locals send friends", "A prompt for real recommendations as inventory grows — never fake reviews or invented favorites."],
] as const;

const CULTURE_FEATURES = [
  ["Carnival & festival rhythm", "Color, sound, pageantry, family, food, and the kind of island energy that fills the street."],
  ["Music & nightlife roots", "Steel pan, soca, reggae, dancehall, DJs, live bands, beach bars, and harbor nights."],
  ["Forts, streets & harbor history", "Charlotte Amalie, Christiansted, Frederiksted, Cruz Bay, fort walls, old streets, and sea lanes."],
  ["Local makers & markets", "Art, craft, provisions, galleries, market days, and small stops with a human hand in them."],
  ["Foodways & island traditions", "Pate, johnny cakes, bush tea, fish, rum, family recipes, and food as living memory."],
  ["Art, galleries & creative spaces", "Murals, rooms, courtyards, creative studios, and the visual language of the islands."],
  ["Respectful visitor notes", "Ask, listen, support local, verify event details, and remember that culture is not a prop."],
] as const;

const ADVENTURE_FEATURES = [
  ["Snorkel & reef mornings", "Start early, match ability to conditions, and leave the reef better than you found it."],
  ["Sailing & charters", "Catamarans, private boats, beach-hop routes, sunset sails, and direct-source confirmation."],
  ["Diving & deep water", "Wall dives, reef routes, certification needs, pickup points, and weather-aware planning."],
  ["Kayak, SUP & quiet coves", "Low-engine water days, mangrove edges, protected coves, and slower island movement."],
  ["Hiking & park trails", "Virgin Islands National Park, shaded paths, viewpoints, beach exits, and water stops."],
  ["Cruise-day excursions", "One outdoor move with a conservative return buffer and direct operator confirmation."],
  ["Buck Island & big reef days", "St. Croix reef energy, full-day pacing, and the details to verify before you go."],
  ["Sunset cruises", "Golden water, easy rhythm, and a clean handoff from beach day to dinner."],
] as const;

const DEFAULT_FEATURES = [
  ["Start with the feeling", "Choose the mood before the checklist: water, food, culture, family, slow day, or late night."],
  ["Pick the island", "St. Thomas, St. Croix, St. John, and Water Island solve different kinds of days."],
  ["Make one strong move", "A better island day usually has an anchor: the beach, the boat, the meal, the story, or the music."],
] as const;

function getFeatureGrid(pillar: ExperiencePillar) {
  if (pillar.slug === "culinary") {
    return {
      eyebrow: "Bite guide",
      title: "Eat where the island takes you.",
      intro: "Hungry, waterfront, local, and honest about what still needs direct confirmation.",
      items: BITE_FEATURES,
    };
  }
  if (pillar.slug === "culture") {
    return {
      eyebrow: "Culture guide",
      title: "Go beyond the postcard.",
      intro: "Follow the sound, people, streets, foodways, makers, forts, markets, and night energy that make the Virgin Islands feel alive.",
      items: CULTURE_FEATURES,
    };
  }
  if (pillar.slug === "adventure") {
    return {
      eyebrow: "Outdoor guide",
      title: "Get on the water, into the cove, or up the trail.",
      intro: "Active, salty, and practical: snorkeling, sailing, diving, hiking, kayaking, Buck Island, park trails, and sunset water.",
      items: ADVENTURE_FEATURES,
    };
  }
  return {
    eyebrow: "Island guide",
    title: "Make the day feel like the place.",
    intro: "Choose the feeling, choose the island, then confirm the details directly before you go.",
    items: DEFAULT_FEATURES,
  };
}

function TrustFooterNotice({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <VvCard className="mt-16 border-[#0797a6]/15 bg-[#e9fbf7] p-6 text-sm leading-7 text-[#315057]">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b4b55]">Trust note</p>
      <p className="mt-3">
        VibeVI does not sell bookings, show live availability, invent reviews, or publish fake contact details.
        Demo and public-info protections remain active at profile level. For {pillar.name.toLowerCase()}, confirm
        current hours, prices, safety details, availability, event timing, and booking directly with the source or business.
      </p>
    </VvCard>
  );
}

export function ExperiencePillarPage({
  pillar,
  businesses,
}: {
  pillar: ExperiencePillar;
  businesses: PublishedBusinessRow[];
}) {
  const pageEvent = PAGE_VIEW_EVENTS[pillar.slug];
  const featureGrid = getFeatureGrid(pillar);
  const vibeviExp = VIBEVI_EXPERIENCES[pillar.slug];
  const heroResponsive = vibeviExp ?? {
    desktop: "/media/vibevi/home/home-hero-desktop.webp",
    mobile: "/media/vibevi/home/home-hero-mobile.webp",
    alt: `Editorial ${pillar.name} discovery scene in the U.S. Virgin Islands`,
    objectPosition: "center",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const categoryChips = pillar.relatedCategories
    .map((slug) => {
      const category = getCategoryBySlug(slug);
      if (!category) return null;
      return { label: category.name, href: `/st-thomas/${slug}` };
    })
    .filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      {pageEvent ? <AnalyticsEvent name={pageEvent} properties={{ pillar: pillar.slug }} /> : null}
      <AnalyticsEvent name="experience_pillar_viewed" properties={{ pillar: pillar.slug }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />

      <VvPage>
        <ResponsiveHero media={heroResponsive} priority minHeight="min-h-[min(68vh,640px)]">
          <div className="section-shell flex min-h-[inherit] flex-col justify-end pb-10 pt-24 sm:pb-14">
            <Link href="/" className="w-fit text-xs font-semibold text-white/70 transition hover:text-white">
              ← Back to VibeVI
            </Link>
            <div className="mt-6 max-w-4xl">
              <VvEyebrow className="!text-[#7ee8df]">{pillar.eyebrow}</VvEyebrow>
              <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                {pillar.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {pillar.heroBody}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ExperienceCTA
                  pillar={pillar}
                  placement="hero"
                  className="!bg-white !text-[#0b4b55] hover:!bg-[#fff4d6]"
                />
                <TrackedLink
                  href="/map"
                  eventName="plan_experience_clicked"
                  eventProperties={{ pillar: pillar.slug, placement: "hero_map" }}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/12 px-5 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  See the island map
                </TrackedLink>
              </div>
            </div>
          </div>
        </ResponsiveHero>

        <main className="section-shell py-14 sm:py-20">
          <section aria-labelledby="feature-grid">
            <VvEyebrow>{featureGrid.eyebrow}</VvEyebrow>
            <VvHeading id="feature-grid" className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              {featureGrid.title}
            </VvHeading>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#496871]">{featureGrid.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featureGrid.items.map(([title, body], index) => (
                <VvCard key={title} className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0797a6]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.03em] text-[#173941]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#496871]">{body}</p>
                </VvCard>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.42fr]" aria-labelledby="island-aware">
            <div>
              <VvEyebrow>Island relevance</VvEyebrow>
              <VvHeading id="island-aware" className="mt-3 text-2xl sm:text-3xl">
                Same feeling, different shore.
              </VvHeading>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {pillar.islandRelevance.map((item) => (
                  <Link
                    key={`${pillar.slug}-${item.island}`}
                    href={item.href}
                    className="group rounded-[1.2rem] border border-[#0b4b55]/10 bg-white p-5 shadow-[0_8px_24px_rgba(11,75,85,0.06)] transition hover:-translate-y-0.5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0797a6]">
                      {ISLAND_MAP[item.island].name}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#496871]">{item.angle}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-[#0b4b55]">
                      Open island route <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <PlanThisExperienceCard pillar={pillar} />
          </section>

          <section className="mt-16" aria-labelledby="planning-prompts">
            <VvEyebrow>Before you go</VvEyebrow>
            <VvHeading id="planning-prompts" className="mt-3 max-w-2xl text-2xl sm:text-3xl">
              Ask the questions that make the day smoother.
            </VvHeading>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {pillar.planningPrompts.map((prompt, index) => (
                <VvCard key={prompt} className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0797a6]">
                    0{index + 1}
                  </span>
                  <p className="mt-6 text-sm leading-7 text-[#496871]">{prompt}</p>
                </VvCard>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="related-guides">
            <VvEyebrow>Related categories</VvEyebrow>
            <VvHeading id="related-guides" className="mt-3 text-2xl sm:text-3xl">
              Follow the next island thread.
            </VvHeading>
            {categoryChips.length > 0 ? (
              <FilterChipRail className="mt-4" chips={categoryChips} ariaLabel="Related categories" />
            ) : null}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {pillar.relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-[1.2rem] border border-[#0b4b55]/10 bg-white p-5 shadow-[0_8px_24px_rgba(11,75,85,0.06)] transition hover:-translate-y-0.5"
                >
                  <h3 className="font-semibold text-[#173941] group-hover:text-[#0b4b55]">{guide.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#496871]">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="experience-listings">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <VvEyebrow>Places to start</VvEyebrow>
                <VvHeading id="experience-listings" className="mt-3 text-2xl sm:text-3xl">
                  Browse published profiles for this vibe.
                </VvHeading>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#496871]">
                  Use these as starting points, then confirm details directly before you go.
                </p>
              </div>
              <VvButtonSecondary href={`/search?vibe=${pillar.slug}`}>Search this vibe ↗</VvButtonSecondary>
            </div>
            {businesses.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {businesses.slice(0, 6).map((business) => (
                  <ListingCard
                    key={business.id}
                    business={business}
                    islandSlug={CODE_TO_SLUG[business.island]}
                  />
                ))}
              </div>
            ) : (
              <VvCard className="mt-8 p-8 text-sm text-[#496871]">
                Real inventory for this experience is being assembled. No real businesses are invented to fill the gap.
              </VvCard>
            )}
          </section>

          <section className="mt-16">
            <BookingIntentPanel pillar={pillar} />
          </section>

          <section className="mt-16" aria-labelledby="experience-faq">
            <VvEyebrow>Straight answers</VvEyebrow>
            <VvHeading id="experience-faq" className="mt-3 text-2xl sm:text-3xl">
              Plan with clear expectations.
            </VvHeading>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {pillar.faq.map((item) => (
                <VvCard key={item.question} className="p-6">
                  <h3 className="font-semibold text-[#173941]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#496871]">{item.answer}</p>
                </VvCard>
              ))}
            </div>
          </section>

          <TrustFooterNotice pillar={pillar} />

          <EditorialBand
            media={VIBEVI_GET_LISTED.hero}
            title="Local operators belong on the board."
            body="Captains, chefs, bartenders, makers, and wellness providers can register interest in a VibeVI listing."
            ctaLabel="Get listed"
            ctaHref="/get-listed"
          />

          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Continue experience discovery">
            {CORE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/st-thomas/${category.slug}`}
                className="rounded-full border border-[#0b4b55]/12 bg-white px-4 py-2 text-sm text-[#496871] transition hover:border-[#0797a6]/30 hover:bg-[#e9fbf7]"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </main>
      </VvPage>
    </>
  );
}
