import type { CartItem, OrderDTO, Promotion } from "@/types/promotions";
import { priceCart } from "./pricing";

const formatMoney = (amount: number) => `${amount.toLocaleString("ru-RU")} ₸`;

function summarize(promotion: Promotion, discountAmount: number): string {
  const label =
    promotion.discount_type === "promo_code" && promotion.promo_code_word
      ? `Промокод «${promotion.promo_code_word}»`
      : promotion.title;

  return `${label}: -${formatMoney(discountAmount)}`;
}

/** Builds the payload persisted with an order — discount is pre-computed and human-readable for managers. */
export function buildOrderDTO(
  items: CartItem[],
  promotions: Promotion[],
  storeId: number,
  promoCode: string | null,
  now: Date = new Date(),
): OrderDTO {
  const { subtotal, discountAmount, totalPrice, appliedPromotion } = priceCart(
    items,
    promotions,
    storeId,
    promoCode,
    now,
  );

  const promotion = appliedPromotion
    ? promotions.find((p) => p.id === appliedPromotion.promotionId)
    : undefined;

  return {
    storeId,
    items,
    subtotal,
    discountAmount,
    totalPrice,
    appliedPromotionId: appliedPromotion?.promotionId ?? null,
    appliedPromotionSummary:
      promotion && appliedPromotion ? summarize(promotion, appliedPromotion.discountAmount) : null,
    promoCodeEntered: promoCode?.trim() || null,
    createdAt: now.toISOString(),
  };
}
