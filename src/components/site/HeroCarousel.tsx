import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { IMG } from "@/data/catalog";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";

interface Slide {
  eyebrow: ReactNode;
  title: ReactNode;
  desc: string;
  cta: string;
  href: string;
  image: string;
  search?: Record<string, string>;
}

const slides: Slide[] = [
  {
    eyebrow: <>Кондитерская <SofiyaWordmark /></>,
    title: <>Фирменные торты <SofiyaWordmark /></>,
    desc: "Ягоды, шоколад, крем и настроение праздника — в каждом торте.",
    cta: "Смотреть каталог",
    href: "/catalog",
    image: IMG.cakeBerry,
    search: { cat: "cakes" },
  },
  {
    eyebrow: "Каждое утро",
    title: "Свежая выпечка каждый день",
    desc: "Слойки, самса и десерты из наших пекарен — только что из печи.",
    cta: "Выбрать выпечку",
    href: "/catalog",
    image: IMG.samsa,
    search: { cat: "pastry" },
  },
  {
    eyebrow: <>Утро в <SofiyaWordmark /></>,
    title: <>Завтраки в <SofiyaWordmark /></>,
    desc: "Кофе, тёплая выпечка и лёгкие блюда — начните день правильно.",
    cta: "Посмотреть завтраки",
    href: "/catalog",
    image: IMG.beignets,
    search: { cat: "breakfast" },
  },
  {
    eyebrow: "Для семьи",
    title: "Пицца для семьи и компании",
    desc: "Тонкое тесто, много начинки и настроение большого стола.",
    cta: "Посмотреть пиццу",
    href: "/catalog",
    image: IMG.pastryMix,
    search: { cat: "pizza" },
  },
  {
    eyebrow: "Событие ждёт торта",
    title: "Торт к вашему событию",
    desc: "Соберите торт по своему сценарию — за 3 минуты, прямо на сайте.",
    cta: "Оформить предзаказ",
    href: "/cake-preorder",
    image: IMG.snickersCake,
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const s = slides[i];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[color:var(--accent)] to-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page grid gap-8 lg:grid-cols-2 items-center py-10 md:py-16 lg:py-20">
        <div key={i} className="animate-fade-up order-2 lg:order-1">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            {s.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            {s.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">{s.desc}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={s.href} search={s.search as never} className="btn-primary btn-primary-hover">
              {s.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/stores" className="btn-outline btn-outline-hover">
              Найти магазин
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Слайд ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-primary" : "w-4 bg-primary/20"}`}
              />
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl -z-10" />
          <div
            key={s.image}
            className="animate-fade-up relative aspect-[4/5] md:aspect-[5/6] rounded-[2rem] overflow-hidden shadow-lift"
          >
            <img src={s.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1">
              <SofiyaWordmark /> · Fresh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
