import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryMapSection } from "@/components/map/directory-map-section";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Island Map",
  description: "See VibeVI places across the U.S. Virgin Islands and follow the water, road, or ferry to the next move.",
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
            description="See the islands as one connected day. Find what is nearby, then follow the water, road, or ferry."
          />
          <div className="grid grid-cols-2 gap-2">
            {mapRoutes.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-sand/12 bg-sand/[0.04] px-4 py-3 text-sm text-archipel-white/68 transition hover:border-sand/30 hover:text-sand"
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
