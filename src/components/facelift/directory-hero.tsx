import Image from "next/image";
import Link from "next/link";
import type { ResponsiveMedia } from "@/lib/vibevi-media";
import { cn } from "@/lib/utils";

type DirectoryHeroProps = {
  media: ResponsiveMedia;
  breadcrumb?: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
  className?: string;
};

export function DirectoryHero({
  media,
  breadcrumb,
  eyebrow,
  title,
  description,
  aside,
  className,
}: DirectoryHeroProps) {
  const imageStyle = { objectPosition: media.objectPosition ?? "center" };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-[#0b4b55]/8",
        "min-h-[min(42vh,380px)]",
        className,
      )}
    >
      <Image
        src={media.mobile}
        alt=""
        fill
        sizes="100vw"
        className="object-cover md:hidden"
        style={imageStyle}
      />
      <Image
        src={media.desktop}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover md:block"
        style={imageStyle}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#041820]/82 via-[#041820]/40 to-[#fffaf3]/12"
        aria-hidden
      />
      <div className="section-shell relative z-10 flex min-h-[min(42vh,380px)] flex-col justify-end pb-8 pt-20 sm:pb-10">
        {breadcrumb}
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.38fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7ee8df]">
              {eyebrow}
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82 sm:text-base">
              {description}
            </p>
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function DirectoryHeroLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex text-xs font-semibold text-white/70 transition hover:text-white"
    >
      {children}
    </Link>
  );
}
