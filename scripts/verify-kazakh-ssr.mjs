import { spawn } from "node:child_process";
import net from "node:net";

const productionOrigin = "https://sofiyabakery.com";
const staticPaths = new Set([
  "/",
  "/about",
  "/catalog",
  "/stores",
  "/promotions",
  "/cake-preorder",
  "/catering",
  "/news",
  "/career",
  "/contacts",
  "/privacy",
  "/terms",
]);

const bannedRussianPhrases = [
  "перейти к содержимому",
  "главная",
  "магазины",
  "торты на заказ",
  "о компании",
  "новости и события",
  "специальные предложения",
  "связаться с нами",
  "пользовательское соглашение",
  "политика конфиденциальности",
  "на главную",
  "страница не найдена",
  "что-то пошло не так",
  "возможно, страница",
  "всё меню",
  "все новости",
  "все акции",
  "все магазины",
  "найдено:",
  "рекомендуем",
  "сначала новинки",
  "цена: по",
  "фильтры каталога",
  "ничего не найдено",
  "сбросить фильтры",
  "показать результаты",
  "подробнее об акции",
  "показать на карте",
  "маршрут в",
  "где купить",
  "проверьте заказ",
  "оформить предзаказ",
  "перейти в whatsapp",
  "заполните обязательное поле",
  "проверьте номер телефона",
  "сообщение подготовлено",
  "выберите сегодняшнюю",
  "ежедневно с",
  "в акции участвуют",
  "напротив ",
  "рядом с ",
  "улица ",
  "проспект ",
  "рынок ",
  "свежая выпечка",
];

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function withoutExecutableMarkup(html) {
  return decodeEntities(
    html
      .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/\bРусский\b/gi, " ")
      .replace(/\s+/g, " "),
  );
}

function russianPhrasesIn(value) {
  const normalized = value.toLocaleLowerCase("ru-RU");
  return bannedRussianPhrases.filter((phrase) => normalized.includes(phrase));
}

function attribute(tag, name) {
  return decodeEntities(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? "");
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function metaValues(html, attributeName, attributeValue) {
  return tags(html, "meta")
    .filter((tag) => attribute(tag, attributeName) === attributeValue)
    .map((tag) => attribute(tag, "content"));
}

function linkTags(html, rel) {
  return tags(html, "link").filter((tag) => attribute(tag, "rel") === rel);
}

function jsonLd(html, prefix, failures) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  return scripts.flatMap((match, index) => {
    try {
      return [JSON.parse(decodeEntities(match[1]))];
    } catch (error) {
      failures.push(`${prefix}invalid JSON-LD #${index + 1}: ${error.message}`);
      return [];
    }
  });
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 4173;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function run(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", env: process.env });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code ?? signal}`));
    });
  });
}

