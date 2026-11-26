"use client";

import { useState } from "react";
import { loadRazorpay, type RazorpayResult } from "./razorpay";

export type LeadOrder = {
  key: string;
  orderId: string;
  amount: number;
  currency: "INR" | "USD";
  pricing: { baseAmount: number; gstPercent: number; gstAmount: number };
  returnUrl: string;
};

export function LeadCheckout({ order }: { order: LeadOrder }) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const money = new Intl.NumberFormat(order.currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: order.currency,
  });

  async function pay() {
    setError("");
    setPaying(true);
    try {
      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Payment checkout is unavailable.");
      const checkout = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "China India Sourcing",
        description: "Purchase buyer lead",
        theme: { color: "#2563eb" },
        modal: { ondismiss: () => setPaying(false) },
        handler: (payment: RazorpayResult) => {
          const destination = new URL(order.returnUrl);
          destination.hash = new URLSearchParams({
            razorpay_order_id: payment.razorpay_order_id,
            razorpay_payment_id: payment.razorpay_payment_id,
            razorpay_signature: payment.razorpay_signature,
          }).toString();
          window.location.replace(destination.href);
        },
      });
      checkout.on("payment.failed", (response) => {
        setError(response.error?.description || "Payment failed. Please try again.");
        setPaying(false);
      });
      checkout.open();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to open payment checkout.");
      setPaying(false);
    }
  }

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-2xl font-semibold">Purchase buyer lead</h1>
      <p className="text-sm text-slate-600">Pay to unlock the buyer’s contact details in your dashboard.</p>
      <dl className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
        <div className="flex justify-between"><dt>Buyer lead</dt><dd>{money.format(order.pricing.baseAmount)}</dd></div>
        {order.pricing.gstPercent > 0 && (
          <div className="flex justify-between"><dt>GST ({order.pricing.gstPercent}%)</dt><dd>{money.format(order.pricing.gstAmount)}</dd></div>
        )}
        <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold">
          <dt>Total payable</dt><dd>{money.format(order.amount / 100)}</dd>
        </div>
      </dl>
      <button type="button" onClick={pay} disabled={paying} className="w-full rounded-md bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-60">
        {paying ? "Opening secure checkout…" : `Pay ${money.format(order.amount / 100)}`}
      </button>
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
      <a href={order.returnUrl} className="block text-center text-sm text-blue-800 underline">Return to dashboard</a>
    </section>
  );
}
