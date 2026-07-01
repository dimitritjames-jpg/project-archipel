import Link from "next/link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { MediaBackdrop } from "@/components/ui/media-backdrop";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";
import {
  getListingTrustState,
  isLocalBusinessSchemaEligible,
  LISTING_STATE_LABELS,
} from "@/lib/businesses/listing-trust";
import { getListingPlanningTags } from "@/lib/businesses/planning-tags";
import { buildGetListedHref } from "@/lib/get-listed";
import { getIslandName, type IslandSlug } from "@/lib/islands";
import { getCategoryMediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type BusinessPreviewCardProps = {
  business: PublishedBusinessRow;
  islandSlug: string;
  launchPreview?: boolean;
  className?: string;
};

export function BusinessPreviewCard({
  business,
  islandSlug,
  launchPreview = false,
  className,
}: BusinessPreviewCardProps) {
  const categorySlug = business.category?.slug ?? "directory";
  const trustState = getListingTrustState(business);
  const isPublicInfo = trustState === "public_info";
  const schemaEligible = isLocalBusinessSchemaEligible(business);
  const href = `/${islandSlug}/${categorySlug}/${business.slug}`;
  const media = getCategoryMediaAsset(
    categorySlug,
    business.category?.name ?? "Island listing",
  );
  const planningTags = getListingPlanningTags(business);

  return (
    <article
      className={cn(
        "group command-surface island-card-glow overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1.5 hover:border-aqua/25 hover:shadow-glow-aqua",
        className,
      )}
    >
      <Link href={href} className="block">
        <div className="relative h-44 sm:h-52">
          <MediaBackdrop
            media={{
              ...media,
              id: business.slug,
              label: business.name,
              alt: `${media.alt}; category artwork for ${business.name}`,
            }}
            overlay="subtle"
            className="h-full w-full"
          />
          <div className="absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <ComingSoonBadge label={LISTING_STATE_LABELS[trustState]} />
              {launchPreview && trustState !== "demo" ? (
                <ComingSoonBadge label="Launch set" />
              ) : null}
              {isPublicInfo ? (
                <span className="rounded-full border border-aqua/25 bg-aqua/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-aqua">
                  Unclaimed
                </span>
              ) : null}
              {trustState === "verified" || trustState === "verified_claimed" ? (
                <span className="rounded-full border border-lime/30 bg-lime/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lime">
                  Verified local
                </span>
              ) : null}
              {business.premium_tier !== "none" &&
              (trustState === "verified" || trustState === "verified_claimed") ? (
                <span className="rounded-full border border-sand/20 bg-sand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sand">
                  Featured
                </span>
              ) : null}
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-midnight-950/40 text-xs text-aqua backdrop-blur-md transition group-hover:rotate-45">
              &rarr;
            </span>
          </div>
        </div>
        <div className="border-t border-white/8 bg-midnight-950/35 p-5 backdrop-blur-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-aqua/58">
            {business.category?.name ?? "Directory"} /{" "}
            {getIslandName(islandSlug as IslandSlug)}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-archipel-white transition group-hover:text-aqua">
            {business.name}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-archipel-white/55">
            {business.description_plain}
          </p>
          {planningTags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {planningTags.slice(0, 2).map((tag) => (
                <span
                  key={tag.label}
                  className="rounded-full border border-aqua/16 bg-aqua/7 px-2.5 py-1 text-[10px] font-semibold text-aqua/80"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
            <span className="text-[11px] font-semibold text-aqua/75">
              {trustState === "demo"
                ? "View demo profile"
                : isPublicInfo
                  ? "View public-info profile"
                  : "Open profile"}
            </span>
            {schemaEligible && business.price_range ? (
              <span className="text-xs text-archipel-white/38">
                {business.price_range}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      {isPublicInfo ? (
        <div className="border-t border-white/7 bg-midnight-950/55 px-5 py-3">
          <TrackedLink
            href={buildGetListedHref({
              intent: "correct-my-info",
              businessName: business.name,
              islandSlug,
              categorySlug,
            })}
            eventName="get_listed_cta_clicked"
            eventProperties={{
              placement: "business_preview_card",
              listing_state: trustState,
              intent: "correct-my-info",
            }}
            className="text-[11px] font-semibold text-coral-sunset transition hover:text-aqua"
          >
            Own or manage this business? Update this listing.
          </TrackedLink>
        </div>
      ) : null}
    </article>
  );
}
