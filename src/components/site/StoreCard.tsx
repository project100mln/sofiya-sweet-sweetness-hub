import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import type { StoreRecord } from "@/data/types";

export function StoreCard({ s }: { s: StoreRecord }) {
  return (
    <article className="flex flex-col rounded-2xl bg-card border border-border/60 p-5 hover:border-primary/40 hover:shadow-soft transition-all">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-semibold">
          <MapPin className="h-3.5 w-3.5" /> {s.city}
        </span>
        {s.district && <span className="text-xs text-muted-foreground">{s.district}</span>}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground leading-snug">{s.address}</h3>
      {s.landmark && <p className="mt-1 text-sm text-muted-foreground">{s.landmark}</p>}
      {s.workingHours && (
        <p className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
          <Clock className="h-4 w-4 text-primary" /> {s.workingHours}
        </p>
      )}
      {s.services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {s.services.map((sv) => (
            <span
              key={sv}
              className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs"
            >
              {sv}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {s.mapUrl && (
          <a
            href={s.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Построить маршрут →
          </a>
        )}
        {s.phone && (
          <a
            href={`tel:${s.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" /> Позвонить
          </a>
        )}
        {s.whatsapp && (
          <a
            href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Здравствуйте, SOFIYA! Интересует магазин: ${s.address}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
