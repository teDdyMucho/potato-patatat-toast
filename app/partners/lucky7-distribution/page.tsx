import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";

const SITE_URL = "https://aktservices.com";

export const metadata: Metadata = {
  title: "Lucky 7 Distribution: B2B AI Automation | AKT",
  description:
    "How AKT automated Lucky 7 Distribution's B2B dealer onboarding with AI document verification (OpenAI + Claude), GoHighLevel nurturing, WooCommerce auto-account creation, and daily AI-generated SEO blog content for the wholesale vape and smoke industry.",
  keywords: [
    "AI wholesale account verification automation",
    "automated wholesale dealer registration form",
    "n8n React wholesale onboarding system",
    "GoHighLevel wholesale distributor CRM",
    "WooCommerce B2B wholesale auto account creation",
    "AI document verification wholesale license",
    "wholesale vape distributor Miami automation",
    "daily AI SEO blog generation wholesale",
    "smoke shop wholesale distributor automation",
    "OpenAI Claude document analysis B2B",
  ],
  alternates: {
    canonical: `${SITE_URL}/partners/lucky7-distribution`,
  },
  openGraph: {
    title: "Lucky 7 Distribution: Full B2B Wholesale Onboarding Automated by AKT",
    description:
      "AKT built Lucky 7's AI-powered dealer registration, document verification, GHL nurturing, WooCommerce auto-provisioning, and daily SEO blog pipeline — turning manual onboarding into a fully automated dealer acquisition engine.",
    type: "article",
    url: `${SITE_URL}/partners/lucky7-distribution`,
    publishedTime: "2025-01-01T00:00:00Z",
    modifiedTime: "2025-05-26T00:00:00Z",
    siteName: "AKT Virtual Assistance Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky 7 Distribution: AI Wholesale Onboarding Automation | AKT Case Study",
    description:
      "From document upload to verified WooCommerce account — Lucky 7's dealer onboarding is now fully automated with AI. Built by AKT.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}/partners/lucky7-distribution#article`,
      "headline":
        "How AKT Automated Lucky 7 Distribution's Wholesale Dealer Onboarding with AI Document Verification, GoHighLevel, and WooCommerce",
      "description":
        "AKT built a complete B2B wholesale dealer acquisition system for Lucky 7 Distribution — an n8n-powered React registration form, AI document verification via OpenAI and Claude, GoHighLevel CRM lead capture and nurturing sequences, automated WooCommerce account creation, and a daily AI-generated SEO blog pipeline targeting the wholesale vape and smoke distributor market.",
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
      "mainEntityOfPage": `${SITE_URL}/partners/lucky7-distribution`,
      "about": {
        "@type": "Organization",
        "name": "Lucky 7 Distribution",
        "url": "https://lucky7distribution.com",
        "description":
          "B2B wholesale distributor based in Miami Gardens, Florida specializing in vape, smoke, hemp/CBD/THC, beverages, food, and convenience store products. Serves licensed retailers including smoke shops, vape shops, and convenience stores across the United States.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "5150 NW 165th St",
          "addressLocality": "Miami Gardens",
          "addressRegion": "FL",
          "postalCode": "33014",
          "addressCountry": "US",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-305-749-6729",
          "email": "info@lucky7distribution.com",
        },
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does AI document verification work for wholesale dealer registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's system uses OpenAI and Claude AI to analyze uploaded business documents — including Tobacco Licenses, IRS EIN Assignment Letters, Resale Tax Certificates, and Hemp Food Licenses — and verify their validity in real time. The AI checks document authenticity, expiration dates, and data consistency, then automatically approves or flags the application without requiring manual staff review.",
          },
        },
        {
          "@type": "Question",
          "name": "Can GoHighLevel be used for wholesale dealer nurturing sequences?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT built a complete GoHighLevel CRM pipeline for Lucky 7 Distribution that captures wholesale dealer registration leads, segments them by approval status, and runs automated email and SMS nurturing sequences through the registration and onboarding process — from initial signup confirmation through first order placement.",
          },
        },
        {
          "@type": "Question",
          "name": "How does automatic WooCommerce account creation work for wholesale distributors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT's n8n automation workflow listens for approved registrations from the AI verification step, then automatically creates a verified WooCommerce wholesale account with the correct pricing tier, access permissions, and account details — without any manual admin action. The dealer receives login credentials immediately after document approval.",
          },
        },
        {
          "@type": "Question",
          "name": "What documents do wholesale distributors need to verify for dealer accounts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "For a vape and smoke wholesale distributor like Lucky 7, required dealer documents typically include: a valid Tobacco License, IRS EIN Assignment Letter, Resale Tax Certificate (or Seller's Permit), and a Hemp Food License where required by state law. AKT's AI verification system validates all four document types automatically.",
          },
        },
        {
          "@type": "Question",
          "name": "How does daily AI blog generation improve SEO for a wholesale distributor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AKT built a daily AI content pipeline that generates SEO and GEO/AEO-optimized blog posts for Lucky 7 Distribution targeting high-intent wholesale keywords — such as 'wholesale disposable vapes', 'Geek Bar wholesale distributor', and 'how to open a smoke shop wholesale account.' Daily publishing builds topical authority, increases indexed pages, and compounds organic search visibility over time.",
          },
        },
        {
          "@type": "Question",
          "name": "Can n8n connect a registration form to GoHighLevel and WooCommerce simultaneously?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. AKT's n8n workflow orchestrates the entire Lucky 7 dealer registration pipeline: receiving form submissions, routing documents to OpenAI and Claude for verification, creating the lead in GoHighLevel and triggering the nurturing sequence, and provisioning the WooCommerce account — all from a single automated workflow with no manual intervention.",
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
          "name": "Lucky 7 Distribution Case Study",
          "item": `${SITE_URL}/partners/lucky7-distribution`,
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How AKT Automated Lucky 7 Distribution's Wholesale Dealer Onboarding",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Dynamic Registration Form — React + n8n",
          "text":
            "AKT built a dynamic React registration form connected to n8n workflows, allowing wholesale dealers to submit business details and upload required license documents directly through Lucky 7's portal.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "AI Document Verification — OpenAI + Claude",
          "text":
            "Uploaded documents are automatically analyzed by OpenAI and Claude AI, which verify document validity, check for expiration dates, confirm business identity, and return an approval or flag decision — with no manual staff review required.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "GoHighLevel CRM — Lead Capture + Nurturing Sequences",
          "text":
            "Every registration is captured as a lead in GoHighLevel CRM and enrolled in an automated nurturing sequence that guides dealers through the approval process, confirms account setup, and onboards them to their first order.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "WooCommerce Auto-Account Creation",
          "text":
            "Upon document approval, n8n automatically creates a verified WooCommerce wholesale dealer account with correct pricing tier access, sending the dealer their login credentials immediately — no admin action needed.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Daily AI SEO Blog Generation",
          "text":
            "AKT built an AI content pipeline that generates and publishes daily SEO and GEO/AEO-optimized blog posts for Lucky 7 targeting wholesale vape, smoke, hemp, and convenience store distributor keywords — compounding organic search visibility over time.",
        },
      ],
    },
  ],
};

