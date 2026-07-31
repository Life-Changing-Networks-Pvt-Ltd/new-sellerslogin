import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "B2B Business Dashboard Software for Wholesale Management",
  description:
    "Simplify wholesale operations with a centralized dashboard for orders, inventory, and business performance. Grow your B2B business confidently with SellersLogin.",
  path: "/solutions/b2b-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
