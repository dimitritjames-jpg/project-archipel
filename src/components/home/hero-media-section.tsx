import Link from "next/link";
import { HomeSearchBar } from "@/components/search/home-search-bar";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { HERO_MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

const islandStats = [
  { value: "Beach", label: "sand + shade" },
  { value: "Boat", label: "reef + sail" },
  { value: "Bite", label: "plate + rum" },
  { value: "Night", label: "music + glow" },
] as const;

export function HeroMediaSection() {
  return (
    <section className="homepage-sunrise-hero relative -mt-px overflow-hidden border-b border-sand/35">
      <MediaBackdrop
        media={HERO_MEDIA}
        overlay="hero"
        priority
        className="min-h-[min(100vh,940px)]"
      >
        <div className="hero-sun-orb" aria-hidden />
        <div className="hero-ocean-shelf" aria-hidden />
        <div className="hero-sandbar" aria-hidden />

        <div className="section-shell flex min-h-[min(100vh,940px)] flex-col justify-center pb-12 pt-20 sm:pb-16 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-14">
            <div className="relative z-20">
              <p className="eyebrow-label text-reef-blue">The Virgin Islands, by feeling</p>
              <h1 className="display-type text-balance mt-6 max-w-5xl text-[#11323a] drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
                Find Your{" "}
                <span className="block bg-gradient-to-r from-reef-blue via-[#0baeb6] to-coral-sunset bg-clip-text text-transparent">
                  Island Vibe.
                </span>
              </h1>
              <p className="text-pretty mt-7 max-w-2xl text-base leading-relaxed text-[#24464e]/82 sm:text-lg lg:text-xl">
                Swim the morning, boat the afternoon, eat by the water, and follow
                the music after dark. VibeVI helps you find the beach, bite, boat,
                night, and local story that fit your island day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/experiences/adventure"
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-reef-blue px-6 text-sm font-bold text-white",
                    "shadow-[0_18px_48px_rgba(7,151,166,0.28)] transition hover:-translate-y-0.5 hover:bg-[#078897]",
                  )}
                >
                  Chase the water
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/experiences/culinary"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-rum-amber/30 bg-white/72 px-6 text-sm font-semibold text-[#6f411c] shadow-[0_14px_40px_rgba(201,118,47,0.12)] backdrop-blur-md transition hover:border-coral/45 hover:bg-sand hover:text-[#3b2611]"
                >
                  Find food + music
                </Link>
              </div>

              <div className="mt-9 max-w-2xl rounded-[1.6rem] border border-white/70 bg-white/62 p-2 shadow-[0_22px_70px_rgba(7,151,166,0.16)] backdrop-blur-md">
                <HomeSearchBar />
                <p className="px-3 pb-2 pt-3 text-[11px] leading-relaxed text-[#42616a]/72">
                  Try &ldquo;beach bar,&rdquo; &ldquo;Cruz Bay,&rdquo; &ldquo;charter,&rdquo; &ldquo;pate,&rdquo; or &ldquo;sunset dinner.&rdquo;
                </p>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[680px]">
              <div className="hero-island-collage">
                <div className="hero-collage-photo-slot hero-collage-photo-main">
                  <div className="hero-postcard-sun" aria-hidden />
                  <div className="hero-postcard-sail hero-postcard-sail-one" aria-hidden />
                  <div className="hero-postcard-sail hero-postcard-sail-two" aria-hidden />
                  <svg viewBox="0 0 680 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <path d="M0 0H680V520H0Z" fill="url(#heroSky)" />
                    <path d="M0 276 C104 236 194 256 292 226 C426 184 514 214 680 162 L680 520 L0 520 Z" fill="rgba(7,151,166,0.74)" />
                    <path d="M0 328 C112 284 216 318 340 276 C466 234 560 264 680 220 L680 520 L0 520 Z" fill="rgba(55,234,217,0.58)" />
                    <path d="M0 392 C118 360 244 388 374 348 C494 312 586 332 680 300 L680 520 L0 520 Z" fill="rgba(244,223,184,0.72)" />
                    <path d="M62 348 C150 318 224 344 324 314 C442 278 548 296 632 264" fill="none" stroke="rgba(255,244,214,0.78)" strokeWidth="5" strokeLinecap="round" />
                    <path d="M96 386 C188 356 276 388 386 354 C480 324 558 344 628 318" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M106 250 C154 194 220 178 292 196 C360 214 414 190 464 136 C462 196 420 246 354 276 C254 324 172 298 106 250 Z" fill="rgba(16,70,50,0.9)" />
                    <path d="M150 236 C184 204 232 188 292 194" fill="none" stroke="rgba(184,238,117,0.5)" strokeWidth="5" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="heroSky" x1="120" x2="620" y1="0" y2="520">
                        <stop stopColor="#fff4d6" />
                        <stop offset=".42" stopColor="#9ef5ec" />
                        <stop offset="1" stopColor="#fff1ca" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute left-6 top-6 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-reef-blue shadow-lg backdrop-blur-md">
                    Hero water / boat shot goes here
                  </div>
                </div>

                <div className="hero-collage-photo-slot hero-collage-tile hero-collage-tile-beach">
                  <span>Beach</span>
                </div>
                <div className="hero-collage-photo-slot hero-collage-tile hero-collage-tile-bite">
                  <span>Bite</span>
                </div>
                <div className="hero-collage-photo-slot hero-collage-tile hero-collage-tile-night">
                  <span>Night</span>
                </div>

                <div className="hero-collage-note">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#755025]">Today&apos;s island ingredients</p>
                  <p className="mt-2 text-sm leading-6 text-[#31535b]/82">
                    Turquoise water, reef time, johnny cakes, rum sunset, and one more song after dinner.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {islandStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/70 bg-white/68 px-3 py-3 text-center shadow-[0_14px_40px_rgba(7,151,166,0.12)] backdrop-blur-md"
                  >
                    <p className="text-sm font-black text-[#0a7582]">{stat.value}</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-[#43636b]/68">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#7b5b2c]/72 lg:mt-14">
            <span className="h-px w-10 bg-gradient-to-r from-rum-amber/80 to-transparent" />
            Scroll into the islands — beach, boat, bite, night
          </div>
        </div>
      </MediaBackdrop>
    </section>
  );
}
