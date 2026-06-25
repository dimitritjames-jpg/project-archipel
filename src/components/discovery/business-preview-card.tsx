import { ListingCard } from "@/components/facelift/listing-card";
import type { PublishedBusinessRow } from "@/lib/businesses/queries";

type BusinessPreviewCardProps = {
  business: PublishedBusinessRow;
  islandSlug: string;
  launchPreview?: boolean;
  className?: string;
};

/** Bright facelift listing card — preserves BusinessPreviewCard API. */
export function BusinessPreviewCard({
  business,
  islandSlug,
  className,
}: BusinessPreviewCardProps) {
  return <ListingCard business={business} islandSlug={islandSlug} className={className} />;
}
