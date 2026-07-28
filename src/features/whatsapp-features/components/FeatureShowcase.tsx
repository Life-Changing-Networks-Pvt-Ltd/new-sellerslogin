import React, { useState } from 'react';
import { FEATURES_DATA } from '../data/featuresData';
import { FeatureItem } from '../types';
import { 
  GitMerge, 
  Send, 
  ShoppingCart, 
  Layers, 
  LayoutGrid, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  BarChart3,
  Globe,
  BadgeCheck,
  Check
} from 'lucide-react';

interface FeatureShowcaseProps {
  onOpenLeadModal: () => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onOpenLeadModal }) => {
  const [activeTabId, setActiveTabId] = useState<string>('drip-campaigns');
  const activeFeature = FEATURES_DATA.find(f => f.id === activeTabId) || FEATURES_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitMerge': return <GitMerge className="w-4 h-4 flex-shrink-0" />;
      case 'Send': return <Send className="w-4 h-4 flex-shrink-0" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 flex-shrink-0 text-emerald-600" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4 flex-shrink-0 text-emerald-600" />;
      case 'Globe': return <Globe className="w-4 h-4 flex-shrink-0 text-emerald-600" />;
      case 'BadgeCheck': return <BadgeCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />;
      case 'Layers': return <Layers className="w-4 h-4 flex-shrink-0" />;
      case 'Users': return <Users className="w-4 h-4 flex-shrink-0" />;
      default: return <MessageSquare className="w-4 h-4 flex-shrink-0" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-white border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sellers Login WhatsApp Automation Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            All-In-One WhatsApp API Automation Features
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-semibold">
            All powerful features included in the <strong>â‚¹699/month</strong> Sellers Login dashboard. Free Business Website, Advance Analytics, Blue Tick Support & 100% Usable Balance.
          </p>
        </div>

        {/* Feature Navigation Tabs - Grid Layout to Prevent Overflow/Clipping */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 max-w-6xl mx-auto">
          {FEATURES_DATA.map((feat) => {
            const isActive = feat.id === activeTabId;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTabId(feat.id)}
                className={`p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border flex items-center justify-center gap-2 text-center leading-snug break-words ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                    : 'bg-emerald-50/70 text-slate-800 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-900'
                }`}
              >
                {getIcon(feat.iconName)}
                <span className="line-clamp-2">{feat.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Interactive Detail Display */}
        <div className="mt-8 bg-emerald-50/50 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-emerald-200/80 shadow-sm max-w-6xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Feature Narrative & High-Contrast Heading */}
            <div className="lg:col-span-6 space-y-5 text-left">
              
              <div className="inline-block px-3 py-1 bg-emerald-200 text-emerald-950 text-xs font-black rounded-lg uppercase tracking-wider">
                {activeFeature.tag}
              </div>

              {/* High-Contrast, wrapped title heading */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight break-words">
                {activeFeature.title}
              </h3>

              <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed break-words">
                {activeFeature.fullDesc}
              </p>

              {/* Bullet Highlights - Properly wrapped inside container */}
              <div className="space-y-3 pt-2">
                {activeFeature.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs flex-shrink-0 mt-0.5 shadow-xs">
                      âœ“
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug break-words">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={onOpenLeadModal}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span>Activate {activeFeature.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </button>
                <span className="text-xs font-extrabold text-slate-700">
                  Included in â‚¹699/mo Plan
                </span>
              </div>
            </div>

            {/* Right Column: High Quality Graphic Preview */}
            <div className="lg:col-span-6">
              <div className="bg-white p-5 rounded-2xl border-2 border-emerald-200 shadow-lg shadow-emerald-100/60 space-y-4">
                
                {/* Visual Graphic: Drip Campaign */}
                {activeFeature.graphicType === 'drip' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <GitMerge className="w-4 h-4 text-emerald-600" />
                        <span>Active WhatsApp Drip Sequence</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded font-black">
                        Automated 24/7
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-slate-900">Step 1: Welcome & Retail Catalog</div>
                          <div className="text-[11px] text-slate-700 font-medium">Trigger: On Lead Signup</div>
                        </div>
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded">Day 0</span>
                      </div>

                      <div className="w-0.5 h-4 bg-emerald-300 mx-auto" />

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-slate-900">Step 2: Best Selling Product Offer</div>
                          <div className="text-[11px] text-slate-700 font-medium">Delay: 24 Hours after Step 1</div>
                        </div>
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded">Day 1</span>
                      </div>

                      <div className="w-0.5 h-4 bg-emerald-300 mx-auto" />

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-slate-900">Step 3: â‚¹100 Coupon Code Follow-up</div>
                          <div className="text-[11px] text-slate-700 font-medium">Delay: 72 Hours if no order</div>
                        </div>
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded">Day 3</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: Broadcast */}
                {activeFeature.graphicType === 'broadcast' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <Send className="w-4 h-4 text-emerald-600" />
                        <span>Mass Broadcast Outreach</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded font-black">
                        Marketing Rate: â‚¹0.99
                      </span>
                    </div>

                    <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Campaign: Weekend Mega Sale</span>
                        <span className="text-emerald-400 font-black">Sent: 50,000 / 50,000</span>
                      </div>
                      
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[99%]" />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Open Rate</div>
                          <div className="text-base font-black text-emerald-400">98.4%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Button Clicks</div>
                          <div className="text-base font-black text-teal-300">38.2%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Sales Revenue</div>
                          <div className="text-base font-black text-white">â‚¹2,84,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: Advance Analytics Report */}
                {activeFeature.graphicType === 'analytics' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp Advance Analytics Report</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                        Real-Time ROI
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                        <div className="text-[10px] text-slate-600 font-extrabold">Delivery Speed</div>
                        <div className="text-lg font-black text-emerald-800">99.8% Sent</div>
                        <div className="text-[10px] text-emerald-700 font-bold">Avg. 1.2 sec dispatch</div>
                      </div>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                        <div className="text-[10px] text-slate-600 font-extrabold">Link Clickthrough (CTR)</div>
                        <div className="text-lg font-black text-emerald-800">42.5% CTR</div>
                        <div className="text-[10px] text-emerald-700 font-bold">+18% vs SMS</div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
                      <span>Total Revenue Generated:</span>
                      <span className="text-base font-black text-emerald-400">â‚¹4,12,900</span>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: Free Sellerslogin Website */}
                {activeFeature.graphicType === 'website' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span>Free Sellerslogin Business Website</span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-black">
                        Free â‚¹0 Add-on
                      </span>
                    </div>

                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="font-extrabold text-slate-900 flex items-center justify-between">
                        <span>sellerslogin.com/your-business-store</span>
                        <span className="text-emerald-700 font-black">Live âœ“</span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900">Digital Product Catalog & Checkout</div>
                        <div className="text-slate-600 text-[11px]">Works for Kirana, Clothing, Electronics & Services</div>
                      </div>

                      <button className="w-full py-2 bg-emerald-600 text-white font-extrabold rounded-lg text-xs shadow-xs">
                        Create Free Business Store in Dashboard ðŸ›ï¸
                      </button>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: WhatsApp Blue Tick */}
                {activeFeature.graphicType === 'bluetick' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-sky-500" />
                        <span>WhatsApp Official Blue Tick Badge</span>
                      </div>
                      <span className="text-[10px] bg-sky-100 text-sky-900 px-2 py-0.5 rounded font-black">
                        Meta Verified
                      </span>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-6 h-6 text-sky-500 fill-sky-500 flex-shrink-0" />
                        <div>
                          <div className="font-black text-slate-900">Official Blue Verification Assistance</div>
                          <div className="text-[10px] text-slate-600 font-bold">Direct submission guidance to Meta for official brand status</div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-800 space-y-1">
                        <div>âœ“ Displays blue badge next to your brand name</div>
                        <div>âœ“ Builds 100% authenticity for retail customers</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: E-Commerce Cart Automation */}
                {activeFeature.graphicType === 'cart' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-emerald-600" />
                        <span>E-Commerce Cart Recovery Trigger</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded font-black">
                        Store Automation
                      </span>
                    </div>

                    <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between font-extrabold text-slate-900">
                        <span>Cart Abandoned (15 Mins Ago)</span>
                        <span className="text-emerald-700 font-black">Sellerslogin Sync âœ“</span>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900">Item: Premium Designer Shoes (Qty: 1)</div>
                        <div className="text-slate-600 text-[11px]">Cart Value: â‚¹2,499</div>
                      </div>

                      <div className="pt-1">
                        <button className="w-full py-2 bg-emerald-600 text-white font-extrabold rounded-lg text-xs shadow-xs flex items-center justify-center gap-1">
                          <span>Complete Checkout on WhatsApp ðŸ›’</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: WhatsApp Flows */}
                {activeFeature.graphicType === 'flow' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <span>Native WhatsApp In-App Flow Form</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                        Zero Drop-off
                      </span>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3 text-xs">
                      <div className="font-black text-slate-900">Custom Book Order Form</div>
                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-800">Select Date & Time Slot:</label>
                        <input type="text" readOnly value="Tomorrow, 11:00 AM" className="w-full bg-white p-2 rounded-lg border border-emerald-200 font-bold text-slate-900" />
                        
                        <label className="block text-[11px] font-bold text-slate-800">Delivery Address:</label>
                        <input type="text" readOnly value="102 Park Street, Mumbai, MH" className="w-full bg-white p-2 rounded-lg border border-emerald-200 font-bold text-slate-900" />
                      </div>
                      <button className="w-full py-2 bg-emerald-600 text-white font-extrabold rounded-lg text-xs">
                        Submit Order Inside Chat âœ“
                      </button>
                    </div>
                  </div>
                )}

                {/* Visual Graphic: Shared Inbox */}
                {activeFeature.graphicType === 'inbox' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Shared Team Inbox & Approved Templates</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                        Unlimited Agents
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="font-extrabold text-slate-900">Agent 1 (Support)</div>
                        <div className="text-[10px] text-slate-600 font-bold">Handling Order #9841</div>
                        <div className="text-[10px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded mt-1.5 inline-block">Active</div>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="font-extrabold text-slate-900">Agent 2 (Sales)</div>
                        <div className="text-[10px] text-slate-600 font-bold">Bulk Inquiry</div>
                        <div className="text-[10px] bg-emerald-700 text-white font-black px-1.5 py-0.5 rounded mt-1.5 inline-block">Assigned</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


