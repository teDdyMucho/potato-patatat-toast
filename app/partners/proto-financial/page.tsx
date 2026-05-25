import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Proto Financial: MCA Email Automation | AKT",
  description:
    "How AKT built Proto Financial's Salesforce email automation system, reaching 2,000–10,000 recipients daily, boosting productivity 53%, and contributing to $6M+ in merchant cash advance sales. Full case study.",
  keywords: [
    "Salesforce email automation merchant cash advance",
    "MCA lead generation virtual assistant Philippines",
    "outsource merchant cash advance operations Philippines",
    "Salesforce VA financial services email blast",
    "merchant cash advance back office outsourcing",
    "MCA outreach email automation case study",
    "Philippines virtual assistant Salesforce",
    "offshore sales team merchant cash advance",
    "email blast automation small business lending",
    "virtual assistant email operations financial services",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/proto-financial`,
  },
  openGraph: {
    title: "Proto Financial: How AKT Automated MCA Outreach to 10,000 Recipients Daily",
    description:
      "AKT built Proto Financial's Salesforce email engine, scaled a Philippine VA workforce, and helped drive $6M+ in MCA sales. Full breakdown inside.",
    type: "article",
    url: `${SITE_URL}/partners/proto-financial`,
    publishedTime: "2024-01-01T00:00:00Z",
    modifiedTime: "2025-05-22T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proto Financial: Salesforce MCA Email Automation Case Study | AKT",
    description:
      "2,000–10,000 daily email recipients. 53% productivity boost. $6M+ in contributed MCA sales. See how AKT did it.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/proto-financial#article`,
      "headline":
        "How AKT Built Proto Financial's Salesforce MCA Email Engine — 2,000–10,000 Daily Recipients, 53% Productivity Gain",
      "description":
        "AKT Virtual Assistance developed and deployed a Salesforce email blast application for Proto Financial Corp, scaling merchant cash advance outreach to 10,000 recipients per day while boosting team productivity by 53% and contributing to over $6M in client sales.",
      "datePublished": "2024-01-01",
      "dateModified": "2025-05-22",
      "author": {
        "@type": "Organization",
        "name": "AKT Virtual Assistance Services",
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "AKT Virtual Assistance Services",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/image/akt_logo.png`,
        },
      },
      "mainEntityOfPage": `${SITE_URL}/partners/proto-financial`,
      "about": {
        "@type": "Organization",
        "name": "Proto Financial Corp",
        "description":
          "Online lending platform offering merchant cash advances, working capital loans, and equipment financing for small to mid-size businesses. Founded 2014, based in Great Neck, New York.",
        "foundingDate": "2014",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Great Neck",
          "addressRegion": "NY",
          "addressCountry": "US",
        },
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is merchant cash advance email outreach outsourcing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Merchant cash advance (MCA) email outreach outsourcing means delegating your lead prospecting, email blast campaigns, and list management to an external team — typically Philippines-based virtual assistants — who use Salesforce automation to run daily outreach at volume, at 60–70% lower cost than US-based staff.",
          },
        },
        {
          "@type": "Question",
          "name": "Can virtual assistants build and manage Salesforce email automation for MCA companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT's Philippines-based VAs developed and implemented a full Salesforce email blast application for Proto Financial Corp, enabling outreach to 2,000–10,000 recipients per day. VAs handled list segmentation, template management, campaign scheduling, and performance reporting inside Salesforce.",
          },
        },
        {
          "@type": "Question",
          "name": "How much can a Philippines VA team improve MCA outreach productivity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's implementation at Proto Financial Corp improved team productivity by 53% compared to their previous manual outreach process. By automating email delivery via Salesforce and maintaining clean, targeted lists, the team scaled from hundreds to thousands of daily prospects without adding headcount.",
          },
        },
        {
          "@type": "Question",
          "name": "What back-office services did AKT provide for Proto Financial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT established and managed three operational departments for Proto Financial: email operations, back-office support, and administrative services. The team also oversaw payroll administration, legal compliance documentation, and workforce management for the entire Philippines-based operation.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does it take to set up a Salesforce email automation system for MCA outreach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT typically configures and deploys a Salesforce email blast application within 4–8 weeks, including list audits, template builds, automation rules, and VA onboarding. Campaign volume scaling to 2,000–10,000 daily recipients is achievable within the first 90 days with proper list hygiene and deliverability setup.",
          },
        },
        {
          "@type": "Question",
          "name": "What industries does AKT's email automation service work for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's Salesforce email automation and VA operations service is built for high-volume B2B outreach industries including merchant cash advance (MCA), commercial finance, insurance, real estate, and SaaS. Any business needing daily outreach at scale to 1,000+ prospects can replicate the Proto Financial model.",
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
          "name": "Proto Financial Case Study",
          "item": `${SITE_URL}/partners/proto-financial`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built Proto Financial's MCA Email Outreach System",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Salesforce Email Blast Application Development",
          "text":
            "AKT developed a custom Salesforce email blast application configured for high-volume MCA prospecting — enabling Proto Financial to reach 2,000–10,000 recipients per day with automated scheduling, deliverability controls, and CRM-native tracking.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Targeted Email List Management",
          "text":
            "AKT maintained, segmented, and continuously updated Proto Financial's prospect lists — removing invalid contacts, adding fresh leads, and organizing by industry, loan size, and geography to maximize campaign relevance and open rates.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Department Buildout: Email Ops, Back-Office, and Admin",
          "text":
            "AKT established three fully operational departments within Proto Financial's structure: a dedicated email operations team for campaign execution, a back-office team for processing and support, and an admin team for documentation and compliance.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Philippine Workforce Scaling and Compliance",
          "text":
            "AKT recruited, hired, and led a high-performing Philippine workforce sized to Proto Financial's MCA market expansion goals. AKT oversaw payroll administration, legal compliance, and all administrative documentation for the offshore team.",
        },
      ],
    },
  ],
};

const metrics = [
  { value: "53%", label: "Productivity Increase", sub: "vs. pre-automation baseline" },
  { value: "10K+", label: "Daily Email Recipients", sub: "at peak campaign volume" },
  { value: "$6M+", label: "Client Sales Contributed", sub: "across the partnership" },
  { value: "4 Yrs", label: "Partnership Duration", sub: "2020 – 2024" },
];

const deliverables = [
  "Salesforce email blast application — built & deployed",
  "Email list management and targeted segmentation",
  "Email operations department — established & managed",
  "Back-office support department — established & managed",
  "Admin support department — established & managed",
  "Philippine workforce — recruited, trained & led",
  "Payroll administration for Philippine team",
  "Legal compliance and administrative documentation",
  "MCA market share expansion strategy",
  "Performance tracking and campaign reporting",
];

const faqs = [
  {
    q: "What is merchant cash advance email outreach outsourcing?",
    a: "MCA email outreach outsourcing means delegating your lead prospecting, email blast campaigns, and list management to a trained external team. Philippines-based virtual assistants use Salesforce automation to run daily outreach at volume — typically at 60–70% lower cost than US-based staff — while maintaining the quality and targeting precision needed to generate qualified MCA leads.",
  },
  {
    q: "Can virtual assistants build and manage Salesforce email automation for MCA companies?",
    a: "Yes. AKT's VAs developed and implemented a full Salesforce email blast application for Proto Financial Corp, enabling outreach to 2,000–10,000 recipients per day. The team handled list segmentation, template management, campaign scheduling, and performance reporting — all natively inside Salesforce.",
  },
  {
    q: "How much can a Philippines VA team improve MCA outreach productivity?",
    a: "AKT's Salesforce implementation at Proto Financial improved team productivity by 53% compared to their prior manual process. By automating email delivery and maintaining clean, segmented prospect lists, the team scaled from hundreds to thousands of daily outreach contacts without adding US-based headcount.",
  },
  {
    q: "What back-office services did AKT provide alongside email automation?",
    a: "AKT established and managed three operational departments for Proto Financial: email operations, back-office support, and administrative services. Beyond campaign execution, the team handled payroll administration, legal compliance documentation, and full workforce management for the Philippines operation.",
  },
  {
    q: "How long does it take to set up a Salesforce email automation system for MCA outreach?",
    a: "AKT typically configures and deploys a Salesforce email blast application within 4–8 weeks, including list audits, template builds, automation rules, and VA onboarding. Scaling to 2,000–10,000 daily recipients is achievable within the first 90 days with proper list hygiene and deliverability tuning.",
  },
  {
    q: "What industries can replicate the Proto Financial VA automation model?",
    a: "Any high-volume B2B outreach business can replicate this model — including commercial finance, insurance, real estate, SaaS, and debt settlement. If your business needs to prospect 1,000+ leads daily and wants to do it at offshore VA rates rather than US SDR costs, AKT can build the same system.",
  },
];

export default function ProtoFinancialPage() {
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
              <span className="text-white/65">Proto Financial</span>
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
                  Flagship Partner · 2020 – 2024
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  How AKT Automated Proto Financial&apos;s MCA Outreach to{" "}
                  <span style={{ color: "#0ABFA3" }}>10,000 Recipients Daily</span>
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Proto Financial Corp is a Great Neck, New York–based online lending platform founded in 2014, offering merchant cash advances, working capital, and equipment financing up to $1.5M with 4-hour approval. AKT served as their offshore operating layer for four years — building a Salesforce email automation system, scaling a Philippine VA workforce, and establishing three operational departments that contributed to over $6M in client sales.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.protofinancialcorp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    protofinancialcorp.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Financial Services · MCA · New York
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/proto.png"
                    alt="Proto Financial Corp logo — MCA lender Great Neck New York"
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
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-card border border-white/10 bg-[#101113] p-6"
                >
                  <p
                    className="font-syne text-[clamp(28px,3vw,40px)] font-extrabold tracking-tight"
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
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                The Challenge
              </p>
              <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
                High-volume MCA outreach with a lean team and no automation
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Proto Financial needed to prospect thousands of small and mid-size businesses daily to fill their MCA pipeline — but their outreach process was largely manual. Without a scalable email automation system, the team was bottlenecked at a fraction of the volume their market opportunity demanded.
                </p>
                <p>
                  At the same time, building an in-house US team to handle email operations, back-office processing, and administrative functions would have cost multiples of what an offshore model could deliver. Proto Financial needed a partner that could build the system <em>and</em> run it.
                </p>
                <p>
                  The merchant cash advance market is fiercely competitive. Every hour without an optimized outreach operation was market share ceded to better-equipped competitors.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                Before AKT
              </p>
              <div className="space-y-3">
                {[
                  ["Daily email outreach volume", "Limited — manual process"],
                  ["Salesforce automation", "None deployed"],
                  ["Email list management", "Ad hoc, unmaintained"],
                  ["Philippines VA workforce", "Not established"],
                  ["Operational departments", "Not structured"],
                  ["Back-office & admin support", "Handled internally"],
                ].map(([label, before]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-[#101113] px-4 py-3"
                  >
                    <p className="text-[12px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-white/60">{before}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
              The Solution
            </p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              Salesforce email automation, three operational departments, and a Philippine workforce — built from the ground up
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT didn&apos;t just supply staff. We designed, built, and operated Proto Financial&apos;s entire outreach infrastructure over a four-year engagement — giving them a turnkey offshore operation that scaled with their MCA market ambitions.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Salesforce Email Blast Application",
                  body:
                    "AKT developed and implemented a custom Salesforce email blast application purpose-built for high-volume MCA prospecting. The system enabled daily outreach to 2,000–10,000 recipients with automated scheduling, deliverability controls, CRM-native tracking, and campaign reporting — increasing team productivity by 53% over the prior manual process.",
                },
                {
                  step: "02",
                  title: "Targeted Email List Management",
                  body:
                    "AKT maintained, segmented, and continuously refreshed Proto Financial&apos;s prospect lists — scrubbing invalid contacts, sourcing new leads, and organizing by industry, loan size, and geography. Clean, well-segmented lists are the single greatest lever on MCA email campaign ROI, and this discipline drove measurable improvements in open and response rates.",
                },
                {
                  step: "03",
                  title: "Three-Department Operational Buildout",
                  body:
                    "AKT established and managed three distinct departments within Proto Financial&apos;s organizational structure: an email operations team for campaign execution, a back-office team for processing and administrative support, and an admin team for documentation, compliance, and reporting. Each department operated with defined KPIs and management oversight from AKT.",
                },
                {
                  step: "04",
                  title: "Philippine Workforce Scaling & Compliance",
                  body:
                    "AKT recruited, trained, and led a high-performing Philippines-based workforce calibrated to Proto Financial&apos;s demand and MCA market share targets. AKT handled all workforce administration: payroll processing, legal compliance documentation, labor regulation adherence, and HR administration — so Proto Financial&apos;s leadership could focus on growth.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-card border border-white/10 bg-black/30 p-6"
                >
                  <p
                    className="mb-3 font-syne text-[32px] font-extrabold tracking-tight"
                    style={{ color: "#0ABFA3", opacity: 0.3 }}
                  >
                    {item.step}
                  </p>
                  <h3 className="mb-3 font-syne text-[16px] font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-6 text-white/55">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                The Results
              </p>
              <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
                $6M+ in contributed sales. 53% productivity gain. 10,000 daily outreach contacts.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  After AKT&apos;s Salesforce email automation system went live, Proto Financial&apos;s outreach operation scaled from a limited manual process to a machine capable of reaching up to 10,000 MCA prospects per day — without adding US-based headcount.
                </p>
                <p>
                  Team productivity increased 53% compared to the pre-automation baseline. Prospect list quality improved continuously through AKT&apos;s ongoing list hygiene and segmentation practices, compounding the impact of each campaign.
                </p>
                <p>
                  Across the four-year partnership, AKT&apos;s operations — email automation, back-office support, admin management, and Philippine workforce execution — contributed to over $6M in client sales for Proto Financial Corp.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                After AKT
              </p>
              <div className="space-y-3">
                {[
                  ["Daily email outreach volume", "2,000 – 10,000 recipients"],
                  ["Salesforce automation", "Custom email blast app deployed"],
                  ["Productivity improvement", "+53% vs. manual baseline"],
                  ["Philippines VA workforce", "Built & led to scale"],
                  ["Operational departments", "3 established: email, back-office, admin"],
                  ["Client sales contributed", "$6M+ across the partnership"],
                ].map(([label, after]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[#0abfa3]/20 bg-[#062B26]/40 px-4 py-3"
                  >
                    <p className="text-[12px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-[#7fffee]">{after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
              Full Scope of Work
            </p>
            <h2 className="mb-10 font-syne text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-white">
              Everything AKT delivered for Proto Financial
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3">
                  <CheckCircle size={15} className="mt-0.5 shrink-0 text-[#0abfa3]" />
                  <span className="text-[14px] leading-6 text-white/70">{d}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Salesforce Automation",
                "Email Marketing",
                "Team Leadership",
                "Workforce Management",
                "Process Optimization",
                "Back-Office Operations",
                "Payroll Administration",
                "Legal Compliance",
                "High-Volume Outreach",
                "Market Expansion",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/55"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — AEO/GEO optimized */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
              FAQ
            </p>
            <h2 className="mb-12 text-center font-syne text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-white">
              Common questions about MCA email automation and VA outsourcing
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
                    <span className="mt-0.5 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180">
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
                Build Something Similar
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Ready to automate your outreach and scale with a Philippine VA team?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT can build your Salesforce email automation system, establish your operations team, and staff it with trained Philippines-based VAs — just like we did for Proto Financial Corp.
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
