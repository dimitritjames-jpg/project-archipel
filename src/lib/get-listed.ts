export const GET_LISTED_INTENTS = [
  "confirm-my-listing",
  "correct-my-info",
  "send-approved-photos",
  "claim-interest",
  "featured-placement",
  "add-my-business",
  "sponsor-interest",
  "public-info-confirmation",
] as const;

export type GetListedIntent = (typeof GET_LISTED_INTENTS)[number];

type GetListedHrefOptions = {
  intent?: GetListedIntent;
  businessName?: string | null;
  islandSlug?: string | null;
  categorySlug?: string | null;
};

export function isGetListedIntent(value: string | undefined): value is GetListedIntent {
  return Boolean(value && GET_LISTED_INTENTS.includes(value as GetListedIntent));
}

export function buildGetListedHref({
  intent,
  businessName,
  islandSlug,
  categorySlug,
}: GetListedHrefOptions = {}) {
  const params = new URLSearchParams();

  if (intent) params.set("intent", intent);
  if (businessName) params.set("business", businessName);
  if (islandSlug) params.set("island", islandSlug);
  if (categorySlug) params.set("category", categorySlug);

  const query = params.toString();
  return query ? `/get-listed?${query}` : "/get-listed";
}
