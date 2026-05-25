import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "KinnoBot: Zapier to n8n Migration | AKT",
  description:
    "How AKT cut KinnoBot's automation costs by migrating from Zapier to n8n, connected GoHighLevel CRM, deployed AI agents across SMS, chat, Instagram, and TikTok, and built a custom business dashboard and webinar automation system.",
  keywords: [
    "zapier to n8n migration service agency",
    "n8n automation agency GoHighLevel",
    "AI SMS chat agent for business",
    "AI Instagram DM automation agency",
    "TikTok AI agent automation",
    "reduce automation costs zapier alternative n8n",
    "custom business dashboard development",
    "webinar automation n8n GoHighLevel",
    "GoHighLevel n8n integration service",
    "done for you n8n migration zapier",
    "AI social media agent SMS Instagram TikTok",
    "n8n workflow automation setup service",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/kinnobot`,
  },
  openGraph: {
    title: "KinnoBot: Zapier → n8n Migration, AI Social Media Agents & Custom Dashboard | AKT",
    description:
      "AKT migrated KinnoBot from Zapier to n8n, slashing automation costs by 70%+, while deploying AI agents across SMS, chat, Instagram, and TikTok — plus a custom dashboard and webinar automation system.",
    type: "article",
    url: `${SITE_URL}/partners/kinnobot`,
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "KinnoBot: Zapier to n8n Migration + AI Social Agents | AKT Case Study",
    description:
      "70%+ cost cut on automation. AI agents across SMS, chat, Instagram, and TikTok. Custom dashboard. All built by AKT for KinnoBot.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/kinnobot#article`,
      "headline":
        "How AKT Migrated KinnoBot from Zapier to n8n, Deployed AI Agents Across SMS, Chat, Instagram, and TikTok, and Built a Custom Business Dashboard",
      "description":
        "AKT rebuilt KinnoBot's entire automation backend — migrating from Zapier to self-hosted n8n to cut operational costs by 70%+, integrating GoHighLevel CRM, deploying AI conversational agents across SMS, web chat, Instagram DMs, and TikTok, building a custom real-time business dashboard, and automating their webinar registration and follow-up funnel end to end.",
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
      "mainEntityOfPage": `${SITE_URL}/partners/kinnobot`,
      "about": {
        "@type": "Organization",
        "name": "KinnoBot",
        "url": "https://www.kinnobot.com",
        "description":
          "Forex trading education platform offering automated trading systems and live webinar masterclasses for busy professionals seeking passive income through algorithmic forex trading.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Zapier and n8n for automation agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Zapier is a cloud-based automation platform that charges per task — costs scale rapidly as workflow volume grows, often reaching $300–$800/month for high-volume operations. n8n is an open-source workflow automation tool that can be self-hosted, meaning you pay only for server costs regardless of task volume. For businesses running thousands of automations monthly, migrating from Zapier to n8n typically cuts automation costs by 70–90%. AKT executed this migration for KinnoBot, rebuilding all workflows in n8n and eliminating their Zapier subscription entirely.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does a Zapier to n8n migration take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The timeline for a Zapier to n8n migration depends on the number and complexity of existing workflows. For KinnoBot, AKT completed the full migration — including workflow rebuilds, GoHighLevel integration, and testing — without disrupting live operations. Simple single-function workflows can migrate in days; complex multi-step automations with conditional logic and API integrations typically take 2–4 weeks for a full-production migration.",
          },
        },
        {
          "@type": "Question",
          "name": "Can n8n integrate with GoHighLevel CRM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT connected KinnoBot's n8n workflows directly to GoHighLevel via GHL's REST API — enabling real-time contact creation, pipeline stage updates, tag management, and workflow triggers between n8n and GHL. This replaced Zapier as the middleware layer, giving KinnoBot more complex automation logic at zero per-task cost.",
          },
        },
        {
          "@type": "Question",
          "name": "How do AI agents work for Instagram and TikTok automation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AI agents for Instagram and TikTok monitor incoming direct messages and comment interactions, detect intent using natural language processing, and respond automatically with personalized, on-brand replies — qualifying leads, answering FAQs, and directing prospects toward a booking or webinar registration. AKT deployed this for KinnoBot across both platforms, converting social media engagement into qualified leads without manual moderation.",
          },
        },
        {
          "@type": "Question",
          "name": "What does a custom business dashboard include for an automation agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT built KinnoBot a custom real-time dashboard displaying their key business metrics: webinar registrations, attendee conversion rates, lead source breakdown by channel (SMS, Instagram, TikTok, chat), GoHighLevel pipeline status, AI agent performance, and revenue attribution. Unlike generic BI tools, this dashboard was purpose-built for KinnoBot's specific funnel and updated automatically via n8n data pipelines.",
          },
        },
        {
          "@type": "Question",
          "name": "How does webinar automation reduce manual work for online course businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT automated KinnoBot's entire webinar funnel — from registration confirmation and reminder sequences to post-webinar follow-up, replay delivery, and no-show re-engagement — all running through n8n and GoHighLevel without manual intervention. Registrants receive timed emails and SMS sequences automatically. Attendees who convert are pushed to the next pipeline stage. No-shows receive a separate replay sequence. Every step is triggered by webinar attendance data, not by staff.",
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
          "name": "KinnoBot Case Study",
          "item": `${SITE_URL}/partners/kinnobot`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Rebuilt KinnoBot's Automation Backend",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Zapier to n8n Migration",
          "text":
            "AKT audited all existing Zapier workflows, rebuilt each one in n8n with equivalent or improved logic, tested against live data, then cut over — eliminating the Zapier subscription and reducing automation costs by 70%+.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "GoHighLevel CRM Integration",
          "text":
            "AKT connected n8n to GoHighLevel via REST API — routing all lead data, pipeline updates, tags, and workflow triggers through the new n8n backend instead of Zapier.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "AI Agent Deployment — SMS, Chat, Instagram, TikTok",
          "text":
            "AKT deployed AI conversational agents across KinnoBot's four primary lead channels — SMS, web chat, Instagram DMs, and TikTok — each trained on KinnoBot's brand and automated to qualify leads and direct them to webinar registration.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Custom Business Dashboard",
          "text":
            "AKT built a real-time dashboard displaying KinnoBot's core KPIs — webinar registrations, channel performance, AI agent metrics, and GoHighLevel pipeline data — updated automatically via n8n.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Webinar Funnel Automation",
          "text":
            "AKT automated KinnoBot's full webinar lifecycle — registration confirmations, timed reminders, live show triggers, post-webinar follow-up sequences, replay delivery, and no-show re-engagement — all running without manual input.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Zapier to n8n Migration",
    subtitle: "70%+ cost reduction · Zero disruption",
    description:
      "KinnoBot's Zapier subscription was scaling with their webinar volume — a cost structure that punishes growth. AKT audited every active Zapier workflow, rebuilt each one in self-hosted n8n with equivalent or superior logic, and migrated without breaking live operations. The Zapier subscription was eliminated entirely. n8n runs the same automations — plus more complex ones Zapier couldn't handle — at server cost only, regardless of task volume.",
    features: [
      "Full Zapier workflow audit — every active automation documented",
      "Rebuilt in n8n — same logic, better performance, no per-task fees",
      "Self-hosted n8n deployment — own the infrastructure, own the data",
      "Zero downtime migration — live operations unaffected during cutover",
      "Complex conditional logic rebuilt — n8n handles what Zapier couldn't",
      "Zapier subscription eliminated — 70%+ reduction in automation costs",
      "Error handling and retry logic added — more resilient than Zapier",
      "Ongoing n8n workflow maintenance and expansion capability",
    ],
    tools: ["n8n Self-Hosted", "Workflow Migration", "API Integration", "Server Infrastructure"],
  },
  {
    number: "02",
    title: "GoHighLevel CRM Integration",
    subtitle: "n8n as the backbone · GHL as the CRM",
    description:
      "With Zapier gone, AKT connected n8n directly to GoHighLevel via the GHL REST API — making n8n the central automation engine that feeds, updates, and triggers everything inside GHL. Contact creation, pipeline stage changes, tag application, appointment triggers, and campaign enrollments all flow through n8n workflows. The result is a more powerful, more flexible CRM automation stack that costs a fraction of the Zapier-middleware approach.",
    features: [
      "GHL REST API connected to n8n — real-time data sync",
      "Automatic contact creation from every lead channel",
      "Pipeline stage updates triggered by AI agent conversation outcomes",
      "Tag-based automation — leads segmented by source, channel, and status",
      "GoHighLevel campaign enrollment via n8n trigger workflows",
      "Appointment and webinar registration synced to GHL calendar",
      "Two-way data flow — GHL events can trigger n8n workflows",
      "Full audit trail of every CRM action in n8n execution logs",
    ],
    tools: ["GoHighLevel CRM", "n8n API Integration", "Pipeline Automation", "Webhook Triggers"],
  },
  {
    number: "03",
    title: "AI Agents — SMS, Chat, Instagram & TikTok",
    subtitle: "Four channels · One unified lead pipeline",
    description:
      "KinnoBot's webinar funnel lives and dies by how fast and how well they capture interest across social media and direct channels. AKT deployed AI conversational agents across all four of KinnoBot's primary lead touchpoints — SMS, web chat, Instagram DMs, and TikTok DMs. Each agent is trained on KinnoBot's brand voice, the forex trading education context, and their webinar offer — qualifying interest, answering common questions, and directing prospects toward webinar registration automatically, 24 hours a day.",
    features: [
      "SMS AI agent — responds to inbound texts within 60 seconds",
      "Web chat agent — qualifies site visitors and captures registrations",
      "Instagram DM agent — responds to DM triggers from posts and stories",
      "TikTok DM agent — converts video comment interest into webinar leads",
      "All agents trained on KinnoBot's brand, offer, and FAQs",
      "Intent detection — separates qualified prospects from general inquiries",
      "Direct-to-registration flow — moves qualified leads to webinar signup",
      "All conversations logged to GoHighLevel contact timeline via n8n",
    ],
    tools: ["AI SMS Agent", "Web Chat AI", "Instagram DM Automation", "TikTok AI Agent", "GoHighLevel"],
  },
  {
    number: "04",
    title: "Custom Business Dashboard",
    subtitle: "Real-time visibility · No manual reporting",
    description:
      "AKT built KinnoBot a purpose-built business dashboard that surfaces the metrics their team actually needs — not the generic charts that come with off-the-shelf BI tools. The dashboard is fed by n8n data pipelines pulling from GoHighLevel, the AI agent platforms, and webinar data sources, and updates in real time. KinnoBot's leadership can see webinar registrations, channel performance, AI agent activity, lead pipeline status, and conversion rates — all in one view, without opening four separate tools.",
    features: [
      "Real-time webinar registrations and attendee count",
      "Lead source breakdown — SMS, chat, Instagram, TikTok, organic",
      "AI agent performance — conversations, qualifications, registrations",
      "GoHighLevel pipeline status — leads by stage, by source",
      "Webinar conversion rates — registered → attended → converted",
      "Automated data refresh via n8n pipelines — no manual updates",
      "Mobile-accessible — works on any device for on-the-go visibility",
      "Custom to KinnoBot's KPIs — not a generic BI template",
    ],
    tools: ["Custom Dashboard", "n8n Data Pipelines", "GoHighLevel API", "Real-Time Data"],
  },
  {
    number: "05",
    title: "Webinar Funnel Automation",
    subtitle: "Registration to close · Fully automated",
    description:
      "KinnoBot's business runs on webinars — and every touchpoint in that funnel was manually managed before AKT. AKT built end-to-end webinar automation: registration confirmation emails and SMS, multi-touch reminder sequences (24-hour, 1-hour, 15-minute), live attendance triggers, post-webinar follow-up sequences for attendees, replay delivery for no-shows, and re-engagement campaigns for prospects who registered but didn't attend. Every step runs automatically through n8n and GoHighLevel — no staff required to manage the sequence.",
    features: [
      "Registration confirmation — instant email + SMS upon signup",
      "Reminder sequence — 24h, 1h, and 15-minute automated reminders",
      "Attendee tracking — live attendance data captured and segmented",
      "Post-webinar follow-up — offer delivery and next-step sequence for attendees",
      "No-show sequence — replay email and re-engagement campaign automated",
      "Replay delivery — automated link delivery with expiry trigger",
      "Conversion tagging — attendees who buy are moved to new pipeline stage",
      "Re-registration campaign — cold leads re-invited to next webinar automatically",
    ],
    tools: ["n8n Workflows", "GoHighLevel Sequences", "Webinar Integration", "Email + SMS Automation"],
  },
];

