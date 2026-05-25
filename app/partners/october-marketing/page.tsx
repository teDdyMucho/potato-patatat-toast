import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "October Marketing: Dealership AI Chatbot | AKT",
  description:
    "How AKT built and maintains October Marketing's custom car dealership AI chatbot — a ground-up alternative to Closebot powered by n8n, GoHighLevel, and Retell AI, trusted by car dealerships to generate and close leads automatically.",
  keywords: [
    "AI chatbot for car dealerships",
    "custom AI chatbot automotive dealership",
    "Closebot alternative for dealerships",
    "car dealership AI lead generation chatbot",
    "Retell AI car dealership voice agent",
    "n8n GoHighLevel car dealership automation",
    "automotive AI sales agent n8n",
    "car dealership AI agent built from scratch",
    "GoHighLevel car dealership CRM automation",
    "AI chatbot for auto dealership leads",
    "custom AI chatbot cheaper than Closebot",
    "car dealership automation agency",
    "AI voice agent car dealership Retell",
    "car dealership chatbot maintenance service",
    "n8n automotive lead qualification chatbot",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/october-marketing`,
  },
  openGraph: {
    title: "October Marketing: Custom Car Dealership AI Chatbot + Retell Voice Agent | AKT",
    description:
      "AKT built October Marketing's car dealership AI chatbot from the ground up — n8n backbone, GoHighLevel CRM, Retell AI voice, and full ongoing maintenance. A true Closebot alternative trusted by auto dealerships.",
    type: "article",
    url: `${SITE_URL}/partners/october-marketing`,
    publishedTime: "2024-01-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "October Marketing: AI Chatbot for Car Dealerships | AKT Case Study",
    description:
      "Custom-built car dealership AI chatbot — cheaper than Closebot, powered by n8n + GoHighLevel + Retell AI. Built and maintained by AKT.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/october-marketing#article`,
      "headline":
        "How AKT Built and Maintains a Custom Car Dealership AI Chatbot for October Marketing — Powered by n8n, GoHighLevel, and Retell AI",
      "description":
        "AKT designed and deployed a fully custom AI chatbot system for October Marketing's car dealership clients — built from the ground up as a more affordable, more flexible alternative to off-the-shelf tools like Closebot. The system uses n8n for automation, GoHighLevel for CRM, and Retell AI for a conversational voice agent layer, delivering end-to-end lead generation and qualification for auto dealerships.",
      "datePublished": "2024-01-01",
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
      "mainEntityOfPage": `${SITE_URL}/partners/october-marketing`,
      "about": {
        "@type": "Organization",
        "name": "October Marketing",
        "url": "https://www.octobermarketing.com",
        "description":
          "October Marketing is a digital marketing agency specializing in Google Ads and paid search for automotive dealerships and local businesses across the United States.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a custom AI chatbot for car dealerships and how does it generate leads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A custom AI chatbot for car dealerships is a conversational AI agent deployed on a dealership's website, SMS line, or social channels that engages incoming leads automatically — qualifying their intent (buying, trading, financing), capturing contact details, and routing hot leads to the sales floor or scheduling a showroom appointment. Unlike generic chatbot SaaS tools, a custom-built chatbot is trained on the specific dealership's inventory, promotions, financing options, and sales scripts. AKT built exactly this for October Marketing's dealership clients using n8n as the automation backbone and GoHighLevel for CRM — resulting in a system that is both more capable and significantly cheaper than commercial alternatives like Closebot.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AKT's car dealership AI chatbot compare to Closebot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Closebot is a popular AI SMS and chat agent platform designed to work natively with GoHighLevel. While effective, Closebot charges a monthly subscription fee on top of GoHighLevel costs. AKT built October Marketing a custom AI chatbot system from the ground up — one that delivers the same core functionality (AI chat, SMS qualification, lead routing, CRM sync) without the Closebot subscription layer. Because the system is built on n8n (self-hosted, no per-task fees) and connects directly to GoHighLevel via API, the total operational cost is significantly lower — while giving October Marketing full control over the chatbot's logic, training, and behavior.",
          },
        },
        {
          "@type": "Question",
          "name": "What does a Retell AI voice agent do for a car dealership?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A Retell AI voice agent for car dealerships is an AI-powered phone agent that answers inbound calls, qualifies leads in natural conversation, handles after-hours inquiries, and schedules test drives or service appointments — all without a human picking up the phone. Retell AI delivers sub-600ms latency, making conversations feel natural and responsive. AKT deployed a Retell AI voice layer for October Marketing's chatbot system, extending the same AI lead qualification from chat and SMS to inbound phone calls — so dealerships never miss a lead regardless of channel.",
          },
        },
        {
          "@type": "Question",
          "name": "How does n8n power a car dealership AI chatbot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "n8n is a self-hosted workflow automation platform that serves as the central nervous system of AKT's car dealership AI chatbot. When a lead initiates a chat or SMS conversation, n8n routes the message to the AI model, receives the AI's response, sends it back to the lead, logs the conversation, creates or updates the contact in GoHighLevel, applies tags based on lead qualification signals, triggers follow-up sequences, and notifies the sales team — all in a single automated workflow with no per-task cost. AKT self-hosts n8n, meaning the entire system scales without increasing automation costs.",
          },
        },
        {
          "@type": "Question",
          "name": "Can this car dealership AI chatbot system work for other types of businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. While October Marketing's chatbot was built and optimized for automotive dealerships, the underlying architecture — n8n automation backbone, GoHighLevel CRM integration, AI chat/SMS qualification, and optional Retell AI voice — is industry-agnostic. AKT has deployed similar systems for real estate agencies, roofing companies, financial services, and wholesale distribution. The core pattern (AI qualifies inbound leads, n8n routes and logs, GHL manages the pipeline) applies to any business with a high volume of inbound inquiries that currently relies on manual follow-up.",
          },
        },
        {
          "@type": "Question",
          "name": "What does ongoing AI chatbot maintenance include for a car dealership?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's ongoing maintenance for October Marketing's car dealership chatbot includes: monitoring n8n workflow performance and resolving any execution errors, updating AI agent prompts and conversation flows as dealership promotions or inventory focus changes, expanding the system with new capabilities as the client's needs evolve, managing GoHighLevel CRM pipeline configurations, and maintaining the Retell AI voice agent scripts. Because the system is custom-built, AKT can modify any part of the stack quickly — without waiting on a SaaS vendor's update cycle or support queue.",
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
          "name": "October Marketing Case Study",
          "item": `${SITE_URL}/partners/october-marketing`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built the October Marketing Car Dealership AI Chatbot System",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Custom AI Chat & SMS Agent",
          "text":
            "AKT built a custom AI chatbot trained on car dealership sales scripts, inventory qualification questions, and financing FAQs — deployed across website chat and SMS to engage and qualify every inbound lead automatically.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "n8n Automation Backbone",
          "text":
            "AKT deployed self-hosted n8n as the central automation engine — routing every lead interaction, triggering AI responses, logging conversations, and connecting chat/SMS/voice to GoHighLevel without per-task fees.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "GoHighLevel CRM Integration",
          "text":
            "AKT connected the chatbot system to GoHighLevel — auto-creating contacts, applying qualification tags, updating pipeline stages, and enrolling leads in nurturing sequences based on chatbot conversation outcomes.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Retell AI Voice Agent",
          "text":
            "AKT deployed a Retell AI voice agent that handles inbound dealership calls — qualifying leads in natural conversation with sub-600ms response latency, scheduling test drives, and routing hot buyers to the sales team.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Ongoing Maintenance & Optimization",
          "text":
            "AKT provides continuous maintenance — updating AI prompts, expanding automation workflows, monitoring system health, and adding new capabilities as October Marketing's dealership client base grows.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Custom Car Dealership AI Chatbot",
    subtitle: "Ground-up build · Cheaper than Closebot",
    description:
      "October Marketing needed an AI chat and SMS solution for their car dealership clients — one that could qualify leads, answer inventory questions, handle financing inquiries, and route hot buyers to the sales floor, all automatically. Rather than paying for a Closebot subscription on top of GoHighLevel, AKT built a fully custom AI chatbot from the ground up. Trained on dealership-specific sales scripts, inventory qualification logic, and financing FAQs, this chatbot handles every inbound lead conversation without human intervention — at a fraction of the cost of commercial alternatives.",
    features: [
      "Fully custom-built — not a white-labeled SaaS tool",
      "Trained on dealership sales scripts and inventory qualification flows",
      "Website chat deployment — engages every site visitor automatically",
      "SMS AI agent — responds to inbound texts and outbound drip leads",
      "Financing pre-qualification questions built into conversation flow",
      "Test drive scheduling — books appointments directly from chat",
      "After-hours coverage — no lead left unanswered regardless of time",
      "Cheaper operational cost than Closebot subscription model",
    ],
    tools: ["Custom AI Agent", "n8n", "GoHighLevel", "SMS Automation", "Chat Deployment"],
  },
  {
    number: "02",
    title: "n8n Automation Backbone",
    subtitle: "Self-hosted · Zero per-task fees · Full control",
    description:
      "The entire chatbot system runs on a self-hosted n8n instance that AKT built and maintains — serving as the automation engine that connects every component together. When a lead sends a message, n8n receives the webhook, sends it to the AI model, returns the response, logs the conversation to GoHighLevel, applies qualification tags, and triggers the next workflow step — all within a single automated pipeline. Because n8n is self-hosted and open-source, there are no per-task charges. The system can handle thousands of daily lead interactions at flat infrastructure cost.",
    features: [
      "Self-hosted n8n — no Zapier or per-task pricing",
      "Inbound webhook receiver for chat, SMS, and voice events",
      "AI model routing — sends conversation context, receives response",
      "Real-time message delivery back to lead channel",
      "GoHighLevel contact creation and update on every interaction",
      "Qualification tag application based on AI conversation outcome",
      "Lead routing logic — hot buyers flagged to sales team instantly",
      "Error handling and retry logic — 99%+ workflow reliability",
    ],
    tools: ["n8n Self-Hosted", "Webhook Automation", "API Integration", "Workflow Logic"],
  },
  {
    number: "03",
    title: "GoHighLevel CRM Integration",
    subtitle: "Every lead captured · Every conversation logged",
    description:
      "Every chatbot interaction flows directly into GoHighLevel — the CRM that October Marketing's dealership clients use to manage their sales pipeline. AKT connected the n8n automation engine to GHL via REST API, so every new lead that engages the chatbot becomes a contact in GHL automatically. Conversation summaries, qualification signals, and AI-detected intent are pushed as notes and tags to each contact record. Sales teams see exactly where each lead stands — without manually reviewing chat logs or entering data. Pipeline stages update automatically as leads progress through the qualification flow.",
    features: [
      "Auto-contact creation — every chatbot lead lands in GHL instantly",
      "Conversation summary pushed to GHL contact notes",
      "Qualification tags — vehicle type, budget, timeline, financing intent",
      "Pipeline stage automation — leads move based on chatbot outcomes",
      "Sales team notification — hot buyers flagged with instant GHL alert",
      "Appointment booking synced to GHL calendar automatically",
      "Follow-up sequence enrollment based on qualification result",
      "Full lead history visible in GHL — no data scattered across tools",
    ],
    tools: ["GoHighLevel CRM", "GHL REST API", "Pipeline Automation", "Contact Management"],
  },
  {
    number: "04",
    title: "Retell AI Voice Agent",
    subtitle: "Inbound calls handled · Sub-600ms latency",
    description:
      "Chat and SMS capture most digital leads — but car dealerships still receive a high volume of inbound phone calls. AKT extended October Marketing's chatbot system with a Retell AI voice agent that handles inbound calls the same way the chat agent handles text: qualifying the caller, answering inventory and financing questions, scheduling test drives, and routing serious buyers to a live sales representative. Retell AI delivers under 600 milliseconds of response latency, making the conversation feel natural rather than robotic. The voice agent operates 24/7 — so a lead calling at 11pm on a Sunday gets qualified immediately instead of hitting voicemail.",
    features: [
      "Retell AI voice agent — inbound call qualification and routing",
      "Sub-600ms response latency — natural, human-like conversation",
      "24/7 inbound call coverage — no missed leads after hours",
      "Trained on same dealership scripts as chat agent — consistent messaging",
      "Test drive and service appointment scheduling via voice",
      "Hot buyer escalation — transfers live calls to sales team instantly",
      "Call summary and lead data pushed to GoHighLevel via n8n",
      "31+ language support — serves multilingual dealership markets",
    ],
    tools: ["Retell AI", "Voice Agent", "n8n Integration", "GoHighLevel", "24/7 Automation"],
  },
  {
    number: "05",
    title: "Ongoing Maintenance & Optimization",
    subtitle: "Fully managed · Continuously improving",
    description:
      "AKT doesn't just build and hand off — AKT owns the ongoing operation and maintenance of the entire chatbot system for October Marketing. This includes monitoring n8n workflow health and resolving execution errors, updating AI agent conversation prompts as dealership promotions change, expanding automation capabilities as new lead channels are added, maintaining GoHighLevel pipeline configurations, and optimizing the Retell voice agent based on call performance data. Because the system is fully custom and AKT controls every layer, updates happen in hours — not weeks — without waiting on a vendor's support queue or release schedule.",
    features: [
      "n8n workflow monitoring — proactive error detection and resolution",
      "AI prompt updates — conversation scripts updated with promotions and inventory",
      "GoHighLevel CRM maintenance — pipelines, tags, and sequences kept current",
      "Retell AI voice script optimization based on call quality data",
      "System expansion — new channels and capabilities added as needed",
      "Performance reporting — lead volume, qualification rates, conversion tracking",
      "Priority response — issues resolved without vendor support delays",
      "Scalable architecture — system grows with dealership client base",
    ],
    tools: ["n8n Maintenance", "AI Prompt Engineering", "GoHighLevel Admin", "Retell AI Optimization"],
  },
];

