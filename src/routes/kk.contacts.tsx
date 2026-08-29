import { createFileRoute } from "@tanstack/react-router";
import { ContactsPage } from "./contacts";
import { staticHead } from "@/i18n/seo";

export const Route = createFileRoute("/kk/contacts")({
  head: () => staticHead("/contacts", "kk"),
  component: ContactsPage,
});
