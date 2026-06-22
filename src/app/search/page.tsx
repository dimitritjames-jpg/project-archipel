import type { Metadata } from "next";
import { HomeSearchBar } from "@/components/search/home-search-bar";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">Search</h1>
      <p className="mt-4 max-w-2xl text-archipel-white/70">
        Search published businesses across the archipelago using live Supabase data.
      </p>
      <div className="mt-8 max-w-2xl">
        <HomeSearchBar />
      </div>
    </div>
  );
}
