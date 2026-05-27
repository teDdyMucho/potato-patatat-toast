import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

/**
 * Shown when a signed-in user without the admin role hits /admin.
 * (Signed-out users are redirected to /login by the layout guard.)
 */
export default function NotAuthorized({ email }: { email: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative w-full max-w-md overflow-hidden rounded-card border border-border bg-surface p-10 text-center">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#0ABFA3]/15 blur-[90px]" />
        <div className="relative">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ background: "#073B34" }}
          >
            <ShieldAlert size={26} style={{ color: "#0ABFA3" }} strokeWidth={2} />
          </div>
          <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
            Access denied
          </p>
          <h1
            className="font-syne text-body"
            style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Admins only
          </h1>
          <p className="mt-3 text-[15px] font-dm leading-relaxed text-muted">
            You&apos;re signed in as{" "}
            <span className="font-semibold text-body">{email}</span>, which
            doesn&apos;t have admin access. Ask an existing admin to grant your
            account the <span className="text-primary">admin</span> role.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg py-3 text-[15px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#0ABFA3" }}
            >
              <ArrowLeft size={16} />
              Back to site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}
