import React, { useState } from 'react';
import { Calculator, X, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface FloatingCalculatorProps {
  onOpenLeadModal: () => void;
}

export const FloatingCalculator: React.FC<FloatingCalculatorProps> = ({ onOpenLeadModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('quarterly');
  const [marketingMsgs, setMarketingMsgs] = useState<number>(5000);
  const [utilityMsgs, setUtilityMsgs] = useState<number>(10000);

  const DASHBOARD_RATE = billingCycle === 'monthly' ? 799 : 666; // 1999/3 = 666.33
  const DASHBOARD_TOTAL_PLAN = billingCycle === 'monthly' ? 799 : 1999;
  const MARKETING_RATE = 0.99;
  const UTILITY_RATE = 0.16;

  const marketingCost = marketingMsgs * MARKETING_RATE;
  const utilityCost = utilityMsgs * UTILITY_RATE;
  const totalMessageSpend = marketingCost + utilityCost;
  const totalMonthlyCost = DASHBOARD_RATE + totalMessageSpend;

  return (
    <>
      {/* Floating Right Side Sticky Calculator Button */}
      <div className="fixed right-4 bottom-6 z-40 flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-emerald-400 flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Open WhatsApp Cost Calculator"
        >
          <div className="relative">
            <Calculator className="w-6 h-6 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full ring-2 ring-emerald-600"></span>
          </div>
          <span className="hidden sm:inline-block font-extrabold text-xs tracking-wide">
            Cost Calculator
          </span>
        </button>
      </div>

      {/* Floating Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border-2 border-emerald-200 shadow-2xl relative overflow-hidden text-slate-900 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 text-left pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase">
                <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp Cost Calculator</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                Calculate Monthly Cost
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Pay As You Use model â€” zero mandatory wallet recharge.
              </p>
            </div>

            {/* Billing Cycle Selector */}
            <div className="mt-4 p-1.5 bg-slate-100 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  billingCycle === 'quarterly'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Quarterly (â‚¹1,999/qtr) âœ¨ Save 17%
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Monthly (â‚¹799/mo)
              </button>
            </div>

            {/* Calculator Sliders */}
            <div className="mt-5 space-y-4">
              
              {/* Marketing Slider */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900">Marketing Msgs (@ â‚¹0.99/msg)</span>
                  <span className="font-black text-emerald-800">{marketingMsgs.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={marketingMsgs}
                  onChange={(e) => setMarketingMsgs(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                  <span>0</span>
                  <span>Spend: â‚¹{marketingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  <span>50k</span>
                </div>
              </div>

              {/* Utility Slider */}
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-900">Utility / OTP Msgs (@ â‚¹0.16/msg)</span>
                  <span className="font-black text-emerald-800">{utilityMsgs.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={utilityMsgs}
                  onChange={(e) => setUtilityMsgs(Number(e.target.value))}
                  className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                  <span>0</span>
                  <span>Spend: â‚¹{utilityCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  <span>100k</span>
                </div>
              </div>

            </div>

            {/* Total Summary Box */}
            <div className="mt-5 p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-bold">Estimated Monthly Spend:</span>
                <span className="text-2xl font-extrabold text-emerald-400">
                  â‚¹{Math.round(totalMonthlyCost).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-slate-300 font-medium">
                <div className="flex justify-between">
                  <span>Dashboard Plan:</span>
                  <span className="text-white font-bold">
                    {billingCycle === 'quarterly' ? 'â‚¹1,999 / 3 months' : 'â‚¹799 / month'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pay As You Use Messages:</span>
                  <span className="text-white font-bold">â‚¹{Math.round(totalMessageSpend).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Free Business Store Add-on:</span>
                  <span>â‚¹0 Included</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenLeadModal();
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};


