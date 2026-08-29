import { createFileRoute } from "@tanstack/react-router";
import { Home } from "./index";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/")({
  head: () => staticHead("/", "kk"),
  component: Home,
});
