"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getMapboxAccessToken } from "@/lib/env";
import type { IslandCode } from "@/lib/islands";
import { applyArchipelStyle } from "@/lib/map/apply-archipel-style";
import { USVI_MAP } from "@/lib/map/usvi-map";

type DirectoryMapProps = {
  className?: string;
  height?: number | string;
};

const ISLAND_PREVIEW_LINKS: Array<{
  code: IslandCode;
  label: string;
  href: string;
  accent: string;
  mobileTransform: string;
}> = [
  {
    code: "STT",
    label: "St. Thomas",
    href: "/islands/st-thomas",
    accent: "bg-aqua",
    mobileTransform: "translate(calc(-100% - 0.4rem), calc(-100% - 0.5rem))",
  },
  {
    code: "WI",
    label: "Water Island",
    href: "/islands/water-island",
    accent: "bg-lime",
    mobileTransform: "translate(0.35rem, 0.3rem)",
  },
  {
    code: "STJ",
    label: "St. John",
    href: "/islands/st-john",
    accent: "bg-coral",
    mobileTransform: "translate(0.35rem, calc(-100% - 0.5rem))",
  },
  {
    code: "STX",
    label: "St. Croix",
    href: "/islands/st-croix",
    accent: "bg-aqua",
    mobileTransform: "translate(calc(-100% - 0.35rem), calc(-100% - 0.6rem))",
  },
] as const;

const MAP_PREVIEW_ACTIONS = [
  {
    href: "/search",
    label: "Search the directory",
    detail: "Look up beach, boat, bite, night, and island intent.",
  },
  {
    href: "/ferry",
    label: "Open ferry planning",
    detail: "Use schedule-based ferry context, not live vessel tracking.",
  },
  {
    href: "/cruise-day",
    label: "Plan a cruise day",
    detail: "Build around the port clock without guessing proximity.",
  },
] as const;

function getFitPadding(): number {
  if (typeof window === "undefined") return 64;
  return window.innerWidth < 640 ? 24 : 64;
}

function getPreviewPoint(code: IslandCode) {
  const [[minLng, minLat], [maxLng, maxLat]] = USVI_MAP.contentBounds;
  const [lng, lat] = USVI_MAP.islandCenters[code];

  return {
    x: ((lng - minLng) / (maxLng - minLng)) * 100,
    y: (1 - (lat - minLat) / (maxLat - minLat)) * 100,
  };
}

function StaticDirectoryMapPreview({
  className,
}: {
  className?: string;
}) {
  const previewPoints = useMemo(() => {
    return Object.fromEntries(
      (Object.keys(USVI_MAP.islandCenters) as IslandCode[]).map((code) => [
        code,
        getPreviewPoint(code),
      ]),
    ) as Record<IslandCode, { x: number; y: number }>;
  }, []);

  return (
    <div
      className={`topographic-field reef-grid relative min-h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#07182c] p-4 sm:min-h-[600px] sm:p-5 ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(55,234,217,0.12),transparent_30%),radial-gradient(circle_at_78%_26%,rgba(255,121,104,0.12),transparent_28%),radial-gradient(circle_at_58%_80%,rgba(168,255,120,0.08),transparent_24%)]" />

      <div className="relative flex h-full min-h-[340px] flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-[1.35rem] border border-white/10 bg-[#0b1b2f]/82 px-3 py-2.5 text-[11px] text-white/72 backdrop-blur">
          <span className="rounded-full border border-aqua/20 bg-aqua/8 px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-aqua">
            Beta map preview
          </span>
          <span>Static island orientation only. No live navigation, traffic, or availability.</span>
        </div>

        <div
          className="relative min-h-0 flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,#11304a_0%,#0b1d31_100%)]"
          aria-label="Static island planning map preview for St. Thomas, St. John, St. Croix, and Water Island"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="map-route" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#37ead9" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#ff7968" stopOpacity="0.68" />
              </linearGradient>
            </defs>

            <path
              d={`M ${previewPoints.WI.x} ${previewPoints.WI.y} Q ${(previewPoints.WI.x + previewPoints.STT.x) / 2 - 2} ${(previewPoints.WI.y + previewPoints.STT.y) / 2 - 4} ${previewPoints.STT.x} ${previewPoints.STT.y}`}
              fill="none"
              stroke="url(#map-route)"
              strokeWidth="0.6"
              strokeDasharray="1.6 1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d={`M ${previewPoints.STT.x} ${previewPoints.STT.y} Q ${(previewPoints.STT.x + previewPoints.STJ.x) / 2 + 4} ${(previewPoints.STT.y + previewPoints.STJ.y) / 2 - 8} ${previewPoints.STJ.x} ${previewPoints.STJ.y}`}
              fill="none"
              stroke="url(#map-route)"
              strokeWidth="0.6"
              strokeDasharray="1.6 1.6"
              strokeLinecap="round"
              opacity="0.9"
            />

            {(Object.keys(previewPoints) as IslandCode[]).map((code) => {
              const point = previewPoints[code];
              const isWaterIsland = code === "WI";

              return (
                <g key={code}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isWaterIsland ? 2.3 : 3.3}
                    fill="#37ead9"
                    opacity="0.22"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isWaterIsland ? 1.2 : 1.65}
                    fill={isWaterIsland ? "#a8ff78" : "#37ead9"}
                    stroke="#f7f4ea"
                    strokeWidth="0.35"
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0">
            {ISLAND_PREVIEW_LINKS.map((island) => {
              const point = previewPoints[island.code];

              return (
                <Link
                  key={island.code}
                  href={island.href}
                  aria-label={`Open the ${island.label} island hub`}
                  className="absolute rounded-full border border-white/65 bg-white/92 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#123840] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:border-aqua/35 hover:bg-white"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: island.mobileTransform,
                  }}
                >
                  {island.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {MAP_PREVIEW_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[1.25rem] border border-white/60 bg-white/92 px-4 py-3 text-left shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:border-aqua/30 hover:bg-white"
            >
              <span className="block text-sm font-semibold text-[#173941]">
                {action.label}
              </span>
              <span className="mt-1.5 block text-[11px] leading-5 text-[#45636a]">
                {action.detail}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
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
      <StaticDirectoryMapPreview className={className} />
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
