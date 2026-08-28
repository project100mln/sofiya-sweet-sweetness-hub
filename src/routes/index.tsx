import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { AppPromo } from "@/components/site/AppPromo";
import { NewsCard } from "@/components/site/NewsCard";
import { StoreCard } from "@/components/site/StoreCard";
import { IMG } from "@/data/catalog";
import { getCatalog } from "@/i18n/catalog";
import { LocaleLink, useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";
import { instagramLink, site } from "@/config/site";
import { staticHead } from "@/i18n/seo";
import {
  ArrowRight,
  Cake,
  Coffee,
  Pizza,
  Sandwich,
  Instagram,
  Users,
  Gift,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => staticHead("/", "ru"),
  component: Home,
});

export function Home() {
  const { locale, t, pick } = useI18n();
  const { products } = getCatalog(locale);
  const { stores, news } = getLocalizedContent(locale);
  const hero = products.filter((p) => p.isHero);
  const bestsellers = products.filter((p) => p.isBestseller);
  const fresh = products.filter((p) => p.isNew);
  const preorderPreview = products.filter((p) => p.isPreorder);
  const featuredStores = stores.slice(0, 6);
  const pizzaImage = products.find((product) => product.categoryId === "pizza")?.images[0];

  return (
    <>
      <HeroCarousel />
      <CategoryGrid />

      <ProductCarousel
        title={t("Хиты недели")}
        subtitle={t("Самые любимые торты и десерты наших гостей.")}
        items={hero.length ? hero : bestsellers}
        action={
          <LocaleLink to="/catalog" className="hidden md:inline-flex btn-outline btn-outline-hover">
            {t("Весь каталог")}
          </LocaleLink>
        }
      />

      <ProductCarousel
        title={t("Новинки")}
        subtitle={t("Только что из пекарни — попробуйте первыми.")}
        items={fresh}
      />

      <AppPromo />

      {/* Seasonal editorial */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] min-h-[380px] shadow-soft">
            <img
              src={IMG.cakeBerry}
              alt={t("Ягодная коллекция SOFIYA")}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
            <div className="relative p-8 md:p-12 flex flex-col justify-end h-full text-white">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> {t("Сезонная коллекция")}
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold max-w-lg">
                {t("Ягодная коллекция")}
              </h2>
              <p className="mt-3 max-w-md text-white/85">
                {t("Свежие ягоды, воздушные кремы и лёгкие цитрусовые ноты — вкус тёплого сезона.")}
              </p>
              <LocaleLink
                to="/catalog"
                search={{ cat: "cakes" }}
                className="mt-6 w-fit btn-primary btn-primary-hover"
              >
                {t("Смотреть коллекцию")} <ArrowRight className="h-4 w-4" />
              </LocaleLink>
            </div>
          </div>

          <div className="grid gap-6">
            <LocaleLink
              to="/cake-preorder"
              className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-soft"
            >
              <img
                src={IMG.snickersCake}
                alt={t("Торт на заказ")}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/40 to-transparent" />
              <div className="relative p-6 md:p-8 h-full flex flex-col justify-end text-white">
                <Cake className="h-6 w-6" />
                <h3 className="mt-2 text-2xl font-semibold">{t("Торт к событию")}</h3>
                <p className="text-sm text-white/85">
                  {t("Соберите онлайн — заберите в удобной точке.")}
                </p>
              </div>
            </LocaleLink>
            <LocaleLink
              to="/catering"
              className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-soft"
            >
              <img
                src={IMG.pastryMix}
                alt={t("Кейтеринг SOFIYA")}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--gold)]/80 via-black/20 to-transparent" />
              <div className="relative p-6 md:p-8 h-full flex flex-col justify-end text-white">
                <Gift className="h-6 w-6" />
                <h3 className="mt-2 text-2xl font-semibold">{t("Кейтеринг")}</h3>
                <p className="text-sm text-white/85">
                  {t("Для офисов, событий и больших встреч.")}
                </p>
              </div>
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Preorder cakes carousel */}
      <ProductCarousel
        title={t("Торты на заказ")}
        subtitle={<>{t("Оформите торт к вашему празднику.")}</>}
        items={preorderPreview}
        action={
          <LocaleLink
            to="/cake-preorder"
            className="hidden md:inline-flex btn-primary btn-primary-hover"
          >
            {t("Оформить")} <ArrowRight className="h-4 w-4" />
          </LocaleLink>
        }
      />

      {/* Breakfast & Pizza */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <LocaleLink
            to="/catalog"
            search={{ cat: "breakfast" }}
            className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-soft"
          >
            <img
              src={IMG.beignets}
              alt={t("Завтраки в SOFIYA")}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="relative h-full p-8 md:p-10 flex flex-col justify-end text-white">
              <Sandwich className="h-6 w-6" />
              <h3 className="mt-2 text-3xl font-bold">{t("Завтраки")}</h3>
              <p className="mt-2 text-white/85 max-w-md">
                {t(
                  "Кофе, тёплая выпечка и лёгкие блюда. Загляните с утра — начните день правильно.",
                )}
              </p>
              <span className="mt-4 text-sm font-semibold text-[color:var(--gold)]">
                {t("Посмотреть завтраки →")}
              </span>
            </div>
          </LocaleLink>
          <LocaleLink
            to="/catalog"
            search={{ cat: "pizza" }}
            className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-soft"
          >
            <img
              src={pizzaImage ?? IMG.tartAssorti}
              alt={t("Пицца SOFIYA")}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="relative h-full p-8 md:p-10 flex flex-col justify-end text-white">
              <Pizza className="h-6 w-6" />
              <h3 className="mt-2 text-3xl font-bold">{t("Пицца для семьи")}</h3>
              <p className="mt-2 text-white/85 max-w-md">
                {t("Тонкое тесто, много начинки и настроение большого стола.")}
              </p>
              <span className="mt-4 text-sm font-semibold text-[color:var(--gold)]">
                {t("Посмотреть пиццу →")}
              </span>
            </div>
          </LocaleLink>
        </div>
      </section>

      {/* News & promotions */}
      <section className="container-page py-14 md:py-20">
        <div className="section-heading">
          <div>
            <p className="page-kicker">{t("Новости и акции")}</p>
            <h2>{t("Что нового")}</h2>
            <p>{t("Коллекции, события и предложения SOFIYA.")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LocaleLink to="/promotions" className="btn-primary btn-primary-hover">
              {t("Все акции")}
            </LocaleLink>
            <LocaleLink to="/news" className="btn-outline btn-outline-hover">
              {t("Все новости")}
            </LocaleLink>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} compact />
          ))}
        </div>
      </section>

      {/* Stores preview */}
      <section className="container-page py-14 md:py-20">
        <div className="section-heading">
          <div>
            <p className="page-kicker">{t("Сеть")}</p>
            <h2>{pick(`${stores.length} магазинов рядом`, `Жаныңызда ${stores.length} дүкен`)}</h2>
            <p>{t("Шымкент и Туркестанская область.")}</p>
          </div>
          <LocaleLink to="/stores" className="btn-outline btn-outline-hover">
            {t("Все магазины")}
          </LocaleLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredStores.map((s) => (
            <StoreCard key={s.id} s={s} />
          ))}
        </div>
      </section>

      {/* Catering CTA */}
      <section className="container-page py-14 md:py-20">
        <div className="rounded-[2.5rem] bg-[color:var(--cream)] p-8 md:p-14 grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Coffee className="h-3.5 w-3.5" /> {t("Кейтеринг")}
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground">
              {t("Для ваших событий")}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              {t(
                "Кофе-брейки, десертные столы, корпоративные праздники и большие заказы. Соберём меню под ваш формат.",
              )}
            </p>
            <LocaleLink to="/catering" className="mt-6 inline-flex btn-primary btn-primary-hover">
              {t("Оставить заявку")} <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(locale === "kk"
              ? [
                  ["Кофе-брейктер", "кездесулер мен конференцияларға"],
                  ["Десерт үстелдері", "мерекелер мен іс-шараларға"],
                  ["Үлкен тапсырыстар", "компаниялар мен командаларға"],
                ]
              : [
                  ["Кофе-брейки", "для встреч и конференций"],
                  ["Десертные столы", "для праздников и событий"],
                  ["Большие заказы", "для компаний и команд"],
                ]
            ).map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl bg-background p-5 border border-border/60 last:col-span-2"
              >
                <p className="text-lg font-semibold text-primary">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="container-page py-14 md:py-20">
        <div className="rounded-[2.5rem] overflow-hidden relative min-h-[320px] flex items-center">
          <img
            src={IMG.medovik}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
          <div className="relative container-page p-8 md:p-14 text-primary-foreground max-w-2xl">
            <Users className="h-8 w-8" />
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">{t("Станьте частью команды")}</h2>
            <p className="mt-3 text-white/85">
              {t(
                "Растущая сеть, обучение, разные направления работы: пекари, кондитеры, бариста, менеджеры.",
              )}
            </p>
            <LocaleLink
              to="/career"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-6 py-3 hover:bg-[color:var(--cream)] transition-colors"
            >
              {t("Посмотреть вакансии")} <ArrowRight className="h-4 w-4" />
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="container-page py-14 md:py-20">
        <div className="section-heading">
          <div>
            <p className="page-kicker">Instagram</p>
            <h2>{t("Десерты в кадре")}</h2>
            <p>
              {t("Подписывайтесь на")} {site.instagramHandle}
            </p>
          </div>
          <a
            href={instagramLink}
            target="_blank"
            rel="noreferrer"
            className="btn-primary btn-primary-hover"
          >
            <Instagram className="h-4 w-4" /> {t("Открыть Instagram")}
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {[
            IMG.cakeBerry,
            IMG.samsa,
            IMG.eclairs,
            IMG.tartAssorti,
            IMG.beignets,
            IMG.snickersCake,
            IMG.pastryMix,
            IMG.medovik,
            IMG.cakeBerry,
            IMG.samsa,
            IMG.eclairs,
            IMG.tartAssorti,
          ]
            .slice(0, 6)
            .map((src, i) => (
              <a
                key={i}
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt="SOFIYA"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors grid place-items-center">
                  <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
