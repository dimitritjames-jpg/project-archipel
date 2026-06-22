import Link from "next/link";
import { ISLAND_SLUGS, ISLAND_MAP } from "@/lib/islands";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-indigo-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-archipel-white">
          Project Archipel
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {ISLAND_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="text-sm text-archipel-white/80 transition hover:text-archipel-white"
            >
              {ISLAND_MAP[slug].name}
            </Link>
          ))}
          <Link
            href="/search"
            className="text-sm text-archipel-white/80 transition hover:text-archipel-white"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
