import Image from "next/image";
import Link from "next/link";
import type { CardMedia } from "@/lib/vibevi-media";
import { cn } from "@/lib/utils";

type CategoryIconRailProps = {
  items: CardMedia[];
  className?: string;
};

export function CategoryIconRail({ items, className }: CategoryIconRailProps) {
  return (
    <nav
      aria-label="Explore by category"
      className={cn(
        "flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group flex w-[5.5rem] shrink-0 flex-col items-center gap-2 sm:w-[6.25rem]"
        >
          <span className="relative block h-16 w-16 overflow-hidden rounded-2xl border border-[#0b4b55]/10 bg-white shadow-[0_8px_24px_rgba(11,75,85,0.08)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_32px_rgba(11,75,85,0.12)] sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-[1.15rem]">
            <Image
              src={item.mobile}
              alt=""
              fill
              sizes="72px"
              className="object-cover"
              style={{ objectPosition: item.objectPosition ?? "center" }}
            />
          </span>
          <span className="text-center text-[11px] font-semibold leading-tight text-[#315057] group-hover:text-[#0b4b55] sm:text-xs">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
