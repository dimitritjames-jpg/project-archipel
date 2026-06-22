"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const DirectoryMap = dynamic(
  () => import("@/components/map/DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="signal-grid h-[min(64vh,600px)] min-h-[380px] animate-pulse bg-[#0A192F]/80"
        aria-label="Loading island map"
      />
    ),
  },
);

const legend = [
  ["bg-aqua", "Published listing"],
  ["bg-coral", "Port utility"],
  ["bg-lime", "Island portal"],
] as const;

export function DirectoryMapSection({
  topOverlay,
  bottomOverlay,
}: {
  topOverlay?: ReactNode;
  bottomOverlay?: ReactNode;
}) {
  return (
    <section className="command-surface overflow-hidden rounded-[1.7rem]" aria-label="Archipelago radar map">
      <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-aqua/20 bg-aqua/7">
            <span className="absolute h-5 w-5 animate-radar-pulse rounded-full border border-aqua/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_12px_#37ead9]" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/65">Radar / VI</p>
            <p className="mt-0.5 text-xs text-archipel-white/45">St. Thomas to St. Croix</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {legend.map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-[10px] text-archipel-white/45">
              <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-[min(64vh,600px)]">
        {topOverlay ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-end p-3 sm:p-4">
            {topOverlay}
          </div>
        ) : null}
        {bottomOverlay ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-start p-3 sm:p-4">
            {bottomOverlay}
          </div>
        ) : null}
        <DirectoryMap height="min(64vh, 600px)" className="!rounded-none !border-0" />
      </div>

      <div className="flex flex-col gap-2 border-t border-white/8 px-5 py-4 text-[11px] text-archipel-white/38 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Map presentation is functional when a Mapbox token is configured.</p>
        <p>List view remains the accessible discovery source.</p>
      </div>
    </section>
  );
}
