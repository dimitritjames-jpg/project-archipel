import { ISLAND_MAP, ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";
import {
  detectSearchPlanningIntent,
  normalizeSearchText,
  resolveSearchIsland,
  type SearchPlanningIntent,
} from "@/lib/search/query-expansion";

export type IslandPlanningChoice = {
  islandSlug: IslandSlug;
  islandName: string;
  href: string;
  label: string;
  note: string;
  limited?: boolean;
  current?: boolean;
};

export type IslandPlanningChooser = {
  intent: SearchPlanningIntent;
  title: string;
  description: string;
  choices: IslandPlanningChoice[];
};

const INTENT_COPY: Record<
  SearchPlanningIntent,
  { title: string; description: string }
> = {
  boat: {
    title: "Planning a boat day? Pick the island next.",
    description:
      "Boat and charter inventory changes by island. Choose the shore first, then compare the operators that actually fit that water day.",
  },
  beach: {
    title: "Planning a beach day? Pick the island next.",
    description:
      "Beach access, ferry time, and coastline style shift fast across the USVI. Choose the island first so the sand options stay useful.",
  },
  food: {
    title: "Planning the bite? Pick the island next.",
    description:
      "Waterfront dining, local plates, and boardwalk energy all land differently by island. Choose the island first, then narrow the table list.",
  },
  nightlife: {
    title: "Planning the night? Pick the island next.",
    description:
      "Late-night energy is island-specific. Choose the island first so the bars, music, and harbor rhythm stay local instead of scattered.",
  },
  attractions: {
    title: "Planning the attraction stop? Pick the island next.",
    description:
      "Family anchors, cruise-day stops, and fixed attractions work better when they stay tied to one island instead of a mixed-island result list.",
  },
  culture: {
    title: "Planning culture and history? Pick the island next.",
    description:
      "Museums, forts, heritage stops, and story routes are easier to compare once the island is fixed.",
  },
  wellness: {
    title: "Planning a reset? Pick the island next.",
    description:
      "Spa and wellness coverage is strongest when the island comes first, especially if you are building around one harbor or beach base.",
  },
  stays: {
    title: "Planning where to stay? Pick the island next.",
    description:
      "Choose the island first, then compare boutique stays without mixing very different shorelines and town rhythms.",
  },
  "local-shops": {
    title: "Planning local shops? Pick the island next.",
    description:
      "Markets, provisions, makers, and practical stops are easier to browse when the island is set first.",
  },
  family: {
    title: "Planning a family day? Pick the island next.",
    description:
      "Family-safe routes change by island. Start with the shore, then open the beaches, attractions, and easier day plans that match it.",
  },
  "rainy-day": {
    title: "Planning a rainy-day backup? Pick the island next.",
    description:
      "Culture stops, indoor-flex anchors, and weather-proof routes are stronger when they stay inside one island.",
  },
};

function buildSearchHref(query: string) {
  return `/search?q=${encodeURIComponent(query)}`;
}

const BOAT_ISLAND_QUERIES: Record<IslandSlug, string> = {
  "st-thomas": "boat st thomas",
  "st-croix": "boat st croix",
  "st-john": "boat st john",
  "water-island": "boat water island",
};

function buildChoice(
  intent: SearchPlanningIntent,
  islandSlug: IslandSlug,
): IslandPlanningChoice {
  const islandName = ISLAND_MAP[islandSlug].name;

  switch (intent) {
    case "boat":
      if (islandSlug === "water-island") {
        return {
          islandSlug,
          islandName,
          href: buildSearchHref("boat water island"),
          label: "Limited public-info boat listings yet",
          note: "Use Water Island as a slower ferry-hop beach day. Expand to broader charter results if you need a full operator set.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href: buildSearchHref(BOAT_ISLAND_QUERIES[islandSlug]),
        label: `${islandName} boat options`,
        note: "See island-specific charter, sail, snorkel-boat, and operator-first results.",
      };
    case "beach":
      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/beaches`,
        label: `${islandName} beaches`,
        note: "Browse beach access, sand style, and shoreline context for this island only.",
      };
    case "food":
      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/indulgent-dining`,
        label: `${islandName} food`,
        note: "Open island-specific dining, waterfront tables, and local plate options.",
      };
    case "nightlife":
      return {
        islandSlug,
        islandName,
        href:
          islandSlug === "water-island"
            ? "/water-island/day-trip"
            : `/${islandSlug}/nightlife-rhythm`,
        label:
          islandSlug === "water-island"
            ? "Water Island evening context"
            : `${islandName} nightlife`,
        note:
          islandSlug === "water-island"
            ? "Night options stay limited and ferry-aware. Start with the day-trip route before widening."
            : "Open island-specific bars, music, boardwalk, and late-night routes.",
        limited: islandSlug === "water-island",
      };
    case "attractions":
      if (islandSlug === "st-john") {
        return {
          islandSlug,
          islandName,
          href: "/st-john/things-to-do",
          label: "St. John things to do",
          note: "Use the island guide instead of forcing a thin attraction-only page.",
          limited: true,
        };
      }

      if (islandSlug === "water-island") {
        return {
          islandSlug,
          islandName,
          href: "/water-island/day-trip",
          label: "Water Island day-trip guide",
          note: "Fort Segarra and slower island stops work better through the day-trip route than a thin attraction browse page.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/attractions`,
        label: `${islandName} attractions`,
        note: "Open island-specific attractions, family anchors, and fixed stops.",
      };
    case "culture":
      if (islandSlug === "st-john") {
        return {
          islandSlug,
          islandName,
          href: "/st-john/things-to-do",
          label: "St. John island guide",
          note: "Use the guide while culture-history inventory stays thin on St. John.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href:
          islandSlug === "water-island"
            ? "/water-island/culture-history"
            : `/${islandSlug}/culture-history`,
        label: `${islandName} culture & history`,
        note: "Open island-specific museums, forts, ruins, and heritage stops.",
      };
    case "wellness":
      if (islandSlug === "water-island") {
        return {
          islandSlug,
          islandName,
          href: buildSearchHref("wellness water island"),
          label: "Limited Water Island wellness listings",
          note: "Public-info wellness coverage is still thin here. Try broader island results if you need more options.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/wellness-spas`,
        label: `${islandName} wellness`,
        note: "Open island-specific spas and slower reset options.",
      };
    case "stays":
      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/boutique-stays`,
        label: `${islandName} stays`,
        note: "Open island-specific boutique stays and slower basecamp options.",
      };
    case "local-shops":
      return {
        islandSlug,
        islandName,
        href: `/${islandSlug}/local-provisions`,
        label: `${islandName} local shops`,
        note: "Browse markets, provisions, galleries, and useful island stops.",
      };
    case "family":
      if (islandSlug === "water-island") {
        return {
          islandSlug,
          islandName,
          href: "/water-island/day-trip",
          label: "Water Island day trip",
          note: "Use the ferry-first guide for a simple, family-safe day with an honest return buffer.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href:
          islandSlug === "st-john"
            ? "/st-john/things-to-do"
            : islandSlug === "st-croix"
              ? "/st-croix/attractions"
              : "/st-thomas/attractions",
        label:
          islandSlug === "st-john"
            ? "St. John things to do"
            : `${islandName} family-friendly stops`,
        note: "Start with the most family-useful island page instead of a mixed result list.",
      };
    case "rainy-day":
      if (islandSlug === "st-john") {
        return {
          islandSlug,
          islandName,
          href: "/st-john/things-to-do",
          label: "St. John backup-day guide",
          note: "Use the island guide while indoor-flex inventory stays thinner on St. John.",
          limited: true,
        };
      }

      return {
        islandSlug,
        islandName,
        href:
          islandSlug === "water-island"
            ? "/water-island/culture-history"
            : `/${islandSlug}/culture-history`,
        label: `${islandName} rainy-day anchors`,
        note: "Start with culture and fixed-stop routes that work better when the beach is off.",
      };
  }
}

export function getIslandPlanningChooser(
  query: string,
): IslandPlanningChooser | null {
  const normalized = normalizeSearchText(query);
  const intent = detectSearchPlanningIntent(normalized);
  if (!intent) {
    return null;
  }

  const currentIsland = resolveSearchIsland(normalized);
  const { title, description } = INTENT_COPY[intent];

  const choices = ISLAND_SLUGS.map((islandSlug) => {
    const choice = buildChoice(intent, islandSlug);
    return {
      ...choice,
      current: currentIsland === ISLAND_MAP[islandSlug].code,
    };
  });

  return {
    intent,
    title,
    description,
    choices,
  };
}
