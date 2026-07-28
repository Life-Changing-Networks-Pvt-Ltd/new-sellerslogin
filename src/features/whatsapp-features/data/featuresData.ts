import { FeatureItem, TemplatePreset, BusinessFeature, FaqItem } from '../types';

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'drip-campaigns',
    title: 'Drip Campaigns & Sequence Automation',
    shortDesc: 'Automate multi-day follow-up messaging sequences triggered by user actions, lead status, or time delays.',
    fullDesc: 'Design automated multi-step messaging journeys that nurture retail customers and online leads on autopilot. Set custom delays, conditional triggers, and dynamic variable tags to deliver the right message at the perfect moment on WhatsApp.',
    iconName: 'GitMerge',
    tag: 'Automated Journey',
    highlights: [
      'Multi-day timed delays (e.g. Day 1 Welcome, Day 3 Special Offer, Day 7 Reminders)',
      'Trigger-based branching based on customer replies or button clicks',
      'Personalized message variables (Customer Name, Order Details, Discount Code)',
      'Automatic tagging & contact status updates directly in dashboard'
    ],
    graphicType: 'drip'
  },
  {
    id: 'broadcast-messaging',
    title: 'High-Volume Broadcast Campaigns',
    shortDesc: 'Send targeted broadcast campaigns to thousands of opted-in customers with 98% open rates.',
    fullDesc: 'Reach your entire audience or targeted customer lists instantly. Schedule promotional broadcast messages with anti-ban smart delay algorithms, variable tags, and real-time delivery tracking.',
    iconName: 'Send',
    tag: 'Mass Outreach',
    highlights: [
      'Schedule campaigns for peak customer engagement times',
      'Segment contacts by past orders, location, tags, or custom attributes',
      'Real-time delivery, open, and button-click tracking dashboard',
      'Smart pacing engine to maintain high Meta quality rating'
    ],
    graphicType: 'broadcast'
  },
  {
    id: 'cart-automation',
    title: 'E-Commerce Cart Automation & Order Recovery',
    shortDesc: 'Automatically recover abandoned carts, send COD confirmations, and dispatch instant order updates on WhatsApp.',
    fullDesc: 'Recover up to 35% of lost revenue with automated WhatsApp cart recovery for your online store or website. Send instant interactive messages with checkout buttons, discount coupons, and automated COD verification to minimize RTO losses.',
    iconName: 'ShoppingCart',
    tag: 'Revenue Booster',
    highlights: [
      '1-Click automated abandoned cart recovery alerts',
      'Interactive Checkout & Discount coupon action buttons',
      'Automated COD order verification to cut RTO charges by 40%',
      'Instant sync with Sellerslogin Store & any custom business website'
    ],
    graphicType: 'cart'
  },
  {
    id: 'advance-analytics',
    title: 'WhatsApp Advance Analytics & ROI Reports',
    shortDesc: 'Track real-time campaign performance, conversion rates, link clickthroughs, and message ROI.',
    fullDesc: 'Get comprehensive deep-dive reporting on all your WhatsApp campaigns. Analyze message delivery speed, read receipts, button CTRs, agent SLA response speeds, and generated revenue metrics.',
    iconName: 'BarChart3',
    tag: 'Real-Time Insights',
    highlights: [
      'Detailed delivery, read, and click-through rate (CTR) graphs',
      'Campaign-level sales revenue attribution & conversion tracking',
      'Agent performance metrics, average reply time & SLA analytics',
      'Downloadable CSV & PDF analytical reports for business auditing'
    ],
    graphicType: 'analytics'
  },
  {
    id: 'sellerslogin-website',
    title: 'Free Sellerslogin Business Website (Any Business)',
    shortDesc: 'Get a full digital store & business website for any retail shop or service included 100% free inside the dashboard.',
    fullDesc: 'No need for expensive external website builders like Shopify! Sellerslogin gives you a complete, high-converting digital catalog & website for ANY retail shop, local store, or business for free directly from your WhatsApp API dashboard.',
    iconName: 'Globe',
    tag: 'Included Free â‚¹0',
    highlights: [
      'Instant e-commerce store & website builder for any retail or service business',
      'Zero monthly hosting or platform fees (100% free inside dashboard)',
      'Integrated WhatsApp checkout, product catalog, & payment links',
      'Custom domain support, online inventory management & instant WhatsApp orders'
    ],
    graphicType: 'website'
  },
  {
    id: 'whatsapp-blue-tick',
    title: 'WhatsApp Official Blue Tick Verification',
    shortDesc: 'Build instant brand trust with Meta\'s official Blue Verified Badge next to your business name.',
    fullDesc: 'Stand out from competitors and establish 100% authenticity. Sellers Login provides end-to-end guidance and direct Meta application submission assistance to help eligible businesses obtain the official WhatsApp Blue Tick badge.',
    iconName: 'BadgeCheck',
    tag: 'Brand Trust',
    highlights: [
      'Official Meta Blue Verification assistance & documentation check',
      'Display official verified badge next to your business name on WhatsApp',
      'Higher message trust, open rates, and customer reply rates',
      'Complete hands-on application support from Sellers Login team'
    ],
    graphicType: 'bluetick'
  },
  {
    id: 'whatsapp-flows',
    title: 'Native WhatsApp Flows (In-App Forms)',
    shortDesc: 'Build rich native interactive forms inside WhatsApp without opening external browsers or websites.',
    fullDesc: 'Collect customer feedback, conduct surveys, book appointments, or take product custom orders directly inside the WhatsApp chat screen using Meta\'s native interactive UI flows.',
    iconName: 'Layers',
    tag: 'Zero Drop-off Forms',
    highlights: [
      'Multi-screen interactive forms & step-by-step pickers',
      'Instant input validation (Phone, Email, Date, Dropdowns)',
      '3x higher form completion rate compared to external web links',
      'Direct data export to your CRM or Google Sheets'
    ],
    graphicType: 'flow'
  },
  {
    id: 'shared-inbox',
    title: 'Multi-Agent Shared Team Inbox',
    shortDesc: 'Enable your entire support team to manage customer conversations from a single official phone number.',
    fullDesc: 'Eliminate duplicate replies and missed messages. Assign chats to specific team members, leave internal private notes, apply tags, and track agent response times with SLA dashboards.',
    iconName: 'Users',
    tag: 'Team Collaboration',
    highlights: [
      'Unlimited agent seats under one central WhatsApp Business API number',
      'Internal team notes & mention tags visible only to support staff',
      'Role-based permissions (Admin, Agent, Manager views)',
      'Detailed agent activity, response speed, and resolution metrics'
    ],
    graphicType: 'inbox'
  }
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'tpl-1',
    category: 'Marketing',
    title: 'Flash Sale & Special Discount Offer',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Hey {{1}}! ðŸŽ‰ Exclusive Flash Sale is now LIVE on Sellers Login! Get up to 50% OFF on all items. Use code: FLASH50 at checkout.',
    footerText: 'Sellers Login Official Verified WhatsApp',
    costPerMsg: 0.99,
    buttons: [
      { type: 'URL', text: 'Shop Now ðŸ›ï¸', value: 'https://sellerslogin.com/shop' },
      { type: 'QUICK_REPLY', text: 'Claim Coupon' }
    ]
  },
  {
    id: 'tpl-2',
    category: 'E-commerce',
    title: 'Abandoned Cart Recovery with Discount',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Hi {{1}}, you left items in your cart! ðŸ›’ Complete your purchase on your Sellerslogin store now and enjoy 10% OFF with code CART10.',
    footerText: 'Sellers Login Automated Cart Recovery',
    costPerMsg: 0.99,
    buttons: [
      { type: 'URL', text: 'Complete Checkout ðŸ›’', value: 'https://sellerslogin.com/cart' },
      { type: 'QUICK_REPLY', text: 'Get Help' }
    ]
  },
  {
    id: 'tpl-3',
    category: 'Manufacturing',
    title: 'B2B Wholesale Catalog & Quotation Alert',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Dear {{1}}, our new {{2}} industrial product catalog for bulk buyers is ready! Download the wholesale price list or request an instant quotation.',
    footerText: 'Factory Direct Wholesale Updates',
    costPerMsg: 0.99,
    buttons: [
      { type: 'URL', text: 'Download Price List ðŸ“„', value: 'https://sellerslogin.com/b2b-catalog' },
      { type: 'QUICK_REPLY', text: 'Request Quote' }
    ]
  },
  {
    id: 'tpl-4',
    category: 'Travel & Tourism',
    title: 'Holiday Tour Package & Flight Booking',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Hello {{1}}! âœˆï¸ Your upcoming {{2}} Tour Package is confirmed! Booking Ref: {{3}}. View your complete day-by-day itinerary and voucher below.',
    footerText: 'Verified Travel Agent Portal',
    costPerMsg: 0.16,
    buttons: [
      { type: 'URL', text: 'View Itinerary ðŸ—ºï¸', value: 'https://sellerslogin.com/travel' },
      { type: 'PHONE_NUMBER', text: 'Call Travel Agent', value: '+919876543210' }
    ]
  },
  {
    id: 'tpl-5',
    category: 'Healthcare & Doctors',
    title: 'Doctor Appointment & OPD Token Confirmation',
    headerType: 'TEXT',
    bodyText: 'Dear {{1}}, your appointment with Dr. {{2}} is confirmed for {{3}} at 10:30 AM. Token Number: #{{4}}. Please arrive 10 mins before slot.',
    footerText: 'Healthcare Clinic Appointment System',
    costPerMsg: 0.16,
    buttons: [
      { type: 'QUICK_REPLY', text: 'Confirm Arrival' },
      { type: 'QUICK_REPLY', text: 'Reschedule Slot' }
    ]
  },
  {
    id: 'tpl-6',
    category: 'Real Estate',
    title: 'Property Site Visit Invitation & Virtual Tour',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Hi {{1}}, new Luxury 3BHK project launch in {{2}}! ðŸ¡ Book a free site visit this weekend and get exclusive pre-launch discounts.',
    footerText: 'Verified Real Estate Developers',
    costPerMsg: 0.99,
    buttons: [
      { type: 'URL', text: 'Book Site Visit ðŸš—', value: 'https://sellerslogin.com/realestate' },
      { type: 'QUICK_REPLY', text: 'Get Brochure PDF' }
    ]
  },
  {
    id: 'tpl-7',
    category: 'Institutes & Education',
    title: 'Admission Alert & Fee Payment Reminder',
    headerType: 'TEXT',
    bodyText: 'Dear Student {{1}}, Admissions for {{2}} session are now OPEN! Last date to submit your application form is {{3}}. Click to apply online.',
    footerText: 'Institute Student Relations Cell',
    costPerMsg: 0.16,
    buttons: [
      { type: 'URL', text: 'Apply Online ðŸŽ“', value: 'https://sellerslogin.com/admissions' },
      { type: 'QUICK_REPLY', text: 'Request Call Back' }
    ]
  },
  {
    id: 'tpl-8',
    category: 'Service Sector',
    title: 'Service Booking & Annual Maintenance (AMC)',
    headerType: 'TEXT',
    bodyText: 'Hello {{1}}, your annual AMC service for {{2}} is due on {{3}}. Schedule your expert technician visit at your preferred time slot.',
    footerText: 'Official Customer Service Team',
    costPerMsg: 0.16,
    buttons: [
      { type: 'URL', text: 'Book Technician ðŸ”§', value: 'https://sellerslogin.com/service' },
      { type: 'QUICK_REPLY', text: 'Remind Next Month' }
    ]
  },
  {
    id: 'tpl-9',
    category: 'Hotels & Hospitality',
    title: 'Hotel Room Booking & Menu Confirmation',
    headerType: 'IMAGE',
    headerMediaUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    bodyText: 'Dear {{1}}, your booking at {{2}} Resort is confirmed for {{3}}! ðŸ¨ Room Type: {{4}}. Click below to view your digital voucher or order room dining.',
    footerText: 'Resort & Hotel Concierge Portal',
    costPerMsg: 0.16,
    buttons: [
      { type: 'URL', text: 'View Voucher ðŸ“„', value: 'https://sellerslogin.com/hotel-booking' },
      { type: 'QUICK_REPLY', text: 'View Food Menu' }
    ]
  }
];

