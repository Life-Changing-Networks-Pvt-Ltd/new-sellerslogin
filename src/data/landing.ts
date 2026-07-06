import type { LandingIconName } from "@/components/icons/LandingIcon";
import { navPageGroups } from "./navPages";

export const featureDropdown: {
  href: string;
  icon: LandingIconName;
  label: string;
}[] = navPageGroups.features;

export const solutionsDropdown: {
  href: string;
  icon: LandingIconName;
  label: string;
}[] = navPageGroups.solutions;

export const automationDropdown: {
  href: string;
  icon: LandingIconName;
  label: string;
}[] = navPageGroups.automation;

export const industriesDropdown: {
  href: string;
  icon: LandingIconName;
  label: string;
}[] = navPageGroups.industries;

export const faqs = [
  {
    q: "How do I create my online store?",
    a: "Sign up for free, choose a template or use our AI builder, customize your store with our drag-and-drop editor, add your products, and go live. The entire process takes less than 30 minutes.",
  },
  {
    q: "Which payment gateways are supported?",
    a: "We support 80+ payment gateways including Stripe, PayPal, Razorpay, Paytm, Square, Braintree, and many more. You can accept credit cards, debit cards, net banking, UPI, and wallets.",
  },
  {
    q: "Do you provide hosting?",
    a: "Yes! All plans include fully managed cloud hosting powered by AWS with global CDN. Your store is automatically optimized for speed and guaranteed 99.9% uptime.",
  },
  {
    q: "Is Sellers Login good for SEO?",
    a: "Absolutely. Every store comes with built-in SEO tools including meta tags, structured data markup, XML sitemaps, canonical URLs, image optimization, and page speed optimization for excellent Google rankings.",
  },
  {
    q: "What kind of support do you offer?",
    a: "All plans include email support. Growth plans include priority live chat. Enterprise plans include a dedicated account manager and 24/7 phone support with guaranteed SLA response times.",
  },
  {
    q: "Can I use my own domain name?",
    a: "Yes, you can connect any custom domain you own. We also offer free subdomains (yourstore.SellersLogin) and can help you register a new domain directly through our platform.",
  },
  {
    q: "What integrations are available?",
    a: "We seamlessly integrate with top industry tools including Facebook, ChatGPT, Shadowfax, Razorpay, AWS, Cashfree, and many more.",
  },
];
