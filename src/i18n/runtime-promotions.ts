import type { Locale } from "@/i18n";
import type { Promotion, PromotionCardContent } from "@/types/promotions";

interface RuntimePromotionTranslation {
  sourceTitle: string;
  kk: Pick<PromotionCardContent, "title" | "description">;
}

// Supabase currently has no localized columns. Russian remains the source locale,
// so its runtime promotions must keep working unchanged. Kazakh only receives a
// promotion after its stable ID, exact source title and Kazakh copy are reviewed.
export const runtimePromotionTranslations: Record<string, RuntimePromotionTranslation> = {};

export function getLocalizedRuntimePromotions(
  promotions: Promotion[],
  locale: Locale,
): PromotionCardContent[] {
  if (locale === "ru") return promotions;

  return promotions.flatMap((promotion) => {
    const translation = runtimePromotionTranslations[promotion.id];
    if (!translation || translation.sourceTitle !== promotion.title) return [];
    return [{ ...promotion, ...translation.kk }];
  });
}
