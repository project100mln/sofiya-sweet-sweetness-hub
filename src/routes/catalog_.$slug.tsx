import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import type { Product } from "@/data/types";
import { absoluteUrl, canonicalLink, site, waLink } from "@/config/site";
import { ProductCard } from "@/components/site/ProductCard";
import { Instagram, MessageCircle, ChevronRight } from "lucide-react";
import { formatPrice, LocaleLink, useI18n } from "@/i18n";
import { getCatalog } from "@/i18n/catalog";
import { dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";

export const Route = createFileRoute("/catalog_/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.product.ru;
    if (!loaderData)
      return {
        meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }],
      };
    const p = loaderData.product;
    return {
      links: canonicalLink(`/catalog/${p.slug}`),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, p.name) },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: renderDynamicSeoPattern(seo.socialTitlePattern, p.name) },
        { property: "og:description", content: p.shortDescription },
        { property: "og:image", content: absoluteUrl(p.images[0]) },
        { property: "og:type", content: "product" },
        { property: "og:locale", content: "ru_KZ" },
        { property: "og:locale:alternate", content: "kk_KZ" },
        { property: "og:url", content: absoluteUrl("/catalog/" + p.slug) },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, p.name),
        },
        { name: "twitter:description", content: p.shortDescription },
        { name: "twitter:image", content: absoluteUrl(p.images[0]) },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.shortDescription,
            image: p.images.map(absoluteUrl),
            inLanguage: "ru-KZ",
            brand: { "@type": "Brand", name: site.brand },
            offers:
              p.price != null
                ? {
                    "@type": "Offer",
                    priceCurrency: "KZT",
                    price: p.price,
                    availability: "https://schema.org/InStoreOnly",
                  }
                : undefined,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            inLanguage: "ru-KZ",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: seo.homeBreadcrumb,
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: seo.sectionBreadcrumb,
                item: absoluteUrl("/catalog"),
              },
              { "@type": "ListItem", position: 3, name: p.name },
            ],
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  return <ProductView product={Route.useLoaderData().product} />;
}

export function ProductView({ product }: { product: Product }) {
  const { locale, t, pick } = useI18n();
  const { products, categories } = getCatalog(locale);
  const p = products.find((item) => item.id === product.id);
  if (!p) throw new Error(`Missing ${locale} product localization: ${product.id}`);
  const category = categories.find((item) => item.id === p.categoryId);
  if (!category) throw new Error(`Missing ${locale} category localization: ${p.categoryId}`);
  const related = products
    .filter((x) => x.categoryId === p.categoryId && x.id !== p.id)
    .slice(0, 4);

  return (
    <>
      <div className="container-page pt-8">
        <nav className="text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <LocaleLink to="/" className="hover:text-primary">
            {t("Главная")}
          </LocaleLink>
          <ChevronRight className="h-3.5 w-3.5" />
          <LocaleLink to="/catalog" className="hover:text-primary">
            {t("Каталог")}
          </LocaleLink>
          {category.slug && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <LocaleLink
                to="/catalog"
                search={{ cat: category.slug }}
                className="hover:text-primary"
              >
                {category.name}
              </LocaleLink>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{p.name}</span>
        </nav>
      </div>

      <section className="container-page py-8 md:py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="premium-card relative aspect-square overflow-hidden bg-muted">
            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {p.isHero && (
              <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {t("Хит")}
              </span>
            )}
            {p.isNew && (
              <span className="rounded-full bg-[color:var(--gold)] text-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {t("Новинка")}
              </span>
            )}
            {p.isPreorder && (
              <span className="rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {t("На заказ")}
              </span>
            )}
          </div>
          <h1 className="mt-4 break-words text-4xl font-semibold md:text-6xl">{p.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{p.shortDescription}</p>

          {p.price != null && (
            <p className="mt-6 text-3xl font-bold text-primary">{formatPrice(p.price, locale)} ₸</p>
          )}
          {p.weight && (
            <p className="mt-1 text-sm text-muted-foreground">
              {t("Вес")}: {p.weight}
            </p>
          )}
          {p.servings && (
            <p className="text-sm text-muted-foreground">
              {t("Порций")}: {p.servings}
            </p>
          )}

          {p.fullDescription && (
            <div className="mt-6 prose prose-neutral">
              <p className="text-foreground/85 leading-relaxed">{p.fullDescription}</p>
            </div>
          )}

          {p.ingredients && p.ingredients.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t("Состав")}
              </h3>
              <p className="mt-2 text-sm text-foreground/85">{p.ingredients.join(", ")}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {p.isPreorder && (
              <LocaleLink to="/cake-preorder" className="btn-primary btn-primary-hover">
                {t("Оформить предзаказ")}
              </LocaleLink>
            )}
            {site.whatsappDigits && (
              <a
                href={waLink(
                  pick(
                    `Здравствуйте, SOFIYA! Меня интересует «${p.name}».`,
                    `Сәлеметсіз бе, SOFIYA! Мені «${p.name}» өнімі қызықтырады.`,
                  ),
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-outline btn-outline-hover"
              >
                <MessageCircle className="h-4 w-4" /> {t("Спросить в WhatsApp")}
              </a>
            )}
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-primary hover:text-primary-hover"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page py-14">
          <div className="section-heading">
            <div>
              <p className="page-kicker">{t("Вам может понравиться")}</p>
              <h2>{t("Похожие продукты")}</h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
