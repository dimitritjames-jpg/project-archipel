"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNow } from "@/hooks/use-now";
import {
  formatTime12h,
  resolveNextBoatDisplay,
} from "@/lib/transit/countdown-math";
import { fetchRedHookCruzBaySchedule } from "@/lib/transit/supabase-transit";
import type {
  FerryRouteSummary,
  FerryScheduleDTO,
  NextBoatDisplay,
} from "@/lib/transit/types";

type NextBoatWidgetProps = {
  className?: string;
};

function CountdownUnit({
  value,
  label,
  reduceMotion,
}: {
  value: number;
  label: string;
  reduceMotion: boolean;
}) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="min-w-[3.25rem] text-center">
      <div className="relative flex h-10 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            initial={reduceMotion ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -10, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 32 }
            }
            className="text-2xl font-semibold tabular-nums text-archipel-white"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-archipel-white/50">
        {label}
      </span>
    </div>
  );
}

export function NextBoatWidget({ className }: NextBoatWidgetProps) {
  const reduceMotion = useReducedMotion();
  const now = useNow(1000);
  const [hydrated, setHydrated] = useState(false);
  const [route, setRoute] = useState<FerryRouteSummary | null>(null);
  const [records, setRecords] = useState<FerryScheduleDTO[]>([]);
  const [display, setDisplay] = useState<NextBoatDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSchedule() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRedHookCruzBaySchedule();
        if (cancelled) return;

        if (!data) {
          setError("Red Hook → Cruz Bay route is unavailable.");
          return;
        }

        setRoute(data.route);
        setRecords(data.records);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load ferry schedule.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSchedule();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !now || records.length === 0) {
      return;
    }

    setDisplay(resolveNextBoatDisplay(records, now));
  }, [hydrated, now, records]);

  const verifiedLabel = useMemo(() => {
    if (!route?.lastVerifiedAt) return null;
    const verifiedAt = new Date(route.lastVerifiedAt);
    if (Number.isNaN(verifiedAt.getTime())) return null;

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/St_Thomas",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(verifiedAt);
  }, [route?.lastVerifiedAt]);

  return (
    <aside
      className={`pointer-events-auto min-h-[13.5rem] rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md sm:min-h-[14rem] sm:p-5 ${className ?? ""}`}
      aria-live="polite"
      aria-label="Next boat countdown"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
            Next Boat
          </p>
          <h3 className="mt-1 text-sm font-semibold text-archipel-white sm:text-base">
            {route?.displayName ?? "Red Hook → Cruz Bay"}
          </h3>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-archipel-white/70">
          AST
        </span>
      </div>

      <div className="mt-4 min-h-[4.5rem]">
        {!hydrated || loading ? (
          <div className="space-y-3" aria-hidden>
            <div className="h-10 animate-pulse rounded-lg bg-white/10" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
          </div>
        ) : error ? (
          <p className="text-sm text-coral">{error}</p>
        ) : display?.type === "countdown" ? (
          <>
            <div className="flex items-end justify-center gap-2 sm:gap-3">
              <CountdownUnit
                value={display.units.hours}
                label="Hrs"
                reduceMotion={reduceMotion ?? false}
              />
              <span className="pb-5 text-xl font-semibold text-archipel-white/40">
                :
              </span>
              <CountdownUnit
                value={display.units.minutes}
                label="Min"
                reduceMotion={reduceMotion ?? false}
              />
              <span className="pb-5 text-xl font-semibold text-archipel-white/40">
                :
              </span>
              <CountdownUnit
                value={display.units.seconds}
                label="Sec"
                reduceMotion={reduceMotion ?? false}
              />
            </div>
            <p className="mt-3 text-center text-xs text-archipel-white/65">
              Departs{" "}
              {formatTime12h(
                display.departure.overrideDepartureTime ??
                  display.departure.departureTime,
              )}{" "}
              AST
            </p>
          </>
        ) : display?.type === "tomorrow" ? (
          <p className="text-center text-sm font-medium text-archipel-white sm:text-base">
            {display.label}
          </p>
        ) : (
          <p className="text-center text-sm text-archipel-white/70">
            No upcoming departures found.
          </p>
        )}
      </div>

      {route && !loading && !error ? (
        <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-archipel-white/50">
          Source: {route.sourceName}
          {verifiedLabel ? ` · Verified ${verifiedLabel} AST` : null}
        </p>
      ) : null}
    </aside>
  );
}
