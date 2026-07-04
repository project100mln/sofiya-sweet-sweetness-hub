import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { site, waLink } from "@/config/site";
import { stores } from "@/data/stores";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/cake-preorder")({
  head: () => ({
    meta: [
      { title: "Торты на заказ | SOFIYA" },
      { name: "description", content: "Оформите фирменный торт SOFIYA к вашему событию: выберите тип, размер, дату и точку самовывоза." },
    ],
  }),
  component: PreorderPage,
});

const STEPS = [
  "Тип торта", "Размер", "Порции", "Дата", "Точка", "Время", "Надпись",
  "Свечи", "Упаковка", "Имя", "Телефон", "Комментарий", "Готово",
] as const;

const CAKE_TYPES = ["Ягодный", "Шоколадный со Snickers", "Медовик", "Наполеон карамельный", "Matilda Cake", "Свой вариант"];
const SIZES = ["1 кг", "1,5 кг", "2 кг", "2,5 кг", "3 кг", "Уточнить"];
const CANDLES = ["Не нужны", "Цифра", "Свечи-звёздочки", "Классические"];
const PACKAGING = ["Стандартная коробка", "Подарочная упаковка", "Без упаковки"];

function PreorderPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const canNext = useMemo(() => {
    const k = ["type","size","servings","date","store","time","inscription","candles","packaging","name","phone","comment","review"][step];
    if (["inscription","comment","time"].includes(k)) return true;
    if (k === "review") return true;
    return !!data[k];
  }, [step, data]);

  const today = new Date().toISOString().split("T")[0];

  const submit = () => {
    const msg = `Здравствуйте, SOFIYA! Хочу оформить торт на заказ:
Тип: ${data.type ?? "-"}
Размер: ${data.size ?? "-"}
Порций: ${data.servings ?? "-"}
Дата: ${data.date ?? "-"}
Время: ${data.time ?? "-"}
Точка самовывоза: ${data.store ?? "-"}
Надпись: ${data.inscription || "-"}
Свечи: ${data.candles ?? "-"}
Упаковка: ${data.packaging ?? "-"}
Имя: ${data.name ?? "-"}
Телефон: ${data.phone ?? "-"}
Комментарий: ${data.comment || "-"}`;
    if (site.whatsappDigits) window.open(waLink(msg), "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <section className="container-page py-20 max-w-2xl">
        <div className="rounded-3xl bg-card border border-border p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-8 w-8" /></div>
          <h1 className="mt-5 text-3xl font-bold">Заявка принята!</h1>
          <p className="mt-3 text-muted-foreground">Мы открыли ваш чат в WhatsApp с готовым сообщением. Наш менеджер свяжется с вами в ближайшее время.</p>
          <button onClick={() => { setSent(false); setStep(0); setData({}); }} className="mt-6 btn-outline btn-outline-hover">Оформить ещё торт</button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Торты на заказ</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold">Соберите свой торт SOFIYA</h1>
        <p className="mt-3 text-muted-foreground">Шаг {step + 1} из {STEPS.length}: {STEPS[step]}</p>

        <div className="mt-6 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        <div className="mt-8 rounded-3xl bg-card border border-border p-6 md:p-10 min-h-[280px]">
          {step === 0 && <Choices label="Тип торта" options={CAKE_TYPES} value={data.type} onChange={(v) => set("type", v)} />}
          {step === 1 && <Choices label="Ориентировочный размер" options={SIZES} value={data.size} onChange={(v) => set("size", v)} />}
          {step === 2 && <NumberField label="Количество порций" value={data.servings} onChange={(v) => set("servings", v)} />}
          {step === 3 && <Field label="Дата события" type="date" min={today} value={data.date} onChange={(v) => set("date", v)} />}
          {step === 4 && <Choices label="Точка самовывоза" options={stores.map((s) => `${s.city}, ${s.address}`)} value={data.store} onChange={(v) => set("store", v)} />}
          {step === 5 && <Field label="Удобное время (по желанию)" type="time" value={data.time} onChange={(v) => set("time", v)} />}
          {step === 6 && <Field label="Надпись на торте (по желанию)" placeholder="Например: С днём рождения, София!" value={data.inscription} onChange={(v) => set("inscription", v)} />}
          {step === 7 && <Choices label="Свечи" options={CANDLES} value={data.candles} onChange={(v) => set("candles", v)} />}
          {step === 8 && <Choices label="Упаковка" options={PACKAGING} value={data.packaging} onChange={(v) => set("packaging", v)} />}
          {step === 9 && <Field label="Ваше имя" value={data.name} onChange={(v) => set("name", v)} placeholder="Как к вам обращаться" />}
          {step === 10 && <Field label="Телефон" type="tel" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+7 ___ ___ __ __" />}
          {step === 11 && <TextArea label="Комментарий (по желанию)" value={data.comment} onChange={(v) => set("comment", v)} />}
          {step === 12 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Проверьте заказ</h3>
              <dl className="space-y-2 text-sm">
                {Object.entries({
                  "Тип": data.type, "Размер": data.size, "Порций": data.servings, "Дата": data.date, "Время": data.time,
                  "Точка": data.store, "Надпись": data.inscription, "Свечи": data.candles, "Упаковка": data.packaging,
                  "Имя": data.name, "Телефон": data.phone, "Комментарий": data.comment,
                }).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2 border-b border-border/60">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-foreground font-medium text-right">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button onClick={prev} disabled={step === 0} className="btn-outline btn-outline-hover disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" /> Назад
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} disabled={!canNext} className="btn-primary btn-primary-hover disabled:opacity-40">
              Далее <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={!data.name || !data.phone || !data.date || !data.store}
                    className="btn-primary btn-primary-hover disabled:opacity-40">
              Отправить заявку
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Choices({ label, options, value, onChange }: { label: string; options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)}
                  className={`text-left rounded-2xl border px-4 py-3 text-sm ${value === o ? "border-primary bg-primary/5 font-semibold" : "border-border hover:border-primary/60"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, min }: { label: string; value?: string; onChange: (v: string) => void; type?: string; placeholder?: string; min?: string }) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-3">{label}</label>
      <input type={type} value={value ?? ""} min={min} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
             className="w-full h-14 rounded-2xl border border-border bg-background px-4 focus:border-primary focus:outline-none text-base" />
    </div>
  );
}
function NumberField({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return <Field label={label} type="number" value={value} onChange={onChange} placeholder="8" />;
}
function TextArea({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-3">{label}</label>
      <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4 focus:border-primary focus:outline-none text-base" />
    </div>
  );
}
