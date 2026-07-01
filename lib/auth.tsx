"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";

/**
 * Auth backed by Supabase Auth.
 *
 * - Email/password sign-up sends a verification email; the account stays
 *   inactive (no session) until the user clicks the link. Login is blocked
 *   until then.
 * - "Continue with Google" uses Supabase's Google provider (the email is
 *   already verified by Google).
 * - Sessions are managed by Supabase (stored in cookies by the browser client).
 */

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResult =
  | { ok: true; verificationSent?: boolean }
  | { ok: false; error: string };

export type SignupOptions = {
  accountType?: "individual" | "business";
  businessName?: string;
  websiteUrl?: string;
  businessCategory?: string;
};

type AuthContextValue = {
  user: User | null;
  /** Current user's role from `public.users` ('user' | 'admin' | 'staff'), or null when signed out. */
  role: string | null;
  /** Convenience flag for gating admin-only UI. */
  isAdmin: boolean;
  /** Convenience flag for gating staff-only UI. */
  isStaff: boolean;
  /** False until the initial session check completes. */
  ready: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (name: string, email: string, password: string, opts?: SignupOptions) => Promise<AuthResult>;
  loginWithGoogle: (next: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toUser(u: SupabaseUser | null | undefined): User | null {
  if (!u) return null;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (meta.full_name as string) ||
    (meta.name as string) ||
    (u.email ? u.email.split("@")[0] : "there");
  return { id: u.id, name, email: u.email ?? "" };
}

function makeClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null; // not configured — app still renders, auth disabled
  return createBrowserClient(url, anon);
}

const NOT_CONFIGURED =
  "Auth isn't configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.";

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(makeClient, []);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    let active = true;

    // Resolve the session user AND their role from `public.profiles`. RLS lets
    // a user read only their own row, so this returns null for signed-out users.
    const load = async (sUser: SupabaseUser | null) => {
      if (!active) return;
      setUser(toUser(sUser));
      if (sUser) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", sUser.id)
          .single();
        if (active) setRole((data?.role as string) ?? "user");
      } else {
        setRole(null);
      }
      if (active) setReady(true);
    };

    supabase.auth.getUser().then(({ data }) => load(data.user));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      load(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const login = useCallback<AuthContextValue["login"]>(
    async (email, password) => {
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) {
        if (error.code === "email_not_confirmed" || /confirm/i.test(error.message)) {
          return {
            ok: false,
            error: "Please verify your email first — check your inbox for the link.",
          };
        }
        return { ok: false, error: "Incorrect email or password." };
      }
      return { ok: true };
    },
    [supabase],
  );

  const signup = useCallback<AuthContextValue["signup"]>(
    async (name, email, password, opts) => {
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };

      // Create user via server route (admin client, email auto-confirmed — no verification email)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          accountType: opts?.accountType,
          businessName: opts?.businessName,
          websiteUrl: opts?.websiteUrl,
          businessCategory: opts?.businessCategory,
        }),
      });

      const json = await res.json();
      if (!res.ok) return { ok: false, error: json.error || "Signup failed." };

      // Auto sign-in immediately (no email verification needed)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signInError) return { ok: false, error: signInError.message };

      return { ok: true };
    },
    [supabase],
  );

  const loginWithGoogle = useCallback<AuthContextValue["loginWithGoogle"]>(
    async (next) => {
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true }; // browser redirects to Google on success
    },
    [supabase],
  );

  const logout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin: role === "admin",
        isStaff: role === "staff",
        ready,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
