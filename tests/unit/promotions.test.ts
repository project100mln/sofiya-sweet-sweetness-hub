import { describe, expect, it } from "vitest";
import {
  applyPromoCode,
  calculateDiscountAmount,
  isPromotionUsable,
  pickBestAutoDiscount,
} from "@/lib/promotions/pricing";
import type { Promotion } from "@/types/promotions";

const basePromotion: Promotion = {
  id: "promo-1",
  title: "Тестовая акция",
  description: null,
  image_url: null,
  is_active: true,
  start_date: "2026-08-01T00:00:00.000Z",
  end_date: "2026-08-31T23:59:59.000Z",
  applicable_stores: [1],
  discount_type: "percent",
  discount_value: { percent: 20 },
  promo_code_word: null,
  iiko_id: null,
};

const now = new Date("2026-08-16T10:00:00.000Z");

describe("promotion pricing", () => {
  it("caps discounts at the subtotal", () => {
    expect(calculateDiscountAmount(1_000, { amount: 2_000 })).toBe(1_000);
    expect(calculateDiscountAmount(1_000, { percent: -10 })).toBe(0);
  });

  it("rejects inactive, expired and wrong-store promotions", () => {
    expect(isPromotionUsable(basePromotion, 1, now)).toBe(true);
    expect(isPromotionUsable({ ...basePromotion, is_active: false }, 1, now)).toBe(false);
    expect(isPromotionUsable(basePromotion, 2, now)).toBe(false);
    expect(
      isPromotionUsable({ ...basePromotion, end_date: "2026-08-15T00:00:00.000Z" }, 1, now),
    ).toBe(false);
  });

  it("chooses the best automatic discount", () => {
    const fixed = {
      ...basePromotion,
      id: "promo-2",
      discount_type: "fixed_amount" as const,
      discount_value: { amount: 3_000 },
    };
    expect(pickBestAutoDiscount([basePromotion, fixed], 1, 10_000, now)?.promotionId).toBe(
      "promo-2",
    );
  });

  it("matches promo codes case-insensitively", () => {
    const coded = {
      ...basePromotion,
      discount_type: "promo_code" as const,
      promo_code_word: "SWEET15",
      discount_value: { percent: 15 },
    };
    expect(applyPromoCode([coded], " sweet15 ", 1, 10_000, now)).toMatchObject({ ok: true });
  });
});
