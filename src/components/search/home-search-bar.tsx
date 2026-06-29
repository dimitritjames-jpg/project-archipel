"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { trackEvent } from "@/lib/analytics/events";
import type { LocalSearchResult } from "@/lib/search/catalog-search";
import { searchLocalBusinesses } from "@/lib/search/local-search";
import { cn } from "@/lib/utils";

type HomeSearchBarProps = {
  className?: string;
  initialQuery?: string;
};

export function HomeSearchBar({
  className,
  initialQuery = "",
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

  const showResults = hydrated && query.trim().length >= 2;

  return (
    <div className={cn("relative z-30", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search VibeVI
      </label>
      <div className="island-postcard-card rounded-2xl border border-sand/12 bg-[#061b22]/88 p-1.5 shadow-2xl backdrop-blur-xl">
        <div className="flex min-h-[3.5rem] items-center gap-3 rounded-xl border border-white/6 bg-midnight-950/50 px-4 py-2">
          <svg
            aria-hidden
            className="h-5 w-5 shrink-0 text-sand/75"
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
            className="w-full bg-transparent text-sm text-archipel-white focus:outline-none sm:text-base"
          />
          {isPending ? (
            <span className="text-xs text-archipel-white/50" aria-live="polite">
              Searching...
            </span>
          ) : null}
          <span className="hidden rounded-md border border-sand/15 bg-sand/8 px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-sand/66 sm:inline">
            Island search
          </span>
        </div>

        {showResults ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-40 max-h-80 overflow-y-auto rounded-2xl border border-sand/15 bg-[#041022]/98 p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {error ? (
              <p className="rounded-xl border border-coral/15 bg-coral/8 px-4 py-3 text-sm text-coral">
                {error}
              </p>
            ) : isPending && results.length === 0 ? (
              <p className="px-4 py-4 text-sm text-archipel-white/60">
                Searching published listings...
              </p>
            ) : results.length === 0 && !isPending ? (
              <p className="px-4 py-4 text-sm text-archipel-white/60">
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
                      className="block rounded-xl border border-transparent px-4 py-3 transition hover:border-sand/12 hover:bg-sand/6"
                    >
                      <p className="font-medium text-archipel-white">
                        {result.name}
                      </p>
                      <p className="mt-1 text-xs text-archipel-white/55">
                        {result.categoryName ?? "Business"}
                        {" / "}
                        {result.islandName}
                      </p>
                      {result.descriptionPlain ? (
                        <p className="mt-1 line-clamp-2 text-xs text-archipel-white/45">
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
