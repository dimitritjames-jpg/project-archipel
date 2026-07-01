import type { Metadata } from "next";
import Link from "next/link";
import { TrackedAnchor, TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import { env } from "@/lib/env";
import { type GetListedIntent, isGetListedIntent } from "@/lib/get-listed";
import { GET_LISTED_MEDIA } from "@/lib/media";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Get Listed on VibeVI",
  description:
    "Claim or correct your listing, send approved photos, ask about featured placement, or add your USVI business to VibeVI.",
  alternates: { canonical: absoluteUrl("/get-listed") },
  openGraph: {
    title: "Get Listed on VibeVI",
    description:
      "Use the VibeVI launch inbox to confirm a listing, send approved photos, or register featured and sponsor interest.",
    url: absoluteUrl("/get-listed"),
  },
  robots: { index: true, follow: true },
};

type Props = {
  searchParams?: Promise<{
    intent?: string;
    business?: string;
    island?: string;
    category?: string;
  }>;
};

const whyVibeVi = [
  {
    title: "Island-first discovery",
    body: "People arrive through island hubs, category routes, search, guides, and profile links built around what the day needs next.",
  },
  {
    title: "Useful public profiles",
    body: "Listings carry real island, category, source, and contact context without pretending VibeVI books or verifies every live detail.",
  },
  {
    title: "Cross-surface visibility",
    body: "A strong listing can connect to beaches, boats, bites, nightlife, wellness, shops, stays, and practical planning routes.",
  },
  {
    title: "Trust before hype",
    body: "We are building a useful USVI directory, not making traffic, ranking, booking, or placement guarantees we cannot support.",
  },
] as const;

const freeActions = [
  {
    intent: "confirm-my-listing",
    label: "Confirm my listing",
    body: "Confirm your business name, island, category, contact details, and public-info accuracy.",
  },
  {
    intent: "correct-my-info",
    label: "Correct my info",
    body: "Send a correction for public contact details, category fit, description, or area notes.",
  },
  {
    intent: "send-approved-photos",
    label: "Send approved photos",
    body: "Share business-owned or licensed photos you explicitly approve for VibeVI to use.",
  },
  {
    intent: "public-info-confirmation",
    label: "Public-info confirmation",
    body: "Tell us a public-info listing is accurate while it remains clearly unclaimed.",
  },
] as const;

const growthActions = [
  {
    intent: "featured-placement",
    label: "Ask about featured placement",
    body: "Register interest in future featured opportunities without implying that paid placement is active now.",
  },
  {
    intent: "sponsor-interest",
    label: "Sponsor interest",
    body: "Ask about future sponsor inventory while we keep current promises limited to discovery and launch planning.",
  },
  {
    intent: "claim-interest",
    label: "Claim interest",
    body: "Record the owner or operator contact who should be first in line when claim tools formally open.",
  },
  {
    intent: "add-my-business",
    label: "Add my business",
    body: "Start a new listing request if your business is missing from the public directory.",
  },
] as const;

const intakeChecklist = [
  "Official business name, island, and best category",
  "Official website or business-owned social profile",
  "Best contact for listing corrections or future owner verification",
  "Public phone, email, address, or area you approve for display",
  "Short factual description written for publication",
  "Photos you own or have rights to share, plus any required credit",
] as const;

const intentConfig: Record<
  GetListedIntent,
  {
    subject: string;
    headline: string;
    buttonLabel: string;
    checklist: string[];
  }
