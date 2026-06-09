"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as RadixTabs from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  Briefcase,
  UserPlus,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Loader2,
  X,
  Download,
  Users,
  Paperclip,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";

const PAGE_PATH = "/ai-tools/project-review";

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

export default function ProjectReviewPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const [activeTab, setActiveTab] = useState("worker");
  const [workerConnections, setWorkerConnections] = useState<Connection[]>([]);
  const [clientConnections, setClientConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected sidebar item
  const [selectedWorkerConn, setSelectedWorkerConn] = useState<string | null>(null);
  const [selectedClientConn, setSelectedClientConn] = useState<string | null>(null);

  // Add-client modal
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [newClientEmail, setNewClientEmail] = useState("");
  const [addingClient, setAddingClient] = useState(false);
  const [addClientError, setAddClientError] = useState("");

  // Upload-project modal
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadConnectionId, setUploadConnectionId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [uploadingProject, setUploadingProject] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Client review
  const [reviewingProjectId, setReviewingProjectId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});

  // File preview
  const [previewFile, setPreviewFile] = useState<{
    files: Array<{ url: string; name: string; type?: string }>;
    index: number;
  } | null>(null);

  // Rename connection
  const [renamingConnId, setRenamingConnId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Delete project
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(PAGE_PATH)}`);
    }
  }, [ready, user, router]);

  const fetchConnections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/project-review/connections");
      if (res.ok) {
        const data = await res.json();
        const wConns: Connection[] = data.workerConnections ?? [];
        const cConns: Connection[] = data.clientConnections ?? [];
        setWorkerConnections(wConns);
        setClientConnections(cConns);
        setSelectedWorkerConn((prev) => prev ?? (wConns[0]?.id || null));
        setSelectedClientConn((prev) => prev ?? (cConns[0]?.id || null));
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready && user) fetchConnections();
  }, [ready, user, fetchConnections]);

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
        setAddClientOpen(false);
        setNewClientEmail("");
        setWorkerConnections((prev) => {
          const next = [data.connection, ...prev];
          if (!selectedWorkerConn) setSelectedWorkerConn(data.connection.id);
          return next;
        });
      } else {
        setAddClientError(data.error || "Failed to add client");
      }
    } catch {
      setAddClientError("Something went wrong. Please try again.");
    } finally {
      setAddingClient(false);
    }
  };

  const handleUploadProject = async () => {
    if (!projectTitle.trim() || !uploadConnectionId) return;
    setUploadingProject(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("connectionId", uploadConnectionId);
      fd.append("title", projectTitle.trim());
      fd.append("description", projectDesc.trim());
      fd.append("fileCount", String(projectFiles.length));
      projectFiles.forEach((f, i) => fd.append(`file_${i}`, f));

      const res = await fetch("/api/project-review/projects", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadOpen(false);
        setProjectTitle("");
        setProjectDesc("");
        setProjectFiles([]);
        setWorkerConnections((prev) =>
          prev.map((c) =>
            c.id === uploadConnectionId
              ? { ...c, projects: [data.project, ...c.projects] }
              : c,
          ),
        );
      } else {
        setUploadError(data.error || "Failed to upload project");
      }
    } catch {
      setUploadError("Something went wrong. Please try again.");
    } finally {
      setUploadingProject(false);
    }
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
        setClientConnections((prev) =>
          prev.map((c) => ({
            ...c,
            projects: c.projects.map((p) =>
              p.id === projectId ? { ...p, ...updated } : p,
            ),
          })),
        );
        setFeedbackMap((prev) => {
          const next = { ...prev };
          delete next[projectId];
          return next;
        });
      }
    } catch {
      // silent
    } finally {
      setReviewingProjectId(null);
    }
  };

  const deleteProject = async (projectId: string) => {
    setDeletingId(projectId);
    setConfirmDeleteId(null);
    try {
      await fetch(`/api/project-review/projects/${projectId}`, { method: "DELETE" });
      setWorkerConnections((prev) =>
        prev.map((c) => ({
          ...c,
          projects: c.projects.filter((p) => p.id !== projectId),
        })),
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveRename = async (connId: string, role: "worker" | "client") => {
    const trimmed = renameValue.trim();
    setRenamingConnId(null);
    if (!trimmed) return;
    if (role === "worker") {
      setWorkerConnections((prev) =>
        prev.map((c) => (c.id === connId ? { ...c, worker_label: trimmed } : c)),
      );
    } else {
      setClientConnections((prev) =>
        prev.map((c) => (c.id === connId ? { ...c, client_label: trimmed } : c)),
      );
    }
    try {
      await fetch(`/api/project-review/connections/${connId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: trimmed, role }),
      });
    } catch {
      // optimistic update stays; server will be in sync on next refresh
    }
  };

  const openUpload = (connectionId: string) => {
    setUploadConnectionId(connectionId);
    setProjectTitle("");
    setProjectDesc("");
    setProjectFiles([]);
    setUploadError("");
    setUploadOpen(true);
  };

  if (!ready || !user) {
    return (
      <>
        <Nav />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <Loader2 className="animate-spin text-muted" size={28} />
        </main>
      </>
    );
  }

  const activeWorkerConn = workerConnections.find((c) => c.id === selectedWorkerConn);
  const activeClientConn = clientConnections.find((c) => c.id === selectedClientConn);

  // Parse stored file data — supports both legacy single-URL and new JSON-array format
  const parseFiles = (project: Project): Array<{ url: string; name: string; type?: string }> => {
    if (!project.file_url) return [];
    try {
      const parsed = JSON.parse(project.file_url);
      if (Array.isArray(parsed)) return parsed as Array<{ url: string; name: string; type?: string }>;
    } catch {}
    return [{ url: project.file_url, name: project.file_name ?? "View file" }];
  };

  return (
    <>
      <Nav />
      <main className="relative min-h-screen overflow-hidden bg-[#050608] pt-16">
        {/* Grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0ABFA3 1px, transparent 1px), linear-gradient(90deg, #0ABFA3 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0ABFA3]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/ai-tools"
              className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-dm text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} />
              All AI tools
            </Link>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#0ABFA3]/30 blur-xl"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.25, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#155E53]/60"
                    style={{ background: "#072a26" }}
                  >
                    <Briefcase size={26} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h1
                    className="font-syne text-body"
                    style={{
                      fontSize: "clamp(26px, 3.5vw, 40px)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Project Review
                  </h1>
                  <p className="mt-1 text-[14px] font-dm text-muted">
                    Workers submit projects — clients approve or decline with feedback.
                  </p>
                </div>
              </div>

              <div
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-dm font-semibold"
                style={{ borderColor: "#155E53", background: "rgba(6,43,38,0.6)" }}
              >
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-[#0ABFA3]"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0ABFA3]" />
                </span>
                <span className="text-[#7fffee]">Live</span>
              </div>
            </div>
          </motion.div>

          {/* ── Main tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <RadixTabs.Root value={activeTab} onValueChange={setActiveTab}>
              {/* Tab pills */}
              <RadixTabs.List className="mb-8 flex gap-2">
                {(
                  [
                    { value: "worker", label: "Worker", Icon: Upload },
                    { value: "client", label: "Client", Icon: Users },
                  ] as const
                ).map(({ value, label, Icon }) => (
                  <RadixTabs.Trigger
                    key={value}
                    value={value}
                    className={`relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-dm font-semibold transition-all duration-200 ${
                      activeTab === value
                        ? "border-transparent text-white"
                        : "border-border bg-white/[0.03] text-muted hover:border-[#0ABFA3]/50 hover:text-[#7fffee]"
                    }`}
                  >
                    {activeTab === value && (
                      <motion.span
                        layoutId="prMainTab"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "#0ABFA3",
                          boxShadow: "0 0 18px rgba(10,191,163,0.45)",
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon size={14} />
                      {label}
                    </span>
                  </RadixTabs.Trigger>
                ))}
              </RadixTabs.List>

              {/* ════════ WORKER TAB ════════ */}
              <RadixTabs.Content value="worker">
                {loading ? (
                  <CenteredLoader />
                ) : (
                  <div className="flex gap-5" style={{ height: "calc(100vh - 22rem)", minHeight: 420 }}>
                    {/* ── Sidebar ── */}
                    <aside className="flex w-64 shrink-0 flex-col rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
                      <Corners />
                      {/* Sidebar header */}
                      <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Users size={14} style={{ color: "#0ABFA3" }} />
                          <span className="text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                            Clients
                          </span>
                          {workerConnections.length > 0 && (
                            <span
                              className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                              style={{ background: "#0ABFA3" }}
                            >
                              {workerConnections.length}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setAddClientError("");
                            setNewClientEmail("");
                            setAddClientOpen(true);
                          }}
                          title="Add Client"
                          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-[#0ABFA3]/20"
                          style={{ color: "#0ABFA3" }}
                        >
                          <UserPlus size={13} />
                        </button>
                      </div>

                      {/* Client list */}
                      <div className="flex-1 overflow-y-auto py-2">
                        {workerConnections.length === 0 ? (
                          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                            <Users size={22} className="mb-2 text-muted/40" />
                            <p className="text-[11px] font-dm text-muted">
                              No clients yet.
                            </p>
                            <button
                              onClick={() => {
                                setAddClientError("");
                                setNewClientEmail("");
                                setAddClientOpen(true);
                              }}
                              className="mt-2 text-[11px] font-dm font-semibold text-[#0ABFA3] hover:underline"
                            >
                              + Add one
                            </button>
                          </div>
                        ) : (
                          workerConnections.map((conn) => {
                            const isActive = selectedWorkerConn === conn.id;
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
                                onClick={() => { if (!isRenaming) setSelectedWorkerConn(conn.id); }}
                                onKeyDown={(e) => { if (e.key === "Enter" && !isRenaming) setSelectedWorkerConn(conn.id); }}
                                className={`group relative w-full cursor-pointer px-4 py-3 text-left transition-colors ${
                                  isActive ? "bg-[#0ABFA3]/10" : "hover:bg-white/[0.03]"
                                }`}
                              >
                                {isActive && (
                                  <span
                                    className="absolute inset-y-0 left-0 w-0.5 rounded-r"
                                    style={{ background: "#0ABFA3" }}
                                  />
                                )}
                                {isRenaming ? (
                                  <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                                    <div
                                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                                      style={{ background: "rgba(10,191,163,0.2)" }}
                                    >
                                      <Users size={13} style={{ color: "#0ABFA3" }} />
                                    </div>
                                    <input
                                      autoFocus
                                      value={renameValue}
                                      onChange={(e) => setRenameValue(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") saveRename(conn.id, "worker");
                                        if (e.key === "Escape") setRenamingConnId(null);
                                      }}
                                      onBlur={() => saveRename(conn.id, "worker")}
                                      className="flex-1 min-w-0 rounded px-2 py-1 text-[12px] font-dm bg-black/60 border border-[#0ABFA3]/50 text-body outline-none focus:border-[#0ABFA3]"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                                      style={{ background: isActive ? "rgba(10,191,163,0.2)" : "#0d1210" }}
                                    >
                                      <Users size={13} style={{ color: isActive ? "#0ABFA3" : "#A1A1AA" }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1 min-w-0">
                                        <p className={`truncate flex-1 text-[12px] font-dm font-semibold ${isActive ? "text-[#0ABFA3]" : "text-body"}`}>
                                          {displayName}
                                        </p>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setRenamingConnId(conn.id);
                                            setRenameValue(displayName);
                                          }}
                                          title="Rename"
                                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#0ABFA3]/20"
                                        >
                                          <Pencil size={9} style={{ color: "#0ABFA3" }} />
                                        </button>
                                      </div>
                                      {conn.worker_label && (
                                        <p className="truncate text-[10px] font-dm text-muted">{conn.client_email}</p>
                                      )}
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

                      {/* Add Client button at bottom */}
                      {workerConnections.length > 0 && (
                        <div className="border-t border-border p-3">
                          <button
                            onClick={() => {
                              setAddClientError("");
                              setNewClientEmail("");
                              setAddClientOpen(true);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#155E53]/60 py-2 text-[12px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10"
                          >
                            <UserPlus size={13} />
                            Add Client
                          </button>
                        </div>
                      )}
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex flex-1 flex-col overflow-y-auto pr-1">
                      {!activeWorkerConn ? (
                        <EmptyState
                          Icon={Users}
                          title="Select a client"
                          description="Choose a client from the sidebar, or add a new one to get started."
                        />
                      ) : (
                        <>
                          {/* Content header */}
                          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-dm font-semibold uppercase tracking-wider text-muted">
                                Client
                              </p>
                              <p className="mt-0.5 font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
                                {activeWorkerConn.worker_label || activeWorkerConn.client_email}
                              </p>
                              {activeWorkerConn.worker_label && (
                                <p className="mt-0.5 text-[12px] font-dm text-muted">{activeWorkerConn.client_email}</p>
                              )}
                            </div>
                            <button
                              onClick={() => openUpload(activeWorkerConn.id)}
                              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                              style={{ background: "#0ABFA3" }}
                            >
                              <Upload size={14} />
                              Upload Project
                            </button>
                          </div>

                          {/* Projects */}
                          {activeWorkerConn.projects.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 py-16 text-center">
                              <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                                style={{ background: "#062B26" }}
                              >
                                <Upload size={20} style={{ color: "#0ABFA3" }} />
                              </div>
                              <p className="text-[14px] font-dm font-semibold text-body">
                                No projects uploaded yet
                              </p>
                              <p className="mt-1 text-[13px] font-dm text-muted">
                                Click &quot;Upload Project&quot; to submit work for this client.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {activeWorkerConn.projects.map((p) => (
                                <div
                                  key={p.id}
                                  className="relative rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 p-5 shadow-[0_0_40px_rgba(10,191,163,0.04)]"
                                >
                                  <Corners />
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-3">
                                      <div
                                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                        style={{ background: "#062B26" }}
                                      >
                                        <FileText size={14} style={{ color: "#0ABFA3" }} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="font-dm font-semibold text-body text-[14px]">
                                          {p.title}
                                        </p>
                                        {p.description && (
                                          <p className="mt-0.5 text-[12px] font-dm text-muted leading-relaxed">
                                            {p.description}
                                          </p>
                                        )}
                                        {parseFiles(p).length > 0 && (
                                          <div className="mt-1.5 flex flex-col gap-0.5">
                                            {parseFiles(p).map((f, fi) => (
                                              <button
                                                key={fi}
                                                onClick={() => setPreviewFile({ files: parseFiles(p), index: fi })}
                                                className="inline-flex items-center gap-1 text-[11px] font-dm text-[#0ABFA3] hover:underline text-left"
                                              >
                                                <Paperclip size={10} />
                                                {f.name}
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                        {p.client_feedback && (
                                          <p className="mt-2 rounded-lg border border-border bg-black/40 px-2.5 py-1.5 text-[11px] font-dm italic text-muted">
                                            <span className="not-italic text-[#7fffee]">
                                              Feedback:{" "}
                                            </span>
                                            {p.client_feedback}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <StatusPill status={p.status} />
                                      {confirmDeleteId === p.id ? (
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-[11px] font-dm text-muted">Delete?</span>
                                          <button
                                            onClick={() => deleteProject(p.id)}
                                            className="rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-[11px] font-dm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                                          >
                                            Yes
                                          </button>
                                          <button
                                            onClick={() => setConfirmDeleteId(null)}
                                            className="rounded-lg border border-border px-2.5 py-1 text-[11px] font-dm font-semibold text-muted transition-colors hover:text-body"
                                          >
                                            No
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setConfirmDeleteId(p.id)}
                                          disabled={deletingId === p.id}
                                          title="Delete project"
                                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
                                        >
                                          {deletingId === p.id ? (
                                            <Loader2 size={13} className="animate-spin" />
                                          ) : (
                                            <Trash2 size={13} />
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </RadixTabs.Content>

              {/* ════════ CLIENT TAB ════════ */}
              <RadixTabs.Content value="client">
                {loading ? (
                  <CenteredLoader />
                ) : clientConnections.length === 0 ? (
                  <EmptyState
                    Icon={Briefcase}
                    title="No projects yet"
                    description="Once a worker connects with your email and submits a project, it will appear here."
                  />
                ) : (
                  <div className="flex gap-5" style={{ height: "calc(100vh - 22rem)", minHeight: 420 }}>
                    {/* ── Sidebar ── */}
                    <aside className="flex w-64 shrink-0 flex-col rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 shadow-[0_0_40px_rgba(10,191,163,0.04)]">
                      <Corners />
                      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                        <Briefcase size={14} style={{ color: "#0ABFA3" }} />
                        <span className="text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                          Workers
                        </span>
                        <span
                          className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                          style={{ background: "#0ABFA3" }}
                        >
                          {clientConnections.length}
                        </span>
                      </div>

                      <div className="flex-1 overflow-y-auto py-2">
                        {clientConnections.map((conn) => {
                          const isActive = selectedClientConn === conn.id;
                          const isRenaming = renamingConnId === conn.id;
                          const pending = conn.projects.filter((p) => p.status === "pending").length;
                          const displayName = conn.client_label || conn.worker_email;
                          return (
                            <div
                              key={conn.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => { if (!isRenaming) setSelectedClientConn(conn.id); }}
                              onKeyDown={(e) => { if (e.key === "Enter" && !isRenaming) setSelectedClientConn(conn.id); }}
                              className={`group relative w-full cursor-pointer px-4 py-3 text-left transition-colors ${
                                isActive ? "bg-[#0ABFA3]/10" : "hover:bg-white/[0.03]"
                              }`}
                            >
                              {isActive && (
                                <span
                                  className="absolute inset-y-0 left-0 w-0.5 rounded-r"
                                  style={{ background: "#0ABFA3" }}
                                />
                              )}
                              {isRenaming ? (
                                <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                                  <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                                    style={{ background: "rgba(10,191,163,0.2)" }}
                                  >
                                    <Users size={13} style={{ color: "#0ABFA3" }} />
                                  </div>
                                  <input
                                    autoFocus
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveRename(conn.id, "client");
                                      if (e.key === "Escape") setRenamingConnId(null);
                                    }}
                                    onBlur={() => saveRename(conn.id, "client")}
                                    className="flex-1 min-w-0 rounded px-2 py-1 text-[12px] font-dm bg-black/60 border border-[#0ABFA3]/50 text-body outline-none focus:border-[#0ABFA3]"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                                    style={{ background: isActive ? "rgba(10,191,163,0.2)" : "#0d1210" }}
                                  >
                                    <Users size={13} style={{ color: isActive ? "#0ABFA3" : "#A1A1AA" }} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1 min-w-0">
                                      <p className={`truncate flex-1 text-[12px] font-dm font-semibold ${isActive ? "text-[#0ABFA3]" : "text-body"}`}>
                                        {displayName}
                                      </p>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setRenamingConnId(conn.id);
                                          setRenameValue(displayName);
                                        }}
                                        title="Rename"
                                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#0ABFA3]/20"
                                      >
                                        <Pencil size={9} style={{ color: "#0ABFA3" }} />
                                      </button>
                                    </div>
                                    {conn.client_label && (
                                      <p className="truncate text-[10px] font-dm text-muted">{conn.worker_email}</p>
                                    )}
                                    <p className="mt-0.5 text-[10px] font-dm text-muted">
                                      {conn.projects.length === 0
                                        ? "No projects"
                                        : `${conn.projects.length} project${conn.projects.length !== 1 ? "s" : ""}${pending > 0 ? ` · ${pending} pending` : ""}`}
                                    </p>
                                  </div>
                                  {pending > 0 && (
                                    <span
                                      className="ml-auto inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                                      style={{ background: "#F59E0B" }}
                                    >
                                      {pending}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </aside>

                    {/* ── Main content ── */}
                    <div className="flex flex-1 flex-col overflow-y-auto pr-1">
                      {!activeClientConn ? (
                        <EmptyState
                          Icon={Briefcase}
                          title="Select a worker"
                          description="Choose a worker from the sidebar to review their submitted projects."
                        />
                      ) : (
                        <>
                          <div className="mb-5">
                            <p className="text-[11px] font-dm font-semibold uppercase tracking-wider text-muted">
                              Worker
                            </p>
                            <p className="mt-0.5 font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
                              {activeClientConn.client_label || activeClientConn.worker_email}
                            </p>
                            {activeClientConn.client_label && (
                              <p className="mt-0.5 text-[12px] font-dm text-muted">{activeClientConn.worker_email}</p>
                            )}
                          </div>

                          {activeClientConn.projects.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#155E53]/40 py-16 text-center">
                              <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                                style={{ background: "#062B26" }}
                              >
                                <FileText size={20} style={{ color: "#0ABFA3" }} />
                              </div>
                              <p className="text-[14px] font-dm font-semibold text-body">
                                No projects submitted yet
                              </p>
                              <p className="mt-1 text-[13px] font-dm text-muted">
                                This worker hasn&apos;t uploaded any projects yet.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {activeClientConn.projects.map((project) => {
                                const isReviewing = reviewingProjectId === project.id;
                                const localFeedback = feedbackMap[project.id] ?? "";
                                return (
                                  <div
                                    key={project.id}
                                    className="relative rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 p-5 shadow-[0_0_40px_rgba(10,191,163,0.04)]"
                                  >
                                    <Corners />

                                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                                      <div className="flex min-w-0 items-start gap-3">
                                        <div
                                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                          style={{ background: "#062B26" }}
                                        >
                                          <FileText size={14} style={{ color: "#0ABFA3" }} />
                                        </div>
                                        <div className="min-w-0">
                                          <p
                                            className="font-syne text-[16px] font-bold text-body"
                                            style={{ letterSpacing: "-0.01em" }}
                                          >
                                            {project.title}
                                          </p>
                                          {project.description && (
                                            <p className="mt-1 text-[13px] font-dm leading-relaxed text-muted">
                                              {project.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <StatusPill status={project.status} />
                                    </div>

                                    {parseFiles(project).length > 0 && (
                                      <div className="mb-4 flex flex-wrap gap-2">
                                        {parseFiles(project).map((f, fi) => (
                                          <button
                                            key={fi}
                                            onClick={() => setPreviewFile({ files: parseFiles(project), index: fi })}
                                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-black/40 px-3 py-2 text-[12px] font-dm font-semibold text-muted transition-colors hover:border-[#0ABFA3]/50 hover:text-[#0ABFA3]"
                                          >
                                            <Paperclip size={12} />
                                            {f.name}
                                          </button>
                                        ))}
                                      </div>
                                    )}

                                    {project.status === "pending" && (
                                      <div className="mt-3 space-y-3 border-t border-border pt-4">
                                        <textarea
                                          rows={2}
                                          value={localFeedback}
                                          onChange={(e) =>
                                            setFeedbackMap((prev) => ({
                                              ...prev,
                                              [project.id]: e.target.value,
                                            }))
                                          }
                                          placeholder="Leave feedback (optional)…"
                                          className="w-full resize-none rounded-xl border border-border bg-black/40 p-3 text-[13px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
                                        />
                                        <div className="flex gap-2.5">
                                          <button
                                            onClick={() => handleReview(project.id, "approved")}
                                            disabled={isReviewing}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#0ABFA3]/40 py-2.5 text-[13px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10 disabled:opacity-50"
                                          >
                                            {isReviewing ? (
                                              <Loader2 size={14} className="animate-spin" />
                                            ) : (
                                              <CheckCircle size={15} />
                                            )}
                                            Approve
                                          </button>
                                          <button
                                            onClick={() => handleReview(project.id, "declined")}
                                            disabled={isReviewing}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2.5 text-[13px] font-dm font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                                          >
                                            {isReviewing ? (
                                              <Loader2 size={14} className="animate-spin" />
                                            ) : (
                                              <XCircle size={15} />
                                            )}
                                            Decline
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {project.status !== "pending" && project.client_feedback && (
                                      <div className="mt-3 rounded-xl border border-border bg-black/40 px-3.5 py-3">
                                        <p className="mb-1 text-[11px] font-dm font-semibold uppercase tracking-wider text-muted">
                                          Your Feedback
                                        </p>
                                        <p className="text-[13px] font-dm leading-relaxed text-body">
                                          {project.client_feedback}
                                        </p>
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
                  </div>
                )}
              </RadixTabs.Content>
            </RadixTabs.Root>
          </motion.div>
        </div>

        {/* ── FILE PREVIEW ── */}
        <AnimatePresence>
          {previewFile && (
            <FilePreviewModal
              files={previewFile.files}
              initialIndex={previewFile.index}
              onClose={() => setPreviewFile(null)}
            />
          )}
        </AnimatePresence>

        {/* ── ADD CLIENT MODAL ── */}
        <AnimatePresence>
          {addClientOpen && (
            <Modal onClose={() => setAddClientOpen(false)} title="Add Client">
              <p className="mb-4 text-[13px] font-dm text-muted">
                Enter the email of the client. They must already have an account.
              </p>
              <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                Client Email
              </label>
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
                <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] font-dm text-amber-200/90">
                  {addClientError}
                </p>
              )}
              <button
                onClick={handleAddClient}
                disabled={addingClient || !newClientEmail.trim()}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-dm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: "#0ABFA3" }}
              >
                {addingClient ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <UserPlus size={16} />
                )}
                {addingClient ? "Connecting…" : "Add Client"}
              </button>
            </Modal>
          )}
        </AnimatePresence>

        {/* ── UPLOAD PROJECT MODAL ── */}
        <AnimatePresence>
          {uploadOpen && (
            <Modal onClose={() => setUploadOpen(false)} title="Upload Project">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                    Project Title *
                  </label>
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
                  <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    placeholder="Brief description of the project…"
                    className="w-full resize-none rounded-xl border border-border bg-black/40 p-4 text-[14px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-dm font-semibold uppercase tracking-wider text-muted">
                    Attachments (optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-black/30 py-5 text-center transition-colors hover:border-[#0ABFA3]/50"
                  >
                    <Upload size={20} className="mb-2 text-muted" />
                    <p className="text-[13px] font-dm font-semibold text-body">
                      Click to add files
                    </p>
                    <p className="mt-0.5 text-[11px] font-dm text-muted">
                      PDF, images, docs — multiple allowed
                    </p>
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

                  {/* Selected files list */}
                  {projectFiles.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {projectFiles.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 rounded-lg border border-border bg-black/30 px-3 py-2"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <Paperclip size={12} style={{ color: "#0ABFA3" }} className="shrink-0" />
                            <span className="truncate text-[12px] font-dm text-body">
                              {f.name}
                            </span>
                            <span className="shrink-0 text-[10px] font-dm text-muted">
                              {(f.size / 1024).toFixed(0)} KB
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setProjectFiles((prev) => prev.filter((_, idx) => idx !== i))
                            }
                            className="shrink-0 text-muted transition-colors hover:text-red-400"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] font-dm text-amber-200/90">
                    {uploadError}
                  </p>
                )}

                <button
                  onClick={handleUploadProject}
                  disabled={uploadingProject || !projectTitle.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-dm font-semibold text-white transition-all disabled:opacity-50"
                  style={{ background: "#0ABFA3" }}
                >
                  {uploadingProject ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {uploadingProject ? "Uploading…" : "Submit Project"}
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

/* ── Shared sub-components ── */

function FilePreviewModal({
  files,
  initialIndex,
  onClose,
}: {
  files: Array<{ url: string; name: string; type?: string }>;
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
  const isImage =
    file.type?.startsWith("image/") ||
    ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(ext);
  const isPdf = file.type === "application/pdf" || ext === "pdf";
  const canPreview = isImage || isPdf;
  const proxyUrl = `/api/project-review/file-proxy?url=${encodeURIComponent(file.url)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#155E53]/40 bg-[#0b0d10] shadow-2xl"
        style={{ height: "92vh" }}
      >
        <Corners />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Paperclip size={14} style={{ color: "#0ABFA3" }} className="shrink-0" />
            <span className="truncate text-[14px] font-dm font-semibold text-body">
              {file.name}
            </span>
            {files.length > 1 && (
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] font-dm text-muted">
                {index + 1} / {files.length}
              </span>
            )}
          </div>
          <div className="ml-4 flex shrink-0 items-center gap-2">
            <a
              href={proxyUrl}
              download={file.name}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-dm font-semibold text-muted transition-colors hover:text-body"
            >
              <Download size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-body"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Preview body */}
        <div className="relative flex-1 overflow-hidden bg-black/20">
          {/* Left arrow */}
          {files.length > 1 && hasPrev && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              title="Previous (←)"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {/* Right arrow */}
          {files.length > 1 && hasNext && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              title="Next (→)"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {isImage && (
            <div key={file.url} className="absolute inset-0 flex items-center justify-center overflow-auto p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proxyUrl}
                alt={file.name}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            </div>
          )}

          {isPdf && (
            <iframe
              key={file.url}
              src={proxyUrl}
              title={file.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          )}

          {!canPreview && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <FileText size={48} className="text-muted/30" />
              <p className="text-[14px] font-dm text-muted">
                Preview not available for this file type
              </p>
              <a
                href={proxyUrl}
                download={file.name}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-dm font-semibold text-white"
                style={{ background: "#0ABFA3" }}
              >
                <Download size={15} />
                Download File
              </a>
            </div>
          )}
        </div>

        {/* Thumbnail strip — only shown when there are multiple files */}
        {files.length > 1 && (
          <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-border bg-black/20 px-4 py-2">
            {files.map((f, i) => {
              const fExt = f.name.split(".").pop()?.toLowerCase() ?? "";
              const fIsImage =
                f.type?.startsWith("image/") ||
                ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(fExt);
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-dm transition-colors ${
                    i === index
                      ? "border-[#0ABFA3]/60 bg-[#0ABFA3]/10 text-[#0ABFA3]"
                      : "border-border bg-black/30 text-muted hover:border-[#0ABFA3]/30 hover:text-body"
                  }`}
                >
                  {fIsImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/project-review/file-proxy?url=${encodeURIComponent(f.url)}`}
                      alt=""
                      className="h-5 w-5 rounded object-cover"
                    />
                  ) : (
                    <FileText size={12} />
                  )}
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

function StatusPill({ status }: { status: "pending" | "approved" | "declined" }) {
  const cfg = {
    pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", label: "Pending", Icon: Clock },
    approved: { color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", label: "Approved", Icon: CheckCircle },
    declined: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", label: "Declined", Icon: XCircle },
  }[status];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-dm font-semibold"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      <cfg.Icon size={11} />
      {cfg.label}
    </span>
  );
}

function EmptyState({ Icon, title, description }: { Icon: typeof Users; title: string; description: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#155E53]/40" style={{ background: "#062B26" }}>
        <Icon size={26} style={{ color: "#0ABFA3" }} />
      </div>
      <p className="font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
        {title}
      </p>
      <p className="mt-2 max-w-sm text-[13px] font-dm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}

function CenteredLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-muted" size={28} />
    </div>
  );
}

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-[#155E53]/40 bg-[#0b0d10] p-6 shadow-2xl"
      >
        <Corners />
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-syne text-[18px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-body"
          >
            <X size={15} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
