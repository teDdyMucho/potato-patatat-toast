import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "DadzStudio: Crypto AI Social Automation | AKT",
  description:
    "How AKT built DadzStudio's complete operations stack — a Monday.com AI Social Media Command Center auto-posting crypto content to Twitter daily, a GoHighLevel outbound call CRM, a Crypto Lead Scraper with automated contact sequences, and a Monday.com Job Management System with synced timers and payout tracking.",
  keywords: [
    "Monday.com AI social media automation crypto content generation",
    "crypto social media command center AI Twitter auto-posting",
    "n8n Twitter API automated posting crypto agency",
    "GoHighLevel outbound call CRM agent routing automation",
    "crypto lead scraping outbound contact sequence automation",
    "Monday.com job management system timers payout tracking",
    "AI crypto content generation image video Twitter",
    "outbound calling CRM automation GoHighLevel n8n",
    "crypto news scraper lead generation automation n8n",
    "Monday.com workflow automation agency n8n",
    "AI image video generation social media posts crypto",
    "one-click AI content generation Monday.com board",
    "crypto hot topics social media scheduler AI agency",
    "automated outbound call routing contact rate optimization",
    "job management board timer milestone payout automation",
    "crypto marketing automation social media agency",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/dadstudio`,
  },
  openGraph: {
    title: "DadzStudio: Monday.com AI Social Media Command Center, Crypto Lead Scraper, Outbound CRM & Job Management | AKT",
    description:
      "AKT built DadzStudio's full operations stack — a Monday.com AI Social Media Command Center scraping crypto topics and auto-posting to Twitter, a GoHighLevel outbound CRM, a Crypto Lead Scraper with auto contact sequences, and a Monday.com Job Management System with synced timers and payout tracking.",
    type: "article",
    url: `${SITE_URL}/partners/dadstudio`,
    publishedTime: "2024-08-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "DadzStudio: AI Crypto Social Media Automation + Outbound CRM + Job Management | AKT Case Study",
    description:
      "One-click AI crypto content → Twitter auto-posting. GoHighLevel outbound call CRM. Crypto lead scraper with auto sequences. Monday.com job management with payout tracking. All built by AKT.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/dadstudio#article`,
      "headline":
        "How AKT Built DadzStudio's Monday.com AI Social Media Command Center, GoHighLevel Outbound Call CRM, Crypto Lead Scraper, and Job Management System",
      "description":
        "AKT engineered four interconnected systems for DadzStudio: a Monday.com Social Media Command Center that scrapes crypto hot topics, generates AI post copy and visuals, and auto-posts to Twitter on a daily schedule; a full GoHighLevel CRM managing outbound agent calls, candidate sourcing, and call routing; a Crypto Lead Scraper that continuously monitors trends, identifies high-intent leads, and initiates automated contact sequences; and a Monday.com Job Management System with synced timers, milestone tracking, and automated payout processing.",
      "datePublished": "2024-08-01",
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
      "mainEntityOfPage": `${SITE_URL}/partners/dadstudio`,
      "about": {
        "@type": "Organization",
        "name": "DadzStudio",
        "url": "https://www.dadstudio.xyz",
        "description":
          "DadzStudio is a Web3 and crypto-focused creative studio offering AI-powered content creation, outbound sales operations, and digital product development for the cryptocurrency and blockchain market.",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Monday.com Social Media Command Center for crypto content?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A Monday.com Social Media Command Center for crypto is an automated content pipeline built on Monday.com boards and n8n workflows that handles the entire social media publishing process without manual input. AKT built this for DadzStudio: n8n continuously scrapes the latest crypto hot topics and trending discussions, an AI layer analyzes market demand and relevance, post copy is generated automatically with the correct tone and hashtag strategy, AI image and video generation models create the accompanying visual assets, and the finished post is published directly to Twitter via the Twitter API on a fixed daily schedule. The entire workflow triggers from a Monday.com board — giving DadzStudio one-click control over every stage of the process with full visibility into what is scheduled, what is live, and what performed.",
          },
        },
        {
          "@type": "Question",
          "name": "How does GoHighLevel automate outbound call operations for a sales team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT configured GoHighLevel as DadzStudio's full outbound call CRM — managing every stage of the calling operation: candidate sourcing and contact list building, dialer queue management, call routing rules that assign leads to the right agent based on availability and qualification criteria, automated follow-up sequences triggered by call outcomes, and pipeline stage updates that reflect each contact's position in the outbound funnel. The result is a streamlined calling operation where agents spend time on conversations, not on administrative work — and management has full visibility into contact rate, conversion efficiency, and pipeline health in real time.",
          },
        },
        {
          "@type": "Question",
          "name": "How does a Crypto Lead Scraper identify high-intent leads automatically?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's Crypto Lead Scraper for DadzStudio continuously monitors crypto news sources, social media channels, and trend data to identify signals that indicate a prospect is actively engaged in the crypto market. The scraper extracts prospect contact information and context, passes each lead through an AI qualification layer that scores them based on engagement signals and relevance to DadzStudio's product offering, and automatically initiates a contact sequence for qualified leads — launching personalized outreach to pitch DadzStudio products without manual intervention. The result is a self-operating lead pipeline that grows DadzStudio's prospect database continuously and reaches every qualified lead while the topic is still hot.",
          },
        },
        {
          "@type": "Question",
          "name": "What does a Monday.com Job Management System with synced timers include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's Monday.com Job Management System for DadzStudio connects every active job's tasks, milestones, team member assignments, and time tracking into a single board with synchronized timers. When a team member starts work on a task, the timer logs their time against the job automatically. Milestone completion triggers downstream workflow steps. Payout calculations are automated based on logged hours and job-specific rates — so team members are compensated accurately without manual reconciliation. Management sees every job's status, timeline, and cost in one view, and the system escalates overdue milestones automatically.",
          },
        },
        {
          "@type": "Question",
          "name": "How does n8n connect Monday.com, GoHighLevel, and the Twitter API for automation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "n8n serves as the self-hosted automation backbone that connects every platform in DadzStudio's stack. For the Social Media Command Center, n8n receives triggers from Monday.com, sends scraping and AI generation requests, receives outputs, and pushes the finished post to the Twitter API on schedule. For the CRM, n8n routes data between GoHighLevel and the lead scraper — syncing contact records, updating pipeline stages, and triggering follow-up sequences. For job management, n8n processes timer events from Monday.com and calculates payout data automatically. Because n8n is self-hosted, none of these workflows carry per-task fees — the system runs at flat infrastructure cost regardless of volume.",
          },
        },
        {
          "@type": "Question",
          "name": "What AI models are used for crypto social media content generation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's Social Media Command Center for DadzStudio uses the latest AI models for each content type: large language models for generating crypto post copy that matches trending topics and DadzStudio's brand voice, AI image generation models for creating visual assets that accompany each post, and AI video generation models for short-form video content optimized for Twitter engagement. The specific models are selected based on output quality, API cost-efficiency, and the content format required — and the system is designed to swap in newer models as the AI generation landscape evolves, without rebuilding the surrounding automation.",
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
          "name": "DadzStudio Case Study",
          "item": `${SITE_URL}/partners/dadstudio`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built DadzStudio's Crypto Automation and Operations Stack",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Monday.com AI Social Media Command Center",
          "text":
            "AKT built a Monday.com board integrated with n8n workflows that scrapes crypto hot topics, generates AI post copy and visual assets, and auto-posts to Twitter daily — all triggerable with one click from the Monday.com interface.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "GoHighLevel Outbound Call CRM",
          "text":
            "AKT configured a full GoHighLevel CRM for DadzStudio's outbound calling operation — managing candidate sourcing, dialer queues, call routing to the right agent, follow-up sequences, and pipeline visibility across the entire sales team.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Crypto Lead Scraper",
          "text":
            "AKT engineered a continuous crypto news and trend scraper that identifies high-intent prospects, qualifies them via AI, and automatically initiates contact sequences to pitch DadzStudio products — without manual lead sourcing.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Monday.com Job Management System",
          "text":
            "AKT built a Monday.com job management system with synchronized timers across all active jobs — connecting tasks, milestones, team assignments, and automated payout tracking into one unified board.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Monday.com AI Social Media Command Center",
    subtitle: "Crypto scraping · AI generation · Twitter auto-post · Daily schedule",
    description:
      "DadzStudio's audience lives on Twitter and moves with the crypto market — which means their content needs to respond to what is trending today, not what was relevant last week. AKT built a Monday.com Social Media Command Center that automates the entire content pipeline from trending topic to published post. An n8n workflow continuously scrapes the latest crypto news, hot discussions, and market signals. The AI layer analyzes demand and selects the highest-relevance angles for DadzStudio's brand. Post copy is generated automatically using the appropriate voice and hashtag strategy. AI image and video generation models create the visual assets to accompany each post. The finished package — copy, image, and video — is pushed directly to Twitter via the Twitter API on a fixed daily schedule. Every stage is tracked in Monday.com, giving DadzStudio one-click visibility and control without manually touching a single tool in the stack.",
    features: [
      "Crypto topic scraping — latest hot topics and market signals pulled continuously",
      "AI market demand analysis — relevance scored before content is generated",
      "Post copy generation — AI writes copy tuned to DadzStudio brand and voice",
      "AI image generation — visual assets created for every scheduled post",
      "AI video generation — short-form video content for Twitter engagement",
      "Twitter API auto-posting — published on fixed daily schedule without manual send",
      "Monday.com command board — one-click control and full pipeline visibility",
      "Content archive — every post, asset, and performance tracked in the board",
    ],
    tools: ["Monday.com", "n8n", "Twitter API", "AI Content Generation", "AI Image Generation", "AI Video Generation", "Crypto Scraping"],
  },
  {
    number: "02",
    title: "GoHighLevel Outbound Call CRM",
    subtitle: "Agent calls · Candidate sourcing · Call routing · Conversion optimization",
    description:
      "DadzStudio's outbound sales operation runs on phone — and the efficiency of that operation is determined entirely by how well the CRM manages lead flow, agent assignment, and follow-up. AKT built DadzStudio's full outbound calling infrastructure inside GoHighLevel: candidate sourcing pipelines that build qualified contact lists, dialer queue management that keeps agents working at maximum efficiency, intelligent call routing rules that assign each lead to the right agent based on availability, qualification fit, and conversion history, automated follow-up sequences triggered by every call outcome — whether answered, no-answer, not interested, or scheduled callback — and full pipeline visibility that shows management exactly where every contact stands. The result is an outbound calling operation where agents spend their time on conversations, not on administrative work, and where every lead receives consistent, correctly timed follow-up regardless of what happened on the last call.",
    features: [
      "Candidate sourcing pipeline — qualified contact lists built automatically",
      "Dialer queue management — agents always working the highest-priority leads",
      "Intelligent call routing — leads assigned to right agent by fit and availability",
      "Outcome-triggered follow-up — sequences launch based on every call result",
      "No-answer sequences — automatic re-dial and SMS follow-up on missed calls",
      "Pipeline stage automation — contacts move based on call outcomes, not manual entry",
      "Conversion visibility — management sees contact rate and conversion by agent",
      "GoHighLevel CRM sync — every call logged, tagged, and tracked in real time",
    ],
    tools: ["GoHighLevel", "n8n", "CRM Automation", "Call Routing", "Outbound Sequences", "Pipeline Management"],
  },
  {
    number: "03",
    title: "Crypto Lead Scraper",
    subtitle: "News monitoring · High-intent identification · Auto contact sequences",
    description:
      "In the crypto space, the window between a prospect showing interest and going cold is measured in hours — not days. AKT engineered a Crypto Lead Scraper for DadzStudio that continuously monitors crypto news sources, trending discussions, and market activity to identify high-intent prospects the moment they appear. The scraper extracts prospect data and context signals, runs each lead through an AI qualification layer that scores their fit for DadzStudio's products based on their engagement profile and recent activity, and automatically initiates personalized contact sequences for every qualified lead — launching outreach at the moment of highest intent. The system operates 24 hours a day: while DadzStudio's team is offline, the scraper is identifying new prospects and putting them into sequences that pitch DadzStudio's products before a competitor has the chance.",
    features: [
      "Continuous crypto news monitoring — sources checked around the clock",
      "Trend and discussion scraping — high-activity topics identified in real time",
      "Prospect data extraction — contact details and context signals captured",
      "AI qualification scoring — leads ranked by fit and DadzStudio product relevance",
      "Automated contact sequences — outreach launched at moment of highest intent",
      "GoHighLevel CRM injection — qualified leads added as contacts automatically",
      "Sequence personalization — messaging tailored to prospect's crypto focus",
      "24/7 pipeline fill — new leads activated continuously without manual sourcing",
    ],
    tools: ["n8n", "Crypto Scraping", "AI Qualification", "GoHighLevel", "Lead Sequences", "Market Analysis"],
  },
  {
    number: "04",
    title: "Monday.com Job Management System",
    subtitle: "Synced timers · Milestone tracking · Team visibility · Payout automation",
    description:
      "As DadzStudio's project volume grows, managing multiple active jobs across a distributed team without a structured system creates the conditions for missed milestones, disputed hours, and delayed payouts. AKT built a Monday.com Job Management System that connects every dimension of every active job into a single board: tasks and milestones with clear ownership and due dates, team member assignments with role-specific permissions, synchronized timers that log working time against the correct job and task automatically, milestone completion triggers that advance the project workflow and notify stakeholders, and automated payout calculations that process team member compensation based on logged hours and job-specific rates — without manual reconciliation. DadzStudio's management sees every job's status, timeline, team workload, and financial position in one view, and the system escalates overdue items before they become problems.",
    features: [
      "Job boards — every active project with tasks, milestones, and ownership",
      "Synced timers — team working time logged against correct job automatically",
      "Milestone triggers — completion advances workflow and notifies stakeholders",
      "Team assignment management — roles, permissions, and workload in one view",
      "Automated payout calculation — compensation computed from logged hours and rates",
      "Overdue escalation — late milestones surfaced before they delay delivery",
      "Project cost tracking — actual vs. estimated tracked per job in real time",
      "Client-facing status visibility — project progress shareable without system access",
    ],
    tools: ["Monday.com", "n8n", "Timer Sync", "Payout Tracking", "Milestone Automation", "Job Management"],
  },
];

