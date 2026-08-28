import type { NewsItem } from "@/data/types";
import { formatDate, LocaleLink, useI18n } from "@/i18n";

interface NewsCardProps {
  item: NewsItem;
  compact?: boolean;
}

export function NewsCard({ item, compact = false }: NewsCardProps) {
  const { locale, t, path } = useI18n();
  const destinationLabel: Record<NewsItem["destination"], string> = {
    article: t("Открыть событие"),
    loyalty: t("Перейти к программе лояльности"),
    "cake-preorder": t("Перейти к заказу торта"),
    stores: t("Посмотреть магазины"),
  };
  const content = (
    <>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={compact ? "p-5" : "p-6"}>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {formatDate(item.date, locale)}
        </p>
        <h3
          className={`${compact ? "text-lg" : "text-xl"} mt-2 font-semibold text-foreground transition-colors group-hover:text-primary`}
        >
          {item.title}
        </h3>
        <p className={`mt-2 text-sm text-muted-foreground ${compact ? "line-clamp-2" : ""}`}>
          {item.summary}
        </p>
        <span className="sr-only">{destinationLabel[item.destination]}</span>
      </div>
    </>
  );

  const className =
    "premium-card group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4";
  const ariaLabel = `${destinationLabel[item.destination]}: ${item.title}`;

  if (item.destination === "article") {
    return (
      <LocaleLink
        to="/news/$slug"
        params={{ slug: item.slug }}
        className={className}
        aria-label={ariaLabel}
        data-testid={`news-card-${item.id}`}
      >
        {content}
      </LocaleLink>
    );
  }

  if (item.destination === "loyalty") {
    return (
      <a
        href={`${path("/")}#loyalty`}
        className={className}
        aria-label={ariaLabel}
        data-testid={`news-card-${item.id}`}
      >
        {content}
      </a>
    );
  }

  return (
    <LocaleLink
      to={item.destination === "cake-preorder" ? "/cake-preorder" : "/stores"}
      className={className}
      aria-label={ariaLabel}
      data-testid={`news-card-${item.id}`}
    >
      {content}
    </LocaleLink>
  );
}
