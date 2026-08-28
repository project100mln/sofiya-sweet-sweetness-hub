import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNews } from "@/data/news";
import { absoluteUrl, languageLinks } from "@/config/site";
import { localizeNewsItem } from "@/i18n/content";
import { NewsArticleView } from "./news_.$slug";
import { breadcrumbScript, dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";

export const Route = createFileRoute("/kk/news_/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.news.kk;
    if (!loaderData)
      return { meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }] };
    const item = localizeNewsItem(loaderData.item, "kk");
    return {
      links: languageLinks(`/news/${item.slug}`, "kk"),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, item.title) },
        { name: "description", content: item.summary },
        {
          property: "og:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, item.title),
        },
        { property: "og:description", content: item.summary },
        { property: "og:image", content: absoluteUrl(item.cover) },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "kk_KZ" },
        { property: "og:locale:alternate", content: "ru_KZ" },
        { property: "og:url", content: absoluteUrl("/kk/news/" + item.slug) },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, item.title),
        },
        { name: "twitter:description", content: item.summary },
        { name: "twitter:image", content: absoluteUrl(item.cover) },
      ],
      scripts: [
        breadcrumbScript("kk", [
          { name: seo.homeBreadcrumb, path: "/" },
          { name: seo.sectionBreadcrumb, path: "/news" },
          { name: item.title },
        ]),
      ],
    };
  },
  component: KazakhNewsArticle,
});

function KazakhNewsArticle() {
  return <NewsArticleView item={Route.useLoaderData().item} />;
}
