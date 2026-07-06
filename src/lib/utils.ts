import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NEXT_PUBLIC_ADMIN_APP_URL } from "@/config/variables";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeBase64 = (value: string) => {
  if (typeof window === "undefined") return "";
  try {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  } catch {
    return "";
  }
};

export const resolveAdminLoginUrl = () => {
  const fallback = "/sign-in?redirect=%2F";
  const configuredAdminUrl = String(NEXT_PUBLIC_ADMIN_APP_URL || "").trim();
  const raw = (configuredAdminUrl || fallback).trim();

  try {
    return new URL(raw);
  } catch {
    const sanitized = raw.replace(/^\/+/, "");
    const looksLikeHostPath =
      sanitized.includes("localhost:") || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(sanitized);
    if (looksLikeHostPath) {
      try {
        return new URL(`http://${sanitized}`);
      } catch {
        // Ignore and continue.
      }
    }

    if (typeof window !== "undefined") {
      try {
        return new URL(raw, window.location.origin);
      } catch {
        // Ignore and use fallback.
      }
    }

    try {
      return new URL(fallback);
    } catch {
      return null;
    }
  }
};

export const buildAdminAutoLoginUrl = ({
  token,
  vendor,
}: {
  token: string;
  vendor: Record<string, unknown> | null;
}) => {
  const adminLoginUrl = NEXT_PUBLIC_ADMIN_APP_URL || "/sign-in?redirect=%2F";
  const url = resolveAdminLoginUrl();
  if (!url) return adminLoginUrl;

  try {
    if (url.pathname === "/") {
      url.pathname = "/sign-in";
    }

    const safeVendor = vendor && typeof vendor === "object" ? vendor : {};
    const normalizedRole = String((safeVendor as { role?: string }).role || "vendor")
      .trim()
      .toLowerCase();
    const userPayload = {
      ...safeVendor,
      role: normalizedRole || "vendor",
    };
    const encodedUser = encodeBase64(JSON.stringify(userPayload));

    url.searchParams.set("redirect", "/");
    url.searchParams.set("autologin", "1");
    url.searchParams.set("authtoken", token);
    if (encodedUser) {
      url.searchParams.set("authuser", encodedUser);
    }
    return url.toString();
  } catch {
    return adminLoginUrl;
  }
};
