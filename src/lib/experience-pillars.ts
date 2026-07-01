import type { Metadata } from "next";
import type { CategorySlug } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site-url";
import type { IslandSlug } from "@/lib/islands";

export const EXPERIENCE_PILLAR_SLUGS = [
  "adventure",
  "culture",
  "culinary",
  "cruise-day",
  "nightlife",
  "wellness",
  "stays",
  "local-shops",
] as const;

export type ExperiencePillarSlug = (typeof EXPERIENCE_PILLAR_SLUGS)[number];
export type BookingReadinessLevel =
  | "discovery"
  | "inquiry-ready"
  | "partner-leads-later";
export type ExperienceTrustStatus =
  | "launch-preview"
  | "verified-listings-when-available"
  | "guide-first";

export type ExperiencePillar = {
  slug: ExperiencePillarSlug;
  name: string;
  eyebrow: string;
  shortDescription: string;
  heroTitle: string;
  heroBody: string;
  islandRelevance: {
    island: IslandSlug;
    angle: string;
    href: string;
  }[];
  relatedCategories: CategorySlug[];
  relatedGuides: { href: string; label: string; description: string }[];
  suggestedCta: {
    label: string;
    href: string;
    intent:
      | "experience_planning"
      | "request_availability"
      | "business_contact";
  };
  bookingReadinessLevel: BookingReadinessLevel;
  trustStatus: ExperienceTrustStatus;
  gradient: string;
  planningPrompts: string[];
  faq: { question: string; answer: string }[];
};

