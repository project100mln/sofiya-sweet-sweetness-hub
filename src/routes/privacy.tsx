import { createFileRoute } from "@tanstack/react-router";
import { canonicalLink } from "@/config/site";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    links: canonicalLink("/privacy"),
    meta: [
      { title: "Политика конфиденциальности | SOFIYA" },
      { name: "description", content: "Политика обработки персональных данных SOFIYA." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Документы" title="Политика конфиденциальности" />
      <article className="container-page max-w-3xl py-12 prose prose-neutral">
        <p className="text-muted-foreground">
          Настоящая политика описывает, как SOFIYA обрабатывает персональные данные, оставленные
          вами при оформлении предзаказов, заявок на кейтеринг, откликов на вакансии и обратной
          связи.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Какие данные мы обрабатываем</h2>
        <p className="mt-2 text-muted-foreground">
          Имя, номер телефона и сообщения, которые вы отправляете нам через формы или WhatsApp.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Цели обработки</h2>
        <p className="mt-2 text-muted-foreground">
          Обработка заявок, ответы на вопросы, оформление заказов и отклики на вакансии.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Хранение и защита</h2>
        <p className="mt-2 text-muted-foreground">
          Данные используются только для обработки вашего обращения. Отправка происходит через
          WhatsApp после вашего подтверждения в приложении.
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          По вопросам обработки персональных данных пишите нам в WhatsApp или Instagram.
        </p>
      </article>
    </>
  );
}
