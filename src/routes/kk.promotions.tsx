import { createFileRoute } from "@tanstack/react-router";
import { PromotionsPage } from "./promotions";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/promotions")({
  head: () => staticHead("/promotions", "kk"),
  component: PromotionsPage,
});
