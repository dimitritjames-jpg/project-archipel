import { cn } from "@/lib/utils";

export function ArchipelMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/30 bg-[#073d4a] shadow-[0_14px_34px_rgba(7,151,166,0.28)]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,244,214,0.4),transparent_24%),linear-gradient(145deg,rgba(55,234,217,0.42),rgba(7,151,166,0.24)_46%,rgba(255,121,104,0.28))]" />
      <span className="absolute inset-[5px] rounded-full border border-white/25" />
      <span className="absolute bottom-[10px] left-[8px] h-[7px] w-6 rounded-[999px_999px_0_0] bg-[#123f35]/78 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
      <span className="absolute h-[2px] w-6 rotate-[-34deg] rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-85" />
      <span className="absolute h-2 w-2 translate-x-1.5 -translate-y-1.5 rounded-full bg-aqua shadow-[0_0_14px_#37ead9]" />
      <span className="absolute h-1.5 w-1.5 -translate-x-2 translate-y-1 rounded-full bg-coral shadow-[0_0_12px_#ff7968]" />
      <span className="absolute h-1 w-1 translate-x-3 translate-y-2.5 rounded-full bg-sand shadow-[0_0_10px_rgba(244,223,184,0.9)]" />
    </span>
  );
}
