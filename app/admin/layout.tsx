import { redirect } from "next/navigation";
import { checkAdmin } from "@/lib/admin";
import AdminShell from "@/components/admin/AdminShell";
import NotAuthorized from "@/components/admin/NotAuthorized";

export const dynamic = "force-dynamic";

/**
 * Server-side admin guard for everything under /admin.
 * - Signed out      → redirect to /login (returns here after auth).
 * - Signed in, not admin → render the "Admins only" screen.
 * - Admin           → render the admin shell + page.
 *
 * Every /api/admin/* route re-checks admin independently (defense in depth).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const check = await checkAdmin();

  if (check.status === "unauthenticated") {
    redirect("/login?redirect=/admin");
  }

  if (check.status === "forbidden") {
    return <NotAuthorized email={check.email} />;
  }

  return <AdminShell email={check.email}>{children}</AdminShell>;
}
