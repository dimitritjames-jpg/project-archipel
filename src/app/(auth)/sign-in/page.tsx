import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-archipel-white">Sign in</h1>
      <p className="mt-4 text-archipel-white/70">Supabase Auth — Phase 2.</p>
    </div>
  );
}
