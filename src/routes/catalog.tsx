import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface CatalogSearch {
  cat?: string;
  q?: string;
  sort?: "recommended" | "new" | "price-asc" | "price-desc";
}

export const Route = createFileRoute("/catalog")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    sort: (["recommended","new","price-asc","price-desc"] as const).includes(s.sort as never) ? s.sort as CatalogSearch["sort"] : "recommended",
  }),
  head: () => ({
    meta: [
      { title: "Каталог — торты, десерты, выпечка | SOFIYA" },
      { name: "description", content: "Каталог SOFIYA: торты, порционные десерты, выпечка, самса, пироги, завтраки, пицца и напитки." },
      { property: "og:title", content: "Каталог SOFIYA" },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tags, setTags] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let items = products.filter((p) => p.isPublished);
    if (search.cat) items = items.filter((p) => p.categoryId === search.cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s));
    }
    if (tags.has("bestseller")) items = items.filter((p) => p.isBestseller);
    if (tags.has("new")) items = items.filter((p) => p.isNew);
    if (tags.has("preorder")) items = items.filter((p) => p.isPreorder);
    if (tags.has("seasonal")) items = items.filter((p) => p.isSeasonal);
    if (search.sort === "price-asc") items = [...items].filter(p => p.price != null).sort((a,b) => (a.price! - b.price!));
    if (search.sort === "price-desc") items = [...items].filter(p => p.price != null).sort((a,b) => (b.price! - a.price!));
    if (search.sort === "new") items = [...items].sort((a,b) => Number(b.isNew) - Number(a.isNew));
    return items;
  }, [search.cat, search.sort, q, tags]);

  const activeCat = categories.find((c) => c.slug === search.cat);
  const toggle = (t: string) => {
    const n = new Set(tags);
    n.has(t) ? n.delete(t) : n.add(t);
    setTags(n);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Каталог</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">{activeCat ? activeCat.name : "Всё меню SOFIYA"}</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{activeCat ? activeCat.short : "Торты, десерты, выпечка, самса, завтраки, пицца и напитки."}</p>
        </div>
      </section>

      <section className="container-page py-8">
        {/* Category chips */}
        <div className="no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-2">
          <Link to="/catalog" className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${!search.cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"}`}>
            Все
          </Link>
          {categories.map((c) => (
            <Link key={c.id} to="/catalog" search={(prev: CatalogSearch) => ({ ...prev, cat: c.slug })}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${search.cat === c.slug ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:border-primary"}`}>
              {c.name}
            </Link>
          ))}
        </div>

        {/* Search & sort */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по каталогу…"
                   className="w-full h-12 rounded-full border border-border bg-card pl-10 pr-4 text-sm focus:border-primary focus:outline-none" />
          </div>
          <button onClick={() => setFilterOpen(true)} className="md:hidden inline-flex items-center gap-2 h-12 px-4 rounded-full border border-border bg-card text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Фильтры {tags.size ? `· ${tags.size}` : ""}
          </button>
          <select value={search.sort} onChange={(e) => {
            const v = e.target.value as CatalogSearch["sort"];
            history.replaceState(null, "", `?${new URLSearchParams({ ...(search.cat ? { cat: search.cat } : {}), sort: v || "" })}`);
            location.reload();
          }} className="h-12 rounded-full border border-border bg-card px-4 text-sm font-semibold">
            <option value="recommended">Рекомендуем</option>
            <option value="new">Сначала новинки</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>

        <div className="mt-6 grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FiltersPanel tags={tags} toggle={toggle} />
          </aside>
          <div>
            <p className="mb-4 text-sm text-muted-foreground">Найдено: {filtered.length}</p>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                <p className="text-lg font-semibold">Ничего не найдено</p>
                <p className="mt-2 text-muted-foreground text-sm">Попробуйте изменить фильтры или поисковый запрос.</p>
                <button onClick={() => { setQ(""); setTags(new Set()); }} className="mt-5 btn-outline btn-outline-hover">Сбросить фильтры</button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setFilterOpen(false)}>
          <div className="absolute bottom-0 inset-x-0 bg-background rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Фильтры</h3>
              <button onClick={() => setFilterOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-border"><X className="h-4 w-4" /></button>
            </div>
            <FiltersPanel tags={tags} toggle={toggle} />
            <button onClick={() => setFilterOpen(false)} className="mt-6 w-full btn-primary btn-primary-hover">Показать результаты</button>
          </div>
        </div>
      )}
    </>
  );
}

function FiltersPanel({ tags, toggle }: { tags: Set<string>; toggle: (t: string) => void }) {
  const opts = [
    { id: "bestseller", label: "Бестселлеры" },
    { id: "new", label: "Новинки" },
    { id: "preorder", label: "На заказ" },
    { id: "seasonal", label: "Сезонные" },
  ];
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Метки</p>
      <div className="mt-3 flex flex-col gap-2">
        {opts.map((o) => (
          <label key={o.id} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer ${tags.has(o.id) ? "border-primary bg-primary/5" : "border-border"}`}>
            <input type="checkbox" checked={tags.has(o.id)} onChange={() => toggle(o.id)} className="accent-[color:var(--primary)]" />
            <span className="text-sm font-medium">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
