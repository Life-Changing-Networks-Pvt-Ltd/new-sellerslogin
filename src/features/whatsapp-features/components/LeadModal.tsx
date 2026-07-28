import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, BadgeCheck, Zap } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    planChoice: 'Quarterly Plan (â‚¹1,999 / 3 Months)',
    businessType: 'Retail Store / Shop',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-emerald-200 shadow-2xl relative overflow-hidden text-slate-900">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5">
            {/* Modal Header */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Activate Sellers Login Dashboard</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                Get Instant WhatsApp API Access
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Pay As You Use messaging model with official Meta conversation rates. Zero lock-in!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Your Full Name / Business Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar (Sharma Electronics)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">WhatsApp Business Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Preferred Dashboard Plan</label>
                <select 
                  value={formData.planChoice}
                  onChange={(e) => setFormData({ ...formData, planChoice: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  <option>Quarterly Plan (â‚¹1,999 / 3 Months) - Save 17% âœ¨</option>
                  <option>Monthly Plan (â‚¹799 / Month)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Business Category</label>
                <select 
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                >
                  <option>Retail Store / Supermarket / Fashion</option>
                  <option>Manufacturer & B2B Wholesaler</option>
                  <option>Travel Agent & Tour Operator</option>
                  <option>Hotel, Resort & Restaurant / Hospitality</option>
                  <option>Doctor, Clinic & Healthcare</option>
                  <option>Real Estate Agent & Developer</option>
                  <option>Educational Institute & Coaching</option>
                  <option>Service Sector (Salon, Repairs, AMC)</option>
                  <option>E-Commerce D2C Brand</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Activation Highlights:</span>
                </div>
                <p className="text-[11px] text-slate-700 font-medium">
                  â€¢ Flexible Plans: â‚¹799/mo or â‚¹1,999/qtr<br />
                  â€¢ Pay As You Use messaging â€¢ Free Business Website Included
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit & Activate Dashboard</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
            
            <p className="text-xs font-semibold text-slate-700 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>! Our Meta WhatsApp API onboarding account manager will call you at <strong>{formData.phone}</strong> within 15 minutes to activate your Sellers Login dashboard on the <strong>{formData.planChoice}</strong>.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-emerald-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


