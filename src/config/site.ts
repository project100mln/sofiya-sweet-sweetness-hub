// Centralized business configuration for SOFIYA.
// Keep unverified public URLs empty: the UI hides unavailable channels instead
// of publishing guessed business data.
const normalizeBaseUrl = (value: string | undefined) => value?.trim().replace(/\/$/, "") ?? "";
const productionSiteUrl = "https://sofiyabakery.com";

export const site = {
  brand: "SOFIYA",
  tagline: "Фирменные магазины",
  legalName: "SOFIYA",
  domain: normalizeBaseUrl(import.meta.env.VITE_SITE_URL) || productionSiteUrl,
  instagramUrl: "https://www.instagram.com/sofiya_sweet.kz",
  instagramHandle: "@sofiya_sweet.kz",
  tiktokUrl: import.meta.env.VITE_TIKTOK_URL?.trim() ?? "",
  tiktokHandle: import.meta.env.VITE_TIKTOK_HANDLE?.trim() ?? "TikTok",
  // WhatsApp: user supplied +77075580605
  whatsapp: "+77075580605",
  whatsappDigits: "77075580605",
  phone: "+7 707 558 06 05",
  email: "",
  region: "Шымкент и Туркестанская область",
} as const;

export const waLink = (message: string) =>
  site.whatsappDigits
    ? `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`
    : "";

export const instagramLink = site.instagramUrl;

export const absoluteUrl = (path: string) => {
  if (!site.domain) return path;
  return `${site.domain}${path.startsWith("/") ? path : `/${path}`}`;
};

export const languageLinks = (path: string, locale: "ru" | "kk") => {
  if (!site.domain) return [];
  const basePath = path === "/" ? "/" : path.replace(/^\/kk(?=\/|$)/, "") || "/";
  const ruUrl = absoluteUrl(basePath);
  const kkUrl = absoluteUrl(basePath === "/" ? "/kk" : `/kk${basePath}`);
  return [
    { rel: "canonical", href: locale === "kk" ? kkUrl : ruUrl },
    { rel: "alternate", hrefLang: "ru-KZ", href: ruUrl },
    { rel: "alternate", hrefLang: "kk-KZ", href: kkUrl },
    { rel: "alternate", hrefLang: "x-default", href: ruUrl },
  ];
};

export const canonicalLink = (path: string) => languageLinks(path, "ru");
