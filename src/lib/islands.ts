export const ISLAND_CODES = ["STT", "STX", "STJ", "WI"] as const;
export type IslandCode = (typeof ISLAND_CODES)[number];

export const ISLAND_SLUGS = [
  "st-thomas",
  "st-croix",
  "st-john",
  "water-island",
] as const;
export type IslandSlug = (typeof ISLAND_SLUGS)[number];

export const ISLAND_MAP: Record<
  IslandSlug,
  { code: IslandCode; name: string; center: [number, number] }
> = {
  "st-thomas": { code: "STT", name: "St. Thomas", center: [-64.93, 18.34] },
  "st-croix": { code: "STX", name: "St. Croix", center: [-64.75, 17.73] },
  "st-john": { code: "STJ", name: "St. John", center: [-64.79, 18.33] },
  "water-island": {
    code: "WI",
    name: "Water Island",
    center: [-64.96, 18.32],
  },
};

export const CODE_TO_SLUG: Record<IslandCode, IslandSlug> = {
  STT: "st-thomas",
  STX: "st-croix",
  STJ: "st-john",
  WI: "water-island",
};

export const RESERVED_ISLAND_ROUTES = [
  "ferry-schedule",
  "cruise-schedule",
  "magens-bay",
  "snorkeling-charters",
  "buck-island",
  "virgin-islands-national-park",
  "things-to-do",
  "beaches",
  "best-snorkeling",
  "cruise-day",
  "day-trip",
] as const;

export function isIslandSlug(value: string): value is IslandSlug {
  return (ISLAND_SLUGS as readonly string[]).includes(value);
}

export function getIslandBySlug(slug: string) {
  if (!isIslandSlug(slug)) return null;
  return ISLAND_MAP[slug];
}

export function getIslandName(slug: IslandSlug): string {
  return ISLAND_MAP[slug].name;
}
