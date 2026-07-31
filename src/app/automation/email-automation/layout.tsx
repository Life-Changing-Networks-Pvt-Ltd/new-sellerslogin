import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Email Marketing Automation Software for Customer Engagement",
  description:
    "Build stronger customer relationships with personalized email campaigns that reach the right audience at the right time. Grow engagement and conversions with SellersLogin.",
  path: "/automation/email-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
