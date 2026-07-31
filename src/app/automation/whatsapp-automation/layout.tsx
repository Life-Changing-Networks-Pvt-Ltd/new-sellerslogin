import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "WhatsApp Business Automation | WhatsApp Marketing | Bulk WhatsApp Messaging Platform",
  description:
    "SellersLogin provides WhatsApp Business Automation with bulk WhatsApp messaging, customer support automation, order notifications, lead generation, and WhatsApp marketing tools for growing businesses.",
  path: "/automation/whatsapp-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
