import Link from "next/link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { CATEGORY_MEDIA } from "@/lib/media";
import { serializeJsonLd } from "@/lib/utils";

type BusinessProfileViewProps = {
  business: PublishedBusinessRow;
  islandSlug: IslandSlug;
  canonicalUrl: string;
};

export function BusinessProfileView({
  business,
  islandSlug,
  canonicalUrl,
}: BusinessProfileViewProps) {
  const islandName = getIslandName(islandSlug);
  const categorySlug = business.category?.slug ?? "directory";
  const isDemo = business.is_demo;
  const gradient =
    CATEGORY_MEDIA[categorySlug] ?? "from-cyan-400/40 via-midnight-950 to-indigo-600/35";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": business.category?.schema_type ?? "LocalBusiness",
    "@id": `${canonicalUrl}#business`,
    name: business.name,
    url: canonicalUrl,
    description: business.description_plain,
    telephone: business.phone ?? undefined,
    email: business.email ?? undefined,
    priceRange: business.price_range ?? undefined,
    address: business.street_address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.street_address,
          addressLocality: business.address_locality ?? islandName,
          addressRegion: "VI",
          addressCountry: "US",
        }
      : undefined,
  };

  return (
    <>
      {!isDemo ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      ) : null}

      <MediaBackdrop
        media={{
          id: business.slug,
          label: business.name,
          gradient,
          src: null,
          alt: `Abstract visual identity for ${business.name}`,
        }}
        overlay="hero"
        className="min-h-[min(68vh,620px)]"
      >
        <div className="section-shell flex min-h-[min(68vh,620px)] flex-col justify-end pb-12 pt-24 sm:pb-14">
          <nav className="text-xs text-archipel-white/42" aria-label="Breadcrumb">
            <Link href={`/${islandSlug}`} className="transition hover:text-aqua">
              {islandName}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${islandSlug}/${categorySlug}`} className="transition hover:text-aqua">
              {business.category?.name ?? "Directory"}
            </Link>
          </nav>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <ComingSoonBadge label={isDemo ? "Fictional demo listing" : "Launch preview"} />
                {business.is_verified && !isDemo ? (
                  <span className="rounded-full border border-botanical/25 bg-botanical/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-botanical">
                    Verified
                  </span>
                ) : null}
              </div>
              <h1 className="text-balance mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-archipel-white sm:text-6xl lg:text-7xl">
                {business.name}
              </h1>
              <p className="mt-4 text-sm font-medium text-aqua/78">
                {business.category?.name ?? "Business"} · {islandName}
                {business.price_range ? ` · ${business.price_range}` : ""}
              </p>
            </header>

            <aside className="command-surface rounded-[1.35rem] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-aqua/65">
                Profile controls
              </p>
              <div className="mt-4 grid gap-2">
                {business.phone ? (
                  <a href={`tel:${business.phone}`} className="rounded-xl bg-aqua px-4 py-3 text-center text-sm font-bold text-midnight-950">
                    Call business
                  </a>
                ) : null}
                {business.website_url ? (
                  <a
                    href={business.website_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-archipel-white/75 transition hover:border-aqua/25 hover:text-aqua"
                  >
                    Visit website ↗
                  </a>
                ) : null}
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-archipel-white/35">
                {isDemo
                  ? "Demonstration only. This does not represent a real business or active offer."
                  : "Confirm hours, availability, and booking details directly with the business."}
              </p>
            </aside>
          </div>
        </div>
      </MediaBackdrop>

      <article className="section-shell py-14 sm:py-18 lg:py-22">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
          <div>
            <p className="eyebrow-label">
              {isDemo ? "What this preview demonstrates" : "Why it is on the board"}
            </p>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-archipel-white/68 sm:text-lg">
              {business.description_plain.split(/\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="command-surface h-fit rounded-[1.4rem] p-6 text-sm">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-archipel-white/35">
              Listing details
            </p>
            {business.street_address ? (
              <div className="mt-5 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">Address</dt>
                <dd className="mt-2 leading-relaxed text-archipel-white/70">
                  {business.street_address}
                  {business.address_locality ? `, ${business.address_locality}` : ""}
                </dd>
              </div>
            ) : null}
            {business.phone ? (
              <div className="mt-4 border-t border-white/8 pt-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-archipel-white/35">Phone</dt>
                <dd className="mt-2">
                  <a href={`tel:${business.phone}`} className="text-aqua hover:underline">
                    {business.phone}
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-archipel-white/38">
              {isDemo
                ? "Fictional demo inventory. No contact, availability, pricing, or service claim is active."
                : "Preview presentation. Public business details are sourced from the published directory record."}
            </div>
          </dl>
        </div>

        <aside className="command-surface topographic-field mt-14 overflow-hidden rounded-[1.6rem] border-coral/15 p-6 sm:p-8">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow-label !text-coral-sunset">Is this your business?</p>
                <ComingSoonBadge label="Owner tools coming soon" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                Claim your profile on VibeVI.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
                Prepare richer media, hours, offers, and future featured placement. Self-serve claiming is not active yet; join the launch workflow to register interest.
              </p>
            </div>
            <Link href="/get-listed" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-coral px-5 text-sm font-bold text-midnight-950 transition hover:bg-[#ff9b8e]">
              Claim your business
            </Link>
          </div>
        </aside>
      </article>
    </>
  );
}
