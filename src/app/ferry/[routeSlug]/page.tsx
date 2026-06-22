import type { Metadata } from "next";
import { env } from "@/lib/env";
import { serializeJsonLd } from "@/lib/utils";

type Props = { params: Promise<{ routeSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { routeSlug } = await params;
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}`;

  return {
    title: `Ferry — ${routeSlug.replace(/-/g, " ")}`,
    description: `Directional ferry timetable, fares, and source verification.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function FerryRoutePage({ params }: Props) {
  const { routeSlug } = await params;
  const canonical = `${env.NEXT_PUBLIC_SITE_URL}/ferry/${routeSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Ferry route: ${routeSlug}`,
    url: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold capitalize text-archipel-white">
          {routeSlug.replace(/-/g, " ")}
        </h1>
        <p className="mt-4 text-archipel-white/70">
          Event + Schedule JSON-LD and live timetable load in Phase 2.
        </p>
      </div>
    </>
  );
}
