"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import {
  searchLocalBusinesses,
  type LocalSearchResult,
} from "@/lib/search/local-search";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/events";

type HomeSearchBarProps = {
  className?: string;
  initialQuery?: string;
  appearance?: "default" | "agent";
};

export function HomeSearchBar({
  className,
  initialQuery = "",
  appearance = "default",
}: HomeSearchBarProps) {
  const inputId = useId();
  const listboxId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<LocalSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const requestSequence = useRef(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!hydrated) return;

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const requestId = ++requestSequence.current;
      trackEvent("search_submitted", {
        query_length: trimmed.length,
        source: "directory_search",
      });
      startTransition(async () => {
        try {
          setError(null);
          const hits = await searchLocalBusinesses(trimmed);
          if (requestSequence.current === requestId) {
            setResults(hits);
          }
        } catch (searchError) {
          if (requestSequence.current === requestId) {
            setResults([]);
            setError(
              searchError instanceof Error
                ? searchError.message
                : "Search is temporarily unavailable.",
            );
          }
        }
      });
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [hydrated, query]);

  const isAgent = appearance === "agent";
  const showResults = hydrated && query.trim().length >= 2;

  return (
    <div className={cn("relative z-30", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search VibeVI
      </label>
      <div
        className={cn(
          "rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl",
          isAgent
            ? "border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] shadow-[var(--vv-agent-shadow-composer)]"
            : "island-postcard-card border-sand/12 bg-[#061b22]/88",
        )}
      >
        <div
          className={cn(
            "flex min-h-[3.5rem] items-center gap-3 rounded-xl border px-4 py-2",
            isAgent
              ? "border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface-warm)]"
              : "border-white/6 bg-midnight-950/50",
          )}
        >
          <svg
            aria-hidden
            className={cn(
              "h-5 w-5 shrink-0",
              isAgent ? "text-[var(--vv-agent-muted)]" : "text-sand/75",
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            role="combobox"
            aria-expanded={showResults}
            aria-controls={listboxId}
            aria-autocomplete="list"
            className={cn(
              "w-full bg-transparent text-sm focus:outline-none sm:text-base",
              isAgent
                ? "text-[var(--vv-agent-ink)] placeholder:text-[var(--vv-agent-muted)]"
                : "text-archipel-white",
            )}
          />
          {isPending ? (
            <span
              className={cn(
                "text-xs",
                isAgent ? "text-[var(--vv-agent-muted)]" : "text-archipel-white/50",
              )}
              aria-live="polite"
            >
              Searching…
            </span>
          ) : null}
          <span
            className={cn(
              "hidden rounded-md border px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] sm:inline",
              isAgent
                ? "border-[var(--vv-agent-aqua-line)] bg-[var(--vv-agent-aqua-soft)] text-[var(--vv-agent-teal)]"
                : "border-sand/15 bg-sand/8 text-sand/66",
            )}
          >
            Island search
          </span>
        </div>

        {showResults ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+0.6rem)] z-40 max-h-80 overflow-y-auto rounded-2xl border p-1.5 backdrop-blur-2xl",
              isAgent
                ? "border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] shadow-[var(--vv-agent-shadow-card)]"
                : "border-sand/15 bg-[#041022]/98 shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
            )}
          >
            {error ? (
              <p
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm",
                  isAgent
                    ? "border-[var(--vv-agent-coral)]/30 bg-[var(--vv-agent-coral)]/10 text-[var(--vv-agent-coral)]"
                    : "border-coral/15 bg-coral/8 text-coral",
                )}
              >
                {error}
              </p>
            ) : results.length === 0 && !isPending ? (
              <p
                className={cn(
                  "px-4 py-4 text-sm",
                  isAgent ? "text-[var(--vv-agent-muted)]" : "text-archipel-white/60",
                )}
              >
                Nothing published matches &ldquo;{query.trim()}&rdquo; yet. Try an
                island, category, or mood.
              </p>
            ) : (
              <ul className="space-y-1">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      role="option"
                      className={cn(
                        "block rounded-xl border border-transparent px-4 py-3 transition",
                        isAgent
                          ? "hover:border-[var(--vv-agent-aqua-line)] hover:bg-[var(--vv-agent-aqua-soft)]"
                          : "hover:border-sand/12 hover:bg-sand/6",
                      )}
                    >
                      <p
                        className={cn(
                          "font-medium",
                          isAgent ? "text-[var(--vv-agent-ink)]" : "text-archipel-white",
                        )}
                      >
                        {result.name}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          isAgent ? "text-[var(--vv-agent-muted)]" : "text-archipel-white/55",
                        )}
                      >
                        {result.categoryName ?? "Business"}
                        {" · "}
                        {result.islandName}
                      </p>
                      {result.descriptionPlain ? (
                        <p
                          className={cn(
                            "mt-1 line-clamp-2 text-xs",
                            isAgent ? "text-[var(--vv-agent-muted)]" : "text-archipel-white/45",
                          )}
                        >
                          {result.descriptionPlain}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
