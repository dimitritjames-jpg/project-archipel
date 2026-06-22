export type Geoloc = {
  lat: number;
  lng: number;
};

/**
 * Normalizes PostGIS / Supabase location payloads into Algolia `_geoloc`.
 * PostGIS stores geography(Point, 4326) as longitude-first coordinates.
 */
export function parseGeoloc(location: unknown): Geoloc | undefined {
  if (!location) {
    return undefined;
  }

  if (typeof location === "string") {
    const wktMatch = location.match(
      /POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i,
    );
    if (wktMatch) {
      return {
        lng: Number(wktMatch[1]),
        lat: Number(wktMatch[2]),
      };
    }

    try {
      return parseGeoloc(JSON.parse(location));
    } catch {
      return undefined;
    }
  }

  if (typeof location === "object" && location !== null) {
    const value = location as Record<string, unknown>;

    if (value.type === "Point" && Array.isArray(value.coordinates)) {
      const [lng, lat] = value.coordinates as number[];
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return { lat, lng };
      }
    }

    if (Array.isArray(value.coordinates) && value.coordinates.length >= 2) {
      const [lng, lat] = value.coordinates as number[];
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return { lat, lng };
      }
    }

    if (
      typeof value.lat === "number" &&
      typeof value.lng === "number" &&
      Number.isFinite(value.lat) &&
      Number.isFinite(value.lng)
    ) {
      return { lat: value.lat, lng: value.lng };
    }

    if (
      typeof value.latitude === "number" &&
      typeof value.longitude === "number"
    ) {
      return { lat: value.latitude, lng: value.longitude };
    }
  }

  return undefined;
}
