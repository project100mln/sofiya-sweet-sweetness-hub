import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, waLink } from "@/config/site";
import { SERVICES } from "@/data/catering-services";
import { Check } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";
import { FieldError } from "@/components/site/FieldError";
import {
  isCalendarDateOnOrAfter,
  PHONE_PATTERN,
  PHONE_REGEXP,
  todayInBusinessTimeZone,
} from "@/i18n/validation";

export const Route = createFileRoute("/catering")({
  head: () => staticHead("/catering", "ru"),
  component: CateringPage,
});

export function CateringPage() {
  const { locale, t } = useI18n();
  const [f, setF] = useState({
    type: "",
    date: "",
    guests: "",
    budget: "",
    name: "",
    phone: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof f, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((current) => ({ ...current, [k]: undefined }));
  };
  const today = todayInBusinessTimeZone();
  const selectedService = SERVICES.find((service) => service.id === f.type);
  const serviceLabel = selectedService?.[locale].t ?? "—";
  const whatsappMessage =
    locale === "kk"
      ? `Сәлеметсіз бе, SOFIYA! Кейтерингке өтінім:
Түрі: ${serviceLabel}
Күні: ${f.date}
Қонақтар саны: ${f.guests}
Бюджет: ${f.budget || "—"}
Аты: ${f.name}
Телефон: ${f.phone}
Пікір: ${f.comment || "—"}`
      : `Здравствуйте, SOFIYA! Заявка на кейтеринг:
Тип: ${serviceLabel}
Дата: ${f.date}
Гостей: ${f.guests}
Бюджет: ${f.budget || "—"}
Имя: ${f.name}
Телефон: ${f.phone}
Комментарий: ${f.comment || "—"}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredMessage = t("Заполните обязательное поле");
    const nextErrors: Partial<Record<keyof typeof f, string>> = {};
    if (!f.type) nextErrors.type = requiredMessage;
    if (!f.date) nextErrors.date = requiredMessage;
    else if (!isCalendarDateOnOrAfter(f.date, today))
      nextErrors.date = t("Выберите сегодняшнюю или будущую дату");
    if (!f.guests || Number(f.guests) < 1) nextErrors.guests = t("Укажите число больше нуля");
    if (!f.name.trim()) nextErrors.name = requiredMessage;
    if (!f.phone.trim()) nextErrors.phone = requiredMessage;
    else if (!PHONE_REGEXP.test(f.phone)) nextErrors.phone = t("Проверьте номер телефона");
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
        eyebrow={t("Кейтеринг")}
        title={t("Для ваших событий")}
        lead={t(
          "Соберём меню под ваш формат: кофе-брейки, десертные столы, корпоративные события и большие заказы.",
        )}
      />

      <section className="container-page py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.i;
            const copy = service[locale];
            return (
              <div key={service.id} className="premium-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{copy.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="premium-card mx-auto max-w-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">{t("Оставить заявку")}</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">{t("Сообщение подготовлено")}</p>
              <p className="mt-2 text-muted-foreground text-sm">
                {t(
                  "Проверьте готовый текст и отправьте его в WhatsApp — только после этого заявка поступит менеджеру.",
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
              <Row label={t("Тип события")} required>
                <select
                  value={f.type}
                  onChange={(e) => set("type", e.target.value)}
                  required
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={errors.type ? "catering-type-error" : undefined}
                  className="input"
                >
                  <option value="">{t("Выберите")}</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s[locale].t}
                    </option>
                  ))}
                </select>
                <FieldError id="catering-type-error">{errors.type}</FieldError>
              </Row>
              <div className="grid sm:grid-cols-2 gap-4">
                <Row label={t("Дата")} required>
                  <input
                    type="date"
                    min={today}
                    required
                    value={f.date}
                    onChange={(e) => set("date", e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "catering-date-error" : undefined}
                    className="input"
                  />
                  <FieldError id="catering-date-error">{errors.date}</FieldError>
                </Row>
                <Row label={t("Гостей")} required>
                  <input
                    type="number"
                    min={1}
                    required
                    value={f.guests}
                    onChange={(e) => set("guests", e.target.value)}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? "catering-guests-error" : undefined}
                    className="input"
                    placeholder="20"
                  />
                  <FieldError id="catering-guests-error">{errors.guests}</FieldError>
                </Row>
              </div>
              <Row label={t("Бюджет (примерно)")}>
                <input
                  value={f.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  className="input"
                  placeholder={t("Например: 50 000 ₸")}
                />
              </Row>
              <div className="grid sm:grid-cols-2 gap-4">
                <Row label={t("Имя")} required>
                  <input
                    required
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "catering-name-error" : undefined}
                    className="input"
                  />
                  <FieldError id="catering-name-error">{errors.name}</FieldError>
                </Row>
                <Row label={t("Телефон")} required>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern={PHONE_PATTERN}
                    required
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "catering-phone-error" : undefined}
                    className="input"
                    placeholder="+7 ___ ___ __ __"
                  />
                  <FieldError id="catering-phone-error">{errors.phone}</FieldError>
                </Row>
              </div>
              <Row label={t("Комментарий")}>
                <textarea
                  rows={4}
                  value={f.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  className="input min-h-[100px]"
                />
              </Row>
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
