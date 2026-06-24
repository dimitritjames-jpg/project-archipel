import type { IslandSlug } from "@/lib/islands";
import { RED_HOOK_CRUZ_BAY_ROUTE_SLUG } from "@/lib/transit/countdown-math";

export type FerryRouteLink = {
  href: string;
  label: string;
  description: string;
};

export const PUBLIC_FERRY_ROUTES = [
  {
    slug: RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
    label: "Red Hook → Cruz Bay",
    note: "St. Thomas to St. John",
  },
  {
    slug: "cruz-bay-to-red-hook",
    label: "Cruz Bay → Red Hook",
    note: "St. John to St. Thomas",
  },
  {
    slug: "crown-bay-to-water-island",
    label: "Crown Bay → Water Island",
    note: "St. Thomas to Water Island",
  },
  {
    slug: "water-island-to-crown-bay",
    label: "Water Island → Crown Bay",
    note: "Water Island to St. Thomas",
  },
] as const;

export type PublicFerryRouteSlug = (typeof PUBLIC_FERRY_ROUTES)[number]["slug"];

export type FerryRouteGuide = {
  slug: string;
  label: string;
  plainTitle: string;
  note: string;
  origin: string;
  destination: string;
  islandDayUse: string;
  scheduleSlug?: PublicFerryRouteSlug;
  boardHref: string;
  sourceStatus: "source-backed" | "guide-only";
  relatedLinks: FerryRouteLink[];
  faq: { question: string; answer: string }[];
};

export const PUBLIC_FERRY_ROUTE_SLUGS = PUBLIC_FERRY_ROUTES.map(
  (route) => route.slug,
) as PublicFerryRouteSlug[];

export function isPublicFerryRouteSlug(
  value: string,
): value is PublicFerryRouteSlug {
  return PUBLIC_FERRY_ROUTE_SLUGS.includes(value as PublicFerryRouteSlug);
}

export function getFerryRouteMeta(slug: PublicFerryRouteSlug) {
  return PUBLIC_FERRY_ROUTES.find((route) => route.slug === slug);
}

export const FERRY_ROUTE_ALIASES: Record<string, PublicFerryRouteSlug> = {
  "red-hook-cruz-bay": RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
  "red-hook-to-st-john": RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
  "cruz-bay-red-hook": "cruz-bay-to-red-hook",
  "crown-bay-water-island": "crown-bay-to-water-island",
  "water-island-crown-bay": "water-island-to-crown-bay",
};

