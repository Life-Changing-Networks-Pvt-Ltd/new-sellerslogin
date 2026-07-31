import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Business Analytics Dashboard for Sales & Performance Insights",
  description:
    "Turn your business data into actionable insights with real-time analytics and performance reports. Make smarter decisions faster with the SellersLogin Analytics Dashboard.",
  path: "/features/analytics-dashboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
