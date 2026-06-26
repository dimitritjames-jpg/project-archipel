import Link from "next/link";
import type { VibePopularQuery } from "@/lib/agent-template/types";
import { cn } from "@/lib/utils";

type PopularSearchLinksProps = {
  queries: readonly VibePopularQuery[];
  className?: string;
};

export function PopularSearchLinks({ queries, className }: PopularSearchLinksProps) {
  return (
    <div className={cn("text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vv-agent-muted)]">
        Popular searches
      </p>
      <ul className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2">
        {queries.map((item) => (
          <li key={item.label}>
            <Link
              href={`/search?q=${encodeURIComponent(item.query)}`}
              className="text-sm text-[var(--vv-agent-teal)] underline-offset-4 transition hover:text-[var(--vv-agent-teal-hover)] hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
