import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getNews, news } from "@/data/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Новость не найдена" }, { name: "robots", content: "noindex" }] };
    const n = loaderData.item;
    return { meta: [
      { title: `${n.title} | SOFIYA` },
      { name: "description", content: n.summary },
      { property: "og:title", content: n.title },
      { property: "og:image", content: n.cover },
      { property: "og:type", content: "article" },
    ]};
  },
  component: NewsArticle,
});

function NewsArticle() {
  const { item } = Route.useLoaderData();
  const related = news.filter(n => n.id !== item.id).slice(0, 3);
  return (
    <>
      <article className="container-page py-10 md:py-14 max-w-3xl">
        <Link to="/news" className="text-sm text-primary font-semibold">← Все новости</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-primary font-semibold">{new Date(item.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">{item.title}</h1>
        <div className="mt-6 aspect-[16/9] rounded-3xl overflow-hidden">
          <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
        </div>
        <p className="mt-8 text-lg text-muted-foreground">{item.summary}</p>
        <div className="mt-6 text-foreground/85 leading-relaxed whitespace-pre-line">{item.body}</div>
      </article>
      {related.length > 0 && (
        <section className="container-page py-12">
          <h2 className="text-2xl font-bold">Читайте также</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((n) => (
              <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="group rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 transition-all">
                <div className="aspect-[16/10] overflow-hidden"><img src={n.cover} alt={n.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-5"><h3 className="font-semibold group-hover:text-primary">{n.title}</h3></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
