import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
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
import { absoluteUrl, site } from "@/config/site";
import brandLogo from "@/assets/sofiya-logo.png";
import { localeTag, LocaleLink, useI18n, useLocale } from "@/i18n";
import { getLocalizedContent, localizedSiteRegion } from "@/i18n/content";
import { CakeDraftProvider } from "@/i18n/CakeDraftProvider";

function NotFoundComponent() {
  const { locale, t } = useI18n();
  const title = t("Страница не найдена | SOFIYA");
  const description = t("Возможно, страница была перемещена или её адрес изменился.");
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale === "kk" ? "kk_KZ" : "ru_KZ"} />
      <meta property="og:locale:alternate" content={locale === "kk" ? "ru_KZ" : "kk_KZ"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <div className="min-h-[70vh] grid place-items-center px-4">
        <div className="text-center max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
          <h1 className="mt-3 text-4xl font-bold">{t("Страница не найдена")}</h1>
          <p className="mt-3 text-muted-foreground">
            {t("Возможно, страница была перемещена или её адрес изменился.")}
          </p>
          <LocaleLink to="/" className="mt-6 inline-flex btn-primary btn-primary-hover">
            {t("На главную")}
          </LocaleLink>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t, path } = useI18n();
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold">{t("Что-то пошло не так")}</h1>
        <p className="mt-2 text-muted-foreground">{t("Попробуйте обновить страницу.")}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary btn-primary-hover"
          >
            {t("Попробовать снова")}
          </button>
          <a href={path("/")} className="btn-outline btn-outline-hover">
            {t("На главную")}
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
      { name: "author", content: "SOFIYA" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SOFIYA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#5A04BD" },
      {
        property: "og:image",
        content: absoluteUrl("/og-sofiya.jpg"),
      },
      {
        name: "twitter:image",
        content: absoluteUrl("/og-sofiya.jpg"),
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
  const locale = useLocale();
  const { t } = useI18n();
  return (
    <html lang={localeTag[locale]}>
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground transition-transform focus:translate-y-0"
        >
          {t("Перейти к содержимому")}
        </a>
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
      <CakeDraftProvider>
        <div className="flex min-h-screen flex-col">
          <OrganizationJsonLd />
          <Header />
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CakeDraftProvider>
    </QueryClientProvider>
  );
}

function OrganizationJsonLd() {
  const { locale } = useI18n();
  const { stores } = getLocalizedContent(locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: absoluteUrl(locale === "kk" ? "/kk" : "/"),
    logo: absoluteUrl(brandLogo),
    telephone: site.phone,
    areaServed: localizedSiteRegion(locale),
    inLanguage: localeTag[locale],
    sameAs: [site.instagramUrl, site.tiktokUrl].filter(Boolean),
    department: stores.map((store) => ({
      "@type": "Bakery",
      name: `${site.brand} — ${store.address}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: store.city,
        streetAddress: store.address,
        addressCountry: "KZ",
      },
      telephone: store.phone,
      url: store.mapUrl || undefined,
      geo:
        store.latitude != null && store.longitude != null
          ? {
              "@type": "GeoCoordinates",
              latitude: store.latitude,
              longitude: store.longitude,
            }
          : undefined,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
