import mockupAsset from "@/assets/sofiya-club-full.webp";

export function AppPromo() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-lift">
          <img
            src={mockupAsset}
            alt="SOFIYA Club — купите 5 кофе, получите 6-й бесплатно"
            className="block w-full h-auto select-none"
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
