import { TrackedLink } from "@/components/analytics/tracked-link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import type { IslandSlug } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";
import { cn } from "@/lib/utils";

type IslandPortalCardProps = {
  islandSlug: IslandSlug;
  className?: string;
};

const ISLAND_SIGNAL: Record<IslandSlug, { index: string; coordinate: string }> = {
  "st-thomas": { index: "01", coordinate: "18.3419° N" },
  "st-croix": { index: "02", coordinate: "17.7246° N" },
  "st-john": { index: "03", coordinate: "18.3358° N" },
  "water-island": { index: "04", coordinate: "18.3181° N" },
};

export function IslandPortalCard({ islandSlug, className }: IslandPortalCardProps) {
  const portal = ISLAND_PORTALS[islandSlug];
  const signal = ISLAND_SIGNAL[islandSlug];

  return (
    <TrackedLink
      href={`/${islandSlug}`}
      eventName="island_selected"
      eventProperties={{ island: islandSlug, source: "homepage_portal" }}
      className={cn(
        "island-card-glow group relative block min-h-[320px] overflow-hidden rounded-[1.8rem] border border-white/8 transition duration-500 hover:-translate-y-1.5 hover:border-aqua/25 hover:shadow-glow-aqua sm:min-h-[360px]",
        className,
      )}
    >
      <MediaBackdrop
        media={portal.media}
        overlay="card"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-6 sm:min-h-[360px] sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/75">
              Portal / {signal.index}
            </p>
            <p className="mt-1 text-[10px] text-archipel-white/35">{signal.coordinate}</p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-aqua shadow-[0_0_14px_#37ead9]" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-semibold tracking-[-0.045em] text-archipel-white sm:text-4xl">
            {portal.media.label}
          </h3>
          <p className="mt-2 text-sm font-medium text-coral-sunset/90">{portal.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-archipel-white/65">{portal.vibe}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {portal.highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-midnight-950/35 px-2.5 py-1 text-[10px] text-archipel-white/65 backdrop-blur-md"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aqua transition group-hover:gap-3">
            Enter {portal.media.label} <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </TrackedLink>
  );
}
