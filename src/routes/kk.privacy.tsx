import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "./privacy";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/privacy")({
  head: () => staticHead("/privacy", "kk"),
  component: PrivacyPage,
});
