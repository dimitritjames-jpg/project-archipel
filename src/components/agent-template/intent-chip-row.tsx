import Link from "next/link";
import { ChipIcon } from "@/components/agent-template/chip-icons";
import type { VibeAgentChip } from "@/lib/agent-template/types";
import { cn } from "@/lib/utils";

type IntentChipRowProps = {
  chips: readonly VibeAgentChip[];
  className?: string;
};

function chipHref(chip: VibeAgentChip): string {
  if (chip.href) return chip.href;
  const query = chip.query ?? chip.label.toLowerCase();
  return `/search?q=${encodeURIComponent(query)}`;
}

export function IntentChipRow({ chips, className }: IntentChipRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2 sm:gap-2.5",
        className,
      )}
      role="list"
      aria-label="Quick search intents"
    >
      {chips.map((chip) => (
        <Link
          key={`${chip.label}-${chip.query ?? chip.href}`}
          href={chipHref(chip)}
          role="listitem"
          className={cn(
            "inline-flex h-9 min-h-[36px] items-center gap-2 rounded-full border border-[var(--vv-agent-line)]",
            "bg-[var(--vv-agent-surface)] px-3.5 text-sm font-medium text-[var(--vv-agent-ink)]",
            "shadow-[var(--vv-agent-shadow-control)] transition hover:-translate-y-0.5 hover:border-[var(--vv-agent-aqua-line)]",
            "hover:bg-[var(--vv-agent-aqua-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vv-agent-teal)]",
            "sm:h-10 sm:px-4",
          )}
        >
          <ChipIcon iconKey={chip.iconKey} />
          {chip.label}
        </Link>
      ))}
    </div>
  );
}
