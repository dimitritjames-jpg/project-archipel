import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { SectionHeader } from "@/components/ui/section-header";
import { HERO_MEDIA, ISLAND_PORTALS } from "@/lib/media";

export const metadata: Metadata = {
  title: "Island Map",
  description: "See VibeVI places across the U.S. Virgin Islands and follow the water, road, or ferry to the next move.",
  robots: { index: false, follow: true },
};

const mapRoutes = [
  ["St. Thomas", "/islands/st-thomas", "st-thomas"],
  ["St. Croix", "/islands/st-croix", "st-croix"],
  ["St. John", "/islands/st-john", "st-john"],
  ["Water Island", "/islands/water-island", "water-island"],
] as const;

export default function MapPage() {
  return (
    <>
      <MediaBackdrop media={{ ...HERO_MEDIA, id: "map-hero", label: "Island map" }} overlay="hero" priority className="border-b border-white/7">
        <section className="section-shell grid gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.6fr] lg:items-end lg:py-28">
          <SectionHeader
            eyebrow="Island map"
            title="Find the beach, boat, bite, or night."
            description="See the islands as one connected day. Find what is nearby, then follow the water, road, or ferry."
          />
          <div className="grid grid-cols-2 gap-3">
            {mapRoutes.map(([label, href, slug], index) => {
              const islandMedia = ISLAND_PORTALS[slug].media;

              return (
              <Link
                key={href}
                href={href}
                className="island-search-photo-card group relative min-h-[128px] overflow-hidden rounded-xl border border-sand/12 text-sm text-white transition hover:-translate-y-0.5 hover:border-sand/30"
              >
                {islandMedia.src ? (
                  <Image
                    src={islandMedia.src}
                    alt={islandMedia.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 24vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-65 ${islandMedia.gradient}`} aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-black/8" aria-hidden />
                <span className="relative z-10 flex min-h-[128px] flex-col justify-between p-4">
                  <span className="font-mono text-[9px] text-white/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold tracking-[-0.02em] text-white">{label} ↗</span>
                </span>
              </Link>
              );
            })}
          </div>
        </section>
      </MediaBackdrop>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <DirectoryMapSection />
      </div>
    </>
  );
}
