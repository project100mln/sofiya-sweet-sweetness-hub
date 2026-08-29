import { absoluteUrl, languageLinks } from "@/config/site";
import type { Locale } from "@/i18n";

export const staticSeoCopy = {
  "/": {
    ru: {
      title: "SOFIYA — фирменные магазины в Шымкенте",
      description:
        "SOFIYA — фирменные торты, свежая выпечка, завтраки и пицца. Магазины в Шымкенте и Туркестанской области.",
    },
    kk: {
      title: "SOFIYA — Шымкенттегі фирмалық дүкендер",
      description:
        "SOFIYA — фирмалық торттар, балғын пісірмелер, таңғы ас пен пицца. Шымкент және Түркістан облысындағы дүкендер.",
    },
  },
  "/about": {
    ru: {
      title: "О компании SOFIYA",
      description:
        "История SOFIYA с 2014 года: свежая выпечка, фирменные торты и сеть магазинов в Шымкенте и Туркестанской области.",
    },
    kk: {
      title: "SOFIYA туралы",
      description:
        "SOFIYA тарихы, құндылықтары және Шымкент пен Түркістан облысындағы фирмалық дүкендер желісі.",
    },
  },
  "/catalog": {
    ru: {
      title: "Каталог — торты, десерты, выпечка | SOFIYA",
      description:
        "Каталог SOFIYA: торты, порционные десерты, выпечка, самса, пироги, завтраки, пицца и напитки.",
    },
    kk: {
      title: "Каталог — торттар, десерттер, пісірмелер | SOFIYA",
      description:
        "SOFIYA каталогы: торттар, порциялық десерттер, пісірмелер, самса, бәліштер, таңғы ас, пицца және сусындар.",
    },
  },
  "/stores": {
    ru: {
      title: "Магазины SOFIYA",
      description: "Адреса магазинов SOFIYA в Шымкенте, Ленгере, Аксукенте и Манкенте.",
    },
    kk: {
      title: "SOFIYA дүкендері",
      description:
        "Шымкент пен Түркістан облысындағы SOFIYA дүкендерінің мекенжайлары, жұмыс уақыты және байланыстары.",
    },
  },
  "/promotions": {
    ru: {
      title: "Акции SOFIYA",
      description: "Актуальные акции и специальные предложения SOFIYA.",
    },
    kk: {
      title: "SOFIYA акциялары",
      description: "SOFIYA фирмалық дүкендеріндегі өзекті акциялар мен арнайы ұсыныстар.",
    },
  },
  "/cake-preorder": {
    ru: {
      title: "Торты на заказ | SOFIYA",
      description:
        "Оформите фирменный торт SOFIYA к вашему событию: выберите тип, размер, дату и точку самовывоза.",
    },
    kk: {
      title: "Тапсырыспен торттар | SOFIYA",
      description:
        "Мерекеңізге арналған SOFIYA тортын онлайн таңдаңыз және өтінімді WhatsApp арқылы жіберіңіз.",
    },
  },
  "/catering": {
    ru: {
      title: "Кейтеринг SOFIYA — кофе-брейки и события",
      description:
        "Кейтеринг SOFIYA: кофе-брейки, десертные столы, корпоративные события и большие заказы.",
    },
    kk: {
      title: "SOFIYA кейтерингі",
      description:
        "Кофе-брейктер, десерт үстелдері, корпоративтік мерекелер және үлкен тапсырыстар.",
    },
  },
  "/news": {
    ru: {
      title: "Новости и акции SOFIYA",
      description: "Свежие новости, анонсы и акции сети SOFIYA.",
    },
    kk: {
      title: "SOFIYA жаңалықтары",
      description: "SOFIYA-ның жаңа топтамалары, оқиғалары және дүкендері туралы жаңалықтар.",
    },
  },
  "/career": {
    ru: {
      title: "Карьера в SOFIYA",
      description:
        "Работайте в растущей сети SOFIYA: пекари, кондитеры, бариста, менеджеры. Обучение и развитие.",
    },
    kk: {
      title: "SOFIYA-дағы мансап",
      description:
        "SOFIYA командасына қосылыңыз: Шымкент пен Түркістан облысындағы бос жұмыс орындары мен жұмыс шарттары.",
    },
  },
  "/contacts": {
    ru: {
      title: "Контакты SOFIYA",
      description: "Свяжитесь с SOFIYA: WhatsApp, Instagram, магазины сети.",
    },
    kk: {
      title: "SOFIYA байланыстары",
      description: "SOFIYA-мен телефон, WhatsApp немесе Instagram арқылы байланысыңыз.",
    },
  },
  "/privacy": {
    ru: {
      title: "Политика конфиденциальности | SOFIYA",
      description: "Политика обработки персональных данных SOFIYA.",
    },
    kk: {
      title: "Құпиялық саясаты | SOFIYA",
      description: "SOFIYA сайтының дербес деректерді өңдеу және құпиялық саясаты.",
    },
  },
  "/terms": {
    ru: {
      title: "Пользовательское соглашение | SOFIYA",
      description: "Условия использования сайта SOFIYA.",
    },
    kk: {
      title: "Пайдаланушы келісімі | SOFIYA",
      description: "SOFIYA сайтын пайдалану шарттары мен пайдаланушы келісімі.",
    },
  },
} as const;

