import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Branding561: AI Command Center | AKT",
  description:
    "How AKT built Branding561's Super AI Command Center — unifying email, SMS, CRM, and live conversation into one 24/7 autonomous pipeline using n8n, Claude AI, and GoHighLevel — plus an AI content creation platform and automated lead scraping engine.",
  keywords: [
    "AI command center for marketing agencies",
    "n8n GoHighLevel Claude AI automation agency",
    "AI email SMS CRM pipeline 24/7 autonomous",
    "lead scraping GoHighLevel CRM automation",
    "AI content creation Veo 3.1 Imagen Kling agency",
    "GoHighLevel personal AI assistant SMS email",
    "AI video generation Veo Kling marketing agency",
    "24/7 AI conversation management for agencies",
    "AI lead qualification and GoHighLevel injection",
    "marketing agency AI automation stack n8n",
    "OpenRouter Claude AI marketing automation",
    "Supabase n8n workflow orchestration agency",
    "autonomous AI follow-up system GoHighLevel",
    "AI image generation Imagen 1.5 Grok agency",
    "lead scraping engine AI prospect qualification",
    "marketing agency operations AI automation",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/branding561`,
  },
  openGraph: {
    title: "Branding561: Super AI Command Center, AI Content Creation & Lead Scraping | AKT",
    description:
      "AKT built Branding561's entire AI operations stack — a unified command center (n8n + Claude + GoHighLevel), a GoHighLevel personal AI assistant, an AI content creation platform (Veo 3.1, Kling, Imagen 1.5), and an automated lead scraping engine.",
    type: "article",
    url: `${SITE_URL}/partners/branding561`,
    publishedTime: "2024-06-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding561: AI Command Center + AI Content Creation + Lead Scraping | AKT Case Study",
    description:
      "AKT built Branding561 a Super AI Command Center, GoHighLevel AI assistant, AI video/image generation platform, and automated lead scraping engine — all 24/7 autonomous.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/branding561#article`,
      "headline":
        "How AKT Built Branding561's Super AI Command Center, Personal AI Assistant, AI Content Creation Platform, and Lead Scraping Engine",
      "description":
        "AKT designed and deployed Branding561's complete AI operations infrastructure — a Super AI Command Center unifying email, SMS, CRM, and live conversation into a 24/7 autonomous pipeline; a Personal AI Assistant inside GoHighLevel for inbound/outbound SMS and email; an AI Content Creation website with one-click Veo 3.1, Kling, Imagen 1.5, and Grok Imagine generation; and an automated lead scraping engine that qualifies and injects prospects directly into GoHighLevel CRM.",
      "datePublished": "2024-06-01",
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
      "mainEntityOfPage": `${SITE_URL}/partners/branding561`,
      "about": {
        "@type": "Organization",
        "name": "Branding561",
        "url": "https://branding561.com",
        "description":
          "Branding561 is a South Florida marketing and branding agency offering digital marketing, creative services, and AI-powered business growth solutions for entrepreneurs and businesses in the Palm Beach and broader 561 region.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an AI command center for a marketing agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "An AI command center for a marketing agency is a unified automation platform that centralizes all communication channels — email, SMS, CRM updates, and live conversation — into a single AI-managed pipeline that runs 24/7 without manual intervention. AKT built exactly this for Branding561 using n8n as the automation backbone, Claude AI for intelligent conversation and response generation, and GoHighLevel as the CRM and communication hub. Every inbound message — regardless of channel — is received, processed, and responded to by the AI system automatically, with contacts created, tagged, and enrolled in follow-up sequences in real time.",
          },
        },
        {
          "@type": "Question",
          "name": "How does a GoHighLevel Personal AI Assistant work for SMS and email?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A GoHighLevel Personal AI Assistant is an AI agent deployed inside GHL that monitors inbound SMS and email channels, generates contextually appropriate responses using an AI language model (in Branding561's case, Claude AI via OpenRouter), sends replies automatically, and captures new contacts into the CRM — all without a human composing or sending messages. AKT built this for Branding561, reducing their response time from hours to seconds. The assistant handles both inbound lead responses and outbound follow-up sequences, ensuring no contact goes cold regardless of when they reach out.",
          },
        },
        {
          "@type": "Question",
          "name": "What AI tools are used for AI video and image generation for marketing agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's AI content creation platform for Branding561 uses five leading AI generation tools: Veo 3.1 (Google's video generation model for high-quality short-form video), Kling (high-fidelity AI video generation with motion control), Imagen 1.5 (Google's photorealistic image generation model), Banana Nano (fast lightweight image generation), and Grok Imagine (xAI's image generation model). All five are accessible through a single custom-built website interface — allowing Branding561 to generate professional marketing visuals and videos in one click, without managing five separate subscriptions or tools.",
          },
        },
        {
          "@type": "Question",
          "name": "How does an automated lead scraping engine work with GoHighLevel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's lead scraping engine for Branding561 automatically extracts prospect data from target sources, runs each prospect through an AI qualification layer that scores their fit and intent, injects qualified leads directly into GoHighLevel CRM as new contacts, applies qualification tags, and immediately triggers an AI-powered follow-up sequence — all without manual input. The result is a continuous, self-filling prospect pipeline: the engine scrapes, qualifies, and activates leads autonomously, and the GoHighLevel AI assistant picks up the conversation the moment a contact enters the CRM.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the role of n8n in an AI marketing automation stack?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "n8n serves as the central automation backbone in AKT's builds — the workflow engine that connects every tool in the stack. For Branding561's Super AI Command Center, n8n receives webhooks from GoHighLevel, routes messages to Claude AI via OpenRouter, processes AI responses, sends them back through the appropriate channel (SMS, email, or chat), logs results to Supabase, and triggers downstream workflows. Because n8n is self-hosted, there are no per-task fees — the entire pipeline scales with Branding561's lead volume without increasing automation costs.",
          },
        },
        {
          "@type": "Question",
          "name": "How does AI automation help a marketing agency scale their client count?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's automation stack for Branding561 directly grows their client count through three mechanisms: (1) The lead scraping engine continuously fills their pipeline with qualified prospects and triggers immediate AI follow-up — converting cold leads faster than manual outreach. (2) The AI Command Center ensures every inbound inquiry gets an instant, intelligent response — no lead goes cold waiting for a human reply. (3) The AI content creation platform lets Branding561 produce high-quality marketing deliverables faster — increasing their capacity to serve more clients without adding headcount. Together, these systems let a small agency operate at enterprise scale.",
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
          "name": "Branding561 Case Study",
          "item": `${SITE_URL}/partners/branding561`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built Branding561's AI Operations Stack",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Super AI Command Center",
          "text":
            "AKT built a unified n8n + Claude AI + GoHighLevel pipeline that centralizes email, SMS, CRM updates, and live conversation into one 24/7 autonomous system — so every inbound message is processed and responded to automatically.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Personal AI Assistant in GoHighLevel",
          "text":
            "AKT deployed a Personal AI Assistant inside GHL that handles inbound/outbound SMS, auto-replies to emails, and captures contacts — cutting Branding561's response time from hours to seconds.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "AI Content Creation Website",
          "text":
            "AKT launched a custom AI content creation platform with one-click access to Veo 3.1, Kling, Imagen 1.5, Banana Nano, and Grok Imagine — enabling professional video and image generation without managing five separate tools.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Lead Scraping Engine",
          "text":
            "AKT built an automated lead scraping engine that extracts prospects, qualifies them via AI, injects qualified leads into GoHighLevel CRM, and triggers instant AI follow-up — directly growing Branding561's client count.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Super AI Command Center",
    subtitle: "n8n · Claude AI · GoHighLevel · 24/7 autonomous",
    description:
      "Branding561's team was managing inbound leads, client messages, CRM updates, and email responses across disconnected tools — each one requiring manual attention. AKT built a Super AI Command Center that collapses every communication channel into a single 24/7 autonomous pipeline. Built on n8n as the automation engine, Claude AI as the intelligence layer (routed through OpenRouter), and GoHighLevel as the CRM and messaging hub, the Command Center receives every inbound contact — SMS, email, or live conversation — processes it through AI, and delivers an intelligent, on-brand response automatically. No human needs to be online. No channel goes unattended. Every interaction is logged, tagged, and pushed forward in the pipeline.",
    features: [
      "Unified pipeline — email, SMS, CRM, and live chat in one system",
      "n8n backbone — self-hosted, no per-task fees, full control",
      "Claude AI via OpenRouter — intelligent, context-aware responses",
      "GoHighLevel integration — every message tied to a contact record",
      "24/7 operation — no human required to staff the pipeline",
      "Real-time contact creation and tagging on every inbound",
      "Live conversation handling — AI manages active threads end to end",
      "Supabase data layer — conversation logs and analytics stored persistently",
    ],
    tools: ["n8n", "Claude AI", "GoHighLevel", "OpenRouter", "Supabase", "SMS Automation", "Email Automation"],
    hasImage: true,
  },
  {
    number: "02",
    title: "Personal AI Assistant in GoHighLevel",
    subtitle: "Inbound/outbound SMS · Email auto-reply · Hours → seconds",
    description:
      "Outside of the Command Center's broader pipeline, Branding561 needed a dedicated AI assistant living inside GoHighLevel itself — one that their team could rely on for day-to-day lead response without switching tools. AKT deployed a Personal AI Assistant directly within GHL: it monitors every inbound SMS and email to the account, generates responses using Claude AI, sends them immediately, and creates or updates the contact record automatically. For outbound, the assistant handles follow-up sequences based on conversation stage and contact tags — reaching back out to cold leads, confirming appointments, and re-engaging inactive prospects. Response time dropped from hours to seconds. Zero manual message composition required.",
    features: [
      "Inbound SMS handling — every text gets an AI reply within seconds",
      "Email auto-reply — inbound emails answered automatically with context",
      "Contact capture — new contacts created in GHL from every first message",
      "Outbound follow-up — AI sends timed sequences based on contact stage",
      "Tag-triggered responses — different AI scripts based on lead qualification",
      "Appointment confirmation automation — AI handles scheduling replies",
      "Cold lead re-engagement — AI reaches back out to inactive contacts",
      "Full conversation history visible in GHL contact timeline",
    ],
    tools: ["GoHighLevel", "Claude AI", "SMS Automation", "Email Automation", "n8n Workflows"],
    hasImage: false,
  },
  {
    number: "03",
    title: "AI Content Creation Website",
    subtitle: "Veo 3.1 · Kling · Imagen 1.5 · Banana Nano · Grok Imagine",
    description:
      "Branding561 produces marketing content for clients across South Florida — and the quality and speed of that content is a direct competitive advantage. AKT built a custom AI Content Creation Website that gives Branding561 one-click access to five of the most powerful AI generation models available: Veo 3.1 for high-quality AI video, Kling for motion-rich cinematic video, Imagen 1.5 for photorealistic marketing images, Banana Nano for fast lightweight image generation, and Grok Imagine for creative AI visuals. All five are accessible from a single interface — no switching between platforms, no managing multiple subscriptions, no technical setup per generation. Branding561 describes the brief, the platform generates the asset, and the result is production-ready marketing material in minutes.",
    features: [
      "Veo 3.1 — Google's high-quality AI video generation model",
      "Kling — cinematic AI video with motion control and subject fidelity",
      "Imagen 1.5 — photorealistic AI image generation for marketing use",
      "Banana Nano — fast, lightweight image generation for quick iterations",
      "Grok Imagine — xAI's creative AI image generation model",
      "Single interface — all five models accessible from one custom platform",
      "One-click generation — no technical prompt engineering required",
      "Production-ready output — assets usable directly in client deliverables",
    ],
    tools: ["Veo 3.1", "Kling", "Imagen 1.5", "Banana Nano", "Grok Imagine", "Custom Web Platform"],
    hasImage: false,
  },
  {
    number: "04",
    title: "Lead Scraping Engine",
    subtitle: "Auto-qualify · CRM injection · Instant AI follow-up",
    description:
      "Growing a client base for a marketing agency requires a constant flow of qualified prospects — and manually sourcing, researching, and reaching out to leads is the bottleneck that limits most agency growth. AKT built Branding561 an automated lead scraping engine that eliminates that bottleneck entirely. The engine scrapes targeted prospect data from defined sources, runs each lead through an AI qualification layer that scores their fit and signals their intent, injects qualified contacts directly into GoHighLevel CRM with the appropriate tags applied, and immediately triggers the AI Command Center to initiate follow-up. From prospect identification to first AI-generated outreach, the entire sequence runs without human involvement. The result is a self-filling pipeline that actively grows Branding561's client count.",
    features: [
      "Automated prospect scraping from targeted lead sources",
      "AI qualification layer — scores each lead's fit and intent automatically",
      "GoHighLevel injection — qualified leads land in CRM as tagged contacts",
      "Instant AI follow-up trigger — outreach starts the moment a lead is injected",
      "Disqualification filtering — low-fit prospects excluded before CRM entry",
      "Pipeline stage assignment — leads enter the funnel at the right stage",
      "No manual data entry — scrape-to-outreach fully automated",
      "Scales with ambition — run larger scrapes to fill more pipeline on demand",
    ],
    tools: ["Lead Scraping", "Claude AI", "n8n", "GoHighLevel CRM", "AI Qualification"],
    hasImage: false,
  },
];

