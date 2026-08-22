import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { site, waLink } from "@/config/site";
import { stores } from "@/data/stores";
import { CAKE_TYPES, SIZES, PACKAGING } from "@/data/cake-options";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { canonicalLink } from "@/config/site";

export const Route = createFileRoute("/cake-preorder")({
  head: () => ({
    links: canonicalLink("/cake-preorder"),
    meta: [
      { title: "Торты на заказ | SOFIYA" },
      {
        name: "description",
        content:
          "Оформите фирменный торт SOFIYA к вашему событию: выберите тип, размер, дату и точку самовывоза.",
      },
    ],
  }),
  component: PreorderPage,
});

const STEPS = [
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

function PreorderPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
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
    if (k === "type" && data.type === "Свой вариант") return Boolean(data.customType?.trim());
    return !!data[k];
  }, [step, data]);

  const today = new Date().toISOString().split("T")[0];
  const whatsappMessage = `Здравствуйте, SOFIYA! Хочу оформить торт на заказ:
Тип: ${data.type === "Свой вариант" ? (data.customType ?? "Свой вариант") : (data.type ?? "-")}
Размер: ${data.size ?? "-"}
Порций: ${data.servings ?? "-"}
Дата: ${data.date ?? "-"}
Время: ${data.time ?? "-"}
Точка самовывоза: ${data.store ?? "-"}
Упаковка: ${data.packaging ?? "-"}
Имя: ${data.name ?? "-"}
Телефон: ${data.phone ?? "-"}
Комментарий: ${data.comment || "-"}`;

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
          <h1 className="mt-5 text-3xl font-bold">Сообщение подготовлено</h1>
          <p className="mt-3 text-muted-foreground">
            Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого заявка
            будет передана менеджеру.
          </p>
          <a
            href={waLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 btn-primary btn-primary-hover"
          >
            Открыть WhatsApp
          </a>
          <button
            onClick={() => {
              setSent(false);
              setStep(0);
              setData({});
            }}
            className="mt-3 btn-outline btn-outline-hover"
          >
            Оформить ещё торт
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-8 md:py-14">
      <div className="max-w-3xl mx-auto">
        <p className="page-kicker">Торты на заказ</p>
        <h1 className="page-title">Соберите свой торт</h1>
        <p className="page-lead">
          Шаг {step + 1} из {STEPS.length}: {STEPS[step]}
        </p>

        <div className="mt-6 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="premium-card mt-8 p-5 md:p-8">
          {step === 0 && (
            <>
              <Choices
                label="Тип торта"
                options={CAKE_TYPES}
                value={data.type}
                onChange={(v) => set("type", v)}
              />
              {data.type === "Свой вариант" && (
                <TextArea
                  label="Опишите желаемый вкус"
                  value={data.customType}
                  onChange={(v) => set("customType", v)}
                />
              )}
            </>
          )}
          {step === 1 && (
            <Choices
              label="Ориентировочный размер"
              options={SIZES}
              value={data.size}
              onChange={(v) => set("size", v)}
            />
          )}
          {step === 2 && (
            <NumberField
              label="Количество порций"
              value={data.servings}
              onChange={(v) => set("servings", v)}
            />
          )}
          {step === 3 && (
            <Field
              label="Дата события"
              type="date"
              min={today}
              value={data.date}
              onChange={(v) => set("date", v)}
            />
          )}
          {step === 4 && (
            <Choices
              label="Точка самовывоза"
              options={stores.map((s) => `${s.city}, ${s.address}`)}
              value={data.store}
              onChange={(v) => set("store", v)}
            />
          )}
          {step === 5 && (
            <Field
              label="Удобное время (по желанию)"
              type="time"
              value={data.time}
              onChange={(v) => set("time", v)}
            />
          )}
          {step === 6 && (
            <Choices
              label="Упаковка"
              options={PACKAGING}
              value={data.packaging}
              onChange={(v) => set("packaging", v)}
            />
          )}
          {step === 7 && (
            <Field
              label="Ваше имя"
              value={data.name}
              onChange={(v) => set("name", v)}
              placeholder="Как к вам обращаться"
            />
          )}
          {step === 8 && (
            <Field
              label="Телефон"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              pattern="[+0-9 ()-]{7,20}"
              value={data.phone}
              onChange={(v) => set("phone", v)}
              placeholder="+7 ___ ___ __ __"
            />
          )}
          {step === 9 && (
            <TextArea
              label="Комментарий (по желанию)"
              value={data.comment}
              onChange={(v) => set("comment", v)}
            />
          )}
          {step === 10 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Проверьте заказ</h3>
              <dl className="space-y-2 text-sm">
                {Object.entries({
                  Тип: data.type === "Свой вариант" ? data.customType : data.type,
                  Размер: data.size,
                  Порций: data.servings,
                  Дата: data.date,
                  Время: data.time,
                  Точка: data.store,
                  Упаковка: data.packaging,
                  Имя: data.name,
                  Телефон: data.phone,
                  Комментарий: data.comment,
                }).map(([k, v]) => (
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
              <ChevronLeft className="h-4 w-4" /> Назад
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canNext}
              className="btn-primary btn-primary-hover disabled:opacity-40"
            >
              Далее <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!data.name || !data.phone || !data.date || !data.store}
              className="btn-primary btn-primary-hover disabled:opacity-40"
            >
              Перейти в WhatsApp
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
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{label}</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`flex min-h-14 items-center justify-between gap-3 text-left rounded-2xl border px-4 py-3 text-sm transition-colors ${value === o ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border hover:border-primary/60"}`}
          >
            <span>{o}</span>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] ${value === o ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}
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
}) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-3">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        min={min}
        inputMode={inputMode}
        autoComplete={autoComplete}
        pattern={pattern}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 rounded-2xl border border-border bg-background px-4 focus:border-primary focus:outline-none text-base"
      />
    </div>
  );
}
function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label} type="number" min="1" value={value} onChange={onChange} placeholder="8" />
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
  return (
    <div>
      <label className="block text-lg font-semibold mb-3">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-border bg-background p-4 focus:border-primary focus:outline-none text-base"
      />
    </div>
  );
}
