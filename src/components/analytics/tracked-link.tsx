"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics/events";

type EventProps = {
  eventName: AnalyticsEventName;
  eventProperties?: AnalyticsProperties;
};

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  EventProps & { children: ReactNode };

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  EventProps & { href: string; children: ReactNode };

export function TrackedAnchor({
  eventName,
  eventProperties,
  onClick,
  children,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
