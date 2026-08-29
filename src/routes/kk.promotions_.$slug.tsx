import { createFileRoute, notFound } from "@tanstack/react-router";
import { getFeaturedPromotion } from "@/data/featured-promotions";
import { absoluteUrl, languageLinks } from "@/config/site";
import { localizePromotion } from "@/i18n/content";
import { PromotionDetailView } from "./promotions_.$slug";
import { breadcrumbScript, dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";

export const Route = createFileRoute("/kk/promotions_/$slug")({
  loader: ({ params }) => {
    const promotion = getFeaturedPromotion(params.slug);
    if (!promotion) throw notFound();
    return { promotion };
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.promotion.kk;
    if (!loaderData)
      return {
        meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }],
      };
    const promotion = localizePromotion(loaderData.promotion, "kk");
    const description = promotion.description ?? seo.descriptionFallback;
    return {
      links: languageLinks(`/promotions/${promotion.slug}`, "kk"),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, promotion.title) },
        { name: "description", content: description },
        {
          property: "og:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, promotion.title),
        },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "kk_KZ" },
        { property: "og:locale:alternate", content: "ru_KZ" },
        {
          property: "og:url",
          content: absoluteUrl("/kk/promotions/" + promotion.slug),
        },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, promotion.title),
        },
        { name: "twitter:description", content: description },
        ...(promotion.image_url
          ? [
              { property: "og:image", content: absoluteUrl(promotion.image_url) },
              { name: "twitter:image", content: absoluteUrl(promotion.image_url) },
            ]
          : []),
      ],
      scripts: [
        breadcrumbScript("kk", [
          { name: seo.homeBreadcrumb, path: "/" },
          { name: seo.sectionBreadcrumb, path: "/promotions" },
          { name: promotion.title },
        ]),
      ],
    };
  },
  component: KazakhPromotionDetail,
});

function KazakhPromotionDetail() {
  return <PromotionDetailView promotion={Route.useLoaderData().promotion} />;
}
