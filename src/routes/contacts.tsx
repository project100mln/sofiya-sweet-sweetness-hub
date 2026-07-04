import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, instagramLink, waLink } from "@/config/site";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { stores } from "@/data/stores";
import { Instagram, MessageCircle, Phone, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты SOFIYA" },
      { name: "description", content: "Свяжитесь с SOFIYA: WhatsApp, Instagram, магазины сети." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Здравствуйте, SOFIYA!
Имя: ${f.name}
Телефон: ${f.phone}
Сообщение: ${f.message}`;
    if (site.whatsappDigits) window.open(waLink(msg), "_blank");
    setSent(true);
  };
  return (
    <>
      <section className="bg-gradient-to-b from-[color:var(--accent)] to-background">
        <div className="container-page py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Контакты</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">Связаться с <SofiyaWordmark /></h1>
          <p className="mt-3 text-muted-foreground max-w-xl">Мы всегда на связи в WhatsApp и Instagram.</p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 h-fit">
          <a href={waLink("Здравствуйте, SOFIYA!")} target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-3xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-soft transition-all">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><MessageCircle className="h-6 w-6" /></span>
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground mt-1">{site.phone}</p>
            </div>
          </a>
          <a href={instagramLink} target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-3xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-soft transition-all">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Instagram className="h-6 w-6" /></span>
            <div>
              <p className="font-semibold">Instagram</p>
              <p className="text-sm text-muted-foreground mt-1">{site.instagramHandle}</p>
            </div>
          </a>
          <a href={`tel:${site.whatsappDigits}`} className="flex items-start gap-4 rounded-3xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-soft transition-all">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Phone className="h-6 w-6" /></span>
            <div>
              <p className="font-semibold">Позвонить</p>
              <p className="text-sm text-muted-foreground mt-1">{site.phone}</p>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-3xl bg-card border border-border p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><MapPin className="h-6 w-6" /></span>
            <div>
              <p className="font-semibold">География сети</p>
              <p className="text-sm text-muted-foreground mt-1">Шымкент, Ленгер, Аксукент, Сайрам, Манкент — {stores.length} точек</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-6 md:p-10">
          <h2 className="text-2xl font-bold">Форма обратной связи</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-7 w-7" /></div>
              <p className="mt-4 text-lg font-semibold">Сообщение отправлено!</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <label className="block"><span className="text-sm font-semibold block mb-1.5">Имя *</span><input required value={f.name} onChange={(e) => set("name", e.target.value)} className="input" /></label>
              <label className="block"><span className="text-sm font-semibold block mb-1.5">Телефон *</span><input type="tel" required value={f.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="+7 ___ ___ __ __" /></label>
              <label className="block"><span className="text-sm font-semibold block mb-1.5">Сообщение *</span><textarea required rows={5} value={f.message} onChange={(e) => set("message", e.target.value)} className="input min-h-[120px]" /></label>
              <button type="submit" className="btn-primary btn-primary-hover mt-2">Отправить</button>
            </form>
          )}
        </div>
      </section>
      <style>{`.input{width:100%;height:3rem;border-radius:1rem;border:1px solid var(--border);background:var(--background);padding:0 1rem;font-size:0.95rem}.input:focus{outline:none;border-color:var(--primary)}textarea.input{padding:0.75rem 1rem;height:auto}`}</style>
    </>
  );
}
