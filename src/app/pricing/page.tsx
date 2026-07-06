import type { Metadata } from "next";
import Link from "next/link";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { ScrollRevealInit } from "@/components/landing/ScrollRevealInit";
import { CountdownBanner } from "@/components/landing/CountdownBanner";
import { DiscountPopup } from "@/components/landing/DiscountPopup";
import { FooterSection } from "@/components/landing/FooterSection";
import { GlobalBackground } from "@/components/landing/GlobalBackground";
import { PricingPageContent } from "@/components/landing/PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing | Sellers Login",
  description:
    "Compare Sellers Login Startup, Growth, and Enterprise pricing with storefront, courier, product, marketing, email, voice, WhatsApp, payment, shipping, support, and integration features.",
};

export default function PricingPage() {
  return (
    <>
      <CustomCursor />
      <GlobalBackground />
      <ScrollRevealInit />
      <CountdownBanner />
      <DiscountPopup />

      <main className="relative overflow-clip bg-white text-slate-950">
        <section className="relative px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20">
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.18),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="reveal reveal-delay-1 max-w-4xl text-[clamp(42px,7vw,82px)] font-bold leading-[0.95] tracking-tight text-slate-950">
                Choose the plan that makes your store grow faster.
              </h1>
              <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-8 text-slate-600 mx-auto">
                Compare Startup, Growth, and Enterprise in one clear view. Every tier is arranged around the features sellers ask about first: stores, users, courier pricing, products, marketing, payments, support, hosting, and integrations.
              </p>
              
              <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                  <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>Powered by Official WhatsApp Business API</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                  <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.956 10.984c-1.385-2.22-3.805-3.666-6.618-3.666-2.525 0-4.704 1.15-6.052 2.89C8.948 8.468 6.786 7.318 4.281 7.318c-3.138 0-5.438 1.942-5.438 4.666 0 2.741 2.3 4.683 5.438 4.683 2.505 0 4.667-1.15 6.005-2.89 1.348 1.74 3.527 2.89 6.052 2.89 3.139 0 5.439-1.942 5.439-4.683 0-1.137-.417-2.18-1.159-2.99Zm-18.675 3.666c-2.036 0-3.328-1.196-3.328-2.666s1.292-2.666 3.328-2.666c1.613 0 3.037.892 3.86 2.215-.658 1.05-1.042 2.23-1.042 3.487a6.29 6.29 0 0 0 .151 1.365c-.718.547-1.785.931-2.969.931Zm12.057.017c-1.848 0-3.447-1.135-4.14-2.732a6.38 6.38 0 0 1-.225-1.685c0-2.316 1.62-4.257 3.843-4.593.17-.025.344-.038.522-.038 2.037 0 3.329 1.196 3.329 2.666s-1.292 2.666-3.329 2.666Z"/>
                  </svg>
                  <span>Meta Business Partners</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#02042B"/>
                    <path d="M12.24 6l4.23 6.94c.3.5.03 1.15-.55 1.16-1.02.02-2.22.13-3.41.32L7.33 15.3c-.1.01-.19-.03-.24-.1l-4.54-6.57c-.26-.38.01-.93.48-.95 1.6-.06 3.3.17 4.6.48z" fill="#3395FF"/>
                    <path d="M11.57 17.34l4.82-1.2c.38-.09.64.36.41.67L12.75 22.8c-.26.35-.8.3-.98-.07l-2.61-4.88c-.14-.25.06-.55.35-.53z" fill="#3395FF"/>
                  </svg>
                  <span>Razorpay Payment Support</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Google Merchant Center</span>
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-4 mt-12 relative overflow-hidden rounded-[2rem] p-8 sm:p-12 text-center shadow-2xl bg-violet-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Need help choosing the right plan?
                </h2>
                <p className="text-violet-100 mb-8 max-w-2xl mx-auto text-lg">
                  If you need any help mapping your catalog size, setup path, or feature stack, feel free to reach out to our team.
                </p>
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.NEXT_PUBLIC_SALES_EMAIL || ""}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-violet-900 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-violet-50 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-violet-600 shrink-0"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  Contact Us via Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PricingPageContent />

      </main>

      <FooterSection />
    </>
  );
}
