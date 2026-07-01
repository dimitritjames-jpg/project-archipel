"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import {
  ISLAND_ASK_PROMPTS,
  promptTarget,
  type IslandAskPrompt,
} from "@/lib/island-ask/prompts";
import { cn } from "@/lib/utils";

type IslandAskBarProps = {
  variant?: "hero" | "compact";
  defaultQuery?: string;
  placeholder?: string;
  prompts?: readonly IslandAskPrompt[];
  showPrompts?: boolean;
  className?: string;
  action?: string;
};

export function IslandAskBar({
  variant = "hero",
  defaultQuery = "",
  placeholder = "Ask VibeVI: beach, boat, bite, night, ferry, cruise day...",
  prompts = ISLAND_ASK_PROMPTS,
  showPrompts = true,
  className,
  action = "/search",
}: IslandAskBarProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isCompact = variant === "compact";
  const stacksOnNarrowMobile = !isCompact;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultQuery;
    }
  }, [defaultQuery]);

  return (
    <div className={cn("w-full", className)}>
      <p className="sr-only" id={`${inputId}-hint`}>
        Ask VibeVI to search island guides, categories, and published listings.
        This is discovery search, not a live AI chat.
      </p>

      <form
        action={action}
        method="get"
        className={cn(
          "rounded-[1.35rem] border border-[#0b4b55]/16 bg-white/82 p-2 shadow-[0_18px_50px_rgba(7,75,85,0.12)] backdrop-blur-md",
          isCompact ? "rounded-2xl p-1.5" : "",
        )}
        onSubmit={(event) => {
          const value = inputRef.current?.value.trim() ?? "";
          if (!value) event.preventDefault();
        }}
      >
        <div
          className={cn(
            "flex gap-2",
            isCompact
              ? "items-center gap-2"
              : stacksOnNarrowMobile
                ? "flex-col items-stretch min-[430px]:flex-row min-[430px]:items-center min-[430px]:gap-3"
                : "items-center gap-3",
          )}
        >
          <label htmlFor={inputId} className="sr-only">
            Ask VibeVI
          </label>
          <input
            ref={inputRef}
            id={inputId}
            name="q"
            type="search"
            defaultValue={defaultQuery}
            placeholder={placeholder}
            aria-describedby={`${inputId}-hint`}
            autoComplete="off"
            className={cn(
              "min-w-0 flex-1 bg-transparent text-[#123840] placeholder:text-[#5d787f] focus:outline-none",
              isCompact ? "px-3 py-2.5 text-sm sm:text-base" : "px-3 py-3.5 text-base sm:text-lg",
            )}
          />
          <button
            type="submit"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full bg-[#0b4b55] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
              isCompact
                ? "min-h-10 px-4 text-sm"
                : "min-h-11 w-full px-5 text-sm min-[430px]:w-auto sm:min-h-12 sm:px-6",
            )}
          >
            Find the move
          </button>
        </div>
      </form>

      {showPrompts && prompts.length > 0 ? (
        <div className={cn("mt-4", isCompact ? "mt-3" : "mt-5")}>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#47636a]/88">
            Quick island prompts
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <Link
                key={prompt.label}
                href={promptTarget(prompt)}
                className="inline-flex min-h-9 items-center rounded-full border border-[#0b4b55]/12 bg-white/72 px-3.5 text-sm font-semibold text-[#315057] shadow-[0_8px_24px_rgba(7,75,85,0.08)] transition hover:-translate-y-0.5 hover:border-aqua/35 hover:bg-aqua/10 hover:text-[#0b4b55]"
              >
                {prompt.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
