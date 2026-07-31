import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Food Business Management Dashboard | Restaurant Management Dashboard",
  description:
    "SellersLogin provides Food Business Management Software with restaurant billing, order management, inventory tracking, POS, kitchen management, and business analytics for restaurants, cafés, and cloud kitchens.",
  path: "/solutions/food-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
