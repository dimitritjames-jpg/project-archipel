import Link from "next/link";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/search", label: "Explore" },
  { href: "/st-thomas", label: "St. Thomas" },
  { href: "/st-john", label: "St. John" },
  { href: "/st-croix", label: "St. Croix" },
  { href: "/experiences/cruise-day", label: "Cruise" },
  { href: "/map", label: "Map" },
  { href: "/get-listed", label: "List Your Business" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0b4b55]/8 bg-[#fffaf3]/90 shadow-[0_8px_28px_rgba(11,75,85,0.06)] backdrop-blur-xl">
      <div className="section-shell flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 text-base font-semibold tracking-[-0.03em] text-[#123840] sm:text-lg"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-[#0797a6]/70" />
          <span className="font-display text-xl tracking-[-0.04em] sm:text-2xl">
            Vibe<span className="text-[#0797a6]">VI</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[#315057] transition hover:bg-[#e9fbf7] hover:text-[#0b4b55]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0b4b55]/12 bg-[#0b4b55] px-4 text-sm font-bold text-white",
            "shadow-[0_10px_28px_rgba(11,75,85,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
          )}
        >
          <span className="hidden sm:inline">Find the move</span>
          <span className="sm:hidden">Search</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="section-shell flex gap-1 overflow-x-auto border-t border-[#0b4b55]/6 py-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-[#0b4b55]/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#315057] transition hover:border-[#0797a6]/30 hover:text-[#0b4b55]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
