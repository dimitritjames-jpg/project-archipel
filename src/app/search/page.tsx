import type { Metadata } from "next";
import Link from "next/link";
import { VibeFilterRail } from "@/components/home/vibe-filter-rail";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { CORE_CATEGORIES } from "@/lib/categories";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";

export const metadata: Metadata = {
  title: "Find the Move",
  description: "Search VibeVI for beaches, boats, bites, nights, and published USVI businesses by island, category, and mood.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ vibe?: string; island?: string; category?: string }>;
};

const searchPrompts = [
  "waterfront dinner",
  "charter",
  "beach bar",
  "Cruz Bay",
] as const;

export default async function SearchPage({ searchParams }: Props) {
  const { vibe } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-sand/12 px-4 py-20 sm:px-6 lg:py-28">
        <div className="sun-wash absolute inset-0 opacity-70" aria-hidden />
        <div className="hero-ocean-shelf !h-[30%] !opacity-50" aria-hidden />
        <div className="section-shell relative grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end">
          <div>
            <p className="eyebrow-label">Start with the vibe</p>
            <h1 className="text-balance mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-archipel-white sm:text-7xl">
              What fits the day?
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-archipel-white/66 sm:text-lg">
              Search by place, business, or category. Plan the ferry, find the table,
              chase the sunset, or keep the whole island day open.
            </p>
            <div className="mt-8 max-w-2xl">
              <HomeSearchBar />
            </div>
          </div>

          <aside className="island-postcard-card rounded-[1.4rem] border border-sand/12 bg-[#062532] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sand/75">
                Search note
              </p>
              <span className="rounded-full border border-botanical/20 bg-botanical/8 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-botanical">
                Published listings
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-archipel-white/58">
              Results come from published business names and descriptions. No AI,
              booking, or live-availability claim is made in this release.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {searchPrompts.map((prompt) => (
                <span key={prompt} className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-[11px] text-archipel-white/48">
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
            title="Search one island — or keep the whole day open."
            description="Island hubs help when you already know which shore the day belongs to."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ISLAND_SLUGS.map((slug, index) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="island-postcard-card group rounded-[1.25rem] border border-sand/12 bg-[#062532] p-5 transition hover:-translate-y-1 hover:border-sand/30"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-sand/55">
                  ISLAND {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-8 text-lg font-semibold tracking-[-0.035em] text-archipel-white group-hover:text-sand">
                  {ISLAND_MAP[slug].name}
                </h2>
                <p className="mt-2 text-xs text-archipel-white/42">Open island guide ↗</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/8 pt-12" aria-labelledby="category-chips">
          <div className="flex flex-wrap items-center gap-3">
            <p id="category-chips" className="eyebrow-label">Beach, boat, bite, night</p>
            <ComingSoonBadge label="Growing launch set" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CORE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/st-thomas/${category.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-archipel-white/65 transition hover:border-sand/30 hover:bg-sand/7 hover:text-sand"
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
