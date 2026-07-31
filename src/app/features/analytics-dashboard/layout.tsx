import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Business Analytics Dashboard | Sales Dashboard | Business Analytics Software",
  description:
    "SellersLogin provides a Business Analytics Dashboard with sales reports, customer analytics, inventory insights, revenue tracking, and business intelligence to help businesses make smarter decisions.",
  path: "/features/analytics-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
