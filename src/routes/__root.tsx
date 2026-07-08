import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold">Страница не найдена</h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, страница была перемещена или её адрес изменился.
        </p>
        <Link to="/" className="mt-6 inline-flex btn-primary btn-primary-hover">
          На главную
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
        <p className="mt-2 text-muted-foreground">Попробуйте обновить страницу.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary btn-primary-hover"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-outline btn-outline-hover">
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SOFIYA Sweet — сеть кофеен и пекарен в Шымкенте" },
      {
        name: "description",
        content:
          "SOFIYA Sweet — фирменные торты, свежая выпечка, завтраки, пицца и кофе. 16 пекарен и кофеен в Шымкенте, Ленгере, Аксукенте, Сайраме и Манкенте.",
      },
      { name: "author", content: "SOFIYA Sweet" },
      { property: "og:title", content: "SOFIYA Sweet — сеть кофеен и пекарен в Шымкенте" },
      {
        property: "og:description",
        content:
          "SOFIYA Sweet — фирменные торты, свежая выпечка, завтраки, пицца и кофе. 16 пекарен и кофеен в Шымкенте, Ленгере, Аксукенте, Сайраме и Манкенте.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SOFIYA Sweet" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#9B26B6" },
      { name: "twitter:title", content: "SOFIYA Sweet — сеть кофеен и пекарен в Шымкенте" },
      {
        name: "twitter:description",
        content:
          "SOFIYA Sweet — фирменные торты, свежая выпечка, завтраки, пицца и кофе. 16 пекарен и кофеен в Шымкенте, Ленгере, Аксукенте, Сайраме и Манкенте.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/39fb9dd9-d402-4b39-aacb-e7c75e52e223/id-preview-0d3c6c41--a2dc33b6-dee8-414d-bb74-5140bccf959f.lovable.app-1783422170040.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/39fb9dd9-d402-4b39-aacb-e7c75e52e223/id-preview-0d3c6c41--a2dc33b6-dee8-414d-bb74-5140bccf959f.lovable.app-1783422170040.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
