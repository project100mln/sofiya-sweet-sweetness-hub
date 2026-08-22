import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import { news } from "@/data/news";
import { featuredPromotions } from "@/data/featured-promotions";

const staticPaths = [
  "/",
  "/about",
  "/catalog",
  "/stores",
  "/promotions",
  "/cake-preorder",
  "/catering",
  "/news",
  "/career",
  "/contacts",
  "/privacy",
  "/terms",
];

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[char];
  });

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          ...staticPaths,
          ...products
            .filter((product) => product.isPublished)
            .map((product) => `/catalog/${product.slug}`),
          ...news.map((item) => `/news/${item.slug}`),
          ...featuredPromotions
            .filter((promotion) => promotion.slug)
            .map((promotion) => `/promotions/${promotion.slug}`),
        ];
        const urls = paths
          .map((path) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
