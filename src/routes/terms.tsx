import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Пользовательское соглашение | SOFIYA" }, { name: "description", content: "Условия использования сайта SOFIYA." }] }),
  component: () => (
    <article className="container-page py-14 max-w-3xl prose prose-neutral">
      <h1 className="text-4xl font-bold">Пользовательское соглашение</h1>
      <p className="mt-6 text-muted-foreground">Используя сайт SOFIYA, вы соглашаетесь с условиями, изложенными ниже.</p>
      <h2 className="mt-8 text-2xl font-semibold">Использование сайта</h2>
      <p className="mt-2 text-muted-foreground">Сайт носит информационный характер. Актуальный ассортимент, цены и условия уточняйте в WhatsApp или в ближайшей кофейне.</p>
      <h2 className="mt-6 text-2xl font-semibold">Формы и заявки</h2>
      <p className="mt-2 text-muted-foreground">Отправляя заявку через сайт, вы соглашаетесь на обработку персональных данных согласно нашей Политике конфиденциальности.</p>
      <h2 className="mt-6 text-2xl font-semibold">Материалы сайта</h2>
      <p className="mt-2 text-muted-foreground">Все материалы (фотографии, тексты, логотип) принадлежат SOFIYA и защищены законом об авторском праве.</p>
    </article>
  ),
});
