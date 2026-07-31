import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Marketing Automation Software for eCommerce & Business Growth",
  description:
    "Automate repetitive marketing tasks, engage customers across channels, and focus on growing your business. Discover how SellersLogin simplifies marketing with one powerful platform.",
  path: "/automation/marketing-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
