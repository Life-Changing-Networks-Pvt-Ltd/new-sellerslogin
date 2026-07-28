export type NumberType = 'mobile' | 'landline' | 'tollfree' | 'vip';

export interface VirtualNumber {
  id: string;
  phoneNumber: string;
  displayFormat: string;
  type: NumberType;
  state: string;
  city: string;
  stdCode?: string;
  monthlyPrice: number;
  setupFee: number;
  features: string[];
  isPopular?: boolean;
  isAvailable: boolean;
  vanityScore?: number; // 1-10
}

export interface CallLog {
  id: string;
  virtualNumber: string;
  customerNumberMasked: string;
  customerNumberReal: string;
  direction: 'incoming' | 'outgoing';
  durationSeconds: number;
  timestamp: string;
  recordingUrl: string;
  hasRecording: boolean;
  isMasked: boolean;
  status: 'completed' | 'missed' | 'busy' | 'rejected';
  agentName: string;
  tags: string[];
  notes?: string;
  audioWaveform: number[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  pricePerMonth: number;
  yearlyDiscountPrice: number;
  includedMinutes: number;
  callMaskingIncluded: boolean;
  callRecordingStorageDays: number;
  maxVirtualNumbers: number;
  popular?: boolean;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'KYC & TRAI' | 'Call Masking' | 'Call Recording' | 'Billing & Setup';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  virtualNumberUsed: string;
  sellerCategory: string;
}


