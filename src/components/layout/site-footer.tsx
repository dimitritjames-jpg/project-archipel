import Link from "next/link";

import { ArchipelMark } from "@/components/ui/archipel-mark";
import { SITE_TIMEZONE } from "@/lib/env";
import { ISLAND_MAP, ISLAND_SLUGS } from "@/lib/islands";

const utilityLinks = [
  ["/guides/best-beaches-usvi", "Beach"],
  ["/experiences/adventure", "Boat"],
  ["/experiences/culinary", "Bite"],
  ["/st-thomas/nightlife-rhythm", "Night"],
  ["/experiences/culture", "Culture"],
  ["/experiences/cruise-day", "Cruise Day"],
  ["/st-john/ferry-schedule", "Ferry board"],
  ["/st-thomas/cruise-schedule", "Cruise days"],
  ["/map", "Island map"],
  ["/search", "Find the move"],
  ["/get-listed", "Get listed on VibeVI"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#0b4b55]/10 bg-[#fff4d6] text-[#173941]">
      <div className="topographic-field absolute inset-y-0 right-0 w-1/2 opacity-25" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/45 to-transparent" aria-hidden />

      <div className="section-shell relative py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <ArchipelMark />
              <div>
                <p className="text-xl font-semibold tracking-[-0.04em] text-[#173941]">
                  VibeVI
                </p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-reef-blue">
                  Find Your Island Vibe
                </p>
              </div>
            </div>
            <p className="text-pretty mt-5 max-w-xl text-base leading-relaxed text-[#45636a]">
              Find Your Island Vibe — beach mornings, boat days, local plates,
              waterfront nights, ferry checks, cruise-day planning, and local businesses across the U.S. Virgin Islands.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-full border border-aqua/15 bg-aqua/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-reef-blue">
                Schedule-aware
              </span>
              <span className="rounded-full border border-rum-amber/14 bg-rum-amber/7 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-rum-amber">
                Beach / Boat / Bite / Night
              </span>
              <span className="rounded-full border border-coral/15 bg-coral/7 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-coral-sunset">
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
                    className="text-sm text-[#45636a] transition hover:translate-x-1 hover:text-reef-blue"
                  >
                    {ISLAND_MAP[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-label">Find the move</p>
            <ul className="mt-5 space-y-3">
              {utilityLinks.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#45636a] transition hover:text-reef-blue"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-[1.4rem] border border-coral/15 bg-white/70 p-6 shadow-[0_18px_70px_rgba(201,118,47,0.12)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-lg font-semibold text-[#173941]">Run a USVI business?</p>
              <span className="rounded-full border border-[#0b4b55]/10 bg-aqua/7 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-[#45636a]">
                Owner tools preview
              </span>
            </div>
            <p className="mt-2 text-sm text-[#45636a]">
              Get listed on VibeVI now so visitors can find the beach bar, boat day, local plate, shop, stay, or night out that fits.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/get-listed" className="rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-midnight-950">
              Get listed on VibeVI
            </Link>
            <Link href="/get-listed#active-now" className="rounded-full border border-[#0b4b55]/12 bg-white px-5 py-2.5 text-sm font-semibold text-[#173941]">
              Claim your business
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-[#0b4b55]/10 pt-6 text-[11px] leading-relaxed text-[#60747a] sm:grid-cols-[1fr_auto]">
          <p>
            Ferry information is schedule-based. Confirm with the operator before
            travel. Scheduled ship capacity is a planning estimate — not an actual
            passenger count. Times display in {SITE_TIMEZONE} when available.
          </p>
          <p>© {new Date().getFullYear()} VibeVI</p>
        </div>
      </div>
    </footer>
  );
}
