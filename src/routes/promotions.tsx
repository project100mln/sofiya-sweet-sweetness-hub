import { createFileRoute } from "@tanstack/react-router";
import { usePromotions } from "@/hooks/use-promotions";
import { useSelectedStore, storeNumericIds } from "@/hooks/use-selected-store";
import { PromotionCard } from "@/components/site/PromotionCard";
import { supabaseConfigured } from "@/lib/supabase";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";
import { getLocalizedRuntimePromotions } from "@/i18n/runtime-promotions";

export const Route = createFileRoute("/promotions")({
  head: () => staticHead("/promotions", "ru"),
  component: PromotionsPage,
});

export function PromotionsPage() {
  const { locale, t } = useI18n();
  const { stores, promotions: featuredPromotions } = getLocalizedContent(locale);
  const { storeId, selectStore } = useSelectedStore();
  const { data: promotions, isLoading, isError } = usePromotions(storeId);
  const runtimePromotions = getLocalizedRuntimePromotions(promotions ?? [], locale);
  const allPromotions = [...featuredPromotions, ...runtimePromotions];

  return (
    <>
      <PageHero
        eyebrow={t("Акции")}
        title={t("Специальные предложения")}
        lead={t("Выбирайте любимую выпечку со скидкой 20% каждый вечер с 20:00 до 22:00.")}
      >
        <label className="mt-6 flex max-w-sm flex-col gap-1.5 text-sm">
          <span className="font-semibold text-foreground">{t("Ваш филиал")}</span>
          <select
            className="rounded-xl border border-border/60 bg-card px-3 py-2 text-foreground"
            value={storeId ?? ""}
            onChange={(e) => selectStore(Number(e.target.value))}
          >
            {stores.map((s) => (
              <option key={s.id} value={storeNumericIds[s.id]}>
                {s.city}, {s.address}
              </option>
            ))}
          </select>
        </label>
      </PageHero>

      <section className="container-page py-12">
        {supabaseConfigured && isLoading && (
          <p className="text-muted-foreground" role="status">
            {t("Загружаем акции…")}
          </p>
        )}

        {supabaseConfigured && isError && (
          <p className="text-destructive">
            {t("Не удалось загрузить акции. Попробуйте обновить страницу.")}
          </p>
        )}

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {allPromotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} />
          ))}
        </div>
      </section>
    </>
  );
}