const faqs = [
  {
    q: "What is an AI command center for a marketing agency?",
    a: "An AI command center centralizes all communication channels — email, SMS, CRM updates, and live conversation — into a single AI-managed pipeline running 24/7. AKT built this for Branding561 using n8n as the automation backbone, Claude AI for response generation, and GoHighLevel as the CRM hub. Every inbound message is received, processed, and responded to automatically, with contacts created and enrolled in follow-up sequences in real time.",
  },
  {
    q: "How does a GoHighLevel Personal AI Assistant handle SMS and email?",
    a: "AKT's GoHighLevel Personal AI Assistant monitors every inbound SMS and email, generates responses using Claude AI via OpenRouter, sends replies within seconds, and creates/updates contact records automatically. For outbound, it handles timed follow-up sequences based on contact tags and conversation stage. Branding561's response time went from hours to seconds — without any manual message composition.",
  },
  {
    q: "What AI tools are used for video and image generation for marketing agencies?",
    a: "AKT's platform for Branding561 integrates five models: Veo 3.1 (Google's AI video generation), Kling (cinematic AI video), Imagen 1.5 (Google's photorealistic image model), Banana Nano (fast lightweight image generation), and Grok Imagine (xAI's creative image model) — all accessible from one custom-built interface for one-click content production.",
  },
  {
    q: "How does an automated lead scraping engine work with GoHighLevel?",
    a: "AKT's engine scrapes prospect data from target sources, runs AI qualification to score fit and intent, injects qualified leads into GoHighLevel CRM with tags applied, and immediately triggers AI follow-up — all without manual input. The result is a self-filling prospect pipeline: scrape, qualify, activate, and outreach runs autonomously.",
  },
  {
    q: "What is the role of n8n in an AI marketing automation stack?",
    a: "n8n is the self-hosted automation backbone connecting every tool — receiving GHL webhooks, routing messages to Claude AI via OpenRouter, processing responses, sending back through SMS/email/chat, logging to Supabase, and triggering downstream sequences. Because it's self-hosted, there are no per-task fees — the full pipeline scales with lead volume at flat infrastructure cost.",
  },
  {
    q: "How does AI automation help a marketing agency grow their client count?",
    a: "Three mechanisms drive growth: (1) The lead scraping engine continuously fills the pipeline with qualified prospects and triggers immediate AI follow-up. (2) The AI Command Center ensures every inbound inquiry gets an instant intelligent response — no lead goes cold. (3) The AI content creation platform increases delivery capacity without adding headcount. Together, these let a small agency operate at enterprise scale.",
  },
];

