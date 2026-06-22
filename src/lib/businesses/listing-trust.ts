import type { PublishedBusinessRow } from "@/lib/businesses/queries";

export type ListingTrustState =
  | "demo"
  | "submitted"
  | "unverified"
  | "verified"
  | "verified_claimed";

export function getListingTrustState(business: PublishedBusinessRow): ListingTrustState {
  if (business.is_demo || business.verification_status === "demo") return "demo";

  const hasVerificationEvidence = Boolean(
    business.is_verified &&
      business.verification_status === "verified" &&
      business.verification_source?.trim() &&
      business.last_verified_at,
  );

  if (hasVerificationEvidence) {
    return business.is_claimed ? "verified_claimed" : "verified";
  }

  if (business.verification_status === "submitted") return "submitted";
  return "unverified";
}

export function isLocalBusinessSchemaEligible(business: PublishedBusinessRow): boolean {
  const state = getListingTrustState(business);
  const isVerified = state === "verified" || state === "verified_claimed";
  const hasIdentity = business.name.trim().length >= 2 && business.description_plain.trim().length >= 40;
  const hasCategory = Boolean(business.category?.schema_type && business.category?.slug);
  const hasSourcedPublicFact = Boolean(
    business.website_url?.trim() ||
      business.street_address?.trim() ||
      (business.phone?.trim() && business.contact_permission_status === "granted"),
  );

  return isVerified && hasIdentity && hasCategory && hasSourcedPublicFact;
}

export function shouldIndexListing(business: PublishedBusinessRow): boolean {
  return isLocalBusinessSchemaEligible(business) && !business.robots_noindex;
}

export function canShowDirectContact(business: PublishedBusinessRow): boolean {
  const state = getListingTrustState(business);
  return (
    (state === "verified" || state === "verified_claimed") &&
    business.contact_permission_status === "granted"
  );
}

export const LISTING_STATE_LABELS: Record<ListingTrustState, string> = {
  demo: "Fictional demo",
  submitted: "Submitted · verification pending",
  unverified: "Source review pending",
  verified: "Source verified",
  verified_claimed: "Verified & claimed",
};
