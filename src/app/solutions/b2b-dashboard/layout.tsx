import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "B2B Business Dashboard | Wholesale Management | Distributor Management Software",
  description:
    "SellersLogin provides a B2B Business Dashboard with wholesale order management, distributor management, inventory tracking, customer management, and sales analytics for manufacturers and wholesalers.",
  path: "/solutions/b2b-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
