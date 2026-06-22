"use client";

import { useCallback, useMemo } from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getMapboxAccessToken } from "@/lib/env";
import { applyArchipelStyle } from "@/lib/map/apply-archipel-style";
import { USVI_MAP } from "@/lib/map/usvi-map";

type DirectoryMapProps = {
  className?: string;
  height?: number | string;
};

function getFitPadding(): number {
  if (typeof window === "undefined") return 64;
  return window.innerWidth < 640 ? 24 : 64;
}

export function DirectoryMap({ className, height = 480 }: DirectoryMapProps) {
  const token = getMapboxAccessToken();

  const mapStyle = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ??
      "mapbox://styles/mapbox/dark-v11"
    );
  }, []);

  const onLoad = useCallback((event: { target: MapboxMap }) => {
    const map = event.target;
    applyArchipelStyle(map);
    map.fitBounds(USVI_MAP.contentBounds, {
      padding: getFitPadding(),
      duration: 0,
    });
  }, []);

  if (!token) {
    return (
      <div
        className={`flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-[#0A192F] p-8 text-center text-sm text-archipel-white/70 ${className ?? ""}`}
        style={{ height }}
        role="img"
        aria-label="Map unavailable"
      >
        Map unavailable — set{" "}
        <code className="mx-1 text-archipel-white">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code>{" "}
        in <code className="mx-1 text-archipel-white">.env.local</code>.
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 ${className ?? ""}`}
      style={{ height, width: "100%" }}
    >
      <Map
        mapboxAccessToken={token}
        mapStyle={mapStyle}
        initialViewState={{
          longitude: USVI_MAP.center[0],
          latitude: USVI_MAP.center[1],
          zoom: USVI_MAP.initialZoom,
        }}
        minZoom={USVI_MAP.minZoom}
        maxZoom={USVI_MAP.maxZoom}
        maxBounds={USVI_MAP.maxBounds}
        onLoad={onLoad}
        style={{ width: "100%", height: "100%" }}
        attributionControl
        cooperativeGestures
      >
        <NavigationControl position="top-right" showCompass={false} />
      </Map>
    </div>
  );
}
