import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Akt3DLogo } from "@/components/ui/akt-3d-logo";
import ProcessSteps, { ProcessPhotoCard } from "@/components/about/ProcessSteps";
import {
  ArrowUpRight,
  Award,
  Globe,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AKT | GoHighLevel & AI Automation Specialist Agency",
  description:
    "AKT Virtual Assistance Services is a Philippine-based AI automation agency specializing in GoHighLevel, n8n, Retell AI, and custom workflow automation. We integrate tools, build AI systems, and deploy AI as part of your workforce — making your business operate 24/7 without extra headcount.",
  keywords: [
    "GoHighLevel automation specialist",
    "AI automation agency Philippines",
    "n8n workflow automation",
    "Retell AI voice agent builder",
    "GoHighLevel CRM setup",
    "business automation consultant",
    "AI workforce integration",
    "automation specialist SEO",
    "GHL automation expert",
    "AI system builder for business",
    "virtual assistant agency Philippines",
    "business process automation",
    "AI chatbot builder",
    "GoHighLevel CRM management",
    "workflow integration specialist",
  ],
  openGraph: {
    title: "AKT | GoHighLevel & AI Automation Specialist Agency",
    description:
      "We build AI systems, automate workflows, and deploy AI as part of your workforce. GoHighLevel, n8n, Retell AI, and custom automation — all under one agency.",
    url: "https://aktservices.org/about",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT | GoHighLevel & AI Automation Specialist Agency",
    description:
      "AI automation agency specializing in GoHighLevel, n8n, Retell AI voice agents, and full workflow integration for businesses worldwide.",
  },
  alternates: { canonical: "https://aktservices.org/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aktservices.org/#organization",
      name: "AKT Virtual Assistance Services",
      url: "https://aktservices.org",
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Jose Angelo Tapang",
        jobTitle: "CEO & Founder",
      },
      description:
        "Philippine-based AI automation agency specializing in GoHighLevel CRM, n8n workflow automation, Retell AI voice agents, and custom AI system builds for businesses worldwide.",
      areaServed: "Worldwide",
      knowsAbout: [
        "GoHighLevel CRM Automation",
        "n8n Workflow Automation",
        "Retell AI Voice Agents",
        "AI Chatbot Development",
        "Business Process Automation",
        "SEO Automation",
        "Virtual Assistant Operations",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "admin@aktservices.org",
        contactType: "Business Inquiries",
      },
      sameAs: [
        "https://linkedin.com/in/jatakt",
        "https://www.facebook.com/profile.php?id=100075861475134",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does AKT specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AKT specializes in GoHighLevel CRM automation, n8n workflow builds, Retell AI voice agents, custom AI chatbots, and full business process automation. We connect and integrate tools to create seamless, efficient workflows — and we implement AI as an active part of your workforce, not just a software add-on.",
          },
        },
        {
          "@type": "Question",
          name: "Is AKT a GoHighLevel automation specialist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AKT has built GoHighLevel CRM systems for 8 of our 10 partner clients across industries including roofing, distribution, real estate, forex, crypto, marketing, and automotive. We configure pipelines, automate follow-up sequences, connect AI agents, and maintain the full GHL stack.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between AKT and a regular automation agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AKT doesn't just set up software — we implement AI as part of your actual workforce. Our AI agents handle calls, qualify leads, respond to messages, generate content, and run daily operations autonomously. We build tools specifically for your business, integrate every system into one connected pipeline, and maintain everything long-term.",
          },
        },
        {
          "@type": "Question",
          name: "Can AKT replace Zapier with n8n to reduce automation costs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AKT migrated KinnoBot from Zapier to self-hosted n8n, cutting automation costs by 70%+ while improving reliability and handling complex logic that Zapier couldn't support. We audit existing workflows, rebuild them in n8n, and handle the full cutover with zero downtime.",
          },
        },
        {
          "@type": "Question",
          name: "What industries has AKT built AI automation systems for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AKT has deployed AI automation across financial services (MCA/lending), roofing and construction, B2B wholesale distribution, AI automation agencies, real estate, forex education, Web3 and crypto, business acceleration, marketing agencies, and automotive dealerships.",
          },
        },
        {
          "@type": "Question",
          name: "Does AKT provide ongoing maintenance after building a system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AKT provides ongoing automation maintenance including n8n workflow monitoring, error detection and resolution, AI prompt optimization, GoHighLevel CRM upkeep, and system expansion. Our October Marketing engagement is an active ongoing maintenance relationship.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "How AKT Builds an AI Automation System for Your Business",
      description:
        "AKT's process for integrating AI into your business operations — from discovery to live deployment.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Discovery & Systems Audit",
          text: "We map your current tools, workflows, and pain points. We identify what can be automated, what tools are missing, and where AI can replace manual effort. This gives us the blueprint for your custom automation stack.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Stack Design & Tool Selection",
          text: "We select the right combination of tools — GoHighLevel, n8n, Retell AI, Claude AI, Supabase, Monday.com, and more — based on your specific business needs. Every system is purpose-built for your use case, not templated.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Build, Integrate & Connect",
          text: "We build each system and connect them into one seamless pipeline. Leads flow from AI chat to CRM. Voice agents push call data to follow-up sequences. Every tool talks to every other tool — zero manual handoffs.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Deploy AI Into Your Workforce",
          text: "We deploy AI agents as active members of your team — answering calls 24/7, qualifying leads, sending follow-ups, posting content, managing tasks, and reporting metrics. Your business runs even when your team is offline.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Monitor, Maintain & Optimize",
          text: "We monitor every system post-launch. n8n workflows are checked for errors, AI prompts are optimized as your business evolves, and the entire stack is maintained to run with zero downtime.",
        },
      ],
    },
  ],
};

