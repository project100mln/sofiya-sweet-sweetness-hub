import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo } from "react";
import { site, waLink } from "@/config/site";
import { CAKE_TYPES, SIZES, PACKAGING, type LocalizedOption } from "@/data/cake-options";
import { CalendarDays, Check, ChevronLeft, ChevronRight, MessageCircle, Store } from "lucide-react";
import { staticHead } from "@/i18n/seo";
import { LocaleLink, useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";
import { useCakeDraft } from "@/i18n/use-cake-draft";
import { PageHero } from "@/components/site/PageHero";
import { SofiyaBrandText } from "@/components/site/SofiyaBrandText";
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

// New Kazakh marketing copy requires qualified editorial sign-off before production.
const PREORDER_COPY = {
  ru: {
    title: "Торты на заказ в Шымкенте",
    lead: "Выберите тип и размер торта, укажите дату события и точку самовывоза. Сайт подготовит сообщение для WhatsApp.",
    cards: [
      {
        title: "Выберите вариант",
        description: "Укажите торт «Сникерс» или опишите собственный вариант вкуса.",
      },
      {
        title: "Добавьте параметры",
        description: "Выберите размер, количество порций, дату и удобную точку самовывоза.",
      },
      {
        title: "Отправьте сообщение",
        description:
          "Проверьте подготовленный текст и самостоятельно отправьте его менеджеру в WhatsApp.",
      },
    ],
    noticeTitle: "Перед оформлением",
    notice:
      "Форма не подтверждает заказ автоматически. Стоимость, наличие выбранного варианта и возможность изготовления к указанной дате подтверждает менеджер после получения сообщения в WhatsApp.",
    faqTitle: "Вопросы о тортах на заказ",
    faq: [
      {
        question: "Как оформить торт на заказ?",
        answer:
          "Заполните 11 шагов конструктора: выберите вариант, размер, количество порций, дату, время и магазин, затем укажите контактные данные.",
      },
      {
        question: "Когда заявка поступит менеджеру?",
        answer:
          "После последнего шага сайт откроет WhatsApp с подготовленным текстом. Заявка поступит менеджеру только после того, как вы нажмёте «Отправить» в WhatsApp.",
      },
      {
        question: "Как узнать точную стоимость?",
        answer:
          "Итоговая стоимость зависит от выбранных параметров и индивидуальных пожеланий. Менеджер уточнит детали и подтвердит стоимость в WhatsApp.",
      },
      {
        question: "Где получить готовый торт?",
        answer:
          "В конструкторе можно выбрать точку самовывоза из опубликованного списка магазинов SOFIYA. Адрес и время получения подтверждает менеджер.",
      },
    ],
  },
  kk: {
    title: "Шымкентте тапсырыспен дайындалатын торттар",
    lead: "Торт түрі мен өлшемін таңдап, іс-шара күнін және алып кету дүкенін көрсетіңіз. Сайт WhatsApp үшін дайын хабарлама жасайды.",
    cards: [
      {
        title: "Торт нұсқасын таңдаңыз",
        description: "«Сникерс» тортын таңдаңыз немесе өзіңіз қалаған дәм нұсқасын сипаттаңыз.",
      },
      {
        title: "Параметрлерді көрсетіңіз",
        description: "Өлшемін, порция санын, күнін және алып кетуге ыңғайлы дүкенді таңдаңыз.",
      },
      {
        title: "Хабарламаны жіберіңіз",
        description: "Дайын мәтінді тексеріп, оны WhatsApp арқылы менеджерге өзіңіз жіберіңіз.",
      },
    ],
    noticeTitle: "Рәсімдеу алдында",
    notice:
      "Нысан тапсырысты автоматты түрде растамайды. Таңдалған нұсқаның бағасын, қолжетімділігін және көрсетілген күнге дайындау мүмкіндігін менеджер WhatsApp-та хабарлама алғаннан кейін растайды.",
    faqTitle: "Тапсырыспен дайындалатын торттар туралы сұрақтар",
    faq: [
      {
        question: "Тортқа қалай тапсырыс беруге болады?",
        answer:
          "Конструктордың 11 қадамын толтырыңыз: торт нұсқасын, өлшемін, порция санын, күнін, уақытын және дүкенді таңдаңыз, содан кейін байланыс деректерін көрсетіңіз.",
      },
      {
        question: "Өтінім менеджерге қашан түседі?",
        answer:
          "Соңғы қадамнан кейін сайт дайын мәтіні бар WhatsApp терезесін ашады. Өтінім WhatsApp-та «Жіберу» батырмасын басқаннан кейін ғана менеджерге түседі.",
      },
      {
        question: "Нақты бағасын қалай білуге болады?",
        answer:
          "Соңғы баға таңдалған параметрлер мен жеке тілектерге байланысты. Менеджер мәліметтерді нақтылап, бағасын WhatsApp арқылы растайды.",
      },
      {
        question: "Дайын тортты қайдан алуға болады?",
        answer:
          "Конструкторда SOFIYA дүкендерінің жарияланған тізімінен алып кету орнын таңдауға болады. Мекенжай мен алу уақытын менеджер растайды.",
      },
    ],
  },
} as const;

export function PreorderPage() {
  const { locale, t } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const steps = locale === "kk" ? STEPS_KK : STEPS_RU;
  const { step, setStep, data, setData, sent, setSent, reset } = useCakeDraft();
  const pageCopy = PREORDER_COPY[locale];
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
    <>
      <PageHero eyebrow={t("Торты на заказ")} title={pageCopy.title} lead={pageCopy.lead} />

      <section className="container-page py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {pageCopy.cards.map((card, index) => {
            const Icon = [Check, CalendarDays, MessageCircle][index];
            return (
              <article key={card.title} className="premium-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-4 text-xl font-semibold">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
              </article>
            );
          })}
        </div>
        <div className="premium-card mt-6 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold">{pageCopy.noticeTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{pageCopy.notice}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <LocaleLink to="/catalog/cakes" className="btn-outline btn-outline-hover">
              {locale === "kk" ? "Торттар каталогы" : "Каталог тортов"}
            </LocaleLink>
            <LocaleLink to="/stores" className="btn-outline btn-outline-hover">
              <Store className="h-4 w-4" aria-hidden /> {t("Магазины")}
            </LocaleLink>
          </div>
        </div>
      </section>

      <section id="cake-builder" className="container-page py-8 md:py-14">
        <div className="max-w-3xl mx-auto">
          <p className="page-kicker">{t("Торты на заказ")}</p>
          <h2 className="page-title">{t("Соберите свой торт")}</h2>
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

      <section className="container-page py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold md:text-3xl">{pageCopy.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {pageCopy.faq.map((item) => (
              <details key={item.question} className="premium-card group p-5 md:p-6">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">
                  {item.question}
                </summary>
                <p className="mt-3 leading-7 text-foreground/75">
                  <SofiyaBrandText text={item.answer} wordmarkClassName="!h-[1.05em]" />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
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
