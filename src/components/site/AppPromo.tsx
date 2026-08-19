import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Bell, Coffee, Gift, Play, QrCode, Sparkles } from "lucide-react";
import phoneSceneAsset from "@/assets/sofiya-club-mobile-scene.webp";
import { waLink } from "@/config/site";

const benefits = [
  { icon: Coffee, label: "5+1 кофе в подарок" },
  { icon: QrCode, label: "Персональный QR-код" },
  { icon: Gift, label: "Бонусы и подарки" },
  { icon: Sparkles, label: "Личные предложения" },
];

const reminderHref = waLink(
  "Здравствуйте! Сообщите мне, пожалуйста, когда запустится программа лояльности SOFIYA Club.",
);

export function AppPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const playRewardStory = (event: MouseEvent<HTMLButtonElement>) => {
    const story = event.currentTarget.closest<HTMLElement>("[data-loyalty-story]");
    if (!story) return;

    story
      .querySelector<HTMLElement>("[data-loyalty-phone]")
      ?.animate(
        [
          { transform: "translateY(0) rotate(0deg) scale(1)" },
          { transform: "translateY(-14px) rotate(-1.2deg) scale(1.035)", offset: 0.5 },
          { transform: "translateY(0) rotate(0deg) scale(1)" },
        ],
        { duration: 1500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );

    story.querySelectorAll<HTMLElement>("[data-loyalty-stamp]").forEach((stamp, index) => {
      stamp.animate(
        [
          { transform: "scale(0.82)", opacity: 0.42 },
          { transform: "scale(1.16)", opacity: 1, offset: 0.72 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: index === 5 ? 760 : 560,
          delay: index * 170,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="loyalty"
      data-testid="loyalty-section"
      className="relative scroll-mt-24 overflow-hidden"
      aria-label="Программа лояльности SOFIYA Club"
    >
      <div className="container-page py-3 md:py-24">
        <div
          className="loyalty-story-card loyalty-mobile-compact-card relative grid overflow-hidden rounded-[1.75rem] shadow-lift md:hidden"
          data-visible={isVisible}
          data-loyalty-story
          data-testid="loyalty-mobile-card"
        >
          <div className="loyalty-story-visual relative flex min-h-0 items-center justify-center overflow-hidden">
            <img
              src={phoneSceneAsset}
              alt="Экран приложения SOFIYA Club с прогрессом: пять из шести кофе"
              className="loyalty-phone-scene h-[124%] w-auto max-w-none select-none"
              data-loyalty-phone
              data-testid="loyalty-mobile-phone"
              draggable={false}
            />

            <button
              type="button"
              onClick={playRewardStory}
              className="absolute right-3 top-3 z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/25 bg-[#3d0d5a]/85 px-3 text-[0.68rem] font-semibold text-white shadow-lg backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4cc74]"
              data-testid="loyalty-mobile-play"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden /> Показать
            </button>
          </div>

          <div className="loyalty-story-copy relative z-10 flex min-h-0 flex-col px-5 pb-4 pt-3 text-white">
            <p className="loyalty-story-kicker inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/75">
              <Gift className="h-3.5 w-3.5" aria-hidden /> SOFIYA Club — скоро
            </p>

            <h2 className="loyalty-story-title mt-2 text-[1.9rem] font-semibold leading-[0.92] tracking-[-0.04em]">
              Ваш 6-й кофе — <span className="text-[#f4cc74]">бесплатно</span>
            </h2>

            <p className="loyalty-story-description mt-2 text-[0.7rem] leading-[1.05rem] text-white/80">
              Купите пять кофе — шестой получите в подарок. QR-код и бонусы всегда в телефоне.
            </p>

            <ol
              className="loyalty-stamps mt-3 grid grid-cols-6 gap-1.5"
              aria-label="Пять покупок — шестой кофе бесплатно"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className={`loyalty-stamp ${index === 5 ? "loyalty-stamp-final" : ""}`}
                  style={{ "--stamp-index": index } as CSSProperties}
                  data-loyalty-stamp
                  data-testid={index === 5 ? "loyalty-mobile-sixth-stamp" : undefined}
                >
                  <Coffee className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">
                    {index === 5 ? "Шестой кофе бесплатно" : `Покупка ${index + 1}`}
                  </span>
                </li>
              ))}
            </ol>

            <div className="loyalty-story-benefits mt-2.5 grid grid-cols-2 gap-2 text-[0.65rem] text-white/80">
              <span className="flex items-center gap-1.5">
                <QrCode className="h-3.5 w-3.5 shrink-0 text-[#f4cc74]" aria-hidden /> Персональный
                QR
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5 shrink-0 text-[#f4cc74]" aria-hidden /> Бонусы и
                подарки
              </span>
            </div>

            <a
              href={reminderHref}
              target="_blank"
              rel="noreferrer"
              className="loyalty-reminder-cta mt-auto flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-[#501072] shadow-lg active:scale-[0.98]"
              data-testid="loyalty-mobile-reminder"
            >
              <Bell className="h-3.5 w-3.5" aria-hidden /> Напомнить о запуске
            </a>
          </div>
        </div>

        <div
          className="loyalty-story-card relative hidden overflow-hidden rounded-[2.5rem] shadow-lift md:grid md:min-h-[35rem] md:grid-cols-[1.12fr_0.88fr] lg:min-h-[39rem]"
          data-visible={isVisible}
          data-loyalty-story
          data-testid="loyalty-desktop-card"
        >
          <div className="loyalty-story-visual relative order-2 flex h-full items-end justify-center overflow-hidden">
            <img
              src={phoneSceneAsset}
              alt="Экран приложения SOFIYA Club с прогрессом: пять из шести кофе"
              className="loyalty-phone-scene absolute bottom-[-3%] left-0 right-0 mx-auto h-[106%] w-auto max-w-none select-none lg:h-[110%]"
              data-loyalty-phone
              data-testid="loyalty-desktop-phone"
              draggable={false}
            />

            <button
              type="button"
              onClick={playRewardStory}
              className="loyalty-play-button absolute right-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-[#3d0d5a]/80 px-4 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#3d0d5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4cc74] focus-visible:ring-offset-2 focus-visible:ring-offset-[#67208c]"
              data-testid="loyalty-desktop-play"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden /> Показать бонус
            </button>
          </div>

          <div className="loyalty-story-copy relative z-10 order-1 flex flex-col justify-center px-10 py-12 text-white lg:px-14">
            <p className="loyalty-story-kicker inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
              <Gift className="h-4 w-4" aria-hidden /> SOFIYA Club — скоро
            </p>

            <h2 className="loyalty-story-title mt-4 max-w-[14ch] text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.04em] lg:text-[4rem]">
              Ваш 6-й кофе — <span className="text-[#f4cc74]">бесплатно</span>
            </h2>

            <p className="loyalty-story-description mt-5 max-w-[38rem] text-base leading-7 text-white/80">
              Купите пять кофе — шестой получите в подарок. Персональный QR-код, бонусы и история
              покупок всегда в телефоне.
            </p>

            <ol
              className="loyalty-stamps mt-6 grid max-w-[29rem] grid-cols-6 gap-3"
              aria-label="Пять покупок — шестой кофе бесплатно"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className={`loyalty-stamp ${index === 5 ? "loyalty-stamp-final" : ""}`}
                  style={{ "--stamp-index": index } as CSSProperties}
                  data-loyalty-stamp
                  data-testid={index === 5 ? "loyalty-desktop-sixth-stamp" : undefined}
                >
                  <Coffee className="h-5 w-5" aria-hidden />
                  <span className="sr-only">
                    {index === 5 ? "Шестой кофе бесплатно" : `Покупка ${index + 1}`}
                  </span>
                </li>
              ))}
            </ol>

            <div className="loyalty-story-benefits mt-6 grid max-w-[35rem] grid-cols-2 gap-x-4 gap-y-4 text-sm text-white/80">
              {benefits.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#f4cc74]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </span>
              ))}
            </div>

            <a
              href={reminderHref}
              target="_blank"
              rel="noreferrer"
              className="loyalty-reminder-cta mt-7 flex min-h-12 w-full max-w-[25rem] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#501072] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              data-testid="loyalty-desktop-reminder"
            >
              <Bell className="h-4 w-4" aria-hidden /> Напомнить о запуске
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