export const BUSINESS_FEATURES: BusinessFeature[] = [
  {
    title: 'Free Sellerslogin Website Builder',
    description: 'Get a full e-commerce store & website for any retail or service business created for free directly from your dashboard.',
    icon: 'Globe',
    metric: 'Free â‚¹0 / Month'
  },
  {
    title: 'WhatsApp Official Blue Tick',
    description: 'Full guidance and direct Meta application assistance to get the official Blue Verification badge next to your brand name.',
    icon: 'BadgeCheck',
    metric: 'Official Verification'
  },
  {
    title: 'WhatsApp Advance Analytics',
    description: 'Track campaign open rates, link clickthroughs, sales revenue conversion, and agent reply SLA metrics in real-time.',
    icon: 'BarChart3',
    metric: 'Real-Time ROI Reports'
  },
  {
    title: 'E-Commerce Cart Recovery',
    description: 'Trigger automated cart abandonment alerts on WhatsApp with instant discount buttons to convert lost store visitors.',
    icon: 'ShoppingCart',
    metric: 'Up to 35% Recovery'
  },
  {
    title: 'Automated COD Confirmation',
    description: 'Verify Cash-on-Delivery orders automatically via WhatsApp button clicks to eliminate fake orders and lower RTO charges by 40%.',
    icon: 'ShieldCheck',
    metric: '40% Less RTO'
  },
  {
    title: 'Multi-Agent Shared Team Inbox',
    description: 'Route customer inquiries to unlimited support agents under 1 central WhatsApp number with agent SLA assignment.',
    icon: 'Users',
    metric: 'Unlimited Seats'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does Sellers Login compare with AiSensy, Wati, or Interakt?',
    answer: 'Sellers Login offers a complete WhatsApp Business API dashboard starting at â‚¹799/month (or â‚¹1,999 quarterly), whereas AiSensy and Wati charge high subscription fees ranging from â‚¹2,500 to â‚¹5,000+ per month plus extra setup charges. In addition, Sellers Login operates on a Pay As You Use model with zero mandatory wallet lock-ins, a 100% free Sellerslogin business website builder, WhatsApp Blue Tick assistance, and Advance Analytics.',
    category: 'Comparison & Value'
  },
  {
    question: 'What is the pricing for Sellers Login WhatsApp Dashboard?',
    answer: 'You can choose between Monthly (â‚¹799/month) or Quarterly (â‚¹1,999/quarter - saving ~17%). Both plans give you full access to all features including Drip campaigns, Mass Broadcasts, Free Business Website Builder, WhatsApp Advance Analytics, WhatsApp Blue Tick Support, E-commerce Cart Automation, and Team Inbox.',
    category: 'Pricing & Plan'
  },
  {
    question: 'What are the message charges on Sellers Login?',
    answer: 'We follow a Pay As You Use model at official Meta rates with zero markups: Marketing Messages cost â‚¹0.99 (99 paisa) per message, and Utility & OTP Messages cost â‚¹0.16 (16 paisa) per message. You only pay for what you send.',
    category: 'Messaging Cost'
  },
  {
    question: 'Do I get a Free Website for my business?',
    answer: 'Yes! Unlike other platforms that force you to buy expensive store platforms, Sellers Login includes a complete Sellerslogin Business Website & Online Store builder for any business (retail shop, clothing, electronics, grocery, services) 100% free directly inside your dashboard!',
    category: 'Free Website Builder'
  },
  {
    question: 'Can I get Meta\'s Official Blue Tick badge on WhatsApp?',
    answer: 'Yes! Sellers Login provides end-to-end guidance and official Meta verification support to help your business get the official Blue Verified badge next to your brand name on WhatsApp.',
    category: 'WhatsApp Blue Tick'
  },
  {
    question: 'Is there any minimum wallet recharge required?',
    answer: 'No! There is no mandatory wallet recharge. We operate on a flexible Pay As You Use model, giving you complete freedom to scale your WhatsApp marketing as your business grows.',
    category: 'Pay As You Use'
  }
];


