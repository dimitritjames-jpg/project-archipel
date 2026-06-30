import {
  canShowDirectContact,
  getListingTrustState,
} from "@/lib/businesses/listing-trust";
import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_GUIDES, USVI_GUIDES } from "@/lib/guides";
import { ISLAND_MAP, ISLAND_SLUGS, type IslandSlug } from "@/lib/islands";
import {
  FERRY_ROUTE_GUIDES,
  type FerryRouteGuide,
} from "@/lib/transit/ferry-routes";
import { ST_THOMAS_CRUISE_PORT_GUIDES } from "@/lib/transit/cruise-port-guides";

export const MOBILE_CATALOG_VERSION = "1.0";

export type MobileIsland = {
  id: IslandSlug;
  name: string;
  slug: IslandSlug;
  tagline?: string;
  description?: string;
};

export type MobileCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
};

export type MobileListing = {
  id: string;
  name: string;
  slug: string;
  island: string;
  islandSlug: string;
  category: string;
  categorySlug: string;
  shortDescription?: string;
  description?: string;
  area?: string;
  address?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  tags?: string[];
  vibeTags?: string[];
  sourceUrl?: string;
  verificationStatus?: "verified" | "public-info" | "needs-confirmation";
  sponsorStatus?: "none" | "sponsored" | "partner";
  imageUrl?: string;
  imageAlt?: string;
  latitude?: number;
  longitude?: number;
  lastUpdated?: string;
};

export type MobileGuide = {
  id: string;
  title: string;
  slug: string;
  href: string;
  islandSlug?: string;
  categorySlug?: string;
  summary?: string;
  tags?: string[];
};

export type MobileUtilitySection = {
  id: string;
  title: string;
  islandSlug?: string;
  body: string;
  links?: {
    label: string;
    href: string;
  }[];
  sourceLabel?: string;
  sourceUrl?: string;
};

export type VibeVIMobileCatalogFeed = {
  version: string;
  generatedAt: string;
  source: "myvibevi.com";
  islands: MobileIsland[];
  categories: MobileCategory[];
  listings: MobileListing[];
  guides: MobileGuide[];
  utility: {
    cruiseDay?: MobileUtilitySection[];
    airportArrival?: MobileUtilitySection[];
    transportation?: MobileUtilitySection[];
    emergency?: MobileUtilitySection[];
  };
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  beaches:
    "Source-backed beach listings and shoreline anchors across the U.S. Virgin Islands.",
  "excursions-charters":
    "Published excursion and charter operators. Confirm availability, pickup, and inclusions directly.",
  "indulgent-dining":
    "Published dining listings for tables worth planning around. Confirm hours and reservations directly.",
  "boutique-stays":
    "Published stay listings for villas, inns, and boutique hospitality context.",
  "nightlife-rhythm":
    "Published nightlife and evening rhythm listings. Confirm current programming and opening hours directly.",
  "wellness-spas":
    "Published wellness and spa listings. Confirm services and appointment availability directly.",
  "local-provisions":
    "Published local shops and provisions listings. Do not assume live inventory.",
};

const CATEGORY_ICONS: Record<string, string> = {
  beaches: "beach",
  "excursions-charters": "boat",
  "indulgent-dining": "food",
  "boutique-stays": "hotel",
  "nightlife-rhythm": "moon",
  "wellness-spas": "leaf",
  "local-provisions": "shop",
};

const ISLAND_GUIDE_LOOKUP: Partial<Record<IslandSlug, string>> = {
  "st-thomas": "st-thomas/things-to-do",
  "st-croix": "st-croix/things-to-do",
  "st-john": "st-john/things-to-do",
  "water-island": "water-island/day-trip",
};

function findInstagram(urls: string[]): string | undefined {
  return urls.find((value) => /instagram\.com/i.test(value));
}

