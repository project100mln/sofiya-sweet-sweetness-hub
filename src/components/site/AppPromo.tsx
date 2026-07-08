import {
  Apple,
  BatteryFull,
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

/* --- decorative SVGs --- */

function Leaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="leafGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f6d98a" />
          <stop offset="60%" stopColor="#c9a24a" />
          <stop offset="100%" stopColor="#8a6a2a" />
        </linearGradient>
      </defs>
      <path
        d="M60 4 C 20 40, 8 110, 60 196 C 112 110, 100 40, 60 4 Z"
        fill="url(#leafGold)"
        opacity="0.9"
      />
      <path
        d="M60 12 L60 190"
        stroke="#5a4218"
        strokeWidth="1.2"
        opacity="0.5"
      />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 30 + i * 18;
        const w = 30 - Math.abs(i - 4) * 3;
        return (
          <g key={i} opacity="0.45">
            <path d={`M60 ${y} Q ${60 - w} ${y + 6}, ${60 - w - 6} ${y + 14}`} stroke="#5a4218" strokeWidth="0.8" fill="none" />
            <path d={`M60 ${y} Q ${60 + w} ${y + 6}, ${60 + w + 6} ${y + 14}`} stroke="#5a4218" strokeWidth="0.8" fill="none" />
          </g>
        );
      })}
    </svg>
  );
}

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" fill="none">
      <g stroke="oklch(0.55 0.15 316)" strokeWidth="1" opacity="0.35">
        <path d="M20 140 C 60 100, 90 60, 140 20" fill="none" />
        {Array.from({ length: 6 }).map((_, i) => {
          const t = i / 5;
          const x = 20 + (140 - 20) * t;
          const y = 140 - (140 - 20) * t;
          return (
            <g key={i}>
              <ellipse cx={x - 10} cy={y - 4} rx="10" ry="4" transform={`rotate(-30 ${x - 10} ${y - 4})`} fill="oklch(0.7 0.12 316)" fillOpacity="0.25" />
              <ellipse cx={x + 10} cy={y + 4} rx="10" ry="4" transform={`rotate(150 ${x + 10} ${y + 4})`} fill="oklch(0.7 0.12 316)" fillOpacity="0.25" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function CoffeeStamp({ n, gift = false }: { n: number; gift?: boolean }) {
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 64 64" className="h-11 w-11" aria-hidden="true">
        <defs>
          <radialGradient id={`stampGrad${n}`} cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="oklch(0.6 0.22 316)" />
            <stop offset="100%" stopColor="oklch(0.4 0.22 316)" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill={gift ? "oklch(0.78 0.14 82)" : `url(#stampGrad${n})`} />
        <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeDasharray="2 2" />
        {gift ? (
          <g fill="oklch(0.25 0.05 300)">
            <rect x="20" y="28" width="24" height="18" rx="2" />
            <rect x="18" y="24" width="28" height="6" rx="1.5" />
            <rect x="30" y="24" width="4" height="22" />
            <path d="M32 24 C 26 18, 20 22, 24 26 C 26 27, 30 26, 32 24 Z" />
            <path d="M32 24 C 38 18, 44 22, 40 26 C 38 27, 34 26, 32 24 Z" />
          </g>
        ) : (
          <g fill="white">
            {/* coffee cup */}
            <path d="M20 26 h22 v10 a8 8 0 0 1 -8 8 h-6 a8 8 0 0 1 -8 -8 z" />
            <path d="M42 28 h4 a4 4 0 0 1 0 8 h-4" fill="none" stroke="white" strokeWidth="2" />
            {/* saucer */}
            <ellipse cx="31" cy="47" rx="14" ry="2" />
            {/* steam */}
            <path d="M25 22 c 0 -3 3 -3 3 -6 M31 22 c 0 -3 3 -3 3 -6 M37 22 c 0 -3 3 -3 3 -6" stroke="white" strokeWidth="1.2" fill="none" opacity="0.85" />
          </g>
        )}
      </svg>
      <span className={`mt-1 text-[9px] font-bold ${gift ? "text-[color:var(--gold)]" : "text-primary"}`}>
        {gift ? "6-я\u00A0бесплатно" : n}
      </span>
    </div>
  );
}

function LatteCup({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cupBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9dfd0" />
        </linearGradient>
        <radialGradient id="foam" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#f5ead6" />
          <stop offset="100%" stopColor="#c9a97a" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="58" rx="20" ry="3" fill="rgba(0,0,0,0.15)" />
      <path d="M14 20 h36 l-3 32 a6 6 0 0 1 -6 5 h-18 a6 6 0 0 1 -6 -5 z" fill="url(#cupBody)" stroke="oklch(0.5 0.02 300)" strokeWidth="0.8" />
      <ellipse cx="32" cy="20" rx="18" ry="5" fill="url(#foam)" stroke="oklch(0.5 0.02 300)" strokeWidth="0.8" />
      {/* latte art leaf */}
      <path d="M32 15 C 28 18, 26 22, 32 25 C 38 22, 36 18, 32 15 Z" fill="oklch(0.45 0.06 40)" opacity="0.75" />
      <path d="M32 17 v8" stroke="#fff" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}


export function AppPromo() {
  const stamps = [1, 2, 3, 4, 5];

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

          {/* floating leaves */}
          <Leaf className="pointer-events-none absolute -left-4 top-6 w-24 md:w-32 rotate-[-25deg] opacity-80" />
          <Leaf className="pointer-events-none absolute left-10 bottom-4 w-20 md:w-28 rotate-[35deg] opacity-70" />
          <Leaf className="pointer-events-none absolute right-4 top-1/3 w-24 md:w-36 rotate-[18deg] opacity-80" />
          <Leaf className="pointer-events-none absolute -right-6 -bottom-6 w-28 md:w-40 rotate-[-40deg] opacity-70" />
          <Sparkles className="pointer-events-none absolute right-1/3 bottom-10 h-6 w-6 text-[color:var(--gold)]/70" />

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

            {/* --- RIGHT: 3D PHONE --- */}
            <div
              className="relative mx-auto w-full max-w-[360px]"
              style={{ perspective: "1600px" }}
            >
              {/* huge ambient shadow under device */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-full bg-black/60 blur-3xl"
              />

              <div
                className="relative aspect-[9/19] rounded-[3rem] bg-gradient-to-b from-neutral-200 via-neutral-500 to-neutral-300 p-[3px]"
                style={{
                  transform: "rotateY(-18deg) rotateX(6deg) rotateZ(-2deg)",
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 40px 80px -20px rgba(0,0,0,0.6), 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                {/* side buttons */}
                <span aria-hidden className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l-sm bg-neutral-500" />
                <span aria-hidden className="absolute -left-[3px] top-[26%] h-12 w-[3px] rounded-l-sm bg-neutral-500" />
                <span aria-hidden className="absolute -right-[3px] top-[22%] h-16 w-[3px] rounded-r-sm bg-neutral-500" />

                <div className="h-full w-full rounded-[2.85rem] bg-black p-[6px]">
                  <div className="relative h-full w-full rounded-[2.5rem] bg-gradient-to-br from-[color:var(--accent)] via-white to-[color:var(--cream)] overflow-hidden">
                    {/* dynamic island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-black z-20 flex items-center justify-end pr-2.5">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-neutral-700 ring-1 ring-neutral-600" />
                    </div>

                    {/* decorative sprig inside screen */}
                    <Sprig className="pointer-events-none absolute -right-6 top-16 w-40 opacity-70" />
                    <Sprig className="pointer-events-none absolute -left-8 bottom-20 w-32 opacity-40 rotate-180" />

                    <div className="relative z-10 h-full w-full flex flex-col p-4 pt-9">
                      {/* status bar */}
                      <div className="flex items-center justify-between text-[10px] font-semibold text-foreground/70">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <Signal className="h-3 w-3" />
                          <Wifi className="h-3 w-3" />
                          <BatteryFull className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      {/* header */}
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-full bg-white shadow ring-1 ring-black/5"
                          aria-label="Назад"
                        >
                          <ChevronLeft className="h-4 w-4 text-foreground" />
                        </button>
                        <SofiyaWordmark className="h-6 text-primary" />
                        <button
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-full bg-white shadow ring-1 ring-black/5"
                          aria-label="Профиль"
                        >
                          <User className="h-4 w-4 text-foreground" />
                        </button>
                      </div>

                      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-tight text-foreground">
                        Программа
                        <br />
                        лояльности
                      </h3>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Спасибо, что выбираете Sofiya каждый день!
                      </p>

                      {/* --- SCALLOPED TICKET CARD --- */}
                      <div
                        className="relative mt-4 bg-white shadow-lift"
                        style={{
                          WebkitMaskImage:
                            "radial-gradient(circle 5px at 5px 50%, transparent 5px, #000 5.5px) left / 10px 20px repeat-y, radial-gradient(circle 5px at calc(100% - 5px) 50%, transparent 5px, #000 5.5px) right / 10px 20px repeat-y, linear-gradient(#000,#000)",
                          WebkitMaskComposite: "source-over",
                          maskImage:
                            "radial-gradient(circle 5px at 5px 50%, transparent 5px, #000 5.5px) left / 10px 20px repeat-y, radial-gradient(circle 5px at calc(100% - 5px) 50%, transparent 5px, #000 5.5px) right / 10px 20px repeat-y, linear-gradient(#000,#000)",
                          borderRadius: "18px",
                          padding: "16px 18px",
                        }}
                      >
                        {/* botanical faint pattern */}
                        <Sprig className="pointer-events-none absolute -right-4 -top-4 w-24 opacity-20" />
                        <Sprig className="pointer-events-none absolute -left-6 -bottom-4 w-20 opacity-15 rotate-180" />

                        <div className="relative flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-primary">
                          <span className="h-px w-6 bg-primary/30" />
                          <span className="inline-flex items-center gap-1">
                            <Coffee className="h-3 w-3" /> Ваш бонус
                          </span>
                          <span className="h-px w-6 bg-primary/30" />
                        </div>

                        <p className="mt-2 text-center font-[family-name:var(--font-display)] text-lg leading-snug text-foreground">
                          Купи 5 кофе —
                          <br />
                          <span className="text-primary">1 кофе бесплатно</span>
                        </p>
                        <p className="mt-1 text-center text-[10px] text-muted-foreground">
                          Собирайте штампы и получите
                          <br />
                          любимый кофе в подарок!
                        </p>

                        {/* dashed divider */}
                        <div className="my-3 border-t border-dashed border-primary/25" />

                        {/* stamps row */}
                        <div className="flex items-start justify-between">
                          {stamps.map((n) => (
                            <CoffeeStamp key={n} n={n} />
                          ))}
                          <CoffeeStamp n={6} gift />
                        </div>
                      </div>

                      {/* progress card with latte cup */}
                      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white border border-border/60 px-3 py-2.5 shadow-soft">
                        <LatteCup className="h-11 w-11 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground">
                            Ваш прогресс{" "}
                            <span className="text-primary">5 / 6</span>
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Ещё 1 кофе — и напиток
                            <br />в подарок!
                          </p>
                        </div>
                      </div>

                      {/* tab bar */}
                      <div className="mt-auto pt-3 flex items-end justify-between">
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
                              className={`grid ${active ? "h-10 w-10 -mt-3 shadow-lift bg-primary text-primary-foreground ring-4 ring-white" : "h-7 w-7"} place-items-center rounded-full`}
                            >
                              <Icon className={active ? "h-4 w-4" : "h-4 w-4"} />
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
