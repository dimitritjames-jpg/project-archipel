import { TrackedAnchor, TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { VvCard, VvEyebrow, VvHeading } from "@/components/facelift/vv-ui";
import { env } from "@/lib/env";
import type { ExperiencePillar } from "@/lib/experience-pillars";
import { cn } from "@/lib/utils";

export const INQUIRY_INTENT_TYPES = [
  "get_listed",
  "sponsor_interest",
  "experience_planning",
  "request_availability",
  "business_contact",
] as const;

export type InquiryIntentType = (typeof INQUIRY_INTENT_TYPES)[number];

function buildInquiryHref(intent: InquiryIntentType, subject: string) {
  if (!env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL) return null;

  const params = new URLSearchParams({
    subject,
    body:
      `Hi VibeVI,\n\nIntent: ${intent}\n\nI'm interested in planning an experience or contacting a local business listed on VibeVI.\n\nIsland / date / group size:\nPreferred experience:\nQuestions:\n\nThanks!`,
  });

  return `mailto:${env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL}?${params.toString()}`;
}

export function BookingComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-[#0797a6]/25 bg-[#e9fbf7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0b4b55]",
        className,
      )}
    >
      Confirm directly
    </span>
  );
}

export function LeadPreviewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-[#ff7968]/25 bg-[#fff4f0] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c45a4a]",
        className,
      )}
    >
      Lead routing preview
    </span>
  );
}

export function ExperienceCTA({
  pillar,
  placement,
  className,
}: {
  pillar: ExperiencePillar;
  placement: string;
  className?: string;
}) {
  return (
    <TrackedLink
      href={pillar.suggestedCta.href}
      eventName="experience_cta_clicked"
      eventProperties={{
        pillar: pillar.slug,
        placement,
        intent: pillar.suggestedCta.intent,
      }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b4b55] px-6 text-sm font-bold text-white shadow-[0_10px_28px_rgba(11,75,85,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
        className,
      )}
    >
      {pillar.suggestedCta.label}
      <span className="ml-2" aria-hidden>↗</span>
    </TrackedLink>
  );
}

export function RequestAvailabilityCTA({
  pillar,
  placement,
}: {
  pillar: ExperiencePillar;
  placement: string;
}) {
  const href = buildInquiryHref(
    "request_availability",
    `VibeVI ${pillar.name} availability inquiry`,
  );

  if (!href) {
    return (
      <VvCard className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <LeadPreviewBadge />
          <BookingComingSoonBadge />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#496871]">
          Request-availability emails are preview-only until the launch inbox is
          configured. VibeVI does not store personal planning details in this phase.
        </p>
      </VvCard>
    );
  }

  return (
    <TrackedAnchor
      href={href}
      eventName="request_availability_clicked"
      eventProperties={{ pillar: pillar.slug, placement, channel: "mailto" }}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ff7968]/30 bg-[#fff4f0] px-6 text-sm font-bold text-[#c45a4a] transition hover:bg-[#ffe8e3]"
    >
      Request availability
    </TrackedAnchor>
  );
}

export function PlanThisExperienceCard({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <VvCard className="p-6">
      <div className="flex flex-wrap gap-2">
        <ComingSoonBadge label="Booking intent" />
        <LeadPreviewBadge />
      </div>
      <VvHeading as="h2" className="mt-5 text-2xl">
        Plan this experience without fake booking.
      </VvHeading>
      <p className="mt-3 text-sm leading-relaxed text-[#496871]">
        VibeVI can help you choose the right island route and contact path. It
        does not claim instant booking, live availability, deposits, or confirmed
        reservations in this phase.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <ExperienceCTA pillar={pillar} placement="plan_card" />
        <RequestAvailabilityCTA pillar={pillar} placement="plan_card" />
      </div>
      <p className="mt-4 text-[11px] leading-5 text-[#496871]">
        Future inquiry routing will stay source-reviewed and permission-based as VibeVI grows.
      </p>
    </VvCard>
  );
}

export function BookingIntentPanel({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <section className="grid gap-5 lg:grid-cols-3" aria-labelledby="booking-intent">
      <div className="lg:col-span-1">
        <VvEyebrow>Booking path</VvEyebrow>
        <VvHeading id="booking-intent" className="mt-3 text-2xl sm:text-3xl">
          Start the {pillar.name.toLowerCase()} conversation, not a fake checkout.
        </VvHeading>
      </div>
      <div className="grid gap-4 lg:col-span-2 sm:grid-cols-3">
        {[
          ["01", "Discover", "Use guides, islands, categories, and maps to narrow the move."],
          ["02", "Verify", "Open profiles and look for verified local status before relying on contact details."],
          ["03", "Inquire", "Confirm availability, pricing, timing, pickup, and terms directly with the business."],
        ].map(([step, title, body]) => (
          <UtilityInfoCard key={step} step={step} title={title} body={body} />
        ))}
      </div>
    </section>
  );
}

function UtilityInfoCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <VvCard className="p-5">
      <p className="font-mono text-[10px] font-semibold text-[#0797a6]">{step}</p>
      <h3 className="mt-5 font-semibold text-[#173941]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#496871]">{body}</p>
    </VvCard>
  );
}
