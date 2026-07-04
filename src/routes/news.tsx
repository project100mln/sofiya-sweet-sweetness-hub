import { createFileRoute, Link } from "@tanstack/react-router";
import { news } from "@/data/news";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";

export const Route = createFileRoute("/news")({
  head: () => ({
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
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Новости</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Что нового в SOFIYA</h1>
        </div>
      </section>
      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="group rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-lift transition-all">
              <div className="aspect-[16/10] overflow-hidden"><img src={n.cover} alt={n.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">{new Date(n.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</p>
                <h3 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
