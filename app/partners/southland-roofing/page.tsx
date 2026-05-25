import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Southland Roofing: 3 AI Platforms Built | AKT",
  description:
    "How AKT built three custom AI platforms for Southland Roofing Inc. — a HIPAA-compliant document management system, a Legal AI research platform, and a geo-verified employee time tracking system using n8n, Claude AI, and Supabase.",
  keywords: [
    "AI automation roofing company",
    "n8n Claude AI Supabase integration",
    "HIPAA compliant document management construction",
    "legal AI research platform roofing",
    "geo-verified employee time tracking GPS",
    "Monday.com automation roofing contractor",
    "custom AI platform development contractor",
    "employee attendance selfie GPS geofence",
    "AI document extraction construction company",
    "Supabase Claude AI custom platform agency",
    "roofing company workflow automation n8n",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/southland-roofing`,
  },
  openGraph: {
    title: "Southland Roofing: 3 Custom AI Platforms Built by AKT in One Engagement",
    description:
      "AKT built a HIPAA-compliant document AI, a Legal AI research tool, and a geo-verified attendance system for Southland Roofing Inc. — all powered by Claude AI, n8n, and Supabase.",
    type: "article",
    url: `${SITE_URL}/partners/southland-roofing`,
    publishedTime: "2025-03-01T00:00:00Z",
    modifiedTime: "2025-05-22T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Southland Roofing: 3 AI Platforms Built by AKT | Case Study",
    description:
      "Document AI, Legal AI research, and GPS-verified attendance — AKT delivered all three for a Los Angeles roofing contractor in one engagement.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/southland-roofing#article`,
      "headline":
        "How AKT Built Three Custom AI Platforms for Southland Roofing Inc. — Document Management, Legal AI, and Geo-Verified Attendance",
      "description":
        "AKT served as AI Automation Specialist for Southland Roofing Inc., building three HIPAA-compliant platforms: a document management AI using n8n and Claude, a Legal AI research platform with Supabase vector search, and a geo-verified employee time tracking system with Monday.com integration.",
      "datePublished": "2025-03-01",
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
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/image/akt_logo.png` },
      },
      "mainEntityOfPage": `${SITE_URL}/partners/southland-roofing`,
      "about": {
        "@type": "Organization",
        "name": "Southland Roofing Inc.",
        "url": "https://southlandroofinginc.com",
        "description":
          "Los Angeles-based roofing contractor serving residential and commercial clients across LA and Orange County. Manufacturer-certified across GAF, Carlisle, Tremco, DECRA, and more. License #1042623.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9127 S. Western Ave.",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90047",
          "addressCountry": "US",
        },
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can AI automation be HIPAA-compliant for construction companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT built HIPAA-compliant AI platforms for Southland Roofing Inc. using Supabase for encrypted data storage, role-based access control, and Claude AI via OpenRouter — all configured to meet healthcare-grade data handling standards. HIPAA compliance in construction applies when companies handle employee health data or work with healthcare facilities.",
          },
        },
        {
          "@type": "Question",
          "name": "What is a geo-verified employee attendance system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A geo-verified attendance system requires employees to take a selfie and capture their GPS location when clocking in or out. The system validates their identity and physical location simultaneously, flags geofence violations, tracks breaks, and feeds verified hours into payroll dashboards — eliminating buddy punching and manual timesheets entirely.",
          },
        },
        {
          "@type": "Question",
          "name": "How does a Legal AI research platform work for a non-law firm?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT built Southland Roofing's Legal AI platform using Claude AI for document reading and analysis, and Supabase vector search for semantic retrieval across legal code and contracts. The platform allows their legal department to query legal documents in plain English, get cited answers instantly, and restrict access via role-based permissions — without hiring additional legal staff.",
          },
        },
        {
          "@type": "Question",
          "name": "What is n8n automation and why use it for a roofing company?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "n8n is an open-source workflow automation tool that connects APIs and services without custom code. For Southland Roofing, AKT used n8n to orchestrate document processing, trigger Claude AI analysis, sync data to Supabase, and update Monday.com dashboards automatically — creating a fully automated back office that requires zero manual data entry.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does it take to build a custom AI platform for a contractor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT delivered three distinct AI platforms for Southland Roofing within a single engagement starting March 2025. Timeline varies by complexity, but a single-function AI platform (document management or attendance tracking) can typically be scoped, built, and deployed within 4–8 weeks using AKT's stack of n8n, Claude AI, Supabase, and Monday.com.",
          },
        },
        {
          "@type": "Question",
          "name": "What AI tools did AKT use to build Southland Roofing's platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT used Claude AI (via OpenRouter) for document reading, legal analysis, and natural language Q&A; Supabase for vector search and HIPAA-compliant data storage; n8n for workflow automation and API orchestration; and Monday.com for real-time dashboards and project tracking. All platforms are integrated into a unified operational system.",
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
          "name": "Southland Roofing Case Study",
          "item": `${SITE_URL}/partners/southland-roofing`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Built Three AI Platforms for Southland Roofing Inc.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Document Management AI Platform",
          "text":
            "AKT built a HIPAA-compliant document management platform using n8n workflow automation, Claude AI for document reading and extraction, Supabase for encrypted storage, OpenRouter for model routing, and Monday.com for dashboard visibility.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Legal AI Research Platform (ParaLegal AI)",
          "text":
            "AKT built an exclusive legal research tool for Southland Roofing's legal department — powered by Claude AI for contract reading and analysis, Supabase vector search for semantic retrieval across legal code, and role-based access control to restrict document access to authorized staff only.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Geo-Verified Time Tracking (Star)",
          "text":
            "AKT built a geolocation-verified employee attendance system with selfie clock-in, GPS location stamping, geofence enforcement, break tracking, automatic late detection, shift scheduling, and HIPAA-compliant employee data handling — with live dashboards in Monday.com.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Monday.com Integration & Unified Dashboard",
          "text":
            "AKT connected all three platforms to Monday.com — creating a unified operations dashboard where Southland Roofing's management can view document processing status, legal research activity, and real-time workforce attendance in one place, with automated alerts for exceptions across any system.",
        },
      ],
    },
  ],
};

const platforms = [
  {
    tag: "Platform 01",
    title: "Documentation AI Platform",
    image: null,
    description:
      "A HIPAA-compliant document management system that automates how Southland Roofing captures, processes, stores, and retrieves business documents. Built with n8n for workflow orchestration, Claude AI for document reading and extraction, Supabase for encrypted structured storage, and OpenRouter for flexible model routing — all surfaced through Monday.com dashboards for real-time visibility.",
    features: [
      "Automated document ingestion and processing via n8n workflows",
      "Claude AI reads and extracts key information from any document type",
      "Supabase encrypted storage — HIPAA-compliant data handling",
      "OpenRouter model routing for cost-optimized AI processing",
      "Monday.com dashboard integration for document status and tracking",
      "Role-based access control for sensitive document categories",
    ],
    tools: ["n8n Automation", "Claude AI", "Supabase", "OpenRouter", "Monday.com", "HIPAA"],
  },
  {
    tag: "Platform 02",
    title: "Legal AI Research Platform",
    image: "/southland/legal.png",
    description:
      "An exclusive AI-powered legal research tool built for Southland Roofing's internal legal department. The platform uses Claude AI to read, analyze, and answer questions about legal documents and code — and Supabase vector search for semantic retrieval across large document libraries. Role-based access control ensures only authorized legal staff can query sensitive materials.",
    features: [
      "Claude AI reads and analyzes contracts, agreements, and legal code",
      "Semantic search via Supabase pgvector — find relevant clauses instantly",
      "Plain-English Q&A: 'What are the termination clauses?' answered in seconds",
      "Draft documents and agreements from natural language descriptions",
      "Summarize large case files into key findings and risk highlights",
      "Role-based access — restricted to authorized legal personnel only",
      "Full audit trail of every query and document review session",
    ],
    tools: ["Claude AI", "Supabase Vector Search", "OpenRouter", "Role-Based Access Control"],
  },
  {
    tag: "Platform 03",
    title: "Geo-Verified Time Tracking (Star)",
    image: "/southland/star.png",
    description:
      "A geolocation-verified employee attendance system that eliminates buddy punching, paper timesheets, and manual attendance checks across Southland Roofing's field teams. Every clock-in is verified with a selfie and GPS location stamp. HIPAA-compliant employee data handling throughout, with live dashboards in Monday.com for real-time workforce visibility.",
    features: [
      "Selfie clock-in — verifies identity at every clock-in and clock-out",
      "GPS location stamping — exact location and street address logged per clock-in",
      "Geofence enforcement — flags clock-ins from outside designated work zones",
      "Break tracking — accurate record of actual working hours per shift",
      "Live admin dashboard in Monday.com — real-time workforce status",
      "Shift scheduling — assign shifts so the system knows expected arrival times",
      "Automatic late detection — no manual checking required",
      "Full attendance reports per employee for payroll and compliance",
      "HIPAA-compliant employee data storage and handling",
    ],
    tools: ["GPS Geolocation", "Selfie Verification", "Geofencing", "Monday.com", "HIPAA"],
  },
];

const faqs = [
  {
    q: "Can AI automation be HIPAA-compliant for construction companies?",
    a: "Yes. AKT built HIPAA-compliant AI platforms for Southland Roofing using Supabase for encrypted data storage, role-based access control, and Claude AI via OpenRouter — configured to meet healthcare-grade data handling standards. HIPAA compliance applies to construction companies handling employee health data or working with healthcare facility clients.",
  },
  {
    q: "What is a geo-verified employee attendance system?",
    a: "A geo-verified attendance system requires employees to take a selfie and capture their GPS location when clocking in or out. The system validates identity and physical location simultaneously, flags geofence violations, tracks breaks, and feeds verified hours into payroll dashboards — eliminating buddy punching and manual timesheets entirely.",
  },
  {
    q: "How does a Legal AI research platform work for a non-law firm?",
    a: "AKT built Southland Roofing's Legal AI platform using Claude AI for document reading and analysis, and Supabase vector search for semantic retrieval across legal code and contracts. Their legal department can query documents in plain English, get cited answers instantly, and restrict access via role-based permissions — without additional legal staff.",
  },
  {
    q: "What is n8n and why use it for a roofing company?",
    a: "n8n is an open-source workflow automation tool that connects APIs without custom code. AKT used n8n to orchestrate Southland Roofing's document processing, trigger Claude AI analysis, sync data to Supabase, and update Monday.com dashboards automatically — creating a fully automated back office with zero manual data entry.",
  },
  {
    q: "How long does it take to build a custom AI platform for a contractor?",
    a: "AKT delivered three distinct AI platforms for Southland Roofing within a single engagement. A single-function platform (document management or attendance tracking) can typically be built and deployed within 4–8 weeks using AKT's stack of n8n, Claude AI, Supabase, and Monday.com.",
  },
  {
    q: "What AI tools did AKT use to build Southland Roofing's platforms?",
    a: "Claude AI (via OpenRouter) for document reading and legal analysis; Supabase for vector search and HIPAA-compliant storage; n8n for workflow automation and API orchestration; and Monday.com for real-time dashboards. All three platforms are integrated into a unified operational system.",
  },
];

export default function SouthlandRoofingPage() {
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
              <span className="text-white/65">Southland Roofing Inc.</span>
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
                  AI Automation Specialist · March 2025
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Three Custom AI Platforms Built for{" "}
                  <span style={{ color: "#0ABFA3" }}>Southland Roofing Inc.</span>
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Southland Roofing Inc. is a manufacturer-certified Los Angeles roofing contractor serving residential and commercial clients across LA and Orange County — with certified partnerships across GAF, Carlisle, Tremco, DECRA, WeatherWeld, Garland, and Boral. AKT joined as their AI Automation Specialist in March 2025, designing and deploying three custom platforms that transformed their document management, legal research, and employee attendance operations.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://southlandroofinginc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    southlandroofinginc.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Roofing & Construction · Los Angeles
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/southland/southland.png"
                    alt="Southland Roofing Inc. logo — Los Angeles roofing contractor"
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
              {[
                { value: "3", label: "AI Platforms Built", sub: "In one engagement" },
                { value: "HIPAA", label: "Compliance Standard", sub: "All three platforms" },
                { value: "0", label: "Manual Data Entry", sub: "Fully automated workflows" },
                { value: "Real-Time", label: "Workforce Visibility", sub: "Via Monday.com dashboards" },
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
                Three operational gaps — documents, legal research, and field attendance — all unresolved
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Southland Roofing operates across Los Angeles and Orange County — managing residential installations, commercial roofing for hotels, hospitals, and government buildings, and a legal department handling contractor agreements, compliance documents, and liability records. Each of these areas was running on manual processes.
                </p>
                <p>
                  Documents were tracked inconsistently. Their legal team had no fast way to search legal code or review contracts without reading every page. And attendance across field crews — spread across multiple job sites — relied on paper timesheets that couldn&apos;t be verified, were easy to falsify, and created payroll errors downstream.
                </p>
                <p>
                  They needed a single partner who could build across all three problems — with HIPAA-grade compliance, AI-native tooling, and integration into the Monday.com workflows their team already used.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Document management", "Manual — inconsistent, no automation"],
                  ["Legal research", "Manual reading — hours per document"],
                  ["Contract Q&A", "No AI tooling — staff dependent"],
                  ["Field attendance", "Paper timesheets — unverifiable"],
                  ["Clock-in verification", "None — buddy punching possible"],
                  ["Payroll accuracy", "Estimated, not verified"],
                  ["HIPAA compliance", "Not systemized across operations"],
                ].map(([label, before]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-[#101113] px-4 py-3">
                    <p className="text-[12px] text-white/40">{label}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-white/60">{before}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Three Platforms */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">The Solution</p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              Three platforms. One engagement. All HIPAA-compliant.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT designed, built, and deployed three fully integrated AI platforms for Southland Roofing — each solving a distinct operational problem, all using the same core stack of n8n, Claude AI, Supabase, and Monday.com.
            </p>

            <div className="mt-14 space-y-14">
              {platforms.map((platform, i) => {
                const isWideImage = i === 2; // Platform 03 — landscape screenshot
                return (
                  <div
                    key={platform.tag}
                    className="rounded-card border border-white/10 bg-black/30 overflow-hidden"
                  >
                    {isWideImage ? (
                      /* Vertical layout: content top, image full-width bottom */
                      <div className="flex flex-col">
                        <div className="p-8 lg:p-10">
                          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                            {platform.tag}
                          </span>
                          <h3 className="font-syne text-[clamp(20px,2vw,26px)] font-bold tracking-tight text-white">
                            {platform.title}
                          </h3>
                          <p className="mt-4 text-[14px] leading-7 text-white/62">{platform.description}</p>
                          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {platform.features.map((f) => (
                              <div key={f} className="flex items-start gap-3">
                                <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#0abfa3]" />
                                <span className="text-[13px] leading-6 text-white/65">{f}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {platform.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        {platform.image && (
                          <div className="border-t border-white/10 bg-[#0d0d0f] p-8">
                            <Image
                              src={platform.image}
                              alt={`${platform.title} — built by AKT for Southland Roofing`}
                              width={1400}
                              height={700}
                              className="w-full h-auto object-contain opacity-95 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Side-by-side layout for portrait/square images */
                      <div className={`flex flex-col gap-0 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                        <div className="flex-1 p-8 lg:p-10">
                          <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">
                            {platform.tag}
                          </span>
                          <h3 className="font-syne text-[clamp(20px,2vw,26px)] font-bold tracking-tight text-white">
                            {platform.title}
                          </h3>
                          <p className="mt-4 text-[14px] leading-7 text-white/62">{platform.description}</p>
                          <ul className="mt-6 space-y-2">
                            {platform.features.map((f) => (
                              <li key={f} className="flex items-start gap-3">
                                <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#0abfa3]" />
                                <span className="text-[13px] leading-6 text-white/65">{f}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {platform.tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        {platform.image && (
                          <div className="flex items-center justify-center border-t border-white/10 bg-[#0d0d0f] p-8 lg:w-[420px] lg:border-l lg:border-t-0 lg:p-10">
                            <Image
                              src={platform.image}
                              alt={`${platform.title} — built by AKT for Southland Roofing`}
                              width={800}
                              height={600}
                              className="w-full h-auto object-contain opacity-95 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">The Results</p>
              <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
                A fully AI-powered back office — verified, automated, and compliant
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Southland Roofing now operates with three production AI systems handling functions that previously required manual effort, guesswork, or error-prone paper processes. Every document is automatically ingested and searchable. Every legal question gets an AI-powered answer in seconds. Every employee clock-in is verified with a selfie and GPS stamp.
                </p>
                <p>
                  Their legal department can query contracts and legal code in plain English without reading every page. Their operations managers see real-time workforce status across all job sites in Monday.com without making a single phone call. Payroll is calculated from tamper-proof, geolocation-verified data.
                </p>
                <p>
                  All three platforms meet HIPAA compliance standards — critical for a contractor that serves medical facilities, government buildings, and handles sensitive employee health data.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Document management", "Automated — n8n + Claude AI pipeline"],
                  ["Legal research", "AI-powered — Claude reads and answers instantly"],
                  ["Contract Q&A", "Plain English queries via ParaLegal AI"],
                  ["Field attendance", "Selfie + GPS — tamper-proof verification"],
                  ["Clock-in verification", "Identity + geolocation confirmed every time"],
                  ["Payroll accuracy", "Verified, GPS-stamped hour data"],
                  ["HIPAA compliance", "Enforced across all three platforms"],
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
              Tools and systems behind all three platforms
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "n8n Automation", desc: "Workflow orchestration" },
                { name: "Claude AI", desc: "Document reading & analysis" },
                { name: "OpenRouter", desc: "AI model routing" },
                { name: "Supabase", desc: "Vector search & storage" },
                { name: "Monday.com", desc: "Dashboards & scheduling" },
                { name: "HIPAA Compliance", desc: "Data handling standard" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-card border border-white/10 bg-black/30 p-5 text-center"
                >
                  <p className="font-syne text-[14px] font-bold text-white">{tool.name}</p>
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
              Common questions about AI automation for contractors
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
                Build Something Similar
              </p>
              <h2 className="font-syne text-[clamp(22px,3vw,34px)] font-bold tracking-tight text-white">
                Need AI automation for your business operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds custom AI platforms using n8n, Claude, Supabase, and Monday.com — HIPAA-compliant, integrated with your existing workflows, and shipped fast. Let&apos;s scope yours.
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
