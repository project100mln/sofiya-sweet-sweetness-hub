import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { getCatalog } from "@/i18n/catalog";
import { LocaleLink, useI18n } from "@/i18n";
import { ProductCard } from "@/components/site/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useModalFocus } from "@/hooks/use-modal-focus";

interface CatalogSearch {
  cat?: string;
  q?: string;
  sort?: "recommended" | "new" | "price-asc" | "price-desc";
}

export const Route = createFileRoute("/catalog")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    sort: (["recommended", "new", "price-asc", "price-desc"] as const).includes(s.sort as never)
      ? (s.sort as CatalogSearch["sort"])
      : undefined,
  }),
  head: () => staticHead("/catalog", "ru"),
  component: CatalogPage,
});

export function CatalogPage() {
  const { locale, t } = useI18n();
  const { categories, products } = useMemo(() => getCatalog(locale), [locale]);
  const search = useSearch({ strict: false }) as CatalogSearch;
  const navigate = useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDialogRef = useRef<HTMLDivElement>(null);
  const closeFilters = useCallback(() => setFilterOpen(false), []);
  useModalFocus(filterOpen, filterDialogRef, filterButtonRef, closeFilters);

  const filtered = useMemo(() => {
    let items = products.filter((p) => p.isPublished);
    if (search.cat) items = items.filter((p) => p.categoryId === search.cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s),
      );
    }
    if (tags.has("bestseller")) items = items.filter((p) => p.isBestseller);
    if (tags.has("new")) items = items.filter((p) => p.isNew);
    if (tags.has("preorder")) items = items.filter((p) => p.isPreorder);
    if (tags.has("seasonal")) items = items.filter((p) => p.isSeasonal);
    if (search.sort === "price-asc")
      items = [...items].filter((p) => p.price != null).sort((a, b) => a.price! - b.price!);
    if (search.sort === "price-desc")
      items = [...items].filter((p) => p.price != null).sort((a, b) => b.price! - a.price!);
    if (search.sort === "new") items = [...items].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return items;
  }, [search.cat, search.sort, q, tags, products]);

  const activeCat = categories.find((c) => c.slug === search.cat);

  const toggle = (t: string) => {
    const n = new Set(tags);
    if (n.has(t)) n.delete(t);
    else n.add(t);
    setTags(n);
  };

  return (
    <>
      <PageHero
        eyebrow={t("Каталог")}
        title={activeCat ? activeCat.name : t("Всё меню")}
        lead={
          activeCat
            ? activeCat.short
            : t("Торты, десерты, выпечка, самса, завтраки, пицца и напитки.")
        }
      />

      <section className="container-page py-8">
        {/* Category chips */}
        <div className="no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          <LocaleLink
            to="/catalog"
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold border ${!search.cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"}`}
          >
            {t("Все")}
          </LocaleLink>
          {categories.map((c) => (
            <LocaleLink
              key={c.id}
              to="/catalog"
              search={(prev: CatalogSearch) => ({ ...prev, cat: c.slug })}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold border ${search.cat === c.slug ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"}`}
            >
              {c.name}
            </LocaleLink>
          ))}
        </div>

        {/* Search & sort */}
        <div className="premium-card mt-6 flex flex-wrap items-center gap-3 p-3 md:p-4">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Поиск по каталогу…")}
              aria-label={t("Поиск по каталогу")}
              className="w-full h-12 rounded-full border border-border bg-background pl-10 pr-11 text-sm focus:border-primary focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label={t("Очистить поиск")}
                className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            ref={filterButtonRef}
            onClick={() => setFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-2 h-12 px-4 rounded-full border border-border bg-background text-sm font-semibold"
          >
            <SlidersHorizontal className="h-4 w-4" /> {t("Фильтры")}{" "}
            {tags.size ? `· ${tags.size}` : ""}
          </button>
          <select
            aria-label={t("Сортировка товаров")}
            value={search.sort ?? "recommended"}
            onChange={(e) => {
              const v = e.target.value as NonNullable<CatalogSearch["sort"]>;
              navigate({ search: ((prev: CatalogSearch) => ({ ...prev, sort: v })) as never });
            }}
            className="h-12 rounded-full border border-border bg-background px-4 text-sm font-semibold"
          >
            <option value="recommended">{t("Рекомендуем")}</option>
            <option value="new">{t("Сначала новинки")}</option>
            <option value="price-asc">{t("Цена: по возрастанию")}</option>
            <option value="price-desc">{t("Цена: по убыванию")}</option>
          </select>
        </div>

        <div className="mt-6 grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FiltersPanel tags={tags} toggle={toggle} />
          </aside>
          <div>
            <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
              {t("Найдено")}: {filtered.length}
            </p>
            {filtered.length === 0 ? (
              <div className="premium-card p-12 text-center">
                <p className="text-lg font-semibold">{t("Ничего не найдено")}</p>
                <p className="mt-2 text-muted-foreground text-sm">
                  {t("Попробуйте изменить фильтры или поисковый запрос.")}
                </p>
                <button
                  onClick={() => {
                    setQ("");
                    setTags(new Set());
                  }}
                  className="mt-5 btn-outline btn-outline-hover"
                >
                  {t("Сбросить фильтры")}
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div
          ref={filterDialogRef}
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={closeFilters}
          role="dialog"
          aria-modal="true"
          aria-label={t("Фильтры каталога")}
          tabIndex={-1}
        >
          <div
            className="absolute bottom-0 inset-x-0 bg-background rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t("Фильтры")}</h3>
              <button
                onClick={closeFilters}
                className="grid h-10 w-10 place-items-center rounded-full border border-border"
                aria-label={t("Закрыть фильтры")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FiltersPanel tags={tags} toggle={toggle} />
            <button onClick={closeFilters} className="mt-6 w-full btn-primary btn-primary-hover">
              {t("Показать результаты")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FiltersPanel({ tags, toggle }: { tags: Set<string>; toggle: (t: string) => void }) {
  const { t } = useI18n();
  const opts = [
    { id: "bestseller", label: t("Бестселлеры") },
    { id: "new", label: t("Новинки") },
    { id: "preorder", label: t("На заказ") },
    { id: "seasonal", label: t("Сезонные") },
  ];
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t("Метки")}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {opts.map((o) => (
          <label
            key={o.id}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer ${tags.has(o.id) ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <input
              type="checkbox"
              checked={tags.has(o.id)}
              onChange={() => toggle(o.id)}
              className="accent-[color:var(--primary)]"
            />
            <span className="text-sm font-medium">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
