import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Voice Automation | AI Calling Software | AI Voice Agent for Customer Support",
  description:
    "SellersLogin provides AI Voice Automation that helps businesses automate customer calls, order confirmations, appointment reminders, and customer support using intelligent AI voice agents.",
  path: "/automation/ai-voice-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
