"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  ImageOff,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import type { BlogPost, BlogPostInput } from "@/lib/types/admin";
import { slugify } from "@/lib/blog";
import BlogEditor from "@/components/admin/BlogEditor";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(+d) ? "—" : dateFmt.format(d);
};

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmPost, setConfirmPost] = useState<BlogPost | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blog", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setPosts(data.posts as BlogPost[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (input: BlogPostInput) => {
    const isEdit = !!editing;
    const url = isEdit ? `/api/admin/blog/${editing!.id}` : "/api/admin/blog";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Save failed.");
    const saved = data.post as BlogPost;
    setPosts((prev) =>
      isEdit ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev],
    );
    setEditing(null);
    setCreating(false);
  };

  const remove = async (post: BlogPost) => {
    setConfirmPost(post);
  };

  const confirmRemove = async () => {
    if (!confirmPost) return;
    const post = confirmPost;
    setConfirmPost(null);
    setDeletingId(post.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/content"
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-dm text-muted transition-colors hover:text-body"
        >
          <ArrowLeft size={14} /> Content
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              className="font-syne text-body"
              style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              Blog posts
            </h2>
            <p className="mt-2 text-[15px] font-dm text-muted">
              {loading ? "Loading…" : `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-[13px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
            >
              View blog <ExternalLink size={13} />
            </Link>
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2.5 text-[13px] font-dm font-semibold text-body transition-colors hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#0ABFA3" }}
            >
              <Plus size={15} /> New post
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-300/70">
              If a column is missing, run the latest migrations in order:{" "}
              <span className="font-mono">blog-posts.sql</span> →{" "}
              <span className="font-mono">blog-image.sql</span> →{" "}
              <span className="font-mono">blog-content.sql</span> (in{" "}
              <span className="font-mono">docs/sql/</span>). Also confirm{" "}
              <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> is set.
            </p>
          </div>
        </div>
      )}

      {/* List */}
      <div className="overflow-hidden rounded-card border border-border bg-surface">
        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-white/5" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="font-dm text-[14px] text-muted">No posts yet. Create your first one.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="hidden h-12 w-16 shrink-0 rounded-md object-cover sm:block"
                  />
                ) : (
                  <div className="hidden h-12 w-16 shrink-0 items-center justify-center rounded-md bg-white/5 sm:flex">
                    <ImageOff size={16} className="text-muted/40" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {p.featured && <Star size={13} className="shrink-0 text-[#0ABFA3]" fill="#0ABFA3" />}
                    <span className="truncate font-dm text-[14px] font-semibold text-body">{p.title}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-dm text-[12px] text-muted">
                    <span>{p.category || "—"}</span>
                    <span>·</span>
                    <span className="font-mono">/{p.slug}</span>
                    <span>·</span>
                    <span>{fmtDate(p.publishedAt)}</span>
                  </div>
                </div>

                <span
                  className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-dm font-semibold sm:inline-block ${
                    p.published ? "text-[#0ABFA3]" : "text-amber-300/90"
                  }`}
                  style={{ background: p.published ? "#062B26" : "rgba(245,158,11,0.12)" }}
                >
                  {p.published ? "Published" : "Draft"}
                </span>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => remove(p)}
                    disabled={deletingId === p.id}
                    className="inline-flex items-center justify-center rounded-md border border-border p-1.5 text-muted transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-40"
                    title="Delete"
                  >
                    {deletingId === p.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(creating || editing) && (
        <BlogEditor
          post={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={save}
          slugify={slugify}
        />
      )}

      {confirmPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setConfirmPost(null)}
        >
          <div
            className="w-full max-w-sm rounded-card border border-border bg-surface p-6 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                <Trash2 size={16} className="text-red-400" />
              </span>
              <h3 className="font-syne text-[17px] font-bold text-body">Delete post</h3>
            </div>
            <p className="mt-3 text-[14px] font-dm text-muted leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-body">&ldquo;{confirmPost.title}&rdquo;</span>?
              This can&apos;t be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setConfirmPost(null)}
                className="rounded-lg border border-border px-4 py-2 text-[13px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="rounded-lg bg-red-500/90 px-4 py-2 text-[13px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
