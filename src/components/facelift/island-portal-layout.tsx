import Image from "next/image";
import Link from "next/link";
import { CategoryIconRail } from "@/components/facelift/category-icon-rail";
import { EditorialBand } from "@/components/facelift/editorial-band";
import { EditorialMediaCard } from "@/components/facelift/editorial-media-card";
import { ListingCard } from "@/components/facelift/listing-card";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { TrustBadge } from "@/components/facelift/trust-badge";
import { VvButtonSecondary, VvCard, VvEyebrow, VvHeading } from "@/components/facelift/vv-ui";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { CORE_CATEGORIES } from "@/lib/categories";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset, getGuideMediaAsset } from "@/lib/media";
import { VIBEVI_EXPERIENCES, VIBEVI_ISLANDS, VIBEVI_SEARCH, VIBEVI_LISTING_PLACEHOLDERS, type CardMedia } from "@/lib/vibevi-media";

function mediaSrc(src: string | null): string {
  return src ?? VIBEVI_LISTING_PLACEHOLDERS.landscape;
}

const ISLAND_EXPERIENCES: Record<IslandSlug, string[]> = {
  "st-thomas": ["adventure", "culinary", "nightlife", "cruise-day"],
  "st-john": ["adventure", "culture", "wellness"],
  "st-croix": ["culture", "culinary", "adventure"],
  "water-island": ["adventure", "cruise-day"],
};

type GuideLink = { label: string; href: string; detail: string };

type IslandPortalLayoutProps = {
  islandSlug: IslandSlug;
  islandParam: string;
  details: { coordinate: string; rhythm: string; editorial: string };
  utilityLinks: { label: string; href: string }[];
  guideLinks: GuideLink[];
  featuredListings: PublishedBusinessRow[];
  featuredAreDemo: boolean;
};

function buildCategoryRail(islandParam: string): CardMedia[] {
  return CORE_CATEGORIES.map((category) => {
    const media = getCategoryMediaAsset(category.slug, category.name);
    return {
      desktop: mediaSrc(media.src),
      mobile: mediaSrc(media.src),
      alt: media.alt,
      label: category.name.split(" ")[0] ?? category.name,
      href: `/${islandParam}/${category.slug}`,
      objectPosition: "center",
    };
  });
}