const stats = [
  { value: "10+", label: "Partner Clients" },
  { value: "6", label: "Continents Served" },
  { value: "$6M+", label: "Client Sales Contributed" },
  { value: "5+", label: "Years Operating" },
  { value: "8", label: "GoHighLevel Builds" },
  { value: "70%+", label: "Automation Cost Cut (n8n vs Zapier)" },
];

const industries = [
  { name: "Financial Services / MCA", partner: "Proto Financial" },
  { name: "Roofing & Construction", partner: "Southland Roofing" },
  { name: "B2B Wholesale / Distribution", partner: "Lucky 7 Distribution" },
  { name: "AI Automation Agencies", partner: "Digital Flo" },
  { name: "Real Estate", partner: "KDA Innovations" },
  { name: "Forex / Online Education", partner: "KinnoBot" },
  { name: "Web3 / Crypto", partner: "DadzStudio" },
  { name: "Business Acceleration", partner: "Accelereight" },
  { name: "Marketing Agencies", partner: "Branding561" },
  { name: "Automotive / Dealerships", partner: "October Marketing" },
];

const techStack = [
  "GoHighLevel", "n8n", "Retell AI", "Claude AI", "OpenAI", "Supabase",
  "Monday.com", "Salesforce", "WooCommerce", "Closebot", "OpenRouter",
  "Slack", "Zoom", "Twitter / X API", "Veo 3.1", "Kling", "Imagen 1.5",
  "Grok Imagine", "React", "Next.js",
];

