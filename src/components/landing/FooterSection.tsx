"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ShieldAlert, Truck, Info, Briefcase, LifeBuoy, FileText, Building2 } from "lucide-react";
import { navPageGroups } from "@/data/navPages";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const labelIcons: Record<string, React.ReactNode> = {
  "Privacy Policy": <ShieldCheck className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Terms and Conditions": <ShieldAlert className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Shipping and Delivery": <Truck className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Return and Refund": <ShieldAlert className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Warranty Policy": <ShieldCheck className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Contact Us": <LifeBuoy className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Track Your Order": <FileText className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "FAQs": <LifeBuoy className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Grievance Officer": <ShieldAlert className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "User Data Deletion": <ShieldAlert className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "About Sellers Login": <Info className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />,
  "Careers": <Briefcase className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.5} />
};

const footerColumns = [
  // Column 1
  [
    {
      title: "Solutions & Automation",
      links: [
        "B2b Dashboard",
        "B2c Dashboard",
        "Food Dashboard",
        "AI Voice Automation",
        "Email Automation",
        "Whatsapp Automation",
        "Virtual Numbers",
        "Whatsapp Business API",
      ],
    },
  ],
  // Column 2
  [
    {
      title: "Industries",
      links: [
        "Manufacturing",
        "Real estate",
        "Fashion",
        "D2C",
        "Food",
        "Restaurants",
        "Saas",
        "Healthcare",
        "Pharmaceutical",
        "Retail",
        "Ecommerce",
      ],
    },
  ],
  // Column 3
  [
    {
      title: "Policies",
      links: [
        "Privacy Policy",
        "Terms and Conditions",
        "Shipping and Delivery",
        "Return and Refund",
        "Warranty Policy",
        "User Data Deletion",
      ],
    },
    {
      title: "Company",
      links: [
        "About Sellers Login",
        "Careers",
      ],
    },
  ],
  // Column 4
  [
    {
      title: "Support",
      links: [
        "Contact Us",
        "Track Your Order",
        "FAQs",
        "Grievance Officer",
      ],
    },
  ],
];

const footerHrefByLabel: Record<string, string> = {
  "Terms and Conditions": "/terms",
  "Privacy Policy": "/privacy",
  "Shipping and Delivery": "/shipping",
  "Return and Refund": "/returns",
  "Warranty Policy": "/warranty",
  "Contact Us": "/contact",
  "Track Your Order": "/track-order",
  "FAQs": "/resources/faq",
  "Grievance Officer": "/grievance",
  "User Data Deletion": "/data-deletion",
  "About Sellers Login": "/about",
  "Careers": "/careers",
  "Virtual Numbers": "/virtual-numbers",
  "Whatsapp Business API": "/whatsapp-features",
  ...Object.values(navPageGroups)
    .flat()
    .reduce<Record<string, string>>((links, item) => {
      links[item.label] = item.href;
      return links;
    }, {})
};

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const baseUrl = NEXT_PUBLIC_API_URL || "";
        await fetch(`${baseUrl}/v1/public/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error("Subscription error", err);
      }
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const themeColor = "#e9d5ff";

  return (
    <footer 
      className="relative pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 pb-8"
      style={{ backgroundColor: themeColor }}
    >
      <div className="absolute top-px left-0 w-full overflow-hidden leading-none -translate-y-full">
        <svg
          className="relative block w-full h-15 md:h-25"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,121L1392,121C1344,121,1248,121,1152,121C1056,121,960,121,864,121C768,121,672,121,576,121C480,121,384,121,288,121C192,121,96,121,48,121L0,121Z"
            fill={themeColor}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          <div className="lg:col-span-4 xl:col-span-4">
            <Link
              href="/#hero"
              className="inline-flex items-center gap-3 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-full relative"
            >
              <div className="relative w-12 h-12 bg-white rounded-xl shadow-sm overflow-hidden p-1.5 shrink-0">
                <Image src="/sellerslogin-logo (1).svg" alt="SellersLogin Logo" fill sizes="48px" className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900 leading-none">SellersLogin</span>
            </Link>
            <div className="mt-6 mb-5 text-sm text-gray-600 space-y-3">
             

            </div>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 min-w-0 relative" suppressHydrationWarning>
                  {mounted ? (
                    <input
                      id="newsletter-input"
                      name="newsletter"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      data-lpignore="true"
                      data-1p-ignore="true"
                      autoComplete="off"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2.5 px-4 text-sm placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-colors"
                    />
                  ) : (
                    <div
                      className="w-full h-10.5 bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`whitespace-nowrap bg-purple-200 text-black border border-purple-300 shadow-sm rounded-full py-2.5 px-5 text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 ${
                    subscribed ? "opacity-70 cursor-not-allowed bg-gray-200 text-gray-500 border-gray-300" : "hover:shadow-lg hover:bg-purple-300 hover:-translate-y-0.5"
                  }`}
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </button>
              </div>
            </form>
            

          </div>

          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-8">
                {col.map((section) => (
                  <nav key={section.title} aria-label={`${section.title} links`}>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((label) => (
                        <li key={label}>
                          <Link
                            href={footerHrefByLabel[label] ?? "/"}
                            className="flex items-center gap-3 text-sm text-gray-600 no-underline transition-colors duration-150 hover:text-gray-900 hover:focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded"
                          >
                            {labelIcons[label] && (
                              <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg shrink-0 border border-gray-200 shadow-sm">
                                {labelIcons[label]}
                              </div>
                            )}
                            <span className={labelIcons[label] ? "font-medium" : ""}>{label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {section.title === "Company" && (
                      <div className="mt-6">
                        <Link
                          href="/vendor/registration"
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#7c3aed] text-white rounded py-2.5 px-5 text-sm font-semibold hover:bg-purple-700 transition-all duration-200 shadow-md"
                        >
                          Start selling <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    )}
                  </nav>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-8 border-t border-purple-200/60 mt-4 gap-2">
          <p className="text-sm text-gray-500 text-center">
            &copy; All Rights Reserved {new Date().getFullYear()} with SellersLogin
          </p>
        </div>
      </div>
    </footer>
  );
}
