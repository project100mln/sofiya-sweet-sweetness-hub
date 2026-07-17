export type DiscountType = "percent" | "fixed_amount" | "promo_code";

export interface HappyHoursWindow {
  /** "HH:mm", local time of the store/browser */
  from: string;
  to: string;
  /** 0 (Sun) – 6 (Sat). Omitted = applies every day. */
  days?: number[];
}

export interface DiscountValue {
  percent?: number;
  amount?: number;
  happy_hours?: HappyHoursWindow;
}

export interface Promotion {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  start_date: string;
  end_date: string;
  applicable_stores: number[];
  discount_type: DiscountType;
  discount_value: DiscountValue;
  promo_code_word: string | null;
  iiko_id: string | null;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AppliedPromotion {
  promotionId: string;
  title: string;
  discountType: DiscountType;
  discountAmount: number;
}

export interface PricingResult {
  subtotal: number;
  discountAmount: number;
  totalPrice: number;
  appliedPromotion: AppliedPromotion | null;
}

export interface OrderDTO {
  storeId: number;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  totalPrice: number;
  appliedPromotionId: string | null;
  /** Human-readable line for managers, e.g. "Промокод SWEET15 (-15%): -2 250 ₸" */
  appliedPromotionSummary: string | null;
  promoCodeEntered: string | null;
  createdAt: string;
}
