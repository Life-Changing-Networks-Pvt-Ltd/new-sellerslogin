import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inventory Management Software for Real-Time Stock Tracking",
  description:
    "Stay in control of your inventory with real-time stock visibility and smarter inventory management. See how SellersLogin helps you reduce errors and improve efficiency.",
  path: "/features/inventory-tracking",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
