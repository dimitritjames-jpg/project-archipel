import { cn } from "@/lib/utils";

type ComingSoonBadgeProps = {
  label?: string;
  className?: string;
};

export function ComingSoonBadge({
  label = "Preview",
  className,
}: ComingSoonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-aqua/30 bg-aqua/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-aqua",
        className,
      )}
    >
      {label}
    </span>
  );
}
