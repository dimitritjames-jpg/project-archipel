import Link from "next/link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { EXPERIENCE_MOSAIC } from "@/lib/media";
import { CORE_CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

const MOSAIC_LINKS: Record<string, string> = {
  "beach-day": "/experiences/adventure",
  "boat-charter": "/experiences/adventure",
  "snorkel-dive": "/experiences/adventure",
  "sunset-dinner": "/experiences/culinary",
  nightlife: "/st-thomas/nightlife-rhythm",
  "local-shops": "/st-thomas/local-provisions",
  wellness: "/st-thomas/wellness-spas",
  "family-day": "/experiences/cruise-day",
};

const MOSAIC_COPY: Record<string, string> = {
  "beach-day": "Read the light, wind, and route before picking your sand.",
  "boat-charter": "Sails, reef runs, and day boats around the archipelago.",
  "snorkel-dive": "Reef access and operators for going below the surface.",
  "sunset-dinner": "Tables with a horizon and kitchens worth crossing town for.",
  nightlife: "Harbor rooms, rooftops, and the late-night island current.",
  "local-shops": "Markets, makers, provisions, and useful island stops.",
  wellness: "Recovery, reset, and slow hours between bigger plans.",
  "family-day": "Calmer water, easier routes, and room for everyone.",
};

export function ExperienceMosaic() {
  return (
    <section className="border-y border-white/6 bg-midnight-900/35 px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="mosaic-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow="Build your route"
            title="Eight ways into the islands."
            description="Start with the feeling, then find the place. Each tile routes into published listings or clearly labeled editorial previews."
          />
          <p className="max-w-md justify-self-end text-sm leading-relaxed text-archipel-white/42 lg:text-right">
            No generic itinerary required. Mix a ferry hop, a swim, a table, and
            a late-night signal into a day that actually fits.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
          {EXPERIENCE_MOSAIC.map((tile, index) => {
            const href =
              MOSAIC_LINKS[tile.id] ??
              `/st-thomas/${CORE_CATEGORIES[0]?.slug ?? "excursions-charters"}`;
            const feature = index === 0 || index === 4;
            const wide = index === 3 || index === 6;

            return (
              <Link
                key={tile.id}
                href={href}
                className={cn(
                  "island-card-glow group relative overflow-hidden rounded-[1.35rem] border border-white/8 transition duration-500 hover:-translate-y-1 hover:border-aqua/25 hover:shadow-glow-aqua",
                  feature && "row-span-2",
                  wide && "sm:col-span-2",
                )}
              >
                <MediaBackdrop media={tile} overlay="subtle" className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
                  <span className="font-mono text-[9px] tracking-[0.18em] text-archipel-white/45">
                    {String(index + 1).padStart(2, "0")} / EXPERIENCE
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-aqua/70 shadow-[0_0_10px_#37ead9]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                  <h3 className="text-base font-semibold tracking-[-0.03em] text-archipel-white sm:text-lg">
                    {tile.label}
                  </h3>
                  {(feature || wide) ? (
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-archipel-white/58 sm:text-sm">
                      {MOSAIC_COPY[tile.id]}
                    </p>
                  ) : null}
                  <span className="mt-3 inline-flex text-[11px] font-semibold text-aqua opacity-0 transition group-hover:opacity-100">
                    Route me there ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
