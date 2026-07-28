export interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
  highlights: string[];
  graphicType: 'drip' | 'broadcast' | 'flow' | 'cart' | 'template' | 'inbox' | 'analytics' | 'website' | 'bluetick';
}

export interface TemplatePreset {
  id: string;
  category: 'Marketing' | 'Utility' | 'Authentication' | 'E-commerce' | 'Manufacturing' | 'Travel & Tourism' | 'Healthcare & Doctors' | 'Real Estate' | 'Institutes & Education' | 'Service Sector' | string;
  title: string;
  headerType: 'IMAGE' | 'TEXT' | 'NONE';
  headerMediaUrl?: string;
  bodyText: string;
  footerText?: string;
  buttons: {
    type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY';
    text: string;
    value?: string;
  }[];
  costPerMsg: number; // in Rupees
}

export interface BusinessFeature {
  title: string;
  description: string;
  icon: string;
  metric: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  estimatedVolume: string;
  notes?: string;
}


