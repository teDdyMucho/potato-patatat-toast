"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Brush,
  Download,
  Eraser,
  ImageIcon,
  Loader2,
  RefreshCw,
  Sparkles,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";

const PAGE_PATH = "/ai-tools/design-adjuster";

type Point = { x: number; y: number; scale: number };
type Tool = "brush" | "eraser";

const SUGGESTIONS = [
  "Repaint this wall a soft sage green",
  "Replace the flooring with light oak",
  "Restage as a modern living room",
  "Swap to white marble countertops",
  "Add warm ambient lighting",
];

const STATUS = [
  "Analyzing your selection…",
  "Understanding the scene…",
  "Generating the new design…",
  "Refining details & lighting…",
  "Finalizing your image…",
];

export default function DesignAdjusterPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>("brush");
  const [brush, setBrush] = useState(48);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(0);

  // Login gate.
  useEffect(() => {
    if (ready && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(PAGE_PATH)}`);
    }
  }, [ready, user, router]);

  // Cycle the loading status copy while generating.
  useEffect(() => {
    if (!loading) {
      setStep(0);
      return;
    }
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % STATUS.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, [loading]);

  // Draw the uploaded photo onto the base canvas and size the mask canvas to match.
  useEffect(() => {
    if (!imageSrc) return;
    const img = new window.Image();
    img.onload = () => {
      const base = imgCanvasRef.current;
      const mask = maskCanvasRef.current;
      if (!base || !mask) return;
      base.width = mask.width = img.naturalWidth;
      base.height = mask.height = img.naturalHeight;
      base.getContext("2d")?.drawImage(img, 0, 0);
      mask.getContext("2d")?.clearRect(0, 0, mask.width, mask.height);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const loadFile = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
    setResultImg(null);
    setMessage("");
  }, []);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const mask = maskCanvasRef.current!;
    const rect = mask.getBoundingClientRect();
    const scale = mask.width / rect.width;
    return {
      x: (e.clientX - rect.left) * scale,
      y: (e.clientY - rect.top) * scale,
      scale,
    };
  };

  const applyStrokeStyle = (ctx: CanvasRenderingContext2D) => {
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = ctx.strokeStyle = "rgba(10,191,163,0.5)";
    }
  };

  const paintDot = (p: Point) => {
    const ctx = maskCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    applyStrokeStyle(ctx);
    ctx.beginPath();
    ctx.arc(p.x, p.y, (brush * p.scale) / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const paintLine = (a: Point, b: Point) => {
    const ctx = maskCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    applyStrokeStyle(ctx);
    ctx.lineWidth = brush * b.scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imageSrc) return;
    drawing.current = true;
    const p = pointFromEvent(e);
    lastPoint.current = p;
    paintDot(p);
    maskCanvasRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !lastPoint.current) return;
    const p = pointFromEvent(e);
    paintLine(lastPoint.current, p);
    lastPoint.current = p;
  };

  const onPointerUp = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  const clearMask = () => {
    const mask = maskCanvasRef.current;
    mask?.getContext("2d")?.clearRect(0, 0, mask.width, mask.height);
  };

  const removeImage = () => {
    setImageSrc(null);
    setResultImg(null);
    setMessage("");
  };

  const downloadResult = () => {
    if (!resultImg) return;
    const a = document.createElement("a");
    a.href = resultImg;
    a.download = "akt-design-adjuster.png";
    a.click();
  };

  const processImage = async () => {
    if (!imageSrc) {
      setMessage("Upload a property photo first.");
      return;
    }
    if (!prompt.trim()) {
      setMessage("Describe the change you want in the masked area.");
      return;
    }
    setLoading(true);
    setMessage("");
    setResultImg(null);
    try {
      const image = imgCanvasRef.current?.toDataURL("image/png");
      const mask = maskCanvasRef.current?.toDataURL("image/png");
      const res = await fetch("/api/design-adjuster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, mask, prompt: prompt.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.image) {
        setResultImg(data.image);
      } else {
        setMessage(data.error || data.message || "No processed image was returned.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <Nav />
      <main className="relative min-h-screen overflow-hidden bg-[#050608] pt-16">
        {/* Futuristic backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0ABFA3 1px, transparent 1px), linear-gradient(90deg, #0ABFA3 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0ABFA3]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          {/* Header */}
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
                    <Wand2 size={26} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h1
                    className="font-syne text-body"
                    style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}
                  >
                    Design Adjuster
                  </h1>
                  <p className="mt-1 text-[14px] font-dm text-muted">
                    Brush an area of a property photo — AI restyles only that region.
                  </p>
                </div>
              </div>

              {/* Status chip */}
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
                <span className="text-[#7fffee]">
                  {loading ? "Generating" : "AI ready"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Workspace */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* ── Source ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <PanelLabel index="01" label="Source" />
              <Panel>
                {!imageSrc ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      loadFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`group flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-all duration-200 ${
                      dragOver
                        ? "border-[#0ABFA3] bg-[#0ABFA3]/5"
                        : "border-border bg-black/40 hover:border-[#0ABFA3]/60"
                    }`}
                  >
                    <motion.div
                      animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#155E53]/50"
                      style={{ background: "#072a26" }}
                    >
                      <Upload size={26} style={{ color: "#0ABFA3" }} />
                    </motion.div>
                    <p className="font-syne text-[16px] font-bold text-body">
                      {dragOver ? "Drop your photo" : "Upload a property photo"}
                    </p>
                    <p className="mt-1 text-[12px] font-dm text-muted">
                      Click to browse or drag &amp; drop — JPG or PNG
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black">
                    <canvas ref={imgCanvasRef} className="block h-auto w-full select-none" />
                    <canvas
                      ref={maskCanvasRef}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerLeave={onPointerUp}
                      className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
                    />
                    <button
                      onClick={removeImage}
                      aria-label="Remove image"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white/80 backdrop-blur transition-colors hover:bg-black/80 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Mask toolbar */}
                {imageSrc && (
                  <div className="mt-4 flex flex-wrap items-center gap-2.5 rounded-xl border border-border bg-black/40 p-2.5">
                    <div className="inline-flex rounded-lg border border-border p-0.5">
                      <ToolBtn active={tool === "brush"} onClick={() => setTool("brush")} icon={Brush} label="Brush" />
                      <ToolBtn active={tool === "eraser"} onClick={() => setTool("eraser")} icon={Eraser} label="Erase" />
                    </div>
                    <label className="flex items-center gap-2 px-1 text-[12px] font-dm text-muted">
                      <span className="hidden sm:inline">Size</span>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        value={brush}
                        onChange={(e) => setBrush(Number(e.target.value))}
                        className="w-24 accent-[#0ABFA3]"
                      />
                      <span className="w-9 text-body">{brush}px</span>
                    </label>
                    <button
                      onClick={clearMask}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-dm font-semibold text-muted transition-colors hover:border-red-500/40 hover:text-red-300"
                    >
                      <X size={13} />
                      Clear
                    </button>
                  </div>
                )}
              </Panel>
            </motion.div>

            {/* ── Result ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <PanelLabel index="02" label="Result" />
              <Panel>
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-black">
                  {/* Result image */}
                  <AnimatePresence mode="wait">
                    {resultImg && !loading ? (
                      <motion.img
                        key="result"
                        // eslint-disable-next-line @next/next/no-img-element
                        src={resultImg}
                        alt="Processed result"
                        className="h-full w-full object-contain"
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    ) : !loading ? (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-3 px-6 text-center"
                      >
                        <ImageIcon size={30} className="text-muted/40" />
                        <p className="text-[13px] font-dm text-muted">
                          Your restyled image will appear here
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Generating overlay */}
                  <AnimatePresence>{loading && <GeneratingOverlay step={step} />}</AnimatePresence>
                </div>

                {/* Result actions */}
                {resultImg && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex gap-2.5"
                  >
                    <button
                      onClick={downloadResult}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-black/40 py-2.5 text-[13px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
                    >
                      <Download size={15} />
                      Download
                    </button>
                    <button
                      onClick={processImage}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#0ABFA3]/40 py-2.5 text-[13px] font-dm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10"
                    >
                      <RefreshCw size={15} />
                      Regenerate
                    </button>
                  </motion.div>
                )}
              </Panel>
            </motion.div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => loadFile(e.target.files?.[0])}
          />

          {/* ── Prompt / command bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-6"
          >
            <PanelLabel index="03" label="Design instructions" />
            <Panel>
              {/* Suggestion chips */}
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setPrompt(s)}
                    className="rounded-full border border-border bg-black/40 px-3 py-1.5 text-[12px] font-dm text-muted transition-colors hover:border-[#0ABFA3]/50 hover:text-[#7fffee]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how to adjust the masked area — e.g. repaint this wall sage green, replace the flooring with light oak, restage as a modern living room…"
                className="w-full resize-none rounded-xl border border-border bg-black/40 p-4 text-[14px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-[#0ABFA3] focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/30"
              />

              {/* Generate button */}
              <button
                onClick={processImage}
                disabled={loading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 text-[15px] font-dm font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #0ABFA3, #0a8f80)" }}
              >
                {/* hover shimmer */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Design
                  </>
                )}
              </button>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-[13px] font-dm leading-relaxed text-amber-200/90"
                >
                  {message}
                </motion.p>
              )}
            </Panel>
          </motion.div>

          {/* Bottom CTA */}
          <Link
            href="/contact"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl border px-6 py-4 text-[14px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
            style={{ background: "#062B26", borderColor: "#155E53" }}
          >
            Want this built into your business? Get a custom AI build
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Building blocks ── */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-[#155E53]/40 bg-[#0b0d10]/80 p-4 shadow-[0_0_40px_rgba(10,191,163,0.04)] backdrop-blur-sm">
      <Corners />
      {children}
    </div>
  );
}

function PanelLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className="font-mono text-[11px] font-bold text-[#0ABFA3]">{index}</span>
      <span className="text-[11px] font-dm font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#155E53]/50 to-transparent" />
    </div>
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

function ToolBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Brush;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-dm font-semibold transition-colors ${
        active ? "text-white" : "text-muted hover:text-body"
      }`}
      style={active ? { background: "#0ABFA3" } : undefined}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function GeneratingOverlay({ step }: { step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black/70 backdrop-blur-sm"
    >
      {/* radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,191,163,0.18),transparent_60%)]" />

      {/* sweeping scan beam */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-[#0ABFA3]/25 to-transparent"
        animate={{ y: ["-30%", "130%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: 0 }}
      />

      {/* pulsing core */}
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-[#0ABFA3]/40 blur-2xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#155E53]/60"
          style={{ background: "#072a26" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={26} style={{ color: "#0ABFA3" }} />
          </motion.div>
        </div>
      </div>

      {/* cycling status */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="px-6 text-center font-dm text-[14px] font-semibold text-[#7fffee]"
        >
          {STATUS[step]}
        </motion.p>
      </AnimatePresence>

      {/* indeterminate progress */}
      <div className="mt-4 h-1 w-44 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#0ABFA3] to-transparent"
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <p className="mt-3 font-dm text-[11px] text-muted">
        This can take up to a minute
      </p>
    </motion.div>
  );
}
