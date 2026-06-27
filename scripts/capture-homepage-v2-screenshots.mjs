import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = process.argv[2] ?? "http://localhost:3470";
const outDir = resolve(process.cwd(), "docs/homepage-render-v2-screenshots");
mkdirSync(outDir, { recursive: true });

const shots = [
  { name: "homepage-v2-1440", width: 1440, height: 900 },
  { name: "homepage-v2-375", width: 375, height: 812 },
];

const browser = await chromium.launch({ channel: "msedge" });
for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: resolve(outDir, `${shot.name}.png`), fullPage: shot.width === 375 });
  console.log("saved", shot.name);
}
await browser.close();
