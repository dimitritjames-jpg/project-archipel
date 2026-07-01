import type { PublishedBusinessRow } from "@/lib/businesses/queries";

export type ListingPlanningTag = {
  label: string;
  description: string;
};

function textForPlanning(business: PublishedBusinessRow): string {
  return [
    business.name,
    business.description_plain,
    business.street_address,
    business.address_locality,
    business.category?.slug,
    business.category?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getListingPlanningTags(
  business: PublishedBusinessRow,
): ListingPlanningTag[] {
  if (business.is_demo) {
    return [];
  }

  const text = textForPlanning(business);
  const categorySlug = business.category?.slug ?? "";
  const tags: ListingPlanningTag[] = [];

  const ferryContext =
    /ferry|red hook|cruz bay|crown bay|water island|honeymoon|mongoose junction/.test(
      text,
    ) ||
    business.island === "STJ" ||
    business.island === "WI";

  const cruiseContext =
    /cruise|port|havensight|crown bay|charlotte amalie|frederiksted|magens|skyride|shipwreck|shopping/.test(
      text,
    ) ||
    (business.island === "STT" &&
      ["excursions-charters", "indulgent-dining", "local-provisions", "culture-history"].includes(
        categorySlug,
      ));

  if (cruiseContext) {
    tags.push({
      label: "Useful for cruise-day planning",
      description:
        "Check pickup point, hours, duration, return transport, and ship timing directly.",
    });
  }

  if (ferryContext) {
    tags.push({
      label: "Good ferry-hop candidate",
      description:
        "Keep the outbound and return crossing in view, then confirm timing directly.",
    });
  }

  if (
    tags.length > 0 ||
    ["excursions-charters", "indulgent-dining", "nightlife-rhythm"].includes(
      categorySlug,
    )
  ) {
    tags.push({
      label: "Confirm timing directly",
      description:
        "Hours, prices, pickup, safety details, booking, and return timing stay with the source or business.",
    });
  }

  return tags.slice(0, 3);
}
