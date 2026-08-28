import { createFileRoute } from "@tanstack/react-router";
import { staticHead } from "@/i18n/seo";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => staticHead("/privacy", "ru"),
  component: PrivacyPage,
});

export function PrivacyPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t("Документы")} title={t("Политика конфиденциальности")} />
      <article className="container-page max-w-3xl py-12 prose prose-neutral">
        <p className="text-muted-foreground">
          {t(
            "Настоящая политика описывает, как SOFIYA обрабатывает персональные данные, оставленные вами при оформлении предзаказов, заявок на кейтеринг, откликов на вакансии и обратной связи.",
          )}
        </p>
        <h2 className="mt-8 text-2xl font-semibold">{t("Какие данные мы обрабатываем")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "Имя, номер телефона и сообщения, которые вы отправляете нам через формы или WhatsApp.",
          )}
        </p>
        <h2 className="mt-6 text-2xl font-semibold">{t("Цели обработки")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t("Обработка заявок, ответы на вопросы, оформление заказов и отклики на вакансии.")}
        </p>
        <h2 className="mt-6 text-2xl font-semibold">{t("Хранение и защита")}</h2>
        <p className="mt-2 text-muted-foreground">
          {t(
            "Данные используются только для обработки вашего обращения. Отправка происходит через WhatsApp после вашего подтверждения в приложении.",
          )}
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          {t("По вопросам обработки персональных данных пишите нам в WhatsApp или Instagram.")}
        </p>
      </article>
    </>
  );
}
