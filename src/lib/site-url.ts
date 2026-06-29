const PRODUCTION_SITE_URL = "https://www.myvibevi.com";
const DEVELOPMENT_SITE_URL = "http://localhost:3000";

function isLocalhostUrl(value: string): boolean {
  return /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(value);
}

export function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getCanonicalSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isVercel = Boolean(process.env.VERCEL);

  if (isVercel) {
    if (!configured || isLocalhostUrl(configured)) {
      return PRODUCTION_SITE_URL;
    }

    return normalizeSiteUrl(configured);
  }

  if (!configured) {
    return process.env.NODE_ENV === "development"
      ? DEVELOPMENT_SITE_URL
      : PRODUCTION_SITE_URL;
  }

  return normalizeSiteUrl(configured);
}

export function absoluteUrl(path = "/"): string {
  const base = getCanonicalSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return normalizedPath === "/" ? base : `${base}${normalizedPath}`;
}
