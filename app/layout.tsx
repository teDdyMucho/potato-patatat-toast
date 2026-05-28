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
  title: "AKT Virtual Assistance Services | AI-Powered VA & Automation | aktservices.org",
  description:
    "AKT Virtual Assistance Services — elite Filipino virtual assistants, AI infrastructure buildouts, and automation systems for businesses across 6 continents. Founded 2020.",
  keywords:
    "virtual assistant services, AI automation agency, Filipino VA, GoHighLevel setup, Retell AI, VAPI, CloseBot, Claude AI automation",
  openGraph: {
    title: "AKT Virtual Assistance Services | AI-Powered VA & Automation",
    description:
      "Elite Filipino VAs + AI automation for SMBs worldwide. GoHighLevel, Retell AI, VAPI, CloseBot, Claude AI. Book a free consultation.",
    url: "https://aktservices.org",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Virtual Assistance Services | AI-Powered VA & Automation",
    description:
      "Elite Filipino VAs + AI automation for SMBs worldwide.",
  },
  metadataBase: new URL("https://aktservices.org"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-background text-body font-dm">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