const systems = [
  {
    number: "01",
    title: "Dynamic Dealer Registration Form",
    subtitle: "React + n8n",
    description:
      "AKT designed and built a multi-step dynamic registration form in React, orchestrated by n8n workflows on the backend. Prospective wholesale dealers — smoke shops, vape shops, gas stations, and convenience stores — submit their business details and upload all required licensing documents directly through Lucky 7's portal. The form validates input in real time, handles file uploads, and hands off to the AI verification pipeline instantly upon submission.",
    features: [
      "Multi-step React form with real-time field validation",
      "Document upload handling — Tobacco License, EIN Letter, Resale Certificate, Hemp License",
      "n8n workflow triggered on every new submission",
      "Conditional logic — form adapts based on business type and state",
      "Mobile-responsive — works on any device",
      "Submission confirmation and status updates via email",
    ],
    tools: ["React", "n8n", "Form Validation", "File Upload Handling"],
  },
  {
    number: "02",
    title: "AI Document Verification Engine",
    subtitle: "OpenAI + Claude AI",
    description:
      "Every document uploaded by a dealer applicant is routed to a dual-AI verification engine built by AKT. OpenAI analyzes document structure and extracts key fields. Claude AI cross-references the extracted data against expected formats, checks for expiration dates, validates business identity, and flags inconsistencies. The system returns an approval decision — valid, invalid, or needs review — in real time, eliminating the need for staff to manually inspect every license submission.",
    features: [
      "OpenAI GPT-4 Vision — reads and extracts data from uploaded documents",
      "Claude AI — validates document authenticity and business identity",
      "Automatic expiration date detection and flagging",
      "Cross-reference check between document fields and registration data",
      "Approval/rejection decision returned in seconds",
      "Human escalation pathway for edge cases",
      "Audit trail of every verification decision",
    ],
    tools: ["OpenAI GPT-4", "Claude AI", "Document OCR", "n8n Orchestration"],
  },
  {
    number: "03",
    title: "GoHighLevel CRM + Nurturing Sequences",
    subtitle: "Lead Capture → Onboarding",
    description:
      "Every dealer registration is captured as a lead in GoHighLevel CRM the moment the form is submitted — before document verification even completes. AKT built segmented pipelines for pending, approved, and flagged applicants, with automated email and SMS nurturing sequences that guide dealers through every stage: submission confirmation, document review status, approval notification, account setup, and first-order encouragement. No dealer falls through the cracks.",
    features: [
      "Automatic GHL lead creation on every registration submission",
      "Pipeline stages: Submitted → Under Review → Approved → Onboarded",
      "Automated email sequences for each stage transition",
      "SMS notifications for approval and account activation",
      "Onboarding sequence — first login, browse catalog, place first order",
      "Re-engagement sequence for dealers who registered but haven't ordered",
      "Full CRM record with submitted documents and verification status",
    ],
    tools: ["GoHighLevel CRM", "Email Automation", "SMS Sequences", "Pipeline Management"],
  },
  {
    number: "04",
    title: "WooCommerce Auto-Account Provisioning",
    subtitle: "Instant Access on Approval",
    description:
      "The moment a dealer's documents are verified and approved, AKT's n8n automation creates their WooCommerce wholesale account automatically — no admin action, no delay. The account is provisioned with the correct wholesale pricing tier, product access permissions, and account metadata from their registration. Login credentials are emailed to the dealer immediately. What previously required manual admin work now happens in seconds.",
    features: [
      "Automatic WooCommerce account creation on AI approval",
      "Correct wholesale pricing tier assigned based on business type",
      "Account metadata populated from registration form data",
      "Login credentials delivered via automated email instantly",
      "Role-based access — wholesale pricing gated behind verified login",
      "Sync with GHL CRM — account status updated in pipeline automatically",
    ],
    tools: ["WooCommerce", "n8n API Integration", "Role-Based Access", "GoHighLevel Sync"],
  },
  {
    number: "05",
    title: "Daily AI SEO Blog Generation",
    subtitle: "Compound Organic Growth",
    description:
      "AKT built an automated content pipeline that generates and publishes SEO and GEO/AEO-optimized blog posts for Lucky 7 Distribution every day — targeting the highest-value keywords in the wholesale vape, smoke, hemp, and convenience store distributor market. Each post is structured for featured snippet capture, People Also Ask dominance, and AI engine citability (Google AI Overviews, ChatGPT, Perplexity). Daily publishing compounds topical authority and indexed page count over time — building a search moat competitors can't close.",
    features: [
      "Daily AI-generated posts targeting: 'wholesale disposable vapes', 'smoke shop wholesale supplier', 'Geek Bar wholesale', 'vape distributor Florida' and 200+ more",
      "Structured for featured snippets — BLUF paragraphs, FAQ sections, comparison tables",
      "GEO/AEO-optimized — citable by ChatGPT, Perplexity, Google AI Overviews",
      "FAQ schema (JSON-LD) embedded in every post",
      "Internal linking strategy — each post links to relevant product categories",
      "Brand-consistent tone — human-reviewed before publish",
      "Monthly keyword refresh — content strategy adapts to search trend data",
    ],
    tools: ["Claude AI", "OpenAI", "SEO Automation", "JSON-LD Schema", "Content Pipeline"],
  },
];

