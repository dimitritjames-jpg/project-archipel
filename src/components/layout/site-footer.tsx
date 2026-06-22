import Link from "next/link";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { SITE_TIMEZONE } from "@/lib/env";
import { ISLAND_SLUGS, ISLAND_MAP } from "@/lib/islands";

const utilityLinks = [
  ["/experiences/adventure", "Adventure"],
  ["/experiences/culture", "Culture"],
  ["/experiences/culinary", "Culinary"],
  ["/experiences/cruise-day", "Cruise Day"],
  ["/st-thomas/nightlife-rhythm", "Nightlife"],
  ["/st-john/ferry-schedule", "Ferry board"],
  ["/st-thomas/cruise-schedule", "Port radar"],
  ["/map", "Island map"],
  ["/search", "Discovery search"],
  ["/get-listed", "Get listed on VibeVI"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#010611]">
      <div className="topographic-field absolute inset-y-0 right-0 w-1/2 opacity-35" aria-hidden />
      <div className="section-shell relative py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <ArchipelMark />
              <p className="text-xl font-semibold tracking-[-0.04em] text-archipel-white">
                VibeVI
              </p>
            </div>
            <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-archipel-white/55">
              Find Your Island Vibe—beaches, boats, bites, ferry checks, cruise-day
              planning, and local businesses across the U.S. Virgin Islands.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-full border border-aqua/15 bg-aqua/7 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-aqua/80">
                Schedule-aware
              </span>
              <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-archipel-white/55">
                Four islands
              </span>
              <span className="rounded-full border border-coral/15 bg-coral/7 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-coral-sunset/80">
                Launch preview
              </span>
            </div>
          </div>

          <div>
            <p className="eyebrow-label">Islands</p>
            <ul className="mt-5 space-y-3">
              {ISLAND_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-sm text-archipel-white/58 transition hover:translate-x-1 hover:text-aqua"
                  >
                    {ISLAND_MAP[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-label">Utilities</p>
            <ul className="mt-5 space-y-3">
              {utilityLinks.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-archipel-white/58 transition hover:text-aqua"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/get-listed" className="text-sm text-coral-sunset/80 hover:text-coral-sunset">
                  Get listed on VibeVI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-[1.4rem] border border-coral/15 bg-coral/6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2"><p className="text-lg font-semibold text-white">Run a USVI business?</p><span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-white/50">Owner tools preview</span></div>
            <p className="mt-2 text-sm text-white/50">Get listed on VibeVI now and prepare for richer profiles, sponsor features, and direct discovery.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/get-listed" className="rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-midnight-950">Get listed on VibeVI</Link>
            <Link href="/get-listed#active-now" className="rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">Claim your business</Link>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-white/8 pt-6 text-[11px] leading-relaxed text-archipel-white/35 sm:grid-cols-[1fr_auto]">
          <p>
            Ferry information is schedule-based. Confirm with the operator before
            travel. Scheduled ship capacity is a planning estimate—not an actual
            passenger count. Times display in {SITE_TIMEZONE} when available.
          </p>
          <p>© {new Date().getFullYear()} VibeVI</p>
        </div>
      </div>
    </footer>
  );
}
