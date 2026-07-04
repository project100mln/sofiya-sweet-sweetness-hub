import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { AppPromo } from "@/components/site/AppPromo";
import { StoreCard } from "@/components/site/StoreCard";
import { products, IMG } from "@/data/catalog";
import { stores } from "@/data/stores";
import { news } from "@/data/news";
import { site, instagramLink } from "@/config/site";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { ArrowRight, Cake, Coffee, Pizza, Sandwich, Instagram, Users, Gift, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const hero = products.filter((p) => p.isHero);
  const bestsellers = products.filter((p) => p.isBestseller);
  const fresh = products.filter((p) => p.isNew);
  const preorderPreview = products.filter((p) => p.isPreorder);
  const featuredStores = stores.slice(0, 6);

  return (
    <>
      <HeroCarousel />
      <CategoryGrid />

      <ProductCarousel
        title={<>Хиты <SofiyaWordmark /></>}
        subtitle="Самые любимые торты и десерты наших гостей."
        items={hero.length ? hero : bestsellers}
        action={<Link to="/catalog" className="hidden md:inline-flex btn-outline btn-outline-hover">Весь каталог</Link>}
      />

      <ProductCarousel
        title="Новинки"
        subtitle="Только что из пекарни — попробуйте первыми."
        items={fresh}
      />

      <AppPromo />

      {/* Seasonal editorial */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] min-h-[380px] shadow-soft">
            <img src={IMG.cakeBerry} alt="Ягодная коллекция SOFIYA" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent" />
            <div className="relative p-8 md:p-12 flex flex-col justify-end h-full text-white">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> Сезонная коллекция
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold max-w-lg">Ягодная коллекция <SofiyaWordmark /></h2>
              <p className="mt-3 max-w-md text-white/85">Свежие ягоды, воздушные кремы и лёгкие цитрусовые ноты — вкус тёплого сезона.</p>
              <Link to="/catalog" search={{ cat: "cakes" }} className="mt-6 w-fit btn-primary btn-primary-hover">Смотреть коллекцию <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="grid gap-6">
            <Link to="/cake-preorder" className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-soft">
              <img src={IMG.snickersCake} alt="Торт на заказ" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/40 to-transparent" />
              <div className="relative p-6 md:p-8 h-full flex flex-col justify-end text-white">
                <Cake className="h-6 w-6" />
                <h3 className="mt-2 text-2xl font-semibold">Торт к событию</h3>
                <p className="text-sm text-white/85">Соберите онлайн — заберите в удобной точке.</p>
              </div>
            </Link>
            <Link to="/catering" className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-soft">
              <img src={IMG.pastryMix} alt="Кейтеринг SOFIYA" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--gold)]/80 via-black/20 to-transparent" />
              <div className="relative p-6 md:p-8 h-full flex flex-col justify-end text-white">
                <Gift className="h-6 w-6" />
                <h3 className="mt-2 text-2xl font-semibold">Кейтеринг</h3>
                <p className="text-sm text-white/85">Для офисов, событий и больших встреч.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Preorder cakes carousel */}
      <ProductCarousel
        title="Торты на заказ"
        subtitle={<>Оформите фирменный торт <SofiyaWordmark /> к вашему празднику.</>}
        items={preorderPreview}
        action={<Link to="/cake-preorder" className="hidden md:inline-flex btn-primary btn-primary-hover">Оформить <ArrowRight className="h-4 w-4" /></Link>}
      />

      {/* Breakfast & Pizza */}
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/catalog" search={{ cat: "breakfast" }} className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-soft">
            <img src={IMG.beignets} alt="Завтраки в SOFIYA" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="relative h-full p-8 md:p-10 flex flex-col justify-end text-white">
              <Sandwich className="h-6 w-6" />
              <h3 className="mt-2 text-3xl font-bold">Завтраки в <SofiyaWordmark /></h3>
              <p className="mt-2 text-white/85 max-w-md">Кофе, тёплая выпечка и лёгкие блюда. Загляните с утра — начните день правильно.</p>
              <span className="mt-4 text-sm font-semibold text-[color:var(--gold)]">Посмотреть завтраки →</span>
            </div>
          </Link>
          <Link to="/catalog" search={{ cat: "pizza" }} className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-soft">
            <img src={IMG.tartAssorti} alt="Пицца SOFIYA" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="relative h-full p-8 md:p-10 flex flex-col justify-end text-white">
              <Pizza className="h-6 w-6" />
              <h3 className="mt-2 text-3xl font-bold">Пицца для семьи</h3>
              <p className="mt-2 text-white/85 max-w-md">Тонкое тесто, много начинки и настроение большого стола.</p>
              <span className="mt-4 text-sm font-semibold text-[color:var(--gold)]">Посмотреть пиццу →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* News & promotions */}
      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Новости и акции</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Что нового в <SofiyaWordmark /></h2>
          </div>
          <Link to="/news" className="btn-outline btn-outline-hover">Все новости</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {news.map((n) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="group rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-lift transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.cover} alt={n.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">{new Date(n.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stores preview */}
      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Сеть <SofiyaWordmark /></span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Магазины и кофейни</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">{stores.length} точек в Шымкенте, Ленгере, Аксукенте, Сайраме и Манкенте.</p>
          </div>
          <Link to="/stores" className="btn-outline btn-outline-hover">Все магазины</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredStores.map((s) => <StoreCard key={s.id} s={s} />)}
        </div>
      </section>

      {/* Catering CTA */}
      <section className="container-page py-14 md:py-20">
        <div className="rounded-[2.5rem] bg-[color:var(--cream)] p-8 md:p-14 grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Coffee className="h-3.5 w-3.5" /> Кейтеринг
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground"><SofiyaWordmark /> для ваших событий</h2>
            <p className="mt-3 text-muted-foreground max-w-xl">Кофе-брейки, десертные столы, корпоративные праздники и большие заказы. Соберём меню под ваш формат.</p>
            <Link to="/catering" className="mt-6 inline-flex btn-primary btn-primary-hover">Оставить заявку <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["50+", "гостей"], ["24 ч", "на подготовку"], ["16", "точек сети"], ["100%", "свежая выпечка"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-background p-5 border border-border/60">
                <p className="text-3xl font-bold text-primary">{n}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="container-page py-14 md:py-20">
        <div className="rounded-[2.5rem] overflow-hidden relative min-h-[320px] flex items-center">
          <img src={IMG.medovik} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
          <div className="relative container-page p-8 md:p-14 text-primary-foreground max-w-2xl">
            <Users className="h-8 w-8" />
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Станьте частью команды SOFIYA</h2>
            <p className="mt-3 text-white/85">Растущая сеть, обучение, разные направления работы: пекари, кондитеры, бариста, менеджеры.</p>
            <Link to="/career" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-6 py-3 hover:bg-[color:var(--cream)] transition-colors">Посмотреть вакансии <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Instagram</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold"><SofiyaWordmark /> в кадре</h2>
            <p className="mt-2 text-muted-foreground">Подписывайтесь на {site.instagramHandle}</p>
          </div>
          <a href={instagramLink} target="_blank" rel="noreferrer" className="btn-primary btn-primary-hover">
            <Instagram className="h-4 w-4" /> Открыть Instagram
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {[IMG.cakeBerry, IMG.samsa, IMG.eclairs, IMG.tartAssorti, IMG.beignets, IMG.snickersCake, IMG.pastryMix, IMG.medovik, IMG.cakeBerry, IMG.samsa, IMG.eclairs, IMG.tartAssorti].slice(0, 6).map((src, i) => (
            <a key={i} href={instagramLink} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl">
              <img src={src} alt="SOFIYA" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
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
