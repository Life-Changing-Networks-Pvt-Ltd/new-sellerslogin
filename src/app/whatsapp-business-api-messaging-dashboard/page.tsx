import type { Metadata } from "next";
import WhatsAppFeaturesPage from "@/features/whatsapp-features/App";

export const metadata: Metadata = {
  title: "Free WhatsApp Business API | WhatsApp Bulk Marketing Messages & Blue Tick services",
  description:
    "Sellers Login is a dashboard where a seller gets all automation tools for sales and business growth, and we are the leading provider for WhatsApp Business API with all automation tools",
  alternates: { canonical: "/whatsapp-business-api-messaging-dashboard" },
};

export default function Page() {
  return <WhatsAppFeaturesPage />;
}
