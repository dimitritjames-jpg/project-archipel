import Image from "next/image";
import Link from "next/link";
import { TrustBadge } from "@/components/facelift/trust-badge";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import {
  getListingTrustState,
  isLocalBusinessSchemaEligible,
  LISTING_STATE_LABELS,
} from "@/lib/businesses/listing-trust";
import { getListingPlanningTags } from "@/lib/businesses/planning-tags";
import { getListingPlaceholder } from "@/lib/vibevi-media";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { cn } from "@/lib/utils";

type ListingCardProps = {
  business: PublishedBusinessRow;
  islandSlug: string;
  className?: string;
};

function trustTone(state: ReturnType<typeof getListingTrustState>) {
  if (state === "verified" || state === "verified_claimed") return "verified" as const;
  if (state === "public_info") return "public-info" as const;
  if (state === "demo") return "preview" as const;
  return "neutral" as const;
}

export function ListingCard({ business, islandSlug, className }: ListingCardProps) {
  const categorySlug = business.category?.slug ?? "directory";
  const trustState = getListingTrustState(business);
  const isPublicInfo = trustState === "public_info";
  const schemaEligible = isLocalBusinessSchemaEligible(business);
  const href = `/${islandSlug}/${categorySlug}/${business.slug}`;
  const imageSrc = getListingPlaceholder(categorySlug);
  const planningTags = getListingPlanningTags(business);

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[1.25rem] border border-[#0b4b55]/10 bg-white shadow-[0_12px_40px_rgba(11,75,85,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(11,75,85,0.12)]",
        className,
      )}
    >
      <div className="relative h-44 sm:h-48">
        <Image
          src={imageSrc}
          alt={`Editorial category placeholder for ${business.name}; not a photo of this business`}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041820]/55 to-transparent" aria-hidden />
        <div className="absolute inset-x-3 top-3 z-10 flex flex-wrap gap-1.5">
          <TrustBadge label={LISTING_STATE_LABELS[trustState]} tone={trustTone(trustState)} />
          {isPublicInfo ? <TrustBadge label="Unclaimed" tone="public-info" /> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0797a6]">
          {business.category?.name ?? "Directory"} · {getIslandName(islandSlug as IslandSlug)}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#173941] group-hover:text-[#0b4b55]">
          {business.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#496871]">
          {business.description_plain}
        </p>
        {planningTags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {planningTags.slice(0, 2).map((tag) => (
              <span
                key={tag.label}
                className="rounded-full border border-[#0797a6]/15 bg-[#e9fbf7] px-2.5 py-0.5 text-[10px] font-semibold text-[#0b4b55]"
              >
                {tag.label}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-4 border-t border-[#0b4b55]/8 pt-3 text-xs font-semibold text-[#0797a6]">
          {trustState === "demo" ? "View demo profile" : "Open profile"} →
          {schemaEligible && business.price_range ? (
            <span className="float-right font-normal text-[#496871]">{business.price_range}</span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
