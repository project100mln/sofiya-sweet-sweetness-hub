import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, getCategory } from "@/data/catalog";
import { site, waLink } from "@/config/site";
import { ProductCard } from "@/components/site/ProductCard";
import { Instagram, MessageCircle, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/catalog_/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Товар не найден | SOFIYA" }, { name: "robots", content: "noindex" }],
      };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} | SOFIYA` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — SOFIYA` },
        { property: "og:description", content: p.shortDescription },
        { property: "og:image", content: p.images[0] },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const category = getCategory(products.find((x) => x.id === p.id)?.categoryId ?? "") ?? {
    name: "Каталог",
    slug: "",
  };
  const related = products
    .filter((x) => x.categoryId === p.categoryId && x.id !== p.id)
    .slice(0, 4);

  return (
    <>
      <div className="container-page pt-8">
        <nav className="text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-primary">
            Главная
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/catalog" className="hover:text-primary">
            Каталог
          </Link>
          {category.slug && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/catalog" search={{ cat: category.slug }} className="hover:text-primary">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{p.name}</span>
        </nav>
      </div>

      <section className="container-page py-8 md:py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-soft">
            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {p.isHero && (
              <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Хит
              </span>
            )}
            {p.isNew && (
              <span className="rounded-full bg-[color:var(--gold)] text-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Новинка
              </span>
            )}
            {p.isPreorder && (
              <span className="rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                На заказ
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold">{p.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{p.shortDescription}</p>

          {p.price != null && (
            <p className="mt-6 text-3xl font-bold text-primary">
              {p.price.toLocaleString("ru-RU")} ₸
            </p>
          )}
          {p.weight && <p className="mt-1 text-sm text-muted-foreground">Вес: {p.weight}</p>}
          {p.servings && <p className="text-sm text-muted-foreground">Порций: {p.servings}</p>}

          {p.fullDescription && (
            <div className="mt-6 prose prose-neutral">
              <p className="text-foreground/85 leading-relaxed">{p.fullDescription}</p>
            </div>
          )}

          {p.ingredients && p.ingredients.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Состав
              </h3>
              <p className="mt-2 text-sm text-foreground/85">{p.ingredients.join(", ")}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {p.isPreorder && (
              <Link to="/cake-preorder" className="btn-primary btn-primary-hover">
                Оформить предзаказ
              </Link>
            )}
            {site.whatsappDigits && (
              <a
                href={waLink(`Здравствуйте, SOFIYA! Меня интересует «${p.name}».`)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline btn-outline-hover"
              >
                <MessageCircle className="h-4 w-4" /> Спросить в WhatsApp
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
          <h2 className="text-2xl md:text-3xl font-bold">Похожие продукты</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
