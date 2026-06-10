import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | AKT Virtual Assistance Services",
  description: "Read AKT's Terms and Conditions and Privacy Policy before using our platform.",
  alternates: { canonical: "https://aktservices.org/terms" },
};

const EFFECTIVE_DATE = "June 11, 2026";
const COMPANY = "AKT Virtual Assistance Services";
const SITE = "aktservices.org";
const EMAIL = "admin@aktservices.org";

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2
        className="mb-4 font-syne font-bold text-white"
        style={{ fontSize: "clamp(18px, 2.5vw, 22px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[15px] font-dm leading-[1.85] text-white/65">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0ABFA3]" />
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#050608]">
        {/* Hero */}
        <section className="border-b border-white/[0.07] bg-[#07080a] py-14">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-dm text-white/40 transition-colors hover:text-[#0ABFA3]"
            >
              <ArrowLeft size={14} /> Back to sign up
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
                <Shield size={22} style={{ color: "#0ABFA3" }} />
              </div>
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-[0.22em] text-[#0ABFA3]">
                  Legal
                </p>
                <h1
                  className="font-syne font-extrabold text-white"
                  style={{ fontSize: "clamp(26px, 4vw, 38px)", letterSpacing: "-0.03em" }}
                >
                  Terms &amp; Conditions
                </h1>
              </div>
            </div>

            <p className="mt-5 text-[14px] font-dm text-white/40">
              Effective date: <span className="text-white/60">{EFFECTIVE_DATE}</span>
              &ensp;·&ensp;
              Last updated: <span className="text-white/60">{EFFECTIVE_DATE}</span>
            </p>
            <p className="mt-3 max-w-2xl text-[15px] font-dm leading-relaxed text-white/55">
              Please read these Terms and Conditions carefully before using the {COMPANY} platform. By
              creating an account you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* Table of contents */}
        <div className="border-b border-white/[0.06] bg-[#07080a]/50 py-6">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-[11px] font-dm font-semibold uppercase tracking-[0.2em] text-white/30">
              Contents
            </p>
            <ol className="flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] font-dm text-[#0ABFA3]/80">
              {[
                ["#acceptance",    "1. Acceptance of Terms"],
                ["#services",      "2. Services"],
                ["#accounts",      "3. Accounts"],
                ["#acceptable",    "4. Acceptable Use"],
                ["#ip",            "5. Intellectual Property"],
                ["#payments",      "6. Payments & Fees"],
                ["#disclaimer",    "7. Disclaimer"],
                ["#liability",     "8. Limitation of Liability"],
                ["#termination",   "9. Termination"],
                ["#privacy",       "10. Privacy Policy"],
                ["#changes",       "11. Changes to Terms"],
                ["#contact",       "12. Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-[#0ABFA3] hover:underline underline-offset-2 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Body */}
        <article className="py-14">
          <div className="mx-auto max-w-3xl space-y-12 px-6">

            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>
                By accessing or using the {COMPANY} website at <strong className="text-white/80">{SITE}</strong> or
                any associated services (collectively, the &ldquo;Platform&rdquo;), you agree to be legally bound by
                these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms,
                you must not use the Platform.
              </p>
              <p>
                These Terms apply to all visitors, users, clients, and virtual assistants who access or use the
                Platform in any capacity.
              </p>
            </Section>

            <Section id="services" title="2. Services">
              <p>
                {COMPANY} provides the following services through the Platform:
              </p>
              <ul className="mt-2 space-y-2">
                <Bullet>Virtual assistance matching — connecting businesses with vetted Filipino virtual assistants.</Bullet>
                <Bullet>AI automation tools — workflow automation, voice AI, chatbot deployment, and lead generation.</Bullet>
                <Bullet>GoHighLevel (GHL) setup, configuration, and affiliate referral services.</Bullet>
                <Bullet>Project Review — a collaborative workspace for submitting and reviewing deliverables.</Bullet>
                <Bullet>SEO tools, content creation assistance, and digital marketing support.</Bullet>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any service at any time with or without
                notice. We shall not be liable to you or any third party for any modification, suspension, or
                discontinuation of services.
              </p>
            </Section>

            <Section id="accounts" title="3. Accounts & Registration">
              <p>
                To access certain features of the Platform you must create an account. You agree to:
              </p>
              <ul className="mt-2 space-y-2">
                <Bullet>Provide accurate, current, and complete information during registration.</Bullet>
                <Bullet>Maintain and promptly update your account information.</Bullet>
                <Bullet>Keep your password confidential and not share it with any third party.</Bullet>
                <Bullet>Notify us immediately of any unauthorized use of your account.</Bullet>
                <Bullet>Accept responsibility for all activities that occur under your account.</Bullet>
              </ul>
              <p>
                We reserve the right to terminate accounts that violate these Terms, contain inaccurate
                information, or have been inactive for an extended period.
              </p>
            </Section>

            <Section id="acceptable" title="4. Acceptable Use">
              <p>You agree <strong className="text-white/80">not</strong> to use the Platform to:</p>
              <ul className="mt-2 space-y-2">
                <Bullet>Violate any applicable local, national, or international law or regulation.</Bullet>
                <Bullet>Transmit any unsolicited or unauthorized advertising or spam.</Bullet>
                <Bullet>Upload or transmit viruses, malware, or any code of a destructive nature.</Bullet>
                <Bullet>Harvest, scrape, or collect data about other users without their consent.</Bullet>
                <Bullet>Impersonate any person or entity, or misrepresent your affiliation.</Bullet>
                <Bullet>Engage in any activity that disrupts or interferes with the Platform's infrastructure.</Bullet>
                <Bullet>Attempt to gain unauthorized access to any part of the Platform or its related systems.</Bullet>
                <Bullet>Use the Platform for any purpose that is unlawful or prohibited by these Terms.</Bullet>
              </ul>
              <p>
                Violation of this section may result in immediate termination of your account and, where
                applicable, referral to law enforcement.
              </p>
            </Section>

            <Section id="ip" title="5. Intellectual Property">
              <p>
                All content on the Platform — including but not limited to text, graphics, logos, button icons,
                images, audio clips, and software — is the property of {COMPANY} or its content suppliers and is
                protected by applicable intellectual property laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and use the Platform
                for its intended purpose. You may not reproduce, duplicate, copy, sell, resell, or exploit any
                portion of the Platform without our express written permission.
              </p>
              <p>
                Content you submit through the Platform (project files, deliverables, feedback) remains your
                property. By submitting content you grant us a limited license to store, display, and deliver it
                as necessary to provide the service.
              </p>
            </Section>

            <Section id="payments" title="6. Payments & Fees">
              <p>
                Certain services offered through the Platform may be subject to fees. All fees are stated in
                United States Dollars (USD) unless otherwise indicated.
              </p>
              <ul className="mt-2 space-y-2">
                <Bullet>Payment terms, pricing, and billing cycles will be communicated before any charge is applied.</Bullet>
                <Bullet>All payments are non-refundable unless otherwise stated in a separate service agreement.</Bullet>
                <Bullet>We reserve the right to change our pricing with reasonable prior notice.</Bullet>
                <Bullet>Affiliate commissions through our GoHighLevel referral program are subject to GoHighLevel&apos;s own commission terms and payment schedule.</Bullet>
              </ul>
            </Section>

            <Section id="disclaimer" title="7. Disclaimer of Warranties">
              <p>
                The Platform and all services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis without any warranties of any kind, either express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>
                We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other
                harmful components. We do not warrant the accuracy or completeness of any information on the
                Platform.
              </p>
            </Section>

            <Section id="liability" title="8. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, {COMPANY} and its officers, employees, agents,
                partners, and licensors shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages, including loss of profits, data, goodwill, or other intangible losses,
                resulting from:
              </p>
              <ul className="mt-2 space-y-2">
                <Bullet>Your access to or use of (or inability to access or use) the Platform.</Bullet>
                <Bullet>Any conduct or content of any third party on the Platform.</Bullet>
                <Bullet>Any content obtained from the Platform.</Bullet>
                <Bullet>Unauthorized access, use, or alteration of your transmissions or content.</Bullet>
              </ul>
              <p>
                Our total liability to you for any claim arising from or related to these Terms or the Platform
                shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </Section>

            <Section id="termination" title="9. Termination">
              <p>
                We may suspend or terminate your access to the Platform at our sole discretion, without prior
                notice, for conduct that we believe violates these Terms or is harmful to other users, us, third
                parties, or for any other reason.
              </p>
              <p>
                You may terminate your account at any time by contacting us at{" "}
                <a href={`mailto:${EMAIL}`} className="text-[#0ABFA3] hover:underline underline-offset-2">{EMAIL}</a>.
                Termination does not entitle you to a refund of any fees paid.
              </p>
              <p>
                All provisions of these Terms which by their nature should survive termination — including
                ownership provisions, warranty disclaimers, indemnity, and limitations of liability — shall
                survive termination.
              </p>
            </Section>

            <hr className="border-0 h-px bg-white/[0.07]" />

            <Section id="privacy" title="10. Privacy Policy">
              <p>
                Your privacy is important to us. This section outlines how {COMPANY} collects, uses, and
                protects your personal information.
              </p>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">Information We Collect</h3>
              <ul className="mt-2 space-y-2">
                <Bullet><strong className="text-white/75">Account data</strong> — name, email address, and password (hashed) provided at registration.</Bullet>
                <Bullet><strong className="text-white/75">Usage data</strong> — pages visited, features used, and interaction logs to improve the Platform.</Bullet>
                <Bullet><strong className="text-white/75">Communications</strong> — messages, project files, and feedback submitted through the Platform.</Bullet>
                <Bullet><strong className="text-white/75">Technical data</strong> — IP address, browser type, device information, and cookies.</Bullet>
              </ul>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">How We Use Your Information</h3>
              <ul className="mt-2 space-y-2">
                <Bullet>To create and manage your account and deliver the services you request.</Bullet>
                <Bullet>To communicate with you about your account, projects, and service updates.</Bullet>
                <Bullet>To improve, personalize, and develop the Platform and new features.</Bullet>
                <Bullet>To detect, prevent, and address technical issues and fraudulent activity.</Bullet>
                <Bullet>To comply with legal obligations.</Bullet>
              </ul>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">Data Sharing</h3>
              <p>
                We do not sell your personal information. We may share data with trusted third-party service
                providers (such as Supabase for database hosting, and authentication providers) solely to operate
                the Platform. These providers are contractually bound to keep your data confidential.
              </p>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">Cookies</h3>
              <p>
                We use cookies and similar tracking technologies to maintain sessions and analyze usage. You can
                control cookie settings through your browser, though disabling cookies may affect Platform
                functionality.
              </p>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">Data Retention</h3>
              <p>
                We retain your personal data for as long as your account is active or as needed to provide
                services. You may request deletion of your account and associated data by contacting us.
              </p>

              <h3 className="mt-6 font-syne text-[16px] font-bold text-white/80">Your Rights</h3>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict
                processing of your personal data. To exercise these rights, contact us at{" "}
                <a href={`mailto:${EMAIL}`} className="text-[#0ABFA3] hover:underline underline-offset-2">{EMAIL}</a>.
              </p>
            </Section>

            <Section id="changes" title="11. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of significant
                changes by updating the &ldquo;Effective date&rdquo; at the top of this page and, where
                appropriate, sending an email notification to registered users.
              </p>
              <p>
                Your continued use of the Platform after changes are posted constitutes your acceptance of the
                revised Terms. If you do not agree to the new Terms, you must stop using the Platform.
              </p>
            </Section>

            <Section id="contact" title="12. Contact Us">
              <p>
                If you have any questions about these Terms or our Privacy Policy, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-[#155E53]/40 bg-[#062B26]/30 px-5 py-4">
                <p className="font-syne text-[15px] font-bold text-white">{COMPANY}</p>
                <p className="mt-1 text-[14px] font-dm text-white/60">
                  Email:{" "}
                  <a href={`mailto:${EMAIL}`} className="text-[#0ABFA3] hover:underline underline-offset-2">
                    {EMAIL}
                  </a>
                </p>
                <p className="mt-0.5 text-[14px] font-dm text-white/60">
                  Website:{" "}
                  <a href={`https://${SITE}`} className="text-[#0ABFA3] hover:underline underline-offset-2">
                    {SITE}
                  </a>
                </p>
              </div>
            </Section>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
              <p className="text-[13px] font-dm text-white/35">
                &copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-[#0ABFA3]/30 bg-[#0ABFA3]/10 px-4 py-2 text-[13px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/20"
              >
                <ArrowLeft size={13} /> Back to sign up
              </Link>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
