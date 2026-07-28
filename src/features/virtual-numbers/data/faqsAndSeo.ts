import { PricingPlan, FAQItem, Testimonial } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Seller',
    tagline: 'Ideal for small e-commerce sellers & individual store owners',
    pricePerMonth: 499,
    yearlyDiscountPrice: 399,
    includedMinutes: 100,
    callMaskingIncluded: true,
    callRecordingStorageDays: 30,
    maxVirtualNumbers: 1,
    features: [
      '1 Indian Virtual Number (100 Free Mins/month)',
      '100% Call Masking Protection',
      'Automatic Call Recording (30 Days Cloud)',
      'SellersLogin Web & Mobile Dashboard',
      'Forwarding to 2 Personal Numbers',
      'Instant 2-Minute Aadhaar/GST KYC',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Business',
    tagline: 'Most popular for active Amazon, Flipkart & Meesho sellers',
    pricePerMonth: 1250,
    yearlyDiscountPrice: 999,
    includedMinutes: 300,
    callMaskingIncluded: true,
    callRecordingStorageDays: 90,
    maxVirtualNumbers: 3,
    popular: true,
    features: [
      'Choice of 3 Indian Virtual Numbers or 1800 Toll-Free',
      'Full Call Masking (Seller & Buyer Privacy)',
      'Automatic HD Call Recording (90 Days Cloud)',
      'Interactive Smart IVR Welcome Greeting',
      'Forwarding to 10 Agent Numbers',
      'Real-time Call Analytics & CSV Export',
      'WhatsApp Order Confirmation Integration',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise CRM',
    tagline: 'For large sellers, tele-calling teams & brand distributors',
    pricePerMonth: 3500,
    yearlyDiscountPrice: 2800,
    includedMinutes: 1000,
    callMaskingIncluded: true,
    callRecordingStorageDays: 365,
    maxVirtualNumbers: 10,
    features: [
      'Up to 10 Indian Virtual / VIP Numbers',
      'Advanced Call Masking API & Webhooks',
      '1-Year Unlimited Call Recording Storage',
      'Multi-Level IVR & Call Routing Queues',
      'Dedicated SellersLogin Account Manager',
      'Custom CRM / Shopify / API Integration',
      'TRAI Priority KYC Approval (<1 hr)',
    ],
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does Call Masking protect my personal phone number?',
    answer: 'With SellersLogin Call Masking, when you dial or receive calls from customers, your real personal mobile number is never displayed. Instead, a temporary or fixed Indian Virtual Proxy Number is shown. This prevents customers from saving or leaking your personal contact number into spam databases or public domain.',
    category: 'Call Masking',
  },
  {
    question: 'How are call recordings saved and accessed?',
    answer: 'All calls made or received through your SellersLogin Virtual Number are automatically recorded in high-definition audio. They are encrypted and stored safely in your SellersLogin Client Dashboard where you can play back, download MP3 files, or review transcripts at any time.',
    category: 'Call Recording',
  },
  {
    question: 'What documents are required to buy an Indian Virtual Number?',
    answer: 'In compliance with TRAI (Telecom Regulatory Authority of India) guidelines, you only need basic identity proof. For individuals/sole proprietors: Aadhaar card or PAN card. For registered businesses: GST Certificate or Company Incorporation Certificate. Verification takes less than 2 minutes online!',
    category: 'KYC & TRAI',
  },
  {
    question: 'Can I select a specific city landline number (like Delhi 011 or Mumbai 022)?',
    answer: 'Yes! SellersLogin provides local virtual landline numbers for all major Indian cities including Delhi (011), Mumbai (022), Bengaluru (080), Hyderabad (040), Pune (020), Chennai (044), Kolkata (033), and Ahmedabad (079), as well as Pan-India 1800 Toll-Free numbers.',
    category: 'Billing & Setup',
  },
  {
    question: 'Why is SellersLogin virtual number ideal for Amazon/Flipkart/E-commerce sellers?',
    answer: 'E-commerce delivery verification and buyer customer service require frequent calling. Exposing personal numbers leads to late-night customer calls, spam, and competitor harassment. SellersLogin provides a dedicated virtual line with full masking, call logs, and recording audit for dispute resolution.',
    category: 'Call Masking',
  },
  {
    question: 'How fast will my virtual number activate after purchase?',
    answer: 'Instant activation! As soon as your instant KYC document (Aadhaar or GST) is uploaded, your chosen Indian virtual number is activated within 2 to 5 minutes, and you can start placing calls directly from the SellersLogin dashboard or forwarding to your mobile phone.',
    category: 'Billing & Setup',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikram Sethi',
    role: 'Top Amazon Electronics Seller',
    company: 'TechCraze Retail Pvt Ltd',
    location: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'SellersLogin Indian Virtual Number solved our biggest pain pointâ€”customers calling our personal mobile numbers at midnight! Now with Call Masking and Auto Recording, our team handles order checks professionally from 9 AM to 7 PM.',
    virtualNumberUsed: '+91 (011) 4988 7700',
    sellerCategory: 'Amazon Seller (Delhi)',
  },
  {
    id: 't-2',
    name: 'Ananya Deshmukh',
    role: 'Founder & Fashion Seller',
    company: 'UrbanStyle Studio',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The call recording feature is a lifesaver for COD order confirmation! When a buyer claims they did not confirm the shipment, we listen to the call recording in our SellersLogin dashboard and resolve courier claims instantly.',
    virtualNumberUsed: '+91 (022) 6788 9900',
    sellerCategory: 'Shopify & Meesho Seller',
  },
  {
    id: 't-3',
    name: 'Rajesh K. Kulkarni',
    role: 'Operations Head',
    company: 'OmniTrade India',
    location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'We purchased a 1800 Toll-Free and 2 Bangalore virtual landline numbers for our 12 tele-callers. The call masking ensures our agent personal numbers stay private while giving buyers a highly trustworthy corporate brand image.',
    virtualNumberUsed: '1800-200-8899',
    sellerCategory: 'Multi-Channel Seller',
  },
];

