import { TrackedAnchor, TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
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
      `Hi VibeVI,\n\nIntent: ${intent}\n\nI’m interested in planning an experience or contacting a local business listed on VibeVI.\n\nIsland / date / group size:\nPreferred experience:\nQuestions:\n\nThanks!`,
  });

  return `mailto:${env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL}?${params.toString()}`;
}

export function BookingComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-sand/20 bg-sand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand",
        className,
      )}
    >
      Booking tools coming soon
    </span>
  );
}

export function LeadPreviewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-aqua/20 bg-aqua/9 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-aqua",
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
        "inline-flex min-h-12 items-center justify-center rounded-full bg-aqua px-6 text-sm font-bold text-midnight-950 shadow-glow-aqua transition hover:-translate-y-0.5 hover:bg-[#78f7eb]",
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
      <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <LeadPreviewBadge />
          <BookingComingSoonBadge />
        </div>
        <p className="mt-3 text-sm leading-6 text-white/52">
          Request-availability emails are preview-only until the launch inbox is
          configured. VibeVI does not store personal planning details in this phase.
        </p>
      </div>
    );
  }

  return (
    <TrackedAnchor
      href={href}
      eventName="request_availability_clicked"
      eventProperties={{ pillar: pillar.slug, placement, channel: "mailto" }}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-coral/25 bg-coral/12 px-6 text-sm font-bold text-coral-sunset transition hover:bg-coral/18"
    >
      Request availability
    </TrackedAnchor>
  );
}

export function PlanThisExperienceCard({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <aside className="command-surface topographic-field rounded-[1.6rem] p-6">
      <div className="flex flex-wrap gap-2">
        <ComingSoonBadge label="Booking intent" />
        <LeadPreviewBadge />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-white">
        Plan this experience without fake booking.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/56">
        VibeVI can help you choose the right island route and contact path. It
        does not claim instant booking, live availability, deposits, or confirmed
        reservations in this phase.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <ExperienceCTA pillar={pillar} placement="plan_card" />
        <RequestAvailabilityCTA pillar={pillar} placement="plan_card" />
      </div>
      <p className="mt-5 text-[11px] leading-5 text-white/35">
        Future inquiry routing will stay source-reviewed and permission-based as VibeVI grows.
      </p>
    </aside>
  );
}

export function BookingIntentPanel({ pillar }: { pillar: ExperiencePillar }) {
  return (
    <section className="grid gap-5 lg:grid-cols-3" aria-labelledby="booking-intent">
      <div className="lg:col-span-1">
        <p className="eyebrow-label">Booking path</p>
        <h2 id="booking-intent" className="display-type mt-4 text-3xl font-semibold text-white">
          Start the {pillar.name.toLowerCase()} conversation, not a fake checkout.
        </h2>
      </div>
      <div className="grid gap-4 lg:col-span-2 sm:grid-cols-3">
        {[
          ["01", "Discover", "Use guides, islands, categories, and maps to narrow the move."],
          ["02", "Verify", "Open profiles and look for verified local status before relying on contact details."],
          ["03", "Inquire", "Confirm availability, pricing, timing, pickup, and terms directly with the business."],
        ].map(([step, title, body]) => (
          <article key={step} className="rounded-[1.25rem] border border-white/9 bg-white/[0.035] p-5">
            <p className="font-mono text-[10px] text-aqua/60">{step}</p>
            <h3 className="mt-6 font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/50">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
