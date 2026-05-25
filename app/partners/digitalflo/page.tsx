import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Digital Flo: AI Call Center Build | AKT",
  description:
    "How AKT built Digital Flo's AI call center infrastructure — Retell AI voice agents, Closebot chat/SMS agents, GoHighLevel CRM per client, and n8n automation as the backend — delivering custom AI call center systems that replace $3–7K/month human setters with 60-second AI response.",
  keywords: [
    "AI call center agency Retell AI",
    "Closebot GoHighLevel automation agency",
    "AI voice agent setup for agencies",
    "n8n GoHighLevel CRM workflow automation",
    "white label AI call center agency",
    "AI appointment setter auto booking system",
    "Retell AI voice agent integration",
    "Closebot SMS chat agent GoHighLevel",
    "AI call center for small business",
    "replace human setters with AI voice agent",
    "GoHighLevel white label AI automation",
    "instant lead response AI system",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/digitalflo`,
  },
  openGraph: {
    title: "Digital Flo™: AI Call Center Agency Infrastructure Built by AKT",
    description:
      "AKT built Digital Flo's entire AI call center stack — Retell AI voice agents, Closebot chat/SMS, GoHighLevel CRM, and n8n automation — custom-configured per client to deliver instant lead response and auto-booking at scale.",
    type: "article",
    url: `${SITE_URL}/partners/digitalflo`,
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Flo™: Full AI Call Center Agency Stack Built by AKT | Case Study",
    description:
      "Retell AI voice agents + Closebot SMS + GoHighLevel CRM + n8n automation — AKT built the entire backend that powers Digital Flo's AI call center agency.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/digitalflo#article`,
      "headline":
        "How AKT Built Digital Flo's AI Call Center Agency Infrastructure — Retell AI Voice Agents, Closebot Chat/SMS, GoHighLevel CRM, and n8n Automation",
      "description":
        "AKT engineered the complete AI call center backend for Digital Flo — an AI automation agency that delivers bespoke voice agent, chat, and SMS automation systems to clients across industries. AKT built the Retell AI voice agent layer, Closebot chat/SMS integration, per-client GoHighLevel CRM sub-accounts, and n8n automation workflows that connect every touchpoint into a single automated pipeline — enabling instant lead response, auto-booking, and scalable client management.",
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
      "mainEntityOfPage": `${SITE_URL}/partners/digitalflo`,
      "about": {
        "@type": "Organization",
        "name": "Digital Flo™",
        "url": "https://mydigitalflo.io",
        "description":
          "AI automation agency offering the AI Social Flo System™ — a done-for-you AI call center and sales automation system including AI voice agents, DM agents, smart lead qualification, auto-booking, follow-up sequences, and performance dashboards. Positioned to replace $3–7K/month human appointment setters with 24/7 AI at a fraction of the cost.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Retell AI and how is it used for AI call center agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Retell AI is a production-ready voice AI platform that enables agencies to build and deploy AI voice agents with under 600ms latency, support for 31+ languages, and integration with major telephony providers. AKT used Retell AI to build Digital Flo's voice agent layer — a system that handles inbound and outbound calls, qualifies leads, and books appointments automatically for each of Digital Flo's clients.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Closebot and how does it work with GoHighLevel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Closebot is the #1 rated AI appointment setter platform built for GoHighLevel agencies. It handles chat and SMS conversations — qualifying leads, answering questions, and booking appointments — directly inside GHL sub-accounts. AKT integrated Closebot as Digital Flo's chat and SMS agent layer, connected to GoHighLevel CRM via n8n automation for seamless data flow.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AKT build a custom AI call center for each client?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT builds each Digital Flo client's AI call center as a unique, bespoke system tailored to their industry, lead sources, and business needs. The process involves configuring a Retell AI voice agent trained on the client's products and objections, setting up Closebot for their chat and SMS channels, creating a GoHighLevel CRM sub-account with their pipeline and automations, and building n8n workflows that connect every touchpoint into a single backend.",
          },
        },
        {
          "@type": "Question",
          "name": "How much faster is AI lead response compared to human setters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's AI systems built for Digital Flo respond to new leads within 60 seconds — 24 hours a day, 7 days a week. Research shows that leads contacted within 5 minutes are 100x more likely to convert than those contacted after 30 minutes. Human setters working business hours simply cannot compete with an AI that responds instantly, at any hour, without payroll cost.",
          },
        },
        {
          "@type": "Question",
          "name": "Can n8n connect GoHighLevel, Retell AI, and Closebot in one workflow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT built n8n as the automation backbone for Digital Flo's entire stack — connecting GoHighLevel CRM, Retell AI voice agents, and Closebot chat/SMS agents so that lead data, conversation history, booking confirmations, and follow-up triggers all flow through a single automated pipeline without manual data entry or tool-switching.",
          },
        },
        {
          "@type": "Question",
          "name": "What results do clients see from an AI call center system compared to human setters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Digital Flo clients powered by AKT's AI call center infrastructure have reported outcomes including a 467% increase in qualified calls booked (from 3 to 17 per week), cost per acquisition dropping from $450 to $97 (-78%), and average monthly revenue increases of $40,000 — while eliminating $3,000–$7,000 per month in human setter payroll costs.",
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
          "name": "Digital Flo Case Study",
          "item": `${SITE_URL}/partners/digitalflo`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Builds a Custom AI Call Center System for Each Digital Flo Client",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Retell AI Voice Agent — Inbound & Outbound",
          "text":
            "AKT configures a Retell AI voice agent trained on the client's business, products, objections, and qualification criteria — capable of handling inbound calls, running outbound prospecting, qualifying leads, and booking appointments automatically.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Closebot Chat & SMS Agent — GoHighLevel Native",
          "text":
            "AKT sets up Closebot inside the client's GoHighLevel sub-account to handle chat and SMS conversations — qualifying leads, answering FAQs, and booking calls — running 24/7 across all text-based channels simultaneously.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "GoHighLevel CRM — Per-Client Sub-Account",
          "text":
            "AKT builds each client's GoHighLevel sub-account from scratch — pipeline stages, automation workflows, lead nurturing sequences, appointment calendars, and reporting dashboards — fully configured for their specific business model.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "n8n Automation Backbone — Everything Connected",
          "text":
            "AKT builds n8n workflows as the backend nervous system — connecting Retell AI, Closebot, and GoHighLevel CRM so lead data, booking confirmations, conversation logs, and follow-up triggers all flow through one unified pipeline automatically.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Retell AI Voice Agents",
    subtitle: "Inbound & Outbound · 24/7",
    image: "/tool/retell.png" as string | null,
    description:
      "AKT builds and deploys Retell AI voice agents for each of Digital Flo's clients — trained specifically on that client's business, products, sales objections, and qualification criteria. The voice agent handles inbound calls instantly (under 600ms response), runs outbound prospecting campaigns, qualifies every lead against the client's ideal customer profile, and books appointments directly into their calendar — without a human setter ever picking up the phone.",
    features: [
      "Custom voice agent trained on client's brand, products, and objections",
      "Inbound call handling — answers every call instantly, 24/7",
      "Outbound prospecting campaigns — calls lists automatically",
      "ICA-fit lead qualification — screens before booking",
      "Auto-booking — pushes qualified leads directly to client calendar",
      "Handoff triggers — escalates hot leads to human reps when needed",
      "Call recordings and transcripts logged to GoHighLevel CRM",
      "Multilingual support via Retell AI's 31+ language models",
    ],
    tools: ["Retell AI", "GoHighLevel CRM", "AI Voice Models", "Calendar Integration"],
  },
  {
    number: "02",
    title: "Closebot Chat & SMS Agents",
    subtitle: "Text-Based · Always On",
    image: "/tool/closebotimg.jpg" as string | null,
    description:
      "AKT integrates Closebot — the #1 rated AI appointment setter for GoHighLevel — as the chat and SMS automation layer for every Digital Flo client. Running natively inside each GHL sub-account, Closebot handles all text-based lead conversations: answering questions, qualifying prospects, overcoming objections, and booking appointments — across SMS, web chat, Facebook Messenger, Instagram DMs, and more. Every conversation is logged and synced to the CRM pipeline automatically.",
    features: [
      "Closebot configured per client — unique AI trained on their business",
      "SMS automation — responds to new leads within 60 seconds",
      "Web chat, Facebook, Instagram DM, and WhatsApp coverage",
      "AI objection handling — trained on client's common pushbacks",
      "Smart qualification — filters unqualified leads before booking",
      "Conversation-to-booking pipeline — moves prospects automatically",
      "All conversations logged to GoHighLevel contact timeline",
      "Seamless handoff to voice agent or human rep when appropriate",
    ],
    tools: ["Closebot", "GoHighLevel", "SMS Automation", "Multi-Channel AI Chat"],
  },
  {
    number: "03",
    title: "GoHighLevel CRM — Per-Client Build",
    subtitle: "Custom Sub-Account · Full Stack",
    image: null as string | null,
    description:
      "Every Digital Flo client gets a fully configured GoHighLevel sub-account built by AKT from the ground up — not a template, not a cookie-cutter setup. AKT builds each CRM to match the client's specific sales process, lead sources, pipeline stages, and reporting needs. This includes custom pipelines, automated nurturing sequences, appointment calendars synced to voice and chat agents, trigger-based workflows, and performance dashboards that surface the metrics that actually matter to each client's business.",
    features: [
      "Custom GHL sub-account per client — built from scratch",
      "Pipeline stages designed around client's actual sales process",
      "Automated lead nurturing — email, SMS, and voice sequences",
      "Calendar management — synced to Retell AI and Closebot bookings",
      "Trigger-based workflow automation for every lead event",
      "Performance dashboard — booked calls, show rate, conversion, CAC",
      "Tag-based lead segmentation by source, status, and qualification",
      "Re-engagement sequences for no-shows and cold leads",
    ],
    tools: ["GoHighLevel", "CRM Pipelines", "Workflow Automation", "Calendar Integration"],
  },
  {
    number: "04",
    title: "n8n Automation Backend",
    subtitle: "The Backbone That Connects Everything",
    image: null as string | null,
    description:
      "AKT built n8n automation as the central nervous system connecting every tool in Digital Flo's stack. When a lead comes in via web form, social ad, or inbound call, n8n routes them to the right agent (voice or chat), logs the interaction to GoHighLevel, triggers the appropriate nurturing sequence, updates the pipeline stage, and fires off any downstream actions — all in real time, with no manual touchpoints. n8n is also used to scale Digital Flo's client management: onboarding new clients, spinning up sub-accounts, and deploying agent configurations programmatically.",
    features: [
      "Real-time routing — every lead goes to the right agent instantly",
      "Cross-platform data sync — Retell AI, Closebot, and GHL stay in sync",
      "Booking confirmation workflows — automatic notifications and reminders",
      "Pipeline stage updates triggered by agent conversation outcomes",
      "Client onboarding automation — new sub-accounts provisioned via workflow",
      "Error handling and escalation paths — nothing falls through",
      "Webhook-based triggers — responds to any event from any platform",
      "Reporting aggregation — pulls data from all tools into one dashboard",
    ],
    tools: ["n8n", "Webhooks", "API Integration", "Real-Time Routing", "Workflow Orchestration"],
  },
];

