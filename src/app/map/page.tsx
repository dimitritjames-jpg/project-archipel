import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Island Map",
  description: "A map-oriented view of published VibeVI business listings across the U.S. Virgin Islands.",
  robots: { index: false, follow: true },
};

const mapRoutes = [
  ["St. Thomas", "/st-thomas"],
  ["St. Croix", "/st-croix"],
  ["St. John", "/st-john"],
  ["Water Island", "/water-island"],
] as const;

export default function MapPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/7 px-4 py-20 sm:px-6 lg:py-28">
        <div className="topographic-field absolute inset-0 opacity-50" aria-hidden />
        <div className="section-shell relative grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">
          <SectionHeader
            eyebrow="Island map"
            title="Find the beach, boat, bite, or night."
            description="Use the visual map when Mapbox is configured, or move through the same published directory with island and search routes."
          />
          <div className="grid grid-cols-2 gap-2">
            {mapRoutes.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-archipel-white/62 transition hover:border-aqua/25 hover:text-aqua"
              >
                <span className="mr-2 font-mono text-[9px] text-archipel-white/28">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <DirectoryMapSection />
      </div>
    </>
  );
}
