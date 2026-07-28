import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, PhoneCall, PhoneOff, Mic, Sparkles, CheckCircle2, Lock, EyeOff } from 'lucide-react';

export const CallMaskingSimulator: React.FC = () => {
  const [isMaskingEnabled, setIsMaskingEnabled] = useState(true);
  const [testDialed, setTestDialed] = useState(false);

  const triggerCallSimulation = () => {
    setTestDialed(true);
    setTimeout(() => setTestDialed(false), 4000);
  };

  return (
    <section className="py-16 lg:py-24 bg-purple-50/40 border-y border-purple-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>100% Call Masking & Privacy Shield</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            How Call Masking Protects Your Business <br />
            <span className="text-purple-700">Live Interactive Call Simulation</span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            When calling buyers for order confirmation, your personal SIM number stays completely hidden. 
            Test the live simulator below to see what the buyer sees on their mobile screen.
          </p>
        </div>

        {/* Interactive Toggle Control */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-purple-200 flex items-center gap-2 shadow-xs">
            <button
              onClick={() => setIsMaskingEnabled(false)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                !isMaskingEnabled
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Without Call Masking (Risky)
            </button>

            <button
              onClick={() => setIsMaskingEnabled(true)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isMaskingEnabled
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 fill-white" />
              With SellersLogin Call Masking (100% Protected)
            </button>
          </div>
        </div>

        {/* Live Simulator Visualization Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Mobile Screen Mockup Graphic */}
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-purple-500/5">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-3.5 bg-purple-100 rounded-full border border-purple-200" />

            <div className="pt-6 space-y-6 text-center">
              <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Buyer's Mobile Screen Visual
              </div>

              {/* Calling Graphic Wave */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isMaskingEnabled ? 'bg-purple-500' : 'bg-rose-500'}`} />
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${isMaskingEnabled ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-rose-50 border-rose-500 text-rose-600'}`}>
                  <PhoneCall className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              {/* Displayed Caller Number */}
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">Caller Identification Displayed:</p>
                <div className={`text-2xl sm:text-3xl font-mono font-black tracking-wider ${isMaskingEnabled ? 'text-purple-900' : 'text-rose-600'}`}>
                  {isMaskingEnabled ? '+91 (080) 4988 7700' : '+91 98920 12345'}
                </div>
                <p className="text-xs font-semibold pt-1">
                  {isMaskingEnabled ? (
                    <span className="text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1 font-bold">
                      <Lock className="w-3.5 h-3.5 text-purple-700" /> Virtual Line (Personal SIM Protected)
                    </span>
                  ) : (
                    <span className="text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1 font-bold">
                      <EyeOff className="w-3.5 h-3.5 text-rose-600" /> EXPOSED: Seller Personal Mobile
                    </span>
                  )}
                </p>
              </div>

              {/* Simulated Recording Notice */}
              <div className="bg-purple-50/80 border border-purple-100 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Mic className={`w-4 h-4 ${isMaskingEnabled ? 'text-purple-600 animate-pulse' : 'text-gray-400'}`} />
                  <span>Call Recording Status:</span>
                </div>
                <span className={`font-mono font-extrabold ${isMaskingEnabled ? 'text-purple-800' : 'text-gray-400'}`}>
                  {isMaskingEnabled ? 'ENCRYPTED & SAVED MP3' : 'NOT RECORDED'}
                </span>
              </div>

              {/* Trigger Button */}
              <button
                onClick={triggerCallSimulation}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-purple-600/20 cursor-pointer"
              >
                {testDialed ? 'Simulating Live Call Graphic...' : 'Test Dial Call Masking Graphic'}
              </button>
            </div>
          </div>

          {/* Explanation & Impact Card */}
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border transition-all ${isMaskingEnabled ? 'bg-white border-purple-200 shadow-sm' : 'bg-rose-50/50 border-rose-200'}`}>
              <h3 className="text-lg font-bold flex items-center gap-2">
                {isMaskingEnabled ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-purple-700" />
                    <span className="text-gray-900 font-extrabold">SellersLogin Privacy Advantage</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-900 font-extrabold">The Danger of Exposing Personal Numbers</span>
                  </>
                )}
              </h3>

              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-gray-700">
                {isMaskingEnabled ? (
                  <>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Zero Data Leakage:</strong> Customers never get your personal phone number. Your mobile series remains 100% private.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>No Late Night Calls:</strong> Buyers call back your virtual number during your set business hours only.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Automatic Call Recording:</strong> Every order check or customer conversation is recorded and stored in your SellersLogin dashboard.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Professional Corporate Brand:</strong> Buyers receive calls from official local landlines (+91 080, +91 022, +91 011) or 1800 Toll-Free.</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2.5 text-rose-900">
                      <span className="text-rose-600 font-bold shrink-0">âœ•</span>
                      <span>Personal numbers sold to spam call databases & telemarketers.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-rose-900">
                      <span className="text-rose-600 font-bold shrink-0">âœ•</span>
                      <span>Customers call personal phones directly on weekends and holidays.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-rose-900">
                      <span className="text-rose-600 font-bold shrink-0">âœ•</span>
                      <span>No proof or audio recording when buyers deny confirming COD shipments.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Quick Summary Pill */}
            <div className="bg-white p-4 rounded-2xl border border-purple-200 text-xs text-gray-600 flex items-center justify-between shadow-xs">
              <span className="font-semibold text-gray-800">SellersLogin Call Masking Engine:</span>
              <span className="text-purple-700 font-mono font-bold bg-purple-50 px-2.5 py-0.5 rounded border border-purple-100">Encrypted WebRTC Proxy</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


