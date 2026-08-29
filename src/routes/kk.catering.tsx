import { createFileRoute } from "@tanstack/react-router";
import { CateringPage } from "./catering";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/catering")({
  head: () => staticHead("/catering", "kk"),
  component: CateringPage,
});
