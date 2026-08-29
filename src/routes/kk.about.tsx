import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "./about";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/about")({
  head: () => staticHead("/about", "kk"),
  component: AboutPage,
});
