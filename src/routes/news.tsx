import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/data/news";
import { canonicalLink } from "@/config/site";
import { NewsCard } from "@/components/site/NewsCard";
import { PageHero } from "@/components/site/PageHero";

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
      <PageHero
        eyebrow="Новости"
        title="Новости и события"
        lead="Новинки, сезонные коллекции и важные события SOFIYA."
      />
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
