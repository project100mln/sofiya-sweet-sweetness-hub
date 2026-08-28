import { createFileRoute } from "@tanstack/react-router";
import { staticHead } from "@/i18n/seo";
import { NewsCard } from "@/components/site/NewsCard";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";
import { getLocalizedContent } from "@/i18n/content";

export const Route = createFileRoute("/news")({
  head: () => staticHead("/news", "ru"),
  component: NewsPage,
});

export function NewsPage() {
  const { locale, t } = useI18n();
  const { news } = getLocalizedContent(locale);
  return (
    <>
      <PageHero
        eyebrow={t("Новости")}
        title={t("Новости и события")}
        lead={t("Новинки, сезонные коллекции и важные события SOFIYA.")}
      />
      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      </section>
    </>
  );
}
