/**
 * Capture facelift QA screenshots against local dev server.
 * Usage: node scripts/capture-facelift-screenshots.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://localhost:3456";
const outDir = path.join(process.cwd(), "docs", "facelift-screenshots");

const captures = [
  { name: "homepage-1440", path: "/", width: 1440, height: 900 },
  { name: "homepage-375", path: "/", width: 375, height: 812 },
  { name: "search-1440", path: "/search", width: 1440, height: 900 },
  { name: "search-375", path: "/search", width: 375, height: 812 },
  { name: "island-st-thomas-1440", path: "/st-thomas", width: 1440, height: 900 },
  { name: "island-st-thomas-375", path: "/st-thomas", width: 375, height: 812 },
  { name: "experience-adventure-1440", path: "/experiences/adventure", width: 1440, height: 900 },
  { name: "experience-adventure-375", path: "/experiences/adventure", width: 375, height: 812 },
  { name: "category-nightlife-1440", path: "/st-thomas/nightlife-rhythm", width: 1440, height: 900 },
  { name: "business-profile-1440", path: "/st-john/indulgent-dining/lime-out-vi", width: 1440, height: 900 },
  { name: "map-1440", path: "/map", width: 1440, height: 900 },
  { name: "get-listed-1440", path: "/get-listed", width: 1440, height: 900 },
  { name: "get-listed-375", path: "/get-listed", width: 375, height: 812 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
for (const shot of captures) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(`${baseUrl}${shot.path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(1200);
  const file = path.join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`saved ${file}`);
  await page.close();
}
await browser.close();
