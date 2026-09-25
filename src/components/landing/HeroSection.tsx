"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setLoadVideo(true);
    };

    // Don't compete with HTML/JS for bandwidth on first paint.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(start, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {
      // Autoplay can be blocked; static hero still shows.
    });
  }, [loadVideo]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#0b1020]"
    >
      {loadVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src="/videos/background2.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#4c1d95_0%,#0b1020_55%,#020617_100%)]"
          aria-hidden="true"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0 bg-black/60" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <h1 className="mb-6 text-[clamp(40px,6vw,72px)] font-bold leading-[1.1] tracking-tight text-white">
          Advanced AI Tools Every Seller Needs |{" "}
          <span className="text-purple-600">Adopt Today for Business
          Growth</span>
        </h1>

        <p className="reveal reveal-delay-1 mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-white md:text-lg lg:text-xl">
          Perfect for B2B, B2C and all business segments. The ultimate AI
          toolkit to grow your sales and elevate your brand value Today
        </p>

        <div className="reveal reveal-delay-2 mb-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/vendor/registration"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full cursor-pointer rounded-full border border-purple-300 bg-purple-200 px-8 py-3.5 text-center text-[15px] font-medium text-black no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto"
          >
            Start Free Trial
          </Link>
        </div>

        <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { value: "40+", label: "Supported Markets" },
            { value: "135+", label: "Currencies" },
            { value: "24x7", label: "Seller Support" },
            { value: "5 min", label: "Avg Launch" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="mb-1 text-2xl font-bold leading-none text-white md:mb-2 md:text-3xl">
                {value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
