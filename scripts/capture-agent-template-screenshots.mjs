import { chromium } from "playwright";

const baseUrl = process.env.SCREENSHOT_BASE_URL || "http://localhost:3004";
const outDir = "docs/agent-template-v1-screenshots";

async function capture(page, name, width, height, path, fullPage = true) {
  await page.setViewportSize({ width, height });
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: `${outDir}/${name}`,
    fullPage,
  });
  console.log(`saved ${outDir}/${name}`);
}

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();

  await capture(page, "homepage-desktop-1440.png", 1440, 900, "/");
  await capture(page, "homepage-mobile-390.png", 390, 844, "/");
  await capture(page, "search-desktop-1440.png", 1440, 900, "/search?q=beach");
  await capture(page, "search-mobile-390.png", 390, 844, "/search?q=beach");

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
