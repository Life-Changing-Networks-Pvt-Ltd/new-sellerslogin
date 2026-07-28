import React, { useState } from 'react';
import { VirtualNumber } from '../types';
import { X, ShieldCheck, CheckCircle2, Sparkles, Building2, UserCheck, Lock, ArrowRight, Zap, Phone } from 'lucide-react';

interface BuyNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNumber?: VirtualNumber | null;
  onSuccess: () => void;
}

export const BuyNumberModal: React.FC<BuyNumberModalProps> = ({
  isOpen,
  onClose,
  selectedNumber,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [businessName, setBusinessName] = useState('');
  const [forwardingNumber, setForwardingNumber] = useState('');
  const [kycDocumentType, setKycDocumentType] = useState<'gst' | 'aadhaar'>('gst');
  const [kycNumber, setKycNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const priceMap = {
    starter: 499,
    growth: 1250,
    enterprise: 3500,
  };

  const currentPrice = selectedNumber ? selectedNumber.monthlyPrice : priceMap[selectedPlan];

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-purple-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1 & 2 HEADER */}
        {step !== 3 && (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
              <span>Instant 2-Minute Activation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {step === 1 ? 'Configure Your Indian Virtual Number' : 'Instant TRAI KYC & Activation'}
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              {step === 1
                ? 'Review number features and select your billing period'
                : 'Upload basic GST/Aadhaar details for instant telecom compliance'}
            </p>
          </div>
        )}

        {/* STEP 1: CONFIGURATION */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Number Card */}
            <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-4 text-center space-y-1">
              <div className="text-[10px] text-purple-800 font-extrabold uppercase">Assigned Virtual Number Line</div>
              <div className="text-2xl font-black font-mono text-gray-900">
                {selectedNumber ? selectedNumber.displayFormat : '+91 (080) 4988 7700 (Bengaluru)'}
              </div>
              <div className="text-xs text-purple-900 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                <span>100% Call Masking & Auto Recording Included</span>
              </div>
            </div>

            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Choose Plan Tier:</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('starter')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    selectedPlan === 'starter'
                      ? 'bg-purple-100 border-purple-400 text-purple-900 ring-2 ring-purple-200'
                      : 'bg-white border-purple-100 text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <div className="text-xs font-bold">Starter</div>
                  <div className="text-sm font-mono font-black text-gray-900">â‚¹499<span className="text-[10px] text-gray-500"> +GST</span></div>
                  <div className="text-[10px] text-purple-800 font-bold">1 Number â€¢ 100 Free Mins/mo</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('growth')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    selectedPlan === 'growth'
                      ? 'bg-purple-100 border-purple-400 text-purple-900 ring-2 ring-purple-200'
                      : 'bg-white border-purple-100 text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <div className="text-xs font-black text-purple-800">Growth â˜…</div>
                  <div className="text-sm font-mono font-black text-gray-900">â‚¹1,250<span className="text-[10px] text-gray-500"> +GST</span></div>
                  <div className="text-[10px] text-purple-800 font-bold">3 Numbers</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('enterprise')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    selectedPlan === 'enterprise'
                      ? 'bg-purple-100 border-purple-400 text-purple-900 ring-2 ring-purple-200'
                      : 'bg-white border-purple-100 text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <div className="text-xs font-bold">Enterprise</div>
                  <div className="text-sm font-mono font-black text-gray-900">â‚¹3,500<span className="text-[10px] text-gray-500"> +GST</span></div>
                  <div className="text-[10px] text-purple-800 font-bold">10 Numbers</div>
                </button>
              </div>
            </div>

            {/* Included Protections */}
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 text-xs space-y-1.5 text-gray-700">
              <div className="flex items-center gap-2 text-purple-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Call Masking Enabled: Personal Number stays hidden</span>
              </div>
              <div className="flex items-center gap-2 text-purple-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Auto Call Recording: MP3 files stored in SellersLogin Cloud</span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep(2)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Proceed to Instant 2-Min KYC <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: INSTANT KYC */}
        {step === 2 && (
          <form onSubmit={handleCompletePurchase} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Seller / Business Name:</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. TechCraze Retail / Rahul Sharma"
                className="w-full bg-purple-50/50 border border-purple-200 text-xs text-gray-900 p-3 rounded-xl outline-none focus:border-purple-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Forwarding Personal Mobile Number:</label>
              <input
                type="tel"
                required
                value={forwardingNumber}
                onChange={(e) => setForwardingNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-purple-50/50 border border-purple-200 text-xs text-gray-900 p-3 rounded-xl outline-none focus:border-purple-500 font-medium"
              />
              <span className="text-[10px] text-gray-500">Incoming calls on virtual number will forward to this phone securely.</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">KYC Verification Doc:</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setKycDocumentType('gst')}
                  className={`flex-1 p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                    kycDocumentType === 'gst' ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-white border-purple-100 text-gray-500'
                  }`}
                >
                  GSTIN Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setKycDocumentType('aadhaar')}
                  className={`flex-1 p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                    kycDocumentType === 'aadhaar' ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-white border-purple-100 text-gray-500'
                  }`}
                >
                  Aadhaar Card
                </button>
              </div>
              <input
                type="text"
                required
                value={kycNumber}
                onChange={(e) => setKycNumber(e.target.value)}
                placeholder={kycDocumentType === 'gst' ? 'e.g. 07AAAAA0000A1Z5' : 'e.g. 1234 5678 9012'}
                className="w-full bg-purple-50/50 border border-purple-200 text-xs text-gray-900 p-3 rounded-xl outline-none focus:border-purple-500 font-mono mt-1 font-medium"
              />
            </div>

            {/* Price Summary */}
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 flex items-center justify-between text-xs font-bold">
              <span className="text-gray-700">Total Monthly Price:</span>
              <span className="text-purple-900 font-mono text-base font-black">â‚¹{currentPrice} + GST</span>
            </div>

            {/* Submit Action */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-100 text-gray-700 text-xs py-3 rounded-xl font-bold cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-2/3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm py-3.5 rounded-2xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Activating Virtual Number...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" /> Activate & Pay â‚¹{currentPrice} + GST
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900">Virtual Number Activated!</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto font-medium">
              Your Indian Virtual Number is now 100% active on SellersLogin. Call Masking shield & HD Audio Recording are enabled.
            </p>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-300 font-mono text-xl text-purple-900 font-black">
              {selectedNumber ? selectedNumber.displayFormat : '+91 (080) 4988 7700'}
            </div>

            <button
              onClick={() => {
                onClose();
                onSuccess();
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              Open SellersLogin Client Dashboard Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


