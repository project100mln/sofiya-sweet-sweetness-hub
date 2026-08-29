import { expect, type Page, test } from "@playwright/test";
import { collectBrowserErrors, installPopupRecorder, recordedPopupUrls } from "./browser-evidence";

const kkStaticRoutes = [
  "/kk",
  "/kk/about",
  "/kk/catalog",
  "/kk/stores",
  "/kk/promotions",
  "/kk/cake-preorder",
  "/kk/catering",
  "/kk/news",
  "/kk/career",
  "/kk/contacts",
  "/kk/privacy",
  "/kk/terms",
] as const;

const kkDynamicRoutes = [
  "/kk/catalog/tort-praga",
  "/kk/news/rastyom-po-turkistanu",
  "/kk/promotions/samsa-happy-hours",
] as const;

async function sitemapReviewRoutes(page: Page): Promise<string[]> {
  const response = await page.request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1].replaceAll("&amp;", "&")).pathname,
  );
  expect(paths).toHaveLength(140);
  expect(new Set(paths).size).toBe(140);
  expect(paths.filter((path) => path === "/kk" || path.startsWith("/kk/"))).toHaveLength(70);
  expect(paths.filter((path) => path !== "/kk" && !path.startsWith("/kk/"))).toHaveLength(70);
  return paths;
}

async function openLanguageMenuIfNeeded(page: Page, mobile: boolean, locale: "ru" | "kk") {
  if (!mobile) return;
  await page.getByRole("button", { name: locale === "kk" ? "Мәзір" : "Меню" }).click();
}

async function switchLanguage(
  page: Page,
  target: "ru" | "kk",
  mobile: boolean,
  current: "ru" | "kk",
) {
  await openLanguageMenuIfNeeded(page, mobile, current);
  await page.locator(`a[lang="${target}"]:visible`).click();
}

async function disableExternalPopups(page: Page) {
  await installPopupRecorder(page);
}

async function setBestsellerFilter(page: Page, mobile: boolean, checked: boolean) {
  if (mobile) {
    await page.getByRole("button", { name: /Сүзгілер/ }).click();
    const dialog = page.getByRole("dialog", { name: "Каталог сүзгілері" });
    await expect(dialog.getByRole("button", { name: "Сүзгілерді жабу" })).toBeFocused();
    const filter = dialog.getByLabel("Бестселлерлер");
    if ((await filter.isChecked()) !== checked) await filter.click();
    await dialog.getByRole("button", { name: "Нәтижелерді көрсету" }).click();
  } else {
    const filter = page.getByLabel("Бестселлерлер");
    if ((await filter.isChecked()) !== checked) await filter.click();
  }
}

async function completeCakePreorder(page: Page, locale: "ru" | "kk") {
  const kk = locale === "kk";
  await page
    .getByRole("group", { name: kk ? "Торт түрі" : "Тип торта" })
    .getByRole("button", { name: "Сникерс" })
    .click();
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page
    .getByRole("group", { name: kk ? "Шамамен өлшемі" : "Ориентировочный размер" })
    .getByRole("button", { name: "1 кг" })
    .click();
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page.getByLabel(kk ? "Порция саны" : "Количество порций").fill("8");
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page.getByLabel(kk ? "Іс-шара күні" : "Дата события").fill("2099-12-31");
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page
    .getByRole("group", { name: kk ? "Алып кету дүкені" : "Точка самовывоза" })
    .getByRole("button")
    .first()
    .click();
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page
    .getByRole("group", { name: kk ? "Қаптама" : "Упаковка" })
    .getByRole("button", { name: kk ? "Стандартты қорап" : "Стандартная коробка" })
    .click();
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page.getByLabel(kk ? "Атыңыз" : "Ваше имя").fill(kk ? "Сынақ" : "Тест");
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page.getByLabel("Телефон").fill("+7 700 000 00 00");
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await page
    .getByLabel(kk ? "Пікір (қалауыңыз бойынша)" : "Комментарий (по желанию)")
    .fill(kk ? "Сегіз порция" : "Восемь порций");
  await page.getByRole("button", { name: kk ? "Келесі" : "Далее" }).click();
  await expect(
    page.getByRole("heading", { name: kk ? "Тапсырысты тексеріңіз" : "Проверьте заказ" }),
  ).toBeVisible();
  await page.getByRole("button", { name: kk ? "WhatsApp-қа өту" : "Перейти в WhatsApp" }).click();
  const retry = page.getByRole("link", {
    name: kk ? "WhatsApp-ты ашу" : "Открыть WhatsApp",
  });
  await expect(retry).toBeVisible();
  return decodeURIComponent((await retry.getAttribute("href")) ?? "");
}

