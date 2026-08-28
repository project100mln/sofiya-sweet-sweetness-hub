import { ArrowUpRight, Clock, Percent, Tag, Ticket } from "lucide-react";
import type { PromotionCardContent } from "@/types/promotions";
import { logoSources } from "@/config/branding";
import { formatPrice, LocaleLink, useI18n } from "@/i18n";

const discountLabel = (
  promotion: PromotionCardContent,
  locale: "ru" | "kk",
  special: string,
): string => {
  const { discount_value: value } = promotion;
  if (value.percent != null) return `-${value.percent}%`;
  if (value.amount != null) return `-${formatPrice(value.amount, locale)} ₸`;
  return special;
};

const discountIcon = {
  percent: Percent,
  fixed_amount: Tag,
  promo_code: Ticket,
} as const;

export function PromotionCard({ promotion }: { promotion: PromotionCardContent }) {
  const { locale, t } = useI18n();
  const Icon = discountIcon[promotion.discount_type];
  const window = promotion.discount_value.happy_hours;

  const card = (
    <article className="premium-card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {promotion.image_url ? (
          <img
            src={promotion.image_url}
            alt={promotion.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[color:var(--accent)] p-10">
            <img
              src={logoSources.originalSMark}
              alt="SOFIYA"
              width={320}
              height={480}
              className="h-full max-h-28 w-auto object-contain opacity-70"
              loading="lazy"
            />
          </div>
        )}
        {!promotion.image_has_discount_badge && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
            <Icon className="h-3.5 w-3.5" />{" "}
            {discountLabel(promotion, locale, t("Спецпредложение"))}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {promotion.title}
        </h3>
        {promotion.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {promotion.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          {promotion.discount_type === "promo_code" && promotion.promo_code_word && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs font-semibold uppercase tracking-wider">
              {t("Промокод")}: {promotion.promo_code_word}
            </span>
          )}
          {window && !promotion.image_has_discount_badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-xs">
              <Clock className="h-3.5 w-3.5" /> {window.from}–{window.to}
            </span>
          )}
          {promotion.slug && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary">
              {t("Подробнее")} <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!promotion.slug) return <div className="group">{card}</div>;

  return (
    <LocaleLink
      to="/promotions/$slug"
      params={{ slug: promotion.slug }}
      aria-label={`${t("Подробнее об акции")} «${promotion.title}»`}
      className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      {card}
    </LocaleLink>
  );
}
