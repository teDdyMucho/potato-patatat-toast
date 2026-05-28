"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";
import { Akt3DLogo } from "@/components/ui/akt-3d-logo";
import { GLSLHills } from "@/components/ui/glsl-hills";
import GhlAffiliate from "@/components/GhlAffiliate";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Nav from "@/components/Nav";
import { useEffect, useRef, useState } from "react";
import { partnerCases } from "@/lib/partner-cases";

const aiQuestions = [
  "Need a VA?",
  "Need SEO help?",
  "Automate leads?",
  "Build voice AI?",
  "Setup GHL?",
];

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm AKT's AI. Ask me anything about automation, voice AI, GHL builds, VA teams, or our work.",
};

const partners = partnerCases.map((p) => ({
  title: p.title,
  logo: p.logo,
  slug: p.slug,
}));

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Stable id so the webhook/n8n flow can keep this chat's memory.
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!chatOpen) {
        setQuestionIndex((i) => (i + 1) % aiQuestions.length);
      }
    }, 5200);
    return () => window.clearInterval(interval);
  }, [chatOpen]);

  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [chatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const openChat = () => {
    setMessages([WELCOME]);
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    setMessages([WELCOME]);
    setInput("");
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, sessionId }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://aktservices.org/#organization",
        name: "AKT Virtual Assistance Services",
        url: "https://aktservices.org",
        logo: "https://aktservices.org/image/akt_logo.png",
        foundingDate: "2020",
        email: "admin@aktservices.org",
        areaServed: "Worldwide",
        description: "Philippine-based AI automation agency specializing in GoHighLevel CRM, n8n workflow automation, Retell AI voice agents, and Filipino virtual assistants.",
        sameAs: [
          "https://linkedin.com/in/jatakt",
          "https://www.facebook.com/profile.php?id=100075861475134",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://aktservices.org/#website",
        url: "https://aktservices.org",
        name: "AKT Virtual Assistance Services",
        publisher: { "@id": "https://aktservices.org/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://aktservices.org/blog?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <GLSLHills width="100%" height="100dvh" cameraZ={124} speed={0.42} color="white" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(10,191,163,0.28),rgba(10,191,163,0.06)_28%,transparent_55%)]" />

      <Nav />

      {/* GoHighLevel affiliate badge — top-right */}
      <GhlAffiliate />

      <div className="pointer-events-none absolute left-1/2 top-[34%] z-20 h-[min(46vw,46vh)] w-[min(46vw,46vh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0abfa3]/20 blur-3xl" />
      <Akt3DLogo className="absolute left-1/2 top-[34%] z-30 h-[min(58vw,58vh)] w-[min(68vw,68vh)] -translate-x-1/2 -translate-y-1/2" />

      {/* Card — closed: compact · open: chat panel */}
      <section
        className="absolute left-1/2 z-40 w-full px-4 transition-all duration-300"
        style={{
          top: chatOpen ? "50%" : "58%",
          transform: "translate(-50%, -50%)",
          maxWidth: chatOpen ? "min(540px, calc(100vw - 32px))" : "min(360px, calc(100vw - 32px))",
        }}
      >
        <div
          className="rounded-xl border border-white/15 bg-black/55 shadow-2xl shadow-[#0abfa3]/10 backdrop-blur-md transition-all duration-300"
          style={{ padding: chatOpen ? "14px" : "16px" }}
        >
          {!chatOpen ? (
            /* ── Collapsed state ── */
            <>
              <p className="font-syne text-[17px] font-bold tracking-normal text-white text-center">
                Talk to Our AIs
              </p>
              <TypewriterEffectSmooth
                key={questionIndex}
                words={[{ text: aiQuestions[questionIndex], className: "text-[#7fffee]" }]}
                className="my-2 min-h-7 justify-center drop-shadow-[0_0_12px_rgba(10,191,163,0.75)] [&_div>div]:text-sm [&_div>div]:font-bold sm:[&_div>div]:text-base"
                cursorClassName="h-5 w-[2px] bg-[#7fffee] shadow-[0_0_12px_rgba(127,255,238,0.9)] sm:h-5"
                duration={0.55}
                delay={0.05}
              />
              <button
                onClick={openChat}
                className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#0abfa3]"
              >
                <MessageCircle size={15} />
                Chat
              </button>
            </>
          ) : (
            /* ── Chat panel state ── */
            <>
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#0abfa3] shadow-[0_0_6px_rgba(10,191,163,0.9)]" />
                  <span className="font-syne text-[13px] font-bold text-white">AKT AI</span>
                </div>
                <button
                  onClick={closeChat}
                  className="rounded-md p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Messages */}
              <div className="mb-3 flex h-[min(460px,60vh)] flex-col gap-2 overflow-y-auto pr-0.5 scrollbar-none">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] rounded-lg px-3 py-2 text-[12px] leading-5 ${
                      m.role === "user"
                        ? "ml-auto bg-white/10 text-white"
                        : "mr-auto bg-[#062B26] text-[#7fffee]"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && (
                  <div className="mr-auto flex items-center gap-1.5 rounded-lg bg-[#062B26] px-3 py-2">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#0abfa3] opacity-60"
                        style={{ animation: `pulse 1.2s ease-in-out ${d * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about our services…"
                  className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white placeholder-white/30 outline-none transition-colors focus:border-[#0abfa3]"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex shrink-0 items-center justify-center rounded-md px-3 py-2 text-white transition-colors disabled:opacity-40"
                  style={{ background: "#0abfa3" }}
                >
                  <Send size={13} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom: CTA + Partner strip */}
      <section className="pointer-events-none absolute inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]">

        {/* CTA row */}
        <div className="pointer-events-auto mb-4 flex flex-wrap justify-center gap-3 px-4 sm:px-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/80"
          >
            Book a Consultation
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Our Work
          </Link>
        </div>

        {/* Partner marquee */}
        <div className="pointer-events-auto border-t border-white/10 bg-black/70 backdrop-blur-sm">
          <p className="pt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
            Trusted Partners
          </p>
          <div className="overflow-hidden py-4">
            <div className="marquee-track flex w-max items-center gap-8 sm:gap-14">
              {[...partners, ...partners].map((p, i) => (
                <Link
                  key={i}
                  href={`/partners/${p.slug}`}
                  className="group flex flex-none items-center gap-3 opacity-55 transition-opacity hover:opacity-100"
                >
                  {p.logo ? (
                    <Image
                      src={p.logo}
                      alt={p.title}
                      width={90}
                      height={45}
                      className="h-[34px] w-auto object-contain brightness-0 invert transition-all duration-200 group-hover:brightness-100 group-hover:invert-0"
                      unoptimized
                    />
                  ) : (
                    <span className="font-syne text-[15px] font-bold text-white/70 transition-colors group-hover:text-[#7fffee]">
                      {p.title}
                    </span>
                  )}
                  {p.logo && (
                    <span className="text-[13px] font-semibold text-white/40 transition-colors group-hover:text-white/70">
                      {p.title}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black to-transparent" />
    </main>
  );
}
