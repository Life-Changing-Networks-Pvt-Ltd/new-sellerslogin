import { Mail, Phone, HelpCircle, MessagesSquare, Handshake } from "lucide-react";
import {
  NEXT_PUBLIC_ACCOUNTANTS_EMAIL,
  NEXT_PUBLIC_PARTNERSHIP_EMAIL,
  NEXT_PUBLIC_SALES_EMAIL,
  NEXT_PUBLIC_SUPPORT_EMAIL,
} from "@/config/variables";

export function ContactCardsSection() {
  const cards = [
    {
      title: "Sales Enquiry",
      icon: HelpCircle,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      details: [
        { icon: Mail, text: NEXT_PUBLIC_SALES_EMAIL || "" },
        { icon: Phone, text: "1800 103 1123, 1800 572 3535" },
      ],
    },
    {
      title: "Support Enquiry",
      icon: MessagesSquare,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
      details: [
        { icon: Mail, text: NEXT_PUBLIC_SUPPORT_EMAIL || "" },
        { icon: Phone, text: "1800 309 3036" },
      ],
    },
    {
      title: "Partnership Enquiry",
      icon: Handshake,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-100",
      details: [
        { icon: Mail, text: NEXT_PUBLIC_PARTNERSHIP_EMAIL || "" },
        { icon: Mail, text: NEXT_PUBLIC_ACCOUNTANTS_EMAIL || "" },
      ],
    },
  ];

  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-slate-50 rounded-t-[3rem]">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Contact us
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Get Personalized help from a qualified expert
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            {/* Illustration Placeholder */}
            <div className="flex justify-center pt-8 pb-4">
              <div className={`flex h-24 w-24 items-center justify-center rounded-full ${card.iconBg}`}>
                <card.icon className={`h-12 w-12 ${card.iconColor}`} />
              </div>
            </div>

            {/* Title */}
            <div className="border-b border-slate-100 pb-5 text-center">
              <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col">
              {card.details.map((detail, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 px-6 py-5 ${
                    idx !== card.details.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <detail.icon className="h-5 w-5 shrink-0 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{detail.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
