"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";
import { CreditCard, ArrowRight, CheckCircle2, Smartphone } from "lucide-react";

const getBillingCycleMonths = (cycle: string): number => {
  const c = String(cycle || "").trim().toLowerCase();
  const staticMap: Record<string, number> = {
    "1_month": 1, "6_months": 6, "1_year": 12,
    "2_years": 24, "3_years": 36, "4_years": 48,
    monthly: 1, quarterly: 3,
  };
  if (staticMap[c]) return staticMap[c];
  const yearsMatch = c.match(/^(\d+)_years?$/);
  if (yearsMatch) return parseInt(yearsMatch[1]) * 12;
  const monthsMatch = c.match(/^(\d+)_months?$/);
  if (monthsMatch) return parseInt(monthsMatch[1]);
  return 1;
};
import type { RootState, AppDispatch } from "@/store";
import { updateVendorBusiness } from "@/store/slices/vendorSlice";
import { INDIAN_STATES } from "@/lib/constants";
import { buildAdminAutoLoginUrl } from "@/lib/utils";
import { billingCycleLabels, defaultBillingCycle } from "@/lib/pricingData";

type AuthVendor = {
  name?: string;
  business_name?: string;
  email?: string;
  phone_no?: string;
  phone?: string;
  role?: string;
};

type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailedResponse = {
  error?: {
    description?: string;
  };
};

type RazorpaySubscriptionResponse = {
  razorpay_subscription_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", callback: (response: RazorpayFailedResponse) => void) => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

const getUrlParam = (key: string) => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
};

const getSessionValue = (key: string, fallback = "", urlKey = key) => {
  if (typeof window === "undefined") return fallback;
  return getUrlParam(urlKey) || sessionStorage.getItem(key) || fallback;
};

