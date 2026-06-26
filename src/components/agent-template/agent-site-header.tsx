"use client";

import Link from "next/link";
import { useState } from "react";
import { ArchipelMark } from "@/components/ui/archipel-mark";
import { AGENT_NAV } from "@/lib/agent-template/content";
import { cn } from "@/lib/utils";

type NavGroup = {
  label: string;
  links: readonly { href: string; label: string }[];
};

const NAV_GROUPS: NavGroup[] = [
  { label: "Explore", links: AGENT_NAV.explore },
  { label: "Islands", links: AGENT_NAV.islands },
  { label: "Experiences", links: AGENT_NAV.experiences },
  { label: "Plan", links: AGENT_NAV.plan },
  { label: "Ferry & Cruise", links: AGENT_NAV.ferryCruise },
];

function NavDropdown({ group }: { group: NavGroup }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[var(--vv-agent-ink)] transition hover:bg-[var(--vv-agent-sand)]"
        aria-haspopup="true"
      >
        {group.label}
        <svg aria-hidden className="h-4 w-4 text-[var(--vv-agent-muted)]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="invisible absolute left-0 top-[calc(100%+0.35rem)] z-50 min-w-[220px] rounded-[var(--vv-agent-radius-control)] border border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] p-2 opacity-0 shadow-[var(--vv-agent-shadow-card)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="space-y-1">
          {group.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-[10px] px-3 py-2 text-sm text-[var(--vv-agent-ink)] transition hover:bg-[var(--vv-agent-aqua-soft)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AgentSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)]/95 shadow-[0_8px_30px_rgba(11,31,46,0.06)] backdrop-blur-md">
      <div className="agent-template-shell flex h-[var(--vv-agent-header-height)] items-center justify-between gap-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--vv-agent-line)] text-[var(--vv-agent-ink)] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="agent-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            ) : (
              <>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <Link
          href="/"
          className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-3 text-base font-semibold tracking-[-0.03em] text-[var(--vv-agent-ink)] lg:static lg:translate-x-0"
          aria-label="VibeVI home"
        >
          <ArchipelMark className="transition duration-300 group-hover:rotate-12 group-hover:border-[var(--vv-agent-teal)]/70" />
          <span className="hidden sm:flex sm:flex-col sm:leading-none">
            <span>
              Vibe<span className="text-[var(--vv-agent-teal)]">VI</span>
            </span>
            <span className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--vv-agent-muted)]">
              Find Your Island Vibe
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/get-listed"
            className={cn(
              "hidden min-h-10 items-center rounded-full border border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] px-4 text-sm font-semibold text-[var(--vv-agent-ink)] sm:inline-flex",
              "transition hover:border-[var(--vv-agent-teal)] hover:text-[var(--vv-agent-teal)]",
            )}
          >
            Get Listed
          </Link>
          <Link
            href="/search"
            className="inline-flex min-h-10 items-center rounded-full bg-[var(--vv-agent-teal)] px-4 text-sm font-bold text-white transition hover:bg-[var(--vv-agent-teal-hover)] lg:hidden"
          >
            Search
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="agent-mobile-menu"
          aria-label="Mobile"
          className="border-t border-[var(--vv-agent-line)] bg-[var(--vv-agent-surface)] px-[var(--vv-agent-mobile-gutter)] py-4 lg:hidden"
        >
          <div className="space-y-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vv-agent-muted)]">
                  {group.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-[10px] px-3 py-2 text-sm font-medium text-[var(--vv-agent-ink)] hover:bg-[var(--vv-agent-aqua-soft)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/get-listed"
              className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[var(--vv-agent-line)] px-4 text-sm font-semibold text-[var(--vv-agent-ink)]"
              onClick={() => setMenuOpen(false)}
            >
              Get Listed
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
