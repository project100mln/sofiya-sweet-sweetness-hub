import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import { news } from "@/data/news";
import { featuredPromotions } from "@/data/featured-promotions";
import { site } from "@/config/site";

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
      GET: () => {
        const origin = site.domain;
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
        const localizedPaths = paths.flatMap((path) => [path, path === "/" ? "/kk" : `/kk${path}`]);
        const urls = localizedPaths
          .map((path) => {
            const basePath = path === "/kk" ? "/" : path.replace(/^\/kk/, "");
            const ruUrl = `${origin}${basePath}`;
            const kkUrl = `${origin}${basePath === "/" ? "/kk" : `/kk${basePath}`}`;
            return `  <url>
    <loc>${escapeXml(`${origin}${path}`)}</loc>
    <xhtml:link rel="alternate" hreflang="ru-KZ" href="${escapeXml(ruUrl)}" />
    <xhtml:link rel="alternate" hreflang="kk-KZ" href="${escapeXml(kkUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(ruUrl)}" />
  </url>`;
          })
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;

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
