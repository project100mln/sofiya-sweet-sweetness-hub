import { useEffect, useRef, useState } from "react";
import mockupAsset from "@/assets/sofiya-club-full.webp";

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
          className="loyalty-promo-card relative overflow-hidden rounded-[2.5rem] shadow-lift"
          data-visible={isVisible}
        >
          <img
            src={mockupAsset}
            alt="SOFIYA Club — купите 5 кофе, получите 6-й бесплатно"
            className="loyalty-promo-image block h-auto w-full select-none"
            data-testid="loyalty-image"
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
