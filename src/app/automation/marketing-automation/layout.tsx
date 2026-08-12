import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Marketing Automation Platform | AI Marketing Automation Software",
  description:
    "SellersLogin's AI marketing automation software segments customers, recovers abandoned carts, and runs automated email, WhatsApp and voice journeys.",
  path: "/automation/marketing-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
