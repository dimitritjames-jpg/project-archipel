"use client";

import Link from "next/link";
import { VIBE_FILTERS } from "@/lib/media";
import { cn } from "@/lib/utils";

type VibeFilterRailProps = {
  className?: string;
  title?: string;
  activeId?: string;
};

export function VibeFilterRail({
  className,
  title = "Choose your vibe",
  activeId,
}: VibeFilterRailProps) {
  return (
    <section className={cn("px-4 sm:px-6", className)} aria-label={title}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4 border-t border-current/10 pt-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-current/45">
              Pick the feeling
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-current sm:text-xl">
              {title}
            </h2>
          </div>
          <p className="hidden text-xs text-current/48 sm:block">Swipe the rail &rarr;</p>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {VIBE_FILTERS.map((vibe, index) => (
            <Link
              key={vibe.id}
              href={vibe.href}
              className={cn(
                "group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                activeId === vibe.id
                  ? "border-aqua/50 bg-aqua/14 text-aqua shadow-glow-aqua"
                  : "border-current/10 bg-white/28 text-current/72 hover:border-aqua/30 hover:bg-aqua/10 hover:text-current",
              )}
            >
              <span className="font-mono text-[9px] text-current/36 transition group-hover:text-aqua/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              {vibe.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
