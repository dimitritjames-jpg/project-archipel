export const ANALYTICS_EVENTS = [
  "search_submitted",
  "category_clicked",
  "island_selected",
  "business_profile_viewed",
  "get_listed_cta_clicked",
  "sponsor_cta_clicked",
  "ferry_page_viewed",
  "cruise_page_viewed",
  "experience_pillar_viewed",
  "experience_cta_clicked",
  "request_availability_clicked",
  "plan_experience_clicked",
  "culinary_page_viewed",
  "adventure_page_viewed",
  "culture_page_viewed",
  "cruise_day_page_viewed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];
export type AnalyticsProperties = Record<string, string | number | boolean | null>;

/**
 * Privacy-first event boundary. It performs no network request, sets no cookie,
 * and stores nothing. A production analytics adapter may listen for this event
 * after consent/configuration is approved.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("vibevi:analytics", {
      detail: { name, properties },
    }),
  );
}