const timeline = [
  {
    year: "2020",
    title: "AKT Founded",
    desc: "Jose Angelo Tapang founded AKT Virtual Assistance Services in partnership with Proto Financial — building a Philippines-based call center and email automation system that contributed over $6M in client sales over 4 years.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    desc: "AKT expanded to clients across North America, Europe, and Australia. VA operations scaled to generate millions in annual sales. Salesforce automation and offshore department management became core capabilities.",
  },
  {
    year: "2024",
    title: "AI Infrastructure Era",
    desc: "AKT expanded into full AI infrastructure — GoHighLevel CRM automation, Retell AI voice agents, n8n workflow systems, Claude AI integrations, and custom AI chatbots. 10 partners onboarded across 10 industries.",
  },
  {
    year: "2026",
    title: "6 Continents — Full Stack",
    desc: "AKT now operates across 6 continents delivering complete AI automation stacks: voice agents, outbound engines, business analytics, social media AI, lead scraping, SEO automation, and elite Filipino VAs — all under one agency.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="pt-16">

        {/* ── Hero ── */}
        <section className="py-12 sm:py-20 bg-[#101113] border-b border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left — text */}
              <div>
                <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                  About AKT
                </p>
                <h1
                  className="heading-shimmer font-syne mb-6"
                  style={{ fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  We connect tools.
                  <br />
                  We build AI systems.
                  <br />
                  We make business easier.
                </h1>
                <p className="font-dm text-muted leading-relaxed mb-4" style={{ fontSize: "17px" }}>
                  AKT Virtual Assistance Services is a Philippine-based AI automation agency. We integrate and connect the tools your business already uses — and the tools it needs — into one seamless, efficient workflow. We implement AI as an active part of your workforce: handling calls, qualifying leads, posting content, running analytics, and managing operations 24/7.
                </p>
                <p className="font-dm text-muted leading-relaxed mb-8" style={{ fontSize: "17px" }}>
                  We specialize in <strong className="text-body">GoHighLevel automation</strong>, <strong className="text-body">n8n workflow builds</strong>, <strong className="text-body">Retell AI voice agents</strong>, and custom AI systems — built specifically for your business, not templated.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-dm font-semibold text-white transition-colors"
                    style={{ background: "#0ABFA3" }}
                  >
                    Work With AKT
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-dm font-semibold border border-white/20 text-white transition-colors hover:bg-white/5"
                  >
                    See Our Work
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right — 3D model (hidden on mobile/tablet; only shown with the 2-col layout) */}
              <div className="relative hidden items-center justify-center lg:flex">
                <div
                  className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(10,191,163,0.18) 0%, transparent 70%)" }}
                />
                <Akt3DLogo
                  fitSize={3.5}
                  className="h-[300px] sm:h-[400px] lg:h-[480px] w-full max-w-[600px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-12 bg-black border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="font-syne font-extrabold mb-1"
                    style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "#0ABFA3" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[12px] font-dm text-muted leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission / Vision / Approach ── */}
        <section className="py-20 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              Who We Are
            </p>
            <h2
              className="font-syne text-body mb-12"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              AI integrated into your business — not bolted on.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-card border border-border bg-black p-7">
                <div className="w-10 h-10 rounded-lg bg-[#062B26] flex items-center justify-center mb-5">
                  <Award size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                </div>
                <h3 className="font-syne text-body text-[17px] font-bold mb-3">Mission</h3>
                <p className="text-[14px] font-dm text-muted leading-relaxed">
                  Empower every business with AI that works as a real part of their team — handling the work that scales revenue without scaling headcount. We build systems that make your business run better, faster, and cheaper.
                </p>
              </div>
              <div className="rounded-card border border-border bg-black p-7">
                <div className="w-10 h-10 rounded-lg bg-[#073B34] flex items-center justify-center mb-5">
                  <Globe size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                </div>
                <h3 className="font-syne text-body text-[17px] font-bold mb-3">Vision</h3>
                <p className="text-[14px] font-dm text-muted leading-relaxed">
                  To be the most trusted AI automation agency in the world — the bridge between Philippine expertise, global AI infrastructure, and real measurable business outcomes across every industry we serve.
                </p>
              </div>
              <div className="rounded-card border border-border bg-black p-7">
                <div className="w-10 h-10 rounded-lg bg-[#062B26] flex items-center justify-center mb-5">
                  <TrendingUp size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                </div>
                <h3 className="font-syne text-body text-[17px] font-bold mb-3">Approach</h3>
                <p className="text-[14px] font-dm text-muted leading-relaxed">
                  We don&apos;t sell templates. We audit your operations, design your stack, build every system from scratch, connect all your tools into one pipeline, and maintain everything after launch. Custom-built. Always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How We Work ── */}
        <section className="py-20 bg-black border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              Process
            </p>
            <h2
              className="font-syne text-body mb-12"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              How AKT builds your AI system.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left — process steps */}
              <ProcessSteps />

              {/* Right — founder photo, vertically centered against all steps */}
              <ProcessPhotoCard />
            </div>
          </div>
        </section>

        {/* ── Industries ── */}
        <section className="py-20 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                  Industries
                </p>
                <h2
                  className="font-syne text-body mb-5"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  10 industries. One agency.
                </h2>
                <p className="text-[15px] font-dm text-muted leading-relaxed mb-8">
                  AKT has built and deployed AI automation systems across 10 distinct industries — from financial services and roofing to crypto and automotive. Every engagement is fully custom for that industry&apos;s unique operations.
                </p>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-dm font-semibold text-white"
                  style={{ background: "#0ABFA3" }}
                >
                  View All Partner Work
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {industries.map((ind) => (
                  <div
                    key={ind.name}
                    className="flex items-center justify-between bg-black rounded-card border border-border px-5 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle size={14} style={{ color: "#0ABFA3" }} strokeWidth={2} className="shrink-0" />
                      <span className="text-[14px] font-dm font-medium text-body">{ind.name}</span>
                    </div>
                    <span className="text-[12px] font-dm text-muted shrink-0 ml-4">{ind.partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="py-20 bg-black border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              Tech Stack
            </p>
            <h2
              className="font-syne text-body mb-10"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Tools we build with.
            </h2>
            {/* Mobile + tablet: continuous auto-scrolling carousel (like the homepage partner strip) */}
            <div className="relative overflow-hidden lg:hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
              <div className="marquee-x flex w-max items-center gap-2.5">
                {[...techStack, ...techStack].map((tool, i) => (
                  <span
                    key={i}
                    aria-hidden={i >= techStack.length ? true : undefined}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-gradient-to-b from-[#17191c] to-[#0c0d0f] px-3.5 py-2 text-[13px] font-dm font-semibold text-body shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0ABFA3] shadow-[0_0_6px_rgba(10,191,163,0.85)]" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop: wrapped grid */}
            <div className="hidden flex-wrap gap-2.5 lg:flex">
              {techStack.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-b from-[#17191c] to-[#0c0d0f] px-3.5 py-2 text-[13px] font-dm font-semibold text-body shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-colors hover:border-[#0ABFA3]/50 hover:text-white"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0ABFA3] shadow-[0_0_6px_rgba(10,191,163,0.85)]" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-20 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h2
              className="font-syne text-body mb-14"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Built from the ground up.
            </h2>
            <div className="relative">
              <div
                className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
                style={{ background: "#2C2C2E" }}
              />
              <div className="space-y-10">
                {timeline.map((item) => (
                  <div key={item.year} className="flex gap-8 items-start">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-syne font-bold z-10"
                        style={{ background: "#0ABFA3", color: "white" }}
                      >
                        {item.year.slice(2)}
                      </div>
                    </div>
                    <div className="pt-2 pb-6">
                      <p
                        className="font-syne text-body font-bold text-[17px] mb-1"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {item.year} — {item.title}
                      </p>
                      <p className="text-[14px] font-dm text-muted leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ / AEO ── */}
        <section className="py-20 bg-black border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2
              className="font-syne text-body mb-10"
              style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Common questions about AKT.
            </h2>
            <div className="max-w-3xl space-y-3">
              {[
                {
                  q: "What does AKT specialize in?",
                  a: "AKT specializes in GoHighLevel CRM automation, n8n workflow builds, Retell AI voice agents, custom AI chatbots, and full business process automation. We connect and integrate tools to create seamless, efficient workflows — and we implement AI as an active part of your workforce, not just a software add-on.",
                },
                {
                  q: "Is AKT a GoHighLevel automation specialist?",
                  a: "Yes. AKT has built GoHighLevel CRM systems for 8 of our 10 partner clients across industries including roofing, distribution, real estate, forex, crypto, marketing, and automotive. We configure pipelines, automate follow-up sequences, connect AI agents, and maintain the full GHL stack.",
                },
                {
                  q: "What is the difference between AKT and a regular automation agency?",
                  a: "AKT doesn't just set up software — we implement AI as part of your actual workforce. Our AI agents handle calls, qualify leads, respond to messages, generate content, and run daily operations autonomously. We build tools specifically for your business, integrate every system into one connected pipeline, and maintain everything long-term.",
                },
                {
                  q: "Can AKT replace Zapier with n8n to reduce automation costs?",
                  a: "Yes. AKT migrated KinnoBot from Zapier to self-hosted n8n, cutting automation costs by 70%+ while improving reliability and handling complex logic that Zapier couldn't support. We audit existing workflows, rebuild them in n8n, and handle the full cutover with zero downtime.",
                },
                {
                  q: "What industries has AKT built AI automation systems for?",
                  a: "AKT has deployed AI automation across financial services (MCA/lending), roofing and construction, B2B wholesale distribution, AI automation agencies, real estate, forex education, Web3 and crypto, business acceleration, marketing agencies, and automotive dealerships.",
                },
                {
                  q: "Does AKT provide ongoing maintenance after building a system?",
                  a: "Yes. AKT provides ongoing automation maintenance including n8n workflow monitoring, error detection and resolution, AI prompt optimization, GoHighLevel CRM upkeep, and system expansion. Our October Marketing engagement is an active ongoing maintenance relationship.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-card border border-border bg-[#101113] group"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 gap-4 list-none">
                    <span className="font-syne text-body text-[15px] font-semibold">{faq.q}</span>
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[#0ABFA3] border border-[#0ABFA3]/30 group-open:rotate-45 transition-transform"
                      style={{ fontSize: "18px", lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-[13px] font-dm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section id="founder" className="py-20 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
              Founder
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <h2
                  className="font-syne text-body mb-4"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  Jose Angelo Tapang
                </h2>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-dm font-semibold border mb-6"
                  style={{ background: "#073B34", color: "#0ABFA3", borderColor: "#0ABFA3" }}
                >
                  CEO & Founder, AKT Virtual Assistance Services
                </div>
                <p className="text-[15px] font-dm text-muted leading-relaxed mb-4">
                  Jose Angelo Tapang founded AKT in 2020 with a partnership with Proto Financial — building a Philippine-based call center and Salesforce email automation system that contributed over $6M in client sales over four years.
                </p>
                <p className="text-[15px] font-dm text-muted leading-relaxed mb-4">
                  In 2024, Tapang expanded AKT into full AI infrastructure: GoHighLevel automation, Retell AI voice agents, n8n workflow systems, Claude AI integrations, and custom AI chatbots built from scratch for clients across 10 industries.
                </p>
                <p className="text-[15px] font-dm text-muted leading-relaxed">
                  With a background in civil engineering and IT, Tapang applies systems thinking to every engagement — building operations that scale and integrate, not just solve immediate problems. AKT now operates across 6 continents.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Education", value: "BS Civil Engineering → IT / Technology" },
                  { label: "Founded", value: "AKT Virtual Assistance Services, 2020" },
                  { label: "Early Partner", value: "Proto Financial (2020–2024) — $6M+ contributed" },
                  { label: "Specialization", value: "GoHighLevel, n8n, Retell AI, AI Infrastructure, VA Operations" },
                  { label: "Clients", value: "10 partners across 10 industries" },
                  { label: "Reach", value: "6 continents" },
                  { label: "HQ", value: "Philippines" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 items-start bg-black rounded-card border border-border px-5 py-4"
                  >
                    <span className="text-[11px] font-dm font-semibold text-muted w-28 shrink-0 pt-0.5 uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[14px] font-dm font-medium text-body">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2
              className="font-syne text-body mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Ready to automate your business?
            </h2>
            <p className="font-dm text-muted text-[16px] leading-relaxed mb-8 max-w-xl mx-auto">
              Book a free consultation. We&apos;ll audit your current tools, map your automation gaps, and show you exactly what AKT can build for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white transition-colors"
                style={{ background: "#0ABFA3" }}
              >
                Book a Free Consultation
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold border border-white/20 text-white transition-colors hover:bg-white/5"
              >
                See Partner Results
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
