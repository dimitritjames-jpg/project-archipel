"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "photos", label: "Photos" },
  { id: "reviews", label: "Reviews" },
  { id: "details", label: "Details" },
] as const;

export type BusinessProfileTab = (typeof TABS)[number]["id"];

type BusinessProfileTabsProps = {
  overview: React.ReactNode;
  services: React.ReactNode;
  photos: React.ReactNode;
  reviews: React.ReactNode;
  details: React.ReactNode;
};

export function BusinessProfileTabs({
  overview,
  services,
  photos,
  reviews,
  details,
}: BusinessProfileTabsProps) {
  const [active, setActive] = useState<BusinessProfileTab>("overview");

  const panels: Record<BusinessProfileTab, React.ReactNode> = {
    overview,
    services,
    photos,
    reviews,
    details,
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Business profile sections"
        className="flex gap-2 overflow-x-auto border-b border-[#0b4b55]/10 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              active === tab.id
                ? "bg-[#0b4b55] text-white"
                : "text-[#496871] hover:bg-[#e9fbf7] hover:text-[#0b4b55]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="pt-8"
      >
        {panels[active]}
      </div>
    </div>
  );
}
