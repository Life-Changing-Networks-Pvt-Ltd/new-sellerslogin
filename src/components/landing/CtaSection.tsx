import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto relative overflow-hidden bg-gray-900 text-white text-center rounded-3xl p-8 sm:p-10 md:p-14 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.25)]">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10">
          <div className="reveal inline-flex items-center bg-white/10 text-gray-300 rounded-full py-1.5 px-4 text-xs font-bold uppercase tracking-wider mb-4">
            Get Started Today
          </div>
          
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Start Selling Online Today
          </h2>
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vendor/registration"
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-block bg-purple-200 text-black py-3 px-8 rounded-full border border-purple-300 shadow-sm font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:bg-purple-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 cursor-pointer no-underline"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}