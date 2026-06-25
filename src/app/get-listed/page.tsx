import type { Metadata } from "next";
import Image from "next/image";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/tracked-link";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { VvButtonSecondary, VvCard, VvEyebrow, VvHeading, VvPage } from "@/components/facelift/vv-ui";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { env } from "@/lib/env";
import { VIBEVI_GET_LISTED } from "@/lib/vibevi-media";

export const metadata: Metadata = {
  title: "Get Listed on VibeVI",
  description:
    "Introduce your USVI business to people planning beaches, boats, dining, nightlife, stays, wellness, shopping, and island experiences.",
  alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/get-listed` },
  openGraph: {
    title: "Get Listed on VibeVI",
    description:
      "Prepare a richer VibeVI profile and register interest in future featured and sponsor placements.",
    url: `${env.NEXT_PUBLIC_SITE_URL}/get-listed`,
  },
  robots: { index: true, follow: true },
};

const benefits = [
  { title: "More visibility", body: "Meet people already planning beaches, boats, bites, stays, and island days." },
  { title: "Targeted traffic", body: "Island hubs, category pages, guides, search, and map surfaces connect the right audience." },
  { title: "Build trust", body: "Clear listing states, honest placeholders, and direct-source contact when verified." },
  { title: "Grow your presence", body: "A foundation for richer media, owner tools, and future featured placements." },
];

const localRoles = [
  { label: "Captains & operators", image: "/media/vibevi/home/cards/card-boat-local-captain-desktop.webp" },
  { label: "Chefs & bartenders", image: "/media/vibevi/home/cards/card-bite-sunset-dining-desktop.webp" },
  { label: "Makers & vendors", image: "/media/vibevi/experiences/experience-local-shops-thumbnail.webp" },
  { label: "Wellness providers", image: "/media/vibevi/experiences/experience-wellness-thumbnail.webp" },
];

const intakeChecklist = [
  "Official business name, island, and best category",
  "Official website or business-owned social link",
  "Short factual description approved for publication",
  "Public address or area, plus coordinates if known",
  "Phone/email publication permission status",
  "Owned or licensed media with usage approval",
] as const;

export default function GetListedPage() {
  const inquiryEmail = env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL;
  const inquiryHref = inquiryEmail
    ? `mailto:${inquiryEmail}?subject=${encodeURIComponent("VibeVI business listing inquiry")}&body=${encodeURIComponent("Business name:\nIsland:\nCategory:\nWebsite or social link:\nBest contact:\n\nI am interested in:\n[ ] Launch listing\n[ ] Premium profile preview\n[ ] Featured or sponsor opportunities\n")}`
    : null;

  return (
    <VvPage>
      <ResponsiveHero media={VIBEVI_GET_LISTED.hero} priority minHeight="min-h-[min(62vh,580px)]">
        <div className="section-shell flex min-h-[inherit] flex-col justify-end pb-10 pt-28 sm:pb-14">
          <div className="flex flex-wrap items-center gap-2">
            <VvEyebrow className="!text-[#ffd4c8]">For USVI businesses</VvEyebrow>
            <ComingSoonBadge label="Owner dashboard coming soon" />
          </div>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Get Listed. Get Found. Grow Your Business.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            VibeVI helps local captains, chefs, bartenders, makers, wellness providers, and operators meet people deciding where to eat, sail, stay, shop, and go next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {inquiryHref ? (
              <TrackedAnchor
                href={inquiryHref}
                eventName="get_listed_cta_clicked"
                eventProperties={{ placement: "hero", channel: "mailto" }}
                className="inline-flex min-h-11 items-center rounded-full bg-[#ff7968] px-6 text-sm font-bold text-[#173941] transition hover:bg-[#ff9b8e]"
              >
                Start a listing inquiry
              </TrackedAnchor>
            ) : (
              <span className="rounded-full border border-[#ff7968]/30 bg-[#ff7968]/15 px-6 py-3 text-sm font-semibold text-[#ffd4c8]">
                Inquiry email awaiting launch configuration
              </span>
            )}
            <TrackedLink
              href="#benefits"
              eventName="sponsor_cta_clicked"
              eventProperties={{ placement: "get_listed_hero", status: "preview_only" }}
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/12 px-6 text-sm font-semibold text-white backdrop-blur-sm"
            >
              See listing benefits
            </TrackedLink>
            <VvButtonSecondary href="/search" className="border-white/25 bg-white/90">
              See the directory
            </VvButtonSecondary>
          </div>
        </div>
      </ResponsiveHero>

      <main className="section-shell py-14 sm:py-20">
        <section id="benefits" aria-labelledby="listing-value">
          <VvEyebrow>Why VibeVI</VvEyebrow>
          <VvHeading id="listing-value" className="mt-3 max-w-3xl text-3xl sm:text-4xl">
            A listing designed for local business owners—not corporate stock photo energy.
          </VvHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <VvCard key={item.title} className="p-5">
                <span className="font-mono text-[10px] text-[#0797a6]">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-semibold text-[#173941]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#496871]">{item.body}</p>
              </VvCard>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="local-roles">
          <VvEyebrow>Built for island operators</VvEyebrow>
          <VvHeading id="local-roles" className="mt-3 text-2xl sm:text-3xl">
            Captains, chefs, makers, and wellness providers belong here.
          </VvHeading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localRoles.map((role) => (
              <VvCard key={role.label} className="overflow-hidden">
                <span className="relative block h-36">
                  <Image src={role.image} alt="" fill sizes="25vw" className="object-cover" />
                </span>
                <p className="p-4 text-sm font-semibold text-[#173941]">{role.label}</p>
              </VvCard>
            ))}
          </div>
        </section>

        <VvCard className="mt-16 p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <VvEyebrow>Active now vs. next</VvEyebrow>
              <VvHeading className="mt-3 text-2xl sm:text-3xl">
                Clear expectations from the first conversation.
              </VvHeading>
              <p className="mt-4 text-sm leading-7 text-[#496871]">
                VibeVI currently supports published listing pages, island/category routes, guide connections, and direct-source profile fields. Self-serve claiming, owner login, payments, sponsor checkout, and analytics dashboards are not active. No fake performance claims.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[#0797a6]/20 bg-[#e9fbf7] p-6">
              <p className="font-semibold text-[#173941]">Prepare an inquiry</p>
              <p className="mt-2 text-sm leading-6 text-[#496871]">
                Have your business name, island, category, official website or social profile, best contact, and proof of ownership ready.
              </p>
              {inquiryHref ? (
                <TrackedAnchor
                  href={inquiryHref}
                  eventName="get_listed_cta_clicked"
                  eventProperties={{ placement: "active_now", channel: "mailto" }}
                  className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#0b4b55] px-5 text-sm font-bold text-white"
                >
                  Email VibeVI listings
                </TrackedAnchor>
              ) : (
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0797a6]">
                  Listing inbox configuration pending
                </p>
              )}
            </div>
          </div>
        </VvCard>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]" aria-labelledby="intake-checklist">
          <div>
            <VvEyebrow>Real business intake</VvEyebrow>
            <VvHeading id="intake-checklist" className="mt-3 text-2xl sm:text-3xl">
              What VibeVI needs before a listing can go live.
            </VvHeading>
            <p className="mt-4 text-sm leading-7 text-[#496871]">
              This is a human-reviewed intake path, not self-serve claiming. Submitted listings stay noindex and contact-safe until source review, permission, and launch QA pass.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {intakeChecklist.map((item, index) => (
              <div
                key={item}
                className="rounded-[1.1rem] border border-[#0b4b55]/10 bg-white p-4 text-sm leading-6 text-[#496871] shadow-[0_8px_24px_rgba(11,75,85,0.05)]"
              >
                <span className="mb-3 block font-mono text-[10px] text-[#0797a6]">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </VvPage>
  );
}
