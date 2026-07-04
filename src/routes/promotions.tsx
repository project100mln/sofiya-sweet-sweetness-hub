import { createFileRoute, Link } from "@tanstack/react-router";
import { news } from "@/data/news";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Акции SOFIYA" },
      { name: "description", content: "Актуальные акции и специальные предложения SOFIYA." },
    ],
  }),
  component: PromotionsPage,
});

function PromotionsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Акции</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Специальные предложения</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">Свежие акции появятся здесь. Следите за анонсами и подписывайтесь на наш Instagram.</p>
        </div>
      </section>
      <section className="container-page py-12">
        <div className="rounded-3xl border border-dashed border-border p-10 text-center max-w-2xl mx-auto">
          <p className="text-lg font-semibold">Актуальные акции скоро появятся</p>
          <p className="mt-2 text-muted-foreground">А пока — загляните в наши новости.</p>
          <Link to="/news" className="mt-5 inline-flex btn-primary btn-primary-hover">Все новости</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {news.map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="group rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-lift transition-all">
              <div className="aspect-[16/10] overflow-hidden"><img src={n.cover} alt={n.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-5">
                <h3 className="font-semibold group-hover:text-primary">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
