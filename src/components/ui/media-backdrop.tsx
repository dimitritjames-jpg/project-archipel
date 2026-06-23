import Image from "next/image";
import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type MediaBackdropProps = {
  media: MediaAsset;
  className?: string;
  overlay?: "hero" | "card" | "subtle";
  priority?: boolean;
  children?: React.ReactNode;
};

export function MediaBackdrop({
  media,
  className,
  overlay = "card",
  priority = false,
  children,
}: MediaBackdropProps) {
  const overlayClass =
    overlay === "hero"
      ? "from-[#02131a]/18 via-[#05202b]/52 to-midnight-950/90"
      : overlay === "subtle"
        ? "from-midnight-950/20 via-midnight-950/50 to-midnight-950/80"
        : "from-midnight-950/40 via-midnight-950/70 to-midnight-950/90";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      role={children ? undefined : "img"}
      aria-label={children ? undefined : media.alt}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={children ? "" : media.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              media.gradient,
            )}
            aria-hidden
          />
          <div
            className="topographic-field wave-lines animate-tide-drift absolute -inset-[8%] opacity-60"
            aria-hidden
          />
          <div
            className="reef-grid sailcloth absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
            aria-hidden
          />
        </>
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          overlayClass,
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(255,244,214,0.28), transparent 36%), radial-gradient(circle at 76% 0%, rgba(255,184,77,0.18), transparent 34%), radial-gradient(circle at 80% 60%, rgba(45,212,191,0.22), transparent 40%)",
        }}
        aria-hidden
      />
      {children ? (
        <div className="relative z-10 h-full">{children}</div>
      ) : null}
    </div>
  );
}
