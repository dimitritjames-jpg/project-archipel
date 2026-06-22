import type { Metadata } from "next";
import { env } from "@/lib/env";

export type GuideLink = { href: string; label: string; description: string };

export type LaunchGuide = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  introduction: string;
  essentials: { title: string; body: string }[];
  related: GuideLink[];
  faq: { question: string; answer: string }[];
};

export function guideMetadata(guide: LaunchGuide): Metadata {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}${guide.path}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical },
    openGraph: { title: `${guide.title} | VibeVI`, description: guide.description, url: canonical },
    twitter: { card: "summary_large_image", title: `${guide.title} | VibeVI`, description: guide.description },
    robots: { index: true, follow: true },
  };
}

export const ISLAND_GUIDES: Record<string, LaunchGuide> = {
  "st-thomas/things-to-do": {
    path: "/st-thomas/things-to-do",
    eyebrow: "St. Thomas field guide",
    title: "Things to Do in St. Thomas",
    description: "Plan a St. Thomas day around beaches, ferries, Charlotte Amalie, local businesses, nightlife, and cruise-day conditions.",
    introduction: "St. Thomas can turn from harbor city to beach road to ferry launch in one day. Start with where you are, check the port and ferry context, then choose one strong move instead of racing the whole island.",
    essentials: [
      { title: "Pick the day’s anchor", body: "Choose Magens Bay, Charlotte Amalie, Red Hook, or an on-water outing first. Let travel time and the return route shape everything around it." },
      { title: "Read the port signal", body: "Scheduled cruise capacity can help you anticipate a busier port corridor. It is a planning estimate, not an observed passenger count." },
      { title: "Save energy for after dark", body: "Dining and nightlife stretch from Charlotte Amalie to the East End. Confirm current hours and reservations directly with each business." },
    ],
    related: [
      { href: "/st-thomas/magens-bay", label: "Magens Bay guide", description: "Build a beach day with transport and dining connections." },
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Check the scheduled port-load planning signal." },
      { href: "/st-thomas/nightlife-rhythm", label: "St. Thomas nightlife", description: "Browse published bars, music, and late-night listings." },
      { href: "/st-thomas/ferry-schedule", label: "St. Thomas ferry schedule", description: "Review directional ferry planning information." },
    ],
    faq: [
      { question: "What is the best way to plan one day in St. Thomas?", answer: "Choose one anchor area, check ferry or port context if it affects your route, and confirm business hours and transportation directly before leaving." },
      { question: "Is VibeVI showing live traffic or ferry positions?", answer: "No. Ferry information is schedule-based, and cruise information uses scheduled ship capacity rather than observed passenger counts." },
    ],
  },
  "st-croix/things-to-do": {
    path: "/st-croix/things-to-do",
    eyebrow: "St. Croix field guide",
    title: "Things to Do in St. Croix",
    description: "Plan a St. Croix day around Christiansted, Frederiksted, Buck Island, beaches, food, culture, and local businesses.",
    introduction: "St. Croix rewards a slower map. Christiansted, Frederiksted, the North Shore, and Buck Island are distinct moves—not a checklist to compress into one rushed loop.",
    essentials: [
      { title: "Choose an island side", body: "Anchor the day around Christiansted and Buck Island, the North Shore, or Frederiksted. The distance between them is part of the plan." },
      { title: "Treat the water as an outing", body: "Buck Island and charter days depend on operator availability and conditions. Confirm departure details directly before arranging the rest." },
      { title: "Leave room for the table", body: "St. Croix’s food culture deserves time. Browse published restaurant listings, then verify hours and reservations with the business." },
    ],
    related: [
      { href: "/st-croix/buck-island", label: "Buck Island guide", description: "Connect boat access with the rest of the St. Croix day." },
      { href: "/st-croix/indulgent-dining", label: "St. Croix restaurants", description: "Explore published dining profiles across the island." },
      { href: "/st-croix/cruise-schedule", label: "Frederiksted cruise schedule", description: "Review scheduled capacity context for port days." },
      { href: "/st-croix/excursions-charters", label: "St. Croix charters", description: "Browse published excursions and charter listings." },
    ],
    faq: [
      { question: "Can I see all of St. Croix in one day?", answer: "You can cross the island, but a better plan usually focuses on one or two connected areas and leaves enough time for travel and stops." },
      { question: "Does VibeVI book Buck Island trips?", answer: "No. VibeVI helps you discover published operators; availability, safety details, and booking are confirmed directly with each business." },
    ],
  },
  "st-john/things-to-do": {
    path: "/st-john/things-to-do",
    eyebrow: "St. John field guide",
    title: "Things to Do in St. John",
    description: "Plan a St. John day around the ferry, Virgin Islands National Park, beaches, snorkeling, Cruz Bay, and local businesses.",
    introduction: "On St. John, the ferry sets the first clock and the park changes the pace. Choose a beach, trail, or boat day, then keep Cruz Bay useful for arrival, food, and the trip home.",
    essentials: [
      { title: "Start with the ferry", body: "Review the directional schedule and confirm current service with the operator. VibeVI does not provide live vessel tracking or boarding guarantees." },
      { title: "Use official park guidance", body: "For closures, permits, safety, and conditions inside Virgin Islands National Park, official National Park Service information is the authority." },
      { title: "Match the beach to the route", body: "North Shore beaches, Cruz Bay access, and snorkeling plans create different transport needs. Confirm return options before settling in." },
    ],
    related: [
      { href: "/st-john/ferry-schedule", label: "St. John ferry schedule", description: "Check the schedule-based next-boat utility." },
      { href: "/st-john/virgin-islands-national-park", label: "National park guide", description: "Connect trails, beaches, transport, and Cruz Bay." },
      { href: "/st-john/beaches", label: "St. John beaches", description: "Choose a beach by access, pace, and day shape." },
      { href: "/st-john/best-snorkeling", label: "Best snorkeling in St. John", description: "Plan a safer, operator-aware snorkeling day." },
    ],
    faq: [
      { question: "Do I need a car for a St. John day trip?", answer: "Not always. Your transport choice depends on the beach, trail, group, and return plan. Confirm current taxi, rental, or operator arrangements directly." },
      { question: "Are ferry times on VibeVI live?", answer: "No. They are schedule-based and should be confirmed with the operator before travel." },
    ],
  },
  "st-john/beaches": {
    path: "/st-john/beaches",
    eyebrow: "Beach route planner",
    title: "St. John Beaches",
    description: "Choose a St. John beach by access, snorkeling interest, park context, transport, and the shape of your island day.",
    introduction: "The best St. John beach is the one that fits the route. Consider access, shade, facilities, water conditions, group needs, and how you are getting back before choosing the postcard.",
    essentials: [
      { title: "North Shore classics", body: "Popular park beaches can be the simplest visual choice and the hardest transport choice on busy days. Check official conditions and make a return plan." },
      { title: "Snorkeling is condition-dependent", body: "Visibility, current, entry, and ability matter more than a ranking. Use official guidance and qualified operators where appropriate." },
      { title: "Protect the final hour", body: "Build in enough time to leave the beach, reconnect with transport, and reach Cruz Bay before the ferry you intend to take." },
    ],
    related: [
      { href: "/st-john/best-snorkeling", label: "Best snorkeling in St. John", description: "Compare the planning factors behind a snorkel day." },
      { href: "/st-john/virgin-islands-national-park", label: "National park guide", description: "Use the park as the larger planning frame." },
      { href: "/st-john/ferry-schedule", label: "St. John ferry schedule", description: "Keep the return crossing in view." },
      { href: "/guides/best-beaches-usvi", label: "Best beaches in the USVI", description: "Compare beach-day styles across the islands." },
    ],
    faq: [
      { question: "Which St. John beach is best for snorkeling?", answer: "There is no condition-proof winner. Entry, current, visibility, experience, and official safety guidance should determine the choice on the day." },
      { question: "Are St. John beach conditions live on VibeVI?", answer: "No. VibeVI provides planning context; check official or direct sources for current conditions and closures." },
    ],
  },
  "st-john/best-snorkeling": {
    path: "/st-john/best-snorkeling",
    eyebrow: "Water-day planner",
    title: "Best Snorkeling in St. John",
    description: "Plan snorkeling in St. John with practical guidance on access, conditions, ability, park context, and local charter options.",
    introduction: "A useful snorkeling guide starts with conditions and ability, not a fixed top-ten list. Shore access and charter trips solve different days; both require a current safety check.",
    essentials: [
      { title: "Choose shore or boat", body: "Shore snorkeling can be flexible; a qualified charter can add equipment, local context, and access. Confirm exactly what an operator includes." },
      { title: "Read the water first", body: "Wind, swell, current, visibility, and entry conditions change. Never treat a static guide as a current safety report." },
      { title: "Respect protected places", body: "Follow National Park Service guidance, avoid touching coral, and use reef-conscious practices throughout the day." },
    ],
    related: [
      { href: "/st-john/snorkeling-charters", label: "Snorkeling and charter guide", description: "Compare the questions to ask before booking." },
      { href: "/st-john/excursions-charters", label: "St. John charter listings", description: "Browse published local operator profiles." },
      { href: "/st-john/beaches", label: "St. John beaches", description: "Match the water plan to access and transport." },
      { href: "/st-john/virgin-islands-national-park", label: "National park guide", description: "Keep official park context close." },
    ],
    faq: [
      { question: "Does VibeVI rank snorkeling spots by live conditions?", answer: "No. Conditions are not live. The guide helps frame the decision, while official sources and qualified local operators provide current guidance." },
      { question: "Can beginners snorkel in St. John?", answer: "Options exist for different ability levels, but every person should assess conditions, equipment, supervision, and swimming ability on the day." },
    ],
  },
  "st-thomas/cruise-day": {
    path: "/st-thomas/cruise-day",
    eyebrow: "Port-day planner",
    title: "Cruise Day in St. Thomas",
    description: "Plan a St. Thomas cruise day around scheduled port load, beaches, Charlotte Amalie, local tours, transport, and an on-time return.",
    introduction: "A strong port day is built backward from the all-aboard time. Pick one anchor experience, understand which port you are using, and leave a generous return margin.",
    essentials: [
      { title: "Know your port", body: "Havensight and Crown Bay create different starting routes. Confirm your ship’s berth and all-aboard time using authoritative cruise information." },
      { title: "Use capacity as context", body: "VibeVI’s crowd signal sums scheduled ship capacity when known. It does not measure actual passengers ashore or live street traffic." },
      { title: "Book with a return plan", body: "For beaches, taxis, and tours, confirm duration, pickup point, cancellation terms, and the return buffer directly with the provider." },
    ],
    related: [
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Review the scheduled port-load signal." },
      { href: "/st-thomas/magens-bay", label: "Magens Bay guide", description: "Decide whether the beach fits the port-day clock." },
      { href: "/st-thomas/excursions-charters", label: "St. Thomas tours", description: "Browse published excursion and charter profiles." },
      { href: "/st-thomas/indulgent-dining", label: "St. Thomas dining", description: "Find a local table near the day’s route." },
    ],
    faq: [
      { question: "Does scheduled cruise capacity equal passengers in town?", answer: "No. It is a planning estimate based on known ship capacity, not an actual disembarkation or pedestrian count." },
      { question: "Can VibeVI guarantee I return to the ship on time?", answer: "No. Confirm timing directly with your ship and providers, and build a conservative return margin." },
    ],
  },
  "water-island/day-trip": {
    path: "/water-island/day-trip",
    eyebrow: "Small-island planner",
    title: "Water Island Day Trip",
    description: "Plan a Water Island day trip with the Crown Bay ferry, Honeymoon Beach, supplies, transport, and a schedule-aware return.",
    introduction: "Water Island works because the day stays simple. Check the directional ferry plan, carry what you need, understand your on-island movement, and protect the return crossing.",
    essentials: [
      { title: "Check both directions", body: "Outbound and return schedules are separate records. Confirm current operation and fares directly with the ferry provider before travel." },
      { title: "Plan the island leg", body: "Honeymoon Beach is the common anchor, but dock-to-beach movement and mobility needs still belong in the plan." },
      { title: "Keep the day self-contained", body: "Services can be limited. Bring appropriate water, sun protection, and essentials, and follow current local guidance." },
    ],
    related: [
      { href: "/water-island/ferry-schedule", label: "Water Island ferry schedule", description: "Review the schedule-based crossing utility." },
      { href: "/ferry/crown-bay-to-water-island", label: "Crown Bay to Water Island", description: "Open the directional route context." },
      { href: "/water-island", label: "Water Island hub", description: "See the complete island discovery portal." },
      { href: "/map", label: "USVI map", description: "Place the day trip within the wider archipelago." },
    ],
    faq: [
      { question: "Is the Water Island ferry tracker live?", answer: "No. VibeVI shows schedule-based planning information, not live vessel positions or a boarding guarantee." },
      { question: "Can I plan Water Island as a day trip?", answer: "Yes, when current ferry operation, supplies, mobility, and the return schedule work for your group. Confirm all time-sensitive details directly." },
    ],
  },
};