const results = [
  { metric: "+467%", label: "Qualified calls booked", sub: "3 → 17 per week for one client" },
  { metric: "-78%", label: "Cost per acquisition", sub: "$450 → $97 per booked call" },
  { metric: "$40K+", label: "Avg monthly revenue gain", sub: "Across Digital Flo clients" },
  { metric: "60s", label: "Lead response time", sub: "vs. hours with human setters" },
  { metric: "$5K+", label: "Monthly setter cost saved", sub: "Per client, eliminated" },
  { metric: "24/7", label: "Coverage", sub: "No holidays, no sick days, no payroll" },
];

const faqs = [
  {
    q: "What is Retell AI and how is it used in AI call center agencies?",
    a: "Retell AI is a production-ready voice AI platform with under 600ms response latency, 31+ language support, and native telephony integration. AKT used Retell AI to build Digital Flo's voice agent layer — handling inbound calls, running outbound campaigns, qualifying leads, and booking appointments automatically for each client without human involvement.",
  },
  {
    q: "What is Closebot and how does it work with GoHighLevel?",
    a: "Closebot is the #1 rated AI appointment setter built natively for GoHighLevel agencies. It handles chat and SMS conversations — qualifying leads, handling objections, and booking appointments — directly inside GHL sub-accounts. AKT integrated Closebot as Digital Flo's text-based agent layer, synchronized with GoHighLevel pipelines via n8n.",
  },
  {
    q: "How does AKT build a custom AI call center for each Digital Flo client?",
    a: "AKT configures each system from scratch based on the client's industry, lead sources, and business needs: a Retell AI voice agent trained on their products and objections, a Closebot SMS/chat agent in their GHL sub-account, a fully built CRM pipeline, and n8n workflows connecting every touchpoint. No two client builds are identical.",
  },
  {
    q: "How much faster is AI lead response versus human appointment setters?",
    a: "AKT's systems built for Digital Flo respond to new leads within 60 seconds, 24/7. Research shows leads contacted within 5 minutes convert 100x more than those reached after 30 minutes. Human setters working business hours can't compete with an AI that responds instantly at any hour — and does it without payroll.",
  },
  {
    q: "Can n8n connect GoHighLevel, Retell AI, and Closebot in one workflow?",
    a: "Yes. AKT built n8n as Digital Flo's entire automation backbone — routing leads from any source to the correct agent, syncing conversation data across all platforms, triggering pipeline updates, firing nurturing sequences, and provisioning new client sub-accounts automatically. The entire stack runs as one connected system.",
  },
  {
    q: "What client results has Digital Flo achieved with AKT's AI call center system?",
    a: "Digital Flo clients powered by AKT's infrastructure have reported: 467% more qualified calls booked (3 → 17/week), cost per acquisition dropping from $450 to $97 (-78%), average monthly revenue gains of $40,000+, and elimination of $3,000–$7,000/month in human setter payroll — with 24/7 coverage that no human team can match.",
  },
];

