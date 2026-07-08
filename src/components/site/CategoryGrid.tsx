import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function CategoryGrid() {
  return (
    <section className="container-page py-14 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Каталог
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Категории продуктов</h2>
        </div>
        <Link to="/catalog" className="btn-outline btn-outline-hover">
          Весь каталог
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            to="/catalog"
            search={{ cat: c.slug }}
            className={`group relative overflow-hidden rounded-3xl border border-border/60 hover:border-primary/40 hover:shadow-lift transition-all ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <div
              className={`${i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"} relative`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-white/80">{c.short}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
