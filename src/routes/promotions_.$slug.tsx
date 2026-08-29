import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, MessageCircle } from "lucide-react";
import { getFeaturedPromotion } from "@/data/featured-promotions";
import { absoluteUrl, canonicalLink, site, waLink } from "@/config/site";
import type { PromotionCardContent } from "@/types/promotions";
import { LocaleLink, useI18n } from "@/i18n";
import { formatPromotionHours, localizePromotion } from "@/i18n/content";
import { breadcrumbScript, dynamicSeoCopy, renderDynamicSeoPattern } from "@/i18n/seo";

export const Route = createFileRoute("/promotions_/$slug")({
  loader: ({ params }) => {
    const promotion = getFeaturedPromotion(params.slug);
    if (!promotion) throw notFound();
    return { promotion };
  },
  head: ({ loaderData }) => {
    const seo = dynamicSeoCopy.promotion.ru;
    if (!loaderData) {
      return {
        meta: [{ title: seo.notFoundTitle }, { name: "robots", content: "noindex" }],
      };
    }

    const promotion = loaderData.promotion;
    return {
      links: canonicalLink(`/promotions/${promotion.slug}`),
      meta: [
        { title: renderDynamicSeoPattern(seo.pageTitlePattern, promotion.title) },
        { name: "description", content: promotion.description ?? seo.descriptionFallback },
        {
          property: "og:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, promotion.title),
        },
        { property: "og:description", content: promotion.description ?? seo.descriptionFallback },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "ru_KZ" },
        { property: "og:locale:alternate", content: "kk_KZ" },
        {
          property: "og:url",
          content: absoluteUrl("/promotions/" + promotion.slug),
        },
        {
          name: "twitter:title",
          content: renderDynamicSeoPattern(seo.socialTitlePattern, promotion.title),
        },
        {
          name: "twitter:description",
          content: promotion.description ?? seo.descriptionFallback,
        },
        ...(promotion.image_url
          ? [
              { property: "og:image", content: absoluteUrl(promotion.image_url) },
              { name: "twitter:image", content: absoluteUrl(promotion.image_url) },
            ]
          : []),
      ],
      scripts: [
        breadcrumbScript("ru", [
          { name: seo.homeBreadcrumb, path: "/" },
          { name: seo.sectionBreadcrumb, path: "/promotions" },
          { name: promotion.title },
        ]),
      ],
    };
  },
  component: PromotionDetailPage,
});

function PromotionDetailPage() {
  return <PromotionDetailView promotion={Route.useLoaderData().promotion} />;
}

export function PromotionDetailView({ promotion: source }: { promotion: PromotionCardContent }) {
  const { locale, t, pick } = useI18n();
  const promotion = localizePromotion(source, locale);
  const window = promotion.discount_value.happy_hours;

  return (
    <>
      <div className="container-page pt-8">
        <LocaleLink
          to="/promotions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" /> {t("Все акции")}
        </LocaleLink>
      </div>

      <section className="container-page grid gap-10 py-8 md:py-12 lg:grid-cols-2 lg:items-center">
        <div className="premium-card aspect-[16/10] overflow-hidden bg-muted">
          {promotion.image_url && (
            <img
              src={promotion.image_url}
              alt={promotion.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Акция")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{promotion.title}</h1>
          {promotion.description && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {promotion.description}
            </p>
          )}

          {promotion.product_names && promotion.product_names.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t("В акции участвуют")}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {promotion.product_names.map((name) => (
                  <li
                    key={name}
                    className="premium-card flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" /> {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {window && (
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                <Clock className="h-4 w-4" /> {formatPromotionHours(window, locale)}
              </span>
            )}
            {site.whatsappDigits && (
              <a
                href={waLink(
                  pick(
                    `Здравствуйте, SOFIYA! Подскажите, пожалуйста, об акции «${promotion.title}».`,
                    `Сәлеметсіз бе, SOFIYA! «${promotion.title}» акциясы туралы айтып беріңізші.`,
                  ),
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-outline btn-outline-hover"
              >
                <MessageCircle className="h-4 w-4" /> {t("Уточнить в WhatsApp")}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