const scheduleRouteGuides: FerryRouteGuide[] = [
  {
    slug: RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
    label: "Red Hook → Cruz Bay",
    plainTitle: "Red Hook to Cruz Bay Ferry Guide",
    note: "The main St. Thomas to St. John ferry-hop planning route.",
    origin: "Red Hook, St. Thomas",
    destination: "Cruz Bay, St. John",
    islandDayUse:
      "Use this crossing for St. John beach days, Virgin Islands National Park, Cruz Bay dining, charter departures, and a return plan that leaves room before the last commitment.",
    scheduleSlug: RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
    boardHref: "/st-thomas/ferry-schedule",
    sourceStatus: "source-backed",
    relatedLinks: [
      { href: "/st-john/things-to-do", label: "Plan a St. John day", description: "Connect the crossing to beaches, park routes, food, and Cruz Bay." },
      { href: "/st-john/virgin-islands-national-park", label: "Virgin Islands National Park", description: "Use the ferry as the first clock for park beaches and trails." },
      { href: "/st-john/indulgent-dining", label: "Cruz Bay dining", description: "Find food close to the return crossing." },
      { href: "/st-john/excursions-charters", label: "St. John charters", description: "Browse water-day profiles and confirm departure details directly." },
    ],
    faq: [
      { question: "Is Red Hook to Cruz Bay ferry information live?", answer: "No. VibeVI shows schedule-based planning information, not live vessel tracking or a boarding guarantee." },
      { question: "What should I confirm before taking the ferry?", answer: "Confirm current schedules, fares, baggage rules, service status, and boarding requirements directly with the operator before travel." },
    ],
  },
  {
    slug: "cruz-bay-to-red-hook",
    label: "Cruz Bay → Red Hook",
    plainTitle: "Cruz Bay to Red Hook Ferry Guide",
    note: "The St. John to St. Thomas return crossing for beach, park, and dinner plans.",
    origin: "Cruz Bay, St. John",
    destination: "Red Hook, St. Thomas",
    islandDayUse:
      "Use this return route after St. John beaches, national park stops, Cruz Bay meals, or charters. Build margin for taxis, queues, weather, and the next plan on St. Thomas.",
    scheduleSlug: "cruz-bay-to-red-hook",
    boardHref: "/st-john/ferry-schedule",
    sourceStatus: "source-backed",
    relatedLinks: [
      { href: "/st-john/beaches", label: "St. John beaches", description: "Choose the beach by route, transport, and return timing." },
      { href: "/st-thomas/indulgent-dining", label: "Dinner back on St. Thomas", description: "Plan the meal after the crossing with direct confirmation." },
      { href: "/st-thomas/nightlife-rhythm", label: "Red Hook after dark", description: "Keep the night move close to the landing side." },
      { href: "/map", label: "Open the island map", description: "See ferry, beach, food, and business context together." },
    ],
    faq: [
      { question: "Can VibeVI guarantee the return ferry?", answer: "No. Ferry data is schedule-based. Confirm the current return crossing with the operator and protect extra time." },
      { question: "Should I assume return times match outbound times?", answer: "No. Directional ferry service is treated separately; always check the return direction." },
    ],
  },
  {
    slug: "crown-bay-to-water-island",
    label: "Crown Bay → Water Island",
    plainTitle: "Crown Bay to Water Island Ferry Guide",
    note: "The compact St. Thomas to Water Island day-trip crossing.",
    origin: "Crown Bay, St. Thomas",
    destination: "Water Island",
    islandDayUse:
      "Use this ferry hop for Honeymoon Beach, golf-cart movement, quiet beach time, and a simple return plan. Carry essentials and confirm current operation before heading over.",
    scheduleSlug: "crown-bay-to-water-island",
    boardHref: "/water-island/ferry-schedule",
    sourceStatus: "source-backed",
    relatedLinks: [
      { href: "/water-island/day-trip", label: "Water Island day trip", description: "Turn the ferry ride into a small-island beach day." },
      { href: "/water-island/local-provisions", label: "Water Island provisions", description: "Check useful stops without assuming inventory is live." },
      { href: "/water-island", label: "Water Island hub", description: "Open the full island guide." },
      { href: "/st-thomas/cruise-day", label: "Cruise-day timing note", description: "Only consider this hop with conservative ship-return margin." },
    ],
    faq: [
      { question: "Is the Water Island ferry tracker live?", answer: "No. VibeVI provides schedule-based planning context only." },
      { question: "Is Water Island a good cruise-day move?", answer: "It can be, but only when ship timing, ferry operation, transport, and return margin are conservative and confirmed directly." },
    ],
  },
  {
    slug: "water-island-to-crown-bay",
    label: "Water Island → Crown Bay",
    plainTitle: "Water Island to Crown Bay Ferry Guide",
    note: "The Water Island return crossing back to St. Thomas.",
    origin: "Water Island",
    destination: "Crown Bay, St. Thomas",
    islandDayUse:
      "Use this route to protect the return from Honeymoon Beach or a golf-cart loop. Reverse ferry times are not assumed from the outbound crossing.",
    scheduleSlug: "water-island-to-crown-bay",
    boardHref: "/water-island/ferry-schedule",
    sourceStatus: "source-backed",
    relatedLinks: [
      { href: "/water-island/day-trip", label: "Water Island day trip", description: "Plan the outbound, beach window, and return together." },
      { href: "/st-thomas/indulgent-dining", label: "Food after the ferry", description: "Find a St. Thomas bite after the return crossing." },
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Use scheduled capacity as planning context, not a crowd count." },
      { href: "/map", label: "Open the map", description: "Place the ferry hop inside the wider island day." },
    ],
    faq: [
      { question: "Are Water Island return times guaranteed by VibeVI?", answer: "No. Confirm current service directly with the ferry provider before relying on a return crossing." },
      { question: "Does VibeVI show live vessel positions?", answer: "No. Ferry information is schedule-based and should be treated as planning context." },
    ],
  },
];

