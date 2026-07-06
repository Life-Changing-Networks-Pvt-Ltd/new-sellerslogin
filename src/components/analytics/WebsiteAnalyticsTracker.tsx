"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const WEBSITE_ID = "sellerslogin";
const WEBSITE_NAME = "Main Website - Sellers Login";
const STORAGE_PREFIX = "sellerslogin_analytics";

const getOrCreateId = (key: string) => {
  if (typeof window === "undefined") return "";
  const storageKey = `${STORAGE_PREFIX}_${key}`;
  const existing = window.sessionStorage.getItem(storageKey);
  if (existing) return existing;
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(storageKey, value);
  return value;
};

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  const storageKey = `${STORAGE_PREFIX}_session`;
  const existing = window.sessionStorage.getItem(storageKey);
  if (existing) return existing;
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(storageKey, value);
  return value;
};

const getApiBaseUrl = () =>
  (
    NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_PUBLIC_API_URL ||
    ""
  )
    .replace(/\/+$/, "")
    .replace(/\/v1$/, "");

const readUtmParams = (searchParams: { get: (key: string) => string | null }) => ({
  utmSource: searchParams.get("utm_source") || "",
  utmMedium: searchParams.get("utm_medium") || "",
  utmCampaign: searchParams.get("utm_campaign") || "",
  utmTerm: searchParams.get("utm_term") || "",
  utmContent: searchParams.get("utm_content") || "",
});

export function WebsiteAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPageRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fullUrl = window.location.href;
    const page = `${pathname || "/"}${window.location.search || ""}`;
    const payload = {
      visitorId: getOrCreateId("visitor"),
      sessionId: getSessionId(),
      website: WEBSITE_NAME,
      websiteId: WEBSITE_ID,
      page,
      url: fullUrl,
      referrer: document.referrer || "",
      landingPage: window.sessionStorage.getItem(`${STORAGE_PREFIX}_landing`) || page,
      previousPage: previousPageRef.current,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeOnPage: 0,
      scrollPercentage: 0,
      converted: false,
      ...readUtmParams(searchParams),
    };

    if (!window.sessionStorage.getItem(`${STORAGE_PREFIX}_landing`)) {
      window.sessionStorage.setItem(`${STORAGE_PREFIX}_landing`, page);
    }

    const body = JSON.stringify(payload);
    const endpoint = `${getApiBaseUrl()}/website/analytics`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    } else {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }

    previousPageRef.current = page;
  }, [pathname, searchParams]);

  return null;
}
