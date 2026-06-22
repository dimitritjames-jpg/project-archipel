import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map",
  robots: { index: false, follow: true },
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">Directory Map</h1>
      <p className="mt-4 text-archipel-white/70">
        Mapbox GL map with dark indigo styling loads in Phase 2.
      </p>
    </div>
  );
}
