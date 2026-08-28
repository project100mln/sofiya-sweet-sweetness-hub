import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNews } from "@/data/news";
import type { NewsItem } from "@/data/types";
import { absoluteUrl, canonicalLink } from "@/config/site";
import { NewsCard } from "@/components/site/NewsCard";
import { formatDate, LocaleLink, useI18n } from "@/i18n";
import { getLocalizedContent, localizeNewsItem } from "@/i18n/content";
import { breadcrumbScript, dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";

export const Route = createFileRoute("/news_/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.news.ru;
    if (!loaderData)
      return { meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }] };
    const n = loaderData.item;
    return {
      links: canonicalLink(`/news/${n.slug}`),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, n.title) },
        { name: "description", content: n.summary },
        { property: "og:title", content: renderDynamicSeoPattern(seo.socialTitlePattern, n.title) },
        { property: "og:description", content: n.summary },
        { property: "og:image", content: absoluteUrl(n.cover) },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "ru_KZ" },
        { property: "og:locale:alternate", content: "kk_KZ" },
        { property: "og:url", content: absoluteUrl("/news/" + n.slug) },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, n.title),
        },
        { name: "twitter:description", content: n.summary },
        { name: "twitter:image", content: absoluteUrl(n.cover) },
      ],
      scripts: [
        breadcrumbScript("ru", [
          { name: seo.homeBreadcrumb, path: "/" },
          { name: seo.sectionBreadcrumb, path: "/news" },
          { name: n.title },
        ]),
      ],
    };
  },
  component: NewsArticle,
});

function NewsArticle() {
  return <NewsArticleView item={Route.useLoaderData().item} />;
}

export function NewsArticleView({ item: source }: { item: NewsItem }) {
  const { locale, t } = useI18n();
  const item = localizeNewsItem(source, locale);
  const { news } = getLocalizedContent(locale);
  const related = news.filter((n) => n.id !== item.id).slice(0, 3);
  return (
    <>
      <article className="container-page max-w-3xl py-10 md:py-14">
        <LocaleLink to="/news" className="text-sm text-primary font-semibold">
          ← {t("Все новости")}
        </LocaleLink>
        <p className="mt-6 text-xs uppercase tracking-widest text-primary font-semibold">
          {formatDate(item.date, locale)}
        </p>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{item.title}</h1>
        <div className="premium-card mt-6 aspect-[16/9] overflow-hidden">
          <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
        </div>
        <p className="mt-8 text-lg text-muted-foreground">{item.summary}</p>
        <div className="mt-6 text-foreground/85 leading-relaxed whitespace-pre-line">
          {item.body}
        </div>
      </article>
      {related.length > 0 && (
        <section className="container-page py-12">
          <div className="section-heading">
            <div>
              <p className="page-kicker">{t("Ещё в SOFIYA")}</p>
              <h2>{t("Читайте также")}</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((n) => (
              <NewsCard key={n.id} item={n} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
