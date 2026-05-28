"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
  Share2,
  Send,
  Loader2,
} from "lucide-react";

const needOptions = [
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
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [needs, setNeeds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const bookingUrl = (() => {
    const base = "https://api.leadconnectorhq.com/widget/booking/rBZBds2Y2BtTaXMDeEk7";
    const params = new URLSearchParams();
    if (form.firstName) params.set("first_name", form.firstName.trim());
    if (form.lastName)  params.set("last_name",  form.lastName.trim());
    if (form.email)     params.set("email",       form.email.trim());
    // GHL booking widget phone autofill — strip spaces/dashes, keep leading +
    const cleanPhone = form.phone.trim().replace(/[\s\-().]/g, "");
    if (cleanPhone)     params.set("phone",       cleanPhone);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  })();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleNeed = (need: string) => {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName:  form.lastName,
          company:   form.company,
          email:     form.email,
          phone:     form.phone,
          message:   form.message,
          need:      needs.join(", "),
          userId:    user?.id ?? null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setSubmitted(true);
      setBookingOpen(true);
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
                    <h2 className="font-syne text-body text-[22px] font-bold mb-2" style={{ letterSpacing: "-0.01em" }}>
                      Message sent!
                    </h2>
                    <p className="text-[15px] font-dm text-muted mb-6 max-w-sm mx-auto">
                      Thanks! Book your free 30-min strategy call below — pick a time that works for you.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setBookingOpen(true)}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-[14px] font-dm font-bold text-white shadow-lg shadow-[#0abfa3]/20 transition-shadow hover:shadow-[#0abfa3]/40"
                      style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      <span className="relative flex items-center gap-2">
                        <CheckCircle size={16} />
                        Book a Strategy Call
                      </span>
                    </motion.button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#101113] rounded-card border border-border p-5 sm:p-8 space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="First name"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="family-name"
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="Last name"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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
                          autoComplete="tel"
                          className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                          placeholder="+1 555 000 0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        autoComplete="organization"
                        className="w-full border border-border bg-background rounded-md px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                        placeholder="Company name (optional)"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        What Do You Need?{" "}
                        <span className="normal-case text-[11px] text-muted/60 font-normal">(select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {needOptions.map((option) => {
                          const selected = needs.includes(option);
                          return (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => toggleNeed(option)}
                              whileTap={{ scale: 0.93 }}
                              animate={{
                                background: selected ? "#0ABFA3" : "transparent",
                                borderColor: selected ? "#0ABFA3" : "#2C2C2E",
                                color: selected ? "#ffffff" : "#A1A1AA",
                              }}
                              transition={{ duration: 0.15 }}
                              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-dm font-semibold border outline-none focus-visible:ring-2 focus-visible:ring-[#0ABFA3]/50"
                            >
                              <AnimatePresence>
                                {selected && (
                                  <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-white/25"
                                  >
                                    <CheckCircle size={10} strokeWidth={2.5} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {option}
                            </motion.button>
                          );
                        })}
                      </div>
                      {needs.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-[11px] font-dm text-[#0ABFA3]"
                        >
                          Selected: {needs.join(" · ")}
                        </motion.p>
                      )}
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

                    {error && (
                      <p
                        className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.015 }}
                      whileTap={{ scale: submitting ? 1 : 0.97 }}
                      className="group relative w-full overflow-hidden rounded-xl py-4 text-[15px] font-dm font-bold text-white shadow-lg shadow-[#0abfa3]/20 transition-shadow hover:shadow-[#0abfa3]/40 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                    >
                      {/* shimmer sweep on hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                      <span className="relative flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>

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

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {bookingOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="booking-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setBookingOpen(false)}
            />

            {/* Centering wrapper — pointer-events-none so backdrop click-to-close still works */}
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Modal panel */}
            <motion.div
              key="booking-panel"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black/60"
              style={{ maxHeight: "min(88vh, 760px)", height: "min(88vh, 760px)" }}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#062B26]">
                    <CheckCircle size={18} style={{ color: "#0ABFA3" }} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-syne text-[15px] font-bold text-white">Book Your Free Strategy Call</p>
                    <p className="text-[12px] font-dm text-muted">30 min · AKT Virtual Assistance Services</p>
                  </div>
                </div>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close booking"
                >
                  ✕
                </button>
              </div>

              {/* Calendar iframe */}
              <div className="relative min-h-0 flex-1">
                <iframe
                  src={bookingUrl}
                  title="Book a strategy call with AKT"
                  className="h-full w-full border-0"
                  loading="lazy"
                  allow="camera; microphone; autoplay; encrypted-media"
                />
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
