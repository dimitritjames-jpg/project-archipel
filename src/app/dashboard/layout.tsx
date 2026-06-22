import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="section-shell py-20 sm:py-24"><p className="eyebrow-label mb-6">Owner studio · Preview</p>{children}</div>;
}
