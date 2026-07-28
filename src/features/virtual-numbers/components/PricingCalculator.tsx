import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/faqsAndSeo';
import { CheckCircle2, ShieldCheck, Mic, Sparkles, ArrowRight } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-16 lg:py-24 bg-white text-gray-900 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Simple Pricing for Indian Virtual Numbers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Instant booking starting at <strong>â‚¹499 + GST</strong>. Includes <strong>100 Free Minutes</strong>, then <strong>â‚¹0.60/min</strong>. Includes Call Masking & Call Recording.
          </p>

          {/* Monthly vs Yearly Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly Billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-purple-100 border border-purple-300 rounded-full p-1 relative transition-colors cursor-pointer"
            >
              <div
                className={`w-4 h-4 bg-purple-600 rounded-full transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1 ${isAnnual ? 'text-purple-800' : 'text-gray-500'}`}>
              Annual Billing <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.yearlyDiscountPrice : plan.pricePerMonth;
            return (
              <div
                key={plan.id}
                className={`bg-white border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all hover:-translate-y-1 shadow-xs hover:shadow-md ${
                  plan.popular
                    ? 'border-purple-400 ring-2 ring-purple-100 shadow-md'
                    : 'border-purple-100 hover:border-purple-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    â˜… Most Popular For Sellers
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{plan.tagline}</p>
                  </div>

                  <div className="border-y border-purple-100 py-4 bg-purple-50/50 -mx-6 sm:-mx-8 px-6 sm:px-8">
                    <div className="text-3xl font-black font-mono text-gray-900">
                      â‚¹{price} <span className="text-xs font-bold text-gray-500">+ GST / month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-[11px] text-purple-800 font-bold mt-0.5">Billed annually (Save â‚¹{(plan.pricePerMonth - plan.yearlyDiscountPrice) * 12}/yr)</div>
                    )}
                  </div>

                  <ul className="space-y-3 text-xs text-gray-700 font-medium">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-purple-100">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20'
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                    }`}
                  >
                    <span>Instant Book {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Requirement / Enterprise Box */}
        <div className="bg-purple-50/80 border border-purple-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 text-xs font-extrabold px-3.5 py-1 rounded-full border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Custom Requirement / Enterprise Solutions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              Need 10+ Virtual Numbers, Custom IVR or Call Center Integration?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl">
              Have unique business needs, large tele-caller teams, specialized call routing, or API integrations? We provide tailor-made virtual number packages with dedicated account support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onSelectPlan('enterprise')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Custom Requirement Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


