import type { Metadata } from "next";
import Link from "next/link";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";

export const metadata: Metadata = {
  title: "Discovery Command",
  description: "Search published businesses across the USVI by island, category, and mood.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ vibe?: string; island?: string; category?: string }>;
};

const searchPrompts = [
  "waterfront dinner",
  "charter",
  "wellness",
  "Cruz Bay",
] as const;

export default async function SearchPage({ searchParams }: Props) {
  const { vibe } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/7 px-4 py-20 sm:px-6 lg:py-28">
        <div className="topographic-field absolute inset-0 opacity-50" aria-hidden />
        <div className="absolute left-[55%] top-[10%] h-80 w-80 rounded-full border border-aqua/10" aria-hidden />
        <div className="section-shell relative grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end">
          <div>
            <p className="eyebrow-label">Discovery command</p>
            <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-archipel-white sm:text-7xl">
              Ask the islands what fits next.
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-archipel-white/62 sm:text-lg">
              Search the published directory by place, business, or category. This
              is direct Supabase search—Algolia remains planned and disabled.
            </p>
            <div className="mt-8 max-w-2xl">
              <HomeSearchBar />
            </div>
          </div>

          <aside className="command-surface rounded-[1.4rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/65">
                Search mode
              </p>
              <span className="rounded-full border border-botanical/20 bg-botanical/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-botanical">
                Supabase active
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-archipel-white/56">
              Results come from published business names and descriptions. No AI or
              semantic-ranking claim is made in this release.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {searchPrompts.map((prompt) => (
                <span key={prompt} className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-[11px] text-archipel-white/45">
                  {prompt}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <VibeFilterRail activeId={vibe} className="!px-0" title="Route by mood" />

        <section className="mt-16" aria-labelledby="island-search">
          <SectionHeader
            eyebrow="Choose a starting point"
            title="Search one island—or keep the whole board open."
            description="Island hubs provide the strongest context when you already know which shore the day belongs to."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ISLAND_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="command-surface group rounded-[1.25rem] p-5 transition hover:-translate-y-1 hover:border-aqua/25"
              >
                <p className="font-mono text-[9px] text-archipel-white/30">
                  PORTAL {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-8 text-lg font-semibold tracking-[-0.035em] text-archipel-white group-hover:text-aqua">
                  {ISLAND_MAP[slug].name}
                </h2>
                <p className="mt-2 text-xs text-archipel-white/42">Open island context ↗</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="category-chips">
          <div className="flex flex-wrap items-center gap-3">
            <p id="category-chips" className="eyebrow-label">Category channels</p>
            <ComingSoonBadge label="Growing launch set" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CORE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/st-thomas/${category.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-archipel-white/65 transition hover:border-aqua/30 hover:bg-aqua/7 hover:text-aqua"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
