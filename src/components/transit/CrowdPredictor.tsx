"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  classifyCrowdTraffic,
  fetchPortLoadDaily,
  type PortLoadSummary,
} from "@/lib/transit/supabase-ports";

type CrowdPredictorProps = {
  className?: string;
};

const INDICATOR_STYLES = {
  low: {
    ring: "bg-emerald-400/20 border-emerald-400/50",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
  },
  moderate: {
    ring: "bg-amber-400/15 border-amber-400/45",
    dot: "bg-amber-400",
    text: "text-amber-300",
  },
  high: {
    ring: "bg-rose-900/35 border-rose-500/60",
    dot: "bg-rose-600",
    text: "text-rose-300",
  },
} as const;

export function CrowdPredictor({ className }: CrowdPredictorProps) {
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
        const data = await fetchPortLoadDaily();
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
  }, []);

  const traffic = useMemo(() => {
    if (!summary) {
      return null;
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

  const styles = traffic ? INDICATOR_STYLES[traffic.level] : INDICATOR_STYLES.low;

  return (
    <aside
      className={`pointer-events-auto min-h-[14.5rem] rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:min-h-[15rem] sm:p-5 ${className ?? ""}`}
      aria-live="polite"
      aria-label="Crowd predictor"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-archipel-white/60">
            Crowd Predictor
          </p>
          <h3 className="mt-1 text-sm font-semibold text-archipel-white sm:text-base">
            Cruise Port Load
          </h3>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-archipel-white/70">
          Today
        </span>
      </div>

      <div className="mt-4 min-h-[5.5rem]">
        {!hydrated || loading ? (
          <div className="space-y-3" aria-hidden>
            <div className="h-12 animate-pulse rounded-xl bg-white/10" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
          </div>
        ) : error ? (
          <p className="text-sm text-coral">{error}</p>
        ) : summary && traffic ? (
          <div className="flex items-center gap-4">
            <motion.div
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border ${styles.ring}`}
              animate={
                traffic.level === "high" && !reduceMotion
                  ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
                  : undefined
              }
              transition={
                traffic.level === "high" && !reduceMotion
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
              <p className="mt-1 text-xs text-archipel-white/65">
                {summary.totalScheduledCapacity.toLocaleString()} scheduled capacity
                · {summary.shipCount} ship{summary.shipCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-archipel-white/70">
            No cruise port load data for today.
          </p>
        )}
      </div>

      <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-archipel-white/50">
        Scheduled ship capacity is a planning estimate, not an actual passenger
        count.
        {summary?.sourceName ? ` Source: ${summary.sourceName}.` : null}
        {verifiedLabel ? ` Verified ${verifiedLabel} AST.` : null}
      </p>
    </aside>
  );
}
