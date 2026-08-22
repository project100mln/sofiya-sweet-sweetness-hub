import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getNews, news } from "@/data/news";
import { absoluteUrl, canonicalLink } from "@/config/site";
import { NewsCard } from "@/components/site/NewsCard";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Новость не найдена" }, { name: "robots", content: "noindex" }] };
    const n = loaderData.item;
    return {
      links: canonicalLink(`/news/${n.slug}`),
      meta: [
        { title: `${n.title} | SOFIYA` },
        { name: "description", content: n.summary },
        { property: "og:title", content: n.title },
        { property: "og:image", content: absoluteUrl(n.cover) },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: NewsArticle,
});

function NewsArticle() {
  const { item } = Route.useLoaderData();
  const related = news.filter((n) => n.id !== item.id).slice(0, 3);
  return (
    <>
      <article className="container-page max-w-3xl py-10 md:py-14">
        <Link to="/news" className="text-sm text-primary font-semibold">
          ← Все новости
        </Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-primary font-semibold">
          {new Date(item.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
              <p className="page-kicker">Ещё в SOFIYA</p>
              <h2>Читайте также</h2>
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
