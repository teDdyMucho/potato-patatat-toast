import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "KDA Innovations: Multilingual Real Estate AI | AKT",
  description:
    "How AKT built KDA Innovations a multilingual AI agent for real estate — qualifying leads in Spanish, French, Mandarin, and more, then routing each prospect to the right agent automatically. Zero language barriers. Full lead capture 24/7.",
  keywords: [
    "multilingual AI agent real estate",
    "AI lead qualification real estate multilingual",
    "real estate AI lead routing agent",
    "bilingual AI real estate assistant",
    "AI real estate agent Spanish French Mandarin",
    "multilingual real estate chatbot voice agent",
    "AI agent redirects leads to real estate agent",
    "GoHighLevel real estate AI automation",
    "real estate AI lead triage routing",
    "AI voice agent real estate multilingual",
    "automated lead routing real estate",
    "24/7 AI real estate lead qualification",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/kda-innovations`,
  },
  openGraph: {
    title: "KDA Innovations: Multilingual AI Real Estate Agent Built by AKT",
    description:
      "AKT built a multilingual AI agent that qualifies real estate leads in their native language and routes each prospect to the right agent automatically — no manual triage, no language barriers, no missed leads.",
    type: "article",
    url: `${SITE_URL}/partners/kda-innovations`,
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "KDA Innovations: Multilingual Real Estate AI Agent | AKT Case Study",
    description:
      "Speaks Spanish, French, Mandarin — qualifies leads and routes them to the right closer. AKT built the full multilingual AI stack for KDA Innovations.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/kda-innovations#article`,
      "headline":
        "How AKT Built KDA Innovations a Multilingual AI Agent for Real Estate Lead Qualification and Intelligent Agent Routing",
      "description":
        "AKT designed and deployed a production multilingual AI agent for KDA Innovations — a real estate company serving leads across multiple languages. The AI agent qualifies inbound real estate leads in the prospect's native language, determines their intent, budget, and property preferences, and routes each qualified lead to the best-matched real estate agent in real time — eliminating language barriers, reducing manual triage, and ensuring zero leads fall through the cracks.",
      "datePublished": "2025-01-01",
      "dateModified": "2025-05-26",
      "author": {
        "@type": "Organization",
        "name": "AKT Virtual Assistance Services",
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "AKT Virtual Assistance Services",
        "url": SITE_URL,
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/image/akt_logo.png` },
      },
      "mainEntityOfPage": `${SITE_URL}/partners/kda-innovations`,
      "about": {
        "@type": "Organization",
        "name": "KDA Innovations",
        "description":
          "Real estate company leveraging AI to serve multilingual buyer and seller leads — capturing, qualifying, and routing prospects across language barriers to the right real estate agent in real time.",
        "industry": "Real Estate",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a multilingual AI agent for real estate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A multilingual AI agent for real estate is an AI-powered assistant that can communicate with inbound leads in their native language — including Spanish, French, Mandarin, Portuguese, and more — to qualify their intent, budget, timeline, and property needs, then route them to the correct real estate agent without any manual intervention. AKT built this system for KDA Innovations, eliminating language barriers as a lead-loss point.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI lead routing work in real estate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AI lead routing in real estate works by having the AI agent qualify each inbound lead — capturing their language preference, property type, budget range, location, and urgency — and then matching those attributes against the team's agent profiles to assign the best-fit closer automatically. AKT's system for KDA Innovations does this in real time, so every qualified lead reaches the right agent within seconds of their first contact.",
          },
        },
        {
          "@type": "Question",
          "name": "Can an AI agent qualify real estate leads in Spanish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT's multilingual AI agent built for KDA Innovations detects the lead's preferred language from the first message or call and responds natively — including full conversations in Spanish, French, Mandarin, and other languages. The AI qualifies the lead through a natural dialogue, not a translated form, ensuring higher engagement and more accurate data collection from non-English-speaking prospects.",
          },
        },
        {
          "@type": "Question",
          "name": "Why do real estate companies lose multilingual leads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Real estate companies lose multilingual leads because most follow-up systems are English-only, creating immediate friction for Spanish, Mandarin, French, or Portuguese-speaking prospects. Without a native-language response, leads disengage before qualification is complete and find a competitor who communicates in their language. AKT solved this for KDA Innovations by deploying an AI agent that responds in the lead's language from the first touchpoint.",
          },
        },
        {
          "@type": "Question",
          "name": "How does the AI know which real estate agent to route a lead to?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's routing logic for KDA Innovations matches leads to agents based on a profile of qualifying factors: language spoken, property type (buyer vs. seller, residential vs. commercial), geographic area, budget range, and lead urgency. The AI scores the lead against each agent's specialization profile and routes automatically — no dispatcher needed. Agents receive a structured lead summary with all qualification data before the first conversation.",
          },
        },
        {
          "@type": "Question",
          "name": "What languages can AKT's real estate AI agent support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's multilingual AI agent framework supports any language available through the underlying AI model provider — including Spanish, French, Mandarin Chinese, Cantonese, Portuguese, Arabic, Hindi, Korean, and more. For KDA Innovations, the system was configured for the specific language demographics of their target market, with conversation flows optimized for each language's cultural and conversational norms.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Partners", "item": `${SITE_URL}/partners` },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "KDA Innovations Case Study",
          "item": `${SITE_URL}/partners/kda-innovations`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built KDA Innovations' Multilingual Real Estate AI Agent",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Language Detection & Native Conversation",
          "text":
            "The AI agent detects the lead's preferred language from their first message or call and immediately switches to respond natively — conducting the full qualification conversation in the lead's language without translation delays or friction.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Structured Lead Qualification",
          "text":
            "The AI qualifies each lead through a natural conversation — capturing intent (buying/selling/renting), property type, location preferences, budget range, timeline, and urgency — and scoring the lead before any human agent is involved.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Intelligent Agent Matching & Routing",
          "text":
            "The system matches the qualified lead's profile — language, property type, location, budget — against the agent roster and automatically routes the lead to the best-fit closer, delivering a structured briefing with all qualification data.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "CRM Capture & Follow-Up Automation",
          "text":
            "Every interaction is logged to GoHighLevel CRM automatically — lead language, qualification data, routing decision, and conversation transcript — and follow-up sequences are triggered based on lead status and agent assignment.",
        },
      ],
    },
  ],
};

const capabilities = [
  {
    number: "01",
    title: "Multi-Language Lead Detection & Response",
    subtitle: "No language barriers — ever",
    description:
      "The moment a lead makes contact — via chat, SMS, or voice — AKT's AI agent detects their preferred language and responds natively. Not translated. Not phonetic. A fully fluent conversation in Spanish, French, Mandarin, Portuguese, Arabic, or any other configured language. This single capability is the difference between capturing a multilingual lead and losing them to the first competitor who speaks their language.",
    features: [
      "Automatic language detection from first message or spoken word",
      "Native-language responses — not machine-translated English",
      "Conversation flows adapted per language's cultural and communication norms",
      "Seamless mid-conversation language switching if needed",
      "Voice and chat support across all configured languages",
      "No friction, no delay — responds in the lead's language within seconds",
    ],
  },
  {
    number: "02",
    title: "Structured Lead Qualification",
    subtitle: "Every lead profiled before human contact",
    description:
      "The AI doesn't just say hello — it qualifies. Every inbound lead goes through a structured, conversational qualification dialogue that captures the data a real estate agent actually needs before picking up the phone. Buying or selling? Timeline? Budget range? Property type? Location preference? Pre-qualified or still exploring? The AI gathers all of it naturally, in the lead's language, before any agent is involved — so agents only spend time on qualified, informed prospects.",
    features: [
      "Intent classification — buyer, seller, renter, investor",
      "Property type preference — residential, condo, commercial, land",
      "Location and neighborhood preferences captured",
      "Budget range and financing status qualified",
      "Timeline — immediate, 1–3 months, 3–6 months, exploring",
      "Lead urgency scoring — hot, warm, cold classification",
      "Pre-qualification questions adapted by property type and market",
      "Full qualification summary generated for the assigned agent",
    ],
  },
  {
    number: "03",
    title: "Intelligent Agent Routing",
    subtitle: "Right lead. Right agent. Every time.",
    description:
      "After qualification, the AI matches the lead to the best-fit agent on KDA's roster — based on language spoken, property specialization, geographic coverage, and current availability. The matched agent receives a structured briefing: who the lead is, what they want, their budget, their timeline, and the full conversation transcript. No cold handoffs. No 'can you repeat what you told our bot?' The agent walks into the conversation already knowing the lead.",
    features: [
      "Agent matching by language — routes Spanish leads to Spanish-speaking agents",
      "Specialization matching — residential, luxury, commercial, investment",
      "Geographic territory matching — routes by area or neighborhood",
      "Availability-aware routing — respects agent schedules and capacity",
      "Structured agent briefing — full qualification summary delivered pre-call",
      "Fallback routing — if primary agent unavailable, routes to next best match",
      "Routing logic fully configurable — adapts as team grows or changes",
    ],
  },
  {
    number: "04",
    title: "GoHighLevel CRM Integration",
    subtitle: "Every lead. Every interaction. Fully logged.",
    description:
      "Every lead that enters AKT's AI system is automatically created in GoHighLevel CRM with all qualification data, language preference, routing decision, and conversation transcript attached. Pipeline stages update automatically as the lead moves from AI qualification to agent assignment to active conversation. Follow-up sequences fire based on lead status — ensuring no lead goes cold regardless of whether the assigned agent picks up immediately or not.",
    features: [
      "Automatic GHL contact creation per lead with full profile data",
      "Pipeline stage automation — qualification → routing → agent assigned",
      "Language tag added to every contact record",
      "Conversation transcript and AI summary stored on contact timeline",
      "Follow-up sequences triggered by lead status and urgency",
      "Agent notification — instant alert with lead briefing on routing",
      "Re-engagement sequences for cold or unresponsive leads",
      "Reporting — lead volume, qualification rate, language breakdown, routing accuracy",
    ],
  },
];

const faqs = [
  {
    q: "What is a multilingual AI agent for real estate?",
    a: "A multilingual AI agent for real estate communicates with inbound leads in their native language — Spanish, French, Mandarin, Portuguese, and more — to qualify their intent, budget, timeline, and property needs, then routes them to the correct real estate agent automatically. AKT built this for KDA Innovations, eliminating language barriers as a lead-loss point entirely.",
  },
  {
    q: "How does AI lead routing work in real estate?",
    a: "The AI qualifies each lead — capturing language preference, property type, budget, location, and urgency — then matches those attributes against the agent roster to assign the best-fit closer automatically. AKT's system routes each KDA lead in real time, with the agent receiving a full qualification briefing before their first conversation.",
  },
  {
    q: "Can an AI agent qualify real estate leads in Spanish?",
    a: "Yes. AKT's AI for KDA Innovations detects the lead's preferred language from the first message or call and responds natively in Spanish — or French, Mandarin, or any other configured language. The AI conducts the full qualification dialogue natively, not through translation, ensuring higher engagement and more accurate data from non-English leads.",
  },
  {
    q: "Why do real estate companies lose multilingual leads?",
    a: "Most real estate follow-up systems are English-only — creating immediate friction for Spanish, Mandarin, or French-speaking prospects who disengage before qualification is complete. AKT solved this for KDA Innovations by deploying an AI agent that responds in the lead's language from the very first touchpoint, capturing leads competitors miss entirely.",
  },
  {
    q: "How does the AI know which real estate agent to route a lead to?",
    a: "AKT's routing logic matches lead profiles — language spoken, property type, geographic area, budget range, urgency — against each agent's specialization and availability. The AI scores the match automatically and routes without a dispatcher. Agents receive a structured briefing with all qualification data before the handoff call.",
  },
  {
    q: "What languages can AKT's real estate AI agent support?",
    a: "AKT's multilingual AI framework supports any language available through the underlying AI model — including Spanish, French, Mandarin, Cantonese, Portuguese, Arabic, Hindi, Korean, and more. For KDA Innovations, conversation flows were configured for the specific language demographics of their market, adapted to each language's cultural and communication norms.",
  },
];

export default function KDAInnovationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="bg-black pt-16 text-white">

        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-[#0a0a0a]">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-dm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/partners" className="hover:text-white/70 transition-colors">Partners</Link>
              <span>/</span>
              <span className="text-white/65">KDA Innovations</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="border-b border-white/10 bg-[#101113] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href="/partners"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition-colors hover:text-[#7fffee]"
            >
              <ArrowLeft size={16} />
              Back to partners
            </Link>

            <div className="max-w-3xl">
              <span className="mb-4 inline-flex rounded-full border border-[#0abfa3]/40 bg-[#073B34] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7fffee]">
                Multilingual AI Agent · Real Estate · 2025
              </span>
              <h1 className="font-syne text-[clamp(28px,4vw,52px)] font-extrabold leading-tight tracking-tight text-white">
                Multilingual AI Agent Built for{" "}
                <span style={{ color: "#0ABFA3" }}>KDA Innovations</span>{" "}
                — Real Estate Lead Qualification &amp; Intelligent Routing
              </h1>
              <p className="mt-6 text-[16px] leading-8 text-white/62">
                KDA Innovations is a real estate company serving a linguistically diverse buyer and seller market. AKT built their multilingual AI agent from the ground up — an AI that speaks to every inbound lead in their native language, qualifies their intent, budget, and property preferences through natural conversation, and routes each qualified prospect to the best-matched agent on the team automatically. No language barriers. No manual triage. No missed leads.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                  Real Estate AI · United States
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                  Multilingual Lead Qualification
                </span>
              </div>

              {/* Language pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {["Spanish", "French", "Mandarin", "Portuguese", "Arabic", "Hindi", "Korean", "+ more"].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full border border-[#0abfa3]/30 bg-[#073B34]/50 px-4 py-1.5 text-[12px] font-bold text-[#7fffee]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-b border-white/10 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { value: "Multi", label: "Language Support", sub: "Native — not translated" },
                { value: "< 60s", label: "Lead Response Time", sub: "In lead's native language" },
                { value: "100%", label: "Lead Capture", sub: "Every language, every touchpoint" },
                { value: "Auto", label: "Agent Routing", sub: "Right closer, every time" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p
                    className="font-syne text-[clamp(24px,3vw,38px)] font-extrabold tracking-tight"
                    style={{ color: "#0ABFA3" }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-white">{m.label}</p>
                  <p className="mt-0.5 text-[12px] text-white/40">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">The Challenge</p>
              <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
                Multilingual leads were falling through the cracks — and going to competitors who spoke their language
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Real estate markets in diverse metros are multilingual by nature. A significant share of buyers and sellers — particularly in Spanish, Mandarin, French, and Portuguese-speaking communities — make their first contact in their native language. When the response comes back in English-only, or worse, after a delay while staff searches for someone who can help, the lead disengages and goes to the next agent in their search results.
                </p>
                <p>
                  KDA Innovations was experiencing exactly this gap. Inbound leads from non-English speakers were either lost at the first point of contact or manually triaged — requiring staff to identify the lead&apos;s language, find an available agent who could communicate with them, and make the handoff. This process was slow, inconsistent, and unscalable as lead volume grew.
                </p>
                <p>
                  On top of the language barrier, KDA had no systematic way to qualify leads before agent contact. Agents were spending time on unqualified prospects — early-stage browsers, wrong property types, out-of-area inquiries — while motivated, ready-to-move buyers waited for callbacks. They needed an AI that could sort, qualify, and route before any human was involved.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Multilingual lead response", "English-only — non-English leads lost"],
                  ["Lead qualification", "Manual — inconsistent, agent-dependent"],
                  ["Agent routing", "Manual triage — slow, prone to mismatches"],
                  ["Lead response speed", "Hours — bottlenecked on staff availability"],
                  ["Lead data captured", "Partial — no structured intake process"],
                  ["After-hours coverage", "None — leads waited until business hours"],
                  ["CRM lead records", "Incomplete — no qualification data attached"],
                ].map(([label, state]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-[#101113] px-4 py-3">
                    <p className="text-[12px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-white/60">{state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Four Capabilities */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">What AKT Built</p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              One AI agent. Every language. Every lead qualified and routed.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT designed and deployed KDA Innovations&apos; complete multilingual AI lead system — four integrated capabilities that take every inbound real estate lead from first contact to qualified, routed, and briefed agent without any manual touchpoint.
            </p>

            <div className="mt-14 space-y-8">
              {capabilities.map((cap) => (
                <div
                  key={cap.number}
                  className="rounded-card border border-white/10 bg-black/30 p-8 lg:p-10"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                    <div className="shrink-0 lg:w-[56px]">
                      <p
                        className="font-syne text-[48px] font-extrabold leading-none tracking-tight"
                        style={{ color: "#0ABFA3", opacity: 0.22 }}
                      >
                        {cap.number}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                        {cap.subtitle}
                      </div>
                      <h3 className="font-syne text-[clamp(18px,2vw,24px)] font-bold tracking-tight text-white">
                        {cap.title}
                      </h3>
                      <p className="mt-4 text-[14px] leading-7 text-white/62">{cap.description}</p>
                      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {cap.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <CheckCircle size={13} className="mt-0.5 shrink-0 text-[#0abfa3]" />
                            <span className="text-[13px] leading-6 text-white/65">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">The Results</p>
              <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
                Every lead captured, qualified, and routed — regardless of language, time of day, or agent availability
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  KDA Innovations now captures every inbound lead — in any language, at any hour — through an AI that responds within 60 seconds in the lead&apos;s native tongue. Spanish-speaking buyers who previously disengaged at an English-only chatbot now move through a fluent, natural qualification conversation. The same is true for French, Mandarin, Portuguese, and every other language in the system.
                </p>
                <p>
                  Every qualified lead is matched to the right agent based on language, property type, location, and budget — with a full briefing delivered to the agent before their first call. Agents no longer waste time on cold, unqualified leads or scramble to find someone who speaks the client&apos;s language. The AI handles the triage. The agent handles the close.
                </p>
                <p>
                  GoHighLevel CRM captures every interaction — qualification data, language tag, routing decision, and full conversation transcript — giving KDA&apos;s leadership complete visibility into lead volume, language breakdown, agent performance, and pipeline health in real time.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Multilingual lead response", "Native AI — responds in any language instantly"],
                  ["Lead qualification", "Fully automated — structured data captured per lead"],
                  ["Agent routing", "AI-matched by language, specialty & territory"],
                  ["Lead response speed", "Under 60 seconds — 24/7, no exceptions"],
                  ["Lead data captured", "Full profile — intent, budget, type, timeline"],
                  ["After-hours coverage", "100% — AI never sleeps"],
                  ["CRM lead records", "Complete — full transcript + qualification summary"],
                ].map(([label, after]) => (
                  <div key={label} className="rounded-lg border border-[#0abfa3]/20 bg-[#062B26]/40 px-4 py-3">
                    <p className="text-[12px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-[#7fffee]">{after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">Tech Stack</p>
            <h2 className="mb-10 font-syne text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-white">
              What powers the KDA multilingual AI system
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { name: "Multilingual AI Models", desc: "Native language generation — Spanish, French, Mandarin, and more" },
                { name: "Voice AI", desc: "Real-time voice conversations in any configured language" },
                { name: "Lead Qualification Engine", desc: "Structured intake — intent, budget, property type, urgency" },
                { name: "GoHighLevel CRM", desc: "Pipeline, routing, follow-up sequences, and reporting" },
              ].map((tool) => (
                <div key={tool.name} className="rounded-card border border-white/10 bg-black/30 p-6">
                  <p className="font-syne text-[14px] font-bold text-white">{tool.name}</p>
                  <p className="mt-2 text-[12px] leading-5 text-white/40">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">FAQ</p>
            <h2 className="mb-12 text-center font-syne text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-white">
              Questions about multilingual AI agents for real estate
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-card border border-white/10 bg-[#101113] p-6 open:border-[#0abfa3]/30"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h3 className="font-syne text-[15px] font-bold text-white group-open:text-[#7fffee]">
                      {faq.q}
                    </h3>
                    <span className="mt-0.5 shrink-0 text-white/40 group-open:rotate-180 transition-transform duration-200">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-[14px] leading-7 text-white/62">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div
              className="rounded-card border p-12 text-center"
              style={{ background: "#062B26", borderColor: "#155E53" }}
            >
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                Build Your Multilingual AI System
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Losing leads because of a language barrier?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds multilingual AI agents for real estate — lead qualification, intelligent routing, and CRM integration — custom-configured for your market&apos;s language demographics. Every lead captured. Every language covered.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold text-white transition-colors"
                  style={{ background: "#0ABFA3" }}
                >
                  Book a Free Consultation
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 px-7 py-3.5 text-[14px] font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  View All Partners
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
