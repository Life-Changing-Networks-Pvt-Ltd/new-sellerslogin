import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inventory Management | Stock Tracking & Warehouse Management System",
  description:
    "SellersLogin provides Inventory Management with real-time stock tracking, warehouse management, inventory control, purchase management, inventory reports, and business automation tools for growing businesses.",
  path: "/features/inventory-tracking",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
