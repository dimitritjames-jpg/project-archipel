import Image from "next/image";
import type { ResponsiveMedia } from "@/lib/vibevi-media";
import { cn } from "@/lib/utils";

type ResponsiveHeroProps = {
  media: ResponsiveMedia;
  priority?: boolean;
  className?: string;
  minHeight?: string;
  children: React.ReactNode;
  overlay?: "light" | "warm" | "editorial";
};

const overlayClasses = {
  light:
    "bg-gradient-to-t from-[#0b4b55]/72 via-[#0b4b55]/28 to-[#0b4b55]/10",
  warm: "bg-gradient-to-t from-[#173941]/78 via-[#173941]/32 to-transparent",
  editorial:
    "bg-gradient-to-t from-[#041820]/80 via-[#041820]/35 to-[#fffaf3]/8",
};

export function ResponsiveHero({
  media,
  priority = false,
  className,
  minHeight = "min-h-[min(78vh,720px)]",
  children,
  overlay = "editorial",
}: ResponsiveHeroProps) {
  const imageStyle = { objectPosition: media.objectPosition ?? "center" };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        minHeight,
        className,
      )}
    >
      <Image
        src={media.mobile}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover md:hidden"
        style={imageStyle}
      />
      <Image
        src={media.desktop}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="hidden object-cover md:block"
        style={imageStyle}
      />
      <div
        className={cn("absolute inset-0", overlayClasses[overlay])}
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col">
        {children}
      </div>
    </section>
  );
}
