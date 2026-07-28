import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShoppingCart, 
  Send, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  Globe,
  BadgeCheck,
  ExternalLink,
  Calculator
} from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onScrollToSection }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden bg-white">
      {/* Background Soft Emerald Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Main Headline, Value Highlights */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Meta Official API & WhatsApp Verified Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-slate-900 text-xs font-extrabold shadow-2xs flex-wrap">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-900 font-extrabold">Sellers Login Official WhatsApp Business API</span>
              <span className="bg-emerald-600 text-white text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-white" />
                Meta Official
              </span>
            </div>

            {/* Main Headline with WhatsApp Emerald Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              WhatsApp Automation & API Dashboard for <span className="text-emerald-600 underline decoration-emerald-400 decoration-wavy underline-offset-4">Sellers Login</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              Supercharge your business with Drip Campaigns, Mass Broadcasts, E-Commerce Cart Recovery, WhatsApp Blue Tick, Advance Analytics, and a <strong className="text-slate-900 font-bold">Free Sellerslogin Business Website</strong> for any store!
            </p>

            {/* Rate Highlights Cards */}
            <div className="grid sm:grid-cols-3 gap-3">
              
              {/* Pay As You Use Box */}
              <div className="p-3.5 bg-gradient-to-br from-emerald-700 to-teal-800 text-white rounded-2xl shadow-md border border-emerald-600 relative overflow-hidden">
                <div className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Pricing Model</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">Pay As You Use</div>
                <div className="text-[11px] text-emerald-200 font-extrabold mt-0.5">Zero Mandatory Wallet</div>
                <p className="text-[10px] text-emerald-100 mt-1">Full Dashboard Access</p>
              </div>

              {/* Marketing Message Box */}
              <div className="p-3.5 bg-emerald-50/90 rounded-2xl border-2 border-emerald-200 text-slate-900">
                <div className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider">Marketing Messages</div>
                <div className="text-2xl font-black text-slate-900 mt-1">â‚¹0.99</div>
                <div className="text-[11px] text-slate-600 font-bold">/ message (99 paisa)</div>
                <p className="text-[10px] text-slate-600 mt-1">Broadcasts & Offers</p>
              </div>

              {/* Utility / Auth Box */}
              <div className="p-3.5 bg-teal-50/90 rounded-2xl border-2 border-teal-200 text-slate-900">
                <div className="text-[10px] text-teal-800 font-extrabold uppercase tracking-wider">Utility & Auth</div>
                <div className="text-2xl font-black text-slate-900 mt-1">â‚¹0.16</div>
                <div className="text-[11px] text-slate-600 font-bold">/ message (16 paisa)</div>
                <p className="text-[10px] text-slate-600 mt-1">Order Updates & OTPs</p>
              </div>

            </div>

            {/* Key Value Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Pay As You Use</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Meta Official API</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 bg-emerald-50/80 px-3 py-2 rounded-xl border border-emerald-200 col-span-2 sm:col-span-1">
                <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Free Business Website</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                onClick={onOpenLeadModal}
                className="px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 text-base cursor-pointer"
              >
                <span>Activate Dashboard Access</span>
                <ArrowRight className="w-5 h-5 text-emerald-200" />
              </button>

              <button
                onClick={() => onScrollToSection('calculator')}
                className="px-6 py-4 bg-white hover:bg-emerald-50 text-slate-900 font-extrabold rounded-xl border-2 border-emerald-200 shadow-xs transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Calculate Total Cost</span>
              </button>
            </div>

          </div>

          {/* Right Column: WhatsApp Mobile App Graphic Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Outer Phone Mockup Frame */}
              <div className="bg-slate-900 p-3 sm:p-4 rounded-[40px] shadow-2xl shadow-emerald-200 border-4 border-slate-800 relative">
                
                {/* Mobile Phone Top Notch */}
                <div className="w-32 h-4 bg-slate-900 rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-10 h-1 rounded-full bg-slate-700" />
                </div>

                {/* Inner Phone Screen */}
                <div className="bg-[#E5DDD5] rounded-[28px] overflow-hidden border border-slate-300 shadow-inner">
                  
                  {/* WhatsApp App Green Header Bar */}
                  <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-800 font-black text-sm border-2 border-emerald-400">
                          SL
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-extrabold flex items-center gap-1">
                          <span>Sellers Login Official</span>
                          <span className="bg-sky-500 text-white text-[8px] px-1 rounded font-bold flex items-center gap-0.5">
                            <BadgeCheck className="w-2.5 h-2.5 text-white" />
                            BLUE TICK
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-200 font-medium">
                          Official Business Account â€¢ Online
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Content Body inside WhatsApp */}
                  <div className="p-3 space-y-3 font-sans min-h-[380px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
                    
                    {/* Timestamp banner */}
                    <div className="text-center">
                      <span className="bg-white/80 text-[10px] font-bold text-slate-600 px-3 py-0.5 rounded-full shadow-2xs">
                        TODAY
                      </span>
                    </div>

                    {/* WhatsApp Marketing Message Card */}
                    <div className="bg-white p-3 rounded-2xl shadow-md border border-emerald-100 space-y-2.5 max-w-[95%]">
                      
                      {/* Image Preview Banner in Marketing Message */}
                      <div className="h-36 rounded-xl overflow-hidden relative group">
                        <img 
                          src="https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=600&auto=format&fit=crop&q=80" 
                          alt="Sellers Login WhatsApp Business Store" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Marketing Msg
                        </div>
                        <div className="absolute bottom-2 right-2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          Free Store Included
                        </div>
                      </div>

                      {/* Message Body Text */}
                      <div className="text-xs text-slate-900 font-semibold leading-snug">
                        <strong className="text-emerald-800 text-sm block">Sellers Login Special Offer! ðŸŽ‰</strong>
                        Welcome to our official store! Get 50% OFF on all new retail catalog arrivals. Visit our free online store: <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-black">sellerslogin.com/store</span>
                      </div>

                      {/* Interactive WhatsApp Action Buttons */}
                      <div className="pt-1 space-y-1.5 border-t border-slate-100">
                        <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors">
                          <span>Visit Free Business Website ðŸ›ï¸</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-full py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-1">
                          ðŸ›’ Complete Cart Recovery
                        </button>
                      </div>

                      {/* WhatsApp Blue Double Tick Timestamp */}
                      <div className="text-[9px] text-right text-slate-500 font-bold flex items-center justify-end gap-1 pt-0.5">
                        <span>10:42 AM</span>
                        <span className="text-[#34B7F1] font-black text-xs">âœ“âœ“</span>
                      </div>
                    </div>

                    {/* WhatsApp Utility Message */}
                    <div className="bg-[#DCF8C6] p-3 rounded-2xl shadow-xs border border-emerald-200 max-w-[90%] space-y-1 text-xs text-slate-900 font-medium">
                      <div className="flex items-center justify-between text-[10px] font-extrabold text-emerald-900">
                        <span>Automatic Utility Alert</span>
                        <span className="text-slate-500">10:44 AM</span>
                      </div>
                      <p className="font-semibold text-slate-800">
                        ðŸ“¦ Order #SL-8812 Dispatched! Track live location or confirm COD delivery on your Sellerslogin dashboard.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Floating Badge 1: Dashboard Feature */}
              <div className="absolute -bottom-4 -left-6 bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-200 flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                  SL
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">WhatsApp Automation</div>
                  <div className="text-[10px] font-bold text-emerald-600">Free Business Store Included</div>
                </div>
              </div>

              {/* Floating Badge 2: Meta Official */}
              <div className="absolute -top-4 -right-6 bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-200 flex items-center gap-2.5 hidden sm:flex">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md">
                  âœ“
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Meta Verified</div>
                  <div className="text-[10px] text-slate-600 font-bold">Pay As You Use Model</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


