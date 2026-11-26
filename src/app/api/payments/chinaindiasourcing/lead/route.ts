import { createHmac, timingSafeEqual } from "node:crypto";
import type { LeadOrder } from "@/app/payments/chinaindiasourcing/lead-checkout";

const responseHeaders = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  try {
    const secret = process.env.CIS_LEAD_CHECKOUT_SECRET;
    const { lead } = await request.json();
    if (!secret || typeof lead !== "string" || lead.length > 4096) throw new Error();
    const [payload, signature, extra] = lead.split(".");
    if (!payload || !signature || extra !== undefined) throw new Error();
    const expected = createHmac("sha256", secret).update(payload).digest();
    const supplied = Buffer.from(signature, "base64url");
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) throw new Error();
    const { expiresAt, ...order } = JSON.parse(Buffer.from(payload, "base64url").toString()) as LeadOrder & {
      expiresAt: number;
    };
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) throw new Error();
    const dashboard = new URL(process.env.NEXT_PUBLIC_CIS_DASHBOARD_URL || "http://localhost:3002");
    const returnUrl = new URL(order.returnUrl);
    if (returnUrl.origin !== dashboard.origin || returnUrl.pathname !== "/explore-buyers") throw new Error();
    return Response.json(order, { headers: responseHeaders });
  } catch {
    return Response.json({ error: "Invalid or expired lead checkout" }, { status: 400, headers: responseHeaders });
  }
}
