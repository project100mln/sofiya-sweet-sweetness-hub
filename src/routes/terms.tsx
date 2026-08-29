import { createFileRoute } from "@tanstack/react-router";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/terms")({
  head: () => staticHead("/terms", "ru"),
  component: TermsPage,
});

export function TermsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t("Документы")} title={t("Пользовательское соглашение")} />
      <article className="container-page max-w-3xl py-12 prose prose-neutral">
        <p className="text-muted-foreground">
          {t("Используя сайт SOFIYA, вы соглашаетесь с условиями, изложенными ниже.")}
        </p>
        <h2 className="mt-8 text-2xl font-semibold">{t("Использование сайта")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "Сайт носит информационный характер. Актуальный ассортимент, цены и условия уточняйте в WhatsApp или в ближайшем магазине.",
          )}
        </p>
        <h2 className="mt-6 text-2xl font-semibold">{t("Формы и заявки")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "Формы на сайте подготавливают текст обращения. Заявка передаётся менеджеру только после того, как вы самостоятельно отправите её в WhatsApp.",
          )}
        </p>
        <h2 className="mt-6 text-2xl font-semibold">{t("Материалы сайта")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "Фотографии, тексты и логотипы SOFIYA используются как материалы бренда и защищаются применимым законодательством.",
          )}
        </p>
      </article>
    </>
  );
}
