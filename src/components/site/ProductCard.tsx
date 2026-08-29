import type { Product } from "@/data/types";
import { Sparkles, Star, Flame } from "lucide-react";
import { formatPrice, LocaleLink, useI18n } from "@/i18n";

export function ProductCard({ p }: { p: Product }) {
  const { locale, t } = useI18n();
  return (
    <LocaleLink
      to="/catalog/$slug"
      params={{ slug: p.slug }}
      data-testid="product-card"
      aria-label={`${p.name}, ${p.price ? `${formatPrice(p.price, locale)} ${t("тенге")}` : t("цена уточняется")}`}
      className="product-card premium-card group flex h-full min-w-0 flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.images[0]}
          alt={p.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {p.isHero && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Star className="h-3 w-3" /> {t("Хит")}
            </span>
          )}
          {p.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)] text-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> {t("Новинка")}
            </span>
          )}
          {p.isBestseller && !p.isHero && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 text-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Flame className="h-3 w-3" /> {t("Бестселлер")}
            </span>
          )}
        </div>
      </div>
      <div className="product-card-content p-5 flex min-w-0 flex-1 flex-col">
        <h3 className="product-card-title text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        <p className="product-card-description mb-auto mt-1.5 pb-4 text-sm text-muted-foreground line-clamp-2">
          {p.shortDescription}
        </p>
        <div className="product-card-meta mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <span className="font-semibold text-foreground" data-testid="product-price">
            {p.price ? `${formatPrice(p.price, locale)} ₸` : t("Цена уточняется")}
          </span>
          <span className="text-sm font-semibold text-primary">{t("Открыть →")}</span>
        </div>
      </div>
    </LocaleLink>
  );
}
