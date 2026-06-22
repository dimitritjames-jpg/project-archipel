import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessPreviewCard } from "@/components/discovery/business-preview-card";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { fetchPublishedBusinessesByCategory } from "@/lib/businesses/queries";
import { CORE_CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { env } from "@/lib/env";
import { getIslandBySlug, getIslandName, type IslandSlug } from "@/lib/islands";
import { CATEGORY_MEDIA } from "@/lib/media";

type Props = { params: Promise<{ island: string; categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) return { robots: { index: false, follow: false } };

  const islandName = getIslandName(islandParam as IslandSlug);
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/${islandParam}/${categorySlug}`;

  return {
    title: `${category.name} in ${islandName}`,
    description: `Find published ${category.name.toLowerCase()} listings across ${islandName}.`,
    alternates: { canonical },
    openGraph: { url: canonical },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { island: islandParam, categorySlug } = await params;
  const island = getIslandBySlug(islandParam);
  const category = getCategoryBySlug(categorySlug);
  if (!island || !category) notFound();

  const islandName = getIslandName(islandParam as IslandSlug);
  const businesses = await fetchPublishedBusinessesByCategory(
    islandParam as IslandSlug,
    categorySlug,
  );
  const gradient =
    CATEGORY_MEDIA[categorySlug] ?? "from-cyan-400/40 via-navy-900 to-indigo-600/35";

  return (
    <>
      <MediaBackdrop
        media={{
          id: categorySlug,
          label: category.name,
          gradient,
          src: null,
          alt: `Abstract visual for ${category.name} in ${islandName}`,
        }}
        overlay="hero"
        className="min-h-[min(58vh,540px)]"
      >
        <div className="section-shell flex min-h-[min(58vh,540px)] flex-col justify-end pb-12 pt-24 sm:pb-14">
          <Link
            href={`/${islandParam}`}
            className="w-fit text-xs font-semibold text-archipel-white/45 transition hover:text-aqua"
          >
            ← Back to {islandName}
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <p className="eyebrow-label">{islandName} / Discovery channel</p>
              <h1 className="text-balance mt-5 text-4xl font-semibold tracking-[-0.055em] text-archipel-white sm:text-6xl lg:text-7xl">
                {category.name}
              </h1>
              <p className="text-pretty mt-5 max-w-2xl text-base leading-relaxed text-archipel-white/64 sm:text-lg">
                {businesses.length > 0
                  ? `${businesses.length} published listing${businesses.length === 1 ? "" : "s"} on the launch board. Scan the set, then open a profile for source details.`
                  : "This channel is being assembled. Use search or move laterally into another island category."}
              </p>
            </div>
            <div className="command-surface rounded-[1.3rem] p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/60">Channel status</p>
                <ComingSoonBadge label="Launch preview" />
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-archipel-white">
                {String(businesses.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-archipel-white/42">published profiles</p>
            </div>
          </div>
        </div>
      </MediaBackdrop>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-archipel-white/32">
              Directory results
            </p>
            <p className="mt-1 text-sm text-archipel-white/55">
              Published Supabase listings · no paid ranking in this view
            </p>
          </div>
          <Link
            href={`/search?island=${islandParam}&category=${categorySlug}`}
            className="w-fit rounded-full border border-aqua/20 bg-aqua/7 px-4 py-2 text-xs font-semibold text-aqua transition hover:bg-aqua/12"
          >
            Search this channel ↗
          </Link>
        </div>

        {businesses.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <BusinessPreviewCard
                key={business.id}
                business={business}
                islandSlug={islandParam}
                launchPreview
              />
            ))}
          </div>
        ) : (
          <div className="command-surface topographic-field mt-8 rounded-[1.5rem] px-6 py-16 text-center">
            <SectionHeader
              align="center"
              eyebrow="Channel assembling"
              title="No published listings here—yet."
              description="Try the archipelago search, choose a neighboring category, or return as the launch set grows."
            />
            <Link
              href="/search"
              className="mt-7 inline-flex min-h-11 items-center rounded-full bg-aqua px-5 text-sm font-bold text-midnight-950"
            >
              Open discovery search
            </Link>
          </div>
        )}

        <section className="mt-16 border-t border-white/8 pt-10" aria-labelledby="neighboring-categories">
          <p id="neighboring-categories" className="eyebrow-label">Move sideways</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {CORE_CATEGORIES.filter((item) => item.slug !== categorySlug).map((item) => (
              <Link
                key={item.slug}
                href={`/${islandParam}/${item.slug}`}
                className="rounded-full border border-white/9 bg-white/[0.03] px-4 py-2 text-sm text-archipel-white/58 transition hover:border-aqua/25 hover:text-aqua"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
