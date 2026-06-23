import Link from "next/link";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { cn } from "@/lib/utils";

const utilityLinks = [
  { href: "/guides/best-beaches-usvi", label: "Beach" },
  { href: "/experiences/adventure", label: "Boat" },
  { href: "/experiences/culinary", label: "Bite" },
  { href: "/st-thomas/nightlife-rhythm", label: "Night" },
  { href: "/experiences/culture", label: "Culture" },
  { href: "/#today-pulse", label: "Today" },
  { href: "/#islands-heading", label: "Islands" },
  { href: "/map", label: "Map" },
  { href: "/get-listed", label: "Get listed" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061e24]/28 backdrop-blur-md">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-[-0.03em] text-white sm:text-lg"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-white/70" />
          <span>
            Vibe<span className="text-aqua transition group-hover:text-sand">VI</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/72 transition hover:bg-white/14 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-full border border-white/35 bg-white/88 px-4 text-sm font-bold text-[#123840]",
            "shadow-[0_14px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-sand",
          )}
        >
          <span className="hidden sm:inline">Find the move</span>
          <span className="sm:hidden">Search</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <nav
        aria-label="Mobile island navigation"
        className="section-shell flex gap-1 overflow-x-auto border-t border-white/8 py-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/72 transition hover:border-white/35 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
