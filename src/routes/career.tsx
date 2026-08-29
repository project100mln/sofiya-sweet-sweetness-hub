import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink } from "@/config/site";
import { Check, Coffee, Cake, Users, GraduationCap, Sprout, Sparkles } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";
import { FieldError } from "@/components/site/FieldError";
import { PHONE_PATTERN, PHONE_REGEXP } from "@/i18n/validation";

export const Route = createFileRoute("/career")({
  head: () => staticHead("/career", "ru"),
  component: CareerPage,
});

export function CareerPage() {
  const { locale, t } = useI18n();
  const [f, setF] = useState({ position: "", name: "", phone: "", city: "", comment: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof f, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((current) => ({ ...current, [k]: undefined }));
  };
  const positions = [
    { id: "confectioner", ru: "Кондитер / Пекарь", kk: "Кондитер / Наубайшы" },
    { id: "barista", ru: "Бариста", kk: "Бариста" },
    { id: "store-manager", ru: "Менеджер точки", kk: "Дүкен менеджері" },
    { id: "other", ru: "Другое", kk: "Басқа" },
  ];
  const position = positions.find((item) => item.id === f.position);
  const positionLabel = position ? (locale === "kk" ? position.kk : position.ru) : "—";
  const whatsappMessage =
    locale === "kk"
      ? `Сәлеметсіз бе, SOFIYA! Бос жұмыс орнына жауап:
Бағыт: ${positionLabel}
Аты: ${f.name}
Телефон: ${f.phone}
Қала: ${f.city}
Өзі туралы: ${f.comment || "—"}`
      : `Здравствуйте, SOFIYA! Отклик на вакансию:
Направление: ${positionLabel}
Имя: ${f.name}
Телефон: ${f.phone}
Город: ${f.city}
О себе: ${f.comment || "—"}`;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredMessage = t("Заполните обязательное поле");
    const nextErrors: Partial<Record<keyof typeof f, string>> = {};
    if (!f.position) nextErrors.position = requiredMessage;
    if (!f.name.trim()) nextErrors.name = requiredMessage;
    if (!f.phone.trim()) nextErrors.phone = requiredMessage;
    else if (!PHONE_REGEXP.test(f.phone)) nextErrors.phone = t("Проверьте номер телефона");
    if (!f.city.trim()) nextErrors.city = requiredMessage;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    if (site.whatsappDigits) window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow={t("Карьера")}
        title={t("Станьте частью команды")}
        lead={t(
          "Мы — растущая сеть фирменных магазинов. Ищем людей, которые любят своё дело и хотят расти вместе с нами.",
        )}
      />

      <section className="container-page py-12 grid gap-5 md:grid-cols-4">
        {(locale === "kk"
          ? [
              { i: Sprout, t: "Даму", d: "Желімен бірге өсіңіз." },
              { i: GraduationCap, t: "Оқыту", d: "Мамандықты меңгеруге көмектесеміз." },
              { i: Users, t: "Команда", d: "Жылы орта және қолдау." },
              {
                i: Sparkles,
                t: "Түрлі бағыттар",
                d: "Наубайшылар, кондитерлер, баристалар, менеджерлер.",
              },
            ]
          : [
              { i: Sprout, t: "Развитие", d: "Растите вместе с сетью." },
              { i: GraduationCap, t: "Обучение", d: "Помогаем освоить профессию." },
              { i: Users, t: "Команда", d: "Тёплая атмосфера и поддержка." },
              { i: Sparkles, t: "Разные направления", d: "Пекари, кондитеры, бариста, менеджеры." },
            ]
        ).map(({ i: Icon, t, d }) => (
          <div key={t} className="localization-equal-card premium-card h-full p-6">
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
          <h2 className="text-2xl md:text-3xl font-bold">{t("Направления работы")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            {t(
              "Оставьте короткую заявку по подходящему направлению. Команда рассмотрит её и свяжется, если появится подходящая позиция в вашем городе.",
            )}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {positions.slice(0, 3).map((item, index) => {
              const Icon = [Cake, Coffee, Users][index];
              const label = locale === "kk" ? item.kk : item.ru;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-background border border-border p-4 flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="premium-card mx-auto max-w-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">{t("Оставить отклик")}</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">{t("Сообщение подготовлено")}</p>
              <p className="mt-2 text-muted-foreground text-sm">
                {t(
                  "Проверьте готовый текст и отправьте его в WhatsApp — только после этого отклик поступит менеджеру.",
                )}
              </p>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 btn-primary btn-primary-hover"
              >
                {t("Открыть WhatsApp")}
              </a>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">{t("Направление")} *</span>
                <select
                  required
                  value={f.position}
                  onChange={(e) => set("position", e.target.value)}
                  aria-invalid={Boolean(errors.position)}
                  aria-describedby={errors.position ? "career-position-error" : undefined}
                  className="input"
                >
                  <option value="">{t("Выберите")}</option>
                  {positions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {locale === "kk" ? item.kk : item.ru}
                    </option>
                  ))}
                </select>
                <FieldError id="career-position-error">{errors.position}</FieldError>
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold block mb-1.5">{t("Имя")} *</span>
                  <input
                    required
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "career-name-error" : undefined}
                    className="input"
                  />
                  <FieldError id="career-name-error">{errors.name}</FieldError>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold block mb-1.5">{t("Телефон")} *</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern={PHONE_PATTERN}
                    required
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "career-phone-error" : undefined}
                    className="input"
                    placeholder="+7 ___ ___ __ __"
                  />
                  <FieldError id="career-phone-error">{errors.phone}</FieldError>
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">{t("Город")} *</span>
                <input
                  required
                  value={f.city}
                  onChange={(e) => set("city", e.target.value)}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "career-city-error" : undefined}
                  className="input"
                  placeholder="Шымкент"
                />
                <FieldError id="career-city-error">{errors.city}</FieldError>
              </label>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">{t("О себе")}</span>
                <textarea
                  rows={4}
                  value={f.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  className="input min-h-[100px]"
                />
              </label>
              <button type="submit" className="btn-primary btn-primary-hover mt-2">
                {t("Перейти в WhatsApp")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
