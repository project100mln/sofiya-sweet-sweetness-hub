import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "./terms";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/terms")({
  head: () => staticHead("/terms", "kk"),
  component: TermsPage,
});
