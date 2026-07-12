import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink } from "@/config/site";
import { Check, Coffee, Cake, Users, GraduationCap, Sprout, Sparkles } from "lucide-react";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Карьера в SOFIYA" },
      {
        name: "description",
        content:
          "Работайте в растущей сети SOFIYA: пекари, кондитеры, бариста, менеджеры. Обучение и развитие.",
      },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  const [f, setF] = useState({ position: "", name: "", phone: "", city: "", comment: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Здравствуйте, SOFIYA! Отклик на вакансию:
Направление: ${f.position}
Имя: ${f.name}
Телефон: ${f.phone}
Город: ${f.city}
О себе: ${f.comment || "—"}`;
    if (site.whatsappDigits) window.open(waLink(msg), "_blank");
    setSent(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[color:var(--secondary)] text-primary-foreground">
        <div className="container-page py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Карьера</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold">Станьте частью команды <SofiyaWordmark className="brightness-0 invert" /></h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl">
            Мы — растущая сеть кофеен и пекарен. Ищем людей, которые любят своё дело и хотят расти
            вместе с нами.
          </p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-5 md:grid-cols-4">
        {[
          { i: Sprout, t: "Развитие", d: "Растите вместе с сетью." },
          { i: GraduationCap, t: "Обучение", d: "Помогаем освоить профессию." },
          { i: Users, t: "Команда", d: "Тёплая атмосфера и поддержка." },
          { i: Sparkles, t: "Разные направления", d: "Пекари, кондитеры, бариста, менеджеры." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-3xl bg-card border border-border/60 p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="container-page py-6">
        <div className="rounded-3xl bg-[color:var(--accent)] p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold">Актуальные вакансии</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Список вакансий скоро появится. Пока оставьте заявку — мы свяжемся с вами, как только
            откроем позицию в вашем городе.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { i: Cake, t: "Кондитер / Пекарь" },
              { i: Coffee, t: "Бариста" },
              { i: Users, t: "Менеджер точки" },
            ].map(({ i: Icon, t }) => (
              <div
                key={t}
                className="rounded-2xl bg-background border border-border p-4 flex items-center gap-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-semibold">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-card border border-border p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">Оставить отклик</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Заявка отправлена!</p>
              <p className="mt-2 text-muted-foreground text-sm">Мы свяжемся с вами.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">Направление *</span>
                <select
                  required
                  value={f.position}
                  onChange={(e) => set("position", e.target.value)}
                  className="input"
                >
                  <option value="">Выберите</option>
                  {["Кондитер / Пекарь", "Бариста", "Менеджер точки", "Другое"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold block mb-1.5">Имя *</span>
                  <input
                    required
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="input"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold block mb-1.5">Телефон *</span>
                  <input
                    type="tel"
                    required
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="input"
                    placeholder="+7 ___ ___ __ __"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">Город *</span>
                <input
                  required
                  value={f.city}
                  onChange={(e) => set("city", e.target.value)}
                  className="input"
                  placeholder="Шымкент"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">О себе</span>
                <textarea
                  rows={4}
                  value={f.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  className="input min-h-[100px]"
                />
              </label>
              <button type="submit" className="btn-primary btn-primary-hover mt-2">
                Отправить
              </button>
            </form>
          )}
        </div>
      </section>
      <style>{`.input{width:100%;height:3rem;border-radius:1rem;border:1px solid var(--border);background:var(--background);padding:0 1rem;font-size:0.95rem}.input:focus{outline:none;border-color:var(--primary)}textarea.input{padding:0.75rem 1rem;height:auto}`}</style>
    </>
  );
}
