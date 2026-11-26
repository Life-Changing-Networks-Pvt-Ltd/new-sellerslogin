"use client";

import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LeadCheckout, type LeadOrder } from "./lead-checkout";
import { MarketVerificationPayment } from "./market-verification-payment";
import { refreshMarketPayment, type MarketForm, type MarketPaymentDetails } from "./payment-api";

const marketOrigin = process.env.NEXT_PUBLIC_CIS_MARKET_URL || "https://chinaindiasourcing.com";

function getDashboardReturnUrl(value: string | null) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const dashboardOrigin = process.env.NEXT_PUBLIC_CIS_DASHBOARD_URL || "http://localhost:3002";
    if (url.origin === new URL(dashboardOrigin).origin && url.pathname === "/dashboard") {
      return url.href;
    }
  } catch {
    return "";
  }
  return "";
}

type CheckoutState =
  | { status: "loading" }
  | { status: "lead"; order: LeadOrder }
  | { status: "error"; message: string }
  | { status: "ready"; form: MarketForm; payment: MarketPaymentDetails; returnUrl: string }
  | { status: "paid"; form: MarketForm; returnUrl: string };

export function ChinaIndiaCheckout() {
  const [checkout, setCheckout] = useState<CheckoutState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function restorePayment() {
      try {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const lead = params.get("lead");
        if (lead) {
          const response = await fetch("/api/payments/chinaindiasourcing/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lead }),
          });
          if (!response.ok) throw new Error("This lead checkout link has expired or is invalid. Return to your dashboard to try again.");
          const order: LeadOrder = await response.json();
          if (!cancelled) setCheckout({ status: "lead", order });
          return;
        }
        const form = params.get("form");
        const applicationId = params.get("id");
        const accessToken = params.get("token");
        if ((form !== "buyers" && form !== "sellers") || !applicationId || !accessToken) {
          throw new Error("Return to your form to start or resume checkout.");
        }
        const result = await refreshMarketPayment(form, { applicationId, accessToken });
        if (!result.data) throw new Error("Unable to retrieve payment details.");
        if (!cancelled) {
          setCheckout({
            status: "ready",
            form,
            payment: result.data,
            returnUrl: getDashboardReturnUrl(params.get("return_url")),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setCheckout({
            status: "error",
            message: error instanceof Error ? error.message : "Unable to retrieve payment details.",
          });
        }
      }
    }

    void restorePayment();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (checkout.status !== "paid" || !checkout.returnUrl) return;
    const timer = window.setTimeout(() => window.location.assign(checkout.returnUrl), 1200);
    return () => window.clearTimeout(timer);
  }, [checkout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a className="font-semibold" href={marketOrigin}>ChinaIndia Sourcing</a>
          <nav className="flex gap-4 text-sm text-slate-600" aria-label="Checkout navigation">
            <a className="flex items-center gap-1.5 hover:underline" href={marketOrigin}>
              <ArrowLeft className="size-4" /> Back to Market
            </a>
            <a className="hover:underline" href={new URL("/terms", marketOrigin).href}>Terms</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
        {checkout.status === "loading" && (
          <p className="flex justify-center gap-2 text-sm" role="status">
            <Loader2 className="size-5 animate-spin" /> Loading payment details…
          </p>
        )}
        {checkout.status === "error" && (
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold">No active payment found</h1>
            <p className="text-sm text-slate-600" role="alert">{checkout.message}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-800">
              <a className="underline" href={new URL("/buyers", marketOrigin).href}>Buyer enquiry</a>
              <a className="underline" href={new URL("/sellers", marketOrigin).href}>Seller registration</a>
            </div>
          </section>
        )}
        {checkout.status === "lead" && <LeadCheckout order={checkout.order} />}
        {checkout.status === "ready" && (
          <MarketVerificationPayment
            form={checkout.form}
            payment={checkout.payment}
            onPaid={() => {
              window.history.replaceState(window.history.state, "", window.location.pathname);
              setCheckout({ status: "paid", form: checkout.form, returnUrl: checkout.returnUrl });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
        {checkout.status === "paid" && (
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm" role="status">
            <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
            <h1 className="text-2xl font-semibold">Payment successful</h1>
            <p>Your verification payment has been received and verified successfully.</p>
            <p className="text-sm text-slate-600">
              Your Basic B2B plan is active for one month. Your dashboard credentials and login details have been emailed to you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-800">
              {checkout.returnUrl && <a className="underline" href={checkout.returnUrl}>Return to dashboard</a>}
              <a className="underline" href={marketOrigin}>Back to Marketplace</a>
              <a className="underline" href={new URL(`/${checkout.form}`, marketOrigin).href}>
                {checkout.form === "sellers" ? "Seller Registration" : "Submit Another Requirement"}
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
