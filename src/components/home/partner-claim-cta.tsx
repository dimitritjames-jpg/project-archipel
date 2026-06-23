import Link from "next/link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";

const businessBenefits = [
  "A richer profile built for island-day decisions",
  "Future featured and sponsor placements",
  "Reach people deciding what to do next",
] as const;

export function PartnerClaimCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="partner-cta">
      <div className="mx-auto max-w-7xl">
        <div className="island-postcard-card topographic-field relative overflow-hidden rounded-[2rem] border border-coral/15 bg-[#20111d] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="absolute right-[-8rem] top-[-10rem] h-[26rem] w-[26rem] rounded-full border border-coral/12" aria-hidden />
          <div className="absolute right-[-4rem] top-[-6rem] h-[18rem] w-[18rem] rounded-full border border-aqua/12" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow-label !text-coral-sunset">For VI businesses</p>
                <ComingSoonBadge label="Owner tools preview" />
              </div>
              <h2
                id="partner-cta"
                className="text-balance mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-archipel-white sm:text-5xl"
              >
                Be part of the move people make next.
              </h2>
              <p className="text-pretty mt-5 max-w-2xl text-base leading-relaxed text-archipel-white/62 sm:text-lg">
                VibeVI connects local businesses with visitors, residents, and
                crews deciding where their island day goes next. Owner tools are
                still in preview, but the directory is being built for you now.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/get-listed"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral px-6 text-sm font-bold text-midnight-950 transition hover:-translate-y-0.5 hover:bg-[#ff9b8e]"
                >
                  Get listed on VibeVI <span aria-hidden>↗</span>
                </Link>
                <Link
                  href="/get-listed#active-now"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-archipel-white transition hover:border-aqua/30 hover:bg-aqua/6"
                >
                  Claim your business
                </Link>
              </div>
            </div>

            <ul className="grid gap-3">
              {businessBenefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-midnight-950/35 px-4 py-3 backdrop-blur-md"
                >
                  <span className="font-mono text-[10px] text-coral-sunset/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-archipel-white/68">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
