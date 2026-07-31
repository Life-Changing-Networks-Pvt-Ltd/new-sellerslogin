import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Payment Gateway Integration Software for Secure Online Payments",
  description:
    "Provide customers with a fast, secure, and hassle-free payment experience. SellersLogin makes payment integration simple, reliable, and ready to support your business growth.",
  path: "/features/payment-integration",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
