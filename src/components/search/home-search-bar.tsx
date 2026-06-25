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
  variant?: "default" | "hero";
};

export function HomeSearchBar({ className, variant = "default" }: HomeSearchBarProps) {
  const inputId = useId();
  const listboxId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocalSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const requestSequence = useRef(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

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

  const isHero = variant === "hero";

  return (
    <div className={cn("relative z-30", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search VibeVI
      </label>
      <div
        className={cn(
          "rounded-2xl border p-1.5 shadow-[0_16px_48px_rgba(11,75,85,0.12)] backdrop-blur-xl",
          isHero
            ? "border-white/25 bg-white/95"
            : "border-[#0b4b55]/10 bg-white/90",
        )}
      >
        <div
          className={cn(
            "flex min-h-[3.5rem] items-center gap-3 rounded-xl border px-4 py-2",
            isHero
              ? "border-[#0b4b55]/8 bg-[#fffaf3]"
              : "border-[#0b4b55]/10 bg-white",
          )}
        >
          <svg
            aria-hidden
            className="h-5 w-5 shrink-0 text-[#0797a6]"
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
            placeholder="Beaches, charters, bites, islands..."
            className="w-full bg-transparent text-sm text-[#173941] placeholder:text-[#496871]/70 focus:outline-none sm:text-base"
          />
          {isPending ? (
            <span className="text-xs text-[#496871]" aria-live="polite">
              Searching…
            </span>
          ) : null}
          <span className="hidden rounded-md border border-[#0b4b55]/10 bg-[#e9fbf7] px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#0797a6] sm:inline">
            Search
          </span>
        </div>

        {showResults ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-40 max-h-80 overflow-y-auto rounded-2xl border border-[#0b4b55]/12 bg-white p-1.5 shadow-[0_24px_64px_rgba(11,75,85,0.16)]"
          >
            {error ? (
              <p className="rounded-xl border border-coral/20 bg-coral/8 px-4 py-3 text-sm text-[#b44a3d]">
                {error}
              </p>
            ) : results.length === 0 && !isPending ? (
              <p className="px-4 py-4 text-sm text-[#496871]">
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
                      className="block rounded-xl border border-transparent px-4 py-3 transition hover:border-[#0797a6]/15 hover:bg-[#e9fbf7]/50"
                    >
                      <p className="font-medium text-[#173941]">{result.name}</p>
                      <p className="mt-1 text-xs text-[#496871]">
                        {result.categoryName ?? "Business"}
                        {" · "}
                        {result.islandName}
                      </p>
                      {result.descriptionPlain ? (
                        <p className="mt-1 line-clamp-2 text-xs text-[#496871]/80">
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
