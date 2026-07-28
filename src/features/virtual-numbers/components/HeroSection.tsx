import React, { useState } from 'react';
import { ShieldCheck, Mic, Phone, Sparkles, CheckCircle2, ArrowRight, Zap, Building2, Search } from 'lucide-react';
import { MOCK_VIRTUAL_NUMBERS } from '../data/virtualNumbers';

interface HeroSectionProps {
  onSearchCity: (city: string) => void;
  onBuyNumber: (numId?: string) => void;
  onOpenDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchCity,
  onBuyNumber,
  onOpenDashboard,
}) => {
  const [selectedCityQuick, setSelectedCityQuick] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchCity(selectedCityQuick);
    const catalogElement = document.getElementById('number-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-white text-gray-900">
      {/* Background Light Purple Glows & Patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-200/40 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-200/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-700 font-bold">Live India Virtual Numbers</span>
              <span className="text-purple-300">â€¢</span>
              <span className="text-purple-900">By SellersLogin</span>
            </div>

            {/* Main Headline (Black with Light Purple Highlight) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900">
              Buy Indian Virtual Number <br className="hidden sm:inline" />
              <span className="text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-lg border border-purple-200 inline-block mt-1">
                With SellersLogin
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Get an official Indian Virtual Phone Number starting at <strong className="text-purple-900 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">â‚¹499 + GST</strong> (includes <strong className="text-purple-900 font-bold">100 Free Minutes</strong>, then <strong className="text-purple-900 font-bold">â‚¹0.60/min</strong>). 
              Features <strong className="text-gray-900 font-semibold underline decoration-purple-500">100% Call Masking</strong>, 
              <strong className="text-gray-900 font-semibold underline decoration-emerald-500"> Automatic Call Recording</strong>, and a full <strong className="text-gray-900 font-semibold underline decoration-indigo-500">Client Dashboard</strong>.
            </p>

            {/* Price Highlight Banner Graphic */}
            <div className="bg-gradient-to-r from-purple-50 via-purple-100/50 to-indigo-50 border border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md shadow-purple-600/20">
                  â‚¹499
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Instant Booking â€¢ â‚¹499 + GST</div>
                  <div className="text-[11px] text-gray-600">Includes <strong>100 Free Minutes</strong> â€¢ â‚¹0.60 per min afterwards</div>
                </div>
              </div>
              <button
                onClick={() => onBuyNumber()}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                Book Instant <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key USPs / Light Purple Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-white border border-purple-100 p-3.5 rounded-2xl text-left shadow-xs hover:border-purple-300 transition-colors">
                <ShieldCheck className="w-5 h-5 text-purple-600 mb-1" />
                <h4 className="text-xs font-bold text-gray-900">Call Masking</h4>
                <p className="text-[11px] text-gray-500">Complete Privacy Shield</p>
              </div>

              <div className="bg-white border border-purple-100 p-3.5 rounded-2xl text-left shadow-xs hover:border-purple-300 transition-colors">
                <Mic className="w-5 h-5 text-indigo-600 mb-1" />
                <h4 className="text-xs font-bold text-gray-900">Auto Recording</h4>
                <p className="text-[11px] text-gray-500">HD MP3 audio saved</p>
              </div>

              <div className="bg-white border border-purple-100 p-3.5 rounded-2xl text-left shadow-xs hover:border-purple-300 transition-colors">
                <Phone className="w-5 h-5 text-purple-600 mb-1" />
                <h4 className="text-xs font-bold text-gray-900">Instant Calling</h4>
                <p className="text-[11px] text-gray-500">Web & mobile dialer</p>
              </div>

              <div className="bg-white border border-purple-100 p-3.5 rounded-2xl text-left shadow-xs hover:border-purple-300 transition-colors">
                <Zap className="w-5 h-5 text-emerald-600 mb-1" />
                <h4 className="text-xs font-bold text-gray-900">No Spam</h4>
                <p className="text-[11px] text-gray-500">Personal mobile safe</p>
              </div>
            </div>

            {/* Quick Search Form */}
            <form onSubmit={handleQuickSearch} className="bg-purple-50/80 border border-purple-200 p-2 sm:p-2.5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 w-full bg-white rounded-xl border border-purple-100">
                <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
                <select
                  value={selectedCityQuick}
                  onChange={(e) => setSelectedCityQuick(e.target.value)}
                  className="bg-transparent text-gray-800 font-medium text-xs sm:text-sm w-full outline-none cursor-pointer"
                >
                  <option value="">Select STD Code / City (+91 080 Bangalore, +91 022 Mumbai, +91 011 Delhi...)</option>
                  <option value="Karnataka">Bengaluru (+91 080 Landline)</option>
                  <option value="Maharashtra">Mumbai (+91 022 Landline)</option>
                  <option value="Delhi NCR">New Delhi (+91 011 Landline)</option>
                  <option value="All India">Pan-India 1800 Toll Free</option>
                  <option value="All India Mobile">All India Mobile (+91 Series)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Search Available Numbers
              </button>
            </form>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 pt-1 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>12,500+ Indian Sellers Connected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>TRAI Telecom Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Physical Setup Needed</span>
              </div>
            </div>

          </div>

          {/* Right Column: Light Purple Graphic Card Preview */}
          <div className="lg:col-span-5 relative">
            
            {/* Graphic Container Frame */}
            <div className="relative bg-gradient-to-b from-purple-50/80 via-white to-purple-50/60 border border-purple-200 rounded-3xl p-6 shadow-xl shadow-purple-500/10 space-y-5">
              
              {/* Header inside mockup graphic card */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <div className="w-3 h-3 rounded-full bg-indigo-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-gray-700 font-bold ml-1">SellersLogin Virtual Call Shield</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-extrabold">
                  Active Shield
                </span>
              </div>

              {/* Sample Virtual Number Graphic */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 text-center space-y-2 relative overflow-hidden shadow-xs">
                <div className="text-[11px] text-purple-700 font-bold uppercase tracking-wider bg-purple-50 inline-block px-3 py-0.5 rounded-full border border-purple-100">
                  Assigned Virtual Line
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono tracking-tight pt-1">
                  +91 (080) 4988 7700
                </div>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                    Bengaluru Landline Series
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200">
                    Call Masking: ON
                  </span>
                </div>
              </div>

              {/* Calling Process & Masking Live Graphic */}
              <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">Call Masking Visual Process</span>
                  <span className="text-[10px] text-purple-700 font-mono font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Personal SIM Protected</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                    <span className="text-gray-500 font-medium">Seller Personal SIM:</span>
                    <span className="font-mono text-gray-400 line-through font-bold">+91 98765 XXXXX</span>
                  </div>
                  <div className="flex items-center justify-between bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                    <span className="text-purple-900 font-semibold">Buyer Sees On Screen:</span>
                    <span className="font-mono text-purple-800 font-black">+91 (080) 4988 7700</span>
                  </div>
                </div>
              </div>

              {/* Audio Waveform Graphic */}
              <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-purple-800 font-bold">
                    <Mic className="w-4 h-4 text-purple-600 animate-pulse" />
                    <span>Automatic HD Call Recording</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">100 Free Mins â€¢ MP3 Saved</span>
                </div>

                {/* Light Purple Audio Waveform bars */}
                <div className="flex items-end gap-1 h-8 pt-1">
                  {[25, 60, 80, 45, 90, 70, 30, 85, 95, 60, 40, 75, 80, 50, 30, 65, 85, 40, 20].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="pt-1 grid grid-cols-2 gap-3">
                <button
                  onClick={onOpenDashboard}
                  className="w-full bg-white hover:bg-purple-50 text-gray-800 text-xs font-bold py-2.5 rounded-xl border border-purple-200 transition-colors shadow-xs cursor-pointer"
                >
                  Try Dashboard
                </button>
                <button
                  onClick={() => onBuyNumber('vn-blr-01')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Book for â‚¹499 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


