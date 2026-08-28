import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { categories, products } from "@/data/catalog";
import { CANDLES, CAKE_TYPES, PACKAGING, SIZES } from "@/data/cake-options";
import { SERVICES } from "@/data/catering-services";
import { featuredPromotions } from "@/data/featured-promotions";
import { STORE_CITIES, storeCityId } from "@/data/store-cities";
import { stores } from "@/data/stores";
import { formatDate, formatPrice, localizeHref, localizePath, localeFromPath } from "@/i18n";
import { getCatalog } from "@/i18n/catalog";
import { formatPromotionHours, getLocalizedContent, localizedSiteRegion } from "@/i18n/content";
import { uiMessages } from "@/i18n/messages";
import { getLocalizedRuntimePromotions } from "@/i18n/runtime-promotions";
import { dynamicSeoCopy, staticSeoCopy } from "@/i18n/seo";
import { isCalendarDateOnOrAfter, PHONE_REGEXP, todayInBusinessTimeZone } from "@/i18n/validation";
import type { Promotion } from "@/types/promotions";

function productBusinessShape(product: (typeof products)[number]) {
  return {
    id: product.id,
    slug: product.slug,
    categoryId: product.categoryId,
    price: product.price,
    variantPrices: product.variants?.map(({ price }) => price),
    images: product.images,
    isHero: product.isHero,
    isBestseller: product.isBestseller,
    isNew: product.isNew,
    isSeasonal: product.isSeasonal,
    isPreorder: product.isPreorder,
    isPublished: product.isPublished,
  };
}

function storeBusinessShape(store: (typeof stores)[number]) {
  return {
    id: store.id,
    slug: store.slug,
    phone: store.phone,
    whatsapp: store.whatsapp,
    workingHours: store.workingHours,
    latitude: store.latitude,
    longitude: store.longitude,
    mapUrl: store.mapUrl,
    serviceCount: store.services.length,
    image: store.image,
    isPublished: store.isPublished,
  };
}

function placeholderTokens(value: string): string[] {
  return value.match(/\{\{?\w+\}?\}|%\w|\$\{[^}]+\}/g)?.sort() ?? [];
}

function sourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.tsx?$/.test(entry.name) ? [target] : [];
  });
}

