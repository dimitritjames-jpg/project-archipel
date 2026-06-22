import Link from "next/link";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { ISLAND_SLUGS, ISLAND_MAP } from "@/lib/islands";
import { cn } from "@/lib/utils";

const utilityLinks = [
  { href: "/experiences/adventure", label: "Adventure" },
  { href: "/experiences/culture", label: "Culture" },
  { href: "/experiences/culinary", label: "Culinary" },
  { href: "/experiences/cruise-day", label: "Cruise Day" },
  { href: "/st-thomas/nightlife-rhythm", label: "Nightlife" },
  { href: "/get-listed", label: "Get listed" },
] as const;

const planningLinks = [
  { href: "/st-john/ferry-schedule", label: "Ferries" },
  { href: "/st-thomas/cruise-schedule", label: "Port radar" },
  { href: "/map", label: "Map" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-midnight-950/82 backdrop-blur-2xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-[-0.03em] text-archipel-white sm:text-lg"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-aqua/70" />
          <span>
            Vibe<span className="text-aqua/80 transition group-hover:text-aqua">VI</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {ISLAND_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-archipel-white/62 transition hover:bg-white/7 hover:text-archipel-white"
            >
              {ISLAND_MAP[slug].name}
            </Link>
          ))}
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-archipel-white/50 transition hover:text-aqua"
            >
              {link.label}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-white/12" aria-hidden="true" />
          {planningLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-archipel-white/40 transition hover:text-aqua"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-full border border-aqua/20 bg-aqua px-4 text-sm font-bold text-midnight-950",
            "shadow-[0_0_32px_rgba(55,234,217,0.18)] transition hover:-translate-y-0.5 hover:bg-[#73f6e9]",
          )}
        >
          <span className="hidden sm:inline">Open discovery</span>
          <span className="sm:hidden">Discover</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <nav
        aria-label="Mobile island navigation"
        className="section-shell flex gap-1 overflow-x-auto border-t border-white/5 py-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...utilityLinks, ...ISLAND_SLUGS.map((slug) => ({
          href: `/${slug}`,
          label: ISLAND_MAP[slug].name,
        })), ...planningLinks].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-archipel-white/60 transition hover:border-aqua/25 hover:text-aqua"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
