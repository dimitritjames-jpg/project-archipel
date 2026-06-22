import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-john") return { robots: { index: false, follow: false } };

  return {
    title: "Virgin Islands National Park — St. John",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-john/virgin-islands-national-park`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VirginIslandsNationalParkPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-john") notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">
        Virgin Islands National Park
      </h1>
      <p className="mt-4 text-archipel-white/70">Pillar content — Phase 2.</p>
    </div>
  );
}
