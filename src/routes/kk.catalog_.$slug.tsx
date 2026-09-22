import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { absoluteUrl, languageLinks, site } from "@/config/site";
import { localizeProduct } from "@/i18n/catalog";
import { ProductView } from "./catalog_.$slug";
import { catalogLandingHead, dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";
import { CatalogLandingPage } from "@/components/site/CatalogLandingPage";
import { isCatalogLandingSlug } from "@/data/catalog-landing-pages";

export const Route = createFileRoute("/kk/catalog_/$slug")({
  loader: ({ params }) => {
    if (isCatalogLandingSlug(params.slug)) {
      return { kind: "landing", landingSlug: params.slug } as const;
    }
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { kind: "product", product } as const;
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.product.kk;
    if (!loaderData) {
      return {
        meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }],
      };
    }
    if (loaderData.kind === "landing") return catalogLandingHead(loaderData.landingSlug, "kk");
    const product = localizeProduct(loaderData.product, "kk");
    const path = `/catalog/${product.slug}`;
    return {
      links: languageLinks(path, "kk"),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, product.name) },
        { name: "description", content: product.shortDescription },
        {
          property: "og:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, product.name),
        },
        { property: "og:description", content: product.shortDescription },
        { property: "og:image", content: absoluteUrl(product.images[0]) },
        { property: "og:type", content: "product" },
        { property: "og:locale", content: "kk_KZ" },
        { property: "og:locale:alternate", content: "ru_KZ" },
        { property: "og:url", content: absoluteUrl("/kk" + path) },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, product.name),
        },
        { name: "twitter:description", content: product.shortDescription },
        { name: "twitter:image", content: absoluteUrl(product.images[0]) },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            image: product.images.map(absoluteUrl),
            inLanguage: "kk-KZ",
            brand: { "@type": "Brand", name: site.brand },
            offers:
              product.price == null
                ? undefined
                : {
                    "@type": "Offer",
                    priceCurrency: "KZT",
                    price: product.price,
                    availability: "https://schema.org/InStoreOnly",
                  },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            inLanguage: "kk-KZ",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: seo.homeBreadcrumb,
                item: absoluteUrl("/kk"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: seo.sectionBreadcrumb,
                item: absoluteUrl("/kk/catalog"),
              },
              { "@type": "ListItem", position: 3, name: product.name },
            ],
          }),
        },
      ],
    };
  },
  component: KazakhProductPage,
});

function KazakhProductPage() {
  const data = Route.useLoaderData();
  if (data.kind === "landing") return <CatalogLandingPage slug={data.landingSlug} />;
  return <ProductView product={data.product} />;
}
