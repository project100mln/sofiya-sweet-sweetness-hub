import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink } from "@/config/site";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { SERVICES } from "@/data/catering-services";
import { Check } from "lucide-react";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Кейтеринг SOFIYA — кофе-брейки и события" },
      {
        name: "description",
        content:
          "Кейтеринг SOFIYA: кофе-брейки, десертные столы, корпоративные события и большие заказы.",
      },
    ],
  }),
  component: CateringPage,
});

function CateringPage() {
  const [f, setF] = useState({
    type: "",
    date: "",
    guests: "",
    budget: "",
    name: "",
    phone: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Здравствуйте, SOFIYA! Заявка на кейтеринг:
Тип: ${f.type}
Дата: ${f.date}
Гостей: ${f.guests}
Бюджет: ${f.budget || "—"}
Имя: ${f.name}
Телефон: ${f.phone}
Комментарий: ${f.comment || "—"}`;
    if (site.whatsappDigits) window.open(waLink(msg), "_blank");
    setSent(true);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Кейтеринг</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            <SofiyaWordmark /> для ваших событий
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Соберём меню под ваш формат: кофе-брейки, десертные столы, корпоративные события и
            большие заказы.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {SERVICES.map(({ i: Icon, t, d }) => (
            <div
              key={t}
              className="rounded-3xl bg-card border border-border/60 p-6 hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-card border border-border p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">Оставить заявку</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Заявка отправлена!</p>
              <p className="mt-2 text-muted-foreground text-sm">
                Мы открыли ваш WhatsApp с готовым сообщением.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <Row label="Тип события" required>
                <select
                  value={f.type}
                  onChange={(e) => set("type", e.target.value)}
                  required
                  className="input"
                >
                  <option value="">Выберите</option>
                  {SERVICES.map((s) => (
                    <option key={s.t} value={s.t}>
                      {s.t}
                    </option>
                  ))}
                </select>
              </Row>
              <div className="grid sm:grid-cols-2 gap-4">
                <Row label="Дата" required>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    value={f.date}
                    onChange={(e) => set("date", e.target.value)}
                    className="input"
                  />
                </Row>
                <Row label="Гостей" required>
                  <input
                    type="number"
                    min={1}
                    required
                    value={f.guests}
                    onChange={(e) => set("guests", e.target.value)}
                    className="input"
                    placeholder="20"
                  />
                </Row>
              </div>
              <Row label="Бюджет (примерно)">
                <input
                  value={f.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className="input"
                  placeholder="Например: 50 000 ₸"
                />
              </Row>
              <div className="grid sm:grid-cols-2 gap-4">
                <Row label="Имя" required>
                  <input
                    required
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="input"
                  />
                </Row>
                <Row label="Телефон" required>
                  <input
                    type="tel"
                    required
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="input"
                    placeholder="+7 ___ ___ __ __"
                  />
                </Row>
              </div>
              <Row label="Комментарий">
                <textarea
                  rows={4}
                  value={f.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  className="input min-h-[100px]"
                />
              </Row>
              <button type="submit" className="btn-primary btn-primary-hover mt-2">
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </section>
      <style>{`.input{width:100%;height:3rem;border-radius:1rem;border:1px solid var(--border);background:var(--background);padding:0 1rem;font-size:0.95rem}.input:focus{outline:none;border-color:var(--primary)}textarea.input{padding:0.75rem 1rem;height:auto}`}</style>
    </>
  );
}

function Row({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground mb-1.5 block">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
