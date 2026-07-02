"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const DirectoryMap = dynamic(
  () => import("@/components/map/DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="reef-grid h-[min(64vh,600px)] min-h-[380px] animate-pulse bg-[#0A192F]/80"
        aria-label="Loading island map"
      />
    ),
  },
);

const legend = [
  ["bg-aqua", "Published listing"],
  ["bg-coral", "Ferry / port planning"],
  ["bg-lime", "Island hub"],
] as const;

export function DirectoryMapSection({
  topOverlay,
  bottomOverlay,
}: {
  topOverlay?: ReactNode;
  bottomOverlay?: ReactNode;
}) {
  return (
    <section className="island-postcard-card overflow-hidden rounded-[1.7rem] border border-sand/12 bg-[#05202b]" aria-label="Island map">
      <div className="flex flex-col gap-4 border-b border-sand/12 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-sand/20 bg-sand/7">
            <span className="text-sm" aria-hidden>🌊</span>
          </span>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/75">See the islands as one connected day</p>
            <p className="mt-0.5 text-xs text-archipel-white/50">Find what&apos;s nearby, then follow the water, road, or ferry.</p>
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

      <div className="flex flex-col gap-2 border-t border-white/8 px-5 py-4 text-[11px] leading-5 text-archipel-white/38 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>VibeVI uses the map as planning context, not live navigation, live traffic, or real-time availability.</p>
        <p>Use island hubs, search, ferry boards, and cruise-day guides to finish the plan.</p>
      </div>
    </section>
  );
}
