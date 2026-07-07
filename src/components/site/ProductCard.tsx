import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/types";
import { Sparkles, Star, Flame } from "lucide-react";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/catalog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-lift transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {p.isHero && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Star className="h-3 w-3" /> Хит
            </span>
          )}
          {p.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)] text-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> Новинка
            </span>
          )}
          {p.isBestseller && !p.isHero && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 text-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Flame className="h-3 w-3" /> Бестселлер
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/60">
          <span className="text-sm text-muted-foreground">
            {p.price ? `${p.price.toLocaleString("ru-RU")} ₸` : "Цена уточняется"}
          </span>
          <span className="text-sm font-semibold text-primary">Подробнее →</span>
        </div>
      </div>
    </Link>
  );
}
