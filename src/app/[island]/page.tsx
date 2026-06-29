import { notFound, redirect } from "next/navigation";
import { getIslandBySlug } from "@/lib/islands";

type Props = {
  params: Promise<{ island: string }>;
};

export default async function LegacyIslandHubRedirect({ params }: Props) {
  const { island } = await params;
  if (!getIslandBySlug(island)) {
    notFound();
  }

  redirect(`/islands/${island}`);
}
