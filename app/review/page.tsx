"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Loader2,
  Paperclip,
  Pencil,
  Send,
  Trash2,
  Upload,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";

const PAGE_PATH = "/review";

/* ─── Types ─── */
type Project = {
  id: string;
  connection_id: string;
  worker_id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  status: "pending" | "approved" | "declined";
  client_feedback: string | null;
  created_at: string;
  updated_at: string;
};

type Connection = {
  id: string;
  worker_id: string;
  worker_email: string;
  client_email: string;
  client_id: string | null;
  worker_label: string | null;
  client_label: string | null;
  created_at: string;
  projects: Project[];
};

type FileEntry = { url: string; name: string; type?: string };

type Reply = {
  id: string;
  project_id: string;
  user_id: string;
  user_email: string;
  sender_role: "worker" | "client";
  message: string;
  created_at: string;
};

function formatTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString();
}

function parseFiles(project: Project): FileEntry[] {
  if (!project.file_url) return [];
  try {
    const parsed = JSON.parse(project.file_url);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [{ url: project.file_url, name: project.file_name ?? "View file" }];
}

/* ─── Root page ─── */
export default function ReviewPage() {
  const router = useRouter();
  const { user, ready, isStaff, isAdmin } = useAuth();

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(PAGE_PATH)}`);
    }
  }, [ready, user, router]);

  if (!ready || !user) return null;

  return (
    <DashboardShell noScroll>
      <main className="flex flex-1 flex-col overflow-hidden px-4 pt-8 pb-4 sm:px-6 lg:px-10">
        {isStaff || isAdmin ? <WorkerView /> : <ClientView />}
      </main>
    </DashboardShell>
  );
}

/* ══════════════════════════════════════
   WORKER VIEW  (staff / admin)
══════════════════════════════════════ */
function WorkerView() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  // Add-client modal
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [newClientEmail, setNewClientEmail] = useState("");
  const [addingClient, setAddingClient] = useState(false);
  const [addClientError, setAddClientError] = useState("");

  // Upload-project modal
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadConnId, setUploadConnId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [uploadingProject, setUploadingProject] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Rename
  const [renamingConnId, setRenamingConnId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Preview
  const [previewFile, setPreviewFile] = useState<{ files: FileEntry[]; index: number } | null>(null);

  // Replies
  const [replyMap, setReplyMap] = useState<Record<string, Reply[]>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [sendingReply, setSendingReply] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const toggleThread = (id: string) => setExpandedProjects((prev) => {
    const s = new Set(prev);
    if (s.has(id)) { s.delete(id); } else { s.add(id); }
    return s;
  });

  const fetchConnections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/project-review/connections");
      if (res.ok) {
        const data = await res.json();
        const conns: Connection[] = data.workerConnections ?? [];
        setConnections(conns);
        if (conns.length > 0) setSelected((s) => s ?? conns[0].id);
      }
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  const fetchReplies = useCallback(async (connectionId: string) => {
    try {
      const res = await fetch(`/api/project-review/replies?connectionId=${connectionId}`);
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, Reply[]> = {};
        for (const reply of (data.replies ?? []) as Reply[]) {
          if (!map[reply.project_id]) map[reply.project_id] = [];
          map[reply.project_id].push(reply);
        }
        setReplyMap(map);
      }
    } catch {}
  }, []);

  useEffect(() => { if (selected) fetchReplies(selected); }, [selected, fetchReplies]);

  const handleSendReply = async (projectId: string, senderRole: "worker" | "client") => {
    const message = replyInputMap[projectId]?.trim();
    if (!message) return;
    setSendingReply(projectId);
    try {
      const res = await fetch("/api/project-review/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, message, senderRole }),
      });
      if (res.ok) {
        const { reply } = await res.json();
        setReplyMap((prev) => ({ ...prev, [projectId]: [...(prev[projectId] ?? []), reply] }));
        setReplyInputMap((prev) => ({ ...prev, [projectId]: "" }));
      }
    } catch {}
    finally { setSendingReply(null); }
  };

  const handleAddClient = async () => {
    if (!newClientEmail.trim()) return;
    setAddingClient(true);
    setAddClientError("");
    try {
      const res = await fetch("/api/project-review/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientEmail: newClientEmail.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setConnections((prev) => [data.connection, ...prev]);
        setSelected(data.connection.id);
        setAddClientOpen(false);
        setNewClientEmail("");
      } else {
        setAddClientError(data.error || "Failed to add client");
      }
    } catch { setAddClientError("Something went wrong."); }
    finally { setAddingClient(false); }
  };

  const handleUploadProject = async () => {
    if (!projectTitle.trim() || !uploadConnId) return;
    setUploadingProject(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("connectionId", uploadConnId);
      fd.append("title", projectTitle.trim());
      fd.append("description", projectDesc.trim());
      fd.append("fileCount", String(projectFiles.length));
      projectFiles.forEach((f, i) => fd.append(`file_${i}`, f));
      const res = await fetch("/api/project-review/projects", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setUploadOpen(false);
        setProjectTitle(""); setProjectDesc(""); setProjectFiles([]);
        setConnections((prev) =>
          prev.map((c) =>
            c.id === uploadConnId ? { ...c, projects: [data.project, ...c.projects] } : c,
          ),
        );
      } else { setUploadError(data.error || "Failed to upload"); }
    } catch { setUploadError("Something went wrong."); }
    finally { setUploadingProject(false); }
  };

  const deleteProject = async (projectId: string) => {
    setDeletingId(projectId); setConfirmDeleteId(null);
    try {
      await fetch(`/api/project-review/projects/${projectId}`, { method: "DELETE" });
      setConnections((prev) =>
        prev.map((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== projectId) })),
      );
    } finally { setDeletingId(null); }
  };

  const saveRename = async (connId: string) => {
    const trimmed = renameValue.trim();
    setRenamingConnId(null);
    if (!trimmed) return;
    setConnections((prev) => prev.map((c) => (c.id === connId ? { ...c, worker_label: trimmed } : c)));
    try {
      await fetch(`/api/project-review/connections/${connId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: trimmed, role: "worker" }),
      });
    } catch {}
  };

  const activeConn = connections.find((c) => c.id === selected) ?? null;

  return (
    <>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 flex items-center gap-4"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
          <Briefcase size={22} style={{ color: "#0ABFA3" }} />
        </div>
        <div>
          <h1 className="font-syne text-[24px] font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>
            Project Review
          </h1>
          <p className="mt-0.5 text-[13px] font-dm text-muted">
            Submit projects to clients and track their status.
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 size={28} className="animate-spin text-muted" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-1 min-h-0 gap-5"
        >
          {/* Sidebar */}
          <aside className="relative flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
            <Corners />
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Users size={14} style={{ color: "#0ABFA3" }} />
                <span className="text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Clients</span>
                {connections.length > 0 && (
                  <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "#0ABFA3" }}>
                    {connections.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => { setAddClientError(""); setNewClientEmail(""); setAddClientOpen(true); }}
                title="Add Client"
                className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[#0ABFA3]/20"
                style={{ color: "#0ABFA3" }}
              >
                <UserPlus size={13} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {connections.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                  <Users size={22} className="mb-2 text-muted/40" />
                  <p className="text-[11px] font-dm text-muted">No clients yet.</p>
                  <button
                    onClick={() => { setAddClientError(""); setNewClientEmail(""); setAddClientOpen(true); }}
                    className="mt-2 text-[11px] font-dm font-semibold text-[#0ABFA3] hover:underline"
                  >+ Add one</button>
                </div>
              ) : (
                connections.map((conn) => {
                  const isActive = selected === conn.id;
                  const isRenaming = renamingConnId === conn.id;
                  const pending = conn.projects.filter((p) => p.status === "pending").length;
                  const approved = conn.projects.filter((p) => p.status === "approved").length;
                  const declined = conn.projects.filter((p) => p.status === "declined").length;
                  const displayName = conn.worker_label || conn.client_email;
                  return (
                    <div
                      key={conn.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => { if (!isRenaming) setSelected(conn.id); }}
                      onKeyDown={(e) => { if (e.key === "Enter" && !isRenaming) setSelected(conn.id); }}
                      className={`group relative w-full cursor-pointer px-4 py-3 transition-colors ${isActive ? "bg-[#0ABFA3]/10" : "hover:bg-white/[0.03]"}`}
                    >
                      {isActive && <span className="absolute inset-y-0 left-0 w-0.5 rounded-r" style={{ background: "#0ABFA3" }} />}
                      {isRenaming ? (
                        <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(10,191,163,0.2)" }}>
                            <Users size={13} style={{ color: "#0ABFA3" }} />
                          </div>
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") saveRename(conn.id); if (e.key === "Escape") setRenamingConnId(null); }}
                            onBlur={() => saveRename(conn.id)}
                            className="flex-1 min-w-0 rounded px-2 py-1 text-[12px] font-dm bg-black/60 border border-[#0ABFA3]/50 text-body outline-none focus:border-[#0ABFA3]"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: isActive ? "rgba(10,191,163,0.2)" : "#0d1210" }}>
                            <Users size={13} style={{ color: isActive ? "#0ABFA3" : "#A1A1AA" }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 min-w-0">
                              <p className={`truncate flex-1 text-[12px] font-dm font-semibold ${isActive ? "text-[#0ABFA3]" : "text-body"}`}>{displayName}</p>
                              <button
                                onClick={(e) => { e.stopPropagation(); setRenamingConnId(conn.id); setRenameValue(displayName); }}
                                title="Rename"
                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#0ABFA3]/20"
                              >
                                <Pencil size={9} style={{ color: "#0ABFA3" }} />
                              </button>
                            </div>
                            {conn.worker_label && <p className="truncate text-[10px] font-dm text-muted">{conn.client_email}</p>}
                            <div className="mt-0.5 flex items-center gap-2">
                              {conn.projects.length === 0 ? (
                                <span className="text-[10px] font-dm text-muted">No projects</span>
                              ) : (
                                <>
                                  {pending > 0 && <span className="text-[10px] font-dm" style={{ color: "#F59E0B" }}>{pending} pending</span>}
                                  {approved > 0 && <span className="text-[10px] font-dm" style={{ color: "#10B981" }}>{approved} ✓</span>}
                                  {declined > 0 && <span className="text-[10px] font-dm" style={{ color: "#EF4444" }}>{declined} ✗</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {connections.length > 0 && (
              <div className="border-t border-border p-3">
                <button
                  onClick={() => { setAddClientError(""); setNewClientEmail(""); setAddClientOpen(true); }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#155E53]/60 py-2 text-[12px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10"
                >
                  <UserPlus size={13} /> Add Client
                </button>
              </div>
            )}
          </aside>

          {/* Main content */}
          <div className="flex flex-1 flex-col overflow-y-auto pr-1">
            {!activeConn ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 text-center">
                <Users size={28} className="mb-3 text-muted/40" />
                <p className="text-[14px] font-dm font-semibold text-body">Select a client</p>
                <p className="mt-1 text-[13px] font-dm text-muted">Choose a client from the sidebar, or add a new one.</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-dm font-semibold uppercase tracking-wider text-muted">Client</p>
                    <p className="mt-0.5 font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
                      {activeConn.worker_label || activeConn.client_email}
                    </p>
                    {activeConn.worker_label && <p className="mt-0.5 text-[12px] font-dm text-muted">{activeConn.client_email}</p>}
                  </div>
                  <button
                    onClick={() => { setUploadConnId(activeConn.id); setProjectTitle(""); setProjectDesc(""); setProjectFiles([]); setUploadError(""); setUploadOpen(true); }}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#0ABFA3" }}
                  >
                    <Upload size={14} /> Upload Project
                  </button>
                </div>

                {activeConn.projects.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 py-16 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
                      <Upload size={20} style={{ color: "#0ABFA3" }} />
                    </div>
                    <p className="text-[14px] font-dm font-semibold text-body">No projects uploaded yet</p>
                    <p className="mt-1 text-[13px] font-dm text-muted">Click &quot;Upload Project&quot; to submit work for this client.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeConn.projects.map((p) => (
                      <div key={p.id} className="relative overflow-hidden rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
                        <Corners />
                        {/* Card header */}
                        <div className="p-5">
                          <div className="mb-1 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "#062B26" }}>
                                <FileText size={16} style={{ color: "#0ABFA3" }} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-syne text-[15px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>{p.title}</p>
                                  <StatusPill status={p.status} />
                                </div>
                                {p.description && <p className="mt-1 text-[12px] font-dm text-muted leading-relaxed">{p.description}</p>}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {confirmDeleteId === p.id ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] font-dm text-muted">Delete?</span>
                                  <button onClick={() => deleteProject(p.id)} className="rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[11px] font-dm font-semibold text-red-400 hover:bg-red-500/20">Yes</button>
                                  <button onClick={() => setConfirmDeleteId(null)} className="rounded-lg border border-border px-2.5 py-1 text-[11px] font-dm font-semibold text-muted hover:text-body">No</button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  disabled={deletingId === p.id}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
                                >
                                  {deletingId === p.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                </button>
                              )}
                            </div>
                          </div>
                          {parseFiles(p).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {parseFiles(p).map((f, fi) => (
                                <button key={fi} onClick={() => setPreviewFile({ files: parseFiles(p), index: fi })} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-black/30 px-2.5 py-1.5 text-[11px] font-dm text-muted transition-colors hover:border-[#0ABFA3]/50 hover:text-[#0ABFA3]">
                                  <Paperclip size={10} />{f.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Feedback thread — visible once client has reviewed */}
                        {p.status !== "pending" && (
                          <div className="border-t border-white/[0.06] bg-black/20">
                            {/* Always-visible: client feedback + expand toggle */}
                            <div className="flex items-start gap-3 px-5 pt-4 pb-3">
                              <div className="flex min-w-0 flex-1 gap-2.5">
                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[9px] font-bold text-amber-400">C</div>
                                <div className="min-w-0 flex-1">
                                  <p className="mb-1 text-[10px] font-dm font-semibold text-amber-400">Client</p>
                                  {p.client_feedback ? (
                                    <div className="rounded-xl rounded-tl-none border border-border bg-black/40 px-3 py-2.5">
                                      <p className="text-[12px] font-dm leading-relaxed text-body">{p.client_feedback}</p>
                                    </div>
                                  ) : (
                                    <p className="text-[11px] font-dm italic text-muted">No feedback left</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => toggleThread(p.id)}
                                className="mt-5 flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-dm text-muted transition-colors hover:border-[#0ABFA3]/40 hover:text-[#0ABFA3]"
                              >
                                {(replyMap[p.id]?.length ?? 0) > 0 && (
                                  <span className="font-semibold">{replyMap[p.id].length}</span>
                                )}
                                <ChevronDown size={12} className={`transition-transform duration-200 ${expandedProjects.has(p.id) ? "rotate-180" : ""}`} />
                              </button>
                            </div>

                            {/* Expanded: replies + reply input */}
                            {expandedProjects.has(p.id) && (
                              <>
                                {(replyMap[p.id] ?? []).length > 0 && (
                                  <div className="space-y-3 px-5 pb-3">
                                    {(replyMap[p.id] ?? []).map((reply) => (
                                      <div key={reply.id} className="flex gap-2.5">
                                        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${reply.sender_role === "worker" ? "bg-[#0ABFA3]/20 text-[#0ABFA3]" : "bg-amber-500/20 text-amber-400"}`}>
                                          {reply.sender_role === "worker" ? "W" : "C"}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="mb-1 flex items-center justify-between gap-2">
                                            <span className={`text-[10px] font-dm font-semibold ${reply.sender_role === "worker" ? "text-[#0ABFA3]" : "text-amber-400"}`}>
                                              {reply.sender_role === "worker" ? "You" : "Client"}
                                            </span>
                                            <span className="text-[10px] font-dm text-muted">{formatTime(reply.created_at)}</span>
                                          </div>
                                          <div className="rounded-xl rounded-tl-none border border-border bg-black/40 px-3 py-2.5">
                                            <p className="text-[12px] font-dm leading-relaxed text-body">{reply.message}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 p-3 pt-0">
                                  <input
                                    type="text"
                                    value={replyInputMap[p.id] ?? ""}
                                    onChange={(e) => setReplyInputMap((prev) => ({ ...prev, [p.id]: e.target.value }))}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSendReply(p.id, "worker"); } }}
                                    placeholder="Reply to client…"
                                    className="flex-1 rounded-xl border border-border bg-black/40 px-3.5 py-2.5 text-[12px] font-dm text-body placeholder:text-muted/50 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20"
                                  />
                                  <button
                                    onClick={() => handleSendReply(p.id, "worker")}
                                    disabled={sendingReply === p.id || !(replyInputMap[p.id]?.trim())}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-90 disabled:opacity-35"
                                    style={{ background: "#0ABFA3" }}
                                  >
                                    {sendingReply === p.id ? <Loader2 size={14} className="animate-spin text-white" /> : <Send size={14} className="text-white" />}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {previewFile && (
          <FilePreviewModal files={previewFile.files} initialIndex={previewFile.index} onClose={() => setPreviewFile(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addClientOpen && (
          <Modal onClose={() => setAddClientOpen(false)} title="Add Client">
            <p className="mb-4 text-[13px] font-dm text-muted">Enter the email of the client. They must already have an account.</p>
            <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Client Email</label>
            <input
              type="email"
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddClient()}
              placeholder="client@example.com"
              autoFocus
              className="w-full rounded-xl border border-border bg-black/40 px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
            />
            {addClientError && (
              <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] font-dm text-amber-200/90">{addClientError}</p>
            )}
            <button
              onClick={handleAddClient}
              disabled={addingClient || !newClientEmail.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-dm font-semibold text-white disabled:opacity-50"
              style={{ background: "#0ABFA3" }}
            >
              {addingClient ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
              {addingClient ? "Connecting…" : "Add Client"}
            </button>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploadOpen && (
          <Modal onClose={() => setUploadOpen(false)} title="Upload Project">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Project Title *</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Website Redesign v2"
                  autoFocus
                  className="w-full rounded-xl border border-border bg-black/40 px-4 py-3 text-[14px] font-dm text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Description</label>
                <textarea
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Brief description of the project…"
                  className="w-full resize-none rounded-xl border border-border bg-black/40 p-4 text-[14px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Attachments (optional)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-black/30 py-5 text-center transition-colors hover:border-[#0ABFA3]/50"
                >
                  <Upload size={20} className="mb-2 text-muted" />
                  <p className="text-[13px] font-dm font-semibold text-body">Click to add files</p>
                  <p className="mt-0.5 text-[11px] font-dm text-muted">PDF, images, docs — multiple allowed</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []);
                    setProjectFiles((prev) => {
                      const names = new Set(prev.map((f) => f.name));
                      return [...prev, ...picked.filter((f) => !names.has(f.name))];
                    });
                    e.target.value = "";
                  }}
                />
                {projectFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {projectFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-black/30 px-3 py-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <Paperclip size={12} style={{ color: "#0ABFA3" }} className="shrink-0" />
                          <span className="truncate text-[12px] font-dm text-body">{f.name}</span>
                          <span className="shrink-0 text-[10px] font-dm text-muted">{(f.size / 1024).toFixed(0)} KB</span>
                        </div>
                        <button onClick={() => setProjectFiles((prev) => prev.filter((_, idx) => idx !== i))} className="shrink-0 text-muted hover:text-red-400">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {uploadError && <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] font-dm text-amber-200/90">{uploadError}</p>}
              <button
                onClick={handleUploadProject}
                disabled={uploadingProject || !projectTitle.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-dm font-semibold text-white disabled:opacity-50"
                style={{ background: "#0ABFA3" }}
              >
                {uploadingProject ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploadingProject ? "Uploading…" : "Submit Project"}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════
   CLIENT VIEW  (regular users)
══════════════════════════════════════ */
function ClientView() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [reviewingProjectId, setReviewingProjectId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});
  const [previewFile, setPreviewFile] = useState<{ files: FileEntry[]; index: number } | null>(null);
  const [renamingConnId, setRenamingConnId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [replyMap, setReplyMap] = useState<Record<string, Reply[]>>({});
  const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({});
  const [sendingReply, setSendingReply] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const toggleThread = (id: string) => setExpandedProjects((prev) => {
    const s = new Set(prev);
    if (s.has(id)) { s.delete(id); } else { s.add(id); }
    return s;
  });

  const fetchConnections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/project-review/connections");
      if (res.ok) {
        const data = await res.json();
        const conns: Connection[] = data.clientConnections ?? [];
        setConnections(conns);
        if (conns.length > 0) setSelected((s) => s ?? conns[0].id);
      }
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  const fetchReplies = useCallback(async (connectionId: string) => {
    try {
      const res = await fetch(`/api/project-review/replies?connectionId=${connectionId}`);
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, Reply[]> = {};
        for (const reply of (data.replies ?? []) as Reply[]) {
          if (!map[reply.project_id]) map[reply.project_id] = [];
          map[reply.project_id].push(reply);
        }
        setReplyMap(map);
      }
    } catch {}
  }, []);

  useEffect(() => { if (selected) fetchReplies(selected); }, [selected, fetchReplies]);

  const handleSendReply = async (projectId: string, senderRole: "worker" | "client") => {
    const message = replyInputMap[projectId]?.trim();
    if (!message) return;
    setSendingReply(projectId);
    try {
      const res = await fetch("/api/project-review/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, message, senderRole }),
      });
      if (res.ok) {
        const { reply } = await res.json();
        setReplyMap((prev) => ({ ...prev, [projectId]: [...(prev[projectId] ?? []), reply] }));
        setReplyInputMap((prev) => ({ ...prev, [projectId]: "" }));
      }
    } catch {}
    finally { setSendingReply(null); }
  };

  const handleReview = async (projectId: string, status: "approved" | "declined") => {
    setReviewingProjectId(projectId);
    try {
      const res = await fetch(`/api/project-review/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, feedback: feedbackMap[projectId] ?? "" }),
      });
      if (res.ok) {
        const { project: updated } = await res.json();
        setConnections((prev) =>
          prev.map((c) => ({ ...c, projects: c.projects.map((p) => (p.id === projectId ? { ...p, ...updated } : p)) })),
        );
        setFeedbackMap((prev) => { const next = { ...prev }; delete next[projectId]; return next; });
      }
    } catch {}
    finally { setReviewingProjectId(null); }
  };

  const saveRename = async (connId: string) => {
    const trimmed = renameValue.trim();
    setRenamingConnId(null);
    if (!trimmed) return;
    setConnections((prev) => prev.map((c) => (c.id === connId ? { ...c, client_label: trimmed } : c)));
    try {
      await fetch(`/api/project-review/connections/${connId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: trimmed, role: "client" }),
      });
    } catch {}
  };

  const activeConn = connections.find((c) => c.id === selected) ?? null;
  const totalPending = connections.reduce((sum, c) => sum + c.projects.filter((p) => p.status === "pending").length, 0);

  return (
    <>
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-6 flex items-start justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
            <Briefcase size={22} style={{ color: "#0ABFA3" }} />
          </div>
          <div>
            <h1 className="font-syne text-[24px] font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>Project Review</h1>
            <p className="mt-0.5 text-[13px] font-dm text-muted">Review and approve projects submitted by your workers.</p>
          </div>
        </div>
        {totalPending > 0 && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-dm font-semibold" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)" }}>
            <Clock size={12} />{totalPending} pending
          </span>
        )}
      </motion.div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 size={28} className="animate-spin text-muted" />
        </div>
      ) : connections.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 py-24 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
            <Briefcase size={24} style={{ color: "#0ABFA3" }} />
          </div>
          <p className="text-[15px] font-dm font-semibold text-body">No projects assigned yet</p>
          <p className="mt-1 max-w-xs text-[13px] font-dm text-muted">You&apos;ll see projects here once a staff member tags you as a client and submits work for your review.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 min-h-0 gap-5">
          {/* Sidebar */}
          <aside className="relative flex w-64 shrink-0 flex-col rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
            <Corners />
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Briefcase size={14} style={{ color: "#0ABFA3" }} />
              <span className="text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">Workers</span>
              <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "#0ABFA3" }}>{connections.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {connections.map((conn) => {
                const isActive = selected === conn.id;
                const isRenaming = renamingConnId === conn.id;
                const pending = conn.projects.filter((p) => p.status === "pending").length;
                const displayName = conn.client_label || conn.worker_email;
                return (
                  <div
                    key={conn.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => { if (!isRenaming) setSelected(conn.id); }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !isRenaming) setSelected(conn.id); }}
                    className={`group relative w-full cursor-pointer px-4 py-3 transition-colors ${isActive ? "bg-[#0ABFA3]/10" : "hover:bg-white/[0.03]"}`}
                  >
                    {isActive && <span className="absolute inset-y-0 left-0 w-0.5 rounded-r" style={{ background: "#0ABFA3" }} />}
                    {isRenaming ? (
                      <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(10,191,163,0.2)" }}>
                          <Users size={13} style={{ color: "#0ABFA3" }} />
                        </div>
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") saveRename(conn.id); if (e.key === "Escape") setRenamingConnId(null); }}
                          onBlur={() => saveRename(conn.id)}
                          className="flex-1 min-w-0 rounded px-2 py-1 text-[12px] font-dm bg-black/60 border border-[#0ABFA3]/50 text-body outline-none focus:border-[#0ABFA3]"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md" style={{ background: isActive ? "rgba(10,191,163,0.2)" : "#0d1210" }}>
                          <Users size={13} style={{ color: isActive ? "#0ABFA3" : "#A1A1AA" }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1 min-w-0">
                            <p className={`truncate flex-1 text-[12px] font-dm font-semibold ${isActive ? "text-[#0ABFA3]" : "text-body"}`}>{displayName}</p>
                            <button onClick={(e) => { e.stopPropagation(); setRenamingConnId(conn.id); setRenameValue(displayName); }} title="Rename" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#0ABFA3]/20">
                              <Pencil size={9} style={{ color: "#0ABFA3" }} />
                            </button>
                          </div>
                          {conn.client_label && <p className="truncate text-[10px] font-dm text-muted">{conn.worker_email}</p>}
                          <p className="mt-0.5 text-[10px] font-dm text-muted">
                            {conn.projects.length === 0 ? "No projects" : `${conn.projects.length} project${conn.projects.length !== 1 ? "s" : ""}${pending > 0 ? ` · ${pending} pending` : ""}`}
                          </p>
                        </div>
                        {pending > 0 && <span className="ml-auto inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "#F59E0B" }}>{pending}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex flex-1 flex-col overflow-y-auto pr-1">
            {!activeConn ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 text-center">
                <Users size={28} className="mb-3 text-muted/40" />
                <p className="text-[14px] font-dm font-semibold text-body">Select a worker</p>
                <p className="mt-1 text-[13px] font-dm text-muted">Choose a worker from the sidebar to review their projects.</p>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <p className="text-[11px] font-dm font-semibold uppercase tracking-wider text-muted">Worker</p>
                  <p className="mt-0.5 font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
                    {activeConn.client_label || activeConn.worker_email}
                  </p>
                  {activeConn.client_label && <p className="mt-0.5 text-[12px] font-dm text-muted">{activeConn.worker_email}</p>}
                </div>
                {activeConn.projects.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 py-16 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#062B26" }}>
                      <FileText size={20} style={{ color: "#0ABFA3" }} />
                    </div>
                    <p className="text-[14px] font-dm font-semibold text-body">No projects submitted yet</p>
                    <p className="mt-1 text-[13px] font-dm text-muted">This worker hasn&apos;t uploaded any projects yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeConn.projects.map((project) => {
                      const isReviewing = reviewingProjectId === project.id;
                      const localFeedback = feedbackMap[project.id] ?? "";
                      return (
                        <div key={project.id} className="relative rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 p-5 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
                          <Corners />
                          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "#062B26" }}>
                                <FileText size={14} style={{ color: "#0ABFA3" }} />
                              </div>
                              <div className="min-w-0">
                                <p className="font-syne text-[16px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>{project.title}</p>
                                {project.description && <p className="mt-1 text-[13px] font-dm leading-relaxed text-muted">{project.description}</p>}
                              </div>
                            </div>
                            <StatusPill status={project.status} />
                          </div>
                          {parseFiles(project).length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                              {parseFiles(project).map((f, fi) => (
                                <button key={fi} onClick={() => setPreviewFile({ files: parseFiles(project), index: fi })} className="inline-flex items-center gap-2 rounded-lg border border-border bg-black/40 px-3 py-2 text-[12px] font-dm font-semibold text-muted transition-colors hover:border-[#0ABFA3]/50 hover:text-[#0ABFA3]">
                                  <Paperclip size={12} />{f.name}
                                </button>
                              ))}
                            </div>
                          )}
                          {project.status === "pending" && (
                            <div className="mt-3 space-y-3 border-t border-border pt-4">
                              <textarea
                                rows={2}
                                value={localFeedback}
                                onChange={(e) => setFeedbackMap((prev) => ({ ...prev, [project.id]: e.target.value }))}
                                placeholder="Leave feedback (optional)…"
                                className="w-full resize-none rounded-xl border border-border bg-black/40 p-3 text-[13px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
                              />
                              <div className="flex gap-2.5">
                                <button onClick={() => handleReview(project.id, "approved")} disabled={isReviewing} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#0ABFA3]/40 py-2.5 text-[13px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10 disabled:opacity-50">
                                  {isReviewing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={15} />} Approve
                                </button>
                                <button onClick={() => handleReview(project.id, "declined")} disabled={isReviewing} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-[13px] font-dm font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50">
                                  {isReviewing ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={15} />} Decline
                                </button>
                              </div>
                            </div>
                          )}
                          {project.status !== "pending" && (
                            <div className="mt-4 border-t border-white/[0.06] pt-4">
                              {/* Always-visible: your feedback + expand toggle */}
                              <div className="flex items-start gap-3">
                                <div className="flex min-w-0 flex-1 gap-2.5">
                                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0ABFA3]/20 text-[9px] font-bold text-[#0ABFA3]">Y</div>
                                  <div className="min-w-0 flex-1">
                                    <p className="mb-1 text-[10px] font-dm font-semibold text-[#0ABFA3]">Your Feedback</p>
                                    {project.client_feedback ? (
                                      <div className="rounded-xl rounded-tl-none border border-border bg-black/40 px-3 py-2.5">
                                        <p className="text-[12px] font-dm leading-relaxed text-body">{project.client_feedback}</p>
                                      </div>
                                    ) : (
                                      <p className="text-[11px] font-dm italic text-muted">No feedback submitted</p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleThread(project.id)}
                                  className="mt-5 flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-dm text-muted transition-colors hover:border-[#0ABFA3]/40 hover:text-[#0ABFA3]"
                                >
                                  {(replyMap[project.id]?.length ?? 0) > 0 && (
                                    <span className="font-semibold">{replyMap[project.id].length}</span>
                                  )}
                                  <ChevronDown size={12} className={`transition-transform duration-200 ${expandedProjects.has(project.id) ? "rotate-180" : ""}`} />
                                </button>
                              </div>

                              {/* Expanded: replies + reply input */}
                              {expandedProjects.has(project.id) && (
                                <>
                                  {(replyMap[project.id] ?? []).length > 0 && (
                                    <div className="mt-3 space-y-3">
                                      {(replyMap[project.id] ?? []).map((reply) => (
                                        <div key={reply.id} className="flex gap-2.5">
                                          <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${reply.sender_role === "client" ? "bg-[#0ABFA3]/20 text-[#0ABFA3]" : "bg-amber-500/20 text-amber-400"}`}>
                                            {reply.sender_role === "client" ? "Y" : "W"}
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center justify-between gap-2">
                                              <span className={`text-[10px] font-dm font-semibold ${reply.sender_role === "client" ? "text-[#0ABFA3]" : "text-amber-400"}`}>
                                                {reply.sender_role === "client" ? "You" : "Worker"}
                                              </span>
                                              <span className="text-[10px] font-dm text-muted">{formatTime(reply.created_at)}</span>
                                            </div>
                                            <div className="rounded-xl rounded-tl-none border border-border bg-black/40 px-3 py-2.5">
                                              <p className="text-[12px] font-dm leading-relaxed text-body">{reply.message}</p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <div className="mt-3 flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={replyInputMap[project.id] ?? ""}
                                      onChange={(e) => setReplyInputMap((prev) => ({ ...prev, [project.id]: e.target.value }))}
                                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSendReply(project.id, "client"); } }}
                                      placeholder="Add a comment…"
                                      className="flex-1 rounded-xl border border-border bg-black/40 px-3.5 py-2.5 text-[12px] font-dm text-body placeholder:text-muted/50 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20"
                                    />
                                    <button
                                      onClick={() => handleSendReply(project.id, "client")}
                                      disabled={sendingReply === project.id || !(replyInputMap[project.id]?.trim())}
                                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity hover:opacity-90 disabled:opacity-35"
                                      style={{ background: "#0ABFA3" }}
                                    >
                                      {sendingReply === project.id ? <Loader2 size={14} className="animate-spin text-white" /> : <Send size={14} className="text-white" />}
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {previewFile && (
          <FilePreviewModal files={previewFile.files} initialIndex={previewFile.index} onClose={() => setPreviewFile(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Shared sub-components ─── */

function FilePreviewModal({
  files, initialIndex, onClose,
}: {
  files: FileEntry[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const file = files[index];
  const hasPrev = index > 0;
  const hasNext = index < files.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) setIndex((i) => i - 1);
      if (e.key === "ArrowRight" && hasNext) setIndex((i) => i + 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasPrev, hasNext, onClose]);

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isImage = file.type?.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(ext);
  const isPdf = file.type === "application/pdf" || ext === "pdf";
  const canPreview = isImage || isPdf;
  const proxyUrl = `/api/project-review/file-proxy?url=${encodeURIComponent(file.url)}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.88)" }} onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} onClick={(e) => e.stopPropagation()} className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#155E53]/40 bg-[#0b0d10] shadow-2xl" style={{ height: "92vh" }}>
        <Corners />
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Paperclip size={14} style={{ color: "#0ABFA3" }} className="shrink-0" />
            <span className="truncate text-[14px] font-dm font-semibold text-body">{file.name}</span>
            {files.length > 1 && <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] font-dm text-muted">{index + 1} / {files.length}</span>}
          </div>
          <div className="ml-4 flex shrink-0 items-center gap-2">
            <a href={proxyUrl} download={file.name} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-dm font-semibold text-muted transition-colors hover:text-body">
              <Download size={13} />Download
            </a>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-body"><X size={15} /></button>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden bg-black/20">
          {files.length > 1 && hasPrev && <button onClick={() => setIndex((i) => i - 1)} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110"><ChevronLeft size={22} /></button>}
          {files.length > 1 && hasNext && <button onClick={() => setIndex((i) => i + 1)} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110"><ChevronRight size={22} /></button>}
          {isImage && <div key={file.url} className="absolute inset-0 flex items-center justify-center overflow-auto p-6">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={proxyUrl} alt={file.name} className="max-h-full max-w-full rounded-lg object-contain" /></div>}
          {isPdf && <iframe key={file.url} src={proxyUrl} title={file.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} />}
          {!canPreview && <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"><FileText size={48} className="text-muted/30" /><p className="text-[14px] font-dm text-muted">Preview not available</p><a href={proxyUrl} download={file.name} className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-dm font-semibold text-white" style={{ background: "#0ABFA3" }}><Download size={15} />Download File</a></div>}
        </div>
        {files.length > 1 && (
          <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-border bg-black/20 px-4 py-2">
            {files.map((f, i) => {
              const fExt = f.name.split(".").pop()?.toLowerCase() ?? "";
              const fIsImage = f.type?.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(fExt);
              return (
                <button key={i} onClick={() => setIndex(i)} className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-dm transition-colors ${i === index ? "border-[#0ABFA3]/60 bg-[#0ABFA3]/10 text-[#0ABFA3]" : "border-border bg-black/30 text-muted hover:border-[#0ABFA3]/30 hover:text-body"}`}>
                  {fIsImage ? (/* eslint-disable-next-line @next/next/no-img-element */<img src={`/api/project-review/file-proxy?url=${encodeURIComponent(f.url)}`} alt="" className="h-5 w-5 rounded object-cover" />) : <FileText size={12} />}
                  <span className="max-w-[120px] truncate">{f.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }} onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-[#155E53]/40 bg-[#0b0d10] p-6 shadow-2xl">
        <Corners />
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-body"><X size={15} /></button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "declined" }) {
  const cfg = {
    pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", label: "Pending", Icon: Clock },
    approved: { color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", label: "Approved", Icon: CheckCircle },
    declined: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", label: "Declined", Icon: XCircle },
  }[status];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-dm font-semibold" style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}>
      <cfg.Icon size={11} />{cfg.label}
    </span>
  );
}

function Corners() {
  const base = "pointer-events-none absolute h-3.5 w-3.5 border-[#0ABFA3]/40";
  return (
    <>
      <span className={`${base} left-1.5 top-1.5 rounded-tl-md border-l border-t`} />
      <span className={`${base} right-1.5 top-1.5 rounded-tr-md border-r border-t`} />
      <span className={`${base} bottom-1.5 left-1.5 rounded-bl-md border-b border-l`} />
      <span className={`${base} bottom-1.5 right-1.5 rounded-br-md border-b border-r`} />
    </>
  );
}
