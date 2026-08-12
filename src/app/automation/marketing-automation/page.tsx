import Link from "next/link";
import {
  RiArrowRightLine,
  RiBarChartBoxLine,
  RiCheckLine,
  RiFlowChart,
  RiMailLine,
  RiMegaphoneLine,
  RiPhoneLine,
  RiStore2Line,
  RiTeamLine,
  RiUserHeartLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { BackToTop } from "@/components/landing/BackToTop";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { FooterSection } from "@/components/landing/FooterSection";
import { GlobalBackground } from "@/components/landing/GlobalBackground";
import { Navbar } from "@/components/landing/Navbar";

const features = [
  [
    "Customer Segmentation",
    "Group customers by behavior, not guesswork",
    "Segment customers by purchase history, browsing activity, or engagement level so messages are relevant instead of generic.",
  ],
  [
    "Automated Customer Journeys",
    "Build the journey once, let it run",
    "Set up a sequence of messages that responds to what each customer does, with no manual triggering required.",
  ],
  [
    "Lead Nurturing",
    "Stay in front of leads automatically",
    "Automatically follow up with interested leads on a schedule you define while their interest is still warm.",
  ],
  [
    "Abandoned Cart Recovery",
    "Recover carts without manual outreach",
    "When a customer leaves items in their cart, an automated reminder sequence helps bring them back.",
  ],
  [
    "Email Automation",
    "Trigger-based email without manual sends",
    "Run welcome, follow-up, and re-engagement email sequences tied to each customer lifecycle stage.",
  ],
  [
    "WhatsApp Automation",
    "Reach customers where they already are",
    "Automate WhatsApp messages for order updates, reminders, promotions, and customer conversations.",
  ],
  [
    "AI Voice Automation",
    "Extend automation into voice conversations",
    "Use automated voice communication for follow-ups, qualification, support, and order-related conversations.",
  ],
  [
    "Campaign Automation",
    "Schedule campaigns once and let them run",
    "Deliver campaigns to the right customer segment on the right schedule without repetitive manual sends.",
  ],
  [
    "Customer Re-engagement",
    "Bring back customers who have gone quiet",
    "Detect inactive customers and automatically move them into targeted re-engagement journeys.",
  ],
  [
    "Marketing Analytics",
    "Understand what happens across every journey",
    "Review customer responses and journey performance so workflows can be monitored and improved.",
  ],
];

const workflow = [
  [
    "Customer Action",
    "A visitor browses, adds to cart, purchases, or goes inactive.",
  ],
  ["Trigger", "That action is captured the moment it happens."],
  ["Customer Segment", "The customer is matched to a relevant segment."],
  ["Condition", "Rules decide whether, when, and how to respond."],
  ["Communication", "A message goes out through email, WhatsApp, or voice."],
  [
    "Response",
    "The system tracks whether the customer opens, clicks, replies, or purchases.",
  ],
  [
    "Next Action",
    "A follow-up, escalation, or handoff starts based on the response.",
  ],
  [
    "Conversion / Retention",
    "The customer converts or enters a retention journey.",
  ],
  [
    "Analytics",
    "Each step is logged so performance can be reviewed and improved.",
  ],
];

const lifecycle = [
  [
    "Visitor",
    "Lead capture and engagement",
    "A visitor's activity is tracked and captured as a lead opportunity.",
  ],
  [
    "Lead",
    "Automated nurturing",
    "Follow-up messages go out automatically while interest is still warm.",
  ],
  [
    "Interested Customer",
    "Personalized communication",
    "Messages reflect the products and content the customer engaged with.",
  ],
  [
    "Cart / Purchase Intent",
    "Cart recovery",
    "Abandoned cart recovery messages are sent automatically.",
  ],
  [
    "Customer",
    "Post-purchase communication",
    "Order confirmations and follow-ups run without manual work.",
  ],
  [
    "Repeat Customer",
    "Cross-sell and upsell",
    "Communication is shaped by purchase history.",
  ],
  [
    "Loyal Customer",
    "Retention campaigns",
    "Long-term customers stay engaged through relevant journeys.",
  ],
];

const useCases = [
  [
    "Lead nurturing",
    "Leads go cold without consistent follow-up",
    "Scheduled automated follow-up sequence",
    "Leads stay engaged without manual chasing",
  ],
  [
    "Abandoned cart recovery",
    "Carts are left without any reminder",
    "Trigger-based recovery messages",
    "Recovers potential lost sales",
  ],
  [
    "Welcome campaigns",
    "New customers get no structured onboarding",
    "Automated welcome sequence on signup or first purchase",
    "Creates a stronger first impression and faster activation",
  ],
  [
    "Post-purchase communication",
    "Customers hear nothing after buying",
    "Automated confirmation and follow-up messages",
    "Builds trust and reduces routine support queries",
  ],
  [
    "Customer re-engagement",
    "Inactive customers are never targeted",
    "Automated inactivity trigger",
    "Brings dormant customers back",
  ],
  [
    "Cross-selling",
    "Relevant add-ons are never suggested",
    "Automated recommendations after purchase",
    "Increases order value over time",
  ],
  [
    "Upselling",
    "Upgrade opportunities are missed",
    "Automated trigger based on usage or purchase patterns",
    "Increases customer lifetime value",
  ],
  [
    "Product promotion",
    "Promotions rely on manual blasts",
    "Scheduled, segmented promotional sends",
    "Reaches the right segment at the right time",
  ],
  [
    "Customer segmentation",
    "Every customer gets the same message",
    "Behavior and purchase-based segmentation",
    "Creates more relevant communication",
  ],
  [
    "Event-based campaigns",
    "Time-sensitive moments are missed",
    "Trigger tied to a specific event or date",
    "Delivers timely communication",
  ],
  [
    "Sales follow-up",
    "Follow-ups depend on memory",
    "Automated follow-up reminders",
    "Fewer leads fall through the cracks",
  ],
  [
    "Customer support communication",
    "Routine updates require manual sends",
    "Automated status and update messaging",
    "Reduces manual support workload",
  ],
];

const audiences = [
  [
    "Ecommerce businesses",
    "Recover carts and run lifecycle messaging without a large marketing team.",
  ],
  [
    "Online retailers",
    "Manage repeat-customer communication across product catalogues.",
  ],
  [
    "D2C brands",
    "Build direct customer relationships through personalized journeys.",
  ],
  ["B2B businesses", "Automate lead nurturing across longer sales cycles."],
  [
    "Small and medium businesses",
    "Let automation handle work that would otherwise need a larger team.",
  ],
  [
    "Growing online stores",
    "Scale customer communication without scaling repetitive work.",
  ],
  [
    "Sales and marketing teams",
    "Make follow-up consistent without manual tracking.",
  ],
];

const benefits = [
  "Reduce repetitive marketing work",
  "Respond to customer actions faster",
  "Build consistent customer journeys",
  "Improve follow-up consistency",
  "Recover potential lost sales",
  "Personalize communication at scale",
  "Coordinate multiple channels from one place",
  "Improve visibility through analytics",
];

const comparison = [
  [
    "Customer segmentation",
    "Done manually in spreadsheets or not at all",
    "Applied automatically based on behavior",
  ],
  ["Follow-ups", "Depend on someone remembering", "Triggered automatically"],
  [
    "Campaign execution",
    "Sent manually, one batch at a time",
    "Scheduled and triggered automatically",
  ],
  ["Customer journey", "Inconsistent and ad hoc", "Consistent and rule-based"],
  ["Cart recovery", "Rarely actioned", "Automatic recovery sequence"],
  [
    "Personalization",
    "Limited by team bandwidth",
    "Applied per segment automatically",
  ],
  [
    "Multi-channel communication",
    "Managed separately per channel",
    "Coordinated across channels",
  ],
  ["Analytics", "Manually compiled and delayed", "Available as journeys run"],
  [
    "Scalability",
    "Limited by team size",
    "Scales without equivalent manual workload",
  ],
];

const faqs = [
  [
    "What is marketing automation?",
    "Marketing automation is software that sends messages to customers automatically based on their actions, rather than requiring a team to track and message each customer manually.",
  ],
  [
    "How does marketing automation work?",
    "It watches for customer actions, checks predefined conditions, and automatically sends messages through email, WhatsApp, or voice while tracking the response.",
  ],
  [
    "What is marketing automation software?",
    "Marketing automation software helps businesses create automated rules and customer journeys so follow-ups, campaigns, and customer communication can run without repetitive manual work.",
  ],
  [
    "How can ecommerce businesses use marketing automation?",
    "Ecommerce businesses can use marketing automation for abandoned cart recovery, post-purchase follow-ups, customer re-engagement, cross-selling, upselling, and personalized customer communication.",
  ],
  [
    "Can marketing automation recover abandoned carts?",
    "Yes. When a customer leaves products in their cart, automated reminders can be sent through channels such as email or WhatsApp to encourage them to complete the purchase.",
  ],
  [
    "Can marketing automation automate customer follow-ups?",
    "Yes. Businesses can automatically schedule and trigger customer follow-ups based on customer actions, helping ensure that leads and customers receive timely communication.",
  ],
  [
    "Can marketing automation work with WhatsApp?",
    "Yes. SellersLogin can automate WhatsApp communication as part of customer journeys, allowing businesses to send timely messages based on customer actions and predefined conditions.",
  ],
  [
    "Can marketing automation work with AI voice agents?",
    "Yes. SellersLogin can extend automated customer journeys to AI voice agents for follow-ups, order-related communication, customer verification, and other business communication.",
  ],
  [
    "How does SellersLogin marketing automation work?",
    "SellersLogin connects customer and storefront data with automated workflows, tracks customer actions as triggers, and sends relevant communication through email, WhatsApp, or AI voice based on predefined rules.",
  ],
  [
    "What channels can SellersLogin automate?",
    "SellersLogin can automate customer communication through email, WhatsApp, and AI voice, allowing businesses to coordinate multiple channels within a single customer journey.",
  ],
  [
    "What are automated customer journeys?",
    "An automated customer journey is a predefined sequence of messages and actions that responds to customer behavior and moves customers through different stages without requiring manual intervention.",
  ],
  [
    "How does customer segmentation work?",
    "Customer segmentation groups customers based on factors such as purchase history, browsing activity, engagement, or behavior, allowing businesses to send more relevant and personalized messages.",
  ],
  [
    "What is the difference between marketing automation and email automation?",
    "Email automation focuses specifically on email communication, while marketing automation can coordinate multiple channels such as email, WhatsApp, and AI voice within a single customer journey.",
  ],
  [
    "Is marketing automation useful for small businesses?",
    "Yes. Marketing automation can help small businesses reduce repetitive manual work by automating customer follow-ups, segmentation, campaigns, and other routine communication.",
  ],
  [
    "What are the benefits of marketing automation for ecommerce businesses?",
    "Marketing automation can help ecommerce businesses improve customer engagement, automate follow-ups, recover abandoned carts, re-engage inactive customers, and create personalized communication at scale.",
  ],
];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-purple-600">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-5 text-lg leading-8 text-gray-600">{copy}</p>}
    </div>
  );
}

