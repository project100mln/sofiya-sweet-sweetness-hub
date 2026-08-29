import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { stores as baseStores } from "@/data/stores";
import { STORE_CITIES, storeCityId, type StoreCityId } from "@/data/store-cities";
import { StoreCard } from "@/components/site/StoreCard";
import { Search, MapPin } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { LocaleLink, useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";

export const Route = createFileRoute("/stores")({
  head: () => staticHead("/stores", "ru"),
  component: StoresPage,
});

export function StoresPage() {
  const { locale, t, pick } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const [cityId, setCityId] = useState<StoreCityId>("shymkent");
  const [q, setQ] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id ?? "");
  const filtered = useMemo(() => {
    return stores.filter((s) => {
      const source = baseStores.find((store) => store.id === s.id);
      if (!source) throw new Error(`Missing source store: ${s.id}`);
      const query = q.trim().toLocaleLowerCase(locale === "kk" ? "kk-KZ" : "ru-KZ");
      if (!query) return storeCityId(source.city) === cityId;

      const searchIndex = [
        source.city,
        source.district,
        source.address,
        source.landmark,
        s.city,
        s.district,
        s.address,
        s.landmark,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale === "kk" ? "kk-KZ" : "ru-KZ");
      return searchIndex.includes(query);
    });
  }, [cityId, locale, q, stores]);

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
        eyebrow={t("Сеть")}
        title={t("Наши магазины")}
        lead={pick(
          `${stores.length} адресов в Шымкенте и Туркестанской области.`,
          `Шымкент пен Түркістан облысында ${stores.length} мекенжай.`,
        )}
      />

      <section className="container-page py-8">
        <div className="premium-card flex flex-wrap items-center gap-3 p-3 md:p-4">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Поиск по городу или адресу…")}
              aria-label={t("Поиск магазина")}
              className="w-full h-12 rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          {STORE_CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                setCityId(city.id);
                setQ("");
              }}
              aria-pressed={cityId === city.id}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold border ${cityId === city.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"}`}
            >
              {city[locale]}{" "}
              <span className="text-xs opacity-70">
                · {baseStores.filter((store) => storeCityId(store.city) === city.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("Найдено")}: {filtered.length}
            </p>
            {filtered.length === 0 ? (
              <div className="premium-card p-12 text-center">
                <p className="text-lg font-semibold">{t("Магазины не найдены")}</p>
                <button onClick={() => setQ("")} className="mt-4 btn-outline btn-outline-hover">
                  {t("Сбросить")}
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
                  title={`${t("Карта")}: ${selectedStore?.address}`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="grid min-h-[260px] place-items-center bg-[color:var(--accent)] p-8 text-center">
                  <div>
                    <MapPin className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-3 font-semibold">{t("Координаты уточняются")}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("Напишите нам — подскажем ближайший ориентир.")}
                    </p>
                  </div>
                </div>
              )}
              {selectedStore && (
                <div className="p-5">
                  <p className="page-kicker">{t("Выбрано на карте")}</p>
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
                        {t("Маршрут в 2GIS")}
                      </a>
                    )}
                    <LocaleLink to="/contacts" className="btn-outline btn-outline-hover">
                      {t("Связаться")}
                    </LocaleLink>
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
