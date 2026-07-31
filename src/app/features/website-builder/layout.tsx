import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Website Builder for eCommerce & Business Websites",
  description:
    "Launch a professional website in minutes with powerful design tools and built-in business features. Build, manage, and grow your online presence with SellersLogin.",
  path: "/features/website-builder",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
