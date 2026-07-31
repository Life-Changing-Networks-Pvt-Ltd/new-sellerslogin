import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Delivery Management | Order Tracking & Logistics Management Platform",
  description:
    "SellersLogin provides Delivery Management with order tracking, dispatch management, shipping partner integration, logistics management, delivery status updates, and business automation tools.",
  path: "/features/delivery-management",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
