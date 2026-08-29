import { expect, type Locator, type Page, test } from "@playwright/test";

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440] as const;
const desktopHeight = 1000;
const mobileHeight = 900;

const routes = [
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
  "/catalog/tort-praga",
  "/news/rastyom-po-turkistanu",
  "/promotions/samsa-happy-hours",
] as const;

type Locale = "ru" | "kk";

function localizedPath(route: string, locale: Locale) {
  if (locale === "ru") return route;
  return route === "/" ? "/kk" : `/kk${route}`;
}

async function settle(page: Page) {
  await page.locator("main").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function expectNoHorizontalOverflow(page: Page, context: string) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
    };
  });
  expect(overflow.scrollWidth, `${context}: document overflow`).toBeLessThanOrEqual(
    overflow.clientWidth + 1,
  );
  expect(overflow.bodyScrollWidth, `${context}: body overflow`).toBeLessThanOrEqual(
    overflow.clientWidth + 1,
  );
}

async function clippedKazakhCopy(page: Page) {
  return page.evaluate(() => {
    const selector = "h1,h2,h3,h4,p,a,button,label,span,dt,dd";
    return [...document.querySelectorAll<HTMLElement>(selector)]
      .filter((element) => {
        if (element.closest(".sr-only") || element.classList.contains("sr-only")) return false;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (
          !rect.width ||
          !rect.height ||
          style.display === "none" ||
          style.visibility === "hidden"
        )
          return false;
        const lineClamp = style.webkitLineClamp;
        const clips =
          [style.overflow, style.overflowX, style.overflowY].some((value) =>
            ["hidden", "clip"].includes(value),
          ) || Boolean(lineClamp && lineClamp !== "none");
        return (
          clips &&
          (element.scrollWidth > element.clientWidth + 3 ||
            element.scrollHeight > element.clientHeight + 3)
        );
      })
      .map((element) => ({
        tag: element.tagName,
        text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 140),
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      }));
  });
}

async function overflowingControls(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("button, a.btn-primary, a.btn-outline")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          (element.scrollWidth > element.clientWidth + 2 ||
            element.scrollHeight > element.clientHeight + 2)
        );
      })
      .map((element) => ({
        tag: element.tagName,
        text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      })),
  );
}

async function expectEqualCardRows(page: Page, context: string) {
  const unevenRows = await page.evaluate(() => {
    const cards = [
      ...document.querySelectorAll<HTMLElement>(
        ".product-card, .news-card, .store-card, .localization-equal-card",
      ),
    ].filter((card) => {
      const rect = card.getBoundingClientRect();
      const style = getComputedStyle(card);
      return rect.width > 0 && rect.height > 0 && style.display !== "none";
    });
    const rows = new Map<number, DOMRect[]>();
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const key = Math.round(rect.top);
      rows.set(key, [...(rows.get(key) ?? []), rect]);
    }
    return [...rows.entries()]
      .filter(([, rects]) => rects.length > 1)
      .map(([top, rects]) => ({ top, heights: rects.map((rect) => Math.round(rect.height)) }))
      .filter(({ heights }) => Math.max(...heights) - Math.min(...heights) > 2);
  });
  expect(unevenRows, `${context}: unequal card heights`).toEqual([]);
}

async function openMobileMenu(page: Page, locale: Locale) {
  await page.getByRole("button", { name: locale === "kk" ? "Мәзір" : "Меню" }).click();
  const dialog = page.getByRole("dialog", { name: "Навигация" });
  await expect(dialog).toBeVisible();
  return dialog;
}

async function expectInsideViewport(locator: Locator, width: number) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
}

for (const width of widths) {
  for (const locale of ["ru", "kk"] as const) {
    test(`${locale.toUpperCase()} localization layout passes at ${width}px`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chromium");
      await page.setViewportSize({ width, height: width < 768 ? mobileHeight : desktopHeight });
      await page.emulateMedia({ reducedMotion: "reduce" });

      for (const route of routes) {
        const path = localizedPath(route, locale);
        const response = await page.goto(path, { waitUntil: "domcontentloaded" });
        expect(response?.status(), `${path}: HTTP status`).toBe(200);
        await settle(page);
        await expectNoHorizontalOverflow(page, `${path} at ${width}px`);
        expect(await overflowingControls(page), `${path}: overflowing controls`).toEqual([]);
        await expectEqualCardRows(page, `${path} at ${width}px`);

        if (locale === "kk") {
          expect(await clippedKazakhCopy(page), `${path}: clipped Kazakh copy`).toEqual([]);
        }
      }

      const home = localizedPath("/", locale);
      await page.goto(home, { waitUntil: "domcontentloaded" });
      await settle(page);
      const headerHeightBefore = await page
        .locator(".site-header")
        .evaluate((element) => Math.round(element.getBoundingClientRect().height));

      if (width < 1280) {
        const dialog = await openMobileMenu(page, locale);
        await expectInsideViewport(dialog, width);
        await expectNoHorizontalOverflow(page, `${home} mobile menu at ${width}px`);
        expect(
          await overflowingControls(page),
          `${home}: overflowing mobile-menu controls`,
        ).toEqual([]);
        await dialog.locator(`a[lang="${locale === "kk" ? "ru" : "kk"}"]`).click();
      } else {
        await page.locator(`a[lang="${locale === "kk" ? "ru" : "kk"}"]:visible`).click();
      }

      await settle(page);
      const headerHeightAfter = await page
        .locator(".site-header")
        .evaluate((element) => Math.round(element.getBoundingClientRect().height));
      expect(headerHeightAfter, `${width}px: header jump after RU/KZ switch`).toBe(
        headerHeightBefore,
      );
      await expectNoHorizontalOverflow(page, `${width}px after RU/KZ switch`);

      if (locale === "kk") {
        await page.goto("/kk", { waitUntil: "domcontentloaded" });
        await settle(page);
        await page.screenshot({
          path: testInfo.outputPath(`kz-home-${width}.png`),
          fullPage: false,
          animations: "disabled",
        });
      }
    });
  }
}
