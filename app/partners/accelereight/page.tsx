import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Accelereight: Voice AI & Automation | AKT",
  description:
    "How AKT built Accelereight's complete AI automation ecosystem — Retell Voice AI agents for 24/7 call handling and appointment booking, an outbound email lead scraping system, a Stat & Reminder AI monitoring Slack, Monday.com, and Zoom, a Super Business Analytics Dashboard, and full automation maintenance across every workflow.",
  keywords: [
    "Retell AI voice agent appointment booking lead qualification",
    "outbound email marketing lead scraping automation agency",
    "business analytics dashboard subscription income profit tracking",
    "Slack Monday.com Zoom AI monitoring stat reminder system",
    "n8n GoHighLevel Retell voice AI automation agency",
    "automated outbound email campaign lead generation n8n",
    "AI appointment booking voice agent 24/7 autonomous",
    "custom business analytics dashboard real-time performance",
    "workflow automation maintenance audit agency n8n",
    "outbound lead scraping personalized email campaign",
    "Retell AI outbound calling lead qualification business",
    "GoHighLevel n8n automation maintenance zero downtime",
    "subscription income profit tracking live dashboard",
    "business automation audit maintenance service agency",
    "AI stat reminder missed meeting task monitoring",
    "revenue automation outbound email marketing system",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/accelereight`,
  },
  openGraph: {
    title: "Accelereight: Retell Voice AI, Outbound Email Engine, Business Analytics & Automation Maintenance | AKT",
    description:
      "AKT built Accelereight's full AI automation stack — Retell Voice AI agents, an outbound email lead scraping engine with client dashboard, a Slack/Monday/Zoom stat reminder system, a Super Business Analytics Dashboard, and ecosystem-wide automation maintenance.",
    type: "article",
    url: `${SITE_URL}/partners/accelereight`,
    publishedTime: "2024-03-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accelereight: Voice AI + Outbound Email Engine + Analytics Dashboard | AKT Case Study",
    description:
      "Retell Voice AI agents, automated lead scraping + email campaigns, Slack/Monday/Zoom monitoring, live business analytics, and full workflow maintenance — built by AKT for Accelereight.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/accelereight#article`,
      "headline":
        "How AKT Built Accelereight's AI Automation Ecosystem — Retell Voice AI Agents, Outbound Email Engine, Stat & Reminder AI, Super Business Analytics Dashboard, and Full Workflow Maintenance",
      "description":
        "AKT designed and deployed five interconnected AI systems for Accelereight: Retell Voice AI agents handling live calls and appointment booking 24/7; an outbound email marketing system with automated lead scraping and personalized campaigns; a Stat & Reminder AI monitoring Slack, Monday.com, Email, and Zoom to surface missed items in real time; a Super Business Analytics Dashboard tracking subscriptions, income, and profit with live data; and comprehensive ongoing maintenance and auditing of every automation across the ecosystem.",
      "datePublished": "2024-03-01",
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
      "mainEntityOfPage": `${SITE_URL}/partners/accelereight`,
      "about": {
        "@type": "Organization",
        "name": "Accelereight",
        "url": "https://accelereight.co",
        "description":
          "Accelereight is a business acceleration platform and agency helping entrepreneurs and business owners scale through AI automation, voice agents, and data-driven systems.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What can a Retell AI voice agent do for a business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A Retell AI voice agent handles live inbound and outbound phone calls autonomously — qualifying leads by asking targeted questions, capturing prospect information, booking appointments directly onto a calendar, and routing high-intent leads to a human closer. Retell AI delivers sub-600ms response latency, making conversations feel natural. AKT deployed Retell voice agents for Accelereight's business partners, enabling 24/7 call coverage without a human call team — so every lead that calls is qualified and every appointment opportunity is captured, regardless of the time of day.",
          },
        },
        {
          "@type": "Question",
          "name": "How does an automated outbound email marketing system with lead scraping work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's outbound email marketing system for Accelereight works in four stages: (1) Automated lead scraping extracts targeted prospect data from defined sources based on ideal customer profile criteria. (2) An AI qualification layer filters and scores each prospect for fit and intent. (3) Personalized outbound email campaigns are generated and launched automatically — with messaging tailored to each prospect's industry, role, and context. (4) Responses, opens, clicks, and conversions are tracked in a custom client dashboard, giving Accelereight full visibility into campaign performance and revenue attribution. The entire pipeline runs without manual list-building or campaign management.",
          },
        },
        {
          "@type": "Question",
          "name": "What is a Stat & Reminder AI system and how does it use Slack, Monday.com, and Zoom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's Stat & Reminder AI for Accelereight is a real-time monitoring system that watches four platforms simultaneously — Slack, Monday.com, Email, and Zoom — and surfaces critical items that would otherwise fall through the cracks. It detects missed Zoom meetings and sends immediate alerts, flags Monday.com tasks that are overdue or unassigned, surfaces unread or unresponded emails that exceed a time threshold, and monitors Slack for messages requiring follow-up. All alerts are delivered through the appropriate channel with context — so Accelereight's team and their clients know what needs attention without manually auditing four separate platforms.",
          },
        },
        {
          "@type": "Question",
          "name": "What does a Super Business Analytics Dashboard track for a subscription business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT built Accelereight's Super Business Analytics Dashboard to track the metrics that matter most to a subscription-based business: active subscription count and churn rate, monthly recurring revenue, total income by source, profit margins by product or service line, and live month-over-month performance comparisons. All data is pulled from source systems via n8n pipelines and updated in real time — giving Accelereight's leadership a single source of truth for business performance without opening multiple platforms or running manual reports.",
          },
        },
        {
          "@type": "Question",
          "name": "What does automation maintenance and auditing include for an n8n workflow ecosystem?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's automation maintenance for Accelereight covers the full lifecycle of every active workflow: monitoring n8n execution logs for errors and failed triggers, auditing workflow logic to ensure it matches intended behavior as connected tools update their APIs, testing trigger conditions after any system change, optimizing slow or resource-intensive workflows, and documenting changes to maintain a clear operational picture. The goal is zero downtime — every automation runs correctly, triggers on schedule, and delivers consistent results without Accelereight's team needing to monitor infrastructure.",
          },
        },
        {
          "@type": "Question",
          "name": "How does voice AI replace a human call center for appointment booking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Retell AI voice agents replace a human call center by handling every call interaction that doesn't require complex human judgment — qualification questions, FAQ responses, objection handling based on trained scripts, calendar availability checks, and appointment confirmation. AKT's voice agents for Accelereight are trained on each business partner's specific offer, qualifying criteria, and booking rules. When a caller meets the qualification threshold, the AI books the appointment directly. When a caller requires human escalation, the agent transfers the call or flags the contact for a follow-up. The result is a fully staffed call operation that costs a fraction of a human team and works around the clock.",
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
          "name": "Accelereight Case Study",
          "item": `${SITE_URL}/partners/accelereight`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built Accelereight's AI Automation Ecosystem",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Retell Voice AI Agents",
          "text":
            "AKT deployed Retell Voice AI agents for Accelereight's business partners — handling live inbound and outbound calls, qualifying leads autonomously, and booking appointments 24/7 without a human call team.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Outbound Email Marketing System",
          "text":
            "AKT engineered an automated outbound email system with integrated lead scraping, AI-powered qualification, personalized campaign generation, and a custom client dashboard for full campaign and revenue visibility.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Stat & Reminder AI System",
          "text":
            "AKT built a real-time monitoring AI that watches Slack, Monday.com, Email, and Zoom simultaneously — surfacing missed meetings, overdue tasks, and critical updates so nothing falls through the cracks for clients and business partners.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Super Business Analytics Dashboard",
          "text":
            "AKT developed a live analytics dashboard tracking subscriptions, income, profit, and monthly performance — giving Accelereight a single source of truth for all business metrics updated in real time.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Automation Maintenance & Audit",
          "text":
            "AKT maintains and audits every active automation across Accelereight's full ecosystem — monitoring execution, ensuring correct triggers, optimizing workflows, and maintaining zero downtime across the entire system.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Retell Voice AI Agents",
    subtitle: "Live calls · Lead qualification · Appointment booking · 24/7",
    description:
      "Accelereight's business partners needed to capture every inbound lead and follow up on every outbound prospect — but staffing a human call team around the clock isn't scalable. AKT deployed Retell Voice AI agents that handle live phone calls autonomously: answering inbound calls, working through qualification scripts, identifying high-intent prospects, and booking appointments directly onto the calendar without human involvement. With sub-600ms response latency, Retell's voice agents hold natural, flowing conversations that don't sound robotic. Every call outcome is logged, and qualified leads are pushed into GoHighLevel CRM automatically. The result is a fully staffed call operation that works 24 hours a day, 7 days a week — at a fraction of the cost of a human team.",
    features: [
      "Retell AI voice agents — sub-600ms latency, natural conversation",
      "Inbound call handling — every call answered and qualified automatically",
      "Outbound calling — AI dials prospects and works qualification scripts",
      "Appointment booking — schedules directly onto calendar during the call",
      "Lead qualification logic — custom criteria per business partner",
      "Call outcome logging — every result recorded and categorized",
      "GoHighLevel CRM push — qualified leads auto-created as contacts",
      "Human escalation routing — complex calls transferred to live rep",
    ],
    tools: ["Retell AI", "GoHighLevel", "n8n", "Voice AI", "CRM Automation"],
  },
  {
    number: "02",
    title: "Outbound Email Marketing System",
    subtitle: "Lead scraping · Personalized campaigns · Revenue conversion · Client dashboard",
    description:
      "Cold outbound email is one of the highest-ROI acquisition channels for B2B businesses — but only when the list is targeted, the messaging is personalized, and the follow-up is consistent. AKT engineered a fully automated outbound email system for Accelereight that handles every stage of the process: automated lead scraping that extracts targeted prospects based on ideal customer profile criteria, AI-powered qualification that filters leads by fit and intent before they enter the campaign, personalized email generation that tailors messaging to each prospect's industry and context, automated campaign sequencing that sends, follows up, and re-engages based on recipient behavior, and a custom client dashboard that gives Accelereight full visibility into open rates, reply rates, pipeline impact, and revenue attribution — all in one place.",
    features: [
      "Automated lead scraping — targeted prospects extracted continuously",
      "AI qualification layer — filters leads by ICP fit before campaign entry",
      "Personalized email generation — messaging tailored per prospect context",
      "Multi-touch campaign sequences — automated follow-up and re-engagement",
      "Behavioral triggers — sequence adapts to opens, clicks, and replies",
      "Custom client dashboard — campaign performance and revenue visibility",
      "Pipeline integration — converted leads pushed to GoHighLevel CRM",
      "Unsubscribe and compliance handling — built into every campaign",
    ],
    tools: ["n8n", "Email Automation", "Lead Scraping", "GoHighLevel", "Custom Dashboard", "AI Personalization"],
  },
  {
    number: "03",
    title: "Stat & Reminder AI System",
    subtitle: "Slack · Monday.com · Email · Zoom · Real-time surface",
    description:
      "Accelereight operates across multiple platforms simultaneously — Slack for team communication, Monday.com for project tracking, email for client correspondence, and Zoom for live meetings. The volume of activity across all four platforms means critical items inevitably get missed: a Zoom meeting starts without key participants, a Monday.com task slips past its deadline unnoticed, an important email goes unanswered for too long, a Slack message requiring action gets buried. AKT built the Stat & Reminder AI system to eliminate that problem entirely. The system monitors all four platforms in real time, applies intelligent rules to detect missed and overdue items, and surfaces alerts through the appropriate channel — with enough context to act immediately. Nothing falls through the cracks for Accelereight or their clients.",
    features: [
      "Zoom monitoring — missed and upcoming meetings flagged in real time",
      "Monday.com tracking — overdue and unassigned tasks surfaced automatically",
      "Email surveillance — unresponded emails flagged after defined time thresholds",
      "Slack monitoring — action-required messages identified and alerted",
      "Cross-platform alerts — critical items delivered through the right channel",
      "Contextual notifications — alerts include enough info to act immediately",
      "Client-facing visibility — partners and clients see their own critical updates",
      "Configurable rules — thresholds and logic customized per team and workflow",
    ],
    tools: ["n8n", "Slack", "Monday.com", "Zoom", "Email Monitoring", "Real-Time Alerts"],
  },
  {
    number: "04",
    title: "Super Business Analytics Dashboard",
    subtitle: "Subscriptions · Income · Profit · Live monthly performance",
    description:
      "Accelereight needed a single place to see the state of their business — not scattered across Stripe, GoHighLevel, spreadsheets, and email threads. AKT built a Super Business Analytics Dashboard that consolidates every key metric into one live view: active subscription counts with churn visibility, total income broken down by source, profit margins by product and service line, and live month-over-month performance comparisons that update automatically. All data is pulled from source systems via n8n pipelines on a continuous basis — no manual exports, no stale reports. Accelereight's leadership can open the dashboard at any time and see exactly where the business stands, what&apos;s growing, what&apos;s declining, and what requires attention — without opening a single other tool.",
    features: [
      "Subscription tracking — active count, churn rate, renewal velocity",
      "Income dashboard — total revenue by source, product, and period",
      "Profit visibility — margins by service line updated in real time",
      "Month-over-month comparisons — growth and decline surfaced automatically",
      "Live data refresh — n8n pipelines update dashboard continuously",
      "Single source of truth — no more reconciling across multiple platforms",
      "Mobile-accessible — metrics visible on any device, anytime",
      "Custom KPI configuration — dashboard built around Accelereight's actual goals",
    ],
    tools: ["Custom Dashboard", "n8n Data Pipelines", "GoHighLevel", "Subscription Tracking", "Business Analytics"],
  },
  {
    number: "05",
    title: "Automation Maintenance & Audit",
    subtitle: "Ecosystem-wide · Zero downtime · Every workflow verified",
    description:
      "A single broken automation in a connected ecosystem can cascade into missed leads, failed follow-ups, stale CRM data, and lost revenue — and most automation failures happen silently. AKT maintains and audits every active workflow across Accelereight's entire automation stack: monitoring n8n execution logs for errors and failed triggers, testing workflow behavior after any connected tool updates its API, auditing trigger conditions and logic for accuracy, optimizing resource-intensive workflows for performance, and documenting every system change to maintain operational clarity. The standard is zero downtime — every automation fires correctly, every trigger executes on schedule, and Accelereight's team never has to wonder whether their systems are working.",
    features: [
      "n8n execution monitoring — every workflow run logged and checked",
      "Error detection and resolution — failures caught and fixed proactively",
      "API change testing — workflows retested after platform updates",
      "Trigger accuracy audit — every condition verified against intended behavior",
      "Performance optimization — slow and resource-heavy workflows streamlined",
      "Change documentation — full record of every modification maintained",
      "Expansion support — new automations added as business needs evolve",
      "Zero downtime standard — consistent, reliable execution across every system",
    ],
    tools: ["n8n Maintenance", "Workflow Auditing", "System Monitoring", "GoHighLevel", "Error Handling"],
  },
];

