import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | GoHighLevel, AI Automation & VA Services — AKT",
  description:
    "AKT offers GoHighLevel CRM setup, n8n workflow automation, Retell AI voice agents, custom AI chatbots, and elite Filipino virtual assistants for businesses in the US, Canada, UK, and Australia.",
  keywords: [
    "GoHighLevel setup service",
    "n8n automation agency",
    "Retell AI voice agent service",
    "AI automation services",
    "Filipino virtual assistant agency",
    "GHL CRM management",
    "AI chatbot development",
    "workflow automation agency US",
    "VA services Philippines",
    "business automation consultant",
    "AI automation agency United States",
    "GoHighLevel agency Canada",
    "AI automation UK",
    "automation agency Australia",
  ],
  openGraph: {
    title: "Services | GoHighLevel, AI Automation & VA Services — AKT",
    description:
      "GoHighLevel, n8n, Retell AI, voice agents, chatbots, and elite Filipino VAs for US, Canadian, UK & Australian businesses. One agency for your full AI automation stack.",
    url: "https://aktservices.org/services",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
    images: [
      {
        url: "https://aktservices.org/image/akt_og.png",
        width: 1200,
        height: 630,
        alt: "AKT AI Automation Services — GoHighLevel, n8n, Retell AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | AKT — GoHighLevel & AI Automation Agency",
    description:
      "GoHighLevel setup, n8n workflows, Retell AI voice agents, and Filipino VAs for US, Canada, UK & Australia.",
    images: ["https://aktservices.org/image/akt_og.png"],
  },
  alternates: { canonical: "https://aktservices.org/services" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://aktservices.org/services#service",
      name: "AKT AI Automation & Virtual Assistant Services",
      provider: { "@id": "https://aktservices.org/#organization" },
      description:
        "GoHighLevel CRM setup and automation, n8n workflow builds, Retell AI voice agent development, custom AI chatbots, and elite Filipino virtual assistant services for businesses in the United States, Canada, United Kingdom, and Australia.",
      areaServed: [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "Netherlands" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AKT Service Catalog",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "GoHighLevel CRM Automation",
              description: "Full GHL setup — pipelines, AI agents, follow-up sequences, sub-account management, and ongoing CRM maintenance. Built for 8 of our 10 partner clients.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "n8n Workflow Automation",
              description: "Self-hosted n8n replacing Zapier — complex multi-step workflows, API connections, conditional logic. 70%+ cost cut vs. Zapier.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Retell AI Voice Agents",
              description: "24/7 AI voice agents for inbound and outbound calls. Sub-600ms response, appointment booking, hot-buyer escalation, 31+ language support.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom AI Chatbots",
              description: "Website chat and SMS AI agents built from scratch — trained on your scripts and FAQs.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Filipino Virtual Assistant Services",
              description: "Vetted, managed Philippine-based VAs for email operations, back-office, admin, and sales support. AKT ran a full VA department contributing $6M+ for Proto Financial.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Infrastructure Buildouts",
              description: "Full-stack AI system design, build, and integration — connecting GoHighLevel, n8n, Retell AI, and custom AI into one seamless pipeline.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Outbound Email & Lead Scraping",
              description: "AI-qualified lead scraping, personalized email generation, multi-touch sequences, and behavioral triggers. Self-filling pipeline, fully automated.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Analytics Dashboards",
              description: "Custom dashboards showing subscriptions, revenue, profit margins, and pipeline health — updated in real time via automated n8n data pulls.",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aktservices.org" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://aktservices.org/services" },
      ],
    },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
