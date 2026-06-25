"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
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
      "mapbox://styles/mapbox/light-v11"
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
        className={`relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-[#0b4b55]/10 bg-[#e9fbf7] p-8 text-center ${className ?? ""}`}
        style={{ height }}
        role="img"
        aria-label="Island map preview; interactive Mapbox view is not configured"
      >
        <div className="relative max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#0797a6]/25 bg-white">
            <span className="relative h-8 w-8 rounded-full border border-[#0797a6]/30">
              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#0797a6]" />
              <span className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-[#ff7968]" />
            </span>
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]">Island map preview</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#173941]">
            See the islands as one connected day.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#496871]">
            Find what&apos;s nearby, then follow the water, road, or ferry. Search
            and island pages are available while the full interactive view is prepared.
          </p>
          <Link
            href="/search"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#0b4b55] px-5 text-sm font-bold text-white"
          >
            Find a place
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[#0b4b55]/10 ${className ?? ""}`}
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
