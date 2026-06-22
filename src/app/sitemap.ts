import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { ISLAND_SLUGS } from "@/lib/islands";
import { CORE_CATEGORIES } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/get-listed`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  for (const island of ISLAND_SLUGS) {
    entries.push({
      url: `${siteUrl}/${island}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    });

    for (const category of CORE_CATEGORIES) {
      entries.push({
        url: `${siteUrl}/${island}/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    if (island === "st-thomas" || island === "st-john" || island === "water-island") {
      entries.push({
        url: `${siteUrl}/${island}/ferry-schedule`,
        lastModified: now,
        changeFrequency: "hourly",
        priority: 0.85,
      });
    }

    if (island === "st-thomas" || island === "st-croix") {
      entries.push({
        url: `${siteUrl}/${island}/cruise-schedule`,
        lastModified: now,
        changeFrequency: "hourly",
        priority: 0.85,
      });
    }
  }

  const ferryRoutes = [
    "red-hook-to-cruz-bay",
    "cruz-bay-to-red-hook",
    "crown-bay-to-water-island",
    "water-island-to-crown-bay",
  ];
  for (const slug of ferryRoutes) {
    entries.push({
      url: `${siteUrl}/ferry/${slug}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    });
  }

  const pillars = [
    "/st-thomas/magens-bay",
    "/st-thomas/snorkeling-charters",
    "/st-croix/buck-island",
    "/st-croix/snorkeling-charters",
    "/st-john/virgin-islands-national-park",
    "/st-john/snorkeling-charters",
    "/st-thomas/things-to-do",
    "/st-croix/things-to-do",
    "/st-john/things-to-do",
    "/st-john/beaches",
    "/st-john/best-snorkeling",
    "/st-thomas/cruise-day",
    "/water-island/day-trip",
    "/guides/usvi-charters",
    "/guides/best-beaches-usvi",
  ];
  for (const path of pillars) {
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}

export const revalidate = 3600;
