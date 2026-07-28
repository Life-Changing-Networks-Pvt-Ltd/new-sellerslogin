import React from 'react';
import { BUSINESS_FEATURES } from '../data/featuresData';
import { 
  Globe, 
  BadgeCheck, 
  BarChart3, 
  ShoppingCart, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface BusinessToolsProps {
  onOpenLeadModal: () => void;
}

export const BusinessTools: React.FC<BusinessToolsProps> = ({ onOpenLeadModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-emerald-600" />;
      case 'BadgeCheck': return <BadgeCheck className="w-6 h-6 text-emerald-600" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-600" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Users': return <Users className="w-6 h-6 text-emerald-600" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="business-tools" className="py-20 bg-white border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Built for Any Retail & Online Business</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            High-Growth E-Commerce & Retail Business Tools
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-semibold">
            Included at no extra charge inside your â‚¹699/month Sellers Login WhatsApp dashboard.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BUSINESS_FEATURES.map((tool, idx) => (
            <div 
              key={idx}
              className="bg-emerald-50/40 p-6 rounded-3xl border-2 border-emerald-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shadow-xs">
                    {getIcon(tool.icon)}
                  </div>
                  <span className="text-[11px] font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full uppercase tracking-wider">
                    {tool.metric}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {tool.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-200/60 flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>â‚¹699/mo Plan</span>
                </span>

                <button
                  onClick={onOpenLeadModal}
                  className="text-xs font-extrabold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


