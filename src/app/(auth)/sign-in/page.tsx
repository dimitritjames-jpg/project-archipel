import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In", robots: { index: false, follow: false } };

export default function SignInPage() {
  return <div className="mx-auto max-w-xl px-4 py-24"><div className="command-surface rounded-[2rem] p-8 sm:p-10"><p className="eyebrow-label">Owner access · Preview</p><h1 className="display-type mt-4 text-4xl font-semibold text-white">Sign in</h1><p className="mt-5 text-sm leading-7 text-white/60">Account access is not enabled in this preview. The Supabase authentication flow will appear here only after ownership verification is connected.</p></div></div>;
}
