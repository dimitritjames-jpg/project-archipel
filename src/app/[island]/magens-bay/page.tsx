import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

type Props = { params: Promise<{ island: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { island } = await params;
  if (island !== "st-thomas") return { robots: { index: false, follow: false } };

  return {
    title: "Magens Bay — St. Thomas",
    description:
      "Plan your visit to Magens Bay — beaches, dining, and tours on St. Thomas.",
    alternates: { canonical: `${env.NEXT_PUBLIC_SITE_URL}/st-thomas/magens-bay` },
    robots: { index: true, follow: true },
  };
}

export default async function MagensBayPage({ params }: Props) {
  const { island } = await params;
  if (island !== "st-thomas") notFound();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-archipel-white">Magens Bay</h1>
      <p className="mt-4 text-archipel-white/70">
        Editorial MDX and dynamic recommendation slots — Phase 2.
      </p>
    </div>
  );
}
