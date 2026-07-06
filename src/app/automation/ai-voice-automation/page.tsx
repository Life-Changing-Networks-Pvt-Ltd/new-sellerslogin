"use client";

import { useEffect, useRef, useState } from "react";
import { BackToTop } from "@/components/landing/BackToTop";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { FooterSection } from "@/components/landing/FooterSection";
import { GlobalBackground } from "@/components/landing/GlobalBackground";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollRevealInit } from "@/components/landing/ScrollRevealInit";
import {
  RiPhoneLine,
  RiRobot2Line,
  RiBarChartBoxLine,
  RiSettings4Line,
  RiArrowRightLine,
  RiCheckLine,
  RiDatabase2Line,
  RiGlobalLine,
  RiLineChartLine,
  RiShieldCheckLine,
  RiArrowRightUpLine,
  RiPulseLine,
  RiFlowChart,
  RiLockLine,
  RiCloudLine,
  RiArrowDownLine,
  RiFileChartLine,
  RiVoiceprintLine,
  RiMicLine,
  RiHeadphoneLine,
  RiTimeLine,
  RiCalendarLine,
  RiUserLine,
  RiNotificationLine,
  RiBrainLine,
  RiSpeedLine,
  RiCodeLine,
  RiPlugLine,
  RiEqualizer2Line,
  RiCustomerService2Line,
  RiBuildingLine,
  RiStarLine,
  RiMegaphoneLine,
  RiCoinLine,
} from "react-icons/ri";
import Link from "next/link";

/* ─── Utility ─────────────────────────────────────────────────────────── */
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated Counter ────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useIntersection();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(t);
      } else setVal(start);
    }, 20);
    return () => clearInterval(t);
  }, [visible, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Waveform Animation Component ───────────────────────────────────── */
function VoiceWave({ active = true, bars = 12 }: { active?: boolean; bars?: number }) {
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 28 }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 3,
            background: "linear-gradient(180deg,#9333ea,#d8b4fe)",
            animation: active ? `waveBar 0.9s ease-in-out infinite` : "none",
            animationDelay: `${i * 0.07}s`,
            height: active ? undefined : 4,
            minHeight: 4,
            maxHeight: 24,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Orb Background ──────────────────────────────────────────────────── */
function OrbBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #d8b4fe 0%, transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 -right-52 w-[420px] h-[420px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #e9d5ff 0%, transparent 70%)",
          animation: "orbFloat 11s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[320px] h-[320px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          animation: "orbFloat 9s ease-in-out infinite 2s",
        }}
      />

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes waveBar {
          0%, 100% { height: 4px;  }
          50%       { height: 22px; }
        }
        @keyframes barGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.7);  opacity: 0; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes callPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(219,39,119,0.25); }
          50%       { box-shadow: 0 0 0 14px rgba(219,39,119,0); }
        }
        .fade-up    { animation: fadeUp    0.7s cubic-bezier(.22,1,.36,1) both; }
        .fade-in    { animation: fadeIn    0.6s ease both; }
        .slide-r    { animation: slideRight 0.6s cubic-bezier(.22,1,.36,1) both; }
        .slide-l    { animation: slideLeft  0.6s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
    </div>
  );
}

/* ─── Section Header ──────────────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  const { ref, visible } = useIntersection();
  return (
    <div ref={ref} className="text-center max-w-2xl mx-auto mb-16 px-4">
      <span
        className={`inline-block text-xs font-semibold tracking-widest uppercase text-purple-600 mb-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`text-gray-500 text-lg leading-relaxed transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─── Dashboard Preview ───────────────────────────────────────────────── */
