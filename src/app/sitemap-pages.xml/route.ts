import { SITE_URL } from "@/lib/seo";

const routes = Array.from(new Set([
  "", "/about", "/pricing", "/contact", "/complete-features",
  "/buy-virtual-numbers-for-business", "/whatsapp-business-api-messaging-dashboard", "/live-chat", "/careers",
  "/features/website-builder", "/features/store-management",
  "/features/inventory-tracking", "/features/delivery-management",
  "/features/analytics-dashboard", "/features/payment-integration",
  "/solutions/b2b-dashboard", "/solutions/b2c-dashboard",
  "/solutions/food-dashboard", "/automation/marketing-automation",
  "/automation/ai-voice-automation", "/automation/email-automation",
  "/automation/whatsapp-automation", "/automation/delivery-automation",
  "/industries/manufacturing", "/industries/real-estate",
  "/industries/fashion", "/industries/d2c", "/industries/food",
  "/industries/restaurants", "/industries/saas", "/industries/healthcare",
  "/industries/pharmaceutical", "/industries/banking",
  "/industries/hospitality", "/industries/tourism",
  "/industries/ecommerce", "/industries/retail", "/industries/logistics",
  "/industries/fmcg", "/industries/human-resource",
  "/industries/professional-services", "/resources/testimonials",
  "/resources/blog", "/resources/faq", "/privacy", "/terms", "/returns",
  "/shipping", "/warranty", "/grievance", "/data-deletion",
]));

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Update this value when the public page set or its shared content changes.
const lastModified = "2026-08-07";

const changeFrequency = (route: string) => {
  if (!route) return "daily";
  if (route.startsWith("/industries/") || route.startsWith("/resources/")) return "monthly";
  if (["/privacy", "/terms", "/returns", "/shipping", "/warranty", "/grievance", "/data-deletion"].includes(route)) return "yearly";
  return "weekly";
};

const priority = (route: string) => {
  if (!route) return "1.0";
  if (route === "/pricing") return "0.9";
  if (route.startsWith("/industries/") || route.startsWith("/resources/")) return "0.7";
  if (["/privacy", "/terms", "/returns", "/shipping", "/warranty", "/grievance", "/data-deletion"].includes(route)) return "0.3";
  return "0.8";
};

export function GET() {
  const urls = routes.map((route) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${route}`)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency(route)}</changefreq>
    <priority>${priority(route)}</priority>
  </url>`).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    },
  );
}
