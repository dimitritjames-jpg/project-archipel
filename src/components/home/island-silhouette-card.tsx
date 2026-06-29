import { TrackedLink } from "@/components/analytics/tracked-link";
import { type IslandSlug } from "@/lib/islands";
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
  badgeFill: string;
  outlinePath: string;
  cayDots?: string[];
  badgeClassName?: string;
};

const ISLAND_VISUALS: Record<IslandSlug, IslandVisualConfig> = {
  "st-thomas": {
    eyebrow: "Harbor pulse",
    accent: "from-cyan-200/85 via-sky-300/70 to-white/95",
    badgeGlow: "from-cyan-400/18 via-sky-400/10 to-transparent",
    badgeFill: "rgba(156, 228, 239, 0.42)",
    outlinePath:
      "M20 82 L33 75 L49 73 L62 63 L80 55 L99 56 L114 51 L130 47 L147 50 L163 46 L180 49 L196 57 L212 58 L227 67 L236 78 L233 87 L220 90 L209 98 L191 101 L177 108 L161 109 L147 115 L128 113 L111 116 L94 113 L79 115 L63 110 L49 106 L37 98 L24 94 Z",
    cayDots: ["225 56 4.2", "240 64 3.2", "15 95 2.8"],
  },
  "st-john": {
    eyebrow: "Park calm",
    accent: "from-emerald-200/85 via-teal-300/70 to-white/95",
    badgeGlow: "from-emerald-400/16 via-teal-400/10 to-transparent",
    badgeFill: "rgba(156, 239, 208, 0.38)",
    outlinePath:
      "M24 92 L37 79 L50 72 L66 61 L85 56 L104 51 L121 56 L136 52 L152 55 L169 61 L186 68 L198 78 L214 82 L218 91 L207 98 L199 109 L184 116 L166 116 L151 121 L135 119 L118 123 L101 119 L87 122 L71 117 L54 112 L40 103 Z",
    cayDots: ["212 71 3.4", "223 86 2.8", "31 105 2.5"],
  },
  "st-croix": {
    eyebrow: "Big-island depth",
    accent: "from-amber-200/88 via-orange-200/70 to-white/95",
    badgeGlow: "from-amber-400/16 via-rose-300/10 to-transparent",
    badgeFill: "rgba(244, 209, 151, 0.34)",
    outlinePath:
      "M18 88 L33 79 L52 74 L72 66 L96 63 L120 63 L140 59 L163 58 L186 61 L207 68 L225 73 L238 82 L237 91 L223 96 L208 101 L192 109 L171 111 L149 115 L128 114 L108 117 L87 115 L67 113 L49 108 L34 102 L21 98 Z",
    cayDots: ["241 84 2.8", "12 94 2.4"],
  },
  "water-island": {
    eyebrow: "Ferry-hop ease",
    accent: "from-stone-100/92 via-sand/90 to-white/95",
    badgeGlow: "from-lime-300/16 via-aqua/10 to-transparent",
    badgeFill: "rgba(244, 223, 184, 0.28)",
    outlinePath:
      "M84 90 L96 83 L110 78 L122 71 L138 68 L154 70 L166 66 L179 71 L190 79 L191 88 L181 93 L172 102 L158 106 L143 105 L129 109 L114 107 L101 104 L90 98 Z",
    cayDots: ["196 75 2.8", "205 87 2.4", "79 101 2.2"],
    badgeClassName: "sm:w-[9.4rem]",
  },
};

function IslandMapBadge({
  islandSlug,
  visual,
}: {
  islandSlug: IslandSlug;
  visual: IslandVisualConfig;
}) {
  return (
    <div
      className={cn(
        "relative w-[10.8rem] shrink-0 overflow-hidden rounded-[1.45rem] border border-[#0b4b55]/12 bg-white/68 p-3 shadow-[0_16px_44px_rgba(7,151,166,0.12)] backdrop-blur-md",
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
      <svg
        viewBox="0 0 256 140"
        className="relative z-10 h-[5.1rem] w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id={`island-badge-fill-${islandSlug}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={visual.badgeFill} />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>
        <path
          d={visual.outlinePath}
          fill={`url(#island-badge-fill-${islandSlug})`}
          stroke="rgba(16, 64, 73, 0.84)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {visual.cayDots?.map((dot) => {
          const [cx, cy, r] = dot.split(" ");
          return (
            <circle
              key={dot}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(16, 64, 73, 0.76)"
            />
          );
        })}
      </svg>
      <div className="relative z-10 mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#41616a]">
        <span>Map accent</span>
        <span className="rounded-full bg-[#0b4b55]/8 px-2 py-1 text-[#0b4b55]">Island guide</span>
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
        "group island-card-glow relative block overflow-hidden rounded-[2rem] border border-[#0b4b55]/10 bg-white/72 p-5 shadow-[0_26px_80px_rgba(7,151,166,0.12)] backdrop-blur-md transition duration-500 hover:-translate-y-1.5 hover:border-[#0b4b55]/18 hover:shadow-[0_32px_110px_rgba(7,151,166,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4b55] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fff4d6] sm:min-h-[295px] sm:p-6",
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
        className="absolute inset-[14px] rounded-[1.5rem] border border-white/58"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[11rem]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0b7b89]">
              {visual.eyebrow}
            </p>
            <h3 className="mt-3 text-[2.1rem] font-semibold tracking-[-0.06em] text-[#173941] sm:text-[2.35rem]">
              {portal.media.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#45636a]">
              {portal.tagline}
            </p>
          </div>
          <IslandMapBadge islandSlug={islandSlug} visual={visual} />
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-[#0b4b55]/8 bg-white/52 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0b7b89]">
            Local guide lens
          </p>
          <p className="mt-2 text-sm leading-6 text-[#45636a]">
            {portal.vibe}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {portal.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-[#0b4b55]/10 bg-white/78 px-2.5 py-1 text-[10px] font-semibold text-[#41616a]"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0b4b55]/14 bg-[#0b4b55] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_32px_rgba(11,75,85,0.18)] transition duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
            Explore {portal.media.label}
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </TrackedLink>
  );
}
