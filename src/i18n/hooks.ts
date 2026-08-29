import { useRouterState } from "@tanstack/react-router";
import { localeFromPath, localeTag, localizePath, type Locale } from "@/i18n/core";
import { uiMessage, type UiMessageKey } from "@/i18n/messages";

export function useLocale(): Locale {
  return useRouterState({ select: (state) => localeFromPath(state.location.pathname) });
}

export function useCurrentHref(): string {
  return useRouterState({ select: (state) => state.location.href });
}

export function useI18n() {
  const locale = useLocale();
  return {
    locale,
    tag: localeTag[locale],
    t: (key: UiMessageKey) => uiMessage(locale, key),
    pick: <T>(ru: T, kk: T): T => (locale === "kk" ? kk : ru),
    path: (pathname: string) => localizePath(pathname, locale),
  };
}
