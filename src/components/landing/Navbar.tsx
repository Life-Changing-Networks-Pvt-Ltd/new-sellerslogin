"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { featureDropdown, solutionsDropdown, automationDropdown, industriesDropdown } from "@/data/landing";
import { LandingIcon } from "@/components/icons/LandingIcon";
import type { LandingIconName } from "@/components/icons/LandingIcon";
import { NEXT_PUBLIC_ADMIN_APP_URL } from "@/config/variables";

type DropdownItem = {
  href: string;
  icon: LandingIconName;
  label: string;
};

function MobileDropdown({
  isOpen,
  toggle,
  title,
  items,
  onNavigate,
}: {
  isOpen: boolean;
  toggle: () => void;
  title: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full"
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-3 space-y-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 py-2 px-3 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 no-underline transition-colors"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 shrink-0">
                <LandingIcon name={item.icon} size={16} />
              </div>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledState, setScrolledState] = useState(false);
  const [mobileFeatureOpen, setMobileFeatureOpen] = useState(false);
  const [mobileSolutionOpen, setMobileSolutionOpen] = useState(false);
  const [mobileAutomationOpen, setMobileAutomationOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const pathname = usePathname();
  const scrolled = scrolledState || pathname !== '/';
  const adminSignInUrl = NEXT_PUBLIC_ADMIN_APP_URL || "/sign-in";

  useEffect(() => {
    const handleScroll = () => setScrolledState(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topLinkClass = `flex items-center text-sm font-medium whitespace-nowrap no-underline py-2 px-2.5 xl:px-3 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
    scrolled
      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
      : "text-white/90 hover:text-white hover:bg-white/10"
  }`;

  const renderDesktopDropdown = (items: DropdownItem[]) =>
    items.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className="flex items-center gap-2.5 py-2.5 px-3 rounded-full text-gray-700 hover:text-gray-900 no-underline text-sm font-medium transition-colors duration-150 hover:bg-gray-50 whitespace-nowrap"
      >
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 shrink-0">
          <LandingIcon name={item.icon} size={16} />
        </div>
        {item.label}
      </Link>
    ));

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? "top-4 left-1/2 -translate-x-1/2 max-w-6xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/40 px-4"
          : "top-0 bg-transparent text-white px-4"
      }`}
    >
      <div className={`${scrolled ? "" : "max-w-7xl mx-auto"}`}>
        <div className="flex items-center justify-between h-16">
          <Link
            href="/#hero"
            className={`text-lg font-bold no-underline flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-full transition-colors duration-200 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <div className="relative w-8 h-8">
              <Image src="/sellerslogin-logo (1).svg" alt="Sellers Login Logo" fill sizes="32px" className="object-contain" />
            </div>
            <span>Sellers Login</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 list-none">
            <li>
              <Link href="/#hero" className={topLinkClass}>
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link href="/#features" className={`${topLinkClass} cursor-pointer`}>
                Features <span className="ml-1 text-[10px]">v</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl p-2 min-w-[240px] shadow-lg">
                  {renderDesktopDropdown(featureDropdown)}
                </div>
              </div>
            </li>
            <li className="relative group">
              <Link href="/#why" className={`${topLinkClass} cursor-pointer`}>
                Solutions <span className="ml-1 text-[10px]">v</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl p-2 min-w-[240px] shadow-lg">
                  {renderDesktopDropdown(solutionsDropdown)}
                </div>
              </div>
            </li>
            <li className="relative group">
              <Link href="/#automation" className={`${topLinkClass} cursor-pointer`}>
                Automation <span className="ml-1 text-[10px]">v</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl p-2 min-w-[240px] shadow-lg">
                  {renderDesktopDropdown(automationDropdown)}
                </div>
              </div>
            </li>
            <li className="relative group">
              <Link href="/#industries" className={`${topLinkClass} cursor-pointer`}>
                Industries <span className="ml-1 text-[10px]">v</span>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[650px] shadow-lg">
                  <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                    {renderDesktopDropdown(industriesDropdown)}
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={adminSignInUrl}
              target="_blank" rel="noopener noreferrer"
              className={`text-sm font-medium py-2 px-5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
                scrolled
                  ? "bg-white border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  : "bg-white/50 border border-gray-300 text-black hover:bg-white/80 hover:border-gray-400"
              }`}
            >
              Log In
            </Link>
            <Link
              href="/vendor/registration"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium py-2 px-5 rounded-full border border-purple-300 shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 bg-purple-200 text-black hover:bg-purple-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-lg transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-white border-t border-gray-200 ${
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          <Link
            href="/#hero"
            onClick={() => setMenuOpen(false)}
            className="block py-3 px-4 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 no-underline transition-colors"
          >
            Home
          </Link>

          <MobileDropdown
            isOpen={mobileFeatureOpen}
            toggle={() => setMobileFeatureOpen(!mobileFeatureOpen)}
            title="Features"
            items={featureDropdown}
            onNavigate={() => setMenuOpen(false)}
          />
          <MobileDropdown
            isOpen={mobileSolutionOpen}
            toggle={() => setMobileSolutionOpen(!mobileSolutionOpen)}
            title="Solutions"
            items={solutionsDropdown}
            onNavigate={() => setMenuOpen(false)}
          />
          <MobileDropdown
            isOpen={mobileAutomationOpen}
            toggle={() => setMobileAutomationOpen(!mobileAutomationOpen)}
            title="Automation"
            items={automationDropdown}
            onNavigate={() => setMenuOpen(false)}
          />
          <MobileDropdown
            isOpen={mobileIndustriesOpen}
            toggle={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
            title="Industries"
            items={industriesDropdown}
            onNavigate={() => setMenuOpen(false)}
          />

          <div className="pt-4 pb-2 flex flex-col gap-3">
            <Link
              href={adminSignInUrl}
              target="_blank" rel="noopener noreferrer"
              className="block text-center w-full bg-white border border-gray-300 text-gray-700 text-base font-medium py-2.5 px-5 rounded-full transition-colors duration-200 hover:border-gray-900 hover:text-gray-900 cursor-pointer no-underline"
            >
              Log In
            </Link>
            <Link
              href="/vendor/registration"
              target="_blank" rel="noopener noreferrer"
              className="block text-center w-full bg-purple-200 text-black text-base font-medium py-2.5 px-5 rounded-full border border-purple-300 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-purple-300 active:translate-y-0 cursor-pointer no-underline"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
