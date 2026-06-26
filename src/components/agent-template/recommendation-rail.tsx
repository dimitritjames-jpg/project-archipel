import Image from "next/image";
import Link from "next/link";
import type { VibeRecommendationCard } from "@/lib/agent-template/types";
import { cn } from "@/lib/utils";

type RecommendationRailProps = {
  title?: string;
  items: VibeRecommendationCard[];
  className?: string;
};

export function RecommendationRail({
  title = "Popular across the USVI",
  items,
  className,
}: RecommendationRailProps) {
  return (
    <section className={cn("pb-16 pt-2 sm:pb-20", className)} aria-labelledby="agent-recommendations">
      <div className="agent-template-shell">
        <h2
          id="agent-recommendations"
          className="text-2xl font-semibold tracking-[-0.03em] text-[var(--vv-agent-ink)] sm:text-[1.75rem]"
        >
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--vv-agent-muted)] sm:text-base">
          Published listings and guide-backed picks from the current VibeVI catalog.
        </p>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "group w-[min(78vw,280px)] shrink-0 overflow-hidden rounded-[17px] border border-[var(--vv-agent-line)]",
                "bg-[var(--vv-agent-surface)] shadow-[var(--vv-agent-shadow-card)] transition hover:-translate-y-1",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--vv-agent-sand)]">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="280px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                {item.badge ? (
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/88 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--vv-agent-ink)] backdrop-blur">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--vv-agent-ink)]">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-1 text-sm text-[var(--vv-agent-muted)]">{item.subtitle}</p>
                ) : null}
                {item.trustLabel ? (
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--vv-agent-teal)]">
                    {item.trustLabel}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
