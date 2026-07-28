"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const WEBSITE_ID = "sellerslogin.com";
const WEBSITE_NAME = "sellerslogin.com";
const STORAGE_PREFIX = "sellerslogin_analytics";

const createUuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getVisitorId = () => {
  if (typeof window === "undefined") return "";
  const key = `${STORAGE_PREFIX}_visitor`;
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const value = createUuid();
  window.localStorage.setItem(key, value);
  return value;
};

const getSessionId = () => {
  if (typeof window === "undefined") return "";
  const key = `${STORAGE_PREFIX}_session`;
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const value = createUuid();
  window.sessionStorage.setItem(key, value);
  return value;
};

const getApiBaseUrl = () =>
  (NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PUBLIC_API_URL || "")
    .replace(/\/+$/, "")
    .replace(/\/v1$/, "");

const sendEvent = (payload: Record<string, unknown>) => {
  const endpoint = `${getApiBaseUrl()}/website/analytics`;
  if (!endpoint.startsWith("http")) return;
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
};

const readUtmParams = (searchParams: { get: (key: string) => string | null }) => ({
  utmSource: searchParams.get("utm_source") || "",
  utmMedium: searchParams.get("utm_medium") || "",
  utmCampaign: searchParams.get("utm_campaign") || "",
  utmTerm: searchParams.get("utm_term") || "",
  utmContent: searchParams.get("utm_content") || "",
});

const getScrollPercentage = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
};

export function WebsiteAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const page = `${pathname || "/"}${window.location.search || ""}`;
    const landingKey = `${STORAGE_PREFIX}_landing`;
    const previousKey = `${STORAGE_PREFIX}_previous_page`;
    const landingPage = window.sessionStorage.getItem(landingKey) || page;
    const previousPage = window.sessionStorage.getItem(previousKey) || "";
    const startedAt = Date.now();
    const viewId = createUuid();
    let maxScrollPercentage = getScrollPercentage();
    let durationSent = false;

    if (!window.sessionStorage.getItem(landingKey)) {
      window.sessionStorage.setItem(landingKey, page);
    }

    const basePayload = () => ({
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      website: WEBSITE_NAME,
      websiteId: WEBSITE_ID,
      page,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || "",
      landingPage,
      previousPage,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: { width: window.screen.width, height: window.screen.height },
      viewport: { width: window.innerWidth, height: window.innerHeight },
      metadata: { website_id: WEBSITE_ID, viewId },
      ...readUtmParams(searchParams),
    });

    sendEvent({
      ...basePayload(),
      eventType: "page_view",
      timeOnPage: 0,
      scrollPercentage: maxScrollPercentage,
      converted: false,
    });

    const handleScroll = () => {
      maxScrollPercentage = Math.max(maxScrollPercentage, getScrollPercentage());
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest(
        "a,button,input,select,textarea,[role='button'],[role='link'],[data-testid]",
      );
      if (!element) return;

      const text = String(
        element.getAttribute("aria-label") || element.textContent || "",
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);
      const href = element instanceof HTMLAnchorElement ? element.href : "";

      sendEvent({
        ...basePayload(),
        eventType: "click",
        timeOnPage: Date.now() - startedAt,
        scrollPercentage: maxScrollPercentage,
        metadata: {
          website_id: WEBSITE_ID,
          viewId,
          tagName: element.tagName.toLowerCase(),
          elementText: text,
          elementId: element.id || "",
          elementClasses: String(element.className || "").slice(0, 300),
          href,
          role: element.getAttribute("role") || "",
          testId: element.getAttribute("data-testid") || "",
          inputType:
            element instanceof HTMLInputElement ? element.type || "text" : "",
        },
      });
    };

    const sendDuration = () => {
      if (durationSent) return;
      durationSent = true;
      sendEvent({
        ...basePayload(),
        eventType: "page_duration",
        durationMs: Date.now() - startedAt,
        timeOnPage: Date.now() - startedAt,
        scrollPercentage: maxScrollPercentage,
      });
      window.sessionStorage.setItem(previousKey, page);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, true);
    window.addEventListener("pagehide", sendDuration);

    return () => {
      sendDuration();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("pagehide", sendDuration);
    };
  }, [pathname, searchParams]);

  return null;
}
