import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IMG, products } from "@/data/catalog";
import { LocaleLink, useI18n } from "@/i18n";

interface Slide {
  eyebrow: ReactNode;
  title: ReactNode;
  desc: ReactNode;
  cta: string;
  href: string;
  image: string;
  imageHd?: string;
  imageAlt: string;
  imagePosition?: string;
  productFocus?: boolean;
  search?: Record<string, string>;
  kk: Pick<Slide, "eyebrow" | "title" | "desc" | "cta" | "imageAlt">;
}

const slides: Slide[] = [
  {
    eyebrow: "SOFIYA — с 2014 года",
    title: (
      <>
        Незабываемый
        <br />
        <span className="hero-title-line whitespace-nowrap">вкус каждый день</span>
      </>
    ),
    desc: (
      <>
        Экономим людям время и деньги,
        <br />
        чтобы дарить незабываемый вкус!
      </>
    ),
    cta: "Выбрать десерт",
    href: "/catalog",
    image: IMG.cakeBerry,
    imageHd: IMG.cakeBerryHd,
    imageAlt: "Фирменный торт SOFIYA с ягодами и логотипом",
    imagePosition: "56% 48%",
    productFocus: true,
    search: { cat: "cakes" },
    kk: {
      eyebrow: "SOFIYA — 2014 жылдан бері",
      title: (
        <>
          <span className="hero-title-line whitespace-nowrap">Күн сайын</span>
          <br />
          ұмытылмас дәм
        </>
      ),
      desc: (
        <>
          Адамдардың уақыты мен ақшасын үнемдеп,
          <br />
          ұмытылмас дәм сыйлаймыз!
        </>
      ),
      cta: "Десерт таңдау",
      imageAlt: "Жидектермен және логотиппен безендірілген SOFIYA фирмалық торты",
    },
  },
  {
    eyebrow: "Каждое утро",
    title: "Свежая выпечка каждый день",
    desc: "Слойки, самса и десерты — только что из печи.",
    cta: "Выбрать выпечку",
    href: "/catalog",
    image: IMG.samsa,
    imageAlt: "Свежая выпечка SOFIYA",
    imagePosition: "62% 56%",
    search: { cat: "pastry" },
    kk: {
      eyebrow: "Күн сайын таңертең",
      title: "Күн сайын балғын пісірмелер",
      desc: "Қатпарлы қамыр өнімдері, самса мен десерттер — пештен жаңа шыққан.",
      cta: "Пісірме таңдау",
      imageAlt: "SOFIYA балғын пісірмелері",
    },
  },
  {
    eyebrow: "Завтраки",
    title: "Утро начинается вкусно",
    desc: "Свежий кофе, тёплая выпечка и лёгкие завтраки — каждый день.",
    cta: "Посмотреть меню",
    href: "/catalog",
    image: IMG.beignets,
    imageAlt: "Завтрак и свежая выпечка SOFIYA",
    imagePosition: "65% 58%",
    search: { cat: "breakfast" },
    kk: {
      eyebrow: "Таңғы ас",
      title: "Таң дәмді басталады",
      desc: "Күн сайын балғын кофе, жылы пісірмелер және жеңіл таңғы ас.",
      cta: "Мәзірді көру",
      imageAlt: "SOFIYA таңғы асы мен балғын пісірмелері",
    },
  },
  {
    eyebrow: "Для семьи",
    title: "Пицца для семьи и компании",
    desc: "Тонкое тесто, много начинки и настроение большого стола.",
    cta: "Посмотреть пиццу",
    href: "/catalog",
    image: products.find((product) => product.categoryId === "pizza")?.images[0] ?? IMG.pastryMix,
    imageAlt: "Пицца SOFIYA для семьи",
    imagePosition: "62% 52%",
    search: { cat: "pizza" },
    kk: {
      eyebrow: "Отбасыға",
      title: "Отбасы мен достарға арналған пицца",
      desc: "Жұқа қамыр, мол салма және үлкен дастарқанның көңіл күйі.",
      cta: "Пиццаны көру",
      imageAlt: "Отбасыға арналған SOFIYA пиццасы",
    },
  },
  {
    eyebrow: "Событие ждёт торта",
    title: "Торт к вашему событию",
    desc: "Соберите торт по своему сценарию — за 3 минуты, прямо на сайте.",
    cta: "Оформить предзаказ",
    href: "/cake-preorder",
    image: IMG.snickersCake,
    imageAlt: "Торт SOFIYA на заказ",
    imagePosition: "66% 54%",
    kk: {
      eyebrow: "Іс-шараға торт керек",
      title: "Іс-шараңызға арналған торт",
      desc: "Тортты өз қалауыңыз бойынша тікелей сайтта 3 минутта құрастырыңыз.",
      cta: "Алдын ала тапсырыс беру",
      imageAlt: "Тапсырыспен дайындалатын SOFIYA торты",
    },
  },
];

