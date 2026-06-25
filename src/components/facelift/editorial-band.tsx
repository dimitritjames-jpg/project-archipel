import Image from "next/image";
import type { ResponsiveMedia } from "@/lib/vibevi-media";
import { VvButtonPrimary } from "@/components/facelift/vv-ui";

type EditorialBandProps = {
  media: ResponsiveMedia;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export function EditorialBand({ media, title, body, ctaLabel, ctaHref }: EditorialBandProps) {
  return (
    <section className="relative isolate mt-16 overflow-hidden rounded-[1.5rem] border border-[#0b4b55]/10 shadow-[0_20px_60px_rgba(11,75,85,0.1)]">
      <Image
        src={media.desktop}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover md:block"
        style={{ objectPosition: media.objectPosition ?? "center" }}
      />
      <Image
        src={media.mobile}
        alt=""
        fill
        sizes="100vw"
        className="object-cover md:hidden"
        style={{ objectPosition: media.objectPosition ?? "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041820]/82 via-[#041820]/48 to-[#041820]/20" aria-hidden />
      <div className="relative z-10 grid gap-6 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">{body}</p>
        </div>
        <VvButtonPrimary href={ctaHref} className="shrink-0 bg-white text-[#0b4b55] hover:bg-[#fff4d6]">
          {ctaLabel}
        </VvButtonPrimary>
      </div>
    </section>
  );
}
