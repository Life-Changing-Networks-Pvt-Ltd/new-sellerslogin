import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "WhatsApp Business Automation Software for Sales & Support",
  description:
    "Connect with customers instantly through automated WhatsApp conversations. SellersLogin helps you respond faster, nurture leads, and deliver a better customer experience.",
  path: "/automation/whatsapp-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
