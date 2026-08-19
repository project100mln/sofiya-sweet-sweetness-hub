import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bell, Coffee, Gift, Play, QrCode, Sparkles } from "lucide-react";
import phoneSceneAsset from "@/assets/sofiya-club-mobile-scene.webp";
import { waLink } from "@/config/site";

const benefits = [
  { icon: Coffee, label: "5+1 кофе в подарок" },
  { icon: QrCode, label: "Персональный QR-код" },
  { icon: Gift, label: "Бонусы и подарки" },
  { icon: Sparkles, label: "Личные предложения" },
];

export function AppPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
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

  const playRewardStory = () => {
    const story = storyRef.current;
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
      <div className="container-page py-16 md:py-24">
        <div
          ref={storyRef}
          className="loyalty-story-card relative overflow-hidden rounded-[2rem] shadow-lift md:grid md:min-h-[35rem] md:grid-cols-[1.12fr_0.88fr] md:rounded-[2.5rem] lg:min-h-[39rem]"
          data-visible={isVisible}
          data-testid="loyalty-story-card"
        >
          <div className="loyalty-story-visual relative flex h-[20rem] items-end justify-center overflow-hidden sm:h-[24rem] md:order-2 md:h-full">
            <img
              src={phoneSceneAsset}
              alt="Экран приложения SOFIYA Club с прогрессом: пять из шести кофе"
              className="loyalty-phone-scene relative h-[108%] w-auto max-w-none select-none sm:h-[112%] md:absolute md:bottom-[-3%] md:left-0 md:right-0 md:mx-auto md:h-[106%] lg:h-[110%]"
              data-loyalty-phone
              data-testid="loyalty-phone-scene"
              draggable={false}
            />

            <button
              type="button"
              onClick={playRewardStory}
              className="loyalty-play-button absolute right-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-[#3d0d5a]/80 px-4 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#3d0d5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4cc74] focus-visible:ring-offset-2 focus-visible:ring-offset-[#67208c] md:right-5 md:top-5"
              data-testid="loyalty-play-button"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden /> Показать бонус
            </button>
          </div>

          <div className="loyalty-story-copy relative z-10 flex flex-col justify-center px-6 pb-8 pt-7 text-white sm:px-9 md:order-1 md:px-10 md:py-12 lg:px-14">
            <p className="loyalty-story-kicker inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-sm">
              <Gift className="h-4 w-4" aria-hidden /> SOFIYA Club — скоро
            </p>

            <h2 className="loyalty-story-title mt-4 max-w-[14ch] text-[2.45rem] font-semibold leading-[0.96] tracking-[-0.04em] sm:text-5xl md:text-[3.25rem] lg:text-[4rem]">
              Ваш 6-й кофе — <span className="text-[#f4cc74]">бесплатно</span>
            </h2>

            <p className="loyalty-story-description mt-5 max-w-[38rem] text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              Купите пять кофе — шестой получите в подарок. Персональный QR-код, бонусы и история
              покупок всегда в телефоне.
            </p>

            <ol
              className="loyalty-stamps mt-6 grid max-w-[29rem] grid-cols-6 gap-2 sm:gap-3"
              aria-label="Пять покупок — шестой кофе бесплатно"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className={`loyalty-stamp ${index === 5 ? "loyalty-stamp-final" : ""}`}
                  style={{ "--stamp-index": index } as CSSProperties}
                  data-loyalty-stamp
                  data-testid={index === 5 ? "loyalty-sixth-stamp" : undefined}
                >
                  <Coffee className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                  <span className="sr-only">
                    {index === 5 ? "Шестой кофе бесплатно" : `Покупка ${index + 1}`}
                  </span>
                </li>
              ))}
            </ol>

            <div className="loyalty-story-benefits mt-6 grid max-w-[35rem] grid-cols-2 gap-x-4 gap-y-4 text-xs text-white/80 sm:text-sm md:grid-cols-2">
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
              href={waLink(
                "Здравствуйте! Сообщите мне, пожалуйста, когда запустится программа лояльности SOFIYA Club.",
              )}
              target="_blank"
              rel="noreferrer"
              className="loyalty-reminder-cta mt-7 flex min-h-12 w-full max-w-[25rem] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#501072] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              data-testid="loyalty-reminder-link"
            >
              <Bell className="h-4 w-4" aria-hidden /> Напомнить о запуске
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
