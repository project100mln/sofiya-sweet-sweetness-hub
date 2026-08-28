import { getCatalog } from "@/i18n/catalog";
import { LocaleLink, useI18n } from "@/i18n";

export function CategoryGrid() {
  const { locale, t } = useI18n();
  const { categories } = getCatalog(locale);
  return (
    <section className="container-page py-14 md:py-20">
      <div className="section-heading">
        <div>
          <p className="page-kicker">{t("Каталог")}</p>
          <h2>{t("Выберите любимый вкус")}</h2>
          <p>{t("Торты, десерты, выпечка и горячие блюда — всё в одном каталоге.")}</p>
        </div>
        <LocaleLink to="/catalog" className="btn-outline btn-outline-hover">
          {t("Весь каталог")}
        </LocaleLink>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5">
        {categories.map((c, i) => (
          <LocaleLink
            key={c.id}
            to="/catalog"
            search={{ cat: c.slug }}
            className={`premium-card group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <div
              className={`${i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"} relative`}
            >
              <img
                src={c.image}
                alt={c.name}
                className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i === 0 ? "object-bottom" : ""}`}
                loading={i < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl md:text-2xl font-semibold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-white/80">{c.short}</p>
              </div>
            </div>
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}