async function waitForServer(baseUrl, child) {
  const deadline = Date.now() + 120_000;
  let lastError;
  while (Date.now() < deadline) {
    if (child.exitCode != null) throw new Error(`preview server exited with ${child.exitCode}`);
    try {
      const response = await fetch(`${baseUrl}/robots.txt`);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`preview server did not become ready: ${lastError?.message ?? "timeout"}`);
}

async function stopServer(child) {
  if (!child || child.exitCode != null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode == null) child.kill("SIGKILL");
}

async function mapLimit(values, limit, mapper) {
  const results = new Array(values.length);
  let next = 0;
  async function worker() {
    while (next < values.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, worker));
  return results;
}

function localizedPair(pathname) {
  const basePath = pathname === "/kk" ? "/" : pathname.replace(/^\/kk(?=\/|$)/, "") || "/";
  return {
    ru: basePath,
    kk: basePath === "/" ? "/kk" : `/kk${basePath}`,
  };
}

async function verify(baseUrl) {
  const failures = [];
  const fetchText = async (pathname, options) => {
    const response = await fetch(`${baseUrl}${pathname}`, options);
    return { response, text: await response.text() };
  };

  const sitemapResult = await fetchText("/sitemap.xml", { redirect: "manual" });
  if (sitemapResult.response.status !== 200) {
    failures.push(`sitemap.xml returned ${sitemapResult.response.status}`);
  }
  if (!sitemapResult.response.headers.get("content-type")?.includes("application/xml")) {
    failures.push("sitemap.xml has an invalid content-type");
  }

  const urlBlocks = [...sitemapResult.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (match) => match[1],
  );
  const locations = urlBlocks.map((block) =>
    decodeEntities(block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? ""),
  );
  const uniqueLocations = new Set(locations);
  if (urlBlocks.length !== 140) failures.push(`sitemap URL block count is ${urlBlocks.length}`);
  if (uniqueLocations.size !== 140)
    failures.push(`sitemap unique URL count is ${uniqueLocations.size}`);

  const paths = locations.flatMap((location) => {
    try {
      const url = new URL(location);
      if (url.origin !== productionOrigin)
        failures.push(`${location}: sitemap origin must be ${productionOrigin}`);
      if (url.search || url.hash) failures.push(`${location}: sitemap URL has search/hash state`);
      return [url.pathname];
    } catch {
      failures.push(`${location}: invalid sitemap URL`);
      return [];
    }
  });
  const ruPaths = paths.filter((path) => path !== "/kk" && !path.startsWith("/kk/"));
  const kkPaths = paths.filter((path) => path === "/kk" || path.startsWith("/kk/"));
  if (ruPaths.length !== 70) failures.push(`Russian sitemap URL count is ${ruPaths.length}`);
  if (kkPaths.length !== 70) failures.push(`Kazakh sitemap URL count is ${kkPaths.length}`);

  const ruStatic = ruPaths.filter((path) => staticPaths.has(path));
  const ruProducts = ruPaths.filter((path) => path.startsWith("/catalog/"));
  const ruNews = ruPaths.filter((path) => path.startsWith("/news/"));
  const ruPromotions = ruPaths.filter((path) => path.startsWith("/promotions/"));
  const classified = new Set([...ruStatic, ...ruProducts, ...ruNews, ...ruPromotions]);
  if (ruStatic.length !== 12 || [...staticPaths].some((path) => !ruStatic.includes(path))) {
    failures.push("sitemap static route family is incomplete");
  }
  if (ruProducts.length !== 53) failures.push(`sitemap product count is ${ruProducts.length}`);
  if (ruNews.length !== 3) failures.push(`sitemap news count is ${ruNews.length}`);
  if (ruPromotions.length !== 2) failures.push(`sitemap promotion count is ${ruPromotions.length}`);
  if (classified.size !== ruPaths.length) failures.push("sitemap contains an unknown route family");

  for (const [index, block] of urlBlocks.entries()) {
    const pathname = paths[index];
    if (!pathname) continue;
    const pair = localizedPair(pathname);
    const expected = {
      "ru-KZ": `${productionOrigin}${pair.ru}`,
      "kk-KZ": `${productionOrigin}${pair.kk}`,
      "x-default": `${productionOrigin}${pair.ru}`,
    };
    const alternateTags = tags(block, "xhtml:link");
    if (alternateTags.length !== 3) {
      failures.push(`${pathname}: sitemap alternate count is ${alternateTags.length}`);
      continue;
    }
    const actual = Object.fromEntries(
      alternateTags.map((tag) => [attribute(tag, "hreflang"), attribute(tag, "href")]),
    );
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      failures.push(`${pathname}: sitemap alternates are not the exact reciprocal pair`);
    }
  }

  const pageResults = await mapLimit(paths, 12, async (pathname) => ({
    pathname,
    ...(await fetchText(pathname, { redirect: "manual" })),
  }));

  for (const { pathname, response, text } of pageResults) {
    const prefix = `${pathname}: `;
    const isKazakh = pathname === "/kk" || pathname.startsWith("/kk/");
    const localeTag = isKazakh ? "kk-KZ" : "ru-KZ";
    const ogLocale = isKazakh ? "kk_KZ" : "ru_KZ";
    const alternateLocale = isKazakh ? "ru_KZ" : "kk_KZ";
    if (response.status !== 200) failures.push(`${prefix}HTTP ${response.status}`);
    if (!new RegExp(`<html[^>]*lang=["']${localeTag}["']`, "i").test(text)) {
      failures.push(`${prefix}missing ${localeTag} html lang`);
    }

    const titles = [...text.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) =>
      decodeEntities(match[1]).trim(),
    );
    if (titles.length !== 1 || !titles[0]) {
      failures.push(`${prefix}expected one non-empty title, got ${titles.length}`);
    }
    const descriptions = metaValues(text, "name", "description");
    if (descriptions.length !== 1 || !descriptions[0]) {
      failures.push(`${prefix}expected one non-empty description, got ${descriptions.length}`);
    }

    const canonical = linkTags(text, "canonical");
    const expectedCanonical = `${productionOrigin}${pathname}`;
    if (canonical.length !== 1 || attribute(canonical[0], "href") !== expectedCanonical) {
      failures.push(`${prefix}canonical is not exactly ${expectedCanonical}`);
    }
    const pair = localizedPair(pathname);
    const expectedAlternates = {
      "ru-KZ": `${productionOrigin}${pair.ru}`,
      "kk-KZ": `${productionOrigin}${pair.kk}`,
      "x-default": `${productionOrigin}${pair.ru}`,
    };
    const alternates = linkTags(text, "alternate");
    const actualAlternates = Object.fromEntries(
      alternates.map((tag) => [
        attribute(tag, "hrefLang") || attribute(tag, "hreflang"),
        attribute(tag, "href"),
      ]),
    );
    if (
      alternates.length !== 3 ||
      JSON.stringify(actualAlternates) !== JSON.stringify(expectedAlternates)
    ) {
      failures.push(`${prefix}HTML alternates are not the exact reciprocal pair`);
    }

    const requiredMeta = [
      ["property", "og:title", undefined],
      ["property", "og:description", undefined],
      ["property", "og:type", undefined],
      ["property", "og:locale", ogLocale],
      ["property", "og:locale:alternate", alternateLocale],
      ["property", "og:url", expectedCanonical],
      ["name", "twitter:title", undefined],
      ["name", "twitter:description", undefined],
    ];
    for (const [attributeName, key, expectedValue] of requiredMeta) {
      const values = metaValues(text, attributeName, key);
      if (values.length !== 1 || !values[0]) {
        failures.push(`${prefix}${key} count/value is invalid`);
      } else if (expectedValue && values[0] !== expectedValue) {
        failures.push(`${prefix}${key} is ${values[0]}, expected ${expectedValue}`);
      }
    }

    if (isKazakh) {
      const leaks = [...new Set(russianPhrasesIn(withoutExecutableMarkup(text)))];
      if (leaks.length) failures.push(`${prefix}Russian phrase(s): ${leaks.join(", ")}`);
    }

    const schemas = jsonLd(text, prefix, failures);
    const basePath = pair.ru;
    const isProductDetail = basePath.startsWith("/catalog/");
    const isContentDetail = basePath.startsWith("/news/") || basePath.startsWith("/promotions/");
    const expectedSchemaTypes = [
      "Organization",
      ...(isProductDetail ? ["Product", "BreadcrumbList"] : []),
      ...(isContentDetail ? ["BreadcrumbList"] : []),
    ];
    const actualSchemaTypes = schemas.map((schema) => schema["@type"]).sort();
    if (JSON.stringify(actualSchemaTypes) !== JSON.stringify([...expectedSchemaTypes].sort())) {
      failures.push(
        `${prefix}JSON-LD types are ${actualSchemaTypes.join(", ")}, expected ${expectedSchemaTypes.join(", ")}`,
      );
    }

    const organizations = schemas.filter((schema) => schema["@type"] === "Organization");
    const organization = organizations[0];
    if (organizations.length !== 1 || organization?.inLanguage !== localeTag) {
      failures.push(`${prefix}Organization JSON-LD language/count is invalid`);
    } else {
      const expectedOrganizationUrl = `${productionOrigin}${isKazakh ? "/kk" : "/"}`;
      const expectedArea = isKazakh
        ? "Шымкент және Түркістан облысы"
        : "Шымкент и Туркестанская область";
      if (organization.url !== expectedOrganizationUrl) {
        failures.push(`${prefix}Organization URL is not ${expectedOrganizationUrl}`);
      }
      if (organization.areaServed !== expectedArea) {
        failures.push(`${prefix}Organization areaServed is not localized`);
      }
      if (!Array.isArray(organization.department) || organization.department.length !== 17) {
        failures.push(`${prefix}Organization department count is not 17`);
      }
    }

    for (const schema of schemas) {
      if (schema.inLanguage !== localeTag) {
        failures.push(`${prefix}${schema["@type"]} JSON-LD has invalid inLanguage`);
      }
      if (isKazakh) {
        const leaks = russianPhrasesIn(JSON.stringify(schema));
        if (leaks.length) {
          failures.push(
            `${prefix}${schema["@type"]} Russian phrase(s): ${[...new Set(leaks)].join(", ")}`,
          );
        }
      }
    }

    if (isProductDetail) {
      const productSchemas = schemas.filter((schema) => schema["@type"] === "Product");
      const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
      if (productSchemas.length !== 1 || productSchemas[0].inLanguage !== localeTag) {
        failures.push(`${prefix}Product JSON-LD language/count is invalid`);
      }
      if (breadcrumbs.length !== 1 || breadcrumbs[0].inLanguage !== localeTag) {
        failures.push(`${prefix}BreadcrumbList JSON-LD language/count is invalid`);
      }
      const product = productSchemas[0];
      if (product) {
        if (product.description !== descriptions[0]) {
          failures.push(`${prefix}Product JSON-LD description differs from page metadata`);
        }
        if (typeof product.name !== "string" || !titles[0]?.includes(product.name)) {
          failures.push(`${prefix}Product JSON-LD name differs from page title`);
        }
      }
      if (
        breadcrumbs[0] &&
        (!Array.isArray(breadcrumbs[0].itemListElement) ||
          breadcrumbs[0].itemListElement.length !== 3)
      ) {
        failures.push(`${prefix}product BreadcrumbList item count is not 3`);
      }
    } else if (isContentDetail) {
      const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
      if (breadcrumbs.length !== 1 || breadcrumbs[0].inLanguage !== localeTag) {
        failures.push(`${prefix}detail BreadcrumbList language/count is invalid`);
      }
      if (
        breadcrumbs[0] &&
        (!Array.isArray(breadcrumbs[0].itemListElement) ||
          breadcrumbs[0].itemListElement.length !== 3)
      ) {
        failures.push(`${prefix}detail BreadcrumbList item count is not 3`);
      }
    }
  }

  const missingRoutes = [
    ["/localization-404-probe", "ru-KZ", "Страница не найдена | SOFIYA"],
    ["/catalog/missing-product", "ru-KZ", "Страница не найдена | SOFIYA"],
    ["/news/missing-news", "ru-KZ", "Страница не найдена | SOFIYA"],
    ["/promotions/missing-promotion", "ru-KZ", "Страница не найдена | SOFIYA"],
    ["/kk/localization-404-probe", "kk-KZ", "Бет табылмады | SOFIYA"],
    ["/kk/catalog/missing-product", "kk-KZ", "Бет табылмады | SOFIYA"],
    ["/kk/news/missing-news", "kk-KZ", "Бет табылмады | SOFIYA"],
    ["/kk/promotions/missing-promotion", "kk-KZ", "Бет табылмады | SOFIYA"],
  ];
  for (const [pathname, localeTag, expectedTitle] of missingRoutes) {
    const { response, text } = await fetchText(pathname, { redirect: "manual" });
    if (response.status !== 404) failures.push(`${pathname}: HTTP ${response.status}`);
    if (!new RegExp(`<html[^>]*lang=["']${localeTag}["']`, "i").test(text)) {
      failures.push(`${pathname}: missing ${localeTag} html lang`);
    }
    const titles = [...text.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) =>
      decodeEntities(match[1]).trim(),
    );
    if (titles.length !== 1 || titles[0] !== expectedTitle) {
      failures.push(`${pathname}: invalid 404 title (${titles.join(" | ")})`);
    }
    if (!metaValues(text, "name", "robots").includes("noindex")) {
      failures.push(`${pathname}: missing noindex`);
    }
    if (localeTag === "kk-KZ") {
      const leaks = russianPhrasesIn(withoutExecutableMarkup(text));
      if (leaks.length) failures.push(`${pathname}: Russian phrase(s): ${leaks.join(", ")}`);
    }
  }

  if (failures.length) {
    console.error(`Bilingual SSR verification failed (${failures.length}):`);
    for (const failure of failures) console.error(`- ${failure}`);
    throw new Error("Bilingual SSR verification failed");
  }

  console.log(
    "Bilingual SSR verification passed: 70 RU + 70 KK pages, exact reciprocal SEO, 420 sitemap alternates, localized structured data and 404s.",
  );
  console.log(`Verified base URL: ${baseUrl}; canonical origin: ${productionOrigin}`);
}

let server;
let baseUrl = process.env.BASE_URL?.replace(/\/$/, "");
try {
  if (!baseUrl) {
    await run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build:e2e"]);
    const port = await freePort();
    baseUrl = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, [".output/server/index.mjs"], {
      stdio: "inherit",
      env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
    });
    await waitForServer(baseUrl, server);
  }
  await verify(baseUrl);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await stopServer(server);
}
