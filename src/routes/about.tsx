import { createFileRoute, Link } from "@tanstack/react-router";
import { stores } from "@/data/stores";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { Leaf, Sparkles, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании SOFIYA" },
      {
        name: "description",
        content:
          "SOFIYA — растущая казахстанская сеть кофеен и пекарен. Свежая выпечка, фирменные торты и кофе каждый день.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">О компании</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            <SofiyaWordmark /> — вкусные моменты, доступные каждому
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Казахстанская сеть кофеен и пекарен. Мы работаем в Шымкенте и Туркестанской области —
            свежая выпечка, фирменные торты и кофе каждый день.
          </p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-4 md:grid-cols-4">
        {[
          { n: `${stores.length}`, l: "магазинов и кофеен" },
          { n: "5", l: "городов сети" },
          { n: "9", l: "категорий продуктов" },
          { n: "365", l: "дней свежей выпечки" },
        ].map((s) => (
          <div key={s.l} className="rounded-3xl bg-card border border-border/60 p-6 text-center">
            <p className="text-4xl font-bold text-primary">{s.n}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      <section className="container-page py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { i: Leaf, t: "Свежесть", d: "Готовим ежедневно небольшими партиями." },
          { i: Sparkles, t: "Качество", d: "Отбираем ингредиенты и следим за процессом." },
          { i: Heart, t: "Забота", d: <>Тёплые встречи в каждой кофейне <SofiyaWordmark />.</> },
          { i: Award, t: "Растём", d: "Открываем новые точки по региону." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-3xl bg-card border border-border/60 p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="container-page py-14">
        <div className="rounded-3xl bg-[color:var(--cream)] p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Присоединяйтесь к семье <SofiyaWordmark />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Загляните в ближайшую кофейню или подпишитесь на наш Instagram, чтобы первыми узнавать о
            новинках.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/stores" className="btn-primary btn-primary-hover">
              Найти магазин
            </Link>
            <Link to="/career" className="btn-outline btn-outline-hover">
              Работать в <SofiyaWordmark />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
