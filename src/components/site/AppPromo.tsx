import mockupAsset from "@/assets/sofiya-club-full.png.asset.json";

export function AppPromo() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-lift">
          <img
            src={mockupAsset.url}
            alt="SOFIYA Club — купите 5 кофе, получите 6-й бесплатно"
            className="block w-full h-auto select-none"
            draggable={false}
          />

          {/* Invisible clickable overlays for App Store / Google Play buttons */}
          <a
            href="#"
            aria-label="App Store — скоро"
            className="absolute cursor-pointer"
            style={{ left: "11.2%", top: "76.5%", width: "17.5%", height: "9.5%" }}
          />
          <a
            href="#"
            aria-label="Google Play — скоро"
            className="absolute cursor-pointer"
            style={{ left: "29.9%", top: "76.5%", width: "17.5%", height: "9.5%" }}
          />
        </div>
      </div>
    </section>
  );
}