export const EXPERIENCE_PILLARS: Record<ExperiencePillarSlug, ExperiencePillar> = {
  adventure: {
    slug: "adventure",
    name: "Adventure",
    eyebrow: "Boat days · reefs · trails · big water",
    shortDescription:
      "Charters, snorkeling, diving, hiking, beach routes, and water days across the U.S. Virgin Islands.",
    heroTitle: "Find the adventure that fits today’s island rhythm.",
    heroBody:
      "Start with the feel of the day: ferry window, cruise return, reef conditions, family pace, or a full-send boat run. VibeVI routes you from inspiration to the right island, guide, category, and published operator profile.",
    islandRelevance: [
      { island: "st-thomas", angle: "East End charters, Magens Bay, ferry-linked boat days, and cruise-friendly tours.", href: "/st-thomas/excursions-charters" },
      { island: "st-john", angle: "National park beaches, snorkeling, Cruz Bay charters, and ferry-aware day plans.", href: "/st-john/excursions-charters" },
      { island: "st-croix", angle: "Buck Island, diving, broader drives, and slower full-day reef outings.", href: "/st-croix/excursions-charters" },
      { island: "water-island", angle: "Compact ferry-hop beach days with simple movement and a protected return plan.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["excursions-charters", "tours-activities", "attractions"],
    relatedGuides: [
      { href: "/guides/usvi-charters", label: "USVI charters", description: "Compare departure geography, inclusions, conditions, and direct booking questions." },
      { href: "/st-john/best-snorkeling", label: "Best snorkeling in St. John", description: "Plan around conditions, ability, and official park context." },
      { href: "/st-croix/buck-island", label: "Buck Island guide", description: "Place the reef trip inside a realistic St. Croix day." },
      { href: "/st-john/virgin-islands-national-park", label: "Virgin Islands National Park", description: "Connect beaches, trails, ferry timing, and Cruz Bay services." },
      { href: "/ferry", label: "USVI ferry board", description: "Keep ferry timing visible before committing to beaches, charters, and the return." },
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Use scheduled port context before choosing cruise-day excursions." },
    ],
    suggestedCta: { label: "Plan this adventure", href: "/search?vibe=adventure", intent: "experience_planning" },
    bookingReadinessLevel: "inquiry-ready",
    trustStatus: "verified-listings-when-available",
    gradient: "from-teal-300/55 via-blue-950 to-cyan-500/35",
    planningPrompts: [
      "Which island are you starting from, and do you need to return by ferry or ship all-aboard time?",
      "Is this a water day, trail day, family day, luxury charter, or conditions-dependent snorkel plan?",
      "Which details must be confirmed directly: availability, weather policy, pickup point, inclusions, and cancellation terms?",
    ],
    faq: [
      { question: "Can I book an adventure instantly on VibeVI?", answer: "Not yet. VibeVI helps you discover the right operator or guide path, then start the direct inquiry or contact conversation." },
      { question: "Are water conditions or charter availability live?", answer: "No. VibeVI does not claim live availability or live conditions. Confirm current details with official sources and operators." },
    ],
  },
  culture: {
    slug: "culture",
    name: "Culture",
    eyebrow: "Carnival · music · art · markets · history",
    shortDescription:
      "A guide-first route into USVI history, festivals, foodways, music, makers, markets, and cultural etiquette.",
    heroTitle: "Go beyond the postcard and find the island story.",
    heroBody:
      "Follow the sound, people, streets, foodways, makers, forts, markets, and night energy that make the Virgin Islands feel alive.",
    islandRelevance: [
      { island: "st-thomas", angle: "Charlotte Amalie history, harbor culture, music, shopping corridors, and cruise-day context.", href: "/st-thomas/things-to-do" },
      { island: "st-croix", angle: "Christiansted, Frederiksted, food culture, historic forts, music, and community rhythm.", href: "/st-croix/things-to-do" },
      { island: "st-john", angle: "Park history, Cruz Bay, Coral Bay, reef stewardship, and quieter community context.", href: "/st-john/things-to-do" },
      { island: "water-island", angle: "Small-island pace and day-trip etiquette around limited services and ferry timing.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["culture-history", "attractions", "indulgent-dining", "nightlife-rhythm"],
    relatedGuides: [
      { href: "/st-croix/things-to-do", label: "Things to do in St. Croix", description: "A slower island route with history, food, reef, and town context." },
      { href: "/st-thomas/things-to-do", label: "Things to do in St. Thomas", description: "Harbor city, beach routes, local stops, and after-dark energy." },
      { href: "/st-thomas/havensight-cruise-day", label: "Havensight culture route", description: "Use history, shopping, and town movement as a port-safe day option." },
      { href: "/st-croix/cruise-schedule", label: "Frederiksted cruise-day context", description: "Plan St. Croix culture stops with scheduled port context, not live crowds." },
      { href: "/guides/best-beaches-usvi", label: "Best beaches in the USVI", description: "Choose the right beach without flattening each island’s rhythm." },
    ],
    suggestedCta: { label: "Explore culture routes", href: "/search?vibe=local", intent: "experience_planning" },
    bookingReadinessLevel: "discovery",
    trustStatus: "guide-first",
    gradient: "from-amber-300/50 via-purple-950 to-rose-500/35",
    planningPrompts: [
      "Which island story do you want to understand: history, music, food, art, markets, or festival rhythm?",
      "What should be verified from official or direct sources before you go: hours, tickets, event dates, route, or etiquette?",
      "Where can your day support local businesses rather than only pass through a place?",
    ],
    faq: [
      { question: "Does VibeVI publish a live event calendar yet?", answer: "No. Culture pages are planning guides. Event-specific tools are future roadmap work and should use direct-source verification." },
      { question: "Will cultural listings be verified?", answer: "Yes. Real business and organization profiles should be reviewed for source quality, permission, and accuracy before rich schema or direct contact fields appear." },
    ],
  },
  culinary: {
    slug: "culinary",
    name: "Culinary",
    eyebrow: "Local plates · seafood · beach bars · date nights",
    shortDescription:
      "Restaurants, beach bars, brunch, rum rooms, food trucks, private chefs, and dining routes across the USVI.",
    heroTitle: "Eat where the island takes you.",
    heroBody:
      "Waterfront tables, beach bars, grilled lobster, johnny cakes, pate, brunch, rum drinks, chef-led nights, and late bites after the music starts.",
    islandRelevance: [
      { island: "st-thomas", angle: "Waterfront dining, Red Hook nights, Charlotte Amalie stops, and cruise-day meals.", href: "/st-thomas/indulgent-dining" },
      { island: "st-croix", angle: "Christiansted, Frederiksted, local plates, seafood, food culture, and a slower dining map.", href: "/st-croix/indulgent-dining" },
      { island: "st-john", angle: "Cruz Bay arrivals, post-beach meals, charter-day returns, and compact evening plans.", href: "/st-john/indulgent-dining" },
      { island: "water-island", angle: "Day-trip provisions and simple beach-route planning around limited services.", href: "/water-island/local-provisions" },
    ],
    relatedCategories: ["indulgent-dining", "nightlife-rhythm", "local-provisions"],
    relatedGuides: [
      { href: "/st-croix/indulgent-dining", label: "St. Croix restaurants", description: "Browse dining profiles and plan around island geography." },
      { href: "/st-thomas/nightlife-rhythm", label: "St. Thomas nightlife", description: "Connect dinner, music, bars, and the ride home." },
      { href: "/st-thomas/cruise-day", label: "Cruise day in St. Thomas", description: "Fit meals and local stops inside the port-day clock." },
      { href: "/ferry/red-hook-to-cruz-bay", label: "Red Hook to Cruz Bay food day", description: "Plan a ferry hop around Cruz Bay dining and a confirmed return." },
      { href: "/water-island/day-trip", label: "Water Island beach-bar day", description: "Keep provisions, ferry timing, and the return crossing in view." },
    ],
    suggestedCta: { label: "Find a table to contact", href: "/search?vibe=food", intent: "business_contact" },
    bookingReadinessLevel: "inquiry-ready",
    trustStatus: "verified-listings-when-available",
    gradient: "from-orange-300/55 via-fuchsia-950 to-coral-500/35",
    planningPrompts: [
      "Is this meal near a beach, ferry, port, hotel, event, or nightlife route?",
      "Do you need a reservation, a casual walk-up, late-night food, or a private dining conversation?",
      "Which profile facts are verified and which should be confirmed directly before you go?",
    ],
    faq: [
      { question: "Can I reserve a restaurant table on VibeVI?", answer: "No. VibeVI can point you toward published profiles and contact paths when verified; reservations stay direct with the business." },
      { question: "Are prices and hours guaranteed?", answer: "No. Prices, hours, menus, and availability must be verified directly with the business." },
    ],
  },
  "cruise-day": {
    slug: "cruise-day",
    name: "Cruise Day",
    eyebrow: "One-day plans · port clocks · return buffers",
    shortDescription:
      "Cruise-port planning for beaches, tours, food, shopping, and one-day USVI decisions without pretending capacity is live traffic.",
    heroTitle: "Build the shore day backward from all-aboard.",
    heroBody:
      "Cruise Day turns scheduled port context into practical decisions: which beach, tour, lunch, shop, or cultural stop fits the day? Capacity is planning context—not observed passengers or traffic.",
    islandRelevance: [
      { island: "st-thomas", angle: "Havensight, Crown Bay, Magens Bay, Charlotte Amalie, tours, food, and return buffers.", href: "/st-thomas/cruise-day" },
      { island: "st-croix", angle: "Frederiksted arrivals, island distances, Buck Island constraints, and west-end pacing.", href: "/st-croix/cruise-schedule" },
      { island: "st-john", angle: "Possible ferry-linked day trips where ship time, taxi time, and return crossings all matter.", href: "/st-john/ferry-schedule" },
      { island: "water-island", angle: "A compact ferry-hop idea only when timing, services, and return margin are conservative.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["excursions-charters", "tours-activities", "attractions", "indulgent-dining", "local-provisions", "culture-history"],
    relatedGuides: [
      { href: "/cruise-day", label: "USVI cruise-day hub", description: "Start with port, buffer, and one realistic move." },
      { href: "/st-thomas/cruise-day", label: "Cruise day in St. Thomas", description: "Use port, beach, food, and return-margin context in one plan." },
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Review scheduled capacity as planning context." },
      { href: "/st-thomas/havensight-cruise-day", label: "Havensight guide", description: "Plan shopping, culture, food, beach choices, and the return from Havensight." },
      { href: "/st-thomas/crown-bay-cruise-day", label: "Crown Bay guide", description: "Plan pickup points, Water Island caution, food, tours, and return margin." },
      { href: "/st-thomas/magens-bay", label: "Magens Bay guide", description: "Decide whether the beach fits your port-day clock." },
      { href: "/st-thomas/excursions-charters", label: "St. Thomas excursions", description: "Browse published tour and charter profiles." },
    ],
    suggestedCta: { label: "Plan a port day", href: "/st-thomas/cruise-day", intent: "experience_planning" },
    bookingReadinessLevel: "inquiry-ready",
    trustStatus: "verified-listings-when-available",
    gradient: "from-sky-300/55 via-indigo-950 to-gold-400/35",
    planningPrompts: [
      "Which port are you docking at, and what is your real all-aboard buffer?",
      "Is your one move a beach, charter, cultural stop, food route, shopping route, or nearby mix?",
      "What needs direct confirmation: pickup point, duration, cancellation terms, return transport, and ship timing?",
    ],
    faq: [
      { question: "Does VibeVI show live cruise crowds?", answer: "No. Cruise information uses scheduled ship capacity when available. It is not an actual passenger count or live traffic feed." },
      { question: "Can VibeVI guarantee I return to the ship on time?", answer: "No. Always confirm timing with your cruise line and providers, and keep a conservative return margin." },
    ],
  },
  nightlife: {
    slug: "nightlife",
    name: "Nightlife",
    eyebrow: "Music · bars · harbor nights",
    shortDescription:
      "Late-night music, beach bars, harbor nights, rum rooms, and safe return planning across the USVI.",
    heroTitle: "Find the after-dark current.",
    heroBody:
      "Steel pan, soca, reggae, DJs, live bands, waterfront tables, and the slow walk back under harbor lights. VibeVI routes you to verified nightlife and dining profiles when available—never live event feeds or instant reservations.",
    islandRelevance: [
      { island: "st-thomas", angle: "Red Hook, Charlotte Amalie harbor, and cruise-adjacent evening routes.", href: "/st-thomas/nightlife-rhythm" },
      { island: "st-croix", angle: "Christiansted and Frederiksted evenings with food, music, and boardwalk rhythm.", href: "/st-croix/nightlife-rhythm" },
      { island: "st-john", angle: "Cruz Bay compact nights tied to ferry returns and beach-day endings.", href: "/st-john/indulgent-dining" },
      { island: "water-island", angle: "Day-trip visitors should plan the return ferry before late-night options on St. Thomas.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["nightlife-rhythm", "indulgent-dining"],
    relatedGuides: [
      { href: "/st-thomas/things-to-do", label: "St. Thomas field guide", description: "Place nightlife inside a full island day." },
      { href: "/experiences/culinary", label: "Culinary routes", description: "Connect dinner, beach bars, and late bites." },
      { href: "/experiences/culture", label: "Culture & rhythm", description: "Music roots, Carnival energy, and maker culture." },
    ],
    suggestedCta: { label: "Browse nightlife", href: "/st-thomas/nightlife-rhythm", intent: "experience_planning" },
    bookingReadinessLevel: "discovery",
    trustStatus: "launch-preview",
    gradient: "from-fuchsia-500/45 via-indigo-950 to-violet-500/40",
    planningPrompts: [
      "Which island are you on, and how are you getting home after midnight?",
      "Confirm hours, music, cover, dress expectations, and ID requirements directly.",
      "Pair dinner, drinks, and music into one route instead of chasing three separate guesses.",
    ],
    faq: [
      { question: "Is nightlife availability live on VibeVI?", answer: "No. Confirm current hours, events, and cover details directly with venues." },
      { question: "Can I reserve tables through VibeVI?", answer: "No. Booking tools are coming later; contact verified businesses directly when contact paths are published." },
    ],
  },
  wellness: {
    slug: "wellness",
    name: "Wellness",
    eyebrow: "Spa · reset · slow hours",
    shortDescription:
      "Recovery, spa time, beach calm, and slower island days between bigger adventures.",
    heroTitle: "Reset between the bigger moves.",
    heroBody:
      "Wellness on VibeVI means spa appointments, calm beaches, soft mornings, and low-effort resets—not live class schedules or instant booking. Browse verified providers when published and confirm services directly.",
    islandRelevance: [
      { island: "st-thomas", angle: "Spa pavilions, Magens-adjacent calm, and resort-adjacent recovery routes.", href: "/st-thomas/wellness-spas" },
      { island: "st-croix", angle: "Slower island pacing with reef-adjacent calm and town-based spa options.", href: "/st-croix/wellness-spas" },
      { island: "st-john", angle: "Park-adjacent quiet days with ferry timing and Cruz Bay services.", href: "/st-john/wellness-spas" },
      { island: "water-island", angle: "Compact beach-day resets with limited on-island services.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["wellness-spas", "boutique-stays"],
    relatedGuides: [
      { href: "/guides/best-beaches-usvi", label: "Best beaches in the USVI", description: "Choose a softer beach day." },
      { href: "/experiences/adventure", label: "Adventure routes", description: "Balance active water days with recovery time." },
    ],
    suggestedCta: { label: "Browse wellness", href: "/st-thomas/wellness-spas", intent: "business_contact" },
    bookingReadinessLevel: "discovery",
    trustStatus: "launch-preview",
    gradient: "from-emerald-300/45 via-teal-950 to-cyan-300/35",
    planningPrompts: [
      "Is this a spa appointment, beach calm day, or full digital detox?",
      "Confirm service menus, provider credentials, location, and cancellation terms directly.",
      "Build ferry or cruise return buffers around slower wellness days.",
    ],
    faq: [
      { question: "Can I book spa services on VibeVI?", answer: "No. Booking tools are coming later; contact verified providers directly when contact paths are published." },
      { question: "Are class schedules or spa availability live?", answer: "No. VibeVI does not show live wellness inventory." },
    ],
  },
  stays: {
    slug: "stays",
    name: "Stays",
    eyebrow: "Hotels · villas · boutique bases",
    shortDescription:
      "Boutique hotels, villas, and island bases chosen by rhythm—not a fake OTA checkout.",
    heroTitle: "Choose the base that matches the trip.",
    heroBody:
      "Stays help visitors understand which island base fits ferry hops, reef days, food routes, and nightlife without pretending VibeVI books rooms or holds live availability.",
    islandRelevance: [
      { island: "st-thomas", angle: "Harbor access, Magens proximity, and cruise-adjacent convenience.", href: "/st-thomas/boutique-stays" },
      { island: "st-croix", angle: "Wider island geography with town bases and reef-day pacing.", href: "/st-croix/boutique-stays" },
      { island: "st-john", angle: "Cruz Bay convenience with national park and ferry-aware planning.", href: "/st-john/boutique-stays" },
      { island: "water-island", angle: "Usually a day trip—not a lodging hub unless a verified stay is published.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["boutique-stays"],
    relatedGuides: [
      { href: "/st-thomas/things-to-do", label: "Things to do in St. Thomas", description: "Understand day routes around a potential base." },
      { href: "/ferry", label: "Ferry board", description: "Factor crossings into where you sleep." },
    ],
    suggestedCta: { label: "Browse stays", href: "/st-thomas/boutique-stays", intent: "business_contact" },
    bookingReadinessLevel: "partner-leads-later",
    trustStatus: "launch-preview",
    gradient: "from-amber-300/40 via-indigo-950 to-sky-400/30",
    planningPrompts: [
      "Which island rhythm fits the trip: ferry hops, reef days, food nights, or slow reset?",
      "Confirm availability, taxes, fees, minimum stays, and cancellation directly with the provider.",
      "Do not assume Water Island or St. John logistics match a St. Thomas hotel mindset.",
    ],
    faq: [
      { question: "Can I book lodging on VibeVI?", answer: "No. VibeVI is not a lodging booking engine in this phase." },
      { question: "Are room rates and availability live?", answer: "No. Rates, inventory, and policies must be confirmed directly with lodging providers." },
    ],
  },
  "local-shops": {
    slug: "local-shops",
    name: "Local Shops",
    eyebrow: "Makers · markets · provisions",
    shortDescription:
      "Local provisions, makers, markets, galleries, and useful island stops worth carrying home.",
    heroTitle: "Find the useful local stop.",
    heroBody:
      "Local shops are where visitors meet makers, provisions, art, and island services—without VibeVI inventing stock, hours, or prices.",
    islandRelevance: [
      { island: "st-thomas", angle: "Charlotte Amalie corridors, Red Hook stops, and cruise-day shopping context.", href: "/st-thomas/local-provisions" },
      { island: "st-croix", angle: "Christiansted makers, Frederiksted provisions, and slower town browsing.", href: "/st-croix/local-provisions" },
      { island: "st-john", angle: "Cruz Bay compact shopping tied to ferry arrivals.", href: "/st-john/local-provisions" },
      { island: "water-island", angle: "Provision before the hop—services on-island are limited.", href: "/water-island/day-trip" },
    ],
    relatedCategories: ["local-provisions"],
    relatedGuides: [
      { href: "/experiences/culture", label: "Culture routes", description: "Markets, makers, and local rhythm." },
      { href: "/water-island/day-trip", label: "Water Island day trip", description: "Plan provisions before a smaller island hop." },
    ],
    suggestedCta: { label: "Browse local shops", href: "/st-thomas/local-provisions", intent: "business_contact" },
    bookingReadinessLevel: "discovery",
    trustStatus: "launch-preview",
    gradient: "from-lime-300/40 via-emerald-950 to-yellow-300/30",
    planningPrompts: [
      "Are you shopping for provisions, gifts, art, or a practical island need?",
      "Confirm hours, stock, location, and contact details directly with the shop.",
      "Support local makers when you can—do not treat culture as a souvenir checklist.",
    ],
    faq: [
      { question: "Are shop inventories live on VibeVI?", answer: "No. VibeVI does not show live retail inventory." },
      { question: "Can I order or reserve products through VibeVI?", answer: "No. Contact businesses directly when verified contact paths are available." },
    ],
  },
};

/** Priority pillars for homepage, sitemap emphasis, and launch marketing. */
export const FEATURED_EXPERIENCE_PILLARS: ExperiencePillarSlug[] = [
  "adventure",
  "culture",
  "culinary",
  "cruise-day",
];

/** All routable experience pillars (featured + discovery-first secondary pillars). */
export const PUBLIC_EXPERIENCE_PILLAR_SLUGS: ExperiencePillarSlug[] = [
  ...EXPERIENCE_PILLAR_SLUGS,
];

export function getExperiencePillar(slug: string) {
  return EXPERIENCE_PILLARS[slug as ExperiencePillarSlug] ?? null;
}

export function experiencePillarMetadata(pillar: ExperiencePillar): Metadata {
  const canonical = absoluteUrl(`/experiences/${pillar.slug}`);

  return {
    title: `${pillar.name} in the USVI`,
    description: pillar.shortDescription,
    alternates: { canonical },
    openGraph: {
      title: `${pillar.name} in the USVI | VibeVI`,
      description: pillar.shortDescription,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pillar.name} in the USVI | VibeVI`,
      description: pillar.shortDescription,
    },
    robots: { index: true, follow: true },
  };
}
