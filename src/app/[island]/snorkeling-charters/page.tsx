import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  const titles: Record<string, string> = {
    "st-thomas": "Snorkeling & Charters — St. Thomas",
    "st-croix": "Snorkeling & Charters — St. Croix",
    "st-john": "Snorkeling & Charters — St. John",
  };
  if (!titles[island]) return { robots: { index: false, follow: false } };

  return {
    title: titles[island],
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/${island}/snorkeling-charters` },
    robots: { index: true, follow: true },
  };
}

export default async function SnorkelingChartersPage({ params }: Props) {
  const { island } = await params;
  if (!["st-thomas", "st-croix", "st-john"].includes(island)) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">
        Snorkeling & Charter Tours
      </h1>
      <p className="mt-4 text-archipel-white/70">Pillar content — Phase 2.</p>
    </div>
  );
}
