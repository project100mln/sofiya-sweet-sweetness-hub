import { createFileRoute } from "@tanstack/react-router";
import { canonicalLink } from "@/config/site";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    links: canonicalLink("/terms"),
    meta: [
      { title: "Пользовательское соглашение | SOFIYA" },
      { name: "description", content: "Условия использования сайта SOFIYA." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Документы" title="Пользовательское соглашение" />
      <article className="container-page max-w-3xl py-12 prose prose-neutral">
        <p className="text-muted-foreground">
          Используя сайт SOFIYA, вы соглашаетесь с условиями, изложенными ниже.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Использование сайта</h2>
        <p className="mt-2 text-muted-foreground">
          Сайт носит информационный характер. Актуальный ассортимент, цены и условия уточняйте в
          WhatsApp или в ближайшем магазине.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Формы и заявки</h2>
        <p className="mt-2 text-muted-foreground">
          Формы на сайте подготавливают текст обращения. Заявка передаётся менеджеру только после
          того, как вы самостоятельно отправите её в WhatsApp.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Материалы сайта</h2>
        <p className="mt-2 text-muted-foreground">
          Фотографии, тексты и логотипы SOFIYA используются как материалы бренда и защищаются
          применимым законодательством.
        </p>
      </article>
    </>
  );
}