export function HeroCarousel() {
  const { locale, t } = useI18n();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  const showPrevious = () => setI((value) => (value - 1 + slides.length) % slides.length);
  const showNext = () => setI((value) => (value + 1) % slides.length);

  const source = slides[i];
  const s = locale === "kk" ? { ...source, ...source.kk } : source;

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!sectionRef.current?.contains(event.relatedTarget)) setPaused(false);
      }}
      aria-roledescription={t("карусель")}
      aria-label={t("Предложения SOFIYA")}
      data-testid="hero-carousel"
    >
      <div className="hero-shell relative isolate overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem]">
        <img
          key={s.image}
          src={s.image}
          srcSet={s.imageHd ? `${s.image} 1280w, ${s.imageHd} 2560w` : undefined}
          sizes="100vw"
          alt={s.imageAlt}
          className="hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: s.imagePosition }}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
        {s.productFocus && (
          <img
            src={s.image}
            srcSet={s.imageHd ? `${s.image} 1280w, ${s.imageHd} 2560w` : undefined}
            sizes="(min-width: 768px) 76vw, 100vw"
            alt=""
            className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[76%] select-none object-cover md:block"
            style={{ objectPosition: "50% 48%" }}
            aria-hidden
          />
        )}
        <div className="hero-overlay absolute inset-0" aria-hidden />

        <div
          key={i}
          className="hero-copy animate-fade-up relative z-10 flex h-full flex-col justify-center text-white"
        >
          <span
            className="hero-eyebrow text-xs font-bold uppercase tracking-[0.08em] text-primary md:text-sm"
            data-testid="hero-eyebrow"
          >
            {s.eyebrow}
          </span>
          <h1 className="hero-title mt-5 max-w-none text-[clamp(1.9rem,9vw,2.6rem)] font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[4.8rem]">
            {s.title}
          </h1>
          <p className="mt-5 max-w-[27rem] text-sm leading-6 text-white/82 sm:text-base md:text-lg md:leading-8">
            {s.desc}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
            <LocaleLink
              to={s.href}
              search={s.search as never}
              className="hero-cta inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-primary px-7 text-sm font-bold text-primary-foreground shadow-[0_16px_36px_-20px_rgba(90,4,189,0.95)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#6f19d2] hover:shadow-[0_18px_40px_-20px_rgba(90,4,189,1)] md:min-h-18 md:px-14 md:text-xl"
            >
              {s.cta}
            </LocaleLink>
          </div>
        </div>

        <div className="hero-controls absolute bottom-9 left-6 z-20 flex items-center gap-3 sm:left-9 md:bottom-16 md:left-16 md:gap-4 lg:left-[4.75rem]">
          <button
            type="button"
            onClick={showPrevious}
            className="hero-arrow grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-colors hover:bg-white/22 md:h-14 md:w-14"
            aria-label={t("Предыдущий слайд")}
            data-testid="hero-previous"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label={t("Слайды")}>
            {slides.map((slide, idx) => (
              <button
                key={slide.cta}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`${t("Слайд")} ${idx + 1}`}
                aria-selected={idx === i}
                role="tab"
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-[color:var(--hero-accent)]" : "w-5 bg-white/34"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={showNext}
            className="hero-arrow ml-3 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-colors hover:bg-white/22 md:ml-5 md:h-14 md:w-14"
            aria-label={t("Следующий слайд")}
            data-testid="hero-next"
          >
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
          </button>
        </div>

        <div
          className="absolute bottom-5 left-6 z-20 h-[2px] w-[17rem] max-w-[70%] overflow-hidden bg-white/30 sm:left-9 md:bottom-12 md:left-16 md:w-[25rem] lg:left-[4.75rem]"
          aria-hidden
        >
          <span
            className="block h-full bg-[color:var(--hero-accent)] transition-[width] duration-500"
            data-testid="hero-progress"
            style={{ width: `${((i + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
