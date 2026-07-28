import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/featuresData';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenLeadModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenLeadModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-emerald-50/50 border-t border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-700 text-base font-semibold">
            Everything you need to know about Sellers Login WhatsApp Business API, flexible plans & Pay As You Use model.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border-2 border-emerald-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-black text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-50/50 transition-colors"
                >
                  <span className="text-base sm:text-lg">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-700 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-slate-700 text-sm font-semibold leading-relaxed border-t border-emerald-100 bg-emerald-50/30">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-10 p-6 bg-white rounded-2xl border-2 border-emerald-200 text-center space-y-3 shadow-xs">
          <h3 className="text-lg font-black text-slate-900">Have a specific question about onboarding?</h3>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold">
            Our WhatsApp API onboarding specialists are available 24/7 to guide you step-by-step.
          </p>
          <button
            onClick={onOpenLeadModal}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            <span>Chat with WhatsApp Specialist</span>
          </button>
        </div>

      </div>
    </section>
  );
};


