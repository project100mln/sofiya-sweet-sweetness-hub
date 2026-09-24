import { describe, expect, it } from "vitest";
import { categories, products } from "@/data/catalog";
import { stores } from "@/data/stores";
import { site, waLink } from "@/config/site";
import {
  catalogLandingPages,
  catalogLandingSlugs,
  isCatalogLandingSlug,
} from "@/data/catalog-landing-pages";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("public catalogue data", () => {
  it("uses unique stable identifiers and slugs", () => {
    expect(unique(products.map((product) => product.id))).toBe(true);
    expect(unique(products.map((product) => product.slug))).toBe(true);
    expect(unique(categories.map((category) => category.slug))).toBe(true);
    expect(unique(stores.map((store) => store.id))).toBe(true);
  });

  it("keeps published products complete and portable", () => {
    for (const product of products.filter((item) => item.isPublished)) {
      expect(product.name.trim()).not.toBe("");
      expect(product.shortDescription.trim()).not.toBe("");
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.images.every((image) => !image.includes("/__l5e/"))).toBe(true);
      expect(categories.some((category) => category.id === product.categoryId)).toBe(true);
    }
  });

  it("does not advertise empty catalogue categories", () => {
    for (const category of categories) {
      expect(
        products.some((product) => product.categoryId === category.id && product.isPublished),
      ).toBe(true);
    }
  });

  it("keeps every SEO category landing connected to live catalogue data", () => {
    expect(catalogLandingSlugs).toHaveLength(5);
    expect(unique([...catalogLandingSlugs])).toBe(true);

    for (const slug of catalogLandingSlugs) {
      const category = categories.find((item) => item.slug === slug);
      expect(category).toBeDefined();
      expect(isCatalogLandingSlug(slug)).toBe(true);
      expect(
        products.some((product) => product.categoryId === category?.id && product.isPublished),
      ).toBe(true);

      for (const locale of ["ru", "kk"] as const) {
        const copy = catalogLandingPages[slug][locale];
        expect(copy.title.trim()).not.toBe("");
        expect(copy.description.trim()).not.toBe("");
        expect(copy.heading.trim()).not.toBe("");
        expect(copy.paragraphs).toHaveLength(2);
        expect(copy.paragraphs.every((paragraph) => paragraph.trim().length > 40)).toBe(true);
      }
    }
  });

  it("keeps every public location actionable", () => {
    for (const store of stores) {
      expect(store.address.trim()).not.toBe("");
      expect(store.phone).toMatch(/^\+7/);
      expect(store.whatsapp).toMatch(/^7\d{10}$/);
      expect(store.workingHours).toMatch(/\d{2}:\d{2}/);
    }
  });

  it("creates an encoded WhatsApp hand-off", () => {
    const message = "Здравствуйте, SOFIYA! Торт «Прага»";
    const url = new URL(waLink(message));
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe(`/${site.whatsappDigits}`);
    expect(url.searchParams.get("text")).toBe(message);
  });
});