export function IslandPortalLayout({
  islandSlug,
  islandParam,
  details,
  utilityLinks,
  guideLinks,
  featuredListings,
  featuredAreDemo,
}: IslandPortalLayoutProps) {
  const name = getIslandName(islandSlug);
  const island = VIBEVI_ISLANDS[islandSlug];
  const categoryRail = buildCategoryRail(islandParam);
  const experienceSlugs = ISLAND_EXPERIENCES[islandSlug];

  return (
    <div className="vv-page">
      <ResponsiveHero media={island} priority minHeight="min-h-[min(72vh,680px)]">
        <div className="section-shell flex min-h-[inherit] flex-col justify-end pb-10 pt-24 sm:pb-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.45fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <VvEyebrow className="!text-[#7ee8df]">Island portal</VvEyebrow>
                <TrustBadge label={details.coordinate} tone="neutral" className="!bg-white/15 !text-white/90" />
              </div>
              <h1 className="font-display mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                {name}
              </h1>
              <p className="mt-4 max-w-xl text-lg font-medium text-[#ffd4c8] sm:text-xl">
                {island.tagline}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82">
                {island.statement}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/68">{details.rhythm}</p>
            </div>

            <VvCard className="border-white/15 bg-white/95 p-5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
                Island shortcuts
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl border border-[#0b4b55]/10 bg-[#fffaf3] px-3 py-3 text-xs font-semibold text-[#315057] transition hover:border-[#0797a6]/30 hover:bg-[#e9fbf7] hover:text-[#0b4b55]"
                  >
                    {link.label} ↗
                  </Link>
                ))}
              </div>
              <p className="mt-4 border-t border-[#0b4b55]/8 pt-4 text-xs leading-relaxed text-[#496871]">
                {details.editorial}
              </p>
            </VvCard>
          </div>
        </div>
      </ResponsiveHero>

      <div className="section-shell py-12 sm:py-16">
        <VvEyebrow>Explore by category</VvEyebrow>
        <VvHeading className="mt-2 text-2xl sm:text-3xl">Route {name} by mood.</VvHeading>
        <CategoryIconRail items={categoryRail} className="mt-6" />

        <section className="mt-14" aria-labelledby="island-guides-heading">
          <VvEyebrow>Useful guides</VvEyebrow>
          <VvHeading id="island-guides-heading" className="mt-2 text-2xl sm:text-3xl">
            Plan with local context.
          </VvHeading>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {guideLinks.map((guide, index) => {
              const guideMedia = getGuideMediaAsset(`${guide.href} ${guide.label}`, guide.label);
              return (
                <EditorialMediaCard
                  key={guide.href}
                  href={guide.href}
                  title={guide.label}
                  subtitle={guide.detail}
                  imageSrc={mediaSrc(guideMedia.src)}
                  imageAlt={guideMedia.alt}
                  badge={`Guide 0${index + 1}`}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="categories-heading">
          <VvEyebrow>{name} directory</VvEyebrow>
          <VvHeading id="categories-heading" className="mt-2 text-2xl sm:text-3xl">
            Choose why you&apos;re heading out.
          </VvHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_CATEGORIES.map((category, index) => {
              const categoryMedia = getCategoryMediaAsset(category.slug, category.name);
              return (
                <EditorialMediaCard
                  key={category.slug}
                  href={`/${islandParam}/${category.slug}`}
                  title={category.name}
                  subtitle={categoryMedia.label}
                  imageSrc={mediaSrc(categoryMedia.src)}
                  imageAlt={categoryMedia.alt}
                  badge={`0${index + 1} · Category`}
                  className="h-full min-h-[220px]"
                />
              );
            })}
          </div>
        </section>

        {featuredListings.length > 0 ? (
          <section className="mt-14" aria-labelledby="featured-heading">
            <VvEyebrow>{featuredAreDemo ? "Inventory preview" : "Top picks"}</VvEyebrow>
            <VvHeading id="featured-heading" className="mt-2 text-2xl sm:text-3xl">
              {featuredAreDemo
                ? `See how ${name} listings will work.`
                : `Operators on the ${name} board.`}
            </VvHeading>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#496871]">
              {featuredAreDemo
                ? "Fictional demonstration profiles only. No real contact, pricing, or availability claims."
                : "Published listings with direct-source details. Confirm time-sensitive info with the business."}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.slice(0, 3).map((business) => (
                <ListingCard key={business.id} business={business} islandSlug={islandParam} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14" aria-labelledby="related-experiences">
          <VvEyebrow>Related experiences</VvEyebrow>
          <VvHeading id="related-experiences" className="mt-2 text-2xl sm:text-3xl">
            Follow the island thread.
          </VvHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experienceSlugs.map((slug) => {
              const exp = VIBEVI_EXPERIENCES[slug];
              if (!exp) return null;
              return (
                <Link
                  key={slug}
                  href={`/experiences/${slug}`}
                  className="group overflow-hidden rounded-[1.15rem] border border-[#0b4b55]/10 bg-white shadow-[0_8px_24px_rgba(11,75,85,0.08)] transition hover:-translate-y-0.5"
                >
                  <span className="relative block h-36">
                    <Image src={exp.thumbnail} alt={exp.alt} fill sizes="25vw" className="object-cover" />
                  </span>
                  <span className="block p-4">
                    <span className="font-semibold text-[#173941] group-hover:text-[#0b4b55]">
                      {exp.title}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <EditorialBand
          media={VIBEVI_SEARCH.hero}
          title={`Map your ${name} day.`}
          body="Compare beaches, boats, bites, and return routes on the island planning board."
          ctaLabel="Open island map"
          ctaHref="/map"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <VvButtonSecondary href={`/search?island=${islandParam}`}>Find the move</VvButtonSecondary>
          <VvButtonSecondary href="/get-listed">List your business</VvButtonSecondary>
        </div>
      </div>
    </div>
  );
}
