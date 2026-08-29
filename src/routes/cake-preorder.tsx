import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo } from "react";
import { site, waLink } from "@/config/site";
import { CAKE_TYPES, SIZES, PACKAGING, type LocalizedOption } from "@/data/cake-options";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";
import { useCakeDraft } from "@/i18n/use-cake-draft";
import {
  isCalendarDateOnOrAfter,
  PHONE_PATTERN,
  PHONE_REGEXP,
  todayInBusinessTimeZone,
} from "@/i18n/validation";

export const Route = createFileRoute("/cake-preorder")({
  head: () => staticHead("/cake-preorder", "ru"),
  component: PreorderPage,
});

const STEPS_RU = [
  "Тип торта",
  "Размер",
  "Порции",
  "Дата",
  "Точка",
  "Время",
  "Упаковка",
  "Имя",
  "Телефон",
  "Комментарий",
  "Готово",
] as const;

const STEPS_KK = [
  "Торт түрі",
  "Өлшемі",
  "Порция",
  "Күні",
  "Дүкен",
  "Уақыты",
  "Қаптама",
  "Аты",
  "Телефон",
  "Пікір",
  "Дайын",
] as const;

export function PreorderPage() {
  const { locale, t } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const steps = locale === "kk" ? STEPS_KK : STEPS_RU;
  const { step, setStep, data, setData, sent, setSent, reset } = useCakeDraft();
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const canNext = useMemo(() => {
    const k = [
      "type",
      "size",
      "servings",
      "date",
      "store",
      "time",
      "packaging",
      "name",
      "phone",
      "comment",
      "review",
    ][step];
    if (["comment", "time"].includes(k)) return true;
    if (k === "review") return true;
    if (k === "type" && data.type === "custom") return Boolean(data.customType?.trim());
    if (k === "servings") return Number(data.servings) > 0;
    if (k === "date") return isCalendarDateOnOrAfter(data.date ?? "", todayInBusinessTimeZone());
    if (k === "phone") return PHONE_REGEXP.test(data.phone ?? "");
    return !!data[k];
  }, [step, data]);

  const today = todayInBusinessTimeZone();
  const optionLabel = (options: LocalizedOption[], id?: string) =>
    options.find((option) => option.id === id)?.[locale] ?? "—";
  const cakeType =
    data.type === "custom"
      ? data.customType || t("Свой вариант")
      : optionLabel(CAKE_TYPES, data.type);
  const storeLabel = stores.find((store) => store.id === data.store);
  const pickup = storeLabel ? `${storeLabel.city}, ${storeLabel.address}` : "—";
  const whatsappMessage =
    locale === "kk"
      ? `Сәлеметсіз бе, SOFIYA! Тапсырыспен торт рәсімдегім келеді:
Түрі: ${cakeType}
Өлшемі: ${optionLabel(SIZES, data.size)}
Порция саны: ${data.servings ?? "—"}
Күні: ${data.date ?? "—"}
Уақыты: ${data.time ?? "—"}
Алып кету дүкені: ${pickup}
Қаптама: ${optionLabel(PACKAGING, data.packaging)}
Аты: ${data.name ?? "—"}
Телефон: ${data.phone ?? "—"}
Пікір: ${data.comment || "—"}`
      : `Здравствуйте, SOFIYA! Хочу оформить торт на заказ:
Тип: ${cakeType}
Размер: ${optionLabel(SIZES, data.size)}
Порций: ${data.servings ?? "—"}
Дата: ${data.date ?? "—"}
Время: ${data.time ?? "—"}
Точка самовывоза: ${pickup}
Упаковка: ${optionLabel(PACKAGING, data.packaging)}
Имя: ${data.name ?? "—"}
Телефон: ${data.phone ?? "—"}
Комментарий: ${data.comment || "—"}`;

  const submit = () => {
    if (site.whatsappDigits) window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <section className="container-page py-20 max-w-2xl">
        <div className="premium-card p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">{t("Сообщение подготовлено")}</h1>
          <p className="mt-3 text-muted-foreground">
            {t(
              "Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого заявка будет передана менеджеру.",
            )}
          </p>
          <a
            href={waLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 btn-primary btn-primary-hover"
          >
            {t("Открыть WhatsApp")}
          </a>
          <button onClick={reset} className="mt-3 btn-outline btn-outline-hover">
            {t("Оформить ещё торт")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-8 md:py-14">
      <div className="max-w-3xl mx-auto">
        <p className="page-kicker">{t("Торты на заказ")}</p>
        <h1 className="page-title">{t("Соберите свой торт")}</h1>
        <p className="page-lead">
          {t("Шаг")} {step + 1} {t("из")} {steps.length}: {steps[step]}
        </p>

        <div className="mt-6 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="premium-card mt-8 p-5 md:p-8">
          {step === 0 && (
            <>
              <Choices
                label={t("Тип торта")}
                options={CAKE_TYPES}
                locale={locale}
                value={data.type}
                onChange={(v) => set("type", v)}
              />
              {data.type === "custom" && (
                <TextArea
                  label={t("Опишите желаемый вкус")}
                  value={data.customType}
                  onChange={(v) => set("customType", v)}
                />
              )}
            </>
          )}
          {step === 1 && (
            <Choices
              label={t("Ориентировочный размер")}
              options={SIZES}
              locale={locale}
              value={data.size}
              onChange={(v) => set("size", v)}
            />
          )}
          {step === 2 && (
            <NumberField
              label={t("Количество порций")}
              value={data.servings}
              onChange={(v) => set("servings", v)}
              error={
                data.servings && Number(data.servings) <= 0
                  ? t("Укажите число больше нуля")
                  : undefined
              }
            />
          )}
          {step === 3 && (
            <Field
              label={t("Дата события")}
              type="date"
              min={today}
              value={data.date}
              onChange={(v) => set("date", v)}
              error={
                data.date && !isCalendarDateOnOrAfter(data.date, today)
                  ? t("Выберите сегодняшнюю или будущую дату")
                  : undefined
              }
            />
          )}
          {step === 4 && (
            <Choices
              label={t("Точка самовывоза")}
              options={stores.map((store) => ({
                id: store.id,
                ru: `${store.city}, ${store.address}`,
                kk: `${store.city}, ${store.address}`,
              }))}
              locale={locale}
              value={data.store}
              onChange={(v) => set("store", v)}
            />
          )}
          {step === 5 && (
            <Field
              label={t("Удобное время (по желанию)")}
              type="time"
              value={data.time}
              onChange={(v) => set("time", v)}
            />
          )}
          {step === 6 && (
            <Choices
              label={t("Упаковка")}
              options={PACKAGING}
              locale={locale}
              value={data.packaging}
              onChange={(v) => set("packaging", v)}
            />
          )}
          {step === 7 && (
            <Field
              label={t("Ваше имя")}
              value={data.name}
              onChange={(v) => set("name", v)}
              placeholder={t("Как к вам обращаться")}
            />
          )}
          {step === 8 && (
            <Field
              label={t("Телефон")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              pattern={PHONE_PATTERN}
              value={data.phone}
              onChange={(v) => set("phone", v)}
              placeholder="+7 ___ ___ __ __"
              error={
                data.phone && !PHONE_REGEXP.test(data.phone)
                  ? t("Проверьте номер телефона")
                  : undefined
              }
            />
          )}
          {step === 9 && (
            <TextArea
              label={t("Комментарий (по желанию)")}
              value={data.comment}
              onChange={(v) => set("comment", v)}
            />
          )}
          {step === 10 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("Проверьте заказ")}</h3>
              <dl className="space-y-2 text-sm">
                {[
                  [t("Тип"), cakeType],
                  [t("Размер"), optionLabel(SIZES, data.size)],
                  [t("Порций"), data.servings],
                  [t("Дата"), data.date],
                  [t("Время"), data.time],
                  [t("Точка"), pickup],
                  [t("Упаковка"), optionLabel(PACKAGING, data.packaging)],
                  [t("Имя"), data.name],
                  [t("Телефон"), data.phone],
                  [t("Комментарий"), data.comment],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-4 py-2 border-b border-border/60"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-foreground font-medium text-right">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className={`mt-6 flex gap-3 ${step === 0 ? "justify-end" : "justify-between"}`}>
          {step > 0 && (
            <button onClick={prev} className="btn-outline btn-outline-hover">
              <ChevronLeft className="h-4 w-4" /> {t("Назад")}
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={next}
              disabled={!canNext}
              className="btn-primary btn-primary-hover disabled:opacity-40"
            >
              {t("Далее")} <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!data.name || !data.phone || !data.date || !data.store}
              className="btn-primary btn-primary-hover disabled:opacity-40"
            >
              {t("Перейти в WhatsApp")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Choices({
  label,
  options,
  locale,
  value,
  onChange,
}: {
  label: string;
  options: LocalizedOption[];
  locale: "ru" | "kk";
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label}>
      <h3 className="text-xl font-semibold mb-4">{label}</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={value === option.id}
            className={`flex min-h-14 items-center justify-between gap-3 text-left rounded-2xl border px-4 py-3 text-sm transition-colors ${value === option.id ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border hover:border-primary/60"}`}
          >
            <span>{option[locale]}</span>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] ${value === option.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}
              aria-hidden="true"
            >
              <Check className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  inputMode,
  autoComplete,
  pattern,
  error,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  min?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  pattern?: string;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-semibold mb-3">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        min={min}
        inputMode={inputMode}
        autoComplete={autoComplete}
        pattern={pattern}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 rounded-2xl border border-border bg-background px-4 focus:border-primary focus:outline-none text-base"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
function NumberField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <Field
      label={label}
      type="number"
      min="1"
      value={value}
      onChange={onChange}
      placeholder="8"
      error={error}
    />
  );
}
function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-semibold mb-3">
        {label}
      </label>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-border bg-background p-4 focus:border-primary focus:outline-none text-base"
      />
    </div>
  );
}
