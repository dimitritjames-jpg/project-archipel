import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AgentPageSection } from "@/components/agent-template/agent-page-section";
import { VibeAgentComposer } from "@/components/agent-template/vibe-agent-composer";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";
import { ISLAND_PORTALS } from "@/lib/media";

export const metadata: Metadata = {
  title: "Find the Move",
  description:
    "Search VibeVI for beaches, boats, bites, nights, and published USVI businesses by island, category, and mood.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{
    vibe?: string;
    island?: string;
    category?: string;
    q?: string;
  }>;
};

const utilityShortcuts = [
  {
    href: "/ferry",
    label: "Ferry schedule",
    detail:
      "Red Hook, Cruz Bay, Crown Bay, Water Island, and schedule-based route context.",
  },
  {
    href: "/st-thomas/cruise-schedule",
    label: "St. Thomas cruise schedule",
    detail: "Scheduled ship calls and capacity context for port-day planning.",
  },
  {
    href: "/cruise-day",
    label: "Cruise-day guide",
    detail: "Beach, food, culture, shopping, and return-buffer planning.",
  },
  {
    href: "/water-island/ferry-schedule",
    label: "Water Island ferry",
    detail: "Crown Bay ferry hop, Honeymoon Beach, and slow-day planning.",
  },
] as const;

export default async function SearchPage({ searchParams }: Props) {
  const { vibe, q = "" } = await searchParams;
  const query = q.trim();

  return (
    <div className="agent-template min-h-screen pb-16 text-[var(--vv-agent-ink)]">
      <section className="border-b border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface-warm)]">
        <div className="agent-template-shell py-10 sm:py-14">
          <VibeAgentComposer
            key={query}
            variant="search"
            defaultQuery={query}
            eyebrow="VibeVI Agent"
            title="Find the move"
            description="Search by place, business, or category. Plan the ferry, find the table, chase the sunset, or keep the whole island day open."
            popularQueries={query ? [] : undefined}
          />
        </div>
      </section>

      <div className="agent-template-shell space-y-16 py-10 sm:space-y-20 sm:py-14">
        <section aria-labelledby="live-search-results">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vv-agent-muted)]">
                Published listings
              </p>
              <h2
                id="live-search-results"
                className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
              >
                {query ? `Results for “${query}”` : "Start typing to search"}
              </h2>
            </div>
            <span className="rounded-full border border-[var(--vv-agent-aqua-line)] bg-[var(--vv-agent-aqua-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--vv-agent-teal)]">
              Island search
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--vv-agent-muted)]">
            Results come from published business names and descriptions. No AI,
            booking, or live-availability claim is made in this release.
          </p>
          <div className="mt-6 max-w-3xl">
            <HomeSearchBar initialQuery={query} appearance="agent" />
          </div>
        </section>

        <VibeFilterRail activeId={vibe} className="!px-0" title="Route by mood" />

        <AgentPageSection
          eyebrow="Choose a starting point"
          title="Search one island — or keep the whole day open."
          description="Island hubs help when you already know which shore the day belongs to."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ISLAND_SLUGS.map((slug, index) => {
              const islandMedia = ISLAND_PORTALS[slug].media;

              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group relative min-h-[185px] overflow-hidden rounded-[var(--vv-agent-radius-card)] border border-[var(--vv-agent-line)] shadow-[var(--vv-agent-shadow-card)] transition hover:-translate-y-1"
                >
                  {islandMedia.src ? (
                    <Image
                      src={islandMedia.src}
                      alt={islandMedia.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-70 ${islandMedia.gradient}`}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/10"
                    aria-hidden
                  />
                  <div className="relative z-10 flex min-h-[185px] flex-col justify-between p-5">
                    <p className="rounded-full bg-white/12 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/72 backdrop-blur">
                      ISLAND {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.035em] text-white group-hover:text-[var(--vv-agent-sand)]">
                        {ISLAND_MAP[slug].name}
                      </h3>
                      <p className="mt-2 text-xs font-medium text-white/68">
                        Open island guide ↗
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </AgentPageSection>

        <AgentPageSection
          eyebrow="Beach, boat, bite, night"
          title="Browse by category"
          action={<ComingSoonBadge label="Growing launch set" />}
        >
          <div className="flex flex-wrap gap-2">
            {CORE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/st-thomas/${category.slug}`}
                className="rounded-full border border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] px-4 py-2.5 text-sm font-medium text-[var(--vv-agent-ink)] shadow-[var(--vv-agent-shadow-control)] transition hover:border-[var(--vv-agent-aqua-line)] hover:bg-[var(--vv-agent-aqua-soft)]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </AgentPageSection>

        <AgentPageSection
          eyebrow="Utility shortcuts"
          title="Searching ferry, cruise, port, or ship schedule?"
          description="Open the schedule-based planning pages directly. Ferry data is not live vessel tracking; cruise capacity is scheduled capacity, not actual passenger count."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {utilityShortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                href={shortcut.href}
                className="rounded-[var(--vv-agent-radius-card)] border border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] p-5 shadow-[var(--vv-agent-shadow-card)] transition hover:-translate-y-1 hover:border-[var(--vv-agent-aqua-line)]"
              >
                <h3 className="font-semibold text-[var(--vv-agent-ink)]">
                  {shortcut.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--vv-agent-muted)]">
                  {shortcut.detail}
                </p>
              </Link>
            ))}
          </div>
        </AgentPageSection>
      </div>
    </div>
  );
}
