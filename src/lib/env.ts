import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1).optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1).optional(),
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().optional(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string().optional(),
  ALGOLIA_APP_ID: z.string().optional(),
  ALGOLIA_ADMIN_KEY: z.string().min(1).optional(),
  SEARCH_SYNC_WEBHOOK_SECRET: z.string().min(1).optional(),
  NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL: z.string().email().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_ADMIN_KEY: process.env.ALGOLIA_ADMIN_KEY,
  SEARCH_SYNC_WEBHOOK_SECRET: process.env.SEARCH_SYNC_WEBHOOK_SECRET,
  NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL:
    process.env.NEXT_PUBLIC_BUSINESS_INQUIRY_EMAIL,
});

export const SITE_TIMEZONE = "America/St_Thomas" as const;

export function getMapboxAccessToken(): string {
  const token = (
    env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ""
  ).trim();

  if (
    !token ||
    /^(your[-_ ]|replace[-_ ]|placeholder|changeme)/i.test(token)
  ) {
    return "";
  }

  return token;
}
