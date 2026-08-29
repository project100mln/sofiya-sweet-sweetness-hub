import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import type { StoreRecord } from "@/data/types";
import { useI18n } from "@/i18n";

export function StoreCard({
  s,
  onShowOnMap,
  isSelected = false,
}: {
  s: StoreRecord;
  onShowOnMap?: () => void;
  isSelected?: boolean;
}) {
  const { t, pick } = useI18n();
  return (
    <article
      className={`store-card premium-card flex h-full min-w-0 flex-col p-5 ${isSelected ? "border-primary/55 ring-2 ring-primary/10" : ""}`}
      data-testid={`store-card-${s.id}`}
    >
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
      <div className="store-card-actions mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4">
        {onShowOnMap && s.latitude != null && s.longitude != null && (
          <button
            type="button"
            onClick={onShowOnMap}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:text-primary-hover"
            aria-pressed={isSelected}
          >
            {isSelected ? t("На карте") : t("Показать на карте")}
          </button>
        )}
        {s.mapUrl && (
          <a
            href={s.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {t("Маршрут в 2GIS →")}
          </a>
        )}
        {s.phone && (
          <a
            href={`tel:${s.phone.replace(/\s+/g, "")}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" /> {t("Позвонить")}
          </a>
        )}
        {s.whatsapp && (
          <a
            href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(pick(`Здравствуйте, SOFIYA! Интересует магазин: ${s.address}.`, `Сәлеметсіз бе, SOFIYA! Мына дүкен туралы білгім келеді: ${s.address}.`))}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
