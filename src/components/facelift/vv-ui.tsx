import Link from "next/link";
import { cn } from "@/lib/utils";

export function VvPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("vv-page bg-[#fffaf3] text-[#173941]", className)}>{children}</div>;
}

export function VvCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "aside";
}) {
  return (
    <Tag
      className={cn(
        "rounded-[1.25rem] border border-[#0b4b55]/10 bg-white shadow-[0_12px_40px_rgba(11,75,85,0.08)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function VvEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.16em] text-[#0797a6]", className)}>
      {children}
    </p>
  );
}

export function VvHeading({
  children,
  className,
  as: Tag = "h2",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("font-display font-semibold tracking-[-0.04em] text-[#173941]", className)}>
      {children}
    </Tag>
  );
}

export function VvButtonPrimary({
  href,
  children,
  className,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b4b55] px-5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(11,75,85,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0f6874]",
    className,
  );
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function VvButtonSecondary({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b4b55]/14 bg-white px-5 text-sm font-semibold text-[#0b4b55] transition hover:border-[#0797a6]/35 hover:bg-[#e9fbf7]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
