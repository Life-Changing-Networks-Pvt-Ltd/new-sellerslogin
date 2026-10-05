"use client";

import Image from "next/image";
import { ArrowLeft, Home, Loader2, MoreHorizontal, RotateCw, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import {
  getHelpChatContent,
  type HelpChatContent,
  type HelpChatQuestion,
  type HelpChatTopic,
} from "@/lib/helpChatApi";
import {
  getVisitorLiveChatSession,
  getVisitorLiveChatSocketUrl,
  sendVisitorWhatsappOtp,
  startVisitorLiveChat,
  verifyVisitorWhatsappOtp,
  type VisitorChatMessage,
  type VisitorChatSession,
} from "@/lib/visitorLiveChatApi";

type ConversationMessage = {
  id: string;
  sender: "visitor" | "sellerslogin";
  text: string;
};

type HelpView = "main" | "contact" | "topics" | "chat";
type ContactReason = "sales" | "support";

type ContactForm = {
  name: string;
  email: string;
  whatsappNumber: string;
  message: string;
  otp: string;
};

const EMPTY_CONTACT_FORM: ContactForm = {
  name: "",
  email: "",
  whatsappNumber: "",
  message: "",
  otp: "",
};

const LIVE_CHAT_STORAGE_KEY = "sellerslogin-visitor-live-chat";

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
  const [view, setView] = useState<HelpView>("main");
  const [contactReason, setContactReason] = useState<ContactReason | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>(EMPTY_CONTACT_FORM);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [chatStarting, setChatStarting] = useState(false);
  const [liveSession, setLiveSession] = useState<VisitorChatSession | null>(null);
  const [liveMessages, setLiveMessages] = useState<VisitorChatMessage[]>([]);
  const [liveMessageText, setLiveMessageText] = useState("");
  const [liveChatError, setLiveChatError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const liveChatId = liveSession?.chatId;
  const liveChatToken = liveSession?.chatToken;

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
  }, [messages, selectedTopicId, liveMessages, view]);

  useEffect(() => {
    const restoreChat = async () => {
      const chatToken = window.localStorage.getItem(LIVE_CHAT_STORAGE_KEY);
      if (!chatToken) return;

      try {
        const response = await getVisitorLiveChatSession(chatToken);
        const chat = response.data.chat;
        setLiveSession({
          chatId: chat._id,
          chatToken,
          status:
            chat.resolutionStatus === "resolved" ||
            chat.status === "closed" ||
            chat.status === "completed"
              ? "closed"
              : chat.status,
        });
        setLiveMessages(response.data.messages || []);
        setView("chat");
      } catch {
        window.localStorage.removeItem(LIVE_CHAT_STORAGE_KEY);
      }
    };

    void restoreChat();
  }, []);

  useEffect(() => {
    if (!liveChatId || !liveChatToken) return;

    const socket = io(getVisitorLiveChatSocketUrl(), {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("visitor_join_chat", {
        chatId: liveChatId,
        chatToken: liveChatToken,
      });
    });
    socket.on("receive_message", (message: VisitorChatMessage) => {
      if (String(message.chatId) !== liveChatId) return;
      setLiveMessages((current) =>
        current.some((item) => item._id === message._id)
          ? current
          : [...current, message],
      );
    });
    socket.on("agent_accept_chat", () => {
      setLiveSession((current) =>
        current ? { ...current, status: "connected" } : current,
      );
    });
    socket.on("chat_closed", () => {
      setLiveSession((current) =>
        current ? { ...current, status: "closed" } : current,
      );
    });
    socket.on("chat_error", (error: { message?: string }) => {
      setLiveChatError(error?.message || "Unable to update the chat");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [liveChatId, liveChatToken]);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setInterval(
      () => setResendSeconds((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [resendSeconds]);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openChat = () => {
    if (liveSession) {
      setView("chat");
    } else {
      setView("main");
      setContactReason(null);
      setContactForm(EMPTY_CONTACT_FORM);
      setOtpRequested(false);
      setOtpVerified(false);
      setVerificationToken("");
      setSelectedTopicId(null);
      setMessages([]);
    }
    setToastMessage(null);
    setIsOpen(true);
    if (!content && !loading) void loadContent();
  };

  const selectedTopic = content?.topics.find(
    (topic) => topic.id === selectedTopicId,
  );

  const visibleTopics = content?.topics.filter(
    (topic) => !topic.label.toLowerCase().includes("talk to sales"),
  );

  const showContactForm = (reason: ContactReason) => {
    setContactReason(reason);
    setContactForm(EMPTY_CONTACT_FORM);
    setOtpRequested(false);
    setOtpVerified(false);
    setVerificationToken("");
    setLiveChatError("");
    setView("contact");
  };

  const updateContactField = (field: keyof ContactForm, value: string) => {
    setContactForm((current) => ({ ...current, [field]: value }));

    if (field === "whatsappNumber") {
      setOtpRequested(false);
      setOtpVerified(false);
      setVerificationToken("");
    }
  };

  const requestOtp = async () => {
    if (contactForm.whatsappNumber.replace(/\D/g, "").length < 8) {
      setToastMessage("Please enter a valid WhatsApp number");
      return;
    }

    setOtpLoading(true);
    setLiveChatError("");
    try {
      const response = await sendVisitorWhatsappOtp(contactForm.whatsappNumber);
      setContactForm((current) => ({
        ...current,
        whatsappNumber: response.whatsappNumber,
        otp: "",
      }));
      setOtpRequested(true);
      setOtpVerified(false);
      setVerificationToken("");
      setResendSeconds(response.resendAfter || 30);
      setToastMessage("OTP sent to your WhatsApp number");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? String(
              (error as { response?: { data?: { message?: string } } }).response?.data
                ?.message || "Unable to send OTP",
            )
          : "Unable to send OTP";
      setLiveChatError(message);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(contactForm.otp)) {
      setToastMessage("Please enter the 6-digit OTP");
      return;
    }

    setOtpVerifying(true);
    setLiveChatError("");
    try {
      const response = await verifyVisitorWhatsappOtp(
        contactForm.whatsappNumber,
        contactForm.otp,
      );
      setContactForm((current) => ({
        ...current,
        whatsappNumber: response.whatsappNumber,
      }));
      setVerificationToken(response.verificationToken);
      setOtpVerified(true);
      setToastMessage("WhatsApp number verified");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? String(
              (error as { response?: { data?: { message?: string } } }).response?.data
                ?.message || "OTP verification failed",
            )
          : "OTP verification failed";
      setLiveChatError(message);
    } finally {
      setOtpVerifying(false);
    }
  };

  const canSubmitContact =
    contactForm.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email) &&
    contactForm.whatsappNumber.replace(/\D/g, "").length >= 8 &&
    contactForm.message.trim().length > 0 &&
    otpVerified &&
    Boolean(verificationToken);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmitContact || !contactReason) return;

    setChatStarting(true);
    setLiveChatError("");
    try {
      const response = await startVisitorLiveChat({
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        whatsappNumber: contactForm.whatsappNumber,
        message: contactForm.message.trim(),
        queryType: contactReason,
        whatsappVerificationToken: verificationToken,
      });
      const session = response.data;
      window.localStorage.setItem(LIVE_CHAT_STORAGE_KEY, session.chatToken);
      setLiveSession(session);

      const restored = await getVisitorLiveChatSession(session.chatToken);
      setLiveMessages(restored.data.messages || []);
      setView("chat");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? String(
              (error as { response?: { data?: { message?: string } } }).response?.data
                ?.message || "Unable to start live chat",
            )
          : "Unable to start live chat";
      setLiveChatError(message);
    } finally {
      setChatStarting(false);
    }
  };

  const sendLiveMessage = () => {
    const text = liveMessageText.trim();
    if (!text || !liveSession || liveSession.status === "closed") return;

    if (!socketRef.current?.connected) {
      setLiveChatError("Chat is reconnecting. Please try again in a moment.");
      return;
    }

    setLiveChatError("");
    socketRef.current.emit("send_message", {
      chatId: liveSession.chatId,
      chatToken: liveSession.chatToken,
      senderType: "visitor",
      text,
      clientMsgId: `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    });
    setLiveMessageText("");
  };

  const returnToMainMenu = () => {
    window.localStorage.removeItem(LIVE_CHAT_STORAGE_KEY);
    setLiveSession(null);
    setLiveMessages([]);
    setLiveMessageText("");
    setLiveChatError("");
    setContactReason(null);
    setContactForm(EMPTY_CONTACT_FORM);
    setOtpRequested(false);
    setOtpVerified(false);
    setVerificationToken("");
    setResendSeconds(0);
    setSelectedTopicId(null);
    setMessages([]);
    setView("main");
  };

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

  const showTopicMenu = () => setSelectedTopicId(null);

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={openChat}
          className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-lg border border-r-0 border-violet-200 bg-violet-100 px-2.5 py-3 text-xs font-semibold text-slate-700 shadow-md transition-colors hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:px-3 sm:py-4 sm:text-sm"
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
            className="fixed inset-x-2 bottom-2 z-[70] h-[min(620px,calc(100dvh-1rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[min(420px,calc(100vw-2rem))] sm:rounded-3xl"
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
                  {view !== "chat" ? (
                    <>
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
                            {message.sender === "sellerslogin" ? (
                              <SellersLoginAvatar />
                            ) : null}
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
                    </>
                  ) : null}

                  <AnimatePresence mode="wait" initial={false}>
                    {view === "main" ? (
                      <motion.div
                        key="main-options"
                        className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-violet-700">
                          How can we help?
                        </p>
                        <div className="grid gap-2">
                          <button
                            type="button"
                            onClick={() => showContactForm("sales")}
                            className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-left text-sm font-semibold text-violet-900 transition hover:border-violet-400 hover:bg-violet-100"
                          >
                            Want to Talk to Sales Experts?
                          </button>
                          <button
                            type="button"
                            onClick={() => showContactForm("support")}
                            className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-left text-sm font-semibold text-violet-900 transition hover:border-violet-400 hover:bg-violet-100"
                          >
                            Need Customer Support?
                          </button>
                          <button
                            type="button"
                            onClick={() => setView("topics")}
                            className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-left text-sm font-semibold text-violet-900 transition hover:border-violet-400 hover:bg-violet-100"
                          >
                            Any Other Question?
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {view === "contact" ? (
                      <motion.div
                        key={`contact-${contactReason}`}
                        className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-bold text-violet-800">
                            {contactReason === "sales"
                              ? "Talk to Sales Experts"
                              : "Customer Support"}
                          </p>
                          <button
                            type="button"
                            onClick={() => setView("main")}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-violet-700"
                          >
                            <ArrowLeft className="h-3.5 w-3.5" /> Back
                          </button>
                        </div>

                        {liveChatError ? (
                          <p className="mb-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                            {liveChatError}
                          </p>
                        ) : null}

                        <form className="space-y-3" onSubmit={handleContactSubmit}>
                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold text-slate-700">
                                Name
                              </span>
                              <input
                                type="text"
                                required
                                autoComplete="name"
                                value={contactForm.name}
                                onChange={(event) => updateContactField("name", event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder="Enter your name"
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold text-slate-700">
                                Email
                              </span>
                              <input
                                type="email"
                                required
                                autoComplete="email"
                                value={contactForm.email}
                                onChange={(event) => updateContactField("email", event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder="Enter your email"
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold text-slate-700">
                                WhatsApp Number
                              </span>
                              <div className="flex gap-2">
                                <input
                                  type="tel"
                                  required
                                  autoComplete="tel"
                                  value={contactForm.whatsappNumber}
                                  onChange={(event) =>
                                    updateContactField("whatsappNumber", event.target.value)
                                  }
                                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                  placeholder="WhatsApp number with country code"
                                />
                                <button
                                  type="button"
                                  onClick={() => void requestOtp()}
                                  disabled={otpVerified || otpLoading || (otpRequested && resendSeconds > 0)}
                                  className="shrink-0 rounded-xl bg-violet-100 px-3 text-xs font-bold text-violet-800 transition hover:bg-violet-200 disabled:bg-emerald-100 disabled:text-emerald-700"
                                >
                                  {otpLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : otpVerified ? (
                                    "Verified"
                                  ) : otpRequested && resendSeconds > 0 ? (
                                    `Resend ${resendSeconds}s`
                                  ) : otpRequested ? (
                                    "Resend"
                                  ) : (
                                    "Verify"
                                  )}
                                </button>
                              </div>
                            </label>

                            {otpRequested && !otpVerified ? (
                              <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">
                                <label className="block">
                                  <span className="mb-1 block text-xs font-semibold text-slate-700">
                                    Enter WhatsApp OTP
                                  </span>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      maxLength={6}
                                      value={contactForm.otp}
                                      onChange={(event) =>
                                        updateContactField(
                                          "otp",
                                          event.target.value.replace(/\D/g, ""),
                                        )
                                      }
                                      className="min-w-0 flex-1 rounded-xl border border-violet-200 bg-white px-3 py-2.5 text-sm tracking-[0.3em] text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                      placeholder="000000"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => void verifyOtp()}
                                      disabled={otpVerifying}
                                      className="shrink-0 rounded-xl bg-violet-600 px-3 text-xs font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
                                    >
                                      {otpVerifying ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Verify OTP"
                                      )}
                                    </button>
                                  </div>
                                </label>
                              </div>
                            ) : null}

                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold text-slate-700">
                                Message
                              </span>
                              <textarea
                                required
                                rows={3}
                                maxLength={1000}
                                value={contactForm.message}
                                onChange={(event) =>
                                  updateContactField("message", event.target.value)
                                }
                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder={
                                  contactReason === "sales"
                                    ? "Tell us what you would like to discuss"
                                    : "Tell us how we can help"
                                }
                              />
                            </label>

                            <button
                              type="submit"
                              disabled={!canSubmitContact || chatStarting}
                              className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                            >
                              {chatStarting ? (
                                <span className="inline-flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" /> Starting chat...
                                </span>
                              ) : (
                                "Submit"
                              )}
                            </button>
                            {!otpVerified ? (
                              <p className="text-center text-[11px] text-slate-500">
                                Verify your WhatsApp number.
                              </p>
                            ) : null}
                        </form>
                      </motion.div>
                    ) : null}

                    {view === "chat" && liveSession ? (
                      <motion.div
                        key="visitor-live-chat"
                        className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                      >
                        <div className="border-b border-violet-100 bg-violet-50 px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold text-violet-900">Live Chat</p>
                            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                              {liveSession.status === "connected"
                                ? "Agent connected"
                                : liveSession.status === "closed"
                                  ? "Closed"
                                  : "Waiting for team"}
                            </span>
                          </div>
                          {liveSession.status !== "connected" && liveSession.status !== "closed" ? (
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                              Please allow us 5–10 minutes. Our team will join the chat shortly.
                            </p>
                          ) : null}
                        </div>

                        <div className="space-y-3 p-4">
                          {liveMessages.map((message) => {
                            const isVisitor = message.senderType === "visitor";
                            return (
                              <div
                                key={message._id}
                                className={isVisitor ? "flex justify-end" : "flex items-start gap-2"}
                              >
                                {!isVisitor ? <SellersLoginAvatar /> : null}
                                <div
                                  className={
                                    isVisitor
                                      ? "max-w-[82%] rounded-2xl rounded-tr-sm bg-violet-600 px-3.5 py-2.5 text-sm text-white"
                                      : "max-w-[82%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-sm text-slate-800"
                                  }
                                >
                                  <p>{message.text}</p>
                                  <p className={`mt-1 text-[9px] ${isVisitor ? "text-violet-100" : "text-slate-400"}`}>
                                    {new Date(message.createdAt).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          {liveSession.status === "closed" ? (
                            <button
                              type="button"
                              onClick={returnToMainMenu}
                              className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                            >
                              <Home className="h-4 w-4" aria-hidden="true" />
                              Main Menu
                            </button>
                          ) : null}
                        </div>

                        {liveChatError ? (
                          <p className="mx-4 mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                            {liveChatError}
                          </p>
                        ) : null}

                        <form
                          className="flex items-end gap-2 border-t border-slate-100 p-3"
                          onSubmit={(event) => {
                            event.preventDefault();
                            sendLiveMessage();
                          }}
                        >
                          <textarea
                            rows={1}
                            maxLength={1000}
                            value={liveMessageText}
                            onChange={(event) => setLiveMessageText(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                sendLiveMessage();
                              }
                            }}
                            disabled={liveSession.status === "closed"}
                            placeholder={
                              liveSession.status === "closed"
                                ? "This conversation is closed"
                                : "Type a message"
                            }
                            className="max-h-24 min-h-10 min-w-0 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-100"
                          />
                          <button
                            type="submit"
                            disabled={!liveMessageText.trim() || liveSession.status === "closed"}
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-600 text-white transition hover:bg-violet-700 disabled:bg-slate-300"
                            aria-label="Send message"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </form>
                      </motion.div>
                    ) : null}

                    {view === "topics" ? (
                      <motion.div
                        key="help-topics"
                        className="rounded-2xl border border-violet-100 bg-white p-3 shadow-sm"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-violet-700">
                            {selectedTopic ? selectedTopic.label : "How can we help?"}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedTopic) showTopicMenu();
                              else setView("main");
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-violet-700"
                          >
                            {selectedTopic ? (
                              <Home className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowLeft className="h-3.5 w-3.5" />
                            )}
                            {selectedTopic ? "All Topics" : "Back"}
                          </button>
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
                            : visibleTopics?.map((topic) => (
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
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
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