export const NEXTJS_SEO_PAGE_CODE = `// app/buy-indian-virtual-number/page.tsx
import { Metadata } from 'next';
import { VirtualNumberCatalog } from '@/components/VirtualNumberCatalog';
import { DashboardPreview } from '@/components/DashboardPreview';
import { CallMaskingSimulator } from '@/components/CallMaskingSimulator';

export const metadata: Metadata = {
  title: 'Buy Indian Virtual Number with Call Masking & Recording | SellersLogin',
  description: 'Get Indian Virtual Numbers (+91 Landline, Mobile, 1800 Toll-Free) with 100% Call Masking, Automatic Call Recording, and SellersLogin Client Dashboard. Protect your personal number from spam market exposure.',
  keywords: [
    'buy Indian virtual number',
    'SellersLogin virtual number',
    'call masking India',
    'virtual number with call recording',
    'virtual landline Delhi Mumbai Bangalore',
    'Amazon seller virtual number',
    '1800 toll free number India',
    'protect personal phone number sellers'
  ],
  alternates: {
    canonical: 'https://www.sellerslogin.com/buy-indian-virtual-number',
  },
  openGraph: {
    title: 'Buy Indian Virtual Number | SellersLogin Call Masking & Recording',
    description: 'Instant 2-minute activation for Indian Virtual Numbers. Call Masking shield + Auto Call Recording + Web Dashboard.',
    url: 'https://www.sellerslogin.com/buy-indian-virtual-number',
    siteName: 'SellersLogin',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function BuyVirtualNumberPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      {/* Schema Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "SellersLogin Indian Virtual Number with Call Masking",
            "image": "https://www.sellerslogin.com/og-virtual-number.jpg",
            "description": "Indian Virtual Phone Numbers for e-commerce sellers with call masking and automatic recording.",
            "brand": {
              "@type": "Brand",
              "name": "SellersLogin"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "499",
              "highPrice": "2499",
              "offerCount": "100+"
            }
          })
        }}
      />
      {/* Render Virtual Number Hero, Call Masking & Dashboard Components */}
    </main>
  );
}
`;


