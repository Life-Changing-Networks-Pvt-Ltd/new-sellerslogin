"use client";

import Image from "next/image";
import { MoreHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { getChatWelcomeMessage } from "@/lib/chatApi";

export function NeedHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [welcomeError, setWelcomeError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isActive = true;

    getChatWelcomeMessage()
      .then((response) => {
        if (isActive) setWelcomeMessage(response.data.message);
      })
      .catch(() => {
        if (isActive) setWelcomeError(true);
      });

    return () => {
      isActive = false;
    };
  }, [isOpen]);

  const openChat = () => {
    setWelcomeMessage(null);
    setWelcomeError(false);
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={openChat}
          className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-lg border border-r-0 border-violet-200 bg-violet-100 px-3 py-4 text-sm font-semibold text-slate-700 shadow-md transition-colors hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          aria-label="Open Sellers Login help chat"
          aria-expanded={isOpen}
        >
          <span className="block [writing-mode:vertical-rl] rotate-180">
            Need a Help
          </span>
        </button>
      ) : null}

      <AnimatePresence>
        {isOpen ? (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="Sellers Login help chat"
            className="fixed bottom-4 right-4 z-[70] h-[min(540px,calc(100vh-2rem))] w-[min(400px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, x: 24, y: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: 16, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
          <header className="flex h-20 items-center gap-3 border-b border-slate-100 px-5">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/sellerslogin-logo (1).svg"
                alt="Sellers Login Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>

            <span className="min-w-0 flex-1 truncate text-base font-semibold text-slate-900">
              Sellers Login
            </span>

            <button
              type="button"
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              aria-label="More chat options"
            >
              <MoreHorizontal size={21} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              aria-label="Close help chat"
            >
              <X size={21} aria-hidden="true" />
            </button>
          </header>

          <div className="h-[calc(100%-5rem)] overflow-y-auto p-5">
            {!welcomeMessage && !welcomeError ? (
              <div
                className="h-16 w-64 animate-pulse rounded-2xl rounded-tl-sm bg-slate-100"
                aria-label="Loading welcome message"
              />
            ) : null}

            <AnimatePresence>
              {welcomeMessage ? (
                <motion.div
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="relative mt-1 h-8 w-8 shrink-0 rounded-full border border-violet-100 bg-white">
                    <Image
                      src="/sellerslogin-logo (1).svg"
                      alt=""
                      fill
                      sizes="32px"
                      className="object-contain p-0.5"
                    />
                  </div>
                  <p className="max-w-[78%] rounded-2xl rounded-tl-sm bg-violet-100 px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm">
                    {welcomeMessage}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {welcomeError ? (
              <p role="alert" className="text-sm text-red-600">
                Unable to load the welcome message. Please try again.
              </p>
            ) : null}
          </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
