"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Save, Trash2, Upload, X } from "lucide-react";
import type { BlogPost, BlogPostInput } from "@/lib/types/admin";

function toDateInput(iso?: string): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  const d = new Date(iso);
  return Number.isNaN(+d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

/** Create/edit modal for a blog post. */
export default function BlogEditor({
  post,
  onClose,
  onSave,
  slugify,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (input: BlogPostInput) => Promise<void>;
  slugify: (s: string) => string;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [category, setCategory] = useState(post?.category ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [readTime, setReadTime] = useState(post?.readTime ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [publishedAt, setPublishedAt] = useState(toDateInput(post?.publishedAt));
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [published, setPublished] = useState(post?.published ?? true);
  const [imageUrl, setImageUrl] = useState<string | null>(post?.imageUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed.");
      setImageUrl(data.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Auto-derive slug from title until the user edits it manually.
  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched, slugify]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        category: category.trim(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        readTime: readTime.trim(),
        excerpt: excerpt.trim(),
        content,
        imageUrl,
        publishedAt: new Date(publishedAt).toISOString(),
        featured,
        published,
      });
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Save failed.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 my-auto w-full max-w-2xl rounded-card border border-border bg-surface shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3
            className="font-syne text-body"
            style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            {post ? "Edit post" : "New post"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-body"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 px-6 py-5">
          {/* Cover image */}
          <div>
            <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
              Cover image
            </span>
            {imageUrl ? (
              <div className="group relative overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Cover preview" className="h-44 w-full object-cover" />
                <div className="absolute right-2 top-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1.5 text-[12px] font-dm font-semibold text-white backdrop-blur transition-colors hover:bg-black/85 disabled:opacity-50"
                  >
                    {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1.5 text-[12px] font-dm font-semibold text-white backdrop-blur transition-colors hover:text-red-300"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background text-muted transition-colors hover:border-primary/50 hover:text-body disabled:opacity-50"
              >
                {uploading ? <Loader2 size={22} className="animate-spin" /> : <ImageIcon size={22} />}
                <span className="text-[13px] font-dm font-semibold">
                  {uploading ? "Uploading…" : "Upload cover image"}
                </span>
                <span className="text-[11px] font-dm text-muted/70">JPG, PNG, WebP · max 5 MB</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={pickFile}
            />
          </div>

          <FieldText label="Title" value={title} onChange={setTitle} placeholder="Post title" autoFocus />

          <FieldText
            label="Slug"
            value={slug}
            onChange={(v) => {
              setSlugTouched(true);
              setSlug(v);
            }}
            placeholder="post-url-slug"
            mono
            hint={`Public URL: /blog/${slug || "…"}`}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FieldText label="Category" value={category} onChange={setCategory} placeholder="AI & Automation" />
            <FieldText label="Read time" value={readTime} onChange={setReadTime} placeholder="8 min read" />
          </div>

          <FieldText
            label="Tags"
            value={tags}
            onChange={setTags}
            placeholder="GoHighLevel, Automation"
            hint="Comma-separated"
          />

          <label className="block">
            <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
              Excerpt
            </span>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Short summary shown on the blog cards…"
              className="w-full resize-y rounded-lg border border-border bg-background px-3.5 py-3 text-[14px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
              Body
            </span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Write the full article here. Separate paragraphs with a blank line."
              className="w-full resize-y rounded-lg border border-border bg-background px-3.5 py-3 text-[14px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            <span className="mt-1.5 block text-[12px] font-dm text-muted">
              Shown on the post page. A blank line starts a new paragraph.
            </span>
          </label>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
                Published date
              </span>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] font-dm text-body transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </label>
            <div className="flex items-center gap-6 sm:pb-2.5">
              <Toggle label="Featured" checked={featured} onChange={setFeatured} />
              <Toggle label="Published" checked={published} onChange={setPublished} />
            </div>
          </div>

          {error && (
            <p className="text-[14px] font-dm text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2.5 text-[14px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-dm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "#0ABFA3" }}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {post ? "Save changes" : "Create post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldText({
  label,
  value,
  onChange,
  placeholder,
  hint,
  mono,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  mono?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-[14px] text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 ${
          mono ? "font-mono" : "font-dm"
        }`}
      />
      {hint && <span className="mt-1.5 block text-[12px] font-dm text-muted">{hint}</span>}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-3"
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-[#0ABFA3]" : "bg-white/15 group-hover:bg-white/25"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="text-[13px] font-dm font-semibold text-body">{label}</span>
    </button>
  );
}