function toVerificationStatus(
  listing: (typeof PUBLIC_INFO_BUSINESSES)[number],
): "verified" | "public-info" | "needs-confirmation" {
  const trustState = getListingTrustState(listing);
  if (trustState === "verified" || trustState === "verified_claimed") {
    return "verified";
  }
  if (trustState === "public_info") {
    return "public-info";
  }
  return "needs-confirmation";
}

function buildIslands(): MobileIsland[] {
  return ISLAND_SLUGS.map((slug) => {
    const guideKey = ISLAND_GUIDE_LOOKUP[slug];
    const guide = guideKey
      ? ISLAND_GUIDES[guideKey] ?? USVI_GUIDES[guideKey]
      : undefined;

    return {
      id: slug,
      slug,
      name: ISLAND_MAP[slug].name,
      tagline: guide?.title,
      description: guide?.description ?? guide?.introduction,
    };
  });
}

function buildCategories(): MobileCategory[] {
  const publicInfoCategories: MobileCategory[] = [
    {
      id: "beaches",
      slug: "beaches",
      name: "Beaches",
      description: CATEGORY_DESCRIPTIONS.beaches,
      icon: CATEGORY_ICONS.beaches,
    },
    ...CORE_CATEGORIES.map((category) => ({
      id: category.slug,
      slug: category.slug,
      name: category.name,
      description: CATEGORY_DESCRIPTIONS[category.slug],
      icon: CATEGORY_ICONS[category.slug],
    })),
  ];

  return publicInfoCategories;
}

function buildListings(): MobileListing[] {
  return PUBLIC_INFO_BUSINESSES.filter((listing) => !listing.is_demo).map(
    (listing) => {
      const islandSlug = ISLAND_SLUGS.find(
        (slug) => ISLAND_MAP[slug].code === listing.island,
      );
      const socialUrls = listing.same_as ?? [];

      return {
        id: listing.id,
        name: listing.name,
        slug: listing.slug,
        island: listing.island,
        islandSlug: islandSlug ?? "st-thomas",
        category: listing.category?.slug ?? "directory",
        categorySlug: listing.category?.slug ?? "directory",
        shortDescription: listing.description_plain,
        description: listing.description_plain,
        area: listing.address_locality ?? listing.street_address ?? undefined,
        address: listing.street_address ?? undefined,
        phone: canShowDirectContact(listing) ? listing.phone ?? undefined : undefined,
        website: listing.website_url ?? undefined,
        instagram: findInstagram(socialUrls),
        tags: listing.category?.slug ? [listing.category.slug] : [],
        vibeTags: [],
        sourceUrl:
          listing.verification_source ??
          listing.source_urls?.[0] ??
          listing.website_url ??
          undefined,
        verificationStatus: toVerificationStatus(listing),
        sponsorStatus:
          listing.partner_status && listing.partner_status !== "none"
            ? "partner"
            : "none",
        lastUpdated: listing.last_verified_at ?? listing.published_at ?? undefined,
      };
    },
  );
}

