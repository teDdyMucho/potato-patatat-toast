"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  User as UserIcon,
  User2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth, type SignupOptions } from "@/lib/auth";
import { Akt3DLogo } from "@/components/ui/akt-3d-logo";
import { GLSLHills } from "@/components/ui/glsl-hills";

type Mode = "login" | "signup";

// Reasons a business needs AKT — shown beside the 3D wordmark.
const reasons = [
  {
    icon: UserIcon,
    title: "Elite virtual assistants",
    desc: "Scale your team with vetted Filipino VAs — without the overhead of full-time hires.",
  },
  {
    icon: Bot,
    title: "AI automation, 24/7",
    desc: "Hand off repetitive busywork to AI agents that never clock out.",
  },
  {
    icon: Globe,
    title: "Proven worldwide",
    desc: "Trusted by businesses across 6 continents since 2020.",
  },
];

// Returns a safe, same-site path from the ?redirect= query param.
function getRedirectTarget(): string {
  if (typeof window === "undefined") return "/dashboard";
  const param = new URLSearchParams(window.location.search).get("redirect");
  // Only allow internal paths (must start with "/", not "//") to avoid open redirects.
  if (param && param.startsWith("/") && !param.startsWith("//")) return param;
  return "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();
  const { user, ready, isAdmin, login, signup, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [waitingForAudit, setWaitingForAudit] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Multi-step signup
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [pendingAccountType, setPendingAccountType] = useState<"individual" | "business" | null>(null);
  const [showWebsiteStep, setShowWebsiteStep] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");

  // Already signed in? Skip straight to the destination.
  useEffect(() => {
    if (ready && user) router.replace(isAdmin ? "/admin" : getRedirectTarget());
  }, [ready, user, isAdmin, router]);

  // Reflect status passed back via the URL (Google error, or email verified).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth") setError("Google sign-in failed. Please try again.");
  }, []);

  const handleGoogle = async () => {
    setError("");
    setNotice("");
    setGoogleLoading(true);
    const result = await loginWithGoogle(getRedirectTarget());
    if (!result.ok) {
      setError(result.error || "Google sign-in failed.");
      setGoogleLoading(false);
    }
    // On success the browser redirects to Google.
  };

  const doSignup = async (opts?: SignupOptions) => {
    setSubmitting(true);
    const result = await signup(name, email, password, opts);
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // For business accounts: call scraper, await the response, then save to DB
    if (opts?.accountType === "business" && opts.websiteUrl) {
      setWaitingForAudit(true);

      try {
        // n8n responds directly with the audit JSON — await it (can take ~60s)
        const scraperRes = await fetch(
          "https://primary-production-6722.up.railway.app/webhook/scraper",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "business_signup",
              name: name.trim(),
              email: email.trim().toLowerCase(),
              business_name: opts.businessName ?? "",
              website_url: opts.websiteUrl ?? "",
              business_category: opts.businessCategory ?? "",
            }),
          },
        );

        if (scraperRes.ok) {
          const auditData = await scraperRes.json();
          // Forward the scraper output to our own webhook route to save in DB
          await fetch("/api/webhook/audit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(auditData),
          });
        }
      } catch {
        // Scraper timed out or failed — proceed anyway, audit page shows empty state
      }

      setWaitingForAudit(false);
      router.replace("/dashboard/audit");
      return;
    }

    router.replace(isAdmin ? "/admin" : getRedirectTarget());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (mode === "login") {
      setSubmitting(true);
      const result = await login(email, password);
      if (!result.ok) {
        setError(result.error);
        setSubmitting(false);
        return;
      }
      router.replace(isAdmin ? "/admin" : getRedirectTarget());
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (pendingAccountType === "business") {
      setShowWebsiteStep(true);
    } else {
      doSignup({ accountType: "individual" });
    }
  };

  // Called when "Sign up" link is clicked — show account type picker first
  const handleSignUpClick = () => {
    setShowAccountTypeModal(true);
  };

  const handleAccountTypePick = (type: "individual" | "business") => {
    setPendingAccountType(type);
    setShowAccountTypeModal(false);
    setMode("signup");
  };

  const handleBusinessSignup = async () => {
    if (!businessName.trim()) {
      setError("Business name is required.");
      return;
    }
    setShowWebsiteStep(false);
    doSignup({
      accountType: "business",
      businessName,
      websiteUrl,
      businessCategory,
    });
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setNotice("");
    setConfirmPassword("");
    setAgreedToTerms(false);
    setSubscribeNewsletter(true);
    setShowAccountTypeModal(false);
    setShowWebsiteStep(false);
    setPendingAccountType(null);
    setBusinessName("");
    setWebsiteUrl("");
    setBusinessCategory("");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Animated GLSL hills background (same as the home page), darkened for readability */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <GLSLHills width="100%" height="100%" cameraZ={124} speed={0.42} color="white" />
        {/* heavy dark scrim so all text stays legible */}
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,191,163,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        {/* Left — 3D AKT wordmark + why your business needs AKT (desktop only) */}
        <div className="relative hidden w-full lg:block lg:max-w-lg">
          {/* ambient glow behind the wordmark */}
          <div className="pointer-events-none absolute -left-12 -top-8 h-[440px] w-[440px] rounded-full bg-[#0ABFA3]/20 blur-[140px]" />

          <div className="relative z-10">
            <Akt3DLogo
              fitSize={3.9}
              className="-ml-1 h-[190px] w-full max-w-[400px] sm:h-[230px]"
            />
            <p className="mt-2 text-[13px] font-dm font-semibold uppercase tracking-[0.3em] text-white/55">
              Virtual Assistance Services
            </p>

            <h2
              className="mt-10 font-syne text-body"
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Why your business needs AKT
            </h2>
            <p className="mt-3 max-w-md text-[16px] font-dm text-muted leading-relaxed">
              Elite virtual assistants and AI automation that give you back your
              time — built to run your operations while you focus on growth.
            </p>

            <ul className="mt-9 space-y-6 max-w-md">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <li key={reason.title} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "#073B34" }}
                    >
                      <Icon size={20} style={{ color: "#0ABFA3" }} strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block font-syne text-[16px] font-bold text-body">
                        {reason.title}
                      </span>
                      <span className="block text-[14px] font-dm text-muted leading-relaxed">
                        {reason.desc}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right — auth box (flips to the right when switching modes) */}
        <div className="w-full max-w-[480px] lg:shrink-0 [perspective:1600px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={showWebsiteStep ? "business-info" : mode}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{
                transformOrigin: "center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="rounded-card border border-white/10 bg-surface/70 p-10 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            >
            {showWebsiteStep ? (
              /* ── Business info card ── */
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                    <Building2 size={18} style={{ color: "#0ABFA3" }} />
                  </span>
                  <div>
                    <p className="text-[11px] font-dm font-semibold uppercase tracking-widest text-muted">
                      Step 2 of 2
                    </p>
                    <h3 className="font-syne text-[20px] font-bold text-body leading-tight">
                      Business info
                    </h3>
                  </div>
                </div>
                <p className="text-[14px] font-dm text-muted mb-6">
                  Tell us about your business so we can set up your account.
                </p>
                <div className="space-y-4">
                  <label className="block">
                    <span className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                      Business name <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-[15px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                      Website URL <span className="text-muted/50">(optional)</span>
                    </span>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yoursite.com"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-[15px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </label>
                  <div>
                    <span className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                      Business category <span className="text-muted/50">(optional)</span>
                    </span>
                    <select
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-[15px] font-dm text-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                    >
                      <option value="">Select category…</option>
                      <option>Real Estate</option>
                      <option>E-commerce</option>
                      <option>Marketing &amp; Advertising</option>
                      <option>Healthcare</option>
                      <option>Finance &amp; Accounting</option>
                      <option>Legal</option>
                      <option>Technology &amp; SaaS</option>
                      <option>Education</option>
                      <option>Construction &amp; Trades</option>
                      <option>Hospitality &amp; Events</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                {error && (
                  <p className="mt-4 text-[14px] font-dm text-red-400" role="alert">{error}</p>
                )}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => { setShowWebsiteStep(false); setShowAccountTypeModal(true); }}
                    className="flex-1 rounded-lg border border-border py-3 text-[14px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBusinessSignup}
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-[14px] font-dm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "#0ABFA3" }}
                  >
                    {submitting ? "Creating…" : <><Check size={16} /> Create account</>}
                  </button>
                </div>
              </div>
            ) : (
              /* ── Login / Signup card ── */
              <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="accent-bar text-[13px] font-dm font-semibold text-muted uppercase tracking-widest">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </p>
                {mode === "signup" && pendingAccountType && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-dm font-semibold text-primary">
                    {pendingAccountType === "business" ? <Building2 size={11} /> : <User2 size={11} />}
                    {pendingAccountType === "business" ? "Business" : "Individual"}
                  </span>
                )}
              </div>
              <h3
                className="font-syne text-body mb-2"
                style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {mode === "login" ? "Log in to continue" : "Sign up to continue"}
              </h3>
              <p className="text-[15px] font-dm text-muted mb-8">
                {mode === "login"
                  ? "Log in to run AKT's free AI tools."
                  : "Create a free account to run AKT's AI tools."}
              </p>

              {notice && (
                <p
                  className="mb-6 rounded-lg border border-primary/40 bg-[#062B26] px-4 py-3 text-[13px] font-dm leading-relaxed text-[#7fffee]"
                  role="status"
                >
                  {notice}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <Field
                    icon={<UserIcon size={18} />}
                    label="Full name"
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                )}

                <Field
                  icon={<Mail size={18} />}
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@company.com"
                  autoComplete="email"
                />

                <Field
                  icon={<Lock size={18} />}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  revealable
                />

                {mode === "signup" && (
                  <Field
                    icon={<Lock size={18} />}
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    revealable
                  />
                )}

                {/* Terms checkbox — signup only */}
                {mode === "signup" && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
                    <span className="relative mt-0.5 flex shrink-0">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-black/40 transition-colors checked:border-[#0ABFA3] checked:bg-[#0ABFA3] focus:outline-none focus:ring-2 focus:ring-[#0ABFA3]/30"
                      />
                      {/* Custom checkmark */}
                      <svg
                        className="pointer-events-none absolute inset-0 h-4 w-4 scale-0 text-white transition-transform peer-checked:scale-100"
                        viewBox="0 0 16 16" fill="none" aria-hidden="true"
                      >
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-dm leading-relaxed text-muted">
                      I have read and agree to the{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0ABFA3] underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms and Conditions
                      </Link>
                      {" "}and{" "}
                      <Link
                        href="/terms#privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0ABFA3] underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                )}

                {/* Newsletter checkbox — signup only, checked by default */}
                {mode === "signup" && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
                    <span className="relative mt-0.5 flex shrink-0">
                      <input
                        type="checkbox"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-black/40 transition-colors checked:border-[#0ABFA3] checked:bg-[#0ABFA3] focus:outline-none focus:ring-2 focus:ring-[#0ABFA3]/30"
                      />
                      <svg
                        className="pointer-events-none absolute inset-0 h-4 w-4 scale-0 text-white transition-transform peer-checked:scale-100"
                        viewBox="0 0 16 16" fill="none" aria-hidden="true"
                      >
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-dm leading-relaxed text-muted">
                      Subscribe to our newsletter for AI tips, automation updates, and AKT news.
                    </span>
                  </label>
                )}

                {error && (
                  <p className="text-[14px] font-dm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || (mode === "signup" && !agreedToTerms)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[16px] font-dm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: "#0ABFA3" }}
                >
                  {submitting
                    ? "Please wait…"
                    : mode === "login"
                      ? "Log in"
                      : "Create account"}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[12px] font-dm uppercase tracking-wider text-muted">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-background py-3 text-[15px] font-dm font-semibold text-body transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                <GoogleIcon />
                {googleLoading ? "Redirecting…" : "Continue with Google"}
              </button>

              <p className="text-[14px] font-dm text-muted text-center mt-7">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={handleSignUpClick}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Audit processing overlay ───────────────────────────── */}
      {waitingForAudit && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-card border border-white/10 bg-surface/90 p-10 shadow-2xl text-center backdrop-blur-2xl">
            <div className="flex justify-center mb-6">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <ArrowRight size={28} style={{ color: "#0ABFA3" }} className="animate-pulse" />
              </span>
            </div>
            <h3 className="font-syne text-[20px] font-bold text-body mb-2">Analysing your business</h3>
            <p className="text-[14px] font-dm text-muted leading-relaxed">
              We&apos;re running a full audit on your website — SEO, visibility, Google profile, and more.
              This takes about a minute.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Account type picker ────────────────────────── */}
      {showAccountTypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-card border border-white/10 bg-surface/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl">
            <p className="accent-bar mb-1 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
              Account type
            </p>
            <h3 className="font-syne text-[22px] font-bold text-body mb-2">
              Who&apos;s signing up?
            </h3>
            <p className="text-[14px] font-dm text-muted mb-7">
              Choose your account type. You can&apos;t change this later.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* Individual */}
              <button
                onClick={() => handleAccountTypePick("individual")}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                  <User2 size={22} className="text-muted group-hover:text-primary transition-colors" />
                </span>
                <span>
                  <span className="block font-syne text-[15px] font-bold text-body">Individual</span>
                  <span className="mt-1 block text-[12px] font-dm text-muted leading-relaxed">
                    Personal use or freelancer
                  </span>
                </span>
              </button>

              {/* Business */}
              <button
                onClick={() => handleAccountTypePick("business")}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                  <Building2 size={22} className="text-muted group-hover:text-primary transition-colors" />
                </span>
                <span>
                  <span className="block font-syne text-[15px] font-bold text-body">Business</span>
                  <span className="mt-1 block text-[12px] font-dm text-muted leading-relaxed">
                    Team, agency, or company
                  </span>
                </span>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-[13px] font-dm text-muted">
              <button
                onClick={() => setShowAccountTypeModal(false)}
                className="hover:text-body transition-colors"
              >
                Cancel
              </button>
              <span>·</span>
              <button
                onClick={() => { setShowAccountTypeModal(false); setMode("login"); }}
                className="text-primary font-semibold hover:underline"
              >
                Log in instead
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

function Field({
  icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  revealable = false,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  revealable?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputType = revealable && show ? "text" : type;

  return (
    <label className="block">
      <span className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2.5">
        {label}
      </span>
      <span className="relative block">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          {icon}
        </span>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={`w-full bg-background border border-border rounded-lg pl-11 ${
            revealable ? "pr-12" : "pr-3.5"
          } py-3 text-[15px] font-dm text-body placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors`}
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-body"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={show ? "off" : "on"}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
      </span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
