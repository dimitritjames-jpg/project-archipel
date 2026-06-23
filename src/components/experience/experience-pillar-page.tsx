import Link from "next/link";
import { AnalyticsEvent } from "@/components/analytics/analytics-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import {
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
      intro: "This is the food-magazine layer of VibeVI: hungry, waterfront, local, and honest about what still needs direct confirmation.",
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
      intro: "Adventure on VibeVI should feel active, salty, and practical: snorkeling, sailing, diving, hiking, kayaking, Buck Island, park trails, and sunset water.",
      items: ADVENTURE_FEATURES,
    };
  }

  return {
    eyebrow: "Island guide",
    title: "Make the day feel like the place.",
    intro: "A simple route into the experience: choose the feeling, choose the island, then confirm the details directly before you go.",
    items: DEFAULT_FEATURES,
  };
}

function TrustFooterNotice({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <aside className="mt-20 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/54">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sand/70">Trust note</p>
      <p className="mt-3">
        VibeVI does not sell bookings, show live availability, invent reviews, or publish fake contact details.
        Demo and public-info protections remain active at profile level. For {pillar.name.toLowerCase()}, confirm
        current hours, prices, safety details, availability, event timing, and booking directly with the source or business.
      </p>
    </aside>
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
        className="min-h-[min(76vh,780px)]"
      >
        <div className="hero-sun-orb !left-auto !right-[8%] !top-[10%] !opacity-40" aria-hidden />
        <div className="section-shell flex min-h-[min(76vh,780px)] flex-col justify-end pb-12 pt-28 sm:pb-16">
          <Link href="/" className="w-fit text-xs font-semibold text-white/48 transition hover:text-sand">
            ← Back to VibeVI
          </Link>
          <div className="mt-8 max-w-5xl">
            <p className="eyebrow-label">{pillar.eyebrow}</p>
            <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">
              {pillar.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              {pillar.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExperienceCTA pillar={pillar} placement="hero" />
              <TrackedLink
                href="/map"
                eventName="plan_experience_clicked"
                eventProperties={{ pillar: pillar.slug, placement: "hero_map" }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand/20 bg-sand/8 px-6 text-sm font-semibold text-sand backdrop-blur-md transition hover:border-coral/35 hover:bg-coral/10 hover:text-white"
              >
                See the island map
              </TrackedLink>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <section aria-labelledby="feature-grid">
          <div className="max-w-3xl">
            <p className="eyebrow-label">{featureGrid.eyebrow}</p>
            <h2 id="feature-grid" className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl">
              {featureGrid.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/58">{featureGrid.intro}</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureGrid.items.map(([title, body], index) => (
              <article key={title} className="island-postcard-card rounded-[1.35rem] border border-sand/12 bg-[#062532] p-5">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-sand/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-white/8 pt-14 lg:grid-cols-[1fr_0.45fr]" aria-labelledby="island-aware">
          <div>
            <p className="eyebrow-label">Food, water, music — island by island</p>
            <h2 id="island-aware" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              Same feeling, different shore.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillar.islandRelevance.map((item) => (
                <Link
                  key={`${pillar.slug}-${item.island}`}
                  href={item.href}
                  className="island-postcard-card group rounded-[1.35rem] border border-white/9 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-sand/30"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-sand/65">
                    {ISLAND_MAP[item.island].name}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-white/58">{item.angle}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-sand opacity-85">
                    Open island route <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <PlanThisExperienceCard pillar={pillar} />
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="related-guides">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow-label">Keep exploring</p>
              <h2 id="related-guides" className="display-type mt-4 text-3xl font-semibold text-white">
                Follow the next island thread.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {pillar.relatedCategories.map((categorySlug) => {
                  const category = getCategoryBySlug(categorySlug);
                  if (!category) return null;

                  return (
                    <Link
                      key={categorySlug}
                      href={`/st-thomas/${categorySlug}`}
                      className="rounded-full border border-sand/18 bg-sand/7 px-3 py-1.5 text-xs font-semibold text-sand"
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
                  className="group rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-sand/30"
                >
                  <h3 className="font-semibold text-white group-hover:text-sand">{guide.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/52">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="experience-listings">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow-label">Places to start</p>
              <h2 id="experience-listings" className="display-type mt-4 text-3xl font-semibold text-white">
                Browse published profiles for this vibe.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Use these as starting points, then confirm details directly before you go.
              </p>
            </div>
            <Link
              href={`/search?vibe=${pillar.slug}`}
              className="w-fit rounded-full border border-sand/20 bg-sand/7 px-4 py-2 text-sm font-semibold text-sand"
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
              Real inventory for this experience is being assembled. No real businesses are invented to fill the gap.
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="planning-prompts">
          <p className="eyebrow-label">Before you go</p>
          <h2 id="planning-prompts" className="display-type mt-4 max-w-3xl text-3xl font-semibold text-white">
            Ask the questions that make the day smoother.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pillar.planningPrompts.map((prompt, index) => (
              <article key={prompt} className="island-postcard-card rounded-[1.3rem] border border-sand/12 bg-[#062532] p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-sand/60">0{index + 1}</span>
                <p className="mt-8 text-sm leading-7 text-white/60">{prompt}</p>
              </article>
            ))}
          </div>
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

        <TrustFooterNotice pillar={pillar} />

        <nav className="mt-16 flex flex-wrap gap-2 border-t border-white/8 pt-8" aria-label="Continue experience discovery">
          {CORE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/st-thomas/${category.slug}`}
              className="rounded-full border border-white/9 bg-white/[0.03] px-4 py-2 text-sm text-white/58 transition hover:border-sand/25 hover:text-sand"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
