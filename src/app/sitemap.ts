import type { MetadataRoute } from "next";
import { absoluteUrl, getCanonicalSiteUrl } from "@/lib/site-url";
import { CODE_TO_SLUG, ISLAND_SLUGS } from "@/lib/islands";
import { getPublicInfoCategoryCountByIsland, shouldIndexCategoryPage } from "@/lib/category-indexing";
import { CORE_CATEGORIES } from "@/lib/categories";
import { PUBLIC_EXPERIENCE_PILLAR_SLUGS } from "@/lib/experience-pillars";
import { PUBLIC_INFO_BUSINESSES } from "@/lib/businesses/public-info-catalog";
import { PUBLIC_FERRY_GUIDE_SLUGS } from "@/lib/transit/ferry-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getCanonicalSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/get-listed"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/ferry"), lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: absoluteUrl("/cruise-day"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  for (const island of ISLAND_SLUGS) {
    entries.push({
      url: absoluteUrl(`/islands/${island}`),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    });

    for (const category of CORE_CATEGORIES) {
      if (category.slug === "culture-history") {
        const listingCount = getPublicInfoCategoryCountByIsland(island, category.slug);
        if (!shouldIndexCategoryPage(category.slug, listingCount)) {
          continue;
        }
      }

      entries.push({
        url: absoluteUrl(`/${island}/${category.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    if (island === "st-thomas" || island === "st-john" || island === "water-island") {
      entries.push({
        url: absoluteUrl(`/${island}/ferry-schedule`),
        lastModified: now,
        changeFrequency: "hourly",
        priority: 0.85,
      });
    }

    if (island === "st-thomas" || island === "st-croix") {
      entries.push({
        url: absoluteUrl(`/${island}/cruise-schedule`),
        lastModified: now,
        changeFrequency: "hourly",
        priority: 0.85,
      });
    }
  }

  for (const slug of PUBLIC_EXPERIENCE_PILLAR_SLUGS) {
    entries.push({
      url: absoluteUrl(`/experiences/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const business of PUBLIC_INFO_BUSINESSES) {
    if (!business.public_info_listing || business.robots_noindex) continue;
    const islandSlug = CODE_TO_SLUG[business.island];
    const categorySlug = business.category?.slug;
    if (!categorySlug) continue;

    entries.push({
      url: absoluteUrl(`/${islandSlug}/${categorySlug}/${business.slug}`),
      lastModified: business.last_verified_at
        ? new Date(business.last_verified_at)
        : now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const slug of PUBLIC_FERRY_GUIDE_SLUGS) {
    entries.push({
      url: absoluteUrl(`/ferry/${slug}`),
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
    "/water-island/things-to-do",
    "/st-john/beaches",
    "/st-john/best-snorkeling",
    "/st-thomas/cruise-day",
    "/st-thomas/havensight-cruise-day",
    "/st-thomas/crown-bay-cruise-day",
    "/water-island/day-trip",
    "/guides/usvi-charters",
    "/guides/best-beaches-usvi",
  ];
  for (const path of pillars) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}

export const revalidate = 3600;
