import Link from "next/link";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { HERO_MEDIA } from "@/lib/media";

const postcardStops = ["Beach", "Boat", "Bite", "Night"] as const;

export function HeroMediaSection() {
  const hasGeneratedHero = Boolean(HERO_MEDIA.src);

  return (
    <section className={`destination-hero ${hasGeneratedHero ? "destination-hero-photo" : ""} relative -mt-20 overflow-hidden`}>
      <MediaBackdrop
        media={HERO_MEDIA}
        overlay="hero"
        priority
        className="min-h-[min(100svh,960px)]"
      >
        <div className="destination-hero-sky" aria-hidden />
        <div className="destination-hero-water" aria-hidden />
        <div className="destination-hero-ridge destination-hero-ridge-left" aria-hidden />
        <div className="destination-hero-ridge destination-hero-ridge-right" aria-hidden />
        <div className="destination-hero-road" aria-hidden />
        <div className="destination-hero-sun" aria-hidden />
        <div className="destination-hero-sail destination-hero-sail-one" aria-hidden />
        <div className="destination-hero-sail destination-hero-sail-two" aria-hidden />
        <div className="destination-hero-stamp" aria-hidden>
          VI
        </div>

        <div className="section-shell relative z-20 flex min-h-[min(100svh,960px)] flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pb-16">
          <div className="max-w-4xl">
            <p className="destination-kicker">Greetings from the U.S. Virgin Islands</p>
            <h1 className="destination-display mt-5 text-balance text-white">
              Find Your Island Vibe.
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-white/86 sm:text-xl">
              Beach days, boat trips, local plates, culture, nightlife, and
              ferry hops across the U.S. Virgin Islands.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#day-moves-heading"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#11424b] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-sand"
              >
                Start with the vibe
              </Link>
              <Link
                href="/experiences/adventure"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 bg-white/14 px-6 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/24"
              >
                Explore things to do
              </Link>
            </div>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
            {postcardStops.map((stop) => (
              <Link
                key={stop}
                href={stop === "Beach" ? "/guides/best-beaches-usvi" : stop === "Boat" ? "/experiences/adventure" : stop === "Bite" ? "/experiences/culinary" : "/st-thomas/nightlife-rhythm"}
                className="destination-postcard-chip group"
              >
                <span>{stop}</span>
              </Link>
            ))}
          </div>
        </div>
      </MediaBackdrop>
    </section>
  );
}