const guideOnlyRoutes: FerryRouteGuide[] = [
  {
    slug: "charlotte-amalie-cruz-bay",
    label: "Charlotte Amalie ↔ Cruz Bay",
    plainTitle: "Charlotte Amalie to Cruz Bay Ferry Guide",
    note: "Guide-only context for the downtown St. Thomas to St. John ferry intent.",
    origin: "Charlotte Amalie, St. Thomas",
    destination: "Cruz Bay, St. John",
    islandDayUse:
      "Use this page as planning context for visitors searching the downtown St. Thomas to St. John crossing. VibeVI has not wired source-backed timetable records for this route yet, so confirm current service directly before building the day.",
    boardHref: "/st-thomas/ferry-schedule",
    sourceStatus: "guide-only",
    relatedLinks: [
      { href: "/st-thomas/ferry-schedule", label: "St. Thomas ferry board", description: "Open the source-backed routes currently wired in VibeVI." },
      { href: "/ferry/red-hook-to-cruz-bay", label: "Red Hook to Cruz Bay", description: "Use the live schedule-backed St. Thomas to St. John route." },
      { href: "/st-john/things-to-do", label: "St. John day guide", description: "Plan beaches, Cruz Bay, park context, food, and the return." },
      { href: "/st-thomas/things-to-do", label: "St. Thomas guide", description: "Connect Charlotte Amalie, Red Hook, cruise-day, beaches, and nightlife." },
    ],
    faq: [
      { question: "Does VibeVI show Charlotte Amalie to Cruz Bay times?", answer: "Not yet. This page is guide-only until source-backed timetable records are added." },
      { question: "Where should I confirm the route?", answer: "Confirm current operation, departure point, fares, baggage rules, and return timing directly with the ferry operator before travel." },
    ],
  },
];

export const FERRY_ROUTE_GUIDES = [
  ...scheduleRouteGuides,
  ...guideOnlyRoutes,
] as const satisfies readonly FerryRouteGuide[];

export const PUBLIC_FERRY_GUIDE_SLUGS = FERRY_ROUTE_GUIDES.map(
  (route) => route.slug,
);

export function getFerryRouteRedirect(slug: string): PublicFerryRouteSlug | null {
  return FERRY_ROUTE_ALIASES[slug] ?? null;
}

export function getFerryRouteGuide(slug: string): FerryRouteGuide | null {
  return FERRY_ROUTE_GUIDES.find((route) => route.slug === slug) ?? null;
}

export const PRIMARY_FERRY_ROUTE_BY_ISLAND: Partial<
  Record<IslandSlug, PublicFerryRouteSlug>
> = {
  "st-thomas": RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
  "st-john": "cruz-bay-to-red-hook",
  "water-island": "crown-bay-to-water-island",
};

export const FERRY_ROUTES_BY_ISLAND: Partial<
  Record<IslandSlug, readonly PublicFerryRouteSlug[]>
> = {
  "st-thomas": [
    RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
    "cruz-bay-to-red-hook",
    "crown-bay-to-water-island",
    "water-island-to-crown-bay",
  ],
  "st-john": [RED_HOOK_CRUZ_BAY_ROUTE_SLUG, "cruz-bay-to-red-hook"],
  "water-island": ["crown-bay-to-water-island", "water-island-to-crown-bay"],
};