const faqs = [
  {
    q: "What is a Monday.com Social Media Command Center for crypto content?",
    a: "It's an automated content pipeline built on Monday.com and n8n that handles the full process: crypto topic scraping → AI demand analysis → post copy generation → AI image and video creation → Twitter auto-posting on a daily schedule. AKT built this for DadzStudio so their entire social media output runs on autopilot with one-click control from a Monday.com board.",
  },
  {
    q: "How does GoHighLevel automate outbound call operations?",
    a: "AKT configured GHL as DadzStudio's full outbound CRM — candidate sourcing pipelines, dialer queue management, intelligent call routing by agent fit and availability, outcome-triggered follow-up sequences, and live pipeline visibility. Agents spend time on conversations, not admin. Every contact gets consistent, correctly timed follow-up regardless of what happened on the last call.",
  },
  {
    q: "How does the Crypto Lead Scraper identify high-intent leads automatically?",
    a: "The scraper monitors crypto news sources, trending discussions, and market signals 24/7. Each prospect is scored by an AI qualification layer for fit with DadzStudio's products. Qualified leads are injected into GoHighLevel CRM and immediately entered into personalized contact sequences — outreach launches at the moment of highest intent, before competitors respond.",
  },
  {
    q: "What does the Monday.com Job Management System with synced timers include?",
    a: "Every active job has tasks, milestones, and team assignments on one board. Timers sync logged hours to the correct job automatically. Milestone completions trigger workflow steps. Payout calculations run from logged hours and job rates without manual reconciliation. Management sees job status, team workload, and cost in one live view.",
  },
  {
    q: "How does n8n connect Monday.com, GoHighLevel, and the Twitter API?",
    a: "n8n is the self-hosted backbone: it receives Monday.com triggers, routes to scraping and AI generation services, pushes finished posts to the Twitter API, syncs the lead scraper with GoHighLevel, and handles timer-to-payout calculations. Self-hosted means no per-task fees — the entire stack scales at flat infrastructure cost.",
  },
  {
    q: "What AI models power DadzStudio's crypto content generation?",
    a: "The Command Center uses large language models for post copy (tuned to DadzStudio's voice and crypto trends), AI image generation for visual assets, and AI video generation for short-form Twitter content. Models are selected for output quality and API cost efficiency — and the system is designed to swap in newer models as the AI landscape evolves without rebuilding the surrounding automation.",
  },
];