function DashboardPreview() {
  const [activeCall, setActiveCall] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveCall((p) => (p + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);

  const calls = [
    { caller: "Inbound — +1 (312) 555-0198", intent: "Product enquiry", status: "live", duration: "0:42" },
    { caller: "Inbound — +44 20 7946 0321", intent: "Order tracking", status: "queued", duration: "—" },
    { caller: "Outbound — +1 (415) 555-0034", intent: "Appointment reminder", status: "completed", duration: "1:14" },
    { caller: "Outbound — +91 98765 43210", intent: "Payment follow-up", status: "completed", duration: "0:58" },
  ];

  const statusStyle: Record<string, string> = {
    live: "bg-purple-200 text-purple-600",
    queued: "bg-purple-200 text-purple-600",
    completed: "bg-purple-200 text-purple-600",
  };

  const bars = [40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 68];

  return (
    <div
      className="rounded-3xl border border-purple-200 bg-white overflow-hidden"
      style={{ boxShadow: "0 40px 80px -20px rgba(219,39,119,0.14)" }}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-purple-200 bg-purple-200/40">
        <span className="w-3 h-3 rounded-full bg-purple-200" />
        <span className="w-3 h-3 rounded-full bg-yellow-300" />
        <span className="w-3 h-3 rounded-full bg-green-300" />
        <span className="ml-3 flex items-center gap-2 text-xs text-gray-400 font-mono">
          <RiPhoneLine className="text-purple-600" /> voice.autopilot.io — Live Dashboard
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-200 animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">3 agents active</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Sidebar */}
        <div className="col-span-2 border-r border-purple-200 p-4 bg-white hidden md:block">
          <div className="space-y-1">
            {[
              { icon: RiBarChartBoxLine, label: "Overview", active: true },
              { icon: RiPhoneLine,        label: "Calls" },
              { icon: RiRobot2Line,       label: "Agents" },
              { icon: RiDatabase2Line,    label: "Data" },
              { icon: RiSettings4Line,    label: "Settings" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                  active
                    ? "bg-purple-200 text-purple-600 font-semibold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon className="text-base flex-shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="col-span-12 md:col-span-10 p-5 bg-gray-50/20">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Calls Today",    value: "1,248", delta: "+22.4%", up: true },
              { label: "Avg. Handle Time", value: "1m 04s", delta: "-18%",  up: true },
              { label: "Resolution Rate", value: "91.3%",  delta: "+4.1%",  up: true },
              { label: "Missed Calls",   value: "7",       delta: "-63%",   up: true },
            ].map((k) => (
              <div
                key={k.label}
                className="bg-white rounded-2xl p-4 border border-purple-200 shadow-sm"
              >
                <p className="text-xs text-gray-400 mb-1">{k.label}</p>
                <p className="text-xl font-bold text-gray-800 font-mono">
                  {k.value}
                </p>
                <p className={`text-xs font-semibold mt-1 ${k.up ? "text-purple-600" : "text-purple-600"}`}>
                  {k.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Chart + call log */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Bar chart */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-purple-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-600">Hourly Call Volume</p>
                <VoiceWave bars={8} />
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md"
                    style={{
                      height: `${h}%`,
                      background: i === 9 ? "#9333ea" : "#f3e8ff",
                      transformOrigin: "bottom",
                      animation: `barGrow 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.04}s both`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Live call log */}
            <div className="bg-white rounded-2xl border border-purple-200 p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-600 mb-3">Live Call Feed</p>
              <div className="space-y-2">
                {calls.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between text-xs p-2 rounded-xl transition-all duration-500 ${
                      i === activeCall ? "bg-purple-200 border border-purple-200" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-gray-700 font-medium truncate">{c.intent}</p>
                      <p className="text-gray-400 truncate">{c.duration}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden pt-24 pb-20">
      <OrbBg />

      {/* Dot-grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7e22ce 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
     

        <h1
          className="font-sans text-4xl md:text-6xl font-bold leading-[1.04] text-gray-900 mb-6"
          style={{
            fontFamily: "'Georgia', serif",
            animation: "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.1s both",
          }}
        >
          Voice that works{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #9333ea, #a855f7, #d8b4fe, #9333ea)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}
          >
            24 / 7
          </span>
          ,<br />
          so your team does not have to.
        </h1>

        <p
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: "'Georgia', serif",
            animation: "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.25s both",
          }}
        >
          Buy a local or toll-free number, connect your data, and deploy an AI
          voice agent that handles inbound enquiries, outbound follow-ups, and
          appointment scheduling — without a single human in the loop.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            animation: "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.4s both",
          }}
        >
          <Link href="#">
            <button
              className="group flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-purple-200"
              style={{
                background: "linear-gradient(135deg, #9333ea, #c084fc)",
              }}
            >
              Get Your Number
              <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          <Link href="#">
         
          </Link>
        </div>

        {/* Trust row */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          style={{ animation: "fadeIn 1s ease 0.7s both" }}
        >
          {[
            "HIPAA Compliant",
            "GDPR Ready",
            "99.99% Uptime",
            "Sub-400ms Latency",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <RiCheckLine className="text-purple-600" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Dashboard preview */}
      <div
        className="relative z-10 mt-20 max-w-5xl mx-auto px-6 w-full"
        style={{ animation: "fadeUp 1s cubic-bezier(.22,1,.36,1) 0.5s both" }}
      >
        <DashboardPreview />
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs"
        style={{ animation: "fadeIn 1.2s ease 1s both" }}
      >
        <span className="tracking-widest uppercase">Scroll</span>
        <RiArrowDownLine className="text-lg animate-bounce" />
      </div>
    </section>
  );
}

/* ─── Ticker ──────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [
    "Inbound Call Handling",
    "Outbound Follow-ups",
    "Appointment Booking",
    "Payment Reminders",
    "Lead Qualification",
    "Order Status Updates",
    "Survey Collection",
    "Support Deflection",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      className="py-4 overflow-hidden border-y border-purple-200"
      style={{ background: "#faf5ff" }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "tickerScroll 22s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm font-medium text-gray-400"
          >
            <RiVoiceprintLine className="text-purple-600" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── How It Works ────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Buy a phone number",
    desc: "Pick a local, national, or toll-free number from our inventory. Numbers are provisioned instantly — no carrier contracts, no hardware.",
  },
  {
    num: "02",
    title: "Connect your data",
    desc: "Plug in your CRM, order database, calendar, or product catalogue. Our AI uses your live data to answer questions accurately — never hallucinating.",
  },
  {
    num: "03",
    title: "Configure your agent",
    desc: "Define call flows, scripts, escalation rules, and handoff triggers through a visual no-code editor. Set tone, persona, and language in minutes.",
  },
  {
    num: "04",
    title: "Go live and monitor",
    desc: "Calls start flowing immediately. Every conversation is transcribed, scored, and surfaced in your real-time dashboard for review and continuous improvement.",
  },
];

function HowItWorks() {
  return (
    <section className="py-28 bg-purple-200/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Getting Started"
          title={<>From purchase to live calls<br />in under 15 minutes.</>}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-200 via-purple-200 to-purple-200 hidden md:block" />
          {steps.map((s, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={s.num}
                ref={ref}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative w-20 h-20 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center mb-5 shadow-md shadow-purple-200 z-10">
                  <span
                    className="text-2xl font-bold text-purple-600 font-mono"
                    
                  >
                    {s.num}
                  </span>
                  <div
                    className="absolute inset-0 rounded-full border-2 border-purple-200 opacity-0"
                    style={{ animation: `pulseRing 2.5s ease-out infinite ${i * 0.5}s` }}
                  />
                </div>
                <h4
                  className="font-bold text-gray-800 mb-2 text-lg"
                  
                >
                  {s.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ────────────────────────────────────────────────────────── */
const features = [
  {
    icon: RiBrainLine,
    title: "Conversational AI Engine",
    desc: "Built on large language models fine-tuned for voice. Understands intent, handles interruptions, manages multi-turn dialogue, and resolves ambiguity naturally.",
    color: "#9333ea",
  },
  {
    icon: RiVoiceprintLine,
    title: "Natural Voice Synthesis",
    desc: "Ultra-low-latency neural TTS voices indistinguishable from human agents. Choose from 40+ voices across 18 languages, or clone your brand voice.",
    color: "#a855f7",
  },
  {
    icon: RiDatabase2Line,
    title: "Live Data Grounding",
    desc: "Every response is anchored to your real data. The agent queries your CRM, order database, or knowledge base in real time — zero hallucination risk.",
    color: "#c084fc",
  },
  {
    icon: RiFlowChart,
    title: "Visual Call Flow Builder",
    desc: "Design complex call trees, branching logic, and conditional escalation paths through a drag-and-drop canvas. No code, no engineers required.",
    color: "#9333ea",
  },
  {
    icon: RiCalendarLine,
    title: "Appointment Scheduling",
    desc: "Reads your calendar availability in real time and books, reschedules, or cancels appointments during the call — fully synced with Google Calendar and Outlook.",
    color: "#a855f7",
  },
  {
    icon: RiHeadphoneLine,
    title: "Intelligent Escalation",
    desc: "Detects frustration, complexity, or escalation triggers and transfers live to a human with full context — caller history, intent, and conversation summary.",
    color: "#c084fc",
  },
  {
    icon: RiLineChartLine,
    title: "Call Analytics Suite",
    desc: "Every call is transcribed, sentiment-scored, and tagged by intent. Surface coaching moments, track resolution rates, and monitor agent performance over time.",
    color: "#9333ea",
  },
  {
    icon: RiGlobalLine,
    title: "Multi-language Support",
    desc: "Serve callers in 18 languages seamlessly. The agent detects language on first utterance and responds in kind — no press-1-for-English friction.",
    color: "#a855f7",
  },
  {
    icon: RiNotificationLine,
    title: "Outbound Campaign Engine",
    desc: "Schedule outbound call campaigns — payment reminders, appointment confirmations, satisfaction surveys — with throttle controls and DNC list enforcement.",
    color: "#c084fc",
  },
];

function FeaturesSection() {
  return (
    <section className="py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Platform Features"
          title={<>Everything your voice operation<br />needs to run itself.</>}
          sub="No patchwork of tools. No brittle IVR trees. Every capability your business demands, designed to work together from day one."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={f.title}
                ref={ref}
                className={`group relative bg-white border border-purple-200 hover:border-purple-200 rounded-3xl p-7 transition-all duration-500 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon style={{ color: f.color, fontSize: "1.4rem" }} />
                </div>
                <h3
                  className="font-bold text-gray-800 text-lg mb-2"
                  
                >
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Number Provisioning Deep-dive ──────────────────────────────────── */
function NumberProvisioning() {
  const { ref, visible } = useIntersection();
  const numberTypes = [
    {
      icon: RiPhoneLine,
      label: "Local Numbers",
      desc: "Build regional trust. Numbers in 60+ countries with local area codes, available for instant purchase.",
      detail: "Affordable Prices",
    },
    {
      icon: RiGlobalLine,
      label: "Toll-Free Numbers",
      desc: "0800, 1-800, and equivalent toll-free prefixes for inbound campaigns where caller cost matters.",
      detail: "Affordable Prices",
    },
    {
      icon: RiMegaphoneLine,
      label: "Short Codes",
      desc: "High-throughput numbers for large outbound campaigns — capable of handling thousands of concurrent calls.",
      detail: "Custom pricing",
    },
  ];

  return (
    <section className="py-28 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-600 mb-4">
              Phone Numbers
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              
            >
              Your number.
              <br />
              Your brand.
              <br />
              Instant.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
              Browse our inventory of thousands of numbers, filter by country, area code, or
              pattern, and provision in a single click. No carrier paperwork. No two-week waits.
              Your AI agent is answering calls within minutes of purchase.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Numbers in 60+ countries",
                "Port your existing number — no disruption",
                "Assign multiple agents to one number",
                "Round-robin and overflow routing built in",
                "Full CNAM / caller ID management",
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-sm text-gray-600">
                  <RiCheckLine className="text-purple-600 flex-shrink-0 text-base" />
                  {pt}
                </li>
              ))}
            </ul>
         
          </div>

          {/* Right cards */}
          <div ref={ref} className="space-y-4">
            {numberTypes.map((n, i) => (
              <div
                key={n.label}
                className={`flex items-start gap-5 p-6 rounded-3xl border-2 border-purple-200 bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-1 transition-all duration-500 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f3e8ff" }}
                >
                  <n.icon style={{ color: "#9333ea", fontSize: "1.3rem" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className="font-bold text-gray-800"
                      
                    >
                      {n.label}
                    </h4>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-200 px-2.5 py-1 rounded-full">
                      {n.detail}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{n.desc}</p>
                </div>
              </div>
            ))}

            {/* Live search mock */}
            <div
              className={`p-5 rounded-3xl border-2 border-purple-200 bg-purple-200/40 transition-all duration-700 ${
                visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: "390ms" }}
            >
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-widest">
                Search numbers
              </p>
              <div className="flex gap-2 flex-wrap">
                {["+1 (312) 555-0100", "+44 20 7946-0200", "+91 98800-00100", "+61 2 8310-0100"].map(
                  (num) => (
                    <span
                      key={num}
                      className="text-xs font-mono bg-white border border-purple-200 px-3 py-1.5 rounded-xl text-gray-600 hover:border-purple-200 hover:text-purple-600 cursor-pointer transition-colors"
                    >
                      {num}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Data Grounding Section ──────────────────────────────────────────── */
function DataGrounding() {
  const { ref, visible } = useIntersection();
  const sources = [
    { icon: RiDatabase2Line, label: "CRM (Salesforce, HubSpot)", status: "connected" },
    { icon: RiCalendarLine,  label: "Calendar (Google, Outlook)", status: "connected" },
    { icon: RiCodeLine,      label: "Order Management System", status: "connected" },
    { icon: RiCloudLine,     label: "Knowledge Base / Help Docs", status: "connected" },
    { icon: RiPlugLine,      label: "Custom REST / GraphQL API", status: "available" },
    { icon: RiFileChartLine, label: "Product Catalogue CSV / Feed", status: "available" },
  ];

  return (
    <section className="py-28 bg-purple-200/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Data sources panel */}
          <div ref={ref} className="order-2 md:order-1">
            <div
              className="rounded-3xl border-2 border-purple-200 bg-white overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(219,39,119,0.08)" }}
            >
              <div
                className="px-5 py-4 border-b border-purple-200 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#f3e8ff,#faf5ff)" }}
              >
                <RiDatabase2Line className="text-purple-600" />
                <span
                  className="font-bold text-sm text-gray-700"
                  
                >
                  Data Sources — Your Store
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-200" />
                  <span className="text-xs text-gray-400">4 active</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {sources.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-500 hover:bg-purple-200 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    }`}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-200 flex-shrink-0">
                      <s.icon className="text-purple-600 text-base" />
                    </div>
                    <span className="flex-1 text-sm text-gray-700 font-medium">{s.label}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        s.status === "connected"
                          ? "bg-purple-200 text-purple-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {s.status === "connected" ? "Connected" : "Available"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <button className="w-full py-3 rounded-full border-2 border-dashed border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-200 hover:border-purple-200 transition-all flex items-center justify-center gap-2">
                  <RiPlugLine /> Connect a new source
                </button>
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="order-1 md:order-2">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-600 mb-4">
              Data Grounding
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              
            >
              Your agent knows
              <br />
              your business.
              <br />
              In real time.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-lg">
              Every answer your AI agent gives is pulled live from your actual data — not a
              generic knowledge base. When a caller asks about their order, the agent fetches the
              real status. When they want to book, it reads your real calendar. Zero hallucinations,
              zero outdated answers.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: RiSpeedLine,
                  title: "Sub-200ms data retrieval",
                  desc: "Queries your connected sources during the call without any perceptible pause.",
                },
                {
                  icon: RiLockLine,
                  title: "Read-only by default",
                  desc: "Data access is scoped and permissioned. Write actions require explicit configuration.",
                },
                {
                  icon: RiEqualizer2Line,
                  title: "No fine-tuning needed",
                  desc: "Connect your data and the agent understands it. No retraining, no model updates.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="text-purple-600 text-base" />
                  </div>
                  <div>
                    <p
                      className="font-bold text-gray-800 text-sm mb-0.5"
                      
                    >
                      {f.title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Use Cases ───────────────────────────────────────────────────────── */
const usecases = [
  {
    icon: RiCustomerService2Line,
    industry: "Customer Support",
    heading: "Resolve 80% of support calls without a human",
    body: "Handle FAQs, order status, return requests, and account lookups automatically. Complex or emotional cases escalate instantly to your team — with full context already in the agent's hands.",
    tags: ["24/7 Coverage", "Auto-Resolution", "Smart Escalation"],
  },
  {
    icon: RiCalendarLine,
    industry: "Appointment Booking",
    heading: "Fill your calendar without a receptionist",
    body: "The agent reads your real-time availability, books appointments, sends confirmations, and handles reschedules and cancellations — all over the phone, all without human involvement.",
    tags: ["Calendar Sync", "Reminders", "Reschedule Handling"],
  },
  {
    icon: RiCoinLine,
    industry: "Collections & Payments",
    heading: "Recover revenue through empathetic outbound calls",
    body: "Schedule outbound payment reminder campaigns with natural, compliant conversation flows. Detect intent, offer payment plans, and process payments in-call through PCI-compliant integrations.",
    tags: ["Outbound Campaigns", "PCI Compliant", "Payment Processing"],
  },
  {
    icon: RiBuildingLine,
    industry: "Lead Qualification",
    heading: "Qualify inbound leads before they reach sales",
    body: "Answer, engage, and score every inbound enquiry the moment it arrives. Capture contact details, budget, timeline, and intent — then route only sales-ready leads to your team.",
    tags: ["Instant Response", "Lead Scoring", "CRM Sync"],
  },
];

function UseCases() {
  return (
    <section className="py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Use Cases"
          title={<>One platform.<br />Every voice workflow.</>}
          sub="From inbound support to outbound campaigns — the platform adapts to how your business actually operates."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usecases.map((u, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={u.industry}
                ref={ref}
                className={`group relative overflow-hidden border border-purple-200 hover:border-purple-200 rounded-3xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: i % 2 === 0 ? "white" : "#faf5ff",
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-5 bg-purple-200 transition-all duration-500 group-hover:opacity-10 group-hover:w-52 group-hover:h-52" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-200 flex items-center justify-center flex-shrink-0">
                    <u.icon className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-1">
                      {u.industry}
                    </p>
                    <h3
                      className="font-bold text-gray-800 text-lg leading-snug"
                      
                    >
                      {u.heading}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{u.body}</p>
                <div className="flex flex-wrap gap-2">
                  {u.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-purple-200 text-purple-600 font-medium border border-purple-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Band ──────────────────────────────────────────────────────── */
function StatsBand() {
  const { ref, visible } = useIntersection();
  const stats = [
    { value: 80,   suffix: "%",  label: "Average call auto-resolution rate" },
    { value: 400,  suffix: "ms", label: "Agent response latency" },
    { value: 18,   suffix: "+",  label: "Languages supported" },
    { value: 99,   suffix: ".99%", label: "Platform uptime SLA" },
  ];
  return (
    <section
      ref={ref}
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #9333ea 0%, #a855f7 60%, #d8b4fe 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p className="text-5xl font-bold font-mono mb-2 text-white">
                {visible ? <Counter to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
              </p>
              <p className="text-purple-100 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Analytics Deep-dive ─────────────────────────────────────────────── */
function Analytics() {
  const { ref, visible } = useIntersection();
  const metrics = [
    { label: "Total Calls",       value: "12,481",  delta: "+18%",  up: true },
    { label: "Auto-Resolved",     value: "10,204",  delta: "+22%",  up: true },
    { label: "Escalated",         value: "1,044",   delta: "-14%",  up: true },
    { label: "Avg Sentiment",     value: "4.3/5",   delta: "+0.4",  up: true },
    { label: "Avg Call Duration", value: "1m 08s",  delta: "-12%",  up: true },
    { label: "Missed Calls",      value: "233",     delta: "-41%",  up: true },
  ];
  const intentData = [
    { label: "Order Status",       pct: 34 },
    { label: "Product Enquiry",    pct: 24 },
    { label: "Returns & Refunds",  pct: 18 },
    { label: "Appointment",        pct: 14 },
    { label: "Other",              pct: 10 },
  ];

  return (
    <section className="py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Analytics"
          title={<>Every conversation is<br />a data point.</>}
          sub="Transcripts, sentiment scores, intent tags, and resolution outcomes — all surfaced automatically so you can improve without listening to a single recording."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KPI grid */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`bg-white border-2 border-purple-200 rounded-2xl p-5 hover:border-purple-200 hover:shadow-md hover:shadow-purple-200 transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-xs text-gray-400 mb-1">{m.label}</p>
                <p
                  className="text-2xl font-bold text-gray-800 font-mono"
                  
                >
                  {m.value}
                </p>
                <p className={`text-xs font-semibold mt-1 ${m.up ? "text-purple-600" : "text-purple-600"}`}>
                  {m.delta} vs last month
                </p>
              </div>
            ))}
          </div>

          {/* Intent breakdown */}
          <div
            className={`bg-white border-2 border-purple-200 rounded-3xl p-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "480ms" }}
          >
            <p
              className="text-sm font-bold text-gray-700 mb-5"
              
            >
              Top Call Intents
            </p>
            <div className="space-y-3">
              {intentData.map((d, i) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{d.label}</span>
                    <span className="text-purple-600 font-bold">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-purple-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${d.pct}%` : "0%",
                        background: "linear-gradient(90deg,#9333ea,#d8b4fe)",
                        transition: `width 0.8s cubic-bezier(.22,1,.36,1) ${300 + i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Integrations ────────────────────────────────────────────────────── */
const integrations = [
  { icon: RiDatabase2Line, name: "Salesforce",      desc: "CRM sync" },
  { icon: RiCalendarLine,  name: "Google Calendar", desc: "Booking" },
  { icon: RiCloudLine,     name: "HubSpot",         desc: "Pipeline" },
  { icon: RiCodeLine,      name: "Shopify",         desc: "Orders" },
  { icon: RiPlugLine,      name: "Zapier",          desc: "Workflows" },
  { icon: RiNotificationLine, name: "Slack",        desc: "Alerts" },
  { icon: RiFileChartLine, name: "Zendesk",         desc: "Ticketing" },
  { icon: RiCoinLine,      name: "Stripe",          desc: "Payments" },
];

function Integrations() {
  return (
    <section className="py-28 bg-purple-200/30">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Integrations"
          title={<>Plugs into your<br />existing stack.</>}
          sub="Pre-built connectors for the tools your team already uses. Your AI agent reads from — and writes to — the systems you depend on."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {integrations.map((it, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={it.name}
                ref={ref}
                className={`group flex flex-col items-center gap-3 p-6 rounded-3xl bg-white border border-purple-200 hover:border-purple-200 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-200 transition-all duration-400 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <it.icon className="text-purple-600 text-xl" />
                </div>
                <div className="text-center">
                  <p
                    className="font-bold text-gray-800 text-sm"
                    
                  >
                    {it.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{it.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Security Section ────────────────────────────────────────────────── */
function Security() {
  const pillars = [
    { icon: RiShieldCheckLine, label: "SOC 2 Type II certified" },
    { icon: RiLockLine,        label: "AES-256 encryption in transit and at rest" },
    { icon: RiPulseLine,       label: "Real-time threat monitoring" },
    { icon: RiFileChartLine,   label: "Full conversation audit trails" },
    { icon: RiGlobalLine,      label: "GDPR, HIPAA, and CCPA compliant" },
    { icon: RiCloudLine,       label: "Geo-redundant call infrastructure" },
  ];
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Security & Compliance"
          title={<>Enterprise-grade security<br />by default.</>}
          sub="Every call, every transcript, every integration — secured to the same standard as regulated financial services. Not an add-on tier."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={p.label}
                ref={ref}
                className={`flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-purple-200 hover:border-purple-200 hover:shadow transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p.icon className="text-purple-600 text-lg flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{p.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────────────────────── */
const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "For solo operators and small teams testing voice automation.",
    features: [
      "1 phone number included",
      "500 AI call minutes/month",
      "2 agent configurations",
      "Basic analytics dashboard",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$199",
    period: "/month",
    desc: "For growing businesses that need reliability and scale.",
    features: [
      "3 phone numbers included",
      "3,000 AI call minutes/month",
      "10 agent configurations",
      "Advanced analytics & sentiment",
      "CRM & calendar integrations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For high-volume operations with custom compliance requirements.",
    features: [
      "Unlimited numbers",
      "Unlimited call minutes",
      "Unlimited agent configs",
      "Custom data integrations",
      "Dedicated success manager",
      "SLA-backed uptime",
    ],
    cta: "Talk to Sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="py-28 bg-purple-200/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Pricing"
          title={<>Simple, honest pricing.</>}
          sub="Pay for the calls your agent handles. No per-seat nonsense. No hidden carrier fees."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const { ref, visible } = useIntersection();
            return (
              <div
                key={p.name}
                ref={ref}
                className={`relative rounded-3xl p-8 border-2 transition-all duration-700 hover:-translate-y-2 ${
                  p.highlight
                    ? "border-transparent text-white"
                    : "border-purple-200 bg-white hover:border-purple-200 hover:shadow-xl hover:shadow-purple-200"
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                  background: p.highlight
                    ? "linear-gradient(135deg,#9333ea,#c084fc)"
                    : undefined,
                  boxShadow: p.highlight
                    ? "0 30px 60px rgba(219,39,119,0.28)"
                    : undefined,
                }}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white rounded-full text-purple-600 text-xs font-black shadow">
                    Most Popular
                  </div>
                )}
                <p
                  className={`font-bold tracking-wide text-sm uppercase mb-4 ${
                    p.highlight ? "text-purple-600" : "text-purple-600"
                  }`}
                >
                  {p.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-4xl font-black"
                    
                  >
                    {p.price}
                  </span>
                  <span className={`text-sm ${p.highlight ? "text-purple-600" : "text-gray-400"}`}>
                    {p.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 leading-relaxed ${p.highlight ? "text-purple-600" : "text-gray-500"}`}>
                  {p.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2.5 text-sm ${
                        p.highlight ? "text-purple-600" : "text-gray-600"
                      }`}
                    >
                      <RiCheckLine
                        className={`flex-shrink-0 ${p.highlight ? "text-purple-600" : "text-purple-600"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: p.highlight ? "white" : "linear-gradient(135deg,#9333ea,#c084fc)",
                    color: p.highlight ? "#9333ea" : "white",
                  }}
                >
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "We went from a 4-hour response window to answering every inbound call in under two seconds. Our customer satisfaction score went from 3.8 to 4.6 within eight weeks.",
    name: "Marcus R.",
    role: "Head of Operations, Vantex Group",
    initials: "MR",
  },
  {
    quote:
      "The appointment booking agent alone saved our front desk team 22 hours per week. Setup took an afternoon, not months of integration work.",
    name: "Priya S.",
    role: "Clinic Director, Lumis Health",
    initials: "PS",
  },
  {
    quote:
      "Our outbound payment campaign recovered $140K in overdue invoices in the first month. The conversation quality is genuinely indistinguishable from a trained agent.",
    name: "Daniel O.",
    role: "CFO, Nexora Commerce",
    initials: "DO",
  },
];



/* ─── CTA ─────────────────────────────────────────────────────────────── */
function CTA() {
  const { ref, visible } = useIntersection();
  return (
    <section className="py-28 bg-transparent">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="relative rounded-3xl overflow-hidden p-16 shadow-2xl shadow-purple-200"
          style={{
            background: "linear-gradient(135deg,#9333ea 0%,#a855f7 60%,#d8b4fe 100%)",
          }}
        >
          <div className="absolute top-6 right-10 w-32 h-32 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-4 left-6 w-20 h-20 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-white/20" />
          <div className="absolute bottom-12 right-20 w-5 h-5 rounded-full bg-white/10" />

          <p className="text-xs font-semibold tracking-widest uppercase text-purple-100 mb-4">
            Ready to automate your voice operations?
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            
          >
            Your first AI call
            <br />
            is 15 minutes away.
          </h2>
          <p className="text-purple-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Buy a number, connect your data, and let your AI agent handle the first call — all
            before your next meeting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={process.env.NEXT_PUBLIC_VENDOR_REGISTRATION_URL || "/vendor/registration"}>
              <button className="group flex items-center gap-2 bg-white text-purple-600 hover:bg-purple-200 font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5">
                Get Started Free
                <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          
          </div>
          <p className="text-purple-100 text-sm mt-6">
            No credit card required. 14-day free trial. Cancel any time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Page Assembly ───────────────────────────────────────────────────── */
export default function AIVoiceAutomationPage() {
  return (
    <>
      <CustomCursor />
      <GlobalBackground />
      <ScrollRevealInit />
      <Navbar />
      <main className="font-sans antialiased bg-transparent text-gray-900 overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <FeaturesSection />
        <StatsBand />
        <NumberProvisioning />
        <DataGrounding />
        <UseCases />
   
        <Security />
        <CTA />
        <FooterSection />
        <BackToTop />
      </main>
    </>
  );
}
