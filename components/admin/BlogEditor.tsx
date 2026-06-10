"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Plus, RotateCcw, Save, Trash2, Upload, X } from "lucide-react";
import type { BlogPost, BlogPostInput } from "@/lib/types/admin";

function toDateInput(iso?: string): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  const d = new Date(iso);
  return Number.isNaN(+d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

type DraftData = {
  title: string; slug: string; slugTouched: boolean;
  category: string; tags: string[] | string; readTime: string;
  excerpt: string; content: string; publishedAt: string;
  featured: boolean; published: boolean; imageUrl: string | null;
  url: string;
  savedAt: string;
};

function parseDraftTags(t: string[] | string): string[] {
  if (Array.isArray(t)) return t;
  return t.split(",").map((s) => s.trim()).filter(Boolean);
}

function draftKey(post: BlogPost | null) {
  return post ? `akt-blog-draft-${post.id}` : "akt-blog-draft-new";
}

function loadDraft(post: BlogPost | null): DraftData | null {
  try {
    const raw = localStorage.getItem(draftKey(post));
    return raw ? (JSON.parse(raw) as DraftData) : null;
  } catch { return null; }
}

function clearDraft(post: BlogPost | null) {
  try { localStorage.removeItem(draftKey(post)); } catch {}
}

/** Create/edit modal for a blog post. Auto-saves to localStorage so Alt+Tab / close doesn't lose work. */
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
  // Restore from localStorage draft if one exists (new posts only restore always;
  // existing posts restore only if the draft is newer than the saved post).
  const draft = loadDraft(post);
  const useDraft = !!draft && (!post || new Date(draft.savedAt) > new Date(post.publishedAt ?? 0));

  const [title, setTitle] = useState(useDraft ? draft!.title : (post?.title ?? ""));
  const [slug, setSlug] = useState(useDraft ? draft!.slug : (post?.slug ?? ""));
  const [slugTouched, setSlugTouched] = useState(useDraft ? draft!.slugTouched : !!post);
  const [category, setCategory] = useState(useDraft ? draft!.category : (post?.category ?? ""));
  const [tags, setTags] = useState<string[]>(useDraft ? parseDraftTags(draft!.tags) : (post?.tags ?? []));
  const [readTime, setReadTime] = useState(useDraft ? draft!.readTime : (post?.readTime ?? ""));
  const [excerpt, setExcerpt] = useState(useDraft ? draft!.excerpt : (post?.excerpt ?? ""));
  const [content, setContent] = useState(useDraft ? draft!.content : (post?.content ?? ""));
  const [publishedAt, setPublishedAt] = useState(useDraft ? draft!.publishedAt : toDateInput(post?.publishedAt));
  const [featured, setFeatured] = useState(useDraft ? draft!.featured : (post?.featured ?? false));
  const [published, setPublished] = useState(useDraft ? draft!.published : (post?.published ?? true));
  const [imageUrl, setImageUrl] = useState<string | null>(useDraft ? draft!.imageUrl : (post?.imageUrl ?? null));
  const [url, setUrl] = useState(useDraft ? (draft!.url ?? "") : (post?.url ?? ""));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [draftRestored, setDraftRestored] = useState(useDraft);
  const fileRef = useRef<HTMLInputElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save to localStorage 800ms after any field change.
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      const data: DraftData = {
        title, slug, slugTouched, category, tags, readTime,
        excerpt, content, publishedAt, featured, published, imageUrl,
        url,
        savedAt: new Date().toISOString(),
      };
      try { localStorage.setItem(draftKey(post), JSON.stringify(data)); } catch {}
    }, 800);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [title, slug, slugTouched, category, tags, readTime, excerpt, content, publishedAt, featured, published, imageUrl, url, post]);

  const discardDraft = () => {
    clearDraft(post);
    setTitle(post?.title ?? "");
    setSlug(post?.slug ?? "");
    setSlugTouched(!!post);
    setCategory(post?.category ?? "");
    setTags(post?.tags ?? []);
    setReadTime(post?.readTime ?? "");
    setExcerpt(post?.excerpt ?? "");
    setContent(post?.content ?? "");
    setPublishedAt(toDateInput(post?.publishedAt));
    setFeatured(post?.featured ?? false);
    setPublished(post?.published ?? true);
    setImageUrl(post?.imageUrl ?? null);
    setUrl(post?.url ?? "");
    setDraftRestored(false);
  };

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
        tags,
        readTime: readTime.trim(),
        excerpt: excerpt.trim(),
        content,
        imageUrl,
        url: url.trim() || null,
        publishedAt: new Date(publishedAt).toISOString(),
        featured,
        published,
      });
      clearDraft(post); // saved successfully — wipe the draft
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

          {/* Draft-restored banner */}
          {draftRestored && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#0ABFA3]/30 bg-[#062B26] px-4 py-2.5">
              <p className="text-[12px] font-dm font-semibold text-[#0ABFA3]">
                ✦ Draft restored — your unsaved work is back.
              </p>
              <button
                type="button"
                onClick={discardDraft}
                className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-dm font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                <RotateCcw size={11} />
                Discard draft
              </button>
            </div>
          )}

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

          <FieldText
            label="URL"
            value={url}
            onChange={setUrl}
            placeholder="https://example.com/article"
            hint="External or reference URL saved with this post (optional)"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FieldText label="Category" value={category} onChange={setCategory} placeholder="AI & Automation" />
            <FieldText label="Read time" value={readTime} onChange={setReadTime} placeholder="8 min read" />
          </div>

          <TagInput tags={tags} onChange={setTags} />

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

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInput("");
  };

  return (
    <div>
      <span className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
        Tags
      </span>
      <div className="flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full border border-primary/60 px-2.5 py-0.5 text-[12px] font-dm font-semibold text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((_, j) => j !== i))}
              className="text-primary/50 transition-colors hover:text-primary"
              aria-label={`Remove ${tag}`}
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <div className="flex flex-1 items-center gap-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addTag(); }
              if (e.key === "Backspace" && !input && tags.length > 0)
                onChange(tags.slice(0, -1));
            }}
            placeholder={tags.length === 0 ? "Add a tag…" : ""}
            className="min-w-[80px] flex-1 bg-transparent text-[14px] font-dm text-body placeholder:text-muted/60 outline-none"
          />
          {input.trim() && (
            <button
              type="button"
              onClick={addTag}
              className="flex items-center justify-center rounded-full bg-primary/20 p-0.5 text-primary transition-colors hover:bg-primary/30"
            >
              <Plus size={12} />
            </button>
          )}
        </div>
      </div>
      <span className="mt-1.5 block text-[12px] font-dm text-muted">
        Press Enter or + to add a tag
      </span>
    </div>
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
