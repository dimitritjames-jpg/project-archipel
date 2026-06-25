import Link from "next/link";
import type { ResponsiveMedia } from "@/lib/vibevi-media";
import { VIBEVI_LISTING_PLACEHOLDERS } from "@/lib/vibevi-media";
import { ResponsiveHero } from "@/components/facelift/responsive-hero";
import { VvCard, VvEyebrow, VvHeading } from "@/components/facelift/vv-ui";
import { cn } from "@/lib/utils";

export function UtilityPage({ children }: { children: React.ReactNode }) {
  return <div className="vv-page bg-[#fffaf3] text-[#173941]">{children}</div>;
}

export function toResponsiveMedia(media: {
  src: string | null;
  alt: string;
  objectPosition?: string;
}): ResponsiveMedia {
  const src = media.src ?? VIBEVI_LISTING_PLACEHOLDERS.landscape;
  return {
    desktop: src,
    mobile: src,
    alt: media.alt,
    objectPosition: media.objectPosition ?? "center",
  };
}

type UtilityHeroProps = {
  media: ResponsiveMedia;
  eyebrow: string;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  minHeight?: string;
};

export function UtilityHero({
  media,
  eyebrow,
  title,
  description,
  badge,
  actions,
  minHeight = "min-h-[min(58vh,520px)]",
}: UtilityHeroProps) {
  return (
    <ResponsiveHero media={media} priority minHeight={minHeight}>
      <div className="section-shell flex min-h-[inherit] flex-col justify-end pb-10 pt-24 sm:pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <VvEyebrow className="!text-[#7ee8df]">{eyebrow}</VvEyebrow>
          {badge}
        </div>
        <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </ResponsiveHero>
  );
}

export function UtilityMain({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn("section-shell py-12 sm:py-16", className)}>{children}</main>;
}

export function UtilitySection({
  eyebrow,
  title,
  id,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-14 first:mt-0", className)} aria-labelledby={id}>
      {eyebrow ? <VvEyebrow>{eyebrow}</VvEyebrow> : null}
      <VvHeading id={id} className={cn("mt-2 text-2xl sm:text-3xl", !eyebrow && "mt-0")}>
        {title}
      </VvHeading>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#496871]">{description}</p>
      ) : null}
      {children}
    </section>
  );
}

export function UtilityInfoCard({
  step,
  title,
  body,
}: {
  step?: string;
  title: string;
  body: string;
}) {
  return (
    <VvCard className="p-5">
      {step ? (
        <span className="font-mono text-[10px] font-semibold text-[#0797a6]">{step}</span>
      ) : null}
      <h3 className={cn("text-lg font-semibold text-[#173941]", step && "mt-5")}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#496871]">{body}</p>
    </VvCard>
  );
}

export function UtilityLinkCard({
  href,
  title,
  body,
  cta = "Open",
  accent = "teal",
}: {
  href: string;
  title: string;
  body: string;
  cta?: string;
  accent?: "teal" | "coral";
}) {
  const hover =
    accent === "coral"
      ? "hover:border-[#ff7968]/30 hover:text-[#ff7968]"
      : "hover:border-[#0797a6]/30 hover:text-[#0b4b55]";

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-[1.2rem] border border-[#0b4b55]/10 bg-white p-5 shadow-[0_8px_24px_rgba(11,75,85,0.06)] transition hover:-translate-y-0.5",
        hover,
      )}
    >
      <h3 className="font-semibold text-[#173941] group-hover:text-inherit">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#496871]">{body}</p>
      <span className="mt-4 inline-flex text-sm font-semibold text-[#0797a6]">
        {cta} <span className="ml-2 transition group-hover:translate-x-1" aria-hidden>→</span>
      </span>
    </Link>
  );
}

export function UtilityChipLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-[#0b4b55] bg-[#0b4b55] text-white"
          : "border-[#0b4b55]/12 bg-white text-[#315057] hover:border-[#0797a6]/30 hover:bg-[#e9fbf7]",
      )}
    >
      {children}
    </Link>
  );
}

export function UtilityWidgetShell({ children }: { children: React.ReactNode }) {
  return <VvCard className="p-3 sm:p-4">{children}</VvCard>;
}

export function UtilityTrustNote({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <VvCard className="border-[#0797a6]/15 bg-[#e9fbf7] p-6">
      <h3 className="font-semibold text-[#173941]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#496871]">{body}</p>
      {children ? <div className="mt-5 flex flex-wrap gap-3">{children}</div> : null}
    </VvCard>
  );
}

export function UtilityPrimaryButton({
  href,
  children,
  tone = "teal",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "teal" | "coral";
}) {
  const classes =
    tone === "coral"
      ? "inline-flex min-h-11 items-center rounded-full bg-[#ff7968] px-5 text-sm font-bold text-[#173941] transition hover:bg-[#ff9b8e]"
      : "inline-flex min-h-11 items-center rounded-full bg-[#0b4b55] px-5 text-sm font-bold text-white transition hover:bg-[#0f6874]";

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function UtilitySecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-full border border-[#0b4b55]/14 bg-white px-5 text-sm font-semibold text-[#0b4b55] transition hover:bg-[#e9fbf7]"
    >
      {children}
    </Link>
  );
}

export function UtilityHighlightChips({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#0797a6]/15 bg-[#e9fbf7] px-3 py-1.5 text-xs font-medium text-[#0b4b55]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