export const dynamicSeoCopy = {
  product: {
    ru: {
      notFoundTitle: "Товар не найден | SOFIYA",
      pageTitlePattern: "{name} | SOFIYA",
      socialTitlePattern: "{name} — SOFIYA",
      homeBreadcrumb: "Главная",
      sectionBreadcrumb: "Каталог",
    },
    kk: {
      notFoundTitle: "Өнім табылмады | SOFIYA",
      pageTitlePattern: "{name} | SOFIYA",
      socialTitlePattern: "{name} — SOFIYA",
      homeBreadcrumb: "Басты бет",
      sectionBreadcrumb: "Каталог",
    },
  },
  news: {
    ru: {
      notFoundTitle: "Новость не найдена",
      pageTitlePattern: "{name} | SOFIYA",
      socialTitlePattern: "{name}",
      homeBreadcrumb: "Главная",
      sectionBreadcrumb: "Новости",
    },
    kk: {
      notFoundTitle: "Жаңалық табылмады",
      pageTitlePattern: "{name} | SOFIYA",
      socialTitlePattern: "{name}",
      homeBreadcrumb: "Басты бет",
      sectionBreadcrumb: "Жаңалықтар",
    },
  },
  promotion: {
    ru: {
      notFoundTitle: "Акция не найдена | SOFIYA",
      pageTitlePattern: "{name} — акция SOFIYA",
      socialTitlePattern: "{name} — акция SOFIYA",
      descriptionFallback: "Акция SOFIYA",
      homeBreadcrumb: "Главная",
      sectionBreadcrumb: "Акции",
    },
    kk: {
      notFoundTitle: "Акция табылмады | SOFIYA",
      pageTitlePattern: "{name} — SOFIYA акциясы",
      socialTitlePattern: "{name} — SOFIYA акциясы",
      descriptionFallback: "SOFIYA акциясы",
      homeBreadcrumb: "Басты бет",
      sectionBreadcrumb: "Акциялар",
    },
  },
} as const;

export function renderDynamicSeoPattern(pattern: string, name: string) {
  return pattern.replaceAll("{name}", name);
}

export type StaticSeoPath = keyof typeof staticSeoCopy;

export function localizedHead(
  path: string,
  locale: Locale,
  title: string,
  description: string,
  type = "website",
) {
  const localizedPath = locale === "kk" ? (path === "/" ? "/kk" : `/kk${path}`) : path;
  return {
    links: languageLinks(path, locale),
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:locale", content: locale === "kk" ? "kk_KZ" : "ru_KZ" },
      { property: "og:locale:alternate", content: locale === "kk" ? "ru_KZ" : "kk_KZ" },
      { property: "og:url", content: absoluteUrl(localizedPath) },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}

export function staticHead(path: StaticSeoPath, locale: Locale) {
  const copy = staticSeoCopy[path][locale];
  return localizedHead(path, locale, copy.title, copy.description);
}

export function russianHead(path: string, title: string, description: string) {
  return localizedHead(path, "ru", title, description);
}

export function kazakhHead(path: string, title: string, description: string) {
  return localizedHead(path, "kk", title, description);
}

export function breadcrumbScript(locale: Locale, items: Array<{ name: string; path?: string }>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      inLanguage: locale === "kk" ? "kk-KZ" : "ru-KZ",
      itemListElement: items.map((item, index) => {
        const localizedPath =
          item.path == null
            ? undefined
            : locale === "kk"
              ? item.path === "/"
                ? "/kk"
                : `/kk${item.path}`
              : item.path;
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: localizedPath ? absoluteUrl(localizedPath) : undefined,
        };
      }),
    }),
  };
}
