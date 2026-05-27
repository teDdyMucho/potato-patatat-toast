import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { UsageSummary } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = { tool: string; user_id: string | null; user_email: string | null; created_at: string };

/**
 * GET /api/admin/usage — aggregated AI tool usage for the dashboard.
 * Pulls recent rows from `tool_usage` (service-role) and aggregates in JS.
 * Admin-only.
 */
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();

  // Cap the scan; revisit with SQL aggregation / pagination if volume grows.
  const { data, error } = await admin
    .from("tool_usage")
    .select("tool, user_id, user_email, created_at")
    .order("created_at", { ascending: false })
    .limit(10000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []) as Row[];

  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const perToolMap = new Map<string, number>();
  const perUserMap = new Map<string, number>();
  const uniqueUsers = new Set<string>();
  let sessionsToday = 0;
  let sessions7d = 0;

  for (const r of rows) {
    perToolMap.set(r.tool, (perToolMap.get(r.tool) ?? 0) + 1);

    const ts = +new Date(r.created_at);
    if (ts >= +startOfToday) sessionsToday++;
    if (ts >= sevenDaysAgo) sessions7d++;

    if (r.user_id) uniqueUsers.add(r.user_id);
    const key = r.user_email || r.user_id;
    if (key) perUserMap.set(key, (perUserMap.get(key) ?? 0) + 1);
  }

  const summary: UsageSummary = {
    totalSessions: rows.length,
    sessionsToday,
    sessions7d,
    uniqueUsers: uniqueUsers.size,
    perTool: Array.from(perToolMap.entries())
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count),
    topUsers: Array.from(perUserMap.entries())
      .map(([email, count]) => ({ email, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    recent: rows.slice(0, 12).map((r) => ({
      tool: r.tool,
      email: r.user_email,
      createdAt: r.created_at,
    })),
  };

  return NextResponse.json(summary);
}
