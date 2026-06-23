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
    <header className="sticky top-0 z-50 border-b border-[#0b4b55]/10 bg-[#fff8e8]/82 shadow-[0_10px_34px_rgba(11,75,85,0.08)] backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-base font-semibold tracking-[-0.03em] text-[#123840] sm:text-lg"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-aqua/70" />
          <span className="flex flex-col leading-none">
            <span>
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
            "inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0b4b55]/14 bg-[#0b4b55] px-4 text-sm font-bold text-white",
            "shadow-[0_14px_40px_rgba(11,75,85,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
          )}
        >
          <span className="hidden sm:inline">Find the move</span>
          <span className="sm:hidden">Search</span>
          <span aria-hidden="true">&rarr;</span>
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
