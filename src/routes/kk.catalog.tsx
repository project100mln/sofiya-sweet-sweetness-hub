import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "./catalog";
import { staticHead } from "@/i18n/seo";

const sorts = ["recommended", "new", "price-asc", "price-desc"] as const;

export const Route = createFileRoute("/kk/catalog")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
    sort: sorts.includes(search.sort as (typeof sorts)[number]) ? search.sort : undefined,
  }),
  head: () => staticHead("/catalog", "kk"),
  component: CatalogPage,
});
