import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, UserCheck, Sparkles, FileCode2, LayoutDashboard, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'landing' | 'dashboard' | 'seo-view';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'seo-view') => void;
  onBuyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onBuyClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 text-gray-900 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-xs py-2 px-4 text-center font-medium text-white flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold text-[10px]">
          ðŸ‡®ðŸ‡³ TRAI Compliant
        </span>
        <span>Instant Indian Virtual Numbers starting at <strong>â‚¹499 + GST</strong> (100 Free Mins â€¢ â‚¹0.60/min after)</span>
        <button
          onClick={onBuyClick}
          className="hidden md:inline-flex items-center gap-0.5 underline hover:text-amber-200 transition-colors ml-2 font-bold cursor-pointer"
        >
          Book Now <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="relative w-10 h-10 shrink-0 group-hover:scale-105 transition-transform">
                <Image src="/sellerslogin-logo (1).svg" alt="Sellers Login Logo" fill sizes="40px" className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xl tracking-tight text-gray-900">Sellers Login</span>
                  <span className="bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Virtual Numbers
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide">
                  Indian Virtual Number & Call Shield
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-purple-50/80 p-1.5 rounded-full border border-purple-100">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'landing'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-white/80'
              }`}
            >
              Overview & Numbers
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-white/80'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
              Live Dashboard
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-purple-700 bg-gray-100 hover:bg-purple-50 border border-gray-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              Client Dashboard
            </button>

            <button
              onClick={onBuyClick}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              Buy Virtual Number
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

