import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Marketing Automation Platform | AI Marketing Automation Software | Automation Tools",
  description:
    "SellersLogin provides Marketing Automation Software with AI-powered marketing automation, email marketing, WhatsApp automation, lead management, and customer engagement tools to help businesses increase sales and business growth.",
  path: "/automation/marketing-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
