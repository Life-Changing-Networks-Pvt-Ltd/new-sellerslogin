import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Zap, HelpCircle } from 'lucide-react';

interface PricingCalculatorProps {
  onOpenLeadModal: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenLeadModal }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly'>('quarterly');
  const [marketingMsgs, setMarketingMsgs] = useState<number>(5000);
  const [utilityMsgs, setUtilityMsgs] = useState<number>(10000);

  const DASHBOARD_MONTHLY_RATE = selectedPlan === 'monthly' ? 799 : 666; // 1999/3 = 666
  const DASHBOARD_PLAN_PRICE = selectedPlan === 'monthly' ? 799 : 1999;
  const MARKETING_RATE = 0.99;
  const UTILITY_RATE = 0.16;

  const marketingCost = marketingMsgs * MARKETING_RATE;
  const utilityCost = utilityMsgs * UTILITY_RATE;
  const estimatedMessageSpend = marketingCost + utilityCost;
  const totalMonthlyCost = DASHBOARD_MONTHLY_RATE + estimatedMessageSpend;

  return (
    <section id="calculator" className="py-20 bg-white border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Transparent Pricing & Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Honest Pricing
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Choose a plan that fits your business. Enjoy full access with our <strong>Pay As You Use</strong> messaging model â€” no mandatory wallet recharge!
          </p>
        </div>

        {/* Pricing Plans Cards Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Plan 1: Monthly Plan */}
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white ${
              selectedPlan === 'monthly'
                ? 'border-emerald-600 shadow-xl shadow-emerald-100/80 ring-2 ring-emerald-600/20'
                : 'border-slate-200 hover:border-emerald-300 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Monthly Plan
                </span>
                {selectedPlan === 'monthly' && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">âœ“</span>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">â‚¹799</span>
                  <span className="text-sm font-bold text-slate-500">/ month</span>
                </div>
                <p className="text-xs font-medium text-slate-600 mt-2">
                  Billed monthly. Standard access for growing retail shops & businesses.
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-xs font-bold text-slate-700 border-t border-slate-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official WhatsApp Business API Dashboard</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pay As You Use Message Rates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Sellerslogin Business Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited Support Team Inbox</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp Blue Tick Guidance</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan('monthly');
                onOpenLeadModal();
              }}
              className={`mt-8 w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedPlan === 'monthly'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-200'
              }`}
            >
              <span>Select Monthly Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 2: Quarterly Plan (Highlighted) */}
          <div 
            onClick={() => setSelectedPlan('quarterly')}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-gradient-to-b from-white to-emerald-50/40 ${
              selectedPlan === 'quarterly'
                ? 'border-emerald-600 shadow-2xl shadow-emerald-200 ring-2 ring-emerald-600/30'
                : 'border-emerald-300 hover:border-emerald-500 shadow-lg'
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>Best Value â€¢ Save 17%</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                  Quarterly Plan
                </span>
                {selectedPlan === 'quarterly' && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">âœ“</span>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">â‚¹1,999</span>
                  <span className="text-sm font-bold text-slate-500">/ 3 months</span>
                </div>
                <p className="text-xs font-semibold text-emerald-800 mt-2">
                  Equivalent to just <strong>~â‚¹666 / month</strong>!
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-xs font-bold text-slate-800 border-t border-emerald-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Everything in Monthly Plan</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>17% Discount</strong> on Dashboard Fee</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pay As You Use Message Rates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Priority Meta Blue Tick Onboarding</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free E-Commerce Store Customization</span>
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan('quarterly');
                onOpenLeadModal();
              }}
              className="mt-8 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Quarterly Plan @ â‚¹1,999</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

        </div>

        {/* Interactive Cost Calculator Box */}
        <div className="mt-16 bg-slate-900 text-white rounded-[2.5rem] p-6 lg:p-10 border-2 border-slate-800 shadow-2xl max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
              Pay As You Use Calculator
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Estimate Your Total Monthly Expense
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Pay strictly for the messages you send. Official Meta conversation rates with zero markup!
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Marketing Slider */}
              <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-extrabold text-slate-200">Marketing Messages</span>
                  <span className="font-black text-emerald-400 text-base">{marketingMsgs.toLocaleString()} msgs</span>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="500"
                  value={marketingMsgs} 
                  onChange={(e) => setMarketingMsgs(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>Rate: â‚¹0.99 / msg</span>
                  <span>Spend: <strong className="text-white">â‚¹{marketingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong></span>
                </div>
              </div>

              {/* Utility Slider */}
              <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-extrabold text-slate-200">Utility & Order OTP Messages</span>
                  <span className="font-black text-teal-400 text-base">{utilityMsgs.toLocaleString()} msgs</span>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="1000"
                  value={utilityMsgs} 
                  onChange={(e) => setUtilityMsgs(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>Rate: â‚¹0.16 / msg</span>
                  <span>Spend: <strong className="text-white">â‚¹{utilityCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong></span>
                </div>
              </div>

            </div>

            {/* Total Display Card */}
            <div className="lg:col-span-5 bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-5">
              <div className="border-b border-slate-700 pb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Estimated Spend
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  â‚¹{Math.round(totalMonthlyCost).toLocaleString('en-IN')}
                  <span className="text-xs font-semibold text-slate-400"> / month</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-300">
                <div className="flex justify-between">
                  <span>Selected Dashboard Plan:</span>
                  <strong className="text-white">
                    {selectedPlan === 'quarterly' ? 'â‚¹1,999 / 3 mos' : 'â‚¹799 / mo'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Pay As You Use Messages:</span>
                  <strong className="text-white">â‚¹{Math.round(estimatedMessageSpend).toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-emerald-400 font-extrabold pt-1">
                  <span>Free Business Store:</span>
                  <span>â‚¹0 (Included)</span>
                </div>
              </div>

              <button
                onClick={onOpenLeadModal}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>Get Started Free Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


