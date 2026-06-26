import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AgentPageSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AgentPageSection({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: AgentPageSectionProps) {
  return (
    <section className={cn("py-10 sm:py-14", className)}>
      <div className="agent-template-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vv-agent-muted)]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--vv-agent-ink)] sm:text-[1.75rem]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--vv-agent-muted)] sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
