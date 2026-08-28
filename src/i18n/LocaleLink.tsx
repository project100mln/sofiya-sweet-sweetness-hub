import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { localizePath } from "@/i18n/core";
import { useLocale } from "@/i18n/hooks";

type LinkProps = ComponentProps<typeof Link>;
type LocaleLinkProps = Omit<LinkProps, "search" | "params"> & {
  search?: unknown;
  params?: unknown;
};

export function LocaleLink({ to, ...props }: LocaleLinkProps) {
  const locale = useLocale();
  const localizedTo = typeof to === "string" ? localizePath(to, locale) : to;
  return <Link {...({ ...props, to: localizedTo } as LinkProps)} />;
}
