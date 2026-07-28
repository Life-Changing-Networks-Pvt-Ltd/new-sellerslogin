import React, { useState } from 'react';
import { NEXTJS_SEO_PAGE_CODE } from '../data/faqsAndSeo';
import { FileCode2, Copy, Check, Search, Globe, Code2, Sparkles, Layout } from 'lucide-react';

export const NextjsSeoView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'pageCode' | 'serpPreview' | 'schemaJson'>('pageCode');

  const handleCopy = () => {
    navigator.clipboard.writeText(NEXTJS_SEO_PAGE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaJsonContent = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "SellersLogin Indian Virtual Number with Call Masking",
  "provider": {
    "@type": "Organization",
    "name": "SellersLogin",
    "url": "https://www.sellerslogin.com"
  },
  "areaServed": "India",
  "serviceType": "Telecommunications & Virtual Calling",
  "offers": {
    "@type": "Offer",
    "price": "499",
    "priceCurrency": "INR"
  }
}`;

  return (
    <section className="py-12 bg-white text-gray-900 min-h-screen border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold px-3 py-1 rounded-full">
            <FileCode2 className="w-3.5 h-3.5 text-purple-700" />
            <span>Next.js SEO App Router Architecture</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Next.js SEO Code & Search Engine Specs
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 max-w-3xl font-medium">
            Optimized for Google ranking on high-value keywords like <strong className="text-gray-900">"Buy Indian Virtual Number"</strong>, 
            <strong className="text-gray-900">"SellersLogin Call Masking"</strong>, and <strong className="text-gray-900">"Virtual Number with Call Recording"</strong>.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-purple-100 pb-3">
          <button
            onClick={() => setActiveTab('pageCode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pageCode'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-purple-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Next.js Page Code (`app/buy-indian-virtual-number/page.tsx`)
          </button>

          <button
            onClick={() => setActiveTab('serpPreview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'serpPreview'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-purple-100'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-purple-700" />
            Google SERP Snippet Preview
          </button>

          <button
            onClick={() => setActiveTab('schemaJson')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'schemaJson'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-purple-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            JSON-LD Schema Markup
          </button>
        </div>

        {/* TAB 1: CODE VIEWER */}
        {activeTab === 'pageCode' && (
          <div className="bg-white border border-purple-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-800">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>sellerslogin.com / app / buy-indian-virtual-number / page.tsx</span>
              </div>

              <button
                onClick={handleCopy}
                className="bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs px-3 py-1.5 rounded-xl border border-purple-200 flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-purple-700" /> : <Copy className="w-3.5 h-3.5 text-purple-500" />}
                <span>{copied ? 'Copied Code!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {NEXTJS_SEO_PAGE_CODE}
            </pre>
          </div>
        )}

        {/* TAB 2: SERP PREVIEW */}
        {activeTab === 'serpPreview' && (
          <div className="bg-white border border-purple-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-600" />
              Google Search Result Simulation
            </h3>

            {/* Google SERP Box */}
            <div className="bg-purple-50/30 border border-purple-200 rounded-2xl p-5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Globe className="w-3.5 h-3.5 text-purple-600" />
                <span>https://www.sellerslogin.com â€º buy-indian-virtual-number</span>
              </div>
              <h4 className="text-lg font-black text-purple-800 hover:underline cursor-pointer">
                Buy Indian Virtual Number with Call Masking & Recording | SellersLogin
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                Get Indian Virtual Numbers (+91 Landline, Mobile, 1800 Toll-Free) with 100% Call Masking, 
                Automatic Call Recording, and SellersLogin Client Dashboard. Protect your personal number from spam market exposure.
              </p>

              {/* Sitelinks */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-purple-100 text-xs">
                <div>
                  <span className="text-purple-800 font-bold hover:underline cursor-pointer">Call Masking Shield</span>
                  <p className="text-[11px] text-gray-500 font-medium">Hide personal SIM numbers when calling buyers.</p>
                </div>
                <div>
                  <span className="text-purple-800 font-bold hover:underline cursor-pointer">Call Recording Storage</span>
                  <p className="text-[11px] text-gray-500 font-medium">Save HD MP3 audio for order verification.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JSON-LD SCHEMA */}
        {activeTab === 'schemaJson' && (
          <div className="bg-white border border-purple-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              JSON-LD Rich Snippet Schema
            </h3>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
              {schemaJsonContent}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
};