const faqs = [
  {
    q: "What is the difference between Zapier and n8n for automation agencies?",
    a: "Zapier charges per task — costs scale rapidly as workflow volume grows. n8n is open-source and self-hosted, meaning you pay only for server costs regardless of task volume. For businesses running thousands of automations monthly, migrating from Zapier to n8n typically cuts costs by 70–90%. AKT executed this migration for KinnoBot, rebuilding all workflows in n8n and eliminating their Zapier subscription entirely.",
  },
  {
    q: "How long does a Zapier to n8n migration take?",
    a: "Timeline depends on workflow count and complexity. Simple single-function workflows migrate in days; complex multi-step automations with conditional logic and API integrations typically take 2–4 weeks for a full-production migration. AKT completed KinnoBot's full migration — including GoHighLevel integration and AI agent connections — without disrupting live operations.",
  },
  {
    q: "Can n8n integrate with GoHighLevel CRM?",
    a: "Yes. AKT connected KinnoBot's n8n workflows directly to GoHighLevel via GHL's REST API — enabling real-time contact creation, pipeline stage updates, tag management, and workflow triggers. This replaced Zapier as the middleware layer, giving KinnoBot more complex automation logic at zero per-task cost.",
  },
  {
    q: "How do AI agents work for Instagram and TikTok lead automation?",
    a: "AI agents monitor incoming DMs and comment interactions, detect intent using NLP, and respond automatically with personalized, on-brand replies — qualifying leads and directing prospects to webinar registration. AKT deployed this for KinnoBot across both Instagram and TikTok, converting social media engagement into qualified leads 24/7 without manual moderation.",
  },
  {
    q: "What does a custom business dashboard include?",
    a: "AKT built KinnoBot a real-time dashboard showing webinar registrations, attendee conversion rates, lead source breakdown by channel (SMS, Instagram, TikTok, chat), GoHighLevel pipeline status, and AI agent performance — all fed by n8n data pipelines and updated automatically. No manual reporting, no generic BI templates.",
  },
  {
    q: "How does webinar automation reduce manual work for an online business?",
    a: "AKT automated KinnoBot's entire webinar lifecycle — registration confirmations, multi-touch reminders, post-webinar follow-ups, replay delivery, and no-show re-engagement — all running through n8n and GoHighLevel without staff involvement. Every step triggers automatically based on attendee data, not by someone manually sending emails.",
  },
];

