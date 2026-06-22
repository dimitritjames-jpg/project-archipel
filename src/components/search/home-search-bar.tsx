"use client";

import Link from "next/link";
import { useEffect, useId, useState, useTransition } from "react";
import {
  searchLocalBusinesses,
  type LocalSearchResult,
} from "@/lib/search/local-search";

type HomeSearchBarProps = {
  className?: string;
};

export function HomeSearchBar({ className }: HomeSearchBarProps) {
  const inputId = useId();
  const listboxId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocalSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(async () => {
        try {
          setError(null);
          const hits = await searchLocalBusinesses(trimmed);
          setResults(hits);
        } catch (searchError) {
          setResults([]);
          setError(
            searchError instanceof Error
              ? searchError.message
              : "Search is temporarily unavailable.",
          );
        }
      });
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [hydrated, query]);

  const showResults = hydrated && query.trim().length >= 2;

  return (
    <div className={`relative z-30 ${className ?? ""}`}>
      <label htmlFor={inputId} className="sr-only">
        Search businesses
      </label>
      <div className="rounded-2xl border border-white/20 bg-white/10 p-2 shadow-xl backdrop-blur-md">
        <div className="flex min-h-[3rem] items-center gap-3 px-3 py-2">
          <svg
            aria-hidden
            className="h-5 w-5 shrink-0 text-archipel-white/50"
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
            placeholder="Search dining, charters, stays…"
            autoComplete="off"
            role="combobox"
            aria-expanded={showResults}
            aria-controls={listboxId}
            aria-autocomplete="list"
            className="w-full bg-transparent text-sm text-archipel-white placeholder:text-archipel-white/45 focus:outline-none sm:text-base"
          />
          {isPending ? (
            <span className="text-xs text-archipel-white/50" aria-live="polite">
              Searching…
            </span>
          ) : null}
        </div>

        {showResults ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Search results"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-indigo-950/95 shadow-2xl"
          >
            {error ? (
              <p className="px-4 py-3 text-sm text-coral">{error}</p>
            ) : results.length === 0 && !isPending ? (
              <p className="px-4 py-3 text-sm text-archipel-white/60">
                No published businesses match &ldquo;{query.trim()}&rdquo;.
              </p>
            ) : (
              <ul className="divide-y divide-white/8">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      role="option"
                      className="block px-4 py-3 transition hover:bg-white/5"
                    >
                      <p className="font-medium text-archipel-white">
                        {result.name}
                      </p>
                      <p className="mt-1 text-xs text-archipel-white/55">
                        {result.categoryName ?? "Business"}
                        {" · "}
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
