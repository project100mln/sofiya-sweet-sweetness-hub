import { MessageCircle, Store } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";
import { CatalogCategoryLink } from "@/components/site/CatalogCategoryLink";
import { catalogLandingPages, type CatalogLandingSlug } from "@/data/catalog-landing-pages";
import { waLink } from "@/config/site";
import { getCatalog } from "@/i18n/catalog";
import { LocaleLink, useI18n } from "@/i18n";

export function CatalogLandingPage({ slug }: { slug: CatalogLandingSlug }) {
  const { locale, pick, t } = useI18n();
  const { categories, products } = getCatalog(locale);
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Missing catalogue category: ${slug}`);
  const copy = catalogLandingPages[slug][locale];
  const items = products.filter(
    (product) => product.isPublished && product.categoryId === category.id,
  );
  const availabilityMessage = pick(
    `Здравствуйте, SOFIYA! Хочу уточнить наличие товаров из категории «${category.name}».`,
    `Сәлеметсіз бе, SOFIYA! «${category.name}» санатындағы өнімдердің қолжетімділігін нақтылағым келеді.`,
  );

  return (
    <>
      <PageHero eyebrow={t("Каталог")} title={copy.heading} lead={copy.lead} />

      <section className="container-page py-8 md:py-12">
        <nav
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          aria-label={t("Каталог")}
        >
          <LocaleLink to="/catalog" className="hover:text-primary">
            {t("Весь каталог")}
          </LocaleLink>
          <span aria-hidden>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {categories.map((item) => (
            <CatalogCategoryLink
              key={item.id}
              category={item}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 py-2 text-sm font-semibold ${
                item.id === category.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary"
              }`}
            >
              {item.name}
            </CatalogCategoryLink>
          ))}
        </div>

        <p className="mb-4 mt-8 text-sm text-muted-foreground" aria-live="polite">
          {pick("Товаров в категории", "Санаттағы өнімдер")}: {items.length}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} p={product} />
          ))}
        </div>
      </section>

      <section className="container-page py-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <article className="premium-card p-6 md:p-9">
            <h2 className="text-2xl font-semibold md:text-3xl">{copy.introTitle}</h2>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-7 text-foreground/80">
                {paragraph}
              </p>
            ))}
          </article>

          <aside className="premium-card p-6 md:p-8">
            <h2 className="text-xl font-semibold">
              {pick("Уточнить наличие", "Қолжетімділігін нақтылау")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {pick(
                "Наличие конкретной позиции подтвердит менеджер. Сообщение откроется в WhatsApp — отправьте его самостоятельно.",
                "Белгілі бір өнімнің қолжетімділігін менеджер растайды. Хабарлама WhatsApp-та ашылады — оны өзіңіз жіберіңіз.",
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={waLink(availabilityMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-primary-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
              <LocaleLink to="/stores" className="btn-outline btn-outline-hover">
                <Store className="h-4 w-4" aria-hidden /> {t("Магазины")}
              </LocaleLink>
              {slug === "cakes" && (
                <LocaleLink to="/cake-preorder" className="btn-outline btn-outline-hover">
                  {t("Торты на заказ")}
                </LocaleLink>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
