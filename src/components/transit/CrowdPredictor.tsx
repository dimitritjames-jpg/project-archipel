"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  classifyCrowdTraffic,
  fetchPortLoadDaily,
  type PortLoadDailyRow,
  type PortLoadSummary,
} from "@/lib/transit/supabase-ports";

type CrowdPredictorProps = {
  className?: string;
  islandCode?: PortLoadDailyRow["island"];
  scopeLabel?: string;
};

const INDICATOR_STYLES = {
  quiet: {
    ring: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    text: "text-emerald-800",
  },
  elevated: {
    ring: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    text: "text-amber-900",
  },
  busy: {
    ring: "bg-orange-50 border-orange-200",
    dot: "bg-orange-500",
    text: "text-orange-900",
  },
  "high-impact": {
    ring: "bg-rose-50 border-rose-300",
    dot: "bg-rose-600",
    text: "text-rose-900",
  },
} as const;

const BRIGHT_WIDGET =
  "pointer-events-auto min-h-[14.5rem] rounded-[1.25rem] border border-[#0b4b55]/10 bg-white p-4 shadow-[0_12px_40px_rgba(11,75,85,0.08)] sm:min-h-[15rem] sm:p-5";

export function CrowdPredictor({
  className,
  islandCode,
  scopeLabel,
}: CrowdPredictorProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<PortLoadSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPortLoad() {
      try {
        setLoading(true);
        setError(null);
        setSummary(null);
        const data = await fetchPortLoadDaily(undefined, islandCode);
        if (!cancelled) {
          setSummary(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load port traffic.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPortLoad();

    return () => {
      cancelled = true;
    };
  }, [islandCode]);

  const traffic = useMemo(() => {
    if (!summary || summary.rows.length === 0) {
      return null;
    }

    if (summary.shipCount > 0 && (summary.capacityCoverageRatio ?? 0) <= 0) {
      return {
        level: "elevated" as const,
        label: "Calls Listed - Capacity Pending",
      };
    }

    return classifyCrowdTraffic(summary.totalScheduledCapacity);
  }, [summary]);

  const verifiedLabel = useMemo(() => {
    if (!summary?.lastVerifiedAt) {
      return null;
    }

    const verifiedAt = new Date(summary.lastVerifiedAt);
    if (Number.isNaN(verifiedAt.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/St_Thomas",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(verifiedAt);
  }, [summary?.lastVerifiedAt]);

  const capacityCoverageRatio = summary?.capacityCoverageRatio ?? 0;
  const capacityLine = useMemo(() => {
    if (!summary) return null;

    const shipLabel = `${summary.shipCount} ship${summary.shipCount === 1 ? "" : "s"}`;

    if (capacityCoverageRatio <= 0) {
      return `Capacity pending · ${shipLabel}`;
    }

    if (capacityCoverageRatio < 1) {
      return `${summary.totalScheduledCapacity.toLocaleString()} known scheduled capacity · ${shipLabel}`;
    }

    return `${summary.totalScheduledCapacity.toLocaleString()} scheduled capacity · ${shipLabel}`;
  }, [capacityCoverageRatio, summary]);

  const styles = traffic ? INDICATOR_STYLES[traffic.level] : INDICATOR_STYLES.quiet;

  return (
    <aside
      className={`${BRIGHT_WIDGET} ${className ?? ""}`}
      aria-live="polite"
      aria-label="Crowd predictor"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0797a6]">
            Crowd Predictor
          </p>
          <h3 className="mt-1 text-sm font-semibold text-[#173941] sm:text-base">
            {scopeLabel ?? "Cruise Port Load"}
          </h3>
        </div>
        <span className="rounded-full border border-[#0b4b55]/10 bg-[#fffaf3] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#496871]">
          Today
        </span>
      </div>

      <div className="mt-4 min-h-[5.5rem]">
        {!hydrated || loading ? (
          <div className="space-y-3" aria-hidden>
            <div className="h-12 animate-pulse rounded-xl bg-[#e9fbf7]" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-[#e9fbf7]" />
          </div>
        ) : error ? (
          <p className="text-sm text-[#c45a4a]">{error}</p>
        ) : summary && traffic ? (
          <div className="flex items-center gap-4">
            <motion.div
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border ${styles.ring}`}
              animate={
                traffic.level === "high-impact" && !reduceMotion
                  ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
                  : undefined
              }
              transition={
                traffic.level === "high-impact" && !reduceMotion
                  ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  : undefined
              }
            >
              <span className={`h-4 w-4 rounded-full ${styles.dot}`} />
            </motion.div>

            <div>
              <p className={`text-sm font-semibold sm:text-base ${styles.text}`}>
                {traffic.label}
              </p>
              <p className="mt-1 text-xs text-[#496871]">
                {capacityLine}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#496871]">
            No cruise schedule data for this island today.
          </p>
        )}
      </div>

      <p className="mt-4 border-t border-[#0b4b55]/8 pt-3 text-[11px] leading-relaxed text-[#496871]">
        {summary && summary.shipCount > 0 && capacityCoverageRatio <= 0
          ? "Scheduled ship calls are listed from source schedules; capacity is pending approved passenger-capacity sourcing."
          : "Scheduled ship capacity is a planning estimate, not an actual passenger count."}
        {summary?.sourceName ? ` Source: ${summary.sourceName}.` : null}
        {verifiedLabel ? ` Verified ${verifiedLabel} AST.` : null}
      </p>
    </aside>
  );
}
