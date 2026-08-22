import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, Leaf, Sparkles } from "lucide-react";
import { canonicalLink } from "@/config/site";
import { PageHero } from "@/components/site/PageHero";
import { cities, stores } from "@/data/stores";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: canonicalLink("/about"),
    meta: [
      { title: "О компании SOFIYA" },
      {
        name: "description",
        content:
          "История SOFIYA с 2014 года: свежая выпечка, фирменные торты и сеть магазинов в Шымкенте и Туркестанской области.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const facts = [
    ["2014", "начало кондитерского направления"],
    ["2016", "первый собственный магазин"],
    [String(stores.length), "действующих адресов на сайте"],
    ["до 150", "сотрудников в команде"],
  ];

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Незабываемый вкус каждый день"
        lead="Экономим людям время и деньги, чтобы дарить незабываемый вкус."
      />

      <section className="container-page section-space">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([value, label]) => (
            <div key={label} className="premium-card p-6 md:p-7">
              <p className="font-display text-4xl font-semibold text-primary">{value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <div className="grid gap-8 rounded-[2rem] border border-border/60 bg-[color:var(--cream)] p-7 md:grid-cols-[0.75fr_1.25fr] md:p-12">
          <div>
            <p className="page-kicker">История бренда</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              От производства к любимой сети
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              В 2014 году основатель SOFIYA Ниязходжаев Бахадир Тураббаевич запустил кондитерское
              направление для партнёров. Покупатели всё чаще спрашивали, где можно приобрести
              продукцию напрямую.
            </p>
            <p>
              В ответ на этот спрос в 2016 году открылся первый собственный магазин SOFIYA. Название
              бренда связано с чистотой — принципом, который команда сохраняет в производстве,
              обслуживании и отношении к продукту.
            </p>
            <p>
              Сегодня адреса SOFIYA представлены в {cities.join(", ")}. Актуальный список точек,
              часы работы и маршруты всегда доступны на странице магазинов.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <div className="section-heading">
          <div>
            <p className="page-kicker">Наш подход</p>
            <h2>То, что остаётся неизменным</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Leaf, t: "Свежесть", d: "Готовим ежедневно и внимательно следим за качеством." },
            { i: Sparkles, t: "Чистота", d: "Соблюдаем стандарты на каждом этапе производства." },
            { i: Heart, t: "Забота", d: "Создаём тёплый сервис в каждом фирменном магазине." },
            {
              i: Award,
              t: "Развитие",
              d: "Расширяем ассортимент и делаем любимые вкусы доступнее.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="premium-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <div className="rounded-[2rem] bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="text-3xl font-semibold md:text-4xl">Загляните в ближайший SOFIYA</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Выберите удобный адрес, посмотрите часы работы и постройте маршрут.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/stores"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              Найти магазин
            </Link>
            <Link
              to="/career"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-6 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Работать в SOFIYA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
