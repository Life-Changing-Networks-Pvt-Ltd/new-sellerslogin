import type { Metadata } from "next";
import { Suspense } from "react";
import { WebsiteAnalyticsTracker } from "@/components/analytics/WebsiteAnalyticsTracker";
import "./globals.css";

import { ClientProvider } from "@/components/ClientProvider";
import { SITE_URL } from "@/lib/seo";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: "Sellers Login | Your Business Growth Partner | E-commerce Making Platform",
  description:
    "Sellers Login is the all-in-one e-commerce platform that helps businesses create, manage, and scale their online stores with professional websites, automation, marketing tools, and inventory management.",
  openGraph: {
    title: "Sellers Login | Your Business Growth Partner | E-commerce Making Platform",
    description:
      "The all-in-one e-commerce platform for ambitious businesses. A professional store, advanced dashboard, and inbuilt global payments in one place.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "XG1__8RDXJOQgYPW6k4uOtK11cCaPaxPUNJcSgs36go",
  },
  other: {
    "facebook-domain-verification": "7i0cyqq95aam0ac12gsywt3niirx2z",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full antialiased font-sans">
        <ClientProvider>
          <Suspense fallback={null}>
            <WebsiteAnalyticsTracker />
          </Suspense>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
