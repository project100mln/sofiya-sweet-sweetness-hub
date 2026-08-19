import { expect, test } from "@playwright/test";

const routes = [
  "/",
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
];

for (const path of routes) {
  test(`${path} renders without browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("catalog filters and opens a product", async ({ page }) => {
  await page.goto("/catalog", { waitUntil: "networkidle" });
  const search = page.getByPlaceholder("Поиск по каталогу…");
  await search.fill("Прага");
  await expect(page.getByRole("link", { name: /Прага/i }).first()).toBeVisible();
  await page.getByRole("link", { name: /Прага/i }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Прага");
});

test("catalog applies filters and price sorting", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "desktop filters are covered here");
  await page.goto("/catalog", { waitUntil: "networkidle" });

  await page.getByLabel("Бестселлеры").check();
  await expect(page.getByTestId("product-card")).toHaveCount(1);

  await page.getByLabel("Бестселлеры").uncheck();
  await page.getByRole("combobox").selectOption("price-asc");
  await expect(page).toHaveURL(/sort=price-asc/);
  const prices = (await page.getByTestId("product-price").allTextContents()).map((price) =>
    Number(price.replace(/\D/g, "")),
  );
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test("mobile navigation opens, shows links, and closes", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "mobile project only");
  await page.goto("/");
  await page.getByRole("button", { name: "Меню" }).click();

  const navigation = page.getByRole("dialog", { name: "Навигация" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Каталог" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Instagram/ })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
});

test("contact form prepares an honest WhatsApp hand-off", async ({ page }) => {
  await page.goto("/contacts");
  const popupPromise = page.waitForEvent("popup");
  await page.getByLabel("Имя *").fill("Тест");
  await page.getByLabel("Телефон *").fill("+7 700 000 00 00");
  await page.getByLabel("Сообщение *").fill("Проверка формы");
  await page.getByRole("button", { name: "Перейти в WhatsApp" }).click();
  const popup = await popupPromise;
  await popup.close();

  await expect(page.getByText("Сообщение подготовлено")).toBeVisible();
  const retryLink = page.getByRole("link", { name: "Открыть WhatsApp" });
  await expect(retryLink).toHaveAttribute("href", /wa\.me\/77075580605/);
  await expect(retryLink).toHaveAttribute("href", /%D0%A2%D0%B5%D1%81%D1%82/);
});

test("public contact links use confirmed external channels", async ({ page }) => {
  await page.goto("/contacts");
  await expect(page.getByRole("link", { name: /WhatsApp/ }).first()).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/77075580605/,
  );
  await expect(page.getByRole("link", { name: /Instagram/ }).first()).toHaveAttribute(
    "href",
    "https://www.instagram.com/sofiya_sweet.kz",
  );
});

test("promotions page shows the approved happy-hours offers", async ({ page }) => {
  await page.goto("/promotions", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Самсы с фаршем" })).toBeVisible();
  await expect(page.getByText(/Сочная мясная начинка в хрустящем тесте/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Три вида выпечки" })).toBeVisible();
  await expect(page.getByText(/Нежное, воздушное тесто/)).toBeVisible();
  await expect(page.getByAltText("Самсы с фаршем")).toBeVisible();
  await expect(page.getByAltText("Три вида выпечки")).toBeVisible();
  await expect(page.getByText(/Самса мини, Самса №1 и Самса пармуда/)).toBeVisible();

  await page.getByRole("link", { name: /Подробнее об акции «Самсы с фаршем»/ }).click();
  await expect(page).toHaveURL(/\/promotions\/samsa-happy-hours$/);
  await expect(page.getByRole("heading", { level: 1, name: "Самсы с фаршем" })).toBeVisible();
  await expect(page.getByText("Самса мини", { exact: true })).toBeVisible();
  await expect(page.getByText("Самса №1", { exact: true })).toBeVisible();
  await expect(page.getByText("Самса пармуда", { exact: true })).toBeVisible();
});

test("home news cards open their intended destinations", async ({ page }, testInfo) => {
  if (testInfo.project.name.includes("mobile")) {
    await page.emulateMedia({ reducedMotion: "reduce" });
  }

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("link", { name: "Все акции" })).toHaveAttribute(
    "href",
    "/promotions",
  );
  await expect(page.getByTestId("news-card-n-club")).toHaveAttribute("href", "/#loyalty");
  await expect(page.getByTestId("news-card-n-cake-preorder")).toHaveAttribute(
    "href",
    "/cake-preorder",
  );
  await expect(page.getByTestId("news-card-n-network")).toHaveAttribute("href", "/stores");

  await page.getByTestId("news-card-n-club").click();
  await expect(page).toHaveURL(/\/#loyalty$/);
  await expect(page.getByTestId("loyalty-section")).toBeInViewport();
  await expect(page.getByTestId("loyalty-story-card")).toBeVisible();
  await expect(page.getByTestId("loyalty-phone-scene")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Ваш 6-й кофе/ })).toBeVisible();
  await expect(page.getByTestId("loyalty-sixth-stamp")).toBeVisible();
  await expect(page.getByTestId("loyalty-reminder-link")).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/77075580605/,
  );

  if (testInfo.project.name.includes("mobile")) {
    const cardBox = await page.getByTestId("loyalty-story-card").boundingBox();
    const phoneBox = await page.getByTestId("loyalty-phone-scene").boundingBox();
    expect(cardBox).not.toBeNull();
    expect(phoneBox).not.toBeNull();
    expect(
      Math.abs(cardBox!.x + cardBox!.width / 2 - (phoneBox!.x + phoneBox!.width / 2)),
    ).toBeLessThan(2);
    expect(phoneBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
    expect(phoneBox!.x + phoneBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width);
  }

  const phone = page.getByTestId("loyalty-phone-scene");
  const beforeReplay = await phone.evaluate((element) => getComputedStyle(element).transform);
  await page.getByTestId("loyalty-play-button").click();
  await page.waitForTimeout(320);
  const duringReplay = await phone.evaluate((element) => getComputedStyle(element).transform);
  expect(duringReplay).not.toBe(beforeReplay);

  await page.goto("/");
  await page.getByTestId("news-card-n-cake-preorder").click();
  await expect(page).toHaveURL(/\/cake-preorder$/);

  await page.goto("/");
  await page.getByTestId("news-card-n-network").click();
  await expect(page).toHaveURL(/\/stores$/);
});

test("unknown route returns the designed 404", async ({ page }) => {
  const response = await page.goto("/never-existed");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Страница не найдена" })).toBeVisible();
});

test("breakfast hero uses the approved brand hierarchy", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/", { waitUntil: "networkidle" });
  const hero = page.locator("main section").first();
  await hero.getByRole("button", { name: "Слайд 3" }).click();

  const eyebrow = hero.getByText("Завтраки", { exact: true }).first();
  const heading = hero.getByRole("heading", {
    level: 1,
    name: "Утро начинается вкусно",
  });
  const description = hero.getByText(
    "Свежий кофе, тёплая выпечка и лёгкие завтраки — каждый день.",
  );
  const menuLink = hero.getByRole("link", { name: /Посмотреть меню/ });
  const storeLink = hero.getByRole("link", { name: "Найти магазин" });

  await expect(eyebrow).toBeVisible();
  await expect(heading).toBeVisible();
  await expect(description).toBeVisible();
  await expect(menuLink).toHaveAttribute("href", /cat=breakfast/);
  await expect(storeLink).toHaveAttribute("href", "/stores");
  expect(errors).toEqual([]);
});