const faqs = [
  {
    q: "How does AI document verification work for wholesale dealer registration?",
    a: "AKT's system uses OpenAI and Claude AI to analyze uploaded business documents — Tobacco Licenses, IRS EIN Letters, Resale Tax Certificates, and Hemp Food Licenses — and verify their validity in real time. The AI checks document authenticity, expiration dates, and data consistency, then automatically approves or flags the application without requiring manual staff review.",
  },
  {
    q: "Can GoHighLevel handle wholesale dealer nurturing sequences?",
    a: "Yes. AKT built a complete GoHighLevel CRM pipeline for Lucky 7 that captures wholesale dealer registrations, segments them by approval status, and runs automated email and SMS nurturing sequences through the full registration and onboarding process — from signup confirmation through first order placement.",
  },
  {
    q: "How does automatic WooCommerce account creation work?",
    a: "AKT's n8n automation listens for approved registrations from the AI verification step, then automatically creates a verified WooCommerce wholesale account with the correct pricing tier and access permissions. The dealer receives login credentials immediately after document approval — no manual admin action required.",
  },
  {
    q: "What documents do smoke shop wholesale distributors need to verify?",
    a: "For a vape and smoke wholesale distributor like Lucky 7, required dealer documents include: a valid Tobacco License, IRS EIN Assignment Letter, Resale Tax Certificate (Seller's Permit), and a Hemp Food License where required by state. AKT's AI verification system validates all four document types automatically.",
  },
  {
    q: "How does daily AI blog generation improve SEO for a wholesale distributor?",
    a: "AKT's daily content pipeline generates SEO and GEO/AEO-optimized blog posts targeting high-intent wholesale keywords — such as 'wholesale disposable vapes', 'Geek Bar wholesale distributor', and 'how to open a smoke shop wholesale account'. Daily publishing builds topical authority, increases indexed pages, and compounds organic search visibility month over month.",
  },
  {
    q: "Can n8n connect a registration form to GoHighLevel and WooCommerce simultaneously?",
    a: "Yes. AKT's n8n workflow orchestrates the full Lucky 7 dealer pipeline: receiving form submissions, routing documents to OpenAI and Claude for verification, creating the lead in GoHighLevel and triggering the nurturing sequence, and provisioning the WooCommerce account — all from one automated flow with zero manual intervention.",
  },
];

