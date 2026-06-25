import Link from "next/link";
import { cn } from "@/lib/utils";

type Chip = { label: string; href: string; active?: boolean };

export function FilterChipRail({
  chips,
  className,
  ariaLabel = "Filters",
}: {
  chips: Chip[];
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {chips.map((chip) => (
        <Link
          key={chip.href + chip.label}
          href={chip.href}
          aria-current={chip.active ? "page" : undefined}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
            chip.active
              ? "border-[#0b4b55] bg-[#0b4b55] text-white"
              : "border-[#0b4b55]/12 bg-white text-[#315057] hover:border-[#0797a6]/30 hover:bg-[#e9fbf7]",
          )}
        >
          {chip.label}
        </Link>
      ))}
    </nav>
  );
}
