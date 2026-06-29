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
    frameClassName?: string;
  }
> = {
  "st-thomas": {
    eyebrow: "Harbor pulse",
    microcopy: "beaches, nightlife, shopping, cruise-day energy",
    gradient: "from-cyan-300/28 via-sky-500/14 to-coral/18",
    fill: "rgba(120, 237, 255, 0.95)",
    path: "M20 90 L32 82 L47 78 L60 68 L79 60 L98 61 L112 57 L130 51 L148 54 L163 49 L178 52 L191 58 L208 60 L223 69 L234 79 L230 89 L216 92 L205 101 L188 104 L175 110 L160 111 L145 118 L128 115 L109 119 L94 116 L80 118 L66 113 L53 109 L40 100 L26 97 Z",
  },
  "st-john": {
    eyebrow: "Park calm",
    microcopy: "national park, beaches, trails, quiet escapes",
    gradient: "from-emerald-300/28 via-teal-500/14 to-aqua/18",
    fill: "rgba(131, 255, 201, 0.95)",
    path: "M30 103 L44 87 L58 79 L73 68 L92 62 L112 57 L128 62 L143 58 L159 61 L177 67 L194 74 L207 84 L221 88 L225 98 L213 104 L205 114 L191 121 L171 121 L154 127 L138 124 L121 128 L104 124 L90 127 L73 122 L56 117 L43 109 Z",
  },
  "st-croix": {
    eyebrow: "Big-island depth",
    microcopy: "food, culture, diving, local rhythm",
    gradient: "from-amber-300/28 via-rose-500/14 to-aqua/18",
    fill: "rgba(255, 210, 130, 0.95)",
    path: "M18 98 L32 86 L51 81 L70 72 L95 68 L118 68 L138 64 L162 63 L185 66 L205 73 L224 78 L238 88 L236 98 L221 103 L205 108 L190 116 L169 118 L148 121 L127 120 L106 123 L87 121 L67 119 L49 114 L34 108 L20 104 Z",
  },
  "water-island": {
    eyebrow: "Ferry-hop ease",
    microcopy: "ferry-hop, Honeymoon Beach, Fort Segarra, slow-day escape",
    gradient: "from-sand/26 via-lime/14 to-aqua/18",
    fill: "rgba(250, 229, 170, 0.95)",
    path: "M82 105 L94 97 L108 91 L120 84 L137 81 L154 83 L167 79 L181 84 L193 92 L194 102 L183 107 L173 115 L158 119 L143 118 L128 122 L113 120 L99 117 L88 111 Z",
    frameClassName: "inset-x-9 sm:inset-x-10",
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
      data-track="island-selector-card"
      data-island={islandSlug}
      data-surface="homepage-choose-your-island"
      aria-label={`Open ${portal.media.label} island guide`}
      className={cn(
        "group relative block min-h-[260px] overflow-hidden rounded-[1.9rem] border border-white/60 bg-[#062532] p-5 shadow-[0_26px_80px_rgba(7,151,166,0.16)] transition duration-500 hover:-translate-y-1.5 hover:border-white/85 hover:shadow-[0_34px_110px_rgba(7,151,166,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-4 focus-visible:ring-offset-[#062532] sm:min-h-[290px] sm:p-6",
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

      <div
        className={cn(
          "absolute inset-x-5 top-16 h-[124px] sm:top-14 sm:h-[148px]",
          style.frameClassName,
        )}
        aria-hidden
      >
        <svg
          viewBox="0 0 256 168"
          className="h-full w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)] transition duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
          role="presentation"
        >
          <defs>
            <linearGradient id={`island-fill-${islandSlug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={style.fill} stopOpacity="0.98" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
            </linearGradient>
            <filter id={`island-shadow-${islandSlug}`} x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="16" stdDeviation="13" floodColor="rgba(5, 20, 28, 0.34)" />
            </filter>
          </defs>
          <path
            d={style.path}
            fill={`url(#island-fill-${islandSlug})`}
            stroke="rgba(255,255,255,0.82)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#island-shadow-${islandSlug})`}
          />
          <path
            d={style.path}
            fill="none"
            stroke="rgba(7, 37, 50, 0.22)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0 2)"
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
