"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FilterChipRail } from "@/components/facelift/filter-chip-rail";
import { VvButtonPrimary, VvCard, VvEyebrow, VvHeading } from "@/components/facelift/vv-ui";
import { CORE_CATEGORIES } from "@/lib/categories";
import { VIBEVI_ISLANDS } from "@/lib/vibevi-media";

const DirectoryMap = dynamic(
  () => import("@/components/map/DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full min-h-[380px] animate-pulse rounded-[1.25rem] bg-[#e9fbf7]"
        aria-label="Loading island map"
      />
    ),
  },
);

const ROUTE_CARDS = [
  { label: "St. Thomas harbor day", href: "/st-thomas", detail: "Beaches, boats, dining, and nightlife rhythm." },
  { label: "St. John park route", href: "/st-john", detail: "Ferry timing, trails, calm coves, and reef stops." },
  { label: "St. Croix culture loop", href: "/st-croix", detail: "Boardwalks, food, history, and reef depth." },
  { label: "Water Island ferry escape", href: "/water-island", detail: "Small-island pace with a simple return window." },
] as const;

const categoryChips = CORE_CATEGORIES.slice(0, 6).map((cat) => ({
  label: cat.name,
  href: `/st-thomas/${cat.slug}`,
}));

export function MapRouteBoard() {
  const [view, setView] = useState<"split" | "list" | "map">("split");

  return (
    <div className="vv-page">
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-2xl">
          <VvEyebrow>Island planning board</VvEyebrow>
          <VvHeading as="h1" className="mt-3 text-4xl sm:text-5xl">
            Plan your day across the islands.
          </VvHeading>
          <p className="mt-4 text-base leading-relaxed text-[#496871]">
            Find what&apos;s nearby, compare routes, and follow the water, road, or ferry to the next move.
          </p>
        </div>

        <div className="mt-6 flex gap-2 lg:hidden">
          {(["list", "map"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                view === mode
                  ? "bg-[#0b4b55] text-white"
                  : "border border-[#0b4b55]/12 bg-white text-[#315057]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(300px,380px)_1fr] lg:items-stretch">
          <aside
            className={`space-y-5 ${view === "map" ? "hidden lg:block" : ""}`}
            aria-label="Route planning panel"
          >
            <VvCard className="p-5">
              <VvEyebrow>Find the move</VvEyebrow>
              <p className="mt-2 text-sm text-[#496871]">
                Search beaches, boats, bites, stays, and local businesses.
              </p>
              <VvButtonPrimary href="/search" className="mt-4 w-full">
                Open search
              </VvButtonPrimary>
            </VvCard>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#496871]">
                Filter by category
              </p>
              <FilterChipRail chips={categoryChips} ariaLabel="Map category filters" />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#496871]">
                Plan your day
              </p>
              <div className="space-y-3">
                {ROUTE_CARDS.map((route) => {
                  const slug = route.href.replace("/", "");
                  const thumb = VIBEVI_ISLANDS[slug]?.thumbnail;

                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="group flex gap-3 rounded-[1.1rem] border border-[#0b4b55]/10 bg-white p-3 shadow-[0_8px_24px_rgba(11,75,85,0.06)] transition hover:-translate-y-0.5"
                    >
                      {thumb ? (
                        <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={thumb} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                      ) : null}
                      <span>
                        <span className="font-semibold text-[#173941] group-hover:text-[#0b4b55]">
                          {route.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#496871]">
                          {route.detail}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <div
            className={`min-h-[min(64vh,620px)] overflow-hidden rounded-[1.5rem] border border-[#0b4b55]/10 bg-white shadow-[0_16px_48px_rgba(11,75,85,0.1)] ${
              view === "list" ? "hidden lg:block" : ""
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#0b4b55]/8 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0797a6]">
                  Live map
                </p>
                <p className="mt-0.5 text-sm text-[#496871]">
                  USVI bounds · warm markers where configured
                </p>
              </div>
              <Link
                href="/experiences/adventure"
                className="text-sm font-semibold text-[#0b4b55] hover:text-[#0797a6]"
              >
                Outdoor routes →
              </Link>
            </div>
            <DirectoryMap height="min(58vh, 560px)" className="!rounded-none !border-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
