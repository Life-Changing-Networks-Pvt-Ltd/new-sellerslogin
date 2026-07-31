import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sellers Login | Your Business Growth Partner | E-commerce Making Platform",
  description:
    "Sellers Login is the all-in-one e-commerce platform that helps businesses create, manage, and scale their online stores with professional websites, automation, marketing tools, and inventory management.",
  path: "/",
});

export default function Home() {
  return <LandingPage />;
}
