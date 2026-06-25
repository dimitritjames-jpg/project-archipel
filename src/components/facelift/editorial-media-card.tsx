import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EditorialMediaCardProps = {
  href: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
  className?: string;
  badge?: string;
};

export function EditorialMediaCard({
  href,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  objectPosition = "center",
  className,
  badge,
}: EditorialMediaCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate flex min-h-[200px] overflow-hidden rounded-[1.25rem] border border-[#0b4b55]/10 bg-white shadow-[0_12px_40px_rgba(11,75,85,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(11,75,85,0.12)] sm:min-h-[240px]",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-[1.02]"
        style={{ objectPosition }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#041820]/78 via-[#041820]/18 to-transparent"
        aria-hidden
      />
      <div className="relative mt-auto flex w-full flex-col gap-1 p-5">
        {badge ? (
          <span className="mb-1 w-fit rounded-full bg-white/18 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-sm leading-relaxed text-white/78">{subtitle}</p>
        ) : null}
      </div>
    </Link>
  );
}
