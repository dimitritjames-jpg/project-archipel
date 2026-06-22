import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-croix") return { robots: { index: false, follow: false } };

  return {
    title: "Buck Island — St. Croix",
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-croix/buck-island` },
    robots: { index: true, follow: true },
  };
}

export default async function BuckIslandPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-croix") notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">Buck Island</h1>
      <p className="mt-4 text-archipel-white/70">Pillar content — Phase 2.</p>
    </div>
  );
}
