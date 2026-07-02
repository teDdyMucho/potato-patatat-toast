"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
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
  CalendarCheck,
  ArrowRight,
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

const steps = [
  "AKT reviews your inquiry within 24 hours",
  "We schedule a free 30-min strategy call",
  "We map out a custom plan for your business",
  "You receive a proposal — no commitment needed",
];

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] font-dm text-white placeholder:text-white/25 transition-colors focus:border-[#0ABFA3]/60 focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20";

function ContactForm() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const prefilledNeed = searchParams.get("need");
  const phoneRequired = searchParams.get("requirePhone") === "1";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      const parts = user.name.trim().split(" ");
      setForm((f) => ({
        ...f,
        firstName: parts[0] ?? "",
        lastName: parts.slice(1).join(" ") ?? "",
        email: user.email,
      }));
    }
  }, [user]);

  const [needs, setNeeds] = useState<string[]>(() =>
    prefilledNeed && needOptions.includes(prefilledNeed) ? [prefilledNeed] : [],
  );
  const [submitted, setSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const bookingUrl = (() => {
    const base = "https://api.leadconnectorhq.com/widget/booking/rBZBds2Y2BtTaXMDeEk7";
    const params = new URLSearchParams();
    if (form.firstName) params.set("first_name", form.firstName.trim());
    if (form.lastName)  params.set("last_name",  form.lastName.trim());
    if (form.email)     params.set("email",       form.email.trim());
    const cleanPhone = form.phone.trim().replace(/[\s\-().]/g, "");
    if (cleanPhone)     params.set("phone",       cleanPhone);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  })();

  const toggleNeed = (need: string) =>
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need],
    );

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
    <DashboardShell>
      <div className="relative min-h-screen bg-[#050608]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#0ABFA3]/[0.06] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">

          {/* ── Page header ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="accent-bar mb-2 text-[11px] font-dm font-semibold uppercase tracking-[0.18em] text-muted">
              Get In Touch
            </p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1
                  className="font-syne text-white"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  Book a free{" "}
                  <span style={{ color: "#0ABFA3" }}>consultation.</span>
                </h1>
                <p className="mt-1.5 max-w-lg text-[14px] font-dm leading-relaxed text-white/45">
                  Tell us what you need — we&apos;ll map out exactly how AKT can help, whether that&apos;s a VA placement, a GoHighLevel buildout, or a full AI automation stack.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://linkedin.com/in/jatakt"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[12px] font-dm font-semibold text-white/50 transition-colors hover:border-[#0ABFA3]/40 hover:text-[#0ABFA3]"
                >
                  <ExternalLink size={13} />
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100075861475134"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[12px] font-dm font-semibold text-white/50 transition-colors hover:border-[#0ABFA3]/40 hover:text-[#0ABFA3]"
                >
                  <Share2 size={13} />
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">

            {/* Left column — info */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Contact details */}
              <div className="rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5">
                <p className="mb-4 text-[11px] font-dm font-semibold uppercase tracking-[0.15em] text-white/30">
                  Contact Info
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "admin@aktservices.org", href: "mailto:admin@aktservices.org" },
                    { icon: MapPin, label: "Location", value: "Philippines · Worldwide", href: null },
                    { icon: Clock, label: "Response", value: "Within 24 hrs · Mon–Fri", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#062B26]">
                        <Icon size={15} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-white/30">{label}</p>
                        {href ? (
                          <a href={href} className="truncate text-[13px] font-dm text-white/70 transition-colors hover:text-[#0ABFA3]">{value}</a>
                        ) : (
                          <p className="truncate text-[13px] font-dm text-white/70">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process steps */}
              <div className="rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5">
                <p className="mb-4 text-[11px] font-dm font-semibold uppercase tracking-[0.15em] text-white/30">
                  What happens next
                </p>
                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{ background: "#062B26", color: "#0ABFA3" }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-[13px] font-dm leading-snug text-white/55">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee chip */}
              <div
                className="rounded-2xl border p-4 text-center"
                style={{ background: "#062B26", borderColor: "#155E53" }}
              >
                <CalendarCheck size={20} style={{ color: "#0ABFA3" }} className="mx-auto mb-2" />
                <p className="text-[13px] font-syne font-bold text-white">Free 30-min strategy call</p>
                <p className="mt-1 text-[11px] font-dm text-white/45">No commitment. No spam.</p>
              </div>
            </motion.div>

            {/* Right column — form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {submitted ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-10 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#062B26]">
                    <CheckCircle size={30} style={{ color: "#0ABFA3" }} strokeWidth={2} />
                  </div>
                  <h2 className="mb-2 font-syne text-[24px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                    Message sent!
                  </h2>
                  <p className="mb-8 max-w-sm text-[15px] font-dm text-white/50">
                    Thanks! Book your free 30-min strategy call — pick a time that works for you.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setBookingOpen(true)}
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-3.5 text-[14px] font-dm font-bold text-white shadow-lg shadow-[#0abfa3]/20"
                    style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <CalendarCheck size={16} className="relative" />
                    <span className="relative">Book a Strategy Call</span>
                    <ArrowRight size={15} className="relative" />
                  </motion.button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-6 sm:p-8"
                >
                  {/* Name row */}
                  <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                        First Name <span className="text-[#0ABFA3]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="given-name"
                        className={inputCls}
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                        Last Name <span className="text-[#0ABFA3]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="family-name"
                        className={inputCls}
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                        Email <span className="text-[#0ABFA3]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        className={inputCls}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                        Phone {phoneRequired && <span className="text-[#0ABFA3]">*</span>}
                      </label>
                      <input
                        type="tel"
                        required={phoneRequired}
                        autoComplete="tel"
                        className={inputCls}
                        placeholder="+1 555 000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="mb-5">
                    <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                      Company
                    </label>
                    <input
                      type="text"
                      autoComplete="organization"
                      className={inputCls}
                      placeholder="Company name (optional)"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  {/* Needs */}
                  <div className="mb-5">
                    <label className="mb-3 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                      What do you need?{" "}
                      <span className="normal-case font-normal text-white/25">(select all that apply)</span>
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
                              background: selected ? "#0ABFA3" : "rgba(255,255,255,0.03)",
                              borderColor: selected ? "#0ABFA3" : "rgba(255,255,255,0.08)",
                              color: selected ? "#ffffff" : "rgba(255,255,255,0.45)",
                            }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-dm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#0ABFA3]/50"
                          >
                            <AnimatePresence>
                              {selected && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.12 }}
                                >
                                  <CheckCircle size={11} strokeWidth={2.5} />
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
                        className="mt-2.5 text-[11px] font-dm text-[#0ABFA3]"
                      >
                        Selected: {needs.join(" · ")}
                      </motion.p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                      Tell Us More <span className="text-[#0ABFA3]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      className={`${inputCls} resize-none`}
                      placeholder="Describe your situation, goals, and what you'd like help with..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {error && (
                    <p className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300" role="alert">
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.01 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl py-4 text-[15px] font-dm font-bold text-white shadow-lg shadow-[#0abfa3]/20 transition-shadow hover:shadow-[#0abfa3]/35 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <span className="relative flex items-center justify-center gap-2.5">
                      {submitting ? (
                        <><Loader2 size={17} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </span>
                  </motion.button>

                  <p className="mt-4 text-center text-[12px] font-dm text-white/25">
                    No spam. No commitment. We reply within 24 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {bookingOpen && (
          <>
            <motion.div
              key="booking-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => setBookingOpen(false)}
            />
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                key="booking-panel"
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black/60"
                style={{ maxHeight: "min(88vh, 760px)", height: "min(88vh, 760px)" }}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#062B26]">
                      <CalendarCheck size={17} style={{ color: "#0ABFA3" }} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-syne text-[15px] font-bold text-white">Book Your Free Strategy Call</p>
                      <p className="text-[12px] font-dm text-white/40">30 min · AKT Virtual Assistance Services</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label="Close booking"
                  >
                    ✕
                  </button>
                </div>
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
    </DashboardShell>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
