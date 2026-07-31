import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Voice Automation Software for Smart Customer Communication",
  description:
    "Deliver natural AI-powered voice interactions that save time and improve customer service. See how SellersLogin helps businesses communicate more efficiently at scale.",
  path: "/automation/ai-voice-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
