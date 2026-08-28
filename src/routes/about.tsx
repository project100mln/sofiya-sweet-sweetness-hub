import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Leaf, Sparkles } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { LocaleLink, useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";

export const Route = createFileRoute("/about")({
  head: () => staticHead("/about", "ru"),
  component: AboutPage,
});

export function AboutPage() {
  const { locale, t } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const cities = [...new Set(stores.map((store) => store.city))];
  const facts = [
    ["2014", t("начало кондитерского направления")],
    ["2016", t("первый собственный магазин")],
    [String(stores.length), t("действующих адресов на сайте")],
    [t("до 150"), t("сотрудников в команде")],
  ];

  return (
    <>
      <PageHero
        eyebrow={t("О компании")}
        title={t("Незабываемый вкус каждый день")}
        lead={t("Экономим людям время и деньги, чтобы дарить незабываемый вкус.")}
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
            <p className="page-kicker">{t("История бренда")}</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t("От производства к любимой сети")}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              {t(
                "История SOFIYA началась в 2014 году не с витрины, а с производства. Основатель бренда Ниязходжаев Бахадир Тураббаевич открыл кондитерское направление, которое работало преимущественно с B2B-клиентами и готовило продукцию для партнёров из разных сфер бизнеса.",
              )}
            </p>
            <p>
              {t(
                "Со временем продукцию всё чаще хотели покупать напрямую. Покупатели обращались с просьбой открыть собственную точку, и в 2016 году появился первый фирменный магазин SOFIYA. Так кондитерское направление, созданное для бизнеса, сделало следующий шаг — стало ближе к семьям и ежедневным поводам своих гостей.",
              )}
            </p>
            <p>
              {t(
                "Название SOFIYA выбрано осознанно. В него вложены понятия чистоты и внутренней чистоты — «тазалық» и «пәктік». Эти слова передают смысл, который основатель хотел связать с брендом с самого начала.",
              )}
            </p>
            <p>
              {t("Миссия SOFIYA — экономить людям время и деньги, чтобы дарить незабываемый вкус.")}{" "}
              {t("Сегодня сеть объединяет")} {stores.length} {t("филиалов, представленных в")}{" "}
              {cities.join(", ")}
              {t(
                ", а в команде работают до 150 сотрудников. Путь от производственного направления до собственной сети продолжается с той же задачей: делать любимые вкусы доступными каждый день.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <div className="section-heading">
          <div>
            <p className="page-kicker">{t("Наш подход")}</p>
            <h2>{t("То, что остаётся неизменным")}</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(locale === "kk"
            ? [
                { i: Leaf, t: "Балғындық", d: "Күн сайын дайындап, сапаны мұқият қадағалаймыз." },
                {
                  i: Sparkles,
                  t: "Тазалық",
                  d: "Өндірістің әр кезеңінде стандарттарды сақтаймыз.",
                },
                { i: Heart, t: "Қамқорлық", d: "Әр фирмалық дүкенде жылы қызмет көрсетеміз." },
                {
                  i: Award,
                  t: "Даму",
                  d: "Ассортиментті кеңейтіп, сүйікті дәмдерді қолжетімді етеміз.",
                },
              ]
            : [
                {
                  i: Leaf,
                  t: "Свежесть",
                  d: "Готовим ежедневно и внимательно следим за качеством.",
                },
                {
                  i: Sparkles,
                  t: "Чистота",
                  d: "Соблюдаем стандарты на каждом этапе производства.",
                },
                { i: Heart, t: "Забота", d: "Создаём тёплый сервис в каждом фирменном магазине." },
                {
                  i: Award,
                  t: "Развитие",
                  d: "Расширяем ассортимент и делаем любимые вкусы доступнее.",
                },
              ]
          ).map(({ i: Icon, t, d }) => (
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
          <h2 className="text-3xl font-semibold md:text-4xl">
            {t("Загляните в ближайший SOFIYA")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            {t("Выберите удобный адрес, посмотрите часы работы и постройте маршрут.")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LocaleLink
              to="/stores"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              {t("Найти магазин")}
            </LocaleLink>
            <LocaleLink
              to="/career"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-6 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("Работать в SOFIYA")}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
