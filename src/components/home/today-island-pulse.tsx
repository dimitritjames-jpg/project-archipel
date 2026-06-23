import Link from "next/link";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

type IslandMoveCardProps = {
  index: string;
  title: string;
  summary: string;
  href: string;
  accent: "aqua" | "coral" | "lime" | "sand";
  preview?: boolean;
};

const accentStyles = {
  aqua: "bg-aqua shadow-[0_0_14px_#37ead9]",
  coral: "bg-coral shadow-[0_0_14px_#ff7968]",
  lime: "bg-lime shadow-[0_0_14px_#b8ee75]",
  sand: "bg-sand shadow-[0_0_14px_rgba(244,223,184,0.85)]",
} as const;

function IslandMoveCard({
  index,
  title,
  summary,
  href,
  accent,
  preview,
}: IslandMoveCardProps) {
  return (
    <Link
      href={href}
      className="island-card-glow island-postcard-card group relative flex min-h-52 flex-col justify-between overflow-hidden rounded-[1.4rem] border border-sand/12 bg-[#062532] p-5 transition duration-300 hover:-translate-y-1 hover:border-sand/30"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-sand/62">
          Move / {index}
        </span>
        <span className={cn("h-2 w-2 rounded-full", accentStyles[accent])} />
      </div>
      <div className="relative z-10 mt-10">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold tracking-[-0.035em] text-archipel-white transition group-hover:text-sand">
            {title}
          </h3>
          {preview ? <ComingSoonBadge label="Preview" /> : null}
        </div>
        <p className="text-pretty mt-3 text-sm leading-relaxed text-archipel-white/58">
          {summary}
        </p>
        <p className="mt-5 text-xs font-semibold text-sand/85">
          Open the move <span aria-hidden="true">↗</span>
        </p>
      </div>
    </Link>
  );
}

export function TodayIslandPulse() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="today-pulse">
      <div className="absolute inset-x-0 top-10 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,184,77,0.12),transparent_62%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeader
            eyebrow="What's the move today?"
            title="Start with the vibe, then follow the water."
            description="Plan the ferry. Find the table. Chase the sunset. Build the day around ferry hops, beach windows, cruise-day moves, dinner, boats, and late-night rhythm."
          />
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-sand/14 bg-sand/[0.045] p-2 sm:gap-3 sm:p-3">
            {[
              ["Ferry", "Hop"],
              ["Beach", "Window"],
              ["Night", "Rhythm"],
            ].map(([label, state], index) => (
              <div key={label} className={cn("rounded-xl px-3 py-3", index === 0 && "bg-aqua/7", index === 1 && "bg-sand/7", index === 2 && "bg-coral/7")}>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-archipel-white/42">{label}</p>
                <p className="mt-1 text-xs font-semibold text-archipel-white/70">{state}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-2">
          <div className="island-postcard-card overflow-hidden rounded-[1.6rem] border border-sand/12 bg-gradient-to-br from-aqua/18 via-[#062532] to-sand/10 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-aqua/78">
                Ferry hop
              </p>
              <Link href="/st-john/ferry-schedule" className="text-[11px] text-archipel-white/45 hover:text-aqua">
                Full ferry board ↗
              </Link>
            </div>
            <NextBoatWidget className="!min-h-0 !border-0 !bg-transparent !p-1 !shadow-none" />
          </div>

          <div className="island-postcard-card overflow-hidden rounded-[1.6rem] border border-coral/14 bg-gradient-to-br from-coral/18 via-[#221223] to-sand/10 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-coral-sunset/82">
                Cruise-day flow
              </p>
              <Link href="/st-thomas/cruise-schedule" className="text-[11px] text-archipel-white/45 hover:text-coral-sunset">
                Open cruise schedule ↗
              </Link>
            </div>
            <CrowdPredictor className="!min-h-0 !border-0 !bg-transparent !p-1 !shadow-none" />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <IslandMoveCard
            index="01"
            title="Find a beach window"
            summary="Start with Magens Bay, Trunk Bay, or Honeymoon Beach. Editorial planning notes are labeled preview until fully sourced."
            href="/st-thomas/magens-bay"
            accent="lime"
            preview
          />
          <IslandMoveCard
            index="02"
            title="Make the dinner move"
            summary="Water first, dinner after: local plates, beach bars, sunset tables, and boardwalk nights by island."
            href="/st-thomas/indulgent-dining"
            accent="coral"
          />
          <IslandMoveCard
            index="03"
            title="Put a boat in the day"
            summary="Reef morning, beach-hop afternoon, sunset sail later. Browse published charter and excursion listings."
            href="/st-john/excursions-charters"
            accent="aqua"
          />
        </div>
      </div>
    </section>
  );
}
