"use client";

import { useEffect } from "react";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics/events";

export function AnalyticsEvent({
  name,
  properties,
}: {
  name: AnalyticsEventName;
  properties?: AnalyticsProperties;
}) {
  useEffect(() => {
    trackEvent(name, properties);
  }, [name, properties]);

  return null;
}
