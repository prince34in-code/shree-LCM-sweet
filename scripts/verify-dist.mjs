import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SWEET_PRODUCTS } from "../src/products.js";
import { SITE_CONFIG } from "../src/site-config.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const distAssetsDirectory = path.join(distDirectory, "assets");
const html = await readFile(path.join(distDirectory, "index.html"), "utf8");
const sourceHtml = await readFile(path.join(projectRoot, "index.html"), "utf8");
const assetFiles = await readdir(distAssetsDirectory);

assert.doesNotMatch(html, /(?:src|href)=["']\/src\//i, "Production HTML must not reference source files.");
assert.doesNotMatch(html, /(?:from\s*|import\()\s*["'](?:swiper|lucide)(?:\/[^"']*)?["']/i, "Production HTML must not contain bare package imports.");
assert.match(html, /\/assets\/index-[\w-]+\.js/, "Production HTML must reference a bundled JavaScript file.");
assert.match(html, /\/assets\/index-[\w-]+\.css/, "Production HTML must reference a bundled CSS file.");
assert(assetFiles.some((fileName) => /^index-[\w-]+\.js$/.test(fileName)), "The JavaScript bundle is missing from dist/assets.");
assert(assetFiles.some((fileName) => /^index-[\w-]+\.css$/.test(fileName)), "The CSS bundle is missing from dist/assets.");

const cname = (await readFile(path.join(distDirectory, "CNAME"), "utf8")).trim();
assert.equal(cname, "shreelcmsweets.com", "The custom domain must be present in dist/CNAME.");

const whatsappMessageKeys = [...sourceHtml.matchAll(/data-whatsapp-message="([^"]+)"/g)].map((match) => match[1]);
assert(whatsappMessageKeys.length > 0, "No configurable WhatsApp message links were found in index.html.");
for (const messageKey of whatsappMessageKeys) {
  assert.equal(typeof SITE_CONFIG.whatsappMessages[messageKey], "string", `Missing WhatsApp message template: ${messageKey}`);
}

const requiredAssetDirectories = ["hero", "logo", "shop", "sweets"];
for (const directoryName of requiredAssetDirectories) {
  const directoryPath = path.join(distAssetsDirectory, directoryName);
  const entries = await readdir(directoryPath);
  assert(entries.length > 0, `The required asset directory dist/assets/${directoryName} is empty or missing.`);
}

const localImagePaths = new Set();
for (const match of html.matchAll(/(?:src|href)=["'](?:https?:\/\/[^/]+)?\/assets\/([^"']+)["']/g)) {
  localImagePaths.add(decodeURIComponent(match[1]));
}
for (const product of SWEET_PRODUCTS) {
  if (product.image) localImagePaths.add(product.image.replace(/^assets\//, ""));
}

for (const imagePath of localImagePaths) {
  await access(path.join(distAssetsDirectory, imagePath));
}

console.log(`Verified dist: bundled HTML, ${localImagePaths.size} referenced local image paths, required asset folders, and CNAME=${cname}.`);
