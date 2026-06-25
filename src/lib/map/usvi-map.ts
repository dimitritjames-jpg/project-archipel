/** Mapbox GL uses [longitude, latitude]. Center supplied as [18.33, -64.90] (lat, lng). */
export const USVI_MAP = {
  center: [-64.9, 18.33] as [number, number],
  initialZoom: 8.25,
  minZoom: 7.4,
  maxZoom: 18,

  /** West St. Thomas / Water Island through east St. Croix. */
  contentBounds: [
    [-65.12, 17.62],
    [-64.5, 18.46],
  ] as [[number, number], [number, number]],

  maxBounds: [
    [-65.25, 17.5],
    [-64.38, 18.56],
  ] as [[number, number], [number, number]],

  islandCenters: {
    STT: [-64.9307, 18.3419],
    WI: [-64.9535, 18.3181],
    STJ: [-64.7354, 18.3358],
    STX: [-64.7505, 17.7246],
  } satisfies Record<string, [number, number]>,
} as const;

export const ARCHIPEL_MAP_PALETTE = {
  water: "#9ed4e8",
  land: "#e8dcc8",
  topography: "#c4b8a0",
  roads: "#8a9a94",
  markerActive: "#0797a6",
  markerPremium: "#ff7968",
  markerInactive: "#94a8ad",
  markerSelectedStroke: "#0b4b55",
} as const;

export const ARCHIPEL_MAP_LAYERS = {
  water: "archipel-water",
  land: "archipel-land",
  topography: "archipel-topography",
  roads: "archipel-roads",
  businessSource: "archipel-businesses",
  businessMarkers: "archipel-business-markers",
} as const;
