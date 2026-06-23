import { TrackedLink } from "@/components/analytics/tracked-link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import type { IslandSlug } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";
import { cn } from "@/lib/utils";

type IslandPortalCardProps = {
  islandSlug: IslandSlug;
  className?: string;
};

const ISLAND_RHYTHM: Record<
  IslandSlug,
  { index: string; coordinate: string; mood: string; motif: string; accent: string; icon: string }
> = {
  "st-thomas": {
    index: "01",
    coordinate: "18.3419° N",
    mood: "Harbor lights · Red Hook · Magens",
    motif: "Harbor, cruise-day, beach reset, late plate.",
    accent: "from-cyan-300/28 via-blue-500/16 to-fuchsia-400/18",
    icon: "⚓",
  },
  "st-croix": {
    index: "02",
    coordinate: "17.7246° N",
    mood: "Boardwalk · rum · reef · history",
    motif: "Christiansted color, Buck Island blue, slow food nights.",
    accent: "from-amber-300/28 via-rose-500/16 to-cyan-400/16",
    icon: "🥃",
  },
  "st-john": {
    index: "03",
    coordinate: "18.3358° N",
    mood: "Park trails · coves · Cruz Bay",
    motif: "National park green, turtle water, ferry-in ease.",
    accent: "from-emerald-300/28 via-teal-500/16 to-sky-300/16",
    icon: "🌿",
  },
  "water-island": {
    index: "04",
    coordinate: "18.3181° N",
    mood: "Ferry hop · golf cart · Honeymoon",
    motif: "Small-island slow lane, sandy feet, sunset return.",
    accent: "from-sand/30 via-lime/14 to-aqua/18",
    icon: "⛴",
  },
};

export function IslandPortalCard({ islandSlug, className }: IslandPortalCardProps) {
  const portal = ISLAND_PORTALS[islandSlug];
  const rhythm = ISLAND_RHYTHM[islandSlug];

  return (
    <TrackedLink
      href={`/${islandSlug}`}
      eventName="island_selected"
      eventProperties={{ island: islandSlug, source: "homepage_portal" }}
      className={cn(
        "island-card-glow island-portal-postcard group relative block min-h-[320px] overflow-hidden rounded-[1.8rem] border border-white/8 transition duration-500 hover:-translate-y-1.5 hover:border-sand/30 hover:shadow-glow-aqua sm:min-h-[360px]",
        className,
      )}
    >
      <MediaBackdrop
        media={portal.media}
        overlay="card"
        className="absolute inset-0 h-full w-full"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${rhythm.accent}`} aria-hidden />
      <div className="island-portal-coastline" aria-hidden />
      <div className="island-portal-waves" aria-hidden />

      <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-6 sm:min-h-[360px] sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/85">
              Island / {rhythm.index}
            </p>
            <p className="mt-1 text-[10px] text-archipel-white/35">{rhythm.coordinate}</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full border border-sand/22 bg-sand/10 text-lg backdrop-blur-md">
            <span aria-hidden>{rhythm.icon}</span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-semibold tracking-[-0.045em] text-archipel-white sm:text-4xl">
            {portal.media.label}
          </h3>
          <p className="mt-2 text-sm font-semibold text-coral-sunset/95">{rhythm.mood}</p>
          <p className="mt-5 text-sm leading-relaxed text-archipel-white/70">{rhythm.motif}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {portal.highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-sand/14 bg-midnight-950/35 px-2.5 py-1 text-[10px] text-archipel-white/70 backdrop-blur-md"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sand transition group-hover:gap-3 group-hover:text-aqua">
            Enter {portal.media.label} <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
    </TrackedLink>
  );
}
