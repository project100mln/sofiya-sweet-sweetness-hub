import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { stores, cities } from "@/data/stores";
import { StoreCard } from "@/components/site/StoreCard";
import { Search, MapPin } from "lucide-react";
import { canonicalLink } from "@/config/site";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/stores")({
  head: () => ({
    links: canonicalLink("/stores"),
    meta: [
      { title: "Магазины SOFIYA" },
      {
        name: "description",
        content: "Адреса магазинов SOFIYA в Шымкенте, Ленгере, Аксукенте и Манкенте.",
      },
    ],
  }),
  component: StoresPage,
});

function StoresPage() {
  const [city, setCity] = useState<string>("Шымкент");
  const [q, setQ] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id ?? "");
  const filtered = useMemo(() => {
    return stores.filter((s) => {
      if (s.city !== city) return false;
      if (q.trim()) {
        const t = q.toLowerCase();
        return (
          s.address.toLowerCase().includes(t) ||
          s.city.toLowerCase().includes(t) ||
          (s.landmark ?? "").toLowerCase().includes(t)
        );
      }
      return true;
    });
  }, [city, q]);

  useEffect(() => {
    if (!filtered.some((store) => store.id === selectedStoreId)) {
      setSelectedStoreId(filtered[0]?.id ?? "");
    }
  }, [filtered, selectedStoreId]);

  const selectedStore = filtered.find((store) => store.id === selectedStoreId) ?? filtered[0];
  const mapSrc =
    selectedStore?.latitude != null && selectedStore.longitude != null
      ? (() => {
          const radius = 0.008;
          const bbox = [
            selectedStore.longitude - radius,
            selectedStore.latitude - radius,
            selectedStore.longitude + radius,
            selectedStore.latitude + radius,
          ].join(",");
          return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${selectedStore.latitude},${selectedStore.longitude}`;
        })()
      : null;

  return (
    <>
      <PageHero
        eyebrow="Сеть"
        title="Наши магазины"
        lead={`${stores.length} адресов в Шымкенте и Туркестанской области.`}
      />

      <section className="container-page py-8">
        <div className="premium-card flex flex-wrap items-center gap-3 p-3 md:p-4">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по городу или адресу…"
              className="w-full h-12 rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCity(c);
                setQ("");
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${city === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}
            >
              {c}{" "}
              <span className="text-xs opacity-70">
                · {stores.filter((s) => s.city === c).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-4 text-sm text-muted-foreground">Найдено: {filtered.length}</p>
            {filtered.length === 0 ? (
              <div className="premium-card p-12 text-center">
                <p className="text-lg font-semibold">Магазины не найдены</p>
                <button onClick={() => setQ("")} className="mt-4 btn-outline btn-outline-hover">
                  Сбросить
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((s) => (
                  <StoreCard
                    key={s.id}
                    s={s}
                    isSelected={s.id === selectedStore?.id}
                    onShowOnMap={() => setSelectedStoreId(s.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="premium-card overflow-hidden" data-testid="store-map-panel">
              {mapSrc ? (
                <iframe
                  key={selectedStore?.id}
                  src={mapSrc}
                  title={`Карта: ${selectedStore?.address}`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="grid min-h-[260px] place-items-center bg-[color:var(--accent)] p-8 text-center">
                  <div>
                    <MapPin className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-3 font-semibold">Координаты уточняются</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Напишите нам — подскажем ближайший ориентир.
                    </p>
                  </div>
                </div>
              )}
              {selectedStore && (
                <div className="p-5">
                  <p className="page-kicker">Выбрано на карте</p>
                  <h2 className="mt-2 text-xl font-semibold">{selectedStore.address}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedStore.city} · {selectedStore.workingHours}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedStore.mapUrl && (
                      <a
                        href={selectedStore.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary btn-primary-hover"
                      >
                        Маршрут в 2GIS
                      </a>
                    )}
                    <Link to="/contacts" className="btn-outline btn-outline-hover">
                      Связаться
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
