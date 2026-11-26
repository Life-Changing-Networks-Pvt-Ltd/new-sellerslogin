import type { Metadata } from "next";
import { ChinaIndiaCheckout } from "./china-india-checkout";

export const metadata: Metadata = {
  title: "ChinaIndia Sourcing | Registration Payment",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ChinaIndiaPaymentPage() {
  return <ChinaIndiaCheckout />;
}
