import { NextResponse } from "next/server";

/**
 * Algolia sync is intentionally bypassed until an Algolia account is provisioned.
 * Business search uses the local Supabase server action in `src/lib/search/local-search.ts`.
 */
export async function POST() {
  return NextResponse.json({
    ok: true,
    skipped: true,
    reason: "Algolia sync disabled — local Supabase search is active.",
  });
}
