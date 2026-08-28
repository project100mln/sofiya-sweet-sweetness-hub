import { createFileRoute } from "@tanstack/react-router";
import { StoresPage } from "./stores";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/stores")({
  head: () => staticHead("/stores", "kk"),
  component: StoresPage,
});
