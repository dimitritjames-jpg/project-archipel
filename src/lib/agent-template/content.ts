import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import { CODE_TO_SLUG, ISLAND_MAP, ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset, ISLAND_PORTALS } from "@/lib/media";
import type {
  VibeAgentChip,
  VibeIslandCard,
  VibePopularQuery,
  VibeRecommendationCard,
} from "@/lib/agent-template/types";

export const DEFAULT_INTENT_CHIPS: readonly VibeAgentChip[] = [
  { label: "Beach", query: "beach", iconKey: "beach" },
  { label: "Boat", query: "boat", iconKey: "boat" },
  { label: "Bite", query: "bite", iconKey: "bite" },
  { label: "Night", query: "night", iconKey: "night" },
  { label: "Family", query: "family", iconKey: "family" },
  { label: "Romantic", query: "romantic", iconKey: "romantic" },
  { label: "Rainy Day", query: "rainy day", iconKey: "rainy" },
  { label: "Cruise Day", href: "/cruise-day", iconKey: "cruise" },
  { label: "Ferry", query: "ferry", iconKey: "ferry" },
  { label: "Local Shops", query: "local shops", iconKey: "shops" },
] as const;

export const DEFAULT_POPULAR_QUERIES: readonly VibePopularQuery[] = [
  { label: "beach near ferry", query: "ferry" },
  { label: "romantic dinner st thomas", query: "romantic" },
  { label: "things to do with kids", query: "family" },
  { label: "cruise day food", query: "cruise" },
] as const;

const RECOMMENDATION_SLUGS = [
  "magens-bay-authority",
  "dinghys-beach-bar-and-grill",
  "caribbean-blue-boat-charters",
  "virgin-islands-national-park",
  "the-beach-bar",
] as const;

function categoryBadge(
  categorySlug: string | undefined,
): VibeRecommendationCard["badge"] {
  switch (categorySlug) {
    case "excursions-charters":
      return "Experience";
    case "nightlife-rhythm":
      return "Nightlife";
    case "indulgent-dining":
      return "Local pick";
    case "wellness-spas":
      return "Popular";
    case "local-provisions":
      return "Guide";
    default:
      return "Popular";
  }
}

export function getAgentIslandCards(): VibeIslandCard[] {
  const featured: IslandSlug[] = ["st-thomas", "st-john", "st-croix"];

  return featured.map((slug) => {
    const portal = ISLAND_PORTALS[slug];
    return {
      slug,
      title: ISLAND_MAP[slug].name,
      subtitle: portal.tagline,
      href: `/${slug}`,
      imageSrc: portal.media.src ?? "",
      imageAlt: portal.media.alt,
    };
  });
}

export function getAgentRecommendations(): VibeRecommendationCard[] {
  const bySlug = new Map(PUBLIC_INFO_BUSINESSES.map((b) => [b.slug, b]));

  return RECOMMENDATION_SLUGS.flatMap((slug) => {
    const business = bySlug.get(slug);
    if (!business?.category) return [];

    const islandSlug = CODE_TO_SLUG[business.island];
    const categorySlug = business.category.slug;
    const media = getCategoryMediaAsset(categorySlug, business.category.name);

    return [
      {
        id: business.id,
        title: business.name,
        subtitle: `${business.category.name} · ${ISLAND_MAP[islandSlug].name}`,
        href: `/${islandSlug}/${categorySlug}/${business.slug}`,
        imageSrc: media.src ?? "",
        imageAlt: media.alt,
        badge: categoryBadge(categorySlug),
        trustLabel: business.public_info_listing ? "Public info" : undefined,
      },
    ];
  });
}

export const AGENT_NAV = {
  explore: [
    { href: "/search", label: "Find the move" },
    { href: "/map", label: "Map" },
    { href: "/guides/best-beaches-usvi", label: "Beach guide" },
  ],
  islands: ISLAND_SLUGS.map((slug) => ({
    href: `/${slug}`,
    label: ISLAND_MAP[slug].name,
  })),
  experiences: [
    { href: "/experiences/adventure", label: "Adventure" },
    { href: "/experiences/culinary", label: "Culinary" },
    { href: "/experiences/culture", label: "Culture" },
    { href: "/experiences/cruise-day", label: "Cruise day" },
    { href: "/experiences/nightlife", label: "Nightlife" },
    { href: "/experiences/wellness", label: "Wellness" },
  ],
  plan: [
    { href: "/ferry", label: "Ferry board" },
    { href: "/cruise-day", label: "Cruise-day guide" },
    { href: "/guides/best-beaches-usvi", label: "Best beaches" },
    { href: "/guides/usvi-charters", label: "Charter guide" },
  ],
  ferryCruise: [
    { href: "/ferry", label: "Ferry schedules" },
    { href: "/cruise-day", label: "Cruise-day planning" },
    { href: "/st-thomas/cruise-schedule", label: "St. Thomas cruise schedule" },
  ],
} as const;
