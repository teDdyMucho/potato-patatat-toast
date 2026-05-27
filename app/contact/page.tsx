"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
  Share2,
} from "lucide-react";

const needs = [
  "Virtual Assistants",
  "AI Infrastructure",
  "GoHighLevel Setup",
  "Retell AI / VAPI",
  "CloseBot / Sales AI",
  "Call Center",
  "Lead Generation",
  "Both VA + AI",
  "Not sure yet",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    need: "",
    message: "",
    contactTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} You can also email admin@aktservices.org directly.`
          : "Couldn't send. Please email admin@aktservices.org directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h1
                className="font-syne text-body mb-4"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                Book a free
                <br />
                <span style={{ color: "#0ABFA3" }}>consultation.</span>
              </h1>
              <p className="text-[16px] font-dm text-muted leading-relaxed">
                Tell us what you need. We&apos;ll map out exactly how AKT can
                help — whether that&apos;s a VA placement, a GoHighLevel
                buildout, or a full AI automation stack.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact info */}
              <div>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#062B26" }}
                    >
                      <Mail size={18} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[13px] font-dm font-semibold text-body mb-0.5">Email</p>
                      <a
                        href="mailto:admin@aktservices.org"
                        className="text-[14px] font-dm text-muted hover:text-primary transition-colors"
                      >
                        admin@aktservices.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#073B34" }}
                    >
                      <MapPin size={18} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[13px] font-dm font-semibold text-body mb-0.5">Location</p>
                      <p className="text-[14px] font-dm text-muted">
                        Philippines
                        <br />
                        Serving clients worldwide
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#062B26" }}
                    >
                      <Clock size={18} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[13px] font-dm font-semibold text-body mb-0.5">Response Time</p>
                      <p className="text-[14px] font-dm text-muted">
                        Within 24 hours
                        <br />
                        Mon–Fri, 9am–6pm EST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mb-10">
                  <p className="text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                    Connect
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/in/jatakt"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-[#101113] text-[13px] font-dm text-muted hover:text-primary hover:border-primary transition-colors"
                    >
                      <ExternalLink size={14} />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100075861475134"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-[#101113] text-[13px] font-dm text-muted hover:text-primary hover:border-primary transition-colors"
                    >
                      <Share2 size={14} />
                      Facebook
                    </a>
                  </div>
                </div>

                {/* What happens next */}
                <div
                  className="rounded-card border border-border bg-[#101113] p-6"
                >
                  <p
                    className="font-syne text-body text-[14px] font-bold mb-4"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    What happens after you submit?
                  </p>
                  {[
                    "AKT reviews your inquiry within 24 hours",
                    "We schedule a free 30-min strategy call",
                    "We map out a custom plan for your business",
                    "You receive a proposal — no commitment needed",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        style={{ background: "#062B26", color: "#0ABFA3" }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-[13px] font-dm text-muted">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="bg-[#101113] rounded-card border border-border p-8 sm:p-12 text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "#073B34" }}
                    >
                      <CheckCircle size={28} style={{ color: "#0ABFA3" }} strokeWidth={2} />
                    </div>
                    <h2
                      className="font-syne text-body text-[22px] font-bold mb-3"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Message sent!
                    </h2>
                    <p className="text-[15px] font-dm text-muted max-w-sm mx-auto">
                      Thanks for reaching out. The AKT team will review your
                      inquiry and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#101113] rounded-card border border-border p-5 sm:p-8 space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="Company name"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="+1 555 000 0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        What Do You Need? *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {needs.map((need) => (
                          <button
                            key={need}
                            type="button"
                            onClick={() => setForm({ ...form, need })}
                            className="px-3.5 py-1.5 rounded-full text-[12px] font-dm font-semibold transition-all duration-150 border"
                            style={{
                              background: form.need === need ? "#0ABFA3" : "transparent",
                              color: form.need === need ? "white" : "#A1A1AA",
                              borderColor: form.need === need ? "#0ABFA3" : "#2C2C2E",
                            }}
                          >
                            {need}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        Tell Us More *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors resize-none"
                        placeholder="Describe your situation, goals, and what you'd like help with..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        Preferred Contact Time
                      </label>
                      <input
                        type="text"
                        className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                        placeholder="e.g. Weekdays 10am–2pm EST"
                        value={form.contactTime}
                        onChange={(e) => setForm({ ...form, contactTime: e.target.value })}
                      />
                    </div>

                    {error && (
                      <p
                        className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Send Message"}
                      {!submitting && <ArrowUpRight size={16} />}
                    </button>

                    <p className="text-[12px] font-dm text-muted text-center">
                      No spam. No commitment. We reply within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
