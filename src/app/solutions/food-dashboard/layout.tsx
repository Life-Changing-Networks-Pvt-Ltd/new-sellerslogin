import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Food Business Management Software with Smart Dashboard",
  description:
    "Manage orders, inventory, billing, and business performance from one intelligent dashboard. SellersLogin helps food businesses operate more efficiently every day.",
  path: "/solutions/food-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
