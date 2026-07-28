"use client";

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureShowcase } from './components/FeatureShowcase';
import { BusinessShowcaseImages } from './components/BusinessShowcaseImages';
import { PricingCalculator } from './components/PricingCalculator';
import { BusinessTools } from './components/BusinessTools';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { FloatingCalculator } from './components/FloatingCalculator';

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Page Sections */}
      <main>
        {/* Hero Banner with WhatsApp Mobile App Preview */}
        <Hero 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* Real Retail & Business Owners Showcase Images */}
        <BusinessShowcaseImages 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* Feature Showcase & Interactive Simulator */}
        <FeatureShowcase 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* Interactive Pricing & Plan Calculator */}
        <PricingCalculator 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* E-Commerce & Business Automation Tools */}
        <BusinessTools 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection 
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Account Activation Modal */}
      <LeadModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      {/* Sticky Right-Side Floating Calculator */}
      <FloatingCalculator 
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

    </div>
  );
}