function WorkflowPreview() {
  return (
    <div
      className="mx-auto mt-10 max-w-5xl rounded-3xl border border-purple-200 bg-white p-6 shadow-2xl shadow-purple-100/70 md:p-10"
      aria-label="Abandoned cart automation workflow"
    >
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1.5fr_auto_1fr]">
        <div className="rounded-2xl bg-purple-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Trigger
          </p>
          <p className="mt-2 font-bold text-gray-900">Cart abandoned</p>
        </div>
        <RiArrowRightLine className="mx-auto hidden text-2xl text-purple-400 md:block" />
        <div className="rounded-2xl bg-amber-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Condition
          </p>
          <p className="mt-2 font-bold text-gray-900">
            No purchase after 1 hour
          </p>
        </div>
        <RiArrowRightLine className="mx-auto hidden text-2xl text-purple-400 md:block" />
        <div className="grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 font-semibold text-gray-900">
            <RiMailLine className="text-xl text-blue-600" /> Send email
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 font-semibold text-gray-900">
            <RiWhatsappLine className="text-xl text-green-600" /> Send WhatsApp
          </div>
        </div>
        <RiArrowRightLine className="mx-auto hidden text-2xl text-purple-400 md:block" />
        <div className="rounded-2xl bg-emerald-50 p-5 text-center">
          <RiCheckLine className="mx-auto text-3xl text-emerald-600" />
          <p className="mt-2 font-bold text-gray-900">Cart recovered</p>
        </div>
      </div>
    </div>
  );
}

