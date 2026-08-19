import { useEffect, useRef, useState } from "react";
import { Bell, Coffee, Gift, QrCode } from "lucide-react";
import mockupAsset from "@/assets/sofiya-club-full.webp";
import mobileSceneAsset from "@/assets/sofiya-club-mobile-scene.webp";
import { waLink } from "@/config/site";

export function AppPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
          className="loyalty-mobile-card relative overflow-hidden rounded-[2rem] shadow-lift md:hidden"
          data-visible={isVisible}
          data-testid="loyalty-mobile-card"
        >
          <div className="loyalty-mobile-visual relative h-[27rem] overflow-hidden" aria-hidden>
            <img
              src={mobileSceneAsset}
              alt=""
              className="loyalty-mobile-phone-scene absolute left-1/2 top-0 h-auto w-[110%] max-w-none select-none"
              data-testid="loyalty-mobile-scene"
              draggable={false}
            />
          </div>

          <div className="loyalty-mobile-copy relative px-6 pb-7 pt-5 text-white">
            <p className="loyalty-mobile-kicker inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              <Gift className="h-4 w-4" aria-hidden /> SOFIYA Club — скоро
            </p>
            <h2 className="loyalty-mobile-title mt-3 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.035em]">
              Ваш 6-й кофе — <span className="text-[#f4cc74]">бесплатно</span>
            </h2>
            <p className="loyalty-mobile-description mt-4 text-sm leading-6 text-white/80">
              Купите пять кофе — шестой получите в подарок. Персональный QR-код и бонусы всегда в
              телефоне.
            </p>

            <ol
              className="loyalty-mobile-stamps mt-5 grid grid-cols-6 gap-2"
              aria-label="Пять покупок — шестой кофе бесплатно"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <li
                  key={index}
                  className={`loyalty-mobile-stamp ${index === 5 ? "loyalty-mobile-stamp-final" : ""}`}
                  style={index < 5 ? { animationDelay: `${0.78 + index * 0.13}s` } : undefined}
                  data-testid={index === 5 ? "loyalty-sixth-stamp" : undefined}
                >
                  <Coffee className="h-4 w-4" aria-hidden />
                  <span className="sr-only">
                    {index === 5 ? "Шестой кофе бесплатно" : `Покупка ${index + 1}`}
                  </span>
                </li>
              ))}
            </ol>

            <div className="loyalty-mobile-benefits mt-5 grid grid-cols-2 gap-3 text-xs text-white/80">
              <span className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-[#f4cc74]" aria-hidden /> Персональный QR
              </span>
              <span className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-[#f4cc74]" aria-hidden /> Бонусы и подарки
              </span>
            </div>

            <a
              href={waLink(
                "Здравствуйте! Сообщите мне, пожалуйста, когда запустится программа лояльности SOFIYA Club.",
              )}
              target="_blank"
              rel="noreferrer"
              className="loyalty-mobile-cta mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#501072] shadow-lg transition-transform active:scale-[0.98]"
              data-testid="loyalty-reminder-link"
            >
              <Bell className="h-4 w-4" aria-hidden /> Напомнить о запуске
            </a>
          </div>
        </div>

        <div
          className="loyalty-promo-card relative hidden overflow-hidden rounded-[2.5rem] shadow-lift md:block"
          data-visible={isVisible}
        >
          <img
            src={mockupAsset}
            alt="SOFIYA Club — купите 5 кофе, получите 6-й бесплатно"
            className="loyalty-promo-image block h-auto w-full select-none"
            data-testid="loyalty-desktop-image"
            draggable={false}
          />

          <span
            aria-label="Приложение в App Store скоро появится"
            className="absolute cursor-not-allowed"
            style={{ left: "11.2%", top: "76.5%", width: "17.5%", height: "9.5%" }}
          />
          <span
            aria-label="Приложение в Google Play скоро появится"
            className="absolute cursor-not-allowed"
            style={{ left: "29.9%", top: "76.5%", width: "17.5%", height: "9.5%" }}
          />
        </div>
      </div>
    </section>
  );
}
