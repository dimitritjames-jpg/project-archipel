import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MoodItem = {
  id: string;
  label: string;
  href: string;
  desktop: string;
  mobile: string;
  alt: string;
  objectPosition?: string;
};

type VibeMoodGridProps = {
  items: MoodItem[];
  className?: string;
};

export function VibeMoodGrid({ items, className }: VibeMoodGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="group relative isolate min-h-[220px] overflow-hidden rounded-[1.35rem] border border-[#0b4b55]/10 bg-white shadow-[0_16px_48px_rgba(11,75,85,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(11,75,85,0.12)] sm:min-h-[260px]"
        >
          <Image
            src={item.mobile}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03] md:hidden"
            style={{ objectPosition: item.objectPosition ?? "center" }}
          />
          <Image
            src={item.desktop}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="hidden object-cover transition duration-500 group-hover:scale-[1.03] md:block"
            style={{ objectPosition: item.objectPosition ?? "center" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#041820]/82 via-[#041820]/24 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">
              {item.label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
