import type { Metadata } from "next";
import { CruisePortGuidePage } from "@/components/transit/CruisePortGuidePage";
import {
  cruisePortGuideMetadata,
  ST_THOMAS_CRUISE_PORT_GUIDES,
} from "@/lib/transit/cruise-port-guides";

const guide = ST_THOMAS_CRUISE_PORT_GUIDES.havensight;

export const metadata: Metadata = cruisePortGuideMetadata(guide);

export default function HavensightCruiseDayPage() {
  return <CruisePortGuidePage guide={guide} />;
}
