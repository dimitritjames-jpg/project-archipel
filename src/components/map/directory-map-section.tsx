"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const DirectoryMap = dynamic(
  () =>
    import("@/components/map/DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[min(60vh,520px)] min-h-[320px] animate-pulse rounded-2xl border border-white/10 bg-[#0A192F]/80"
        aria-hidden
      />
    ),
  },
);

export function DirectoryMapSection({
  topOverlay,
  bottomOverlay,
}: {
  topOverlay?: ReactNode;
  bottomOverlay?: ReactNode;
}) {
  return (
    <section className="mt-16" aria-labelledby="map-heading">
      <h2 id="map-heading" className="text-xl font-semibold text-archipel-white">
        Explore the archipelago
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-archipel-white/60">
        Directory map centered on the U.S. Virgin Islands — St. Thomas, St. John,
        St. Croix, and Water Island.
      </p>
      <div className="relative mt-6 min-h-[min(60vh,520px)]">
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
        <DirectoryMap height="min(60vh, 520px)" />
      </div>
    </section>
  );
}
