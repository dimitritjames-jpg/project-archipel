import { cn } from "@/lib/utils";

type ArchipelagoOrbitProps = {
  className?: string;
};

const ISLANDS = [
  { code: "STT", name: "St. Thomas", x: 108, y: 91, color: "#37ead9" },
  { code: "WI", name: "Water Island", x: 82, y: 114, color: "#b8ee75" },
  { code: "STJ", name: "St. John", x: 175, y: 96, color: "#37d495" },
  { code: "STX", name: "St. Croix", x: 150, y: 208, color: "#ff7968" },
] as const;

export function ArchipelagoOrbit({ className }: ArchipelagoOrbitProps) {
  return (
    <div
      className={cn(
        "command-surface topographic-field relative aspect-square w-full rounded-[2rem]",
        className,
      )}
      role="img"
      aria-label="Stylized navigation view of St. Thomas, St. John, St. Croix, and Water Island"
    >
      <div className="absolute inset-4 rounded-[1.4rem] border border-white/6" />
      <div className="absolute left-6 top-6 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-aqua/70">
          Archipelago signal
        </p>
        <p className="mt-1 text-xs text-archipel-white/45">18.00° N · 64.75° W</p>
      </div>

      <svg
        viewBox="0 0 300 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="archipel-radar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#37ead9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#37ead9" stopOpacity="0" />
          </radialGradient>
          <filter id="archipel-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="150" cy="150" r="110" fill="url(#archipel-radar)" />
        {[44, 78, 110].map((radius) => (
          <circle
            key={radius}
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="#37ead9"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}
        <path
          d="M82 114 C95 106 98 98 108 91 C134 75 151 87 175 96 C185 128 169 169 150 208"
          fill="none"
          stroke="#37ead9"
          strokeDasharray="4 7"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />
        <path
          d="M150 40 A110 110 0 0 1 260 150"
          fill="none"
          stroke="#37ead9"
          strokeOpacity="0.35"
          strokeWidth="2"
          className="animate-tide-drift"
        />

        {ISLANDS.map((island) => (
          <g key={island.code}>
            <circle
              cx={island.x}
              cy={island.y}
              r="12"
              fill={island.color}
              fillOpacity="0.12"
              stroke={island.color}
              strokeOpacity="0.35"
              className="animate-radar-pulse"
            />
            <circle
              cx={island.x}
              cy={island.y}
              r="3.5"
              fill={island.color}
              filter="url(#archipel-glow)"
            />
            <text
              x={island.x + 10}
              y={island.y - 9}
              fill="#f5f8fb"
              fillOpacity="0.86"
              fontSize="9"
              fontWeight="700"
              letterSpacing="1"
            >
              {island.code}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-6 bottom-6 grid grid-cols-2 gap-2">
        {ISLANDS.map((island) => (
          <div
            key={island.code}
            className="flex items-center gap-2 border-t border-white/8 pt-2"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: island.color }}
            />
            <span className="text-[10px] font-medium text-archipel-white/55">
              {island.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
