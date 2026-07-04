import { MapPin, Clock } from "lucide-react";
import type { StoreRecord } from "@/data/stores";

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
            <span key={sv} className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs">{sv}</span>
          ))}
        </div>
      )}
      {s.mapUrl && (
        <a href={s.mapUrl} target="_blank" rel="noreferrer" className="mt-4 text-sm font-semibold text-primary hover:text-primary-hover">
          Построить маршрут →
        </a>
      )}
    </article>
  );
}
