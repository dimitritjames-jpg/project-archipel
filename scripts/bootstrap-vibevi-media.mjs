/**
 * Interim media bootstrap until vibevi_media_package_v1.zip is installed manually.
 * Copies existing generated editorial JPGs into the expected /public/media/vibevi/ tree.
 * Replace with the official WebP package from Google Drive when available.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const generated = path.join(root, "public/media/generated");
const vibevi = path.join(root, "public/media/vibevi");

const sources = {
  hero: "vibevi-ai-hero-island-sunrise.jpg",
  beach: "vibevi-ai-beach-day.jpg",
  boat: "vibevi-ai-boat-day.jpg",
  bite: "vibevi-ai-bite-waterfront.jpg",
  night: "vibevi-ai-night-boardwalk.jpg",
  culture: "vibevi-ai-culture-street.jpg",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyPair(destDir, baseName, sourceKey) {
  const src = path.join(generated, sources[sourceKey]);
  if (!fs.existsSync(src)) {
    console.warn(`Missing source ${src}`);
    return;
  }
  ensureDir(destDir);
  for (const suffix of ["desktop", "mobile"]) {
    const dest = path.join(destDir, `${baseName}-${suffix}.jpg`);
    fs.copyFileSync(src, dest);
  }
}

function copySingle(destPath, sourceKey) {
  const src = path.join(generated, sources[sourceKey]);
  if (!fs.existsSync(src)) return;
  ensureDir(path.dirname(destPath));
  fs.copyFileSync(src, destPath);
}

ensureDir(vibevi);

copyPair(path.join(vibevi, "home"), "home-hero", "hero");
for (const [name, key] of [
  ["beach", "beach"],
  ["boat", "boat"],
  ["bite", "bite"],
  ["night", "night"],
]) {
  copyPair(path.join(vibevi, "home/cards"), name, key);
}

for (const [name, key] of [
  ["adventure", "boat"],
  ["relax", "beach"],
  ["romance", "bite"],
  ["culture", "culture"],
  ["foodie", "bite"],
  ["party", "night"],
  ["family", "beach"],
  ["wellness", "beach"],
]) {
  copyPair(path.join(vibevi, "home/moods"), name, key);
}

for (const [island, key] of [
  ["st-thomas", "boat"],
  ["st-john", "beach"],
  ["st-croix", "culture"],
  ["water-island", "beach"],
]) {
  copyPair(path.join(vibevi, "islands"), island, key);
}

for (const [slug, key] of [
  ["adventure", "boat"],
  ["culture", "culture"],
  ["culinary", "bite"],
  ["cruise-day", "hero"],
  ["nightlife", "night"],
  ["wellness", "beach"],
  ["stays", "hero"],
  ["local-shops", "culture"],
]) {
  copyPair(path.join(vibevi, "experiences"), slug, key);
}

copyPair(path.join(vibevi, "search"), "search-hero", "hero");
copyPair(path.join(vibevi, "get-listed"), "get-listed-hero", "culture");

for (const cat of [
  "beaches",
  "boat-charters",
  "dining",
  "nightlife",
  "stays",
  "wellness",
  "shops",
  "culture",
  "adventure",
  "cruise-day",
  "ferry",
  "local-provisions",
]) {
  const key =
    cat.includes("boat") || cat === "adventure" || cat === "ferry"
      ? "boat"
      : cat.includes("dining") || cat === "culinary"
        ? "bite"
        : cat.includes("night")
          ? "night"
          : cat.includes("culture") || cat === "shops" || cat === "local-provisions"
            ? "culture"
            : cat.includes("beach") || cat.includes("wellness") || cat === "stays"
              ? "beach"
              : "hero";
  copySingle(
    path.join(vibevi, "listings/placeholders", `${cat}-card.jpg`),
    key,
  );
}

console.log("VibeVI interim media bootstrap complete.");
