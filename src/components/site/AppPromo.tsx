import { Apple, Coffee, Gift, QrCode, Sparkles, SquarePlay } from "lucide-react";

export function AppPromo() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-[color:var(--secondary)] text-primary-foreground overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 items-center p-8 md:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> SOFIYA Club — скоро
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                Купите 5 кофе — <br className="hidden md:block" />
                <span className="text-[color:var(--gold)]">получите 6-й бесплатно</span>
              </h2>
              <p className="mt-4 text-white/85 max-w-lg">
                Готовим мобильное приложение SOFIYA Club: цифровая карта клиента, персональный QR-код,
                история покупок, бонусы и персональные предложения.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { i: Coffee, t: "5+1 кофе в подарок" },
                  { i: QrCode, t: "Персональный QR-код" },
                  { i: Gift, t: "Бонусы и подарки" },
                  { i: Sparkles, t: "Персональные предложения" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15"><Icon className="h-4 w-4" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 rounded-2xl bg-black/40 backdrop-blur border border-white/15 px-4 py-3 text-sm font-medium opacity-60 cursor-not-allowed select-none"
                >
                  <Apple className="h-4 w-4" />
                  <span className="text-[10px] uppercase">App Store</span>
                  <span className="rounded-full bg-[color:var(--gold)] text-foreground text-[10px] font-bold px-2 py-0.5">Скоро</span>
                </span>
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 rounded-2xl bg-black/40 backdrop-blur border border-white/15 px-4 py-3 text-sm font-medium opacity-60 cursor-not-allowed select-none"
                >
                  <SquarePlay className="h-4 w-4" />
                  <span className="text-[10px] uppercase">Google Play</span>
                  <span className="rounded-full bg-[color:var(--gold)] text-foreground text-[10px] font-bold px-2 py-0.5">Скоро</span>
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[9/16] rounded-[2.5rem] bg-background border-[10px] border-black/60 shadow-2xl overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-2xl bg-black/60 z-10" />
                <div className="h-full w-full flex flex-col p-4 pt-8 bg-gradient-to-br from-[color:var(--accent)] to-background">
                  <div className="rounded-2xl bg-gradient-to-br from-primary to-[color:var(--secondary)] text-primary-foreground p-4 shadow-lift">
                    <p className="text-[10px] uppercase tracking-widest opacity-80">SOFIYA Club</p>
                    <p className="mt-1 text-lg font-semibold">Гость SOFIYA</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] opacity-80">Бонусы</p>
                        <p className="text-2xl font-bold">1 240</p>
                      </div>
                      <div className="h-14 w-14 rounded-lg bg-white/95 grid place-items-center">
                        <QrCode className="h-9 w-9 text-primary" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">5 кофе — 6-й в подарок</p>
                  <div className="mt-2 flex gap-1.5">
                    {[1,2,3,0,0].map((v,i) => (
                      <div key={i} className={`h-8 flex-1 rounded-lg border-2 ${v ? "border-primary bg-primary/10" : "border-dashed border-border"}`}>
                        {v ? <div className="grid place-items-center h-full text-primary"><Coffee className="h-4 w-4" /></div> : null}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">История</p>
                  <div className="mt-2 space-y-2">
                    {[
                      ["Капучино", "+50 бонусов"],
                      ["Медовик", "+120 бонусов"],
                      ["Самса", "+30 бонусов"],
                    ].map(([n,b]) => (
                      <div key={n} className="flex items-center justify-between rounded-xl bg-card border border-border/60 px-3 py-2 text-xs">
                        <span className="font-medium text-foreground">{n}</span>
                        <span className="text-primary font-semibold">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
