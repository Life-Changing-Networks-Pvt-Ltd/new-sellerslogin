import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, ShoppingCart, Menu, X, ArrowRight, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-700 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 flex-wrap">
        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          WhatsApp Official API
        </span>
        <span>
          Pay As You Use Model â€¢ Marketing @ <strong>â‚¹0.99</strong> | Utility @ <strong>â‚¹0.16</strong>
        </span>
        <button 
          onClick={onOpenLeadModal}
          className="ml-1 underline hover:text-emerald-200 transition-colors font-bold hidden md:inline-flex items-center gap-1 text-xs cursor-pointer"
        >
          Activate Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo with WhatsApp Color Integration */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="relative w-11 h-11 shrink-0">
              <Image src="/sellerslogin-logo (1).svg" alt="Sellers Login Logo" fill sizes="44px" className="object-contain" />
              <div className="hidden">
                âœ“
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">Sellers Login</span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Verified API
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">sellerslogin.com</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <button 
              onClick={() => handleNavClick('features')} 
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Features & Automation
            </button>
            <button 
              onClick={() => handleNavClick('calculator')} 
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Pricing & Plans</span>
            </button>
            <button 
              onClick={() => handleNavClick('business-tools')} 
              className="hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cart Automation</span>
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('calculator')}
              className="px-4 py-2 text-xs font-bold text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Cost Calculator</span>
            </button>

            <button
              onClick={onOpenLeadModal}
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md shadow-emerald-200 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Activate Dashboard</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => handleNavClick('features')} 
            className="block w-full text-left py-2 px-3 rounded-md text-base font-bold text-slate-800 hover:bg-emerald-50"
          >
            Features & Automation
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className="block w-full text-left py-2 px-3 rounded-md text-base font-bold text-slate-800 hover:bg-emerald-50"
          >
            Pricing & Plans
          </button>
          <button 
            onClick={() => handleNavClick('business-tools')} 
            className="block w-full text-left py-2 px-3 rounded-md text-base font-bold text-slate-800 hover:bg-emerald-50"
          >
            E-Commerce Cart Automation
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="block w-full text-left py-2 px-3 rounded-md text-base font-bold text-slate-800 hover:bg-emerald-50"
          >
            Frequently Asked Questions
          </button>

          <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-emerald-600 rounded-lg shadow-md"
            >
              Get Dashboard Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
