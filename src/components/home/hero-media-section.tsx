import Link from "next/link";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { ArchipelagoOrbit } from "@/components/ui/archipelago-orbit";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { HERO_MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

const signalStats = [
  { value: "04", label: "island portals" },
  { value: "AST", label: "schedule clock" },
  { value: "VI", label: "local context" },
] as const;

export function HeroMediaSection() {
  return (
    <section className="relative -mt-px overflow-hidden border-b border-white/7">
      <MediaBackdrop
        media={HERO_MEDIA}
        overlay="hero"
        priority
        className="min-h-[min(94vh,900px)]"
      >
        <div className="section-shell flex min-h-[min(94vh,900px)] flex-col justify-center pb-12 pt-20 sm:pb-16 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.55fr)] lg:gap-16">
            <div className="relative z-10">
              <p className="eyebrow-label">VibeVI · The U.S. Virgin Islands discovery layer</p>
              <h1 className="display-type text-balance mt-6 max-w-5xl text-archipel-white">
                Find Your
                <span className="block bg-gradient-to-r from-aqua via-[#8df8ee] to-sand bg-clip-text text-transparent">
                  Island Vibe.
                </span>
              </h1>
              <p className="text-pretty mt-7 max-w-2xl text-base leading-relaxed text-archipel-white/68 sm:text-lg lg:text-xl">
                You’re in the Virgin Islands. Here’s the move: beaches, boats,
                bites, nightlife, ferry checks, cruise-day context, and local
                businesses across all four islands.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/search"
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aqua px-6 text-sm font-bold text-midnight-950",
                    "shadow-glow-aqua transition hover:-translate-y-0.5 hover:bg-[#78f7eb]",
                  )}
                >
                  Find your island vibe
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/st-john/ferry-schedule"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 bg-white/6 px-6 text-sm font-semibold text-archipel-white backdrop-blur-md transition hover:border-aqua/35 hover:bg-white/10"
                >
                  Check the next boat
                </Link>
              </div>

              <div className="mt-9 max-w-2xl">
                <HomeSearchBar />
                <p className="mt-3 pl-2 text-[11px] leading-relaxed text-archipel-white/38">
                  Published Supabase listings · schedule data, not GPS tracking ·
                  preview experiences are labeled
                </p>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[430px] lg:block">
              <ArchipelagoOrbit />
              <div className="absolute -bottom-7 left-1/2 grid w-[88%] -translate-x-1/2 grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-midnight-950/82 shadow-2xl backdrop-blur-xl">
                {signalStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "px-3 py-3 text-center",
                      index > 0 && "border-l border-white/8",
                    )}
                  >
                    <p className="font-mono text-sm font-bold text-aqua">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-archipel-white/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-archipel-white/32 lg:mt-20">
            <span className="h-px w-10 bg-gradient-to-r from-aqua/70 to-transparent" />
            Scroll to read the islands
          </div>
        </div>
      </MediaBackdrop>
    </section>
  );
}