const faqs = [
  {
    q: "What is a custom AI chatbot for car dealerships and how does it generate leads?",
    a: "A custom AI chatbot for car dealerships engages inbound leads automatically via website chat and SMS — qualifying their intent (buying, trading, financing), capturing contact details, scheduling test drives, and routing hot leads to the sales floor. Unlike generic SaaS tools, AKT's chatbot is trained specifically on each dealership's inventory, promotions, and sales scripts, and built on n8n + GoHighLevel for full control and lower cost.",
  },
  {
    q: "How does AKT's car dealership chatbot compare to Closebot?",
    a: "Closebot charges a monthly subscription on top of GoHighLevel. AKT built October Marketing a custom system from the ground up — same core functionality (AI chat, SMS qualification, CRM sync) without the Closebot subscription layer. The system runs on self-hosted n8n with no per-task fees, giving October Marketing full control over the chatbot's logic while paying significantly less in ongoing costs.",
  },
  {
    q: "What does a Retell AI voice agent do for a car dealership?",
    a: "A Retell AI voice agent answers inbound dealership calls, qualifies leads in natural conversation (sub-600ms latency), handles after-hours inquiries, and schedules test drives or service appointments automatically. AKT deployed this as an extension of October Marketing's chatbot system — so dealerships capture leads from phone calls with the same speed and quality as chat and SMS.",
  },
  {
    q: "How does n8n power the car dealership AI chatbot?",
    a: "n8n is AKT's self-hosted automation backbone that routes every lead interaction — receiving chat/SMS/voice events, sending them to the AI model, returning responses, logging to GoHighLevel, applying qualification tags, and triggering follow-up sequences. Because n8n is self-hosted, there are no per-task fees, meaning the system scales with dealership lead volume at flat infrastructure cost.",
  },
  {
    q: "Can this AI chatbot system work for businesses other than car dealerships?",
    a: "Yes. While built for automotive dealerships, the underlying architecture (n8n + GoHighLevel + AI chat/SMS + optional Retell voice) is industry-agnostic. AKT has deployed similar systems for real estate, roofing, financial services, and wholesale distribution. Any business with high inbound lead volume and manual follow-up bottlenecks is a strong fit.",
  },
  {
    q: "What does ongoing AI chatbot maintenance include?",
    a: "AKT's maintenance for October Marketing includes: monitoring n8n workflow health, updating AI prompts as dealership promotions change, expanding automation with new capabilities, managing GoHighLevel CRM configurations, and optimizing Retell voice agent scripts. Because the system is custom-built, AKT can modify any layer in hours — no vendor support queues, no waiting on a SaaS update cycle.",
  },
];