const faqs = [
  {
    q: "What can a Retell AI voice agent do for a business?",
    a: "A Retell AI voice agent handles live calls autonomously — qualifying leads, answering FAQs, booking appointments, and routing high-intent prospects to a human closer. With sub-600ms latency, conversations feel natural. AKT deployed these for Accelereight's business partners, enabling 24/7 call coverage without a human team — every lead qualified and every appointment captured regardless of time.",
  },
  {
    q: "How does an automated outbound email system with lead scraping work?",
    a: "AKT's system works in four stages: (1) automated lead scraping extracts targeted prospects from defined sources; (2) AI qualification filters by fit and intent; (3) personalized campaigns launch automatically with messaging tailored to each prospect; (4) a custom client dashboard tracks opens, replies, pipeline impact, and revenue attribution. No manual list-building or campaign management required.",
  },
  {
    q: "What is a Stat & Reminder AI and how does it monitor Slack, Monday.com, and Zoom?",
    a: "AKT's Stat & Reminder AI watches Slack, Monday.com, Email, and Zoom simultaneously — detecting missed Zoom meetings, overdue Monday.com tasks, unresponded emails past a time threshold, and buried Slack messages requiring follow-up. Alerts are surfaced through the appropriate channel with enough context to act immediately. Nothing falls through the cracks for Accelereight or their clients.",
  },
  {
    q: "What does a Super Business Analytics Dashboard track for a subscription business?",
    a: "AKT's dashboard tracks active subscription count and churn, monthly recurring revenue, total income by source, profit margins by service line, and live month-over-month performance — all pulled from source systems via n8n pipelines and updated continuously. One view, real-time data, no manual reports.",
  },
  {
    q: "What does automation maintenance and auditing include for an n8n ecosystem?",
    a: "AKT monitors execution logs for errors, tests workflows after API changes, audits trigger conditions for accuracy, optimizes slow workflows, and documents every change. The standard is zero downtime — every automation fires correctly and on schedule without Accelereight's team needing to monitor infrastructure.",
  },
  {
    q: "How does voice AI replace a human call center for appointment booking?",
    a: "Retell AI handles every call interaction that doesn't require complex human judgment — qualification questions, FAQ responses, calendar availability checks, and appointment confirmation. AKT trains each agent on the specific offer, qualifying criteria, and booking rules. When a caller qualifies, the AI books. When escalation is needed, the call transfers. Full call center functionality at a fraction of the cost, around the clock.",
  },
];

