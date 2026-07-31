"use client";

import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export function AutomationSection() {
  const content = [
    {
      title: "AI Voice Automation",
      description:
        "Revolutionize your customer support with our AI-powered voice assistants. Handle customer inquiries, order confirmations, and support tickets 24/7 without human intervention, providing instant and accurate responses in multiple languages.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2">
          <Image quality={60}
            src="/images/dashboard/d3.png"
            width={500}
            height={500}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login AI voice automation"
          />
        </div>
      ),
    },
    {
      title: "Email Marketing Automation",
      description:
        "Automatically trigger personalized email campaigns based on customer behavior. Recover abandoned carts, send welcome sequences, and push promotional offers at the perfect time to maximize your conversion rates.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2">
          <Image quality={60}
            src="/images/dashboard/d4.png"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, 500px"
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login email marketing automation"
          />
        </div>
      ),
    },
    {
      title: "WhatsApp Marketing",
      description:
        "Reach your customers directly on their favorite messaging app. Send instant updates, order tracking links, and targeted promotions via WhatsApp. Our automation ensures high open rates and immediate engagement.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2">
          <Image quality={60}
            src="/images/dashboard/d5.png"
            width={500}
            height={500}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login WhatsApp marketing"
          />
        </div>
      ),
    },
    {
      title: "B2B & B2C Dashboard Analytics",
      description:
        "Manage your entire business from a unified command center. Real-time analytics, inventory tracking, and sales forecasting powered by AI give you the actionable insights needed to scale globally.",
      content: (
        <div className="h-full w-full flex items-center justify-center bg-purple-200 p-2">
          <Image quality={60}
            src="/images/dashboard/d6.png"
            width={500}
            height={500}
            className="h-full w-full object-contain rounded-xl border border-purple-300"
            alt="Sellers Login dashboard analytics"
          />
        </div>
      ),
    },
  ];

  return (
    <section id="automation" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full py-1.5 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 shadow-sm">
            Scale Effortlessly
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            From selling to automations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Once your store is live, our powerful automation suite takes over. We handle the repetitive tasks so you can focus entirely on growing your brand.
          </p>
        </header>

        <div className="w-full">
          {/* Note: imagePosition="right" flips the layout */}
          <StickyScroll
            content={content}
            imagePosition="right"
            contentClassName="!h-[280px] !w-[630px]"
          />
        </div>
      </div>
    </section>
  );
}
