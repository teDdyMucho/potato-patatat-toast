"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
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
  const { user, ready, login, signup, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Already signed in? Skip straight to the destination.
  useEffect(() => {
    if (ready && user) router.replace(getRedirectTarget());
  }, [ready, user, router]);

  // Reflect status passed back via the URL (Google error, or email verified).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth") setError("Google sign-in failed. Please try again.");
    if (params.get("verified") === "1") setNotice("Your email is verified — you can now log in.");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const result =
      mode === "login"
        ? await login(email, password)
        : await signup(name, email, password);

    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // Sign-up that needs email verification: don't log in — prompt to check inbox.
    if (mode === "signup" && result.verificationSent) {
      setNotice(
        `We sent a verification link to ${email.trim()}. Click it to activate your account, then log in.`,
      );
      setMode("login");
      setPassword("");
      setConfirmPassword("");
      setSubmitting(false);
      return;
    }

    router.replace(getRedirectTarget());
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setNotice("");
    setConfirmPassword("");
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
              key={mode}
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
              <p className="accent-bar text-[13px] font-dm font-semibold text-muted uppercase tracking-widest mb-3">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </p>
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

                {error && (
                  <p className="text-[14px] font-dm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[16px] font-dm font-semibold text-white transition-colors disabled:opacity-50"
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
                      onClick={() => switchMode("signup")}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
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
