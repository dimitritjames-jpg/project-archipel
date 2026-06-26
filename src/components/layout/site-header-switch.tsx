"use client";

import { usePathname } from "next/navigation";
import { AgentSiteHeader } from "@/components/agent-template/agent-site-header";
import { SiteHeader } from "@/components/layout/site-header";

const AGENT_TEMPLATE_PATHS = new Set(["/", "/search"]);

export function SiteHeaderSwitch() {
  const pathname = usePathname();
  const useAgentHeader = AGENT_TEMPLATE_PATHS.has(pathname);

  if (useAgentHeader) {
    return <AgentSiteHeader />;
  }

  return <SiteHeader />;
}
