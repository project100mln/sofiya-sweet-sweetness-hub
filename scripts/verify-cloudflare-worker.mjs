import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, ".output", "public");
const productionOrigin = "https://sofiyabakery.com";
const workerOrigin = "https://sofiya-bakery-preview.workers.dev";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

const assets = {
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
    const relativePath = pathname.replace(/^\/+/, "");
    const resolvedPath = path.resolve(publicRoot, relativePath);
    if (resolvedPath !== publicRoot && !resolvedPath.startsWith(`${publicRoot}${path.sep}`)) {
      return new Response("Not found", { status: 404 });
    }
    try {
      return new Response(await readFile(resolvedPath), {
        status: 200,
        headers: {
          "content-type":
            contentTypes.get(path.extname(resolvedPath)) ?? "application/octet-stream",
        },
      });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};

const executionContext = { waitUntil() {} };
const worker = (await import("../.output/server/index.mjs")).default;

async function fetchWorker(pathname) {
  const response = await worker.fetch(
    new Request(`${workerOrigin}${pathname}`, { headers: { "cf-connecting-ip": "127.0.0.1" } }),
    { ASSETS: assets },
    executionContext,
  );
  return { response, text: await response.text() };
}

function decodeEntities(value) {
  return value.replaceAll("&amp;", "&");
}

const failures = [];
const sitemap = await fetchWorker("/sitemap.xml");
if (sitemap.response.status !== 200) failures.push(`sitemap returned ${sitemap.response.status}`);
if (!sitemap.response.headers.get("content-type")?.includes("application/xml")) {
  failures.push("sitemap content-type is not application/xml");
}

const locations = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  decodeEntities(match[1]),
);
if (locations.length !== 140) failures.push(`sitemap contains ${locations.length} routes, not 140`);
if (new Set(locations).size !== locations.length)
  failures.push("sitemap contains duplicate routes");

for (const location of locations) {
  const url = new URL(location);
  const isKazakh = url.pathname === "/kk" || url.pathname.startsWith("/kk/");
  const expectedLang = isKazakh ? "kk-KZ" : "ru-KZ";
  const page = await fetchWorker(url.pathname);
  const prefix = `${url.pathname}: `;
  if (url.origin !== productionOrigin) failures.push(`${prefix}unexpected sitemap origin`);
  if (page.response.status !== 200) failures.push(`${prefix}HTTP ${page.response.status}`);
  if (!page.response.headers.get("content-type")?.includes("text/html")) {
    failures.push(`${prefix}content-type is not text/html`);
  }
  if (!new RegExp(`<html[^>]+lang=["']${expectedLang}["']`, "i").test(page.text)) {
    failures.push(`${prefix}missing ${expectedLang} html lang`);
  }
  if (!/<title>[^<]+<\/title>/i.test(page.text)) failures.push(`${prefix}missing title`);
}

const root = await fetchWorker("/");
const firstAsset = root.text.match(/(?:src|href)=["']([^"']*\/assets\/[^"']+)/)?.[1];
if (!firstAsset) {
  failures.push("root page does not reference a built asset");
} else {
  const asset = await fetchWorker(new URL(firstAsset, workerOrigin).pathname);
  if (asset.response.status !== 200 || asset.text.length === 0) {
    failures.push(`built asset ${firstAsset} was not served through ASSETS`);
  }
}

for (const [pathname, expectedLang] of [
  ["/missing-release-check", "ru-KZ"],
  ["/kk/missing-release-check", "kk-KZ"],
]) {
  const missing = await fetchWorker(pathname);
  if (missing.response.status !== 404) failures.push(`${pathname}: expected HTTP 404`);
  if (!new RegExp(`<html[^>]+lang=["']${expectedLang}["']`, "i").test(missing.text)) {
    failures.push(`${pathname}: missing localized 404 lang ${expectedLang}`);
  }
}

if (failures.length) {
  console.error(`Cloudflare Worker verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Cloudflare Worker verification passed: ${locations.length} localized routes + assets + 404s.`,
);
