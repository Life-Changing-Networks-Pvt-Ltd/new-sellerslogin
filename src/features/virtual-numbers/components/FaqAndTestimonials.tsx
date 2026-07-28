import React, { useState } from 'react';
import { FAQS, TESTIMONIALS } from '../data/faqsAndSeo';
import { ChevronDown, ChevronUp, Star, Quote, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqAndTestimonials: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50/50 text-gray-900 py-16 lg:py-24 border-t border-purple-100 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: TESTIMONIALS */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              Trusted By Indian Sellers
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Why Amazon, Flipkart & E-Commerce Sellers Choose SellersLogin
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              Real reviews from business owners protecting their personal numbers and improving order delivery proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-purple-100 rounded-3xl p-6 space-y-4 relative flex flex-col justify-between hover:border-purple-300 transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-purple-600">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-purple-600 text-purple-600" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                      {t.sellerCategory}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed italic font-medium">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">{t.name}</h4>
                    <p className="text-[11px] text-gray-500">{t.company}</p>
                  </div>
                  <span className="text-[10px] text-purple-700 font-mono font-bold">{t.virtualNumberUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: FAQS */}
        <div id="faqs-section" className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions About Indian Virtual Numbers
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              Everything you need to know about Call Masking, Call Recording, and TRAI KYC.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-purple-100 rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:bg-purple-50/50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-purple-100 bg-purple-50/30">
                      {faq.answer}
                      <div className="mt-3 text-[11px] text-purple-800 font-mono font-bold">Category: {faq.category}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};


