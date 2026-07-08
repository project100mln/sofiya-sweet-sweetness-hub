import {
  Apple,
  BatteryFull,
  Check,
  ChevronLeft,
  Coffee,
  Gift,
  Home,
  Menu,
  MessageSquare,
  QrCode,
  Signal,
  Sparkles,
  SquarePlay,
  Star,
  User,
  Wifi,
} from "lucide-react";
import { SofiyaWordmark } from "./SofiyaWordmark";

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
                Готовим мобильное приложение SOFIYA Club: цифровая карта клиента, персональный
                QR-код, история покупок, бонусы и персональные предложения.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { i: Coffee, t: "5+1 кофе в подарок" },
                  { i: QrCode, t: "Персональный QR-код" },
                  { i: Gift, t: "Бонусы и подарки" },
                  { i: Sparkles, t: "Персональные предложения" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                      <Icon className="h-4 w-4" />
                    </span>
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
                  <span className="rounded-full bg-[color:var(--gold)] text-foreground text-[10px] font-bold px-2 py-0.5">
                    Скоро
                  </span>
                </span>
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 rounded-2xl bg-black/40 backdrop-blur border border-white/15 px-4 py-3 text-sm font-medium opacity-60 cursor-not-allowed select-none"
                >
                  <SquarePlay className="h-4 w-4" />
                  <span className="text-[10px] uppercase">Google Play</span>
                  <span className="rounded-full bg-[color:var(--gold)] text-foreground text-[10px] font-bold px-2 py-0.5">
                    Скоро
                  </span>
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              {/* decorative colored glow behind the device — purely visual, no interaction */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 -inset-y-8 rounded-[3rem] bg-gradient-to-br from-[color:var(--gold)]/40 via-white/10 to-transparent blur-3xl"
              />
              {/* soft ambient ground shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 inset-x-10 h-8 rounded-full bg-black/40 blur-2xl"
              />

              {/* device frame: metallic bezel > inner black gap > screen */}
              <div className="relative aspect-[9/16] rounded-[2.75rem] bg-gradient-to-b from-neutral-200 via-neutral-500 to-neutral-300 p-[3px] shadow-2xl">
                {/* side buttons */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[2px] top-[16%] h-7 w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-300"
                />
                <span
                  aria-hidden="true"
                  className="absolute -left-[2px] top-[24%] h-11 w-[3px] rounded-l-sm bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-300"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-[2px] top-[20%] h-14 w-[3px] rounded-r-sm bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-300"
                />

                <div className="h-full w-full rounded-[2.6rem] bg-gradient-to-b from-neutral-800 via-black to-neutral-800 p-[6px]">
                  <div className="relative h-full w-full rounded-[2.3rem] bg-background overflow-hidden">
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-black z-10 flex items-center justify-end pr-2.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-neutral-700 ring-1 ring-neutral-600"
                      />
                    </div>
                    <div className="h-full w-full flex flex-col overflow-y-auto p-4 pt-8 bg-gradient-to-br from-[color:var(--accent)] to-background">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-foreground/70">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <Signal className="h-3 w-3" />
                          <Wifi className="h-3 w-3" />
                          <BatteryFull className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70">
                          <ChevronLeft className="h-4 w-4" />
                        </span>
                        <SofiyaWordmark className="h-5 text-primary" />
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70">
                          <User className="h-4 w-4" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-foreground">
                        Программа лояльности
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Спасибо, что выбираете SOFIYA каждый день!
                      </p>
                      <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-[color:var(--secondary)] text-primary-foreground p-4 shadow-lift">
                        <p className="text-[10px] uppercase tracking-widest opacity-80">
                          Ваш бонус
                        </p>
                        <p className="mt-1 text-base font-bold leading-snug">
                          Купи 5 кофе — 6-й бесплатно
                        </p>
                        <p className="mt-1 text-[11px] opacity-85">
                          Собирайте штампы и получите любимый кофе в подарок!
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        {[1, 2, 3, 4, 5, 6].map((n) => {
                          const done = n <= 5;
                          return (
                            <div key={n} className="flex flex-1 flex-col items-center gap-1">
                              <div
                                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${done ? "bg-primary text-primary-foreground" : "border-2 border-dashed border-border text-muted-foreground"}`}
                              >
                                {done ? <Check className="h-4 w-4" /> : n}
                              </div>
                              <span className="text-[8px] leading-tight text-center text-muted-foreground">
                                {done ? (
                                  n
                                ) : (
                                  <>
                                    6-я
                                    <br />
                                    бесплатно
                                  </>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 flex items-center gap-3 rounded-xl bg-card border border-border/60 px-3 py-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Coffee className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-foreground">Ваш прогресс 5/6</p>
                          <p className="text-[10px] text-muted-foreground">
                            Ещё 1 кофе — и напиток в подарок!
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/60">
                        {[
                          { i: Home, t: "Главная", active: false },
                          { i: Menu, t: "Меню", active: false },
                          { i: Star, t: "Бонусы", active: true },
                          { i: MessageSquare, t: "Отзывы", active: false },
                          { i: User, t: "Профиль", active: false },
                        ].map(({ i: Icon, t, active }) => (
                          <div
                            key={t}
                            className={`flex flex-1 flex-col items-center gap-0.5 ${active ? "text-primary" : "text-muted-foreground"}`}
                          >
                            <span
                              className={`grid h-7 w-7 place-items-center rounded-full ${active ? "bg-primary/10" : ""}`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="text-[8px] font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
