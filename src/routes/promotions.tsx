import { createFileRoute } from "@tanstack/react-router";
import { stores } from "@/data/stores";
import { usePromotions } from "@/hooks/use-promotions";
import { useSelectedStore, storeNumericIds } from "@/hooks/use-selected-store";
import { PromotionCard } from "@/components/site/PromotionCard";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Акции SOFIYA" },
      { name: "description", content: "Актуальные акции и специальные предложения SOFIYA." },
    ],
  }),
  component: PromotionsPage,
});

function PromotionsPage() {
  const { storeId, selectStore } = useSelectedStore();
  const { data: promotions, isLoading, isError } = usePromotions(storeId);

  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Акции</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Специальные предложения</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Акции применяются автоматически или по промокоду — в зависимости от филиала и времени
            суток.
          </p>

          <label className="mt-6 flex max-w-sm flex-col gap-1.5 text-sm">
            <span className="font-semibold text-foreground">Ваш филиал</span>
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
        </div>
      </section>

      <section className="container-page py-12">
        {isLoading && <p className="text-muted-foreground">Загружаем акции…</p>}

        {isError && (
          <p className="text-destructive">
            Не удалось загрузить акции. Попробуйте обновить страницу.
          </p>
        )}

        {!isLoading && !isError && promotions?.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border p-10 text-center max-w-2xl mx-auto">
            <p className="text-lg font-semibold">В этом филиале сейчас нет активных акций</p>
            <p className="mt-2 text-muted-foreground">
              Загляните позже — мы часто обновляем предложения.
            </p>
          </div>
        )}

        {promotions && promotions.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