export default function MarketingAutomationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <CustomCursor />
      <GlobalBackground />
      <Navbar />
      <main className="overflow-x-hidden bg-transparent font-sans text-gray-900">
        <section className="relative px-6 pb-10 pt-28 text-center md:pb-12 md:pt-36">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#f3e8ff_0,transparent_55%)]" />
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-purple-600">
            AI-powered customer journeys
          </p>
          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.06] tracking-tight text-gray-950 md:text-7xl">
            Marketing Automation Software for Ecommerce Growth
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            Turn customer actions into automatic follow-ups. SellersLogin
            Marketing Automation lets ecommerce and B2B businesses segment
            customers, recover abandoned carts, and run personalized email,
            WhatsApp, and voice journeys without a marketing team manually
            chasing every lead.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/vendor/registration"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
            >
              Start Automating <RiArrowRightLine />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-purple-200 bg-white px-8 py-4 font-bold text-purple-700 transition hover:bg-purple-50"
            >
              Explore Automation
            </a>
          </div>
          <WorkflowPreview />
        </section>

        <section className="px-6 py-10 md:py-12">
          <div className="mx-auto max-w-5xl rounded-3xl border border-purple-200 bg-purple-50 p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3 text-purple-700">
              <RiMegaphoneLine className="text-3xl" />
              <h2 className="text-2xl font-bold md:text-3xl">
                What is marketing automation?
              </h2>
            </div>
            <div className="grid gap-6 text-base leading-7 text-gray-700 md:grid-cols-2">
              <p>
                Marketing automation is software that automatically sends the
                right message to the right customer based on their behavior,
                such as browsing a product, abandoning a cart, or completing a
                purchase, instead of a team manually tracking and messaging each
                customer.
              </p>
              <p>
                <strong className="text-gray-950">
                  What does marketing automation software do?
                </strong>{" "}
                It watches for customer actions, applies rules to decide who
                should be contacted and when, sends communication automatically
                through email, WhatsApp, or voice, and reports on what happened
                next.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white/70 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why automation matters"
              title="Replace missed follow-ups with consistent customer journeys"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-red-100 bg-red-50 p-7">
                <h3 className="text-xl font-bold text-red-900">
                  Manual Marketing
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Scattered Customer Data",
                    "Missed Follow-ups",
                    "Lost Leads",
                    "Abandoned Carts",
                    "Low Repeat Purchases",
                  ].map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-red-200 bg-white px-4 py-2 text-sm text-red-800"
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <p className="mt-6 leading-7 text-red-900/80">
                  When follow-ups depend on someone remembering to send them,
                  leads go cold and valuable customer moments are missed.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
                <h3 className="text-xl font-bold text-emerald-900">
                  Automated Marketing
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Customer Segmentation",
                    "Personalized Communication",
                    "Automated Follow-ups",
                    "Conversions",
                    "Repeat Customers",
                  ].map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-800"
                    >
                      {x}
                    </span>
                  ))}
                </div>
                <p className="mt-6 leading-7 text-emerald-900/80">
                  Automation sends the next relevant follow-up when the trigger
                  happens, helping each journey move forward consistently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="How it works"
              title="From customer action to conversion and retention"
              copy="SellersLogin connects triggers, segments, conditions, communication, and response data in one repeatable workflow."
            />
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workflow.map(([title, copy], i) => (
                <li
                  key={title}
                  className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"
                >
                  <span className="text-sm font-bold text-purple-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-gray-600">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-purple-50/60 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Core features"
              title="Marketing automation tools for the complete customer lifecycle"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map(([title, value, copy]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-purple-100 bg-white p-7"
                >
                  <RiFlowChart className="text-3xl text-purple-600" />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-2 font-semibold text-purple-700">{value}</p>
                  <p className="mt-3 leading-7 text-gray-600">{copy}</p>
                  {title === "Email Automation" && (
                    <Link
                      href="/automation/email-automation"
                      className="mt-4 inline-flex text-sm font-bold text-purple-700"
                    >
                      Explore email automation →
                    </Link>
                  )}
                  {title === "WhatsApp Automation" && (
                    <Link
                      href="/automation/whatsapp-automation"
                      className="mt-4 inline-flex text-sm font-bold text-purple-700"
                    >
                      Explore WhatsApp automation →
                    </Link>
                  )}
                  {title === "AI Voice Automation" && (
                    <Link
                      href="/automation/ai-voice-automation"
                      className="mt-4 inline-flex text-sm font-bold text-purple-700"
                    >
                      Explore AI voice automation →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Customer journey automation"
              title="Guide every stage from visitor to loyal customer"
            />
            <div className="relative space-y-4 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-purple-200 md:before:left-1/2">
              {lifecycle.map(([stage, title, copy], i) => (
                <article
                  key={stage}
                  className={`relative rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:w-[46%] ${i % 2 ? "md:ml-auto" : ""}`}
                >
                  <span className="absolute left-4 top-6 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white md:left-auto md:right-[-11.2%]">
                    {i + 1}
                  </span>
                  <h3 className="pl-8 text-xl font-bold md:pl-0">{stage}</h3>
                  <p className="mt-2 font-semibold text-purple-700">{title}</p>
                  <p className="mt-2 leading-7 text-gray-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/70 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Use cases"
              title="Turn common marketing gaps into automated actions"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map(([title, problem, automation, benefit]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="text-xl font-bold">{title}</h3>
                  <dl className="mt-5 space-y-4 text-sm leading-6">
                    <div>
                      <dt className="font-bold text-red-700">Problem</dt>
                      <dd className="text-gray-600">{problem}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-purple-700">Automation</dt>
                      <dd className="text-gray-600">{automation}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-emerald-700">
                        Business benefit
                      </dt>
                      <dd className="text-gray-600">{benefit}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Omnichannel automation"
              title="One journey across email, WhatsApp, voice, and ecommerce"
              copy="Marketing automation coordinates customer communication instead of running each channel separately. A journey can move from email to a WhatsApp reminder and then to a voice follow-up based on how the customer responds."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-purple-600 p-7 text-white">
                <RiMegaphoneLine className="text-4xl" />
                <h3 className="mt-4 text-xl font-bold">Marketing Automation</h3>
                <p className="mt-3 text-purple-100">The shared journey hub</p>
              </div>
              {[
                [
                  RiMailLine,
                  "Email Automation",
                  "/automation/email-automation",
                ],
                [
                  RiWhatsappLine,
                  "WhatsApp Automation",
                  "/automation/whatsapp-automation",
                ],
                [
                  RiPhoneLine,
                  "AI Voice Automation",
                  "/automation/ai-voice-automation",
                ],
              ].map(([Icon, title, href]) => {
                const I = Icon as typeof RiMailLine;
                return (
                  <Link
                    key={String(title)}
                    href={String(href)}
                    className="rounded-3xl border border-purple-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <I className="text-4xl text-purple-600" />
                    <h3 className="mt-4 text-xl font-bold">{String(title)}</h3>
                    <span className="mt-4 inline-flex font-bold text-purple-700">
                      Explore channel →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-purple-50/60 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Connected solutions"
              title="Connect marketing automation to every customer touchpoint"
            />
            <div className="grid gap-5 md:grid-cols-2">
              {[
                [
                  RiMailLine,
                  "Email Automation",
                  "Automate email communication based on customer actions and lifecycle stages.",
                  "For deeper workflows, personalization, abandoned cart emails, and automated journeys, explore SellersLogin email marketing automation.",
                  "/automation/email-automation",
                ],
                [
                  RiWhatsappLine,
                  "WhatsApp Automation",
                  "Engage customers at important points in the buying journey.",
                  "Extend customer journeys into WhatsApp for conversations, cart recovery, notifications, promotions, and support.",
                  "/automation/whatsapp-automation",
                ],
                [
                  RiPhoneLine,
                  "AI Voice Automation",
                  "Extend automated journeys to live-sounding voice conversations.",
                  "Use voice automation for support, lead qualification, follow-ups, and order-related conversations.",
                  "/automation/ai-voice-automation",
                ],
                [
                  RiStore2Line,
                  "Website Builder Connection",
                  "Turn storefront activity into automation triggers.",
                  "A website captures visits, leads, and product interactions that can start email, WhatsApp, or voice journeys.",
                  "/features/website-builder",
                ],
              ].map(([Icon, title, intro, copy, href]) => {
                const I = Icon as typeof RiMailLine;
                return (
                  <article
                    key={String(title)}
                    className="rounded-3xl border border-purple-100 bg-white p-8"
                  >
                    <I className="text-4xl text-purple-600" />
                    <h3 className="mt-5 text-2xl font-bold">{String(title)}</h3>
                    <p className="mt-3 font-semibold text-purple-800">
                      {String(intro)}
                    </p>
                    <p className="mt-3 leading-7 text-gray-600">
                      {String(copy)}
                    </p>
                    <Link
                      href={String(href)}
                      className="mt-5 inline-flex items-center gap-2 font-bold text-purple-700"
                    >
                      Explore solution <RiArrowRightLine />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gray-950 p-8 text-white md:p-14">
            <SectionHeading
              eyebrow="One connected platform"
              title="Website Builder + Ecommerce + Marketing Automation + Email + WhatsApp + AI Voice + Analytics"
              copy="These capabilities share customer and order data, so a journey that starts on your storefront can continue into email, WhatsApp, or voice without exporting data between disconnected tools."
            />
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Website Builder",
                "Ecommerce",
                "Marketing Automation",
                "Email Automation",
                "WhatsApp Automation",
                "AI Voice Automation",
                "Analytics",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/70 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Comparison"
              title="Marketing automation vs. manual marketing"
            />
            <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="p-5">Capability</th>
                    <th className="p-5">Manual Marketing</th>
                    <th className="p-5">Automated Marketing</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([area, manual, automated]) => (
                    <tr key={area} className="border-t border-gray-100">
                      <th scope="row" className="p-5 font-bold text-gray-950">
                        {area}
                      </th>
                      <td className="p-5 text-gray-600">{manual}</td>
                      <td className="p-5 text-gray-700">
                        <span className="mr-2 text-emerald-600">✓</span>
                        {automated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Built for growing businesses"
              title="Who is SellersLogin Marketing Automation for?"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map(([title, copy]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-purple-100 bg-white p-6"
                >
                  <RiTeamLine className="text-3xl text-purple-600" />
                  <h3 className="mt-4 text-lg font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-gray-600">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-12 md:mt-16">
              <SectionHeading
                eyebrow="Business benefits"
                title="Do more without adding repetitive manual work"
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((x) => (
                  <div
                    key={x}
                    className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-5 font-semibold text-emerald-950"
                  >
                    <RiCheckLine className="shrink-0 text-xl text-emerald-600" />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-purple-50/60 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Product workflow"
              title="Build journeys from trigger to analytics"
            />
            <div className="rounded-3xl border-2 border-dashed border-purple-200 bg-white p-10 text-center">
              <RiBarChartBoxLine className="mx-auto text-5xl text-purple-500" />
              <h3 className="mt-4 text-2xl font-bold">
                Automation builder preview
              </h3>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
                Trigger → Condition → Customer Segment → Action → Email /
                WhatsApp / Voice → Analytics
              </p>
              <p className="mt-4 text-sm font-semibold text-purple-700">
                Product dashboard visual will be added after the final
                automation-builder screenshot is approved.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-purple-100 bg-white p-7">
                <h3 className="text-xl font-bold">Integration ecosystem</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  Marketing automation integrations will be listed here after
                  the product team confirms which platform integrations apply
                  directly to automated marketing journeys.
                </p>
              </article>
              <article className="rounded-3xl border border-purple-100 bg-white p-7">
                <h3 className="text-xl font-bold">
                  Control over customer journeys
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  Automated messages use customer permissions and data stored in
                  the SellersLogin account. Businesses retain control over the
                  segments, triggers, conditions, and channels used in each
                  journey.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Marketing automation FAQs"
            />
            <div className="space-y-4">
              {faqs.map(([q, a]) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-purple-100 bg-white p-6"
                >
                  <summary className="cursor-pointer list-none pr-6 text-lg font-bold text-gray-950">
                    {q}
                    <span className="float-right text-purple-600 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-gray-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-purple-700 to-purple-500 p-10 text-center text-white shadow-2xl shadow-purple-200 md:p-16">
            <RiUserHeartLine className="mx-auto text-5xl text-purple-100" />
            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Turn customer actions into your next best follow-up
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-purple-100">
              Build connected journeys across email, WhatsApp, and AI voice, and
              keep every lead and customer moving forward.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/vendor/registration"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-purple-700"
              >
                Start Automating <RiArrowRightLine />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 font-bold text-white"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      </main>
      <FooterSection />
      <BackToTop />
    </>
  );
}