export default function Branding561Page() {
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
              <span className="text-white/65">Branding561</span>
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
                  AI Command Center · Content AI · Lead Engine
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  One AI Stack Built to Run{" "}
                  <span style={{ color: "#0ABFA3" }}>Branding561</span>{" "}
                  Around the Clock
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Branding561 is a South Florida marketing and branding agency serving entrepreneurs and businesses across the Palm Beach region and beyond. AKT built their entire AI operations infrastructure — a Super AI Command Center unifying email, SMS, CRM, and live conversation into one 24/7 autonomous pipeline; a Personal AI Assistant deployed inside GoHighLevel; a custom AI Content Creation website with one-click access to Veo 3.1, Kling, Imagen 1.5, and Grok Imagine; and a lead scraping engine that qualifies prospects and injects them into GoHighLevel with instant AI follow-up.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://branding561.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    branding561.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Marketing Agency · South Florida
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/branding561.png"
                    alt="Branding561 logo — South Florida marketing and branding agency"
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
                { value: "4", label: "AI Systems Built", sub: "Command Center · Assistant · Content · Leads" },
                { value: "24/7", label: "Autonomous Pipeline", sub: "Zero manual coverage needed" },
                { value: "5", label: "AI Gen Models", sub: "Veo · Kling · Imagen · Banana · Grok" },
                { value: "Hours → Sec", label: "Response Time", sub: "AI assistant — instant replies" },
                { value: "Auto", label: "Lead Pipeline", sub: "Scrape · qualify · inject · follow-up" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p className="font-syne text-[clamp(15px,2vw,24px)] font-extrabold tracking-tight" style={{ color: "#0ABFA3" }}>
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
                A growing agency stretched thin — manual lead response, scattered tools, and no system to produce content or grow the pipeline at scale
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Branding561 was doing everything a high-growth marketing agency needs to do — client work, content production, lead generation, follow-up — but doing it manually across too many tools. Inbound leads waited hours for a response. GoHighLevel was configured but underutilized — the CRM wasn&apos;t automatically qualifying, tagging, or engaging new contacts. The team was composing every reply by hand.
                </p>
                <p>
                  On the content side, producing marketing-quality video and image assets required juggling multiple AI platforms — each with its own interface, subscription, and workflow. There was no centralized way to generate a professional AI video or image for a client without spending 20 minutes navigating between tools.
                </p>
                <p>
                  Most critically, their prospect pipeline was built on manual outreach — which meant the speed of growth was capped by the hours a person could spend finding, researching, and reaching out to potential clients. With no automated lead engine, scaling the agency meant scaling the headcount.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Lead response", "Manual — replies composed by hand, hours of delay"],
                  ["GoHighLevel usage", "Underutilized — contacts not auto-qualified or enrolled"],
                  ["Email & SMS", "Manual send — no AI layer, no 24/7 coverage"],
                  ["AI content creation", "5 separate platforms — no unified interface"],
                  ["Lead generation", "Manual outreach — growth capped by team hours"],
                  ["Prospect pipeline", "No automation — scrape and qualify done by hand"],
                  ["Operational capacity", "Limited by headcount — not by ambition"],
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
              Four systems. One fully autonomous AI-powered agency.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT built Branding561&apos;s complete AI operations stack — from a unified command center and GoHighLevel AI assistant to an AI content creation platform and a self-filling lead engine.
            </p>

            {/* System architecture image */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/tool/superAI561.png"
                alt="Branding561 Super AI Command Center — n8n workflow architecture with Claude AI, GoHighLevel, and lead automation"
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
                24/7 autonomous operations — leads qualified, clients responded to, and content produced without adding headcount
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Branding561 now runs on a 24/7 AI operations layer that handles the work that used to require constant human attention. Every inbound SMS and email gets an intelligent AI response within seconds — day or night. Every new lead that enters GoHighLevel is automatically qualified, tagged, and enrolled in the appropriate follow-up sequence without anyone opening the CRM.
                </p>
                <p>
                  The lead scraping engine has transformed how Branding561 grows its client base. Instead of relying on manual prospecting, the engine continuously identifies, qualifies, and activates new leads — feeding the AI Command Center&apos;s follow-up pipeline the moment a prospect is injected into GHL. Growth is no longer capped by how many hours the team can spend on outreach.
                </p>
                <p>
                  On the content side, Branding561 can now produce professional AI-generated video and image assets for clients in minutes rather than hours — with access to five leading AI generation models from a single platform. The quality of deliverables improved while the time to produce them dropped sharply.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Lead response", "AI replies within seconds — 24/7, every channel"],
                  ["GoHighLevel usage", "Fully automated — contacts qualified, staged, enrolled"],
                  ["Email & SMS", "AI Personal Assistant — inbound/outbound fully handled"],
                  ["AI content creation", "One platform — 5 models, one-click generation"],
                  ["Lead generation", "Automated engine — scrape, qualify, inject, follow-up"],
                  ["Prospect pipeline", "Self-filling — runs without manual prospecting"],
                  ["Operational capacity", "Scales with ambition — not with headcount"],
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
              The full stack powering Branding561&apos;s AI operations
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {[
                { name: "n8n", desc: "Automation backbone" },
                { name: "Claude AI", desc: "Intelligence layer" },
                { name: "GoHighLevel", desc: "CRM & messaging" },
                { name: "OpenRouter", desc: "AI model routing" },
                { name: "Supabase", desc: "Data & analytics" },
                { name: "Veo 3.1 / Kling", desc: "AI video generation" },
                { name: "Imagen / Grok", desc: "AI image generation" },
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
              Questions about AI command centers and marketing agency automation
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
                Command Center. Content Engine. Lead Machine.
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Ready to build the AI stack that runs your agency while you sleep?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds custom AI command centers, GoHighLevel automation systems, AI content platforms, and lead scraping engines for marketing agencies — so you scale without scaling your headcount.
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
