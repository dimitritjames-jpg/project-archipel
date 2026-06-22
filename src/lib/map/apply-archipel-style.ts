import type { GeoJSONSource, Map as MapboxMap } from "mapbox-gl";
import {
  ARCHIPEL_MAP_LAYERS,
  ARCHIPEL_MAP_PALETTE,
} from "@/lib/map/usvi-map";
import { ISLAND_POI_SEED } from "@/lib/map/island-poi-seed";

function applyStudioLayerPaints(map: MapboxMap): boolean {
  const { water, land, topography, roads } = ARCHIPEL_MAP_LAYERS;
  if (!map.getLayer(water)) return false;

  map.setPaintProperty(water, "fill-color", ARCHIPEL_MAP_PALETTE.water);
  map.setPaintProperty(water, "fill-opacity", 1);

  if (map.getLayer(land)) {
    map.setPaintProperty(land, "fill-color", ARCHIPEL_MAP_PALETTE.land);
    map.setPaintProperty(land, "fill-opacity", 1);
  }

  if (map.getLayer(topography)) {
    map.setPaintProperty(topography, "line-color", ARCHIPEL_MAP_PALETTE.topography);
    map.setPaintProperty(topography, "line-opacity", 0.72);
  }

  if (map.getLayer(roads)) {
    map.setPaintProperty(roads, "line-color", ARCHIPEL_MAP_PALETTE.roads);
    map.setPaintProperty(roads, "line-opacity", 0.6);
  }

  return true;
}

function applyFallbackPalette(map: MapboxMap): void {
  const style = map.getStyle();
  if (!style?.layers) return;

  if (map.getLayer("background")) {
    map.setPaintProperty(
      "background",
      "background-color",
      ARCHIPEL_MAP_PALETTE.water,
    );
  }

  for (const layer of style.layers) {
    const id = layer.id.toLowerCase();

    if (layer.type === "fill" && id.includes("water")) {
      map.setPaintProperty(layer.id, "fill-color", ARCHIPEL_MAP_PALETTE.water);
      map.setPaintProperty(layer.id, "fill-opacity", 1);
    }

    if (
      layer.type === "fill" &&
      (id.includes("land") || id.includes("landcover") || id.includes("landuse"))
    ) {
      try {
        map.setPaintProperty(layer.id, "fill-color", ARCHIPEL_MAP_PALETTE.land);
        map.setPaintProperty(layer.id, "fill-opacity", 1);
      } catch {
        // Some composite fills do not accept overrides.
      }
    }

    if (layer.type === "line" && id.includes("road")) {
      try {
        map.setPaintProperty(layer.id, "line-color", ARCHIPEL_MAP_PALETTE.roads);
        map.setPaintProperty(layer.id, "line-opacity", 0.6);
      } catch {
        // Ignore unsupported road layers.
      }
    }
  }
}

function addBusinessMarkers(map: MapboxMap): void {
  const sourceId = ARCHIPEL_MAP_LAYERS.businessSource;
  const layerId = ARCHIPEL_MAP_LAYERS.businessMarkers;

  if (map.getSource(sourceId)) {
    (map.getSource(sourceId) as GeoJSONSource).setData(ISLAND_POI_SEED);
    return;
  }

  map.addSource(sourceId, {
    type: "geojson",
    data: ISLAND_POI_SEED,
    cluster: true,
    clusterRadius: 44,
    clusterMaxZoom: 13,
  });

  map.addLayer({
    id: `${layerId}-clusters`,
    type: "circle",
    source: sourceId,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": ARCHIPEL_MAP_PALETTE.markerActive,
      "circle-radius": ["step", ["get", "point_count"], 16, 4, 20],
      "circle-stroke-color": ARCHIPEL_MAP_PALETTE.water,
      "circle-stroke-width": 2,
    },
  });

  map.addLayer({
    id: layerId,
    type: "circle",
    source: sourceId,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": [
        "case",
        ["boolean", ["get", "premium"], false],
        ARCHIPEL_MAP_PALETTE.markerPremium,
        ["boolean", ["get", "active"], false],
        ARCHIPEL_MAP_PALETTE.markerActive,
        ARCHIPEL_MAP_PALETTE.markerInactive,
      ],
      "circle-radius": [
        "case",
        ["boolean", ["get", "selected"], false],
        10,
        7,
      ],
      "circle-stroke-color": [
        "case",
        ["boolean", ["get", "selected"], false],
        ARCHIPEL_MAP_PALETTE.markerSelectedStroke,
        ARCHIPEL_MAP_PALETTE.water,
      ],
      "circle-stroke-width": [
        "case",
        ["boolean", ["get", "selected"], false],
        3,
        1.5,
      ],
    },
  });
}

export function applyArchipelStyle(map: MapboxMap): void {
  const hasStudioLayers = applyStudioLayerPaints(map);
  if (!hasStudioLayers) {
    applyFallbackPalette(map);
  }
  addBusinessMarkers(map);
}
