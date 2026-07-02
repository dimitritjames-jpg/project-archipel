import { TrackedLink } from "@/components/analytics/tracked-link";
import { ISLAND_MAP, type IslandSlug } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";
import { cn } from "@/lib/utils";

type IslandSilhouetteCardProps = {
  islandSlug: IslandSlug;
  className?: string;
};

type IslandVisualConfig = {
  eyebrow: string;
  accent: string;
  badgeGlow: string;
  badgeClassName?: string;
  accentOrbClassName: string;
  signalLabel: string;
  routeLabel: string;
};

const ISLAND_VISUALS: Record<IslandSlug, IslandVisualConfig> = {
  "st-thomas": {
    eyebrow: "Harbor pulse",
    accent: "from-cyan-200/85 via-sky-300/70 to-white/95",
    badgeGlow: "from-cyan-400/18 via-sky-400/10 to-transparent",
    accentOrbClassName:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(125,232,220,0.32),rgba(125,232,220,0.08)_45%,transparent_72%)]",
    signalLabel: "Charlotte Amalie + East End",
    routeLabel: "Beaches • nights • ferries",
  },
  "st-john": {
    eyebrow: "Park calm",
    accent: "from-emerald-200/85 via-teal-300/70 to-white/95",
    badgeGlow: "from-emerald-400/16 via-teal-400/10 to-transparent",
    accentOrbClassName:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(110,231,183,0.28),rgba(110,231,183,0.08)_45%,transparent_72%)]",
    signalLabel: "Cruz Bay + park shoreline",
    routeLabel: "Beaches • trails • ferry return",
  },
  "st-croix": {
    eyebrow: "Big-island depth",
    accent: "from-amber-200/88 via-orange-200/70 to-white/95",
    badgeGlow: "from-amber-400/16 via-rose-300/10 to-transparent",
    accentOrbClassName:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.26),rgba(251,191,36,0.08)_45%,transparent_72%)]",
    signalLabel: "Christiansted + west-end loop",
    routeLabel: "Food • culture • reef days",
  },
  "water-island": {
    eyebrow: "Ferry-hop ease",
    accent: "from-stone-100/92 via-sand/90 to-white/95",
    badgeGlow: "from-lime-300/16 via-aqua/10 to-transparent",
    badgeClassName: "sm:w-[8.2rem]",
    accentOrbClassName:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(244,223,184,0.24),rgba(244,223,184,0.08)_45%,transparent_72%)]",
    signalLabel: "Crown Bay ferry + Honeymoon",
    routeLabel: "Slow day • beach • return ferry",
  },
};

function formatCoordinate(value: number, positiveLabel: string, negativeLabel: string) {
  const label = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(2)} ${label}`;
}

function IslandSignalBadge({
  islandSlug,
  visual,
}: {
  islandSlug: IslandSlug;
  visual: IslandVisualConfig;
}) {
  const island = ISLAND_MAP[islandSlug];
  const [longitude, latitude] = island.center;

  return (
    <div
      className={cn(
        "relative w-[8.8rem] shrink-0 overflow-hidden rounded-[1.3rem] border border-[#0b4b55]/10 bg-white/78 p-2.5 shadow-[0_14px_34px_rgba(7,151,166,0.1)] backdrop-blur-md",
        visual.badgeClassName,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-80">
        <div className={`absolute inset-0 bg-gradient-to-br ${visual.badgeGlow}`} />
        <div
          className="absolute inset-[10px] rounded-[1rem] border border-[#0b4b55]/8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(11,75,85,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,75,85,0.06) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="relative z-10 rounded-[1rem] border border-[#0b4b55]/10 bg-white/74 p-3">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-[#52717a]">
          <span>{island.code}</span>
          <span>Island note</span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0b7b89]">
              {visual.eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold leading-5 text-[#173941]">
              {visual.signalLabel}
            </p>
          </div>
          <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#0b4b55] shadow-[0_0_0_6px_rgba(11,75,85,0.08)]" />
        </div>

        <div className="mt-4 h-[3px] rounded-full bg-[linear-gradient(90deg,rgba(11,75,85,0.2),rgba(11,123,137,0.9),rgba(11,75,85,0.2))]" />

        <div className="mt-3 flex flex-wrap gap-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#52717a]">
          <span>{formatCoordinate(latitude, "N", "S")}</span>
          <span>&bull;</span>
          <span>{formatCoordinate(longitude, "E", "W")}</span>
        </div>
      </div>

      <div className="relative z-10 mt-2 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-[#52717a]">
        <span>Field guide</span>
        <span className="rounded-full bg-[#0b4b55]/8 px-2 py-1 text-[#0b4b55]">
          Route first
        </span>
      </div>
    </div>
  );
}

export function IslandSilhouetteCard({
  islandSlug,
  className,
}: IslandSilhouetteCardProps) {
  const portal = ISLAND_PORTALS[islandSlug];
  const visual = ISLAND_VISUALS[islandSlug];

  return (
    <TrackedLink
      href={`/islands/${islandSlug}`}
      eventName="island_selected"
      eventProperties={{ island: islandSlug, source: "homepage_choose_your_island" }}
      data-track="island-selector-card"
      data-island={islandSlug}
      data-surface="homepage-choose-your-island"
      aria-label={`Explore ${portal.media.label} island guide`}
      className={cn(
        "group island-card-glow relative block overflow-hidden rounded-[2rem] border border-[#0b4b55]/10 bg-white/78 p-5 shadow-[0_24px_72px_rgba(7,151,166,0.11)] backdrop-blur-md transition duration-500 hover:-translate-y-1.5 hover:border-[#0b4b55]/18 hover:shadow-[0_32px_98px_rgba(7,151,166,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4b55] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff4d6] sm:min-h-[290px] sm:p-6",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(125,232,220,0.16), transparent 28%), radial-gradient(circle at 100% 0%, rgba(255,184,77,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.36), rgba(255,255,255,0.08))",
        }}
      />
      <div
        className={cn(
          "absolute -right-10 top-6 h-28 w-28 rounded-full blur-2xl",
          visual.accentOrbClassName,
        )}
        aria-hidden
      />
      <div
        className="absolute inset-[14px] rounded-[1.5rem] border border-white/58"
        aria-hidden
      />
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${visual.accent}`}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0b7b89]">
              {visual.eyebrow}
            </p>
            <h3 className="mt-3 text-[2rem] font-semibold tracking-[-0.06em] text-[#173941] sm:text-[2.25rem]">
              {portal.media.label}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-6 text-[#45636a]">
              {portal.tagline}
            </p>
          </div>
          <IslandSignalBadge islandSlug={islandSlug} visual={visual} />
        </div>

        <div className="mt-5 rounded-[1.4rem] border border-[#0b4b55]/8 bg-white/58 px-4 py-3.5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0b7b89]">
            What this guide leans into
          </p>
          <p className="mt-2 text-sm leading-6 text-[#45636a]">
            {visual.routeLabel}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {portal.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-[#0b4b55]/10 bg-white/82 px-2.5 py-1 text-[10px] font-semibold text-[#41616a]"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#5d787f]">
              Island-first browse
            </p>
            <p className="mt-1 text-sm text-[#45636a]">
              Beaches, food, charters, nightlife, and more
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0b4b55]/14 bg-[#0b4b55] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_32px_rgba(11,75,85,0.18)] transition duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
            Explore {portal.media.label}
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </TrackedLink>
  );
}
