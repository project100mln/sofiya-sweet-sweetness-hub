import type {
  AppliedPromotion,
  CartItem,
  DiscountValue,
  HappyHoursWindow,
  Promotion,
  PricingResult,
} from "@/types/promotions";

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function isWithinDateWindow(promotion: Promotion, now: Date): boolean {
  return new Date(promotion.start_date) <= now && now <= new Date(promotion.end_date);
}

function isWithinHappyHours(window: HappyHoursWindow, now: Date): boolean {
  if (window.days && !window.days.includes(now.getDay())) return false;

  const [fromH, fromM] = window.from.split(":").map(Number);
  const [toH, toM] = window.to.split(":").map(Number);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const fromMinutes = fromH * 60 + fromM;
  const toMinutes = toH * 60 + toM;

  // Support windows that cross midnight, e.g. 20:00 -> 02:00.
  if (fromMinutes <= toMinutes) {
    return nowMinutes >= fromMinutes && nowMinutes < toMinutes;
  }
  return nowMinutes >= fromMinutes || nowMinutes < toMinutes;
}

/** Active window, target store, and (if present) happy-hours time gate all satisfied. */
export function isPromotionUsable(promotion: Promotion, storeId: number, now: Date): boolean {
  if (!promotion.is_active) return false;
  if (!promotion.applicable_stores.includes(storeId)) return false;
  if (!isWithinDateWindow(promotion, now)) return false;

  const window = promotion.discount_value.happy_hours;
  if (window && !isWithinHappyHours(window, now)) return false;

  return true;
}

export function calculateDiscountAmount(subtotal: number, discountValue: DiscountValue): number {
  const raw =
    discountValue.percent != null
      ? subtotal * (discountValue.percent / 100)
      : (discountValue.amount ?? 0);

  return Math.min(Math.max(raw, 0), subtotal);
}

function toApplied(promotion: Promotion, discountAmount: number): AppliedPromotion {
  return {
    promotionId: promotion.id,
    title: promotion.title,
    discountType: promotion.discount_type,
    discountAmount,
  };
}

/**
 * Best automatic discount for the cart: storewide 'percent'/'fixed_amount' promotions,
 * including happy-hours ones once the time window is open. Promo codes never auto-apply.
 */
export function pickBestAutoDiscount(
  promotions: Promotion[],
  storeId: number,
  subtotal: number,
  now: Date = new Date(),
): AppliedPromotion | null {
  let best: AppliedPromotion | null = null;

  for (const promotion of promotions) {
    if (promotion.discount_type === "promo_code") continue;
    if (!isPromotionUsable(promotion, storeId, now)) continue;

    const discountAmount = calculateDiscountAmount(subtotal, promotion.discount_value);
    if (!best || discountAmount > best.discountAmount) {
      best = toApplied(promotion, discountAmount);
    }
  }

  return best;
}

export type PromoCodeResult =
  | { ok: true; applied: AppliedPromotion }
  | { ok: false; error: "not_found" | "expired_or_inactive" };

/** Validates a promo code typed in the cart and computes the resulting discount. */
export function applyPromoCode(
  promotions: Promotion[],
  code: string,
  storeId: number,
  subtotal: number,
  now: Date = new Date(),
): PromoCodeResult {
  const normalized = code.trim().toLowerCase();
  const match = promotions.find(
    (p) => p.discount_type === "promo_code" && p.promo_code_word?.toLowerCase() === normalized,
  );

  if (!match) return { ok: false, error: "not_found" };
  if (!isPromotionUsable(match, storeId, now)) return { ok: false, error: "expired_or_inactive" };

  const discountAmount = calculateDiscountAmount(subtotal, match.discount_value);
  return { ok: true, applied: toApplied(match, discountAmount) };
}

/**
 * Full cart pricing pass. If a promo code is supplied and valid it wins outright
 * (explicit user intent beats an auto-applied storewide/happy-hours discount);
 * otherwise the best automatic promotion, if any, is applied.
 */
export function priceCart(
  items: CartItem[],
  promotions: Promotion[],
  storeId: number,
  promoCode: string | null,
  now: Date = new Date(),
): PricingResult {
  const subtotal = cartSubtotal(items);

  const promoCodeResult = promoCode
    ? applyPromoCode(promotions, promoCode, storeId, subtotal, now)
    : null;

  const applied = promoCodeResult?.ok
    ? promoCodeResult.applied
    : pickBestAutoDiscount(promotions, storeId, subtotal, now);

  const discountAmount = applied?.discountAmount ?? 0;

  return {
    subtotal,
    discountAmount,
    totalPrice: subtotal - discountAmount,
    appliedPromotion: applied,
  };
}
