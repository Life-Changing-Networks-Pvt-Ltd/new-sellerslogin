import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const configuredApiUrl = (
  process.env.NEXT_PUBLIC_CIS_PAYMENT_API_URL || NEXT_PUBLIC_API_URL || "http://localhost:8081"
).trim().replace(/\/+$/, "");
const apiBaseUrl = configuredApiUrl.endsWith("/api/v1")
  ? configuredApiUrl
  : configuredApiUrl.endsWith("/api")
    ? `${configuredApiUrl}/v1`
    : `${configuredApiUrl}/api/v1`;

export type MarketForm = "buyers" | "sellers";
export type PaymentCredentials = Pick<MarketPaymentDetails, "applicationId" | "accessToken">;

export type MarketPaymentDetails = {
  applicationId: string;
  accessToken: string;
  checkoutKey: string;
  orderId: string;
  amount: number;
  currency: "USD" | "INR";
  feeUsd: number;
  baseFeeUsd: number;
  baseFeeAmount: number;
  gstPercent: number;
  gstUsd: number;
  gstAmount: number;
  exchangeRate: number;
  amountDue: number;
  couponCode: string;
  name: string;
  email: string;
  contact: string;
};

async function requestPayment<T>(
  form: MarketForm,
  payment: PaymentCredentials,
  action: "refresh" | "help" | "coupon" | "verify",
  body?: Record<string, string>,
) {
  const response = await fetch(
    `${apiBaseUrl}/market/${form}/${encodeURIComponent(payment.applicationId)}/payment/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-market-payment-token": payment.accessToken,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  const result = await response.json().catch(() => null) as {
    success?: boolean;
    message?: string;
    data?: T;
  } | null;
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Something went wrong. Please try again.");
  }
  return result;
}

export const refreshMarketPayment = (form: MarketForm, payment: PaymentCredentials) =>
  requestPayment<MarketPaymentDetails>(form, payment, "refresh");

export const applyMarketPaymentCoupon = (form: MarketForm, payment: PaymentCredentials, couponCode: string) =>
  requestPayment<MarketPaymentDetails>(form, payment, "coupon", { couponCode });

export const requestMarketPaymentHelp = (form: MarketForm, payment: PaymentCredentials) =>
  requestPayment(form, payment, "help");

export const verifyMarketPayment = (
  form: MarketForm,
  payment: PaymentCredentials,
  razorpayPaymentId: string,
  razorpaySignature: string,
) => requestPayment(form, payment, "verify", { razorpayPaymentId, razorpaySignature });
