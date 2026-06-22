import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow-label">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance mt-4 text-3xl font-semibold tracking-[-0.045em] text-archipel-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-pretty mt-4 max-w-2xl text-base leading-relaxed text-archipel-white/62 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
