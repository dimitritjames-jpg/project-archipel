import Link from "next/link";

import type { IslandPlanningChooser } from "@/lib/search/island-planning";

export function IntentIslandChooser({
  chooser,
}: {
  chooser: IslandPlanningChooser;
}) {
  return (
    <section
      className="rounded-[1.5rem] border border-white/12 bg-[#072936]/72 p-5 shadow-[0_22px_80px_rgba(4,24,32,0.22)] backdrop-blur-md sm:p-6"
      aria-labelledby="intent-island-chooser-heading"
      data-search-intent={chooser.intent}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-aqua/20 bg-aqua/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-aqua">
          Choose your island
        </span>
        <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/66">
          {chooser.intent.replace("-", " ")}
        </span>
      </div>
      <h2
        id="intent-island-chooser-heading"
        className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl"
      >
        {chooser.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64 sm:text-base">
        {chooser.description}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {chooser.choices.map((choice) => (
          <Link
            key={choice.islandSlug}
            href={choice.href}
            className={`group rounded-[1.25rem] border p-4 transition hover:-translate-y-0.5 ${
              choice.current
                ? "border-sand/45 bg-sand/10"
                : "border-white/10 bg-white/[0.04] hover:border-aqua/28 hover:bg-aqua/[0.08]"
            }`}
            data-island-choice={choice.islandSlug}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                {choice.islandName}
              </h3>
              {choice.current ? (
                <span className="rounded-full border border-sand/35 bg-sand/14 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sand">
                  Current
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm font-semibold text-aqua/90">
              {choice.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/58">{choice.note}</p>
            {choice.limited ? (
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-sand/86">
                Limited public-info depth
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
