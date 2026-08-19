import { createFileRoute } from "@tanstack/react-router";
import { stores } from "@/data/stores";
import { usePromotions } from "@/hooks/use-promotions";
import { useSelectedStore, storeNumericIds } from "@/hooks/use-selected-store";
import { PromotionCard } from "@/components/site/PromotionCard";
import { supabaseConfigured } from "@/lib/supabase";
import { canonicalLink } from "@/config/site";
import { featuredPromotions } from "@/data/featured-promotions";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    links: canonicalLink("/promotions"),
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
  const allPromotions = [...featuredPromotions, ...(promotions ?? [])];

  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Акции</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Специальные предложения</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Выбирайте любимую выпечку со скидкой 20% каждый вечер с 20:00 до 22:00.
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
        {supabaseConfigured && isLoading && (
          <p className="text-muted-foreground" role="status">
            Загружаем акции…
          </p>
        )}

        {supabaseConfigured && isError && (
          <p className="text-destructive">
            Не удалось загрузить акции. Попробуйте обновить страницу.
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
