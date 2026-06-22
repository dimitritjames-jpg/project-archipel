import type { FeatureCollection, Point } from "geojson";
import { USVI_MAP } from "@/lib/map/usvi-map";

const ISLAND_LABELS: Record<keyof typeof USVI_MAP.islandCenters, string> = {
  STT: "St. Thomas",
  STX: "St. Croix",
  STJ: "St. John",
  WI: "Water Island",
};

/** Seed active POIs at island centers for the indigo canvas preview. */
export const ISLAND_POI_SEED: FeatureCollection<Point> = {
  type: "FeatureCollection",
  features: (
    Object.entries(USVI_MAP.islandCenters) as Array<
      [keyof typeof USVI_MAP.islandCenters, [number, number]]
    >
  ).map(([code, coordinates]) => ({
    type: "Feature",
    id: code,
    geometry: { type: "Point", coordinates },
    properties: {
      businessId: `seed-${code}`,
      slug: code.toLowerCase(),
      active: true,
      premium: false,
      selected: false,
      label: ISLAND_LABELS[code],
    },
  })),
};
