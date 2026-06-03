import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

// Space Grotesk is the display/heading font. Exposed as --font-space-grotesk; the
// Tailwind `font-syne` utility is aliased to this variable for backwards compatibility.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AKT | AI Automation Agency & Filipino Virtual Assistants",
  description:
    "AKT Virtual Assistance Services — elite Filipino virtual assistants, GoHighLevel CRM automation, n8n workflows, and Retell AI voice agents for businesses in the US, Canada, UK, and Australia. Founded 2020.",
  keywords:
    "virtual assistant services, AI automation agency, Filipino VA, GoHighLevel setup, n8n automation, Retell AI, VAPI, CloseBot, Claude AI automation, US AI automation agency, Canada automation agency",
  alternates: {
    canonical: "https://aktservices.org",
  },
  openGraph: {
    title: "AKT | AI Automation Agency & Filipino Virtual Assistants",
    description:
      "Elite Filipino VAs + AI automation for US, Canadian, UK, and Australian SMBs. GoHighLevel, n8n, Retell AI, VAPI, Claude AI. Book a free consultation.",
    url: "https://aktservices.org",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
    images: [
      {
        url: "https://aktservices.org/image/akt_og.png",
        width: 1200,
        height: 630,
        alt: "AKT Virtual Assistance Services — AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT | AI Automation Agency & Filipino Virtual Assistants",
    description:
      "Elite Filipino VAs + AI automation for US, Canadian, UK & Australian SMBs.",
    images: ["https://aktservices.org/image/akt_og.png"],
  },
  metadataBase: new URL("https://aktservices.org"),
};

// Canonical Organization + WebSite schema — server-rendered on every page.
// Authoritative single source of truth for AI crawlers (GPTBot, ClaudeBot, PerplexityBot).
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://aktservices.org/#organization",
      name: "AKT Virtual Assistance Services",
      url: "https://aktservices.org",
      logo: {
        "@type": "ImageObject",
        url: "https://aktservices.org/image/akt_logo.png",
        width: 421,
        height: 377,
      },
      image: "https://aktservices.org/image/akt_og.png",
      foundingDate: "2020",
      email: "admin@aktservices.org",
      description:
        "Philippine-based AI automation agency specializing in GoHighLevel CRM automation, n8n workflow builds, Retell AI voice agents, custom AI chatbots, and elite Filipino virtual assistants. Serving businesses in the United States, Canada, United Kingdom, Europe, and Australia.",
      areaServed: [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "Netherlands" },
        { "@type": "Country", "name": "Philippines" },
      ],
      knowsAbout: [
        "GoHighLevel CRM Automation",
        "n8n Workflow Automation",
        "Retell AI Voice Agents",
        "AI Chatbot Development",
        "Business Process Automation",
        "SEO Automation",
        "Virtual Assistant Operations",
        "AI Infrastructure Buildouts",
        "Zapier to n8n Migration",
        "Sales Pipeline Automation",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "admin@aktservices.org",
        contactType: "Sales",
        availableLanguage: "English",
        areaServed: [
          "United States", "Canada", "United Kingdom", "Australia",
        ],
      },
      founder: {
        "@type": "Person",
        "@id": "https://aktservices.org/about#founder",
        name: "Jose Angelo Tapang",
        jobTitle: "CEO & Founder",
        url: "https://aktservices.org/about",
        sameAs: ["https://linkedin.com/in/jatakt"],
      },
      sameAs: [
        "https://linkedin.com/in/jatakt",
        "https://www.facebook.com/profile.php?id=100075861475134",
        // Add below when created: LinkedIn Company Page, YouTube channel, Google Business Profile, Clutch profile
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://aktservices.org/#website",
      url: "https://aktservices.org",
      name: "AKT Virtual Assistance Services",
      publisher: { "@id": "https://aktservices.org/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://aktservices.org/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://mgvuzguqyntoglurxzgp.supabase.co" />
        <link rel="dns-prefetch" href="https://mgvuzguqyntoglurxzgp.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-body font-dm">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
