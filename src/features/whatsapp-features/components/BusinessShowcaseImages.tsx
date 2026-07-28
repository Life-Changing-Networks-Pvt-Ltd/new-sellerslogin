import React, { useState } from 'react';
import { 
  Store, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Factory, 
  Plane, 
  Stethoscope, 
  Building, 
  GraduationCap, 
  Wrench, 
  ShoppingBag,
  Briefcase,
  Hotel
} from 'lucide-react';

interface BusinessShowcaseImagesProps {
  onOpenLeadModal: () => void;
}

export const BusinessShowcaseImages: React.FC<BusinessShowcaseImagesProps> = ({ onOpenLeadModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const businessCases = [
    {
      id: 'manufacturers',
      category: 'manufacturing',
      categoryLabel: 'Manufacturers & B2B',
      title: 'Manufacturers & B2B Wholesalers',
      subtitle: 'Broadcast B2B price lists, catalogs & quotation follow-ups',
      description: 'Factory owners & industrial suppliers send bulk product catalog PDFs, bulk price list updates, and automated quotation reminders to distributors and wholesale dealers on WhatsApp.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      badge: 'B2B & Industrial',
      stat: '5x Bulk Quotations',
      icon: Factory,
      features: ['Automated Price List Distribution', 'Instant Quotation Inquiry Button', 'Distributor Order Dispatch Alerts']
    },
    {
      id: 'travel',
      category: 'travel',
      categoryLabel: 'Travel & Tourism',
      title: 'Travel Agents & Tour Operators',
      subtitle: 'Automate tour package itineraries, tickets & flight updates',
      description: 'Travel agencies send customized tour itinerary PDFs, flight ticket vouchers, visa status notifications, and seasonal holiday package broadcasts directly into client WhatsApp inboxes.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
      badge: 'Travel & Tourism',
      stat: '90% Faster Bookings',
      icon: Plane,
      features: ['Instant PDF Voucher Dispatch', 'Automated Flight & Visa Alerts', 'Group Tour Broadcast Campaigns']
    },
    {
      id: 'doctors',
      category: 'healthcare',
      categoryLabel: 'Doctors & Clinics',
      title: 'Doctors, Clinics & Hospitals',
      subtitle: 'Automate appointment bookings, token updates & lab reports',
      description: 'Medical practitioners, dental clinics, and diagnostic labs send automated appointment reminders, OPD queue token numbers, and instant WhatsApp lab report downloads to patients.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      badge: 'Doctors & Healthcare',
      stat: '70% Less No-Shows',
      icon: Stethoscope,
      features: ['Interactive Slot Booking Flows', 'Instant Lab Report PDF Delivery', 'OPD Token Live Updates']
    },
    {
      id: 'realestate',
      category: 'realestate',
      categoryLabel: 'Real Estate',
      title: 'Real Estate Agents & Developers',
      subtitle: 'Book site visits, send 3D virtual tours & payment alerts',
      description: 'Property dealers & builders send prospective buyers 3D walkthrough videos, brochure PDFs, site visit slot confirmations, and installment payment reminders on WhatsApp.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
      badge: 'Real Estate & Properties',
      stat: '4x Site Visit Leads',
      icon: Building,
      features: ['Automated Property Brochure PDF', 'Site Visit Calendar Picker Flow', 'Payment Milestone Reminders']
    },
    {
      id: 'hospitality',
      category: 'hospitality',
      categoryLabel: 'Hotels & Hospitality',
      title: 'Hotels, Resorts & Restaurants',
      subtitle: 'Room booking confirmations, dining menus & guest feedback',
      description: 'Hotels, luxury resorts, cafes, and fine dining venues send instant room reservation vouchers, WhatsApp digital food menus, check-in alerts, and automated guest review requests.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      badge: 'Hotels & Hospitality',
      stat: '80% Direct Bookings',
      icon: Hotel,
      features: ['Instant Reservation Vouchers', 'WhatsApp QR Dining Menu', 'Automated Guest Review Link']
    },
    {
      id: 'institutes',
      category: 'education',
      categoryLabel: 'Institutes & Education',
      title: 'Educational Institutes & Coaching',
      subtitle: 'Admission alerts, fee reminders & exam score updates',
      description: 'Schools, coaching centers, and competitive exam institutes automate student lead admissions, fee payment link notifications, attendance alerts, and test scorecard delivery.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      badge: 'Institutes & Education',
      stat: '3x Higher Admissions',
      icon: GraduationCap,
      features: ['Admission Inquiry WhatsApp Flow', 'Automated Fee Payment Links', 'Student Exam Score Alerts']
    },
    {
      id: 'servicesector',
      category: 'service',
      categoryLabel: 'Service Sector',
      title: 'Service Sector (Salons, Repairs, AMC)',
      subtitle: 'Book appointments, dispatch service invoices & AMC alerts',
      description: 'Beauty salons, AC repair agencies, automobile centers, and professional consultants send automated service reminders, technician booking slots, and AMC renewal alerts on WhatsApp.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      badge: 'Service Industry',
      stat: '85% Repeat Clients',
      icon: Wrench,
      features: ['Automated AMC Renewal Alerts', 'Technician Slot Confirmation', 'Instant WhatsApp Invoicing']
    },
    {
      id: 'retail',
      category: 'retail',
      categoryLabel: 'Retail & Boutiques',
      title: 'Retail Shop & Fashion Boutiques',
      subtitle: 'Instantly share new stock catalogs & automate orders',
      description: 'Retail fashion and boutique owners send bulk catalog broadcasts on WhatsApp, converting inquiries into direct sales with instant payment links and free Sellerslogin website.',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80',
      badge: 'Fashion & Retail',
      stat: '3.5x Sales Growth',
      icon: Store,
      features: ['Free Digital Website Store', 'Bulk Product Catalog Broadcast', 'Instant UPI Payment Links']
    },
    {
      id: 'electronics',
      category: 'retail',
      categoryLabel: 'Electronics & Mobiles',
      title: 'Electronics, Mobiles & Supermarkets',
      subtitle: 'Automate COD order confirmation & warranty updates',
      description: 'Local mobile, appliance and grocery owners eliminate fake orders using automated WhatsApp COD button confirmations, daily re-order alerts, and instant warranty receipts.',
      image: 'https://images.unsplash.com/photo-1556742049-0a670f4a4591?w=800&auto=format&fit=crop&q=80',
      badge: 'Electronics & Supermarket',
      stat: '40% RTO Reduction',
      icon: ShoppingBag,
      features: ['Automated COD Order Verification', 'Digital Warranty Receipts', 'Daily Grocery Re-Orders']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Industries' },
    { id: 'manufacturing', label: 'Manufacturers & B2B' },
    { id: 'travel', label: 'Travel & Tourism' },
    { id: 'healthcare', label: 'Doctors & Clinics' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'hospitality', label: 'Hotels & Resorts' },
    { id: 'education', label: 'Institutes & Colleges' },
    { id: 'service', label: 'Service Sector' },
    { id: 'retail', label: 'Retail & Boutiques' }
  ];

  const filteredCases = activeCategory === 'all' 
    ? businessCases 
    : businessCases.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white border-t border-emerald-100" id="business-solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            <span>Multi-Industry WhatsApp Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tailored for Every Business & Industry Sector
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Whether you are a Manufacturer, Travel Agent, Doctor, Real Estate Developer, Hotelier, Educational Institute, Service Provider, or Retailer â€” Sellers Login powers your WhatsApp growth.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex items-center justify-center gap-2.5 flex-wrap max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200/80 scale-105'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Business Owners Cards Grid with Generous Spacing */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredCases.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-100 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-emerald-400/30">
                      <IconComp className="w-3.5 h-3.5 text-emerald-100" />
                      <span>{item.badge}</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.stat}</span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
                      <h3 className="text-xl font-extrabold text-white leading-snug tracking-tight">{item.title}</h3>
                      <p className="text-xs text-emerald-200 font-medium line-clamp-1">{item.subtitle}</p>
                    </div>
                  </div>

                  {/* Content Body with Generous Gap */}
                  <div className="p-6 space-y-5">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Sector Key Highlights */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      â‚¹699/mo Included
                    </span>

                    <button
                      onClick={onOpenLeadModal}
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
};


