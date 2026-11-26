export type RazorpayResult = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type RazorpayConstructor = new (options: Record<string, unknown>) => {
  open: () => void;
  on: (event: string, callback: (response: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window { Razorpay?: RazorpayConstructor }
}

export async function loadRazorpay() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-razorpay-checkout]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load payment checkout.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error("Unable to load payment checkout."));
    };
    document.body.appendChild(script);
  });
}
