import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, instagramLink, waLink } from "@/config/site";
import { Instagram, MessageCircle, Phone, MapPin, Check } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";
import { FieldError } from "@/components/site/FieldError";
import { PHONE_PATTERN, PHONE_REGEXP } from "@/i18n/validation";

export const Route = createFileRoute("/contacts")({
  head: () => staticHead("/contacts", "ru"),
  component: ContactsPage,
});

export function ContactsPage() {
  const { locale, t } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const cities = [...new Set(stores.map((store) => store.city))];
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof f, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((current) => ({ ...current, [k]: undefined }));
  };
  const whatsappMessage =
    locale === "kk"
      ? `Сәлеметсіз бе, SOFIYA!
Аты: ${f.name}
Телефон: ${f.phone}
Хабарлама: ${f.message}`
      : `Здравствуйте, SOFIYA!
Имя: ${f.name}
Телефон: ${f.phone}
Сообщение: ${f.message}`;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredMessage = t("Заполните обязательное поле");
    const nextErrors: Partial<Record<keyof typeof f, string>> = {};
    if (!f.name.trim()) nextErrors.name = requiredMessage;
    if (!f.phone.trim()) nextErrors.phone = requiredMessage;
    else if (!PHONE_REGEXP.test(f.phone)) nextErrors.phone = t("Проверьте номер телефона");
    if (!f.message.trim()) nextErrors.message = requiredMessage;
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
        eyebrow={t("Контакты")}
        title={t("Связаться с нами")}
        lead={t("Мы всегда на связи в WhatsApp и Instagram.")}
      />

      <section className="container-page py-12 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 h-fit">
          <a
            href={waLink(t("Здравствуйте, SOFIYA!"))}
            target="_blank"
            rel="noreferrer"
            className="premium-card flex items-start gap-4 p-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground mt-1">{site.phone}</p>
            </div>
          </a>
          {site.tiktokUrl && (
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="premium-card flex items-start gap-4 p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <SiTiktok className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">TikTok</p>
                <p className="mt-1 text-sm text-muted-foreground">{site.tiktokHandle}</p>
              </div>
            </a>
          )}
          <a
            href={instagramLink}
            target="_blank"
            rel="noreferrer"
            className="premium-card flex items-start gap-4 p-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Instagram className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold">Instagram</p>
              <p className="text-sm text-muted-foreground mt-1">{site.instagramHandle}</p>
            </div>
          </a>
          <a
            href={`tel:${site.whatsappDigits}`}
            className="premium-card flex items-start gap-4 p-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold">{t("Позвонить")}</p>
              <p className="text-sm text-muted-foreground mt-1">{site.phone}</p>
            </div>
          </a>
          <div className="premium-card flex items-start gap-4 p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold">{t("География сети")}</p>
              <p className="text-sm text-muted-foreground mt-1">{cities.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="premium-card p-6 md:p-10">
          <h2 className="text-2xl font-bold">{t("Форма обратной связи")}</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">{t("Сообщение подготовлено")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  "Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого сообщение будет передано менеджеру.",
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
                <span className="text-sm font-semibold block mb-1.5">{t("Имя")} *</span>
                <input
                  required
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className="input"
                />
                <FieldError id="contact-name-error">{errors.name}</FieldError>
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
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                  className="input"
                  placeholder="+7 ___ ___ __ __"
                />
                <FieldError id="contact-phone-error">{errors.phone}</FieldError>
              </label>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">{t("Сообщение")} *</span>
                <textarea
                  required
                  rows={5}
                  value={f.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="input min-h-[120px]"
                />
                <FieldError id="contact-message-error">{errors.message}</FieldError>
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
