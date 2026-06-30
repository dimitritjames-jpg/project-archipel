import { buildMobileCatalogFeed } from "@/lib/mobile/catalog";

export const revalidate = 3600;

const MOBILE_FEED_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: MOBILE_FEED_HEADERS,
  });
}

export async function GET() {
  const feed = buildMobileCatalogFeed();

  return Response.json(feed, {
    headers: MOBILE_FEED_HEADERS,
  });
}
