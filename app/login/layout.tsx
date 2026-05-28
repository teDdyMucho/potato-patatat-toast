import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | AKT Virtual Assistance Services",
  description:
    "Log in or create a free account to access AKT's free AI tools powered by Claude AI.",
  alternates: { canonical: "https://aktservices.org/login" },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
