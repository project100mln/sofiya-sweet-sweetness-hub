import type { ReactNode } from "react";
import type { Category } from "@/data/types";
import { isCatalogLandingSlug } from "@/data/catalog-landing-pages";
import { LocaleLink } from "@/i18n";

export function CatalogCategoryLink({
  category,
  className,
  children,
}: {
  category: Category;
  className?: string;
  children: ReactNode;
}) {
  const hasLandingPage = isCatalogLandingSlug(category.slug);
  return (
    <LocaleLink
      to={(hasLandingPage ? `/catalog/${category.slug}` : "/catalog") as never}
      search={hasLandingPage ? undefined : { cat: category.slug }}
      className={className}
    >
      {children}
    </LocaleLink>
  );
}
