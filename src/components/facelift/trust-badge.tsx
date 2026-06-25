import { cn } from "@/lib/utils";

type TrustBadgeProps = {
  label: string;
  tone?: "neutral" | "verified" | "preview" | "public-info";
  className?: string;
};

const toneClasses = {
  neutral:
    "border-[#0b4b55]/12 bg-white/80 text-[#315057]",
  verified:
    "border-emerald-500/25 bg-emerald-50 text-emerald-800",
  preview:
    "border-amber-500/25 bg-amber-50 text-amber-900",
  "public-info":
    "border-[#0797a6]/25 bg-[#e9fbf7] text-[#0b4b55]",
};

export function TrustBadge({
  label,
  tone = "neutral",
  className,
}: TrustBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
