import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { stores, cities } from "@/data/stores";
import { StoreCard } from "@/components/site/StoreCard";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { Search, MapPin } from "lucide-react";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: `Магазины и кофейни SOFIYA — ${stores.length} точек` },
      { name: "description", content: "Адреса пекарен и кофеен SOFIYA в Шымкенте, Ленгере, Аксукенте и Манкенте." },
    ],
  }),
  component: StoresPage,
});

function StoresPage() {
  const [city, setCity] = useState<string>("Шымкент");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    return stores.filter((s) => {
      if (s.city !== city) return false;
      if (q.trim()) {
        const t = q.toLowerCase();
        return s.address.toLowerCase().includes(t) || s.city.toLowerCase().includes(t) || (s.landmark ?? "").toLowerCase().includes(t);
      }
      return true;
    });
  }, [city, q]);

  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Сеть <SofiyaWordmark /></p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Магазины и кофейни</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{stores.length} точек в Шымкенте и Туркестанской области.</p>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по городу или адресу…"
                   className="w-full h-12 rounded-full border border-border bg-card pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="mt-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          {cities.map((c) => (
            <button key={c} onClick={() => setCity(c)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${city === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}>
              {c} <span className="text-xs opacity-70">· {stores.filter(s => s.city === c).length}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-4 text-sm text-muted-foreground">Найдено: {filtered.length}</p>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                <p className="text-lg font-semibold">Магазины не найдены</p>
                <button onClick={() => setQ("")} className="mt-4 btn-outline btn-outline-hover">Сбросить</button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((s) => <StoreCard key={s.id} s={s} />)}
              </div>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl bg-[color:var(--accent)] p-6 min-h-[320px] flex flex-col items-center justify-center text-center border border-border">
              <MapPin className="h-8 w-8 text-primary" />
              <p className="mt-3 font-semibold">Интерактивная карта</p>
              <p className="mt-1 text-sm text-muted-foreground max-w-xs">Мы готовим карту всех магазинов SOFIYA. Пока используйте фильтр по городам.</p>
              <Link to="/contacts" className="mt-4 btn-outline btn-outline-hover">Связаться с нами</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
