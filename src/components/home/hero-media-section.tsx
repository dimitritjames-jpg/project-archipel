import Image from "next/image";
import Link from "next/link";

import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { IslandAskBar } from "@/components/search/island-ask-bar";
import { GENERATED_MEDIA_PATHS, HERO_MEDIA } from "@/lib/media";

const heroMoves = [
  {
    label: "Beach",
    href: "/guides/best-beaches-usvi",
    imageSrc: GENERATED_MEDIA_PATHS.beachDay,
    alt: "Generated atmospheric beach-day scene with cream sand and turquoise water",
    detail: "Sand, shade, shallow water.",
  },
  {
    label: "Boat",
    href: "/search?q=boat",
    imageSrc: GENERATED_MEDIA_PATHS.boatDay,
    alt: "Generated atmospheric boat-day scene with an unbranded sailboat on turquoise water",
    detail: "Snorkel, sail, beach-hop.",
  },
  {
    label: "Bite",
    href: "/experiences/culinary",
    imageSrc: GENERATED_MEDIA_PATHS.biteWaterfront,
    alt: "Generated atmospheric waterfront dining scene with island plates and golden-hour light",
    detail: "Local plates, sunset tables.",
  },
  {
    label: "Night",
    href: "/st-thomas/nightlife-rhythm",
    imageSrc: GENERATED_MEDIA_PATHS.nightBoardwalk,
    alt: "Generated atmospheric waterfront boardwalk night scene with warm lights",
    detail: "Music, rum, waterfront glow.",
  },
] as const;

export function HeroMediaSection() {
  return (
    <section className="destination-cover-hero relative -mt-20 overflow-x-hidden overflow-y-visible">
      <MediaBackdrop
        media={HERO_MEDIA}
        overlay="subtle"
        priority
        className="min-h-[min(100svh,900px)]"
      >
        <div className="destination-cover-wash" aria-hidden />
        <div className="destination-cover-sand" aria-hidden />
        <div className="section-shell relative z-20 flex min-h-[min(100svh,900px)] flex-col justify-end pb-7 pt-32 sm:pb-10 lg:pb-12">
          <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div className="destination-cover-card">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-reef-blue/80">
                U.S. Virgin Islands field guide
              </p>
              <h1 className="destination-cover-title mt-4">
                Find Your Island Vibe.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#315057] sm:text-lg">
                Beach days, boat trips, local plates, culture, nightlife, and
                ferry hops across the U.S. Virgin Islands.
              </p>

              <div className="mt-7 max-w-xl">
                <IslandAskBar variant="hero" />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#day-moves-heading"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b4b55] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(7,75,85,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]"
                >
                  Pick today&apos;s move
                </Link>
                <Link
                  href="/experiences/adventure"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b4b55]/18 bg-white/70 px-5 text-sm font-bold text-[#123840] transition hover:-translate-y-0.5 hover:bg-sand"
                >
                  Explore things to do
                </Link>
              </div>
            </div>

            <div className="destination-move-board" aria-label="Popular island moves">
              {heroMoves.map((move) => (
                <Link
                  key={move.label}
                  href={move.href}
                  className="destination-move-photo-card group"
                >
                  <Image
                    src={move.imageSrc}
                    alt={move.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 18vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority={move.label === "Beach"}
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                    aria-hidden
                  />
                  <span className="relative z-10 flex h-full flex-col justify-end p-4">
                    <span className="text-2xl font-black tracking-[-0.06em] text-white drop-shadow">
                      {move.label}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-white/78">
                      {move.detail}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MediaBackdrop>
    </section>
  );
}
