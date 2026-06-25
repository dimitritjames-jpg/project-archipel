"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function RouteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepageRender = pathname === "/";

  if (isHomepageRender) {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
