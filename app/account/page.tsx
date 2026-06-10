"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";
import { createBrowserClient } from "@supabase/ssr";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Save,
  UserRound,
} from "lucide-react";

function makeSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  // Redirect to login if not authenticated once auth is ready.
  useEffect(() => {
    if (ready && !user) router.replace("/login?redirect=/account");
  }, [ready, user, router]);

  // Pre-fill name from auth context.
  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const supabase = makeSupabase();

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setNameLoading(true);
    setNameError("");
    setNameSuccess(false);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() },
      });
      if (error) throw error;
      setNameSuccess(true);
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (err) {
      setNameError(err instanceof Error ? err.message : "Failed to update name.");
    } finally {
      setNameLoading(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    setPwLoading(true);
    setPwError("");
    setPwSuccess(false);
    try {
      // Re-authenticate first with the current password.
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: user!.email,
        password: currentPassword,
      });
      if (signInErr) throw new Error("Current password is incorrect.");

      const { error: updateErr } = await supabase.auth.updateUser({ password: newPassword });
      if (updateErr) throw updateErr;

      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setPwLoading(false);
    }
  };

  if (!ready || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 size={28} className="animate-spin text-primary" />
      </main>
    );
  }

  return (
    <DashboardShell>
      <main className="min-h-screen bg-background pb-12 pt-5 sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">

          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <p className="accent-bar text-[12px] font-dm font-semibold uppercase tracking-widest text-muted mb-3">
              Account Settings
            </p>
            <h1
              className="font-syne text-body"
              style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Manage your account
            </h1>
            <p className="mt-2 font-dm text-[15px] text-muted">
              Update your display name or change your password.
            </p>
          </div>

          {/* Email (read-only) */}
          <div className="mb-4 sm:mb-6 rounded-card border border-border bg-[#101113] px-4 py-3 sm:px-5 sm:py-4 flex flex-wrap items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#062B26]">
              <Mail size={16} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted">Email</p>
              <p className="truncate text-[13px] sm:text-[14px] font-dm font-medium text-body">{user.email}</p>
            </div>
            <span className="text-[11px] font-dm text-muted/60">Cannot be changed</span>
          </div>

          {/* ── Update Name ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-4 sm:mb-6 rounded-card border border-border bg-[#101113] p-4 sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#062B26]">
                <UserRound size={16} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-syne text-[15px] font-bold text-body">Display Name</p>
                <p className="text-[12px] font-dm text-muted">How your name appears across the site</p>
              </div>
            </div>

            <form onSubmit={saveName} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
                  Full Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                  placeholder="Your full name"
                />
              </label>

              {nameError && (
                <p className="text-[13px] font-dm text-red-400" role="alert">{nameError}</p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="submit"
                  disabled={nameLoading || name.trim() === user.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-dm font-semibold text-white transition-opacity disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#0ABFA3,#089080)" }}
                >
                  {nameLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  Save Name
                </motion.button>
                {nameSuccess && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-[13px] font-dm font-semibold text-[#0ABFA3]"
                  >
                    <CheckCircle size={14} />
                    Saved!
                  </motion.span>
                )}
              </div>
            </form>
          </motion.section>

          {/* ── Change Password ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-card border border-border bg-[#101113] p-4 sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#062B26]">
                <Lock size={16} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-syne text-[15px] font-bold text-body">Change Password</p>
                <p className="text-[12px] font-dm text-muted">Must be at least 6 characters</p>
              </div>
            </div>

            <form onSubmit={changePassword} className="space-y-4">
              <PasswordField
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                onToggle={() => setShowCurrent((s) => !s)}
                autoComplete="current-password"
                placeholder="Enter current password"
              />
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                onToggle={() => setShowNew((s) => !s)}
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showNew}
                onToggle={() => setShowNew((s) => !s)}
                autoComplete="new-password"
                placeholder="Re-enter new password"
              />

              {pwError && (
                <p className="text-[13px] font-dm text-red-400" role="alert">{pwError}</p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="submit"
                  disabled={pwLoading || !currentPassword || !newPassword || !confirmPassword}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-dm font-semibold text-white transition-opacity disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#0ABFA3,#089080)" }}
                >
                  {pwLoading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                  Change Password
                </motion.button>
                {pwSuccess && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-[13px] font-dm font-semibold text-[#0ABFA3]"
                  >
                    <CheckCircle size={14} />
                    Password updated!
                  </motion.span>
                )}
              </div>
            </form>
          </motion.section>

        </div>
      </main>
    </DashboardShell>
  );
}

function PasswordField({
  label, value, onChange, show, onToggle, autoComplete, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="relative block">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-[14px] font-dm text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted transition-colors hover:text-body"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </span>
    </label>
  );
}
