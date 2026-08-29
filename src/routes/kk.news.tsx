import { createFileRoute } from "@tanstack/react-router";
import { NewsPage } from "./news";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/news")({
  head: () => staticHead("/news", "kk"),
  component: NewsPage,
});
