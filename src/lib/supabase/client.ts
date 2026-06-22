import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost:54321",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "anon-key-placeholder",
  );
}
