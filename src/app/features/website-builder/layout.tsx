import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Website Builder | eCommerce Website Builder | Business Website Builder",
  description:
    "SellersLogin provides an AI Website Builder that helps businesses create professional websites and online stores with responsive templates, SEO features, payment gateway integration, and business automation tools.",
  path: "/features/website-builder",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
