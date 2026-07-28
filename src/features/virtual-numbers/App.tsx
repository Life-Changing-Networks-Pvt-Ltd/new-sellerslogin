"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CallMaskingSimulator } from './components/CallMaskingSimulator';
import { HowItWorks } from './components/HowItWorks';
import { NumberCatalog } from './components/NumberCatalog';
import { PricingCalculator } from './components/PricingCalculator';
import { DashboardPreview } from './components/DashboardPreview';
import { NextjsSeoView } from './components/NextjsSeoView';
import { FaqAndTestimonials } from './components/FaqAndTestimonials';
import { Footer } from './components/Footer';
import { BuyNumberModal } from './components/BuyNumberModal';
import { VirtualNumber } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'seo-view'>('landing');
  const [buyModalOpen, setBuyModalOpen] = useState<boolean>(false);
  const [selectedNumberToBuy, setSelectedNumberToBuy] = useState<VirtualNumber | null>(null);
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('');

  const handleOpenBuyModal = (num?: VirtualNumber | null) => {
    setSelectedNumberToBuy(num || null);
    setBuyModalOpen(true);
  };

  const handleSearchCity = (city: string) => {
    setSelectedCityFilter(city);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-purple-600 selection:text-white flex flex-col">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBuyClick={() => handleOpenBuyModal()}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <div className="space-y-0">
            {/* 1. Hero Section */}
            <HeroSection
              onSearchCity={handleSearchCity}
              onBuyNumber={(numId) => handleOpenBuyModal(null)}
              onOpenDashboard={() => setActiveTab('dashboard')}
            />

            {/* 2. Interactive Call Masking Simulator */}
            <CallMaskingSimulator />

            {/* 3. 4-Step Process: How It Works */}
            <HowItWorks
              onBuyClick={() => handleOpenBuyModal()}
              onOpenDashboard={() => setActiveTab('dashboard')}
            />

            {/* 4. Live Virtual Number Catalog & Search */}
            <NumberCatalog
              onSelectNumberToBuy={(vn) => handleOpenBuyModal(vn)}
              selectedCityFilter={selectedCityFilter}
            />

            {/* 5. Pricing Calculator */}
            <PricingCalculator
              onSelectPlan={(planId) => handleOpenBuyModal()}
            />

            {/* 6. Testimonials & FAQs */}
            <FaqAndTestimonials />
          </div>
        )}

        {/* Live Client Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <DashboardPreview
            onBuyMoreNumbers={() => handleOpenBuyModal()}
          />
        )}

        {/* Next.js SEO & Architecture Specs Tab */}
        {activeTab === 'seo-view' && (
          <NextjsSeoView />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onBuyClick={() => handleOpenBuyModal()}
      />

      {/* Buy / Checkout Modal */}
      <BuyNumberModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        selectedNumber={selectedNumberToBuy}
        onSuccess={() => setActiveTab('dashboard')}
      />
    </div>
  );
}


