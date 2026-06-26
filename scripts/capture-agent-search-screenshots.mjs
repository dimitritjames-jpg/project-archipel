import { chromium } from "playwright";

const baseUrl = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";
const outDir = "docs/agent-search-screenshots";

async function capture(page, name, width, height, path, fullPage = true) {
  await page.setViewportSize({ width, height });
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${name}`, fullPage });
  console.log(`saved ${outDir}/${name}`);
}

async function main() {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();

  await capture(page, "home-desktop.png", 1440, 900, "/");
  await capture(page, "home-mobile.png", 390, 844, "/");
  await capture(page, "search-desktop.png", 1440, 900, "/search?q=beach%20day");
  await capture(page, "search-mobile.png", 390, 844, "/search?q=beach%20day");

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
