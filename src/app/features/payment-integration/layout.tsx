import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Payment Gateway Integration | Online Payment Gateway | Secure Payment Solution",
  description:
    "SellersLogin provides Payment Gateway Integration with secure online payments, multiple payment gateway support, fast checkout, transaction management, and reliable payment processing for businesses.",
  path: "/features/payment-integration",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
