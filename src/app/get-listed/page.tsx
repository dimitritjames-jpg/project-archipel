import type { Metadata } from "next";
import Link from "next/link";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { GET_LISTED_MEDIA } from "@/lib/media";

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

const profileValue = [
  { title: "A useful public profile", body: "Island, category, description, location context, and direct-source contact fields when verified." },
  { title: "Island-day connections", body: "Relevant island hubs, category pages, guide pages, map/search surfaces, and internal links." },
  { title: "Richer media readiness", body: "A production path for licensed cover photography and business-owned gallery assets." },
  { title: "Future performance context", body: "The foundation for measured profile engagement without promising traffic or rankings." },
];

const placements = [
  "Featured category position",
  "Guide-page feature module",
  "Island hub sponsor slot",
  "Seasonal discovery campaign",
] as const;

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
    <>
      <MediaBackdrop media={GET_LISTED_MEDIA} overlay="hero" priority className="min-h-[62svh]">
        <div className="section-shell flex min-h-[62svh] flex-col justify-end pb-12 pt-32 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3"><p className="eyebrow-label !text-coral-sunset">For USVI businesses</p><ComingSoonBadge label="Owner dashboard coming soon" /></div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">Get listed where the island day begins.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">VibeVI helps local businesses meet people deciding where to eat, sail, stay, shop, reset, and go next.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {inquiryHref ? <TrackedAnchor href={inquiryHref} eventName="get_listed_cta_clicked" eventProperties={{ placement: "hero", channel: "mailto" }} className="rounded-full bg-coral px-6 py-3 text-sm font-bold text-midnight-950 transition hover:bg-[#ff9b8e]">Start a listing inquiry</TrackedAnchor> : <span className="rounded-full border border-coral/20 bg-coral/8 px-6 py-3 text-sm font-semibold text-coral-sunset">Inquiry email awaiting launch configuration</span>}
            <TrackedLink href="#premium-preview" eventName="sponsor_cta_clicked" eventProperties={{ placement: "get_listed_hero", status: "preview_only" }} className="rounded-full border border-coral/18 bg-coral/7 px-6 py-3 text-sm font-semibold text-coral-sunset">Preview future sponsor options</TrackedLink>
            <Link href="/search" className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white">See the directory</Link>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <section aria-labelledby="listing-value"><p className="eyebrow-label">Why VibeVI</p><h2 id="listing-value" className="display-type mt-4 max-w-4xl text-3xl font-semibold text-white sm:text-5xl">A listing designed to help someone make the next move.</h2><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{profileValue.map((item, index) => <article key={item.title} className="command-surface rounded-[1.4rem] p-5"><span className="font-mono text-[10px] text-aqua/60">0{index + 1}</span><h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/52">{item.body}</p></article>)}</div></section>

        <section id="premium-preview" className="mt-20 grid gap-8 border-t border-white/8 pt-14 lg:grid-cols-[1fr_0.8fr]" aria-labelledby="premium-preview-heading"><div><div className="flex flex-wrap items-center gap-3"><p className="eyebrow-label">Premium profile preview</p><ComingSoonBadge label="No paid placement active" /></div><h2 id="premium-preview-heading" className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl">More story, more place, clearer action.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/56">The premium direction includes richer licensed media, expanded storytelling, offers, and warmer island-day placements. Packages, eligibility, measurement, and pricing are not finalized and no placement is currently for sale through the site.</p></div><div className="glass-luminous rounded-[1.5rem] p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-sunset">Potential sponsor inventory</p><ul className="mt-6 space-y-3">{placements.map((placement) => <li key={placement} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-white/62"><span className="h-1.5 w-1.5 rounded-full bg-coral" />{placement}</li>)}</ul></div></section>

        <section className="command-surface topographic-field mt-20 rounded-[1.7rem] p-7 sm:p-10" aria-labelledby="active-now"><div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]"><div><p className="eyebrow-label">Active now vs. next</p><h2 id="active-now" className="display-type mt-4 text-3xl font-semibold text-white">Clear expectations from the first conversation.</h2><p className="mt-5 text-sm leading-7 text-white/56">VibeVI currently supports published listing pages, island/category routes, guide connections, and direct-source profile fields. Self-serve claiming, owner login, payments, sponsor checkout, and analytics dashboards are not active.</p></div><div className="rounded-[1.3rem] border border-aqua/15 bg-aqua/6 p-6"><p className="font-semibold text-white">Prepare an inquiry</p><p className="mt-3 text-sm leading-6 text-white/50">Have your business name, island, category, official website or social profile, best contact, and proof of ownership ready.</p>{inquiryHref ? <TrackedAnchor href={inquiryHref} eventName="get_listed_cta_clicked" eventProperties={{ placement: "active_now", channel: "mailto" }} className="mt-6 inline-flex rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-midnight-950">Email VibeVI listings</TrackedAnchor> : <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-aqua">Listing inbox configuration pending</p>}</div></div></section>

        <section className="mt-20 grid gap-8 border-t border-white/8 pt-14 lg:grid-cols-[0.75fr_1.25fr]" aria-labelledby="intake-checklist"><div><p className="eyebrow-label">Real business intake</p><h2 id="intake-checklist" className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl">What VibeVI needs before a listing can go live.</h2><p className="mt-5 text-sm leading-7 text-white/56">This is a human-reviewed intake path, not self-serve claiming. Submitted listings stay noindex and contact-safe until source review, permission, and launch QA pass.</p></div><div className="grid gap-3 sm:grid-cols-2">{intakeChecklist.map((item, index) => <div key={item} className="rounded-[1.15rem] border border-white/9 bg-white/[0.035] p-4 text-sm leading-6 text-white/62"><span className="mb-4 block font-mono text-[10px] text-aqua/60">0{index + 1}</span>{item}</div>)}</div></section>
      </main>
    </>
  );
}
