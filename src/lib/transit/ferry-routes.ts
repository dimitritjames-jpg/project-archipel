import type { IslandSlug } from "@/lib/islands";
import { RED_HOOK_CRUZ_BAY_ROUTE_SLUG } from "@/lib/transit/countdown-math";

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
