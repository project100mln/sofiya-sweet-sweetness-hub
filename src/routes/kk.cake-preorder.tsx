import { createFileRoute } from "@tanstack/react-router";
import { PreorderPage } from "./cake-preorder";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/cake-preorder")({
  head: () => staticHead("/cake-preorder", "kk"),
  component: PreorderPage,
});
