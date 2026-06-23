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
        className={`topographic-field signal-grid relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07182c] p-8 text-center ${className ?? ""}`}
        style={{ height }}
        role="img"
        aria-label="Island map preview; interactive Mapbox view is not configured"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(55,234,217,0.14),transparent_42%)]" />
        <div className="relative max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-aqua/20 bg-aqua/7">
            <span className="relative h-8 w-8 rounded-full border border-aqua/25">
              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-aqua shadow-[0_0_12px_#37ead9]" />
              <span className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-coral shadow-[0_0_10px_#ff7968]" />
            </span>
          </span>
          <p className="eyebrow-label mt-6">Island map preview</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-archipel-white">
            See the islands as one connected day.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-archipel-white/55">
            Find what&apos;s nearby, then follow the water, road, or ferry. Search
            and island pages are available while the full interactive view is prepared.
          </p>
          <Link
            href="/search"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-aqua px-5 text-sm font-bold text-midnight-950 transition hover:bg-[#78f7eb]"
          >
            Find a place
          </Link>
        </div>
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