function guideIdFromHref(href: string) {
  return href.replace(/^\/+/, "").replace(/[/?#]+/g, "-") || "home";
}

function buildGuides(): MobileGuide[] {
  const islandGuides = Object.values(ISLAND_GUIDES).map((guide) => ({
    id: `guide-${guideIdFromHref(guide.path)}`,
    title: guide.title,
    slug: guide.path.replace(/^\/+/, ""),
    href: guide.path,
    islandSlug:
      ISLAND_SLUGS.find((slug) => guide.path.startsWith(`/${slug}/`)) ?? undefined,
    summary: guide.description,
    tags: ["guide"],
  }));

  const usviGuides = Object.values(USVI_GUIDES).map((guide) => ({
    id: `guide-${guideIdFromHref(guide.path)}`,
    title: guide.title,
    slug: guide.path.replace(/^\/+/, ""),
    href: guide.path,
    summary: guide.description,
    tags: ["guide"],
  }));

  const ferryGuides = FERRY_ROUTE_GUIDES.map((guide) => ({
    id: `guide-ferry-${guide.slug}`,
    title: guide.plainTitle,
    slug: guide.slug,
    href: `/ferry/${guide.slug}`,
    summary: guide.note,
    tags: ["ferry", "transportation", guide.sourceStatus],
  }));

  return [...islandGuides, ...usviGuides, ...ferryGuides];
}

function utilityLinks(
  links: { href: string; label: string }[],
): { label: string; href: string }[] {
  return links.map((link) => ({ label: link.label, href: link.href }));
}

function ferryGuideToUtilitySection(guide: FerryRouteGuide): MobileUtilitySection {
  return {
    id: `transport-${guide.slug}`,
    title: guide.plainTitle,
    body: [guide.note, guide.islandDayUse, ...guide.faq.map((item) => item.answer)].join(
      " ",
    ),
    links: utilityLinks(guide.relatedLinks),
    sourceLabel:
      guide.sourceStatus === "source-backed"
        ? "VibeVI ferry route guide"
        : "VibeVI guide-only route",
    sourceUrl: `/ferry/${guide.slug}`,
  };
}

function buildUtility(): VibeVIMobileCatalogFeed["utility"] {
  return {
    cruiseDay: [
      {
        id: "cruise-day-st-thomas",
        islandSlug: "st-thomas",
        title: ISLAND_GUIDES["st-thomas/cruise-day"].title,
        body: [
          ISLAND_GUIDES["st-thomas/cruise-day"].introduction,
          ...ISLAND_GUIDES["st-thomas/cruise-day"].essentials.map(
            (item) => `${item.title}: ${item.body}`,
          ),
        ].join(" "),
        links: utilityLinks(ISLAND_GUIDES["st-thomas/cruise-day"].related),
        sourceLabel: "VibeVI cruise-day guide",
        sourceUrl: ISLAND_GUIDES["st-thomas/cruise-day"].path,
      },
      {
        id: "cruise-day-havensight",
        islandSlug: "st-thomas",
        title: ST_THOMAS_CRUISE_PORT_GUIDES.havensight.title,
        body: [
          ST_THOMAS_CRUISE_PORT_GUIDES.havensight.introduction,
          ...ST_THOMAS_CRUISE_PORT_GUIDES.havensight.essentials.map(
            (item) => `${item.title}: ${item.body}`,
          ),
        ].join(" "),
        links: utilityLinks(ST_THOMAS_CRUISE_PORT_GUIDES.havensight.moves),
        sourceLabel: "VibeVI cruise port guide",
        sourceUrl: ST_THOMAS_CRUISE_PORT_GUIDES.havensight.path,
      },
      {
        id: "cruise-day-crown-bay",
        islandSlug: "st-thomas",
        title: ST_THOMAS_CRUISE_PORT_GUIDES["crown-bay"].title,
        body: [
          ST_THOMAS_CRUISE_PORT_GUIDES["crown-bay"].introduction,
          ...ST_THOMAS_CRUISE_PORT_GUIDES["crown-bay"].essentials.map(
            (item) => `${item.title}: ${item.body}`,
          ),
        ].join(" "),
        links: utilityLinks(ST_THOMAS_CRUISE_PORT_GUIDES["crown-bay"].moves),
        sourceLabel: "VibeVI cruise port guide",
        sourceUrl: ST_THOMAS_CRUISE_PORT_GUIDES["crown-bay"].path,
      },
    ],
    airportArrival: [],
    transportation: FERRY_ROUTE_GUIDES.map(ferryGuideToUtilitySection),
    emergency: [],
  };
}

export function buildMobileCatalogFeed(): VibeVIMobileCatalogFeed {
  return {
    version: MOBILE_CATALOG_VERSION,
    generatedAt: new Date().toISOString(),
    source: "myvibevi.com",
    islands: buildIslands(),
    categories: buildCategories(),
    listings: buildListings(),
    guides: buildGuides(),
    utility: buildUtility(),
  };
}
