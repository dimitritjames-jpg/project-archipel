import Image from "next/image";
import Link from "next/link";
import type { VibeIslandCard } from "@/lib/agent-template/types";
import { cn } from "@/lib/utils";

type IslandDiscoveryRailProps = {
  islands: VibeIslandCard[];
  className?: string;
};

export function IslandDiscoveryRail({ islands, className }: IslandDiscoveryRailProps) {
  return (
    <section className={cn("py-10 sm:py-14", className)} aria-labelledby="explore-usvi">
      <div className="agent-template-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vv-agent-muted)]">
              Explore
            </p>
            <h2
              id="explore-usvi"
              className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--vv-agent-ink)] sm:text-[1.75rem]"
            >
              Explore the USVI
            </h2>
          </div>
          <Link
            href="/search"
            className="text-sm font-semibold text-[var(--vv-agent-teal)] underline-offset-4 hover:underline"
          >
            View all islands
          </Link>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {islands.map((island) => (
            <Link
              key={island.slug}
              href={island.href}
              className={cn(
                "group relative min-h-[220px] min-w-[78%] shrink-0 overflow-hidden rounded-[var(--vv-agent-radius-card)]",
                "border border-[var(--vv-agent-line)] shadow-[var(--vv-agent-shadow-card)] transition hover:-translate-y-1",
                "sm:min-w-0",
              )}
            >
              {island.imageSrc ? (
                <Image
                  src={island.imageSrc}
                  alt={island.imageAlt}
                  fill
                  sizes="(max-width: 640px) 78vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,31,46,0.82)] via-[rgba(11,31,46,0.18)] to-transparent" />
              <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-5">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {island.title}
                </h3>
                <p className="mt-2 text-sm text-white/78">{island.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
