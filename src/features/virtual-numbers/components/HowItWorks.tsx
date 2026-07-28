import React from 'react';
import { Search, UserCheck, LayoutDashboard, PhoneCall, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HowItWorksProps {
  onBuyClick: () => void;
  onOpenDashboard: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBuyClick, onOpenDashboard }) => {
  const steps = [
    {
      step: '01',
      title: 'Select Virtual Number',
      description: 'Choose your preferred city landline (+91 080 Bangalore, +91 022 Mumbai, +91 011 Delhi), Mobile series, or 1800 Toll-Free.',
      icon: Search,
      color: 'bg-purple-600',
      tag: 'City / STD Code Choice',
    },
    {
      step: '02',
      title: 'Instant 2-Min KYC',
      description: 'Submit basic identity (Aadhaar or GSTIN). Verification is instant and 100% TRAI telecom compliant with zero paperwork.',
      icon: UserCheck,
      color: 'bg-indigo-600',
      tag: 'Instant Activation',
    },
    {
      step: '03',
      title: 'Access Client Dashboard',
      description: 'Log into your dedicated SellersLogin Web or Mobile Dashboard. Set forwarding lines and enable Call Masking.',
      icon: LayoutDashboard,
      color: 'bg-purple-600',
      tag: 'SellersLogin Dashboard',
    },
    {
      step: '04',
      title: 'Start Calling & Recording',
      description: 'Dial customers directly from web or mobile dialer. Personal SIM stays 100% hidden, and calls are recorded in HD MP3.',
      icon: PhoneCall,
      color: 'bg-emerald-600',
      tag: '100% Privacy Protected',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white text-gray-900 relative border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
            Simplified Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            How To Buy & Start Calling With <br />
            <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 inline-block mt-1">
              Your Indian Virtual Number
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            From number selection to your first masked call in under 5 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-purple-100 rounded-3xl p-6 relative flex flex-col justify-between hover:border-purple-300 transition-all hover:-translate-y-1 group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-md shadow-purple-500/10`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-purple-200 group-hover:text-purple-600 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-purple-100 mt-4 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <span>Status: Ready</span>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 via-purple-100/60 to-indigo-50 border border-purple-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Ready to protect your personal number?</h4>
              <p className="text-xs text-gray-600">Get 100 Free Minutes + â‚¹499 + GST plan on SellersLogin today.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto bg-white hover:bg-purple-50 text-gray-800 text-xs font-bold px-4 py-3 rounded-xl border border-purple-200 transition-colors shadow-xs cursor-pointer"
            >
              Explore Dashboard
            </button>
            <button
              onClick={onBuyClick}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              Book Virtual Number Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