> = {
  "confirm-my-listing": {
    subject: "VibeVI listing confirmation",
    headline: "I want to confirm a VibeVI listing.",
    buttonLabel: "Confirm my listing",
    checklist: [
      "[ ] Confirm my listing",
      "[ ] Business name is correct",
      "[ ] Island and category are correct",
      "[ ] Public contact details are correct",
    ],
  },
  "correct-my-info": {
    subject: "VibeVI listing correction",
    headline: "I need to correct a VibeVI listing.",
    buttonLabel: "Correct my info",
    checklist: [
      "[ ] Correct my info",
      "[ ] Business name correction",
      "[ ] Category or island correction",
      "[ ] Contact or area correction",
    ],
  },
  "send-approved-photos": {
    subject: "VibeVI approved photo submission",
    headline: "I want to send approved photos for a VibeVI listing.",
    buttonLabel: "Send approved photos",
    checklist: [
      "[ ] Send approved photos",
      "[ ] I own the photos or have permission to share them",
      "[ ] Credit requirement included",
      "[ ] Usage restrictions included if any",
    ],
  },
  "claim-interest": {
    subject: "VibeVI claim interest",
    headline: "I want to register claim interest for a VibeVI listing.",
    buttonLabel: "Claim interest",
    checklist: [
      "[ ] Claim interest",
      "[ ] Owner or operator name",
      "[ ] Role or title",
      "[ ] Best contact for future owner verification",
    ],
  },
  "featured-placement": {
    subject: "VibeVI featured placement interest",
    headline: "I want to ask about future featured placement.",
    buttonLabel: "Ask about featured placement",
    checklist: [
      "[ ] Ask about featured placement",
      "[ ] Business name",
      "[ ] Island and category",
      "[ ] Best contact for follow-up",
    ],
  },
  "add-my-business": {
    subject: "Add my business to VibeVI",
    headline: "My business is missing from VibeVI.",
    buttonLabel: "Add my business",
    checklist: [
      "[ ] Add my business",
      "[ ] Official business name",
      "[ ] Island and best category",
      "[ ] Website or business-owned social profile",
    ],
  },
  "sponsor-interest": {
    subject: "VibeVI sponsor interest",
    headline: "I want to ask about future sponsor opportunities.",
    buttonLabel: "Sponsor interest",
    checklist: [
      "[ ] Sponsor interest",
      "[ ] Business or brand name",
      "[ ] Island relevance",
      "[ ] Best contact for follow-up",
    ],
  },
  "public-info-confirmation": {
    subject: "VibeVI public-info listing confirmation",
    headline: "I want to confirm a VibeVI public-info listing is accurate.",
    buttonLabel: "Public-info confirmation",
    checklist: [
      "[ ] Public-info confirmation",
      "[ ] Listing is accurate",
      "[ ] Corrections attached if needed",
      "[ ] Best owner or operator contact if useful",
    ],
  },
};

function formatPrefillLabel(value: string | undefined) {
  return value?.trim() ? value.trim() : null;
}

