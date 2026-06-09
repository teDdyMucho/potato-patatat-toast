import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy that fetches a Supabase Storage file server-side and streams it back
 * with Content-Disposition: inline.  This strips Supabase's X-Frame-Options
 * header so the browser can embed the file (PDF / image) in an <object> or
 * <iframe> on the same page.
 *
 * Security: we only allow URLs that start with our own Supabase project URL,
 * so this cannot be abused as an open proxy.  The storage bucket is already
 * public, so there is no data that a public URL would not expose anyway.
 */
export async function GET(req: NextRequest) {
  const fileUrl = req.nextUrl.searchParams.get("url");

  if (!fileUrl) {
    return new NextResponse("Missing url param", { status: 400 });
  }

  // Guard: only forward requests to our own Supabase project storage
  const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!supabaseHost || !fileUrl.startsWith(supabaseHost)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(fileUrl, { cache: "no-store" });
  } catch {
    return new NextResponse("Failed to reach storage", { status: 502 });
  }

  if (!upstream.ok) {
    return new NextResponse("File not found", { status: upstream.status });
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      // Tell the browser to display inline rather than download
      "Content-Disposition": `inline; filename="${fileUrl.split("/").pop()}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
