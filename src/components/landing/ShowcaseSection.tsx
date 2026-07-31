"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const dashboards = [
  { id: 1, label: "Analytics", aspectRatio: "1913 / 796" },
  { id: 2, label: "Delivery", aspectRatio: "1918 / 877" },
  { id: 3, label: "Payments", aspectRatio: "1916 / 821" },
  { id: 4, label: "E-mail Marketing", aspectRatio: "1919 / 832" },
  { id: 5, label: "Whatsapp Marketing", aspectRatio: "1909 / 882" },
  { id: 6, label: "Voice Marketing", aspectRatio: "1917 / 877" },
];

export function ShowcaseSection() {
  const [activeDashboard, setActiveDashboard] = useState<number>(1);

  const handleTabChange = useCallback((id: number) => {
    setActiveDashboard(id);
  }, []);

  return (
    <section id="features" className="relative py-10 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <header className="text-center mb-6 md:mb-8">
          <div className="reveal inline-flex items-center bg-gray-50 border border-gray-200 text-gray-700 rounded-full py-1.5 px-4 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            Product Tour
          </div>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
            The Most Powerful Dashboard for each Work
          </h2>
        </header>

        {/* Tab Navigation */}
        <div className="reveal reveal-delay-2 flex flex-wrap items-center justify-center gap-2 mb-6 md:mb-8" role="tablist" aria-label="Product dashboards">
          {dashboards.map((tab) => {
            const isActive = activeDashboard === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                  isActive
                    ? "bg-purple-200 text-black border-purple-300 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 cursor-pointer`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="relative max-w-5xl mx-auto reveal reveal-delay-3">
          {dashboards.map((tab) => {
            const isActive = activeDashboard === tab.id;
            return (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                hidden={!isActive}
                className={`tab-panel ${isActive ? "block" : "hidden"}`}
              >
                <div className="bg-purple-200 rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl border border-purple-300">
                  <div
                    className="relative w-full rounded-xl overflow-hidden border border-purple-300 bg-purple-200"
                    style={{ aspectRatio: tab.aspectRatio }}
                  >
                    <Image quality={60}
                      src={`/images/dashboard/d${tab.id}.png`}
                      alt={tab.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={tab.id === 1}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-panel {
          animation: fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}