export default function KinnoBotPage() {
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
              <span className="text-white/65">KinnoBot</span>
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
                  Backend Automation · AI Social Agents · 2025
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Zapier Replaced. AI Agents Deployed. Backend Rebuilt for{" "}
                  <span style={{ color: "#0ABFA3" }}>KinnoBot</span>
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  KinnoBot is a forex trading education platform that helps busy professionals earn through automated trading — powered by live masterclass webinars and an algorithmic trading system. AKT rebuilt their entire automation backend: migrating from Zapier to self-hosted n8n to cut costs by over 70%, connecting everything to GoHighLevel CRM, deploying AI agents across SMS, chat, Instagram, and TikTok, and building a custom business dashboard and fully automated webinar funnel.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.kinnobot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    kinnobot.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Forex Trading · Webinar Funnel
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/kinnoBot.avif"
                    alt="KinnoBot logo — forex trading automation webinar platform"
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
                { value: "70%+", label: "Automation Cost Cut", sub: "Zapier → n8n migration" },
                { value: "5", label: "Systems Rebuilt", sub: "End-to-end automation" },
                { value: "4", label: "AI Agent Channels", sub: "SMS · Chat · Instagram · TikTok" },
                { value: "0", label: "Manual Webinar Steps", sub: "Fully automated funnel" },
                { value: "Real-Time", label: "Business Dashboard", sub: "Custom-built, live data" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p className="font-syne text-[clamp(20px,2.5vw,32px)] font-extrabold tracking-tight" style={{ color: "#0ABFA3" }}>
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
                A Zapier-dependent backend that punished growth — and a social media lead pipeline that required constant manual attention
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  KinnoBot&apos;s webinar-driven business model generates high volumes of automations — registration confirmations, reminders, follow-ups, CRM updates, lead routing — and every one of them was running through Zapier. As webinar volume grew, so did their Zapier bill. The per-task pricing model that works for small operations becomes a tax on success at scale.
                </p>
                <p>
                  Beyond the cost problem, Zapier&apos;s limitations were showing. Complex conditional logic, multi-step workflows with branching paths, and API-heavy integrations were hitting the ceiling of what Zapier could reliably handle. When workflows broke, debugging in Zapier was slow and opaque.
                </p>
                <p>
                  On the acquisition side, KinnoBot&apos;s social media presence on Instagram and TikTok was generating interest — but converting that interest into webinar registrations required manual DM responses, follow-ups, and link sharing. Without AI agents, they were leaving leads on the table every hour their team wasn&apos;t online.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Automation backend", "Zapier — expensive, fragile at scale"],
                  ["GoHighLevel sync", "Via Zapier — per-task cost per update"],
                  ["Social media leads", "Manual DM responses — slow, inconsistent"],
                  ["SMS lead follow-up", "Manual or basic trigger — no AI"],
                  ["Business visibility", "Multiple disconnected tools — no dashboard"],
                  ["Webinar funnel", "Partially manual — sequences needed oversight"],
                  ["Automation cost", "Scaling with volume — punishing growth"],
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
              Five systems. One rebuilt, fully automated backend.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT rebuilt KinnoBot&apos;s automation infrastructure from the ground up — eliminating Zapier, deploying n8n as the engine, and layering AI agents, GoHighLevel CRM, a custom dashboard, and webinar automation on top.
            </p>

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
                Lower costs. More channels. Fully automated — and built to scale without adding to the bill
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  KinnoBot&apos;s automation costs dropped by over 70% the moment Zapier was replaced by self-hosted n8n. The same workflows that were costing per-task now run at flat server cost — meaning KinnoBot can double their webinar volume, add new automation sequences, and expand their AI agent coverage without paying more for the infrastructure.
                </p>
                <p>
                  On the social media side, AI agents now handle every inbound DM on Instagram and TikTok — converting interest into webinar registrations 24 hours a day without manual moderation. SMS and web chat follow the same pattern. Every qualified lead flows directly into GoHighLevel CRM via n8n, tagged by channel and status, and enrolled in the appropriate follow-up sequence automatically.
                </p>
                <p>
                  The custom dashboard gives KinnoBot&apos;s team real-time visibility across all channels in one place — so they can see what&apos;s working, which agent is driving the most registrations, and how their webinar funnel is performing, without opening five different platforms.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Automation backend", "n8n self-hosted — flat cost, unlimited tasks"],
                  ["GoHighLevel sync", "Direct n8n → GHL API — zero per-task fee"],
                  ["Social media leads", "AI agents — 24/7 on Instagram and TikTok"],
                  ["SMS lead follow-up", "AI SMS agent — 60-second response, automated"],
                  ["Business visibility", "Custom dashboard — all KPIs in real time"],
                  ["Webinar funnel", "100% automated — registration to close"],
                  ["Automation cost", "Flat server cost — scales free of charge"],
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
              The full stack powering KinnoBot&apos;s backend
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "n8n", desc: "Workflow automation backbone" },
                { name: "GoHighLevel", desc: "CRM & sequence automation" },
                { name: "AI SMS Agent", desc: "Lead response & qualification" },
                { name: "Instagram AI", desc: "DM automation & lead routing" },
                { name: "TikTok AI", desc: "Comment & DM lead capture" },
                { name: "Custom Dashboard", desc: "Real-time KPI visibility" },
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
              Questions about Zapier to n8n migration and AI automation
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
                Migrate. Automate. Scale.
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Still paying Zapier per task as your business grows?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT migrates automation backends from Zapier to n8n, connects everything to GoHighLevel, and deploys AI agents across SMS, chat, Instagram, and TikTok — so you scale without scaling your tool costs.
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
