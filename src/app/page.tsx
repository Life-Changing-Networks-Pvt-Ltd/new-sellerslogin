import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sellers Login | Your Business Growth Partner | E-commerce Making Platform",
  description:
    "Sellers Login is the all-in-one e-commerce platform that helps businesses create, manage, and scale their online stores with professional websites, automation, marketing tools, and inventory management.",
  path: "/",
});

const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "SellersLogin",
  alternateName: ["Sellers Login", "SellersLogin.com"],
  url: "https://www.sellerslogin.com/",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage />
    </>
  );
}
