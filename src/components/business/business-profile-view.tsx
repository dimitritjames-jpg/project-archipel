import Link from "next/link";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import { getIslandName, type IslandSlug } from "@/lib/islands";
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
  const categorySlug = business.category?.slug;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="text-sm text-archipel-white/50" aria-label="Breadcrumb">
          <Link href={`/${islandSlug}`} className="hover:text-archipel-white">
            {islandName}
          </Link>
          {categorySlug ? (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/${islandSlug}/${categorySlug}`}
                className="hover:text-archipel-white"
              >
                {business.category?.name}
              </Link>
            </>
          ) : null}
        </nav>

        <header className="mt-6">
          {business.is_verified ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-botanical">
              Verified
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold text-archipel-white sm:text-4xl">
            {business.name}
          </h1>
          <p className="mt-2 text-sm text-archipel-white/60">
            {business.category?.name} · {islandName}
            {business.price_range ? ` · ${business.price_range}` : ""}
          </p>
        </header>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-archipel-white/80">
          {business.description_plain.split(/\n+/).map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <dl className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm">
          {business.street_address ? (
            <div>
              <dt className="text-archipel-white/50">Address</dt>
              <dd className="mt-1 text-archipel-white">
                {business.street_address}
                {business.address_locality ? `, ${business.address_locality}` : ""}
              </dd>
            </div>
          ) : null}
          {business.phone ? (
            <div>
              <dt className="text-archipel-white/50">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${business.phone}`}
                  className="text-archipel-white hover:underline"
                >
                  {business.phone}
                </a>
              </dd>
            </div>
          ) : null}
          {business.website_url ? (
            <div>
              <dt className="text-archipel-white/50">Website</dt>
              <dd className="mt-1">
                <a
                  href={business.website_url}
                  className="text-botanical hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit website
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </article>
    </>
  );
}