export const USVI_GUIDES: Record<string, LaunchGuide> = {
  "usvi-charters": {
    path: "/guides/usvi-charters",
    eyebrow: "Across the islands",
    title: "USVI Charters",
    description: "Discover USVI boat charters and excursions across St. Thomas, St. Croix, and St. John, with practical booking questions and island links.",
    introduction: "The right charter depends on departure island, group, boat style, water time, and the day’s conditions. VibeVI helps you find published operators and ask better questions before booking directly.",
    essentials: [
      { title: "Start with departure geography", body: "A St. Thomas, St. John, or St. Croix departure changes the reachable day. Confirm the exact marina or pickup point before comparing trips." },
      { title: "Compare what is included", body: "Ask about duration, fuel, captain, equipment, food, permits, gratuity, weather policy, accessibility, and cancellation terms." },
      { title: "Treat availability as direct-source data", body: "VibeVI does not claim live inventory. Confirm availability, credentials, and conditions directly with each operator." },
    ],
    related: [
      { href: "/st-thomas/excursions-charters", label: "St. Thomas charters", description: "Browse published East End and island-wide operators." },
      { href: "/st-john/excursions-charters", label: "St. John charters", description: "Discover boat days around Cruz Bay and the park." },
      { href: "/st-croix/excursions-charters", label: "St. Croix charters", description: "Find Buck Island and broader St. Croix outings." },
      { href: "/st-john/snorkeling-charters", label: "Snorkeling and charter guide", description: "Use a practical checklist before choosing." },
    ],
    faq: [
      { question: "Can I book a charter directly on VibeVI?", answer: "Not in this launch release. VibeVI connects you to published business profiles so you can confirm availability and book directly." },
      { question: "Are charter prices and availability live?", answer: "No. Confirm current pricing, availability, terms, and inclusions with the operator." },
    ],
  },
  "best-beaches-usvi": {
    path: "/guides/best-beaches-usvi",
    eyebrow: "Four-island beach guide",
    title: "Best Beaches in the USVI",
    description: "Choose the best USVI beach for your day across St. Thomas, St. John, St. Croix, and Water Island using access, pace, and activity context.",
    introduction: "There is no single best beach for every island day. The useful question is whether you want easy access, snorkeling potential, a quieter road, cruise-day convenience, or a small-island escape.",
    essentials: [
      { title: "For an iconic St. Thomas beach", body: "Magens Bay is the famous curve. Plan transport, current operations, and the route back rather than treating it as an isolated pin." },
      { title: "For park-framed St. John water", body: "Use official park information for conditions and closures, and let ferry and return transport shape the beach choice." },
      { title: "For a different island rhythm", body: "St. Croix offers a wider coastal canvas; Water Island offers a compact ferry-hop day. Each solves a different kind of beach plan." },
    ],
    related: [
      { href: "/st-thomas/magens-bay", label: "Magens Bay guide", description: "Plan the classic St. Thomas beach day." },
      { href: "/st-john/beaches", label: "St. John beaches", description: "Choose by park context, access, and pace." },
      { href: "/water-island/day-trip", label: "Water Island day trip", description: "Build a ferry-hop beach day around Honeymoon Beach." },
      { href: "/st-croix/things-to-do", label: "Things to do in St. Croix", description: "Place a beach stop inside a broader island route." },
    ],
    faq: [
      { question: "What is the best beach in the U.S. Virgin Islands?", answer: "It depends on your island, transport, group, preferred activities, and current conditions. This guide routes you to the beach day that fits rather than declaring one universal winner." },
      { question: "Does VibeVI provide live beach conditions?", answer: "No. Check official or direct sources for current water, weather, closure, and facility information." },
    ],
  },
};