export default function AccelereightPage() {
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
              <span className="text-white/65">Accelereight</span>
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
                  Voice AI · Revenue Automation · Analytics · Ongoing
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Five AI Systems Built to{" "}
                  <span style={{ color: "#0ABFA3" }}>Accelerate</span>{" "}
                  Every Part of the Business
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Accelereight is a business acceleration platform helping entrepreneurs and operators scale through AI systems, automation, and data. AKT built their complete AI automation ecosystem — Retell Voice AI agents handling live calls and bookings around the clock, an outbound email engine with automated lead scraping and a custom client dashboard, a Stat & Reminder AI monitoring Slack, Monday.com, Email, and Zoom in real time, a Super Business Analytics Dashboard tracking every revenue metric live, and full ecosystem-wide automation maintenance ensuring zero downtime across every workflow.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://accelereight.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    accelereight.co
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Business Acceleration · AI Systems
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/acce.webp"
                    alt="Accelereight logo — business acceleration AI automation platform"
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
                { value: "5", label: "AI Systems Deployed", sub: "Voice · Email · Monitor · Analytics · Maintenance" },
                { value: "24/7", label: "Voice AI Coverage", sub: "Retell agents — calls never missed" },
                { value: "4", label: "Platforms Monitored", sub: "Slack · Monday · Email · Zoom" },
                { value: "Live", label: "Business Analytics", sub: "Subscriptions · income · profit · real-time" },
                { value: "Zero", label: "Downtime Standard", sub: "Full ecosystem maintained by AKT" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p className="font-syne text-[clamp(18px,2.2vw,28px)] font-extrabold tracking-tight" style={{ color: "#0ABFA3" }}>
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
                A high-growth acceleration platform with too many manual touchpoints — missed calls, fragmented tools, no live business visibility, and a lead pipeline that required constant human effort
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Accelereight operates at the intersection of business consulting, AI automation, and revenue growth — which means their own systems need to model the same operational excellence they sell to clients. The reality before AKT was a set of disconnected tools that each worked in isolation: calls came in without a qualification layer, outbound prospecting was manual, and critical items across Slack, Monday.com, Zoom, and email were getting lost in the noise.
                </p>
                <p>
                  On the acquisition side, building a consistent outbound pipeline required manual work at every stage — researching prospects, building lists, writing emails, and following up. There was no automated system to continuously fill the top of the funnel and convert leads into revenue without someone working it by hand.
                </p>
                <p>
                  Business performance visibility was equally fragmented. Subscription data lived in one platform, revenue in another, and project status in a third. Getting a clear picture of how the business was performing meant pulling reports from multiple sources and reconciling them manually — a process that delayed decisions and obscured real-time trends.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Inbound calls", "Manual — leads missed outside business hours"],
                  ["Lead qualification", "Human-dependent — inconsistent and slow"],
                  ["Outbound pipeline", "Manual research, list-building, and email sends"],
                  ["Slack/Monday/Zoom", "Checked manually — missed items discovered late"],
                  ["Email monitoring", "No alerting — responses delayed or forgotten"],
                  ["Business analytics", "Fragmented — 3+ platforms, no live unified view"],
                  ["Automation reliability", "No monitoring — failures discovered after the fact"],
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
              Five systems. One fully automated acceleration engine.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT designed and deployed Accelereight&apos;s complete AI operations stack — from voice agents and revenue automation to cross-platform monitoring, live analytics, and ecosystem-wide maintenance.
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
                Every call answered, every lead activated, every critical item surfaced — and a live dashboard showing exactly how the business performs
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Accelereight&apos;s business partners now have voice AI agents that answer calls 24 hours a day — qualifying every inbound lead and booking appointments without a human on the phones. The outbound email engine continuously fills the pipeline with qualified prospects and converts them through personalized campaigns while the custom client dashboard shows exactly how each campaign translates to revenue.
                </p>
                <p>
                  The Stat & Reminder AI has eliminated the category of &ldquo;missed items&rdquo; entirely. Zoom meetings are flagged before they&apos;re missed. Monday.com tasks don&apos;t slip past deadlines unnoticed. Important emails don&apos;t sit unanswered for days. Slack messages that need action get surfaced — with enough context to respond immediately. Accelereight and their clients operate with the confidence that nothing critical is falling through the cracks.
                </p>
                <p>
                  The Super Business Analytics Dashboard gives Accelereight&apos;s leadership a real-time view of the business that didn&apos;t exist before — subscriptions, income, profit, and month-over-month trends visible in one place, updated continuously. Decisions that used to require pulling reports from three platforms now happen at a glance.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Inbound calls", "Retell AI — every call qualified and booked, 24/7"],
                  ["Lead qualification", "Voice AI — consistent, instant, around the clock"],
                  ["Outbound pipeline", "Automated — scrape, qualify, campaign, convert"],
                  ["Slack/Monday/Zoom", "AI monitoring — critical items surfaced in real time"],
                  ["Email monitoring", "Threshold alerts — no important email left unresponded"],
                  ["Business analytics", "Live dashboard — subscriptions, income, profit, unified"],
                  ["Automation reliability", "AKT maintenance — zero downtime, every system verified"],
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
              The full stack powering Accelereight&apos;s AI ecosystem
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "Retell AI", desc: "Voice agent — calls & bookings" },
                { name: "n8n", desc: "Automation backbone" },
                { name: "GoHighLevel", desc: "CRM & pipeline automation" },
                { name: "Slack", desc: "Team communication monitoring" },
                { name: "Monday.com", desc: "Task & project monitoring" },
                { name: "Custom Dashboard", desc: "Live business analytics" },
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
              Questions about voice AI, outbound automation, and business analytics systems
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
                Voice AI. Revenue Engine. Live Analytics. Zero Downtime.
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Ready to build the AI ecosystem that runs your business — not just parts of it?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds complete AI automation ecosystems — Retell voice agents, outbound email engines, cross-platform monitoring systems, live business dashboards, and full ongoing maintenance — so your business accelerates without adding operational overhead.
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
