import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Delivery Management Software for Order Fulfillment & Logistics",
  description:
    "Simplify deliveries from dispatch to doorstep with a smarter delivery management solution. SellersLogin helps you streamline logistics while keeping customers informed.",
  path: "/features/delivery-management",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
