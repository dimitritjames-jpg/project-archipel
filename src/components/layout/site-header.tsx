import Link from "next/link";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { cn } from "@/lib/utils";

const utilityLinks = [
  { href: "/guides/best-beaches-usvi", label: "Beach" },
  { href: "/experiences/adventure", label: "Adventure" },
  { href: "/experiences/culinary", label: "Culinary" },
  { href: "/experiences/culture", label: "Culture" },
  { href: "/experiences/cruise-day", label: "Cruise" },
  { href: "/experiences/nightlife", label: "Night" },
  { href: "/map", label: "Map" },
  { href: "/get-listed", label: "Get listed" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0b4b55]/10 bg-[#fff8e8]/82 shadow-[0_10px_34px_rgba(11,75,85,0.08)] backdrop-blur-xl">
      <div className="section-shell flex h-20 min-w-0 items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 text-base font-semibold tracking-[-0.03em] text-[#123840] sm:gap-3 sm:text-lg"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-aqua/70" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate">
              Vibe<span className="text-reef-blue transition group-hover:text-coral-sunset">VI</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.18em] text-[#47636a] sm:block">
              Find Your Island Vibe
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#315057] transition hover:bg-aqua/10 hover:text-[#0b4b55]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className={cn(
            "inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#0b4b55]/14 bg-[#0b4b55] px-3 text-xs font-bold text-white sm:gap-2 sm:px-4 sm:text-sm",
            "shadow-[0_14px_40px_rgba(11,75,85,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
          )}
        >
          <span>Search</span>
          <span aria-hidden="true" className="hidden sm:inline">
            &rarr;
          </span>
        </Link>
      </div>

      <nav
        aria-label="Mobile island navigation"
        className="section-shell flex gap-1 overflow-x-auto border-t border-[#0b4b55]/8 py-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {utilityLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-[#0b4b55]/12 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#315057] transition hover:border-aqua/35 hover:text-[#0b4b55]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
