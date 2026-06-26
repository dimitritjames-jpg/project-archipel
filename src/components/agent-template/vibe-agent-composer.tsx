"use client";

import { useEffect, useRef } from "react";
import { IntentChipRow } from "@/components/agent-template/intent-chip-row";
import { PopularSearchLinks } from "@/components/agent-template/popular-search-links";
import {
  DEFAULT_INTENT_CHIPS,
  DEFAULT_POPULAR_QUERIES,
} from "@/lib/agent-template/content";
import type { VibeAgentComposerProps } from "@/lib/agent-template/types";
import { cn } from "@/lib/utils";

export function VibeAgentComposer({
  variant = "hero",
  eyebrow,
  title,
  description,
  placeholder = "Tell VibeVI what you're looking for…",
  defaultQuery = "",
  chips = DEFAULT_INTENT_CHIPS,
  popularQueries = DEFAULT_POPULAR_QUERIES,
  action = "/search",
  inputName = "q",
  className,
}: VibeAgentComposerProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultQuery;
    }
  }, [defaultQuery]);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--vv-agent-composer-max)]",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--vv-agent-teal)]">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h1
          className={cn(
            "text-balance text-center font-semibold tracking-[-0.04em] text-[var(--vv-agent-ink)]",
            isHero
              ? "text-[2.35rem] leading-[1.02] sm:text-[3.5rem]"
              : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </h1>
      ) : null}
      {description ? (
        <p className="text-pretty mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--vv-agent-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}

      <form
        action={action}
        method="get"
        className={cn(
          "mt-8 rounded-[var(--vv-agent-radius-composer)] border border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)]",
          "shadow-[var(--vv-agent-shadow-composer)]",
          isCompact ? "mt-0 rounded-[18px]" : "",
        )}
        onSubmit={(event) => {
          const value = inputRef.current?.value.trim() ?? "";
          if (!value) {
            event.preventDefault();
          }
        }}
      >
        <div
          className={cn(
            "flex items-end gap-3 p-4 sm:p-5",
            isCompact ? "items-center p-3" : "",
          )}
        >
          <label htmlFor="vibe-agent-query" className="sr-only">
            Search VibeVI
          </label>
          <textarea
            ref={inputRef}
            id="vibe-agent-query"
            name={inputName}
            rows={isCompact ? 1 : isHero ? 3 : 2}
            defaultValue={defaultQuery}
            placeholder={placeholder}
            className={cn(
              "min-h-[4.5rem] w-full resize-none bg-transparent text-base leading-relaxed text-[var(--vv-agent-ink)] placeholder:text-[var(--vv-agent-muted)] focus:outline-none sm:text-lg",
              isCompact ? "min-h-0 py-1 text-sm sm:text-base" : "",
            )}
          />
          <button
            type="submit"
            aria-label="Search"
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--vv-agent-teal)] text-white",
              "transition hover:bg-[var(--vv-agent-teal-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vv-agent-teal)]",
            )}
          >
            <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 14-7-4 7 4 7Z" />
            </svg>
          </button>
        </div>
      </form>

      {chips.length > 0 ? (
        <IntentChipRow chips={chips} className="mt-6" />
      ) : null}
      {popularQueries.length > 0 ? (
        <PopularSearchLinks queries={popularQueries} className="mt-5" />
      ) : null}
    </div>
  );
}
