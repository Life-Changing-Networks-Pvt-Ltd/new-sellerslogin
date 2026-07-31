import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Email Marketing Automation | Bulk Email Campaign & Email Marketing Platform",
  description:
    "SellersLogin provides Email Marketing Automation Software that helps businesses create bulk email campaigns, automate customer communication, recover abandoned carts, and improve customer engagement from one platform.",
  path: "/automation/email-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
