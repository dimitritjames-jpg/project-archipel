import { TrackedLink } from "@/components/analytics/tracked-link";
import { type IslandSlug } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";
import { cn } from "@/lib/utils";

type IslandSilhouetteCardProps = {
  islandSlug: IslandSlug;
  className?: string;
};

const ISLAND_BUTTON_COPY: Record<
  IslandSlug,
  {
    eyebrow: string;
    microcopy: string;
    gradient: string;
    fill: string;
    path: string;
  }
> = {
  "st-thomas": {
    eyebrow: "Harbor pulse",
    microcopy: "beaches, nightlife, shopping, cruise-day energy",
    gradient: "from-cyan-300/28 via-sky-500/14 to-coral/18",
    fill: "rgba(120, 237, 255, 0.95)",
    path: "M30 78 C52 54, 96 43, 140 48 C164 39, 203 41, 224 56 C244 70, 242 92, 223 104 C203 118, 166 124, 136 120 C114 131, 83 132, 58 120 C36 110, 22 93, 30 78 Z",
  },
  "st-john": {
    eyebrow: "Park calm",
    microcopy: "national park, beaches, trails, quiet escapes",
    gradient: "from-emerald-300/28 via-teal-500/14 to-aqua/18",
    fill: "rgba(131, 255, 201, 0.95)",
    path: "M36 96 C54 72, 89 55, 132 50 C166 46, 208 54, 229 74 C243 88, 237 108, 214 121 C191 134, 154 140, 121 136 C89 133, 58 123, 42 110 C28 99, 27 108, 36 96 Z",
  },
  "st-croix": {
    eyebrow: "Big-island depth",
    microcopy: "food, culture, diving, local rhythm",
    gradient: "from-amber-300/28 via-rose-500/14 to-aqua/18",
    fill: "rgba(255, 210, 130, 0.95)",
    path: "M24 95 C42 71, 78 58, 120 55 C145 41, 180 39, 209 49 C234 58, 244 79, 232 100 C220 122, 187 135, 151 136 C132 145, 105 147, 78 141 C50 134, 24 117, 20 103 C18 100, 18 98, 24 95 Z",
  },
  "water-island": {
    eyebrow: "Ferry-hop ease",
    microcopy: "ferry-hop, Honeymoon Beach, Fort Segarra, slow-day escape",
    gradient: "from-sand/26 via-lime/14 to-aqua/18",
    fill: "rgba(250, 229, 170, 0.95)",
    path: "M74 104 C88 84, 114 74, 145 76 C161 66, 186 67, 201 79 C215 90, 214 108, 201 118 C187 129, 163 132, 141 128 C118 136, 94 135, 78 125 C64 118, 64 112, 74 104 Z",
  },
};

export function IslandSilhouetteCard({
  islandSlug,
  className,
}: IslandSilhouetteCardProps) {
  const portal = ISLAND_PORTALS[islandSlug];
  const style = ISLAND_BUTTON_COPY[islandSlug];

  return (
    <TrackedLink
      href={`/islands/${islandSlug}`}
      eventName="island_selected"
      eventProperties={{ island: islandSlug, source: "homepage_choose_your_island" }}
      className={cn(
        "group relative block min-h-[260px] overflow-hidden rounded-[1.9rem] border border-white/60 bg-[#062532] p-5 shadow-[0_26px_80px_rgba(7,151,166,0.16)] transition duration-500 hover:-translate-y-1.5 hover:border-white/85 hover:shadow-[0_34px_110px_rgba(7,151,166,0.22)] sm:min-h-[290px] sm:p-6",
        className,
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} aria-hidden />
      <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-sand/82">
        <span>{style.eyebrow}</span>
        <span className="rounded-full border border-white/14 bg-white/6 px-2 py-1 text-white/72">
          Enter
        </span>
      </div>

      <div className="absolute inset-x-5 top-16 h-[124px] sm:top-14 sm:h-[148px]" aria-hidden>
        <svg
          viewBox="0 0 256 168"
          className="h-full w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)]"
          role="presentation"
        >
          <defs>
            <linearGradient id={`island-fill-${islandSlug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={style.fill} stopOpacity="0.98" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
            </linearGradient>
          </defs>
          <path
            d={style.path}
            fill={`url(#island-fill-${islandSlug})`}
            stroke="rgba(255,255,255,0.82)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mt-[9.5rem] sm:mt-[10.5rem]">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-aqua/75">
          Choose your island
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.2rem]">
          {portal.media.label}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/78">
          {style.microcopy}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {portal.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-white/12 bg-white/7 px-2.5 py-1 text-[10px] font-semibold text-white/76 backdrop-blur"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </TrackedLink>
  );
}
