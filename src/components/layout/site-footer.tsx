import { SITE_TIMEZONE } from "@/lib/env";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-indigo-950/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <p className="text-sm text-archipel-white/60">
          Scheduled ship capacity is a planning estimate, not an actual passenger
          count. All ferry and cruise times use {SITE_TIMEZONE}.
        </p>
        <p className="mt-2 text-xs text-archipel-white/40">
          © {new Date().getFullYear()} Project Archipel
        </p>
      </div>
    </footer>
  );
}