export default function DigitalFloPage() {
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
              <span className="text-white/65">Digital Flo™</span>
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
                  AI Call Center Infrastructure · 2025
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Full AI Call Center Agency Stack Built for{" "}
                  <span style={{ color: "#0ABFA3" }}>Digital Flo™</span>
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Digital Flo™ is a US-based AI automation agency that delivers done-for-you AI call center systems to businesses — replacing $3,000–$7,000/month human appointment setters with AI voice and chat agents that respond in under 60 seconds, 24 hours a day. AKT engineered Digital Flo&apos;s complete backend infrastructure: Retell AI voice agents, Closebot chat and SMS agents, per-client GoHighLevel CRM builds, and n8n automation connecting every layer into one unified system — custom-built for each client&apos;s specific business.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://mydigitalflo.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    mydigitalflo.io
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    United States
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/digitalflo.png"
                    alt="Digital Flo AI call center agency logo — Retell AI Closebot GoHighLevel automation"
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

        {/* Client Result Stats */}
        <section className="border-b border-white/10 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
              Client results powered by AKT&apos;s AI call center infrastructure
            </p>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
              {results.map((r) => (
                <div key={r.label} className="rounded-card border border-white/10 bg-[#101113] p-5 text-center">
                  <p
                    className="font-syne text-[clamp(20px,2vw,30px)] font-extrabold tracking-tight"
                    style={{ color: "#0ABFA3" }}
                  >
                    {r.metric}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-white">{r.label}</p>
                  <p className="mt-0.5 text-[11px] text-white/40">{r.sub}</p>
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
                Delivering bespoke AI call centers for every client — at agency speed and scale
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Digital Flo&apos;s value proposition is powerful but operationally demanding: every client gets a fully custom AI call center — unique voice agent, unique chat and SMS flows, unique CRM pipeline, unique nurturing sequences — tailored to their specific industry, lead sources, and sales process. Delivering this consistently across a growing client base required a backend infrastructure that could be configured quickly, scaled reliably, and managed centrally.
                </p>
                <p>
                  Without a unified automation backbone, each new client meant manual setup across four separate platforms — creating bottlenecks, inconsistencies, and limits on how many clients Digital Flo could serve simultaneously. The company needed a technical partner who could build the infrastructure once and make it deployable at scale.
                </p>
                <p>
                  The AI call center market is also intensely time-sensitive: businesses replace human setters because leads are being lost to slow response. Digital Flo&apos;s AI systems needed to demonstrate sub-60-second response times across both voice and text — or clients would see no improvement over what they already had.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Without AKT</p>
              <div className="space-y-3">
                {[
                  ["Voice agent setup", "Manual per client — slow and inconsistent"],
                  ["Chat/SMS agent", "No unified solution across platforms"],
                  ["CRM per client", "Manual GHL build — hours per sub-account"],
                  ["Cross-tool data flow", "Disconnected — manual data entry required"],
                  ["Client onboarding time", "Days — bottlenecked on manual config"],
                  ["Lead response time", "Delayed — tools not connected in real-time"],
                  ["Scalability", "Hard limit on simultaneous client capacity"],
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

        {/* Four Systems */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">What AKT Built</p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              Four integrated systems. One AI call center — unique for every client.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT built Digital Flo&apos;s entire technical backend — every layer from voice to SMS to CRM to automation — using Retell AI, Closebot, GoHighLevel, and n8n as a modular, scalable stack that can be configured per client in a fraction of the time manual setup would take.
            </p>

            <div className="mt-14 space-y-8">
              {systems.map((system) => (
                <div
                  key={system.number}
                  className="rounded-card border border-white/10 bg-black/30 overflow-hidden"
                >
                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <p
                        className="shrink-0 font-syne text-[48px] font-extrabold leading-none tracking-tight"
                        style={{ color: "#0ABFA3", opacity: 0.22 }}
                      >
                        {system.number}
                      </p>
                      <div className="flex-1">
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                          {system.subtitle}
                        </div>
                        <h3 className="font-syne text-[clamp(18px,2vw,24px)] font-bold tracking-tight text-white">
                          {system.title}
                        </h3>
                      </div>
                    </div>
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
                        <span
                          key={t}
                          className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full-width image below content */}
                  {system.image && (
                    <div className="border-t border-white/10 bg-[#0d0d0f] p-8">
                      <Image
                        src={system.image}
                        alt={`${system.title} — used by AKT for Digital Flo`}
                        width={1400}
                        height={700}
                        className="w-full h-auto object-contain rounded-lg opacity-95"
                      />
                    </div>
                  )}
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
                Custom AI call centers deployed at scale — instant response, automated booking, eliminated setter costs
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Digital Flo now delivers fully operational, bespoke AI call center systems to each client — with voice agents, chat and SMS agents, CRM pipelines, and automation all connected and live. What previously took days of manual configuration can now be deployed faster, more consistently, and with a unified backend that Digital Flo controls centrally through n8n.
                </p>
                <p>
                  Every new lead that enters a Digital Flo client&apos;s pipeline gets an AI response within 60 seconds — whether via phone, SMS, web chat, or DM. The AI qualifies the lead, handles objections, and books the appointment directly into the calendar without a human setter involved. Booking rates, show rates, and conversion data feed back into GoHighLevel automatically.
                </p>
                <p>
                  The measurable client outcomes speak directly to the infrastructure AKT built: a 467% increase in qualified calls booked, cost per acquisition down 78%, average monthly revenue gains of $40,000+, and the complete elimination of $3,000–$7,000/month in human setter payroll — replaced by an AI system that works every hour of every day.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">With AKT Infrastructure</p>
              <div className="space-y-3">
                {[
                  ["Voice agent setup", "Retell AI — custom per client, deployed fast"],
                  ["Chat/SMS agent", "Closebot — GHL-native, 60-second response"],
                  ["CRM per client", "Full GHL sub-account built and configured"],
                  ["Cross-tool data flow", "n8n — everything synced in real time"],
                  ["Client onboarding time", "Automated — provisioned via n8n workflow"],
                  ["Lead response time", "Under 60 seconds — 24/7, no exceptions"],
                  ["Scalability", "Unlimited — modular stack deploys per client"],
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
              The full stack powering Digital Flo&apos;s AI call center agency
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Retell AI", desc: "Voice agent platform — sub-600ms latency, 31+ languages, telephony integration" },
                { name: "Closebot", desc: "#1 AI appointment setter for GHL — SMS, chat, DM automation" },
                { name: "GoHighLevel", desc: "Per-client CRM sub-accounts — pipelines, nurturing, calendar, dashboards" },
                { name: "n8n", desc: "Automation backbone — connects all platforms, routes leads, provisions clients" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-card border border-white/10 bg-black/30 p-6"
                >
                  <p className="font-syne text-[16px] font-bold text-white">{tool.name}</p>
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
              Questions about AI call center agency infrastructure
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
                Build Your AI Call Center
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Ready to replace your human setters with AI that works 24/7?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds complete AI call center systems — Retell AI voice agents, Closebot chat and SMS, GoHighLevel CRM, and n8n automation — custom-configured for your business and deployed fast.
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
