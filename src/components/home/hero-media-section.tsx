import Link from "next/link";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { HERO_MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

const islandStats = [
  { value: "Beach", label: "sand + shade" },
  { value: "Boat", label: "reef + sail" },
  { value: "Night", label: "music + rum" },
] as const;

export function HeroMediaSection() {
  return (
    <section className="relative -mt-px overflow-hidden border-b border-sand/20">
      <MediaBackdrop
        media={HERO_MEDIA}
        overlay="hero"
        priority
        className="min-h-[min(96vh,920px)]"
      >
        <div className="hero-sun-orb" aria-hidden />
        <div className="hero-ocean-shelf" aria-hidden />

        <div className="section-shell flex min-h-[min(96vh,920px)] flex-col justify-center pb-12 pt-20 sm:pb-16 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.55fr)] lg:gap-16">
            <div className="relative z-10">
              <p className="eyebrow-label">The Virgin Islands, by feeling</p>
              <h1 className="display-type text-balance mt-6 max-w-5xl text-archipel-white">
                Find Your{" "}
                <span className="block bg-gradient-to-r from-sand via-[#8df8ee] to-coral-sunset bg-clip-text text-transparent">
                  Island Vibe.
                </span>
              </h1>
              <p className="text-pretty mt-7 max-w-2xl text-base leading-relaxed text-archipel-white/74 sm:text-lg lg:text-xl">
                Swim the morning, boat the afternoon, eat by the water, and follow
                the music after dark. VibeVI helps you find the beach, bite, boat,
                night, and local story that fit your island day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/experiences/adventure"
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-aqua px-6 text-sm font-bold text-midnight-950",
                    "shadow-glow-aqua transition hover:-translate-y-0.5 hover:bg-[#78f7eb]",
                  )}
                >
                  Chase the water
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/experiences/culinary"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand/30 bg-sand/10 px-6 text-sm font-semibold text-sand backdrop-blur-md transition hover:border-coral/45 hover:bg-coral/10 hover:text-white"
                >
                  Find food + music
                </Link>
              </div>

              <div className="mt-9 max-w-2xl">
                <HomeSearchBar />
                <p className="mt-3 pl-2 text-[11px] leading-relaxed text-sand/58">
                  Try “beach bar,” “Cruz Bay,” “charter,” “pate,” or “sunset dinner.”
                </p>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[460px] lg:block">
              <div className="hero-island-postcard">
                <div className="hero-postcard-sun" aria-hidden />
                <div className="hero-postcard-sail hero-postcard-sail-one" aria-hidden />
                <div className="hero-postcard-sail hero-postcard-sail-two" aria-hidden />
                <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <path d="M0 252 C74 220 130 238 205 214 C294 184 343 205 420 176 L420 420 L0 420 Z" fill="rgba(3, 88, 98, 0.64)" />
                  <path d="M0 286 C80 250 144 278 225 246 C305 216 350 235 420 208 L420 420 L0 420 Z" fill="rgba(12, 173, 182, 0.55)" />
                  <path d="M14 316 C80 296 126 310 194 292 C280 270 334 286 406 260" fill="none" stroke="rgba(255,244,214,0.5)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M34 342 C114 318 172 342 246 318 C310 298 350 310 392 292" fill="none" stroke="rgba(125,232,220,0.45)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M76 214 C112 176 154 160 208 170 C260 180 295 166 330 132 C328 170 302 206 258 226 C188 258 126 242 76 214 Z" fill="rgba(7, 42, 34, 0.88)" />
                  <path d="M110 202 C132 178 170 162 214 168" fill="none" stroke="rgba(184,238,117,0.45)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M268 145 C292 126 320 114 346 116" fill="none" stroke="rgba(184,238,117,0.35)" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-x-7 bottom-8 z-10 rounded-[1.4rem] border border-sand/20 bg-[#08242d]/72 p-5 shadow-2xl backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand">Today&apos;s island ingredients</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Turquoise water, a ferry hop, reef time, johnny cakes, rum sunset, and one more song after dinner.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-7 left-1/2 grid w-[90%] -translate-x-1/2 grid-cols-3 overflow-hidden rounded-2xl border border-sand/20 bg-[#061b22]/86 shadow-2xl backdrop-blur-xl">
                {islandStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "px-3 py-3 text-center",
                      index > 0 && "border-l border-white/8",
                    )}
                  >
                    <p className="text-sm font-bold text-sand">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-archipel-white/42">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand/55 lg:mt-20">
            <span className="h-px w-10 bg-gradient-to-r from-sand/80 to-transparent" />
            Scroll into the islands — beach, boat, bite, night
          </div>
        </div>
      </MediaBackdrop>
    </section>
  );
}
