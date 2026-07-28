import type { Metadata } from "next";
import VirtualNumbersPage from "@/features/virtual-numbers/App";

export const metadata: Metadata = {
  title: "Buy Virtual Number Online With Call Masking Service | Free Demo Business Number",
  description:
    "If you want to book a virtual number with call masking services and call recording, then check SellersLogin Demo, here you will get advanced services with extra business automation tools as well, like WhatsApp Business API, Voice AI Agent and more.",
  alternates: { canonical: "/virtual-numbers" },
};

export default function Page() {
  return <VirtualNumbersPage />;
}
