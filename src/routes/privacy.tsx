import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Политика конфиденциальности | SOFIYA" }, { name: "description", content: "Политика обработки персональных данных SOFIYA." }] }),
  component: () => (
    <article className="container-page py-14 max-w-3xl prose prose-neutral">
      <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>
      <p className="mt-6 text-muted-foreground">Настоящая политика описывает, как SOFIYA обрабатывает персональные данные, оставленные вами при оформлении предзаказов, заявок на кейтеринг, откликов на вакансии и обратной связи.</p>
      <h2 className="mt-8 text-2xl font-semibold">Какие данные мы обрабатываем</h2>
      <p className="mt-2 text-muted-foreground">Имя, номер телефона и сообщения, которые вы отправляете нам через формы или WhatsApp.</p>
      <h2 className="mt-6 text-2xl font-semibold">Цели обработки</h2>
      <p className="mt-2 text-muted-foreground">Обработка заявок, ответы на вопросы, оформление заказов, отклик на вакансии.</p>
      <h2 className="mt-6 text-2xl font-semibold">Хранение и защита</h2>
      <p className="mt-2 text-muted-foreground">Данные хранятся ровно столько, сколько необходимо для целей обработки, и не передаются третьим лицам без вашего согласия.</p>
      <p className="mt-8 text-sm text-muted-foreground">По вопросам обработки персональных данных пишите нам в WhatsApp или Instagram.</p>
    </article>
  ),
});
