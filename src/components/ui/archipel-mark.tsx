import { cn } from "@/lib/utils";

export function ArchipelMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-aqua/35 bg-aqua/10",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-[5px] rounded-full border border-aqua/20" />
      <span className="absolute h-[2px] w-5 rotate-[-34deg] bg-gradient-to-r from-transparent via-aqua to-transparent" />
      <span className="absolute h-1.5 w-1.5 translate-x-1 -translate-y-1 rounded-full bg-aqua shadow-[0_0_12px_#37ead9]" />
      <span className="absolute h-1 w-1 -translate-x-1.5 translate-y-1 rounded-full bg-coral shadow-[0_0_10px_#ff7968]" />
    </span>
  );
}
