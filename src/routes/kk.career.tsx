import { createFileRoute } from "@tanstack/react-router";
import { CareerPage } from "./career";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/career")({
  head: () => staticHead("/career", "kk"),
  component: CareerPage,
});
