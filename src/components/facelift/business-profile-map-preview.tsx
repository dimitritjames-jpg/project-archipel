"use client";

import dynamic from "next/dynamic";

const DirectoryMap = dynamic(
  () => import("@/components/map/DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => <div className="h-48 animate-pulse rounded-xl bg-[#e9fbf7]" aria-label="Loading map" />,
  },
);

export function BusinessProfileMapPreview({ directionsHref }: { directionsHref: string | null }) {
  return (
    <section aria-label="Map preview">
      <div className="overflow-hidden rounded-[1.25rem] border border-[#0b4b55]/10 bg-white shadow-[0_12px_40px_rgba(11,75,85,0.08)]">
        <DirectoryMap height={280} />
      </div>
      {directionsHref ? (
        <a
          href={directionsHref}
          rel="noopener noreferrer"
          target="_blank"
          className="mt-3 inline-flex text-sm font-semibold text-[#0797a6]"
        >
          Open in maps →
        </a>
      ) : null}
    </section>
  );
}