export default function Lucky7Page() {
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
              <span className="text-white/65">Lucky 7 Distribution</span>
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
                  AI Automation & SEO · 2025
                </span>
                <h1 className="font-syne text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white">
                  Full B2B Wholesale Onboarding Automated for{" "}
                  <span style={{ color: "#0ABFA3" }}>Lucky 7 Distribution</span>
                </h1>
                <p className="mt-6 text-[16px] leading-8 text-white/62">
                  Lucky 7 Distribution is a Miami-based B2B wholesale distributor supplying smoke shops, vape shops, gas stations, and convenience stores across the United States with vape products, hemp/CBD, beverages, snacks, and more — carrying brands including HQD, Geek Bar, Lost Mary, Zyn, Raw, and Backwoods. AKT built their complete dealer acquisition and onboarding infrastructure: an AI-verified registration system, GoHighLevel nurturing, automated WooCommerce provisioning, and a daily SEO content engine.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://lucky7distribution.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
                  >
                    lucky7distribution.com
                    <ArrowUpRight size={12} />
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/40">
                    Miami Gardens, FL
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 lg:w-[220px]">
                  <Image
                    src="/image/Lucky7.png"
                    alt="Lucky 7 Distribution logo — B2B wholesale vape smoke distributor Miami Florida"
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
                { value: "5", label: "Systems Built", sub: "End-to-end automation" },
                { value: "AI", label: "Doc Verification", sub: "OpenAI + Claude" },
                { value: "0", label: "Manual Steps", sub: "From form to WooCommerce" },
                { value: "Daily", label: "SEO Blog Output", sub: "AI-generated & published" },
                { value: "GHL", label: "CRM Nurturing", sub: "Full sequence automated" },
              ].map((m) => (
                <div key={m.label} className="rounded-card border border-white/10 bg-[#101113] p-6">
                  <p
                    className="font-syne text-[clamp(22px,2.5vw,34px)] font-extrabold tracking-tight"
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
                Manual dealer onboarding, unverified documents, no SEO presence — in a fiercely competitive wholesale market
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Lucky 7 Distribution operates in one of the most competitive wholesale distribution markets in the country — vape, smoke, and hemp — where dozens of Florida-based distributors compete for the same licensed retail dealer accounts. Every hour a new dealer application sat waiting for manual review was a potential customer won by a competitor.
                </p>
                <p>
                  Their dealer registration process required staff to manually inspect uploaded Tobacco Licenses, IRS EIN Letters, Resale Certificates, and Hemp Food Licenses — a time-intensive, error-prone process that couldn&apos;t scale with their growth ambitions. Unapproved leads had no structured follow-up, and there was no automated path from &quot;approved&quot; to &quot;active WooCommerce account.&quot;
                </p>
                <p>
                  On the marketing side, Lucky 7 had minimal organic search presence. Competitors with more indexed content and better keyword targeting were capturing the dealer acquisition traffic they needed. They had no system for consistent SEO content production.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Before AKT</p>
              <div className="space-y-3">
                {[
                  ["Dealer registration", "Manual form — no automation"],
                  ["Document verification", "Staff-reviewed — slow and inconsistent"],
                  ["Lead capture & follow-up", "No CRM — leads lost after submission"],
                  ["Dealer nurturing", "No email or SMS sequences"],
                  ["WooCommerce account setup", "Manual admin — delayed access"],
                  ["SEO content", "No consistent publishing — minimal organic traffic"],
                  ["Dealer onboarding time", "Days — bottlenecked on staff availability"],
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

        {/* Five Systems */}
        <section className="border-b border-white/10 bg-[#101113] py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fffee]">What AKT Built</p>
            <h2 className="font-syne text-[clamp(22px,2.5vw,30px)] font-bold tracking-tight text-white">
              Five interconnected systems. One fully automated dealer acquisition engine.
            </h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-white/62">
              AKT designed and deployed every layer of Lucky 7&apos;s dealer onboarding and growth infrastructure — from the first form field a dealer fills out to the daily blog post that ranks their brand on Google.
            </p>

            <div className="mt-14 space-y-8">
              {systems.map((system) => (
                <div
                  key={system.number}
                  className="rounded-card border border-white/10 bg-black/30 p-8 lg:p-10"
                >
                  <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                    <div className="shrink-0 lg:w-[60px]">
                      <p
                        className="font-syne text-[48px] font-extrabold leading-none tracking-tight"
                        style={{ color: "#0ABFA3", opacity: 0.25 }}
                      >
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
                          <span
                            key={t}
                            className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50"
                          >
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
                From days to seconds — fully automated dealer acquisition with compounding SEO growth
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-white/62">
                <p>
                  Lucky 7 Distribution now runs a fully automated dealer acquisition pipeline. A new smoke shop or vape shop owner discovers Lucky 7, fills out the dynamic registration form, uploads their licenses, and receives an AI verification decision in seconds — not days. If approved, their WooCommerce wholesale account is created automatically and their login credentials arrive in their inbox before they&apos;ve closed the tab.
                </p>
                <p>
                  Every applicant — approved, pending, or flagged — is captured in GoHighLevel CRM and enrolled in the appropriate nurturing sequence. No lead goes cold. No approval falls through. The onboarding sequence walks new dealers through their first login, product browsing, and first order placement without any staff touchpoint.
                </p>
                <p>
                  The daily AI blog pipeline compounds Lucky 7&apos;s organic search presence week by week — targeting the exact keywords that dealer prospects search when looking for a new wholesale vape and smoke distributor. Every post is structured for featured snippets, GEO/AEO citability, and internal linking to product categories — building a search moat competitors can&apos;t replicate without the same infrastructure.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">After AKT</p>
              <div className="space-y-3">
                {[
                  ["Dealer registration", "Dynamic AI-powered form — React + n8n"],
                  ["Document verification", "OpenAI + Claude — seconds, not days"],
                  ["Lead capture", "Every applicant in GHL CRM automatically"],
                  ["Dealer nurturing", "Full email + SMS sequences per pipeline stage"],
                  ["WooCommerce access", "Auto-provisioned on AI approval"],
                  ["SEO content", "Daily AI-generated posts — compound growth"],
                  ["Dealer onboarding time", "Seconds — fully automated end-to-end"],
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
              Every tool in the system
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {[
                { name: "React", desc: "Registration form" },
                { name: "n8n", desc: "Workflow automation" },
                { name: "OpenAI GPT-4", desc: "Document OCR & analysis" },
                { name: "Claude AI", desc: "Document validation" },
                { name: "GoHighLevel", desc: "CRM & nurturing" },
                { name: "WooCommerce", desc: "Wholesale portal" },
                { name: "AI SEO Pipeline", desc: "Daily blog content" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-card border border-white/10 bg-black/30 p-5 text-center"
                >
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
              Questions about AI-powered wholesale dealer onboarding
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
                Ready to automate your wholesale dealer onboarding?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/62">
                AKT builds complete B2B onboarding systems — AI document verification, CRM nurturing, WooCommerce provisioning, and daily SEO content — tailored to your wholesale distribution business.
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