const getSessionPlanPrice = () => {
  const planPrice = getSessionValue("selectedPlanPrice", "14364", "planPrice");
  return parseInt(planPrice.replace(/\D/g, ""), 10) || 14364;
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function PaymentPendingPage() {
  const hasMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const token = useSelector(
    (state: RootState) => state.auth?.token ?? "",
  );
  const authUser = useSelector(
    (state: RootState) => state.auth?.data ?? null,
  ) as AuthVendor | null;

  const dispatch = useDispatch<AppDispatch>();

  const [selectedPlanName] = useState(() => getSessionValue("selectedPlanName", "Startup", "planName"));
  const [numericPrice, setNumericPrice] = useState(getSessionPlanPrice);
  const [currency] = useState(() => getSessionValue("selectedPlanCurrency", "INR", "currency"));
  const [billingCycle] = useState(() => getSessionValue("selectedPlanBillingCycle", defaultBillingCycle, "billingCycle"));
  const [displayedPrice] = useState(() => getSessionValue("selectedPlanDisplayedPrice", "INR 399/mo", "planDisplayedPrice"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminRedirectUrl] = useState(() => getSessionValue("vendor_post_payment_redirect", "", "redirectBack"));
  const [launchToken, setLaunchToken] = useState(() => getSessionValue("vendor_auth_token", "", "token"));
  const [originalPrice] = useState(getSessionPlanPrice);
  const [referralCodeInput, setReferralCodeInput] = useState("");
  const [appliedReferral, setAppliedReferral] = useState("");
  const [isApplyingReferral, setIsApplyingReferral] = useState(false);
  const [referralError, setReferralError] = useState("");
  const [vendorPhone] = useState(() => getSessionValue("vendor_phone", ""));
  const [vendorEmail, setVendorEmail] = useState(() => getSessionValue("vendor_email", "", "vendorEmail"));
  const [paymentSuccess, setPaymentSuccess] = useState<{
    email: string;
    planName: string;
    billingCycleLabel: string;
    amount: number;
    paymentId: string;
    dashboardUrl: string;
    isUpiAutopay?: boolean;
  } | null>(null);

  const [selectedMethod] = useState<"one_time" | "upi_autopay">("one_time");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country] = useState("India");
  const [pincode, setPincode] = useState("");

  const isAddressFilled = addressLine1.trim() !== "" && city.trim() !== "" && state.trim() !== "" && pincode.trim() !== "";
  const effectiveToken = launchToken || token || "";
  const effectiveVendorEmail = vendorEmail || authUser?.email || "";
  const effectiveAuthVendor = {
    ...(authUser || {}),
    email: effectiveVendorEmail,
    role: authUser?.role || "vendor",
  };
  const billingCycleLabel = billingCycleLabels[billingCycle] || billingCycle;
  const finalMultiplier = isAddressFilled ? 1.18 : 1;
  const finalPrice = Math.round(numericPrice * finalMultiplier);
  const finalOriginalPrice = Math.round(originalPrice * finalMultiplier);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      const planNameParam = urlParams.get("planName");
      const redirectBackParam = urlParams.get("redirectBack");
      const vendorEmailParam = urlParams.get("vendorEmail");

      if (tokenParam && planNameParam) {
        setLaunchToken(tokenParam);
        sessionStorage.setItem("vendor_auth_token", tokenParam);
        sessionStorage.setItem("selectedPlanName", planNameParam);
        sessionStorage.setItem("selectedPlanPrice", urlParams.get("planPrice") || "14364");
        sessionStorage.setItem("selectedPlanCurrency", urlParams.get("currency") || "INR");
        sessionStorage.setItem("selectedPlanBillingCycle", urlParams.get("billingCycle") || defaultBillingCycle);
        sessionStorage.setItem("selectedPlanDisplayedPrice", urlParams.get("planDisplayedPrice") || "INR 399/mo");
        if (vendorEmailParam) {
          sessionStorage.setItem("vendor_email", vendorEmailParam);
        }
        
        if (redirectBackParam) {
          sessionStorage.setItem("vendor_post_payment_redirect", redirectBackParam);
        }

        window.history.replaceState(null, "", window.location.pathname);
      }

    }
  }, []);

  const handleApplyReferral = async () => {
    if (!referralCodeInput.trim()) {
      setReferralError("Please enter a referral code.");
      return;
    }
    setReferralError("");
    setIsApplyingReferral(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/vendor/billing/apply-referral`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${effectiveToken}`,
          },
          body: JSON.stringify({ referral_code: referralCodeInput.trim() }),
        },
      );
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: data.message || "Referral code applied successfully.",
          showConfirmButton: false,
          timer: 2000,
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `, // Animated way
        });
        setAppliedReferral(referralCodeInput.trim());
        setNumericPrice(data.amount || 1);
        setReferralCodeInput("");
      } else {
        setReferralError(data.message || "Invalid referral code.");
      }
    } catch {
      setReferralError("Something went wrong. Please try again.");
    } finally {
      setIsApplyingReferral(false);
    }
  };

  const handleRemoveReferral = () => {
    setAppliedReferral("");
    setNumericPrice(originalPrice);
    setReferralCodeInput("");
    setReferralError("");
  };

  const handleBypass = async () => {
    setIsSubmitting(true);
    if (addressLine1 || city || state || pincode) {
      const formData = new FormData();
      formData.append("address_line_1", addressLine1.trim() || "NA");
      formData.append("address_line_2", addressLine2.trim());
      formData.append("city", city.trim() || "NA");
      formData.append("state", state.trim() || "NA");
      formData.append("country", country.trim() || "India");
      formData.append("pincode", pincode.trim() || "000000");
      try {
        await dispatch(updateVendorBusiness({ formData, tokenOverride: effectiveToken })).unwrap();
      } catch (err) {
        console.error("Bypass address save error", err);
      }
    }
    
    if (adminRedirectUrl) {
      window.location.replace(adminRedirectUrl);
    } else {
      window.location.replace(buildAdminAutoLoginUrl({ token: effectiveToken, vendor: effectiveAuthVendor }));
    }
  };

  const getDashboardUrl = () =>
    adminRedirectUrl || buildAdminAutoLoginUrl({ token: effectiveToken, vendor: effectiveAuthVendor });

  const handlePayNow = async () => {
    if (selectedMethod === "upi_autopay") {
      return handleSubscribeWithUPI();
    }

    // existing one-time flow
    if (!effectiveToken) {
      Swal.fire(
        "Error",
        "Authentication required. Please log in again.",
        "error",
      );
      return;
    }

    if (!isAddressFilled) {
      const missingFields = [];
      if (addressLine1.trim() === "") missingFields.push("Address Line 1");
      if (city.trim() === "") missingFields.push("City");
      if (state.trim() === "") missingFields.push("State");
      if (pincode.trim() === "") missingFields.push("Pincode");
      
      Swal.fire("Incomplete Address", `Please fill the required fields: ${missingFields.join(", ")}`, "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("address_line_1", addressLine1.trim());
      formData.append("address_line_2", addressLine2.trim());
      formData.append("city", city.trim());
      formData.append("state", state.trim());
      formData.append("country", country.trim());
      formData.append("pincode", pincode.trim());
      
      try {
        await dispatch(updateVendorBusiness({ formData, tokenOverride: effectiveToken })).unwrap();
      } catch {
        Swal.fire("Error", "Failed to save address details.", "error");
        setIsSubmitting(false);
        return;
      }

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/vendor/billing/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${effectiveToken}`,
          },
          body: JSON.stringify({
            plan: selectedPlanName,
            amount: finalPrice,
            currency: currency,
            billing_cycle: billingCycle,
            displayed_price: displayedPrice,
            ...(appliedReferral ? { referral_code: appliedReferral } : {}),
          }),
        },
      );
      const orderData = await orderRes.json();

      if (orderData.success && orderData.data) {
        if (!vendorEmail && orderData.data.customer?.email) {
          setVendorEmail(orderData.data.customer.email);
        }
        const loadRazorpay = () =>
          new Promise((resolve) => {
            if (
              document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
              )
            ) {
              resolve(true);
              return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
          });

        await loadRazorpay();

        const options = {
          key: orderData.data.key_id,
          amount: orderData.data.amount,
          currency: orderData.data.currency,
          name: "Sellers Login",
          description: `Subscription for ${selectedPlanName} Plan`,
          order_id: orderData.data.order_id,
          handler: async function (response: RazorpayPaymentResponse) {
            try {
              const verifyRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || ""}/vendor/billing/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${effectiveToken}`,
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                },
              );
              const verifyData = await verifyRes.json();
              const planIsActive = Boolean(verifyData.data?.plan?.is_premium_active);
              if (verifyData.success && planIsActive) {
                const enabledEmail =
                  verifyData.data?.vendor?.email ||
                  orderData.data.customer?.email ||
                  vendorEmail ||
                  authUser?.email ||
                  "";
                const dashboardUrl = getDashboardUrl();
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("vendor_phone");
                  sessionStorage.removeItem("vendor_country_code");
                  sessionStorage.removeItem("vendor_registration_step");
                  sessionStorage.removeItem("selectedPlanName");
                  sessionStorage.removeItem("selectedPlanPrice");
                  sessionStorage.removeItem("selectedPlanCurrency");
                  sessionStorage.removeItem("selectedPlanBillingCycle");
                  sessionStorage.removeItem("selectedPlanDisplayedPrice");
                }
                setPaymentSuccess({
                  email: enabledEmail || "this vendor account",
                  planName: selectedPlanName,
                  billingCycleLabel,
                  amount: finalPrice,
                  paymentId: response.razorpay_payment_id,
                  dashboardUrl,
                });
                setIsSubmitting(false);
              } else {
                console.error("Verification failed:", JSON.stringify(verifyData));
                Swal.fire(
                  "Error",
                  verifyData.message || "Payment verification failed or plan activation was not confirmed. Please contact support.",
                  "error",
                );
                setIsSubmitting(false);
              }
            } catch (err: unknown) {
              console.error("Error calling verify endpoint:", err);
              Swal.fire("Error", getErrorMessage(err, "Failed to verify payment."), "error");
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: authUser?.name || authUser?.business_name || "",
            email: effectiveVendorEmail,
            contact: vendorPhone || authUser?.phone_no || authUser?.phone || "",
          },
          theme: {
            color: "#7c3aed",
          },
          modal: {
            ondismiss: function () {
              Swal.fire(
                "Pending",
                "Payment is pending. Please click 'Pay Now' to retry payment.",
                "info",
              );
              setIsSubmitting(false);
            },
          },
        };

        const Razorpay = (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay;
        if (!Razorpay) {
          Swal.fire("Error", "Failed to load payment gateway.", "error");
          setIsSubmitting(false);
          return;
        }

        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response: RazorpayFailedResponse) {
          Swal.fire(
            "Error",
            response.error?.description || "Payment failed",
            "error",
          );
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        Swal.fire("Error", "Failed to initialize payment gateway.", "error");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment system error. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  const handleSubscribeWithUPI = async () => {
    if (!effectiveToken) {
      Swal.fire("Error", "Authentication required. Please log in again.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const subRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/vendor/billing/subscription/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${effectiveToken}`,
          },
          body: JSON.stringify({
            plan: selectedPlanName,
            amount: Math.round(finalPrice / getBillingCycleMonths(billingCycle)),
            billing_cycle: billingCycle,
          }),
        },
      );
      const subData = await subRes.json();

      if (!subData.success || !subData.data) {
        Swal.fire("Error", subData.message || "Failed to create UPI subscription", "error");
        setIsSubmitting(false);
        return;
      }

      const loadRazorpay = () =>
        new Promise((resolve) => {
          if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
            resolve(true);
            return;
          }
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      await loadRazorpay();

      const options = {
        key: subData.data.key_id,
        subscription_id: subData.data.subscription_id,
        customer_id: subData.data.customer_id,
        name: "Sellers Login",
        description: `UPI Autopay for ${selectedPlanName} Plan`,
        handler: async function (response: RazorpaySubscriptionResponse) {
          try {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || ""}/vendor/billing/subscription/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${effectiveToken}`,
                },
                body: JSON.stringify({
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );
            const verifyData = await verifyRes.json();
            const planIsActive = Boolean(verifyData.data?.plan?.is_premium_active);
            if (verifyData.success && planIsActive) {
              const enabledEmail =
                verifyData.data?.vendor?.email ||
                vendorEmail ||
                authUser?.email ||
                "";
              const dashboardUrl = getDashboardUrl();
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("vendor_phone");
                sessionStorage.removeItem("vendor_country_code");
                sessionStorage.removeItem("vendor_registration_step");
                sessionStorage.removeItem("selectedPlanName");
                sessionStorage.removeItem("selectedPlanPrice");
                sessionStorage.removeItem("selectedPlanCurrency");
                sessionStorage.removeItem("selectedPlanBillingCycle");
                sessionStorage.removeItem("selectedPlanDisplayedPrice");
              }
              setPaymentSuccess({
                email: enabledEmail || "this vendor account",
                planName: selectedPlanName,
                billingCycleLabel,
                amount: subData.data?.monthly_price || Math.round(finalPrice / getBillingCycleMonths(billingCycle)),
                paymentId: response.razorpay_payment_id,
                dashboardUrl,
                isUpiAutopay: true,
              });
              setIsSubmitting(false);
            } else {
              console.error("UPI subscription verification failed:", JSON.stringify(verifyData));
              Swal.fire("Error", verifyData.message || "UPI subscription verification failed.", "error");
              setIsSubmitting(false);
            }
          } catch (err: unknown) {
            console.error("Error verifying UPI subscription:", err);
            Swal.fire("Error", getErrorMessage(err, "Failed to verify UPI subscription."), "error");
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: authUser?.name || authUser?.business_name || "",
          email: effectiveVendorEmail,
          contact: vendorPhone || authUser?.phone_no || authUser?.phone || "",
        },
        theme: {
          color: "#7c3aed",
        },
        modal: {
          ondismiss: function () {
            Swal.fire("Pending", "UPI subscription setup is pending. Please try again.", "info");
            setIsSubmitting(false);
          },
        },
      };

      const Razorpay = (window as Window & { Razorpay?: RazorpayConstructor }).Razorpay;
      if (!Razorpay) {
        Swal.fire("Error", "Failed to load payment gateway.", "error");
        setIsSubmitting(false);
        return;
      }

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response: RazorpayFailedResponse) {
        Swal.fire("Error", response.error?.description || "UPI subscription payment failed", "error");
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "UPI subscription system error. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="vendor-surface-card px-8 py-6 text-center text-sm font-semibold text-slate-600 shadow-xl shadow-slate-200/50">
          Loading payment details...
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <main className="w-full max-w-2xl">
          <div className="vendor-surface-card p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
              <CheckCircle2 className="h-10 w-10" />
            </span>
            <p className="vendor-step-pill mt-8 bg-emerald-50 text-emerald-700">
              {paymentSuccess.isUpiAutopay ? "UPI Autopay Enabled" : "Payment Done"}
            </p>
            <h1 className="vendor-display mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {paymentSuccess.isUpiAutopay ? "Plan activated with UPI Autopay" : "Plan enabled successfully"}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
              Your <strong className="text-slate-950">{paymentSuccess.planName}</strong> plan ({paymentSuccess.billingCycleLabel}) is now active for{" "}
              <strong className="text-violet-700">{paymentSuccess.email}</strong>.
            </p>
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left text-sm text-emerald-900">
              <p><strong>Amount paid:</strong> {currency} {paymentSuccess.amount}</p>
              <p className="mt-1"><strong>Payment ID:</strong> {paymentSuccess.paymentId}</p>
              {paymentSuccess.isUpiAutopay ? (
                <p className="mt-2 text-violet-700 font-semibold flex items-center gap-1">
                  <Smartphone className="h-4 w-4" /> UPI Autopay active — future renewals are automatic
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => window.location.replace(paymentSuccess.dashboardUrl)}
              className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 border border-violet-700 bg-violet-700 px-10 text-base font-semibold text-white transition hover:bg-violet-800 sm:w-auto"
            >
              Go to dashboard
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="mt-4 text-sm text-slate-500">
              You can confirm activation from the dashboard billing section.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const showPlanDetails = () => {
    let featuresHtml = "";
    if (selectedPlanName.toLowerCase().includes("startup")) {
      featuresHtml = `<ul style="text-align: left; margin-left: 20px; line-height: 1.6;">
        <li>Up to 5 websites on the free plan</li>
        <li>1 connected app at a time</li>
        <li>Basic storefront management</li>
        <li>Standard support</li>
      </ul>`;
    } else {
      featuresHtml = `<ul style="text-align: left; margin-left: 20px; line-height: 1.6;">
        <li>Create unlimited websites for your business</li>
        <li>Connect multiple apps without free-plan limits</li>
        <li>Advanced growth and storefront scaling tools</li>
        <li>Priority support and faster setup help</li>
      </ul>`;
    }

    Swal.fire({
      title: `${selectedPlanName} Plan`,
      html: `
        <div style="font-size: 14px; color: #475569; text-align: left; padding: 10px;">
          <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin-bottom: 4px; font-size: 16px;"><strong>Price:</strong> <span style="color: #e11d48;">${displayedPrice}</span> <span style="font-size: 12px;">(Inc. 18% GST)</span></p>
            <p style="margin: 0;"><strong>Billing Cycle:</strong> ${billingCycleLabel}</p>
          </div>
          <p style="margin-bottom: 8px; font-weight: bold; color: #0f172a;">Key Features:</p>
          ${featuresHtml}
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#7c3aed"
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12">
      <main className="w-full">
        <div className="vendor-shell">
          <div className="vendor-surface-card mx-auto max-w-2xl p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-700 ring-1 ring-violet-200">
              <CreditCard className="h-10 w-10" />
            </span>
            <p className="vendor-step-pill mt-8">Payment Pending</p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-3">
                {appliedReferral ? (
                  <>
                    <span className="text-3xl font-bold text-slate-400 line-through">
                      {currency} {finalOriginalPrice}
                    </span>
                    <span className={`text-5xl font-extrabold ${selectedMethod === "upi_autopay" ? "text-violet-600" : "text-red-600"}`}>
                      {currency} {selectedMethod === "upi_autopay" ? Math.round(finalPrice / getBillingCycleMonths(billingCycle)) : finalPrice}
                    </span>
                  </>
                ) : (
                  <span className={`text-5xl font-extrabold ${selectedMethod === "upi_autopay" ? "text-violet-600" : "text-red-600"}`}>
                    {currency} {selectedMethod === "upi_autopay" ? Math.round(finalPrice / getBillingCycleMonths(billingCycle)) : finalPrice}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {selectedMethod === "upi_autopay" ? `/mo` : `${displayedPrice} (${billingCycleLabel})`} {isAddressFilled ? "(Inc. 18% GST)" : "(Excl. GST)"}
              </p>
            </div>

            <h1 className="vendor-display mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {selectedMethod === "upi_autopay" ? "Set Up UPI Autopay" : "Complete Your Subscription"}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
              {selectedMethod === "upi_autopay" ? (
                <>Authorise a monthly recurring payment for <strong className="text-violet-700">{selectedPlanName}</strong> plan via UPI. Your subscription renews automatically each month.</>
              ) : (
                <>Your registration has been successfully verified! Please complete your payment for the <strong onClick={showPlanDetails} className="text-red-600 underline cursor-pointer hover:text-red-700 underline-offset-4 decoration-dashed decoration-red-600/50 transition-colors" title="View Plan Details">{selectedPlanName}</strong> plan ({billingCycleLabel}) to activate your dashboard.</>
              )}
            </p>
            <div className="mx-auto mt-5 max-w-xl rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900">
              <span className="font-semibold">Activating account for:</span>{" "}
              <span className="font-bold">{effectiveVendorEmail || "Email not available"}</span>
            </div>

            <div className="mt-8 text-left border border-slate-200 bg-slate-50/50 p-6 rounded-xl shadow-sm mb-8">
              <p className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs">i</span>
                For tax calculation, please enter your address details
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">ADDRESS LINE 1 <span className="text-red-500">*</span></label>
                  <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700 transition-all shadow-sm" placeholder="Flat, House no., Building" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">ADDRESS LINE 2</label>
                  <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700 transition-all shadow-sm" placeholder="Area, Street, Sector, Village" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">CITY <span className="text-red-500">*</span></label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700 transition-all shadow-sm" placeholder="Town/City" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">STATE <span className="text-red-500">*</span></label>
                  <select value={state} onChange={e => setState(e.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700 transition-all shadow-sm bg-white">
                    <option value="" disabled>Select State</option>
                    {[...INDIAN_STATES].sort().map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">COUNTRY <span className="text-red-500">*</span></label>
                  <input type="text" value={country} disabled className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm bg-slate-50 text-slate-500 shadow-sm" placeholder="Country" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-slate-500">PINCODE <span className="text-red-500">*</span></label>
                  <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-700 transition-all shadow-sm" placeholder="6-digit Pincode" />
                </div>
              </div>
            </div>

            {!appliedReferral && (
              <div className="mx-auto max-w-md">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Have a referral code?"
                    value={referralCodeInput}
                    onChange={(e) =>
                      setReferralCodeInput(e.target.value.toUpperCase())
                    }
                    className="flex-1 rounded-md border border-slate-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyReferral}
                    disabled={isApplyingReferral}
                    className="inline-flex h-[46px] items-center justify-center rounded-md bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
                  >
                    {isApplyingReferral ? "Applying..." : "Apply"}
                  </button>
                </div>
                {referralError && (
                  <p className="mt-2 text-sm text-red-500 text-left">
                    {referralError}
                  </p>
                )}
              </div>
            )}

            {appliedReferral && (
              <div className="mx-auto mt-6 max-w-md rounded-md bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 font-semibold flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">🎉 Referral Code Applied: <strong>{appliedReferral}</strong></span>
                <button
                  type="button"
                  onClick={handleRemoveReferral}
                  className="text-emerald-700 hover:text-emerald-900 hover:underline font-bold text-xs"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isSubmitting}
                className="inline-flex min-h-14 w-full sm:w-auto items-center justify-center gap-2 border border-violet-700 bg-violet-700 px-10 text-base font-semibold text-white transition hover:bg-violet-800 disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : selectedMethod === "upi_autopay" ? "Enable UPI Autopay" : "Pay Now"}
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-sm font-medium text-slate-500">Cancel at any time. No hidden fees.</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Image
                src="/sellerslogin-logo.svg"
                alt="SellersLogin"
                width={20}
                height={20}
              />
              <span>Secured by Razorpay</span>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200/60">
              <button onClick={handleBypass} disabled={isSubmitting} className="text-sm font-semibold text-slate-400 hover:text-slate-600 underline underline-offset-4 transition-colors">
                Go to dashboard (Continue with Free Plan)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
