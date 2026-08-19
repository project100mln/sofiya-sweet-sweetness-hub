import samsaHappyHours from "@/assets/promotions/samsa-happy-hours.webp";
import pastryHappyHours from "@/assets/promotions/pastry-happy-hours.webp";
import type { PromotionCardContent } from "@/types/promotions";

const sharedPromotionFields = {
  discount_type: "percent" as const,
  discount_value: {
    percent: 20,
    happy_hours: { from: "20:00", to: "22:00" },
  },
  promo_code_word: null,
  image_has_discount_badge: true as const,
};

export const featuredPromotions: PromotionCardContent[] = [
  {
    ...sharedPromotionFields,
    id: "featured-samsa-happy-hours",
    slug: "samsa-happy-hours",
    title: "Самсы с фаршем",
    description:
      "Сочная мясная начинка в хрустящем тесте. Традиционный вкус, который хочется повторять. В акции участвуют: Самса мини, Самса №1 и Самса пармуда.",
    product_names: ["Самса мини", "Самса №1", "Самса пармуда"],
    image_url: samsaHappyHours,
  },
  {
    ...sharedPromotionFields,
    id: "featured-pastry-happy-hours",
    slug: "pastry-happy-hours",
    title: "Три вида выпечки",
    description:
      "Нежное, воздушное тесто, приготовленное с любовью. Идеально к любому моменту. В акции участвуют: Булочка маковая, Круассан классический и Булочка с орехами.",
    product_names: ["Булочка маковая", "Круассан классический", "Булочка с орехами"],
    image_url: pastryHappyHours,
  },
];

export const getFeaturedPromotion = (slug: string) =>
  featuredPromotions.find((promotion) => promotion.slug === slug);