export default function OctoberMarketingPage() {
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
              <span className="text-white/65">October Marketing</span>
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

            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-4 inline-flex rounded-full border border-[#0abfa3]/40 bg-[#073B34] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7fffee]">
                  Automotive AI · Custom Chatbot · Ongoing
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Custom AI Chatbot Built for{" "}
                  <span style={{ color: "#0ABFA3" }}>Car Dealerships</span>{" "}
                  — Powered by n8n, GoHighLevel & Retell AI
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  October Marketing is a Google Ads agency serving automotive dealerships across the United States. AKT built and maintains their custom car dealership AI chatbot system — a ground-up alternative to Closebot that runs on n8n and GoHighLevel, qualifies leads via chat and SMS, books test drives automatically, and extends to a Retell AI voice agent for inbound calls. Trusted by auto dealerships. Deployable for any lead-driven business.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.octobermarketing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    octobermarketing.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Automotive AI · Chatbot Maintenance
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/octobermarketing.png"
                    alt="October Marketing logo — automotive digital marketing agency"
                    width={180}
                    height={90}
                    className="w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-b border-white/10 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
              {[
                { value: "Ground-Up", label: "Custom Build", sub: "No SaaS template used" },
                { value: "Closebot Alt.", label: "Cost Savings", sub: "No subscription overhead" },
                { value: "5", label: "Integrated Systems", sub: "Chat · SMS · Voice · n8n · GHL" },
                { value: "<600ms", label: "Voice Latency", sub: "Retell AI response time" },
                { value: "24/7", label: "Lead Coverage", sub: "Chat, SMS & inbound calls" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p className="font-syne text-[clamp(16px,2vw,26px)] font-extrabold tracking-tight" style={{ color: "#0ABFA3" }}>
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
                Car dealerships generate leads around the clock — but every manual follow-up step leaks buyers to faster-responding competitors
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Car dealerships are among the most lead-intensive businesses in the world. A consumer interested in a vehicle will submit a form, start a chat, send a text, or call — often within the same few minutes of research. Studies show that leads contacted within five minutes of inquiry are 21x more likely to convert than those contacted after 30 minutes. Most dealerships miss that window entirely.
                </p>
                <p>
                  October Marketing was running Google Ads campaigns that drove strong inbound traffic for their dealership clients — but the back-end lead response infrastructure couldn&apos;t keep up. Manual follow-up was slow. After-hours leads sat unanswered until the next morning. GoHighLevel was in place but underutilized — leads weren&apos;t flowing through qualification sequences automatically.
                </p>
                <p>
                  Commercial tools like Closebot offered a partial solution — AI chat and SMS via GoHighLevel — but came with recurring subscription costs layered on top of GHL fees, limited customization, and no ability to modify the AI&apos;s conversation logic without vendor involvement. October Marketing needed something built to their specifications, fully owned, and maintainable without relying on a third-party product roadmap.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Lead response speed", "Manual follow-up — slow, inconsistent timing"],
                  ["After-hours coverage", "Voicemail and missed chats — leads go cold"],
                  ["Chat & SMS automation", "Limited — no AI qualification layer"],
                  ["GoHighLevel utilization", "Underused — contacts not auto-qualified"],
                  ["Inbound calls", "Manual — staff required to qualify each call"],
                  ["AI chatbot cost", "Closebot subscription on top of GHL fees"],
                  ["Customization control", "Dependent on SaaS vendor update cycles"],
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

        {/* Five Systems */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">What AKT Built</p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              Five systems. One AI-powered dealership lead engine.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT designed, built, and maintains a fully custom AI chatbot system for October Marketing&apos;s car dealership clients — from chat and SMS qualification to Retell AI voice calls, all connected through n8n and GoHighLevel.
            </p>

            {/* System overview image */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/tool/octn8n.png"
                alt="October Marketing n8n automation workflow — car dealership AI chatbot system architecture"
                width={1400}
                height={700}
                className="w-full h-auto"
              />
            </div>

            <div className="mt-14 space-y-8">
              {systems.map((system) => (
                <div key={system.number} className="rounded-card border border-white/10 bg-black/30 p-8 lg:p-10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                    <div className="shrink-0 lg:w-[56px]">
                      <p className="font-syne text-[48px] font-extrabold leading-none tracking-tight" style={{ color: "#0ABFA3", opacity: 0.22 }}>
                        {system.number}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                        {system.subtitle}
                      </div>
                      <h3 className="font-syne text-[clamp(18px,2vw,24px)] font-bold tracking-tight text-white">
                        {system.title}
                      </h3>
                      <p className="mt-4 text-[14px] leading-7 text-white/62">{system.description}</p>
                      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {system.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <CheckCircle size={13} className="mt-0.5 shrink-0 text-[#0abfa3]" />
                            <span className="text-[13px] leading-6 text-white/65">{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {system.tools.map((t) => (
                          <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50">
                            {t}
                          </span>
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
                Every inbound lead qualified instantly — at lower cost, with full control, around the clock
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  October Marketing&apos;s dealership clients now have a fully automated lead response layer that works faster than any human team. Every website visitor who starts a chat, every lead who texts in, and every caller who dials the dealership gets an immediate AI response — day or night, weekday or weekend. The chatbot qualifies their intent, books test drives, and routes serious buyers to a live sales rep without any manual involvement.
                </p>
                <p>
                  The Retell AI voice agent extended this coverage to inbound phone calls — the highest-intent lead channel for automotive dealerships. Callers who previously hit voicemail after hours now reach an AI agent that sounds natural, knows the dealership&apos;s inventory and offers, and can schedule a visit before the call ends.
                </p>
                <p>
                  By building custom instead of subscribing to Closebot, October Marketing eliminated a recurring subscription layer entirely. The system is fully owned, fully modifiable, and scales with their client base without per-seat or per-conversation pricing. AKT&apos;s ongoing maintenance means the system keeps pace with changing promotions, new channels, and expanding dealership rosters — without October Marketing managing a vendor relationship.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Lead response speed", "AI responds within seconds — 24/7 across all channels"],
                  ["After-hours coverage", "Chatbot + voice agent — zero missed leads after hours"],
                  ["Chat & SMS automation", "AI qualifies, books, and routes — fully automated"],
                  ["GoHighLevel utilization", "Every lead tagged, staged, and enrolled automatically"],
                  ["Inbound calls", "Retell AI voice agent — qualification without staff"],
                  ["AI chatbot cost", "Self-hosted n8n — no Closebot subscription needed"],
                  ["Customization control", "Full ownership — any change made in hours by AKT"],
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
              The full stack powering October Marketing&apos;s dealership AI system
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { name: "n8n", desc: "Automation backbone — self-hosted" },
                { name: "GoHighLevel", desc: "CRM, pipelines & sequences" },
                { name: "Custom AI Agent", desc: "Chat & SMS lead qualification" },
                { name: "Retell AI", desc: "Voice agent — inbound calls" },
                { name: "AKT Maintenance", desc: "Ongoing optimization & support" },
              ].map((tool) => (
                <div key={tool.name} className="rounded-card border border-white/10 bg-black/30 p-5 text-center">
                  <p className="font-syne text-[13px] font-bold text-white">{tool.name}</p>
                  <p className="mt-1 text-[11px] text-white/40">{tool.desc}</p>
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
              Questions about AI chatbots for car dealerships
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-card border border-white/10 bg-[#101113] p-6 open:border-[#0abfa3]/30">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h3 className="font-syne text-[15px] font-bold text-white group-open:text-[#7fffee]">
                      {faq.q}
                    </h3>
                    <span className="mt-0.5 shrink-0 text-white/40 group-open:rotate-180 transition-transform duration-200">▾</span>
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
            <div className="rounded-card border p-12 text-center" style={{ background: "#062B26", borderColor: "#155E53" }}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                Custom AI. Your Dealership. Fully Automated.
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Want an AI chatbot built for your dealership — without the Closebot price tag?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds custom AI chatbot systems for car dealerships from the ground up — n8n backend, GoHighLevel CRM, AI chat and SMS, and an optional Retell AI voice agent. Fully owned. Fully maintained. No SaaS subscription stacked on top.
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
