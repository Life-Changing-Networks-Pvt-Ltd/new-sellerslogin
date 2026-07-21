"use client";

import Image from "next/image";
import { ArrowLeft, Home, MoreHorizontal, RotateCw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getHelpChatContent,
  type HelpChatContent,
  type HelpChatQuestion,
  type HelpChatTopic,
} from "@/lib/helpChatApi";

type ConversationMessage = {
  id: string;
  sender: "visitor" | "sellerslogin";
  text: string;
};

const createMessage = (
  sender: ConversationMessage["sender"],
  text: string,
): ConversationMessage => ({
  id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  sender,
  text,
});

function SellersLoginAvatar() {
  return (
    <div className="relative mt-1 h-8 w-8 shrink-0 rounded-full border border-violet-100 bg-white">
      <Image
        src="/sellerslogin-logo (1).svg"
        alt=""
        fill
        sizes="32px"
        className="object-contain p-0.5"
      />
    </div>
  );
}

export function NeedHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<HelpChatContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      setContent(await getHelpChatContent());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, selectedTopicId]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !dialogRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const openChat = () => {
    setSelectedTopicId(null);
    setMessages([]);
    setToastMessage(null);
    setIsOpen(true);
    if (!content && !loading) void loadContent();
  };

  const selectedTopic = content?.topics.find(
    (topic) => topic.id === selectedTopicId,
  );

  const handleTopicSelect = (topic: HelpChatTopic) => {
    if (topic.type === "toast") {
      setToastMessage(topic.toastMessage || "This feature is Under Process");
      return;
    }

    setSelectedTopicId(topic.id);
    setMessages((current) => [
      ...current,
      createMessage("visitor", topic.label),
      createMessage("sellerslogin", "Please choose a question below."),
    ]);
  };

  const handleQuestionSelect = (question: HelpChatQuestion) => {
    setMessages((current) => [
      ...current,
      createMessage("visitor", question.label),
      createMessage("sellerslogin", question.answer),
    ]);
  };

  const showMainMenu = () => setSelectedTopicId(null);

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
            ref={dialogRef}
            role="dialog"
            aria-modal="false"
            aria-label="Sellers Login help chat"
            className="fixed bottom-4 right-4 z-[70] h-[min(620px,calc(100vh-2rem))] w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
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

            <div
              ref={bodyRef}
              className="h-[calc(100%-5rem)] overflow-y-auto bg-slate-50/50 p-5"
            >
              {loading ? (
                <div className="space-y-3" aria-label="Loading help topics">
                  <div className="h-16 w-64 animate-pulse rounded-2xl rounded-tl-sm bg-slate-200" />
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="h-11 animate-pulse rounded-xl bg-slate-200" />
                    ))}
                  </div>
                </div>
              ) : null}

              {loadError ? (
                <div className="rounded-2xl border border-red-100 bg-white p-5 text-center shadow-sm">
                  <p className="text-sm leading-6 text-slate-700">
                    We&apos;re unable to load help topics right now.
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadContent()}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                  >
                    <RotateCw className="h-4 w-4" /> Retry
                  </button>
                </div>
              ) : null}

              {content ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <SellersLoginAvatar />
                    <p className="max-w-[82%] rounded-2xl rounded-tl-sm bg-violet-100 px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm">
                      {content.welcomeMessage}
                    </p>
                  </div>

                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={
                          message.sender === "visitor"
                            ? "flex justify-end"
                            : "flex items-start gap-2.5"
                        }
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        {message.sender === "sellerslogin" ? <SellersLoginAvatar /> : null}
                        <p
                          className={
                            message.sender === "visitor"
                              ? "max-w-[82%] rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-3 text-sm leading-6 text-white shadow-sm"
                              : "max-w-[82%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 text-slate-800 shadow-sm ring-1 ring-slate-100"
                          }
                        >
                          {message.text}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-violet-700">
                        {selectedTopic ? selectedTopic.label : "How can we help?"}
                      </p>
                      {selectedTopic ? (
                        <button
                          type="button"
                          onClick={showMainMenu}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-violet-700"
                        >
                          <Home className="h-3.5 w-3.5" /> Main Menu
                        </button>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedTopic
                        ? selectedTopic.questions.map((question) => (
                            <button
                              type="button"
                              key={question.id}
                              onClick={() => handleQuestionSelect(question)}
                              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-left text-xs font-medium leading-5 text-violet-900 transition hover:border-violet-400 hover:bg-violet-100"
                            >
                              {question.label}
                            </button>
                          ))
                        : content.topics.map((topic) => (
                            <button
                              type="button"
                              key={topic.id}
                              onClick={() => handleTopicSelect(topic)}
                              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-left text-xs font-semibold leading-5 text-violet-900 transition hover:border-violet-400 hover:bg-violet-100"
                            >
                              {topic.label}
                            </button>
                          ))}
                    </div>

                    {selectedTopic ? (
                      <button
                        type="button"
                        onClick={showMainMenu}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-violet-700"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <AnimatePresence>
              {toastMessage ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white shadow-xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {toastMessage}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