export default function DadzStudioPage() {
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
              <span className="text-white/65">DadzStudio</span>
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
                Crypto AI · Social Automation · Outbound CRM · Job Ops
              </span>
              <h1 className="font-syne text-[clamp(28px,4vw,52px)] font-extrabold leading-tight tracking-tight text-white">
                Four Systems Built to Run{" "}
                <span style={{ color: "#0ABFA3" }}>DadzStudio&apos;s</span>{" "}
                Entire Crypto Operation on Autopilot
              </h1>
              <p className="mt-6 text-[16px] leading-8 text-white/62">
                DadzStudio is a Web3 and crypto-focused creative studio building AI-powered products, content, and sales operations for the blockchain market. AKT engineered their full operations stack — a Monday.com AI Social Media Command Center that scrapes crypto topics and auto-posts to Twitter daily, a GoHighLevel CRM powering the entire outbound calling operation, a Crypto Lead Scraper that identifies high-intent prospects and initiates contact sequences automatically, and a Monday.com Job Management System with synchronized timers and automated payout tracking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.dadstudio.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  dadstudio.xyz
                  <ArrowUpRight size={12} />
                </a>
                <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                  Web3 · Crypto · AI Content
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                  United States
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-b border-white/10 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { value: "4", label: "Automation Systems", sub: "Social · CRM · Leads · Job Mgmt" },
                { value: "Daily", label: "Auto Twitter Posts", sub: "Crypto topics → AI copy → live" },
                { value: "24/7", label: "Crypto Lead Pipeline", sub: "Scrape → qualify → sequence" },
                { value: "Auto", label: "Payout Tracking", sub: "Synced timers → calculated payouts" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p className="font-syne text-[clamp(20px,2.5vw,34px)] font-extrabold tracking-tight" style={{ color: "#0ABFA3" }}>
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
                A crypto studio racing to stay relevant — manual content, scattered outbound ops, slow lead response, and no unified system to manage growing project volume
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Crypto moves faster than almost any other market — trends emerge in hours, not days, and the brands that win on Twitter are the ones posting relevant content at the moment the topic is hot. DadzStudio was producing social content manually, which meant researching topics, writing copy, sourcing visuals, and scheduling posts was a daily time drain that pulled the team away from building products and closing sales.
                </p>
                <p>
                  On the sales side, DadzStudio&apos;s outbound operation had the pieces but not the system — agents were working leads but without a structured CRM that optimized routing, enforced consistent follow-up, and gave management clear visibility into pipeline health and conversion rates. Leads slipped through gaps, and there was no way to run the operation at scale without adding headcount.
                </p>
                <p>
                  With multiple active projects, contractors, and client deliverables running simultaneously, tracking who was working on what, how many hours had been logged, and what team members were owed in payouts required manual reconciliation — a process that introduced errors and delayed compensation. DadzStudio needed every system automated so their team could focus entirely on output.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Crypto content creation", "Manual — research, write, source visuals, schedule daily"],
                  ["Twitter posting", "Manual send — delayed, inconsistent with trending topics"],
                  ["Outbound calling", "No CRM structure — routing and follow-up inconsistent"],
                  ["Crypto lead sourcing", "Manual research — slow, misses real-time intent signals"],
                  ["Lead contact sequences", "Manual or none — high-intent leads contacted too late"],
                  ["Job time tracking", "Manual logs — disputed hours, reconciliation errors"],
                  ["Team payouts", "Manual calculation — delays and inaccuracies in compensation"],
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
              Four systems. One automated crypto operation.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT engineered DadzStudio&apos;s complete operations infrastructure — from AI-powered social media and outbound sales to crypto lead generation and project management — connected through n8n, Monday.com, and GoHighLevel.
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
                Daily crypto content live on Twitter automatically. Leads scraping and sequencing around the clock. Outbound calling structured and scalable. Jobs tracked, milestones hit, payouts processed.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  DadzStudio&apos;s Twitter presence now posts crypto-relevant content every day without anyone on the team writing a word or clicking a scheduler. The Command Center identifies what&apos;s trending in crypto, generates the copy and visuals, and publishes — while the team focuses on products and client work. Social media went from a daily manual task to a fully automated growth channel.
                </p>
                <p>
                  The Crypto Lead Scraper operates continuously in the background — monitoring market activity, pulling high-intent prospects, and initiating contact the moment relevance peaks. DadzStudio&apos;s product outreach now happens at the best possible time for conversion, without anyone manually researching or building lists.
                </p>
                <p>
                  Outbound calling runs on a structured CRM with consistent routing, follow-up, and pipeline tracking — so management has full visibility into what&apos;s working and agents have a clear system to execute. And across every active job, timers, milestones, and payouts run automatically — so the team gets paid accurately and on time, and nothing falls behind without visibility.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Crypto content creation", "Fully automated — topics scraped, copy and visuals generated"],
                  ["Twitter posting", "Daily auto-post — trending content live without manual send"],
                  ["Outbound calling", "Structured GHL CRM — routing, follow-up, and pipeline visible"],
                  ["Crypto lead sourcing", "24/7 scraper — high-intent prospects identified in real time"],
                  ["Lead contact sequences", "Auto-initiated — outreach at moment of peak intent"],
                  ["Job time tracking", "Synced timers — logged automatically against every task"],
                  ["Team payouts", "Automated calculation — accurate, on-time, no reconciliation"],
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
              The full stack powering DadzStudio&apos;s crypto automation ecosystem
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {[
                { name: "n8n", desc: "Automation backbone" },
                { name: "Monday.com", desc: "Command center & job mgmt" },
                { name: "GoHighLevel", desc: "Outbound call CRM" },
                { name: "Twitter API", desc: "Auto-posting integration" },
                { name: "Crypto Scraper", desc: "News & trend monitoring" },
                { name: "AI Content Gen", desc: "Copy, image & video AI" },
                { name: "Timer Sync", desc: "Job tracking & payouts" },
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
              Questions about crypto social media automation, outbound CRM, and lead scraping
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
                Social. Outbound. Leads. Ops. Automated.
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Want your crypto or Web3 operation running on autopilot?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds AI social media command centers, outbound call CRMs, automated lead scraping engines, and job management systems for crypto studios and Web3 businesses — so your team focuses on building, not operating.
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
