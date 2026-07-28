import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, ArrowRight, BadgeCheck } from 'lucide-react';

interface FooterProps {
  onOpenLeadModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal, onScrollToSection }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/sellerslogin-logo (1).svg" alt="Sellers Login Logo" fill sizes="40px" className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-black text-white">Sellers Login</span>
                <p className="text-xs text-slate-400 font-semibold">sellerslogin.com</p>
              </div>
            </Link>

            <p className="text-xs text-slate-300 font-semibold leading-relaxed max-w-sm">
              Official WhatsApp Business API Automation & Dashboard for retail and online business owners. Drip campaigns, mass broadcasts, cart recovery, WhatsApp Blue Tick, and a Free Sellerslogin Business Store!
            </p>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Meta Official API Partner â€¢ Pay As You Use</span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3 text-xs font-bold">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">Drip Sequences</button></li>
              <li><button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">Mass Broadcasts</button></li>
              <li><button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">Cart Recovery</button></li>
              <li><button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">WhatsApp Blue Tick</button></li>
              <li><button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">Free Business Store</button></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3 text-xs font-bold">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Pricing & Rates</h4>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition-colors">Monthly Plan (â‚¹799/mo)</button></li>
              <li><button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition-colors">Quarterly Plan (â‚¹1,999/qtr)</button></li>
              <li><button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition-colors">Marketing @ â‚¹0.99</button></li>
              <li><button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition-colors">Utility @ â‚¹0.16</button></li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div className="space-y-3 text-xs font-bold">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Get Started</h4>
            <p className="text-slate-400 text-[11px] font-normal">
              Activate your dashboard in under 5 minutes with our official Meta onboarding team.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Activate Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-4">
          <div>
            Â© {new Date().getFullYear()} Sellers Login (sellerslogin.com). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold">Official Meta WhatsApp API Partner</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

