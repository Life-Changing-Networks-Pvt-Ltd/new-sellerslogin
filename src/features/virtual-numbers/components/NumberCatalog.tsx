import React, { useState } from 'react';
import { MOCK_VIRTUAL_NUMBERS, INDIAN_STATES_CITIES } from '../data/virtualNumbers';
import { VirtualNumber } from '../types';
import { Phone, ShieldCheck, CheckCircle2, Sparkles, Filter, Search, Building2, Smartphone, HelpCircle } from 'lucide-react';

interface NumberCatalogProps {
  onSelectNumberToBuy: (vn: VirtualNumber) => void;
  selectedCityFilter?: string;
}

export const NumberCatalog: React.FC<NumberCatalogProps> = ({
  onSelectNumberToBuy,
  selectedCityFilter = '',
}) => {
  const [activeState, setActiveState] = useState<string>(selectedCityFilter || 'All');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter virtual numbers
  const filteredNumbers = MOCK_VIRTUAL_NUMBERS.filter((vn) => {
    // City / State filter
    if (activeState !== 'All') {
      if (vn.state !== activeState && !vn.city.toLowerCase().includes(activeState.toLowerCase())) {
        return false;
      }
    }
    // Type filter
    if (activeType !== 'all') {
      if (activeType === 'landline' && vn.type !== 'landline') return false;
      if (activeType === 'mobile' && vn.type !== 'mobile' && vn.type !== 'vip') return false;
      if (activeType === 'tollfree' && vn.type !== 'tollfree') return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchPhone = vn.phoneNumber.includes(q);
      const matchCity = vn.city.toLowerCase().includes(q);
      const matchState = vn.state.toLowerCase().includes(q);
      const matchStd = vn.stdCode?.includes(q);
      if (!matchPhone && !matchCity && !matchState && !matchStd) return false;
    }
    return true;
  });

  return (
    <section id="number-catalog" className="py-16 lg:py-24 bg-slate-50/60 text-gray-900 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              Live Inventory Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
              Browse Available Indian Virtual Numbers
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Select your city landline (+91 080, +91 022, +91 011), Mobile series, or 1800 Toll-Free. Instant activation.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, code (e.g. 080, 022) or number..."
              className="w-full bg-white border border-purple-200 focus:border-purple-500 text-xs text-gray-900 pl-9 pr-3 py-2.5 rounded-xl outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col space-y-4">
          
          {/* State / Region Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveState('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeState === 'All'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:text-purple-700 border border-purple-100'
              }`}
            >
              All India (Pan-India)
            </button>

            {INDIAN_STATES_CITIES.map((sc) => (
              <button
                key={sc.city}
                onClick={() => setActiveState(sc.state)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeState === sc.state
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:text-purple-700 border border-purple-100'
                }`}
              >
                {sc.city} ({sc.code})
              </button>
            ))}
          </div>

          {/* Type Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-purple-100 pb-3">
            <button
              onClick={() => setActiveType('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer ${
                activeType === 'all' ? 'text-purple-900 bg-purple-100 border border-purple-200' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveType('landline')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer ${
                activeType === 'landline' ? 'text-purple-900 bg-purple-100 border border-purple-200' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> City Landlines (080, 022, 011)
            </button>
            <button
              onClick={() => setActiveType('mobile')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer ${
                activeType === 'mobile' ? 'text-purple-900 bg-purple-100 border border-purple-200' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile & VIP (+91)
            </button>
            <button
              onClick={() => setActiveType('tollfree')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer ${
                activeType === 'tollfree' ? 'text-purple-900 bg-purple-100 border border-purple-200' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> 1800 Toll-Free
            </button>
          </div>

        </div>

        {/* Number Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNumbers.map((vn) => (
            <div
              key={vn.id}
              className={`bg-white border rounded-3xl p-6 relative flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md ${
                vn.isPopular ? 'border-purple-300 ring-2 ring-purple-100 shadow-sm' : 'border-purple-100 hover:border-purple-200'
              }`}
            >
              {/* Top Tag */}
              {vn.isPopular && (
                <div className="absolute -top-3 right-6 bg-purple-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  â˜… Best Seller for E-Com
                </div>
              )}

              <div className="space-y-4">
                
                {/* Location & Type Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>{vn.city} ({vn.state})</span>
                  </div>
                  <span className="bg-purple-50 text-purple-800 border border-purple-100 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                    {vn.type}
                  </span>
                </div>

                {/* Number Display */}
                <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-4 text-center space-y-1">
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-gray-900">
                    {vn.displayFormat}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-purple-900 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>100% Call Masking & Auto Recording</span>
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <ul className="space-y-2 text-xs text-gray-600 pt-1">
                  {vn.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Price & Buy Button Footer */}
              <div className="pt-6 mt-6 border-t border-purple-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Price Plan</div>
                  <div className="text-xl font-black text-gray-900 font-mono">
                    â‚¹{vn.monthlyPrice} <span className="text-xs font-normal text-gray-500">+ GST</span>
                  </div>
                  <div className="text-[10px] text-purple-700 font-medium">100 Free Mins â€¢ â‚¹0.60/min after</div>
                </div>

                <button
                  onClick={() => onSelectNumberToBuy(vn)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  Book Number
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredNumbers.length === 0 && (
          <div className="bg-white border border-purple-200 rounded-3xl p-10 text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-purple-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">No virtual numbers matched your filter</h3>
            <p className="text-xs text-gray-500">Try clearing your search query or choosing "All India".</p>
            <button
              onClick={() => {
                setActiveState('All');
                setActiveType('all');
                setSearchQuery('');
              }}
              className="bg-purple-50 text-xs text-purple-700 font-bold px-4 py-2 rounded-xl border border-purple-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};


