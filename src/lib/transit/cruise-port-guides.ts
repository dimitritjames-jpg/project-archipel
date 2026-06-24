import type { Metadata } from "next";
import { env } from "@/lib/env";

export type CruisePortGuide = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  portName: string;
  introduction: string;
  essentials: { title: string; body: string }[];
  moves: { href: string; label: string; description: string }[];
  faq: { question: string; answer: string }[];
};

export const ST_THOMAS_CRUISE_PORT_GUIDES = {
  havensight: {
    path: "/st-thomas/havensight-cruise-day",
    eyebrow: "Havensight cruise-day guide",
    title: "Havensight Cruise Day Guide",
    description:
      "Plan a Havensight cruise day in St. Thomas around port location, Charlotte Amalie, nearby shopping, food, beaches, tours, and a conservative return buffer.",
    portName: "Havensight",
    introduction:
      "Havensight is one of the easiest St. Thomas cruise-day starting points for a simple shore plan: shopping close to the dock, Charlotte Amalie movement, nearby culture stops, beach routes, or one confirmed tour.",
    essentials: [
      { title: "Start with all-aboard", body: "Use your cruise line as the authority for docking, all-aboard time, and ship-specific instructions. Build the day backward from that time." },
      { title: "Keep the route compact", body: "Havensight can support a nearby shopping-and-food loop, a Charlotte Amalie route, a beach move, or one tour. Avoid stacking too many stops." },
      { title: "Confirm pickup and return", body: "For tours, taxis, and beaches, confirm the exact meeting point, duration, cancellation policy, and return transport directly with the provider." },
    ],
    moves: [
      { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule", description: "Review scheduled capacity as planning context, not a live crowd count." },
      { href: "/st-thomas/magens-bay", label: "Magens Bay beach move", description: "Check whether the beach fits your port-day clock and return buffer." },
      { href: "/st-thomas/indulgent-dining", label: "Food near the flow", description: "Browse published dining profiles and confirm hours directly." },
      { href: "/experiences/culture", label: "Culture stops", description: "Use walkable history, makers, and town context as a lighter port-day route." },
    ],
    faq: [
      { question: "Does VibeVI know my exact Havensight all-aboard time?", answer: "No. Confirm all-aboard time and ship instructions with your cruise line." },
      { question: "Is scheduled capacity the same as actual crowds?", answer: "No. Scheduled capacity is planning context only and is not an actual passenger count." },
    ],
  },
  "crown-bay": {
    path: "/st-thomas/crown-bay-cruise-day",
    eyebrow: "Crown Bay cruise-day guide",
    title: "Crown Bay Cruise Day Guide",
    description:
      "Plan a Crown Bay cruise day in St. Thomas around pickup points, beach routes, Water Island caution, food, shopping, and a conservative ship-return buffer.",
    portName: "Crown Bay",
    introduction:
      "Crown Bay cruise days reward a little extra transport thinking. Choose one main move: a beach, a St. Thomas tour, a food route, local shopping, or a very conservative Water Island ferry hop if timing truly works.",
    essentials: [
      { title: "Confirm the pickup point", body: "Crown Bay meeting points can make or break a short day. Confirm where the provider or taxi will meet you before leaving the port area." },
      { title: "Treat Water Island carefully", body: "The ferry hop can be tempting, but only use it when ferry operation, beach time, and return margin are conservative and confirmed directly." },
      { title: "Protect the final hour", body: "Leave room for traffic, queues, weather, and ship instructions. VibeVI cannot guarantee return timing." },
    ],
    moves: [
      { href: "/water-island/day-trip", label: "Water Island day-trip context", description: "Use only with confirmed ferry timing and conservative ship-return margin." },
      { href: "/water-island/ferry-schedule", label: "Water Island ferry board", description: "Review schedule-based route context and confirm directly before travel." },
      { href: "/st-thomas/excursions-charters", label: "St. Thomas tours", description: "Browse published profiles and confirm pickup, duration, and return transport." },
      { href: "/st-thomas/local-provisions", label: "Local shops and provisions", description: "Find useful published stops without assuming live inventory." },
    ],
    faq: [
      { question: "Is Water Island safe to plan on a cruise day?", answer: "It can fit only when ferry operation, return timing, transport, and all-aboard buffer are conservative and confirmed directly. VibeVI does not guarantee return timing." },
      { question: "Does VibeVI show live Crown Bay traffic?", answer: "No. VibeVI does not show live port crowds, live traffic, or actual passenger counts." },
    ],
  },
} as const satisfies Record<string, CruisePortGuide>;

export function cruisePortGuideMetadata(guide: CruisePortGuide): Metadata {
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}${guide.path}`;

  return {
    title: `${guide.title} | VibeVI`,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: `${guide.title} | VibeVI`,
      description: guide.description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | VibeVI`,
      description: guide.description,
    },
    robots: { index: true, follow: true },
  };
}
