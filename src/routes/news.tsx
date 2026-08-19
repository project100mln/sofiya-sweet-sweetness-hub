import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/data/news";
import { canonicalLink } from "@/config/site";
import { NewsCard } from "@/components/site/NewsCard";

export const Route = createFileRoute("/news")({
  head: () => ({
    links: canonicalLink("/news"),
    meta: [
      { title: "Новости и акции SOFIYA" },
      { name: "description", content: "Свежие новости, анонсы и акции сети SOFIYA." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="page-kicker">Новости</p>
          <h1 className="page-title">Новости и акции</h1>
        </div>
      </section>
      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      </section>
    </>
  );
}