function buildInquiryHref(
  inquiryEmail: string,
  intent: GetListedIntent,
  businessName?: string | null,
  island?: string | null,
  category?: string | null,
) {
  const config = intentConfig[intent];
  const lines = [
    config.headline,
    "",
    `Business name: ${businessName ?? ""}`,
    `Island: ${island ?? ""}`,
    `Category: ${category ?? ""}`,
    "Website or business-owned social link:",
    "Best contact:",
    "",
    ...config.checklist,
    "",
    "Notes:",
  ];

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(
    config.subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default async function GetListedPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const intent = isGetListedIntent(params.intent) ? params.intent : "add-my-business";
  const businessName = formatPrefillLabel(params.business);
  const island = formatPrefillLabel(params.island);
  const category = formatPrefillLabel(params.category);
  const inquiryEmail = env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL;
  const inquiryHref = inquiryEmail
    ? buildInquiryHref(inquiryEmail, intent, businessName, island, category)
    : null;

  return (
    <>
      <MediaBackdrop
        media={GET_LISTED_MEDIA}
        overlay="hero"
        priority
        className="min-h-[62svh]"
      >
        <div className="section-shell flex min-h-[62svh] flex-col justify-end pb-12 pt-32 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow-label !text-coral-sunset">For USVI businesses</p>
            <ComingSoonBadge label="Owner dashboard coming soon" />
          </div>
          <h1 className="display-type mt-5 max-w-5xl text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">
            Put your business where island discovery starts.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            Claim or correct your listing, send approved photos, ask about future
            featured placement, or add your business through the VibeVI launch
            inbox.
          </p>
          {businessName ? (
            <div className="mt-6 max-w-2xl rounded-[1.2rem] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-white/70">
              Working on <span className="font-semibold text-white">{businessName}</span>
              {island ? ` on ${island}` : ""}
              {category ? ` in ${category}` : ""}. The inquiry buttons below will
              prefill that context.
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {inquiryHref ? (
              <TrackedAnchor
                href={inquiryHref}
                eventName="get_listed_cta_clicked"
                eventProperties={{ placement: "hero", channel: "mailto", intent }}
                className="rounded-full bg-coral px-6 py-3 text-sm font-bold text-midnight-950 transition hover:bg-[#ff9b8e]"
              >
                {intentConfig[intent].buttonLabel}
              </TrackedAnchor>
            ) : (
              <span className="rounded-full border border-coral/20 bg-coral/8 px-6 py-3 text-sm font-semibold text-coral-sunset">
                Inquiry email awaiting launch configuration
              </span>
            )}
            <TrackedLink
              href="#free-actions"
              eventName="get_listed_cta_clicked"
              eventProperties={{ placement: "hero", channel: "onsite", target: "free-actions" }}
              className="rounded-full border border-coral/18 bg-coral/7 px-6 py-3 text-sm font-semibold text-coral-sunset"
            >
              Free listing actions
            </TrackedLink>
            <Link
              href="/search"
              className="rounded-full border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
            >
              See the directory
            </Link>
          </div>
        </div>
      </MediaBackdrop>

      <main className="section-shell py-16 sm:py-24">
        <section aria-labelledby="listing-value">
          <p className="eyebrow-label">Why VibeVI</p>
          <h2
            id="listing-value"
            className="display-type mt-4 max-w-4xl text-3xl font-semibold text-white sm:text-5xl"
          >
            A listing built for the island decision point.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/56">
            VibeVI now carries real public-info inventory across all four islands.
            The point is not inflated reach claims. The point is helping someone
            choose the next beach, boat, bite, night, stay, or reset with cleaner
            local context.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyVibeVi.map((item, index) => (
              <article key={item.title} className="command-surface rounded-[1.4rem] p-5">
                <span className="font-mono text-[10px] text-aqua/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="free-actions"
          className="mt-20 border-t border-white/8 pt-14"
          aria-labelledby="free-actions-heading"
        >
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow-label">Free actions</p>
              <h2
                id="free-actions-heading"
                className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl"
              >
                Confirm, correct, and improve the public profile.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/56">
                Use these actions to keep a public-info listing accurate. We can
                confirm details, correct fields, and review approved photos without
                implying claim status, premium placement, booking, or partnership.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {freeActions.map((action) => {
                const href = inquiryEmail
                  ? buildInquiryHref(
                      inquiryEmail,
                      action.intent,
                      businessName,
                      island,
                      category,
                    )
                  : null;

                return (
                  <article
                    key={action.intent}
                    className="rounded-[1.3rem] border border-white/9 bg-white/[0.035] p-5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aqua/60">
                      Owner action
                    </p>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      {action.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {action.body}
                    </p>
                    {href ? (
                      <TrackedAnchor
                        href={href}
                        eventName="get_listed_cta_clicked"
                        eventProperties={{
                          placement: "free_actions",
                          channel: "mailto",
                          intent: action.intent,
                        }}
                        className="mt-6 inline-flex rounded-full border border-aqua/20 bg-aqua/10 px-4 py-2 text-sm font-semibold text-aqua transition hover:bg-aqua/16"
                      >
                        {action.label}
                      </TrackedAnchor>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="growth-actions"
          className="mt-20 grid gap-8 border-t border-white/8 pt-14 lg:grid-cols-[1fr_0.8fr]"
          aria-labelledby="growth-actions-heading"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow-label">Growth actions</p>
              <ComingSoonBadge label="No paid placement active" />
            </div>
            <h2
              id="growth-actions-heading"
              className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl"
            >
              Register interest without over-promising what is live.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/56">
              Featured placement, sponsor inventory, and future lead routing are
              roadmap conversations, not active commerce products. We can record
              interest, but we do not promise placement, traffic, rankings, bookings,
              or category preference.
            </p>
          </div>
          <div className="glass-luminous rounded-[1.5rem] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-sunset">
              Future sponsor inventory
            </p>
            <div className="mt-6 grid gap-3">
              {growthActions.map((action) => {
                const href = inquiryEmail
                  ? buildInquiryHref(
                      inquiryEmail,
                      action.intent,
                      businessName,
                      island,
                      category,
                    )
                  : null;

                return (
                  <div
                    key={action.intent}
                    className="rounded-xl border border-white/8 bg-white/[0.035] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-white">{action.label}</h3>
                      {href ? (
                        <TrackedAnchor
                          href={href}
                          eventName={
                            action.intent === "featured-placement" ||
                            action.intent === "sponsor-interest"
                              ? "sponsor_cta_clicked"
                              : "get_listed_cta_clicked"
                          }
                          eventProperties={{
                            placement: "growth_actions",
                            channel: "mailto",
                            intent: action.intent,
                          }}
                          className="rounded-full border border-coral/18 bg-coral/8 px-3 py-1.5 text-xs font-semibold text-coral-sunset transition hover:bg-coral/14"
                        >
                          {action.label}
                        </TrackedAnchor>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/52">{action.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="command-surface topographic-field mt-20 rounded-[1.7rem] p-7 sm:p-10"
          aria-labelledby="active-now"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="eyebrow-label">Active now vs. next</p>
              <h2
                id="active-now"
                className="display-type mt-4 text-3xl font-semibold text-white"
              >
                Honest expectations from the first message.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/56">
                VibeVI currently supports published listing pages, island/category
                routes, guide connections, and direct-source profile fields. Self-serve
                claiming, owner login, payments, sponsor checkout, and analytics
                dashboards are not active.
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-aqua/15 bg-aqua/6 p-6">
              <p className="font-semibold text-white">Future lead routing</p>
              <p className="mt-3 text-sm leading-6 text-white/50">
                We can note interest in future owner tools and lead routing, but we do
                not claim that inquiry delivery, paid placement, or owner dashboards
                are live today.
              </p>
              {inquiryHref ? (
                <TrackedAnchor
                  href={inquiryHref}
                  eventName="get_listed_cta_clicked"
                  eventProperties={{
                    placement: "active_now",
                    channel: "mailto",
                    intent,
                  }}
                  className="mt-6 inline-flex rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-midnight-950"
                >
                  Email VibeVI listings
                </TrackedAnchor>
              ) : (
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-aqua">
                  Listing inbox configuration pending
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className="mt-20 grid gap-8 border-t border-white/8 pt-14 lg:grid-cols-[0.75fr_1.25fr]"
          aria-labelledby="intake-checklist"
        >
          <div>
            <p className="eyebrow-label">What we need from you</p>
            <h2
              id="intake-checklist"
              className="display-type mt-4 text-3xl font-semibold text-white sm:text-5xl"
            >
              The intake stays human-reviewed and permission-aware.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/56">
              This is a human-reviewed intake path, not self-serve claiming. Submitted
              listings stay noindex and contact-safe until source review, permission,
              and launch QA pass.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {intakeChecklist.map((item, index) => (
              <div
                key={item}
                className="rounded-[1.15rem] border border-white/9 bg-white/[0.035] p-4 text-sm leading-6 text-white/62"
              >
                <span className="mb-4 block font-mono text-[10px] text-aqua/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-white/8 pt-14" aria-labelledby="trust-note">
          <div className="rounded-[1.4rem] border border-coral/15 bg-coral/7 p-6 sm:p-8">
            <p className="eyebrow-label !text-coral-sunset">Trust note</p>
            <h2 id="trust-note" className="mt-4 text-2xl font-semibold text-white">
              Public-info listings stay unclaimed until the business confirms them.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">
              VibeVI does not treat a public source as proof of ownership. Public-info
              listings remain clearly unclaimed until a business confirms details,
              permissions, and the right contact. No traffic guarantee, ranking
              guarantee, booking guarantee, or paid placement promise is made here.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
