import { Apple, Coffee, Gift, QrCode, Sparkles, SquarePlay } from "lucide-react";
import { SofiyaWordmark } from "./SofiyaWordmark";
import mockupAsset from "@/assets/sofiya-club-mockup.png.asset.json";

export function AppPromo() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div
          className="relative rounded-[2.5rem] overflow-hidden text-primary-foreground shadow-lift"
          style={{
            background:
              "radial-gradient(ellipse at top left, oklch(0.42 0.22 316) 0%, oklch(0.34 0.22 316) 55%, oklch(0.24 0.18 316) 100%)",
          }}
        >
          {/* ambient glows */}
          <div className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-[color:var(--gold)]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 w-[520px] h-[520px] rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 items-center p-8 md:p-14">
            {/* --- LEFT COPY --- */}
            <div>
              <div className="font-[family-name:var(--font-display)] text-[color:var(--gold)] text-4xl md:text-5xl italic tracking-tight">
                Sofiya
              </div>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <Gift className="h-3.5 w-3.5" /> SOFIYA Club — скоро
              </span>

              <h2
                className="mt-5 font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[1.05] font-normal"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                Купите 5 кофе —
                <br />
                <span className="italic text-white">
                  получите{" "}
                  <span className="text-[color:var(--gold)]">6-й бесплатно</span>
                </span>
              </h2>

              <p className="mt-5 text-white/85 max-w-lg leading-relaxed">
                Готовим мобильное приложение SOFIYA Club: цифровая карта клиента,
                персональный QR-код, история покупок, бонусы и персональные
                предложения.
              </p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  { i: Coffee, t: "5+1 кофе в подарок" },
                  { i: QrCode, t: "Персональный QR-код" },
                  { i: Gift, t: "Бонусы и подарки" },
                  { i: Sparkles, t: "Персональные предложения" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
                      <Icon className="h-4 w-4 text-[color:var(--gold)]" />
                    </span>
                    <span className="text-white/90">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  { I: Apple, label: "App Store" },
                  { I: SquarePlay, label: "Google Play" },
                ].map(({ I, label }) => (
                  <span
                    key={label}
                    aria-disabled="true"
                    className="inline-flex items-center gap-3 rounded-2xl bg-transparent ring-1 ring-white/40 px-5 py-3 text-sm font-semibold select-none"
                  >
                    <I className="h-5 w-5" />
                    <span className="uppercase tracking-wide">{label}</span>
                    <span className="rounded-full bg-[color:var(--gold)] text-foreground text-[10px] font-bold px-2 py-0.5">
                      Скоро
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* --- RIGHT: MOCKUP IMAGE --- */}
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[560px] flex items-center justify-center lg:justify-end">
              <img
                src={mockupAsset.url}
                alt="Макет приложения SOFIYA Club — программа лояльности"
                className="w-full h-full object-cover object-right rounded-3xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
