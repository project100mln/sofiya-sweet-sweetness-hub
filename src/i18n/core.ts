export const locales = ["ru", "kk"] as const;

export type Locale = (typeof locales)[number];
export type LocaleTag = "ru-KZ" | "kk-KZ";

export const localeTag: Record<Locale, LocaleTag> = {
  ru: "ru-KZ",
  kk: "kk-KZ",
};

function normalizeInternalPath(pathname: string): string {
  return `/${pathname.replace(/^\/+/, "")}`;
}

export function localeFromPath(pathname: string): Locale {
  const internalPath = normalizeInternalPath(pathname);
  return internalPath === "/kk" || internalPath.startsWith("/kk/") ? "kk" : "ru";
}

export function stripLocale(pathname: string): string {
  const internalPath = normalizeInternalPath(pathname);
  if (internalPath === "/kk") return "/";
  return internalPath.startsWith("/kk/")
    ? normalizeInternalPath(internalPath.slice(3))
    : internalPath;
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = stripLocale(pathname);
  if (locale === "ru") return basePath;
  return basePath === "/" ? "/kk" : `/kk${basePath}`;
}

export function localizeHref(href: string, locale: Locale): string {
  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";
  return `${localizePath(pathname, locale)}${suffix}`;
}

export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag[locale], { maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value: string, locale: Locale): string {
  const calendarDate = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = calendarDate
    ? new Date(
        Date.UTC(Number(calendarDate[1]), Number(calendarDate[2]) - 1, Number(calendarDate[3])),
      )
    : new Date(value);
  return new Intl.DateTimeFormat(localeTag[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