describe("Kazakh localization", () => {
  it("localizes all 53 products and 9 categories without a silent fallback", () => {
    const catalog = getCatalog("kk");
    expect(catalog.categories).toHaveLength(9);
    expect(catalog.products).toHaveLength(53);
    expect(catalog.products.every((product) => product.isPublished)).toBe(true);

    for (const category of catalog.categories) {
      expect(category.name.trim()).not.toBe("");
      expect(category.short.trim()).not.toBe("");
    }
    for (const product of catalog.products) {
      const localizedStrings = [
        product.name,
        product.shortDescription,
        product.fullDescription,
        product.weight,
        product.servings,
        product.shelfLife,
        product.storage,
        ...(product.ingredients ?? []),
        ...(product.allergens ?? []),
        ...(product.variants?.map(({ label }) => label) ?? []),
      ].filter((value): value is string => value != null);
      expect(
        localizedStrings.every((value) => value.trim().length > 0),
        product.id,
      ).toBe(true);
    }
  });

  it("preserves every catalogue business identifier, price, flag and image", () => {
    const ruCatalog = getCatalog("ru");
    const kkCatalog = getCatalog("kk");
    expect(kkCatalog.products.map(productBusinessShape)).toEqual(
      ruCatalog.products.map(productBusinessShape),
    );
    expect(kkCatalog.categories.map(({ id, slug, image }) => ({ id, slug, image }))).toEqual(
      categories.map(({ id, slug, image }) => ({ id, slug, image })),
    );
  });

  it("localizes all structured content while preserving business data", () => {
    const ru = getLocalizedContent("ru");
    const kk = getLocalizedContent("kk");
    expect(kk.stores).toHaveLength(17);
    expect(kk.news).toHaveLength(3);
    expect(kk.promotions).toHaveLength(2);
    expect(kk.stores.map(storeBusinessShape)).toEqual(ru.stores.map(storeBusinessShape));
    expect(
      kk.news.map(({ id, slug, category, date, cover, destination, isPublished }) => ({
        id,
        slug,
        category,
        date,
        cover,
        destination,
        isPublished,
      })),
    ).toEqual(
      ru.news.map(({ id, slug, category, date, cover, destination, isPublished }) => ({
        id,
        slug,
        category,
        date,
        cover,
        destination,
        isPublished,
      })),
    );
    expect(
      kk.promotions.map(
        ({
          id,
          slug,
          image_url,
          discount_type,
          discount_value,
          promo_code_word,
          image_has_discount_badge,
        }) => ({
          id,
          slug,
          image_url,
          discount_type,
          discount_value,
          promo_code_word,
          image_has_discount_badge,
        }),
      ),
    ).toEqual(
      featuredPromotions.map(
        ({
          id,
          slug,
          image_url,
          discount_type,
          discount_value,
          promo_code_word,
          image_has_discount_badge,
        }) => ({
          id,
          slug,
          image_url,
          discount_type,
          discount_value,
          promo_code_word,
          image_has_discount_badge,
        }),
      ),
    );
  });

  it("keeps form and service IDs stable with complete bilingual labels", () => {
    for (const option of [...CAKE_TYPES, ...SIZES, ...CANDLES, ...PACKAGING]) {
      expect(option.id).toMatch(/^[a-z0-9-]+$/);
      expect(option.ru.trim()).not.toBe("");
      expect(option.kk.trim()).not.toBe("");
    }
    expect(CAKE_TYPES.map(({ id }) => id)).toEqual(["snickers", "custom"]);
    for (const service of SERVICES) {
      expect(service.id).toMatch(/^[a-z0-9-]+$/);
      expect(service.ru.t.trim()).not.toBe("");
      expect(service.ru.d.trim()).not.toBe("");
      expect(service.kk.t.trim()).not.toBe("");
      expect(service.kk.d.trim()).not.toBe("");
    }
  });

  it("uses stable city IDs, exact counts and approved city labels", () => {
    expect(STORE_CITIES).toEqual([
      { id: "shymkent", ru: "Шымкент", kk: "Шымкент" },
      { id: "lenger", ru: "Ленгер", kk: "Леңгір" },
      { id: "mankent", ru: "Манкент", kk: "Манкент" },
      { id: "aksukent", ru: "Аксукент", kk: "Ақсукент" },
    ]);
    expect(
      Object.fromEntries(
        STORE_CITIES.map((city) => [
          city.id,
          stores.filter((store) => storeCityId(store.city) === city.id).length,
        ]),
      ),
    ).toEqual({ shymkent: 11, lenger: 3, aksukent: 2, mankent: 1 });
  });

  it("keeps the typed UI registry complete, non-empty and placeholder-safe", () => {
    const keys = Object.keys(uiMessages);
    expect(keys.length).toBeGreaterThan(250);
    for (const key of keys) {
      const message = uiMessages[key as keyof typeof uiMessages];
      expect(message.ru).toBe(key);
      expect(message.ru.trim()).not.toBe("");
      expect(message.kk.trim()).not.toBe("");
      expect(placeholderTokens(message.kk)).toEqual(placeholderTokens(message.ru));
    }
  });

  it("uses only one typed literal key per t() call and registers every used key", () => {
    const usedKeys = new Set<string>();
    const violations: string[] = [];
    for (const file of sourceFiles(path.join(process.cwd(), "src"))) {
      if (file.endsWith(`${path.sep}messages.ts`)) continue;
      const sourceText = fs.readFileSync(file, "utf8");
      const source = ts.createSourceFile(
        file,
        sourceText,
        ts.ScriptTarget.Latest,
        true,
        file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const visit = (node: ts.Node) => {
        if (
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === "t"
        ) {
          const position = source.getLineAndCharacterOfPosition(node.getStart());
          const location = `${path.relative(process.cwd(), file)}:${position.line + 1}`;
          if (node.arguments.length !== 1 || !ts.isStringLiteralLike(node.arguments[0])) {
            violations.push(`${location}: t() must receive one literal registry key`);
          } else {
            usedKeys.add(node.arguments[0].text);
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    expect(violations).toEqual([]);
    expect([...usedKeys].sort()).toEqual(Object.keys(uiMessages).sort());
  });

  it("has complete bilingual SEO copy for every static route", () => {
    expect(Object.keys(staticSeoCopy)).toHaveLength(12);
    for (const copy of Object.values(staticSeoCopy)) {
      for (const locale of ["ru", "kk"] as const) {
        expect(copy[locale].title.trim()).not.toBe("");
        expect(copy[locale].description.trim()).not.toBe("");
      }
    }
  });

  it("keeps all dynamic SEO framing in one placeholder-safe bilingual registry", () => {
    expect(Object.keys(dynamicSeoCopy)).toEqual(["product", "news", "promotion"]);
    for (const copy of Object.values(dynamicSeoCopy)) {
      expect(Object.keys(copy.kk)).toEqual(Object.keys(copy.ru));
      for (const key of Object.keys(copy.ru) as Array<keyof typeof copy.ru>) {
        expect(copy.ru[key].trim()).not.toBe("");
        expect(copy.kk[key].trim()).not.toBe("");
        expect(placeholderTokens(copy.kk[key])).toEqual(placeholderTokens(copy.ru[key]));
      }
    }
  });

  it("keeps the translator register semantic, hero-complete and legal-review routable", () => {
    const register = fs
      .readFileSync(path.join(process.cwd(), "docs/i18n/KK_TRANSLATION_REGISTER.tsv"), "utf8")
      .trimEnd()
      .split("\n")
      .slice(1)
      .map((line) => {
        const [section, context, id, ru, kk, status] = line.split("\t");
        return { section, context, id, ru, kk, status };
      });

    expect(register.filter((row) => row.section === "hero")).toHaveLength(25);
    expect(register.filter((row) => row.section === "error-page")).toHaveLength(4);
    expect(register.filter((row) => row.section === "dynamic-seo")).toHaveLength(
      Object.values(dynamicSeoCopy).reduce((count, copy) => count + Object.keys(copy.ru).length, 0),
    );
    expect(register.filter((row) => row.context === "src/i18n/core.ts#monthNames")).toHaveLength(
      12,
    );
    expect(
      register.filter(
        (row) =>
          /src\/routes\/(?:cake-preorder|career|catering|contacts)\.tsx/.test(row.context) &&
          ((row.section === "conditional-ui" && row.ru.includes("\\nТелефон:")) ||
            (row.section === "ui-message" && row.id.startsWith("Проверьте готовый текст"))),
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: "DRAFT_REQUIRES_KK_LEGAL_AND_EDITORIAL" }),
      ]),
    );
    const legalFormRows = register.filter(
      (row) =>
        /src\/routes\/(?:cake-preorder|career|catering|contacts)\.tsx/.test(row.context) &&
        ((row.section === "conditional-ui" && row.ru.includes("\\nТелефон:")) ||
          (row.section === "ui-message" && row.id.startsWith("Проверьте готовый текст"))),
    );
    expect(legalFormRows).toHaveLength(8);
    expect(
      legalFormRows.every((row) => row.status === "DRAFT_REQUIRES_KK_LEGAL_AND_EDITORIAL"),
    ).toBe(true);
    expect(register.some((row) => /(?:^|\s)(?:bg|text|rounded)-[^\s]+/.test(row.ru))).toBe(false);
  });

  it("formats dates and prices exactly for both Kazakhstan locales", () => {
    expect(formatPrice(4990, "ru")).toBe("4 990");
    expect(formatPrice(4990, "kk")).toBe("4 990");
    expect(formatDate("2026-06-15", "ru")).toBe("15 июня 2026 г.");
    expect(formatDate("2026-06-15", "kk")).toBe("2026 ж. 15 маусым");
    expect(
      Array.from({ length: 12 }, (_, month) =>
        formatDate(`2026-${String(month + 1).padStart(2, "0")}-01`, "ru"),
      ),
    ).toEqual([
      "1 января 2026 г.",
      "1 февраля 2026 г.",
      "1 марта 2026 г.",
      "1 апреля 2026 г.",
      "1 мая 2026 г.",
      "1 июня 2026 г.",
      "1 июля 2026 г.",
      "1 августа 2026 г.",
      "1 сентября 2026 г.",
      "1 октября 2026 г.",
      "1 ноября 2026 г.",
      "1 декабря 2026 г.",
    ]);
    expect(
      Array.from({ length: 12 }, (_, month) =>
        formatDate(`2026-${String(month + 1).padStart(2, "0")}-01`, "kk"),
      ),
    ).toEqual([
      "2026 ж. 1 қаңтар",
      "2026 ж. 1 ақпан",
      "2026 ж. 1 наурыз",
      "2026 ж. 1 сәуір",
      "2026 ж. 1 мамыр",
      "2026 ж. 1 маусым",
      "2026 ж. 1 шілде",
      "2026 ж. 1 тамыз",
      "2026 ж. 1 қыркүйек",
      "2026 ж. 1 қазан",
      "2026 ж. 1 қараша",
      "2026 ж. 1 желтоқсан",
    ]);
    expect(() => formatDate("not-a-date", "kk")).toThrow(RangeError);
    expect(localizedSiteRegion("ru")).toBe(site.region);
    expect(localizedSiteRegion("kk")).toBe("Шымкент және Түркістан облысы");
    expect(formatPromotionHours({ from: "20:00", to: "22:00" }, "ru")).toBe(
      "Ежедневно с 20:00 до 22:00",
    );
    expect(formatPromotionHours({ from: "20:00", to: "22:00" }, "kk")).toBe(
      "Күн сайын 20:00–22:00",
    );
  });

  it("validates dates in Almaty business time and rejects impossible dates", () => {
    expect(todayInBusinessTimeZone(new Date("2026-01-01T18:59:59Z"))).toBe("2026-01-01");
    expect(todayInBusinessTimeZone(new Date("2026-01-01T19:00:00Z"))).toBe("2026-01-02");
    expect(isCalendarDateOnOrAfter("2026-02-29", "2026-01-01")).toBe(false);
    expect(isCalendarDateOnOrAfter("2028-02-29", "2026-01-01")).toBe(true);
    expect(isCalendarDateOnOrAfter("2025-12-31", "2026-01-01")).toBe(false);
  });

  it("requires a plausible phone number instead of punctuation-only input", () => {
    expect(PHONE_REGEXP.test("+7 700 000 00 00")).toBe(true);
    expect(PHONE_REGEXP.test("-------")).toBe(false);
    expect(PHONE_REGEXP.test("123456")).toBe(false);
    expect(PHONE_REGEXP.test("+7 hello")).toBe(false);
  });

  it("keeps source-locale runtime promotions and hides them from Kazakh until reviewed", () => {
    const unknown: Promotion = {
      id: "runtime-unreviewed",
      title: "Новая акция",
      description: "Должна остаться на русском и ждать казахского перевода.",
      image_url: null,
      is_active: true,
      start_date: "2026-08-01",
      end_date: "2026-09-01",
      applicable_stores: [],
      discount_type: "percent",
      discount_value: { percent: 10 },
      promo_code_word: null,
      iiko_id: null,
    };
    expect(getLocalizedRuntimePromotions([unknown], "ru")).toEqual([unknown]);
    expect(getLocalizedRuntimePromotions([unknown], "kk")).toEqual([]);
  });

  it("builds reversible locale paths and preserves URL state", () => {
    expect(localeFromPath("/kk/catalog")).toBe("kk");
    expect(localeFromPath("/catalog")).toBe("ru");
    expect(localizePath("/catalog", "kk")).toBe("/kk/catalog");
    expect(localizePath("/kk/catalog", "ru")).toBe("/catalog");
    expect(localizeHref("/catalog?cat=cakes#menu", "kk")).toBe("/kk/catalog?cat=cakes#menu");
    expect(localizePath("//evil.example", "ru")).toBe("/evil.example");
    expect(localizePath("/kk//evil.example", "ru")).toBe("/evil.example");
    expect(localizePath("//evil.example", "kk")).toBe("/kk/evil.example");
  });
});
