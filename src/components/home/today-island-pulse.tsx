import Link from "next/link";
import { CrowdPredictor } from "@/components/transit/CrowdPredictor";
import { NextBoatWidget } from "@/components/transit/NextBoatWidget";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

type DispatchCardProps = {
  index: string;
  title: string;
  summary: string;
  href: string;
  signal: "aqua" | "coral" | "lime";
  preview?: boolean;
};

const signalStyles = {
  aqua: "bg-aqua shadow-[0_0_14px_#37ead9]",
  coral: "bg-coral shadow-[0_0_14px_#ff7968]",
  lime: "bg-lime shadow-[0_0_14px_#b8ee75]",
} as const;

function DispatchCard({
  index,
  title,
  summary,
  href,
  signal,
  preview,
}: DispatchCardProps) {
  return (
    <Link
      href={href}
      className="island-card-glow group command-surface relative flex min-h-52 flex-col justify-between rounded-[1.4rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-aqua/20"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.18em] text-archipel-white/35">
          DISPATCH / {index}
        </span>
        <span className={cn("h-2 w-2 rounded-full", signalStyles[signal])} />
      </div>
      <div className="relative z-10 mt-10">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold tracking-[-0.035em] text-archipel-white transition group-hover:text-aqua">
            {title}
          </h3>
          {preview ? <ComingSoonBadge label="Preview" /> : null}
        </div>
        <p className="text-pretty mt-3 text-sm leading-relaxed text-archipel-white/56">
          {summary}
        </p>
        <p className="mt-5 text-xs font-semibold text-aqua/80">
          Open dispatch <span aria-hidden="true">↗</span>
        </p>
      </div>
    </Link>
  );
}

export function TodayIslandPulse() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="today-pulse">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeader
            eyebrow="Today in the islands"
            title="Read the day before you enter it."
            description="Schedule-based ferry moves, port-load context, and editorial cues for deciding where your time goes next."
          />
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/8 bg-white/[0.025] p-2 sm:gap-3 sm:p-3">
            {[
              ["FERRY", "Schedule"],
              ["PORT", "Capacity"],
              ["PULSE", "Preview"],
            ].map(([label, state], index) => (
              <div key={label} className={cn("rounded-xl px-3 py-3", index === 0 && "bg-aqua/7")}>
                <p className="font-mono text-[9px] tracking-[0.18em] text-archipel-white/35">{label}</p>
                <p className="mt-1 text-xs font-semibold text-archipel-white/70">{state}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-2">
          <div className="command-surface rounded-[1.6rem] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-aqua/70">
                Transit channel
              </p>
              <Link href="/st-john/ferry-schedule" className="text-[11px] text-archipel-white/45 hover:text-aqua">
                Full ferry board ↗
              </Link>
            </div>
            <NextBoatWidget className="!min-h-0 !border-0 !bg-transparent !p-1 !shadow-none" />
          </div>

          <div className="command-surface rounded-[1.6rem] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral-sunset/75">
                Port channel
              </p>
              <Link href="/st-thomas/cruise-schedule" className="text-[11px] text-archipel-white/45 hover:text-coral-sunset">
                Open port radar ↗
              </Link>
            </div>
            <CrowdPredictor className="!min-h-0 !border-0 !bg-transparent !p-1 !shadow-none" />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <DispatchCard
            index="01"
            title="Find a beach window"
            summary="Start with Magens Bay, Trunk Bay, or Honeymoon Beach. Editorial planning notes are labeled preview until fully sourced."
            href="/st-thomas/magens-bay"
            signal="lime"
            preview
          />
          <DispatchCard
            index="02"
            title="Follow the dinner signal"
            summary="Move from waterfront supper clubs to open-fire kitchens, filtered by island and the mood of the night."
            href="/st-thomas/indulgent-dining"
            signal="coral"
          />
          <DispatchCard
            index="03"
            title="Put a boat in the plan"
            summary="Browse published charter and excursion listings around Cruz Bay and the wider archipelago."
            href="/st-john/excursions-charters"
            signal="aqua"
          />
        </div>
      </div>
    </section>
  );
}
