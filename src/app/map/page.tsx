import type { Metadata } from "next";
import { MapRouteBoard } from "@/components/facelift/map-route-board";

export const metadata: Metadata = {
  title: "Island Map",
  description: "See VibeVI places across the U.S. Virgin Islands and follow the water, road, or ferry to the next move.",
  robots: { index: false, follow: true },
};

export default function MapPage() {
  return <MapRouteBoard />;
}
