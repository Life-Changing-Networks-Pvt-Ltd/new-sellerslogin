import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, Mail, MapPin, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'landing' | 'dashboard' | 'seo-view') => void;
  onBuyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onBuyClick }) => {
  return (
    <footer className="bg-white border-t border-purple-100 text-gray-600 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="relative w-8 h-8 shrink-0">
                <Image src="/sellerslogin-logo (1).svg" alt="Sellers Login Logo" fill sizes="32px" className="object-contain" />
              </div>
              <span className="font-bold text-lg text-gray-900">Sellers Login</span>
            </Link>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              India's premier Virtual Number platform for e-commerce sellers, tele-callers, and businesses. 
              Featuring 100% Call Masking & Cloud Audio Call Recording.
            </p>
            <div className="flex items-center gap-1.5 text-purple-800 font-extrabold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>TRAI Compliant Telecom Infrastructure</span>
            </div>
          </div>

          {/* City Virtual Numbers */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">City Virtual Lines</h4>
            <ul className="space-y-1.5 text-gray-600 font-medium">
              <li><button onClick={onBuyClick} className="hover:text-purple-700 cursor-pointer">Bengaluru Virtual Line (+91 080)</button></li>
              <li><button onClick={onBuyClick} className="hover:text-purple-700 cursor-pointer">Mumbai Virtual Number (+91 022)</button></li>
              <li><button onClick={onBuyClick} className="hover:text-purple-700 cursor-pointer">Delhi Virtual Number (+91 011)</button></li>
              <li><button onClick={onBuyClick} className="hover:text-purple-700 cursor-pointer">Hyderabad Virtual Number (+91 040)</button></li>
              <li><button onClick={onBuyClick} className="hover:text-purple-700 cursor-pointer">1800 Toll-Free India</button></li>
            </ul>
          </div>

          {/* Dashboard & Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Product Features</h4>
            <ul className="space-y-1.5 text-gray-600 font-medium">
              <li><button onClick={() => onNavigateTab('dashboard')} className="hover:text-purple-700 cursor-pointer">SellersLogin Client Dashboard</button></li>
              <li><button onClick={() => onNavigateTab('landing')} className="hover:text-purple-700 cursor-pointer">Call Masking Privacy Shield</button></li>
              <li><button onClick={() => onNavigateTab('dashboard')} className="hover:text-purple-700 cursor-pointer">Auto Call Recording MP3</button></li>
              <li><button onClick={() => onNavigateTab('dashboard')} className="hover:text-purple-700 cursor-pointer">Browser Web Dialer</button></li>
              <li><button onClick={() => onNavigateTab('seo-view')} className="hover:text-purple-700 cursor-pointer">Next.js SEO Architecture</button></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Support & Helpline</h4>
            <div className="space-y-2 text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                <span className="font-mono text-gray-900 font-bold">+91 800-SELLERS (7355377)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-600" />
                <span>support@sellerslogin.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                <span>New Delhi & Mumbai Telecom Hub, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-medium">
          <span>Â© {new Date().getFullYear()} SellersLogin (sellerslogin.com). All Rights Reserved.</span>
          <span>TRAI Compliant Indian Virtual Telecom Services</span>
        </div>

      </div>
    </footer>
  );
};

