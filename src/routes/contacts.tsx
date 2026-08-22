import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, instagramLink, waLink } from "@/config/site";
import { Instagram, MessageCircle, Phone, MapPin, Check } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { canonicalLink } from "@/config/site";
import { PageHero } from "@/components/site/PageHero";
import { cities } from "@/data/stores";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    links: canonicalLink("/contacts"),
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
  const whatsappMessage = `Здравствуйте, SOFIYA!
Имя: ${f.name}
Телефон: ${f.phone}
Сообщение: ${f.message}`;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (site.whatsappDigits) window.open(waLink(whatsappMessage), "_blank", "noopener,noreferrer");
    setSent(true);
  };
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Связаться с нами"
        lead="Мы всегда на связи в WhatsApp и Instagram."
      />

      <section className="container-page py-12 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 h-fit">
          <a
            href={waLink("Здравствуйте, SOFIYA!")}
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
              <p className="font-semibold">Позвонить</p>
              <p className="text-sm text-muted-foreground mt-1">{site.phone}</p>
            </div>
          </a>
          <div className="premium-card flex items-start gap-4 p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <p className="font-semibold">География сети</p>
              <p className="text-sm text-muted-foreground mt-1">{cities.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="premium-card p-6 md:p-10">
          <h2 className="text-2xl font-bold">Форма обратной связи</h2>
          {sent ? (
            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-4 text-lg font-semibold">Сообщение подготовлено</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Проверьте готовый текст и нажмите «Отправить» в WhatsApp. Только после этого
                сообщение будет передано менеджеру.
              </p>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 btn-primary btn-primary-hover"
              >
                Открыть WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-4">
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
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[+0-9 ()-]{7,20}"
                  required
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="input"
                  placeholder="+7 ___ ___ __ __"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold block mb-1.5">Сообщение *</span>
                <textarea
                  required
                  rows={5}
                  value={f.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="input min-h-[120px]"
                />
              </label>
              <button type="submit" className="btn-primary btn-primary-hover mt-2">
                Перейти в WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