for (const path of [...kkStaticRoutes, ...kkDynamicRoutes]) {
  test(`${path} renders in Kazakh without hydration or browser errors`, async ({ page }) => {
    const errors = collectBrowserErrors(page);
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "kk-KZ");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("language switch preserves path, query and hash in both directions", async ({
  page,
}, testInfo) => {
  const mobile = testInfo.project.name.includes("mobile");
  await page.goto("/catalog?cat=pizza&sort=price-asc#main-content");
  await switchLanguage(page, "kk", mobile, "ru");
  await expect(page).toHaveURL(/\/kk\/catalog\?cat=pizza&sort=price-asc#main-content$/);
  await switchLanguage(page, "ru", mobile, "kk");
  await expect(page).toHaveURL(/\/catalog\?cat=pizza&sort=price-asc#main-content$/);

  await page.goto("/catalog/tort-praga?ref=qa#main-content");
  await switchLanguage(page, "kk", mobile, "ru");
  await expect(page).toHaveURL(/\/kk\/catalog\/tort-praga\?ref=qa#main-content$/);
  await switchLanguage(page, "ru", mobile, "kk");
  await expect(page).toHaveURL(/\/catalog\/tort-praga\?ref=qa#main-content$/);
});

test("cake draft and stable selections survive Russian-Kazakh SPA switching", async ({
  page,
}, testInfo) => {
  const mobile = testInfo.project.name.includes("mobile");
  await page.goto("/cake-preorder");
  await page
    .getByRole("group", { name: "Тип торта" })
    .getByRole("button", { name: "Сникерс" })
    .click();
  await page.getByRole("button", { name: "Далее" }).click();
  const oneKgRu = page
    .getByRole("group", { name: "Ориентировочный размер" })
    .getByRole("button", { name: "1 кг" });
  await oneKgRu.click();
  await expect(oneKgRu).toHaveAttribute("aria-pressed", "true");

  await switchLanguage(page, "kk", mobile, "ru");
  await expect(page).toHaveURL(/\/kk\/cake-preorder$/);
  await expect(page.getByText(/Қадам 2 \/ 11: Өлшемі/)).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Шамамен өлшемі" }).getByRole("button", { name: "1 кг" }),
  ).toHaveAttribute("aria-pressed", "true");

  await switchLanguage(page, "ru", mobile, "kk");
  await expect(page.getByText(/Шаг 2 из 11: Размер/)).toBeVisible();
  await expect(
    page
      .getByRole("group", { name: "Ориентировочный размер" })
      .getByRole("button", { name: "1 кг" }),
  ).toHaveAttribute("aria-pressed", "true");
});

for (const locale of ["ru", "kk"] as const) {
  test(`${locale.toUpperCase()} primary navigation exposes exact localized routes and closes correctly`, async ({
    page,
  }, testInfo) => {
    const kk = locale === "kk";
    const mobile = testInfo.project.name.includes("mobile");
    const prefix = kk ? "/kk" : "";
    const routeLabels = [
      ["/", kk ? "Басты бет" : "Главная"],
      ["/catalog", "Каталог"],
      ["/promotions", kk ? "Акциялар" : "Акции"],
      ["/stores", kk ? "Дүкендер" : "Магазины"],
      ["/cake-preorder", kk ? "Тапсырыспен торттар" : "Торты на заказ"],
      ["/catering", "Кейтеринг"],
      ["/about", kk ? "Біз туралы" : "О нас"],
      ["/career", kk ? "Мансап" : "Карьера"],
      ["/contacts", kk ? "Байланыс" : "Контакты"],
    ] as const;

    await page.goto(kk ? "/kk" : "/");
    if (!mobile) {
      const navigation = page.getByRole("navigation", {
        name: kk ? "Негізгі навигация" : "Основная навигация",
      });
      for (const [route, label] of routeLabels.filter(([route]) =>
        ["/", "/catalog", "/promotions", "/stores", "/cake-preorder", "/about"].includes(route),
      )) {
        await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute(
          "href",
          route === "/" ? prefix || "/" : `${prefix}${route}`,
        );
      }
      await navigation.getByRole("link", { name: "Каталог", exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/catalog$`));
      return;
    }

    const trigger = page.getByRole("button", { name: kk ? "Мәзір" : "Меню" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Навигация" });
    const close = dialog.getByRole("button", { name: kk ? "Жабу" : "Закрыть" });
    await expect(close).toBeFocused();
    expect(await page.locator("body").evaluate((element) => element.style.overflow)).toBe("hidden");
    for (const [route, label] of routeLabels) {
      await expect(dialog.getByRole("link", { name: label, exact: true })).toHaveAttribute(
        "href",
        route === "/" ? prefix || "/" : `${prefix}${route}`,
      );
    }
    await close.click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    expect(await page.locator("body").evaluate((element) => element.style.overflow)).toBe("");

    await trigger.click();
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await dialog.getByRole("link", { name: "Каталог", exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`${prefix}/catalog$`));
  });
}

test("Kazakh catalogue supports localized search, filters, sorting and empty state", async ({
  page,
}, testInfo) => {
  const mobile = testInfo.project.name.includes("mobile");
  await page.goto("/kk/catalog", { waitUntil: "networkidle" });
  const search = page.getByPlaceholder("Каталогтан іздеу…");
  await search.fill("Қытырлақ баялды");
  await expect(page.getByRole("link", { name: /Қытырлақ баялды салаты/ })).toBeVisible();
  await page.getByRole("button", { name: "Іздеуді тазарту" }).click();

  await setBestsellerFilter(page, mobile, true);
  await expect(page.getByTestId("product-card")).toHaveCount(1);
  await setBestsellerFilter(page, mobile, false);

  await page.getByLabel("Тауарларды сұрыптау").selectOption("price-asc");
  await expect(page).toHaveURL(/sort=price-asc/);
  const prices = (await page.getByTestId("product-price").allTextContents()).map((value) =>
    Number(value.replace(/\D/g, "")),
  );
  expect(prices).toEqual([...prices].sort((a, b) => a - b));

  await search.fill("мұндай-өнім-жоқ");
  await expect(page.getByText("Ештеңе табылмады", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Сүзгілерді тазарту" }).click();
  await expect(page.getByTestId("product-card").first()).toBeVisible();
});

test("Kazakh store cities use exact counts and search indexes both spellings", async ({ page }) => {
  await page.goto("/kk/stores", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Шымкент.*11/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Леңгір.*3/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Ақсукент.*2/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Манкент.*1/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Шымкент.*11/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const mapPanel = page.getByTestId("store-map-panel");
  const kapalStore = page.getByTestId("store-card-shy-kapal-2b");
  const showOnMap = kapalStore.locator("button[aria-pressed]");
  await expect(showOnMap).toHaveText("Картадан көрсету");
  await showOnMap.click();
  await expect(showOnMap).toHaveAttribute("aria-pressed", "true");
  await expect(mapPanel.getByRole("heading", { name: "Қапал батыр көшесі, 2Б" })).toBeVisible();
  await expect(mapPanel.locator("iframe")).toHaveAttribute("title", /Қапал батыр көшесі, 2Б/);
  await expect(mapPanel.getByRole("link", { name: "2GIS-тегі бағыт" })).toHaveAttribute(
    "href",
    "https://2gis.kz/shymkent/firm/70000001067749564",
  );

  await page.getByRole("button", { name: /Леңгір.*3/ }).click();
  await expect(page.getByRole("button", { name: /Леңгір.*3/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("button", { name: /Шымкент.*11/ })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(page.getByTestId(/^store-card-/)).toHaveCount(3);
  const search = page.getByLabel("Дүкенді іздеу");
  await search.fill("Ленгер");
  await expect(page.getByTestId(/^store-card-/)).toHaveCount(3);
  await search.fill("Леңгір");
  await expect(page.getByTestId(/^store-card-/)).toHaveCount(3);
  await search.fill("Аксукент");
  await expect(page.getByTestId(/^store-card-/)).toHaveCount(2);
  await search.fill("Ақсукент");
  await expect(page.getByTestId(/^store-card-/)).toHaveCount(2);
});

test("Kazakh product, news and promotion details use localized copy and payloads", async ({
  page,
}) => {
  await page.goto("/kk/catalog/tort-praga");
  await expect(page.getByRole("heading", { level: 1, name: "«Прага» торты" })).toBeVisible();
  await expect(page.getByText("Құрамы", { exact: true })).toBeVisible();
  expect(
    decodeURIComponent(
      (await page.getByRole("link", { name: "WhatsApp арқылы сұрау" }).getAttribute("href")) ?? "",
    ),
  ).toContain("Сәлеметсіз бе, SOFIYA!");

  await page.goto("/kk/news/rastyom-po-turkistanu");
  await expect(
    page.getByRole("heading", { level: 1, name: "Түркістан облысында кеңейіп келеміз" }),
  ).toBeVisible();
  await expect(
    page.getByText("Леңгір, Сайрам, Ақсукент және Манкенттегі жаңа SOFIYA дүкендері.", {
      exact: true,
    }),
  ).toBeVisible();

  await page.goto("/kk/promotions/samsa-happy-hours");
  await expect(
    page.getByRole("heading", { level: 1, name: "Тартылған етті самсалар" }),
  ).toBeVisible();
  await expect(page.getByText("Күн сайын 20:00 бастап –22:00 дейін", { exact: true })).toBeVisible();
  await expect(page.getByText("Мини самса", { exact: true })).toBeVisible();
  expect(
    decodeURIComponent(
      (await page.getByRole("link", { name: "WhatsApp арқылы нақтылау" }).getAttribute("href")) ??
        "",
    ),
  ).toContain("акциясы туралы айтып беріңізші");
});

for (const locale of ["ru", "kk"] as const) {
  const kk = locale === "kk";
  const prefix = kk ? "/kk" : "";
  const submitLabel = kk ? "WhatsApp-қа өту" : "Перейти в WhatsApp";
  const openLabel = kk ? "WhatsApp-ты ашу" : "Открыть WhatsApp";
  const requiredMessage = kk ? "Міндетті өрісті толтырыңыз" : "Заполните обязательное поле";
  const invalidPhoneMessage = kk ? "Телефон нөмірін тексеріңіз" : "Проверьте номер телефона";

  test(`${locale.toUpperCase()} contact validates, records the popup and prepares the localized payload`, async ({
    page,
  }) => {
    await disableExternalPopups(page);
    await page.goto(`${prefix}/contacts`);
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(3);
    await expect(page.getByRole("alert").first()).toContainText(requiredMessage);

    await page.getByLabel(kk ? "Аты *" : "Имя *").fill(kk ? "Сынақ" : "Тест");
    await page.getByLabel("Телефон *").fill("-------");
    await page
      .getByLabel(kk ? "Хабарлама *" : "Сообщение *")
      .fill(kk ? "Қазақша тексеру" : "Проверка формы");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(1);
    await expect(page.getByRole("alert")).toContainText(invalidPhoneMessage);

    await page.getByLabel("Телефон *").fill("+7 700 000 00 00");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(
      page.getByText(
        kk
          ? "Дайын мәтінді тексеріп, WhatsApp-та «Жіберу» түймесін басыңыз. Хабарлама содан кейін ғана менеджерге беріледі."
          : "Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого сообщение будет передано менеджеру.",
        { exact: true },
      ),
    ).toBeVisible();
    const href = (await page.getByRole("link", { name: openLabel }).getAttribute("href")) ?? "";
    const payload = decodeURIComponent(href);
    expect(payload).toContain(kk ? "Сәлеметсіз бе, SOFIYA!" : "Здравствуйте, SOFIYA!");
    expect(payload).toContain(kk ? "Қазақша тексеру" : "Проверка формы");
    await expect.poll(async () => (await recordedPopupUrls(page)).length).toBe(1);
    expect((await recordedPopupUrls(page))[0]).toBe(href);
  });

  test(`${locale.toUpperCase()} catering validates, records the popup and prepares the complete payload`, async ({
    page,
  }) => {
    await disableExternalPopups(page);
    await page.goto(`${prefix}/catering`);
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(5);
    await expect(page.getByRole("alert").first()).toContainText(requiredMessage);
    await page.getByLabel(kk ? /Іс-шара түрі/ : /Тип события/).selectOption("coffee-break");
    await page.getByLabel(kk ? /^Күні/ : /^Дата/).fill("2099-12-31");
    await page.getByLabel(kk ? /Қонақтар саны/ : /Гостей/).fill("20");
    await page.getByLabel(kk ? /^Аты/ : /^Имя/).fill(kk ? "Сынақ" : "Тест");
    await page.getByLabel(/^Телефон/).fill("-------");
    await page.getByLabel(kk ? "Пікір" : "Комментарий").fill(kk ? "Кеңсе үшін" : "Для офиса");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(1);
    await expect(page.getByRole("alert")).toContainText(invalidPhoneMessage);

    await page.getByLabel(/^Телефон/).fill("+7 700 000 00 00");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(
      page.getByText(
        kk
          ? "Дайын мәтінді тексеріп, оны WhatsApp арқылы жіберіңіз — содан кейін ғана өтінім менеджерге түседі."
          : "Проверьте готовый текст и отправьте его в WhatsApp — только после этого заявка поступит менеджеру.",
        { exact: true },
      ),
    ).toBeVisible();
    const href = (await page.getByRole("link", { name: openLabel }).getAttribute("href")) ?? "";
    const payload = decodeURIComponent(href);
    expect(payload).toContain(kk ? "Кейтерингке өтінім" : "Заявка на кейтеринг");
    expect(payload).toContain(kk ? "Түрі: Кофе-брейктер" : "Тип: Кофе-брейки");
    expect(payload).toContain(kk ? "Қонақтар саны: 20" : "Гостей: 20");
    expect(payload).toContain(kk ? "Пікір: Кеңсе үшін" : "Комментарий: Для офиса");
    await expect.poll(async () => (await recordedPopupUrls(page)).length).toBe(1);
    expect((await recordedPopupUrls(page))[0]).toBe(href);
  });

  test(`${locale.toUpperCase()} career validates, records the popup and prepares the complete payload`, async ({
    page,
  }) => {
    await disableExternalPopups(page);
    await page.goto(`${prefix}/career`);
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(4);
    await expect(page.getByRole("alert").first()).toContainText(requiredMessage);
    await page.getByLabel(kk ? /Бағыт/ : /Направление/).selectOption("confectioner");
    await page.getByLabel(kk ? /^Аты/ : /^Имя/).fill(kk ? "Сынақ" : "Тест");
    await page.getByLabel(/^Телефон/).fill("-------");
    await page.getByLabel(kk ? /^Қала/ : /^Город/).fill("Шымкент");
    await page.getByLabel(kk ? "Өзіңіз туралы" : "О себе").fill(kk ? "Тәжірибем бар" : "Есть опыт");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(page.getByRole("alert")).toHaveCount(1);
    await expect(page.getByRole("alert")).toContainText(invalidPhoneMessage);

    await page.getByLabel(/^Телефон/).fill("+7 700 000 00 00");
    await page.getByRole("button", { name: submitLabel }).click();
    await expect(
      page.getByText(
        kk
          ? "Дайын мәтінді тексеріп, оны WhatsApp арқылы жіберіңіз — содан кейін ғана жауабыңыз менеджерге түседі."
          : "Проверьте готовый текст и отправьте его в WhatsApp — только после этого отклик поступит менеджеру.",
        { exact: true },
      ),
    ).toBeVisible();
    const href = (await page.getByRole("link", { name: openLabel }).getAttribute("href")) ?? "";
    const payload = decodeURIComponent(href);
    expect(payload).toContain(kk ? "Бос жұмыс орнына жауап" : "Отклик на вакансию");
    expect(payload).toContain(kk ? "Бағыт: Кондитер / Наубайшы" : "Направление: Кондитер / Пекарь");
    expect(payload).toContain("Шымкент");
    expect(payload).toContain(kk ? "Өзі туралы: Тәжірибем бар" : "О себе: Есть опыт");
    await expect.poll(async () => (await recordedPopupUrls(page)).length).toBe(1);
    expect((await recordedPopupUrls(page))[0]).toBe(href);
  });
}

for (const locale of ["ru", "kk"] as const) {
  test(`${locale.toUpperCase()} cake preorder completes all eleven steps`, async ({ page }) => {
    await disableExternalPopups(page);
    await page.goto(locale === "kk" ? "/kk/cake-preorder" : "/cake-preorder");
    const payload = await completeCakePreorder(page, locale);
    await expect(
      page.getByText(
        locale === "kk"
          ? "Дайын мәтінді тексеріп, WhatsApp-та «Жіберу» түймесін басыңыз. Өтінім содан кейін ғана менеджерге беріледі."
          : "Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого заявка будет передана менеджеру.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect.poll(async () => (await recordedPopupUrls(page)).length).toBe(1);
    expect(decodeURIComponent((await recordedPopupUrls(page))[0])).toBe(payload);
    if (locale === "kk") {
      expect(payload).toContain("Түрі: Сникерс");
      expect(payload).toContain("Қаптама: Стандартты қорап");
      expect(payload).toContain("Пікір: Сегіз порция");
    } else {
      expect(payload).toContain("Тип: Сникерс");
      expect(payload).toContain("Упаковка: Стандартная коробка");
      expect(payload).toContain("Комментарий: Восемь порций");
    }
  });
}

test("Kazakh cake form exposes localized invalid-number and invalid-date errors", async ({
  page,
}) => {
  await page.goto("/kk/cake-preorder");
  await page
    .getByRole("group", { name: "Торт түрі" })
    .getByRole("button", { name: "Сникерс" })
    .click();
  await page.getByRole("button", { name: "Келесі" }).click();
  await page
    .getByRole("group", { name: "Шамамен өлшемі" })
    .getByRole("button", { name: "1 кг" })
    .click();
  await page.getByRole("button", { name: "Келесі" }).click();
  await page.getByLabel("Порция саны").fill("0");
  await expect(page.getByRole("alert")).toHaveText("Нөлден үлкен санды көрсетіңіз");
  await expect(page.getByRole("button", { name: "Келесі" })).toBeDisabled();
  await page.getByLabel("Порция саны").fill("8");
  await page.getByRole("button", { name: "Келесі" }).click();
  await page.getByLabel("Іс-шара күні").fill("2000-01-01");
  await expect(page.getByRole("alert")).toHaveText("Бүгінгі немесе кейінгі күнді таңдаңыз");
  await expect(page.getByRole("button", { name: "Келесі" })).toBeDisabled();
});

test("Russian and Kazakh product SEO and JSON-LD are reciprocal and localized", async ({
  page,
}) => {
  for (const locale of ["ru", "kk"] as const) {
    const path = locale === "kk" ? "/kk/catalog/tort-praga" : "/catalog/tort-praga";
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://sofiyabakery.com${path}`,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="ru-KZ"]')).toHaveAttribute(
      "href",
      "https://sofiyabakery.com/catalog/tort-praga",
    );
    await expect(page.locator('link[rel="alternate"][hreflang="kk-KZ"]')).toHaveAttribute(
      "href",
      "https://sofiyabakery.com/kk/catalog/tort-praga",
    );
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
      "href",
      "https://sofiyabakery.com/catalog/tort-praga",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "product");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://sofiyabakery.com${path}`,
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", /SOFIYA/);

    const schemas = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).map((text) => JSON.parse(text) as Record<string, unknown>);
    const product = schemas.find((schema) => schema["@type"] === "Product");
    const breadcrumbs = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    expect(product?.inLanguage).toBe(locale === "kk" ? "kk-KZ" : "ru-KZ");
    expect(breadcrumbs?.inLanguage).toBe(locale === "kk" ? "kk-KZ" : "ru-KZ");
    const items = breadcrumbs?.itemListElement as Array<{ name: string }>;
    expect(items.map(({ name }) => name)).toEqual(
      locale === "kk"
        ? ["Басты бет", "Каталог", "«Прага» торты"]
        : ["Главная", "Каталог", "Торт «Прага»"],
    );
  }
});

test("Kazakh static SEO includes description, Open Graph, Twitter and x-default", async ({
  page,
}) => {
  await page.goto("/kk/about", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle("SOFIYA туралы");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /SOFIYA тарихы/,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "kk_KZ");
  await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute(
    "content",
    "ru_KZ",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://sofiyabakery.com/kk/about",
  );
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    "content",
    /SOFIYA тарихы/,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    "href",
    "https://sofiyabakery.com/about",
  );
});

test("Kazakh 404 and missing detail routes keep status, language and noindex", async ({ page }) => {
  for (const path of [
    "/kk/never-existed",
    "/kk/catalog/missing-product",
    "/kk/news/missing-news",
    "/kk/promotions/missing-promotion",
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "kk-KZ");
    await expect(page).toHaveTitle(/Бет табылмады/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  }
});

for (const locale of ["ru", "kk"] as const) {
  for (const width of [320, 375, 768, 1440] as const) {
    test(`${locale.toUpperCase()} all 70 sitemap routes render without errors or overflow at ${width}px`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name.includes("mobile"), "explicit viewport matrix runs once");
      testInfo.setTimeout(180_000);
      const allRoutes = await sitemapReviewRoutes(page);
      const reviewRoutes = allRoutes.filter((path) =>
        locale === "kk"
          ? path === "/kk" || path.startsWith("/kk/")
          : path !== "/kk" && !path.startsWith("/kk/"),
      );
      expect(reviewRoutes).toHaveLength(70);
      const errors = collectBrowserErrors(page);
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });

      for (const path of reviewRoutes) {
        errors.length = 0;
        const response = await page.goto(path, { waitUntil: "load" });
        expect(response?.status(), path).toBe(200);
        await expect(page.locator("main")).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute(
          "lang",
          locale === "kk" ? "kk-KZ" : "ru-KZ",
        );
        const overflow = await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          return document.documentElement.scrollWidth - window.innerWidth;
        });
        expect(overflow, `${path}: horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
        expect(errors, `${path}: browser errors at ${width}px`).toEqual([]);
      }
    });
  }
}

test("required Kazakh glyphs render in the configured font stack", async ({ page }) => {
  await page.goto("/kk");
  const fontEvidence = await page.evaluate(async () => {
    const requiredGlyphs = "Ә ә Ғ ғ Қ қ Ң ң Ө ө Ұ ұ Ү ү Һ һ І і";
    const glyphs = document.createElement("span");
    glyphs.id = "kk-glyph-proof";
    glyphs.textContent = requiredGlyphs;
    glyphs.style.cssText =
      "position:fixed;left:8px;top:8px;z-index:9999;background:white;color:black;font:20px Inter,sans-serif";
    document.body.append(glyphs);
    const familyEvidence = {
      Inter: { weights: [400, 500, 600, 700], sample: requiredGlyphs },
      "Playfair Display": { weights: [500, 600, 700], sample: "SOFIYA АБВГД" },
    };
    const loads: Record<
      string,
      Array<{
        weight: number;
        faces: Array<{
          family: string;
          weight: string;
          status: FontFaceLoadStatus;
          unicodeRange: string;
        }>;
      }>
    > = {};
    for (const [family, { weights, sample }] of Object.entries(familyEvidence)) {
      loads[family] = [];
      for (const weight of weights) {
        const faces = await document.fonts.load(`${weight} 20px "${family}"`, sample);
        loads[family].push({
          weight,
          faces: faces.map((face) => ({
            family: face.family.replaceAll('"', ""),
            weight: face.weight,
            status: face.status,
            unicodeRange: face.unicodeRange,
          })),
        });
      }
    }
    await document.fonts.ready;
    return {
      configuredFamily: getComputedStyle(glyphs).fontFamily,
      headingFamily: getComputedStyle(document.querySelector("h1") as HTMLElement).fontFamily,
      requiredCodePoints: [...requiredGlyphs]
        .filter((glyph) => glyph !== " ")
        .map((glyph) => glyph.codePointAt(0) as number),
      families: Object.fromEntries(
        Object.entries(familyEvidence).map(([family, { weights, sample }]) => [
          family,
          {
            loads: loads[family],
            requiredWeightsReady: weights.every((weight) =>
              document.fonts.check(`${weight} 20px "${family}"`, sample),
            ),
            loadedFaces: [...document.fonts].filter(
              (face) => face.family.replaceAll('"', "") === family && face.status === "loaded",
            ).length,
          },
        ]),
      ),
    };
  });
  await expect(page.locator("#kk-glyph-proof")).toBeVisible();
  expect(fontEvidence.configuredFamily).toContain("Inter");
  expect(fontEvidence.headingFamily).toContain("Inter");
  const rangeIncludes = (rangeList: string, codePoint: number) =>
    rangeList.split(",").some((rawRange) => {
      const range = rawRange.trim().toUpperCase().replace(/^U\+/, "");
      if (range.includes("?")) {
        const first = Number.parseInt(range.replaceAll("?", "0"), 16);
        const last = Number.parseInt(range.replaceAll("?", "F"), 16);
        return codePoint >= first && codePoint <= last;
      }
      const [firstHex, lastHex = firstHex] = range.split("-");
      const first = Number.parseInt(firstHex, 16);
      const last = Number.parseInt(lastHex, 16);
      return codePoint >= first && codePoint <= last;
    });
  for (const family of ["Inter", "Playfair Display"]) {
    const evidence = fontEvidence.families[family];
    expect(evidence.requiredWeightsReady, family).toBe(true);
    expect(evidence.loadedFaces, family).toBeGreaterThan(0);
    for (const load of evidence.loads) {
      expect(load.faces.length, `${family} ${load.weight}: matched faces`).toBeGreaterThan(0);
      expect(
        load.faces.some(
          (face) =>
            face.family === family &&
            face.weight === String(load.weight) &&
            face.status === "loaded",
        ),
        `${family} ${load.weight}: exact loaded face`,
      ).toBe(true);
      if (family === "Inter") {
        for (const codePoint of fontEvidence.requiredCodePoints) {
          expect(
            load.faces.some((face) => rangeIncludes(face.unicodeRange, codePoint)),
            `${family} ${load.weight}: U+${codePoint.toString(16).toUpperCase()} coverage`,
          ).toBe(true);
        }
      }
    }
  }
  expect((await page.locator("#kk-glyph-proof").boundingBox())?.width).toBeGreaterThan(100);
});
