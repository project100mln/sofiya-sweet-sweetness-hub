import { Link } from "@tanstack/react-router";
import type { NewsItem } from "@/data/types";

interface NewsCardProps {
  item: NewsItem;
  compact?: boolean;
}

const destinationLabel: Record<NewsItem["destination"], string> = {
  article: "Открыть событие",
  "cake-preorder": "Перейти к заказу торта",
  stores: "Посмотреть магазины",
};

export function NewsCard({ item, compact = false }: NewsCardProps) {
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
          {new Date(item.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
    "group block overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  const ariaLabel = `${destinationLabel[item.destination]}: ${item.title}`;

  if (item.destination === "article") {
    return (
      <Link
        to="/news/$slug"
        params={{ slug: item.slug }}
        className={className}
        aria-label={ariaLabel}
        data-testid={`news-card-${item.id}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      to={item.destination === "cake-preorder" ? "/cake-preorder" : "/stores"}
      className={className}
      aria-label={ariaLabel}
      data-testid={`news-card-${item.id}`}
    >
      {content}
    </Link>
  );
}
