import { Clock, Percent, Tag, Ticket } from "lucide-react";
import type { Promotion } from "@/types/promotions";

const discountLabel = (promotion: Promotion): string => {
  const { discount_value: value } = promotion;
  if (value.percent != null) return `-${value.percent}%`;
  if (value.amount != null) return `-${value.amount.toLocaleString("ru-RU")} ₸`;
  return "Спецпредложение";
};

const discountIcon = {
  percent: Percent,
  fixed_amount: Tag,
  promo_code: Ticket,
} as const;

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  const Icon = discountIcon[promotion.discount_type];
  const window = promotion.discount_value.happy_hours;

  return (
    <article className="group flex flex-col rounded-3xl bg-card border border-border/60 overflow-hidden hover:border-primary/40 hover:shadow-lift transition-all">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {promotion.image_url ? (
          <img
            src={promotion.image_url}
            alt={promotion.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[color:var(--accent)] to-background" />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
          <Icon className="h-3.5 w-3.5" /> {discountLabel(promotion)}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {promotion.title}
        </h3>
        {promotion.description && (
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
            {promotion.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-border/60">
          {promotion.discount_type === "promo_code" && promotion.promo_code_word && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs font-semibold uppercase tracking-wider">
              Промокод: {promotion.promo_code_word}
            </span>
          )}
          {window && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs">
              <Clock className="h-3.5 w-3.5" /> {window.from}–{window.to}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
