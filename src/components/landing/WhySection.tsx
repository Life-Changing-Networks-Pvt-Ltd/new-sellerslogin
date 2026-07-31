"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Setup in Under 5 Minutes",
    description: "Our AI onboarding creates your entire store — products, pages, and payment gateway — before you finish your coffee.",
    content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/setup_5_minutes.png"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login setup"
          />
      </div>
    ),
  },
  {
    title: "3.8% Higher Conversion",
    description: "Optimized checkout flows built from analyzing multiple transactions.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/higher_conversion.png"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login higher conversion"
          />
      </div>
    ),
  },
  {
    title: "97 Google PageSpeed",
    description: "Blazing fast stores rank higher and convert better.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/pagespeed.png"
            width={800}
            height={800}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login page speed"
          />
      </div>
    ),
  },
  {
    title: "Mobile First",
    description: "Every Sellers Login store is pixel-perfect on every screen.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/mobile_first.jpg"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login mobile first"
          />
      </div>
    ),
  },
  {
    title: "Secure Payments",
    description: "PCI DSS Level 1 certified. SSL, fraud detection, and chargeback protection built-in.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/secure_payments.png"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login secure payments"
          />
      </div>
    ),
  },
  {
    title: "AI Automation",
    description: "From product descriptions to ad copy, email campaigns to support — AI handles the repetitive work so you can focus on growth.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/ai_automation.jpg"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login AI automation"
          />
      </div>
    ),
  },
  {
    title: "Global Scale",
    description: "Multi-currency, multi-language, 150+ countries, and CDN-powered delivery worldwide.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/global_scale.jpg"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login global scale"
          />
      </div>
    ),
  },
  {
    title: "24/7 Support",
    description: "Live chat, phone, and email support with a dedicated success manager on Growth+ plans.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2 sm:p-3">
          <Image quality={60}
            src="/images/support_24_7.png"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login 24/7 support"
          />
      </div>
    ),
  },
];

export function WhySection() {
  return (
    <section id="why" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <header className="text-center">
          <div className="reveal inline-flex items-center bg-gray-50 border border-gray-200 rounded-full py-1.5 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 shadow-sm">
            Why Sellers Login
          </div>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Built different.
            <br />
            Designed to win.
          </h2>
        </header>
      </div>

      <div className="w-full">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
