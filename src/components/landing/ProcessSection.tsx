"use client";

import Image from "next/image";
import { LandingIcon } from "@/components/icons/LandingIcon";
import { ScrollProgressTabs, TabItem } from "@/components/ui/scroll-progress-tabs";

export function ProcessSection() {
  const tabs: TabItem[] = [
    {
      id: "step-1",
      title: "Create Account",
      content: (
        <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-purple-100 rounded-3xl p-4 md:p-6 shadow-xl border border-purple-300">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/15 flex items-center justify-center shadow-sm border border-purple-400/30">
              <LandingIcon name="user" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Create Account</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Sign up free in 30 seconds. No credit card required. Choose your plan later when you&apos;re ready to scale.
            </p>
          </div>
          <div className="flex-1 w-full relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-purple-300 bg-purple-200">
             <Image quality={60} src="/images/create_account.png" alt="Sellers Login create account" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-2" />
          </div>
        </div>
      ),
    },
    {
      id: "step-2",
      title: "Build Your Store",
      content: (
        <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-purple-100 rounded-3xl p-4 md:p-6 shadow-xl border border-purple-300">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/15 flex items-center justify-center shadow-sm border border-purple-400/30">
              <LandingIcon name="layout" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Build Your Store</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Use AI or our drag-and-drop editor to design your perfect storefront in minutes. Zero coding required.
            </p>
          </div>
          <div className="flex-1 w-full relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-purple-300 bg-purple-200">
             <Image quality={60} src="/images/build_store.jpg" alt="Sellers Login build store" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-2" />
          </div>
        </div>
      ),
    },
    {
      id: "step-3",
      title: "Add Products",
      content: (
        <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-purple-100 rounded-3xl p-4 md:p-6 shadow-xl border border-purple-300">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/15 flex items-center justify-center shadow-sm border border-purple-400/30">
              <LandingIcon name="package" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Add Products</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Import from CSV, add manually, or sync with your existing inventory systems instantly.
            </p>
          </div>
          <div className="flex-1 w-full relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-purple-300 bg-purple-200">
             <Image quality={60} src="/images/add_products.png" alt="Sellers Login add products" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-2" />
          </div>
        </div>
      ),
    },
    {
      id: "step-4",
      title: "Start Selling",
      content: (
        <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-purple-100 rounded-3xl p-4 md:p-6 shadow-xl border border-purple-300">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/15 flex items-center justify-center shadow-sm border border-purple-400/30">
              <LandingIcon name="rocket" size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Start Selling</h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Go live and start accepting orders from day one. We handle hosting, security, and global delivery.
            </p>
          </div>
          <div className="flex-1 w-full relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-purple-300 bg-purple-200">
             <Image quality={60} src="/images/start_selling.jpg" alt="Sellers Login start selling" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-2" />
          </div>
        </div>
      ),
    }
  ];

  return (
    <section id="process" className="bg-purple-200 pt-20">
      <div className="text-center mb-12 px-4">
         <div className="inline-flex items-center bg-purple-100 border border-purple-300 rounded-full py-1.5 px-4 text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 shadow-sm">
          How It Works
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
          From Zero to Selling in 4 Steps
        </h2>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          No technical skills needed. Our guided setup gets your store live and ready to sell in minutes.
        </p>
      </div>
      <ScrollProgressTabs tabs={tabs} />
    </section>
  );
}
